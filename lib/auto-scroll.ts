import { unstable_cache } from "next/cache"
import cards from "@/lib/data/auto-scroll-cards.json"

export type AutoScrollCard = {
  id: string
  src: string
  alt: string
  width: number
  height: number
}

export const getAutoScrollCards = unstable_cache(
  async (): Promise<AutoScrollCard[]> => {
    // Could be swapped to fetch from CMS later; JSON import keeps it static
    return cards
  },
  ["auto-scroll-cards:v1"],
  { revalidate: 60 },
)
