/**
 * /about copy. Personal facts here were confirmed by me (2026-10-06); work facts come from
 * content/case-studies. Sections with empty content simply don't render.
 */
export const about = {
  name: {
    legal: "Hariharasudhan",
    stage: "Harry Hari",
    pronunciation: "ha·ri·ha·ra·su·dhan",
  },

  intro: {
    lede: "I'm Hariharasudhan S, a design engineer at The Cloud Company. I joined in 2023 and work from Tamil Nadu, India. These days I design AI and enterprise products, in Figma and in React.",
    stageName:
      "On this site I go by Harry Hari, a stage name I picked myself. Harry is for Harry Potter, which I've loved since I was a kid. Hari is the first four letters of my real name. Say it out loud and it's just Hari, twice.",
    official: "The S is for Shanmugam; my resume spells it out.",
  },

  glance: [
    { label: "Now", value: "Design Engineer at The Cloud Company, since 2023" },
    { label: "Roles", value: "Full-time product design and UX engineering" },
    { label: "Relocation", value: "Anywhere in India, and I'd especially love to work abroad" },
  ],

  whatIDo: {
    lede: "A lot of my recent work sits where a person has to make a call: who gets to see what an AI agent knows, or whether a threat alert is real.",
    body: [
      "Some ideas I can test in Figma. Others only make sense once they run in a browser. On StrataAI the permissions backend didn't exist yet, so I prototyped the access flows in React and let admins try real states, like removing someone mid-session. It surfaced problems in the access model before the backend was built.",
      "Not all of it is AI. On ERP Procurement I put three modules (BOM upload, procurement and Components Issued) on one set of tables, filters and statuses, and kept it dense by default for the experts who use it every day.",
    ],
  },

  workingWithMe: {
    lead: "On every project here I was the only designer, working with a PM and the engineers who built it.",
    rows: [
      {
        label: "With PMs",
        text: "I show my working. On StrataAI I tried three ways to scope an agent. A settings page per agent meant opening ten pages to see who could see what, and a permission matrix made setting up an agent feel like filling in a spreadsheet.",
      },
      {
        label: "With engineers",
        text: "On our company website I wrote the motion spec as durations, easing, triggers and fallbacks, and prototyped the scroll. The one engineer on the project built it with almost no rework.",
      },
      {
        label: "Who built what",
        text: "On StrataAI the engineers owned the permissions backend; I owned the workspace model, the builder flow and the component set. On Echo Desk I built the reusable panel shell with the front-end team.",
      },
      {
        label: "With specialists",
        text: "On Heimdall a security expert checked the threat model and the terminology. Next time I'd bring them into the first sketch review, not the second.",
      },
    ],
  },

  // Matches the resume. Each row: role, place, dates, and an optional one-line note.
  experience: [
    { role: "UI/UX Designer", place: "The Cloud Company", time: "Jun 2024 to now" },
    {
      role: "UI/UX Design Intern",
      place: "The Cloud Company",
      time: "Jul 2023 to May 2024",
      note: "Designed KPI dashboards and charts for an engine manufacturer's fuel optimization tool.",
    },
  ],
  education: [
    { role: "B.E. in Computer Science", place: "Kongu Engineering College, Erode", time: "2021 to 2024" },
    { role: "Diploma in Computer Engineering", place: "PSG Polytechnic College, Coimbatore", time: "2019 to 2021" },
  ],
  recentWork:
    "A workspace that controls what each AI agent knows and who can reach it, a side panel for reviewing AI requests, the UX architecture of a threat intelligence platform, three ERP procurement modules, and our company website with its dark and light design system.",
  toolkit: "Figma, React, Next.js, TypeScript, Tailwind CSS, Motion, Git",

  offTheClock: {
    interests: ["Anime", "Series", "Travel", "Theatre", "Music"],
    note: "Ask me what I'm watching right now. It makes a better icebreaker than the weather.",
  },

  sayHello: {
    heading: "Want to talk about interfaces for AI agents? So do I.",
    body: "Open to full-time roles, in India or abroad. Email is the quickest way to reach me.",
  },
} as const;
