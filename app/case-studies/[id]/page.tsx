import { notFound } from "next/navigation"
import { getCaseStudy, getCaseStudyIds } from "@/lib/case-studies"
import { CaseStudyHero } from "@/components/case-study/case-study-hero"
import { CaseStudySidebar } from "@/components/case-study/sidebar"
import { CaseStudySections } from "@/components/case-study/sections"

export const dynamic = "force-static"
export const revalidate = 60

type Params = { params: { id: string } }

export default async function CaseStudyPage({ params }: Params) {
  const { id } = await params
  const study = await getCaseStudy(id)
  if (!study) return notFound()

  return (
    <main className="relative">
      {/* Hero */}
      <CaseStudyHero title={study.title} subtitle={study.subtitle} image={study.coverImage} className="pt-10" />

      {/* Sidebar + Content */}
      <div className="mx-auto mt-12 mb-24 w-full max-w-6xl px-6 md:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[220px_1fr] md:items-start">
          <CaseStudySidebar
            items={study.sections.map((s) => ({ id: s.id, label: s.label }))}
            className="hidden md:block"
          />
          <CaseStudySections intro={study.intro} facts={study.facts} sections={study.sections} />
        </div>
      </div>
    </main>
  )
}

export async function generateStaticParams() {
  const ids = await getCaseStudyIds()
  return ids.map((id) => ({ id }))
}
