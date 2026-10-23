/**
 * Tracking: match the letter-spacing of a reference line. Plain TypeScript with no imports from
 * the app, so the game and the scores service score it the same way.
 */
import type { Difficulty } from "./leaderboard";

/** Letter-spacing, in em. The slider covers this range in steps of TRACK_STEP. */
export const TRACK_MIN = -0.1;
export const TRACK_MAX = 0.25;
export const TRACK_STEP = 0.005;
export const TRACK_START = 0;
export const MAX_SCORE = 1000;

export type TrackTarget = {
  /** What a submission names, so the service can look the value up. */
  id: string;
  /** The reference line's tracking, in em. */
  tracking: number;
  /** The line shown at that tracking. */
  reference: string;
  /** A different line for the player, so the rows can't be matched edge to edge. */
  yours: string;
};

/**
 * Easy is a wide, obvious gap in one direction or the other. Medium is a clear but moderate
 * change. Hard is a difference of a pixel or so per letter, which you can only judge by the
 * texture of the line.
 */
export const TARGETS: Record<Difficulty, readonly TrackTarget[]> = {
  easy: [
    { id: "wide", tracking: 0.16, reference: "Typography", yours: "Letterspace" },
    { id: "tight", tracking: -0.05, reference: "Interface", yours: "Hierarchy" },
    { id: "airy", tracking: 0.1, reference: "Spacing", yours: "Rhythm" },
    { id: "snug", tracking: -0.07, reference: "Headline", yours: "Contrast" },
  ],
  medium: [
    { id: "open", tracking: 0.06, reference: "Component", yours: "Alignment" },
    { id: "close", tracking: -0.03, reference: "Wireframe", yours: "Typeface" },
    { id: "loose", tracking: 0.045, reference: "Prototype", yours: "Baseline" },
    { id: "firm", tracking: -0.04, reference: "Specimen", yours: "Kerning" },
  ],
  hard: [
    { id: "hint", tracking: 0.02, reference: "Handoff", yours: "Gradient" },
    { id: "touch", tracking: -0.015, reference: "Variable", yours: "Spacing" },
    { id: "breath", tracking: 0.03, reference: "Interaction", yours: "Typography" },
    { id: "whisper", tracking: -0.01, reference: "Hierarchy", yours: "Wireframe" },
  ],
};

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** Keeps a pick inside the slider's range. */
export const clampTracking = (v: number) => clamp(v, TRACK_MIN, TRACK_MAX);

/** 0 to MAX_SCORE. A 1% (0.01em) miss keeps about 60% of it. */
export function scoreTracking(pick: number, target: number): number {
  return Math.round(MAX_SCORE * Math.exp(-50 * Math.abs(clampTracking(pick) - target)));
}

/** A tracking value as a signed percentage of the font size, e.g. +6.5%. */
export const percent = (em: number) => `${em > 0 ? "+" : em < 0 ? "−" : ""}${Math.abs(em * 100).toFixed(1)}%`;

export function verdict(score: number): string {
  if (score >= 950) return "Spot on. You can feel the rhythm of a line.";
  if (score >= 800) return "Very close. A sharp eye for space.";
  if (score >= 600) return "Close. You're reading the texture.";
  if (score >= 350) return "In the area. Squint, and look at the gaps.";
  return "Off. Squint at both lines and compare the gaps.";
}
