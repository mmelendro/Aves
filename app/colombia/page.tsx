import type { Metadata } from "next"
import { canonicalUrl } from "@/lib/site-path"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Bird, Camera, FileCheck2, Heart, Leaf, MapPin, MessageCircle, NotebookPen } from "lucide-react"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import HomepageBirdCarousel from "@/components/homepage-bird-carousel"
import { ContactFormSection } from "@/components/contact-form-section"
import { Button } from "@/components/ui/button"

const regions = [
  { slug: "pacific", name: "Pacific Coast & Chocó", description: "Rainforest, rivers and Pacific foothills" },
  { slug: "western-andes", name: "Western Andes", description: "Cloud forest and western mountain slopes" },
  { slug: "central-andes", name: "Central Andes", description: "Cloud forest, coffee landscapes and páramo" },
  { slug: "eastern-andes", name: "Eastern Andes", description: "Mountain forest and highland wetlands" },
  { slug: "cauca-valley", name: "Cauca Valley", description: "River habitats, dry forest and foothills" },
  { slug: "magdalena-valley", name: "Magdalena Valley", description: "A river corridor and forest mosaics" },
  { slug: "caribbean", name: "Caribbean", description: "Dry scrub, coastal forest and wetlands" },
  { slug: "sierra-nevada-de-santa-marta", name: "Sierra Nevada de Santa Marta", description: "Mountain forests above Caribbean lowlands" },
  { slug: "llanos", name: "Llanos", description: "Savannas, wetlands and gallery forest" },
  { slug: "amazonia", name: "Amazonia", description: "Lowland rainforest and Amazonian rivers" },
  { slug: "colombian-massif", name: "Colombian Massif", description: "Southern Andean forest and páramo" },
]

const experiences = [
  { name: "Adventure", icon: Bird, title: "Follow the birds", description: "Put birds and habitats at the heart of your journey. Explore the Adventure collection and share the species you hope to encounter.", href: "/tours/adventure" },
  { name: "Vision", icon: Camera, title: "Make time for photography", description: "Explore journeys with a photographic focus. Talk to us about your interests, equipment and the time you like to spend in the field.", href: "/tours/vision" },
  { name: "Elevate", icon: Leaf, title: "Find your kind of comfort", description: "Explore the Elevate collection, then discuss the accommodation, pace and personal touches that matter to your experience.", href: "/tours/elevate" },
  { name: "Souls", icon: Heart, title: "Share the experience", description: "Discover the Souls collection for couples who want to make time for birds, nature and each other.", href: "/tours/souls" },
]

const planningSteps = [
  { title: "Share what inspires you", icon: MessageCircle, text: "A region, a bird, possible dates or a favourite way to travel. Send an enquiry with whatever you know so far." },
  { title: "Shape the journey", icon: NotebookPen, text: "Discuss the route, pace, walking requirements, accommodation and guide arrangements with AVES." },
  { title: "Confirm the details", icon: FileCheck2, text: "Review availability, the itinerary, price, inclusions and booking terms before making your decision." },
]

export const metadata: Metadata = {
  title: { absolute: "AVES Colombia | Birdwatching Journeys" },
  description: "Explore Colombia's regions and birdlife, listen to bird calls and plan a personal birdwatching journey with AVES.",
  alternates: { canonical: canonicalUrl("/colombia") },
  openGraph: {
    title: "AVES Colombia | Birdwatching Journeys",
    description: "Explore Colombia's regions and birdlife, and shape a personal birdwatching journey with AVES.",
    url: canonicalUrl("/colombia"),
  },
  twitter: {
    card: "summary_large_image",
    title: "AVES Colombia | Birdwatching Journeys",
    description: "Explore Colombia's regions and birdlife, and shape a personal birdwatching journey with AVES.",
    images: ["/images/green-bearded-helmetcrest.png"],
  },
}

export default function AVESLandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavigationHeader currentPage="/colombia" />
      <main id="main-content" tabIndex={-1}>
        <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-6 sm:py-10 lg:py-12">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-14">
              <div className="mx-auto min-w-0 w-full max-w-xl">
                <p className="mb-4 text-center font-semibold text-emerald-900">A glimpse of Colombia’s <a href="https://colombia.travel/en/birdwatching" target="_blank" rel="noreferrer" className="underline underline-offset-4">1,900+ bird species<span className="sr-only"> (source: Colombia Travel; opens in a new tab)</span></a></p>
                <HomepageBirdCarousel className="w-full" autoPlay={false} />
                <p className="mt-3 text-center text-sm leading-relaxed text-gray-600">A few birds to inspire your journey. Explore their ranges and listen to available recordings; what you may see depends on your route, habitat and season.</p>
              </div>
              <div className="lg:pt-12">
                <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-800">
                  <MapPin className="h-4 w-4" aria-hidden="true" />AVES Colombia · Birding journeys
                </p>
                <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl xl:text-6xl">
                  Discover Colombia’s <span className="block text-emerald-600">Extraordinary Birdlife</span>
                </h1>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg lg:text-xl">
                  From Caribbean foothills to Andean cloud forest and the Amazon. Explore the places that inspire you, then shape a personal birding journey with AVES.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg" className="min-h-12 rounded-lg bg-emerald-600 px-5 shadow-md hover:bg-emerald-700">
                    <Link href="/aves-explorer">Explore the regions <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="min-h-12 rounded-lg border-emerald-600 px-5 text-emerald-700 hover:bg-emerald-50">
                    <Link href="/contact">Plan my trip</Link>
                  </Button>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-gray-600">Tell us your interests, preferred dates and pace. Itinerary, availability and arrangements are confirmed personally.</p>
              </div>

            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-white to-emerald-50/60 py-14 lg:py-20" aria-labelledby="regions-heading">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-9 max-w-2xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-emerald-700">A country of different habitats</p>
              <h2 id="regions-heading" className="text-3xl font-bold text-gray-900 lg:text-4xl">Find your corner of Colombia.</h2>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">Start with a landscape. Explore the map or choose a region to discover its birds and possibilities for your journey.</p>
            </div>
            <div className="grid items-start gap-7 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
              <Link href="/aves-explorer" className="group block rounded-2xl border border-emerald-100 bg-white p-5 shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 sm:p-7">
                <Image src="/images/birding-regions-colombia-final.png" alt="Map of Colombia showing its birding regions" width={634} height={802} sizes="(min-width: 1024px) 40vw, 90vw" className="mx-auto h-auto max-h-[580px] w-full object-contain" />
                <span className="mt-5 flex min-h-11 items-center justify-center gap-2 rounded-lg bg-emerald-50 px-3 text-center font-semibold text-emerald-800 group-hover:bg-emerald-100">
                  Open the interactive map <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </span>
              </Link>
              <nav aria-label="Colombia birding regions" className="grid gap-3 sm:grid-cols-2">
                {regions.map((region) => (
                  <Link key={region.slug} href={"/regions/" + region.slug} className="group flex min-h-24 items-start justify-between gap-3 rounded-xl border border-emerald-100 bg-white p-4 shadow-sm transition-colors hover:border-emerald-300 hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700">
                    <span><span className="block font-semibold text-gray-900">{region.name}</span><span className="mt-1 block text-sm leading-relaxed text-gray-600">{region.description}</span></span>
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-emerald-700" aria-hidden="true" />
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </section>

        <section className="bg-white py-14 lg:py-20" aria-labelledby="experiences-heading">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-9 max-w-2xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-emerald-700">Your interests, your journey</p>
              <h2 id="experiences-heading" className="text-3xl font-bold text-gray-900 lg:text-4xl">What brings you outside?</h2>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">Explore the four AVES collections, then talk with us about the journey that fits you.</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {experiences.map(({ name, icon: Icon, title, description, href }) => (
                <article key={name} className="flex flex-col rounded-xl border border-emerald-100 bg-gradient-to-br from-white to-emerald-50/50 p-6 shadow-md">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100"><Icon className="h-6 w-6 text-emerald-700" aria-hidden="true" /></div>
                  <p className="mb-2 text-sm font-semibold text-emerald-700">{name}</p>
                  <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                  <p className="mb-6 mt-3 flex-1 leading-relaxed text-gray-600">{description}</p>
                  <Link href={href} className="inline-flex min-h-11 items-center gap-2 font-medium text-emerald-700 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600">
                    Explore {name}<ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-14 lg:py-20" aria-labelledby="story-heading">
          <div className="container mx-auto grid max-w-7xl items-start gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-emerald-700">Birds bring us together</p>
              <h2 id="story-heading" className="text-3xl font-bold leading-tight text-gray-900 lg:text-4xl">Curiosity is a good place to begin.</h2>
              <p className="mt-5 text-lg leading-relaxed text-gray-600">A first birding adventure, a photograph you have imagined, or the chance to explore somewhere new. Start with your interests and get to know the people and ideas behind AVES.</p>
              <Link href="/team" className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-emerald-700 underline-offset-4 hover:underline">Meet the AVES team <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
            <div className="rounded-xl border border-emerald-100 bg-white p-6 shadow-lg lg:p-8">
              <h3 className="text-xl font-bold text-gray-900">Thoughtful journeys start with clear expectations.</h3>
              <ul className="mt-5 space-y-4 text-gray-600">
                <li className="flex gap-3"><Bird className="mt-1 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" /><span>Wildlife leads the way. Sightings are opportunities, never promises.</span></li>
                <li className="flex gap-3"><MapPin className="mt-1 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" /><span>Discuss your route, walking preferences and guide arrangements before you commit.</span></li>
                <li className="flex gap-3"><Leaf className="mt-1 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" /><span>AVES is pursuing B Corp certification and is not yet certified.</span></li>
              </ul>
              <Link href="/about/b-corp" className="mt-5 inline-flex min-h-11 items-center gap-2 font-medium text-emerald-700 underline-offset-4 hover:underline">Our B Corp journey <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
          </div>
        </section>

        <section className="bg-white py-14 lg:py-20" aria-labelledby="planning-heading">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-emerald-700">From first idea to a personal journey</p>
              <h2 id="planning-heading" className="text-3xl font-bold text-gray-900 lg:text-4xl">A little planning. A lot to look forward to.</h2>
            </div>
            <ol className="grid gap-7 md:grid-cols-3">
              {planningSteps.map(({ title, icon: Icon, text }, index) => (
                <li key={title} className="rounded-xl border border-emerald-100 bg-white p-6 shadow-md">
                  <div className="mb-5 flex items-center justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-lg font-semibold text-emerald-800">{index + 1}</span><Icon className="h-6 w-6 text-emerald-600" aria-hidden="true" /></div>
                  <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                  <p className="mt-3 leading-relaxed text-gray-600">{text}</p>
                </li>
              ))}
            </ol>
            <div className="mt-7 text-center"><Link href="/how-it-works" className="inline-flex min-h-11 items-center gap-2 font-semibold text-emerald-700 underline-offset-4 hover:underline">How planning with AVES works <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div>
          </div>
        </section>

        <div id="contact" className="scroll-mt-24">
          <ContactFormSection showTitle={true} showFAQ={false} variant="homepage" />
        </div>
      </main>
      <Footer />
    </div>
  )
}
