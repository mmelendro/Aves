import SouthIslandSoundscapes from "@/components/south-island-soundscapes"
import SouthIslandResourceCarousel from "@/components/south-island-resource-carousel"
/**
 * The first dedicated NZ regional page. The shared explorer receives one island
 * ID and supplies its verified birds, calls, map, Info panel and private wishlist.
 * This route adds public context only; it never embeds a guest's itinerary.
 */
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Compass, Heart } from "lucide-react"
import { GlobalFooter, GlobalHeader } from "@/components/global-navigation"
import NewZealandHeroExplorer from "@/components/new-zealand-hero-explorer"
import SouthIslandPlacesExplorer from "@/components/south-island-places-explorer"
import SouthIslandHabitatProvider from "@/components/south-island-habitat-context"
import { newZealandContactHref } from "@/content/new-zealand"
import { southIslandBriefHref, southIslandFieldGuides, southIslandPlanning } from "@/content/south-island"
import { canonicalUrl } from "@/lib/site-path"

const path = "/new-zealand/south-island"
const description = "Explore New Zealand’s South Island through its birds, mountain forests, lakes and coasts. Listen to local bird calls and start a private AVES planning brief."
export const metadata: Metadata = {
  title: { absolute: "South Island birding, nature & travel | AVES New Zealand" },
  description,
  alternates: { canonical: canonicalUrl(path) },
  openGraph: {
    title: "South Island | AVES New Zealand", description, url: canonicalUrl(path),
    images: [{ url: canonicalUrl("/images/destinations/kea-new-zealand.jpg"), alt: "Kea in New Zealand" }],
  },
  twitter: {
    card: "summary_large_image", title: "South Island | AVES New Zealand", description,
    images: [canonicalUrl("/images/destinations/kea-new-zealand.jpg")],
  },
}

const buttonStyle = "inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-6 py-3 font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
const textLinkStyle = "inline-flex min-h-11 items-center gap-2 rounded text-sm font-semibold text-emerald-800 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700"

export default function SouthIslandPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <GlobalHeader country="new-zealand" />
      <SouthIslandHabitatProvider><main id="main-content" tabIndex={-1}>
        <section className="bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-6 sm:py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-emerald-800">
              <Link href="/" className={textLinkStyle}>All destinations</Link><span aria-hidden="true">/</span>
              <Link href="/new-zealand" className={textLinkStyle}>New Zealand</Link><span aria-hidden="true">/</span>
              <span aria-current="page">South Island</span>
            </nav>
            <div className="mx-auto mb-7 max-w-3xl text-center sm:mb-9">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-xs font-medium text-emerald-800 sm:text-sm"><Compass className="h-4 w-4" aria-hidden="true" />AVES New Zealand</p>
              <h1 className="text-balance text-3xl font-medium leading-tight tracking-tight sm:text-4xl lg:text-5xl">The <span className="text-emerald-700">South Island</span></h1>
              <p className="mt-4 text-base font-medium leading-relaxed text-emerald-900 sm:text-lg">Let the birds lead you into the landscape.</p>
              <p className="mx-auto mt-2 max-w-2xl text-base leading-relaxed text-gray-600">From mountain parrots to forest song and coastal wildlife, build a journey around the habitats that interest you. Leave room for good food, local stories and time to enjoy each place.</p>
            </div>

            {/* One content-driven explorer keeps this regional page consistent
                with the country page, including calls, rights and saved picks. */}
            <SouthIslandSoundscapes />
            <NewZealandHeroExplorer regionId="south-island" />

            <nav aria-label="On this page" className="mt-7 flex flex-wrap gap-x-6 gap-y-1 border-t border-emerald-200 pt-4">
              {[["birdlife", "Birds & map"], ["places", "Habitats & places"], ["practical-planning", "Practical planning"], ["your-pace", "Your pace"], ["resources", "Listen, watch & read"], ["travel-with-care", "Travel with care"]].map(([id, label]) => <a key={id} href={`#${id}`} className={textLinkStyle}>{label}</a>)}
            </nav>
          </div>
        </section>

        <section id="places" aria-labelledby="places-heading" className="scroll-mt-24 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-emerald-700">Start with a habitat</p>
            <h2 id="places-heading" className="text-3xl font-medium tracking-tight sm:text-4xl">A few places to build around.</h2>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-600">These are starting points, not stops to fit into one trip. Choose a manageable area and give the birds, weather and your own interests room to shape the days.</p>
            <div className="mt-8"><SouthIslandPlacesExplorer mediaOnly /></div>
          </div>
        </section>

        {/* Static planning prompts reuse the existing cards; current conditions
            remain on official sites, avoiding an unreliable copied status feed. */}
        <section id="practical-planning" aria-labelledby="planning-heading" className="scroll-mt-24 bg-emerald-50/50 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-emerald-700">Before the route takes shape</p>
            <h2 id="planning-heading" className="text-3xl font-medium tracking-tight sm:text-4xl">Plan for the journey, as well as the birds.</h2>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-600">A few practical decisions help turn favourite birds and places into a holiday that feels like yours.</p>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {southIslandPlanning.map(item => <details key={item.title} className="rounded-3xl border border-emerald-100 bg-white p-6 sm:p-7">
                <summary className="min-h-11 cursor-pointer rounded text-emerald-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700"><h3 className="inline text-xl font-medium">{item.title}</h3></summary>
                <p className="mt-4 leading-7 text-gray-600">{item.intro}</p>
                <ul className="mb-5 mt-4 list-disc space-y-3 pl-5 text-sm leading-6 text-gray-600">{item.points.map(point => <li key={point}>{point}</li>)}</ul>
                <a href={item.link.href} {...(item.link.href.startsWith("https:") ? { target: "_blank", rel: "noreferrer" } : {})} className={`${textLinkStyle} mt-auto`}>{item.link.title}<ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />{item.link.href.startsWith("https:") && <span className="sr-only"> (opens in a new tab)</span>}</a>
              </details>)}
            </div>
            <p className="mt-5 text-xs leading-5 text-gray-500">Official preparation and road-planning links checked 9 November 2026. Follow their current advice before travel; this page does not provide live conditions.</p>
          </div>
        </section>

        <section id="your-pace" aria-labelledby="pace-heading" className="scroll-mt-24 bg-stone-50/70 py-12 sm:py-16">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
            <div><h2 id="pace-heading" className="text-3xl font-medium tracking-tight">A trip that leaves room for you.</h2><p className="mt-5 text-lg leading-relaxed text-gray-600">An early birding outing can lead into a lakeside afternoon, a gallery, a long lunch or a comfortable place to stay. Active days and quieter days can belong in the same journey.</p><p className="mt-4 leading-7 text-gray-600">Tell us your interests, walking comfort, dates and preferred pace. We’ll use your private brief to begin a personal planning conversation, with routes, hosts, access and arrangements checked separately.</p></div>
            <div className="rounded-2xl border border-emerald-200 bg-white p-6 sm:p-7">
              <h3 className="text-xl font-medium text-emerald-950">Start with three choices</h3>
              <ul className="mt-4 list-disc space-y-3 pl-5 leading-7 text-gray-600"><li>The birds or habitats you would most like to explore.</li><li>How often you want a birding morning, and how much driving feels right.</li><li>The comfort, food, culture and other experiences that make a trip yours.</li></ul>
              <Link href={southIslandBriefHref} className={`${buttonStyle} mt-6 bg-emerald-700 text-white hover:bg-emerald-800`}>Start your private South Island brief<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              <p className="mt-3 text-xs leading-5 text-gray-500">Save privately in My Trips. Sharing with AVES is a separate choice; no booking is confirmed.</p>
            </div>
          </div>
        </section>

        {/* External players load only on request inside the shared resource viewer. */}
        <section id="resources" aria-labelledby="resources-heading" className="scroll-mt-24 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-emerald-700">Let your curiosity travel first</p>
            <h2 id="resources-heading" className="text-3xl font-medium tracking-tight sm:text-4xl">Listen, watch and read.</h2>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-600">A small collection to bring the birds and landscapes into focus, from Fiordland’s fieldwork stories to a closer look at the kea.</p>
            <SouthIslandResourceCarousel />
            <details className="mt-6 rounded-2xl border border-emerald-100 bg-white p-5 sm:p-6">
              <summary className="min-h-11 cursor-pointer py-2 font-medium text-emerald-900">Field guides to buy online</summary>
              <div className="mt-4 grid gap-6 md:grid-cols-2">{southIslandFieldGuides.map(guide => <article key={guide.href}>
                <h3 className="text-lg font-medium text-emerald-950">{guide.title}</h3>
                <p className="mt-2 text-xs leading-5 text-gray-500">{guide.author}</p>
                <p className="mt-3 text-sm leading-6 text-gray-600">{guide.note}</p>
                <a href={guide.href} target="_blank" rel="noreferrer" className={textLinkStyle}>{guide.action} · {guide.publisher}<ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
              </article>)}</div>
              <p className="mt-4 text-xs leading-5 text-gray-500">Independent purchase links, with no AVES affiliate tracking. Prices, stock and delivery are set by the seller. These books cover New Zealand more broadly than the South Island; check the edition and range notes alongside current bird references.</p>
            </details>
            <p className="mt-5 text-xs leading-5 text-gray-500">Publisher sources checked 9 November 2026. Podcasts stream from DOC’s public feed; videos play through YouTube after you load them. Availability is controlled by the publishers. Conservation stories and offshore footage do not describe current trip access.</p>
          </div>
        </section>

        <section id="travel-with-care" aria-labelledby="care-heading" className="scroll-mt-24 py-12 sm:py-16">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
            <div><Heart className="mb-4 h-6 w-6 text-emerald-700" aria-hidden="true" /><h2 id="care-heading" className="text-3xl font-medium tracking-tight">Respect for people and wildlife.</h2><p className="mt-5 leading-7 text-gray-600">We recognise Māori as tangata whenua and respect the relationships of mana whenua with their lands and waters. Seek out cultural experiences led by people sharing their own stories, with their consent and on their terms.</p><p className="mt-4 leading-7 text-gray-600">Listen to calls here to learn the birds. In the field, give birds and nests space, never feed wildlife and avoid using recordings to draw birds closer.</p></div>
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-6 sm:p-7"><h3 className="text-xl font-medium text-emerald-950">Check the place before the day.</h3><p className="mt-4 leading-7 text-gray-600">Mountain conditions can change quickly. Check DOC’s current track, access and visitor guidance before an outing, and choose walks that suit the group. At coastal wildlife sites, follow designated viewing arrangements and leave landing and nesting areas clear.</p><p className="mt-4 leading-7 text-gray-600">Follow local biosecurity instructions when moving between forests, waterways and islands. Rakiura is a separate island extension; explore it through the New Zealand overview.</p><div className="mt-4 flex flex-wrap gap-x-5 gap-y-1"><Link href="/new-zealand#travel-with-care" className={textLinkStyle}>New Zealand travel guidance<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link><Link href="/credits" className={textLinkStyle}>Photo & audio credits<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div></div>
          </div>
        </section>

        <section className="pb-14 sm:pb-20" aria-labelledby="journey-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="rounded-3xl bg-emerald-900 p-7 text-white sm:p-10">
            <h2 id="journey-heading" className="text-3xl font-medium tracking-tight">Make the South Island your own.</h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-emerald-50">Bring your ideas, a few favourite birds and the pace you enjoy. We’ll start with the possibilities that fit together.</p>
            <div className="mt-6 flex flex-wrap gap-3"><Link href={southIslandBriefHref} className={`${buttonStyle} bg-white text-emerald-900 hover:bg-emerald-50 focus-visible:outline-white`}>Plan privately in My Trips<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link><a href={newZealandContactHref} className={`${buttonStyle} border border-emerald-300 text-white hover:bg-emerald-800 focus-visible:outline-white`}>Discuss your ideas<ArrowRight className="h-4 w-4" aria-hidden="true" /></a></div>
            <p className="mt-4 text-sm leading-6 text-emerald-100">Routes, guides, dates, prices and reservations require separate confirmation.</p>
          </div></div>
        </section>
      </main></SouthIslandHabitatProvider>
      <GlobalFooter country="new-zealand" />
    </div>
  )
}
