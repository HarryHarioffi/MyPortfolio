import { isEntry, mergeEntry, type Difficulty, type Entry, type Game } from "@/lib/leaderboard";
import { readLocal, writeLocal } from "@/lib/local-store";
import { scoreSubmission } from "@/lib/play-score";

/**
 * The shared scoreboard lives in a small service (workers/scores), because this site is fully
 * static and has nowhere to keep other people's scores. Set NEXT_PUBLIC_SCORES_URL to where it
 * runs and every board becomes shared. Left empty, the games work the same and each board keeps
 * the scores played on this device.
 */
export const SCORES_URL = (process.env.NEXT_PUBLIC_SCORES_URL ?? "").replace(/\/$/, "");
export const SHARED = SCORES_URL !== "";

const deviceKey = (game: Game, difficulty: Difficulty) => `hh:play:board:${game}:${difficulty}`;

function readDevice(game: Game, difficulty: Difficulty): Entry[] {
  try {
    const raw: unknown = JSON.parse(readLocal(deviceKey(game, difficulty)) || "[]");
    return Array.isArray(raw) ? raw.filter(isEntry) : [];
  } catch {
    return [];
  }
}

export async function loadBoard(game: Game, difficulty: Difficulty): Promise<Entry[]> {
  if (!SHARED) return readDevice(game, difficulty);
  const res = await fetch(`${SCORES_URL}/${game}/${difficulty}`);
  if (!res.ok) throw new Error(`Scoreboard answered ${res.status}`);
  return ((await res.json()) as { entries: Entry[] }).entries;
}

export type Posted = { entries: Entry[]; score: number; aux: number };

/** Sends what the player did, not a score: the score is worked out again from it, here or in the service. */
export async function postScore(
  game: Game,
  difficulty: Difficulty,
  body: { name: string; payload: unknown; ms: number },
): Promise<Posted> {
  if (!SHARED) {
    const scored = scoreSubmission(game, difficulty, body.payload, body.ms);
    if (!scored) throw new Error("That run could not be scored.");
    const entries = mergeEntry(readDevice(game, difficulty), { name: body.name, ...scored, at: Date.now() });
    writeLocal(deviceKey(game, difficulty), JSON.stringify(entries));
    return { entries, ...scored };
  }
  const res = await fetch(`${SCORES_URL}/${game}/${difficulty}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  if (res.status === 429) throw new Error("Too many tries. Give it a minute.");
  if (!res.ok) throw new Error("Could not reach the scoreboard.");
  return (await res.json()) as Posted;
}
