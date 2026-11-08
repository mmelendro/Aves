/** Temporary, tab-only guest basket. Never put preferences into URLs or tracking.
 * Saving an owned trip is separate; this basket is not a database save receipt.
 * Only validated public species IDs are stored, with a one-day expiry, no names,
 * contact information, dates, questionnaire answers or account credentials.
 */
import { validNzBirdIds } from "@/content/new-zealand-checklist"

export const NZ_BIRD_BASKET_KEY = "aves:nz-bird-basket:v1"
const lifetime = 24 * 60 * 60 * 1000

export function readNzBirdBasket(storage: Pick<Storage, "getItem" | "removeItem">, now = Date.now()): string[] {
  try {
    const value = JSON.parse(storage.getItem(NZ_BIRD_BASKET_KEY) || "null")
    if (value?.version === 1 && Number.isFinite(value.at) && now >= value.at && now - value.at <= lifetime && validNzBirdIds(value.ids)) return value.ids
    storage.removeItem(NZ_BIRD_BASKET_KEY)
  } catch { /* Blocked storage is handled by keeping the visible basket in memory. */ }
  return []
}

export function writeNzBirdBasket(storage: Pick<Storage, "setItem" | "removeItem">, ids: string[], now = Date.now()): boolean {
  if (!validNzBirdIds(ids)) return false
  try {
    if (ids.length) storage.setItem(NZ_BIRD_BASKET_KEY, JSON.stringify({ version: 1, at: now, ids }))
    else storage.removeItem(NZ_BIRD_BASKET_KEY)
    return true
  } catch { return false }
}

/** Consume only birds in a server-confirmed save; preserve newer unimported picks. */
export function consumeNzBirdBasket(storage: Storage, saved: string[]) {
  const remaining = readNzBirdBasket(storage).filter(id => !saved.includes(id))
  return writeNzBirdBasket(storage, remaining)
}
