import type { CaseStudy } from "../types";

export const theCloudCompany: CaseStudy = {
  slug: "the-cloud-company",
  title: "The Cloud Company Site",
  company: "The Cloud Company",
  year: 2025,
  status: "Shipped",
  card: {
    tagline: "A scroll-driven 3D landing where every animation carries the story.",
    shape: "tall",
  },
  overview: {
    hook: "A website that shows an AI-native company instead of explaining one",
    summary:
      "The marketing site for The Cloud Company, built around a scroll-driven 3D video hero. This case study is about motion as storytelling, and how design and code stayed in sync.",
    cover: { alt: "The Cloud Company landing page hero" },
    snapshot: {
      role: "Designer, Design Engineer",
      timeline: "[Month] to [Month], 2025",
      team: "1 PM, 1 engineer, 1 designer (me)",
      skills: ["Motion design", "Design systems", "Front-end", "AI video tools"],
      myPart: "I designed the site and the design system (dark and light), wrote the animation spec and the AI video briefs, and prototyped the scroll behavior.",
    },
    glance: {
      problem: "The company needed its AI-native identity to land immediately, not through copy.",
      did: "Designed a scroll-driven 3D hero, a full dark and light system, and an implementation-level motion spec.",
      result: "Every animation tied to a beat in the story, handed over in a form engineers could build exactly.",
    },
  },
  problem: {
    lead: "The old site said the company was modern. Nothing on the page proved it.",
    body: "Visitors read paragraphs about AI-native engineering and left. The first screen did not show a point of view.",
    stakes: "The site is the first meeting for most prospects, and it undersold the work.",
    media: { alt: "The previous website" },
  },
  discovery: {
    lead: "People remember what they see move. The story needed to be told by the scroll itself.",
    method: "Reviewed [N] best-in-class scroll-driven sites, and mapped the company story into beats.",
    constraints: [
      { label: "Technical", text: "A heavy 3D video must still load fast on ordinary connections." },
      { label: "Time", text: "[N] weeks from concept to launch." },
      { label: "People", text: "Content was still changing as the story settled." },
    ],
    media: { alt: "Story beats mapped to scroll positions" },
  },
  options: {
    lead: "Three ways to make the hero move, judged by story first and weight second.",
    items: [
      {
        name: "Looping background video",
        what: "A cinematic video that plays behind the headline.",
        verdict: "rejected",
        why: "Pretty, but decoration. Nothing connected it to what the visitor read.",
        media: { alt: "Loop sketch" },
      },
      {
        name: "Fully real-time 3D",
        what: "A WebGL scene rendered live.",
        verdict: "rejected",
        why: "Heavy on weak devices and slow to iterate on.",
        media: { alt: "WebGL sketch" },
      },
      {
        name: "Scroll-driven pre-rendered video",
        what: "A 3D video whose playback follows scroll position.",
        verdict: "chosen",
        why: "Cinematic quality at a predictable cost, and every frame can map to a story beat.",
        media: { alt: "Scroll-driven hero screens" },
      },
    ],
  },
  decisions: {
    lead: "Two calls kept the motion honest.",
    items: [
      {
        title: "If an animation does not tell the story, it is cut",
        body: "Instead of adding motion for polish, every animation had to map to a beat. The cost: several nice effects never shipped.",
      },
      {
        title: "Write the motion spec like an API",
        body: "Instead of a mood video, I gave engineers durations, easing, triggers and fallbacks. The cost: more documentation, and almost no rework in build.",
      },
    ],
  },
  solution: {
    lead: "A visitor scrolls and the story plays, with a calm fallback when motion is reduced.",
    walkthrough: "Hero, the three story beats, then proof and contact.",
    annotated: {
      media: { alt: "Final hero with numbered markers" },
      notes: [
        "Scroll position drives the video, so the visitor controls the pace.",
        "Headline changes at each story beat.",
        "A static poster replaces the video for reduced motion and slow connections.",
      ],
    },
    flow: { alt: "Flow recording: the scroll story" },
    reuse: "The dark and light system is now the base for the company's other pages.",
  },
  outcome: {
    lead: "A first impression that shows the company's point of view.",
    results: [
      { metric: "[XX%] longer average time on the home page", how: "Analytics, [N] weeks before vs after." },
      { metric: "[XX%] more contact form starts", how: "Form events, same period." },
    ],
  },
  reflection: {
    learned: "Motion is design work only when it carries meaning. Otherwise it is weight.",
    different: "I would profile the video on low-end phones before settling on the encode.",
  },
};
