/**
 * The shared account backend: route files delegate their work here.
 * Every handler verifies the current user. Ordinary plan reads/writes use that
 * user's Supabase client plus RLS; quote/owner workflows use narrowly named server
 * RPCs (database functions). Their actor IDs come from the verified session, never
 * from a browser-supplied user ID. Database functions must recheck those permissions.
 * Read docs/backend-code-tour.md for the complete browser-to-database flow.
 */

import "server-only"
import { createHash } from "node:crypto"
import type { SupabaseClient } from "@supabase/supabase-js"
import { z } from "zod"
import { requireAccountUser } from "@/lib/account-auth"
import { AccountError } from "@/lib/account-errors"
import { accountBody, accountHandler, requestKey } from "@/lib/account-http"
import { accountRpc } from "@/lib/account-service"
import { notifyAccount } from "@/lib/account-notifications"
import { canonicalUrl } from "@/lib/site-path"
import { accountUrl } from "@/lib/account-path"
import { countryLabels, isEnabledTripCountry, isCountryRegion, isOtherCountryRegion, DEFAULT_TRIP_COUNTRY } from "@/content/trip-options"
import { createPlanSchema, updatePlanSchema, quoteSchema, revisionSchema, createProposalSchema, updateProposalSchema, quoteStatusSchema, mapPlan, mapProposal, type PlanRow, type ProposalRow } from "@/lib/account-models"

const planColumns = "id,title,details,status,updated_at,create_payload_hash"
const proposalColumns = "id,quote_request_id,client_user_id,version,status,total_cents,currency,itinerary,inclusions,exclusions,valid_until,issued_at,updated_at,notification_status"
/**
 * Fingerprint validated data so a retry can be matched to its original request. This is not encryption.
 */
const hash = (value: unknown) => createHash("sha256").update(JSON.stringify(value)).digest("hex")
/**
 * Reject malformed record identifiers without revealing whether another person owns such a record.
 */
function uuid(value: string) {
  if (!z.uuid().safeParse(value).success) throw new AccountError(404, "This item could not be found.")
  return value
}
function storageFailed(): never { throw new AccountError(503, "We couldn't confirm this request. Please try again.") }
/**
 * Load id only for the verified userId through a user-scoped client; RLS is an additional check.
 * Missing and inaccessible plans both become 404 rather than disclosing other owners.
 */
async function ownPlan(client: SupabaseClient, userId: string, id: string): Promise<PlanRow> {
  const { data, error } = await client.from("trip_plans").select(planColumns).eq("id", uuid(id)).eq("user_id", userId).maybeSingle()
  if (error) storageFailed()
  if (!data) throw new AccountError(404, "This plan could not be found.")
  return data as PlanRow
}
// Keep Australia's original serialization so retries of pre-upgrade requests
// retain their original hash. Missing stored country always means Australia.
const planValues = ({ title, country, regions, travelWhen, partySize, message, questionnaire }: z.infer<typeof updatePlanSchema> | z.infer<typeof createPlanSchema>) => ({ title, details: { regions, travelWhen, partySize, message, ...(country !== undefined && country !== DEFAULT_TRIP_COUNTRY ? { country } : {}), ...(questionnaire ? { questionnaire } : {}) } })

/**
 * Return up to 100 of this visitor's plans and an owner-link hint. isAdmin is presentation only.
 */
export const plansGet = () => accountHandler(async () => {
  const { user, client } = await requireAccountUser()
  const { data, error } = await client.from("trip_plans").select(planColumns).eq("user_id", user.id).order("updated_at", { ascending: false }).limit(100)
  if (error || !data) storageFailed()
  // This flag only exposes an owner-workspace link. Every admin API still checks
  // the session-derived actor against the database owner grant.
  const isAdmin = await accountRpc<boolean>("account_admin_status", { p_user_id: user.id }).catch(() => false)
  return { plans: (data as PlanRow[]).map(mapPlan), isAdmin: isAdmin === true }
})

/**
 * Validate and save one owned draft, or return the exact original result of a same-key retry.
 * The browser supplies content/UUID; the verified session supplies user_id.
 */
export const plansPost = (request: Request) => accountHandler(async () => {
  const { user, client } = await requireAccountUser()
  const body = await accountBody(request, createPlanSchema)
  if (requestKey(request) !== body.id) throw new AccountError(400, "Please retry this plan with its original request reference.")
  const values = planValues(body), payloadHash = hash(values)
  const country = body.country ?? DEFAULT_TRIP_COUNTRY
  if (!isEnabledTripCountry(country)) {
    // Retired destinations accept only an exact replay of an owned saved plan.
    // Do not attempt INSERT even while catalogue/app rollout states differ.
    const original = await ownPlan(client, user.id, body.id).catch((error: unknown) => {
      if (error instanceof AccountError && error.status === 404) return null
      throw error
    })
    if (original && (original.details.country ?? DEFAULT_TRIP_COUNTRY) === country
      && original.create_payload_hash === payloadHash) return { plan: mapPlan(original) }
    throw new AccountError(400, "This destination is not available for new plans.")
  }
  if (!body.regions.every(region => isCountryRegion(body.country || "australia", region))) {
    // A pre-upgrade freeform request may still be retried. It can only return
    // that same owned, hash-matched plan; it cannot insert any new freeform row.
    const original = await ownPlan(client, user.id, body.id).catch((error: unknown) => {
      if (error instanceof AccountError && error.status === 404) return null
      throw error
    })
    if ((body.country ?? DEFAULT_TRIP_COUNTRY) === DEFAULT_TRIP_COUNTRY && original && (original.details.country ?? DEFAULT_TRIP_COUNTRY) === DEFAULT_TRIP_COUNTRY
      && original.create_payload_hash === payloadHash) return { plan: mapPlan(original) }
    throw new AccountError(400, "Choose regions in the selected country.")
  }
  // Assign ownership here, not from request JSON. RLS, column privileges and
  // triggers remain active because this client carries the visitor session.
  const { data, error } = await client.from("trip_plans").insert({ id: body.id, user_id: user.id, ...values, create_payload_hash: payloadHash }).select(planColumns).single()
  // A duplicate UUID may mean the first save succeeded but its response was lost.
  // Return that owned original only when the validated content fingerprint matches.
  if (error?.code === "23505") {
    const original = await ownPlan(client, user.id, body.id)
    if (original.create_payload_hash !== payloadHash) throw new AccountError(409, "This request has changed. Save it as a new plan.")
    return { plan: mapPlan(original) }
  }
  if (error?.code === "PT409") throw new AccountError(409, "You can keep up to 50 draft plans. Delete an unused draft or submit one for a quote before creating another.")
  if (error || !data) storageFailed()
  return { plan: mapPlan(data as PlanRow) }
})

/**
 * Update this user's current draft only; return 409 if its status/revision changed since the form loaded.
 */
export const planPatch = (request: Request, id: string) => accountHandler(async () => {
  const { user, client } = await requireAccountUser()
  const body = await accountBody(request, updatePlanSchema)
  const plan = await ownPlan(client, user.id, id)
  const country = body.country || "australia"
  if (!isEnabledTripCountry(country) && country !== (plan.details.country ?? DEFAULT_TRIP_COUNTRY)) {
    throw new AccountError(400, "This destination is not available for new plans.")
  }
  if (!body.regions.every(region => isCountryRegion(country, region) || (
    country === "australia" && (plan.details.country || "australia") === "australia"
    && plan.details.regions.includes(region) && !isOtherCountryRegion(country, region)
  ))) throw new AccountError(400, "Choose regions in the selected country. Existing Australian locations may be kept when editing the same plan.")
  if (plan.status !== "draft" || plan.updated_at !== body.expectedUpdatedAt) throw new AccountError(409, "This plan has changed or has already been submitted. Refresh it before continuing.")
  // Repeat status/revision checks in the UPDATE itself: another tab may have
  // changed the row after our earlier read. No matched row means a conflict.
  const { data, error } = await client.from("trip_plans").update(planValues(body)).eq("id", id).eq("user_id", user.id).eq("status", "draft").eq("updated_at", body.expectedUpdatedAt).select(planColumns).maybeSingle()
  if (error) storageFailed()
  if (!data) throw new AccountError(409, "This plan changed while you were saving it. Refresh and try again.")
  return { plan: mapPlan(data as PlanRow) }
})

/**
 * Delete only this user's unchanged draft, and return success after the database confirms deletion.
 */
export const planDelete = (request: Request, id: string) => accountHandler(async () => {
  const { user, client } = await requireAccountUser()
  const body = await accountBody(request, revisionSchema)
  const plan = await ownPlan(client, user.id, id)
  if (plan.status !== "draft" || plan.updated_at !== body.expectedUpdatedAt) throw new AccountError(409, "Only the current draft can be deleted.")
  const { data, error } = await client.from("trip_plans").delete().eq("id", id).eq("user_id", user.id).eq("status", "draft").eq("updated_at", body.expectedUpdatedAt).select("id").maybeSingle()
  if (error?.code === "23503") throw new AccountError(409, "Remove this trip’s private uploads before deleting the draft.")
  if (error) storageFailed()
  if (!data) throw new AccountError(409, "This plan changed while you were deleting it. Refresh and try again.")
  return { success: true }
})

type QuoteReceipt = { request_id: string; created: boolean; plan_id: string; submitted_at: string; status: string; notification_status: string; plan_snapshot: Pick<PlanRow, "title" | "details">; contact_name: string; contact_email: string; plan_updated_at: string }
/**
 * Freeze the owned plan into a quote request via an atomic database function, then notify the owner.
 * Return status=stored even if the separate email attempt cannot be confirmed.
 */
export const quotePost = (request: Request, id: string) => accountHandler(async () => {
  const { user } = await requireAccountUser()
  const body = await accountBody(request, quoteSchema)
  const key = requestKey(request)
  // The database function verifies this actor, locks the owned draft, rate-limits
  // new requests and freezes a snapshot in one transaction before returning.
  const receipt = await accountRpc<QuoteReceipt>("submit_quote_request", {
    p_client_user_id: user.id, p_plan_id: uuid(id), p_idempotency_key: key,
    p_payload_hash: hash({ planId: id, ...body }), p_expected_updated_at: body.expectedUpdatedAt,
    p_contact_name: body.contactName, p_contact_email: user.email,
  })
  const plan = mapPlan({ ...receipt.plan_snapshot, id: receipt.plan_id, updated_at: receipt.plan_updated_at, status: "quote_requested" })
  // A replay must not notify again. Storage is already committed; notification
  // failure does not roll back the plan snapshot or turn this into a booking.
  if (receipt.created) {
    if (plan.country === "new-zealand") {
      // Keep questionnaire answers and guest identity out of notification email.
      // The authorized owner reads the frozen snapshot in the private inbox.
      await notifyAccount("quote", receipt.request_id, "mmelendro@gmail.com", "New AVES New Zealand planning brief",
        `A New Zealand planning brief is saved for your review. Sign in to read the private answers: ${canonicalUrl("/admin/quotes")}\n\nPlanning only; no reservation or confirmed availability.`).catch(() => undefined)
    } else await notifyAccount("quote", receipt.request_id, "mmelendro@gmail.com", `[AVES ${countryLabels[plan.country]}] Quote request from ${receipt.contact_name}`,
      `A client requested a quote.\n\nCountry: ${countryLabels[plan.country]}\nName: ${receipt.contact_name}\nEmail: ${receipt.contact_email}\nSubmitted: ${receipt.submitted_at}\nPlan: ${plan.title}\nRegions: ${plan.regions.join(", ")}\nTiming: ${plan.travelWhen}\nParty: ${plan.partySize}\n\n${plan.message}\n\nReview securely: ${canonicalUrl("/admin/quotes")}`).catch(() => undefined)
  }
  return { success: true, status: "stored", requestId: receipt.request_id, plan }
})

/**
 * Return this client's issued proposals; owner-only drafts are excluded by the query and RLS.
 */
export const proposalsGet = () => accountHandler(async () => {
  const { user, client } = await requireAccountUser()
  const { data, error } = await client.from("quote_proposals").select(proposalColumns).eq("client_user_id", user.id).eq("status", "sent").order("issued_at", { ascending: false }).limit(100)
  if (error || !data) storageFailed()
  return { proposals: (data as ProposalRow[]).map(mapProposal) }
})

type QuoteRow = { id: string; plan_id: string; status: string; contact_name: string; contact_email: string; submitted_at: string; notification_status: string; plan_snapshot: Pick<PlanRow, "title" | "details">; proposals?: ProposalRow[]; status_history?: unknown[] }
/**
 * Shape an authorized owner-query result for the browser, including the frozen plan and proposal versions.
 */
function mapQuote(row: QuoteRow) {
  return { id: row.id, planId: row.plan_id, status: row.status, contactName: row.contact_name, contactEmail: row.contact_email,
    submittedAt: row.submitted_at, notificationStatus: row.notification_status,
    plan: { title: row.plan_snapshot.title, ...row.plan_snapshot.details, country: row.plan_snapshot.details.country || "australia" },
    proposals: (row.proposals || []).map(mapProposal), statusHistory: row.status_history || [] }
}
/**
 * Return the owner inbox only after the database verifies the session-derived administrator ID.
 */
export const adminQuotesGet = () => accountHandler(async () => {
  const { user } = await requireAccountUser()
  const rows = await accountRpc<QuoteRow[]>("list_admin_quotes", { p_admin_user_id: user.id, p_limit: 100 })
  return { quotes: rows.map(mapQuote) }
})
/**
 * Update owner workflow status through an authorized database function; this sends no email.
 */
export const adminQuotePatch = (request: Request, id: string) => accountHandler(async () => {
  const { user } = await requireAccountUser()
  const body = await accountBody(request, quoteStatusSchema)
  const row = await accountRpc<QuoteRow>("update_quote_status", { p_admin_user_id: user.id, p_request_id: uuid(id), p_status: body.status })
  return { quote: mapQuote(row) }
})
/**
 * Create/replay one owner-authorized draft proposal; return its saved content without issuing it.
 */
export const proposalPost = (request: Request, quoteId: string) => accountHandler(async () => {
  const { user } = await requireAccountUser()
  const { id, ...details } = await accountBody(request, createProposalSchema)
  const key = requestKey(request)
  if (id !== key) throw new AccountError(400, "Please retry this proposal with its original request reference.")
  const result = await accountRpc<{ created: boolean; proposal: ProposalRow }>("create_quote_proposal", {
    p_admin_user_id: user.id, p_request_id: uuid(quoteId), p_proposal_id: id, p_idempotency_key: key,
    p_payload_hash: hash({ quoteId, details }), p_details: details,
  })
  return { proposal: mapProposal(result.proposal) }
})
/**
 * Edit an owner-authorized draft at its expected revision; issued versions remain immutable.
 */
export const proposalPatch = (request: Request, id: string) => accountHandler(async () => {
  const { user } = await requireAccountUser()
  const { expectedUpdatedAt, ...details } = await accountBody(request, updateProposalSchema)
  const result = await accountRpc<ProposalRow>("update_quote_proposal", {
    p_admin_user_id: user.id, p_proposal_id: uuid(id), p_expected_updated_at: expectedUpdatedAt, p_details: details,
  })
  return { proposal: mapProposal(result) }
})
/**
 * Issue a reviewed draft atomically and, only on first issue, attempt a client notification.
 * The receipt's sent status means client-visible/issued, not confirmed delivery or a booking.
 */
export const proposalSend = (request: Request, id: string) => accountHandler(async () => {
  const { user } = await requireAccountUser()
  const body = await accountBody(request, revisionSchema)
  const result = await accountRpc<{ issued: boolean; proposal: ProposalRow; contact_name: string; contact_email: string }>("issue_quote_proposal", {
    p_admin_user_id: user.id, p_proposal_id: uuid(id), p_idempotency_key: requestKey(request),
    p_payload_hash: hash({ proposalId: id, ...body }), p_expected_updated_at: body.expectedUpdatedAt,
  })
  // Issue first, email second. The database supplies the client's current confirmed
  // Auth email; the browser cannot select a different recipient.
  if (result.issued) {
    const notificationStatus = await notifyAccount("proposal", result.proposal.id, result.contact_email, "Your AVES proposal is ready",
      `Hello ${result.contact_name},\n\nYour journey proposal (version ${result.proposal.version}) is ready to review in your private account. Prices are quoted in Australian dollars (AUD).\n\nSign in to view the itinerary and price: ${accountUrl()}\n\nThis proposal does not confirm a booking or take a payment. Reply to mmelendro@gmail.com to discuss the details.\n\nAVES`).catch(() => undefined)
    if (notificationStatus) result.proposal.notification_status = notificationStatus
  }
  return { success: true, status: "sent", proposal: mapProposal(result.proposal) }
})
