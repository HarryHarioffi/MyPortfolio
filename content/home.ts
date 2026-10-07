/**
 * Home page copy. Curated over two rounds of review by a recruiter, a design hiring manager
 * and a design lead, then fact-checked against the case studies. Every claim here is backed
 * by a file in content/case-studies; keep it that way when you edit.
 */
export const home = {
  hero: {
    availability: "Open to full-time roles, in India or abroad",
    headline: "I design how people stay in control of AI agents.",
    subhead:
      "At The Cloud Company that has meant designing how teams decide what an agent knows and who can use it, and how an analyst sees what the agent already handled. When an idea depends on real data or timing, I prototype it in React.",
    primaryCta: "See the work",
  },

  facts: [
    { label: "Now", value: "Design Engineer at The Cloud Company, since 2023" },
    { label: "Roles", value: "Product design and UX engineering" },
    { label: "Works in", value: "Figma, React, TypeScript and Next.js" },
  ],

  work: {
    heading: "Work",
    subline: "Five projects from The Cloud Company. Each one says what I owned and who I worked with.",
    moreHeading: "More work",
  },

  howIWork: {
    heading: "How I work",
    items: [
      {
        title: "I keep the options I dropped",
        body: "Every case study shows what I tried before the final design, and why it lost. On Heimdall I tested three layouts against one question: can an analyst find the next action in under five seconds? A chronological feed failed, because critical alerts sank under routine ones.",
        href: "/work/heimdall#options",
        linkLabel: "Heimdall's three layouts",
      },
      {
        title: "If it depends on timing or real data, I build it",
        body: "StrataAI's permissions backend didn't exist yet, so I prototyped the access model in React. Admins could try real cases, like removing someone mid-session, and we found problems in the model before the backend was built.",
        href: "/work/strata-ai#decisions",
        linkLabel: "The StrataAI prototype",
      },
      {
        title: "I build parts other teams can reuse",
        body: "I built Echo Desk's side panel with our front-end team as a shared shell with slots for content, and other screens now reuse it. Next time I'd write its usage notes while building it, not after.",
        href: "/work/echo-desk#solution",
        linkLabel: "The Echo Desk panel shell",
      },
    ],
  },

  aboutTeaser: {
    heading: "Hariharasudhan, abridged",
    body: "That's my real name, all fourteen letters of it. Here I go by Harry Hari: Harry for Harry Potter, my favourite since I was a kid, and Hari from my own name.",
    linkLabel: "Read the unabridged version",
  },

  contact: {
    heading: "I do my best work on teams building AI that people have to trust.",
    body: "Open to full-time roles, in India or abroad. Email is the quickest way to reach me.",
  },
} as const;
