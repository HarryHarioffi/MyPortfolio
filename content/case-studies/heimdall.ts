import type { CaseStudy } from "../types";

export const heimdall: CaseStudy = {
  slug: "heimdall",
  title: "Heimdall",
  company: "The Cloud Company",
  year: 2025,
  status: "Enterprise",
  card: {
    tagline: "Rethinking how a threat intelligence tool speaks when every second counts.",
    shape: "square",
  },
  overview: {
    hook: "In security tooling, visual noise is not a style problem, it is a safety problem",
    summary:
      "Heimdall is a cyber threat intelligence platform run by AI agents. This case study is about structure under pressure, not a visual refresh.",
    nda: "Details are changed to respect my NDA. Views are my own.",
    cover: { alt: "Heimdall dashboard, final design" },
    snapshot: {
      role: "Lead Designer, UX Architecture",
      timeline: "[Month] to [Month], 2025",
      team: "1 PM, [N] engineers, 1 security SME, 1 designer (me)",
      skills: ["Information architecture", "Dashboard design", "Agentic AI UX"],
      myPart: "I owned the UX architecture and the dashboard. The security SME validated the threat model and terminology.",
    },
    glance: {
      problem: "Security engineers under time pressure faced noise exactly where they needed clarity.",
      did: "Rebuilt the structure around what an analyst decides next, with AI agent work made visible.",
      result: "A calmer, more precise interface where every element is deliberate.",
    },
  },
  problem: {
    lead: "An analyst has minutes to decide if an alert is real, and the screen was making that harder.",
    body: "Alerts, agent output and context all competed for the same space. People scanned past the important item because it looked like everything else.",
    stakes: "Slower triage on real threats, and fatigue that trains people to ignore alerts.",
    media: { alt: "The previous dashboard" },
  },
  discovery: {
    lead: "Analysts did not need more data. They needed to know what was decided for them and what still needed a human.",
    method: "Walked through [N] real investigations with analysts, then mapped each decision they made.",
    constraints: [
      { label: "Technical", text: "Agents produce output in varying shapes and confidence levels." },
      { label: "Time", text: "[N] weeks to a first usable dashboard." },
      { label: "People", text: "Security review and strict terminology requirements." },
    ],
    media: { alt: "Investigation decision map" },
  },
  options: {
    lead: "Three layouts, tested against one question: can an analyst find the next action in under five seconds?",
    items: [
      {
        name: "Unified feed",
        what: "One chronological stream of everything.",
        verdict: "rejected",
        why: "Chronology is not priority. Critical items sank under routine ones.",
        media: { alt: "Feed sketch" },
      },
      {
        name: "Tabbed by data type",
        what: "Separate tabs for alerts, agent actions and context.",
        verdict: "rejected",
        why: "It hid the relationship between an alert and what the agent had already done about it.",
        media: { alt: "Tabs sketch" },
      },
      {
        name: "Decision-first columns",
        what: "Needs a human, agent handled, and context, side by side.",
        verdict: "chosen",
        why: "It matches the question analysts ask first, and finds the action fastest in testing.",
        media: { alt: "Column layout screens" },
      },
    ],
  },
  decisions: {
    lead: "Two calls kept the interface quiet.",
    items: [
      {
        title: "Color is reserved for severity, nothing else",
        body: "Instead of using color for branding and status, I made it mean one thing. The cost: the interface looks plain until something is wrong, which was the point.",
      },
      {
        title: "Always show what the agent did and how sure it was",
        body: "Instead of hiding agent work, I surfaced it with a confidence cue. The cost: more information on screen, balanced by collapsing routine agent output.",
      },
    ],
  },
  solution: {
    lead: "An analyst opens the dashboard and sees what needs them first.",
    walkthrough: "Triage column, then the evidence for the selected item, then the agent's trail.",
    annotated: {
      media: { alt: "Final dashboard with numbered markers" },
      notes: [
        "The 'needs a human' column, ordered by severity.",
        "Evidence panel for the selected alert, with agent confidence.",
        "The agent trail: what it did, in order, collapsible.",
      ],
    },
    flow: { alt: "Flow recording: triaging an alert" },
  },
  outcome: {
    lead: "A security tool that stays calm until it matters.",
    results: [
      { metric: "[XX%] faster time to first action", how: "Moderated tests, n=[N] analysts, baseline vs new." },
      { metric: "[XX%] fewer missed critical alerts in testing", how: "Seeded alert exercise." },
    ],
  },
  reflection: {
    learned: "In high-stakes tools, removing things is the design work.",
    different: "I would bring the security SME into the first sketch review, not the second.",
  },
};
