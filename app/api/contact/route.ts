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

    // Format the email content
    const emailContent = {
      to: "mmelendro@gmail.com",
      subject: "Colombian Birding Tour Inquiry",
      body: `Hello AVES Team,

I'm interested in planning a Colombian birding adventure. Here are my details:

Name: ${firstName} ${lastName}
Email: ${email}
Travel Date: ${body.travelDate || "Not specified"}
Group Size: ${body.groupSize || "Not specified"}
Desired Duration: ${body.desiredDuration || "Not specified"}
Experience Level: ${body.experienceLevel || "Not specified"}

Interested Tour Types: ${body.selectedTourTypes?.length > 0 ? body.selectedTourTypes.join(", ") : "Not specified"}
Desired Locations: ${body.selectedLocations?.length > 0 ? body.selectedLocations.join(", ") : "Not specified"}

Special Interests/Requests: ${body.specialRequests || "None specified"}

I look forward to hearing from you within 24 hours as mentioned on your website.

Best regards,
${firstName} ${lastName}`,
    }

    // Here you would integrate with your email service
    // For now, we'll simulate a successful email send
    console.log("Email would be sent:", emailContent)

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json(
      {
        success: true,
        message: "Your inquiry has been sent successfully! We'll respond within 24 hours.",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Failed to send inquiry. Please try again or contact us directly." },
      { status: 500 },
    )
  }
}
