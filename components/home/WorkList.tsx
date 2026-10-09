import Link from "next/link";
import { caseStudies, FEATURED_COUNT } from "@/content";
import { home } from "@/content/home";
import type { CaseStudy } from "@/content/types";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { CoverArt } from "@/components/ui/CoverArt";
import { MediaSlot } from "@/components/ui/MediaSlot";

function CardText({ study, large = false }: { study: CaseStudy; large?: boolean }) {
  const { card } = study;
  return (
    <div className="max-w-[36em]">
      <p className="text-[14px] font-medium text-accent">{card.domain}</p>
      <h3
        className={`display mt-2 font-medium tracking-[-0.13px] ${
          large ? "text-[clamp(28px,3vw,40px)] leading-[1.15]" : "text-[26px] leading-[34px]"
        }`}
      >
        {study.title}
      </h3>
      <p className="mt-2 text-pretty text-copy text-body">{card.tagline}</p>
      <p className="mt-4 flex flex-wrap items-center gap-x-2 text-[14px] font-medium text-muted">
        <span>{card.contribution}</span>
        {card.team && <span aria-hidden="true">·</span>}
        {card.team && <span>{card.team}</span>}
        <ArrowIcon className="ml-1 text-ink transition-transform duration-300 ease-out-quart group-hover:translate-x-1" />
      </p>
    </div>
  );
}

export function WorkList() {
  const [lead, ...pair] = caseStudies.slice(0, FEATURED_COUNT);
  const more = caseStudies.slice(FEATURED_COUNT);

  return (
    <section id="work" className="mx-auto max-w-[1440px] px-6 pb-28">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b border-line pb-6">
        <h2 className="display text-[clamp(32px,4vw,40px)] font-medium leading-[1.2] tracking-[-0.6px]">
          {home.work.heading}
        </h2>
        <p className="max-w-[40em] text-[15px] text-muted">{home.work.subline}</p>
      </div>

      <div className="flex flex-col gap-16 lg:gap-24">
        {/* Lead project: text left, cover right, echoing the hero. */}
        <article className="reveal">
          <Link href={`/work/${lead.slug}`} data-cursor="Open case study" data-cursor-icon="eye" className="group grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
            <div className="overflow-hidden lg:col-span-8 lg:col-start-5 lg:row-start-1">
              <MediaSlot
                media={lead.overview.cover}
                art={<CoverArt slug={lead.slug} title={lead.title} domain={lead.card.domain} />}
                ratio="16 / 10"
                sizes="(min-width: 1024px) 915px, 100vw"
                priority
                className="transition-transform duration-500 ease-out-expo group-hover:scale-[1.015]"
              />
            </div>
            <div className="lg:col-span-4 lg:col-start-1 lg:row-start-1">
              <CardText study={lead} large />
            </div>
          </Link>
        </article>

        {/* Two side by side, wide then narrow, covers locked to one height. */}
        <div className="grid gap-16 md:grid-cols-12 md:gap-x-8 md:gap-y-6 lg:gap-x-10 md:grid-rows-[auto_auto]">
          {pair.map((study, i) => (
            <article
              key={study.slug}
              className={`reveal md:row-span-2 md:grid md:grid-rows-subgrid ${
                i === 0 ? "md:col-span-7 lg:col-span-8" : "md:col-span-5 lg:col-span-4"
              }`}
            >
              <Link href={`/work/${study.slug}`} data-cursor="Open case study" data-cursor-icon="eye" className="group contents">
                <div className="overflow-hidden">
                  <MediaSlot
                    media={study.overview.cover}
                    art={<CoverArt slug={study.slug} title={study.title} domain={study.card.domain} />}
                    ratio={i === 0 ? "16 / 10" : undefined}
                    sizes={i === 0 ? "(min-width: 768px) 60vw, 100vw" : "(min-width: 768px) 35vw, 100vw"}
                    className={`transition-transform duration-500 ease-out-expo group-hover:scale-[1.015] ${
                      i === 1 ? "max-md:aspect-[4/3] md:h-full" : ""
                    }`}
                  />
                </div>
                <div className="mt-5 md:mt-0">
                  <CardText study={study} />
                </div>
              </Link>
            </article>
          ))}
        </div>

        {more.length > 0 && (
          <div className="reveal">
            <h3 className="pb-4 text-[15px] font-medium text-muted">{home.work.moreHeading}</h3>
            <ul className="border-t border-line">
              {more.map((study) => (
                <li key={study.slug}>
                  <Link
                    href={`/work/${study.slug}`}
                    data-cursor="Open case study" data-cursor-icon="eye"
                    className="group grid items-baseline gap-x-10 gap-y-1 border-b border-line py-6 md:grid-cols-12"
                  >
                    <span className="display text-[24px] leading-[30px] tracking-[-0.12px] transition-colors group-hover:text-accent md:col-span-4">
                      {study.title}
                    </span>
                    <span className="text-pretty text-copy text-muted md:col-span-6">{study.card.tagline}</span>
                    <span className="hidden items-center justify-end gap-2 text-[14px] font-medium text-muted md:col-span-2 md:flex">
                      {study.card.domain}
                      <ArrowIcon className="text-ink transition-transform duration-300 ease-out-quart group-hover:translate-x-1" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
