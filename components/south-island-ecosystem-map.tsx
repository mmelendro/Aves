"use client"
import Link from "next/link"
import SouthIslandSoundscapes from "./south-island-soundscapes"
import { MapViewer } from "./map-viewer"
import { mapGestureView } from "@/lib/map-gestures.mjs"

/** Attributed land-cover overview, controlled by the existing explorer.
 * SVG geometry is generated offline from official LCDB data; the browser sends
 * no private guest data. Satellite navigation loads its shared geographic engine on demand.
 */
import dynamic from "next/dynamic"
import { useMapLayers } from "./map-layer-context"
import SouthIslandMapLayers from "./south-island-map-layers"
import { satelliteHabitatStyle } from "@/lib/satellite-overlay.mjs"
import catalogue from "@/content/south-island-layer-catalogue.json"
import { useTripMap } from "./trip-planner/trip-map-context"
import TripRouteOverlay from "./trip-planner/trip-route-overlay"
import PublicPlaceOverlay, { PublicPlaceDetails } from "./south-island-public-place-overlay"
import { publicPlaces, visiblePublicPlaces } from "@/lib/south-island-public-places"
import { useEffect, useId, useRef, useState } from "react"
import {useBirdFilters} from "./bird-filter-context"
import {filterConservationBirds,birdFiltersActive} from "@/lib/bird-conservation"
import {newZealandRegionBirds} from "@/content/new-zealand-carousel"
import {filterSouthIslandBirds} from "@/content/south-island-ecosystems"
import { Hand, Minus, Plus, RotateCcw } from "lucide-react"
import map from "@/content/south-island-ecosystem-map.json"
import contextRegions from "@/content/geographic-planning-regions/new-zealand.json"
import { southIslandEcosystems, type SouthIslandEcosystemFilter, type SouthIslandEcosystem } from "@/content/south-island-ecosystems"
import styles from "./south-island-ecosystem-map.module.css"
import { ecosystemMapPoint, ecosystemMapScale, focusEcosystemMapPoint, initialMapCamera, panMapCamera, zoomMapCamera, type MapCamera } from "@/lib/ecosystem-map-camera"

const SouthIslandSatelliteMap = dynamic(() => import("./south-island-satellite-map"), { ssr: false })
const ConservationOverlay = dynamic(() => import("./south-island-conservation-overlay"), { ssr: false })

const colours: Record<SouthIslandEcosystem, string> = { forest: "#537b5d", mountains: "#ae9761", freshwater: "#438eac", coast: "#008477" }

type MapPlace = { id: string; label: string; latitude: number; longitude: number; location: string; source: string }
type Props = { matchingHabitats?:readonly string[]; onSelectIsland?: (id:string) => void; onZoomOutAtMinimum?: () => void; selected: SouthIslandEcosystemFilter; onSelect: (id: SouthIslandEcosystemFilter) => void; places?: readonly MapPlace[]; selectedPlace?: string; onSelectPlace?: (id: string) => void }

// Context coastlines share the LCDB Mercator frame, so they remain registered while panning.
const surroundingIslands = contextRegions.features.filter(f => f.properties.id !== "south-island").map(feature => ({
  name: feature.properties.name,
  path: (feature.geometry.type === "MultiPolygon" ? feature.geometry.coordinates as number[][][][] : [feature.geometry.coordinates as number[][][]]).map(polygon => polygon.map(ring => ring.map((point, i) => {
    const p = ecosystemMapPoint(point[0], point[1], map.bbox)
    return `${i ? "L" : "M"}${p.x},${p.y}`
  }).join(" ") + "Z").join(" ")).join(" "),
}))
export default function SouthIslandEcosystemMap({ matchingHabitats, selected, onSelect, places, selectedPlace, onSelectPlace, onZoomOutAtMinimum, onSelectIsland }: Props) {
  const { layers } = useMapLayers()
  const {filters}=useBirdFilters()
  const matches=matchingHabitats ?? (birdFiltersActive(filters) ? southIslandEcosystems.filter(item=>filterSouthIslandBirds(filterConservationBirds(newZealandRegionBirds("south-island"),filters),item.id).length>0).map(item=>item.id) : undefined)
  const satellite = layers.background === "satellite"
  const focusedPark = layers.nationalParks ? catalogue.parks.find(park => park.id === layers.park) : undefined
  const focusedPoint = visiblePublicPlaces(layers).find(point => point.id === layers.point)
  const journey=useTripMap()?.journey
  const guidedJourney=journey?.islandId==="south-island"
  const reference=guidedJourney?journey?.steps[journey.index]?.mapPoint:undefined
  const id = useId()
  const detailsRef = useRef<HTMLDetailsElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const pointers = useRef(new Map<number, { x: number; y: number }>())
  const drag = useRef<{ points: { x: number; y: number }[]; camera: MapCamera; pixelsPerUnit: number } | null>(null)
  const [camera, setCamera] = useState(initialMapCamera)
  const [panMode, setPanMode] = useState(false)
  const [svgPixelsPerUnit, setSvgPixelsPerUnit] = useState(0)
  const place = places?.find(item => item.id === selectedPlace)
  const latitude = place?.latitude
  const longitude = place?.longitude
  const previousPlace = useRef(selectedPlace)
  // A place slide changes the camera target. Habitat filters, panel resize and
  // bird selection do not reset a visitor's chosen camera position.
  useEffect(() => {
    if (previousPlace.current === selectedPlace) return
    previousPlace.current = selectedPlace
    if (latitude === undefined || longitude === undefined) return
    setCamera(current => focusEcosystemMapPoint(current, ecosystemMapPoint(longitude, latitude, map.bbox)))
  }, [latitude, longitude, selectedPlace])
  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    const observer = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect
      setSvgPixelsPerUnit(camera.zoom === 1 ? Math.min(width / 725, height / 1020) : Math.min(width / 480, height / 640))
    })
    observer.observe(svg)
    return () => observer.disconnect()
  }, [satellite, camera.zoom])
  useEffect(() => {
    if (!focusedPark) return
    setCamera(current => focusEcosystemMapPoint(current, {x:focusedPark.point[0],y:focusedPark.point[1]}))
  }, [focusedPark])
  useEffect(() => {
    if (!focusedPoint) return
    setCamera(current => focusEcosystemMapPoint(current, ecosystemMapPoint(focusedPoint.longitude,focusedPoint.latitude,map.bbox)))
  }, [focusedPoint?.id, focusedPoint?.longitude, focusedPoint?.latitude])
  useEffect(()=>{
    if(!detailsRef.current)return
    // Guided steps must keep the map visible. Direct exploration keeps its existing details behaviour.
    if(guidedJourney)detailsRef.current.open=false
    else if(focusedPoint)detailsRef.current.open=true
  },[focusedPoint?.id,guidedJourney,journey?.index])
  useEffect(()=>{
    if(reference)setCamera(current=>focusEcosystemMapPoint(current,ecosystemMapPoint(reference.longitude,reference.latitude,map.bbox)));
  },[reference]);
  const scale = ecosystemMapScale(camera, map.bbox, svgPixelsPerUnit)
  function zoom(factor: number) { setCamera(current => zoomMapCamera(current, factor)) }
  function pan(dx: number, dy: number) { setCamera(current => panMapCamera(current, dx * 480 / current.zoom, dy * 640 / current.zoom)) }
  function reset() { drag.current = null; pointers.current.clear(); setCamera(initialMapCamera); setPanMode(false) }
  const mapControls = <>
      {!satellite && <>
      <button type="button" className={styles.control} title="Zoom in" aria-label="Zoom ecosystem map in" disabled={camera.zoom >= 4} onClick={() => zoom(1.5)}><Plus size={17} aria-hidden="true" /></button>
      <button type="button" className={styles.control} title="Zoom out" aria-label="Zoom ecosystem map out" disabled={camera.zoom <= 1 && !onZoomOutAtMinimum} onClick={() => camera.zoom <= 1 ? onZoomOutAtMinimum?.() : zoom(1 / 1.5)}><Minus size={17} aria-hidden="true" /></button>
      <button type="button" className={styles.control} title="Reset map view" aria-label="Reset ecosystem map view" onClick={reset}><RotateCcw size={16} aria-hidden="true" /></button>
      <button type="button" className={styles.control} title="Toggle drag to move map" aria-label="Move ecosystem map by dragging" aria-pressed={panMode} onClick={() => { pointers.current.clear(); drag.current = null; setPanMode(value => !value) }}><Hand size={17} aria-hidden="true" /></button>
      <span className="px-1 text-xs tabular-nums text-emerald-900" role="status">{camera.zoom.toFixed(1)}×</span>
      </>}
      <SouthIslandMapLayers />
  </>
  return <MapViewer label="South Island explorer map" layerControl={mapControls} gestures={false} listenControl={<SouthIslandSoundscapes />}><section data-ecosystem-card="true" className={styles.card} aria-labelledby={`${id}-title`}>
    <div className={styles.mapHeading}><h2 id={`${id}-title`} className="text-sm font-medium text-emerald-950">{reference ? reference.name : guidedJourney && focusedPoint ? focusedPoint.name.split(" · ")[0] : place ? place.label : "South Island habitats"}</h2></div>
    <p id={`${id}-gestures`} className="sr-only">{panMode ? "Move is on: drag to pan or pinch with two fingers. Turn Move off to select habitats." : "Use Move for dragging and pinching. Focus the map for + / −, arrow keys and Home."}</p>
    <figure className={styles.figure} data-map-layer={satellite ? "satellite" : undefined}>
      {satellite ? <SouthIslandSatelliteMap selected={selected} onSelectIsland={onSelectIsland} latitude={latitude} longitude={longitude}/> : <>
      <svg ref={svgRef} viewBox={camera.zoom === 1 ? "0 -360 725 1020" : map.viewBox} className={styles.map} role="group" tabIndex={0} aria-describedby={`${id}-gestures`} aria-labelledby={`${id}-map-title ${id}-map-description`} style={{ touchAction: panMode ? "none" : "pan-y pinch-zoom", cursor: panMode ? "grab" : undefined }}
        onKeyDown={event => {
          if (event.target !== event.currentTarget) return
          const moves: Record<string, [number, number]> = { ArrowLeft: [-.15, 0], ArrowRight: [.15, 0], ArrowUp: [0, -.15], ArrowDown: [0, .15] }
          if (moves[event.key]) { event.preventDefault(); pan(...moves[event.key]) }
          else if (["+", "=", "-", "Home"].includes(event.key)) { event.preventDefault(); if (event.key === "Home") reset(); else zoom(event.key === "-" ? 1 / 1.5 : 1.5) }
        }}
        onPointerDown={event => {
          if (!panMode || (event.pointerType === "mouse" && event.button !== 0) || pointers.current.size >= 2 || !(svgPixelsPerUnit > 0)) return
          event.preventDefault()
          const rect = event.currentTarget.getBoundingClientRect()
          const offsetX = (rect.width - 480 * svgPixelsPerUnit) / 2
          const offsetY = (rect.height - 640 * svgPixelsPerUnit) / 2
          pointers.current.set(event.pointerId, { x: event.clientX - rect.left - offsetX, y: event.clientY - rect.top - offsetY })
          event.currentTarget.setPointerCapture(event.pointerId)
          drag.current = { points: [...pointers.current.values()], camera, pixelsPerUnit: svgPixelsPerUnit }
        }}
        onPointerMove={event => {
          const start = drag.current
          if (!start || !pointers.current.has(event.pointerId)) return
          event.preventDefault()
          const rect = event.currentTarget.getBoundingClientRect(), ppu = start.pixelsPerUnit
          pointers.current.set(event.pointerId, { x: event.clientX - rect.left - (rect.width - 480 * ppu) / 2, y: event.clientY - rect.top - (rect.height - 640 * ppu) / 2 })
          const view = mapGestureView({ x: -start.camera.x * start.camera.zoom * ppu, y: -start.camera.y * start.camera.zoom * ppu, zoom: start.camera.zoom }, start.points, [...pointers.current.values()], { width: 480 * ppu, height: 640 * ppu })
          setCamera({ x: -view.x / (view.zoom * ppu), y: -view.y / (view.zoom * ppu), zoom: view.zoom })
        }}
        onPointerUp={event => {
          pointers.current.delete(event.pointerId)
          if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
          drag.current = pointers.current.size ? { points: [...pointers.current.values()], camera, pixelsPerUnit: svgPixelsPerUnit } : null
        }}
        onPointerCancel={() => { pointers.current.clear(); drag.current = null }} onLostPointerCapture={event => { if (pointers.current.delete(event.pointerId)) drag.current = null }}
        onClickCapture={event => { if (panMode) { event.preventDefault(); event.stopPropagation() } }}>
        <title id={`${id}-map-title`}>{satellite ? "South Island satellite overview and conservation layers" : "South Island land cover and coastline"}</title>
        <defs><clipPath id={`${id}-island-clip`}><path d={map.outline} fillRule="evenodd" clipRule="evenodd"/></clipPath></defs>
        <desc id={`${id}-map-description`}>{satellite ? "Historical NASA satellite composite from 2004 in the same Mercator frame. Only the selected habitat areas are shaded; opacity controls the shading, not the imagery. Parks, conservation and public places are independent overlays. " : ""}North-up Mercator overview, with the Tasman Sea to the west and South Pacific Ocean to the east. Sea colour and labels provide orientation only, not mapped marine habitats or boundaries. Select a visible coloured ecosystem area or a labelled habitat button to filter the birds. Land cover is generalised from 2023/24 LCDB data, not current sightings or a complete ecosystem survey. Coastline is context only; offshore habitat is not mapped. Place markers show public references, not wildlife locations or permission to enter.</desc>
        <rect x="-1000" y="-1000" width="3000" height="3000" fill="#edf8fa" pointerEvents="none" />
        <g transform={`translate(${-camera.x * camera.zoom} ${-camera.y * camera.zoom}) scale(${camera.zoom})`} data-map-camera={`${camera.x},${camera.y},${camera.zoom}`}>
        <g aria-hidden="true" pointerEvents="none" className={styles.seaLabels} fontSize={12 / (camera.zoom * Math.max(svgPixelsPerUnit, .25))}>
          <text x="94" y="180" textAnchor="middle">Tasman Sea</text>
          <text x="362" y="460" textAnchor="middle"><tspan x="362">South Pacific</tspan><tspan x="362" dy="1.25em">Ocean</tspan></text>
        </g>
        {surroundingIslands.map(island => <path key={island.name} d={island.path} fill="#d7e4dc" fillOpacity={.5} stroke="#91a99a" strokeOpacity={.55} vectorEffect="non-scaling-stroke" fillRule="evenodd" pointerEvents="none"><title>{island.name} · surrounding New Zealand</title></path>)}
        <path d={map.outline} fill={satellite ? "none" : "#e7ede8"} stroke="#829c8c" strokeWidth="1" vectorEffect="non-scaling-stroke" fillRule="evenodd" />
        {map.layers.filter(layer => !satellite || layer.id === selected).map(layer => {
          const habitat = layer.id as SouthIslandEcosystem
          const name = southIslandEcosystems.find(item => item.id === habitat)!.name
          const paint = satelliteHabitatStyle({ satellite, selected, habitat, opacity: layers.overlayOpacity })
          return <g key={habitat} role="button" tabIndex={0} aria-label={`Show ${name} birds on map`} aria-pressed={selected === habitat} className={styles.area} onClick={() => onSelect(habitat)} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onSelect(habitat) } }}>
            <title>{name}{matches ? matches.includes(habitat) ? " · matching featured birds" : " · no matching featured birds" : ""}</title>
            <path d={layer.path} fill={colours[habitat]} fillOpacity={matches && !matches.includes(habitat) ? paint.fillOpacity * .2 : paint.fillOpacity} stroke={satellite ? colours[habitat] : "none"} strokeOpacity={paint.strokeOpacity} strokeWidth={paint.strokeWidth} vectorEffect="non-scaling-stroke" fillRule="evenodd" data-map-layer="ecosystems" />
          </g>
        })}
        {(layers.nationalParks || layers.conservation) && <ConservationOverlay />}
        {/* The real coastline is context, not a fabricated marine habitat polygon.
            Its generous hit stroke works with mouse/touch; the legend offers
            full-size keyboard/touch buttons for every small inland patch too. */}
        <g role="button" tabIndex={0} aria-label="Show Coasts & offshore waters birds on map" aria-pressed={selected === "coast"} className={styles.area} onClick={() => onSelect("coast")} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onSelect("coast") } }}>
          <title>Coasts & offshore waters — coastline context only</title>
          <path d={map.outline} fill="none" stroke={colours.coast} strokeWidth={selected === "coast" ? 4 : 1.5} strokeDasharray="4 3" opacity={satellite ? (selected === "coast" ? 1 : 0) : (selected === "all" || selected === "coast" ? 1 : 0.25)} vectorEffect="non-scaling-stroke" />
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
        {reference&&(()=>{const p=ecosystemMapPoint(reference.longitude,reference.latitude,map.bbox),unit=1/(camera.zoom*Math.max(svgPixelsPerUnit,.25));return <g role="img" aria-label={`Reviewed location: ${reference.name}`}><title>{reference.name} · {reference.scope}</title><circle cx={p.x} cy={p.y} r={8*unit} fill="#0e7490" stroke="white" strokeWidth="2" vectorEffect="non-scaling-stroke"/></g>})()}
        <PublicPlaceOverlay unit={1 / (camera.zoom * Math.max(svgPixelsPerUnit,.25))} />
        <TripRouteOverlay />
        </g>
        <g aria-hidden="true" fill="#065f46"><text x="38" y="55" textAnchor="middle" fontSize="15" fontWeight="600">N</text><path d="M38 64L32 82L38 78L44 82Z" /></g>
      </svg></>}
      <figcaption className="text-center text-[11px] leading-5 text-gray-600">{satellite ? "Satellite · EOxCloudless · 2016 composite · Historical landscape" : "Land cover · 2023/24 · Approx. 2 km source detail; zoom adds no new data"}{satellite && selected !== "all" && selected !== "coast" && <span className="block">Ecosystems · LCDB 2023/24 · Generalised land cover</span>}{(layers.nationalParks || layers.conservation) && <span className="block">DOC conservation boundaries · 9 November 2026 · CC BY 4.0</span>}</figcaption>
    </figure>
    {(layers.bcorps || layers.planning) && <p className="shrink-0 text-[10px] leading-4 text-emerald-900"><a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer" className="underline">© OpenStreetMap contributors · ODbL<span className="sr-only"> (opens in a new tab)</span></a></p>}
    <details ref={detailsRef} className={styles.mapDetails}>
      <summary>Places, habitats &amp; map details</summary>
      <div className={styles.detailsPanel}>
        <button type="button" className="mb-2 min-h-11 rounded px-2 text-sm font-semibold text-emerald-800 underline" onClick={()=>{if(detailsRef.current){detailsRef.current.open=false;detailsRef.current.querySelector("summary")?.focus();}}}>Back to the map</button>
        <button type="button" onClick={() => onSelect("all")} aria-pressed={selected === "all"} className="min-h-11 rounded px-2 text-xs font-semibold text-emerald-800 underline">All habitats</button>
        <p className="mb-2 text-xs leading-5 text-gray-600">{satellite ? "Drag to explore. Use two fingers to move on touch screens. Use the habitat filters below to change the birds." : "Use Move to drag or pinch the map. Turn it off to select habitats. Keyboard: + / −, arrow keys and Home."}</p>
    <PublicPlaceDetails />
    <div className={styles.scale} aria-label="Map distance scale">
      {scale ? <><div style={{ width: scale.widthPixels }} className={styles.scaleBar} /><p>{scale.distanceMetres / 1000} km at {Math.abs(scale.latitude).toFixed(1)}° S · map centre</p></> : <p>Distance scale appears when the map is measured.</p>}
    </div>
    {places && <div className="mt-2 grid grid-cols-2 gap-1" aria-label="South Island places">
      {places.map(item => <button key={item.id} type="button" aria-pressed={item.id === selectedPlace} onClick={() => onSelectPlace?.(item.id)} className={`min-h-11 rounded-lg border px-2 py-2 text-left text-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700 ${item.id === selectedPlace ? "border-emerald-700 bg-emerald-50 font-semibold text-emerald-950" : "border-emerald-100 bg-white text-emerald-900"}`}>{item.label}</button>)}
    </div>}
    {place && <p className="mt-2 text-xs leading-5 text-emerald-900" role="status"><a href={place.source} target="_blank" rel="noreferrer" className="underline">{place.location}</a> · public landscape reference. Bird filters describe broad habitats across the South Island, not a checklist for this place.</p>}
    <details open={!places && !satellite} className={styles.filters}><summary className="min-h-11 cursor-pointer content-center rounded text-xs font-medium text-emerald-800">Habitat filters</summary>
    <div aria-label="Habitat map legend" className="mt-2 grid grid-cols-1 gap-1 min-[390px]:grid-cols-2">
      {southIslandEcosystems.map(item => <button key={item.id} type="button" aria-label={`Filter birds: ${item.name}`} aria-pressed={selected === item.id} onClick={() => onSelect(item.id)} className={`flex min-h-11 items-center gap-2 rounded-lg border px-2 py-2 text-left text-xs leading-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${selected === item.id ? "border-emerald-700 bg-emerald-50 font-semibold text-emerald-950" : "border-emerald-100 bg-white text-emerald-900 hover:border-emerald-500"}`}><span aria-hidden="true" className="h-3 w-3 shrink-0 rounded-sm border border-black/10" style={{ backgroundColor: colours[item.id] }} />{item.name}</button>)}
    </div>
    </details>
    {!satellite && <p className="mt-2 text-[11px] leading-5 text-gray-600">Colours group land-cover classes, not exact bird ranges. Tussock also occurs below alpine country. Coastline is context; offshore habitat is not mapped.</p>}
    <details className={styles.sources}>
      <summary className="min-h-11 cursor-pointer content-center rounded text-xs font-medium text-emerald-800 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700">Map sources & limitations</summary>
      <div className="space-y-2 pb-2 text-xs leading-5 text-gray-600">
        <p><a href="https://cloudless.eox.at/documentation/faq" target="_blank" rel="noreferrer" className="underline">EOxCloudless by EOX IT Services GmbH</a>. Contains modified Copernicus Sentinel data 2016, CC BY 4.0. Historical imagery loads as geographic tiles as you zoom. Public tile availability and detail vary. Selected habitat shading uses the separate LCDB 2023/24 data. DOC land, public places and itinerary order remain independent layers.</p>
        <p>{publicPlaces.coverage} Settlement references: <a href={publicPlaces.sources[1].url} target="_blank" rel="noreferrer" className="underline">Natural Earth 5.1.2, public domain</a>. Reserve reference coordinates: {publicPlaces.sources[0].copyright}, CC BY 4.0. Public visitor and business descriptions link to their checked primary sources; operator conservation statements are not independently audited impact or certification.</p>
        <p><a href={catalogue.source.url} target="_blank" rel="noreferrer" className="underline">DOC Public Conservation Land</a>. {catalogue.source.copyright}. <a href={catalogue.source.licenceUrl} target="_blank" rel="noreferrer" className="underline">CC BY 4.0</a>. Retrieved 9 November 2026, clipped to the main South Island and generalised to about 2 km. Nine national parks are a subset of the conservation layer. Small parcels and nearby islands may be omitted; privately conserved land is not comprehensively mapped. Boundaries do not establish visitor access, track safety or the birds in a park; consult DOC's current guidance.</p>
        <p><a href={map.source.url} target="_blank" rel="noreferrer" className="underline">Manaaki Whenua — LCDB v6.0</a> · <a href={map.source.licenceUrl} target="_blank" rel="noreferrer" className="underline">CC BY 3.0 NZ, WMS service</a>. Imagery: 2023/24; reviewed 9 November 2026. Generalised, grouped and recoloured by AVES.</p>
        <p>Forest/scrub: indigenous forest, broadleaved indigenous hardwoods, fernland, mānuka/kānuka and matagouri/grey scrub. Mountains/tussock: alpine vegetation, tall tussock and subalpine shrubland. Freshwater: mapped lakes, rivers and herbaceous freshwater vegetation. Other, small or mixed areas may remain neutral.</p>
        <p>Sea labels provide broad orientation, not marine boundaries or offshore habitat coverage. Context: <a href="https://teara.govt.nz/en/ocean-currents-and-tides/page-1" target="_blank" rel="noreferrer" className="underline">Te Ara, ocean currents around New Zealand</a>, checked 10 November 2026. The surrounding-water tint adds no bathymetry, navigation or species-location data.</p>
        <p>Coastline: <a href={map.source.coastlineUrl} target="_blank" rel="noreferrer" className="underline">Natural Earth, public domain</a>. Main South Island only; nearby islands omitted. Simplified coastlines and land cover may not coincide precisely. Not for navigation or locating birds. Check local access, habitat and season.</p>
        <p>Scale measures horizontal ground distance at the displayed map-centre latitude, corrected for WGS84/Web Mercator. It updates on zoom, north/south pan and panel resize; scale varies elsewhere on the map. Native page scrolling and pinch zoom remain available when Move is off. Source detail remains about 2 km, even when enlarged.</p>
      </div>
    </details>
    {onSelectIsland ? <nav aria-label="Neighbouring New Zealand islands" className="flex flex-wrap gap-4">{[["", "Back to New Zealand"],["north-island","Explore the North Island"],["rakiura","Explore Rakiura"]].map(([id,label])=><button type="button" key={id} className="inline-flex min-h-11 items-center rounded text-xs font-semibold text-emerald-800 underline focus-visible:outline focus-visible:outline-2" onClick={()=>onSelectIsland(id)}>{label}</button>)}</nav> : <><Link href="/new-zealand#regions" className="mt-1 inline-flex min-h-11 items-center rounded text-xs font-semibold text-emerald-800 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700">Back to New Zealand</Link><nav aria-label="Neighbouring New Zealand islands" className="flex flex-wrap gap-4"><Link href="/new-zealand#region-north-island" className="inline-flex min-h-11 items-center text-xs font-semibold text-emerald-800 underline">North Island guide</Link><Link href="/new-zealand#region-rakiura" className="inline-flex min-h-11 items-center text-xs font-semibold text-emerald-800 underline">Rakiura guide</Link></nav></>}
      </div>
    </details>
  </section></MapViewer>
}
