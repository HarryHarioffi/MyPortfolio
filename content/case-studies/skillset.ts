import type { CaseStudy } from "../types";

// Figma: page "01 · Skillset". Boards are in "03 · Case study boards", the cover in
// "02 · Motion cover".
export const skillset: CaseStudy = {
  slug: "skillset",
  title: "Skillset",
  company: "The Cloud Company",
  year: 2025,
  status: "Shipped",
  card: {
    tagline: "Business teams queued for AI assistants. I designed the builder that lets them make their own.",
    domain: "No-code AI assistant builder",
    contribution: "Product design, end to end",
  },
  overview: {
    hook: "Any team could build an AI assistant on its own data, without filing a ticket",
    summary:
      "Skillset lets business teams build AI “skills”: assistants with their own instructions, data and owners. This case study covers the builder, versions, and the insights that tell an owner why answers go wrong.",
    nda: "Client work, shown with a new name, made-up data and a new visual identity. Views are my own.",
    mission: "So my job was to make building an assistant feel like describing your own work.",
    cover: {
      src: "/work/skillset/loop.mp4",
      video: true,
      tint: "#E4F2F0",
      poster: "/work/skillset/loop.webp",
      alt: "Three tiles, instructions, knowledge and owners, merge into one skill card, which answers a question with its sources, then splits back into its parts",
      width: 1280,
      height: 800,
    },
    snapshot: {
      role: "Product Designer (sole designer)",
      timeline: "[Month] to [Month] 2025",
      team: "[N] engineers, [1] PM, me",
      skills: ["Product design", "Interaction design", "AI UX", "Design systems"],
      myPart:
        "I was the only designer. I designed the workspace model, the skill builder, versions, permissions, chat and the insights pages, and the component library the engineers built from.",
    },
    glance: {
      problem:
        "Every new assistant needed the data team, and a generic chatbot couldn't answer questions about a team's own documents.",
      did: "Designed a builder that splits a skill into what it does and what it knows, with versions, owners, and insights on answer quality.",
      result:
        "Built so a business team can go from an idea to a working assistant on its own, and see which questions its data can't answer.",
    },
  },
  problem: {
    lead: "Every team wanted an AI assistant that knew its work…",
    body: "Each new assistant went through the data team: someone wrote the prompt, wired up the files and set access by hand. Generic chat tools were quicker, but they knew nothing about a team's own documents and couldn't be trusted with confidential ones.",
    turn: "but each one meant a ticket, and a wait for the data team.",
    stakes:
      "That left the business two bad options: a queue that capped how many teams got AI, or people pasting company data into tools nobody had approved.",
    media: {
      src: "/work/skillset/problem-before.webp",
      width: 3200,
      height: 1800,
      caption: "Before: one long form for everything",
      alt: "The earlier skill editor: name, description, system prompt and data source on one long page",
    },
  },
  discovery: {
    question: "Who would actually build the skills?",
    lead: "The people building skills weren't technical. They knew their data and their questions, not prompts or models.",
    method:
      "Most of what shaped the design came from the platform itself: where the data lives, how permissions already work, and what had to be agreed before anyone could chat. [Add the research you did with builders: who you spoke to and what changed because of it.]",
    constraints: [
      { label: "Permissions", text: "Owners and members come from the company directory, as people or groups. There is no separate user list." },
      { label: "Data", text: "Sources are uploaded files, SharePoint sites, the data lake or a public URL, and each one syncs differently." },
      { label: "Trust", text: "Answers are evaluated, and everyone accepts the usage terms before their first chat." },
    ],
  },
  explorations: {
    lead: "The data step and the analytics went through rounds of their own.",
    items: [
      {
        title: "Choosing where the data lives",
        text: "The data-source step started as a checklist of source types. It became chips, with the upload and the SharePoint and public links appearing for each type you pick.",
        media: {
          src: "/work/skillset/ex-datasource.webp",
          width: 3200,
          height: 1800,
          alt: "Two versions of the data-source step: a checklist of file upload, public URL and SharePoint URL, then the same choices as chips, with an upload area and link fields below",
        },
      },
      {
        title: "Analytics before the metrics page",
        text: "An early landing split insights into cost, telemetry and evaluation, beside the first cost report, with spend by skill and over time.",
        media: {
          src: "/work/skillset/ex-analytics.webp",
          width: 3200,
          height: 1800,
          alt: "Two early analytics pages: three insight cards for cost, telemetry and evaluation, and a cost report with a bar chart by skill and a line chart over time",
        },
      },
    ],
  },
  decisions: {
    lead: "Three calls shaped the builder.",
    items: [
      {
        title: "Three short steps instead of one long form",
        short: "Three steps",
        body: "Creating a skill takes three steps: what kind of data it reads, what it does (name, instructions, persona, model), and where that data lives. A builder who isn't technical answers one question at a time instead of facing every field at once. The cost: more clicks for people who already know what they want.",
        media: {
          src: "/work/skillset/decision-details.webp",
          width: 3200,
          height: 1800,
          caption: "Step one of three: what kind of data the skill reads",
          alt: "New skill dialog, step one of three: a choice between structured data (CSV, Excel) and unstructured data (documents, images, audio, video)",
        },
      },
      {
        title: "Every edit makes a version, and one version is live",
        short: "Versions",
        body: "Owners change instructions and sources often. Versions mean a bad edit can be rolled back without rebuilding the skill, and chat always runs on the version marked active. The cost: owners have to tell active from latest, so the version list says which is which in words.",
        media: {
          src: "/work/skillset/decision-versions.webp",
          width: 3200,
          height: 1800,
          caption: "Version history, with the active version marked",
          alt: "Version list: version 1 marked active, later versions with their dates and what changed in each",
        },
      },
      {
        title: "Show owners which questions their data can't answer",
        short: "Insights",
        body: "Insights rank the top and bottom five questions by how well the skill's own sources supported each answer. When answers go wrong the fix is usually in the data, not the prompt, so the page points owners there. The cost: a quality score needs evaluation running behind it.",
        media: {
          src: "/work/skillset/decision-insights.webp",
          width: 3200,
          height: 1800,
          caption: "Top and bottom questions, by context quality",
          alt: "Insights on context clarity: the five questions best supported by the skill's sources, and the five worst",
        },
      },
    ],
  },
  solution: {
    lead: "A team lead can set up a skill in three short steps, chat with it, and see where its knowledge runs out.",
    walkthrough: "Here is the builder, then the chat a team uses and the pages an owner checks afterwards.",
    annotated: {
      media: {
        src: "/work/skillset/solution-builder.webp",
        width: 3200,
        height: 1800,
        markers: [{ x: 34.2, y: 28.7 }, { x: 93.6, y: 34.4 }, { x: 28.8, y: 62.4 }, { x: 69.8, y: 23.4 }],
        caption: "Editing a skill",
        alt: "Skill editor with Skill Details and Data Source tabs, a model picker, the system prompt, web search with an allow-list, and the active version badge",
      },
      notes: [
        "Details and data source sit on separate tabs, so each screen stays short.",
        "The model is picked from a list, never typed.",
        "Web search can be switched on, with an allow-list of the sites it may use.",
        "The active version is always on show, next to save and delete.",
      ],
    },
    details: [
      {
        label: "Chat",
        title: "Every chat says which skill is answering",
        body: "Suggested questions come from the skill's own sources. Each answer can be rated, regenerated or reported, and a failed answer says what failed instead of showing a generic error.",
        media: {
          src: "/work/skillset/detail-chat.webp",
          width: 3200,
          height: 1800,
          caption: "Chatting with a skill",
          alt: "Chat with a skill: the workspace, skill and persona in the header, a long answer marked as AI-generated, and attach and web search in the message box",
        },
      },
      {
        label: "Workspaces",
        title: "Skills live in workspaces, filtered by who made them",
        body: "Workspaces follow how the company is organised: business group, function and market. Filters for created by me, shared with me and pinned keep a long list short.",
        media: {
          src: "/work/skillset/detail-workspaces.webp",
          width: 3200,
          height: 1800,
          caption: "Workspaces and their skills",
          alt: "Workspace list with filters for created by me, shared with me and pinned, and skill cards inside a workspace",
        },
      },
      {
        label: "Admin",
        title: "Cost and usage, per skill",
        body: "Metrics show what each skill costs and how it's used, next to its evaluation results, so an admin can see which skills earn their keep.",
        media: {
          src: "/work/skillset/detail-metrics.webp",
          width: 3200,
          height: 1800,
          caption: "Cost and usage across skills",
          alt: "Analytics: total spend, cost per chat, most expensive model, cost by skill and cost over time, with cost, telemetry and evaluation tabs",
        },
      },
    ],
  },
  users: [
    { role: "Business teams", need: "Build a skill for their own work, usually without technical help." },
    { role: "Workspace owners", need: "Decide who can use a skill, and which version is live." },
    { role: "Admins", need: "Watch cost, usage and answer quality across every skill." },
  ],
  gallery: {
    lead: "The states around the happy path",
    items: [
      {
        src: "/work/skillset/after-workspace.webp",
        width: 3200,
        height: 1800,
        caption: "Creating a workspace",
        alt: "New workspace dialog: name, description, category, cost centre and icon",
      },
      {
        src: "/work/skillset/gallery-owners.webp",
        width: 3200,
        height: 1800,
        caption: "Owners can be people or directory groups",
        alt: "Manage owners: add a person or a directory group, with the current owners listed by type",
      },
      {
        src: "/work/skillset/gallery-failed.webp",
        width: 3200,
        height: 1800,
        caption: "A failed answer says so, with a retry",
        alt: "A chat where one answer failed to generate, with a retry button under the error",
      },
      {
        src: "/work/skillset/gallery-help.webp",
        width: 3200,
        height: 1800,
        caption: "Help: video guides and common questions",
        alt: "Help centre with video walkthroughs and frequently asked questions grouped by topic",
      },
    ],
  },
  shifts: {
    lead: "From a ticket for the data team to a skill the team owns.",
    items: [
      { from: "One long form, every field at once", to: "Three short steps, one question at a time" },
      { from: "The data team writes the prompt and wires up the files", to: "The team that knows the data builds the skill" },
      { from: "A bad edit means rebuilding the assistant", to: "Every edit is a version, and one version is live" },
      { from: "Weak answers get blamed on the AI", to: "Owners see which questions their data can’t answer" },
    ],
  },
  model: {
    label: "The skill formula",
    lead: "A skill is three things a team already knows.",
    body: "The builder asks about the job, the data and the people before anything technical, because those are the questions a business team can answer.",
    parts: [
      { name: "Instructions", text: "What it does and how it sounds: the task, the persona and the model." },
      { name: "Knowledge", text: "Where its answers come from: files, SharePoint, the data lake or a site." },
      { name: "Owners", text: "People or directory groups who can change it, use it, and pick the live version." },
    ],
    result: { name: "A skill", text: "An assistant a team can build, trust and fix on its own." },
  },
  journey: {
    lead: "From an idea to an assistant the team uses.",
    steps: [
      { title: "Pick the data", text: "Structured tables, or documents, images, audio and video." },
      { title: "Describe the job", text: "Name, instructions, persona and model." },
      { title: "Connect the sources", text: "Upload files, or point at SharePoint, the data lake or a site." },
      { title: "Chat and share", text: "Suggested questions come from the skill’s own sources." },
      { title: "Check and improve", text: "Insights show what its data can’t answer, and a new version fixes it." },
    ],
  },
  outcome: {
    lead: "Built so a team can have a useful assistant without waiting in anyone's queue.",
    expected: true,
    results: [
      {
        metric: "Teams build their own assistants instead of queueing for the data team",
        how: "Skills created by business teams, against requests still reaching the data team.",
      },
      {
        metric: "Less company data pasted into unapproved AI tools",
        how: "Skillset usage alongside IT's reports on unapproved tools.",
      },
      {
        metric: "Weak answers get fixed at the source",
        how: "Bottom-five questions that move up after an owner changes the skill's data.",
      },
    ],
  },
  reflection: {
    learned:
      "Builders who aren't technical think in jobs and documents, not prompts and models. The builder worked best wherever it used their words, which is why it asks about the data and the job before anything technical.",
    different:
      "I'd bring insights into the first version of the builder. Once a skill is live, its owner's next question is whether it's any good, and the builder should point there from the start.",
  },
};
