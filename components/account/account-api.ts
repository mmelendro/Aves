import { sitePath } from "@/lib/site-path"
import { regionLabels } from "@/content/region-options"
export { regionLabels } from "@/content/region-options"

export type TripFields = { title: string; regions: string[]; travelWhen: string; partySize: string; message: string }
export type TripPlan = TripFields & { id: string; status: "draft" | "quote_requested"; updatedAt: string }
export type ProposalFields = { totalCents: number; currency: "AUD"; itinerary: string; inclusions: string; exclusions: string; validUntil: string | null }
export type Proposal = ProposalFields & { id: string; quoteRequestId: string; version: number; status: "draft" | "sent"; issuedAt: string | null; updatedAt: string; notificationStatus: "pending" | "accepted" | "failed" }
export type OwnerQuote = { id: string; planId: string; status: string; contactName: string; contactEmail: string; submittedAt: string; plan: TripFields; notificationStatus: "pending" | "accepted" | "failed"; proposals: Proposal[] }

export class AccountRequestError extends Error {
  constructor(message: string, public status: number) { super(message) }
}

export async function accountRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(sitePath(path), { ...options, credentials: "same-origin", cache: "no-store", headers: { ...(options.body ? { "Content-Type": "application/json" } : {}), ...options.headers } })
  const result = await response.json().catch(() => null)
  if (!response.ok) {
    const fallback = response.status === 401 ? "Your session has expired. Please sign in again before continuing." : response.status === 409 ? "This item has changed. Reload the saved version before trying again; your unsaved details are still shown here." : "Your request could not be completed. Please try again."
    throw new AccountRequestError(typeof result?.error === "string" ? result.error : fallback, response.status)
  }
  if (!result || typeof result !== "object") throw new Error("The result could not be confirmed. Please try again.")
  return result as T
}

export function regionSummary(regions: string[]) { return regions.map(region => regionLabels[region] || region).join(", ") || "Open to inspiration" }
export function dateLabel(value: string | null | undefined) {
  if (!value) return "Not specified"
  const date = new Date(value.length === 10 ? `${value}T12:00:00Z` : value)
  return Number.isNaN(date.getTime()) ? "Not specified" : new Intl.DateTimeFormat("en-AU", { day: "numeric", month: "short", year: "numeric" }).format(date)
}
export function errorMessage(error: unknown) { return error instanceof Error ? error.message : "Something went wrong. Please try again." }
