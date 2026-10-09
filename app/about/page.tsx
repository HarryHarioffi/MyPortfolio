import type { Metadata } from "next";
import Link from "next/link";
import { about } from "@/content/about";
import { site } from "@/content/site";
import { resumeHref } from "@/lib/files";
import { NameSpecimen } from "@/components/about/NameSpecimen";
import { Copy, Lead, Row } from "@/components/case-study/parts";
import { LocalTime } from "@/components/home/LocalTime";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

export const metadata: Metadata = {
  title: `About ${site.legalName}`,
  description: `${site.legalName} (${site.name}) is a design engineer at ${site.company}, based in ${site.location}, designing AI and enterprise products in Figma and React.`,
};

type Entry = { role: string; place: string; time: string; note?: string };

/** Role · place on the left, dates on the right, an optional note underneath. */
function Timeline({ items, className = "" }: { items: readonly Entry[]; className?: string }) {
  return (
    <ul className={`border-t border-line ${className}`}>
      {items.map((e) => (
        <li key={`${e.role}-${e.time}`} className="border-b border-line py-5">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <span className="display text-[24px] font-medium leading-[30px] tracking-[-0.12px]">
              {e.role}
              <span className="text-muted"> · {e.place}</span>
            </span>
            <span className="text-copy tabular-nums text-muted">{e.time}</span>
          </div>
          {e.note && <p className="mt-2 max-w-[44em] text-pretty text-copy text-body">{e.note}</p>}
        </li>
      ))}
    </ul>
  );
}

export default function AboutPage() {
  const { name, intro, glance, whatIDo, workingWithMe, experience, offTheClock } = about;
  const resume = resumeHref();

  return (
    <>
      <div className="mx-auto max-w-[1440px] px-6 pb-28 pt-14 md:pt-20">
        <h1 className="sr-only">
          {site.legalName}, also known as {site.name}
        </h1>
        <NameSpecimen legal={name.legal} stage={name.stage} eyebrow="About" />

        <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,34em)_minmax(0,27em)] lg:justify-between lg:gap-16">
          <p className="text-pretty text-lede text-ink">{intro.lede}</p>
          <div className="flex flex-col gap-4 text-copy text-body">
            <p className="text-pretty">{intro.stageName}</p>
            <p>
              {intro.official} Say it <span className="whitespace-nowrap font-medium text-ink">{name.pronunciation}</span>.
            </p>
          </div>
        </div>

        <dl className="mt-14 grid gap-x-10 gap-y-5 border-t border-line pt-7 sm:grid-cols-2 lg:grid-cols-4">
          {glance.map((g) => (
            <div key={g.label} className="flex flex-col gap-1">
              <dt className="text-[14px] font-medium text-muted">{g.label}</dt>
              <dd className="text-pretty text-copy text-ink">{g.value}</dd>
            </div>
          ))}
          <div className="flex flex-col gap-1">
            <dt className="text-[14px] font-medium text-muted">Based in</dt>
            <dd className="text-copy text-ink">
              {site.location} · <LocalTime timeZone={site.timeZone} />
            </dd>
          </div>
        </dl>

        <div className="mt-28 flex flex-col gap-24 lg:mt-32 lg:gap-32">
          <section className="reveal">
            <Row label="What I do">
              <Lead>{whatIDo.lede}</Lead>
              {whatIDo.body.map((p) => (
                <Copy key={p.slice(0, 24)} className="mt-6 text-copy-lg">
                  {p}
                </Copy>
              ))}
              <div className="mt-8 flex flex-wrap gap-x-7 gap-y-2 text-[15px] font-medium">
                {[
                  { label: "StrataAI", href: "/work/strata-ai" },
                  { label: "ERP Procurement", href: "/work/erp-procurement" },
                ].map((l) => (
                  <Link key={l.href} href={l.href} data-cursor="Open case study" data-cursor-icon="eye" className="group inline-flex items-center gap-2 text-ink">
                    <span className="link-quiet">{l.label}</span>
                    <ArrowIcon className="transition-transform duration-300 ease-out-quart group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </Row>
          </section>

          <section className="reveal">
            <Row label="Working with me">
              <p className="max-w-[40em] text-pretty text-copy-lg text-body">{workingWithMe.lead}</p>
              <dl className="mt-8 border-t border-line">
                {workingWithMe.rows.map((r) => (
                  <div key={r.label} className="grid gap-1 border-b border-line py-5 sm:grid-cols-[160px_1fr] sm:gap-6">
                    <dt className="text-[15px] font-medium text-ink">{r.label}</dt>
                    <dd className="max-w-[44em] text-pretty text-copy text-body">{r.text}</dd>
                  </div>
                ))}
              </dl>
            </Row>
          </section>

          <section className="reveal">
            <Row label="Experience">
              <Timeline items={experience} />
              <h3 className="mt-10 text-[14px] font-medium text-muted">Education</h3>
              <Timeline items={about.education} className="mt-3" />
              <dl className="mt-8 grid gap-6 text-copy">
                <div className="grid gap-1 sm:grid-cols-[160px_1fr] sm:gap-6">
                  <dt className="font-medium text-ink">Recent work</dt>
                  <dd className="max-w-[44em] text-pretty text-body">{about.recentWork}</dd>
                </div>
                <div className="grid gap-1 sm:grid-cols-[160px_1fr] sm:gap-6">
                  <dt className="font-medium text-ink">Toolkit</dt>
                  <dd className="text-body">{about.toolkit}</dd>
                </div>
                {resume && (
                  <div className="grid gap-1 sm:grid-cols-[160px_1fr] sm:gap-6">
                    <dt className="font-medium text-ink">Full history</dt>
                    <dd>
                      <a href={resume} className="link-quiet text-ink">
                        Resume (PDF)
                      </a>
                    </dd>
                  </div>
                )}
              </dl>
            </Row>
          </section>

          <section className="reveal">
            <Row label="Off the clock">
              <ul className="flex flex-wrap gap-2.5">
                {offTheClock.interests.map((t) => (
                  <li
                    key={t}
                    className="display border border-line bg-paper px-5 py-2 text-[clamp(20px,2.2vw,26px)] font-medium tracking-[-0.12px] transition-[transform,background-color] duration-200 ease-out-quart hover:-rotate-2 hover:bg-accent-soft"
                  >
                    {t}
                  </li>
                ))}
                <li className="display border border-dashed border-accent px-5 py-2 text-[clamp(20px,2.2vw,26px)] font-medium tracking-[-0.12px] text-accent">
                  Harry Potter, obviously
                </li>
              </ul>
              <p className="mt-6 text-copy-lg text-muted">{offTheClock.note}</p>
            </Row>
          </section>
        </div>
      </div>
    </>
  );
}
