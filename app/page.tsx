import { Section } from "@/components/section"
import { DotGridBackground } from "@/components/background/dot-grid"
import { ScrollHighlightText } from "@/components/scroll-highlight-text"
import ProjectsShowcase from "@/components/projects/showcase"
import AutoScrollSection from "@/components/auto-scroll/auto-scroll-section"

export const dynamic = "force-static"
export const revalidate = 3600

const LINES = [
  "Hey 👋 I’m Hari, a curious Product Designer who loves learning through exploration.",
  "Ideas into clear, effortless experiences that just feel right",
  "Outside of design, I’m probably looping a song or lost in a movie, series, or anime",
]

export default function HomePage() {
  return (
    <main className="relative mx-auto max-w-7xl px-3 sm:px-6 pt-28 pb-24">
      <DotGridBackground />
      <section className="mt-20">
        <ScrollHighlightText
          lines={LINES}
          className="text-pretty text-sm sm:text-2xl leading-snug md:text-5xl md:leading-tight lg:text-6xl"
        />
      </section>

      {/* Work Section */}
      <Section id="work" className="mt-28">
        <ProjectsShowcase />
        <AutoScrollSection />
      </Section>
    </main>
  )
}
