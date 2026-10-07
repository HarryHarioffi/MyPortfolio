"use client";

import { useEffect, useId, useRef, useState } from "react";
import { SelectionFrame } from "@/components/ui/SelectionFrame";

/**
 * A made-up agent card, shown the way a designer sees it and the way an engineer does.
 * Both views render from the same props, so changing the access level in the design view
 * changes the code view too. Nothing here is from a real product.
 */

const LEVELS = ["view", "edit", "manage"] as const;
type Level = (typeof LEVELS)[number];

const agent = {
  name: "Research agent",
  purpose: "Answers launch questions",
  sources: ["Launch notes", "FAQ"],
  team: "Design team",
};

type Token = { t: string; k?: "tag" | "prop" | "str" | "punct" };

/** The JSX for the current props, as highlighted tokens. Kept under 40 characters a line. */
function codeLines(level: Level): Token[][] {
  const prop = (name: string, value: Token[]): Token[] => [
    { t: "  " },
    { t: name, k: "prop" },
    { t: "=", k: "punct" },
    ...value,
  ];
  const str = (s: string): Token => ({ t: `"${s}"`, k: "str" });
  return [
    [{ t: "<", k: "punct" }, { t: "AgentCard", k: "tag" }],
    prop("name", [str(agent.name)]),
    prop("purpose", [str(agent.purpose)]),
    prop("sources", [
      { t: "{[", k: "punct" },
      str(agent.sources[0]),
      { t: ", ", k: "punct" },
      str(agent.sources[1]),
      { t: "]}", k: "punct" },
    ]),
    prop("team", [str(agent.team)]),
    prop("level", [str(level)]),
    [{ t: "/>", k: "punct" }],
  ];
}

const tokenColor = {
  tag: "text-[#9fd3d0]",
  prop: "text-[#c9dfe0]",
  str: "text-paper",
  punct: "text-[#8c979e]",
} as const;

export function AgentCardDemo() {
  const [view, setView] = useState<"design" | "code">("design");
  const [level, setLevel] = useState<Level>("view");
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const id = useId();

  // Measure the card after mount, so the label always tells the truth and never mismatches on hydration.
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setSize({ w: Math.round(el.offsetWidth), h: Math.round(el.offsetHeight) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const nextLevel = () => setLevel((l) => LEVELS[(LEVELS.indexOf(l) + 1) % LEVELS.length]);
  const lines = codeLines(level);

  const tab = (v: "design" | "code") => (
    <button
      key={v}
      role="tab"
      id={`${id}-tab-${v}`}
      aria-selected={view === v}
      aria-controls={`${id}-panel-${v}`}
      onClick={() => setView(v)}
      className={`h-8 rounded-[5px] px-3 capitalize transition-colors duration-150 ${
        view === v ? "bg-paper text-ink shadow-[0_1px_2px_rgb(42_48_53/0.12)]" : "text-muted hover:text-ink"
      }`}
    >
      {v}
    </button>
  );

  return (
    <figure className="w-full">
      <div className="overflow-hidden rounded-xl border border-line bg-paper">
        <div className="flex h-12 items-center justify-between border-b border-line pl-4 pr-1.5">
          <span className="flex items-center gap-2 font-mono text-[12px] text-muted">
            <span className="size-2 rounded-[2px] bg-accent" aria-hidden="true" />
            AgentCard.tsx
          </span>
          <div role="tablist" aria-label="View" className="flex rounded-md bg-chip p-0.5 text-[13px] font-medium">
            {tab("design")}
            {tab("code")}
          </div>
        </div>

        <div className="grid [&>*]:col-start-1 [&>*]:row-start-1">
          <div
            role="tabpanel"
            id={`${id}-panel-design`}
            aria-labelledby={`${id}-tab-design`}
            inert={view !== "design"}
            className={`dot-grid flex min-h-[300px] items-center justify-center px-6 pb-8 pt-12 motion-safe:transition-[opacity,transform] motion-safe:duration-300 motion-safe:ease-out-quart ${
              view === "design" ? "opacity-100" : "translate-y-1 opacity-0"
            }`}
          >
            <SelectionFrame label={size ? `AgentCard · ${size.w} × ${size.h}` : "AgentCard"}>
              <div
                ref={cardRef}
                className="w-[272px] max-w-full rounded-[10px] border border-line bg-paper p-5 text-left shadow-[0_1px_2px_rgb(42_48_53/0.06)]"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-accent-soft text-accent" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 1.5l1.6 4.2 4.2 1.6-4.2 1.6L8 13.1 6.4 8.9 2.2 7.3l4.2-1.6L8 1.5z" fill="currentColor" />
                    </svg>
                  </span>
                  <div className="min-w-0">
                    <p className="text-[15px] font-semibold leading-5 text-ink">{agent.name}</p>
                    <p className="text-[13px] leading-5 text-muted">{agent.purpose}</p>
                  </div>
                </div>
                <dl className="mt-4 grid gap-3 border-t border-line pt-4 text-[13px]">
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-muted">Sources</dt>
                    <dd className="flex gap-1.5">
                      {agent.sources.map((s) => (
                        <span key={s} className="rounded-[4px] bg-chip px-1.5 py-0.5 text-body">
                          {s}
                        </span>
                      ))}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-muted">Access</dt>
                    <dd className="flex items-center gap-2">
                      <span className="text-ink">{agent.team}</span>
                      <button
                        onClick={nextLevel}
                        aria-label={`Access level: can ${level}. Change it`}
                        className="inline-flex h-7 items-center gap-1 rounded-[5px] bg-accent-soft px-2 font-medium text-accent transition-transform duration-150 ease-out-quart active:scale-[0.96]"
                      >
                        Can {level}
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                          <path d="M2.5 4l2.5 2.5L7.5 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </dd>
                  </div>
                </dl>
              </div>
            </SelectionFrame>
          </div>

          <div
            role="tabpanel"
            id={`${id}-panel-code`}
            aria-labelledby={`${id}-tab-code`}
            inert={view !== "code"}
            className={`flex min-h-[300px] items-center bg-ink py-6 motion-safe:transition-[opacity,transform] motion-safe:duration-300 motion-safe:ease-out-quart ${
              view === "code" ? "opacity-100" : "-translate-y-1 opacity-0"
            }`}
          >
            <pre className="m-0 w-full overflow-x-auto font-mono text-[12.5px] leading-6">
              <code>
                {lines.map((line, i) => (
                  <span
                    key={i}
                    className={`flex pr-5 ${i === lines.length - 2 ? "bg-[rgb(159_211_208/0.12)]" : ""}`}
                  >
                    <span className="w-10 shrink-0 select-none pr-4 text-right text-[#5d6a72]" aria-hidden="true">
                      {i + 1}
                    </span>
                    <span className="whitespace-pre">
                      {line.map((tok, j) => (
                        <span key={j} className={tok.k ? tokenColor[tok.k] : undefined}>
                          {tok.t}
                        </span>
                      ))}
                    </span>
                  </span>
                ))}
              </code>
            </pre>
          </div>
        </div>
      </div>

      <figcaption className="mt-3 flex items-start justify-between gap-4 text-[14px] leading-[21px] text-muted">
        <span className="text-pretty">
          A made-up agent card. Both views render from the same props: change the access, then check the code.
        </span>
        {level !== "view" && (
          <button onClick={() => setLevel("view")} className="link-quiet shrink-0 font-medium text-ink">
            Reset
          </button>
        )}
      </figcaption>
      <p className="sr-only" aria-live="polite">
        Access is now can {level}.
      </p>
    </figure>
  );
}
