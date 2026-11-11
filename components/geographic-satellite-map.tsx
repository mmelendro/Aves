"use client";
import { useEffect, useRef, useState } from "react";
import { Map as GeographicMap, NavigationControl, ScaleControl, Marker } from "maplibre-gl";
import type { MapOptions } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import focus from "@/content/geographic-map-focus.json";
import { destinationRegions } from "@/content/destination-regions";
import { useMapLayers } from "./map-layer-context";

export type GeographicScope = {country:string;region?:string;selectCountry?:(id:string)=>void;selectRegion?:(id:string)=>void;onMapReady?:(map:GeographicMap|null)=>void};
type Focus = {bounds:number[];regions:Record<string,number[]>};
const countries=focus as unknown as Record<string,Focus>;
const tiles="https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless_3857/default/g/{z}/{y}/{x}.jpg";
const credit='EOxCloudless <a href="https://cloudless.eox.at">EOX IT Services GmbH</a> (Contains modified Copernicus Sentinel data 2016) · <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a> · <a href="https://maps.eox.at">EOX::Maps</a>';

/** The same tiled globe stays mounted while its country/region camera target changes.
 * No location permission, tracking, provider key or private trip data is required.
 */
export default function GeographicSatelliteMap({country,region="",selectCountry,selectRegion,onMapReady}:GeographicScope) {
  const container=useRef<HTMLDivElement>(null),map=useRef<GeographicMap|null>(null);
  const [ready,setReady]=useState(false),[failed,setFailed]=useState(false),[tileFailed,setTileFailed]=useState(false);
  const {update}=useMapLayers();
  const callbacks=useRef({selectCountry,selectRegion});callbacks.current={selectCountry,selectRegion};
  useEffect(()=>{
    if(!container.current)return;
    let current:GeographicMap;
    try {
      current=new GeographicMap({container:container.current,center:[-45,12],zoom:0.5,maxZoom:14,
        cooperativeGestures:true,attributionControl:{compact:false},
        style:{version:8,projection:{type:"globe"},sources:{satellite:{type:"raster",tiles:[tiles],tileSize:256,maxzoom:14,attribution:credit}},layers:[{id:"satellite",type:"raster",source:"satellite"}]}
      } satisfies MapOptions);
    } catch {setFailed(true);return;}
    map.current=current;
    current.addControl(new NavigationControl({showCompass:false}),"top-right");
    current.addControl(new ScaleControl(),"bottom-left");
    current.getCanvas().setAttribute("aria-label","Satellite globe. Use arrow keys to pan, plus and minus to zoom.");
    current.on("load",()=>{setReady(true);onMapReady?.(current)});
    current.on("error",()=>setTileFailed(true));
    const observer=new ResizeObserver(()=>current.resize());observer.observe(container.current);
    const resize=()=>current.resize();document.addEventListener("aves:map-resize",resize);
    return ()=>{observer.disconnect();document.removeEventListener("aves:map-resize",resize);onMapReady?.(null);current.remove();map.current=null;};
  },[]);
  useEffect(()=>{
    const current=map.current;if(!current||!ready)return;
    const bounds=countries[country]?.regions[region] ?? countries[country]?.bounds;
    const duration=window.matchMedia("(prefers-reduced-motion: reduce)").matches?0:650;
    if(bounds)current.fitBounds([[bounds[0],bounds[1]],[bounds[2],bounds[3]]],{padding:35,maxZoom:11,duration});
    else current.flyTo({center:[-45,12],zoom:.5,duration});
  },[country,region,ready]);
  useEffect(()=>{
    const current=map.current;if(!current||!ready)return;
    const targets=country ? (destinationRegions[country]??[]).map(r=>({id:r.id,name:r.name,bounds:countries[country]?.regions[r.id]})) : ["colombia","australia","new-zealand"].map(id=>({id,name:id==="new-zealand"?"New Zealand":id==="australia"?"Australia":"Colombia",bounds:countries[id].bounds}));
    const markers=targets.flatMap(target=>{
      if(!target.bounds)return [];
      const b=target.bounds,button=document.createElement("button");button.type="button";button.textContent=target.name;
      button.className="geographic-map-target";button.setAttribute("aria-label",`Explore ${target.name}`);
      button.setAttribute("aria-pressed",String(region===target.id));
      button.onclick=()=>country?callbacks.current.selectRegion?.(target.id):callbacks.current.selectCountry?.(target.id);
      return [new Marker({element:button}).setLngLat([(b[0]+b[2])/2,(b[1]+b[3])/2]).addTo(current)];
    });return ()=>markers.forEach(marker=>marker.remove());
  },[country,region,ready]);
  return <section data-geographic-satellite="true" className="geographic-map-shell" aria-label="Continuous satellite exploration">
    <div className="flex flex-wrap items-center gap-2 px-2 py-1">
      {selectCountry && <label className="text-xs">Destination <select aria-label="Satellite destination" value={country} onChange={e=>selectCountry(e.target.value)} className="min-h-11 max-w-full rounded-lg border bg-white px-2"><option value="">World</option><option value="colombia">Colombia</option><option value="australia">Australia</option><option value="new-zealand">New Zealand</option></select></label>}
      {country && selectRegion && <label className="text-xs">Region <select aria-label="Satellite region" value={region} onChange={e=>selectRegion(e.target.value)} className="min-h-11 max-w-full rounded-lg border bg-white px-2"><option value="">All regions</option>{(destinationRegions[country]??[]).map(r=><option key={r.id} value={r.id}>{r.name}</option>)}</select></label>}
      <button type="button" className="min-h-11 px-2 text-xs underline" onClick={()=>update({background:"habitats"})}>Planning map</button>
    </div>
    <div ref={container} className="geographic-map-canvas"/>
    {(failed||tileFailed) && <p role="status" className="px-2 text-xs">{failed?"Your browser could not open the satellite globe.":"Some satellite tiles could not load. Try another area or return to the planning map."}</p>}
    <p className="px-2 py-1 text-[10px] leading-4 text-gray-600">Satellite · 2016 composite · Historical landscape, not current conditions. Regional labels mark broad planning areas, not bird locations or ecological boundaries.</p>
  </section>;
}
