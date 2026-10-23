"use client";

import { useEffect, useEffectEvent, useRef, useState, type PointerEvent } from "react";
import { scoreSubmission } from "@/lib/play-score";
import {
  MAX_ANCHORS,
  MAX_SCORE,
  SHAPES,
  SIZE,
  distance,
  pathData,
  verdict,
  type Anchor,
  type PenPath,
} from "@/lib/pen-tool";
import { useSessionSeed } from "@/lib/session-seed";
import { ActionBar } from "./ActionBar";
import { Btn } from "./Btn";
import { IconLock, IconTrash, IconUndo } from "./icons";
import type { GameProps } from "./types";

const EMPTY: PenPath = { closed: false, anchors: [] };

/** How close, in canvas units, a click has to be to grab a point or a handle. */
const HIT = 10;
const ANCHOR = 10;

/** What the pointer is doing while it is held down. */
type Mode =
  | { kind: "new"; index: number }
  | { kind: "move"; index: number; dx: number; dy: number }
  | { kind: "handle"; index: number; which: "in" | "out" }
  | null;

const GRID = Array.from({ length: 7 }, (_, i) => (i + 1) * 50)
  .map((n) => `M${n} 0V${SIZE}M0 ${n}H${SIZE}`)
  .join("");

const round = Math.round;

/**
 * Trace the dashed outline with the pen. Click for a corner, click and drag for a curve, click the
 * first point to close the shape. Drag any point or handle to adjust it. Closer is better, and so
 * is using fewer points.
 */
export function PenToolGame({ difficulty, run, done, onFinish }: GameProps) {
  const seed = useSessionSeed();
  const pool = SHAPES[difficulty];
  // Walks the pool from a random start, so "Play again" never repeats a shape until all have been seen.
  const shape = seed === null ? null : pool[(seed + run) % pool.length];

  const [path, setPath] = useState<PenPath>(EMPTY);
  const [selected, setSelected] = useState<number | null>(null);
  // Pointer handlers run between renders, so they read the path and the selection from here.
  const pathRef = useRef<PenPath>(EMPTY);
  const selectedRef = useRef<number | null>(null);
  const mode = useRef<Mode>(null);
  const svg = useRef<SVGSVGElement>(null);
  const startedAt = useRef(0);

  useEffect(() => {
    if (shape) startedAt.current = performance.now();
  }, [shape]);

  const update = (next: PenPath) => {
    pathRef.current = next;
    setPath(next);
  };
  const select = (i: number | null) => {
    selectedRef.current = i;
    setSelected(i);
  };
  const setAnchor = (i: number, a: Anchor) =>
    update({ ...pathRef.current, anchors: pathRef.current.anchors.map((x, k) => (k === i ? a : x)) });

  /** Where a pointer event is on the canvas, in canvas units. */
  const point = (e: PointerEvent): [number, number] => {
    const el = svg.current;
    const m = el?.getScreenCTM();
    if (!el || !m) return [0, 0];
    const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse());
    return [Math.min(SIZE, Math.max(0, p.x)), Math.min(SIZE, Math.max(0, p.y))];
  };

  const down = (e: PointerEvent<SVGSVGElement>) => {
    if (done || !shape || e.button > 0) return;
    const [x, y] = point(e);
    const cur = pathRef.current;
    const sel = selectedRef.current;
    const grab = () => e.currentTarget.setPointerCapture(e.pointerId);

    // The handles of the selected point come first: they sit on top of everything.
    if (sel !== null && cur.anchors[sel]) {
      const a = cur.anchors[sel];
      for (const which of ["out", "in"] as const) {
        const hx = a[0] + (which === "out" ? a[4] : a[2]);
        const hy = a[1] + (which === "out" ? a[5] : a[3]);
        const length = Math.hypot(which === "out" ? a[4] : a[2], which === "out" ? a[5] : a[3]);
        if (length > 1 && Math.hypot(x - hx, y - hy) < HIT) {
          mode.current = { kind: "handle", index: sel, which };
          grab();
          return;
        }
      }
    }

    for (let i = cur.anchors.length - 1; i >= 0; i--) {
      const a = cur.anchors[i];
      if (Math.hypot(x - a[0], y - a[1]) >= HIT) continue;
      if (i === 0 && cur.anchors.length >= 3 && !cur.closed) {
        update({ ...cur, closed: true });
        select(null);
      } else {
        select(i);
        mode.current = { kind: "move", index: i, dx: x - a[0], dy: y - a[1] };
        grab();
      }
      return;
    }

    if (cur.closed || cur.anchors.length >= MAX_ANCHORS) {
      select(null);
      return;
    }
    const next: Anchor = [round(x), round(y), 0, 0, 0, 0];
    update({ ...cur, anchors: [...cur.anchors, next] });
    select(cur.anchors.length);
    mode.current = { kind: "new", index: cur.anchors.length };
    grab();
  };

  const move = (e: PointerEvent<SVGSVGElement>) => {
    const m = mode.current;
    const a = m ? pathRef.current.anchors[m.index] : undefined;
    if (!m || !a) return;
    const [x, y] = point(e);
    if (m.kind === "move") {
      setAnchor(m.index, [round(x - m.dx), round(y - m.dy), a[2], a[3], a[4], a[5]]);
      return;
    }
    const dx = round(x - a[0]);
    const dy = round(y - a[1]);
    // Dragging a new point pulls its handles out together. Holding Alt while dragging a handle breaks them apart.
    if (m.kind === "new") {
      if (Math.hypot(dx, dy) > 4) setAnchor(m.index, [a[0], a[1], -dx, -dy, dx, dy]);
    } else if (m.which === "out") {
      setAnchor(m.index, [a[0], a[1], e.altKey ? a[2] : -dx, e.altKey ? a[3] : -dy, dx, dy]);
    } else {
      setAnchor(m.index, [a[0], a[1], dx, dy, e.altKey ? a[4] : -dx, e.altKey ? a[5] : -dy]);
    }
  };

  const up = () => {
    mode.current = null;
  };

  const undo = () => {
    const cur = pathRef.current;
    update(cur.closed ? { ...cur, closed: false } : { closed: false, anchors: cur.anchors.slice(0, -1) });
    select(null);
  };
  const clear = () => {
    update(EMPTY);
    select(null);
  };

  const lock = () => {
    const cur = pathRef.current;
    if (!shape || done || cur.anchors.length < 2) return;
    const ms = Math.round(performance.now() - startedAt.current);
    const payload = { shape: shape.id, closed: cur.closed, anchors: cur.anchors.map((a) => [...a]) };
    const scored = scoreSubmission("pen-tool", difficulty, payload, ms);
    if (!scored) return;
    onFinish({
      payload,
      ms,
      score: scored.score,
      outOf: MAX_SCORE,
      summary: `${distance(shape, cur).toFixed(1)} units off the outline on average, with ${cur.anchors.length} points (best is ${shape.optimal}). ${verdict(scored.score)}`,
    });
  };

  // Enter locks in and Backspace undoes, unless you're typing somewhere.
  const lockFromKey = useEffectEvent(() => lock());
  const undoFromKey = useEffectEvent(() => undo());
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (/^(BUTTON|TEXTAREA|SELECT|A|INPUT)$/.test(t.tagName) || t.isContentEditable)) return;
      if (e.key === "Enter") lockFromKey();
      else if (e.key === "Backspace" || e.key === "Delete") {
        e.preventDefault();
        undoFromKey();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const count = path.anchors.length;
  const sel = selected !== null ? path.anchors[selected] : undefined;
  const closable = !done && !path.closed && count >= 3;

  return (
    <div className="flex min-h-[500px] items-center justify-center px-5 pb-28 pt-6 md:px-8">
      <div className="w-full max-w-[400px]">
        <div className="border border-line bg-paper p-3 shadow-[0_1px_2px_rgb(42_48_53/0.05)]">
          <div className="mb-2.5 flex items-center justify-between px-1">
            <span className="inline-flex h-6 items-center bg-accent-soft px-2 text-[12px] font-medium text-accent">
              {shape?.name ?? "Shape"}
            </span>
            <span className="text-[12px] tabular-nums text-muted">
              <span className={shape && count > shape.optimal ? "text-severity" : "text-ink"}>{count}</span>
              {shape ? ` of ${shape.optimal} points` : " points"}
            </span>
          </div>

          <svg
            ref={svg}
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            role="img"
            aria-label={shape ? `Canvas: trace the ${shape.name.toLowerCase()} with the pen` : "Canvas"}
            onPointerDown={down}
            onPointerMove={move}
            onPointerUp={up}
            onPointerCancel={up}
            className="block aspect-square w-full touch-none select-none bg-paper"
          >
            <path d={GRID} className="stroke-line" strokeWidth="1" strokeDasharray="2 4" fill="none" />
            {shape && (
              <path
                d={shape.guide}
                fill="none"
                className="stroke-accent"
                strokeWidth={done ? 3.5 : 2.5}
                strokeOpacity={done ? 0.9 : 0.55}
                strokeDasharray={done ? undefined : "8 6"}
                strokeLinejoin="round"
              />
            )}
            <path
              d={pathData(path)}
              fill="none"
              className="stroke-ink"
              strokeWidth="3"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeDasharray={done ? "7 5" : undefined}
            />

            {/* The handles of the selected point. */}
            {!done && sel && (
              <g className="pointer-events-none">
                {(
                  [
                    [sel[2], sel[3]],
                    [sel[4], sel[5]],
                  ] as const
                )
                  .filter(([hx, hy]) => Math.hypot(hx, hy) > 1)
                  .map(([hx, hy]) => (
                    <g key={`${hx},${hy}`}>
                      <line x1={sel[0]} y1={sel[1]} x2={sel[0] + hx} y2={sel[1] + hy} className="stroke-accent" strokeWidth="1.5" />
                      <circle cx={sel[0] + hx} cy={sel[1] + hy} r="5" className="fill-paper stroke-accent" strokeWidth="2" />
                    </g>
                  ))}
              </g>
            )}

            {/* The points. The first one wears a ring while you can still close the shape on it. */}
            {path.anchors.map((a, i) => (
              <g key={i} className="pointer-events-none">
                {i === 0 && closable && (
                  <rect
                    x={a[0] - ANCHOR}
                    y={a[1] - ANCHOR}
                    width={ANCHOR * 2}
                    height={ANCHOR * 2}
                    fill="none"
                    className="stroke-accent"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                )}
                <rect
                  x={a[0] - ANCHOR / 2}
                  y={a[1] - ANCHOR / 2}
                  width={ANCHOR}
                  height={ANCHOR}
                  strokeWidth="2"
                  className={i === selected && !done ? "fill-accent stroke-accent" : "fill-paper stroke-ink"}
                />
              </g>
            ))}
          </svg>
        </div>

        <p className="mt-3 px-1 text-[13px] leading-[19px] text-muted">
          {done ? (
            <span className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span className="flex items-center gap-1.5">
                <span aria-hidden="true" className="h-0.5 w-4 bg-accent" /> Outline
              </span>
              <span className="flex items-center gap-1.5">
                <span aria-hidden="true" className="h-0.5 w-4 border-t-2 border-dashed border-ink" /> You
              </span>
            </span>
          ) : count === 0 ? (
            "Click to drop a point. Click and drag to curve it."
          ) : closable ? (
            "Click the first point to close the shape."
          ) : (
            "Drag a point or its handles to adjust. Fewer points score higher."
          )}
        </p>
      </div>

      {!done && (
        <ActionBar>
          <Btn look="ghost" icon={<IconUndo />} onClick={undo} disabled={count === 0}>
            Undo
          </Btn>
          <Btn look="ghost" icon={<IconTrash />} onClick={clear} disabled={count === 0}>
            Clear
          </Btn>
          <Btn look="primary" icon={<IconLock />} onClick={lock} disabled={!shape || count < 2}>
            Lock in
          </Btn>
        </ActionBar>
      )}
    </div>
  );
}
