"use client";

import { useEffect, useState } from "react";

/** Live local time. Renders a stable placeholder on the server so hydration never mismatches. */
export function LocalTime({ timeZone }: { timeZone: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, [timeZone]);

  return (
    <span className="tabular-nums" suppressHydrationWarning>
      {time ?? "--:--"} IST
    </span>
  );
}
