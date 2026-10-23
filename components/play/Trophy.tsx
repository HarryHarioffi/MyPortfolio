import { IconTrophy } from "./icons";

export type Place = 1 | 2 | 3;

/** Gold, silver and bronze, muted enough to sit on this site's paper. */
const MEDAL: Record<Place, string> = {
  1: "#cf9d2e",
  2: "#9aa6af",
  3: "#bb7640",
};

/** The Tabler trophy, in the medal's colour. Size it with a size-* class. */
export function Trophy({ place, className }: { place: Place; className?: string }) {
  return <IconTrophy className={className} style={{ color: MEDAL[place] }} />;
}
