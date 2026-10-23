import { profileLinks, site } from "@/content/site";
import { FooterClock } from "./FooterClock";

/**
 * The close of every page, one quiet line: my time (and the visitor's) on the left, where to
 * find me on the right. The resume lives in the header, so it isn't repeated here.
 */
export function SiteFooter() {
  const links = [...profileLinks(), { label: "Email", href: `mailto:${site.email}` }];

  return (
    <footer>
      <div className="mx-auto flex max-w-page flex-col gap-4 px-6 py-8 text-[15px] font-medium uppercase text-muted sm:flex-row sm:items-center sm:justify-between">
        <FooterClock timeZone={site.timeZone} />
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                {...(l.href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener" })}
                className="transition-colors hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
