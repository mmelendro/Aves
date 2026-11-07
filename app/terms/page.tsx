/**
 * Public explanation of inquiries, saved plans and priced proposals.
 * The sections array is rendered into the document body. These statements describe
 * the service; the actual account/proposal workflow is implemented in the shared app.
 */
import type { Metadata } from "next"
import Link from "next/link"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import { canonicalUrl } from "@/lib/site-path"

export const metadata: Metadata = {
  title: "Inquiries and Proposals",
  description: "How AVES trip inquiries, saved plans and priced proposals work before a booking is arranged.",
  alternates: { canonical: canonicalUrl("/terms") },
}

const sections = [
  { title: "Explore and Ask", text: "Destinations, bird profiles and trip styles help start a planning conversation. They do not confirm a departure, availability, access or wildlife sighting. Share your preferred country, regions, timing and interests so we can discuss the practical details." },
  { title: "Saved Plans and Quote Requests", text: "One AVES account supports Australia and Colombia. You can save and edit a draft plan. Requesting a quote saves a snapshot for AVES to review; create a new draft if your plans change. A request does not reserve a place or create a booking." },
  { title: "Your Proposal", text: "A proposal sets out the suggested itinerary, price in Australian dollars (AUD), inclusions, exclusions and any stated validity date. Check those details with AVES. An issued proposal is visible in your account, with an email notification attempted. A revised proposal is a new version." },
  { title: "Before Any Booking", text: "Availability, dates, guides, group size, accommodation, access, inclusions and final booking arrangements must be confirmed directly with AVES. Any payment, cancellation or refund terms must be provided for the particular arrangement before you decide to book. This website does not accept payments or automatically confirm bookings." },
  { title: "Updates and Responsible Planning", text: "Optional trip news or launch-list signup does not reserve a place. Wildlife encounters depend on conditions and cannot be guaranteed. AVES is pursuing B Corp certification and is not currently certified." },
]

export default function TermsPage() {
  return <div className="min-h-screen bg-white">
    <NavigationHeader currentPage="/terms" />
    <main id="main-content" tabIndex={-1} className="py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Inquiries and Proposals</h1>
          <p className="text-lg text-gray-600">What happens between exploring a destination and discussing a booking with AVES.</p>
          <div className="text-sm text-gray-500 mt-4">Updated: 6 November 2026</div>
        </div>
        <div className="prose prose-lg max-w-none">
          <div className="bg-emerald-50 border-l-4 border-emerald-600 p-6 mb-8"><p className="text-emerald-700 mb-0">Saving a plan, requesting a quote or receiving a proposal starts a conversation. None of these actions takes payment or confirms a booking.</p></div>
          {sections.map(section => <section className="mb-8" key={section.title}>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
            <p className="mb-4">{section.text}</p>
          </section>)}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions or Changes</h2>
            <div className="bg-emerald-50 p-6 rounded-lg">
              <p className="text-emerald-700 mb-4"><a href="/australia/contact?topic=general#inquiry" className="underline">Contact AVES through the form</a> to discuss a request, proposal or final arrangements.</p>
              <Link href="/privacy" className="text-emerald-700 underline">How we handle your information</Link>
            </div>
          </section>
        </div>
      </div>
    </main>
    <Footer />
  </div>
}
