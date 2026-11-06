import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { z } from "zod"

const MAX_REQUEST_BYTES = 32_768
const singleLine = (maxLength: number) =>
  z.string().trim().max(maxLength).regex(/^[^\u0000-\u001f\u007f]*$/, "Must be a single line of text")

const emailAddress = singleLine(254).email()
const inquirySchema = z.object({
  firstName: singleLine(100).min(1),
  lastName: singleLine(100).min(1),
  email: emailAddress,
  phone: singleLine(50).optional().default(""),
  travelDate: singleLine(10)
    .refine((value) => {
      if (!value) return true
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
      const date = new Date(`${value}T00:00:00.000Z`)
      return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
    }, "Must be a valid date")
    .optional()
    .default(""),
  groupSize: singleLine(40).optional().default(""),
  duration: singleLine(40).optional().default(""),
  experienceLevel: singleLine(80).optional().default(""),
  tourTypes: z.array(singleLine(80).min(1)).max(8).optional().default([]),
  regions: z.array(singleLine(100).min(1)).max(20).optional().default([]),
  message: z.string().trim().max(5_000).optional().default(""),
})

function reply(body: Record<string, unknown>, status: number) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } })
}

function hasAllowedOrigin(req: NextRequest) {
  const origin = req.headers.get("origin")
  // Requests without Origin remain supported; this is not bot/rate protection.
  if (origin === null) return req.headers.get("sec-fetch-site") !== "cross-site"
  if (req.headers.get("sec-fetch-site") === "cross-site") return false
  try {
    const parsed = new URL(origin)
    if (!["https:", "http:"].includes(parsed.protocol) || parsed.origin !== origin) return false
    const allowed = new Set([new URL(req.url).origin])
    try {
      const configured = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://aves.bio")
      if (["https:", "http:"].includes(configured.protocol) && !configured.username && !configured.password) {
        allowed.add(configured.origin)
      }
    } catch {
      // Invalid optional site configuration must not open a different origin.
    }
    return allowed.has(origin)
  } catch {
    return false
  }
}

export async function POST(req: NextRequest) {
  if (!hasAllowedOrigin(req)) {
    return reply({ error: "Please submit your inquiry from the AVES website." }, 403)
  }

  if (req.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
    return reply({ error: "Please submit the inquiry as JSON." }, 415)
  }

  const contentLength = Number(req.headers.get("content-length"))
  if (contentLength > MAX_REQUEST_BYTES) {
    return reply({ error: "Your inquiry is too long." }, 413)
  }

  let body: unknown
  try {
    const text = await req.text()
    if (new TextEncoder().encode(text).length > MAX_REQUEST_BYTES) {
      return reply({ error: "Your inquiry is too long." }, 413)
    }
    body = JSON.parse(text)
  } catch {
    return reply({ error: "The inquiry could not be read. Please check your details and try again." }, 400)
  }

  const inquiry = inquirySchema.safeParse(body)
  if (!inquiry.success) {
    return reply({ error: "Please check your inquiry details.", fields: inquiry.error.flatten().fieldErrors }, 400)
  }

  const apiKey = process.env.RESEND_API_KEY?.trim()
  const contactEmail = process.env.CONTACT_EMAIL?.trim() || "mmelendro@gmail.com"
  if (!apiKey || !emailAddress.safeParse(contactEmail).success) {
    console.error("Contact form email configuration is missing or invalid")
    return reply({ error: "The inquiry service is temporarily unavailable. Please email mmelendro@gmail.com." }, 503)
  }

  try {
    const resend = new Resend(apiKey)
    const {
      firstName,
      lastName,
      email,
      phone,
      travelDate,
      groupSize,
      duration,
      experienceLevel,
      tourTypes,
      regions,
      message,
    } = inquiry.data

    const emailBody = `
New Tour Inquiry from ${firstName} ${lastName}

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone || "Not provided"}
Travel Date: ${travelDate || "Not specified"}
Group Size: ${groupSize || "Not specified"}
Duration: ${duration || "Not specified"}
Experience Level: ${experienceLevel || "Not specified"}

Tour Types: ${tourTypes.length > 0 ? tourTypes.join(", ") : "Not specified"}
Regions: ${regions.length > 0 ? regions.join(", ") : "Not specified"}

Message:
${message || "None"}
    `.trim()

    const primary = await resend.emails.send({
      from: "AVES Tours <noreply@aves.bio>",
      to: contactEmail,
      replyTo: email,
      subject: `Tour Inquiry from ${firstName} ${lastName}`,
      text: emailBody,
    })

    if (primary.error || !primary.data?.id) {
      console.error("Contact inquiry was not accepted by the email provider")
      return reply({ error: "Your inquiry could not be accepted. Please try again or email mmelendro@gmail.com." }, 502)
    }

    // The visitor address is unverified: send only to the configured AVES inbox.
    // Provider acceptance does not establish final inbox delivery.
    return reply({ success: true, status: "accepted" }, 200)
  } catch {
    console.error("Contact inquiry email request failed")
    return reply({ error: "Your inquiry could not be accepted. Please try again or email mmelendro@gmail.com." }, 502)
  }
}
