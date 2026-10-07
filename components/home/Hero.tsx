import Link from "next/link";
import type { CSSProperties } from "react";
import { home } from "@/content/home";
import { site } from "@/content/site";
import { resumeHref } from "@/lib/files";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { AgentCardDemo } from "./AgentCardDemo";
import { LocalTime } from "./LocalTime";

const stagger = (i: number) => ({ "--i": i }) as CSSProperties;

export function Hero() {
  const { hero, facts } = home;
  const resume = resumeHref();

  return (
    <section className="mx-auto max-w-[1440px] px-6 pb-16 pt-14 md:pt-20">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(420px,500px)] lg:items-center lg:gap-16">
        <div>
          <p className="rise flex items-center gap-2.5 text-base font-medium text-accent" style={stagger(0)}>
            <span className="pulse-dot relative size-2 rounded-full bg-accent text-accent" aria-hidden="true" />
            {hero.availability}
          </p>
          <h1
            className="display rise mt-7 max-w-[14ch] text-[clamp(38px,6.4vw,76px)] font-semibold leading-[1.06] tracking-[-0.025em]"
            style={stagger(1)}
          >
            {hero.headline}
          </h1>
          <p className="rise mt-7 max-w-[36em] text-pretty text-[19px] leading-[29px] text-body md:text-lede" style={stagger(2)}>
            {hero.subhead}
          </p>
          <div
            className="rise mt-9 flex flex-wrap items-center gap-x-8 gap-y-3 text-[17px] font-medium"
            style={stagger(3)}
          >
            <Link href="/#work" className="group inline-flex items-center gap-2 text-ink">
              <span className="link-draw">{hero.primaryCta}</span>
              <ArrowIcon className="transition-transform duration-300 ease-out-quart group-hover:translate-x-1" />
            </Link>
            {resume ? (
              <a href={resume} className="link-quiet text-muted hover:text-ink">
                Resume (PDF)
              </a>
            ) : (
              <a href={`mailto:${site.email}`} className="link-quiet text-muted hover:text-ink">
                Email me
              </a>
            )}
          </div>
        </div>

        <div className="rise" style={stagger(4)}>
          <AgentCardDemo />
        </div>
      </div>

      <dl className="mt-14 grid gap-x-10 gap-y-5 border-t border-line pt-7 sm:grid-cols-2 lg:grid-cols-4">
        {facts.map((f) => (
          <div key={f.label} className="flex flex-col gap-1">
            <dt className="text-[14px] font-medium text-muted">{f.label}</dt>
            <dd className="text-pretty text-copy text-ink">{f.value}</dd>
          </div>
        ))}
        <div className="flex flex-col gap-1">
          <dt className="text-[14px] font-medium text-muted">Based in</dt>
          <dd className="text-copy text-ink">
            {site.location} · <LocalTime timeZone={site.timeZone} />
          </dd>
        </div>
      </dl>
    </section>
  );
}
