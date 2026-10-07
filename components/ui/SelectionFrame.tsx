import type { ReactNode } from "react";

const handles = [
  "-left-[3px] -top-[3px]",
  "-right-[3px] -top-[3px]",
  "-bottom-[3px] -left-[3px]",
  "-bottom-[3px] -right-[3px]",
];

/**
 * A Figma-style selection: accent outline, four corner handles, and a layer label above.
 * Shared by the home demo and the name on /about, so both read as "the design view".
 */
export function SelectionFrame({
  label,
  children,
  className = "",
  chromeClassName = "",
}: {
  label: ReactNode;
  children: ReactNode;
  className?: string;
  /** Applied to the outline and label only, e.g. to fade the selection without fading the content. */
  chromeClassName?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <span
        aria-hidden="true"
        className={`absolute -top-[26px] left-[-5px] whitespace-nowrap font-sans text-[12px] font-medium leading-none tabular-nums tracking-normal text-accent ${chromeClassName}`}
      >
        {label}
      </span>
      <span className={`pointer-events-none absolute -inset-[5px] border border-accent ${chromeClassName}`} aria-hidden="true">
        {handles.map((p) => (
          <i key={p} className={`absolute size-[6px] border border-accent bg-paper ${p}`} />
        ))}
      </span>
      {children}
    </div>
  );
}
