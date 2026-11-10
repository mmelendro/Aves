import { publicMetadata } from "@/lib/public-metadata"
/**
 * The public AVES homepage at /. It introduces the shared brand, shows the
 * world map, one country-switching bird carousel and personal trip planning.
 * Edit destination facts in content/destinations; edit this file for section order and copy.
 */
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Bird, Compass, MessageCircle, NotebookPen } from "lucide-react"
import { GlobalFooter, GlobalHeader } from "@/components/global-navigation"
import WorldDestinationMap from "@/components/world-destination-map"
import HomepageDestinationExplorer from "@/components/homepage-destination-explorer"
import BirdsBrandWord from "@/components/birds-brand-word"
import { canonicalUrl } from "@/lib/site-path"

const description = "Follow the birds with AVES. Explore Colombia and Australia, discover our developing New Zealand destination, and find a journey shaped around what you love."

export const metadata: Metadata = publicMetadata({
  title: { absolute: "AVES | Follow the birds" },
  description,
  alternates: { canonical: canonicalUrl() },
  openGraph: { title: "AVES | Follow the birds", description, url: canonicalUrl() },
})

// The homepage explains the service in three steps; this is content, not workflow state.
const planningSteps = [
  { icon: Compass, title: "Find your inspiration", text: "Explore a country, meet its birds and discover the regions you would love to visit." },
  { icon: NotebookPen, title: "Make it your journey", text: "Save your ideas in My Trips, then tell us about your interests, dates and travel style." },
  { icon: MessageCircle, title: "Plan it together", text: "Request a personal quote. We’ll work through the details and confirm availability with you." },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <GlobalHeader />
      <main id="main-content" tabIndex={-1}>
        <section id="destinations" aria-labelledby="destination-heading" className="scroll-mt-20 bg-gradient-to-br from-emerald-50 via-white to-blue-50 pb-14 pt-2 sm:pb-20 sm:pt-3">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <HomepageDestinationExplorer map={<WorldDestinationMap />} />
            <div className="mx-auto mt-8 max-w-3xl text-center sm:mt-10">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-sm font-medium text-emerald-800">
                <Bird className="h-4 w-4" aria-hidden="true" /> Birding journeys, personally planned
              </p>
              <h1 id="destination-heading" aria-label="Where will birds take you?" className="text-balance text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
                Where will <BirdsBrandWord /> take you?
              </h1>
              <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
                Personally planned journeys connecting birds, landscapes and local culture. Choose a country, meet its birds and imagine your journey.
              </p>
            </div>
          </div>
        </section>
        <section aria-labelledby="personal-journey-heading" className="bg-stone-50/70 py-14 sm:py-20">
          <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
            <figure className="min-w-0">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-emerald-50">
                <Image src="/images/martin-melendro.jpg" alt="Martín Melendro looking through binoculars in a mountain landscape" fill sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover" />
              </div>
              <figcaption className="mt-3 text-xs text-gray-600">Martín Melendro · Developing AVES</figcaption>
            </figure>
            <div>
              <p className="mb-3 text-sm font-medium uppercase tracking-widest text-emerald-800">Personal from the beginning</p>
              <h2 id="personal-journey-heading" className="text-balance text-3xl font-medium leading-tight tracking-tight sm:text-4xl">The birds bring you here.<br />The whole journey matters.</h2>
              <p className="mt-5 text-lg leading-relaxed text-gray-600">A morning in the forest, a meal worth lingering over, a place you’re glad to return to. Tell us what makes a trip feel right for you.</p>
              <p className="mt-4 leading-7 text-gray-600">Martín is developing AVES around a love of birds, nature and thoughtful travel. Planning starts with a personal conversation about your interests, comfort and pace, with arrangements agreed before you commit.</p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a href="/australia/contact?topic=general#inquiry" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-emerald-700 px-6 py-3 font-medium text-white hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700">Start a conversation<ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
                <Link href="/team#martin-melendro" className="inline-flex min-h-11 items-center text-sm font-medium text-emerald-800 underline underline-offset-4">Meet Martín</Link>
              </div>
            </div>
          </div>
        </section>
        <section id="planning" aria-labelledby="planning-heading" className="scroll-mt-24 py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-2xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-700">Your curiosity. Your pace.</p>
              <h2 id="planning-heading" className="text-3xl font-medium tracking-tight sm:text-4xl">A journey that starts with you</h2>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">A favourite bird, a love of photography, or simply time in nature. Tell us what brings you here.</p>
            </div>
            <ol className="grid gap-8 md:grid-cols-3">
              {planningSteps.map(({ icon: Icon, title, text }, index) => (
                <li key={title} className="border-t border-emerald-200 pt-6 sm:pr-6">
                  <div className="mb-5 flex items-center gap-3 text-emerald-700"><Icon className="h-6 w-6" aria-hidden="true" /><span className="text-sm font-semibold">Step {index + 1}</span></div>
                  <h3 className="text-xl font-semibold">{title}</h3>
                  <p className="mt-3 leading-7 text-gray-600">{text}</p>
                </li>
              ))}
            </ol>
            <div className="mt-10 flex flex-col items-start justify-between gap-6 rounded-3xl bg-emerald-900 p-7 text-white sm:p-9 md:flex-row md:items-center">
              <div><h3 className="text-2xl font-medium">Your AVES journeys, together.</h3><p className="mt-2 max-w-xl leading-7 text-emerald-100">Keep your trip ideas, quote requests and proposals in one account. Try our New Zealand planning beta to save your preferences and the birds you’d love to see.</p></div>
              <a href="/account" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-full bg-white px-6 py-3 font-semibold text-emerald-900 transition-colors hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Open My Trips<ArrowRight className="h-5 w-5" aria-hidden="true" /></a>
            </div>
          </div>
        </section>
      </main>
      <GlobalFooter />
    </div>
  )
}
