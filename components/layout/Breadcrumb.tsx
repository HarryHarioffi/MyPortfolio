"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TOP_FLAG } from "@/components/home/ScrollTopOnArrival";
import { HHMark } from "@/components/ui/HHMark";

type Section = { label: string; href: string; current: readonly string[] };
type Crumb = { label: string; href: string };

/**
 * Where you are, as a trail: the name, then the section, then the page, e.g. "Harry Hari / Work /
 * Skillset". Pages that aren't inside a section (home, Lab, Apps, About, the section pages themselves) have no trail, only the name. Sections come from the nav; the page's own
 * title comes from `titles`, keyed by path.
 */
function trailFor(pathname: string, sections: readonly Section[], titles: Record<string, string>): Crumb[] {
  const path = pathname.replace(/\/+$/, "") || "/";
  const section = sections.find((s) => s.current.some((p) => p !== "/" && (path === p || path.startsWith(`${p}/`))));
  const title = titles[path];
  // Only a page inside a section has a trail. The section's own page doesn't: the nav already shows it.
  if (!section || !title) return [];
  return [{ label: section.label, href: section.href }, { label: title, href: path }];
}

const SLASH = (
  <span aria-hidden="true" className="mx-2 text-faint sm:mx-2.5">
    /
  </span>
);

/**
 * The header's left side, on every screen size: the mark and the name, then the trail. On the
 * narrowest phones the name steps aside once there is a trail, so the page's own title still fits
 * beside the menu button; the mark carries the name there.
 */
export function Breadcrumb({
  name,
  sections,
  titles,
}: {
  name: string;
  sections: readonly Section[];
  titles: Record<string, string>;
}) {
  const pathname = usePathname();
  const trail = trailFor(pathname, sections, titles);
  const last = trail.length - 1;

  return (
    <nav aria-label="Breadcrumb" className="flex min-w-0 items-center whitespace-nowrap">
      {/* The mark and the name, quiet like the links: both take the link's grey, so hover turns them ink together. */}
      <Link
        href="/"
        onClick={(e) => {
          // Already home: just glide up. Elsewhere: the home page reads the flag and starts at its top.
          if (pathname === "/") {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
          }
          try {
            sessionStorage.setItem(TOP_FLAG, "1");
          } catch {}
        }}
        className="inline-flex shrink-0 items-center gap-2.5 text-[14px] uppercase text-muted transition-colors hover:text-ink sm:text-base"
      >
        <HHMark className="size-[15px] shrink-0" />
        <span className={trail.length > 0 ? "max-[359px]:sr-only" : ""}>{name}</span>
      </Link>
      {trail.map((c, i) => (
        <span key={c.href} className="flex min-w-0 items-center text-[14px] sm:text-[15px]">
          {SLASH}
          {i === last ? (
            <span aria-current="page" className="truncate text-ink">
              {c.label}
            </span>
          ) : (
            <Link href={c.href} className="text-muted transition-colors hover:text-ink">
              {c.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
