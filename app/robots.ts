/*
 * Crawler instructions for this application. Preview deployments request no indexing.
 * These rules are not security controls: private pages and APIs must enforce access on the server.
 * The main domain also serves its own authoritative root robots.txt.
 */
import type { MetadataRoute } from "next"
import { canonicalUrl, SITE_BASE_PATH } from "@/lib/site-path"

export default function robots(): MetadataRoute.Robots {
  if (process.env.VERCEL_ENV !== "production" || !process.env.NEXT_PUBLIC_SITE_URL) {
    return { rules: { userAgent: "*", disallow: "/" } }
  }
  // aves.bio/robots.txt is authoritative; it also advertises this app's sitemap.
  return {
    rules: {
      userAgent: "*",
      allow: SITE_BASE_PATH,
      disallow: ["/account", "/admin", "/auth/", "/api/"].map(path => SITE_BASE_PATH + path),
    },
    sitemap: canonicalUrl("/sitemap.xml"),
  }
}

