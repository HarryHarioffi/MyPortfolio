"use client";

import { useEffect, useRef } from "react";

/**
 * A square cursor in the accent color, for mouse users only.
 * - Over text it keeps its size (16px) and inverts what's beneath (mix-blend-mode: difference).
 * - Over any other clickable thing it grows a little and turns lighter.
 * - Over anything with data-cursor="Label" it grows out to the right into a block that says
 *   the label, led by the icon named in data-cursor-icon ("eye" | "copy" | "check").
 *   Both are re-read every frame, so components can change them (e.g. "Copied") in place.
 */
const CLICKABLE = "a, button, [role='button'], [role='tab'], input, select, textarea, summary, label";

export function Cursor() {
  const boxRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;
    const box = boxRef.current;
    const label = labelRef.current;
    const labelText = textRef.current;
    if (!box || !label || !labelText) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    root.classList.add("has-cursor");

    let target: Element | null = null;
    let x = -100, y = -100;
    const SIZE = 16;
    // Over clickables the square scales up from its middle (a transform, so it stays square).
    const HOVER_SCALE = 1.5;
    let w = SIZE, h = SIZE, cw = w, ch = h;
    // Where the pointer sits inside the box: its middle, or the label's left square.
    let ox = SIZE / 2, oy = SIZE / 2, cox = ox, coy = oy;
    let s = 1, cs = s;
    let shown = false;
    let raf = 0;

    const hasOwnText = (el: Element) =>
      Array.from(el.childNodes).some((n) => n.nodeType === Node.TEXT_NODE && n.textContent?.trim());

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      target = e.target instanceof Element ? e.target : null;
      if (!shown) {
        shown = true;
        box.style.opacity = "1";
      }
    };
    const onLeave = () => {
      shown = false;
      box.style.opacity = "0";
    };
    let down = false;
    const onDown = () => (down = true);
    const onUp = () => (down = false);

    const tick = () => {
      const labelled = target?.closest<HTMLElement>("[data-cursor]");
      const clickable = labelled ? null : target?.closest(CLICKABLE);
      const text = labelled || clickable ? null : target && hasOwnText(target) ? target : null;

      if (labelled) {
        const next = labelled.dataset.cursor ?? "";
        if (labelText.textContent !== next) labelText.textContent = next;
        box.dataset.icon = labelled.dataset.cursorIcon ?? "";
        box.dataset.mode = "label";
        w = label.scrollWidth + 36;
        h = 48;
        ox = SIZE / 2;
        oy = h / 2;
      } else if (clickable) {
        box.dataset.mode = "pointer";
        w = h = SIZE;
        ox = oy = SIZE / 2;
      } else {
        box.dataset.mode = text ? "text" : "default";
        w = h = SIZE;
        ox = oy = SIZE / 2;
      }

      s = (clickable ? HOVER_SCALE : 1) * (down ? 0.85 : 1);

      // The cursor itself never lags the pointer; only its size and shape ease.
      const k = still ? 1 : 0.4;
      cw += (w - cw) * k;
      ch += (h - ch) * k;
      cox += (ox - cox) * k;
      coy += (oy - coy) * k;
      cs += (s - cs) * k;
      box.style.width = `${cw}px`;
      box.style.height = `${ch}px`;
      // The left edge stays where the small square's is, so the label grows to the right.
      // The press scale is part of this transform, pinned to the pointer via transform-origin.
      box.style.transformOrigin = `${cox}px ${coy}px`;
      box.style.transform = `translate3d(${x - cox}px, ${y - coy}px, 0) scale(${cs})`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={boxRef} aria-hidden="true" className="site-cursor" data-mode="default">
      <span ref={labelRef} className="site-cursor-label">
        <svg className="site-cursor-icon" data-for="eye" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M1.5 8C3.5 5 5.5 3.75 8 3.75S12.5 5 14.5 8C12.5 11 10.5 12.25 8 12.25S3.5 11 1.5 8Z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M6.5 6.5h3v3h-3z" fill="currentColor" />
        </svg>
        <svg className="site-cursor-icon" data-for="copy" width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M5.5 5.5h7v7h-7z M3.5 10.5v-7h7" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <svg className="site-cursor-icon" data-for="check" width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M3 8.5l3.25 3.25L13 5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <span ref={textRef} />
      </span>
    </div>
  );
}
