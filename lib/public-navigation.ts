/** Use the existing public registries for navigation and the unified sitemap.
 * Private/auth/API routes stay native and never enter the media allowlist. */
import { publicPages } from "@/lib/public-pages"
import { publicPages as australianPages } from "@/features/australia/lib/public-pages"
import { sitePath as australiaPath } from "@/features/australia/lib/site-path"

export const publicNavigationPaths = [...new Set([
  ...publicPages.map(page => page.href),
  ...australianPages.map(page => australiaPath(page.href)),
])]
