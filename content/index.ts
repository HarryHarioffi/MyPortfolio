import { echoDesk } from "./case-studies/echo-desk";
import { erpProcurement } from "./case-studies/erp-procurement";
import { heimdall } from "./case-studies/heimdall";
import { strataAi } from "./case-studies/strata-ai";
import { theCloudCompany } from "./case-studies/the-cloud-company";
import type { CaseStudy, SectionId } from "./types";

/** Order here is the order on the home page and the "next case study" chain. */
export const caseStudies: CaseStudy[] = [
  strataAi,
  heimdall,
  echoDesk,
  erpProcurement,
  theCloudCompany,
];

/** The first three get large cards; the rest are compact "More work" rows. */
export const FEATURED_COUNT = 3;

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export function getNextCaseStudy(slug: string): CaseStudy {
  const i = caseStudies.findIndex((c) => c.slug === slug);
  return caseStudies[(i + 1) % caseStudies.length];
}

/** Sections that exist for a case study, in reading order. Drives the sticky index. */
export function getSections(c: CaseStudy): { id: SectionId; label: string }[] {
  const all: { id: SectionId; label: string; on: boolean }[] = [
    { id: "overview", label: "Overview", on: true },
    { id: "problem", label: "Problem", on: true },
    { id: "discovery", label: "Discovery", on: !!c.discovery },
    { id: "options", label: "Options", on: !!c.options },
    { id: "decisions", label: "Decisions", on: !!c.decisions },
    { id: "solution", label: "Solution", on: true },
    { id: "outcome", label: "Outcome", on: true },
    { id: "reflection", label: "Reflection", on: true },
  ];
  return all.filter((s) => s.on).map(({ id, label }) => ({ id, label }));
}
