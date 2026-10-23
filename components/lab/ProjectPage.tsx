import type { Project } from "@/content/types";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { MediaSlot } from "@/components/ui/MediaSlot";

/** A cover with the name under it and the category and year beside it, like the work grid, only smaller. */
function Card({ item, cta, priority }: { item: Project; cta: string; priority: boolean }) {
  const body = (
    <>
      <div className="overflow-hidden">
        <MediaSlot
          media={item.media}
          ratio="16 / 10"
          sizes="(min-width: 1328px) 400px, (min-width: 1024px) 31vw, (min-width: 640px) 50vw, 100vw"
          priority={priority}
          className="transition-transform duration-500 ease-out-expo group-hover:scale-[1.015]"
        />
      </div>
      <div className="mt-3.5 flex flex-wrap items-baseline justify-between gap-x-5 gap-y-0.5">
        <h2 className="display flex items-center gap-1.5 text-[18px] font-medium leading-[26px] tracking-[-0.1px] transition-colors group-hover:text-accent">
          {item.name}
          {item.href && (
            <ArrowIcon className="size-3.5 -rotate-45 transition-transform duration-300 ease-out-quart group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          )}
        </h2>
        <p className="text-[14px] text-muted">
          {item.category}
          <span aria-hidden="true"> · </span>
          <span className="sr-only">, </span>
          <span className="tabular-nums">{item.year}</span>
        </p>
      </div>
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

/**
 * The page behind both /lab and /apps: a label, one line at subtitle size, then a grid of covers.
 * The content comes from content/lab.ts and content/apps.ts.
 */
export function ProjectPage({
  eyebrow,
  heading,
  items,
  cta,
}: {
  eyebrow: string;
  heading: string;
  items: Project[];
  /** The cursor's label over a card that opens somewhere, e.g. "Open site". */
  cta: string;
}) {
  return (
    <div className="mx-auto max-w-page px-6 pb-28 pt-14 md:pt-20">
      <p className="text-base font-medium text-accent">{eyebrow}</p>
      <h1 className="mt-2 max-w-[36em] text-pretty text-copy-lg text-ink">{heading}</h1>

      <ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10">
        {items.map((item, i) => (
          // The first row is on screen from the start, so only the rows below fade in.
          <li key={item.name} className={i > 2 ? "reveal" : ""}>
            <Card item={item} cta={cta} priority={i === 0} />
          </li>
        ))}
      </ul>
    </div>
  );
}
