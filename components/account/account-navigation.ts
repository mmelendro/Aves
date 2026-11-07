import { safeAuthNext } from "@/lib/auth-redirect"

export type AccountSearchParams = Record<string, string | string[] | undefined>

// Account navigation is native and stays on the global /account address.
export function accountReturnPath(value?: string | null): string {
  return safeAuthNext(value || null)
}

export function accountEntryHref(path: string, next?: string | null): string {
  const destination = accountReturnPath(next)
  return destination === "/account" ? path : `${path}?next=${encodeURIComponent(destination)}`
}

export function accountNextFromSearch(search: AccountSearchParams): string {
  return accountReturnPath(typeof search.next === "string" ? search.next : null)
}
