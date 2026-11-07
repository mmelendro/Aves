import type { Metadata } from "next"
import { SiteLink as Link } from "@/components/site-link"
import { ArrowRight } from "lucide-react"
import { PageShell } from "@/components/page-shell"
import { PlanningSteps } from "@/components/planning-steps"
import { Button } from "@/components/ui/button"
import { canonicalUrl } from "@/lib/site-path"

export const metadata: Metadata = { title: "How Trip Planning Works", description: "From an Australian birding idea to a personal proposal. Learn how enquiries, saved trip plans and quotes work with AVES.", alternates: { canonical: canonicalUrl("/how-it-works") } }

export default function HowItWorksPage() {
  return <PageShell path="/how-it-works" title="Your ideas. A journey taking shape." description="Explore first, ask questions and take your time. Here is how to plan an Australian birding journey with AVES.">
    <PlanningSteps showLink={false} />
    <section className="bg-gradient-to-br from-emerald-50 to-blue-50 py-14 lg:py-20"><div className="container mx-auto max-w-5xl px-4 sm:px-6"><div className="grid gap-6 md:grid-cols-2">
      <article className="rounded-xl border border-emerald-100 bg-white p-7 shadow-lg"><h2 className="text-2xl font-bold text-gray-900">Just starting to explore?</h2><p className="mt-4 leading-relaxed text-gray-600">Send a simple enquiry. A region, a bird you would love to see, or an idea of your dates is enough to begin. There is no need to create an account or commit to a booking.</p><Button asChild className="mt-6 min-h-11 bg-emerald-600 hover:bg-emerald-700"><Link href="/contact">Start a conversation <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></Button></article>
      <article className="rounded-xl border border-emerald-100 bg-white p-7 shadow-lg"><h2 className="text-2xl font-bold text-gray-900">Want to keep your ideas together?</h2><p className="mt-4 leading-relaxed text-gray-600">Create an account to save and edit a trip draft, request a personal quote and view issued proposals. Your plans and proposals are private to your account and authorised AVES staff.</p><Button asChild variant="outline" className="mt-6 min-h-11 border-emerald-600 text-emerald-700"><Link href="/account">Go to My Trips <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></Button></article>
    </div><div className="mt-9 rounded-xl border border-emerald-100 bg-white/80 p-7"><h2 className="text-xl font-bold text-gray-900">What happens before a booking?</h2><p className="mt-3 leading-relaxed text-gray-600">We confirm the itinerary, dates, availability, guides, walking requirements, price, inclusions, exclusions and applicable booking terms personally. Saving a plan or receiving a proposal does not create a booking. This website does not take payment.</p><p className="mt-4 leading-relaxed text-gray-600">Australian journeys are still being developed. The region pages are planning inspiration, and wildlife sightings cannot be guaranteed.</p><Link href="/terms" className="mt-4 inline-flex min-h-11 items-center text-emerald-700 underline underline-offset-4">Read about enquiries and bookings</Link></div></div></section>
  </PageShell>
}
