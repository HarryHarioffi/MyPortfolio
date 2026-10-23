import type { ButtonHTMLAttributes, ReactNode } from "react";

const LOOK = {
  primary: "bg-ink text-paper enabled:hover:bg-accent enabled:active:scale-[0.98]",
  outline: "border border-line bg-paper text-ink enabled:hover:bg-canvas enabled:active:scale-[0.98]",
  ghost: "text-body enabled:hover:bg-chip enabled:hover:text-ink",
} as const;

/** The play page's buttons. `icon` is a Tabler icon (see icons.tsx), shown before the label. */
export function Btn({
  look = "outline",
  icon,
  className = "",
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { look?: keyof typeof LOOK; icon?: ReactNode }) {
  return (
    <button
      type="button"
      {...props}
      className={`inline-flex h-10 items-center justify-center gap-2 px-4 text-[14px] font-medium transition-[background-color,color,transform] duration-150 ease-out-quart disabled:opacity-40 ${LOOK[look]} ${className}`}
    >
      {icon}
      {children}
    </button>
  );
}
