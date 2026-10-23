"use client";

import { useEffect, useEffectEvent } from "react";
import { Trophy, type Place } from "./Trophy";

const WORD: Record<Place, string> = { 1: "1st place", 2: "2nd place", 3: "3rd place" };

/**
 * A quick full-panel splash for a score that lands in the top three. It clears itself after
 * a couple of seconds, or on a click or Escape.
 */
export function Splash({ place, score, where, onDone }: { place: Place; score: number; where: string; onDone: () => void }) {
  // The timer must not restart when the parent re-renders, so it reads the latest onDone through an effect event.
  const finish = useEffectEvent(() => onDone());
  useEffect(() => {
    const id = setTimeout(() => finish(), 2200);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && finish();
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(id);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div
      role="status"
      onClick={onDone}
      className="splash absolute inset-0 z-30 flex cursor-pointer flex-col items-center justify-center gap-3 bg-paper/90 px-6 text-center"
    >
      <Trophy place={place} className="splash-trophy size-24" />
      <p className="display splash-text text-[clamp(36px,6vw,56px)] font-semibold leading-none tracking-[-0.02em]">
        {WORD[place]}
      </p>
      <p className="splash-text text-[15px] text-muted">
        {where} · <span className="tabular-nums text-ink">{score}</span>
      </p>
    </div>
  );
}
