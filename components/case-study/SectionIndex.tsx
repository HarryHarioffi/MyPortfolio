"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Item = { id: string; label: string };

/** Sticky left index. Highlights the section currently in view. */
export function SectionIndex({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);

    // A section counts as "current" while it crosses a band near the top of the viewport.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="Case study sections" className="sticky top-28 hidden self-start lg:block">
      <ul className="flex flex-col gap-4 whitespace-nowrap text-[14px] font-medium">
        <li>
          <Link href="/#work" className="text-muted transition-colors hover:text-ink">
            <span aria-hidden="true">←</span> Back
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? "location" : undefined}
              onClick={() => setActive(item.id)}
              className={`transition-colors duration-150 ${
                active === item.id ? "font-semibold text-ink" : "text-muted hover:text-ink"
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
