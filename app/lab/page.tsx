import type { Metadata } from "next";
import { lab } from "@/content/lab";
import { site } from "@/content/site";
import { ProjectPage } from "@/components/lab/ProjectPage";

export const metadata: Metadata = {
  title: "Lab",
  description: `Experiments by ${site.name}: small things made to try an idea.`,
};

/** Experiments. Content lives in content/lab.ts. */
export default function LabPage() {
  return <ProjectPage eyebrow="Lab" heading={lab.heading} items={lab.items} cta="Open site" />;
}
