"use client";

import { useEffect, useId, useRef, useState } from "react";
import { IconHelp } from "./icons";

/**
 * A "How to play" button that opens a short card under it. It floats over the page rather than
 * pushing it down, never blocks the game, and closes on a click elsewhere or Escape.
 */
export function HowToPlay({ title, steps }: { title: string; steps: readonly string[] }) {
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => {
      if (!box.current?.contains(e.target as Node)) setOpen(false);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", away);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("pointerdown", away);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);

  return (
    <div ref={box} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex h-8 items-center gap-2 whitespace-nowrap px-2.5 text-[13px] font-medium transition-colors sm:px-3 ${
          open ? "bg-ink text-paper" : "bg-paper text-ink shadow-[0_0_0_1px_var(--color-line)] hover:bg-canvas"
        }`}
      >
        <IconHelp size={16} />
        <span className="max-sm:sr-only">How to play</span>
      </button>
      {open && (
        <div
          id={id}
          className="how-in absolute right-0 top-full z-40 mt-2 w-[min(360px,calc(100vw-48px))] border border-line bg-paper p-5 shadow-[0_18px_40px_rgb(20_28_40/0.16)]"
        >
          <p className="display text-[18px] font-medium leading-[24px]">{title}</p>
          <ol className="mt-3 space-y-3 text-[14px] leading-[21px] text-body">
            {steps.map((s, i) => (
              <li key={s} className="flex gap-3">
                <span className="flex size-5 shrink-0 items-center justify-center bg-accent-soft text-[12px] font-semibold tabular-nums text-accent">
                  {i + 1}
                </span>
                {s}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
