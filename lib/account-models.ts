/**
 * Runtime validation and database-to-API translations for plans and proposals.
 * Zod checks untrusted JSON; TypeScript types alone cannot. These rules do not
 * authorize access or open a destination for requests: handlers/database rules do.
 */

import { z } from "zod"
import { isKnownTripCountry, type TripCountry } from "@/content/trip-options"
import { budgetCurrencies } from "@/content/trip-budget"
import { planningChoices, type PlanningQuestionnaire } from "@/content/planning-questionnaire"
import { selectableNzBirds, validNzBirdIds } from "@/content/new-zealand-checklist"
import {MAX_PLAN_NOTES,MAX_PLAN_NOTES_BYTES} from "./planning-limits"
import {routePreferencesSchema} from "./route-preferences"

// A small structured model can grow by version without mixing answers into prose.
export const questionnaireSchema = z.object({
  version: z.literal(1),
  pace: z.enum(Object.keys(planningChoices.pace) as [keyof typeof planningChoices.pace, ...Array<keyof typeof planningChoices.pace>]),
  birding: z.enum(Object.keys(planningChoices.birding) as [keyof typeof planningChoices.birding, ...Array<keyof typeof planningChoices.birding>]),
  comfort: z.enum(Object.keys(planningChoices.comfort) as [keyof typeof planningChoices.comfort, ...Array<keyof typeof planningChoices.comfort>]),
  interests: z.array(z.enum(Object.keys(planningChoices.interests) as [keyof typeof planningChoices.interests, ...Array<keyof typeof planningChoices.interests>])).max(7).refine(values => new Set(values).size === values.length),
  budget: z.object({ currency: z.enum(budgetCurrencies), accommodation: z.number().int().min(0).max(10000).optional(), food: z.number().int().min(0).max(10000).optional(), activities: z.number().int().min(0).max(10000).optional() }).strict().refine(b => b.accommodation !== undefined || b.food !== undefined || b.activities !== undefined, "Enter at least one budget amount").optional(),
  birdIds: z.array(z.string().max(32)).max(selectableNzBirds.length).refine(validNzBirdIds, "Choose distinct living birds from the New Zealand checklist").optional(),
  routePreferences: routePreferencesSchema.optional(),
}).strict()
/**
 * Build a trimmed single-line text validator with a caller-selected maximum length.
 */
export const singleLine = (max: number) => z.string().trim().max(max).regex(/^[^\u0000-\u001f\u007f]*$/)
/**
 * Preserve the original timestamp as a concurrency token; do not round database precision.
 */
export const revision = z.string().min(1).max(50).refine(value => Number.isFinite(Date.parse(value)))
/**
 * Shared draft fields; destination availability and region membership are checked separately.
 */
export const planFields = {
  title: singleLine(120).min(1), country: z.custom<TripCountry>(isKnownTripCountry, "Choose a known destination country").optional(), regions: z.array(singleLine(160).min(1)).max(20),
  travelWhen: singleLine(160), partySize: singleLine(40), message: z.string().trim().max(MAX_PLAN_NOTES).refine(value=>new TextEncoder().encode(value).length<=MAX_PLAN_NOTES_BYTES),
  questionnaire: questionnaireSchema.optional(),
}
/**
 * New drafts have a UUID reused for retries; unexpected JSON fields are rejected.
 */
export const createPlanSchema = z.object({ id: z.uuid(), ...planFields }).strict().refine(value => !value.questionnaire || value.country === "new-zealand", "The planning questionnaire belongs to New Zealand")
/**
 * Edits include the last seen revision so a stale tab cannot silently overwrite newer work.
 */
export const updatePlanSchema = z.object({ ...planFields, expectedUpdatedAt: revision }).strict().refine(value => !value.questionnaire || value.country === "new-zealand", "The planning questionnaire belongs to New Zealand")
/**
 * The browser supplies a name/revision, while confirmed identity/email come from verified Auth.
 */
export const quoteSchema = z.object({ expectedUpdatedAt: revision, contactName: singleLine(120).min(1) }).strict()
/**
 * Delete/issue actions identify the exact saved version the person reviewed.
 */
export const revisionSchema = z.object({ expectedUpdatedAt: revision }).strict()
/**
 * Price is integer cents with explicit AUD currency; this represents a quote, not a payment.
 */
export const proposalFields = {
  totalCents: z.number().int().min(1).max(100_000_000), currency: z.literal("AUD"),
  itinerary: z.string().trim().min(1).max(10000), inclusions: z.string().trim().max(5000),
  exclusions: z.string().trim().max(5000), validUntil: z.iso.date().nullable(),
}
/**
 * Validate new proposal content plus its retry-safe UUID.
 */
export const createProposalSchema = z.object({ id: z.uuid(), ...proposalFields }).strict()
/**
 * Validate edited content and the expected current revision.
 */
export const updateProposalSchema = z.object({ ...proposalFields, expectedUpdatedAt: revision }).strict()
/**
 * Limit owner workflow status changes; a status change alone sends no email.
 */
export const quoteStatusSchema = z.object({ status: z.enum(["reviewing", "responded", "closed"]) }).strict()

export type PlanRow = { id: string; title: string; details: { country?: TripCountry; regions: string[]; travelWhen: string; partySize: string; message: string; questionnaire?: PlanningQuestionnaire }; status: "draft" | "quote_requested"; updated_at: string; create_payload_hash?: string }
/**
 * Translate a database row to browser fields; missing historical country means Australia.
 */
export function mapPlan(row: PlanRow) {
  return { id: row.id, title: row.title, ...row.details, country: row.details.country || "australia", status: row.status, updatedAt: row.updated_at }
}
export type ProposalRow = {
  id: string; quote_request_id: string; version: number; status: "draft" | "sent"; total_cents: number; currency: "AUD";
  itinerary: string; inclusions: string; exclusions: string; valid_until: string | null;
  issued_at: string | null; updated_at: string; notification_status: "pending" | "accepted" | "failed";
}
/**
 * Translate database fields for display; itinerary text is data, not executable markup.
 */
export function mapProposal(row: ProposalRow) {
  return { id: row.id, quoteRequestId: row.quote_request_id, version: row.version, status: row.status,
    totalCents: row.total_cents, currency: row.currency, itinerary: row.itinerary, inclusions: row.inclusions,
    exclusions: row.exclusions, validUntil: row.valid_until, issuedAt: row.issued_at, updatedAt: row.updated_at,
    notificationStatus: row.notification_status }
}
