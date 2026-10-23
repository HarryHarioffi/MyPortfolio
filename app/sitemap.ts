import type { MetadataRoute } from "next";
import { caseStudies } from "@/content";
import { site } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, lastModified: new Date() },
    { url: `${site.url}/lab`, lastModified: new Date() },
    { url: `${site.url}/apps`, lastModified: new Date() },
    { url: `${site.url}/play`, lastModified: new Date() },
    { url: `${site.url}/about`, lastModified: new Date() },
    ...caseStudies.map((c) => ({ url: `${site.url}/work/${c.slug}`, lastModified: new Date() })),
  ];
}
