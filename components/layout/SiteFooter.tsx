import { about } from "@/content/about";
import { home } from "@/content/home";
import { profileLinks, site } from "@/content/site";
import { resumeHref } from "@/lib/files";
import { CopyEmail } from "./CopyEmail";
import { FooterHeading } from "./FooterHeading";
import { LocalStatus } from "./LocalStatus";

function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M6 14L14 6M7.5 6H14v6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * The close of every page: who to reach and how, in one light section.
 * Replaces the old dark contact band plus separate footer bar.
 */
export function SiteFooter() {
  const resume = resumeHref();
  const rows = [
    ...(resume ? [{ label: "Resume", detail: "PDF, one page", href: resume }] : []),
    ...profileLinks().map((l) => ({
      label: l.label,
      detail: new URL(l.href).pathname.replace(/\/$/, ""),
      href: l.href,
    })),
  ];

  return (
    <footer id="contact" className="border-t border-line">
      <div className="mx-auto max-w-[1440px] px-6 pt-16 md:pt-20">
        {/* Toolbar row, same pattern as /about: label left, live status right. */}
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <p className="text-base font-medium text-accent">Contact</p>
          <LocalStatus timeZone={site.timeZone} place={site.location.split(",")[0]} />
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <FooterHeading fallback={home.contact} about={about.sayHello} />
          </div>

          {rows.length > 0 && (
            <ul className="min-w-0 border-t border-line lg:col-span-5">
              {rows.map((r) => (
                <li key={r.label}>
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noopener"
                    className="group relative flex items-center justify-between gap-4 overflow-hidden border-b border-line px-1 py-4"
                  >
                    {/* A tint that wipes in from the left on hover. */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 origin-left scale-x-0 bg-canvas transition-transform duration-500 ease-out-expo group-hover:scale-x-100 group-focus-visible:scale-x-100"
                    />
                    <span className="relative flex min-w-0 items-baseline gap-4 transition-transform duration-300 ease-out-quart group-hover:translate-x-2">
                      <span className="display text-[24px] font-medium leading-[30px] tracking-[-0.12px]">{r.label}</span>
                      <span className="truncate text-[14px] text-muted">{r.detail}</span>
                    </span>
                    <ArrowUpRight className="relative shrink-0 text-ink transition-transform duration-300 ease-out-quart group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-16 md:mt-20">
          <CopyEmail email={site.email} />
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line py-6 text-[15px] font-medium uppercase text-muted sm:flex-row sm:items-center sm:justify-between md:mt-20">
          <p className="flex flex-wrap items-center gap-x-[0.4em]">
            Designed + Coded with
            <span className="group/heart inline-flex cursor-default p-1 -m-1">
              <svg
                role="img"
                aria-label="love"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                className="-mt-px text-muted transition-colors duration-200 group-hover/heart:text-accent motion-safe:group-hover/heart:animate-[heart-beat_0.9s_ease-in-out_infinite]"
              >
                <path
                  d="M12 20.3s-7.6-4.6-9.2-9.2C1.6 7.6 3.9 4.5 7.2 4.5c2 0 3.6 1.1 4.8 2.8 1.2-1.7 2.8-2.8 4.8-2.8 3.3 0 5.6 3.1 4.4 6.6-1.6 4.6-9.2 9.2-9.2 9.2z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                  className="fill-transparent transition-[fill] duration-200 group-hover/heart:fill-current"
                />
              </svg>
            </span>
            by {site.name}
          </p>
          <a href="#" className="group inline-flex items-center gap-2 self-start transition-colors hover:text-ink sm:self-auto">
            Back to top
            <span aria-hidden="true" className="transition-transform duration-300 ease-out-quart group-hover:-translate-y-1">
              ↑
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
