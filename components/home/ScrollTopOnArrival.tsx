"use client";

import { useEffect } from "react";

/** Set by the header's name link: "I meant the top of the home page", not wherever the browser lands. */
export const TOP_FLAG = "home-top";

/**
 * Renders nothing. When the home page opens because the name in the header was clicked, it starts
 * at the top, not partway down at the work grid. Back and forward still restore your place, since
 * they never set the flag.
 */
export function ScrollTopOnArrival() {
  useEffect(() => {
    try {
      if (!sessionStorage.getItem(TOP_FLAG)) return;
      sessionStorage.removeItem(TOP_FLAG);
    } catch {
      return;
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  return null;
}
