import Link from "next/link";
import { caseStudies } from "@/content";
import type { CaseStudy } from "@/content/types";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { MediaSlot } from "@/components/ui/MediaSlot";

/** Each shape gets its own width and cover ratio, so the grid has rhythm instead of repeating. */
const shapes = {
  wide: { span: "md:col-span-12", ratio: "1200 / 620", offset: "", sizes: "(min-width: 1280px) 1392px, 100vw" },
  tall: { span: "md:col-span-5", ratio: "4 / 5", offset: "", sizes: "(min-width: 768px) 40vw, 100vw" },
  square: { span: "md:col-span-7", ratio: "1 / 1", offset: "md:mt-28", sizes: "(min-width: 768px) 55vw, 100vw" },
} as const;

function Card({ study, index }: { study: CaseStudy; index: number }) {
  const shape = shapes[study.card.shape];
  return (
    <article className={`reveal ${shape.span} ${shape.offset}`}>
      <Link
        href={`/work/${study.slug}`}
        className="group block rounded-[6px] outline-offset-8 transition-transform duration-200 ease-out-quart active:scale-[0.995]"
      >
        <div className="overflow-hidden rounded-[6px]">
          <MediaSlot
            media={study.overview.cover}
            ratio={shape.ratio}
            sizes={shape.sizes}
            priority={index === 0}
            className="transition-transform duration-500 ease-out-expo group-hover:scale-[1.015]"
          />
        </div>
        <div className="mt-5 flex items-start justify-between gap-6">
          <div className="max-w-[34em]">
            <h3 className="display text-[26px] font-medium leading-[34px] tracking-[-0.13px]">
              {study.title}
            </h3>
            <p className="mt-1.5 text-copy text-muted">{study.card.tagline}</p>
          </div>
          <div className="flex shrink-0 items-center gap-3 pt-1 text-[15px] font-medium text-muted">
            <span className="hidden sm:inline">
              {study.status}, {study.year}
            </span>
            <ArrowIcon className="text-ink transition-transform duration-300 ease-out-quart group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </article>
  );
}

export function WorkList() {
  return (
    <section id="work" className="mx-auto max-w-[1440px] px-6 pb-32">
      <div className="mb-14 flex items-end justify-between gap-6 border-b border-line pb-6">
        <h2 className="display text-[clamp(32px,4vw,40px)] font-medium leading-[1.2] tracking-[-0.6px]">
          Selected work
        </h2>
        <p className="text-[15px] font-medium text-muted">{caseStudies.length} case studies</p>
      </div>

      <div className="grid gap-x-10 gap-y-20 md:grid-cols-12">
        {caseStudies.map((study, i) => (
          <Card key={study.slug} study={study} index={i} />
        ))}

        <aside className="reveal flex flex-col justify-end md:col-span-7 md:pb-14">
          <p className="display max-w-[22ch] text-[28px] leading-[38px] tracking-[-0.14px]">
            Some of my best work is under NDA.
          </p>
          <p className="mt-4 max-w-[34em] text-copy-lg text-muted">
            I can walk you through it on a call, with the details changed. Just ask.
          </p>
        </aside>
      </div>
    </section>
  );
}
