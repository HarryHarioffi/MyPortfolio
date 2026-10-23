import Link from "next/link";
import type { CSSProperties } from "react";
import { caseStudies } from "@/content";
import { home } from "@/content/home";
import type { CaseStudy } from "@/content/types";
import { CoverArt } from "@/components/ui/CoverArt";
import { MediaSlot } from "@/components/ui/MediaSlot";

/** Case studies two to a row. */
const rows: CaseStudy[][] = [];
for (let i = 0; i < caseStudies.length; i += 2) rows.push(caseStudies.slice(i, i + 2));

/**
 * Each row's shape, set by its wide cover. Wide covers are 16:10 loops; narrow ones are cut to
 * the narrow column's own shape (about 1.43:1), so neither is cropped much.
 */
const ROW_RATIO = "16 / 10";

/**
 * Every case study as a cover with one line under it: the name, then what it is and the year.
 * The two covers in a row are nearly the same width, the wider one swapping sides each row,
 * so scrolling has a little rhythm without any cover looking minor. They share one height,
 * so the captions line up.
 */
export function WorkList() {
  return (
    <section id="work" className="mx-auto max-w-page px-6 pb-28">
      <h2 className="sr-only">{home.work.heading}</h2>
      <div className="flex flex-col gap-14 lg:gap-20">
        {rows.map((row, r) => (
          <div
            key={row[0].slug}
            className={`grid gap-14 md:grid-rows-[auto_auto] md:gap-x-8 md:gap-y-4 lg:gap-x-10 ${
              r % 2 === 0 ? "md:grid-cols-[1.12fr_1fr]" : "md:grid-cols-[1fr_1.12fr]"
            }`}
          >
            {row.map((study, i) => {
              // Even rows lead with the wider cover, odd rows end with it. A row of one is wide.
              const wide = row.length === 1 || i === r % 2;
              return (
                <article
                  key={study.slug}
                  // The first row peeks in under the intro, so it's there from the start, not faded in.
                  className={`md:row-span-2 md:grid md:grid-rows-subgrid ${r > 0 ? "reveal" : ""} ${
                    row.length === 1 ? "md:col-span-2" : ""
                  }`}
                >
                  {/* A real box (not display: contents), so the link can take keyboard focus and show its ring. */}
                  <Link
                    href={`/work/${study.slug}`}
                    data-cursor="Open case study"
                    data-cursor-icon="eye"
                    className="group block md:row-span-2 md:grid md:grid-rows-subgrid"
                  >
                    <div
                      className="overflow-hidden"
                      // On phones every cover stacks full width, so a narrow one keeps its own shape.
                      style={{ "--cover-ratio": `${study.overview.cover.width ?? 16} / ${study.overview.cover.height ?? 10}` } as CSSProperties}
                    >
                      <MediaSlot
                        media={study.overview.cover}
                        art={<CoverArt slug={study.slug} title={study.title} domain={study.card.domain} />}
                        // The wide cover sets the row's height; the narrow one fills it.
                        ratio={wide ? ROW_RATIO : undefined}
                        sizes="(min-width: 1328px) 660px, (min-width: 768px) 50vw, 100vw"
                        priority={r === 0}
                        className={`transition-transform duration-500 ease-out-expo group-hover:scale-[1.015] ${
                          wide ? "" : "max-md:aspect-[var(--cover-ratio)] md:h-full"
                        }`}
                      />
                    </div>
                    <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 md:mt-0">
                      <h3 className="display text-[22px] font-medium leading-[30px] tracking-[-0.1px] transition-colors group-hover:text-accent">
                        {study.title}
                      </h3>
                      <p className="text-[15px] text-muted">
                        {study.card.domain}
                        <span aria-hidden="true"> · </span>
                        <span className="sr-only">, </span>
                        <span className="tabular-nums">{study.year}</span>
                      </p>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
