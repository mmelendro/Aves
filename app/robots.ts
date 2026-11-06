import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/", "/account/", "/auth/", "/dashboard", "/shopping", "/australia/api/", "/australia/admin/", "/australia/account/", "/australia/auth/"],
    },
    sitemap: ["https://aves.bio/sitemap.xml", "https://aves.bio/australia/sitemap.xml"],
  }
}
