"use client";

import type { KeyboardEvent, ReactNode } from "react";

type Item<T extends string> = { id: T; label: string; icon?: ReactNode };

/**
 * Tabs in two sizes. "strip" is the row of games along the top of the window, like tabs in a
 * design tool: the open one lifts onto the page, the rest sit in the bar. "segment" is the small
 * switch for the difficulty. Arrow keys move between tabs.
 */
export function Tabs<T extends string>({
  items,
  value,
  onChange,
  label,
  variant,
}: {
  items: readonly Item<T>[];
  value: T;
  onChange: (id: T) => void;
  label: string;
  variant: "strip" | "segment";
}) {
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const i = items.findIndex((t) => t.id === value);
    const next = items[(i + step + items.length) % items.length];
    onChange(next.id);
    e.currentTarget.querySelector<HTMLElement>(`[data-tab="${next.id}"]`)?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label={label}
      onKeyDown={onKeyDown}
      className={
        variant === "strip"
          ? "flex min-w-0 items-stretch overflow-x-auto [scrollbar-width:none]"
          : "inline-flex bg-chip p-0.5 text-[13px] font-medium"
      }
    >
      {items.map((t) => {
        const on = t.id === value;
        return (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={on}
            tabIndex={on ? 0 : -1}
            data-tab={t.id}
            onClick={() => onChange(t.id)}
            className={
              variant === "strip"
                ? `relative -mb-px inline-flex h-12 shrink-0 items-center gap-1.5 whitespace-nowrap border-r border-line px-3 text-[14px] sm:gap-2 sm:px-5 font-medium transition-colors duration-150 before:absolute before:inset-x-0 before:top-0 before:h-0.5 before:transition-colors ${
                    on
                      ? "bg-paper text-ink before:bg-accent"
                      : "text-muted before:bg-transparent hover:bg-paper/60 hover:text-ink"
                  }`
                : `h-8 min-w-16 px-3 transition-colors sm:min-w-[4.5rem] duration-150 ${
                    on ? "bg-paper text-ink shadow-[0_1px_2px_rgb(42_48_53/0.12)]" : "text-muted hover:text-ink"
                  }`
            }
          >
            {t.icon && <span className={on ? "text-accent" : ""}>{t.icon}</span>}
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
