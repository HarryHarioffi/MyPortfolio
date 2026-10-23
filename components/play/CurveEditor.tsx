"use client";

import { useRef, type KeyboardEvent, type PointerEvent } from "react";
import { YMAX, YMIN, clampCurve, type Curve } from "@/lib/ease-match";

const SPAN = YMAX - YMIN;
/** Curve space to the editor's 0..100 box. y grows upward in a curve, downward on screen. */
const px = (x: number) => x * 100;
const py = (y: number) => ((YMAX - y) / SPAN) * 100;

const d = (c: Curve) =>
  `M0 ${py(0)} C${px(c[0])} ${py(c[1])} ${px(c[2])} ${py(c[3])} 100 ${py(1)}`;

const round2 = (v: number) => Math.round(v * 100) / 100;

/**
 * The cubic-bezier editor: two handles on a grid, with the start (0,0) and end (1,1) fixed. Drag
 * a handle, or focus it and use the arrow keys (Shift for bigger steps). Once `target` is given,
 * its curve is drawn in the accent beside yours.
 */
export function CurveEditor({
  curve,
  onChange,
  target,
  locked = false,
}: {
  curve: Curve;
  /** Takes a function of the latest curve, so keys repeating faster than a render don't drop steps. */
  onChange: (update: (c: Curve) => Curve) => void;
  target?: Curve;
  locked?: boolean;
}) {
  const box = useRef<HTMLDivElement>(null);

  const set = (i: 0 | 1, move: (x: number, y: number) => [number, number]) =>
    onChange((c) => {
      const [x, y] = move(c[i * 2], c[i * 2 + 1]);
      const next: [number, number, number, number] = [...c];
      next[i * 2] = round2(x);
      next[i * 2 + 1] = round2(y);
      return clampCurve(next);
    });

  const drag = (i: 0 | 1, e: PointerEvent<HTMLButtonElement>) => {
    if (locked || !e.currentTarget.hasPointerCapture(e.pointerId)) return;
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    const x = (e.clientX - r.left) / r.width;
    const y = YMAX - ((e.clientY - r.top) / r.height) * SPAN;
    set(i, () => [x, y]);
  };

  const nudge = (i: 0 | 1, e: KeyboardEvent<HTMLButtonElement>) => {
    const step = e.shiftKey ? 0.05 : 0.01;
    const dx = e.key === "ArrowRight" ? step : e.key === "ArrowLeft" ? -step : 0;
    const dy = e.key === "ArrowUp" ? step : e.key === "ArrowDown" ? -step : 0;
    if (!dx && !dy) return;
    e.preventDefault();
    if (!locked) set(i, (x, y) => [x + dx, y + dy]);
  };

  const handle = (i: 0 | 1) => {
    const x = curve[i * 2];
    const y = curve[i * 2 + 1];
    return (
      <button
        key={i}
        type="button"
        disabled={locked}
        aria-label={`Handle ${i + 1}. x ${x.toFixed(2)}, y ${y.toFixed(2)}. Arrow keys move it.`}
        onPointerDown={(e) => e.currentTarget.setPointerCapture(e.pointerId)}
        onPointerMove={(e) => drag(i, e)}
        onKeyDown={(e) => nudge(i, e)}
        style={{ left: `${px(x)}%`, top: `${py(y)}%` }}
        className="group absolute z-10 size-6 -translate-x-1/2 -translate-y-1/2 touch-none before:absolute before:-inset-2 before:content-['']"
      >
        <span className="absolute inset-[3px] border-2 border-accent bg-paper shadow-[0_2px_6px_rgb(42_48_53/0.2)] transition-transform duration-150 ease-out-quart group-enabled:group-hover:scale-110 group-enabled:group-active:scale-95 group-enabled:group-active:bg-accent group-disabled:border-faint group-disabled:shadow-none" />
      </button>
    );
  };

  const end = (left: string, top: string) => (
    <span aria-hidden="true" style={{ left, top }} className="absolute z-[5] size-2 -translate-x-1/2 -translate-y-1/2 bg-ink" />
  );

  return (
    <div ref={box} className="relative aspect-[10/11] w-full touch-none select-none border border-line bg-paper">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full" aria-hidden="true">
        {/* Above 1 the curve has arrived, below 0 it has not started: the band between is the real range. */}
        <rect x="0" y="0" width="100" height={py(1)} className="fill-canvas" />
        <rect x="0" y={py(0)} width="100" height={100 - py(0)} className="fill-canvas" />
        {[25, 50, 75].map((x) => (
          <line key={x} x1={x} x2={x} y1="0" y2="100" className="stroke-line" strokeDasharray="2 3" vectorEffect="non-scaling-stroke" />
        ))}
        <line x1="0" x2="100" y1={(py(0) + py(1)) / 2} y2={(py(0) + py(1)) / 2} className="stroke-line" strokeDasharray="2 3" vectorEffect="non-scaling-stroke" />
        <line x1="0" x2="100" y1={py(0)} y2={py(0)} className="stroke-slot-line" vectorEffect="non-scaling-stroke" />
        <line x1="0" x2="100" y1={py(1)} y2={py(1)} className="stroke-slot-line" vectorEffect="non-scaling-stroke" />
        {!locked && (
          <>
            <line x1="0" y1={py(0)} x2={px(curve[0])} y2={py(curve[1])} className="stroke-accent" strokeOpacity=".55" vectorEffect="non-scaling-stroke" />
            <line x1="100" y1={py(1)} x2={px(curve[2])} y2={py(curve[3])} className="stroke-accent" strokeOpacity=".55" vectorEffect="non-scaling-stroke" />
          </>
        )}
        {target && <path d={d(target)} fill="none" className="stroke-accent" strokeWidth="3" vectorEffect="non-scaling-stroke" />}
        <path d={d(curve)} fill="none" className="stroke-ink" strokeWidth="2.5" strokeDasharray={target ? "6 4" : undefined} vectorEffect="non-scaling-stroke" />
      </svg>
      {end("0%", `${py(0)}%`)}
      {end("100%", `${py(1)}%`)}
      {handle(0)}
      {handle(1)}
    </div>
  );
}
