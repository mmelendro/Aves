import { z } from "zod"
import { isKnownTripCountry, type TripCountry } from "@/content/trip-options"
export const singleLine = (max: number) => z.string().trim().max(max).regex(/^[^\u0000-\u001f\u007f]*$/)
export const revision = z.string().min(1).max(50).refine(value => Number.isFinite(Date.parse(value)))
export const planFields = {
  title: singleLine(120).min(1), country: z.custom<TripCountry>(isKnownTripCountry, "Choose a known destination country").optional(), regions: z.array(singleLine(160).min(1)).max(20),
  travelWhen: singleLine(160), partySize: singleLine(40), message: z.string().trim().max(5000),
}
export const createPlanSchema = z.object({ id: z.uuid(), ...planFields }).strict()
export const updatePlanSchema = z.object({ ...planFields, expectedUpdatedAt: revision }).strict()
export const quoteSchema = z.object({ expectedUpdatedAt: revision, contactName: singleLine(120).min(1) }).strict()
export const revisionSchema = z.object({ expectedUpdatedAt: revision }).strict()
export const proposalFields = {
  totalCents: z.number().int().min(1).max(100_000_000), currency: z.literal("AUD"),
  itinerary: z.string().trim().min(1).max(10000), inclusions: z.string().trim().max(5000),
  exclusions: z.string().trim().max(5000), validUntil: z.iso.date().nullable(),
}
export const createProposalSchema = z.object({ id: z.uuid(), ...proposalFields }).strict()
export const updateProposalSchema = z.object({ ...proposalFields, expectedUpdatedAt: revision }).strict()
export const quoteStatusSchema = z.object({ status: z.enum(["reviewing", "responded", "closed"]) }).strict()

export type PlanRow = { id: string; title: string; details: { country?: TripCountry; regions: string[]; travelWhen: string; partySize: string; message: string }; status: "draft" | "quote_requested"; updated_at: string; create_payload_hash?: string }
export function mapPlan(row: PlanRow) {
  return { id: row.id, title: row.title, ...row.details, country: row.details.country || "australia", status: row.status, updatedAt: row.updated_at }
}
export type ProposalRow = {
  id: string; quote_request_id: string; version: number; status: "draft" | "sent"; total_cents: number; currency: "AUD";
  itinerary: string; inclusions: string; exclusions: string; valid_until: string | null;
  issued_at: string | null; updated_at: string; notification_status: "pending" | "accepted" | "failed";
}
export function mapProposal(row: ProposalRow) {
  return { id: row.id, quoteRequestId: row.quote_request_id, version: row.version, status: row.status,
    totalCents: row.total_cents, currency: row.currency, itinerary: row.itinerary, inclusions: row.inclusions,
    exclusions: row.exclusions, validUntil: row.valid_until, issuedAt: row.issued_at, updatedAt: row.updated_at,
    notificationStatus: row.notification_status }
}
