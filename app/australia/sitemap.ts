/*
 * Next.js turns this function into the Australian XML sitemap for search engines.
 * Only the explicit public-page inventory is listed; private account data is never enumerated here.
 */
import type { MetadataRoute } from "next"
import { publicPages } from "@/features/australia/lib/public-pages"
import { canonicalUrl } from "@/features/australia/lib/site-path"

export default function sitemap(): MetadataRoute.Sitemap {
  // Omit lastModified unless it comes from a real content revision.
  return publicPages.map(page => ({ url: canonicalUrl(page.href) }))
}
