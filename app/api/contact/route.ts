import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { z } from "zod"

const MAX_REQUEST_BYTES = 32_768
const singleLine = (maxLength: number) =>
  z.string().trim().max(maxLength).regex(/^[^\u0000-\u001f\u007f]*$/, "Must be a single line of text")
const emailAddress = singleLine(254).email()

const requestSchema = z.object({
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

  const apiKey = process.env.RESEND_API_KEY?.trim()
  const contactEmail = process.env.CONTACT_EMAIL?.trim() || "info@aves.bio"
  const contactFrom = process.env.CONTACT_FROM?.trim() || "AVES Australia <noreply@aves.bio>"
  if (!apiKey || !emailAddress.safeParse(contactEmail).success || !isValidSender(contactFrom)) {
    console.error("Australia contact email configuration is missing or invalid")
    return reply({ error: "This service is temporarily unavailable. Please email info@aves.bio." }, 503)
  }

  const { intent, name, email, region, travelWhen, partySize, message, updates } = request.data
  const submittedAt = new Date().toISOString()
  const label = intent === "waitlist" ? "Waitlist request" : "Custom tour inquiry"
  const emailBody = `${label} — AVES Australia

Intent: ${intent}
Submitted at (UTC): ${submittedAt}
Name: ${name}
Email: ${email}
Region: ${region || "Not specified"}
Travel timing: ${travelWhen || "Not specified"}
Party size: ${partySize || "Not specified"}

Updates consent submitted: ${updates ? "Yes" : "No"}
Consent timestamp (UTC): ${updates ? submittedAt : "No opt-in submitted"}

Message:
${message || "None"}`

  try {
    const resend = new Resend(apiKey)
    const result = await resend.emails.send({
      from: contactFrom,
      to: contactEmail,
      replyTo: email,
      subject: `[AVES Australia] ${label} from ${name}`,
      text: emailBody,
    })
    if (result.error || !result.data?.id) {
      console.error("Australia contact request was not accepted by the email provider")
      return reply({ error: "Your request could not be accepted. Please try again or email info@aves.bio." }, 502)
    }

    // This records provider acceptance of the owner's notification, not inbox
    // delivery or a confirmed booking. No automatic visitor email is sent.
    return reply({ success: true, status: "accepted", intent }, 200)
  } catch {
    console.error("Australia contact email request failed")
    return reply({ error: "Your request could not be accepted. Please try again or email info@aves.bio." }, 502)
  }
}
