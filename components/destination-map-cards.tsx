/**
 * The country cards show regional maps instead of repeating the hero carousel.
 * Everything here is rendered on the server, with ordinary full-page links.
 * Colombia shares the exact artwork/marker positions used on its country page;
 * Australia is a public geometry snapshot of that separately deployed app.
 * NZ keeps the existing island-section links until island pages are available.
 */
import { ArrowRight } from "lucide-react"
import { destinations } from "@/content/destinations"
import { colombiaMapMarkers } from "@/content/colombia-map-markers"
import { australiaMapStates, australiaMapProvenance } from "@/content/global-australian-map"
import nz from "@/content/new-zealand-map.json"
import DestinationRegionalMap from "@/components/destination-regional-map"

// A future destination needs reviewed regional geometry before it gets a map card.
const regionalMapCountries = new Set(["colombia", "australia", "new-zealand"])

export default function DestinationMapCards() {
  return (
    <section aria-labelledby="regional-map-heading" className="mx-auto mt-14 max-w-6xl border-t border-emerald-100 pt-10">
      <h2 id="regional-map-heading" className="text-center text-2xl font-medium tracking-tight text-emerald-950">Find your place within each country</h2>
      <p className="mb-7 mt-3 text-center text-sm text-gray-600">Choose a region to explore its landscapes and birdlife.</p>
      <div className="grid items-start gap-6 md:grid-cols-3">
        {destinations.filter(country => regionalMapCountries.has(country.id)).map(country => {
          const links = country.id === "colombia" ? colombiaMapMarkers.map((region, i) => ({ name: `${i + 1}. ${region.name}`, href: `/regions/${region.slug}` }))
            : country.id === "australia" ? australiaMapStates.filter(state => state.regionId).map(state => ({ name: state.name, href: `/australia/regions/${state.regionId}` }))
            : nz.islands.map(island => ({ name: island.label, href: `/new-zealand#region-${island.id}` }))
          return <article key={country.id} aria-label={`${country.name} regional map`} className="overflow-hidden rounded-3xl border border-emerald-100 bg-white">
            <div className="flex flex-wrap items-center justify-between gap-2 px-5 pb-2 pt-5"><h3 className="text-xl font-medium text-emerald-950">{country.name}</h3>{country.status && <span className="text-xs text-amber-900">In development</span>}</div>
            <div className="h-80 px-4 py-4 lg:h-96"><DestinationRegionalMap country={country.id} /></div>
            <p className="px-5 text-[10px] leading-4 text-gray-500">{country.id === "colombia" ? "AVES planning regions · existing map artwork" : <><a className="underline" href={country.id === "australia" ? australiaMapProvenance.sourceUrl : nz.source.url}>Natural Earth</a> · Public domain · {country.id === "australia" ? "External territories not shown" : "Main islands shown"}</>}</p>
            <details className="mx-5 mt-3 border-t border-emerald-100">
              <summary className="flex min-h-11 cursor-pointer items-center text-sm font-medium text-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700">Browse all {links.length} {country.id === "new-zealand" ? "islands" : "regions"} +</summary>
              <ul className="pb-3">{links.map(link => <li key={link.href}><a href={link.href} className="flex min-h-11 items-center rounded px-2 py-2 text-sm text-emerald-900 underline-offset-2 hover:bg-emerald-50 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700">{link.name}</a></li>)}</ul>
            </details>
            <a href={country.href} className="mx-5 mb-5 mt-2 flex min-h-11 items-center justify-between gap-2 rounded-full border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700">Explore {country.name}<ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
          </article>
        })}
      </div>
    </section>
  )
}
