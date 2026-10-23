import type { Game } from "@/lib/leaderboard";
import { IconBezier, IconLetterSpacing, IconSpline } from "./icons";

/** Each game's mark in the tab strip: a curve between two points, a pen path with handles, spaced letters. */
export function GameIcon({ game, className = "" }: { game: Game; className?: string }) {
  const Icon = game === "ease-match" ? IconSpline : game === "pen-tool" ? IconBezier : IconLetterSpacing;
  return <Icon size={18} className={className} />;
}
