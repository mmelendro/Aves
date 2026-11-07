/**
 * Paths for the Next.js application mounted at /australia.
 * Use sitePath for native fetch/asset URLs that do not receive Next.js basePath
 * handling. Next Link already handles that prefix. Shared account links instead
 * use account-path.ts so they remain at the main domain root.
 */

// Keep in sync with next.config.mjs. Next Link/redirect add this themselves;
// native browser requests and public asset URLs need the prefix explicitly.
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
  const origin = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://aves.bio").origin
  return new URL(sitePath(path), origin).href
}
