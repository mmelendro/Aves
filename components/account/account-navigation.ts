import { safeAuthNext } from "@/lib/auth-redirect"
import { SITE_BASE_PATH } from "@/lib/site-path"

export type AccountSearchParams = Record<string, string | string[] | undefined>

// Framework links receive unprefixed paths; native navigation uses sitePath.
export function accountReturnPath(value?: string | null): string {
  return safeAuthNext(value || null).slice(SITE_BASE_PATH.length)
}

export function accountEntryHref(path: string, next?: string | null): string {
  const destination = accountReturnPath(next)
  return destination === "/account" ? path : `${path}?next=${encodeURIComponent(destination)}`
}

export function accountNextFromSearch(search: AccountSearchParams): string {
  return accountReturnPath(typeof search.next === "string" ? search.next : null)
}
