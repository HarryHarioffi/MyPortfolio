import Image from "next/image"
import { getProjects } from "@/lib/projects"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type Props = {
  className?: string
}

export default async function ProjectsShowcase({ className }: Props) {
  const projects = await getProjects()

  return (
    <section
      aria-labelledby="projects-title"
      className={cn("relative mx-auto mt-20 sm:mt-82 w-full max-w-6xl px-6 md:px-8", className)}
    >
      <h2 id="projects-title" className="mb-12 text-left text-3xl font-semibold tracking-tight text-white md:text-4xl">
        My Works
      </h2>

      <div className="grid gap-20">
        {projects.map((p) => (
          <article key={p.id} className="grid gap-6">
            {/* Image */}
            <figure className="relative w-full overflow-hidden rounded-2xl border border-white/5 bg-background shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
              {/* Maintain aspect ratio similar to the reference (wide) */}
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={p.image || "/placeholder.svg"}
                  alt={`${p.title} cover`}
                  fill
                  priority={false}
                  className="object-cover"
                />
              </div>
            </figure>

            {/* Meta */}
            <p className="text-sm text-muted-foreground">
              {p.company}{" "}
              <span aria-hidden="true" className="px-1">
                |
              </span>{" "}
              {p.status}{" "}
              <span aria-hidden="true" className="px-1">
                |
              </span>{" "}
              {p.year}
            </p>

            {/* Title */}
            <h3 className="text-pretty text-2xl font-semibold tracking-tight md:text-3xl">{p.title}</h3>

            {/* Description */}
            <p className="max-w-3xl text-balance text-base leading-relaxed text-muted-foreground md:text-lg">
              {p.description}
            </p>

            {/* CTA */}
            <div>
              <Button asChild size="lg" className="rounded-full px-5">
                <Link href={`/case-studies/${p.id}`} aria-label={`Read case study: ${p.title}`}>
                  <span>Read case study</span>
                  <svg aria-hidden="true" className="ml-2 size-4" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M7 17L17 7M17 7H9M17 7v8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
