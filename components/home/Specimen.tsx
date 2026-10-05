"use client";

import { useState } from "react";

const code = `<button
  className="h-11 rounded-md bg-accent
    px-5 font-medium text-white
    transition-transform active:scale-[0.97]"
>
  Review request
</button>`;

/**
 * A button, shown the way a designer sees it and the way an engineer sees it.
 * The point of the job in one small interaction: same thing, two views.
 */
export function Specimen() {
  const [view, setView] = useState<"design" | "code">("design");

  return (
    <figure className="w-full">
      <div className="media-slot relative flex h-[260px] items-center justify-center overflow-hidden">
        <div
          className={`absolute inset-0 flex items-center justify-center transition-[opacity,transform] duration-300 ease-out-quart ${
            view === "design" ? "opacity-100" : "pointer-events-none translate-y-1 opacity-0"
          }`}
          aria-hidden={view !== "design"}
        >
          <div className="relative">
            <span className="absolute -top-6 left-0 whitespace-nowrap font-sans text-[12px] font-medium text-accent">
              Button / Primary · 44 × 132
            </span>
            <span className="absolute -inset-[5px] border border-accent" aria-hidden="true">
              {["-left-[3px] -top-[3px]", "-right-[3px] -top-[3px]", "-bottom-[3px] -left-[3px]", "-bottom-[3px] -right-[3px]"].map((p) => (
                <i key={p} className={`absolute size-[6px] border border-accent bg-paper ${p}`} />
              ))}
            </span>
            <button
              tabIndex={view === "design" ? 0 : -1}
              className="h-11 rounded-md bg-accent px-5 text-[15px] font-medium text-paper transition-transform duration-150 ease-out-quart active:scale-[0.97]"
            >
              Review request
            </button>
          </div>
        </div>

        <pre
          className={`absolute inset-0 m-0 flex items-center overflow-x-auto bg-ink px-6 font-mono text-[13px] leading-6 text-slot transition-[opacity,transform] duration-300 ease-out-quart ${
            view === "code" ? "opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
          }`}
          aria-hidden={view !== "code"}
        >
          <code>{code}</code>
        </pre>
      </div>

      <figcaption className="mt-3 flex items-center justify-between text-[14px] text-muted">
        <span>Same component, two views.</span>
        <div role="group" aria-label="View" className="flex rounded-md bg-chip p-0.5 font-medium">
          {(["design", "code"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              aria-pressed={view === v}
              className={`rounded-[5px] px-3 py-1 capitalize transition-colors duration-150 ${
                view === v ? "bg-paper text-ink shadow-[0_1px_2px_rgb(42_48_53/0.12)]" : "hover:text-ink"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </figcaption>
    </figure>
  );
}
