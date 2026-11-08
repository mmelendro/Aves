"use client"

/** Static, attributed land-cover overview, controlled by the existing explorer.
 * SVG geometry is generated offline from official LCDB data; the browser sends
 * no location/guest data to a map provider and needs no key or mapping SDK.
 */
import { useId } from "react"
import map from "@/content/south-island-ecosystem-map.json"
import { southIslandEcosystems, type SouthIslandEcosystemFilter, type SouthIslandEcosystem } from "@/content/south-island-ecosystems"
import styles from "./south-island-ecosystem-map.module.css"

const colours: Record<SouthIslandEcosystem, string> = { forest: "#537b5d", mountains: "#ae9761", freshwater: "#438eac", coast: "#008477" }

type Props = { selected: SouthIslandEcosystemFilter; onSelect: (id: SouthIslandEcosystemFilter) => void }

export default function SouthIslandEcosystemMap({ selected, onSelect }: Props) {
  const id = useId()
  return <section className={styles.card} aria-labelledby={`${id}-title`}>
    <div className="flex flex-wrap items-center justify-between gap-2">
      <h2 id={`${id}-title`} className="font-medium text-emerald-950">South Island habitats</h2>
      <button type="button" onClick={() => onSelect("all")} aria-pressed={selected === "all"} className="min-h-11 rounded px-2 text-xs font-semibold text-emerald-800 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700">All habitats</button>
    </div>
    <figure className={styles.figure}>
      <svg viewBox={map.viewBox} className={styles.map} role="group" aria-labelledby={`${id}-map-title ${id}-map-description`}>
        <title id={`${id}-map-title`}>South Island land cover and coastline</title>
        <desc id={`${id}-map-description`}>North-up Mercator overview. Select a coloured area or a labelled button below to filter the birds. Land cover is generalised from 2023/24 LCDB data, not current sightings or a complete ecosystem survey. Neutral areas are other or mixed cover. Coastline shows context only; offshore habitat is not mapped.</desc>
        <path d={map.outline} fill="#e7ede8" stroke="#829c8c" strokeWidth="1" vectorEffect="non-scaling-stroke" fillRule="evenodd" />
        {map.layers.map(layer => {
          const habitat = layer.id as SouthIslandEcosystem
          const name = southIslandEcosystems.find(item => item.id === habitat)!.name
          return <g key={habitat} role="button" tabIndex={0} aria-label={`Show ${name} birds on map`} aria-pressed={selected === habitat} className={styles.area} onClick={() => onSelect(habitat)} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onSelect(habitat) } }}>
            <title>{name}</title>
            <path d={layer.path} fill={colours[habitat]} opacity={selected === "all" || selected === habitat ? 1 : 0.18} fillRule="evenodd" />
          </g>
        })}
        {/* The real coastline is context, not a fabricated marine habitat polygon.
            Its generous hit stroke works with mouse/touch; the legend offers
            full-size keyboard/touch buttons for every small inland patch too. */}
        <g role="button" tabIndex={0} aria-label="Show Coasts & offshore waters birds on map" aria-pressed={selected === "coast"} className={styles.area} onClick={() => onSelect("coast")} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onSelect("coast") } }}>
          <title>Coasts & offshore waters — coastline context only</title>
          <path d={map.outline} fill="none" stroke={colours.coast} strokeWidth={selected === "coast" ? 4 : 1.5} strokeDasharray="4 3" opacity={selected === "all" || selected === "coast" ? 1 : 0.25} vectorEffect="non-scaling-stroke" />
          <path d={map.outline} fill="none" stroke="transparent" strokeWidth="10" vectorEffect="non-scaling-stroke" />
        </g>
        <g aria-hidden="true" fill="#065f46"><text x="38" y="55" textAnchor="middle" fontSize="15" fontWeight="600">N</text><path d="M38 64L32 82L38 78L44 82Z" /></g>
      </svg>
      <figcaption className="text-center text-[11px] leading-5 text-gray-600">Land cover · 2023/24 · Approx. 2 km overview</figcaption>
    </figure>
    <div aria-label="Habitat map legend" className="mt-2 grid grid-cols-1 gap-1 min-[390px]:grid-cols-2">
      {southIslandEcosystems.map(item => <button key={item.id} type="button" aria-label={`Filter birds: ${item.name}`} aria-pressed={selected === item.id} onClick={() => onSelect(item.id)} className={`flex min-h-11 items-center gap-2 rounded-lg border px-2 py-2 text-left text-xs leading-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${selected === item.id ? "border-emerald-700 bg-emerald-50 font-semibold text-emerald-950" : "border-emerald-100 bg-white text-emerald-900 hover:border-emerald-500"}`}><span aria-hidden="true" className="h-3 w-3 shrink-0 rounded-sm border border-black/10" style={{ backgroundColor: colours[item.id] }} />{item.name}</button>)}
    </div>
    <p className="mt-2 text-[11px] leading-5 text-gray-600">Colours group land-cover classes, not exact bird ranges. Tussock also occurs below alpine country. Coastline is context; offshore habitat is not mapped.</p>
    <details className={styles.sources}>
      <summary className="min-h-11 cursor-pointer content-center rounded text-xs font-medium text-emerald-800 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700">Map sources & limitations</summary>
      <div className="space-y-2 pb-2 text-xs leading-5 text-gray-600">
        <p><a href={map.source.url} target="_blank" rel="noreferrer" className="underline">Manaaki Whenua — LCDB v6.0</a> · <a href={map.source.licenceUrl} target="_blank" rel="noreferrer" className="underline">CC BY 3.0 NZ, WMS service</a>. Imagery: 2023/24; reviewed 9 November 2026. Generalised, grouped and recoloured by AVES.</p>
        <p>Forest/scrub: indigenous forest, broadleaved indigenous hardwoods, fernland, mānuka/kānuka and matagouri/grey scrub. Mountains/tussock: alpine vegetation, tall tussock and subalpine shrubland. Freshwater: mapped lakes, rivers and herbaceous freshwater vegetation. Other, small or mixed areas may remain neutral.</p>
        <p>Coastline: <a href={map.source.coastlineUrl} target="_blank" rel="noreferrer" className="underline">Natural Earth, public domain</a>. Main South Island only; nearby islands omitted. Simplified coastlines and land cover may not coincide precisely. Not for navigation or locating birds. Check local access, habitat and season.</p>
      </div>
    </details>
    <a href="/new-zealand#regions" className="mt-1 inline-flex min-h-11 items-center rounded text-xs font-semibold text-emerald-800 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700">Back to New Zealand</a>
  </section>
}
