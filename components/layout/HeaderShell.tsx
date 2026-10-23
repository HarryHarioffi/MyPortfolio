"use client";

import { useEffect, useState, type ReactNode } from "react";

/** Scroll this far before the header may tuck away, and ignore smaller nudges than STEP. */
const TOP = 80;
const STEP = 6;

/**
 * The sticky header's frame. It slides up out of the way while you scroll down to read, and
 * comes back the moment you scroll up, reach the top, or tab into it with the keyboard.
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        if (y < TOP) {
          setHidden(false);
          last = y;
          return;
        }
        if (Math.abs(y - last) < STEP) return;
        setHidden(y > last);
        last = y;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header
      data-hidden={hidden}
      onFocusCapture={() => setHidden(false)}
      className="sticky top-0 z-40 border-b border-line bg-paper data-[hidden=true]:-translate-y-full motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out-quart"
    >
      {children}
    </header>
  );
}
