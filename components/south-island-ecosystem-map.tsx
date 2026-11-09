"use client"

/** Attributed land-cover overview, controlled by the existing explorer.
 * SVG geometry is generated offline from official LCDB data; the browser sends
 * no location/guest data to a map provider and needs no key or mapping SDK.
 */
import dynamic from "next/dynamic"
import { useMapLayers } from "./map-layer-context"
import SouthIslandMapLayers from "./south-island-map-layers"
import satelliteSource from "@/content/south-island-satellite-source.json"
import catalogue from "@/content/south-island-layer-catalogue.json"
import { useEffect, useId, useRef, useState } from "react"
import { Hand, Minus, Plus, RotateCcw } from "lucide-react"
import map from "@/content/south-island-ecosystem-map.json"
import { southIslandEcosystems, type SouthIslandEcosystemFilter, type SouthIslandEcosystem } from "@/content/south-island-ecosystems"
import styles from "./south-island-ecosystem-map.module.css"
import { ecosystemMapPoint, ecosystemMapScale, focusEcosystemMapPoint, initialMapCamera, panMapCamera, zoomMapCamera, type MapCamera } from "@/lib/ecosystem-map-camera"

const ConservationOverlay = dynamic(() => import("./south-island-conservation-overlay"), { ssr: false })

const colours: Record<SouthIslandEcosystem, string> = { forest: "#537b5d", mountains: "#ae9761", freshwater: "#438eac", coast: "#008477" }

type MapPlace = { id: string; label: string; latitude: number; longitude: number; location: string; source: string }
type Props = { selected: SouthIslandEcosystemFilter; onSelect: (id: SouthIslandEcosystemFilter) => void; places?: readonly MapPlace[]; selectedPlace?: string; onSelectPlace?: (id: string) => void }

export default function SouthIslandEcosystemMap({ selected, onSelect, places, selectedPlace, onSelectPlace }: Props) {
  const { layers } = useMapLayers()
  const [satelliteFailed, setSatelliteFailed] = useState(false)
  const satellite = layers.background === "satellite" && !satelliteFailed
  const focusedPark = layers.nationalParks ? catalogue.parks.find(park => park.id === layers.park) : undefined
  const id = useId()
  const svgRef = useRef<SVGSVGElement>(null)
  const drag = useRef<{ pointer: number; clientX: number; clientY: number; camera: MapCamera; pixelsPerUnit: number } | null>(null)
  const [camera, setCamera] = useState(initialMapCamera)
  const [panMode, setPanMode] = useState(false)
  const [svgPixelsPerUnit, setSvgPixelsPerUnit] = useState(0)
  const place = places?.find(item => item.id === selectedPlace)
  const latitude = place?.latitude
  const longitude = place?.longitude
  // A place slide changes the camera target. Habitat filters, panel resize and
  // bird selection do not reset a visitor's chosen camera position.
  useEffect(() => {
    if (latitude === undefined || longitude === undefined) return
    setCamera(current => focusEcosystemMapPoint(current, ecosystemMapPoint(longitude, latitude, map.bbox)))
  }, [latitude, longitude])
  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    const observer = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect
      setSvgPixelsPerUnit(Math.min(width / 480, height / 640))
    })
    observer.observe(svg)
    return () => observer.disconnect()
  }, [])
  useEffect(() => {
    if (!focusedPark) return
    setCamera(current => focusEcosystemMapPoint(current, {x:focusedPark.point[0],y:focusedPark.point[1]}))
  }, [focusedPark])
  const scale = ecosystemMapScale(camera, map.bbox, svgPixelsPerUnit)
  function zoom(factor: number) { setCamera(current => zoomMapCamera(current, factor)) }
  function pan(dx: number, dy: number) { setCamera(current => panMapCamera(current, dx * 480 / current.zoom, dy * 640 / current.zoom)) }
  function reset() { drag.current = null; setCamera(initialMapCamera); setPanMode(false) }
  return <section className={styles.card} aria-labelledby={`${id}-title`}>
    <div className="flex flex-wrap items-center justify-between gap-2">
      <h2 id={`${id}-title`} className="font-medium text-emerald-950">South Island habitats</h2>
      <button type="button" onClick={() => onSelect("all")} aria-pressed={selected === "all"} className="min-h-11 rounded px-2 text-xs font-semibold text-emerald-800 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700">All habitats</button>
    </div>
    <div className={styles.controls} role="group" aria-label="Ecosystem map view controls">
      <button type="button" className={styles.control} title="Zoom in" aria-label="Zoom ecosystem map in" disabled={camera.zoom >= 4} onClick={() => zoom(1.5)}><Plus size={17} aria-hidden="true" /></button>
      <button type="button" className={styles.control} title="Zoom out" aria-label="Zoom ecosystem map out" disabled={camera.zoom <= 1} onClick={() => zoom(1 / 1.5)}><Minus size={17} aria-hidden="true" /></button>
      <button type="button" className={styles.control} title="Reset map view" aria-label="Reset ecosystem map view" onClick={reset}><RotateCcw size={16} aria-hidden="true" /></button>
      <button type="button" className={styles.control} title="Toggle drag to move map" aria-label="Move ecosystem map by dragging" aria-pressed={panMode && camera.zoom > 1} disabled={camera.zoom <= 1} onClick={() => setPanMode(value => !value)}><Hand size={17} aria-hidden="true" /></button>
      <span className="px-1 text-xs tabular-nums text-emerald-900" role="status">{camera.zoom.toFixed(1)}×</span>
    </div>
    <p id={`${id}-gestures`} className="mb-2 text-[11px] leading-5 text-gray-600">{panMode && camera.zoom > 1 ? "Move is on: drag to pan. Turn Move off to select habitats." : "Zoom, then use Move to drag. Focus the map for arrow-key panning; Home resets."}</p>
    <SouthIslandMapLayers />
    {satelliteFailed && layers.background === "satellite" && <p role="status" className="text-xs text-amber-900">Satellite image unavailable. The habitat map is shown instead.</p>}
    <figure className={styles.figure}>
      <svg ref={svgRef} viewBox={map.viewBox} className={styles.map} role="group" tabIndex={0} aria-describedby={`${id}-gestures`} aria-labelledby={`${id}-map-title ${id}-map-description`} style={{ touchAction: panMode && camera.zoom > 1 ? "none" : "auto", cursor: panMode && camera.zoom > 1 ? "grab" : undefined }}
        onKeyDown={event => {
          if (event.target !== event.currentTarget) return
          const moves: Record<string, [number, number]> = { ArrowLeft: [-.15, 0], ArrowRight: [.15, 0], ArrowUp: [0, -.15], ArrowDown: [0, .15] }
          if (moves[event.key]) { event.preventDefault(); pan(...moves[event.key]) }
          else if (["+", "=", "-", "Home"].includes(event.key)) { event.preventDefault(); if (event.key === "Home") reset(); else zoom(event.key === "-" ? 1 / 1.5 : 1.5) }
        }}
        onPointerDown={event => {
          if (!panMode || camera.zoom <= 1 || !event.isPrimary || event.button !== 0) return
          event.preventDefault()
          event.currentTarget.setPointerCapture(event.pointerId)
          drag.current = { pointer: event.pointerId, clientX: event.clientX, clientY: event.clientY, camera, pixelsPerUnit: svgPixelsPerUnit }
        }}
        onPointerMove={event => {
          const start = drag.current
          if (!start || event.pointerId !== start.pointer || !(start.pixelsPerUnit > 0)) return
          setCamera(panMapCamera(start.camera, -(event.clientX - start.clientX) / (start.pixelsPerUnit * start.camera.zoom), -(event.clientY - start.clientY) / (start.pixelsPerUnit * start.camera.zoom)))
        }}
        onPointerUp={event => { if (drag.current?.pointer === event.pointerId) { drag.current = null; event.currentTarget.releasePointerCapture(event.pointerId) } }}
        onPointerCancel={() => { drag.current = null }} onLostPointerCapture={() => { drag.current = null }}
        onClickCapture={event => { if (panMode && camera.zoom > 1) { event.preventDefault(); event.stopPropagation() } }}>
        <title id={`${id}-map-title`}>{satellite ? "South Island satellite overview and conservation layers" : "South Island land cover and coastline"}</title>
        <desc id={`${id}-map-description`}>{satellite ? "Historical NASA satellite composite from 2004 in the same Mercator frame. Optional park and conservation overlays show generalised context, not visitor access or current sightings. " : ""}North-up Mercator overview. Select a coloured area or a labelled button below to filter the birds. Land cover is generalised from 2023/24 LCDB data, not current sightings or a complete ecosystem survey. Neutral areas are other or mixed cover. Coastline shows context only; offshore habitat is not mapped.</desc>
        <g transform={`translate(${-camera.x * camera.zoom} ${-camera.y * camera.zoom}) scale(${camera.zoom})`} data-map-camera={`${camera.x},${camera.y},${camera.zoom}`}>
        {satellite && <image href="/images/maps/south-island-satellite-2004.jpg" x="0" y="0" width="480" height="640" preserveAspectRatio="xMidYMid meet" onError={() => setSatelliteFailed(true)} data-map-layer="satellite"/>}
        <path d={map.outline} fill={satellite ? "none" : "#e7ede8"} stroke="#829c8c" strokeWidth="1" vectorEffect="non-scaling-stroke" fillRule="evenodd" />
        {!satellite && map.layers.map(layer => {
          const habitat = layer.id as SouthIslandEcosystem
          const name = southIslandEcosystems.find(item => item.id === habitat)!.name
          return <g key={habitat} role="button" tabIndex={0} aria-label={`Show ${name} birds on map`} aria-pressed={selected === habitat} className={styles.area} onClick={() => onSelect(habitat)} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onSelect(habitat) } }}>
            <title>{name}</title>
            <path d={layer.path} fill={colours[habitat]} opacity={selected === "all" || selected === habitat ? 1 : 0.18} fillRule="evenodd" />
          </g>
        })}
        {(layers.nationalParks || layers.conservation) && <ConservationOverlay />}
        {/* The real coastline is context, not a fabricated marine habitat polygon.
            Its generous hit stroke works with mouse/touch; the legend offers
            full-size keyboard/touch buttons for every small inland patch too. */}
        <g role="button" tabIndex={0} aria-label="Show Coasts & offshore waters birds on map" aria-pressed={selected === "coast"} className={styles.area} onClick={() => onSelect("coast")} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onSelect("coast") } }}>
          <title>Coasts & offshore waters — coastline context only</title>
          <path d={map.outline} fill="none" stroke={colours.coast} strokeWidth={selected === "coast" ? 4 : 1.5} strokeDasharray="4 3" opacity={selected === "all" || selected === "coast" ? 1 : 0.25} vectorEffect="non-scaling-stroke" />
          <path d={map.outline} fill="none" stroke="transparent" strokeWidth="10" vectorEffect="non-scaling-stroke" />
        </g>
        {places?.map(item => {
          const point = ecosystemMapPoint(item.longitude, item.latitude, map.bbox)
          const selected = item.id === selectedPlace
          const unit = 1 / (camera.zoom * Math.max(svgPixelsPerUnit, .25))
          return <g key={item.id} role="button" tabIndex={0} aria-label={`Show place: ${item.label}`} aria-pressed={selected} className={styles.area} onClick={() => onSelectPlace?.(item.id)} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onSelectPlace?.(item.id) } }}>
            <title>{`${item.label} — ${item.location}`}</title>
            <circle cx={point.x} cy={point.y} r={22 * unit} fill="transparent" />
            <circle cx={point.x} cy={point.y} r={(selected ? 8 : 5) * unit} fill={selected ? "#065f46" : "#fff"} stroke={selected ? "white" : "#065f46"} strokeWidth="2" vectorEffect="non-scaling-stroke" />
          </g>
        })}
        </g>
        <g aria-hidden="true" fill="#065f46"><text x="38" y="55" textAnchor="middle" fontSize="15" fontWeight="600">N</text><path d="M38 64L32 82L38 78L44 82Z" /></g>
      </svg>
      <figcaption className="text-center text-[11px] leading-5 text-gray-600">{satellite ? "Satellite · NASA Earth Observatory · 2004 composite · Historical overview" : "Land cover · 2023/24 · Approx. 2 km source detail; zoom adds no new data"}{(layers.nationalParks || layers.conservation) && <span className="block">DOC conservation boundaries · 9 November 2026 · CC BY 4.0</span>}</figcaption>
    </figure>
    <div className={styles.scale} aria-label="Map distance scale">
      {scale ? <><div style={{ width: scale.widthPixels }} className={styles.scaleBar} /><p>{scale.distanceMetres / 1000} km at {Math.abs(scale.latitude).toFixed(1)}° S · map centre</p></> : <p>Distance scale appears when the map is measured.</p>}
    </div>
    {places && <div className="mt-2 grid grid-cols-2 gap-1" aria-label="South Island places">
      {places.map(item => <button key={item.id} type="button" aria-pressed={item.id === selectedPlace} onClick={() => onSelectPlace?.(item.id)} className={`min-h-11 rounded-lg border px-2 py-2 text-left text-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700 ${item.id === selectedPlace ? "border-emerald-700 bg-emerald-50 font-semibold text-emerald-950" : "border-emerald-100 bg-white text-emerald-900"}`}>{item.label}</button>)}
    </div>}
    {place && <p className="mt-2 text-xs leading-5 text-emerald-900"><a href={place.source} target="_blank" rel="noreferrer" className="underline">{place.location}</a> · public landscape reference, not a habitat boundary or wildlife location.</p>}
    <details open={!places} className={styles.filters}><summary className="min-h-11 cursor-pointer content-center rounded text-xs font-medium text-emerald-800">Habitat filters</summary>
    <div aria-label="Habitat map legend" className="mt-2 grid grid-cols-1 gap-1 min-[390px]:grid-cols-2">
      {southIslandEcosystems.map(item => <button key={item.id} type="button" aria-label={`Filter birds: ${item.name}`} aria-pressed={selected === item.id} onClick={() => onSelect(item.id)} className={`flex min-h-11 items-center gap-2 rounded-lg border px-2 py-2 text-left text-xs leading-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${selected === item.id ? "border-emerald-700 bg-emerald-50 font-semibold text-emerald-950" : "border-emerald-100 bg-white text-emerald-900 hover:border-emerald-500"}`}><span aria-hidden="true" className="h-3 w-3 shrink-0 rounded-sm border border-black/10" style={{ backgroundColor: colours[item.id] }} />{item.name}</button>)}
    </div>
    </details>
    <p className="mt-2 text-[11px] leading-5 text-gray-600">Colours group land-cover classes, not exact bird ranges. Tussock also occurs below alpine country. Coastline is context; offshore habitat is not mapped.</p>
    <details className={styles.sources}>
      <summary className="min-h-11 cursor-pointer content-center rounded text-xs font-medium text-emerald-800 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700">Map sources & limitations</summary>
      <div className="space-y-2 pb-2 text-xs leading-5 text-gray-600">
        <p><a href={satelliteSource.url} target="_blank" rel="noreferrer" className="underline">NASA Earth Observatory — Blue Marble Next Generation</a>. Historical 2004 satellite composite, downloaded through GIBS and served by AVES. Uses the same Mercator extent as the habitat geometry. Broad context, not live imagery or a road map. Land-cover colours hide in satellite view; bird filters stay active.</p>
        <p><a href={catalogue.source.url} target="_blank" rel="noreferrer" className="underline">DOC Public Conservation Land</a>. {catalogue.source.copyright}. <a href={catalogue.source.licenceUrl} target="_blank" rel="noreferrer" className="underline">CC BY 4.0</a>. Retrieved 9 November 2026, clipped to the main South Island and generalised to about 2 km. Nine national parks are a subset of the conservation layer. Small parcels and nearby islands may be omitted; privately conserved land is not comprehensively mapped. Boundaries do not establish visitor access, track safety or the birds in a park; consult DOC's current guidance.</p>
        <p><a href={map.source.url} target="_blank" rel="noreferrer" className="underline">Manaaki Whenua — LCDB v6.0</a> · <a href={map.source.licenceUrl} target="_blank" rel="noreferrer" className="underline">CC BY 3.0 NZ, WMS service</a>. Imagery: 2023/24; reviewed 9 November 2026. Generalised, grouped and recoloured by AVES.</p>
        <p>Forest/scrub: indigenous forest, broadleaved indigenous hardwoods, fernland, mānuka/kānuka and matagouri/grey scrub. Mountains/tussock: alpine vegetation, tall tussock and subalpine shrubland. Freshwater: mapped lakes, rivers and herbaceous freshwater vegetation. Other, small or mixed areas may remain neutral.</p>
        <p>Coastline: <a href={map.source.coastlineUrl} target="_blank" rel="noreferrer" className="underline">Natural Earth, public domain</a>. Main South Island only; nearby islands omitted. Simplified coastlines and land cover may not coincide precisely. Not for navigation or locating birds. Check local access, habitat and season.</p>
        <p>Scale measures horizontal ground distance at the displayed map-centre latitude, corrected for WGS84/Web Mercator. It updates on zoom, north/south pan and panel resize; scale varies elsewhere on the map. Native page scrolling and pinch zoom remain available when Move is off. Source detail remains about 2 km, even when enlarged.</p>
      </div>
    </details>
    <a href="/new-zealand#regions" className="mt-1 inline-flex min-h-11 items-center rounded text-xs font-semibold text-emerald-800 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700">Back to New Zealand</a>
  </section>
}
