/**
 * Marks a finished game. The browser sends what the player did (the curve they picked, the path
 * they drew, the tracking they set), never a score, and both the game and the scores service call
 * this to get one.
 */
import { TARGETS as EASES, isCurve, scoreCurve } from "./ease-match";
import type { Difficulty, Game } from "./leaderboard";
import { SHAPES, isPenPath, scorePen } from "./pen-tool";
import { TARGETS as TRACKS, scoreTracking } from "./tracking";

export type Scored = {
  score: number;
  /** How long the run took, in ms. It only settles ties between equal scores. */
  aux: number;
};

const MIN_MS = 500;
const MAX_MS = 600_000;

/** Null when the submission doesn't make sense for that game and difficulty. */
export function scoreSubmission(game: Game, difficulty: Difficulty, payload: unknown, ms: number): Scored | null {
  if (typeof payload !== "object" || payload === null) return null;
  const p = payload as Record<string, unknown>;
  const aux = Number.isFinite(ms) ? Math.min(MAX_MS, Math.max(MIN_MS, Math.round(ms))) : MAX_MS;

  if (game === "ease-match") {
    const target = EASES[difficulty].find((t) => t.id === p.target);
    if (!target || !isCurve(p.curve)) return null;
    return { score: scoreCurve(p.curve, target.curve), aux };
  }

  if (game === "tracking") {
    const target = TRACKS[difficulty].find((t) => t.id === p.target);
    if (!target || typeof p.tracking !== "number" || !Number.isFinite(p.tracking)) return null;
    return { score: scoreTracking(p.tracking, target.tracking), aux };
  }

  const shape = SHAPES[difficulty].find((s) => s.id === p.shape);
  if (!shape || !isPenPath({ closed: p.closed, anchors: p.anchors })) return null;
  return { score: scorePen(shape, { closed: p.closed as boolean, anchors: p.anchors as never }), aux };
}
