"use client"

/** Geometry loads only when a visitor enables a conservation layer. */
import data from "@/content/south-island-conservation-layers.json"
import {requestMapPhotos} from "@/lib/map-photo-request"
import { useMapLayers } from "./map-layer-context"
import { useId } from "react"

export default function SouthIslandConservationOverlay() {
  const { layers, update } = useMapLayers()
  const pattern = useId()
  return <g data-conservation-overlays="south-island">
    <defs><pattern id={pattern} width="8" height="8" patternUnits="userSpaceOnUse"><path d="M-2 2L2-2M0 8L8 0M6 10L10 6" stroke="#4d7c0f" strokeWidth="1" opacity=".55"/></pattern></defs>
    {layers.conservation && <path d={data.conservationPath} fill={`url(#${pattern})`} stroke="#4d7c0f" strokeWidth=".6" fillRule="evenodd" vectorEffect="non-scaling-stroke" pointerEvents="none" data-map-layer="conservation"/>}
    {layers.nationalParks && data.parks.map(park => <g key={park.id} role="button" tabIndex={0} aria-label={`Preview park: ${park.name}`} aria-pressed={layers.park === park.id} onClick={() => {update({park:park.id,point:""});requestMapPhotos({countryId:"new-zealand",kind:"place",placeId:park.id,name:park.name})}} onKeyDown={event => { if ((event.key === "Enter" || event.key === " ") && !event.repeat) { event.preventDefault(); update({park:park.id,point:""});requestMapPhotos({countryId:"new-zealand",kind:"place",placeId:park.id,name:park.name}) } }} className="cursor-pointer outline-none focus-visible:[&>path]:stroke-emerald-950 focus-visible:[&>path]:[stroke-width:3]">
      <title>{park.name}</title><path d={park.path} fill={layers.park === park.id ? "#b45309" : "#f59e0b"} fillOpacity={layers.park === park.id ? .28 : .08} stroke="#b45309" strokeWidth={layers.park === park.id ? 2.2 : 1.1} fillRule="evenodd" strokeLinejoin="round" vectorEffect="non-scaling-stroke" data-map-layer="national-parks"/>
    </g>)}
  </g>
}
