import type { Difficulty } from "@/lib/leaderboard";

/** What a game hands the arena when a run ends. The arena marks it, posts it and shows the result. */
export type Finish = {
  /** What the player did (the curve, the path, the tracking). This is what gets sent, never the score. */
  payload: unknown;
  /** Time the run took, in ms. */
  ms: number;
  score: number;
  /** Shown after the score, e.g. 1000 for "842 / 1000". */
  outOf: number;
  /** A line or two under the score. */
  summary: string;
};

export type GameProps = {
  difficulty: Difficulty;
  /** Goes up on every "Play again", so each run gets a different target. */
  run: number;
  /** True once the run has been locked in: the game shows its answer and drops its actions. */
  done: boolean;
  onFinish: (finish: Finish) => void;
};

/** Where the last result stands on the board. */
export type Outcome =
  | { kind: "idle" }
  | { kind: "needs-name" }
  | { kind: "posting" }
  | { kind: "posted"; rank: number | null; best: number; improved: boolean }
  | { kind: "failed"; message: string };
