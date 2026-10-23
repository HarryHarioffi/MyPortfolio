import type { Media } from "./types";

/** One thing on /lab. */
export type LabItem = {
  name: string;
  /** What it is, in one line. */
  blurb: string;
  year: number;
  /** "Live", "Beta", "In progress"... shown next to the year. */
  status?: string;
  /** Where it opens: an app's own subdomain, or a repo or demo. Leave out until there's something to open. */
  href?: string;
  /** Leave `src` empty and a labelled placeholder shows instead. */
  media: Media;
};

type Shelf = { heading: string; note: string; empty: string; items: LabItem[] };

/**
 * /lab: what I build outside client work. Apps are the bigger things, each on its own subdomain;
 * experiments are smaller. Add entries to `items`. A shelf with none shows its `empty` note.
 *
 * Example entry:
 *   { name: "Tabs", blurb: "A tab manager that groups by project.", year: 2026, status: "Beta",
 *     href: "https://tabs.hariharasudhans.online", media: { alt: "Tabs, grouped by project" } }
 */
export const lab: { heading: string; intro: string; apps: Shelf; experiments: Shelf } = {
  heading: "Things I build for myself.",
  intro:
    "Side projects, outside client work: apps I'm building and publishing, and smaller experiments made to try an idea.",
  apps: {
    heading: "Apps",
    note: "Each one runs on its own subdomain.",
    empty: "The first app is on its way.",
    items: [],
  },
  experiments: {
    heading: "Experiments",
    note: "Smaller things, made to learn something or just for fun.",
    empty: "Experiments are on their way.",
    items: [],
  },
};
