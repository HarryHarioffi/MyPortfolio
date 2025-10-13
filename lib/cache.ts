import { unstable_cache } from "next/cache"
import { getProjects, type Project } from "./projects"

// Returns the top N featured projects (default 3) with ISR caching.
// This is safe to import from RSCs and route handlers.
export const getFeaturedProjects = unstable_cache(
  async (limit = 3): Promise<Project[]> => {
    const projects = await getProjects()
    return projects.slice(0, Math.max(0, limit))
  },
  ["featured-projects"],
  { revalidate: 3600 }, // 1 hour ISR
)
