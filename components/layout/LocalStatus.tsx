"use client";

import { useEffect, useState } from "react";

/** What I'm probably doing at a given hour in my time zone. A guess, and it says so. */
function mood(hour: number): { text: string; awake: boolean } {
  if (hour >= 9 && hour < 19) return { text: "probably at my desk", awake: true };
  if (hour >= 19 && hour < 23) return { text: "probably watching an anime", awake: true };
  if (hour >= 6 && hour < 9) return { text: "probably up early", awake: true };
  return { text: "probably asleep, I'll reply in the morning", awake: false };
}

const fmt = (timeZone?: string) =>
  new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone });

/**
 * "● 16:58 in Tamil Nadu · probably at my desk · 12:28 for you". Uses the browser's own
 * time zone, no lookup. The server renders a neutral placeholder so hydration never mismatches.
 */
export function LocalStatus({ timeZone, place }: { timeZone: string; place: string }) {
  const [now, setNow] = useState<{ mine: string; yours: string | null; hour: number } | null>(null);

  useEffect(() => {
    const visitorZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const tick = () => {
      const d = new Date();
      const mine = fmt(timeZone).format(d);
      const yours = fmt(visitorZone).format(d);
      setNow({ mine, yours: yours === mine ? null : yours, hour: Number(mine.slice(0, 2)) });
    };
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, [timeZone]);

  const m = now ? mood(now.hour) : null;

  return (
    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px] text-muted">
      <span
        aria-hidden="true"
        className={`relative size-2 rounded-full ${m?.awake === false ? "bg-faint" : "pulse-dot bg-accent text-accent"}`}
      />
      <span className="font-medium tabular-nums text-ink">{now?.mine ?? "--:--"}</span>
      <span>in {place}</span>
      {m && <span>· {m.text}</span>}
      {now?.yours && (
        <span>
          · <span className="tabular-nums">{now.yours}</span> for you
        </span>
      )}
    </p>
  );
}
