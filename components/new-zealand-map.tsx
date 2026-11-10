/**
 * New Zealand island navigation, drawn from the credited coastline JSON.
 * compact selects the hero presentation; its optional callback previews an island
 * in place. Native links open published guides or retained island anchors.
 * Focus scales the original coastline; highlights are not a complete bird range.
 */
"use client"

import { MapViewer } from "./map-viewer"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useRegionPreview } from "./use-region-preview"
import { useEffect, useRef } from "react"
import { ArrowDownRight, ArrowRight } from "lucide-react"
import styles from "@/components/country-hero-explorer.module.css"
import { newZealandRegions } from "@/content/new-zealand"
import map from "@/content/new-zealand-map.json"
import { newZealandRegionHref } from "@/lib/new-zealand-region-links"
import { mapZoomTransform } from "@/lib/map-zoom"
import type { NewZealandIslandId } from "@/content/new-zealand-bird-islands"

const labels = [
  { x: 432, y: 107, width: 142 },
  { x: 355, y: 446, width: 142 },
  { x: 318, y: 578, width: 230 },
]

type NewZealandMapProps = {
  compact?: boolean
  highlightedIslands?: readonly string[]
  frameHeight?: string
  focusedIsland?: NewZealandIslandId
  onSelectIsland?: (id: NewZealandIslandId) => void
  onResetFocus?: () => void
}

export default function NewZealandMap({ compact = false, highlightedIslands = [], frameHeight, focusedIsland, onSelectIsland, onResetFocus }: NewZealandMapProps) {
  const focusIsland = map.islands.find(island => island.id === focusedIsland)
  const backRef = useRef<HTMLButtonElement>(null)
  const islandLinks = useRef<Record<string, HTMLAnchorElement | null>>({})
  const canReset = Boolean(onResetFocus)
  useEffect(() => { if (focusedIsland && canReset) backRef.current?.focus({ preventScroll: true }) }, [focusedIsland, canReset])
  const router = useRouter()
  const preview = useRegionPreview(id => onSelectIsland?.(id as NewZealandIslandId), href => router.push(href))
  const choose = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (onSelectIsland && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
      preview.activate(event, id)
    }
  }
  // Distinct IDs also support isolated rendering of either presentation.
  const idPrefix = compact ? "nz-hero-map" : "nz-map"
  const mapFigure = (
    <MapViewer label="New Zealand island map" credits={<a href={map.source.url} className="underline">Natural Earth · public domain · main islands shown</a>}><figure className={compact ? styles.nzFigure : "min-w-0"}>
          <svg viewBox={map.viewBox} className={compact ? styles.nzMap : "mx-auto block w-full max-w-xl"} role="group" aria-labelledby={`${idPrefix}-title ${idPrefix}-description`}>
            <title id={`${idPrefix}-title`}>Explore New Zealand’s main islands</title>
            <desc id={`${idPrefix}-description`}>North-up map. Select North Island, South Island or Stewart Island / Rakiura to read about that island. The same links appear alongside the map. Highlighted islands are featured areas, not a complete species range.</desc>
            {!focusIsland && <g aria-hidden="true" className="fill-emerald-800">
              <text x="70" y="53" textAnchor="middle" fontSize="15" fontWeight="700">N</text>
              <path d="M70,65L63,82L70,78L77,82Z" />
              <text x="78" y="270" fontSize="15" className="fill-slate-400" letterSpacing="1">Tasman Sea</text>
              <text x="384" y="354" fontSize="15" className="fill-slate-400" letterSpacing="1">Pacific Ocean</text>
            </g>}
            <g className={styles.mapZoom} style={{ transform: focusIsland ? mapZoomTransform(map.viewBox, focusIsland.paths) : undefined }}>
            {map.islands.map((island, index) => {
              const label = labels[index]
              const highlighted = highlightedIslands.includes(island.id)
              return (
                <Link key={island.id} href={newZealandRegionHref(island.id)} onKeyDown={event => { if (onSelectIsland) preview.activateKey(event, island.id, newZealandRegionHref(island.id)) }} onClick={event => choose(event, island.id)} aria-label={`Explore ${island.label}`} className="group outline-none">
                  <g className={`${highlighted ? "fill-emerald-800" : "fill-[#c5dbd0]"} stroke-[#6e9582] transition-colors group-hover:fill-[#9cc4af] group-focus:fill-[#9cc4af] group-focus:stroke-emerald-950`}>
                    {island.paths.map((path, pathIndex) => <path key={pathIndex} d={path} strokeWidth={highlighted ? "2" : "1.2"} vectorEffect="non-scaling-stroke" fillRule="evenodd" className="group-focus:stroke-[3]" />)}
                  </g>
                  {!focusIsland && <>
                  <rect x={label.x - label.width / 2} y={label.y - (compact ? 28 : 18)} width={label.width} height={compact ? "56" : "36"} rx={compact ? "24" : "18"} className={`${highlighted ? "fill-emerald-800 stroke-emerald-800" : "fill-white stroke-emerald-300"} group-hover:stroke-emerald-800 group-focus:stroke-emerald-950 group-focus:stroke-[3]`} />
                  <text x={label.x} y={label.y + (compact ? 7 : 5)} textAnchor="middle" fontSize={compact ? "21" : "15"} fontWeight="600" className={highlighted ? "fill-white" : "fill-emerald-900"} aria-hidden="true">{compact && island.id === "rakiura" ? "Rakiura" : island.label}</text></>}
                </Link>
              )
            })}
            </g>
          </svg>
          <figcaption className={compact ? "px-3 pb-1 text-center text-[10px] leading-4 text-gray-500" : "px-3 pb-2 text-center text-xs leading-5 text-gray-500"}>
            {focusIsland ? `${focusIsland.label} view · ` : compact ? "Main islands · " : "Main islands shown; outlying islands omitted. Coastline from "}<a href={map.source.url} target="_blank" rel="noreferrer" className="rounded underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700">Natural Earth</a>{compact ? " coastline" : " (public domain)."}
          </figcaption>
        </figure></MapViewer>
  )

  // The same SVG is reused in two wrappers; only the framing and companion links change.
  if (compact) return (
    <div style={frameHeight ? { height: frameHeight } : undefined} className={`${styles.mapCard} rounded-2xl border border-emerald-100/70 bg-white/60 p-4`}>
      <div className="flex flex-wrap items-baseline justify-between gap-3"><h2 className="font-medium text-emerald-950">{focusIsland ? focusIsland.label : "Explore the islands"}</h2>{focusIsland ? onResetFocus ? <button ref={backRef} type="button" onClick={() => { preview.clear(); onResetFocus(); if (focusedIsland) islandLinks.current[focusedIsland]?.focus({ preventScroll: true }) }} className="inline-flex min-h-11 items-center rounded text-xs font-semibold text-emerald-800 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700">Back to New Zealand</button> : <Link href="/new-zealand#regions" className="inline-flex min-h-11 items-center rounded text-xs font-semibold text-emerald-800 underline underline-offset-4">Back to New Zealand</Link> : <a href="#regions" className="inline-flex min-h-9 items-center gap-1 rounded text-xs font-medium text-emerald-800 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700">Island guides<ArrowRight className="h-3.5 w-3.5" aria-hidden="true" /></a>}</div>
      {mapFigure}
      <nav aria-label="Explore New Zealand islands" className="mt-2 grid grid-cols-1 gap-2">
        {newZealandRegions.map(region => <Link key={region.id} ref={node => { islandLinks.current[region.id] = node }} href={newZealandRegionHref(region.id)} onClick={event => choose(event, region.id)} aria-label={`Explore ${region.name}`} className={`inline-flex min-h-11 items-center justify-center rounded-lg border px-1 text-sm font-medium transition-colors hover:border-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${highlightedIslands.includes(region.id) ? "border-emerald-700 bg-emerald-800 text-white" : "border-emerald-200 bg-white text-emerald-900"}`}>{region.id === "north-island" ? "North Island" : region.id === "south-island" ? "South Island" : "Rakiura"}</Link>)}
      </nav>
      <p className="mt-2 text-xs leading-4 text-gray-600">{highlightedIslands.length ? "Highlighted: areas featured for this bird, not its complete range." : "Choose an island to explore its landscapes and birdlife."}</p>
    </div>
  )

  return (
    <div className="mt-9 overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-br from-stone-50 via-emerald-50/40 to-white">
      <div className="grid items-center gap-4 p-4 sm:p-7 lg:grid-cols-[1.2fr_1fr] lg:gap-10">
        {mapFigure}
        <div className="p-2 sm:p-3 lg:pr-6">
          <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700"><ArrowDownRight className="h-4 w-4" aria-hidden="true" /> Explore by island</p>
          <h3 className="text-2xl font-medium tracking-tight sm:text-3xl">Find your place on the map</h3>
          <p className="mt-4 leading-7 text-gray-600">Select an island to discover its landscapes and birdlife, then start imagining the pace of your journey.</p>
          <nav aria-label="New Zealand islands" className="mt-6 space-y-3">
            {newZealandRegions.map((region, index) => <Link key={region.id} href={newZealandRegionHref(region.id)} className="group flex min-h-16 items-center gap-4 rounded-2xl border border-emerald-200 bg-white px-5 py-4 transition-colors hover:border-emerald-600 hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700">
              <span className="text-sm font-bold text-emerald-600" aria-hidden="true">0{index + 1}</span>
              <span className="min-w-0 flex-1"><span className="block font-semibold text-emerald-950">{region.name}</span><span className="mt-1 block text-sm text-gray-600">{region.subtitle}</span></span>
              <ArrowRight className="h-5 w-5 shrink-0 text-emerald-700 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>)}
          </nav>
        </div>
      </div>
    </div>
  )
}
