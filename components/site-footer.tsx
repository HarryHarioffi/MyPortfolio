import Link from "next/link"

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer id="contact" className="mt-24 border-t border-border/60">
      {/* Section container */}
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid grid-cols-1 gap-10 py-16 md:grid-cols-[320px_1fr]">
          {/* Left sticker/illustration */}
          <div className="hidden md:block">
            <div className="rounded-2xl bg-muted/20 p-4">
              <img
                src="/placeholder-user.jpg"
                alt="Profile photo"
                className="h-auto w-full rounded-xl object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right content */}
          <div className="flex flex-col">
            <p className="text-sm text-muted-foreground">
              {"You've made it to the end of quite the scroll.. Great job!"}
            </p>
            <h2 className="mt-2 text-pretty text-3xl font-semibold leading-tight text-foreground md:text-5xl lg:text-6xl">
              {"In some other universe, we're already friends. So why not in this one?"}
            </h2>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="mailto:hello@example.com"
                className="group inline-flex items-center gap-3 rounded-full bg-muted/30 px-5 py-3 text-base text-foreground ring-1 ring-border/40 transition-colors hover:bg-muted/40"
              >
                <span className="opacity-90">hello@example.com</span>
                <svg 
                className="h-4 w-4" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M7 17L17 7M17 7H9M17 7v8" />
              </svg>
                <span className="sr-only">Send email</span>
              </Link>

              <Link
                href="https://drive.google.com/file/d/REPLACE_WITH_YOUR_ID/view"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-muted/20 px-5 py-3 text-base text-foreground ring-1 ring-border/40 transition-colors hover:bg-muted/30"
              >
                <span>Download CV</span>
                <svg 
                className="h-4 w-4" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M7 17L17 7M17 7H9M17 7v8" />
              </svg>
              </Link>
            </div>


            {/* Divider + status line */}
            <hr className="mt-8 border-t border-border/60" />
            <div className="mt-5 flex items-center gap-3 text-sm text-foreground/90">
              <span className="inline-block h-3 w-3 rounded-full bg-green-500" aria-hidden />
              <p>{"I'm currently open to full-time opportunities! Let's create something amazing together!"} ✨</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom copyright bar */}
      <div className="mx-auto max-w-6xl px-4 pb-10 pt-6 text-center text-sm text-muted-foreground">
        © {year} • Hariharasudhan S • Crafted with clarity • Build with V0 and Cursor
      </div>
    </footer>
  )
}
