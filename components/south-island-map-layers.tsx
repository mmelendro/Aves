"use client"

import { useId, useRef, useState } from "react"
import catalogue from "@/content/south-island-layer-catalogue.json"
import { useMapLayers } from "./map-layer-context"

/** A compact picker overlays the map instead of pushing it out of its frame.
 * Each choice closes the picker, revealing its effect. Native controls and a
 * persistent Explore/legend alternative keep small SVG features optional.
 */
export default function SouthIslandMapLayers() {
  const { layers, update } = useMapLayers()
  const [open, setOpen] = useState(false)
  const button = useRef<HTMLButtonElement>(null)
  const id = useId()
  const selected = layers.nationalParks ? catalogue.parks.find(park => park.id === layers.park) : undefined
  function close() { setOpen(false); button.current?.focus({preventScroll:true}) }
  return <div className="relative z-20 my-2 shrink-0" data-map-layer-panel="south-island" onKeyDown={event => { if (event.key === "Escape" && open) { event.preventDefault(); close() } }}>
    <div className="flex flex-wrap items-center gap-1.5">
      <fieldset className="flex flex-wrap gap-1.5"><legend className="sr-only">Map background</legend>
        {([['habitats','Habitats','Habitats'],['satellite','Satellite · 2004','Satellite overview · 2004']] as const).map(([value,label,accessible]) => <label key={value} className={`flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full border px-3 text-xs ${layers.background === value ? "border-emerald-700 bg-emerald-50 font-semibold text-emerald-950" : "border-emerald-100 bg-white text-emerald-900"}`}><input type="radio" name={`${id}-background`} aria-label={accessible} value={value} checked={layers.background === value} onChange={() => { update({background:value}); setOpen(false) }}/>{label}</label>)}
      </fieldset>
      <button ref={button} type="button" className="min-h-11 rounded-full border border-emerald-200 bg-white px-3 text-xs font-semibold text-emerald-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700" aria-expanded={open} aria-controls={`${id}-layers`} onClick={() => setOpen(value => !value)}>Map layers{layers.nationalParks || layers.conservation ? ` · ${Number(layers.nationalParks)+Number(layers.conservation)}` : ""}</button>
    </div>
    {open && <section id={`${id}-layers`} aria-label="South Island layer choices" className="absolute inset-x-0 top-full z-30 mt-1 max-h-[min(18rem,60vh)] overflow-auto overscroll-contain rounded-xl border border-emerald-200 bg-white p-3 text-xs leading-5 shadow-lg">
      <fieldset><legend className="font-semibold text-emerald-950">Conservation layers</legend>
        <label className="flex min-h-11 cursor-pointer items-center gap-2"><input type="checkbox" checked={layers.nationalParks} onChange={event => { update({nationalParks:event.target.checked}); close() }}/><span className="h-2 w-3 border-2 border-amber-700" aria-hidden="true"/>National parks · 9</label>
        <label className="flex min-h-11 cursor-pointer items-center gap-2"><input type="checkbox" checked={layers.conservation} onChange={event => { update({conservation:event.target.checked}); close() }}/><span className="h-2 w-3 bg-lime-700/30" aria-hidden="true"/>Public conservation land · DOC</label>
      </fieldset>
      {layers.nationalParks && <div className="mt-1"><label htmlFor={`${id}-park`} className="block font-medium text-emerald-950">Preview a national park</label><select id={`${id}-park`} className="mt-1 min-h-11 w-full min-w-0 rounded-lg border border-emerald-200 bg-white px-2" value={layers.park} onChange={event => { update({park:event.target.value}); close() }}><option value="">All national parks</option>{catalogue.parks.map(park => <option key={park.id} value={park.id}>{park.name}</option>)}</select></div>}
      <p className="mt-2 text-[11px] text-gray-600">Map context, not bird-range filters or permission to enter. DOC land includes national parks; other privately conserved areas may be absent.</p>
      <div className="mt-1 flex flex-wrap justify-between gap-1"><button type="button" className="min-h-11 rounded px-2 font-semibold text-emerald-800 underline" onClick={() => { update({background:"habitats",nationalParks:false,conservation:false,park:""}); close() }}>Reset map layers</button><button type="button" className="min-h-11 rounded px-2 font-semibold text-emerald-800 underline" onClick={close}>Close layers</button></div>
    </section>}
    {selected && <p role="status" className="mt-1 text-xs font-semibold leading-5 text-emerald-950">{selected.name} · park boundary preview</p>}
  </div>
}
