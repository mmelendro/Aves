/** Enhance only known public routes in the current app. Account/auth/API and
 * external links keep their normal document request and security boundaries. */
export function mediaClientHref(href: string, current: string, paths: readonly string[], base = ""): string | null {
  const origin = new URL(current)
  const target = new URL(href, current)
  if (target.origin !== origin.origin || !["https:", "http:"].includes(target.protocol) ||
    target.username || target.password || !paths.includes(target.pathname.replace(/\/$/, "") || "/")) return null
  // Hash-only navigation already preserves the document and native focus.
  if (target.pathname === origin.pathname && target.search === origin.search) return null
  return (base ? target.pathname.slice(base.length) || "/" : target.pathname) + target.search + target.hash
}
