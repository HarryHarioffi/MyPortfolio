"use client";

import { useState, type CSSProperties } from "react";
import { SelectionFrame } from "@/components/ui/SelectionFrame";

type View = "legal" | "stage";

/**
 * The name as a design specimen: the legal name by default (what the resume says),
 * with a toggle that backspaces it and types the stage name in its place.
 */
export function NameSpecimen({ legal, stage, eyebrow }: { legal: string; stage: string; eyebrow: string }) {
  const [view, setView] = useState<View>("legal");
  // Bumps on every toggle, so the caret restarts. Zero means "first load": no caret.
  const [swaps, setSwaps] = useState(0);

  const choose = (v: View) => {
    if (v === view) return;
    setView(v);
    setSwaps((n) => n + 1);
  };

  const layer = (text: string, v: View) => {
    const shown = view === v;
    const letters = text.replace(/\s/g, "").length;
    const diff = legal.replace(/\s/g, "").length - letters;
    const label =
      v === "legal" ? `Name / Legal · ${letters} letters` : `Name / Stage · ${letters} letters (−${diff})`;
    return (
      <SelectionFrame
        label={label}
        className="col-start-1 row-start-1 justify-self-start"
        chromeClassName={`motion-safe:transition-opacity motion-safe:duration-200 ${
          shown ? "opacity-100 motion-safe:delay-150" : "opacity-0"
        }`}
      >
        <span data-shown={shown} aria-hidden="true" className="block whitespace-nowrap">
          {[...text].map((ch, i) => (
            <span key={i} className="name-letter" style={{ "--i": i, "--n": text.length } as CSSProperties}>
              {ch}
            </span>
          ))}
          {shown && swaps > 0 && (
            <span
              key={swaps}
              className="name-caret ml-[0.03em] inline-block h-[0.78em] w-[0.05em] translate-y-[0.06em] bg-accent opacity-0"
            />
          )}
        </span>
      </SelectionFrame>
    );
  };

  return (
    <figure className="w-full">
      {/* Toolbar row: the page label on the left, the switch pinned top right. It never moves. */}
      <div className="flex items-center justify-between gap-4">
        <p className="text-base font-medium text-accent" aria-hidden="true">
          {eyebrow}
        </p>
        <div role="group" aria-label="Which name" className="flex bg-chip p-0.5 text-[14px] font-medium text-muted">
          {(["legal", "stage"] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => choose(v)}
              aria-pressed={view === v}
              className={`h-8 px-3 capitalize transition-colors duration-150 ${
                view === v ? "bg-paper text-ink shadow-[0_1px_2px_rgb(42_48_53/0.12)]" : "hover:text-ink"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <div className="display mt-8 grid pt-8 text-[clamp(40px,10.4vw,132px)] font-semibold leading-none tracking-[-0.03em]">
        {layer(legal, "legal")}
        {layer(stage, "stage")}
      </div>

      <figcaption className="mt-5 text-[14px] text-muted">Same person, two views.</figcaption>
      <p className="sr-only" aria-live="polite">
        {swaps > 0 ? `Showing ${view} name, ${view === "legal" ? legal : stage}` : ""}
      </p>
    </figure>
  );
}
