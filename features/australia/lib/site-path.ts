/**
 * Paths for the Australian public routes inside the unified application.
 * Use sitePath for public asset URLs and the country SiteLink for navigation.
 * Shared account links instead
 * use account-path.ts so they remain at the main domain root.
 */

// This is a public destination prefix, not a Next.js application basePath;
// links, native browser requests and public asset URLs use it explicitly.
export const SITE_BASE_PATH = "/australia"

/**
 * Prefix a local path once with /australia; preserve external URLs as supplied.
 */
export function sitePath(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path
  if (path === SITE_BASE_PATH || ["/", "?", "#"].some(suffix => path.startsWith(`${SITE_BASE_PATH}${suffix}`))) {
    return path
  }
  if (path === "/" || path.startsWith("/?") || path.startsWith("/#")) return SITE_BASE_PATH + path.slice(1)
  return SITE_BASE_PATH + path
}

/**
 * Recognize the Australian home path after trailing-slash normalization.
 */
export function isSiteHome(pathname: string): boolean {
  return pathname.replace(/\/$/, "") === SITE_BASE_PATH
}

/**
 * Build an absolute Australian URL using the configured public website origin.
 */
export function canonicalUrl(path = "/"): string {
  const origin = "https://aves.bio"
  return new URL(sitePath(path), origin).href
}
