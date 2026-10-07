import Link from "next/link";
import { site } from "@/content/site";
import { NavLink } from "./NavLink";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 text-[15px] font-medium"
      >
        <Link href="/" className="flex items-baseline gap-3 text-base uppercase">
          <span className="text-ink">{site.name}</span>
          <span className="hidden text-muted sm:inline">{site.role}</span>
        </Link>
        <ul className="flex items-center gap-7 text-muted">
          {site.nav.map((item) => (
            <li key={item.label}>
              <NavLink href={item.href}>{item.label}</NavLink>
            </li>
          ))}
          {/* Always shown. Add public/Hariharasudhan-S-Resume.pdf so it doesn't 404. */}
          <li>
            <a href={site.links.resume} target="_blank" rel="noopener" className="transition-colors hover:text-ink">
              Resume
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
