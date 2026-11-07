import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Bird, Compass, Heart, Utensils, Waves } from "lucide-react"
import { GlobalFooter, GlobalHeader } from "@/components/global-navigation"
import NewZealandMap from "@/components/new-zealand-map"
import NewZealandBirdCarousel from "@/components/new-zealand-bird-carousel"
import { newZealandContactHref, newZealandRegions } from "@/content/new-zealand"
import { canonicalUrl } from "@/lib/site-path"

const description = "Discover Aotearoa New Zealand with AVES: native birds, island landscapes, food and culture at your pace. Explore our developing destination and share your trip ideas."
export const metadata: Metadata = {
  title: { absolute: "New Zealand | Birdlife, nature & culture | AVES" }, description,
  alternates: { canonical: canonicalUrl("/new-zealand") },
  openGraph: { title: "Aotearoa New Zealand | AVES", description, url: canonicalUrl("/new-zealand"), images: [{ url: canonicalUrl("/images/destinations/kea-new-zealand.jpg"), alt: "Kea in New Zealand" }] },
  twitter: { card: "summary_large_image", title: "Aotearoa New Zealand | AVES", description, images: [canonicalUrl("/images/destinations/kea-new-zealand.jpg")] },
}

const linkStyle = "inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-6 py-3 font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
const experiences = [
  { icon: Bird, title: "Birdlife worth slowing down for", text: "Make space for a few thoughtful birding outings, with time to enjoy the forest, sounds and landscape around each encounter." },
  { icon: Utensils, title: "Food, art and local stories", text: "Make museums, galleries, local food and farm or garden visits part of the journey. Seek out Māori-led cultural experiences offered on the hosts’ terms." },
  { icon: Waves, title: "Room to simply be here", text: "Balance active days with a coastal walk, a long lunch or time at a comfortable place to stay. A free afternoon can be part of a well-planned trip." },
]

export default function NewZealandPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <GlobalHeader country="new-zealand" />
      <main id="main-content" tabIndex={-1}>
        <section className="bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-10 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link href="/" className="mb-7 inline-flex min-h-11 items-center rounded-lg text-sm font-medium text-emerald-800 underline underline-offset-4">All destinations</Link>
            <div className="grid items-center gap-9 lg:grid-cols-2 lg:gap-12">
              <div>
                <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-medium text-emerald-800"><Compass className="h-4 w-4" aria-hidden="true" /> A new AVES destination · In development</p>
                <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">Aotearoa<br /><span className="text-emerald-700">New Zealand</span></h1>
                <p className="mt-5 text-xl font-medium leading-relaxed text-emerald-900">Follow the birds. Stay for everything around them.</p>
                <p className="mt-4 max-w-xl text-lg leading-relaxed text-gray-600">Island birdlife, mountain landscapes and stories rooted in place. Imagine a journey with time for nature, good food, culture and the simple pleasure of being somewhere new.</p>
                <div className="mt-7 flex flex-wrap gap-3"><a href="#regions" className={`${linkStyle} bg-emerald-700 text-white hover:bg-emerald-800`}>Explore the islands<ArrowRight className="h-5 w-5" aria-hidden="true" /></a><a href="#your-journey" className={`${linkStyle} border border-emerald-200 bg-white text-emerald-800 hover:bg-emerald-50`}>Share your ideas</a></div>
              </div>
              <figure className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-xl shadow-emerald-950/10">
                <div className="relative aspect-[4/3]"><Image src="/images/destinations/kea-new-zealand.jpg" alt="A kea perched beside a tree, showing its olive-green feathers and curved beak" fill priority sizes="(max-width: 1023px) 100vw, 600px" className="object-cover" /></div>
                <figcaption className="flex flex-wrap justify-between gap-2 px-5 py-4 text-xs text-gray-600"><span>Kea · New Zealand</span><Link href="/credits" className="underline underline-offset-4">Piotr Zurek · CC BY-SA 2.0</Link></figcaption>
              </figure>
            </div>
            <nav aria-label="On this page" className="mt-10 flex flex-wrap gap-x-6 gap-y-1 border-t border-emerald-200 pt-4 text-sm font-semibold text-emerald-800">{[["regions", "The islands"], ["birdlife", "Birds & where to find them"], ["experience", "Beyond birding"], ["travel-with-care", "Travel with care"]].map(([id, label]) => <a key={id} href={`#${id}`} className="inline-flex min-h-11 items-center rounded underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700">{label}</a>)}</nav>
          </div>
        </section>

        <section id="regions" aria-labelledby="regions-heading" className="scroll-mt-24 py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-700">Find your starting point</p>
            <h2 id="regions-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">Three islands. Many ways to explore.</h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-600">Choose the landscapes that speak to you. A rewarding trip can focus on one part of the country, with time to settle in.</p>
            <NewZealandMap />
            <div className="mt-9 grid gap-6 lg:grid-cols-3">{newZealandRegions.map((region, index) => <article key={region.id} id={`region-${region.id}`} tabIndex={-1} aria-labelledby={`region-${region.id}-heading`} className="flex scroll-mt-28 flex-col rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50/70 to-white p-6 sm:p-7 target:border-emerald-600 target:ring-2 target:ring-emerald-100 focus:outline focus:outline-2 focus:outline-emerald-700">
              <span className="mb-6 flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-800">0{index + 1}</span>
              <h3 id={`region-${region.id}-heading`} className="text-2xl font-bold">{region.name}</h3><p className="mt-2 font-medium text-emerald-700">{region.subtitle}</p>
              <p className="mt-5 leading-7 text-gray-600">{region.description}</p><p className="mt-5 text-sm leading-6 text-emerald-900"><strong>Birdlife:</strong> {region.birds}</p>
              <p className="mb-5 mt-4 text-sm leading-6 text-gray-600">{region.balance}</p>
              <a href={region.source} target="_blank" rel="noreferrer" className="mt-auto inline-flex min-h-11 items-center gap-2 rounded text-sm font-semibold text-emerald-800 underline underline-offset-4">Read the DOC place guide<ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
            </article>)}</div>
          </div>
        </section>

        <section id="birdlife" aria-labelledby="birdlife-heading" className="scroll-mt-24 bg-gray-50 py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-700">Meet the birdlife</p>
            <h2 id="birdlife-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">A few birds to spark your curiosity</h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-600">Each bird belongs to a particular landscape. These are starting points for discovery; access, seasons and sightings vary.</p>
            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm leading-7 text-gray-700"><p>Start with <a href="https://ebird.org/region/NZ" target="_blank" rel="noreferrer" className="font-semibold text-emerald-800 underline underline-offset-4">eBird’s New Zealand records</a> to explore birds by place and time of year. For conservation status, consult <a href="https://datazone.birdlife.org/about-our-science/the-iucn-red-list" target="_blank" rel="noreferrer" className="font-semibold text-emerald-800 underline underline-offset-4">BirdLife’s IUCN Red List work</a>; DOC provides local species and visitor guidance. A record is a starting point, not a promise of a sighting.</p></div>
            <NewZealandBirdCarousel />
          </div>
        </section>

        <section id="experience" aria-labelledby="experience-heading" className="scroll-mt-24 py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 id="experience-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">The whole journey matters</h2><p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-600">Birding can be one thread in a trip full of curiosity. Tell us the balance that feels right for you.</p>
            <div className="mt-9 grid gap-8 md:grid-cols-3">{experiences.map(({ icon: Icon, title, text }) => <div key={title}><Icon className="mb-5 h-7 w-7 text-emerald-700" aria-hidden="true" /><h3 className="text-xl font-bold">{title}</h3><p className="mt-3 leading-7 text-gray-600">{text}</p></div>)}</div>
          </div>
        </section>

        <section id="travel-with-care" aria-labelledby="care-heading" className="scroll-mt-24 bg-emerald-50/70 py-12 sm:py-16">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
            <div><Heart className="mb-4 h-6 w-6 text-emerald-700" aria-hidden="true" /><h2 id="care-heading" className="text-3xl font-bold tracking-tight">Respect for people and place</h2><p className="mt-5 leading-7 text-gray-700">We recognise Māori as tangata whenua of Aotearoa and respect the enduring relationships of iwi and hapū with their lands and waters. As visitors, we aim to listen, learn and follow the guidance of mana whenua in the places we visit.</p><p className="mt-4 leading-7 text-gray-600">Cultural experiences should be led by the people sharing their own stories, with their consent and on their terms.</p></div>
            <div className="rounded-2xl border border-emerald-200 bg-white p-6 sm:p-7"><h3 className="text-xl font-bold text-emerald-900">Travel with care</h3><ul className="mt-4 list-disc space-y-3 pl-5 leading-7 text-gray-600"><li>Give wildlife space, never feed birds and follow local viewing rules.</li><li>Respect access restrictions, local protocols and requests about photography.</li><li>Take your waste with you and follow biosecurity guidance between natural areas.</li><li>Support local hosts and choose a pace that leaves room to appreciate each place.</li></ul><a href="https://www.newzealand.com/int/feature/tiaki-care-for-new-zealand/" target="_blank" rel="noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded font-semibold text-emerald-800 underline underline-offset-4">Discover the Tiaki Promise<ArrowRight className="h-4 w-4" aria-hidden="true" /></a></div>
          </div>
        </section>

        <section id="your-journey" aria-labelledby="journey-heading" className="scroll-mt-24 py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="rounded-3xl bg-emerald-900 p-7 text-white sm:p-12">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-emerald-200">Help shape what comes next</p><h2 id="journey-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">What would your New Zealand journey look like?</h2><p className="mt-5 max-w-2xl text-lg leading-relaxed text-emerald-50">We’re developing AVES New Zealand. Share your interests, approximate dates, preferred pace and the kind of places you’d love to stay.</p>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-emerald-100">This is an introduction to a destination in development. New Zealand trips aren’t yet available to save or book through the website. We’ll discuss what may be possible by email, with any arrangements confirmed separately.</p>
            <a href={newZealandContactHref} className={`${linkStyle} mt-7 bg-white text-emerald-900 hover:bg-emerald-50 focus-visible:outline-white`}>Tell us about your New Zealand ideas<ArrowRight className="h-5 w-5" aria-hidden="true" /></a><p className="mt-4 text-sm text-emerald-100">Send a message through our contact form. We’ll reply personally.</p>
          </div></div>
        </section>
      </main>
      <GlobalFooter country="new-zealand" />
    </div>
  )
}
