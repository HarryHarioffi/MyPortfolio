import Link from "next/link";
import { getNextCaseStudy, getSections } from "@/content";
import type { CaseStudy } from "@/content/types";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { SectionIndex } from "./SectionIndex";
import { Block, Copy, Lead, Row } from "./parts";

function Overview({ c }: { c: CaseStudy }) {
  const { overview: o } = c;
  const snap = [
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
      <p className="text-base font-medium text-accent">
        {c.title}, {c.status.toLowerCase()} {c.year}
      </p>
      <h1 className="display max-w-[1040px] text-[clamp(38px,6vw,76px)] font-semibold leading-[1.08] tracking-[-0.025em]">
        {o.hook}
      </h1>
      <p className="max-w-[720px] text-lede text-body">{o.summary}</p>
      {o.nda && <p className="text-[14px] text-muted">{o.nda}</p>}

      <MediaSlot media={o.cover} ratio="1200 / 620" priority />

      <div className="flex flex-col gap-6 border-t border-line py-7 font-medium">
        <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {snap.map((s) => (
            <div key={s.label} className="flex flex-col gap-1.5">
              <dt className="text-[14px] text-muted">{s.label}</dt>
              <dd className="text-copy text-ink">{s.value}</dd>
            </div>
          ))}
        </dl>
        <dl className="flex flex-col gap-1.5">
          <dt className="text-[14px] text-muted">My part</dt>
          <dd className="max-w-[720px] text-copy text-ink">{o.snapshot.myPart}</dd>
        </dl>
      </div>

      <Row label="At a glance">
        <dl className="flex flex-col gap-7 text-copy">
          {glance.map((g) => (
            <div key={g.label} className="grid gap-1 sm:grid-cols-[120px_1fr] sm:gap-6">
              <dt className="font-semibold text-ink">{g.label}</dt>
              <dd className="text-body">{g.value}</dd>
            </div>
          ))}
        </dl>
      </Row>
    </section>
  );
}

function Problem({ c }: { c: CaseStudy }) {
  const p = c.problem;
  return (
    <Block id="problem">
      <Row label="Problem">
        <Lead>{p.lead}</Lead>
        <Copy className="mt-10">{p.body}</Copy>
        <Copy className="mt-6">{p.stakes}</Copy>
      </Row>
      {p.media && <MediaSlot media={p.media} ratio="1200 / 520" />}
    </Block>
  );
}

function Discovery({ c }: { c: CaseStudy }) {
  const d = c.discovery;
  if (!d) return null;
  return (
    <Block id="discovery">
      <Row label="Discovery">
        <Lead>{d.lead}</Lead>
        <Copy className="mt-8">{d.method}</Copy>
        <div className="mt-10">
          <h3 className="text-[17px] font-semibold text-ink">What limited the options</h3>
          <dl className="mt-4 flex flex-col gap-4 text-copy">
            {d.constraints.map((k) => (
              <div key={k.label} className="grid gap-1 sm:grid-cols-[120px_1fr] sm:gap-6">
                <dt className="font-medium text-ink">{k.label}</dt>
                <dd className="text-body">{k.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Row>
      {d.media && <MediaSlot media={d.media} ratio="1200 / 440" />}
    </Block>
  );
}

function Options({ c }: { c: CaseStudy }) {
  const o = c.options;
  if (!o) return null;
  return (
    <Block id="options">
      <Row label="Options">
        <Lead>{o.lead}</Lead>
      </Row>
      <div className="flex flex-col gap-14">
        {o.items.map((opt, i) => {
          const chosen = opt.verdict === "chosen";
          return (
            <div key={opt.name} className="grid gap-6 md:grid-cols-[420px_1fr] md:gap-12">
              <MediaSlot
                media={opt.media ?? { alt: "Sketch or screen" }}
                ratio="420 / 270"
                sizes="(min-width: 768px) 420px, 100vw"
              />
              <div className="flex flex-col gap-3.5 pt-1">
                <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2">
                  <h3 className="display text-[26px] font-medium tracking-[-0.13px]">
                    Option {String.fromCharCode(65 + i)}: {opt.name}
                  </h3>
                  <span
                    className={`rounded-[4px] px-2.5 py-1 text-[13px] font-medium ${
                      chosen ? "bg-accent-soft text-accent" : "bg-chip text-muted"
                    }`}
                  >
                    {chosen ? "Chosen" : "Rejected"}
                  </span>
                </div>
                <p className="max-w-[560px] text-copy text-muted">What it was: {opt.what}</p>
                <p className="max-w-[560px] text-copy text-muted">
                  {chosen ? "Why it won" : "Why it did not work"}: {opt.why}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Block>
  );
}

function Decisions({ c }: { c: CaseStudy }) {
  const d = c.decisions;
  if (!d) return null;
  return (
    <Block id="decisions">
      <Row label="Decisions">
        <Lead>{d.lead}</Lead>
        <div className="mt-8 flex flex-col gap-9">
          {d.items.map((item) => (
            <div key={item.title} className="flex flex-col gap-2.5">
              <h3 className="display max-w-[760px] text-[24px] font-medium leading-[30px] tracking-[-0.12px]">
                {item.title}
              </h3>
              <p className="max-w-[700px] text-copy-lg text-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </Row>
    </Block>
  );
}

function Solution({ c }: { c: CaseStudy }) {
  const s = c.solution;
  return (
    <Block id="solution">
      <Row label="Solution">
        <Lead>{s.lead}</Lead>
        <Copy className="mt-8">{s.walkthrough}</Copy>
      </Row>

      {s.annotated && (
        <div className="grid gap-8 md:grid-cols-[1fr_332px] md:gap-12">
          <MediaSlot media={s.annotated.media} ratio="820 / 600" sizes="(min-width: 768px) 820px, 100vw" />
          <ol className="flex flex-col gap-7">
            {s.annotated.notes.map((note, i) => (
              <li key={note} className="flex gap-3.5 text-copy text-body">
                <span className="mt-px flex size-6 shrink-0 items-center justify-center rounded-full bg-accent text-[13px] font-semibold text-paper">
                  {i + 1}
                </span>
                <span>{note}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {s.flow && <MediaSlot media={s.flow} ratio="1200 / 560" />}

      {s.reuse && (
        <Row label="Reuse">
          <Copy>{s.reuse}</Copy>
        </Row>
      )}
    </Block>
  );
}

function Outcome({ c }: { c: CaseStudy }) {
  const o = c.outcome;
  return (
    <Block id="outcome">
      <Row label="Outcome">
        <Lead>{o.lead}</Lead>
      </Row>

      <ul>
        {o.results.map((r) => (
          <li
            key={r.metric}
            className="grid gap-2 border-b border-line py-7 md:grid-cols-[1fr_592px] md:gap-12"
          >
            <p className="display text-[26px] font-medium leading-[34px] tracking-[-0.13px]">
              {r.metric}
            </p>
            <p className="text-copy text-muted">How it was measured: {r.how}</p>
          </li>
        ))}
      </ul>

      {o.quote && (
        <Row label="In their words">
          <blockquote>
            <p className="display max-w-[820px] text-[28px] leading-[38px] tracking-[-0.14px]">
              {o.quote.text}
            </p>
            <footer className="mt-7 text-[15px] text-muted">{o.quote.by}</footer>
            {o.quote.note && <Copy className="mt-6 text-copy-lg">{o.quote.note}</Copy>}
          </blockquote>
        </Row>
      )}
    </Block>
  );
}

function Reflection({ c }: { c: CaseStudy }) {
  const r = c.reflection;
  return (
    <Block id="reflection">
      <Row label="Reflection">
        <div className="flex flex-col gap-7">
          <div>
            <h3 className="text-[17px] font-semibold text-ink">What I learned</h3>
            <Copy className="mt-1.5">{r.learned}</Copy>
          </div>
          <div>
            <h3 className="text-[17px] font-semibold text-ink">What I would do differently</h3>
            <Copy className="mt-1.5">{r.different}</Copy>
          </div>
        </div>
      </Row>
    </Block>
  );
}

function Next({ c }: { c: CaseStudy }) {
  const next = getNextCaseStudy(c.slug);
  return (
    <Link
      href={`/work/${next.slug}`}
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
    <div className="mx-auto grid max-w-[1440px] gap-0 px-6 pb-32 pt-10 lg:grid-cols-[165px_1fr] lg:gap-[27px]">
      <SectionIndex items={sections} />
      <div className="flex min-w-0 flex-col gap-24 lg:gap-32">
        <Link href="/#work" className="text-[14px] font-medium text-muted hover:text-ink lg:hidden">
          <span aria-hidden="true">←</span> Back
        </Link>
        <Overview c={study} />
        <Problem c={study} />
        <Discovery c={study} />
        <Options c={study} />
        <Decisions c={study} />
        <Solution c={study} />
        <Outcome c={study} />
        <Reflection c={study} />
        <Next c={study} />
      </div>
    </div>
  );
}
