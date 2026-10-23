"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Item = {
  label: string;
  href: string;
  /** Paths where this link is the page you're on, including anything below them. */
  current: readonly string[];
};

/**
 * The header's links below md, behind a button, in a panel that drops from the header with the
 * page dimmed behind it. It closes on a link, on the dimmed page, on Escape, and when the page
 * changes; the page doesn't scroll while it is open. From md up the links sit in the header
 * itself (NavMenu), and this renders nothing.
 */
export function MobileMenu({ items }: { items: readonly Item[] }) {
  const pathname = usePathname();
  // Remember which page the menu was opened on: moving to another page closes it by itself.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const button = useRef<HTMLButtonElement>(null);
  const active = items.findIndex((item) => item.current.some((p) => pathname === p || pathname.startsWith(`${p}/`)));

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const before = root.style.overflow;
    root.style.overflow = "hidden";
    const wide = window.matchMedia("(min-width: 48rem)");
    const close = () => setOpenOn(null);
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      close();
      button.current?.focus();
    };
    const onWide = () => wide.matches && close();
    window.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => {
      root.style.overflow = before;
      window.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpenOn(open ? null : pathname)}
        className="-mr-2.5 flex size-11 items-center justify-center text-ink"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            d={open ? "M4.5 4.5l11 11M15.5 4.5l-11 11" : "M3 6.5h14M3 13.5h14"}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {open && (
        <>
          <div aria-hidden="true" onClick={() => setOpenOn(null)} className="menu-scrim absolute inset-x-0 top-full h-dvh bg-ink/25" />
          <nav id="mobile-menu" aria-label="Primary" className="menu-panel absolute inset-x-0 top-full border-b border-line bg-paper">
            <ul className="mx-auto max-w-page px-6 py-2">
              {items.map((item, i) => (
                <li key={item.label} className="border-b border-line last:border-b-0">
                  <Link
                    href={item.href}
                    aria-current={i === active ? "page" : undefined}
                    className={`display flex items-center gap-3.5 py-4 text-[24px] font-medium leading-[30px] tracking-[-0.12px] ${
                      i === active ? "text-accent" : "text-ink"
                    }`}
                  >
                    {/* Every row keeps the square's space, so the labels line up whether or not it shows. */}
                    <span aria-hidden="true" className={`size-1.5 shrink-0 bg-accent ${i === active ? "" : "opacity-0"}`} />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}
