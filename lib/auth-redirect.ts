/**
 * Allowlist post-sign-in destinations rather than trusting a next= query value.
 * An unrestricted return URL could send a visitor to another website after sign-in.
 * Invalid input falls back to the shared /account page.
 */

import { SITE_BASE_PATH, sitePath } from "@/lib/site-path"

/**
 * Return a local account/admin destination from untrusted input, or /account as the fallback.
 */
export function safeAuthNext(value: string | null): string {
  const fallback = "/account"
  if (!value || !value.startsWith("/") || value.startsWith("//") || /[\\\u0000-\u0020\u007f]/.test(value)) return fallback
  // Encoded path separators are unsafe. Encoded query values are needed for a
  // sign-in screen's nested next=/account?country=... during session handover.
  if (value.split(/[?#]/, 1)[0].includes("%")) return fallback
  const target = sitePath(value)
  const parsed = new URL(target, "https://internal.invalid")
  if (parsed.origin !== "https://internal.invalid" || ![`${SITE_BASE_PATH}/account`, `${SITE_BASE_PATH}/admin`].some(prefix => parsed.pathname === prefix || parsed.pathname.startsWith(prefix + "/"))) return fallback
  const path = parsed.pathname + parsed.search + parsed.hash
  return parsed.pathname.startsWith(`${SITE_BASE_PATH}/account`) ? path.slice(SITE_BASE_PATH.length) : path
}
