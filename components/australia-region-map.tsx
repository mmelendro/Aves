"use client"

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

export function AustraliaRegionMap({ selectedRegion, onSelectRegion }: AustraliaRegionMapProps) {
  const id = useId()
  const selectedState = focusRegions.find((state) => state.regionId === selectedRegion)

  return (
    <div className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm">
        <div className="relative bg-gradient-to-br from-blue-50 via-emerald-50/50 to-emerald-50 px-3 pb-2 pt-4 sm:px-6">
          <svg
            viewBox={australiaMapViewBox}
            role="group"
            aria-labelledby={`${id}-title`}
            aria-describedby={`${id}-description`}
            className="mx-auto block h-auto w-full max-w-[660px]"
          >
            <title id={`${id}-title`}>Australia: three places to begin your birding journey</title>
            <desc id={`${id}-description`}>
              Accurate generalised state and territory outlines. Queensland, New South Wales and Tasmania
              are highlighted as planning focus areas. {selectedState ? `${selectedState.name} is selected.` : "All three focus areas are shown."}
              {" "}Use Tab to reach each highlighted state, then Enter or Space to select it. State shading does not indicate statewide tour coverage.
            </desc>
            {australiaMapStates.map((state) => {
              const isFocus = state.regionId !== null
              const isSelected = isFocus && selectedRegion === state.regionId
              return (
                <path
                  key={state.code}
                  d={state.path}
                  fill={isSelected ? "#047857" : isFocus ? "#a7f3d0" : "#e2e8e8"}
                  stroke={isSelected ? "#065f46" : "#829b95"}
                  strokeWidth={isSelected ? 1.5 : 0.8}
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                  fillRule="evenodd"
                  role={isFocus ? "button" : undefined}
                  tabIndex={isFocus ? 0 : undefined}
                  aria-label={isFocus ? `Explore ${state.name}` : undefined}
                  aria-pressed={isFocus ? isSelected : undefined}
                  aria-hidden={isFocus ? undefined : true}
                  onClick={state.regionId ? () => onSelectRegion(state.regionId!) : undefined}
                  onKeyDown={state.regionId ? (event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault()
                      if (!event.repeat) onSelectRegion(state.regionId!)
                    }
                  } : undefined}
                  className={isFocus ? `cursor-pointer transition-colors duration-200 focus:outline-none focus-visible:stroke-emerald-950 focus-visible:[stroke-width:3] motion-reduce:transition-none ${isSelected ? "hover:fill-emerald-800" : "hover:fill-emerald-300"}` : undefined}
                />
              )
            })}
            {australiaMapStates.filter((state) => state.shortName).map((state) => (
              <text
                key={state.code}
                x={state.label[0]}
                y={state.label[1]}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={selectedRegion === state.regionId ? "#ffffff" : state.regionId ? "#064e3b" : "#526b64"}
                fontSize={state.regionId ? 26 : 23}
                fontWeight={state.regionId ? 700 : 500}
                className="pointer-events-none select-none"
                aria-hidden="true"
              >
                {state.shortName}
              </text>
            ))}
          </svg>
          <div className="mb-3 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-slate-600">
            <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-sm border border-emerald-700/30 bg-emerald-200" aria-hidden="true" />Planning focus areas</span>
            <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-sm border border-slate-400/50 bg-[#e2e8e8]" aria-hidden="true" />Other states and territories</span>
          </div>
        </div>
      <p className="px-5 py-3 text-xs leading-relaxed text-slate-600 sm:px-6">Select a highlighted state to explore. These are planning focus areas, not statewide operating coverage or confirmed departures.</p>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-emerald-100 px-5 py-3 text-[11px] leading-relaxed text-slate-500 sm:px-6">
        <span>Generalised geographic boundaries · Mainland, Tasmania and nearby islands</span>
        <a href={australiaMapProvenance.sourceUrl} target="_blank" rel="noreferrer" className="rounded underline underline-offset-2 hover:text-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700">Map data: Natural Earth · Public domain<span className="sr-only"> (opens in a new tab)</span></a>
      </div>
    </div>
  )
}
