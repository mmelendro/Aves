"use client"

/*
 * Selectable geographic map used inside RegionExplorer. The parent owns the selected ID;
 * this component reports clicks/keyboard activation through onSelectRegion. Natural Earth
 * geometry and attribution are imported from content/australia-map.ts rather than drawn here.
 */

import MapFeatherMarker from "./map-feather-marker"
import { Feather } from "lucide-react"
import { MapViewer } from "./map-viewer"
import { useId } from "react"
import {
  australiaMapProvenance,
  australiaMapStates,
  australiaMapViewBox,
} from "@/content/australia-map"

type AustraliaRegionMapProps = {
  selectedRegion: string
  onSelectRegion: (id: string) => void
}

const focusRegions = australiaMapStates.filter((state) => state.regionId !== null)
// This is a controlled component: its parent receives selection events and passes the new selection back.
export function AustraliaRegionMap({ selectedRegion, onSelectRegion }: AustraliaRegionMapProps) {
  const id = useId()
  const selectedState = focusRegions.find((state) => state.regionId === selectedRegion)

  return (
    <div className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm">
        <div className="relative bg-gradient-to-br from-stone-50 via-emerald-50/40 to-white px-3 pb-2 pt-4 sm:px-6">
          <p className="mb-2 flex items-center justify-center gap-2 text-center text-sm font-medium text-emerald-900"><Feather size={16} aria-hidden="true" />{selectedState?.name || "Choose a region"}</p>
          <MapViewer label="Australian states and territories map" credits={<a href={australiaMapProvenance.sourceUrl} className="underline">Natural Earth · Public domain · Generalised boundaries; external territories not shown</a>}>
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
              {" "}Use Tab, then Enter or Space to select. All regions also have named controls outside the map. External territories are not shown.
            </desc>
            {australiaMapStates.map((state) => {
              const isFocus = state.regionId !== null
              const isSelected = isFocus && selectedRegion === state.regionId
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
                  role={isFocus ? "button" : undefined}
                  tabIndex={isFocus ? 0 : undefined}
                  aria-label={isFocus ? `Explore ${state.name}` : undefined}
                  aria-pressed={isFocus ? isSelected : undefined}
                  aria-hidden={!isFocus ? true : undefined}
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
            {selectedState && <svg x={selectedState.label[0]-22} y={selectedState.label[1]-22} width="44" height="44" pointerEvents="none"><MapFeatherMarker size={44}/></svg>}
          </svg>
          </MapViewer>
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
