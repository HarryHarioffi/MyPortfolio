import type { Project } from "./types";

/**
 * /apps: things I'm building to release, as a web app, an extension or a plugin. Same shape as /lab
 * (see content/lab.ts). An app without an `href` shows as a card that does not open yet; give each its own
 * link here. Covers are designed in Figma (page "Lab and Apps covers", file Harry-Hari).
 */
export const apps: { heading: string; items: Project[] } = {
  heading: "Apps I'm building.",
  items: [
    {
      // Source: ~/Documents/Hub/Personal/Experiments/Screenshots (the product is named Trace in its code).
      name: "Trace",
      category: "Website to Figma",
      year: 2026,
      href: "https://trace.harryhari.com",
      media: {
        src: "/apps/trace/cover.webp",
        width: 1280,
        height: 800,
        alt: "Trace: a web page split down the middle, rendered on one side and traced into selected Figma layers on the other",
      },
    },
  ],
};
