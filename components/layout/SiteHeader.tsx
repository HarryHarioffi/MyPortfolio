import Link from "next/link";
import { site } from "@/content/site";
import { HeaderShell } from "./HeaderShell";
import { NavMenu } from "./NavMenu";

export function SiteHeader() {
  return (
    <HeaderShell>
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-page items-center justify-between px-6 py-5 text-[15px] font-medium"
      >
        {/* Just the name, quiet like the links: the page itself does the introducing. */}
        <Link href="/" className="text-base uppercase text-muted transition-colors hover:text-ink">
          {site.name}
        </Link>
        {/* The resume lives on /about now, next to the experience it summarises. */}
        <NavMenu items={site.nav} />
      </nav>
    </HeaderShell>
  );
}
