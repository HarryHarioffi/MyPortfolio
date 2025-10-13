import studies from "@/lib/data/case-studies.json"
import { unstable_cache } from "next/cache"

export type CaseStudy = {
  id: string
  title: string
  subtitle?: string
  coverImage?: string
  intro?: string
  facts?: Record<string, string>
  sections: Array<{
    id: string
    label: string
    heading: string
    paragraphs: string[]
  }>
}

const getAllCached = unstable_cache(
  async (): Promise<CaseStudy[]> => {
    // could be replaced with fetch in the future; kept local + cached for stability
    return studies as CaseStudy[]
  },
  ["case-studies:v1"],
  { revalidate: 60 },
)

export async function getCaseStudies() {
  return getAllCached()
}

export async function getCaseStudyIds() {
  const all = await getCaseStudies()
  return all.map((s) => s.id)
}

export async function getCaseStudy(id: string) {
  const all = await getCaseStudies()
  return all.find((s) => s.id === id) || null
}
