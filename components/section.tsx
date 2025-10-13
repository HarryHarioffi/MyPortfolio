import type { ReactNode, HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

export function Section({
  children,
  className = "",
  ...props
}: { children: ReactNode; className?: string } & HTMLAttributes<HTMLElement>) {
  return (
    <section {...props} className={cn("mx-auto max-w-6xl px-2 sm:px-4 scroll-mt-28", className)}>
      {children}
    </section>
  )
}
