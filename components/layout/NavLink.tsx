"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** A nav link that knows when you're on its page. Hash links (/#work) are never "current". */
export function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const current = !href.includes("#") && pathname.startsWith(href);
  return (
    <Link
      href={href}
      aria-current={current ? "page" : undefined}
      className={`transition-colors hover:text-ink ${current ? "text-ink" : ""}`}
    >
      {children}
    </Link>
  );
}
