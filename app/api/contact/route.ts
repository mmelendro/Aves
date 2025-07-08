import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const { firstName, lastName, email } = body
    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: "Missing required fields: firstName, lastName, and email are required" },
        { status: 400 },
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Prepare email content
    const emailContent = `
New Colombian Birding Tour Inquiry

Contact Information:
- Name: ${firstName} ${lastName}
- Email: ${email}
- Phone: ${body.phone || "Not provided"}
- Travel Date: ${body.travelDate || "Not specified"}
- Group Size: ${body.groupSize || "Not specified"}
- Desired Duration: ${body.desiredDuration || "Not specified"}
- Experience Level: ${body.experienceLevel || "Not specified"}

Tour Preferences:
- Interested Tour Types: ${body.selectedTourTypes?.length > 0 ? body.selectedTourTypes.join(", ") : "Not specified"}
- Desired Locations: ${body.selectedLocations?.length > 0 ? body.selectedLocations.join(", ") : "Not specified"}

Special Interests/Requests:
${body.specialRequests || "None specified"}

---
This inquiry was submitted through the AVES website contact form.
Please respond within 24 hours as promised on the website.
    `.trim()

    // In a real implementation, you would use a service like:
    // - SendGrid
    // - Nodemailer with SMTP
    // - AWS SES
    // - Resend
    // - etc.

    // For this example, we'll simulate the email sending
    // Replace this with actual email service integration
    console.log("Email would be sent to: mmelendro@gmail.com")
    console.log("Subject: Colombian Birding Tour Inquiry")
    console.log("Content:", emailContent)

    // Simulate email sending delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // For demonstration, we'll always return success
    // In production, handle actual email service responses
    return NextResponse.json({
      success: true,
      message: "Your inquiry has been sent successfully! We will respond within 24 hours.",
    })
  } catch (error) {
    console.error("Contact form submission error:", error)
    return NextResponse.json(
      { error: "Failed to send inquiry. Please try again or contact us directly at info@aves.bio" },
      { status: 500 },
    )
  }
}
