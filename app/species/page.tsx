/**
 * Colombia bird directory. Both the hero carousel and the species cards read
 * content/birds, keeping names, photos, range notes and source links together.
 * Each card links to a region-prefilled inquiry rather than an instant booking.
 */
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { MapPin, ArrowRight } from "lucide-react"
import { PageShell } from "@/components/page-shell"
import HomepageBirdCarousel from "@/components/homepage-bird-carousel"
import { birdData } from "@/content/birds"
import { canonicalUrl, sitePath } from "@/lib/site-path"

export const metadata: Metadata = { title: "Colombian Birdlife & Where to Find It", description: "Explore a selection of Colombian birds through real photographs, recordings and clear habitat and distribution notes. Find inspiration for a personal birding trip.", alternates: { canonical: canonicalUrl("/species") } }

export default function SpeciesPage() {
  return <PageShell path="/species" title="Discover Colombia's Birdlife" description="A selection of birds, many different worlds. Browse their photographs, listen to available recordings and discover where each species can be found." media={<HomepageBirdCarousel autoPlay={false} className="max-w-xl" showBirdPicker />}>
    <section className="bg-gradient-to-br from-blue-50 to-emerald-50 py-12 lg:py-16"><div className="mx-auto max-w-3xl px-4"><h2 className="mb-5 text-center text-xl font-semibold text-emerald-900">A glimpse of Colombia’s <a href="https://colombia.travel/en/birdwatching" target="_blank" rel="noreferrer" className="underline underline-offset-4">1,900+ bird species<span className="sr-only"> (source: Colombia Travel; opens in a new tab)</span></a></h2><p className="mt-6 text-center text-sm leading-relaxed text-gray-600">This is a selection, not a complete checklist. Sightings depend on your route, habitat and season. Photo and recording locations may differ. Give birds space and keep recordings for learning, not attracting birds in the field.</p></div></section>
    <section className="py-14 lg:py-20" aria-labelledby="bird-directory-heading"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2 id="bird-directory-heading" className="text-3xl font-bold text-gray-900">Birds and the places they call home</h2>
      <p className="mt-4 max-w-3xl leading-relaxed text-gray-600">A closer look at each species, with links to the sources behind its range and habitat notes.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">{birdData.map(bird => <article key={bird.id} id={bird.id} className="scroll-mt-24 overflow-hidden rounded-xl border border-emerald-100 bg-white shadow-md">
        <div className="relative aspect-[4/3]"><Image src={sitePath(bird.image)} alt={bird.commonName} fill sizes="(max-width:767px) 100vw, (max-width:1279px) 50vw, 33vw" className="object-cover" style={{ objectPosition: bird.imagePosition || "center center" }} /></div>
        <div className="p-6"><h3 className="text-xl font-bold text-gray-900">{bird.commonName}</h3><p className="mt-1 text-sm italic text-gray-500">{bird.scientificName}</p>
          <h4 className="mt-5 flex items-center gap-2 text-sm font-semibold text-emerald-800"><MapPin className="h-4 w-4" aria-hidden="true" />Where to find it</h4><p className="mt-2 text-sm leading-relaxed text-gray-600">{bird.distribution}</p>
          <h4 className="mt-4 text-sm font-semibold text-gray-900">Habitat</h4><p className="mt-2 text-sm leading-relaxed text-gray-600">{bird.habitat}</p>
          <ul className="mt-4 space-y-2 text-xs text-emerald-800">{bird.sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer" className="underline underline-offset-4">{source.title}<span className="sr-only"> (opens in a new tab)</span></a></li>)}</ul>
          <Link href={`/contact?region=${bird.regionSlug}`} className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-emerald-700">Plan your birding trip<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
      </article>)}</div>
      <p className="mt-8 text-sm text-gray-600"><Link href="/credits" className="text-emerald-800 underline underline-offset-4">Photography and recording credits</Link></p>
    </div></section>
  </PageShell>
}
