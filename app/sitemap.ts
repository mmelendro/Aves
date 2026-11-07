/**
 * Next.js metadata route that becomes /sitemap.xml for search engines.
 * Only the curated publicPages list is included; this is separate from the visible
 * /site-map page. A sitemap is a discovery aid, never a privacy boundary.
 */
import type { MetadataRoute } from "next"
import { publicPages } from "@/lib/public-pages"
import { canonicalUrl } from "@/lib/site-path"

export default function sitemap(): MetadataRoute.Sitemap {
  // Omit lastModified unless it comes from a real content revision.
  return publicPages.map(page => ({ url: canonicalUrl(page.href) }))
}
