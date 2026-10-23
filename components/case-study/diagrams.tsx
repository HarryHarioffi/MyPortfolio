import { Fragment, type CSSProperties } from "react";
import type { CaseStudy } from "@/content/types";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { InView } from "./InView";

/*
 * Drawn diagrams for the ideas a screenshot can't show on its own. Each one enters in order
 * when it scrolls into view (see InView), so the reading order is also the build order.
 */

/** Stagger position for the entrance. */
const at = (i: number) => ({ "--i": i }) as CSSProperties;

/**
 * The product's core idea as an equation: the parts in a row with their signs, the result in
 * the accent colour, then what each part means, in the same order underneath.
 */
export function ModelDiagram({ model, label }: { model: NonNullable<CaseStudy["model"]>; label?: string }) {
  const n = model.parts.length;
  return (
    <InView className="flex flex-col gap-px border border-line bg-line">
      <div className="flex flex-col gap-6 bg-canvas px-5 pb-8 pt-5 sm:gap-8 sm:px-8 sm:pb-12">
      {label && <p className="font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-muted">{label}</p>}
      <div
        className="flex flex-col items-stretch gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-3"
        role="img"
        aria-label={`${model.parts.map((p, i) => `${i ? `${p.op === "−" ? "minus" : "plus"} ` : ""}${p.name}`).join(" ")} equals ${model.result.name}`}
      >
        {model.parts.map((p, i) => (
          <Fragment key={p.name}>
            {i > 0 && <Sign sign={p.op ?? "+"} i={i * 2 - 1} />}
            <span
              className="anim border border-line bg-paper px-4 py-3 text-center text-[16px] font-semibold text-ink"
              style={at(i * 2)}
            >
              {p.name}
            </span>
          </Fragment>
        ))}
        <Sign sign="=" i={n * 2 - 1} />
        <span className="anim-pop bg-accent px-5 py-3 text-center text-[16px] font-semibold text-paper" style={at(n * 2 + 1)}>
          {model.result.name}
        </span>
      </div>
      </div>
      <dl className={`grid gap-px bg-line ${n === 2 ? "sm:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4"}`}>
        {[...model.parts, model.result].map((p, i) => {
          const result = i === n;
          return (
            <div key={p.name} className="anim flex flex-col gap-1.5 bg-paper p-5" style={at(n * 2 + 2 + i)}>
              <dt className={`text-[14px] font-semibold ${result ? "text-accent" : "text-ink"}`}>{p.name}</dt>
              <dd className="text-pretty text-[14px] leading-[21px] text-body">{p.text}</dd>
            </div>
          );
        })}
      </dl>
    </InView>
  );
}

function Sign({ sign, i }: { sign: string; i: number }) {
  return (
    <span aria-hidden="true" className="anim-pop self-center text-[24px] font-medium leading-none text-accent" style={at(i)}>
      {sign}
    </span>
  );
}

/** What the work moved away from and towards, a row per change: before, an arrow, after. */
export function ShiftList({ items }: { items: { from: string; to: string }[] }) {
  return (
    <InView className="flex flex-col gap-2">
      <div aria-hidden="true" className="hidden grid-cols-[1fr_48px_1fr] text-[13px] font-medium text-muted sm:grid">
        <span>Before</span>
        <span />
        <span>After</span>
      </div>
      <ul className="flex flex-col gap-2">
        {items.map((s, i) => (
          <li key={s.to} className="grid items-stretch sm:grid-cols-[1fr_48px_1fr]">
            <p className="anim bg-canvas px-5 py-4 text-pretty text-[15px] leading-[23px] text-muted" style={at(i * 2)}>
              <span className="sr-only">Before: </span>
              {s.from}
            </p>
            <span aria-hidden="true" className="anim-x flex items-center justify-center py-1.5 text-accent sm:py-0" style={at(i * 2 + 1)}>
              <ArrowIcon className="size-5 rotate-90 sm:rotate-0" />
            </span>
            <p
              className="anim bg-accent-soft px-5 py-4 text-pretty text-[15px] font-medium leading-[23px] text-ink"
              style={at(i * 2 + 1)}
            >
              <span className="sr-only">After: </span>
              {s.to}
            </p>
          </li>
        ))}
      </ul>
    </InView>
  );
}

/**
 * The main journey, numbered along a line that draws itself in. Across on wide screens, down
 * on phones. A small pulse then travels the line, so it reads as a path rather than a list.
 */
export function JourneyLine({ steps }: { steps: { title: string; text: string }[] }) {
  return (
    <InView as="ol" className="journey relative grid gap-7 md:gap-5" style={{ "--steps": steps.length } as CSSProperties}>
      <span aria-hidden="true" className="journey-track">
        <span className="anim-line journey-fill" />
        <span className="journey-pulse" />
      </span>
      {steps.map((s, i) => (
        <li key={s.title} className="relative flex gap-4 md:flex-col md:gap-5">
          <span
            className="anim-pop relative flex size-7 shrink-0 items-center justify-center bg-accent text-[13px] font-semibold tabular-nums text-paper"
            style={at(i * 2)}
          >
            {i + 1}
          </span>
          <div className="anim flex flex-col gap-1.5 md:pr-2" style={at(i * 2 + 1)}>
            <span className="text-[16px] font-semibold leading-[22px] text-ink">{s.title}</span>
            <span className="text-pretty text-[14px] leading-[21px] text-body">{s.text}</span>
          </div>
        </li>
      ))}
    </InView>
  );
}
