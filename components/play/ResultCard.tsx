"use client";

import { useEffect, useRef } from "react";
import type { Difficulty } from "@/lib/leaderboard";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { Btn } from "./Btn";
import { IconReplay } from "./icons";
import { Trophy, type Place } from "./Trophy";
import type { Finish, Outcome } from "./types";

/** Floats over the bottom of the canvas once a run ends: the score, where it landed, and what to do next. */
export function ResultCard({
  finish,
  outcome,
  difficulty,
  shared,
  canPost,
  onPost,
  onAgain,
}: {
  finish: Finish;
  outcome: Outcome;
  difficulty: Difficulty;
  shared: boolean;
  /** A name has been typed, so the score can be posted. */
  canPost: boolean;
  onPost: () => void;
  onAgain: () => void;
}) {
  const level = difficulty[0].toUpperCase() + difficulty.slice(1);
  const where = shared ? level : `${level}, this device`;
  const needsPost = outcome.kind === "needs-name" || outcome.kind === "failed";

  // The result is the point of the run: if it sits below the fold, bring it into view.
  const box = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    box.current?.scrollIntoView({ block: "nearest", behavior: reduced ? "auto" : "smooth" });
  }, [reduced]);

  return (
    <div
      ref={box}
      role="status"
      className="result-in absolute inset-x-4 bottom-5 z-10 mx-auto flex max-w-[600px] flex-wrap items-center gap-x-6 gap-y-3 border border-line bg-paper px-5 py-4 shadow-[0_12px_32px_rgb(42_48_53/0.16)]"
    >
      <div className="min-w-0 flex-1 basis-48">
        <p className="display text-[40px] font-semibold leading-none tracking-[-0.02em] tabular-nums">
          {finish.score}
          <span className="text-[16px] font-medium tracking-normal text-muted"> / {finish.outOf}</span>
        </p>
        <p className="mt-2 text-pretty text-[13px] leading-[19px] text-muted">{finish.summary}</p>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="flex items-center gap-2 text-[14px] text-ink">
          {outcome.kind === "posting" && <span className="text-muted">Posting…</span>}
          {outcome.kind === "needs-name" && <span className="max-w-[16ch] text-muted">Add your name to post this.</span>}
          {outcome.kind === "failed" && <span className="max-w-[18ch] text-severity">{outcome.message}</span>}
          {outcome.kind === "posted" && (
            <>
              {outcome.rank !== null && outcome.rank <= 3 && <Trophy place={outcome.rank as Place} className="size-6" />}
              {outcome.improved ? (
                outcome.rank !== null ? (
                  <span>
                    <span className="font-medium tabular-nums">#{outcome.rank}</span> on {where}
                  </span>
                ) : (
                  <span className="text-muted">Posted</span>
                )
              ) : (
                <span className="text-muted">
                  Your best is <span className="tabular-nums text-ink">{outcome.best}</span>
                  {outcome.rank !== null && (
                    <>
                      , <span className="tabular-nums">#{outcome.rank}</span>
                    </>
                  )}
                </span>
              )}
            </>
          )}
        </p>
        <div className="flex gap-2">
          {needsPost && (
            <Btn onClick={onPost} disabled={!canPost}>
              {outcome.kind === "failed" ? "Try again" : "Post score"}
            </Btn>
          )}
          <Btn look="primary" icon={<IconReplay />} onClick={onAgain}>
            Play again
          </Btn>
        </div>
      </div>
    </div>
  );
}
