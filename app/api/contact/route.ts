import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { makeColombiaInquiry } from "@/lib/colombia-inquiry"
import { canonicalColombiaRegion } from "@/lib/shared-account"

const MAX_REQUEST_BYTES = 32_768
const SHARED_CONTACT_URL = "https://aves.bio/australia/api/contact"
const singleLine = (length: number) => z.string().trim().max(length).regex(/^[^\u0000-\u001f\u007f]*$/)
const legacyInquiry = z.object({
  firstName: singleLine(59).min(1),
  lastName: singleLine(59).min(1),
  email: singleLine(254).email(),
  phone: singleLine(50).optional().default(""),
  travelDate: singleLine(160).optional().default(""),
  groupSize: singleLine(40).optional().default(""),
  duration: singleLine(40).optional().default(""),
  experienceLevel: singleLine(80).optional().default(""),
  tourTypes: z.array(z.enum(["adventure", "vision", "elevate", "souls"])).max(4).optional().default([]),
  regions: z.array(singleLine(100).refine(value => value === "multiple" || Boolean(canonicalColombiaRegion(value)))).max(13).optional().default([]),
  message: z.string().trim().max(4_000).optional().default(""),
  updates: z.boolean().optional().default(false),
  website: z.string().max(0).optional().default(""),
})

function reply(body: Record<string, unknown>, status: number, extraHeaders: Record<string, string> = {}) {
  return NextResponse.json(body, {status, headers: {"Cache-Control": "no-store", ...extraHeaders}})
}

function allowedOrigin(req: NextRequest) {
  if (req.headers.get("sec-fetch-site") === "cross-site") return false
  const origin = req.headers.get("origin")
  if (!origin) return true
  try {
    return origin === "https://aves.bio" || origin === new URL(req.url).origin
  } catch {
    return false
  }
}

async function readBody(req: NextRequest): Promise<{body: unknown} | {status: 400 | 413}> {
  if (Number(req.headers.get("content-length")) > MAX_REQUEST_BYTES) return {status: 413}
  const reader = req.body?.getReader()
  if (!reader) return {status: 400}
  const decoder = new TextDecoder("utf-8", {fatal: true})
  let bytes = 0, text = ""
  try {
    while (true) {
      const {done, value} = await reader.read()
      if (done) break
      bytes += value.byteLength
      if (bytes > MAX_REQUEST_BYTES) {
        await reader.cancel()
        return {status: 413}
      }
      text += decoder.decode(value, {stream: true})
    }
    return {body: JSON.parse(text + decoder.decode())}
  } catch {
    return {status: 400}
  } finally {
    reader.releaseLock()
  }
}

// Compatibility bridge only. The current form submits directly to the shared
// same-origin endpoint. No Colombia database or email-provider secrets are used.
export async function POST(req: NextRequest) {
  if (!allowedOrigin(req)) return reply({error: "Please submit your inquiry from the AVES website."}, 403)
  if (req.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
    return reply({error: "Please submit your inquiry as JSON."}, 415)
  }
  const parsed = await readBody(req)
  if ("status" in parsed) return reply({error: parsed.status === 413 ? "Your inquiry is too long." : "Your inquiry could not be read."}, parsed.status)
  const request = legacyInquiry.safeParse(parsed.body)
  const key = z.uuid().safeParse(req.headers.get("idempotency-key"))
  if (!request.success) return reply({error: "Please check your inquiry details."}, 400)
  if (!key.success) return reply({error: "Please refresh the AVES contact page before submitting your inquiry."}, 400)

  const payload = makeColombiaInquiry(
    {...request.data, specialRequests: request.data.message},
    request.data.regions, request.data.tourTypes, request.data.updates, request.data.website,
  )
  try {
    const upstream = await fetch(SHARED_CONTACT_URL, {
      method: "POST",
      headers: {"Content-Type": "application/json", "Idempotency-Key": key.data, Origin: "https://aves.bio"},
      body: JSON.stringify(payload),
      cache: "no-store",
      redirect: "error",
      signal: AbortSignal.timeout(15_000),
    })
    const result = await upstream.json().catch(() => ({}))
    if (upstream.ok && result?.success === true && result?.status === "stored" && result?.intent === "inquiry" && result?.country === "colombia") {
      return reply({success: true, status: "stored", intent: "inquiry", country: "colombia"}, 200)
    }
    if (upstream.status === 429) return reply({error: "Please wait 15 minutes before trying again, or email mmelendro@gmail.com."}, 429, {"Retry-After": "900"})
    const status = [400, 409, 413, 415, 503].includes(upstream.status) ? upstream.status : 502
    return reply({error: "Your inquiry could not be confirmed. Please refresh the contact page or email mmelendro@gmail.com."}, status)
  } catch {
    return reply({error: "We couldn't confirm that your inquiry was saved. Retry with the same details or email mmelendro@gmail.com."}, 503)
  }
}
