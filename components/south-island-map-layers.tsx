"use client"

import MapBackgroundToggle from "./map-background-toggle";
import {mapBackgroundChoices} from "@/content/map-basemaps";
import {renderMapLayerPicker,useMapLayerPicker} from "./map-layer-picker"
import catalogue from "@/content/south-island-layer-catalogue.json"
import { initialMapLayers, useMapLayers } from "./map-layer-context"
import { publicPlaceCategories, publicPlaces, reviewedPublicPlaces, visiblePublicPlaces } from "@/lib/south-island-public-places"

/** A compact picker overlays the map instead of pushing it out of its frame.
 * Multiple choices stay open while the map remains interactive. Native controls and a
 * persistent Explore/legend alternative keep small SVG features optional.
 */
export default function SouthIslandMapLayers() {
  const { layers, update } = useMapLayers()
  const picker=useMapLayerPicker()
  const {id}=picker
  const selected = layers.nationalParks ? catalogue.parks.find(park => park.id === layers.park) : undefined
  const points = visiblePublicPlaces(layers)
  const count = Number(layers.itinerary) + Number(layers.nationalParks) + Number(layers.conservation) + Number(layers.background!=="habitats"&&Boolean(layers.planningRegions)) + publicPlaceCategories.filter(category => layers[category.id]).length
  return renderMapLayerPicker({picker,scope:"south-island",title:"South Island",count,backgroundControl:<MapBackgroundToggle/>,children:<>
      <fieldset className="flex flex-wrap gap-1.5"><legend className="sr-only">Map background</legend>
        {mapBackgroundChoices.map(([value,label]) => <label key={value} className={`flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full border px-3 text-xs ${layers.background === value ? "border-emerald-700 bg-emerald-50 font-semibold text-emerald-950" : "border-emerald-100 bg-white text-emerald-900"}`}><input type="radio" name={`${id}-background`} aria-label={label} value={value} checked={layers.background === value} onChange={() => { update({background:value});  }}/>{label}</label>)}
      </fieldset>
    {layers.background !== "habitats" && <div className="mt-2 rounded-xl border border-emerald-100 bg-white/90 px-3 py-2">
      <label htmlFor={`${id}-opacity`} className="flex flex-wrap justify-between gap-1 text-xs font-medium text-emerald-950"><span>Selected habitat shading</span><span>{Math.round(layers.overlayOpacity * 100)}%</span></label>
      <input id={`${id}-opacity`} type="range" min="0" max="1" step=".05" value={layers.overlayOpacity} onChange={event => update({overlayOpacity:Number(event.target.value)})} className="min-h-11 w-full accent-emerald-700" aria-describedby={`${id}-opacity-help`} />
      <p id={`${id}-opacity-help`} className="text-[11px] leading-5 text-gray-600">Choose a habitat to shade its mapped areas. At 0%, only its outline remains. All habitats shows the imagery without shading. Coast uses the shoreline only.</p>
    </div>}
      <label className="flex min-h-11 cursor-pointer items-center gap-2"><input type="checkbox" checked={layers.itinerary} onChange={event => { update({itinerary:event.target.checked});  }}/>My itinerary · base order, not roads</label>
      {layers.background!=="habitats"&&<label className="flex min-h-11 cursor-pointer items-center gap-2"><input type="checkbox" checked={layers.planningRegions} onChange={event=>{update({planningRegions:event.target.checked});}}/>Planning regions</label>}
      <fieldset><legend className="font-semibold text-emerald-950">Conservation layers</legend>
        <label className="flex min-h-11 cursor-pointer items-center gap-2"><input type="checkbox" checked={layers.nationalParks} onChange={event => { update({nationalParks:event.target.checked});  }}/><span className="h-2 w-3 border-2 border-amber-500" aria-hidden="true"/>National parks · 9</label>
        <label className="flex min-h-11 cursor-pointer items-center gap-2"><input type="checkbox" checked={layers.conservation} onChange={event => { update({conservation:event.target.checked});  }}/><span className="h-2 w-3 border border-lime-700" style={{backgroundImage:"repeating-linear-gradient(135deg,transparent,transparent 2px,#4d7c0f 2px,#4d7c0f 3px)"}} aria-hidden="true"/>Public conservation land · DOC</label>
      </fieldset>
      {layers.nationalParks && <div className="mt-1"><label htmlFor={`${id}-park`} className="block font-medium text-emerald-950">Preview a national park</label><select id={`${id}-park`} className="mt-1 min-h-11 w-full min-w-0 rounded-lg border border-emerald-200 bg-white px-2" value={layers.park} onChange={event => { update({park:event.target.value,point:""});  }}><option value="">All national parks</option>{catalogue.parks.map(park => <option key={park.id} value={park.id}>{park.name}</option>)}</select></div>}
      <fieldset className="mt-2 border-t border-emerald-100 pt-2"><legend className="font-semibold text-emerald-950">Public places · curated pilot</legend>
        {publicPlaceCategories.map(category => <label key={category.id} className="flex min-h-11 cursor-pointer items-center gap-2"><input type="checkbox" checked={layers[category.id]} onChange={event => { update({[category.id]:event.target.checked});  }}/><span className="h-2 w-2 shrink-0 rounded-full" style={{background:category.colour}} aria-hidden="true"/>{category.name} · {reviewedPublicPlaces().filter(point => point.categories.includes(category.id)).length}</label>)}
      </fieldset>
      {points.length>0 && <div className="mt-1"><label htmlFor={`${id}-place`} className="block font-medium text-emerald-950">Preview a public place</label><select id={`${id}-place`} className="mt-1 min-h-11 w-full min-w-0 rounded-lg border border-emerald-200 bg-white px-2" value={points.some(point=>point.id===layers.point) ? layers.point : ""} onChange={event => { update({point:event.target.value,park:""});  }}><option value="">Choose a place</option>{points.map(point => <option key={point.id} value={point.id}>{point.name}</option>)}</select></div>}
      {layers.bcorps && <p className="mt-2 text-[11px] text-gray-600">B Corp pilot: accommodation, food and drink, guided tours and retail. Company certification, not a rating of each visit. Source dates and scope appear with each place.</p>}
      <p className="mt-2 text-[11px] text-gray-600">Map context, not bird-range filters or permission to enter. DOC land includes national parks; other privately conserved areas may be absent.</p>
      <p className="mt-1 text-[11px] text-gray-600">{publicPlaces.coverage}</p>
      <div className="mt-1 flex flex-wrap justify-between gap-1"><button type="button" className="min-h-11 rounded px-2 font-semibold text-emerald-800 underline" onClick={() => { update(initialMapLayers);  }}>Reset map layers</button></div>
      {selected && <p role="status" className="mt-1 text-xs font-semibold leading-5 text-emerald-950">{selected.name} · park boundary preview</p>}
  </>})
}
