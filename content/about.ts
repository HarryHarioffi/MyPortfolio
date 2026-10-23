/**
 * /about copy. Personal facts here were confirmed by me (2026-10-06); work facts come from
 * content/case-studies. Tightened 2026-10-21 to read like a working designer's page rather than
 * a first job hunt: what I do, how I work, and the record, without the life story.
 */
export const about = {
  name: {
    legal: "Hariharasudhan",
    stage: "Harry Hari",
    pronunciation: "ha·ri·ha·ra·su·dhan",
  },

  intro: {
    lede: "I design AI and enterprise products at The Cloud Company: platforms teams build AI on, and the tools and dashboards they run their work in. I design in Figma, and prototype in React when a decision depends on real data or timing.",
    name: "Hariharasudhan S on paper, the S for Shanmugam. Harry Hari for short.",
  },

  glance: [
    { label: "Now", value: "Design Engineer, The Cloud Company" },
    { label: "Experience", value: "Product design since 2023" },
    { label: "Focus", value: "AI platforms and enterprise tools" },
    { label: "Location", value: "Tamil Nadu, India. Open to relocating, in India or abroad." },
  ],

  whatIDo: {
    lede: "A lot of my recent work sits where a person has to trust a system: which AI model a team may use, what an assistant knows, or why the cash number moved.",
    body: [
      "On Skillset I designed how business teams build their own AI assistants: describe what the assistant does first, connect its data second, and see afterwards which questions that data can't answer.",
      "Not all of it is AI. On Cashlens I designed working-capital dashboards inside Power Pages, where most of the design lived in the information: the order of comparisons and what colour means, agreed once for every page.",
    ],
  },

  workingWithMe: {
    lead: "On most projects here I was the only designer, working with a PM and the engineers who built it.",
    rows: [
      {
        label: "With PMs",
        text: "I show my working. On Cashlens I kept the landing-page layouts I dropped, so we could see why a directory of questions beat a map of every page.",
      },
      {
        label: "With engineers",
        text: "On Logic.dev I designed the canvas in React Flow's own model of nodes, handles and edges, so what I handed over could be built without translating.",
      },
      {
        label: "Ownership",
        text: "On Groundwork I owned the design end to end, from app onboarding and approvals to the prompt playground and cost analytics. The engineers built the platform behind it.",
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
  toolkit: "Figma, React, Next.js, TypeScript, Tailwind CSS, Motion, Git",
} as const;
