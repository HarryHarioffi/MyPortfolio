/**
 * What the browser and the scores service both need to agree on: the games, the difficulties, an
 * entry on a board, and how a board orders itself. No imports from the app and no browser APIs,
 * so the service (workers/scores) can use it as it is.
 */

export const GAMES = ["ease-match", "pen-tool", "tracking"] as const;
export type Game = (typeof GAMES)[number];
export const isGame = (v: unknown): v is Game => GAMES.includes(v as Game);

/** Every game has the same three, each with its own board. */
export const DIFFICULTIES = ["easy", "medium", "hard"] as const;
export type Difficulty = (typeof DIFFICULTIES)[number];
export const isDifficulty = (v: unknown): v is Difficulty => DIFFICULTIES.includes(v as Difficulty);

export type Entry = {
  name: string;
  score: number;
  /** How long the run took, in ms. It only settles ties. */
  aux: number;
  /** When it was set, ms since the epoch. */
  at: number;
};

export const NAME_MAX = 24;
/** How many places a board keeps. */
export const BOARD_SIZE = 50;

/** A name as it will be shown: trimmed, one line, no angle brackets, at most NAME_MAX characters. */
export function cleanName(raw: unknown): string {
  if (typeof raw !== "string") return "";
  return raw
    .replace(/[\u0000-\u001f\u007f<>]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, NAME_MAX)
    .trim();
}

/** Best first. A tie goes to the faster run, then to whoever got there first. */
export const byBest = (a: Entry, b: Entry): number => b.score - a.score || a.aux - b.aux || a.at - b.at;

/** Puts a result on a board: one place per name, and it only improves. Returns the board, best first. */
export function mergeEntry(board: readonly Entry[], entry: Entry): Entry[] {
  const list = [...board];
  const i = list.findIndex((e) => e.name.toLowerCase() === entry.name.toLowerCase());
  if (i === -1) list.push(entry);
  else if (byBest(entry, list[i]) < 0) list[i] = entry;
  return list.sort(byBest).slice(0, BOARD_SIZE);
}

export function isEntry(v: unknown): v is Entry {
  const e = v as Entry;
  return (
    typeof e === "object" &&
    e !== null &&
    typeof e.name === "string" &&
    typeof e.score === "number" &&
    typeof e.aux === "number" &&
    typeof e.at === "number"
  );
}
