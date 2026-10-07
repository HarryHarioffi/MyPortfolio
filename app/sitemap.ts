import type { MetadataRoute } from "next";
import { caseStudies } from "@/content";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, lastModified: new Date() },
    { url: `${site.url}/about`, lastModified: new Date() },
    ...caseStudies.map((c) => ({ url: `${site.url}/work/${c.slug}`, lastModified: new Date() })),
  ];
}
