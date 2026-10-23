import { caseStudies } from "@/content";
import { play } from "@/content/play";
import { site } from "@/content/site";
import { Breadcrumb } from "./Breadcrumb";
import { HeaderShell } from "./HeaderShell";
import { MobileMenu } from "./MobileMenu";
import { NavMenu } from "./NavMenu";

/** The titles of pages inside a section, by path, for the breadcrumb: case studies and games. */
const titles = Object.fromEntries([
  ...caseStudies.map((c) => [`/work/${c.slug}`, c.title]),
  ...play.games.map((g) => [`/play/${g.slug}`, g.name]),
]);

/**
 * One line on every screen: the breadcrumb on the left, and the links on the right from md up.
 * Below md the links move behind a menu button, which leaves the whole line for the breadcrumb.
 */
export function SiteHeader() {
  return (
    <HeaderShell>
      <div className="mx-auto flex max-w-page items-center justify-between gap-4 px-6 py-2.5 text-[15px] font-medium md:gap-6 md:py-5">
        <Breadcrumb name={site.name} sections={site.nav} titles={titles} />
        {/* The resume lives on /about now, next to the experience it summarises. */}
        <nav aria-label="Primary" className="hidden shrink-0 md:block">
          <NavMenu items={site.nav} />
        </nav>
        <MobileMenu items={site.nav} />
      </div>
    </HeaderShell>
  );
}
