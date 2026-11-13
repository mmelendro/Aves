"use client";
import type {ReactNode} from "react";
import {MapLayerProvider,useMapLayers} from "./map-layer-context";
import MapBackgroundToggle from "./map-background-toggle";
import {mapBackgroundChoices} from "@/content/map-basemaps";
import {renderMapLayerPicker,useMapLayerPicker} from "./map-layer-picker";
const names:Record<string,string>={colombia:"Colombia",australia:"Australia","new-zealand":"New Zealand"};
const parkLabels:Record<string,string>={colombia:"National protected areas · 109",australia:"National parks · 13 selected","new-zealand":"North Island & Rakiura parks · 4"};

/** Shared public display choices, independent of bird conservation filters. */
export function CountrySatelliteControl({country,region=""}:{country:string;region?:string}){
  const {layers,update}=useMapLayers(),picker=useMapLayerPicker();
  const satellite=layers.background!=="habitats",title=names[country]??"World";
  const north=country==="new-zealand"&&region==="north-island";
  const count=satellite&&country?Number(layers.planningRegions)+Number(layers.protectedAreas)+(north?Number(layers.planning)+Number(layers.itinerary):0):0;
  return renderMapLayerPicker({picker,scope:country||"world",title,count,backgroundControl:<MapBackgroundToggle/>,children:<>
    <fieldset className="mt-2"><legend className="font-semibold">Map background</legend>
      {mapBackgroundChoices.map(([value,label])=><label key={value} className="flex min-h-11 cursor-pointer items-center gap-2"><input type="radio" name={`${picker.id}-background`} aria-label={label} checked={layers.background===value} onChange={()=>{update({background:value});}}/>{label}</label>)}
    </fieldset>
    {satellite&&country&&<fieldset className="mt-2 border-t border-emerald-100 pt-2"><legend className="font-semibold">Display overlays</legend>
      <label className="flex min-h-11 cursor-pointer items-center gap-2"><input type="checkbox" checked={layers.planningRegions} onChange={event=>{update({planningRegions:event.target.checked});}}/><span aria-hidden="true" className="h-2 w-3 border border-emerald-700"/>Planning regions</label>
      {parkLabels[country]&&<label className="flex min-h-11 cursor-pointer items-center gap-2"><input type="checkbox" checked={layers.protectedAreas} onChange={event=>{update({protectedAreas:event.target.checked});}}/><span aria-hidden="true" className="h-2 w-3 border-2 border-amber-500"/>{parkLabels[country]}</label>}
      {north&&<><label className="flex min-h-11 cursor-pointer items-center gap-2"><input type="checkbox" checked={layers.planning} onChange={e=>{update({planning:e.target.checked});}}/>Trip planning bases · 3</label><label className="flex min-h-11 cursor-pointer items-center gap-2"><input type="checkbox" checked={layers.itinerary} onChange={e=>{update({itinerary:e.target.checked});}}/>My itinerary · base order, not roads</label></>}
    </fieldset>}
    {satellite&&country&&<label className="mt-2 block">Area shading · {Math.round(layers.overlayOpacity*100)}%<input aria-label="Area shading opacity" type="range" min="0" max="1" step=".05" value={layers.overlayOpacity} onChange={e=>update({overlayOpacity:Number(e.target.value)})} className="min-h-11 w-full"/></label>}
    <p className="mt-2 border-t border-emerald-100 pt-2 text-gray-600">Display layers change the map, not your bird choices. Bird filters have their own control. {satellite?"Satellite imagery is a historical 2016 composite. Park outlines do not establish access, current habitat or sightings.":"Planning geography is generalised. Select Satellite for the geographic overlays."}</p>
    {satellite&&country&&<p className="mt-2 text-gray-600">Open Explore areas on the map for each dataset’s source, date, licence and coverage limits.</p>}
  </>});
}
export function CountrySatelliteScope({children}:{children:ReactNode}){
  return <MapLayerProvider>{children}</MapLayerProvider>;
}
