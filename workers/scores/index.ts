/**
 * The scoreboard service: a small Cloudflare Worker that keeps one board per game and difficulty
 * in Workers KV. The site is a static export with nowhere to store other people's scores, so it
 * calls this.
 *
 *   GET    /<game>/<difficulty>        the board, best first
 *   POST   /<game>/<difficulty>        { name, payload, ms }: adds or improves a score
 *   DELETE /<game>/<difficulty>/<at>   removes an entry (needs the admin token)
 *
 * The browser sends what the player did (the curve they picked, the answers they gave), never a
 * score. The score is worked out here with the same code the games use (lib/play-score.ts), so a
 * score can't be typed in from DevTools. It can still be earned dishonestly: the targets ship with
 * the site. That's an accepted limit. Setup and deploy steps are in README.md.
 */
import {
  BOARD_SIZE,
  cleanName,
  isDifficulty,
  isEntry,
  isGame,
  mergeEntry,
  type Difficulty,
  type Entry,
  type Game,
} from "../../lib/leaderboard";
import { scoreSubmission } from "../../lib/play-score";

/** The slice of Cloudflare's KVNamespace used here, so this folder needs no extra type package. */
interface KV {
  get(key: string, type: "text"): Promise<string | null>;
  get(key: string, type: "json"): Promise<unknown>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}

export interface Env {
  SCORES: KV;
  /** Sites allowed to call this from a browser, comma separated. */
  ALLOWED_ORIGINS: string;
  /** Needed to delete an entry. Set it with `wrangler secret put ADMIN_TOKEN`. */
  ADMIN_TOKEN?: string;
}

/** Per visitor (by IP) and per hour. Each one costs two KV writes, and the free plan allows 1,000 a day. */
const SUBMITS_PER_HOUR = 20;
const MAX_BODY = 4096;

const boardKey = (game: Game, difficulty: Difficulty) => `board:${game}:${difficulty}`;

async function readBoard(env: Env, game: Game, difficulty: Difficulty): Promise<Entry[]> {
  const raw = await env.SCORES.get(boardKey(game, difficulty), "json");
  return Array.isArray(raw) ? raw.filter(isEntry) : [];
}

function sameSecret(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

const worker = {
  async fetch(req: Request, env: Env): Promise<Response> {
    const origin = req.headers.get("origin") ?? "";
    const allowed = env.ALLOWED_ORIGINS.split(",")
      .map((o) => o.trim())
      .filter(Boolean);
    const originOk = allowed.includes(origin);
    const cors: Record<string, string> = { vary: "origin" };
    if (originOk) {
      cors["access-control-allow-origin"] = origin;
      cors["access-control-allow-methods"] = "GET, POST, DELETE, OPTIONS";
      cors["access-control-allow-headers"] = "content-type, authorization";
    }
    const reply = (data: unknown, status = 200, extra: Record<string, string> = {}) =>
      new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json", ...cors, ...extra } });

    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });

    const [, game, difficulty, id] = new URL(req.url).pathname.split("/");
    if (!isGame(game) || !isDifficulty(difficulty)) return reply({ error: "Not found" }, 404);

    try {
      if (req.method === "GET") {
        return reply({ entries: await readBoard(env, game, difficulty) }, 200, { "cache-control": "public, max-age=15" });
      }

      if (req.method === "POST") {
        // Browsers only: another site's page can't post scores here.
        if (!originOk) return reply({ error: "Not allowed" }, 403);

        const text = await req.text();
        if (text.length > MAX_BODY) return reply({ error: "Too large" }, 413);
        let body: { name?: unknown; payload?: unknown; ms?: unknown };
        try {
          body = JSON.parse(text);
        } catch {
          return reply({ error: "Bad request" }, 400);
        }

        const name = cleanName(body.name);
        if (!name) return reply({ error: "A name is needed" }, 400);
        const scored = scoreSubmission(game, difficulty, body.payload, Number(body.ms));
        if (!scored) return reply({ error: "That run can't be scored" }, 400);

        const ip = req.headers.get("cf-connecting-ip") ?? "unknown";
        const slot = `rate:${ip}:${Math.floor(Date.now() / 3_600_000)}`;
        const used = Number((await env.SCORES.get(slot, "text")) ?? 0);
        if (used >= SUBMITS_PER_HOUR) return reply({ error: "Slow down" }, 429);
        await env.SCORES.put(slot, String(used + 1), { expirationTtl: 3600 });

        const board = await readBoard(env, game, difficulty);
        // `at` doubles as the entry's id for moderation, so no two entries may share one.
        let at = Date.now();
        while (board.some((e) => e.at === at)) at++;
        const entries = mergeEntry(board, { name, ...scored, at });
        await env.SCORES.put(boardKey(game, difficulty), JSON.stringify(entries.slice(0, BOARD_SIZE)));
        return reply({ entries, ...scored });
      }

      if (req.method === "DELETE") {
        const token = (req.headers.get("authorization") ?? "").replace(/^Bearer /, "");
        if (!env.ADMIN_TOKEN || !sameSecret(token, env.ADMIN_TOKEN)) return reply({ error: "Not allowed" }, 401);
        const board = await readBoard(env, game, difficulty);
        const entries = board.filter((e) => String(e.at) !== id);
        await env.SCORES.put(boardKey(game, difficulty), JSON.stringify(entries));
        return reply({ removed: board.length - entries.length, entries });
      }

      return reply({ error: "Method not allowed" }, 405);
    } catch (err) {
      // KV refuses operations once a free-plan daily limit is used up. Say so rather than crash.
      console.error(err);
      return reply({ error: "Scoreboard unavailable" }, 503);
    }
  },
};

export default worker;
