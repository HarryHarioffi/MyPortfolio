import type { CaseStudy } from "../types";

export const echoDesk: CaseStudy = {
  slug: "echo-desk",
  title: "Echo Desk",
  company: "The Cloud Company",
  year: 2025,
  status: "Shipped",
  card: {
    tagline: "A side panel that brings AI request details to the task, so nobody has to leave it.",
    shape: "tall",
  },
  overview: {
    hook: "Reviewers left their task to look up each AI request, so we brought the request to them",
    summary:
      "Echo Desk is a contextual side panel in an AI management platform. This case study is about how it stays glanceable and still goes deep.",
    nda: "Details are changed to respect my NDA. Views are my own.",
    cover: { alt: "Echo Desk side panel, final design" },
    snapshot: {
      role: "Product Designer, Design Engineer",
      timeline: "[Month] to [Month], 2025",
      team: "1 PM, 2 engineers, 1 designer (me)",
      skills: ["Interaction design", "Component systems", "React prototyping"],
      myPart:
        "I designed the panel and its states, and built the reusable panel shell with the front-end team.",
    },
    glance: {
      problem: "Reviewers navigated away from their work to read AI requisition details.",
      did: "Designed a side panel that shows the details inline, shallow first and deep on demand.",
      result: "Fewer context switches, and a panel pattern other screens now reuse.",
    },
  },
  problem: {
    lead: "To approve a request, you had to leave the list you were working through to read it.",
    body: "Each lookup meant a page load, then finding your place again. Over a long review session the cost was not seconds, it was lost momentum and skipped detail.",
    stakes: "Slower decisions on requests that were already waiting, and a risk of approving without reading.",
    media: { alt: "The lookup flow before the panel" },
  },
  discovery: {
    lead: "Reviewers read in two modes: a quick scan to triage, and a slow read when something looked off.",
    method: "Shadowed [N] reviewers through a real session and counted how often they navigated away. Light, but it was enough to see the pattern.",
    constraints: [
      { label: "Technical", text: "The detail data came from three services with different load times." },
      { label: "Time", text: "[N] weeks, shared with other platform work." },
      { label: "People", text: "The panel had to fit existing platform components." },
    ],
    media: { alt: "Session notes and navigation counts" },
  },
  options: {
    lead: "I tried a modal, a hover card and a docked panel. Only one respected both reading modes.",
    items: [
      {
        name: "Modal",
        what: "Click a row, get the details in a modal.",
        verdict: "rejected",
        why: "It covered the list, which was the thing people needed to keep seeing.",
        media: { alt: "Modal sketch" },
      },
      {
        name: "Hover card",
        what: "Preview on hover, no click.",
        verdict: "rejected",
        why: "Fine for a glance, impossible for a slow read, and unusable on touch.",
        media: { alt: "Hover card sketch" },
      },
      {
        name: "Docked side panel",
        what: "A panel that opens beside the list and stays while you move down it.",
        verdict: "chosen",
        why: "It keeps the list visible, supports a quick scan, and expands for depth.",
        media: { alt: "Side panel screens" },
      },
    ],
  },
  decisions: {
    lead: "Two calls kept the panel useful.",
    items: [
      {
        title: "Show the verdict first, the evidence second",
        body: "Instead of listing every field, I led with the status and the one reason that mattered, with the rest a click away. The cost: some fields sit one level deeper than a few users wanted.",
      },
      {
        title: "Make the panel a shared shell, not a one-off",
        body: "I built it as a reusable component with slots for content. The cost: more up-front work than a single screen needed, paid back by the next two teams.",
      },
    ],
  },
  solution: {
    lead: "A reviewer can now move down the list, with the details of the selected request always beside it.",
    walkthrough: "Select a row, read the summary, expand for depth, move to the next with the keyboard.",
    annotated: {
      media: { alt: "Final panel with numbered markers" },
      notes: [
        "Summary header: status and the single most important reason.",
        "Expandable sections for the full request data, loaded on demand.",
        "Keyboard navigation moves the selection without closing the panel.",
      ],
    },
    flow: { alt: "Flow recording: reviewing five requests in a row" },
    reuse: "The panel shell is used by [N] other screens.",
  },
  outcome: {
    lead: "Reviewing stopped feeling like switching between tabs.",
    results: [
      { metric: "[XX%] fewer page navigations per review session", how: "Event tracking, [N] weeks, before vs after." },
      { metric: "[N] screens now use the panel shell", how: "Component usage in the codebase." },
    ],
  },
  reflection: {
    learned: "A pattern only becomes a system when someone else can use it without asking you.",
    different: "I would write the panel's usage notes while building it, not after.",
  },
};
