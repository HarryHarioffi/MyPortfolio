"use client";

import { useEffect, useEffectEvent, useRef, useState, type ReactNode } from "react";
import { scoreSubmission } from "@/lib/play-score";
import { useSessionSeed } from "@/lib/session-seed";
import {
  MAX_SCORE,
  TARGETS,
  TRACK_MAX,
  TRACK_MIN,
  TRACK_START,
  TRACK_STEP,
  percent,
  verdict,
} from "@/lib/tracking";
import { ActionBar } from "./ActionBar";
import { Btn } from "./Btn";
import { IconLock, IconReset } from "./icons";
import type { GameProps } from "./types";

/** Where a tracking value sits along the slider, 0 to 1. */
const at = (em: number) => (em - TRACK_MIN) / (TRACK_MAX - TRACK_MIN);
/** The thumb is 20px wide, so a mark that lines up with it has to leave room for half of it at each end. */
const along = (em: number) => `calc(${at(em) * 100}% + ${10 - at(em) * 20}px)`;

/** One line of specimen text in a card, set at the given tracking. */
function Specimen({
  chip,
  mine,
  text,
  tracking,
  readout,
  children,
}: {
  chip: string;
  mine?: boolean;
  text: string | null;
  tracking: number;
  /** The number shown in the corner. The reference's stays hidden until the run is locked in. */
  readout: string;
  children?: ReactNode;
}) {
  return (
    <div className="border border-line bg-paper p-5 shadow-[0_1px_2px_rgb(42_48_53/0.05)] md:p-6">
      <div className="flex items-center justify-between gap-3">
        <span
          className={`inline-flex h-6 items-center px-2 text-[12px] font-medium ${mine ? "bg-ink text-paper" : "bg-accent-soft text-accent"}`}
        >
          {chip}
        </span>
        <span className="text-[12px] tabular-nums text-faint">{readout}</span>
      </div>
      {/* The tracking is a per cent of the size, so it looks the same at every size. Nothing wraps: a line that doesn't fit would hide the very thing being judged. */}
      <p
        className={`display mt-5 whitespace-nowrap text-[clamp(34px,6.4vw,60px)] font-semibold leading-[1.1] ${text === null ? "invisible" : ""}`}
        style={{ letterSpacing: `${tracking}em` }}
      >
        {text ?? "Typography"}
      </p>
      {children}
    </div>
  );
}

/**
 * The top line is set with a hidden letter-spacing. Slide the tracking of the bottom line until its
 * spacing feels the same. The words differ, so you can't just line up their ends: you judge the
 * rhythm of the gaps.
 */
export function TrackingGame({ difficulty, run, done, onFinish }: GameProps) {
  const seed = useSessionSeed();
  const pool = TARGETS[difficulty];
  // Walks the pool from a random start, so "Play again" never repeats a target until all have been seen.
  const target = seed === null ? null : pool[(seed + run) % pool.length];

  const [value, setValue] = useState(TRACK_START);
  const startedAt = useRef(0);

  useEffect(() => {
    if (target) startedAt.current = performance.now();
  }, [target]);

  const lock = () => {
    if (!target || done) return;
    const ms = Math.round(performance.now() - startedAt.current);
    const payload = { target: target.id, tracking: value };
    const scored = scoreSubmission("tracking", difficulty, payload, ms);
    if (!scored) return;
    onFinish({
      payload,
      ms,
      score: scored.score,
      outOf: MAX_SCORE,
      summary: `You set ${percent(value)} against ${percent(target.tracking)}, in ${(scored.aux / 1000).toFixed(1)}s. ${verdict(scored.score)}`,
    });
  };

  // Enter locks in, unless you're on a button, where Enter already means something. A slider counts as free.
  const lockFromKey = useEffectEvent(() => lock());
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLInputElement | null;
      const busy = t && (/^(BUTTON|TEXTAREA|SELECT|A)$/.test(t.tagName) || (t.tagName === "INPUT" && t.type !== "range"));
      if (e.key === "Enter" && !busy) lockFromKey();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="flex min-h-[500px] items-center justify-center px-5 pb-28 pt-8 md:px-8">
      <div className="flex w-full max-w-[720px] flex-col gap-4">
        <Specimen
          chip="Reference"
          text={target?.reference ?? null}
          tracking={target?.tracking ?? 0}
          readout={done && target ? percent(target.tracking) : "Hidden"}
        />

        <Specimen chip="You" mine text={target?.yours ?? null} tracking={value} readout={percent(value)}>
          <div className="relative mt-4">
            <input
              type="range"
              className="track-range"
              min={TRACK_MIN}
              max={TRACK_MAX}
              step={TRACK_STEP}
              value={value}
              disabled={done || !target}
              onChange={(e) => setValue(Number(e.target.value))}
              aria-label="Tracking, as a percentage of the font size"
              aria-valuetext={percent(value)}
            />
            {/* Zero is the type's own spacing. After locking in, a second mark shows where the reference was. */}
            <span aria-hidden="true" className="pointer-events-none absolute top-[3px] h-[18px] w-px bg-slot-line" style={{ left: along(0) }} />
            {done && target && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-0 h-6 w-0.5 bg-accent"
                style={{ left: along(target.tracking) }}
              />
            )}
          </div>
          <div className="mt-1 flex justify-between text-[11px] tabular-nums text-faint" aria-hidden="true">
            <span>{percent(TRACK_MIN)}</span>
            <span style={{ marginLeft: `${at(0) * 100 - 14}%` }}>0</span>
            <span className="ml-auto">{percent(TRACK_MAX)}</span>
          </div>
        </Specimen>
      </div>

      {!done && (
        <ActionBar>
          <Btn look="ghost" icon={<IconReset />} onClick={() => setValue(TRACK_START)}>
            Reset
          </Btn>
          <Btn look="primary" icon={<IconLock />} onClick={lock} disabled={!target}>
            Lock in
          </Btn>
        </ActionBar>
      )}
    </div>
  );
}
