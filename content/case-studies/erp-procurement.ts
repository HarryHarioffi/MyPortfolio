import type { CaseStudy } from "../types";

export const erpProcurement: CaseStudy = {
  slug: "erp-procurement",
  title: "ERP Procurement",
  company: "The Cloud Company",
  year: 2025,
  status: "Shipped",
  card: {
    tagline: "Three ERP modules that finally feel like one product.",
    shape: "wide",
  },
  overview: {
    hook: "Each ERP module was designed alone, so power users paid for it on every click",
    summary:
      "A manufacturing and procurement ERP. This case study covers BOM upload, procurement with linked requests, and Components Issued.",
    nda: "Details are changed to respect my NDA. Views are my own.",
    cover: { alt: "ERP procurement screen, final design" },
    snapshot: {
      role: "Product Designer",
      timeline: "[Month] to [Month], 2025",
      team: "1 PM, [N] engineers, 1 designer (me)",
      skills: ["Enterprise UX", "Component systems", "Information architecture"],
      myPart: "I designed all three modules and the shared components behind them.",
    },
    glance: {
      problem: "Fragmented modules slowed power users who needed speed and precision.",
      did: "Unified the modules on one component system, with progressive disclosure for depth.",
      result: "One consistent system, with Make and Bought-Out flows separated but connected.",
    },
  },
  problem: {
    lead: "Users moved between three modules that behaved like three different products.",
    body: "Patterns for tables, filters and status changed from screen to screen. Experts relearned the interface in each module.",
    stakes: "Slower data entry, more errors on procurement records, and training time for every new hire.",
    media: { alt: "Inconsistent patterns across modules" },
  },
  discovery: {
    lead: "These users did not want guidance. They wanted speed, density and no surprises.",
    method: "Audited the modules, and sat with [N] procurement users on their daily tasks.",
    constraints: [
      { label: "Technical", text: "Existing data tables and a legacy API." },
      { label: "Time", text: "Modules shipped one after another over [N] months." },
      { label: "People", text: "Users had strong habits and little patience for change." },
    ],
    media: { alt: "Audit of inconsistent patterns" },
  },
  options: {
    lead: "The question was how to unify without retraining everyone.",
    items: [
      {
        name: "Full redesign at once",
        what: "Rebuild every module on a new system in one release.",
        verdict: "rejected",
        why: "Too risky for daily-use software, and impossible on the timeline.",
        media: { alt: "Big-bang plan" },
      },
      {
        name: "Visual skin only",
        what: "Restyle the screens, keep the behavior.",
        verdict: "rejected",
        why: "It would look consistent but behave inconsistently, which was the real complaint.",
        media: { alt: "Reskin sketch" },
      },
      {
        name: "Shared components, module by module",
        what: "Build one table, filter and status system, then adopt it per module.",
        verdict: "chosen",
        why: "Behavior becomes consistent first, and each release stays small and safe.",
        media: { alt: "Component system" },
      },
    ],
  },
  decisions: {
    lead: "Two calls protected the experts.",
    items: [
      {
        title: "Dense by default, with progressive disclosure for the rest",
        body: "Instead of friendly spacing, I kept the tables compact and moved detail behind row expansion. The cost: a steeper first look for new users.",
      },
      {
        title: "Keep Make and Bought-Out separate, but share the frame",
        body: "Instead of merging the two flows, I gave them one layout and different content. The cost: some duplicated screens, but no user confusion about which flow they were in.",
      },
    ],
  },
  solution: {
    lead: "A procurement user can now move across modules without relearning anything.",
    walkthrough: "Upload a BOM, link it to requests, then check what has been issued.",
    annotated: {
      media: { alt: "Final procurement screen with markers" },
      notes: [
        "One table system across all three modules.",
        "Linked purchase requests visible inline.",
        "Components Issued connects requests, inventory and goods receipt in place.",
      ],
    },
    flow: { alt: "Flow recording: BOM upload to issued components" },
  },
  outcome: {
    lead: "Three modules that now behave like one product.",
    results: [
      { metric: "[XX%] fewer data-entry errors", how: "Error logs, [N] weeks before vs after." },
      { metric: "[XX%] shorter onboarding for new users", how: "Time to first unassisted task, n=[N]." },
    ],
  },
  reflection: {
    learned: "For expert users, consistency is a feature as real as speed.",
    different: "I would document the component rules earlier, so engineers could build ahead of design.",
  },
};
