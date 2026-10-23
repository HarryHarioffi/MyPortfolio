"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";

type Item = {
  label: string;
  href: string;
  /** Paths where this link is the page you're on, including anything below them. */
  current: readonly string[];
};

/**
 * The header's links. The section you're in turns accent, with a small square under its label.
 * The square sits outside the text flow, so no label ever shifts. When you move to another
 * section, the square glides across to the new link rather than blinking out and back in.
 */
export function NavMenu({ items }: { items: readonly Item[] }) {
  const pathname = usePathname();
  const active = items.findIndex((item) => item.current.some((p) => pathname === p || pathname.startsWith(`${p}/`)));
  const squares = useRef<(HTMLSpanElement | null)[]>([]);
  const last = useRef(active);

  // Every link owns a square, so the server paints the right one. On a change, the new square
  // starts where the old one sits (still in the layout, just transparent) and slides home.
  useLayoutEffect(() => {
    const from = squares.current[last.current];
    const to = squares.current[active];
    last.current = active;
    if (!from || !to || from === to || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const dx = from.getBoundingClientRect().left - to.getBoundingClientRect().left;
    to.animate([{ transform: `translateX(${dx}px)` }, { transform: "none" }], {
      duration: 550,
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
    });
  }, [active]);

  return (
    <ul className="flex items-center gap-7 text-muted">
      {items.map((item, i) => {
        const current = i === active;
        return (
          <li key={item.label}>
            <Link
              href={item.href}
              aria-current={current ? "page" : undefined}
              className={`relative inline-block transition-colors ${current ? "text-accent" : "hover:text-ink"}`}
            >
              {item.label}
              <span
                ref={(el) => {
                  squares.current[i] = el;
                }}
                aria-hidden="true"
                className={`absolute left-1/2 top-full mt-1 size-1.5 -translate-x-1/2 bg-accent ${current ? "" : "opacity-0"}`}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
