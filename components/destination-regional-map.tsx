/**
 * Connected homepage map: selection filters the birds and retains regional zoom.
 * Feather cues and the sage palette match the destination cards.
 * Geometry, artwork and marker positions come from the existing reviewed maps.
 */
import MapFeatherMarker from "./map-feather-marker"
import type { ReactNode } from "react"
import { colombiaMapMarkers } from "@/content/colombia-map-markers"
import { australiaMapStates, australiaMapViewBox } from "@/content/global-australian-map"
import nz from "@/content/new-zealand-map.json"
import ColombiaMapArtwork from "@/components/colombia-map-artwork"
import styles from "./homepage-destination-explorer.module.css"
import { mapZoomTransform } from "@/lib/map-zoom"
import { newZealandRegionHref } from "@/lib/new-zealand-region-links"

type Props = {
  country: string
  selectedRegionId?: string
  highlightedRegionIds?: readonly string[]
  onSelectRegion?: (id: string) => void
}

export default function DestinationRegionalMap({ country, selectedRegionId, highlightedRegionIds = [], onSelectRegion }: Props) {
  const highlighted = (id: string) => selectedRegionId ? selectedRegionId === id : highlightedRegionIds.includes(id)
  const zoomTransform = country === "australia"
    ? mapZoomTransform(australiaMapViewBox, australiaMapStates.filter(state => state.regionId === selectedRegionId).map(state => state.path))
    : mapZoomTransform(nz.viewBox, nz.islands.find(island => island.id === selectedRegionId)?.paths ?? [])
  // Keep the feather readable without enlarging it along with a tiny territory.
  const markerSize = 48 / Number(zoomTransform.match(/scale\(([^)]+)/)?.[1] || 1)


  // SVG buttons need explicit Enter/Space handling; full-size text controls in
  // the explorer provide an equivalent choice for small or clustered shapes.
  const control = (id: string, name: string, href: string, children: ReactNode) => onSelectRegion ? (
    <g key={id} role="button" tabIndex={selectedRegionId && id !== selectedRegionId ? -1 : 0} aria-hidden={selectedRegionId && id !== selectedRegionId ? true : undefined} aria-label={`Preview ${name} birds`} aria-pressed={highlighted(id)}
      className={styles.regionControl} onClick={() => onSelectRegion(id)}
      style={selectedRegionId && id !== selectedRegionId ? { pointerEvents: "none" } : undefined}
      onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onSelectRegion(id) } }}>
      {children}
    </g>
  ) : <a key={id} href={href} aria-label={`Explore ${name}`} className={styles.regionControl}>{children}</a>

  if (country === "colombia") return (
    <div className="h-full w-full overflow-hidden" style={{ containerType: "size" }}>
    <div className="relative top-1/2 mx-auto aspect-[198/250] -translate-y-1/2" style={{ width: "min(100cqw, calc(100cqh * 198 / 250))" }} role="group" aria-label="Colombia planning-region map">
      <div className={`absolute inset-0 ${styles.pointZoom}`} style={selectedRegionId ? { transform: `scale(2.4) translate(${50 - (colombiaMapMarkers.find(region => region.slug === selectedRegionId)?.x ?? 50)}%, ${50 - (colombiaMapMarkers.find(region => region.slug === selectedRegionId)?.y ?? 50)}%)` } : undefined}>
      <ColombiaMapArtwork flat alt="" fill sizes="(max-width: 703px) 90vw, 560px" className="object-contain" />
      {colombiaMapMarkers.map(region => {
        const selected = highlighted(region.slug)
        const className = `absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-emerald-800/40 text-[10px] font-semibold hover:z-10 hover:bg-emerald-800 hover:text-white focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-950 ${selected ? "z-10 border-transparent" : "bg-white text-emerald-950"}`
        const props = { style: { left: `${region.x}%`, top: `${region.y}%`, ...(selectedRegionId && !selected ? { pointerEvents: "none" as const, opacity: 0 } : {}) }, className, title: region.name, tabIndex: selectedRegionId && !selected ? -1 : undefined, "aria-hidden": selectedRegionId && !selected ? true as const : undefined }
        return onSelectRegion ? <button key={region.slug} type="button" {...props} aria-label={`Preview ${region.name} birds`} aria-pressed={selected} onClick={() => onSelectRegion(region.slug)}>{selected ? <MapFeatherMarker size={28}/> : <span aria-hidden="true" className="h-2 w-2 rounded-full bg-emerald-700"/>}</button>
          : <a key={region.slug} {...props} href={`/regions/${region.slug}`} aria-label={`Explore ${region.name}`}>{selected ? <MapFeatherMarker size={28}/> : <span aria-hidden="true" className="h-2 w-2 rounded-full bg-emerald-700"/>}</a>
      })}
      </div>
    </div>
    </div>
  )
  if (country === "australia") return (
    <svg viewBox={australiaMapViewBox} role="group" aria-label="Australian states and territories" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
      <g className={styles.mapZoom} style={{ transform: zoomTransform }}>
      {australiaMapStates.filter(state => state.regionId).map(state => control(state.regionId!, state.name, `/australia/regions/${state.regionId}`, <>
        <path d={state.path} className={styles.regionLand} fill="#c5dbd0" stroke="#6e9582" strokeWidth="1" fillRule="evenodd" />
        {highlighted(state.regionId!) && <svg x={state.label[0]-markerSize/2} y={state.label[1]-markerSize/2} width={markerSize} height={markerSize} overflow="visible"><MapFeatherMarker size={markerSize}/></svg>}
      </>))}
      </g>
    </svg>
  )
  if (country === "new-zealand") return (
    <svg viewBox={nz.viewBox} role="group" aria-label="New Zealand main islands" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
      <g className={styles.mapZoom} style={{ transform: zoomTransform }}>
      {nz.islands.map((island, index) => {
        const point = [[389,184], [235,419], [135,572]][index]
        return control(island.id, island.label, newZealandRegionHref(island.id), <>
          <g className={styles.regionLand} fill="#c5dbd0" stroke="#6e9582">{island.paths.map((path, i) => <path key={i} d={path} strokeWidth="1.2" fillRule="evenodd" />)}</g>
          {highlighted(island.id) && <svg x={point[0]-markerSize/2} y={point[1]-markerSize/2} width={markerSize} height={markerSize} overflow="visible"><MapFeatherMarker size={markerSize}/></svg>}
        </>)
      })}
      </g>
    </svg>
  )
  return null
}
