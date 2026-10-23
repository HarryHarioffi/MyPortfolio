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
      "At The Cloud Company that has meant designing the platform a company's teams build AI apps on, and the builder that lets business teams make AI assistants on their own data. When an idea depends on real data or timing, I prototype it in React.",
    primaryCta: "See the work",
  },

  /**
   * The letter-style intro at the top of the home page (components/home/Intro.tsx). It took
   * over from `hero` on 2026-10-21; `hero` and `facts` stay so the old Hero can come back.
   */
  intro: {
    greeting: "Hello.",
    // A square photo in public/. Until the file exists, the intro shows initials in its place.
    photo: "/portrait.jpg",
    flap: "PROTOTYPE",
    // Typed into the little terminal, one after the other. Both come from the hero subhead.
    dependsOn: ["real data", "timing"],
    signoff: "It's nice to meet you.",
    copied: "Email copied. Say hi.",
  },

  facts: [
    { label: "Now", value: "Design Engineer at The Cloud Company, since 2023" },
    { label: "Roles", value: "Product design and UX engineering" },
    { label: "Works in", value: "Figma, React, TypeScript and Next.js" },
  ],

  work: {
    // Screen readers only: the grid of covers carries no visible heading.
    heading: "Work",
  },

  howIWork: {
    heading: "How I work",
    items: [
      {
        title: "I keep the options I dropped",
        body: "Cashlens's landing page went through many layouts. A map of every page showed where things were but not why you'd go there, so the version that shipped groups pages by the question they answer.",
        href: "/work/cashlens#options",
        linkLabel: "Cashlens's two directions",
      },
      {
        title: "I design in the terms it'll be built in",
        body: "Logic.dev's canvas runs on React Flow, so I designed its nodes, handles and edges in React Flow's own model. Every interaction I handed over was one the engineers could build without translating.",
        href: "/work/logic-dev#discovery",
        linkLabel: "Designing for React Flow",
      },
      {
        title: "I design the states, not just the screens",
        body: "For Folio's iOS concept I built the folder as one component with closed, peek, open and locked states, then designed the empty, offline and pending screens around it.",
        href: "/work/folio#decisions",
        linkLabel: "Folio's folder states",
      },
    ],
  },

  aboutTeaser: {
    heading: "Hariharasudhan, abridged",
    body: "That's my real name, all fourteen letters of it. Here I go by Harry Hari: Harry for Harry Potter, my favourite since I was a kid, and Hari from my own name.",
    linkLabel: "Read the unabridged version",
  },
} as const;
