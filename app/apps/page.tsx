import type { Metadata } from "next";
import { apps } from "@/content/apps";
import { site } from "@/content/site";
import { ProjectPage } from "@/components/lab/ProjectPage";

export const metadata: Metadata = {
  title: "Apps",
  description: `Apps by ${site.name}: tools built to release as a web app, an extension or a plugin.`,
};

/** Apps, each on its own link. Content lives in content/apps.ts. */
export default function AppsPage() {
  return <ProjectPage eyebrow="Apps" heading={apps.heading} items={apps.items} cta="Open app" />;
}
