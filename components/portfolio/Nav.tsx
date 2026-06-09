"use client";

const items = [
  { id: "intro", label: "intro" },
  { id: "work", label: "work" },
  { id: "about", label: "about" },
  { id: "process", label: "process" },
  { id: "extras", label: "extras" },
];

export function Nav() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(96vw,860px)]">
      <div className="flex items-center justify-between gap-2 rounded-full border border-ink/10 bg-bone/80 backdrop-blur-md pl-4 pr-2 py-2 shadow-[0_8px_30px_rgba(14,14,16,0.06)]">
        <span className="font-mono text-xs tracking-tight text-ink/70 hidden sm:inline">
          harry — portfolio
        </span>
        <nav className="flex items-center gap-1 font-mono text-xs">
          {items.map((it) => (
            <button
              key={it.id}
              onClick={() => scrollTo(it.id)}
              className="px-3 py-1.5 rounded-full text-ink/80 hover:bg-ink/5 hover:text-ink transition-colors cursor-pointer"
            >
              {it.label}
            </button>
          ))}
        </nav>
        <button
          onClick={() => scrollTo("contact")}
          className="px-4 py-1.5 rounded-full bg-ink text-bone font-mono text-xs hover:opacity-90 transition cursor-pointer"
        >
          let's talk
        </button>
      </div>
    </header>
  );
}
