/**
 * Shared template for Colombia region pages. The route supplies one region record;
 * this component joins its bird IDs to the bird catalogue and renders the carousel,
 * local occurrence notes, sources and trip-request links. Edit content/regions for facts.
 */
import Image from "next/image"
import BirdsBrandWord from "@/components/birds-brand-word"
import Link from "next/link"
import { ArrowRight, MapPin } from "lucide-react"
import { PageShell } from "@/components/page-shell"
import HomepageBirdCarousel from "@/components/homepage-bird-carousel"
import { regions } from "@/content/regions"
import { colombiaRegionBirds } from "@/content/colombia-regional-birds"
import { sharedAccountHref } from "@/lib/shared-account"

export function ColombiaRegionPage({ region }: { region: (typeof regions)[number] }) {
  // Add this region-specific occurrence without mutating the shared catalogue record.
  const birds = colombiaRegionBirds(region.id)
  // A Map keyed by URL removes repeated citations while retaining their source labels.
  const sources = [...new Map(region.birds.flatMap(b => b.sources || []).map(source => [source.url, source])).values()]
  return <PageShell path={`/regions/${region.id}`} title={`Birding in ${region.name}`} description={region.description} eyebrow="Colombian regions" media={<HomepageBirdCarousel key={region.id} birds={birds} autoPlay={false} fillPanel className="w-full max-w-none" />}>
    <section className="py-8 lg:py-14"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-8"><Link href="/colombia" className="underline underline-offset-4">Colombia</Link><span aria-hidden="true">/</span><Link href="/aves-explorer" className="underline underline-offset-4">Regions</Link><span aria-hidden="true">/</span><span aria-current="page">{region.name}</span></nav>
      <div className="mx-auto max-w-4xl">
        <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-6 sm:p-9"><MapPin className="text-emerald-700 h-8 w-8" aria-hidden="true" /><h2 aria-label="Start with the birds. Shape your own journey." className="mt-5 text-2xl font-bold text-gray-900">Start with the <BirdsBrandWord />. Shape your own journey.</h2><p className="mt-4 text-gray-600 leading-relaxed">Explore a few of the birds associated with this region, with local places to look and wider range notes. These are ideas for your itinerary; wildlife sightings are always shaped by habitat, weather and season.</p><p className="mt-4 text-gray-600 leading-relaxed">Tell us your target species, travel dates and preferred pace. We will help connect the places that fit, then confirm guiding, access, transport and accommodation in a personal proposal.</p><Link href={`/contact?region=${region.id}`} className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-700 px-5 py-3 text-white font-semibold hover:bg-emerald-800">Discuss your trip<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link><a href={sharedAccountHref(region.id)} className="mt-3 flex min-h-11 items-center text-sm font-semibold text-emerald-800 underline underline-offset-4">Save your trip idea in My Trips</a><p className="mt-3 text-sm text-gray-600">Availability and pricing confirmed personally.</p></div>
      </div>
    </div></section>
    <section className="py-14 lg:py-20 bg-gradient-to-br from-blue-50 to-emerald-50" aria-labelledby="regional-bird-places">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="regional-bird-places" className="text-2xl sm:text-3xl font-bold text-gray-900">Where to look</h2>
        {/* Shared regional context appears once; the carousel retains each complete species profile. */}
        {region.sharedBirdRange && <p className="mt-4 max-w-3xl text-gray-700 leading-relaxed">{region.sharedBirdRange.text}</p>}
        <div className="mt-8 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {birds.map(bird => <article key={bird.id} className="rounded-2xl overflow-hidden bg-white shadow-sm">
            <div className="relative aspect-[4/3]">
              <Image src={bird.image} alt={bird.commonName} fill sizes="(max-width:767px) 100vw, (max-width:1279px) 50vw, 33vw" className="object-cover" style={{ objectPosition: bird.imagePosition || "center" }} />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900">{bird.commonName}</h3>
              <p className="text-sm italic text-gray-500 mt-1">{bird.scientificName}</p>
              <p className="mt-4 text-gray-700 leading-relaxed">{region.sharedBirdRange?.birdIds.includes(bird.id) ? null : <span className="font-semibold">In this region: </span>}{bird.localOccurrence}</p>
              {/* Hide only ranges explicitly covered above; new birds and other regions retain theirs. */}
              {!region.sharedBirdRange?.birdIds.includes(bird.id) && <p className="mt-3 text-sm text-gray-600 leading-relaxed"><span className="font-semibold">Wider range: </span>{bird.distribution}</p>}
            </div>
          </article>)}
        </div>
      </div>
    </section>
    <section className="py-14 lg:py-20"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10"><div><h2 className="text-2xl font-bold text-gray-900">Plan around the landscape</h2><ul className="mt-5 list-disc pl-5 space-y-4 text-gray-600 leading-relaxed"><li>Share your dates, birding experience and any particular birds you hope to see.</li><li>Let us know your walking comfort, accessibility needs and photography interests.</li><li>Access to reserves, local guiding, seasonal conditions and any permits need confirmation before travel.</li><li>Keep a respectful distance from wildlife and nests; listen to recordings here for learning, rather than attracting birds in the field.</li></ul></div><div><h2 className="text-2xl font-bold text-gray-900">Sources for the bird notes</h2><ul className="mt-5 space-y-3 text-sm">{sources.map(source => <li key={source.url}><a href={source.url} className="text-emerald-800 underline underline-offset-4">{source.title}</a></li>)}</ul><Link href="/credits" className="mt-5 inline-flex py-2 text-sm text-emerald-800 underline underline-offset-4">Photography and recording credits</Link></div></div></section>
    <section className="pb-16"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="rounded-2xl bg-emerald-800 p-7 sm:p-10 text-white"><h2 className="text-2xl sm:text-3xl font-bold">Where would you like to go next?</h2><div className="mt-6 flex flex-wrap gap-3">{regions.filter(item => item.id !== region.id).map(item => <Link key={item.id} href={`/regions/${item.id}`} className="rounded-full border border-emerald-400/60 px-4 py-3 text-sm hover:bg-emerald-700">{item.name}</Link>)}</div></div></div></section>
  </PageShell>
}
