/**
 * Public New Zealand destination page. Its status remains in development: calls to
 * action open a conversation, not a reservation. The hero pairs birds and island links,
 * followed by experiences, regional guides, sources, responsible travel and contact.
 * Private guest itineraries do not belong in this public route.
 */
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Bird, Compass, Heart, Utensils, Waves } from "lucide-react"
import { GlobalFooter, GlobalHeader } from "@/components/global-navigation"
import NewZealandMap from "@/components/new-zealand-map"
import { NewZealandPhotoCredits } from "@/components/new-zealand-bird-carousel"
import NewZealandHeroExplorer from "@/components/new-zealand-hero-explorer"
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
        <section className="bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-6 sm:py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-7 max-w-3xl text-center sm:mb-9">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-xs font-medium text-emerald-800 sm:text-sm"><Compass className="h-4 w-4" aria-hidden="true" />A new AVES destination · In development</p>
              <h1 className="text-balance text-3xl font-medium leading-tight tracking-tight sm:text-4xl lg:text-5xl">Aotearoa <span className="text-emerald-700">New Zealand</span></h1>
              <p className="mt-4 text-base font-medium leading-relaxed text-emerald-900 sm:text-lg">Follow the birds. Stay for everything around them.</p>
              <p className="mx-auto mt-2 max-w-2xl text-base leading-relaxed text-gray-600">We’re developing personally planned journeys connecting birds, landscapes and local culture. Tell us the pace, comforts and experiences you would love to build a trip around.</p>
            </div>
            <div className="mb-7 text-center"><Link href="/account?country=new-zealand&region=south-island" className={`${linkStyle} bg-emerald-700 text-white hover:bg-emerald-800`}>Start a private planning brief<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link><p className="mt-3 text-sm text-gray-600">A short questionnaire in My Trips. Save privately, then choose whether to share with AVES. Planning beta; no booking is confirmed.</p></div>
            <NewZealandHeroExplorer />
            <nav aria-label="On this page" className="mt-7 flex flex-wrap gap-x-6 gap-y-1 border-t border-emerald-200 pt-4 text-sm font-semibold text-emerald-800"><Link href="/" className="inline-flex min-h-11 items-center rounded underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700">All destinations</Link>{[["regions", "The islands"], ["birdlife", "Birds & where to find them"], ["experience", "Beyond birding"], ["travel-with-care", "Travel with care"]].map(([id, label]) => <a key={id} href={`#${id}`} className="inline-flex min-h-11 items-center rounded underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700">{label}</a>)}</nav>
          </div>
        </section>

        {/* Broaden the invitation beyond birding; retain the nearby source and licence for this photo. */}
        <section id="experience" aria-labelledby="experience-heading" className="scroll-mt-24 bg-stone-50/70 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
              <figure className="min-w-0">
                <Image src="/images/new-zealand/lake-tekapo.jpg" alt="Turquoise Lake Tekapo beneath mountain ranges and an open sky on New Zealand’s South Island" width={960} height={720} sizes="(min-width: 1024px) 45vw, 100vw" className="aspect-[4/3] w-full rounded-2xl object-cover" />
                <figcaption className="mt-3 text-xs leading-5 text-gray-500">Lake Tekapo, South Island · <a href="https://commons.wikimedia.org/wiki/File:Lake_Tekapo_-_New_Zealand.jpg" target="_blank" rel="noreferrer" className="rounded underline underline-offset-4">Ryancoke2020</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noreferrer" className="rounded underline underline-offset-4">CC BY-SA 4.0</a>. Original photograph, displayed at a smaller size.</figcaption>
              </figure>
              <div>
                <p className="mb-3 text-sm font-medium uppercase tracking-widest text-emerald-700">Beyond the bird list</p>
                <h2 id="experience-heading" className="text-balance text-3xl font-medium leading-tight tracking-tight sm:text-4xl">Make room for the whole journey.</h2>
                <p className="mt-5 text-lg leading-relaxed text-gray-600">A birding morning can lead into a lakeside walk, a gallery visit or a long lunch. Tell us what makes a trip memorable for you.</p>
                <p className="mt-4 leading-7 text-gray-600">As we develop AVES New Zealand, your interests will help shape the conversation: how far you want to travel, where you feel comfortable staying and how much time to leave unplanned.</p>
                <a href={newZealandContactHref} className={`${linkStyle} mt-6 bg-emerald-700 text-white hover:bg-emerald-800`}>Discuss a New Zealand trip<ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
                <p className="mt-3 text-xs leading-5 text-gray-500">A personal conversation about a destination in development; arrangements are confirmed separately.</p>
              </div>
            </div>
            <div className="mt-9 grid gap-7 border-t border-emerald-100 pt-7 md:grid-cols-3">{experiences.map(({ icon: Icon, title, text }) => <div key={title}><Icon className="mb-3 h-5 w-5 text-emerald-700" aria-hidden="true" /><h3 className="text-lg font-medium">{title}</h3><p className="mt-2 text-sm leading-7 text-gray-600">{text}</p></div>)}</div>
          </div>
        </section>

        {/* The map and the region cards share region IDs so either map can link to these anchors. */}
        <section id="regions" aria-labelledby="regions-heading" className="scroll-mt-24 py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-700">Find your starting point</p>
            <h2 id="regions-heading" className="text-3xl font-medium tracking-tight sm:text-4xl">Three islands. Many ways to explore.</h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-600">Choose the landscapes that speak to you. A rewarding trip can focus on one part of the country, with time to settle in.</p>
            <NewZealandMap />
            <div className="mt-9 grid gap-6 lg:grid-cols-3">{newZealandRegions.map((region, index) => <article key={region.id} id={`region-${region.id}`} tabIndex={-1} aria-labelledby={`region-${region.id}-heading`} className="flex scroll-mt-28 flex-col rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50/70 to-white p-6 sm:p-7 target:border-emerald-600 target:ring-2 target:ring-emerald-100 focus:outline focus:outline-2 focus:outline-emerald-700">
              <span className="mb-6 flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-sm font-medium text-emerald-800">0{index + 1}</span>
              <h3 id={`region-${region.id}-heading`} className="text-2xl font-medium">{region.name}</h3><p className="mt-2 font-medium text-emerald-700">{region.subtitle}</p>
              <p className="mt-5 leading-7 text-gray-600">{region.description}</p><p className="mt-5 text-sm leading-6 text-emerald-900"><strong>Birdlife:</strong> {region.birds}</p>
              <p className="mb-5 mt-4 text-sm leading-6 text-gray-600">{region.balance}</p>
              {region.id === "south-island" && <Link href="/new-zealand/south-island" className="mb-3 inline-flex min-h-11 items-center gap-2 rounded text-sm font-semibold text-emerald-800 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700">Explore the South Island<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>}
              <a href={region.source} target="_blank" rel="noreferrer" className="mt-auto inline-flex min-h-11 items-center gap-2 rounded text-sm font-semibold text-emerald-800 underline underline-offset-4">Read the DOC place guide<ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
            </article>)}</div>
          </div>
        </section>

        <section id="birdlife-guide" aria-labelledby="birdlife-heading" className="scroll-mt-24 bg-gray-50 py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-700">Meet the birdlife</p>
            <h2 id="birdlife-heading" className="text-3xl font-medium tracking-tight sm:text-4xl">Discover New Zealand’s birds</h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-600">Explore forest song, alpine specialists, wetland birds and coastal wildlife, with a particular focus on the South Island. The photographed selection includes licensed images, recordings and places to look. Search the complete published checklist above to add other birds to your private brief.</p>
            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm leading-7 text-gray-700"><p>Start with <a href="https://ebird.org/region/NZ" target="_blank" rel="noreferrer" className="font-semibold text-emerald-800 underline underline-offset-4">eBird’s New Zealand records</a> to explore birds by place and time of year. For conservation status, consult <a href="https://datazone.birdlife.org/about-our-science/the-iucn-red-list" target="_blank" rel="noreferrer" className="font-semibold text-emerald-800 underline underline-offset-4">BirdLife’s IUCN Red List work</a>; DOC provides local species and visitor guidance. A record is a starting point, not a promise of a sighting.</p></div>
            <a href="#birdlife" className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-emerald-800 underline underline-offset-4">Browse the birds and listen to their calls<ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
            <NewZealandPhotoCredits />
          </div>
        </section>



        <section id="travel-with-care" aria-labelledby="care-heading" className="scroll-mt-24 bg-emerald-50/70 py-12 sm:py-16">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
            <div><Heart className="mb-4 h-6 w-6 text-emerald-700" aria-hidden="true" /><h2 id="care-heading" className="text-3xl font-medium tracking-tight">Respect for people and place</h2><p className="mt-5 leading-7 text-gray-700">We recognise Māori as tangata whenua of Aotearoa and respect the enduring relationships of iwi and hapū with their lands and waters. As visitors, we aim to listen, learn and follow the guidance of mana whenua in the places we visit.</p><p className="mt-4 leading-7 text-gray-600">Cultural experiences should be led by the people sharing their own stories, with their consent and on their terms.</p></div>
            <div className="rounded-2xl border border-emerald-200 bg-white p-6 sm:p-7"><h3 className="text-xl font-medium text-emerald-900">Travel with care</h3><ul className="mt-4 list-disc space-y-3 pl-5 leading-7 text-gray-600"><li>Give wildlife space, never feed birds and follow local viewing rules.</li><li>Respect access restrictions, local protocols and requests about photography.</li><li>Take your waste with you and follow biosecurity guidance between natural areas.</li><li>Support local hosts and choose a pace that leaves room to appreciate each place.</li></ul><a href="https://www.newzealand.com/int/feature/tiaki-care-for-new-zealand/" target="_blank" rel="noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded font-semibold text-emerald-800 underline underline-offset-4">Discover the Tiaki Promise<ArrowRight className="h-4 w-4" aria-hidden="true" /></a></div>
          </div>
        </section>

        <section id="your-journey" aria-labelledby="journey-heading" className="scroll-mt-24 py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="rounded-3xl bg-emerald-900 p-7 text-white sm:p-12">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-emerald-200">Help shape what comes next</p><h2 id="journey-heading" className="text-3xl font-medium tracking-tight sm:text-4xl">What would your New Zealand journey look like?</h2><p className="mt-5 max-w-2xl text-lg leading-relaxed text-emerald-50">We’re developing AVES New Zealand. Share your interests, approximate dates, preferred pace and the kind of places you’d love to stay.</p>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-emerald-100">New Zealand is a planning beta. You can save a private brief and the birds you would love to see, then choose to share it with AVES. Planning does not confirm tours, guides, dates, prices or reservations; arrangements are discussed separately.</p>
            <a href={newZealandContactHref} className={`${linkStyle} mt-7 bg-white text-emerald-900 hover:bg-emerald-50 focus-visible:outline-white`}>Discuss a New Zealand trip<ArrowRight className="h-5 w-5" aria-hidden="true" /></a><p className="mt-4 text-sm text-emerald-100">Send a message through our contact form. We’ll reply personally.</p>
          </div></div>
        </section>
      </main>
      <GlobalFooter country="new-zealand" />
    </div>
  )
}
