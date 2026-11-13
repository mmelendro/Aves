import { publicMetadata } from "@/lib/public-metadata"
/**
 * Public explanation of inquiries, saved plans and priced proposals.
 * The sections array is rendered into the document body. These statements describe
 * the service; the actual account/proposal workflow is implemented in the shared app.
 */
import type { Metadata } from "next"
import Link from "next/link"
import { PageIntroduction } from "@/components/page-introduction"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import { canonicalUrl } from "@/lib/site-path"

export const metadata: Metadata = publicMetadata({
  title: "Inquiries and Proposals",
  description: "How AVES trip inquiries, saved plans and priced proposals work before a booking is arranged.",
  alternates: { canonical: canonicalUrl("/terms") },
})

const sections = [
  { title: "Private Trip Tools and Downloads", text: "Favourite public places, checklist items, journal entries, practical travel records and bird albums are private account records. Album observations are owner entered and unverified. Removing an item inside a workspace keeps it recoverable until its parent draft is permanently deleted. The complete JSON backup includes saved sections, independent revisions, removed entries and the bird album, plus attachment metadata. Original attachment files and unsaved edits are excluded. A selected practical HTML pack includes only the saved itinerary, preparations and practical records you choose. It excludes journal entries, photographs and attachment files. Journal previews stay private and require your review before any future sharing. Downloads may contain private notes and booking references. Signing out does not remove files or printed copies from your devices or synced storage. Delete those copies yourself when no longer needed. The app does not cache private trips for offline editing." },

  { title: "Explore and Ask", text: "Destinations, bird profiles and trip styles help start a planning conversation. They do not confirm a departure, availability, access or wildlife sighting. Share your preferred country, regions, timing and interests so we can discuss the practical details." },
  { title: "Saved Plans and Quote Requests", text: "One AVES account supports Australia, Colombia and the New Zealand planning beta. A saved trip keeps its original destination. You can save and edit a draft plan. Confirmed draft deletion permanently removes its related checklist, journal, practical records and bird album, after private uploads have been removed. Requesting a quote saves a snapshot for AVES to review; create a new draft if your plans change. A request does not reserve a place or create a booking." },
  { title: "Your Proposal", text: "A proposal sets out the suggested itinerary, price in Australian dollars (AUD), inclusions, exclusions and any stated validity date. Check those details with AVES. An issued proposal is visible in your account, with an email notification attempted. A revised proposal is a new version." },
  { title: "Before Any Booking", text: "Availability, dates, guides, group size, accommodation, access, inclusions and final booking arrangements must be confirmed directly with AVES. Any payment, cancellation or refund terms must be provided for the particular arrangement before you decide to book. This website does not accept payments or automatically confirm bookings." },
  { title: "Updates and Responsible Planning", text: "Optional trip news or launch-list signup does not reserve a place. Wildlife encounters depend on conditions and cannot be guaranteed. AVES aims to prepare for B Corp certification and is not currently certified." },
]

export default function TermsPage() {
  return <div className="min-h-screen bg-white">
    <NavigationHeader currentPage="/terms" />
    <main id="main-content" tabIndex={-1}>
      <PageIntroduction title="About Inquiries and Proposals" eyebrow="AVES" description="What happens between exploring a destination and discussing a booking with AVES.">
        <p className="text-sm text-gray-500">Updated: 13 November 2026</p>
      </PageIntroduction>
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
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
