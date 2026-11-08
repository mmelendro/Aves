/** Allow only local account/admin return paths, including safe legacy bookmarks. */
export function safeAuthNext(value: string | null): string {
  const fallback = "/account"
  if (!value || !value.startsWith("/") || value.startsWith("//") || /[\\\u0000-\u0020\u007f]/.test(value)) return fallback
  if (value.split(/[?#]/, 1)[0].includes("%")) return fallback
  const normalized = value.replace(/^\/australia(?=\/(?:account|admin)(?:[/?#]|$))/, "")
  const parsed = new URL(normalized, "https://internal.invalid")
  if (parsed.origin !== "https://internal.invalid" || !["/account", "/admin"].some(prefix => parsed.pathname === prefix || parsed.pathname.startsWith(prefix + "/"))) return fallback
  return parsed.pathname + parsed.search + parsed.hash
}
