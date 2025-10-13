"use client"

import { useEffect, useMemo, useState } from "react"
import { cn } from "@/lib/utils"

type Item = { id: string; label: string }

export function CaseStudySidebar({
  items,
  className,
  rootMargin = "-40% 0px -50% 0px",
}: {
  items: Item[]
  className?: string
  rootMargin?: string
}) {
  const [active, setActive] = useState<string>(items[0]?.id || "")

  // Observe sections for active state
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) {
          setActive(visible[0].target.id)
        }
      },
      { root: null, rootMargin, threshold: [0.1, 0.25, 0.5, 0.75, 1] },
    )

    items.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [items, rootMargin])

  const onClick = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const offset = 100 // Offset for header/spacing
      const elementPosition = el.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - offset
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
  }

  const list = useMemo(() => items, [items])

  return (
    <nav aria-label="Contents" className={cn("sticky top-24 self-start", className)}>
      <p className="mb-3 text-xs font-medium tracking-wide text-muted-foreground">CONTENTS</p>
      <ul className="space-y-2">
        {list.map((it) => {
          const isActive = active === it.id
          return (
            <li key={it.id}>
              <button
                type="button"
                onClick={() => onClick(it.id)}
                className={cn(
                  "w-full text-left text-sm transition-colors",
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {it.label}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
