import { australiaMetadata } from "@/features/australia/lib/metadata"
/*
 * Public species directory: the same bird catalogue powers both the featured carousel and
 * the detailed cards below it. Edit content/birds.ts for species facts, media, sources and credits.
 */
import type { Metadata } from "next"
import Image from "next/image"
import { SiteLink as Link } from "@/features/australia/components/site-link"
import { MapPin, ArrowRight } from "lucide-react"
import { PageShell } from "@/features/australia/components/page-shell"
import HomepageBirdCarousel from "@/features/australia/components/homepage-bird-carousel"
import { birdData } from "@/features/australia/content/birds"
import { canonicalUrl, sitePath } from "@/features/australia/lib/site-path"

export const metadata: Metadata = australiaMetadata({ title: "Australian Birdlife & Where to Find It", description: "Explore a selection of Australian birds through real photographs, recordings and clear habitat and distribution notes. Find inspiration for a personal birding trip.", alternates: { canonical: canonicalUrl("/species") } })

// Species facts are rendered from the catalogue; this page adds navigation and the educational framing.
export default function SpeciesPage() {
  return <PageShell path="/species" title="Discover Australia's Birdlife" description="A selection of birds, many different worlds. Browse their photographs, listen to available recordings and discover where each species can be found." media={<><HomepageBirdCarousel autoPlay={false} showBirdPicker className="w-full" /><p className="mt-4 text-sm leading-relaxed text-gray-600">A selection from Australia’s <a href="https://birdlife.org.au/about/" target="_blank" rel="noreferrer" className="text-emerald-800 underline underline-offset-4">800+ bird species<span className="sr-only"> (source: BirdLife Australia; opens in a new tab)</span></a>. Sightings depend on route, habitat and season. Keep recordings for learning, not attracting birds in the field.</p></>}>
    <section className="py-14 lg:py-20" aria-labelledby="bird-directory-heading"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2 id="bird-directory-heading" className="text-3xl font-bold text-gray-900">Birds and the places they call home</h2>
      <p className="mt-4 max-w-3xl leading-relaxed text-gray-600">A closer look at each species, with links to the sources behind its range and habitat notes.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">{birdData.map(bird => <article key={bird.id} id={bird.id} className="scroll-mt-24 overflow-hidden rounded-xl border border-emerald-100 bg-white shadow-md">
        <div className="relative aspect-[4/3]"><Image src={sitePath(bird.image)} alt={bird.commonName} fill sizes="(max-width:767px) 100vw, (max-width:1279px) 50vw, 33vw" className="object-cover" style={{ objectPosition: bird.imagePosition || "center center" }} /></div>
        <div className="p-6"><h3 className="text-xl font-bold text-gray-900">{bird.commonName}</h3><p className="mt-1 text-sm italic text-gray-500">{bird.scientificName}</p>
          <h4 className="mt-5 flex items-center gap-2 text-sm font-semibold text-emerald-800"><MapPin className="h-4 w-4" aria-hidden="true" />Where to find it</h4><p className="mt-2 text-sm leading-relaxed text-gray-600">{bird.distribution}</p>
          <h4 className="mt-4 text-sm font-semibold text-gray-900">Habitat</h4><p className="mt-2 text-sm leading-relaxed text-gray-600">{bird.habitat}</p>
          <ul className="mt-4 space-y-2 text-xs text-emerald-800">{bird.sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer" className="underline underline-offset-4">{source.title}<span className="sr-only"> (opens in a new tab)</span></a></li>)}</ul>
          <Link href={`/contact?region=${bird.regionSlug}`} className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-emerald-700">Plan a birding trip<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
      </article>)}</div>
      <p className="mt-8 text-sm text-gray-600"><Link href="/credits" className="text-emerald-800 underline underline-offset-4">Photography and recording credits</Link></p>
    </div></section>
  </PageShell>
}
