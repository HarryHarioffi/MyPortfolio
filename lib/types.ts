export type Project = {
  slug: string
  title: string
  description: string
  tags: string[]
  year: number
  image?: string
  featured?: boolean
  links?: {
    demo?: string
    repo?: string
  }
}
