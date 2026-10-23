import Image from "next/image";
import type { ReactNode } from "react";
import type { Media } from "@/content/types";
import { LoopVideo } from "./LoopVideo";

type Props = {
  media: Media;
  /** CSS aspect-ratio, e.g. "1200 / 620". Omit to fill the parent's height instead. */
  ratio?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Drawn stand-in for when there is no file yet (covers). Without it, a labelled dashed slot shows. */
  art?: ReactNode;
  /** Give a video a pause button. Leave off when the slot sits inside a link. */
  controls?: boolean;
};

/**
 * Renders a real image or video when `media.src` is set. Otherwise it renders `art` if given,
 * or the dashed slot from the Figma template, labelled with what belongs there.
 */
export function MediaSlot({
  media,
  ratio,
  className = "",
  sizes = "(min-width: 1280px) 1200px, 100vw",
  priority,
  art,
  controls,
}: Props) {
  // The file's own background shows while it loads, instead of the grey slot colour.
  const style = ratio || media.tint ? { aspectRatio: ratio, backgroundColor: media.tint } : undefined;
  const fill = ratio ? "" : "h-full";

  if (!media.src && art) {
    return (
      <div className={`relative overflow-hidden ${fill} ${className}`} style={style}>
        {art}
      </div>
    );
  }

  if (!media.src) {
    return (
      <div
        className={`media-slot flex items-center justify-center px-6 text-center text-[15px] font-medium leading-[22px] text-body ${fill} ${className}`}
        style={style}
        role="img"
        aria-label={`Placeholder: ${media.alt}`}
      >
        {media.alt}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-slot ${fill} ${className}`} style={style}>
      {media.video ? (
        <LoopVideo
          className="absolute inset-0 size-full object-cover"
          src={media.src}
          poster={media.poster}
          label={media.alt}
          controls={controls}
          priority={priority}
          sizes={sizes}
        />
      ) : (
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes={sizes}
          // Next 16 deprecated `priority`; an above-the-fold image loads eagerly at high priority instead.
          loading={priority ? "eager" : undefined}
          fetchPriority={priority ? "high" : undefined}
          className="object-cover"
        />
      )}
    </div>
  );
}
