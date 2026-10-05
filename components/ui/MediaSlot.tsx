import Image from "next/image";
import type { Media } from "@/content/types";

type Props = {
  media: Media;
  /** CSS aspect-ratio, e.g. "1200 / 620". Matches the Figma slot heights. */
  ratio: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * Renders a real image or video when `media.src` is set. Otherwise it renders
 * the dashed grey-blue slot from the Figma template, labelled with what belongs there.
 */
export function MediaSlot({ media, ratio, className = "", sizes = "(min-width: 1280px) 1200px, 100vw", priority }: Props) {
  const style = { aspectRatio: ratio };

  if (!media.src) {
    return (
      <div
        className={`media-slot flex items-center justify-center px-6 text-center text-[15px] font-medium leading-[22px] text-muted ${className}`}
        style={style}
        role="img"
        aria-label={`Placeholder: ${media.alt}`}
      >
        {media.alt}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-[6px] bg-slot ${className}`} style={style}>
      {media.video ? (
        <video
          className="absolute inset-0 size-full object-cover"
          src={media.src}
          poster={media.poster}
          aria-label={media.alt}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
        />
      ) : (
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      )}
    </div>
  );
}
