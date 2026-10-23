/** A piece of media. Leave `src` empty and a labelled placeholder slot renders instead. */
export type Media = {
  /** Path under /public, e.g. "/work/skillset/cover.webp". */
  src?: string;
  /** What the slot should hold. Shown on the placeholder and used as alt text. */
  alt: string;
  /** Intrinsic size of the file, so next/image can reserve space (no layout shift). */
  width?: number;
  height?: number;
  /** Video files (mp4/webm). Rendered muted, looping, lazy. */
  video?: boolean;
  /** The file's own background colour, shown in the slot while it loads, so it never flashes grey. */
  tint?: string;
  poster?: string;
  /**
   * Short label for a case-study board, e.g. "Before: one shared workspace". Boards leave a
   * band at the top for it, so it sits inside the image on wide screens and under it on phones.
   */
  caption?: string;
  /** Numbered markers on the image, as percentages of its width and height. */
  markers?: { x: number; y: number }[];
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

  /**
   * About the project at a glance. The home page shows only `domain`, next to the year;
   * tagline, contribution and team aren't on screen right now, but stay for fuller cards later.
   */
  card: {
    /** The problem and what I did, under 110 characters. */
    tagline: string;
    /** What kind of product this is, in words an outsider understands. */
    domain: string;
    /** What I did on it, e.g. "Product design + React prototype". */
    contribution: string;
    /** Who I worked with, ending in "me". Leave out anything unconfirmed. */
    team?: string;
  };

  overview: {
    hook: string;
    summary: string;
    /** My role as one first-person line ("So my job was to…"), shown above `snapshot.myPart`. */
    mission?: string;
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
    /** First half of a two-part heading; ends in "…" when `turn` follows. */
    lead: string;
    body: string;
    /** Second half, "but …", shown after the body. The leading "…" is drawn for it. */
    turn?: string;
    stakes: string;
    media?: Media;
  };

  /** Who uses the product and what each of them needs from it. Shown with the problem. */
  users?: { role: string; need: string }[];

  /** What the work moved away from, and towards. Pairs, shown with the problem. */
  shifts?: { lead: string; items: { from: string; to: string }[] };

  /**
   * The product's core idea as a sum of its parts, drawn as an equation. `op` is the sign in
   * front of a part (default "+").
   */
  model?: {
    /** Printed on the diagram, e.g. "The skill formula". */
    label?: string;
    lead: string;
    body?: string;
    parts: { name: string; text: string; op?: "+" | "−" }[];
    result: { name: string; text: string };
  };

  /** The main journey through the product, step by step. Opens the solution. */
  journey?: { lead: string; steps: { title: string; text: string }[] };

  discovery?: {
    /** Asked as the heading; `lead` then reads as its answer. */
    question?: string;
    lead: string;
    method: string;
    constraints: { label: string; text: string }[];
    media?: Media;
  };

  options?: { lead: string; items: Option[] };

  /** Older versions and tries from the Figma archive, each with a short note. Only real ones. */
  explorations?: { lead: string; body?: string; items: { title: string; text: string; media: Media }[] };

  /** `short` names the decision in the section index, where a full title won't fit. */
  decisions?: { lead: string; items: { title: string; short: string; body: string; media?: Media }[] };

  solution: {
    lead: string;
    walkthrough: string;
    /** Notes line up with media.markers: note 1 is marker 1. */
    annotated?: { media: Media; notes: string[] };
    flow?: Media;
    /** More moments worth a board: edge states, shipped screens. `label` sits in the left column. */
    details?: { label: string; title: string; body: string; media: Media }[];
    reuse?: string;
  };

  /** A real earlier version beside the current one. Only where the earlier screens exist. */
  beforeAfter?: { lead: string; body: string; before: Media; after: Media };

  /** More finished screens, two to a row, each with a one-line caption. */
  gallery?: { lead: string; body?: string; items: Media[] };

  outcome: {
    lead: string;
    /**
     * True when the results are the effects the design was built for, not measured numbers.
     * Each `how` then names the signal that would show it, and the page says so.
     */
    expected?: boolean;
    results: { metric: string; how: string }[];
    quote?: { text: string; by: string; note?: string };
  };

  reflection: { learned: string; different: string };
};

export type SectionId =
  | "overview"
  | "problem"
  | "discovery"
  | "model"
  | "options"
  | "decisions"
  | "solution"
  | "change"
  | "screens"
  | "outcome"
  | "reflection";

/** An entry in the section index. Children are the subsections under it. */
export type IndexItem = { id: string; label: string; children?: { id: string; label: string }[] };
