"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Media } from "@/content/types";
import { MediaSlot } from "@/components/ui/MediaSlot";

type Props = {
  media: Media;
  sizes?: string;
  /** Overlay the caption on the board. Off where a heading right below already names it. */
  showCaption?: boolean;
  /** Index of the marker to pick out; the others dim. */
  activeMarker?: number | null;
  /** Aspect ratio for the placeholder slot, when there is no file yet. */
  ratio?: string;
  className?: string;
};

/**
 * A case-study board: one focused crop of the product on a tinted background, like a
 * figure in a printed case study. The caption sits in the band each board leaves at the top
 * (under the image on phones), markers point at what the notes describe, and a click opens
 * the full-resolution file so small text can be read.
 */
export function Figure({
  media,
  sizes = "(min-width: 1280px) 1200px, 100vw",
  showCaption = true,
  activeMarker = null,
  ratio = "16 / 9",
  className = "",
}: Props) {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const d = dialog.current;
    if (open && d && !d.open) d.showModal();
  }, [open]);

  // Every way out (button, backdrop, Escape) runs this, synchronously: close first so the page
  // behind stops being inert, then hand focus back to the image. Explicitly, because Safari
  // doesn't focus a button on click, so the dialog has nothing to restore focus to.
  const close = () => {
    const d = dialog.current;
    if (d?.open) d.close();
    setOpen(false);
    trigger.current?.focus({ preventScroll: true });
  };

  if (!media.src || media.video || !media.width || !media.height) {
    return (
      <figure className={className}>
        <MediaSlot media={media} ratio={ratio} sizes={sizes} />
        {media.src && media.caption && <figcaption className="mt-3 text-[14px] text-muted">{media.caption}</figcaption>}
      </figure>
    );
  }

  const markers = media.markers ?? [];

  return (
    <figure className={`relative ${className}`}>
      <div className="relative overflow-hidden bg-canvas">
        <button
          ref={trigger}
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Enlarge: ${media.caption ?? media.alt}`}
          data-cursor="Enlarge"
          data-cursor-icon="eye"
          className="group/zoom block w-full"
        >
          <Image
            src={media.src}
            alt={media.alt}
            width={media.width}
            height={media.height}
            sizes={sizes}
            className="h-auto w-full transition-transform duration-700 ease-out-expo group-hover/zoom:scale-[1.012]"
          />
        </button>
        {markers.map((m, i) => (
          <span
            key={i}
            aria-hidden="true"
            data-active={activeMarker === i ? "true" : activeMarker === null ? undefined : "false"}
            className="figure-marker"
            style={{ left: `${m.x}%`, top: `${m.y}%` } as CSSProperties}
          >
            {i + 1}
          </span>
        ))}
      </div>
      {media.caption && (
        <figcaption
          className={`mt-3 text-[14px] text-muted ${
            showCaption
              ? "sm:pointer-events-none sm:absolute sm:left-[4.5%] sm:top-[4.1%] sm:mt-0 sm:text-[clamp(12px,1.15vw,16px)] sm:font-medium sm:text-ink"
              : ""
          }`}
        >
          {media.caption}
        </figcaption>
      )}

      <dialog
        ref={dialog}
        className="zoom-dialog"
        aria-label={media.caption ?? media.alt}
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onClose={() => setOpen(false)}
        onClick={(e) => {
          // A click on the backdrop lands on the dialog itself; one on the image does not.
          if (e.target === e.currentTarget) close();
        }}
      >
        {open && (
          <>
            <Image src={media.src} alt={media.alt} width={media.width} height={media.height} sizes="96vw" className="block h-auto w-full" />
            <button
              type="button"
              autoFocus
              onClick={close}
              className="absolute right-3 top-3 flex size-10 items-center justify-center bg-paper/90 text-ink shadow-[0_1px_2px_rgb(42_48_53/0.12)] hover:bg-paper"
              aria-label="Close"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </>
        )}
      </dialog>
    </figure>
  );
}

/** The final screen with numbered markers, and the notes under it. Hovering a note picks out its marker. */
export function AnnotatedFigure({ media, notes }: { media: Media; notes: string[] }) {
  const [active, setActive] = useState<number | null>(null);
  return (
    <div className="flex flex-col gap-6">
      <Figure media={media} activeMarker={active} sizes="(min-width: 1280px) 880px, 100vw" />
      <ol className="grid gap-1 sm:grid-cols-2 sm:gap-x-6">
        {notes.map((note, i) => (
          <li
            key={note}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            className={`flex gap-3.5 p-3 text-copy text-body transition-colors duration-200 ${active === i ? "bg-canvas" : ""}`}
          >
            <span className="mt-px flex size-6 shrink-0 items-center justify-center bg-accent text-[13px] font-semibold text-paper">
              {i + 1}
            </span>
            <span>{note}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
