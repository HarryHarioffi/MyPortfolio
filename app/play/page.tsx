import type { Metadata } from "next";
import { PlayArena } from "@/components/play/PlayArena";
import { play } from "@/content/play";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Play",
  description: `Short games for designers and design engineers by ${site.name}. Play, score, and see the board.`,
};

/** The games, all on one page. Content lives in content/play.ts. */
export default function PlayPage() {
  return (
    <div className="mx-auto max-w-page px-6 pb-28 pt-14 md:pt-20">
      <p className="text-base font-medium text-accent">Play</p>
      <h1 className="mt-2 max-w-[36em] text-pretty text-copy-lg text-ink">{play.heading}</h1>
      <div className="mt-10">
        <PlayArena />
      </div>
    </div>
  );
}
