import type { ReactNode } from "react";

/**
 * Marks "[like this]" placeholders in case-study copy as a dashed slot, the way MediaSlot marks
 * a missing image. An unfilled number should look unfilled, never pass for real data.
 */
export function slots(text: string): ReactNode {
  const parts = text.split(/(\[[^\]]+\])/g);
  if (parts.length === 1) return text;
  return parts.map((part, i) =>
    part.startsWith("[") && part.endsWith("]") ? (
      <mark key={i} className="slot-text" title="Placeholder, still to be filled in">
        {part.slice(1, -1)}
      </mark>
    ) : (
      part
    ),
  );
}
