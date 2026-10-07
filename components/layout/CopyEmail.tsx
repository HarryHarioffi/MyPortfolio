"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";

/**
 * The email, big. Click (or tap, or Enter) copies it. With a mouse, a small label follows
 * the cursor and confirms the copy. A plain mailto link sits underneath for mail-app people.
 */
export function CopyEmail({ email }: { email: string }) {
  // "selected" = the browser refused to copy, so the address is highlighted for Ctrl/⌘+C instead.
  const [state, setState] = useState<"idle" | "copied" | "selected">("idle");
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const copied = state === "copied";

  useEffect(() => {
    if (state === "idle") return;
    const t = setTimeout(() => setState("idle"), state === "copied" ? 1800 : 4000);
    return () => clearTimeout(t);
  }, [state]);

  const track = (e: PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    setCursor({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      return setState("copied");
    } catch {
      // Some browsers and embedded views deny clipboard access. Fall back, never fail silently.
    }
    const ta = document.createElement("textarea");
    ta.value = email;
    ta.setAttribute("readonly", "");
    ta.style.cssText = "position:fixed;opacity:0;pointer-events:none";
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch {}
    ta.remove();
    if (ok) return setState("copied");

    const el = textRef.current;
    if (el) {
      const range = document.createRange();
      range.selectNodeContents(el);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
    }
    setState("selected");
  };

  return (
    <div>
      <button
        type="button"
        onClick={copy}
        onPointerMove={track}
        onPointerLeave={() => setCursor(null)}
        aria-label={`Copy my email address, ${email}`}
        className="group relative block max-w-full cursor-copy text-left"
      >
        <span
          ref={textRef}
          className="display block select-text text-[clamp(20px,5.2vw,76px)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink transition-colors duration-200 group-hover:text-accent"
        >
          {email}
        </span>
        <span
          aria-hidden="true"
          className="mt-3 block h-[2px] origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out-expo group-hover:scale-x-100 group-focus-visible:scale-x-100"
        />
        {cursor && (
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute left-0 top-0 whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors duration-150 ${
              copied ? "bg-accent text-paper" : "bg-ink text-paper"
            }`}
            style={{ transform: `translate(${cursor.x + 16}px, ${cursor.y + 18}px)` }}
          >
            {copied ? "Copied" : state === "selected" ? "Selected" : "Click to copy"}
          </span>
        )}
      </button>

      <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-1 text-[15px]">
        <a href={`mailto:${email}`} className="link-quiet font-medium text-ink">
          Open in your mail app
        </a>
        <span aria-live="polite" className="font-medium text-accent">
          {copied
            ? "Copied to your clipboard"
            : state === "selected"
              ? "Selected. Press Ctrl+C (⌘C on Mac) to copy."
              : ""}
        </span>
      </p>
    </div>
  );
}
