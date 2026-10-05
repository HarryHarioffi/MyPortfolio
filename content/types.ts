/** A piece of media. Leave `src` empty and a labelled placeholder slot renders instead. */
export type Media = {
  /** Path under /public, e.g. "/work/strata/cover.webp". */
  src?: string;
  /** What the slot should hold. Shown on the placeholder and used as alt text. */
  alt: string;
  /** Intrinsic size of the file, so next/image can reserve space (no layout shift). */
  width?: number;
  height?: number;
  /** Video files (mp4/webm). Rendered muted, looping, lazy. */
  video?: boolean;
  poster?: string;
};

export type Option = {
  name: string;
  what: string;
  verdict: "rejected" | "chosen";
  /** Why it was rejected, or why it won. Evidence, not preference. */
  why: string;
  media?: Media;
};

export type CaseStudy = {
  slug: string;
  /** Short product name, used on cards and in the "next" link. */
  title: string;
  company: string;
  year: number;
  status: string;

  /** Card on the home page. */
  card: {
    tagline: string;
    /** Shape of the cover on the home grid, so the grid has rhythm. */
    shape: "wide" | "tall" | "square";
  };

  overview: {
    hook: string;
    summary: string;
    nda?: string;
    cover: Media;
    snapshot: {
      role: string;
      timeline: string;
      team: string;
      skills: string[];
      myPart: string;
    };
    glance: { problem: string; did: string; result: string };
  };

  problem: {
    lead: string;
    body: string;
    stakes: string;
    media?: Media;
  };

  discovery?: {
    lead: string;
    method: string;
    constraints: { label: string; text: string }[];
    media?: Media;
  };

  options?: { lead: string; items: Option[] };

  decisions?: { lead: string; items: { title: string; body: string }[] };

  solution: {
    lead: string;
    walkthrough: string;
    annotated?: { media: Media; notes: string[] };
    flow?: Media;
    reuse?: string;
  };

  outcome: {
    lead: string;
    results: { metric: string; how: string }[];
    quote?: { text: string; by: string; note?: string };
  };

  reflection: { learned: string; different: string };
};

export type SectionId =
  | "overview"
  | "problem"
  | "discovery"
  | "options"
  | "decisions"
  | "solution"
  | "outcome"
  | "reflection";
