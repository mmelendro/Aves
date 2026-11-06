import Link from "next/link"
import { ArrowRight, Bird, Camera, Leaf, MapPin } from "lucide-react"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import HomepageBirdCarousel from "@/components/homepage-bird-carousel"
import { RegionExplorer } from "@/components/region-explorer"
import { PlanningSteps } from "@/components/planning-steps"
import { Button } from "@/components/ui/button"

const interests = [
  { title: "Follow the birds", icon: Bird, description: "A first birding adventure or a wish list years in the making. Share the birds and habitats you are curious about, and the pace you enjoy.", label: "Discuss a birding journey", href: "/contact?tour=adventure" },
  { title: "Take time for photography", icon: Camera, description: "Make room to watch the light, understand behaviour and wait for a moment. Tell us about your photography interests and preferred conditions.", label: "Discuss a photography journey", href: "/contact?tour=vision" },
  { title: "Explore at your own pace", icon: Leaf, description: "Time outdoors, interesting places and space to notice the details. Start with how you want your days to feel, including any walking preferences.", label: "Discuss a slower journey", href: "/contact?tour=elevate" },
]

export default function AVESLandingPage() {
  return <div className="min-h-screen bg-white">
    <NavigationHeader currentPage="/" />
    <main id="main-content" tabIndex={-1}>
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-10 sm:py-14 lg:py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
            <div>
              <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-800"><MapPin className="h-4 w-4" aria-hidden="true" />AVES Australia · Custom trip enquiries</p>
              <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl xl:text-6xl">Discover Australia’s <span className="block text-emerald-600">Extraordinary Birdlife</span></h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg lg:text-xl">From tropical rainforest to island shores. Explore the places that inspire you, then shape a personal birding journey with AVES.</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="min-h-12 rounded-lg bg-emerald-600 px-5 shadow-md hover:bg-emerald-700"><Link href="/aves-explorer">Explore the regions <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></Button>
                <Button asChild size="lg" variant="outline" className="min-h-12 rounded-lg border-emerald-600 px-5 text-emerald-700 hover:bg-emerald-50"><Link href="/contact">Plan my trip</Link></Button>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-gray-600">Australian journeys are in development. Enquiries are open; routes, guides and pricing are agreed personally.</p>
            </div>
            <div className="mx-auto min-w-0 w-full max-w-lg lg:max-w-none"><HomepageBirdCarousel className="w-full" autoPlay={false} /><p className="mt-3 text-center text-sm text-gray-600">Meet 20 Australian birds. Explore their ranges and listen to available recordings.</p></div>
          </div>
        </div>
      </section>
      <RegionExplorer compact />
      <section className="bg-white py-14 lg:py-20" aria-labelledby="experiences-heading">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-9 max-w-2xl"><p className="mb-3 text-sm font-semibold uppercase tracking-wider text-emerald-700">Your interests, your journey</p><h2 id="experiences-heading" className="text-3xl font-bold text-gray-900 lg:text-4xl">What brings you outside?</h2><p className="mt-4 text-lg leading-relaxed text-gray-600">Start with what you enjoy. These interests help shape a custom itinerary; they are not scheduled departures.</p></div>
          <div className="grid gap-6 md:grid-cols-3">{interests.map(({ title, icon: Icon, description, label, href }) => <article key={title} className="flex flex-col rounded-xl border border-emerald-100 bg-gradient-to-br from-white to-emerald-50/50 p-6 shadow-md lg:p-8"><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100"><Icon className="h-6 w-6 text-emerald-700" aria-hidden="true" /></div><h3 className="text-xl font-bold text-gray-900">{title}</h3><p className="mb-6 mt-3 flex-1 leading-relaxed text-gray-600">{description}</p><Link href={href} className="inline-flex min-h-11 items-center gap-2 font-medium text-emerald-700 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600">{label}<ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /></Link></article>)}</div>
        </div>
      </section>
      <section className="bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-14 lg:py-20" aria-labelledby="story-heading">
        <div className="container mx-auto grid max-w-7xl items-start gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div><p className="mb-3 text-sm font-semibold uppercase tracking-wider text-emerald-700">A new Australian chapter</p><h2 id="story-heading" className="text-3xl font-bold leading-tight text-gray-900 lg:text-4xl">Curiosity is a good place to begin.</h2><p className="mt-5 text-lg leading-relaxed text-gray-600">AVES brings a love of birds and wild places to its Australian beginning. We are developing local guiding relationships and listening to the people who want to explore with us.</p><Link href="/about" className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-emerald-700 underline-offset-4 hover:underline">Get to know AVES <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div>
          <div className="rounded-xl border border-emerald-100 bg-white p-6 shadow-lg lg:p-8"><h3 className="text-xl font-bold text-gray-900">Thoughtful journeys start with clear expectations.</h3><ul className="mt-5 space-y-4 text-gray-600"><li className="flex gap-3"><Bird className="mt-1 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" /><span>Wildlife leads the way. Sightings are opportunities, never promises.</span></li><li className="flex gap-3"><MapPin className="mt-1 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" /><span>Routes, walking demands and guide arrangements are discussed before you commit.</span></li><li className="flex gap-3"><Leaf className="mt-1 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" /><span>AVES is pursuing B Corp certification and is not yet certified.</span></li></ul><Link href="/conservation" className="mt-5 inline-flex min-h-11 items-center gap-2 font-medium text-emerald-700 underline-offset-4 hover:underline">Our approach to wildlife <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div>
        </div>
      </section>
      <PlanningSteps />
      <section className="bg-gradient-to-br from-emerald-50 to-blue-50 py-14 lg:py-20" aria-labelledby="plan-heading"><div className="container mx-auto max-w-4xl px-4 text-center sm:px-6"><h2 id="plan-heading" className="text-3xl font-bold text-gray-900 lg:text-4xl">A bird, a place, an idea. Start there.</h2><p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-gray-600">You do not need a finished itinerary. Tell us what interests you, when you might travel and how you like to explore.</p><Button asChild size="lg" className="mt-7 min-h-12 rounded-lg bg-emerald-600 shadow-md hover:bg-emerald-700"><Link href="/contact">Plan my Australian trip <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></Button><p className="mt-4 text-sm text-gray-600">Just following along? <Link href="/contact?intent=waitlist" className="inline-flex min-h-11 items-center font-medium text-emerald-700 underline underline-offset-4">Join the Australian launch list</Link>.</p></div></section>
    </main>
    <Footer />
  </div>
}
