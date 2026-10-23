import { NAME_MAX, cleanName, type Difficulty, type Entry } from "@/lib/leaderboard";
import { Trophy, type Place } from "./Trophy";

/** Places listed under the podium before "your place" is pinned below them. */
const LISTED = 4;

export type BoardState = "loading" | "ready" | "failed";

/** A square with the first letter of the name, tinted by the name, so rows are easy to tell apart. */
const TINTS = [
  "bg-accent-soft text-accent",
  "bg-chip text-ink",
  "bg-[#efe6d9] text-[#8a5a24]",
  "bg-[#e3e8f3] text-[#3f528c]",
  "bg-[#e6eee1] text-[#46663a]",
];

function Avatar({ name, className = "size-7 text-[13px]" }: { name: string; className?: string }) {
  let hash = 0;
  for (const ch of name.toLowerCase()) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center font-semibold uppercase ${className} ${TINTS[hash % TINTS.length]}`}
    >
      {[...name][0] ?? "?"}
    </span>
  );
}

/** The step under each of the top three: how high, and the medal's tint. */
const STEP: Record<Place, string> = {
  1: "h-14 bg-[#f3e7c8] text-[#8f6a14]",
  2: "h-10 bg-[#e6eaed] text-[#5b6770]",
  3: "h-8 bg-[#efddcd] text-[#7f4a24]",
};

function Podium({ entries, me }: { entries: readonly Entry[]; me: number }) {
  return (
    <ol aria-label="Top three" className="grid grid-cols-3 items-end gap-2 px-5 pt-5">
      {([2, 1, 3] as const).map((place) => {
        const entry = entries[place - 1];
        const you = me === place - 1;
        return (
          <li key={place} className="flex min-w-0 flex-col items-center text-center">
            {entry ? (
              <>
                <Trophy place={place} className={place === 1 ? "size-9" : "size-7"} />
                <span className="mt-1.5 w-full truncate text-[13px] font-medium text-ink">{entry.name}</span>
                <span className="text-[15px] font-semibold tabular-nums text-ink">{entry.score}</span>
              </>
            ) : (
              <>
                <span className="size-7 border border-dashed border-slot-line" aria-hidden="true" />
                <span className="mt-1.5 text-[13px] text-faint">Open</span>
                <span className="text-[15px] text-faint">·</span>
              </>
            )}
            <span
              className={`display mt-2 flex w-full items-center justify-center text-[20px] font-semibold ${
                entry ? STEP[place] : `${STEP[place].split(" ")[0]} bg-chip/60 text-faint`
              } ${you ? "outline outline-2 -outline-offset-2 outline-accent" : ""}`}
            >
              {place}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

/**
 * The right-hand panel: who's playing, the podium for the top three, then the next few places.
 * Everything here is for the game and difficulty you're on, and changes when either does.
 */
export function Scoreboard({
  gameName,
  difficulty,
  entries,
  state,
  shared,
  name,
  onName,
}: {
  gameName: string;
  difficulty: Difficulty;
  entries: readonly Entry[];
  state: BoardState;
  /** False when scores are only kept on this device. */
  shared: boolean;
  /** What's typed in the name field, and how to change it. */
  name: string;
  onName: (name: string) => void;
}) {
  const who = cleanName(name).toLowerCase();
  const me = who ? entries.findIndex((e) => e.name.toLowerCase() === who) : -1;
  const lead = entries[0]?.score ?? 0;
  const level = difficulty[0].toUpperCase() + difficulty.slice(1);

  // Places 4 and down, plus your own place if it is further down still.
  const below = entries.slice(3, 3 + LISTED).map((entry, i) => ({ entry, place: i + 4 }));
  const pinned = me >= 3 + LISTED ? { entry: entries[me], place: me + 1 } : null;

  return (
    <section aria-labelledby="board-title" className="flex h-full flex-col">
      <header className="flex items-start justify-between gap-3 px-5 pb-1 pt-5">
        <div className="min-w-0">
          <h2 id="board-title" className="display text-[20px] font-semibold leading-[26px] tracking-[-0.1px]">
            Scoreboard
          </h2>
          <p className="mt-0.5 flex items-center gap-2 text-[13px] text-muted">
            <span className="inline-flex h-5 items-center bg-accent-soft px-1.5 text-[12px] font-medium text-accent">
              {level}
            </span>
            {gameName}
          </p>
        </div>
        <p className="mt-1 text-[12px] font-medium text-muted">{shared ? "Everyone" : "This device"}</p>
      </header>

      <div className="px-5 pt-3">
        <label htmlFor="play-name" className="text-[12px] font-medium text-muted">
          Playing as
        </label>
        <input
          id="play-name"
          value={name}
          onChange={(e) => onName(e.target.value.slice(0, NAME_MAX))}
          autoComplete="nickname"
          placeholder="Your name, to post scores"
          className="mt-1.5 h-10 w-full border border-line bg-paper px-3 text-[14px] text-ink placeholder:text-faint"
        />
      </div>

      {state === "failed" ? (
        <p className="flex flex-1 items-center justify-center px-6 py-14 text-center text-[14px] text-muted">
          The scoreboard didn&apos;t load. You can still play.
        </p>
      ) : state === "loading" ? (
        <div className="space-y-2 px-5 pt-6" aria-hidden="true">
          <div className="grid grid-cols-3 items-end gap-2">
            <span className="h-20 bg-slot" />
            <span className="h-28 bg-slot" />
            <span className="h-16 bg-slot" />
          </div>
          {Array.from({ length: LISTED }, (_, i) => (
            <span key={i} className="block h-9 bg-slot/70" />
          ))}
        </div>
      ) : (
        <>
          <Podium entries={entries} me={me} />

          {entries.length === 0 ? (
            <p className="px-6 pb-8 pt-8 text-center text-[14px] text-muted">No scores yet. Yours could be the first.</p>
          ) : (
            <table className="mt-4 w-full text-left">
              <caption className="sr-only">
                {gameName}, {level}: places after the top three
              </caption>
              <thead className="sr-only">
                <tr>
                  <th scope="col">Place</th>
                  <th scope="col">Name</th>
                  <th scope="col">Score</th>
                  <th scope="col">Time</th>
                </tr>
              </thead>
              <tbody>
                {[...below, ...(pinned ? [pinned] : [])].map(({ entry, place }, i) => {
                  const you = place - 1 === me;
                  const pct = lead > 0 ? Math.max(4, (entry.score / lead) * 100) : 0;
                  const pinnedRow = pinned !== null && i === below.length;
                  return (
                    <tr
                      key={`${entry.name}-${entry.at}`}
                      className={`transition-colors ${you ? "bg-accent-soft" : "hover:bg-canvas"} ${
                        pinnedRow ? "border-t-2 border-dashed border-line" : "border-t border-line"
                      }`}
                    >
                      <td className="w-12 py-2 pl-5 pr-2 text-[13px] tabular-nums text-muted">{place}</td>
                      <td className="w-full max-w-0 py-2 pr-3">
                        <span className="flex items-center gap-2.5">
                          <Avatar name={entry.name} />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[14px] text-ink">{entry.name}</span>
                            <span aria-hidden="true" className="mt-1 block h-[3px] bg-line">
                              <span className="block h-full bg-accent" style={{ width: `${pct}%` }} />
                            </span>
                          </span>
                        </span>
                      </td>
                      <td className="py-2 text-right text-[14px] font-medium tabular-nums text-ink">{entry.score}</td>
                      <td className="w-16 py-2 pl-3 pr-5 text-right text-[13px] tabular-nums text-muted">
                        {(entry.aux / 1000).toFixed(1)}s
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </>
      )}

      <p className="mt-auto border-t border-line px-5 py-3 text-[12px] text-muted">
        {state === "ready" && entries.length > 0
          ? `${entries.length} ${entries.length === 1 ? "player" : "players"}. Ties go to the faster run.`
          : shared
            ? "Everyone's scores show here."
            : "Scores are saved on this device."}
      </p>
    </section>
  );
}
