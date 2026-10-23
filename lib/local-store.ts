"use client";

import { useSyncExternalStore } from "react";

/**
 * Tiny localStorage-backed state for things worth remembering on this device (a best score,
 * the name last typed). Reads are "" on the server and until storage can be read, and every
 * call is guarded: private windows and blocked storage just behave as if nothing was saved.
 */
const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function readLocal(key: string): string {
  try {
    return localStorage.getItem(key) ?? "";
  } catch {
    return "";
  }
}

export function writeLocal(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {}
  listeners.forEach((l) => l());
}

export function useLocal(key: string): string {
  return useSyncExternalStore(
    subscribe,
    () => readLocal(key),
    () => "",
  );
}
