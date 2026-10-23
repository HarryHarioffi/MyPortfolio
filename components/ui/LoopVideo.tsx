"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  poster?: string;
  label: string;
  /** Show a pause/play button. Leave off inside links: a button can't live in an <a>. */
  controls?: boolean;
  /** Start loading the file right away (the cover at the top of a page). */
  priority?: boolean;
  /** For the poster image, like next/image's `sizes`. */
  sizes?: string;
  className?: string;
};

/**
 * A muted, looping clip that behaves: it only plays while on screen, it stays on its
 * poster for people who ask for reduced motion, and (with `controls`) it can be paused,
 * since anything that moves for more than five seconds needs a way to stop it.
 */
export function LoopVideo({ src, poster, label, controls = false, priority = false, sizes = "100vw", className = "" }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  // "auto" follows the motion preference; a click overrides it either way.
  const [choice, setChoice] = useState<"auto" | "play" | "pause">("auto");
  const [reduced, setReduced] = useState(false);
  const [playing, setPlaying] = useState(false);
  // Until the first real frame plays, show the poster as an image on top. Browsers disagree on
  // when a <video> swaps its poster for frame one, and frame one of a loop is often its emptiest.
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const wantsPlay = choice === "play" || (choice === "auto" && !reduced);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    // React doesn't always reflect `muted` as an attribute, and browsers only autoplay muted video.
    v.muted = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && wantsPlay) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.2 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [wantsPlay]);

  return (
    <>
      <video
        ref={ref}
        className={className}
        src={src}
        poster={poster}
        aria-label={label}
        muted
        loop
        playsInline
        preload={priority ? "auto" : "metadata"}
        onPlay={() => setPlaying(true)}
        onPlaying={() => setStarted(true)}
        onPause={() => setPlaying(false)}
      />
      {poster && (
        <Image
          src={poster}
          alt=""
          aria-hidden="true"
          fill
          sizes={sizes}
          loading={priority ? "eager" : undefined}
          fetchPriority={priority ? "high" : undefined}
          className={`pointer-events-none object-cover transition-opacity duration-300 ${started ? "opacity-0" : "opacity-100"}`}
        />
      )}
      {controls && (
        <button
          type="button"
          onClick={() => setChoice(playing ? "pause" : "play")}
          aria-label={playing ? "Pause animation" : "Play animation"}
          className="absolute bottom-3 right-3 flex size-9 items-center justify-center bg-paper/90 text-ink shadow-[0_1px_2px_rgb(42_48_53/0.12)] backdrop-blur-sm transition-colors hover:bg-paper"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
            {playing ? <path d="M3 2h3v10H3zM8 2h3v10H8z" /> : <path d="M3.5 2v10l8-5z" />}
          </svg>
        </button>
      )}
    </>
  );
}
