import { getAutoScrollCards } from "@/lib/auto-scroll"
import { InfiniteSlider } from "@/components/ui/infinite-slider"
import Image from "next/image"

export default async function AutoScrollSection() {
  const cards = await getAutoScrollCards()

  return (
    <section aria-labelledby="autoscroll-heading" className="relative mx-auto w-full max-w-7xl px-6 py-16 md:py-24">
      <div className="mb-8 md:mb-10">
        <h2
          id="autoscroll-heading"
          className="text-pretty text-3xl leading-tight md:text-6xl lg:text-7xl font-semibold"
        >
          Zero to one is where I thrive and scaling is where I bring clarity.
        </h2>
        <p className="mt-4 text-base md:text-xl text-muted-foreground max-w-4xl">
          Worked across projects with big outcomes that shipped fast and made a difference – from feature drops
          to global engagement tools and concept-to-MVP launches. No case studies needed, just thoughtful design that
          delivered.
        </p>
      </div>

      {/* Cards marquee */}
      {/* Using client-only slider inside a server section keeps SSR fast */}
      <div className="rounded-xl border border-border/40 bg-background/40 backdrop-blur-sm p-4">
        <InfiniteSlider gap={24} duration={24} durationOnHover={60} className="py-2">
          {cards.map((c) => (
            <div
              key={c.id}
              className="relative overflow-hidden rounded-xl border border-border/40 bg-card shadow-sm"
              style={{ width: c.width, height: c.height }}
            >
              <Image
                src={c.src || "/placeholder.svg"}
                alt={c.alt}
                width={c.width}
                height={c.height}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </InfiniteSlider>
      </div>
    </section>
  )
}
