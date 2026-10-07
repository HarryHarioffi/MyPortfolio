"use client";

import { useEffect } from "react";
import { site } from "@/content/site";

let greeted = false;

/** For whoever opens DevTools. Engineers on a UX engineering loop do. */
export function ConsoleHello() {
  useEffect(() => {
    if (greeted) return;
    greeted = true;
    console.log(
      "%cHi, I'm Hariharasudhan.%c Harry Hari is the minified build: same person, 5 fewer letters.",
      "color:#386e75;font-weight:600",
      "color:inherit",
    );
    console.log(`Say hello: ${site.email}`);
  }, []);
  return null;
}
