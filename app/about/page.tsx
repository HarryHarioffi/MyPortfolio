import { Section } from "@/components/section"

export const dynamic = "force-static"
export const revalidate = 86400

export default function AboutPage() {
  return (
    <main>
      <Section className="prose prose-neutral dark:prose-invert py-10">
        <h1>About</h1>
        <p>
          I’m a full‑stack engineer focused on performance, accessibility, and elegant UX. I enjoy building systems that
          scale and teaching through writing and open source.
        </p>
        <h2>Skills</h2>
        <ul>
          <li>Next.js (App Router), React Server Components</li>
          <li>TypeScript, Tailwind CSS, shadcn/ui</li>
          <li>Animations with Framer Motion</li>
        </ul>
      </Section>
    </main>
  )
}
