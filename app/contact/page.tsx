import type { Metadata } from "next"
import ContactPageClient from "./ContactPageClient"

export const metadata: Metadata = {
  title: "Contact Us - Your Birding Adventure Awaits",
  description:
    "Get in touch with us to plan your unforgettable birdwatching tour. Contact us for inquiries, bookings, and personalized itineraries.",
}

export default function ContactPage() {
  return <ContactPageClient />
}
