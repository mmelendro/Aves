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
import { australiaMapStates, australiaMapViewBox, australiaMapProvenance } from "@/content/global-australian-map"
import nz from "@/content/new-zealand-map.json"
import ColombiaMapArtwork from "@/components/colombia-map-artwork"

const regionLinkClass = "group rounded outline-none focus-visible:ring-2 focus-visible:ring-emerald-800"
// A future destination needs its own regional geometry before it gets a map card.
const regionalMapCountries = new Set(["colombia", "australia", "new-zealand"])
const australianCallouts = [
  { id: "australian-capital-territory", label: "ACT", x: 620, y: 493, line: "573.81,460.3 608,514 620,514" },
  { id: "jervis-bay-territory", label: "Jervis Bay", x: 620, y: 427, line: "597.38,458.06 608,448 620,448" },
]
const nzLabels = [
  { x: 432, y: 107, width: 142, line: "M389,184L413,122" },
  { x: 355, y: 446, width: 142, line: "M235,419L278,446" },
  { x: 318, y: 578, width: 190, line: "M135,572L197,578" },
]

function CountryMap({ country }: { country: string }) {
  if (country === "colombia") return (
    <div className="relative mx-auto aspect-[198/250] h-full max-w-full" role="group" aria-label="Colombia planning-region map">
      <ColombiaMapArtwork alt="" fill sizes="300px" className="object-contain" />
      {colombiaMapMarkers.map((region, index) => <a key={region.slug} href={`/regions/${region.slug}`} aria-label={`Explore ${region.name}`} title={region.name}
        style={{ left: `${region.x}%`, top: `${region.y}%` }} className="absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-emerald-800/40 bg-white text-[10px] font-semibold text-emerald-950 hover:z-10 hover:bg-emerald-800 hover:text-white focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-950">
        <span aria-hidden="true">{index + 1}</span>
      </a>)}
    </div>
  )
  if (country === "australia") return (
    <svg viewBox={australiaMapViewBox} role="group" aria-label="Australian states and territories" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
      {australiaMapStates.map(state => <a key={state.code} href={`/australia/regions/${state.regionId}`} aria-label={`Explore ${state.name}`} className={regionLinkClass}>
        <path d={state.path} fill="#c5dbd0" stroke="#6e9582" strokeWidth="1" fillRule="evenodd" className="group-hover:fill-emerald-700 group-focus:fill-emerald-700 group-focus:stroke-[3]" />
        {state.shortName && <text x={state.label[0]} y={state.label[1]} textAnchor="middle" dominantBaseline="middle" fontSize="26" fill="#064e3b" className="pointer-events-none group-hover:fill-white group-focus:fill-white">{state.shortName}</text>}
      </a>)}
      {australianCallouts.map(callout => <a key={callout.id} href={`/australia/regions/${callout.id}`} aria-label={`Explore ${callout.label}`} className={regionLinkClass}>
        <polyline points={callout.line} fill="none" stroke="#047857" strokeWidth="1.5" />
        <rect x={callout.x} y={callout.y} width="94" height="42" rx="9" fill="white" stroke="#6e9582" className="group-hover:fill-emerald-800 group-focus:fill-emerald-800 group-focus:stroke-[3]" />
        <text x={callout.x + 47} y={callout.y + 23} fontSize="17" textAnchor="middle" fill="#064e3b" className="group-hover:fill-white group-focus:fill-white">{callout.label}</text>
      </a>)}
    </svg>
  )
  if (country === "new-zealand") return (
    <svg viewBox={nz.viewBox} role="group" aria-label="New Zealand main islands" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
      {nz.islands.map((island, index) => {
        const label = nzLabels[index]
        return <a key={island.id} href={`/new-zealand#region-${island.id}`} aria-label={`Explore ${island.label}`} className={regionLinkClass}>
          <g fill="#c5dbd0" stroke="#6e9582" className="group-hover:fill-emerald-800 group-focus:fill-emerald-800 group-focus:stroke-[3]">{island.paths.map((path, i) => <path key={i} d={path} strokeWidth="1.2" fillRule="evenodd" />)}</g>
          <path d={label.line} fill="none" stroke="#047857" strokeWidth="1.5" />
          <rect x={label.x - label.width / 2} y={label.y - 24} width={label.width} height="48" rx="16" fill="white" stroke="#6e9582" className="group-focus:stroke-[3]" />
          <text x={label.x} y={label.y + 6} fontSize="19" textAnchor="middle" fill="#064e3b">{island.id === "rakiura" ? "Rakiura" : island.label}</text>
        </a>
      })}
    </svg>
  )
  return null
}

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
            <div className="h-80 px-4 py-4 lg:h-96"><CountryMap country={country.id} /></div>
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
