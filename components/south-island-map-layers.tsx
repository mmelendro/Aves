"use client"

import { useId, useRef, useState } from "react"
import { SlidersHorizontal } from "lucide-react"
import catalogue from "@/content/south-island-layer-catalogue.json"
import { initialMapLayers, useMapLayers } from "./map-layer-context"
import { publicPlaceCategories, publicPlaces, reviewedPublicPlaces, visiblePublicPlaces } from "@/lib/south-island-public-places"

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
  const points = visiblePublicPlaces(layers)
  const count = Number(layers.nationalParks) + Number(layers.conservation) + publicPlaceCategories.filter(category => layers[category.id]).length
  function close() { setOpen(false); button.current?.focus({preventScroll:true}) }
  return <div className="static shrink-0" data-map-layer-panel="south-island" onKeyDown={event => { if (event.key === "Escape" && open) { event.preventDefault(); close() } }}>
    <div className="flex">
      <button ref={button} type="button" className="relative inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-emerald-200 bg-white text-emerald-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700" aria-label="Map layers" title="Map layers and background" aria-expanded={open} aria-controls={`${id}-layers`} onClick={() => setOpen(value => !value)}><SlidersHorizontal size={18} aria-hidden="true"/>{count > 0 && <span aria-hidden="true" className="absolute -right-1 -top-1 rounded-full bg-emerald-800 px-1 text-[9px] text-white">{count}</span>}</button>
    </div>
    {open && <section id={`${id}-layers`} aria-label="South Island layer choices" className="absolute inset-x-2 bottom-24 z-30 max-h-[min(24rem,75%)] overflow-auto overscroll-contain rounded-xl border border-emerald-200 bg-white p-3 text-xs leading-5 shadow-lg">
      <fieldset className="flex flex-wrap gap-1.5"><legend className="sr-only">Map background</legend>
        {([['habitats','Habitats','Habitats'],['satellite','Satellite · 2004','Satellite overview · 2004']] as const).map(([value,label,accessible]) => <label key={value} className={`flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full border px-3 text-xs ${layers.background === value ? "border-emerald-700 bg-emerald-50 font-semibold text-emerald-950" : "border-emerald-100 bg-white text-emerald-900"}`}><input type="radio" name={`${id}-background`} aria-label={accessible} value={value} checked={layers.background === value} onChange={() => { update({background:value}); setOpen(false) }}/>{label}</label>)}
      </fieldset>
    {layers.background === "satellite" && <div className="mt-2 rounded-xl border border-emerald-100 bg-white/90 px-3 py-2">
      <label htmlFor={`${id}-opacity`} className="flex flex-wrap justify-between gap-1 text-xs font-medium text-emerald-950"><span>Selected habitat shading</span><span>{Math.round(layers.overlayOpacity * 100)}%</span></label>
      <input id={`${id}-opacity`} type="range" min="0" max="1" step=".05" value={layers.overlayOpacity} onChange={event => update({overlayOpacity:Number(event.target.value)})} className="min-h-11 w-full accent-emerald-700" aria-describedby={`${id}-opacity-help`} />
      <p id={`${id}-opacity-help`} className="text-[11px] leading-5 text-gray-600">Choose a habitat to shade its mapped areas. At 0%, only its outline remains. All habitats shows the imagery without shading. Coast uses the shoreline only.</p>
    </div>}
      <fieldset><legend className="font-semibold text-emerald-950">Conservation layers</legend>
        <label className="flex min-h-11 cursor-pointer items-center gap-2"><input type="checkbox" checked={layers.nationalParks} onChange={event => { update({nationalParks:event.target.checked}); close() }}/><span className="h-2 w-3 border-2 border-amber-700" aria-hidden="true"/>National parks · 9</label>
        <label className="flex min-h-11 cursor-pointer items-center gap-2"><input type="checkbox" checked={layers.conservation} onChange={event => { update({conservation:event.target.checked}); close() }}/><span className="h-2 w-3 border border-lime-700" style={{backgroundImage:"repeating-linear-gradient(135deg,transparent,transparent 2px,#4d7c0f 2px,#4d7c0f 3px)"}} aria-hidden="true"/>Public conservation land · DOC</label>
      </fieldset>
      {layers.nationalParks && <div className="mt-1"><label htmlFor={`${id}-park`} className="block font-medium text-emerald-950">Preview a national park</label><select id={`${id}-park`} className="mt-1 min-h-11 w-full min-w-0 rounded-lg border border-emerald-200 bg-white px-2" value={layers.park} onChange={event => { update({park:event.target.value,point:""}); close() }}><option value="">All national parks</option>{catalogue.parks.map(park => <option key={park.id} value={park.id}>{park.name}</option>)}</select></div>}
      <fieldset className="mt-2 border-t border-emerald-100 pt-2"><legend className="font-semibold text-emerald-950">Public places · curated pilot</legend>
        {publicPlaceCategories.map(category => <label key={category.id} className="flex min-h-11 cursor-pointer items-center gap-2"><input type="checkbox" checked={layers[category.id]} onChange={event => { update({[category.id]:event.target.checked}); close() }}/><span className="h-2 w-2 shrink-0 rounded-full" style={{background:category.colour}} aria-hidden="true"/>{category.name} · {reviewedPublicPlaces().filter(point => point.categories.includes(category.id)).length}</label>)}
      </fieldset>
      {points.length>0 && <div className="mt-1"><label htmlFor={`${id}-place`} className="block font-medium text-emerald-950">Preview a public place</label><select id={`${id}-place`} className="mt-1 min-h-11 w-full min-w-0 rounded-lg border border-emerald-200 bg-white px-2" value={points.some(point=>point.id===layers.point) ? layers.point : ""} onChange={event => { update({point:event.target.value,park:""}); close() }}><option value="">Choose a place</option>{points.map(point => <option key={point.id} value={point.id}>{point.name}</option>)}</select></div>}
      {layers.bcorps && <p className="mt-2 text-[11px] text-gray-600">B Corp pilot: accommodation, food and drink, guided tours and retail. Company certification, not a rating of each visit. Source dates and scope appear with each place.</p>}
      <p className="mt-2 text-[11px] text-gray-600">Map context, not bird-range filters or permission to enter. DOC land includes national parks; other privately conserved areas may be absent.</p>
      <p className="mt-1 text-[11px] text-gray-600">{publicPlaces.coverage}</p>
      <div className="mt-1 flex flex-wrap justify-between gap-1"><button type="button" className="min-h-11 rounded px-2 font-semibold text-emerald-800 underline" onClick={() => { update(initialMapLayers); close() }}>Reset map layers</button><button type="button" className="min-h-11 rounded px-2 font-semibold text-emerald-800 underline" onClick={close}>Close layers</button></div>
      {selected && <p role="status" className="mt-1 text-xs font-semibold leading-5 text-emerald-950">{selected.name} · park boundary preview</p>}
    </section>}
  </div>
}
