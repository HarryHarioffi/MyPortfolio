import type { ReactNode } from "react";

/**
 * The template's two-column row: teal label on the left, content on the right.
 * The label is the section's h2; sub-rows inside a section pass labelAs="p".
 */
export function Row({ label, children, labelAs: Label = "h2" }: { label: string; children: ReactNode; labelAs?: "h2" | "p" }) {
  return (
    <div className="grid gap-4 md:grid-cols-[200px_1fr] md:gap-10">
      <Label className="pt-0 text-base font-medium text-accent md:pt-3.5">{label}</Label>
      <div className="min-w-0 max-w-[960px]">{children}</div>
    </div>
  );
}

/** Lines a figure up with the right-hand column of a Row, so text and images share one edge. */
export function Aligned({ children }: { children: ReactNode }) {
  return <div className="max-w-[960px] md:ml-[240px]">{children}</div>;
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
