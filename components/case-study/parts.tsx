import type { ReactNode } from "react";

/** The template's two-column row: teal label on the left, content on the right. */
export function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-4 md:grid-cols-[200px_1fr] md:gap-10">
      <h2 className="pt-0 text-base font-medium text-accent md:pt-3.5">{label}</h2>
      <div className="min-w-0 max-w-[960px]">{children}</div>
    </div>
  );
}

/** The big statement that opens each section. */
export function Lead({ children }: { children: ReactNode }) {
  return (
    <p className="display max-w-[820px] text-[clamp(28px,3.4vw,40px)] font-medium leading-[1.2] tracking-[-0.6px]">
      {children}
    </p>
  );
}

export function Copy({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`prose-copy text-copy text-muted ${className}`}>{children}</p>;
}

/** Vertical rhythm between sections: generous, like the template. */
export function Block({
  id,
  children,
  className = "",
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`reveal flex flex-col gap-12 ${className}`}>
      {children}
    </section>
  );
}
