"use client";

import { useSyncExternalStore } from "react";

let seed: number | null = null;

const never = () => () => {};
const read = () => (seed ??= Math.floor(Math.random() * 2 ** 32));

/**
 * A random number that stays fixed for this visit, or null while the server and the first
 * hydration render. Games build their first target from it: random per visitor, yet the HTML the
 * server wrote never disagrees with what the browser draws.
 */
export function useSessionSeed(): number | null {
  return useSyncExternalStore(never, read, () => null);
}
