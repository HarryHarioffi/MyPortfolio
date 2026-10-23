"use client";

import Link from "next/link";
import { useEffect, useState, type PointerEvent, type ReactNode } from "react";
import { copyText } from "@/lib/clipboard";

/**
 * Words you can touch, inside the home intro. On hover the accent floods in from the point
 * where the pointer crossed the edge, and drains back out toward where it left (.chip in globals.css).
 */
function trackEdge(e: PointerEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--fx", `${e.clientX - r.left}px`);
  el.style.setProperty("--fy", `${e.clientY - r.top}px`);
}

const edge = { onPointerEnter: trackEdge, onPointerLeave: trackEdge };

export function ChipLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="chip" {...edge}>
      {children}
    </Link>
  );
}

/** The same chip and hover fill, with nothing to click: for words that only want the touch. */
export function PlainChip({ children }: { children: ReactNode }) {
  return (
    <span className="chip" {...edge}>
      {children}
    </span>
  );
}

/** Copies the email. Both labels share one grid cell, so the chip keeps its width when it swaps. */
export function CopyChip({ email, label, done }: { email: string; label: string; done: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2200);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    if (await copyText(email)) setCopied(true);
    // Clipboard refused: hand over to the mail app rather than doing nothing.
    else window.location.href = `mailto:${email}`;
  };

  return (
    <>
      <button
        type="button"
        onClick={copy}
        data-cursor={copied ? "Copied" : "Copy email"}
        data-cursor-icon={copied ? "check" : "copy"}
        aria-label={`${label} Copy my email address, ${email}`}
        className="chip grid cursor-copy text-left"
        {...edge}
      >
        <span className={`[grid-area:1/1] ${copied ? "invisible" : ""}`}>{label}</span>
        <span className={`[grid-area:1/1] ${copied ? "" : "invisible"}`} aria-hidden="true">
          {done}
        </span>
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Email address copied" : ""}
      </span>
    </>
  );
}
