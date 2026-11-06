import "server-only"
import { z } from "zod"
import type { TripCountry } from "@/content/trip-options"

export type ContactRequestInput = {
  country?: TripCountry
  idempotencyKey: string
  payloadHash: string
  intent: "inquiry" | "waitlist"
  name: string
  email: string
  updates: boolean
  consentVersion: string
  region: string
  travelWhen: string
  partySize: string
  message: string
}

const receiptSchema = z.object({
  request_id: z.uuid(),
  created: z.boolean(),
  submitted_at: z.string().refine(value => Number.isFinite(Date.parse(value))),
  notification_status: z.enum(["pending", "accepted", "failed"]),
  subscriber_status: z.enum(["requested", "suppressed"]).nullable(),
})
export type ContactReceipt = z.infer<typeof receiptSchema>

export class ContactStoreError extends Error {
  constructor(public readonly status: 400 | 409 | 429 | 503) {
    super("Contact storage is unavailable")
    this.name = "ContactStoreError"
  }
}

function configuration() {
  const value = process.env.SUPABASE_URL?.trim()
  const key = process.env.SUPABASE_SECRET_KEY?.trim()
  if (!value || !key) throw new ContactStoreError(503)
  const url = new URL(value)
  if (url.protocol !== "https:" || url.username || url.password || url.search || url.hash || url.pathname !== "/") {
    throw new ContactStoreError(503)
  }
  // Modern secret keys use only apikey. Legacy service-role JWTs additionally
  // carry Authorization; neither key is ever passed to the public form.
  const headers: Record<string, string> = { "Content-Type": "application/json", apikey: key }
  if (!key.startsWith("sb_secret_")) {
    const parts = key.split(".")
    if (parts.length !== 3 || JSON.parse(Buffer.from(parts[1], "base64url").toString()).role !== "service_role") {
      throw new ContactStoreError(503)
    }
    headers.Authorization = `Bearer ${key}`
  }
  return { origin: url.origin, headers }
}

async function rpc(name: "submit_shared_contact_request" | "replay_shared_contact_request" | "record_contact_notification", body: Record<string, unknown>) {
  try {
    const { origin, headers } = configuration()
    const response = await fetch(`${origin}/rest/v1/rpc/${name}`, {
      method: "POST", headers, body: JSON.stringify(body),
      cache: "no-store", signal: AbortSignal.timeout(10_000), redirect: "error",
    })
    const result = await response.json().catch(() => null)
    if (!response.ok) {
      if (result?.code === "22023") throw new ContactStoreError(400)
      if (result?.code === "PT409") throw new ContactStoreError(409)
      if (result?.code === "PT429") throw new ContactStoreError(429)
      throw new ContactStoreError(503)
    }
    return result
  } catch (error) {
    if (error instanceof ContactStoreError) throw error
    // Never surface provider errors, request payloads, or credentials to users/logs.
    throw new ContactStoreError(503)
  }
}

export async function saveContactRequest(input: ContactRequestInput): Promise<ContactReceipt> {
  const data = await rpc("submit_shared_contact_request", {
    p_country: input.country || "australia",
    p_idempotency_key: input.idempotencyKey, p_payload_hash: input.payloadHash,
    p_intent: input.intent, p_name: input.name, p_email: input.email,
    p_updates: input.updates, p_consent_version: input.consentVersion,
    p_region: input.region, p_travel_when: input.travelWhen,
    p_party_size: input.partySize, p_message: input.message,
  })
  const parsed = receiptSchema.safeParse(data)
  if (!parsed.success) throw new ContactStoreError(503)
  return parsed.data
}

export async function recordContactNotification(
  requestId: string, status: "accepted" | "failed", providerId: string | null = null, errorCode: string | null = null,
) {
  await rpc("record_contact_notification", {
    p_request_id: requestId, p_status: status, p_provider_id: providerId, p_error_code: errorCode,
  })
}

export async function replayContactRequest(input: Pick<ContactRequestInput, "country" | "idempotencyKey" | "payloadHash">): Promise<ContactReceipt> {
  const data = await rpc("replay_shared_contact_request", {
    p_idempotency_key: input.idempotencyKey, p_payload_hash: input.payloadHash,
    p_country: input.country ?? "australia",
  })
  const parsed = receiptSchema.safeParse(data)
  if (!parsed.success || parsed.data.created) throw new ContactStoreError(503)
  return parsed.data
}
