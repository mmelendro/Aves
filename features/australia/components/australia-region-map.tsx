"use client"

/*
 * Selectable geographic map used inside RegionExplorer. The parent owns the selected ID;
 * this component reports clicks/keyboard activation through onSelectRegion. Natural Earth
 * geometry and attribution are imported from content/australia-map.ts rather than drawn here.
 */

import { useId } from "react"
import {
  australiaMapProvenance,
  australiaMapStates,
  australiaMapViewBox,
} from "@/features/australia/content/australia-map"

type AustraliaRegionMapProps = {
  selectedRegion: string
  onSelectRegion: (id: string) => void
}

const focusRegions = australiaMapStates.filter((state) => state.regionId !== null)
// Callouts enlarge the click targets for small territories without inventing or enlarging map boundaries.
const smallTerritories = [
  { id: "australian-capital-territory", label: "ACT", x: 620, y: 493, line: "573.81,460.3 608,514 620,514" },
  { id: "jervis-bay-territory", label: "Jervis Bay", x: 620, y: 427, line: "597.38,458.06 608,448 620,448" },
]

// This is a controlled component: its parent receives selection events and passes the new selection back.
export function AustraliaRegionMap({ selectedRegion, onSelectRegion }: AustraliaRegionMapProps) {
  const id = useId()
  const selectedState = focusRegions.find((state) => state.regionId === selectedRegion)

  return (
    <div className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm">
        <div className="relative bg-gradient-to-br from-stone-50 via-emerald-50/40 to-white px-3 pb-2 pt-4 sm:px-6">
          <svg
            viewBox={australiaMapViewBox}
            role="group"
            aria-labelledby={`${id}-title`}
            aria-describedby={`${id}-description`}
            className="mx-auto block h-auto w-full max-w-[660px]"
          >
            <title id={`${id}-title`}>Explore Australian states and territories</title>
            <desc id={`${id}-description`}>
              Generalised outlines of all six states, the Northern Territory, the ACT and Jervis Bay Territory.
              {selectedState ? ` ${selectedState.name} is selected.` : " Choose a region to explore."}
              {" "}Use Tab, then Enter or Space to select. ACT and Jervis Bay have labelled callouts because they are small at this scale. External territories are not shown.
            </desc>
            {australiaMapStates.map((state) => {
              const isFocus = state.regionId !== null
              const isSelected = isFocus && selectedRegion === state.regionId
              const hasCallout = smallTerritories.some(territory => territory.id === state.regionId)
              return (
                <path
                  key={state.code}
                  d={state.path}
                  fill={isSelected ? "#065f46" : isFocus ? "#c5dbd0" : "#e2e8e8"}
                  stroke={isSelected ? "#065f46" : "#6e9582"}
                  strokeWidth={isSelected ? 1.5 : 0.8}
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                  fillRule="evenodd"
                  role={isFocus && !hasCallout ? "button" : undefined}
                  tabIndex={isFocus && !hasCallout ? 0 : undefined}
                  aria-label={isFocus && !hasCallout ? `Explore ${state.name}` : undefined}
                  aria-pressed={isFocus && !hasCallout ? isSelected : undefined}
                  aria-hidden={!isFocus || hasCallout ? true : undefined}
                  onClick={state.regionId ? () => onSelectRegion(state.regionId!) : undefined}
                  onKeyDown={state.regionId ? (event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault()
                      if (!event.repeat) onSelectRegion(state.regionId!)
                    }
                  } : undefined}
                  className={isFocus ? `cursor-pointer transition-colors duration-200 focus:outline-none focus-visible:stroke-emerald-950 focus-visible:[stroke-width:3] motion-reduce:transition-none ${isSelected ? "hover:fill-emerald-700" : "hover:fill-[#9cc4af]"}` : undefined}
                />
              )
            })}
            {/* Text labels are decorative; interactive outlines/callouts already have accessible names. */}
            {australiaMapStates.filter((state) => state.shortName).map((state) => (
              <text
                key={state.code}
                x={state.label[0]}
                y={state.label[1]}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={selectedRegion === state.regionId ? "#ffffff" : state.regionId ? "#064e3b" : "#526b64"}
                fontSize={state.regionId ? 26 : 23}
                fontWeight={state.regionId ? 600 : 500}
                className="pointer-events-none select-none"
                aria-hidden="true"
              >
                {state.shortName}
              </text>
            ))}
            {/* Tiny territories use one keyboard-accessible callout instead of duplicate focus targets. */}
            {smallTerritories.map(territory => {
              const state = focusRegions.find(item => item.regionId === territory.id)
              if (!state) return null
              const selected = selectedRegion === territory.id
              return <g key={territory.id}>
                <polyline points={territory.line} fill="none" stroke="#047857" strokeWidth="1.5" aria-hidden="true" />
                <circle cx={state.label[0]} cy={state.label[1]} r="3" fill="#047857" aria-hidden="true" />
                <g role="button" tabIndex={0} aria-label={`Explore ${state.name}`} aria-pressed={selected} onClick={() => onSelectRegion(territory.id)} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); if (!event.repeat) onSelectRegion(territory.id) } }} className="group cursor-pointer focus:outline-none">
                  <rect x={territory.x} y={territory.y} width="94" height="42" rx="9" fill={selected ? "#065f46" : "#ffffff"} stroke="#6e9582" strokeWidth="1.5" className="group-focus-visible:stroke-[4] group-hover:stroke-[3]" />
                  <text x={territory.x + 47} y={territory.y + 22} textAnchor="middle" dominantBaseline="middle" fontSize="17" fontWeight="600" fill={selected ? "#ffffff" : "#064e3b"} className="pointer-events-none">{territory.label}</text>
                </g>
              </g>
            })}
          </svg>
          <div className="mb-3 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-slate-600">
            <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-sm border border-emerald-700/30 bg-[#c5dbd0]" aria-hidden="true" />Explore and request a trip</span>
            <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-sm border border-emerald-800 bg-emerald-800" aria-hidden="true" />Selected region</span>
          </div>
        </div>
      <p className="px-5 py-3 text-xs leading-relaxed text-slate-600 sm:px-6">Select any region to explore its birdlife and request a personal trip proposal. Routes, guides and availability are confirmed before booking.</p>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-emerald-100 px-5 py-3 text-[11px] leading-relaxed text-slate-500 sm:px-6">
        <span>Generalised geographic boundaries · Mainland, Tasmania and nearby islands</span>
        <a href={australiaMapProvenance.sourceUrl} target="_blank" rel="noreferrer" className="rounded underline underline-offset-2 hover:text-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700">Map data: Natural Earth · Public domain<span className="sr-only"> (opens in a new tab)</span></a>
      </div>
    </div>
  )
}
