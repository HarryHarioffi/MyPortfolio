"use client";

import { useEffect, useEffectEvent, useRef, useState, type Ref } from "react";
import { copyText } from "@/lib/clipboard";
import { MAX_SCORE, START, TARGETS, css, gap, verdict, type Curve } from "@/lib/ease-match";
import { scoreSubmission } from "@/lib/play-score";
import { useSessionSeed } from "@/lib/session-seed";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { ActionBar } from "./ActionBar";
import { Btn } from "./Btn";
import { CurveEditor } from "./CurveEditor";
import { IconLock, IconPlay, IconReset } from "./icons";
import type { GameProps } from "./types";

/** One loop: the move (1.2s), a rest at the end, then back to the start. */
const LOOP_MS = 2400;
/** The rail's width less the square's own (3rem), as a transform. cqw is the rail, which is a size container. */
const END = "translateX(calc(100cqw - 3rem))";

const frames = (c: Curve): Keyframe[] => [
  { offset: 0, transform: "translateX(0)", easing: css(c) },
  { offset: 0.5, transform: END, easing: "linear" },
  { offset: 0.9, transform: END },
  { offset: 0.9, transform: "translateX(0)" },
  { offset: 1, transform: "translateX(0)" },
];

/** A card holding one rail. Faint outlines mark where the square starts and where it finishes. */
function Track({ who, marker, mine }: { who: string; marker: Ref<HTMLSpanElement>; mine?: boolean }) {
  return (
    <div className="border border-line bg-paper p-4 shadow-[0_1px_2px_rgb(42_48_53/0.05)]">
      <div className="flex items-center justify-between">
        <span
          className={`inline-flex h-6 items-center px-2 text-[12px] font-medium ${mine ? "bg-ink text-paper" : "bg-accent-soft text-accent"}`}
        >
          {who}
        </span>
        <span className="text-[12px] tabular-nums text-faint">1.2s</span>
      </div>
      <div className="@container relative mt-4 h-12">
        <span aria-hidden="true" className="absolute inset-x-0 top-1/2 h-px bg-line" />
        <span aria-hidden="true" className="absolute left-0 top-0 size-12 border border-dashed border-slot-line" />
        <span aria-hidden="true" className="absolute right-0 top-0 size-12 border border-dashed border-slot-line" />
        <span ref={marker} aria-hidden="true" className={`absolute left-0 top-0 size-12 ${mine ? "bg-ink" : "bg-accent"}`} />
      </div>
    </div>
  );
}

/**
 * Two squares loop side by side. The top one moves with a hidden easing curve; drag the handles
 * until the bottom one moves exactly the same, then lock in. One attempt, one score.
 */
export function EaseMatchGame({ difficulty, run, done, onFinish }: GameProps) {
  const seed = useSessionSeed();
  const pool = TARGETS[difficulty];
  // Walks the pool from a random start, so "Play again" never repeats a target until all have been seen.
  const target = seed === null ? null : pool[(seed + run) % pool.length];
  const reduced = useReducedMotion();

  const [curve, setCurve] = useState<Curve>(START);
  const [copied, setCopied] = useState(false);
  // Handlers that run between renders (a fast drag, a key held down) read the curve from here.
  const curveRef = useRef<Curve>(START);
  const targetEl = useRef<HTMLSpanElement>(null);
  const mineEl = useRef<HTMLSpanElement>(null);
  const loops = useRef<{ target: Animation; mine: Animation } | null>(null);
  const startedAt = useRef(0);

  // Both squares loop for as long as the game is open. Reduced motion gets no loop: they wait at the start for "Play".
  useEffect(() => {
    const t = targetEl.current;
    const m = mineEl.current;
    if (!target || !t || !m) return;
    const options: KeyframeAnimationOptions = { duration: LOOP_MS, iterations: reduced ? 1 : Infinity };
    const fromTarget = t.animate(frames(target.curve), options);
    const fromMine = m.animate(frames(curveRef.current), options);
    if (reduced) {
      fromTarget.pause();
      fromMine.pause();
    }
    loops.current = { target: fromTarget, mine: fromMine };
    startedAt.current = performance.now();
    return () => {
      fromTarget.cancel();
      fromMine.cancel();
      loops.current = null;
    };
  }, [target, reduced]);

  /** Takes a function of the latest curve, and re-keys the running loop in place so it never restarts or stutters. */
  const change = (update: (c: Curve) => Curve) => {
    const next = update(curveRef.current);
    curveRef.current = next;
    setCurve(next);
    const effect = loops.current?.mine.effect;
    if (effect instanceof KeyframeEffect) effect.setKeyframes(frames(next));
  };

  const playOnce = () => {
    for (const a of [loops.current?.target, loops.current?.mine]) {
      if (!a) continue;
      a.currentTime = 0;
      a.play();
    }
  };

  const lock = () => {
    if (!target || done) return;
    const ms = Math.round(performance.now() - startedAt.current);
    const payload = { target: target.id, curve: [...curveRef.current] };
    const scored = scoreSubmission("ease-match", difficulty, payload, ms);
    if (!scored) return;
    onFinish({
      payload,
      ms,
      score: scored.score,
      outOf: MAX_SCORE,
      summary: `${(gap(curveRef.current, target.curve) * 100).toFixed(1)}% off the target, in ${(scored.aux / 1000).toFixed(1)}s. ${verdict(scored.score)}`,
    });
  };

  // Enter locks in, unless you're on a button or in a field, where Enter already means something.
  const lockFromKey = useEffectEvent(() => lock());
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (e.key !== "Enter" || (t && /^(BUTTON|INPUT|TEXTAREA|SELECT|A)$/.test(t.tagName))) return;
      lockFromKey();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const copy = () => {
    if (!target) return;
    void copyText(css(target.curve)).then((ok) => {
      if (!ok) return;
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  };

  return (
    <div className="flex min-h-[500px] items-center justify-center px-5 pb-28 pt-8 md:px-8">
      <div className="grid w-full max-w-[860px] gap-6 md:grid-cols-[minmax(0,1fr)_280px] md:items-center md:gap-8">
        <div className="flex flex-col gap-4">
          <Track who="Target" marker={targetEl} />
          <Track who="You" marker={mineEl} mine />
          {done && target ? (
            <div className="pt-1">
              <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-[15px] font-medium text-ink">{target.name}</span>
                <code className="text-[13px] tabular-nums text-body">{css(target.curve)}</code>
                <button type="button" onClick={copy} className="link-quiet text-[13px] font-medium text-muted hover:text-ink">
                  {copied ? "Copied" : "Copy CSS"}
                </button>
              </p>
              <p className="mt-1 max-w-[34em] text-pretty text-[13px] leading-[19px] text-muted">{target.note}</p>
            </div>
          ) : (
            <p className="pt-1 text-[13px] text-muted">Drag the two handles until both squares move as one.</p>
          )}
        </div>

        <div className="border border-line bg-paper p-3 shadow-[0_1px_2px_rgb(42_48_53/0.05)]">
          <CurveEditor curve={curve} onChange={change} target={done ? target?.curve : undefined} locked={done} />
          <div className="mt-3 flex items-center justify-between gap-3 px-0.5">
            <span className="min-w-0 truncate text-[12px] text-muted">
              <span className="text-faint">cubic-bezier </span>
              <code className="tabular-nums text-body">{curve.join(", ")}</code>
            </span>
            {done && (
              <span className="flex shrink-0 gap-3 text-[12px] text-muted">
                <span className="flex items-center gap-1.5">
                  <span aria-hidden="true" className="h-0.5 w-3.5 bg-ink" />
                  You
                </span>
                <span className="flex items-center gap-1.5">
                  <span aria-hidden="true" className="h-0.5 w-3.5 bg-accent" />
                  Target
                </span>
              </span>
            )}
          </div>
        </div>
      </div>

      {!done && (
        <ActionBar>
          {reduced && (
            <Btn onClick={playOnce} icon={<IconPlay />}>
              Play
            </Btn>
          )}
          <Btn look="ghost" icon={<IconReset />} onClick={() => change(() => START)}>
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
