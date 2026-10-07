export const site = {
  name: "Harry Hari",
  legalName: "Hariharasudhan S",
  role: "Design Engineer",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://hariharasudhans.online",
  email: "shariharasudhan2002@gmail.com",
  location: "Tamil Nadu, India",
  timeZone: "Asia/Kolkata",
  company: "The Cloud Company",
  since: 2023,
  description:
    "Hariharasudhan S (Harry Hari) is a design engineer in India who designs AI and enterprise products in Figma and React.",
  links: {
    // Full profile URLs. A bare domain (e.g. "https://github.com/") is treated as unset and hidden.
    linkedin: "https://www.linkedin.com/in/hariharasudhan-shanmugam",
    github: "https://github.com/",
    // Lives in public/. Replace the file to update it; the hero, contact and /about links hide if it's missing.
    resume: "/Hariharasudhan-Shanmugam-Resume.pdf",
  },
  nav: [
    { label: "Work", href: "/#work" },
    { label: "About", href: "/about" },
  ],
} as const;

/** True when a profile URL points at an actual profile, not just the site's root. */
function isProfile(url: string): boolean {
  try {
    const { pathname, hostname } = new URL(url);
    const parts = pathname.split("/").filter(Boolean);
    // linkedin.com/in/<handle> needs two segments; github.com/<handle> needs one.
    return parts.length >= (hostname.includes("linkedin") ? 2 : 1);
  } catch {
    return false;
  }
}

/** LinkedIn and GitHub, only the ones that are real. */
export function profileLinks(): { label: string; href: string }[] {
  return [
    { label: "LinkedIn", href: site.links.linkedin },
    { label: "GitHub", href: site.links.github },
  ].filter((l) => isProfile(l.href));
}
