import Link from "next/link";
import { site } from "@/content/site";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { LocalTime } from "./LocalTime";
import { Specimen } from "./Specimen";

const facts = [
  { label: "Now", value: "Design engineer at The Cloud Company" },
  { label: "Where", value: null },
  { label: "Open to", value: "Full-time roles and a few select projects" },
] as const;

export function Hero() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 pb-24 pt-16 md:pt-24">
      <div className="grid gap-14 lg:grid-cols-[1fr_380px] lg:items-end lg:gap-20">
        <div>
          <p className="rise text-base font-medium text-accent" style={{ "--i": 0 } as React.CSSProperties}>
            {site.name}, {site.role.toLowerCase()}
          </p>
          <h1
            className="display rise mt-8 max-w-[15ch] text-[clamp(40px,7vw,76px)] font-semibold leading-[1.08] tracking-[-0.025em]"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            I design enterprise and AI products, and I build what I design.
          </h1>
          <p
            className="rise mt-8 max-w-[34em] text-lede text-body"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            I work from the first sketch to the shipped React component, so the thing that was
            designed is the thing that ships.
          </p>
          <div
            className="rise mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-[17px] font-medium"
            style={{ "--i": 3 } as React.CSSProperties}
          >
            <Link href="/#work" className="group inline-flex items-center gap-2 text-ink">
              <span className="link-draw">See the work</span>
              <ArrowIcon className="transition-transform duration-300 ease-out-quart group-hover:translate-x-1" />
            </Link>
            <a href={`mailto:${site.email}`} className="link-draw text-muted hover:text-ink">
              Say hello
            </a>
          </div>
        </div>

        <div className="rise" style={{ "--i": 4 } as React.CSSProperties}>
          <Specimen />
        </div>
      </div>

      <dl className="mt-20 grid gap-8 border-t border-line pt-7 sm:grid-cols-3 sm:gap-10">
        {facts.map((f) => (
          <div key={f.label} className="flex flex-col gap-1.5">
            <dt className="text-[14px] font-medium text-muted">{f.label}</dt>
            <dd className="text-copy text-ink">
              {f.value ?? (
                <>
                  {site.location}, <LocalTime timeZone={site.timeZone} />
                </>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
