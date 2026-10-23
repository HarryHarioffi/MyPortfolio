import { cashlens } from "./case-studies/cashlens";
import { folio } from "./case-studies/folio";
import { groundwork } from "./case-studies/groundwork";
import { leanburn } from "./case-studies/leanburn";
import { logicDev } from "./case-studies/logic-dev";
import { skillset } from "./case-studies/skillset";
import type { CaseStudy, IndexItem, SectionId } from "./types";

/** Order here is the order on the home page and the "next case study" chain. */
export const caseStudies: CaseStudy[] = [
  skillset,
  groundwork,
  logicDev,
  cashlens,
  folio,
  leanburn,
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export function getNextCaseStudy(slug: string): CaseStudy {
  const i = caseStudies.findIndex((c) => c.slug === slug);
  return caseStudies[(i + 1) % caseStudies.length];
}

/**
 * Sections that exist for a case study, in reading order, with the subsections under each.
 * Drives the sticky index; the ids match the elements CaseStudyView renders.
 */
export function getSections(c: CaseStudy): IndexItem[] {
  const problemKids = [
    ...(c.users ? [{ id: "users", label: "Who it’s for" }] : []),
    ...(c.shifts ? [{ id: "shift", label: "What had to change" }] : []),
  ];
  const solutionKids = [
    ...(c.journey ? [{ id: "journey", label: "End to end" }] : []),
    ...(c.solution.details ?? []).map((d, i) => ({ id: `detail-${i + 1}`, label: d.label })),
  ];
  const all: (IndexItem & { id: SectionId; on: boolean })[] = [
    { id: "overview", label: "Overview", on: true },
    { id: "problem", label: "Problem", on: true, children: problemKids },
    { id: "discovery", label: "Discovery", on: !!c.discovery },
    { id: "model", label: "Core idea", on: !!c.model },
    {
      id: "options",
      label: "Exploration",
      on: !!c.options || !!c.explorations,
      children: c.options && c.explorations ? [{ id: "explorations", label: "Along the way" }] : undefined,
    },
    {
      id: "decisions",
      label: "Decisions",
      on: !!c.decisions,
      children: c.decisions?.items.map((d, i) => ({ id: `decision-${i + 1}`, label: d.short })),
    },
    { id: "solution", label: "Solution", on: true, children: solutionKids },
    { id: "change", label: "Before and after", on: !!c.beforeAfter },
    { id: "screens", label: "More screens", on: !!c.gallery },
    { id: "outcome", label: "Outcome", on: true },
    { id: "reflection", label: "Reflection", on: true },
  ];
  return all
    .filter((s) => s.on)
    .map(({ id, label, children }) => (children?.length ? { id, label, children } : { id, label }));
}
