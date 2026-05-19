import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const body = await req.json()
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
    } = body

    if (!firstName || !lastName || !email) {
      return NextResponse.json({ error: "firstName, lastName, and email are required" }, { status: 400 })
    }

    const contactEmail = process.env.CONTACT_EMAIL || "info@aves.bio"

    const emailBody = `
New Tour Inquiry from ${firstName} ${lastName}

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone || "Not provided"}
Travel Date: ${travelDate || "Not specified"}
Group Size: ${groupSize || "Not specified"}
Duration: ${duration || "Not specified"}
Experience Level: ${experienceLevel || "Not specified"}

Tour Types: ${Array.isArray(tourTypes) && tourTypes.length > 0 ? tourTypes.join(", ") : "Not specified"}
Regions: ${Array.isArray(regions) && regions.length > 0 ? regions.join(", ") : "Not specified"}

Message:
${message || "None"}
    `.trim()

    await resend.emails.send({
      from: "AVES Tours <noreply@aves.bio>",
      to: contactEmail,
      replyTo: email,
      subject: `Tour Inquiry from ${firstName} ${lastName}`,
      text: emailBody,
    })

    await resend.emails.send({
      from: "AVES Tours <noreply@aves.bio>",
      to: email,
      subject: "We received your inquiry — AVES Tours",
      text: `Hi ${firstName},\n\nThank you for reaching out! We've received your inquiry and will respond within 24 hours.\n\nBest regards,\nThe AVES Tours Team\ninfo@aves.bio`,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
