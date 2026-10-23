import type { Metadata } from "next";
import { lab, type LabItem } from "@/content/lab";
import { site } from "@/content/site";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { MediaSlot } from "@/components/ui/MediaSlot";

export const metadata: Metadata = {
  title: "Lab",
  description: `Side projects by ${site.name}: apps being built and published, and smaller experiments.`,
};

/** A cover with the name and status · year under it, like the work grid, plus one line on what it is. */
function LabCard({ item, cta }: { item: LabItem; cta: string }) {
  const body = (
    <>
      <div className="overflow-hidden">
        <MediaSlot
          media={item.media}
          ratio="16 / 10"
          sizes="(min-width: 1328px) 640px, (min-width: 768px) 50vw, 100vw"
          className="transition-transform duration-500 ease-out-expo group-hover:scale-[1.015]"
        />
      </div>
      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h3 className="display flex items-center gap-2 text-[22px] font-medium leading-[30px] tracking-[-0.1px] transition-colors group-hover:text-accent">
          {item.name}
          {item.href && <ArrowIcon className="-rotate-45 transition-transform duration-300 ease-out-quart group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
        </h3>
        <p className="text-[15px] text-muted">
          {item.status && (
            <>
              {item.status}
              <span aria-hidden="true"> · </span>
              <span className="sr-only">, </span>
            </>
          )}
          <span className="tabular-nums">{item.year}</span>
        </p>
      </div>
      <p className="mt-1 max-w-[36em] text-pretty text-copy text-body">{item.blurb}</p>
    </>
  );

  return item.href ? (
    <a href={item.href} target="_blank" rel="noopener" data-cursor={cta} data-cursor-icon="eye" className="group block">
      {body}
    </a>
  ) : (
    <div>{body}</div>
  );
}

function Shelf({
  id,
  shelf,
  cta,
  wide = false,
}: {
  id: string;
  shelf: typeof lab.apps;
  cta: string;
  /** Two to a row instead of three. */
  wide?: boolean;
}) {
  return (
    <section aria-labelledby={id} className="reveal mt-20 md:mt-24">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h2 id={id} className="display text-[clamp(26px,3vw,32px)] font-medium leading-[1.2] tracking-[-0.3px]">
          {shelf.heading}
        </h2>
        <p className="text-[15px] text-muted">{shelf.note}</p>
      </div>
      {shelf.items.length > 0 ? (
        <ul className={`mt-8 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:gap-x-10 ${wide ? "" : "lg:grid-cols-3"}`}>
          {shelf.items.map((item) => (
            <li key={item.name}>
              <LabCard item={item} cta={cta} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="media-slot mt-8 flex min-h-40 items-center justify-center px-6 text-center text-[15px] font-medium text-body">
          {shelf.empty}
        </p>
      )}
    </section>
  );
}

/** Side projects: apps (each on its own subdomain) and smaller experiments. Content lives in content/lab.ts. */
export default function LabPage() {
  return (
    <div className="mx-auto max-w-page px-6 pb-28 pt-14 md:pt-20">
      <p className="text-base font-medium text-accent">Lab</p>
      <h1 className="display mt-6 max-w-[18ch] text-[clamp(38px,5.4vw,68px)] font-semibold leading-[1.06] tracking-[-0.025em]">
        {lab.heading}
      </h1>
      <p className="mt-6 max-w-[36em] text-pretty text-copy-lg text-body">{lab.intro}</p>

      <Shelf id="apps" shelf={lab.apps} cta="Open app" wide />
      <Shelf id="experiments" shelf={lab.experiments} cta="Open" />
    </div>
  );
}
