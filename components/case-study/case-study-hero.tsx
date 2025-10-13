"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function CaseStudyHero({
  title,
  subtitle,
  image,
  images,
  className,
}: {
  title: string
  subtitle?: string
  image?: string
  images?: string[]
  className?: string
}) {
  // Use images array if available, otherwise fallback to single image
  const displayImages = images && images.length > 0 ? images : image ? [image] : []
  const hasMultipleImages = displayImages.length > 1

  return (
    <header className={cn("mx-auto w-full mt-28 max-w-6xl px-6 md:px-8", className)}>
      <h1 className="text-pretty text-3xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl">
        {title}
      </h1>
      {subtitle ? <p className="mt-3 text-sm text-muted-foreground md:text-base">{subtitle}</p> : null}
      
      {displayImages.length > 0 && (
        <div className="mt-8">
          {hasMultipleImages ? (
            // Multiple images - show carousel
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {displayImages.map((img, index) => (
                  <CarouselItem key={index}>
                    <figure className="overflow-hidden rounded-2xl border border-white/5 bg-background shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
                      <div className="relative aspect-[16/9] w-full">
                        <Image
                          src={img}
                          alt={`${title} image ${index + 1}`}
                          fill
                          className="object-cover"
                          priority={index === 0}
                        />
                      </div>
                    </figure>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          ) : (
            // Single image - show static image
            <figure className="overflow-hidden rounded-2xl border border-white/5 bg-background shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={displayImages[0]}
                  alt={`${title} hero`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </figure>
          )}
        </div>
      )}
    </header>
  )
}
