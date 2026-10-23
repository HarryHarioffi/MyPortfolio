import Link from "next/link";
import { HHMark } from "@/components/ui/HHMark";
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
        {/* The mark and the name, quiet like the links: both take the link's grey, so hover turns them ink together. */}
        <Link href="/" className="inline-flex items-center gap-2.5 text-base uppercase text-muted transition-colors hover:text-ink">
          <HHMark className="size-[15px] shrink-0" />
          {site.name}
        </Link>
        {/* The resume lives on /about now, next to the experience it summarises. */}
        <NavMenu items={site.nav} />
      </nav>
    </HeaderShell>
  );
}
