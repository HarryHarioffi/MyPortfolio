import Image from "next/image"
import { cn } from "@/lib/utils"

export function CaseStudyHero({
  title,
  subtitle,
  image,
  className,
}: {
  title: string
  subtitle?: string
  image?: string
  className?: string
}) {
  return (
    <header className={cn("mx-auto w-full mt-28 max-w-6xl px-6 md:px-8", className)}>
      <h1 className="text-pretty text-3xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl">
        {title}
      </h1>
      {subtitle ? <p className="mt-3 text-sm text-muted-foreground md:text-base">{subtitle}</p> : null}
      {image ? (
        <figure className="mt-8 overflow-hidden rounded-2xl border border-white/5 bg-background shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
          <div className="relative aspect-[16/9] w-full">
            <Image src={image || "/placeholder.svg"} alt={`${title} hero`} fill className="object-cover" priority />
          </div>
        </figure>
      ) : null}
    </header>
  )
}
