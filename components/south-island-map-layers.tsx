"use client"

import { useId } from "react"
import catalogue from "@/content/south-island-layer-catalogue.json"
import { useMapLayers } from "./map-layer-context"

/** Native controls stay outside SVG and remain usable when imagery is unavailable. */
export default function SouthIslandMapLayers() {
  const { layers, update } = useMapLayers()
  const id = useId()
  const selected = layers.nationalParks ? catalogue.parks.find(park => park.id === layers.park) : undefined
  return <><details className="my-2 shrink-0 rounded-xl border border-emerald-100 bg-white/80" data-map-layer-panel="south-island">
    <summary className="min-h-11 cursor-pointer px-3 py-3 text-xs font-semibold text-emerald-900">Map layers: satellite, parks & conservation</summary>
    <div className="space-y-3 border-t border-emerald-100 px-3 pb-3 pt-2 text-xs leading-5">
      <fieldset><legend className="font-semibold text-emerald-950">Background</legend>
        {([['habitats','Habitats'],['satellite','Satellite overview · 2004']] as const).map(([value,label]) => <label key={value} className="flex min-h-11 cursor-pointer items-center gap-2"><input type="radio" name={`${id}-background`} value={value} checked={layers.background === value} onChange={() => update({background:value})}/>{label}</label>)}
      </fieldset>
      <fieldset><legend className="font-semibold text-emerald-950">Conservation layers</legend>
        <label className="flex min-h-11 cursor-pointer items-center gap-2"><input type="checkbox" checked={layers.nationalParks} onChange={event => update({nationalParks:event.target.checked})}/>National parks · 9</label>
        <label className="flex min-h-11 cursor-pointer items-center gap-2"><input type="checkbox" checked={layers.conservation} onChange={event => update({conservation:event.target.checked})}/>Public conservation land · DOC</label>
      </fieldset>
      {layers.nationalParks && <div><label htmlFor={`${id}-park`} className="block font-medium text-emerald-950">Preview a national park</label><select id={`${id}-park`} className="mt-1 min-h-11 w-full min-w-0 rounded-lg border border-emerald-200 bg-white px-2" value={layers.park} onChange={event => update({park:event.target.value})}><option value="">All national parks</option>{catalogue.parks.map(park => <option key={park.id} value={park.id}>{park.name}</option>)}</select></div>}

      {(layers.nationalParks || layers.conservation) && <div className="text-[11px] text-gray-600"><p><span aria-hidden="true" className="mr-1 inline-block h-2 w-4 border-2 border-amber-700"/>National parks. <span aria-hidden="true" className="ml-1 mr-1 inline-block h-2 w-4 bg-lime-700/30"/>DOC public conservation land includes national parks.</p><p>Generalised from DOC geometry, retrieved 9 November 2026. Small parcels and nearby islands may be omitted. This is not every protected or privately conserved area and does not grant access.</p><a href={catalogue.source.url} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center underline">DOC data & metadata (opens in a new tab)</a><p>{catalogue.source.copyright} · <a href={catalogue.source.licenceUrl} target="_blank" rel="noreferrer" className="underline">CC BY 4.0</a> · clipped and generalised by AVES.</p></div>}
      {layers.background === "satellite" && <p className="text-[11px] text-gray-600">NASA Earth Observatory, Blue Marble Next Generation. Historical 2004 satellite composite, supplied through GIBS and served by AVES. A broad landscape overview, not live imagery or a road map. Bird filters remain active; land-cover colours are hidden.</p>}
      <button type="button" className="min-h-11 rounded px-2 font-semibold text-emerald-800 underline" onClick={() => update({background:"habitats",nationalParks:false,conservation:false,park:""})}>Reset map layers</button>
    </div>
  </details>
    {selected && <div role="status" className="rounded-lg bg-emerald-50 p-3 text-emerald-950"><p className="font-semibold">{selected.name}</p><p>National park boundary. Preview only; check DOC for visitor access, alerts and permits.</p></div>}
  </>
}
