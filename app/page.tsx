/*
 * Australia homepage: assemble the introduction, bird/map explorer, travel story, regions and inquiry links.
 * Edit this file to change the order of homepage sections; species and region facts live in content/.
 * See docs/frontend-code-tour.md for the route-to-component reading order.
 */
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Bird, Camera, Leaf, MapPin } from "lucide-react"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import { AustraliaHomeExplorer } from "@/components/australia-home-explorer"
import { RegionExplorer } from "@/components/region-explorer"
import { PlanningSteps } from "@/components/planning-steps"
import { Button } from "@/components/ui/button"
import { sitePath } from "@/lib/site-path"

// Editable trip-interest cards. Their query parameters prefill the inquiry context; they do not reserve a tour.
const interests = [
  { title: "Follow the birds", icon: Bird, description: "A first birding adventure or a wish list years in the making. Share the birds and habitats you are curious about, and the pace you enjoy.", label: "Discuss a birding journey", href: "/contact?tour=adventure" },
  { title: "Take time for photography", icon: Camera, description: "Make room to watch the light, understand behaviour and wait for a moment. Tell us about your photography interests and preferred conditions.", label: "Discuss a photography journey", href: "/contact?tour=vision" },
  { title: "Explore at your own pace", icon: Leaf, description: "Time outdoors, interesting places and space to notice the details. Start with how you want your days to feel, including any walking preferences.", label: "Discuss a slower journey", href: "/contact?tour=elevate" },
]

export default function AVESLandingPage() {
  return <div className="min-h-screen bg-white">
    <NavigationHeader currentPage="/" />
    <main id="main-content" tabIndex={-1}>
      {/* First impression: headline above the linked map and bird media. */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-6 sm:py-8 lg:py-10">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-7 max-w-4xl text-center lg:mb-8">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-medium text-emerald-800 sm:text-sm"><MapPin className="h-4 w-4" aria-hidden="true" />AVES Australia · Custom birding journeys</p>
            <h1 className="text-balance text-3xl font-medium leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">Discover Australia’s <span className="text-emerald-700">extraordinary birdlife</span></h1>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">Plan a personal journey around birds, landscapes and local culture. We’ll discuss the route, stays and pace with you, from tropical rainforest to island shores.</p>
          </div>
          <AustraliaHomeExplorer />
        </div>
      </section>
      {/* Landscape and travel-style story: keep photo attribution with its image. */}
      <section aria-labelledby="whole-journey-heading" className="bg-stone-50/70 py-14 lg:py-20">
        <div className="container mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <figure className="min-w-0">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-emerald-50">
              <Image src={sitePath("/images/bruny-island.jpg")} alt="Golden beach, blue water and coastal scrub seen from The Neck towards Adventure Bay on Bruny Island" fill sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover" />
            </div>
            <figcaption className="mt-3 flex flex-wrap justify-between gap-2 text-xs leading-5 text-gray-600"><span>Bruny Island, Tasmania</span><Link href="/credits" className="rounded underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700">JJ Harrison · CC BY-SA 2.5</Link></figcaption>
          </figure>
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-emerald-800">Your kind of journey</p>
            <h2 id="whole-journey-heading" className="text-balance text-3xl font-medium leading-tight tracking-tight text-gray-900 sm:text-4xl">Follow the birds.<br />Leave room for the rest.</h2>
            <p className="mt-5 text-lg leading-relaxed text-gray-600">An early walk, a coastal afternoon, a good meal and time to settle in. Birding can be the focus of your trip, or one part of a more varied journey.</p>
            <dl className="mt-6 space-y-4 border-l border-emerald-200 pl-5">
              <div><dt className="font-medium text-emerald-950">A pace that feels like yours</dt><dd className="mt-1 leading-7 text-gray-600">Tell us how you like to travel: time in the field, shorter drives, unhurried lunches and the comfort you want at the end of the day.</dd></div>
              <div><dt className="font-medium text-emerald-950">People and place</dt><dd className="mt-1 leading-7 text-gray-600">Make room for regional food, art and local stories. Where available, discuss Aboriginal-led cultural experiences offered on the hosts’ terms.</dd></div>
              <div><dt className="font-medium text-emerald-950">Planned in conversation</dt><dd className="mt-1 leading-7 text-gray-600">We’re developing AVES Australia through personal trip requests. Guides, stays, availability and pricing are discussed and confirmed with you.</dd></div>
            </dl>
            <Link href="/contact" className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-emerald-700 px-6 py-3 font-medium text-white hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700">Tell us your travel style<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
      {/* A fuller regional chooser below the hero; compact still includes all nine regions. */}
      <RegionExplorer compact />
      {/* Interest cards are generated from the interests array above. */}
      <section className="bg-white py-14 lg:py-20" aria-labelledby="experiences-heading">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-9 max-w-2xl"><p className="mb-3 text-sm font-semibold uppercase tracking-wider text-emerald-700">Your interests, your journey</p><h2 id="experiences-heading" className="text-3xl font-medium tracking-tight text-gray-900 lg:text-4xl">What brings you outside?</h2><p className="mt-4 text-lg leading-relaxed text-gray-600">Start with what you enjoy. These interests help shape a custom itinerary; they are not scheduled departures.</p></div>
          <div className="grid gap-6 md:grid-cols-3">{interests.map(({ title, icon: Icon, description, label, href }) => <article key={title} className="flex flex-col border-t border-emerald-200 pt-6 lg:pr-6"><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100"><Icon className="h-6 w-6 text-emerald-700" aria-hidden="true" /></div><h3 className="text-xl font-semibold text-gray-900">{title}</h3><p className="mb-6 mt-3 flex-1 leading-relaxed text-gray-600">{description}</p><Link href={href} className="inline-flex min-h-11 items-center gap-2 font-medium text-emerald-700 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600">{label}<ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /></Link></article>)}</div>
        </div>
      </section>
      {/* Explain the personal planning process before the final invitation to contact AVES. */}
      <PlanningSteps />
      <section className="bg-gradient-to-br from-emerald-50 to-blue-50 py-14 lg:py-20" aria-labelledby="plan-heading"><div className="container mx-auto max-w-4xl px-4 text-center sm:px-6"><h2 id="plan-heading" className="text-3xl font-medium tracking-tight text-gray-900 lg:text-4xl">A bird, a place, an idea. Start there.</h2><p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-gray-600">You do not need a finished itinerary. Tell us what interests you, when you might travel and how you like to explore.</p><Button asChild size="lg" className="mt-7 min-h-12 rounded-lg bg-emerald-600 shadow-md hover:bg-emerald-700"><Link href="/contact">Plan my Australian trip <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></Button><p className="mt-4 text-sm text-gray-600">Just following along? <Link href="/contact?intent=waitlist" className="inline-flex min-h-11 items-center font-medium text-emerald-700 underline underline-offset-4">Join the Australian launch list</Link>.</p></div></section>
    </main>
    <Footer />
  </div>
}
