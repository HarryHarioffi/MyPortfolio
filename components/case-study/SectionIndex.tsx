"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { IndexItem } from "@/content/types";

/**
 * Sticky left index. Highlights the section in view, and opens its subsections underneath,
 * so the index stays short but still shows where you are inside a long section.
 */
export function SectionIndex({ items }: { items: IndexItem[] }) {
  const [active, setActive] = useState(items[0]?.id);
  // Sections and subsections, in page order: the current one is whichever was passed last.
  const ids = items.flatMap((i) => [i.id, ...(i.children ?? []).map((c) => c.id)]).join(" ");

  useEffect(() => {
    const els = ids
      .split(" ")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    // The current section is the last one whose top has passed 30% of the viewport.
    // Read on scroll rather than with an observer band, so a jump (End key, scrollbar
    // drag, a #hash) can never leave a stale highlight. At the very bottom, the last
    // section wins even if it is too short to reach the line.
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.3;
      const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      let current = els[0].id;
      for (const el of els) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
      }
      setActive(atEnd ? els[els.length - 1].id : current);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ids]);

  return (
    <nav aria-label="Case study sections" className="sticky top-28 hidden self-start lg:block">
      <ul className="flex flex-col gap-4 whitespace-nowrap text-[14px] font-medium">
        <li>
          <Link href="/#work" className="text-muted transition-colors hover:text-ink">
            <span aria-hidden="true">←</span> Back
          </Link>
        </li>
        {items.map((item) => {
          const inside = item.id === active || !!item.children?.some((c) => c.id === active);
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? "location" : undefined}
                onClick={() => setActive(item.id)}
                className={`transition-colors duration-150 ${inside ? "font-semibold text-ink" : "text-muted hover:text-ink"}`}
              >
                {item.label}
              </a>
              {item.children && (
                // Collapsed with grid rows rather than unmounted, so opening animates its height.
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out-quart ${
                    inside ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <ul className="flex min-h-0 flex-col gap-2.5 overflow-hidden border-l border-line pl-3 text-[13px] font-medium">
                    {item.children.map((child, i) => (
                      <li key={child.id} className={i === 0 ? "mt-3" : ""}>
                        <a
                          href={`#${child.id}`}
                          tabIndex={inside ? undefined : -1}
                          aria-current={active === child.id ? "location" : undefined}
                          onClick={() => setActive(child.id)}
                          className={`transition-colors duration-150 ${
                            active === child.id ? "text-ink" : "text-muted hover:text-ink"
                          }`}
                        >
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
