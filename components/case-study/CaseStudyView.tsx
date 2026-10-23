import Link from "next/link";
import type { ReactNode } from "react";
import { getNextCaseStudy, getSections } from "@/content";
import type { CaseStudy } from "@/content/types";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { CoverArt } from "@/components/ui/CoverArt";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { JourneyLine, ModelDiagram, ShiftList } from "./diagrams";
import { AnnotatedFigure, Figure } from "./Figure";
import { SectionIndex } from "./SectionIndex";
import { slots } from "./slots";

/*
 * One calm column, read top to bottom. Every section has a small label and a heading, but the
 * heading changes with the job it does: a statement, a two-part "…but" pair for the problem,
 * a question and its answer for discovery, big numerals for decisions, a light bridge line
 * into the solution. Figures share the text's width, so the page never jumps between grids.
 */

const FIGURE_SIZES = "(min-width: 1280px) 880px, 100vw";

const H2_CLASS =
  "display max-w-[30ch] text-balance text-[clamp(26px,2.6vw,34px)] font-medium leading-[1.22] tracking-[-0.4px] text-ink";

/** A section: its label, then either a plain statement heading (`title`) or a custom one. */
function Section({
  id,
  eyebrow,
  title,
  heading,
  children,
}: {
  id: string;
  eyebrow: string;
  title?: string;
  heading?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className="reveal flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <p className="text-[14px] font-medium text-accent">{eyebrow}</p>
        {heading ?? (title && <h2 className={H2_CLASS}>{title}</h2>)}
      </div>
      {children}
    </section>
  );
}

/** A small mono label, the kind printed on a diagram or a strip of figures. */
function Tag({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-muted ${className}`}>{children}</p>;
}

/** The second half of a two-part heading, "…but", in a lighter weight so the pair reads as one sentence. */
function Turn({ children }: { children: string }) {
  return (
    <h3 className="display max-w-[32ch] text-balance text-[clamp(26px,2.6vw,34px)] font-light leading-[1.22] tracking-[-0.4px] text-ink">
      <span className="text-accent">…</span>
      {children}
    </h3>
  );
}

/** A lighter line that carries the reader from a heading into what follows. */
function Bridge({ children }: { children: ReactNode }) {
  return (
    <p className="display max-w-[44ch] text-balance text-[clamp(20px,2vw,24px)] font-light leading-[1.4] text-body">{children}</p>
  );
}

function P({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`max-w-[66ch] text-pretty text-[17px] leading-[28px] text-body ${className}`}>{children}</p>;
}

/** A sub-heading inside a section: a decision, a detail, a reflection. */
function H3({ children }: { children: ReactNode }) {
  return (
    <h3 className="display text-balance text-[clamp(21px,2vw,24px)] font-medium leading-[1.3] tracking-[-0.2px] text-ink">
      {children}
    </h3>
  );
}

/** A subsection: a small label over a heading, with its own anchor for the index. */
function Sub({ id, label, title, children }: { id?: string; label: string; title?: string; children: ReactNode }) {
  return (
    <div id={id} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <span className="text-[13px] font-medium text-muted">{label}</span>
        {title && <H3>{title}</H3>}
      </div>
      {children}
    </div>
  );
}

function Overview({ c }: { c: CaseStudy }) {
  const { overview: o } = c;
  const meta = [
    { label: "Role", value: o.snapshot.role },
    { label: "Timeline", value: o.snapshot.timeline },
    { label: "Team", value: o.snapshot.team },
    { label: "Skills", value: o.snapshot.skills.join(", ") },
  ];
  const glance = [
    { label: "Problem", value: o.glance.problem },
    { label: "What I did", value: o.glance.did },
    { label: "Result", value: o.glance.result },
  ];

  return (
    <section id="overview" className="flex flex-col gap-10">
      <MediaSlot
        media={o.cover}
        // Covers come in two shapes, made for their slot on the home page; show each whole.
        ratio={o.cover.width && o.cover.height ? `${o.cover.width} / ${o.cover.height}` : "16 / 10"}
        priority
        controls
        sizes={FIGURE_SIZES}
        art={<CoverArt slug={c.slug} title={c.title} domain={c.card.domain} />}
      />

      <div className="flex flex-col gap-5">
        <p className="text-[14px] font-medium text-accent">
          {c.title} <span aria-hidden="true">·</span> {c.status} {c.year}
        </p>
        <h1 className="display max-w-[22ch] text-balance text-[clamp(32px,4.4vw,52px)] font-semibold leading-[1.08] tracking-[-0.02em] text-ink">
          {o.hook}
        </h1>
        <p className="max-w-[60ch] text-pretty text-[19px] leading-[30px] text-body">{o.summary}</p>
      </div>

      <dl className="grid gap-x-8 gap-y-5 border-y border-line py-6 sm:grid-cols-2 lg:grid-cols-4">
        {meta.map((m) => (
          <div key={m.label} className="flex flex-col gap-1">
            <dt className="text-[13px] font-medium text-muted">{m.label}</dt>
            <dd className="text-[15px] leading-[22px] text-ink">{slots(m.value)}</dd>
          </div>
        ))}
      </dl>

      <div className="flex flex-col gap-4">
        <p className="text-[14px] font-medium text-accent">My role</p>
        {o.mission && (
          <p className="display max-w-[30ch] text-balance text-[clamp(24px,2.6vw,32px)] font-light leading-[1.28] tracking-[-0.3px] text-ink">
            {o.mission}
          </p>
        )}
        <P>{slots(o.snapshot.myPart)}</P>
      </div>

      <dl className="grid gap-px border border-line bg-line sm:grid-cols-3">
        {glance.map((g) => (
          <div key={g.label} className="flex flex-col gap-2 bg-paper p-5">
            <dt className="text-[13px] font-medium text-accent">{g.label}</dt>
            <dd className="text-pretty text-[15px] leading-[23px] text-body">{slots(g.value)}</dd>
          </div>
        ))}
      </dl>

      {o.nda && <p className="text-[13px] text-muted">{o.nda}</p>}
    </section>
  );
}

function Problem({ c }: { c: CaseStudy }) {
  const p = c.problem;
  return (
    <Section id="problem" eyebrow="Problem" title={p.lead}>
      <P>{slots(p.body)}</P>
      {p.turn && <Turn>{p.turn}</Turn>}
      <P>{slots(p.stakes)}</P>
      {p.media && <Figure media={p.media} ratio="1200 / 520" sizes={FIGURE_SIZES} />}
      {c.users && (
        <div id="users" className="flex flex-col gap-4">
          <Tag>Who it&rsquo;s for</Tag>
          <ul className={`grid gap-px border border-line bg-line ${c.users.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}>
            {c.users.map((u) => (
              <li key={u.role} className="flex flex-col gap-1.5 bg-paper p-5">
                <span className="text-[15px] font-semibold text-ink">{u.role}</span>
                <span className="text-pretty text-[15px] leading-[23px] text-body">{u.need}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {c.shifts && (
        <Sub id="shift" label="What had to change" title={c.shifts.lead}>
          <ShiftList items={c.shifts.items} />
        </Sub>
      )}
    </Section>
  );
}

function Discovery({ c }: { c: CaseStudy }) {
  const d = c.discovery;
  if (!d) return null;
  return (
    <Section
      id="discovery"
      eyebrow="Discovery"
      title={d.lead}
      heading={
        d.question && (
          <div className="flex flex-col gap-5">
            <h2 className={H2_CLASS}>{d.question}</h2>
            <p className="display max-w-[42ch] border-l-2 border-accent pl-5 text-[clamp(19px,1.9vw,23px)] font-light leading-[1.42] text-body">
              {d.lead}
            </p>
          </div>
        )
      }
    >
      <P>{slots(d.method)}</P>
      <dl className="flex flex-col border-t border-line">
        {d.constraints.map((k) => (
          <div key={k.label} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[140px_1fr] sm:gap-6">
            <dt className="text-[15px] font-semibold text-ink">{k.label}</dt>
            <dd className="text-pretty text-[15px] leading-[23px] text-body">{k.text}</dd>
          </div>
        ))}
      </dl>
      {d.media && <Figure media={d.media} ratio="1200 / 440" sizes={FIGURE_SIZES} />}
    </Section>
  );
}

function Model({ c }: { c: CaseStudy }) {
  const m = c.model;
  if (!m) return null;
  return (
    <Section id="model" eyebrow="Core idea" title={m.lead}>
      {m.body && <P>{slots(m.body)}</P>}
      <ModelDiagram model={m} label={m.label} />
    </Section>
  );
}

/** Older versions and tries from the Figma archive: a figure with its note beside it. */
function ExplorationList({ items }: { items: NonNullable<CaseStudy["explorations"]>["items"] }) {
  return (
    <ol className="flex flex-col gap-12">
      {items.map((it, i) => (
        <li key={it.title} className="grid gap-4 md:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] md:items-end md:gap-8">
          <Figure media={it.media} showCaption={false} sizes="(min-width: 1280px) 560px, (min-width: 768px) 60vw, 100vw" />
          <div className="flex flex-col gap-2 md:pb-1">
            <Tag>{String(i + 1).padStart(2, "0")}</Tag>
            <h4 className="text-[17px] font-semibold leading-[24px] text-ink">{it.title}</h4>
            <p className="text-pretty text-[15px] leading-[23px] text-body">{it.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function Options({ c }: { c: CaseStudy }) {
  const o = c.options;
  const ex = c.explorations;
  if (!o && !ex) return null;
  return (
    <Section id="options" eyebrow="Exploration" title={o?.lead ?? ex?.lead}>
      {!o && ex?.body && <P>{ex.body}</P>}
      {o && (
      <div className={`grid gap-12 ${o.items.length === 2 ? "sm:grid-cols-2" : "md:grid-cols-3"} sm:gap-8`}>
        {o.items.map((opt) => {
          const chosen = opt.verdict === "chosen";
          return (
            <div key={opt.name} className="flex flex-col gap-4">
              <Figure media={opt.media ?? { alt: "Sketch or screen" }} showCaption={false} sizes="(min-width: 768px) 440px, 100vw" />
              <div className="flex flex-col gap-2">
                <h3 className="text-[18px] font-semibold leading-[25px] text-ink">
                  <span className={chosen ? "text-accent" : "text-muted"}>{chosen ? "Chosen:" : "Dropped:"}</span> {opt.name}
                </h3>
                <p className="text-pretty text-[15px] leading-[23px] text-body">{opt.what}</p>
                <p className="text-pretty text-[15px] leading-[23px] text-muted">
                  <span className="font-medium text-ink">{chosen ? "Why it won: " : "Why not: "}</span>
                  {slots(opt.why)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      )}
      {ex &&
        (o ? (
          <Sub id="explorations" label="Along the way" title={ex.lead}>
            {ex.body && <P>{ex.body}</P>}
            <ExplorationList items={ex.items} />
          </Sub>
        ) : (
          <ExplorationList items={ex.items} />
        ))}
    </Section>
  );
}

function Decisions({ c }: { c: CaseStudy }) {
  const d = c.decisions;
  if (!d) return null;
  return (
    <Section id="decisions" eyebrow="Decisions" title={d.lead}>
      <ol className="flex flex-col gap-16">
        {d.items.map((item, i) => (
          <li key={item.title} id={`decision-${i + 1}`} className="flex flex-col gap-6">
            <div className="grid gap-3 sm:grid-cols-[84px_1fr] sm:gap-6">
              <span aria-hidden="true" className="display decision-numeral text-[56px] leading-[0.9] text-faint tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex min-w-0 flex-col gap-4">
                <H3>
                  <span className="sr-only">Decision {i + 1}: </span>
                  {item.title}
                </H3>
                <P>{slots(item.body)}</P>
              </div>
            </div>
            {item.media && <Figure media={item.media} sizes={FIGURE_SIZES} />}
          </li>
        ))}
      </ol>
    </Section>
  );
}

function Solution({ c }: { c: CaseStudy }) {
  const s = c.solution;
  return (
    <Section id="solution" eyebrow="Solution" title={s.lead}>
      <Bridge>{s.walkthrough}</Bridge>

      {c.journey && (
        <Sub id="journey" label="End to end" title={c.journey.lead}>
          <JourneyLine steps={c.journey.steps} />
        </Sub>
      )}

      {s.annotated &&
        (s.annotated.media.src ? (
          <AnnotatedFigure media={s.annotated.media} notes={s.annotated.notes} />
        ) : (
          <div className="flex flex-col gap-6">
            <MediaSlot media={s.annotated.media} ratio="16 / 9" sizes={FIGURE_SIZES} />
            <ol className="grid gap-4 sm:grid-cols-2">
              {s.annotated.notes.map((note, i) => (
                <li key={note} className="flex gap-3.5 text-[15px] leading-[23px] text-body">
                  <span className="mt-px flex size-6 shrink-0 items-center justify-center bg-accent text-[13px] font-semibold text-paper">
                    {i + 1}
                  </span>
                  <span>{note}</span>
                </li>
              ))}
            </ol>
          </div>
        ))}

      {s.flow && <Figure media={s.flow} ratio="16 / 9" sizes={FIGURE_SIZES} />}

      {s.details && (
        <div className="mt-6 flex flex-col gap-16">
          {s.details.map((d, i) => (
            <Sub key={d.title} id={`detail-${i + 1}`} label={d.label} title={d.title}>
              <P>{d.body}</P>
              <Figure media={d.media} sizes={FIGURE_SIZES} />
            </Sub>
          ))}
        </div>
      )}

      {s.reuse && <P className="text-muted">{slots(s.reuse)}</P>}
    </Section>
  );
}

function BeforeAfter({ c }: { c: CaseStudy }) {
  const b = c.beforeAfter;
  if (!b) return null;
  return (
    <Section id="change" eyebrow="Before and after" title={b.lead}>
      <P>{b.body}</P>
      <div className="flex flex-col gap-3">
        <Tag>Before</Tag>
        <Figure media={b.before} sizes={FIGURE_SIZES} />
      </div>
      <div className="flex flex-col gap-3">
        <Tag className="text-accent">After</Tag>
        <Figure media={b.after} sizes={FIGURE_SIZES} />
      </div>
    </Section>
  );
}

function Screens({ c }: { c: CaseStudy }) {
  const g = c.gallery;
  if (!g) return null;
  return (
    <Section id="screens" eyebrow="More screens" title={g.lead}>
      {g.body && <P>{g.body}</P>}
      <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2">
        {g.items.map((m) => (
          <Figure key={m.src ?? m.alt} media={m} showCaption={false} sizes="(min-width: 768px) 440px, 100vw" />
        ))}
      </div>
    </Section>
  );
}

function Outcome({ c }: { c: CaseStudy }) {
  const o = c.outcome;
  return (
    <Section id="outcome" eyebrow="Outcome" title={o.lead}>
      {o.expected && (
        <P className="text-muted">
          These are the effects the design was built for, not measured results. Next to each is the signal that would
          show it.
        </P>
      )}
      <ul className="flex flex-col border-t border-line">
        {o.results.map((r) => (
          <li key={r.metric} className="grid gap-2 border-b border-line py-5 md:grid-cols-[1fr_1fr] md:gap-8">
            <p className="text-pretty text-[18px] font-medium leading-[27px] text-ink">{slots(r.metric)}</p>
            <p className="text-pretty text-[15px] leading-[23px] text-muted">
              {o.expected ? "What would show it: " : "How it was measured: "}
              {slots(r.how)}
            </p>
          </li>
        ))}
      </ul>

      {o.quote && (
        <blockquote className="flex flex-col gap-4 border-l-2 border-accent pl-6">
          <p className="display text-pretty text-[24px] leading-[34px] text-ink">{slots(o.quote.text)}</p>
          <footer className="text-[15px] text-muted">{slots(o.quote.by)}</footer>
          {o.quote.note && <P>{o.quote.note}</P>}
        </blockquote>
      )}
    </Section>
  );
}

function Reflection({ c }: { c: CaseStudy }) {
  const r = c.reflection;
  return (
    <Section id="reflection" eyebrow="Reflection">
      <div className="grid gap-10 sm:grid-cols-2 sm:gap-8">
        <div className="flex flex-col gap-2">
          <H3>What did I learn?</H3>
          <P>{r.learned}</P>
        </div>
        <div className="flex flex-col gap-2">
          <H3>What would I change?</H3>
          <P>{r.different}</P>
        </div>
      </div>
    </Section>
  );
}

function Next({ c }: { c: CaseStudy }) {
  const next = getNextCaseStudy(c.slug);
  return (
    <Link
      href={`/work/${next.slug}`}
      data-cursor="Open case study"
      data-cursor-icon="eye"
      className="group flex items-end justify-between gap-6 border-t border-line pt-10"
    >
      <div>
        <p className="text-[14px] font-medium text-muted">Next case study</p>
        <p className="display mt-2 text-[clamp(28px,4vw,40px)] font-medium leading-[1.2] tracking-[-0.6px]">
          {next.title}
        </p>
      </div>
      <ArrowIcon className="mb-2 size-6 text-ink transition-transform duration-300 ease-out-quart group-hover:translate-x-1.5" />
    </Link>
  );
}

export function CaseStudyView({ study }: { study: CaseStudy }) {
  const sections = getSections(study);
  return (
    <div className="mx-auto grid max-w-page gap-0 px-6 pb-32 pt-10 lg:grid-cols-[165px_1fr] lg:gap-[27px]">
      <SectionIndex items={sections} />
      <div className="mx-auto flex w-full min-w-0 max-w-[880px] flex-col gap-28 lg:gap-36">
        <Overview c={study} />
        <Problem c={study} />
        <Discovery c={study} />
        <Model c={study} />
        <Options c={study} />
        <Decisions c={study} />
        <Solution c={study} />
        <BeforeAfter c={study} />
        <Screens c={study} />
        <Outcome c={study} />
        <Reflection c={study} />
        <Next c={study} />
      </div>
    </div>
  );
}
