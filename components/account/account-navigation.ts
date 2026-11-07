/**
 * Build sign-in links while preserving an allowlisted account return path.
 * Query strings are visitor-controlled, so all return destinations pass through
 * safeAuthNext instead of becoming unchecked redirects.
 */

import { safeAuthNext } from "@/lib/auth-redirect"

export type AccountSearchParams = Record<string, string | string[] | undefined>

// Account navigation is native and stays on the global /account address.
/**
 * Normalize untrusted return input through the shared auth allowlist.
 */
export function accountReturnPath(value?: string | null): string {
  return safeAuthNext(value || null)
}

/**
 * Attach a safe next destination to a known account-entry path only when needed.
 */
export function accountEntryHref(path: string, next?: string | null): string {
  const destination = accountReturnPath(next)
  return destination === "/account" ? path : `${path}?next=${encodeURIComponent(destination)}`
}

/**
 * Read one next query value; duplicate/array values fall back to the account home.
 */
export function accountNextFromSearch(search: AccountSearchParams): string {
  return accountReturnPath(typeof search.next === "string" ? search.next : null)
}
