/**
 * Pen tool: trace a shape with Bézier anchors, scored on how closely your path follows it and on
 * how few points you needed. Plain TypeScript with no imports from the app, so the game and the
 * scores service work out the same score from the same anchors.
 */
import type { Difficulty } from "./leaderboard";

/** The canvas is SIZE by SIZE, whatever size it is drawn at. */
export const SIZE = 400;
export const MAX_SCORE = 1000;
export const MAX_ANCHORS = 24;

export type Pt = readonly [number, number];

/**
 * One anchor: where it is, then its two handles as offsets from it. The "in" handle shapes the
 * curve arriving at the anchor, the "out" handle the curve leaving it. A zero offset is no handle.
 */
export type Anchor = readonly [x: number, y: number, inX: number, inY: number, outX: number, outY: number];

export type PenPath = { closed: boolean; anchors: readonly Anchor[] };

export type Shape = {
  /** What a submission names, so the service can look the outline up. */
  id: string;
  name: string;
  closed: boolean;
  /** The fewest anchors that draw it well. More than this costs a little. */
  optimal: number;
  /** The outline, evenly spaced along its length, for scoring. */
  points: readonly Pt[];
  /** The outline as SVG path data, for drawing it (corners stay sharp). */
  guide: string;
};

const SAMPLES = 160;

/** `n` points evenly spaced along a polyline, both ends included. */
function resample(line: readonly Pt[], n: number): Pt[] {
  const first = line[0] ?? ([0, 0] as Pt);
  const cum = [0];
  for (let i = 1; i < line.length; i++) {
    cum.push(cum[i - 1] + Math.hypot(line[i][0] - line[i - 1][0], line[i][1] - line[i - 1][1]));
  }
  const total = cum[cum.length - 1];
  if (!(total > 1e-9)) return Array.from({ length: n }, () => first);
  const out: Pt[] = [];
  let seg = 1;
  for (let k = 0; k < n; k++) {
    const want = (total * k) / (n - 1);
    while (seg < cum.length - 1 && cum[seg] < want) seg++;
    const span = cum[seg] - cum[seg - 1] || 1;
    const u = Math.min(1, Math.max(0, (want - cum[seg - 1]) / span));
    out.push([
      line[seg - 1][0] + (line[seg][0] - line[seg - 1][0]) * u,
      line[seg - 1][1] + (line[seg][1] - line[seg - 1][1]) * u,
    ]);
  }
  return out;
}

function cubicAt(p0: Pt, c1: Pt, c2: Pt, p3: Pt, t: number): Pt {
  const u = 1 - t;
  const a = u * u * u;
  const b = 3 * u * u * t;
  const c = 3 * u * t * t;
  const d = t * t * t;
  return [a * p0[0] + b * c1[0] + c * c2[0] + d * p3[0], a * p0[1] + b * c1[1] + c * c2[1] + d * p3[1]];
}

/** Every curve of the path, as a dense polyline. A closed path ends back where it began. */
function dense(path: PenPath): Pt[] {
  const a = path.anchors;
  if (a.length === 0) return [];
  const out: Pt[] = [];
  const count = path.closed ? a.length : a.length - 1;
  for (let i = 0; i < count; i++) {
    const p = a[i];
    const q = a[(i + 1) % a.length];
    for (let s = 0; s < 24; s++) {
      out.push(
        cubicAt([p[0], p[1]], [p[0] + p[4], p[1] + p[5]], [q[0] + q[2], q[1] + q[3]], [q[0], q[1]], s / 24),
      );
    }
  }
  const end = path.closed ? a[0] : a[a.length - 1];
  out.push([end[0], end[1]]);
  return out;
}

/** The path as SAMPLES evenly spaced points, ready to compare with a shape's outline. */
export const pathPoints = (path: PenPath): Pt[] => resample(dense(path), SAMPLES);

/** The path as SVG path data, for drawing it. */
export function pathData(path: PenPath): string {
  const a = path.anchors;
  if (a.length === 0) return "";
  let d = `M${a[0][0]} ${a[0][1]}`;
  const count = path.closed ? a.length : a.length - 1;
  for (let i = 0; i < count; i++) {
    const p = a[i];
    const q = a[(i + 1) % a.length];
    d += ` C${p[0] + p[4]} ${p[1] + p[5]} ${q[0] + q[2]} ${q[1] + q[3]} ${q[0]} ${q[1]}`;
  }
  return path.closed ? `${d}Z` : d;
}

// ---- The shapes ----

const fix = (n: number) => Math.round(n * 10) / 10;
const line = (pts: readonly Pt[]) => pts.map((p, i) => `${i ? "L" : "M"}${fix(p[0])} ${fix(p[1])}`).join("");

/** A shape of straight edges, from its corners. */
const polygon = (vertices: readonly Pt[]) => ({
  points: resample([...vertices, vertices[0]], SAMPLES),
  guide: `${line(vertices)}Z`,
});

/** A shape from a formula, drawn for t from `from` to `to`. */
function curve(f: (t: number) => Pt, from: number, to: number, closed: boolean) {
  const pts = Array.from({ length: 481 }, (_, i) => f(from + ((to - from) * i) / 480));
  return { points: resample(pts, SAMPLES), guide: `${line(pts)}${closed ? "Z" : ""}` };
}

/** A shape from cubic segments, each [start, handle, handle, end]. */
function cubics(segments: readonly (readonly [Pt, Pt, Pt, Pt])[], closed: boolean) {
  const pts = [
    ...segments.flatMap(([p0, c1, c2, p3]) => Array.from({ length: 48 }, (_, s) => cubicAt(p0, c1, c2, p3, s / 48))),
    segments[segments.length - 1][3],
  ];
  const guide = segments.reduce(
    (d, [, c1, c2, p3]) => `${d}C${fix(c1[0])} ${fix(c1[1])} ${fix(c2[0])} ${fix(c2[1])} ${fix(p3[0])} ${fix(p3[1])}`,
    `M${fix(segments[0][0][0])} ${fix(segments[0][0][1])}`,
  );
  return { points: resample(pts, SAMPLES), guide: closed ? `${guide}Z` : guide };
}

/** Easy is straight edges: click corners, no handles. Medium is smooth curves. Hard needs sharp corners and smooth curves in one path. */
export const SHAPES: Record<Difficulty, readonly Shape[]> = {
  easy: [
    {
      id: "house",
      name: "House",
      closed: true,
      optimal: 5,
      ...polygon([[80, 330], [80, 190], [200, 80], [320, 190], [320, 330]]),
    },
    {
      id: "arrow",
      name: "Arrow",
      closed: true,
      optimal: 7,
      ...polygon([[60, 170], [220, 170], [220, 90], [350, 200], [220, 310], [220, 230], [60, 230]]),
    },
    {
      id: "bolt",
      name: "Bolt",
      closed: true,
      optimal: 7,
      ...polygon([[230, 50], [110, 215], [190, 215], [160, 350], [300, 175], [215, 175], [270, 50]]),
    },
  ],
  medium: [
    {
      id: "circle",
      name: "Circle",
      closed: true,
      optimal: 4,
      ...curve((t) => [200 + 120 * Math.cos(t), 200 + 120 * Math.sin(t)], 0, 2 * Math.PI, true),
    },
    {
      id: "drop",
      name: "Drop",
      closed: true,
      optimal: 4,
      ...cubics(
        [
          [[200, 60], [235, 125], [310, 175], [310, 235]],
          [[310, 235], [310, 296], [260, 345], [200, 345]],
          [[200, 345], [140, 345], [90, 296], [90, 235]],
          [[90, 235], [90, 175], [165, 125], [200, 60]],
        ],
        true,
      ),
    },
    {
      id: "arch",
      name: "Arch",
      closed: false,
      optimal: 3,
      ...curve((t) => [200 + 135 * Math.cos(t), 310 - 200 * Math.sin(t)], Math.PI, 0, false),
    },
    {
      id: "wave",
      name: "Wave",
      closed: false,
      optimal: 3,
      ...cubics(
        [
          [[40, 200], [90, 95], [150, 95], [200, 200]],
          [[200, 200], [250, 305], [310, 305], [360, 200]],
        ],
        false,
      ),
    },
  ],
  hard: [
    {
      id: "heart",
      name: "Heart",
      closed: true,
      optimal: 4,
      ...curve(
        (t) => [
          200 + 9.5 * 16 * Math.sin(t) ** 3,
          190 - 9.5 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)),
        ],
        0,
        2 * Math.PI,
        true,
      ),
    },
    {
      id: "infinity",
      name: "Infinity",
      closed: true,
      optimal: 4,
      ...curve(
        (t) => [
          200 + (150 * Math.cos(t)) / (1 + Math.sin(t) ** 2),
          200 + (150 * Math.sin(t) * Math.cos(t)) / (1 + Math.sin(t) ** 2),
        ],
        0,
        2 * Math.PI,
        true,
      ),
    },
    {
      id: "spiral",
      name: "Spiral",
      closed: false,
      optimal: 6,
      ...curve(
        (t) => [190 + (14 + (46 * t) / Math.PI) * Math.cos(t), 205 + (14 + (46 * t) / Math.PI) * Math.sin(t)],
        0,
        2.5 * Math.PI,
        false,
      ),
    },
  ],
};

// ---- Scoring ----

const num = (v: unknown) => typeof v === "number" && Number.isFinite(v);

export function isPenPath(v: unknown): v is PenPath {
  const p = v as PenPath;
  if (typeof p !== "object" || p === null || typeof p.closed !== "boolean" || !Array.isArray(p.anchors)) return false;
  if (p.anchors.length < 2 || p.anchors.length > MAX_ANCHORS) return false;
  return p.anchors.every(
    (a) =>
      Array.isArray(a) &&
      a.length === 6 &&
      a.every(num) &&
      Math.abs(a[0]) <= 2 * SIZE &&
      Math.abs(a[1]) <= 2 * SIZE &&
      a.slice(2).every((h) => Math.abs(h) <= 2 * SIZE),
  );
}

function meanNearest(from: readonly Pt[], to: readonly Pt[]): number {
  let sum = 0;
  for (const p of from) {
    let best = Infinity;
    for (const q of to) {
      const d = (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2;
      if (d < best) best = d;
    }
    sum += Math.sqrt(best);
  }
  return sum / from.length;
}

/** The average distance, in canvas units, between the path and the outline, looked at from both sides. */
export function distance(shape: Shape, path: PenPath): number {
  const mine = pathPoints(path);
  return (meanNearest(shape.points, mine) + meanNearest(mine, shape.points)) / 2;
}

/** How much of the score the number of anchors keeps: every one beyond the best costs 5%, down to half. */
export const efficiency = (shape: Shape, anchors: number) => Math.max(0.5, 1 - 0.05 * Math.max(0, anchors - shape.optimal));

/** 0 to MAX_SCORE: closeness (about 2 units off keeps 85%) times how few points you used. */
export function scorePen(shape: Shape, path: PenPath): number {
  return Math.round(MAX_SCORE * Math.exp(-distance(shape, path) / 12) * efficiency(shape, path.anchors.length));
}

export function verdict(score: number): string {
  if (score >= 850) return "Clean work. Few points, smooth curves.";
  if (score >= 650) return "Nicely drawn. A little tidying and it's there.";
  if (score >= 400) return "The shape is there. Pull the handles to smooth it out.";
  return "Rough. Try dragging as you click to pull out the curves.";
}
