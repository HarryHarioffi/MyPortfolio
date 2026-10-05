import type { CaseStudy } from "../types";

export const strataAi: CaseStudy = {
  slug: "strata-ai",
  title: "StrataAI",
  company: "The Cloud Company",
  year: 2025,
  status: "Shipped",
  card: {
    tagline: "Giving teams control over what an AI agent knows and who can reach it.",
    shape: "wide",
  },
  overview: {
    hook: "Teams shared one AI workspace, so nobody could say what an agent knew or who could see it",
    summary:
      "StrataAI is a collaboration platform where teams work with AI agents. This case study is about the access and context model underneath it.",
    nda: "Details are changed to respect my NDA. Views are my own.",
    cover: { alt: "StrataAI workspace builder, final design" },
    snapshot: {
      role: "Product Designer, Design Engineer",
      timeline: "[Month] to [Month], 2025",
      team: "1 PM, 3 engineers, 1 designer (me)",
      skills: ["Systems design", "Interaction design", "React prototyping", "Access control UX"],
      myPart:
        "I owned the workspace model, the builder flow and the component set. Engineers owned the permissions backend; I prototyped the interactions in React so we could test the model before it was built.",
    },
    glance: {
      problem: "Teams worked in one undifferentiated space, with no way to scope an agent to a purpose or a dataset.",
      did: "Designed a modular workspace where each agent gets its own prompt, data sources and access level.",
      result: "Shipped to all teams. Governance became something people set up, not something they asked IT about.",
    },
  },
  problem: {
    lead: "A team could not tell which agent knew what, or who else could read its answers.",
    body: "Everything lived in one shared environment. An agent trained on finance data answered questions in the same place as a marketing agent. People either over-shared or stopped using the tool for anything sensitive.",
    stakes:
      "For the business it blocked adoption. Security would not approve rollout to teams with confidential data, which capped usage at [XX%] of target accounts.",
    media: { alt: "The shared workspace before the change" },
  },
  discovery: {
    lead: "People did not want more permissions. They wanted to look at an agent and know what it was for.",
    method:
      "[N] interviews with team leads and admins, a review of how [N] competing tools handle scoping, and a read-through of support tickets about access. The interviews were the most useful part.",
    constraints: [
      { label: "Technical", text: "The permissions backend supported three levels only: view, edit, manage." },
      { label: "Time", text: "One quarter, with the builder flow needed first." },
      { label: "People", text: "Security review on anything that exposed data source settings." },
    ],
    media: { alt: "Interview notes clustered into themes" },
  },
  options: {
    lead: "I explored three ways to scope an agent. Two failed on the same point: admins could not see the whole picture at once.",
    items: [
      {
        name: "Per-agent settings page",
        what: "A long form on each agent: prompt, data, access, all in one place.",
        verdict: "rejected",
        why: "Admins managing ten agents had to open ten pages to answer a simple question like who can see what. It tested badly with [N] admins.",
        media: { alt: "Sketch of the settings page" },
      },
      {
        name: "Permission matrix",
        what: "A grid of agents against people and groups.",
        verdict: "rejected",
        why: "Clear for audits, hostile for creation. Nobody wanted to set up a new agent inside a spreadsheet.",
        media: { alt: "Sketch of the matrix" },
      },
      {
        name: "Modular workspace",
        what: "Each agent is a workspace made of three blocks: instructions, sources, access. Blocks can be reused.",
        verdict: "chosen",
        why: "Creation stays light, and the same three blocks give admins a consistent thing to scan. Reuse cut setup time in testing.",
        media: { alt: "Screens of the modular workspace" },
      },
    ],
  },
  decisions: {
    lead: "Three calls shaped the design.",
    items: [
      {
        title: "Access is a block you can read at a glance, not a setting you dig for",
        body: "Instead of a separate admin area, I put the access summary on the agent itself. The cost: the card got denser and I had to drop two secondary actions.",
      },
      {
        title: "Three permission levels, named in plain words",
        body: "The backend only had three levels, so I stopped trying to hide that. I named them by what a person can do, not by role. The cost: less flexibility for edge cases, which we handle with groups.",
      },
      {
        title: "Prototype in React before the backend existed",
        body: "A coded prototype let admins try real states, like removing someone mid-session. The cost: two weeks of my time that a Figma flow would have saved, but we caught three model problems early.",
      },
    ],
  },
  solution: {
    lead: "Now a team lead can build an agent for one job and see, in one glance, what it knows and who can use it.",
    walkthrough: "Here it is in the order a person meets it: create, set sources, set access, review.",
    annotated: {
      media: { alt: "Final workspace screen with numbered markers" },
      notes: [
        "Instructions block. A short, editable system prompt with a plain-language summary above it.",
        "Sources block. Each source shows who added it and when it was last synced.",
        "Access block. Three levels, grouped by person or team, always visible on the card.",
      ],
    },
    flow: { alt: "Flow recording: creating a scoped agent from start to finish" },
    reuse: "The block layout was picked up by two other product teams as the base for their own settings screens.",
  },
  outcome: {
    lead: "Teams could finally put sensitive work into the tool, because they could see where it went.",
    results: [
      { metric: "[XX%] fewer access-related support tickets", how: "Ticket count, [N] weeks before vs after launch." },
      { metric: "[XX%] faster agent setup", how: "Median time to a working scoped agent in usability tests, n=[N]." },
      { metric: "[N] teams onboarded in the first quarter", how: "Account activity from the admin dashboard." },
    ],
    quote: {
      text: "[A line from the PM or an admin about what changed for them.]",
      by: "[Name, role]",
      note: "If a number can't be backed up, use the quote and say what you observed instead.",
    },
  },
  reflection: {
    learned: "Governance features get ignored when they feel like paperwork. Putting the answer on the surface people already use did more than any policy screen.",
    different: "I would test the permission names with non-technical users in week one. We renamed them late.",
  },
};
