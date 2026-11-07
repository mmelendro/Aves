import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { z } from "zod"
import { createHash } from "node:crypto"
import { ContactStoreError, saveContactRequest, replayContactRequest, recordContactNotification } from "@/lib/contact-store"
import { countryLabels, countryConsentVersion, isConfiguredTripCountry, isEnabledTripCountry, isContactRegion, DEFAULT_TRIP_COUNTRY, type TripCountry } from "@/content/trip-options"

const MAX_REQUEST_BYTES = 32_768
const singleLine = (maxLength: number) =>
  z.string().trim().max(maxLength).regex(/^[^\u0000-\u001f\u007f]*$/, "Must be a single line of text")
const emailAddress = singleLine(254).email()

const requestSchema = z.object({
  country: z.custom<TripCountry>(isConfiguredTripCountry, "Choose an available destination country").optional().default(DEFAULT_TRIP_COUNTRY),
  intent: z.enum(["inquiry", "waitlist"]),
  name: singleLine(120).min(1),
  email: emailAddress,
  region: singleLine(160).optional().default(""),
  travelWhen: singleLine(160).optional().default(""),
  partySize: z.union([z.number().int().min(1).max(50), singleLine(40)]).optional(),
  message: z.string().trim().max(5_000).optional().default(""),
  updates: z.boolean(),
  website: z.string().max(0).optional().default(""),
}).refine((value) => value.intent !== "waitlist" || value.updates, {
  message: "Please opt in to updates to join the waitlist.",
  path: ["updates"],
}).refine(value => isContactRegion(value.country, value.region), {
  message: "Choose a region in the selected country.", path: ["region"],
})

function reply(body: Record<string, unknown>, status: number) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } })
}

function isValidSender(value: string) {
  if (!singleLine(320).safeParse(value).success) return false
  if (emailAddress.safeParse(value).success) return true
  const namedAddress = value.match(/^([^<>]+)\s<([^<>]+)>$/)
  return Boolean(namedAddress?.[1].trim()) && emailAddress.safeParse(namedAddress?.[2]).success
}

// Stop reading at the byte limit, before decoding/parsing an unbounded JSON body.
async function readBody(req: NextRequest): Promise<{ body: unknown } | { status: 400 | 413 }> {
  if (Number(req.headers.get("content-length")) > MAX_REQUEST_BYTES) return { status: 413 }
  const reader = req.body?.getReader()
  if (!reader) return { status: 400 }
  const decoder = new TextDecoder("utf-8", { fatal: true })
  let byteLength = 0
  let text = ""
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      byteLength += value.byteLength
      if (byteLength > MAX_REQUEST_BYTES) {
        await reader.cancel()
        return { status: 413 }
      }
      text += decoder.decode(value, { stream: true })
    }
    text += decoder.decode()
    return { body: JSON.parse(text) }
  } catch {
    return { status: 400 }
  } finally {
    reader.releaseLock()
  }
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin")
  const requestUrl = new URL(req.url)
  let localAlias = false
  try {
    const originUrl = new URL(origin || "")
    const loopback = new Set(["localhost", "127.0.0.1", "[::1]"])
    localAlias = origin === originUrl.origin && loopback.has(requestUrl.hostname) && loopback.has(originUrl.hostname)
      && originUrl.protocol === requestUrl.protocol && originUrl.port === requestUrl.port
  } catch { /* Malformed origins fail closed below. */ }
  if (req.headers.get("sec-fetch-site") === "cross-site" || (origin
    && origin !== requestUrl.origin && origin !== "https://aves.bio" && !localAlias)) {
    return reply({ error: "Please send your request from the AVES website." }, 403)
  }
  if (req.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
    return reply({ error: "Please submit your request as JSON." }, 415)
  }

  const parsedBody = await readBody(req)
  if ("status" in parsedBody) {
    return reply({ error: parsedBody.status === 413 ? "Your request is too long." : "Your request could not be read." }, parsedBody.status)
  }
  const request = requestSchema.safeParse(parsedBody.body)
  if (!request.success) {
    return reply({ error: "Please check your request details.", fields: request.error.flatten().fieldErrors }, 400)
  }

  const idempotencyKey = z.uuid().safeParse(req.headers.get("idempotency-key"))
  if (!idempotencyKey.success) {
    return reply({ error: "Please refresh the form and try again." }, 400)
  }

  const consentVersion = countryConsentVersion(request.data.country)
  const payload = {
    intent: request.data.intent, name: request.data.name, email: request.data.email.toLowerCase(),
    region: request.data.region, travelWhen: request.data.travelWhen,
    partySize: String(request.data.partySize ?? ""), message: request.data.message,
    updates: request.data.updates, consentVersion,
    ...(request.data.country !== DEFAULT_TRIP_COUNTRY ? { country: request.data.country } : {}),
  }
  let receipt
  try {
    const input = {
      ...payload, idempotencyKey: idempotencyKey.data,
      payloadHash: createHash("sha256").update(JSON.stringify(payload)).digest("hex"),
    }
    receipt = isEnabledTripCountry(request.data.country)
      ? await saveContactRequest(input)
      : await replayContactRequest({ country: request.data.country, idempotencyKey: input.idempotencyKey, payloadHash: input.payloadHash })
  } catch (error) {
    if (error instanceof ContactStoreError && error.status === 400) {
      return reply({ error: "This destination is not available for a new request." }, 400)
    }
    if (error instanceof ContactStoreError && error.status === 409) {
      return reply({ error: "This request has changed. Please refresh the form and submit your latest details." }, 409)
    }
    if (error instanceof ContactStoreError && error.status === 429) {
      return NextResponse.json({ error: "Please wait 15 minutes before sending another request." }, {
        status: 429, headers: { "Cache-Control": "no-store", "Retry-After": "900" },
      })
    }
    console.error("AVES contact storage did not confirm acceptance")
    return reply({ error: "We couldn't confirm that your request was saved. Please try again shortly." }, 503)
  }

  const storedResponse = () => reply({ success: true, status: "stored", intent: payload.intent, country: request.data.country }, 200)
  // An unchanged retry returns the original receipt without reapplying consent
  // or sending another notification. Saving is the success boundary.
  if (!receipt.created) return storedResponse()

  const recordOutcome = async (status: "accepted" | "failed", providerId: string | null, errorCode: string | null) => {
    try {
      await recordContactNotification(receipt.request_id, status, providerId, errorCode)
    } catch {
      console.error("AVES contact notification status could not be recorded")
    }
  }
  const apiKey = process.env.RESEND_API_KEY?.trim()
  const contactEmail = process.env.CONTACT_EMAIL?.trim() || "mmelendro@gmail.com"
  const contactFrom = process.env.CONTACT_FROM?.trim() || "AVES <noreply@aves.bio>"
  if (!apiKey || !emailAddress.safeParse(contactEmail).success || !isValidSender(contactFrom)) {
    await recordOutcome("failed", null, "email_configuration_missing")
    return storedResponse()
  }

  const { intent, name, email, region, travelWhen, partySize, message, updates } = payload
  const submittedAt = receipt.submitted_at
  const label = intent === "waitlist" ? "Waitlist request" : "Custom tour inquiry"
  const countryLabel = countryLabels[request.data.country]
  const emailBody = `${label} — AVES ${countryLabel}

Intent: ${intent}
Country: ${countryLabel}
Submitted at (UTC): ${submittedAt}
Name: ${name}
Email: ${email}
Region: ${region || "Not specified"}
Travel timing: ${travelWhen || "Not specified"}
Party size: ${partySize || "Not specified"}

Updates consent submitted: ${updates ? "Yes" : "No"}
Consent timestamp (UTC): ${updates ? submittedAt : "No opt-in submitted"}
Consent wording version: ${consentVersion}
Request reference: ${receipt.request_id}

Message:
${message || "None"}`

  let notificationTimeout: ReturnType<typeof setTimeout> | undefined
  try {
    const resend = new Resend(apiKey)
    const result = await Promise.race([resend.emails.send({
      from: contactFrom,
      to: contactEmail,
      replyTo: email,
      subject: `[AVES ${countryLabel}] ${label} from ${name}`,
      text: emailBody,
    }, { idempotencyKey: `contact/${receipt.request_id}` }), new Promise<never>((_, reject) => {
      notificationTimeout = setTimeout(() => reject(new Error("Notification acceptance unconfirmed")), 8_000)
    })])
    if (result.error || !result.data?.id) {
      await recordOutcome("failed", null, "email_provider_rejected")
    } else {
      await recordOutcome("accepted", result.data.id, null)
    }
  } catch {
    await recordOutcome("failed", null, "email_provider_unconfirmed")
  } finally {
    clearTimeout(notificationTimeout)
  }
  // The request is durable even if notification delivery is unavailable.
  // No visitor email, booking, or verified subscription is created here.
  return storedResponse()
}
