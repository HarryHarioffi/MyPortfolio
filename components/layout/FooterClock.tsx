"use client";

import { useEffect, useState } from "react";

const fmt = (timeZone?: string) =>
  new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone });

/**
 * "■ 20:23 IST · 10:53 your time". The second half only shows when the visitor's clock differs,
 * read from the browser's own time zone, no lookup. The server renders a placeholder so
 * hydration never mismatches.
 */
export function FooterClock({ timeZone }: { timeZone: string }) {
  const [now, setNow] = useState<{ mine: string; yours: string | null } | null>(null);

  useEffect(() => {
    const visitorZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const tick = () => {
      const d = new Date();
      const mine = fmt(timeZone).format(d);
      const yours = fmt(visitorZone).format(d);
      setNow({ mine, yours: yours === mine ? null : yours });
    };
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, [timeZone]);

  return (
    <p className="flex items-center gap-2.5 tabular-nums">
      {/* The small square with a slow pulse: a sign of life, nothing more. */}
      <span aria-hidden="true" className="pulse-dot relative size-2 bg-accent text-accent" />
      <span>
        {now?.mine ?? "--:--"} IST
        {now?.yours && <> · {now.yours} your time</>}
      </span>
    </p>
  );
}
