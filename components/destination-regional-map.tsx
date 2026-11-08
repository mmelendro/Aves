/**
 * One regional-map renderer serves the homepage zoom and the country cards.
 * Cards keep normal links; the explorer supplies a selection callback instead.
 * Geometry, artwork and marker positions come from the existing reviewed maps.
 */
import type { ReactNode } from "react"
import { colombiaMapMarkers } from "@/content/colombia-map-markers"
import { australiaMapStates, australiaMapViewBox } from "@/content/global-australian-map"
import nz from "@/content/new-zealand-map.json"
import ColombiaMapArtwork from "@/components/colombia-map-artwork"
import styles from "./homepage-destination-explorer.module.css"

const australianCallouts = [
  { id: "australian-capital-territory", name: "Australian Capital Territory", label: "ACT", x: 620, y: 493, line: "573.81,460.3 608,514 620,514" },
  { id: "jervis-bay-territory", name: "Jervis Bay Territory", label: "Jervis Bay", x: 620, y: 427, line: "597.38,458.06 608,448 620,448" },
]
const nzLabels = [
  { x: 432, y: 107, width: 142, line: "M389,184L413,122" },
  { x: 355, y: 446, width: 142, line: "M235,419L278,446" },
  { x: 318, y: 578, width: 190, line: "M135,572L197,578" },
]

type Props = {
  country: string
  selectedRegionId?: string
  highlightedRegionIds?: readonly string[]
  onSelectRegion?: (id: string) => void
}

export default function DestinationRegionalMap({ country, selectedRegionId, highlightedRegionIds = [], onSelectRegion }: Props) {
  const highlighted = (id: string) => selectedRegionId ? selectedRegionId === id : highlightedRegionIds.includes(id)

  // SVG buttons need explicit Enter/Space handling; full-size text controls in
  // the explorer provide an equivalent choice for small or clustered shapes.
  const control = (id: string, name: string, href: string, children: ReactNode) => onSelectRegion ? (
    <g key={id} role="button" tabIndex={0} aria-label={`Preview ${name} birds`} aria-pressed={highlighted(id)}
      className={styles.regionControl} onClick={() => onSelectRegion(id)}
      onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onSelectRegion(id) } }}>
      {children}
    </g>
  ) : <a key={id} href={href} aria-label={`Explore ${name}`} className={styles.regionControl}>{children}</a>

  if (country === "colombia") return (
    <div className="h-full w-full" style={{ containerType: "size" }}>
    <div className="relative top-1/2 mx-auto aspect-[198/250] -translate-y-1/2" style={{ width: "min(100cqw, calc(100cqh * 198 / 250))" }} role="group" aria-label="Colombia planning-region map">
      <ColombiaMapArtwork alt="" fill sizes="(max-width: 703px) 90vw, 560px" className="object-contain" />
      {colombiaMapMarkers.map((region, index) => {
        const selected = highlighted(region.slug)
        const className = `absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-emerald-800/40 text-[10px] font-semibold hover:z-10 hover:bg-emerald-800 hover:text-white focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-950 ${selected ? "z-10 bg-emerald-950 text-white ring-2 ring-emerald-600 ring-offset-2" : "bg-white text-emerald-950"}`
        const props = { style: { left: `${region.x}%`, top: `${region.y}%` }, className, title: region.name }
        return onSelectRegion ? <button key={region.slug} type="button" {...props} aria-label={`Preview ${region.name} birds`} aria-pressed={selected} onClick={() => onSelectRegion(region.slug)}><span aria-hidden="true">{index + 1}</span></button>
          : <a key={region.slug} {...props} href={`/regions/${region.slug}`} aria-label={`Explore ${region.name}`}><span aria-hidden="true">{index + 1}</span></a>
      })}
    </div>
    </div>
  )
  if (country === "australia") return (
    <svg viewBox={australiaMapViewBox} role="group" aria-label="Australian states and territories" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
      {australiaMapStates.filter(state => state.regionId).map(state => control(state.regionId!, state.name, `/australia/regions/${state.regionId}`, <>
        <path d={state.path} className={styles.regionLand} fill="#c5dbd0" stroke="#6e9582" strokeWidth="1" fillRule="evenodd" />
        {state.shortName && <text x={state.label[0]} y={state.label[1]} textAnchor="middle" dominantBaseline="middle" fontSize="26" fill="#064e3b" className={styles.regionText}>{state.shortName}</text>}
      </>))}
      {australianCallouts.map(callout => control(callout.id, callout.name, `/australia/regions/${callout.id}`, <>
        <polyline points={callout.line} fill="none" stroke="#047857" strokeWidth="1.5" />
        <rect x={callout.x} y={callout.y} width="94" height="42" rx="9" fill="white" stroke="#6e9582" className={styles.regionLand} />
        <text x={callout.x + 47} y={callout.y + 23} fontSize="17" textAnchor="middle" fill="#064e3b" className={styles.regionText}>{callout.label}</text>
      </>))}
    </svg>
  )
  if (country === "new-zealand") return (
    <svg viewBox={nz.viewBox} role="group" aria-label="New Zealand main islands" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
      {nz.islands.map((island, index) => {
        const label = nzLabels[index]
        return control(island.id, island.label, `/new-zealand#region-${island.id}`, <>
          <g className={styles.regionLand} fill="#c5dbd0" stroke="#6e9582">{island.paths.map((path, i) => <path key={i} d={path} strokeWidth="1.2" fillRule="evenodd" />)}</g>
          <path d={label.line} fill="none" stroke="#047857" strokeWidth="1.5" />
          <rect x={label.x - label.width / 2} y={label.y - 24} width={label.width} height="48" rx="16" fill="white" stroke="#6e9582" className={styles.regionLabel} />
          <text x={label.x} y={label.y + 6} fontSize="19" textAnchor="middle" fill="#064e3b" className={styles.regionText}>{island.id === "rakiura" ? "Rakiura" : island.label}</text>
        </>)
      })}
    </svg>
  )
  return null
}
