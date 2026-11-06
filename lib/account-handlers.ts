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
import { countryLabels, isCountryRegion, isColombiaRegion } from "@/content/trip-options"
import { createPlanSchema, updatePlanSchema, quoteSchema, revisionSchema, createProposalSchema, updateProposalSchema, quoteStatusSchema, mapPlan, mapProposal, type PlanRow, type ProposalRow } from "@/lib/account-models"

const planColumns = "id,title,details,status,updated_at,create_payload_hash"
const proposalColumns = "id,quote_request_id,client_user_id,version,status,total_cents,currency,itinerary,inclusions,exclusions,valid_until,issued_at,updated_at,notification_status"
const hash = (value: unknown) => createHash("sha256").update(JSON.stringify(value)).digest("hex")
function uuid(value: string) {
  if (!z.uuid().safeParse(value).success) throw new AccountError(404, "This item could not be found.")
  return value
}
function storageFailed(): never { throw new AccountError(503, "We couldn't confirm this request. Please try again.") }
async function ownPlan(client: SupabaseClient, userId: string, id: string): Promise<PlanRow> {
  const { data, error } = await client.from("trip_plans").select(planColumns).eq("id", uuid(id)).eq("user_id", userId).maybeSingle()
  if (error) storageFailed()
  if (!data) throw new AccountError(404, "This plan could not be found.")
  return data as PlanRow
}
// Keep Australia's original serialization so retries of pre-upgrade requests
// retain their original hash. Missing stored country always means Australia.
const planValues = ({ title, country, regions, travelWhen, partySize, message }: z.infer<typeof updatePlanSchema> | z.infer<typeof createPlanSchema>) => ({ title, details: { regions, travelWhen, partySize, message, ...(country === "colombia" ? { country } : {}) } })

export const plansGet = () => accountHandler(async () => {
  const { user, client } = await requireAccountUser()
  const { data, error } = await client.from("trip_plans").select(planColumns).eq("user_id", user.id).order("updated_at", { ascending: false }).limit(100)
  if (error || !data) storageFailed()
  const isAdmin = await accountRpc<boolean>("account_admin_status", { p_user_id: user.id }).catch(() => false)
  return { plans: (data as PlanRow[]).map(mapPlan), isAdmin: isAdmin === true }
})

export const plansPost = (request: Request) => accountHandler(async () => {
  const { user, client } = await requireAccountUser()
  const body = await accountBody(request, createPlanSchema)
  if (requestKey(request) !== body.id) throw new AccountError(400, "Please retry this plan with its original request reference.")
  const values = planValues(body), payloadHash = hash(values)
  if (!body.regions.every(region => isCountryRegion(body.country || "australia", region))) {
    // A pre-upgrade freeform request may still be retried. It can only return
    // that same owned, hash-matched plan; it cannot insert any new freeform row.
    const original = await ownPlan(client, user.id, body.id).catch((error: unknown) => {
      if (error instanceof AccountError && error.status === 404) return null
      throw error
    })
    if (body.country !== "colombia" && original && (original.details.country || "australia") === "australia"
      && original.create_payload_hash === payloadHash) return { plan: mapPlan(original) }
    throw new AccountError(400, "Choose regions in the selected country.")
  }
  const { data, error } = await client.from("trip_plans").insert({ id: body.id, user_id: user.id, ...values, create_payload_hash: payloadHash }).select(planColumns).single()
  if (error?.code === "23505") {
    const original = await ownPlan(client, user.id, body.id)
    if (original.create_payload_hash !== payloadHash) throw new AccountError(409, "This request has changed. Save it as a new plan.")
    return { plan: mapPlan(original) }
  }
  if (error?.code === "PT409") throw new AccountError(409, "You can keep up to 50 draft plans. Delete an unused draft or submit one for a quote before creating another.")
  if (error || !data) storageFailed()
  return { plan: mapPlan(data as PlanRow) }
})

export const planPatch = (request: Request, id: string) => accountHandler(async () => {
  const { user, client } = await requireAccountUser()
  const body = await accountBody(request, updatePlanSchema)
  const plan = await ownPlan(client, user.id, id)
  const country = body.country || "australia"
  if (!body.regions.every(region => isCountryRegion(country, region) || (
    country === "australia" && (plan.details.country || "australia") === "australia"
    && plan.details.regions.includes(region) && !isColombiaRegion(region)
  ))) throw new AccountError(400, "Choose regions in the selected country. Existing Australian locations may be kept when editing the same plan.")
  if (plan.status !== "draft" || plan.updated_at !== body.expectedUpdatedAt) throw new AccountError(409, "This plan has changed or has already been submitted. Refresh it before continuing.")
  const { data, error } = await client.from("trip_plans").update(planValues(body)).eq("id", id).eq("user_id", user.id).eq("status", "draft").eq("updated_at", body.expectedUpdatedAt).select(planColumns).maybeSingle()
  if (error) storageFailed()
  if (!data) throw new AccountError(409, "This plan changed while you were saving it. Refresh and try again.")
  return { plan: mapPlan(data as PlanRow) }
})

export const planDelete = (request: Request, id: string) => accountHandler(async () => {
  const { user, client } = await requireAccountUser()
  const body = await accountBody(request, revisionSchema)
  const plan = await ownPlan(client, user.id, id)
  if (plan.status !== "draft" || plan.updated_at !== body.expectedUpdatedAt) throw new AccountError(409, "Only the current draft can be deleted.")
  const { data, error } = await client.from("trip_plans").delete().eq("id", id).eq("user_id", user.id).eq("status", "draft").eq("updated_at", body.expectedUpdatedAt).select("id").maybeSingle()
  if (error) storageFailed()
  if (!data) throw new AccountError(409, "This plan changed while you were deleting it. Refresh and try again.")
  return { success: true }
})

type QuoteReceipt = { request_id: string; created: boolean; plan_id: string; submitted_at: string; status: string; notification_status: string; plan_snapshot: Pick<PlanRow, "title" | "details">; contact_name: string; contact_email: string; plan_updated_at: string }
export const quotePost = (request: Request, id: string) => accountHandler(async () => {
  const { user } = await requireAccountUser()
  const body = await accountBody(request, quoteSchema)
  const key = requestKey(request)
  const receipt = await accountRpc<QuoteReceipt>("submit_quote_request", {
    p_client_user_id: user.id, p_plan_id: uuid(id), p_idempotency_key: key,
    p_payload_hash: hash({ planId: id, ...body }), p_expected_updated_at: body.expectedUpdatedAt,
    p_contact_name: body.contactName, p_contact_email: user.email,
  })
  const plan = mapPlan({ ...receipt.plan_snapshot, id: receipt.plan_id, updated_at: receipt.plan_updated_at, status: "quote_requested" })
  if (receipt.created) {
    await notifyAccount("quote", receipt.request_id, "mmelendro@gmail.com", `[AVES ${countryLabels[plan.country]}] Quote request from ${receipt.contact_name}`,
      `A client requested a quote.\n\nCountry: ${countryLabels[plan.country]}\nName: ${receipt.contact_name}\nEmail: ${receipt.contact_email}\nSubmitted: ${receipt.submitted_at}\nPlan: ${plan.title}\nRegions: ${plan.regions.join(", ")}\nTiming: ${plan.travelWhen}\nParty: ${plan.partySize}\n\n${plan.message}\n\nReview securely: ${canonicalUrl("/admin/quotes")}`).catch(() => undefined)
  }
  return { success: true, status: "stored", requestId: receipt.request_id, plan }
})

export const proposalsGet = () => accountHandler(async () => {
  const { user, client } = await requireAccountUser()
  const { data, error } = await client.from("quote_proposals").select(proposalColumns).eq("client_user_id", user.id).eq("status", "sent").order("issued_at", { ascending: false }).limit(100)
  if (error || !data) storageFailed()
  return { proposals: (data as ProposalRow[]).map(mapProposal) }
})

type QuoteRow = { id: string; plan_id: string; status: string; contact_name: string; contact_email: string; submitted_at: string; notification_status: string; plan_snapshot: Pick<PlanRow, "title" | "details">; proposals?: ProposalRow[]; status_history?: unknown[] }
function mapQuote(row: QuoteRow) {
  return { id: row.id, planId: row.plan_id, status: row.status, contactName: row.contact_name, contactEmail: row.contact_email,
    submittedAt: row.submitted_at, notificationStatus: row.notification_status,
    plan: { title: row.plan_snapshot.title, ...row.plan_snapshot.details, country: row.plan_snapshot.details.country || "australia" },
    proposals: (row.proposals || []).map(mapProposal), statusHistory: row.status_history || [] }
}
export const adminQuotesGet = () => accountHandler(async () => {
  const { user } = await requireAccountUser()
  const rows = await accountRpc<QuoteRow[]>("list_admin_quotes", { p_admin_user_id: user.id, p_limit: 100 })
  return { quotes: rows.map(mapQuote) }
})
export const adminQuotePatch = (request: Request, id: string) => accountHandler(async () => {
  const { user } = await requireAccountUser()
  const body = await accountBody(request, quoteStatusSchema)
  const row = await accountRpc<QuoteRow>("update_quote_status", { p_admin_user_id: user.id, p_request_id: uuid(id), p_status: body.status })
  return { quote: mapQuote(row) }
})
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
export const proposalPatch = (request: Request, id: string) => accountHandler(async () => {
  const { user } = await requireAccountUser()
  const { expectedUpdatedAt, ...details } = await accountBody(request, updateProposalSchema)
  const result = await accountRpc<ProposalRow>("update_quote_proposal", {
    p_admin_user_id: user.id, p_proposal_id: uuid(id), p_expected_updated_at: expectedUpdatedAt, p_details: details,
  })
  return { proposal: mapProposal(result) }
})
export const proposalSend = (request: Request, id: string) => accountHandler(async () => {
  const { user } = await requireAccountUser()
  const body = await accountBody(request, revisionSchema)
  const result = await accountRpc<{ issued: boolean; proposal: ProposalRow; contact_name: string; contact_email: string }>("issue_quote_proposal", {
    p_admin_user_id: user.id, p_proposal_id: uuid(id), p_idempotency_key: requestKey(request),
    p_payload_hash: hash({ proposalId: id, ...body }), p_expected_updated_at: body.expectedUpdatedAt,
  })
  if (result.issued) {
    const notificationStatus = await notifyAccount("proposal", result.proposal.id, result.contact_email, "Your AVES proposal is ready",
      `Hello ${result.contact_name},\n\nYour journey proposal (version ${result.proposal.version}) is ready to review in your private account. Prices are quoted in Australian dollars (AUD).\n\nSign in to view the itinerary and price: ${canonicalUrl("/account")}\n\nThis proposal does not confirm a booking or take a payment. Reply to mmelendro@gmail.com to discuss the details.\n\nAVES`).catch(() => undefined)
    if (notificationStatus) result.proposal.notification_status = notificationStatus
  }
  return { success: true, status: "sent", proposal: mapProposal(result.proposal) }
})
