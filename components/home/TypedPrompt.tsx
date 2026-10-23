"use client";

import { useEffect, useState } from "react";

const HOLD = 2400;
const ERASE = 40;
const TYPE = 85;

/**
 * A small terminal inside a sentence. It holds a phrase, backspaces it, types the next, and so on.
 * The server renders the first phrase in full; reduced motion keeps it there. The box is as wide
 * as the longest phrase, so the line never reflows while it types.
 */
export function TypedPrompt({ phrases }: { phrases: readonly string[] }) {
  const [text, setText] = useState<string>(phrases[0]);

  useEffect(() => {
    if (phrases.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let alive = true;
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
    (async () => {
      for (let i = 0; alive; i = (i + 1) % phrases.length) {
        const now = phrases[i];
        const next = phrases[(i + 1) % phrases.length];
        await wait(HOLD);
        for (let n = now.length - 1; n >= 0 && alive; n--) {
          setText(now.slice(0, n));
          await wait(ERASE);
        }
        for (let n = 1; n <= next.length && alive; n++) {
          setText(next.slice(0, n));
          await wait(TYPE);
        }
      }
    })();
    return () => {
      alive = false;
    };
  }, [phrases]);

  const longest = Math.max(...phrases.map((p) => p.length));

  return (
    <>
      <span className="sr-only">{phrases.join(" or ")}</span>
      <span aria-hidden="true" className="prompt font-mono">
        <span className="text-faint">&gt;/</span>
        {/* +2ch: the tilde and the caret. */}
        <span style={{ minWidth: `${longest + 2}ch` }}>
          ~{text}
          <span className="prompt-caret" />
        </span>
      </span>
    </>
  );
}
