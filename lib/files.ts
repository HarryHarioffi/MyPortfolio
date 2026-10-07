// Server only: node:fs can't be bundled for the browser, so a client import fails loudly.
import { existsSync } from "node:fs";
import path from "node:path";
import { site } from "@/content/site";

/** Whether a file exists under /public. Pages are prerendered, so this runs at build time. */
export function publicFileExists(href: string): boolean {
  return existsSync(path.join(process.cwd(), "public", href));
}

/** The resume URL, or null while the PDF hasn't been added. Never ship a link that 404s. */
export function resumeHref(): string | null {
  return publicFileExists(site.links.resume) ? site.links.resume : null;
}
