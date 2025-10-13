import { cn } from "@/lib/utils"

export function CaseStudySections({
  intro,
  facts,
  sections,
  className,
}: {
  intro?: string
  facts?: Record<string, string>
  sections: Array<{ id: string; label: string; heading: string; paragraphs: string[] }>
  className?: string
}) {
  return (
    <div className={cn("w-full", className)}>
      {/* Overview section (first) */}
      <section id={sections[0]?.id || "overview"} className="scroll-mt-28">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{sections[0]?.heading || "Overview"}</h2>
        {intro ? <p className="mt-4 max-w-3xl text-muted-foreground">{intro}</p> : null}
        {sections[0]?.paragraphs?.map((p, i) => (
          <p key={i} className="mt-4 max-w-3xl text-muted-foreground">
            {p}
          </p>
        ))}

        {/* Facts grid */}
        {facts ? (
          <div className="mt-8 divide-y divide-white/10">
            {Object.entries(facts).map(([k, v]) => (
              <div key={k} className="grid gap-2 py-4 md:grid-cols-4">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{k}</p>
                <p className="md:col-span-3 text-sm md:text-base">{v}</p>
              </div>
            ))}
          </div>
        ) : null}
      </section>

      {/* Remaining sections */}
      {sections.slice(1).map((s) => (
        <section key={s.id} id={s.id} className="scroll-mt-28">
          <div className="my-10 h-px w-full bg-white/10" />
          <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{s.heading}</h3>
          {s.paragraphs.map((p, i) => (
            <p key={i} className="mt-4 max-w-3xl text-muted-foreground">
              {p}
            </p>
          ))}
        </section>
      ))}
    </div>
  )
}
