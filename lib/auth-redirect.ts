import { SITE_BASE_PATH, sitePath } from "@/lib/site-path"

export function safeAuthNext(value: string | null): string {
  const fallback = sitePath("/account")
  if (!value || !value.startsWith("/") || value.startsWith("//") || /[\\\u0000-\u0020\u007f%]/.test(value)) return fallback
  const target = sitePath(value)
  const parsed = new URL(target, "https://internal.invalid")
  if (parsed.origin !== "https://internal.invalid" || ![`${SITE_BASE_PATH}/account`, `${SITE_BASE_PATH}/admin`].some(prefix => parsed.pathname === prefix || parsed.pathname.startsWith(prefix + "/"))) return fallback
  return parsed.pathname + parsed.search + parsed.hash
}
