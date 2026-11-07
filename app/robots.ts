/**
 * Next.js metadata route that becomes /robots.txt. Preview deployments discourage
 * all crawling; production lists public sitemaps and excludes private/legacy URL paths.
 * Robots instructions are voluntary crawler guidance, not authorization or access control.
 */
import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") {
    return { rules: { userAgent: "*", disallow: "/" } }
  }
  // This root file governs both sites on aves.bio. Crawling rules are not access control.
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/auth/", "/account", "/admin", "/dashboard", "/shopping", "/australia/api/", "/australia/auth/", "/australia/account", "/australia/admin"],
    },
    sitemap: ["https://aves.bio/sitemap.xml", "https://aves.bio/australia/sitemap.xml"],
  }
}
