// Keep in sync with next.config.mjs. Next Link/redirect add this themselves;
// native browser requests and public asset URLs need the prefix explicitly.
export const SITE_BASE_PATH = "/australia"

export function sitePath(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path
  if (path === SITE_BASE_PATH || ["/", "?", "#"].some(suffix => path.startsWith(`${SITE_BASE_PATH}${suffix}`))) {
    return path
  }
  if (path === "/" || path.startsWith("/?") || path.startsWith("/#")) return SITE_BASE_PATH + path.slice(1)
  return SITE_BASE_PATH + path
}

export function isSiteHome(pathname: string): boolean {
  return pathname.replace(/\/$/, "") === SITE_BASE_PATH
}

export function canonicalUrl(path = "/"): string {
  const origin = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://aves.bio").origin
  return new URL(sitePath(path), origin).href
}
