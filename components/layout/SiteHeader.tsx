import Link from "next/link";
import { site } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 text-[15px] font-medium"
      >
        <Link href="/" className="flex items-baseline gap-3 text-base uppercase">
          <span className="text-ink">{site.name}</span>
          <span className="hidden text-faint sm:inline">{site.role}</span>
        </Link>
        <ul className="flex items-center gap-7 text-muted">
          {site.nav.map((item) => (
            <li key={item.label}>
              {"external" in item ? (
                <a href={item.href} className="transition-colors hover:text-ink">
                  {item.label}
                </a>
              ) : (
                <Link href={item.href} className="transition-colors hover:text-ink">
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
