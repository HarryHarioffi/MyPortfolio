/**
 * Ease match: the curve maths, the targets and the scoring. Plain TypeScript with no imports
 * from the app, so the game in the browser and the scores service run the exact same scoring.
 */
import type { Difficulty } from "./leaderboard";

/** A CSS cubic-bezier(x1, y1, x2, y2). x values stay in 0..1, y values may leave it (overshoot). */
export type Curve = readonly [x1: number, y1: number, x2: number, y2: number];

/** How far above and below the 0..1 range the editor lets a handle go. */
export const YMIN = -0.6;
export const YMAX = 1.6;
export const MAX_SCORE = 1000;
/** The editor starts here: a straight line, i.e. `linear`. */
export const START: Curve = [0.25, 0.25, 0.75, 0.75];

export type Target = {
  /** What a submission names, so the service can look the curve up. */
  id: string;
  curve: Curve;
  /** Shown once the attempt is locked in. */
  name: string;
  note: string;
};

/** Easy is a single clean bend, medium is steep or lopsided, hard goes past the ends. Several of these are this site's own. */
export const TARGETS: Record<Difficulty, readonly Target[]> = {
  easy: [
    {
      id: "out-quart",
      curve: [0.25, 1, 0.5, 1],
      name: "Ease-out quart",
      note: "The ease behind this site's underlines and hovers: quick off the line, long soft landing.",
    },
    {
      id: "in-out",
      curve: [0.42, 0, 0.58, 1],
      name: "ease-in-out",
      note: "CSS's built-in ease-in-out. It leaves and arrives at the same pace.",
    },
    {
      id: "out-cubic",
      curve: [0.33, 1, 0.68, 1],
      name: "Ease-out cubic",
      note: "A gentler cousin of out-quart, and a good default for things arriving on screen.",
    },
    {
      id: "in-cubic",
      curve: [0.32, 0, 0.67, 0],
      name: "Ease-in cubic",
      note: "Starts slow and speeds up. Suits things leaving the screen.",
    },
  ],
  medium: [
    {
      id: "out-expo",
      curve: [0.16, 1, 0.3, 1],
      name: "Ease-out expo",
      note: "This site's other ease, the one behind its page-load rise. Nearly all the travel happens early.",
    },
    {
      id: "in-out-expo",
      curve: [0.87, 0, 0.13, 1],
      name: "Ease-in-out expo",
      note: "A slow start, a hard middle and a soft landing. It looks like a snap.",
    },
    {
      id: "in-out-quart",
      curve: [0.76, 0, 0.24, 1],
      name: "Ease-in-out quart",
      note: "Like ease-in-out, with a steeper middle.",
    },
    {
      id: "in-expo",
      curve: [0.7, 0, 0.84, 0],
      name: "Ease-in expo",
      note: "Almost nothing for a while, then it all happens at once.",
    },
  ],
  hard: [
    {
      id: "portrait",
      curve: [0.175, 0.885, 0.32, 1.275],
      name: "Overshoot",
      note: "The ease on the portrait in the home intro. It goes past the end, then settles back.",
    },
    {
      id: "out-back",
      curve: [0.34, 1.56, 0.64, 1],
      name: "Ease-out back",
      note: "A bigger overshoot: it swings well past the end before it settles.",
    },
    {
      id: "in-back",
      curve: [0.36, 0, 0.66, -0.56],
      name: "Ease-in back",
      note: "It pulls back before it goes. Anticipation, the other way round from overshoot.",
    },
    {
      id: "in-out-back",
      curve: [0.68, -0.6, 0.32, 1.6],
      name: "Ease-in-out back",
      note: "Pulls back at the start and overshoots at the end.",
    },
  ],
};

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** Keeps a curve inside what CSS accepts (x in 0..1) and what the editor shows. */
export function clampCurve(c: Curve): Curve {
  return [clamp(c[0], 0, 1), clamp(c[1], YMIN, YMAX), clamp(c[2], 0, 1), clamp(c[3], YMIN, YMAX)];
}

export function isCurve(v: unknown): v is Curve {
  return Array.isArray(v) && v.length === 4 && v.every((n) => typeof n === "number" && Number.isFinite(n));
}

export const css = (c: Curve) => `cubic-bezier(${c.join(", ")})`;

/** How far along (0 is the start, 1 the end, can pass both) a curve is at time t, t in 0..1. */
export function progressAt(c: Curve, t: number): number {
  const [x1, y1, x2, y2] = c;
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  const bez = (a: number, b: number, s: number) => 3 * a * (1 - s) * (1 - s) * s + 3 * b * (1 - s) * s * s + s * s * s;
  // With x1 and x2 in 0..1, x(s) only ever rises, so bisection finds the s where x(s) = t.
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 30; i++) {
    const mid = (lo + hi) / 2;
    if (bez(x1, x2, mid) < t) lo = mid;
    else hi = mid;
  }
  return bez(y1, y2, (lo + hi) / 2);
}

const SAMPLES = 100;

/** Average gap between two curves, as a share of the distance travelled (0 is identical). */
export function gap(a: Curve, b: Curve): number {
  let sum = 0;
  for (let i = 0; i <= SAMPLES; i++) {
    const t = i / SAMPLES;
    sum += Math.abs(progressAt(a, t) - progressAt(b, t));
  }
  return sum / (SAMPLES + 1);
}

/** 0 to MAX_SCORE. It falls off smoothly: a 2% gap keeps about three quarters of it. */
export function scoreCurve(pick: Curve, target: Curve): number {
  return Math.round(MAX_SCORE * Math.exp(-14 * gap(clampCurve(pick), target)));
}

export function verdict(score: number): string {
  if (score >= 950) return "Frame-perfect. You can see the curve in the motion.";
  if (score >= 800) return "Sharp. Your eye for timing is good.";
  if (score >= 600) return "Close. You feel the shape.";
  if (score >= 350) return "In the right area. Watch the landings.";
  return "A rough one. The landings are where curves differ, so watch those.";
}
