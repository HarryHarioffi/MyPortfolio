"use client"

import type React from "react"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const baseLinks = [
  { hash: "#work", label: "Work" },
  { hash: "#contact", label: "Contact" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const isHome = pathname === "/"

  const links = baseLinks.map((l) => ({
    href: isHome ? l.hash : `/${l.hash}`,
    label: l.label,
    hash: l.hash,
  }))

  const handleInPageScroll = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (!isHome) return
    const el = document.querySelector(hash)
    if (el) {
      e.preventDefault()
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <header className="fixed inset-x-0 top-6 z-40 flex justify-center">
      <nav
        className={cn(
          "flex items-center gap-4 rounded-full border border-white/10",
          "bg-background/40 px-4 py-2 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.12)]",
        )}
        aria-label="Primary"
      >
        {pathname?.startsWith("/case-studies/") && (
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault()
              router.back()
            }}
            className="text-sm text-white/80 transition-colors hover:text-white"
            aria-label="Go back"
          >
            ←
          </a>
        )}

        <Link href="/" className="flex items-center gap-3" aria-label="Home">
          <Avatar className="h-8 w-8 ring-1 ring-white/20 shadow">
            <AvatarImage src="/placeholder-user.jpg" alt="Profile" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
        </Link>

        <div className="flex items-center gap-4">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={(e) => handleInPageScroll(e, l.hash)}
              className={cn("text-sm text-white/80 transition-colors hover:text-white")}
              aria-label={l.label}
            >
              {l.label}
            </a>
          ))}
          <Button
            asChild
            size="sm"
            className="rounded-full px-4 bg-white/10 hover:bg-white/15 text-white shadow-sm border border-white/15"
            aria-label="View CV"
          >
            <a
              href="https://drive.google.com/file/d/REPLACE_WITH_YOUR_ID/view"
              target="_blank"
              rel="noopener noreferrer"
            >
              
              View CV
              <svg 
                className="h-3 w-3" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M7 17L17 7M17 7H9M17 7v8" />
              </svg>
            </a>
          </Button>
        </div>
      </nav>
    </header>
  )
}
