import { cache } from "react"
import data from "./data/projects.json"

export type Project = {
  id: string
  company: string
  status: string
  year: number
  title: string
  description: string
  image: string
  href: string
}

// Cached at RSC level; page is static so this stays fast
export const getProjects = cache(async (): Promise<Project[]> => {
  return data as Project[]
})
