import type { Game } from "@/lib/leaderboard";

export type GameInfo = {
  slug: Game;
  /** The tab's label, and the board's heading. */
  name: string;
  /** The steps in "How to play". Keep them to a line or two each. */
  howTo: string[];
};

/**
 * /play: short games for people who make interfaces, all in one window. Each game is a tab with
 * the same three difficulties and its own scoreboard per difficulty. To add one: add it here, add
 * its name to GAMES in lib/leaderboard.ts, put its rules and scoring in lib/<game>.ts and
 * lib/play-score.ts, and build it in components/play (see EaseMatchGame).
 */
export const play: { heading: string; games: GameInfo[] } = {
  heading: "Small games for people who make interfaces.",
  games: [
    {
      slug: "ease-match",
      name: "Ease match",
      howTo: [
        "Two squares loop. The top one moves with a hidden easing curve.",
        "Drag the two handles until the bottom one moves the same way.",
        "Press Lock in, or Enter. The closer your curve, the higher the score, and a tie goes to the faster run.",
        "Easy is one clean bend. Medium is steep or lopsided. Hard goes past the ends.",
      ],
    },
    {
      slug: "pen-tool",
      name: "Pen tool",
      howTo: [
        "Trace the dashed outline with the pen.",
        "Click to drop a corner point. Click and drag to pull out a smooth curve.",
        "Click the first point to close a shape. Drag any point or handle to adjust it. Undo takes back the last point.",
        "A closer trace scores higher, and so do fewer points. Easy is straight edges, medium is curves, hard needs both.",
      ],
    },
    {
      slug: "tracking",
      name: "Tracking",
      howTo: [
        "The top line is set with hidden letter-spacing.",
        "Slide the tracking of the bottom line until its spacing feels the same. The words differ, so judge the rhythm, not the width.",
        "Press Lock in, or Enter. The closer you are, the higher the score, and a tie goes to the faster run.",
        "Easy is a big gap, tight or wide. Hard is about a pixel per letter.",
      ],
    },
  ],
};
