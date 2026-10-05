export const site = {
  name: "Harry Hari",
  legalName: "Hariharasudhan S",
  role: "Design Engineer",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  email: "shariharasudhan2002@gmail.com",
  location: "Tamil Nadu, India",
  timeZone: "Asia/Kolkata",
  description:
    "Harry Hari is a design engineer who designs and ships interfaces for enterprise SaaS and AI products.",
  links: {
    linkedin: "https://www.linkedin.com/in/",
    github: "https://github.com/",
    resume: "/resume.pdf",
  },
  nav: [
    { label: "Work", href: "/#work" },
    { label: "About", href: "/#about" },
    { label: "Resume", href: "/resume.pdf", external: true },
  ],
} as const;
