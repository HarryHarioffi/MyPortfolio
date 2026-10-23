import type { Project } from "./types";

/**
 * /lab: experiments, small things made to try an idea. Each is a cover with the name under it and
 * the category and year beside it, like the work grid. Add entries to `items`; newest first.
 * Covers are designed in Figma (page "Lab and Apps covers", file Harry-Hari) and exported at 1280x800.
 *
 * Example entry:
 *   { name: "Tabs", category: "Browser extension", year: 2026, href: "https://tabs.example.com",
 *     media: { src: "/lab/tabs/cover.webp", alt: "Tabs, grouped by project", width: 1280, height: 800 } }
 */
export const lab: { heading: string; items: Project[] } = {
  heading: "Things I try, to see if they work.",
  items: [
    {
      name: "Folio Scrolling Video",
      category: "Portfolio concept",
      year: 2026,
      href: "https://folio-scrolling-video.vercel.app",
      media: {
        src: "/lab/folio-scrolling-video/cover.webp",
        width: 1280,
        height: 800,
        alt: "Folio Scrolling Video: a 3D monitor that opens up and becomes a lever machine and a rotary phone as the page scrolls",
      },
    },
  ],
};
