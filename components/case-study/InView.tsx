"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/**
 * Marks its children for an entrance once they scroll into view: `data-inview` goes from
 * "out" to "in", and CSS in globals.css staggers the parts by `--i`. It starts as "idle",
 * which hides nothing, so without JavaScript, or with reduced motion, the content is simply there.
 */
export function InView({
  as: Tag = "div",
  className = "",
  style,
  children,
}: {
  as?: "div" | "ol" | "ul";
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement & HTMLOListElement & HTMLUListElement>(null);
  const [state, setState] = useState<"idle" | "out" | "in">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Something already scrolled past (a #hash, a reload halfway down) shouldn't vanish and replay.
    if (el.getBoundingClientRect().bottom < 0) return;
    setState("out");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setState("in");
        io.disconnect();
      },
      { rootMargin: "0px 0px -18% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} data-inview={state} className={className} style={style}>
      {children}
    </Tag>
  );
}
