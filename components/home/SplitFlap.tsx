"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const TICK = 55;

/**
 * A word on a departures board. It shuffles into place once it's on screen, and again on hover,
 * letters settling left to right. The server renders the finished word, so nothing flashes,
 * and with reduced motion it simply stays put.
 */
export function SplitFlap({ word }: { word: string }) {
  const [chars, setChars] = useState(() => [...word]);
  const boardRef = useRef<HTMLSpanElement>(null);
  const timer = useRef(0);

  const shuffle = useCallback(() => {
    if (timer.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const letters = [...word];
    // Letter i stops on its own tick; each one spins two flaps longer than the one before it.
    const settle = (i: number) => 4 + i * 2;
    let t = 0;
    timer.current = window.setInterval(() => {
      t += 1;
      setChars(letters.map((c, i) => (t >= settle(i) ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)])));
      if (t >= settle(letters.length - 1)) {
        clearInterval(timer.current);
        timer.current = 0;
      }
    }, TICK);
  }, [word]);

  useEffect(() => {
    const el = boardRef.current;
    if (!el) return;
    let start = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        // Let the intro's rise-in land first.
        start = window.setTimeout(shuffle, 450);
      },
      { threshold: 1 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(start);
      clearInterval(timer.current);
      timer.current = 0;
    };
  }, [shuffle]);

  return (
    <>
      <span className="sr-only">{word.toLowerCase()}</span>
      <span ref={boardRef} onPointerEnter={shuffle} aria-hidden="true" className="flap-board font-mono">
        {chars.map((c, i) => (
          <span key={i} className="flap">
            {/* Keyed by letter, so every change remounts it and replays the flip. */}
            <span key={c} className="flap-glyph">
              {c}
            </span>
          </span>
        ))}
      </span>
    </>
  );
}
