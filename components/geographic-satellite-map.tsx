"use client";
import dynamic from "next/dynamic";
import {useEffect,useRef,useState} from "react";
import {map as createMap,tileLayer,marker,divIcon,control,type Map as GeographicMap} from "leaflet";
import "leaflet/dist/leaflet.css";
import focus from "@/content/geographic-map-focus.json";
import {createMapCameraMemory,mapCameraKey} from "@/lib/map-camera-memory";
import {destinationRegions} from "@/content/destination-regions";
import {useMapLayers} from "./map-layer-context";

export type GeographicScope={country:string;region?:string;selectCountry?:(id:string)=>void;selectRegion?:(id:string)=>void;onMapReady?:(map:GeographicMap|null)=>void};
const GeographicProtectedAreas=dynamic(()=>import("./geographic-protected-areas"),{ssr:false});
const AustraliaProtectedAreas=dynamic(()=>import("./australia-protected-areas"),{ssr:false});
const NewZealandProtectedAreas=dynamic(()=>import("./new-zealand-protected-areas"),{ssr:false});
const NorthIslandPlanningLayer=dynamic(()=>import("./north-island-planning-layer"),{ssr:false});
const GeographicPlanningLayer=dynamic(()=>import("./geographic-planning-layer"),{ssr:false});
type Focus={bounds:number[];regions:Record<string,number[]>};
const countries=focus as unknown as Record<string,Focus>;
const cameraMemory=createMapCameraMemory();
const tiles="https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless_3857/default/g/{z}/{y}/{x}.jpg";
const credit='EOxCloudless <a href="https://cloudless.eox.at">EOX IT Services GmbH</a> (Contains modified Copernicus Sentinel data 2016) · <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a> · <a href="https://maps.eox.at">EOX::Maps</a>';

/** A single geographic tile engine remains mounted through country/region choices.
 * Only a public display preference is stored; no location permission or private trip data is sent.
 */
export default function GeographicSatelliteMap({country,region="",selectCountry,selectRegion,onMapReady}:GeographicScope){
  const container=useRef<HTMLDivElement>(null),map=useRef<GeographicMap|null>(null);
  const [ready,setReady]=useState(false),[failed,setFailed]=useState(false),[tileFailed,setTileFailed]=useState(false),[move,setMove]=useState(false);
  const {layers}=useMapLayers();
  const regionPicker=useRef<HTMLSelectElement>(null);
  const cameraScope=useRef(mapCameraKey(country,region));
  const showPlanning=Boolean(country&&layers.planningRegions);
  const activateRegion=(id:string)=>{callbacks.current.selectRegion?.(id);regionPicker.current?.focus({preventScroll:true});};
  const callbacks=useRef({selectCountry,selectRegion});callbacks.current={selectCountry,selectRegion};
  const resetCamera=()=>{
    const current=map.current;if(!current)return;
    current.stop();
    const bounds=countries[country]?.regions[region]??countries[country]?.bounds;
    if(bounds)current.fitBounds([[bounds[1],bounds[0]],[bounds[3],bounds[2]]],{padding:[28,28],maxZoom:11,animate:false});
    else current.setView([12,-45],1,{animate:false});
  };
  useEffect(()=>{
    if(!container.current)return;
    let current:GeographicMap;
    try{
      current=createMap(container.current,{center:[12,-45],zoom:1,minZoom:1,maxZoom:14,scrollWheelZoom:false,dragging:false,zoomControl:false,attributionControl:true,worldCopyJump:true});
      map.current=current;
      current.on("moveend",()=>{const centre=current.getCenter();cameraMemory.remember(cameraScope.current,{centre:[centre.lat,centre.lng],zoom:current.getZoom()});});
      tileLayer(tiles,{tileSize:256,maxNativeZoom:14,maxZoom:14,attribution:credit,keepBuffer:1,updateWhenIdle:true}).on("tileerror",()=>setTileFailed(true)).addTo(current);
      current.createPane("habitatPane").style.zIndex="350";
      current.createPane("protectedAreasPane").style.zIndex="360";
      current.createPane("routePane").style.zIndex="650";
      current.createPane("planningRegionsPane").style.zIndex="340";
      control.zoom({position:"topright"}).addTo(current);control.scale({imperial:false}).addTo(current);
      container.current.setAttribute("aria-label","Satellite map. Use arrow keys to pan, plus and minus to zoom.");
      if(window.matchMedia("(pointer:fine)").matches){current.dragging.enable();setMove(true);}
      setReady(true);onMapReady?.(current);
    }catch{setFailed(true);return;}
    const observer=new ResizeObserver(()=>current.invalidateSize({pan:false}));observer.observe(container.current);
    const resize=()=>current.invalidateSize({pan:false});document.addEventListener("aves:map-resize",resize);
    return()=>{observer.disconnect();document.removeEventListener("aves:map-resize",resize);onMapReady?.(null);current.remove();map.current=null;};
  },[]);
  useEffect(()=>{
    const current=map.current;if(!current||!ready)return;
    // A scope selection must finish even if expansion/resizing interrupts a zoom animation.
    // Native drag/pinch/zoom remains available after this deterministic camera move.
    const key=mapCameraKey(country,region),remembered=cameraMemory.recall(key);
    current.stop();cameraScope.current=key;
    if(remembered)current.setView(remembered.centre,remembered.zoom,{animate:false});
    else resetCamera();
  },[country,region,ready]);
  useEffect(()=>{
    const current=map.current;if(!current||!ready)return;
    const targets=country?(destinationRegions[country]??[]).map(r=>({id:r.id,name:r.name,bounds:countries[country]?.regions[r.id]})):["colombia","australia","new-zealand"].map(id=>({id,name:id==="new-zealand"?"New Zealand":id==="australia"?"Australia":"Colombia",bounds:countries[id].bounds}));
    // Enabled polygons provide the targets and selected label. Avoid stacking
    // large region pills over their outlines; the native selector remains.
    const markers=(showPlanning?[]:targets).flatMap(target=>{
      if(!target.bounds)return[];
      const b=target.bounds,button=document.createElement("button");button.type="button";button.textContent=target.name;button.className="geographic-map-target";
      button.setAttribute("aria-label",`Explore ${target.name}`);button.setAttribute("aria-pressed",String(region===target.id));
      button.onclick=()=>country?callbacks.current.selectRegion?.(target.id):callbacks.current.selectCountry?.(target.id);
      return[marker([(b[1]+b[3])/2,(b[0]+b[2])/2],{icon:divIcon({html:button,className:"geographic-map-marker",iconSize:[0,0]}),keyboard:false}).addTo(current)];
    });return()=>markers.forEach(m=>m.remove());
  },[country,region,ready,showPlanning]);
  return <section data-geographic-satellite="true" className="geographic-map-shell" aria-label="Continuous satellite exploration">
    <div className="flex flex-wrap items-center gap-2 px-2 py-1">
      {selectCountry&&<label className="text-xs">Destination <select aria-label="Satellite destination" value={country} onChange={e=>selectCountry(e.target.value)} className="min-h-11 max-w-full rounded-lg border bg-white px-2"><option value="">World</option><option value="colombia">Colombia</option><option value="australia">Australia</option><option value="new-zealand">New Zealand</option></select></label>}
      {country&&selectRegion&&<label className="text-xs">Region <select ref={regionPicker} aria-label="Satellite region" value={region} onChange={e=>selectRegion(e.target.value)} className="min-h-11 max-w-full rounded-lg border bg-white px-2"><option value="">All regions</option>{(destinationRegions[country]??[]).map(r=><option key={r.id} value={r.id}>{r.name}</option>)}</select></label>}
      <button type="button" className="min-h-11 px-2 text-xs underline" onClick={resetCamera}>Reset satellite view</button>
      <button type="button" className="min-h-11 px-2 text-xs underline" aria-pressed={move} onClick={()=>{const next=!move;setMove(next);if(next)map.current?.dragging.enable();else map.current?.dragging.disable();}}>Move map</button>
    </div>
    {ready&&map.current&&country==="colombia"&&<GeographicProtectedAreas map={map.current}/>}
    {ready&&map.current&&country==="australia"&&<AustraliaProtectedAreas map={map.current}/>}
    {ready&&map.current&&country==="new-zealand"&&region!=="south-island"&&<NewZealandProtectedAreas map={map.current}/>}
    {ready&&map.current&&country==="new-zealand"&&region==="north-island"&&<NorthIslandPlanningLayer map={map.current}/>}
    <div ref={container} className="geographic-map-canvas"/>
    {ready&&map.current&&showPlanning&&<GeographicPlanningLayer map={map.current} country={country} region={region} onSelect={activateRegion}/>}
    {country&&<p className="px-2 py-1 text-[10px] leading-4 text-emerald-950">{country==="colombia"?"Planning regions: adjoining AVES areas with shared edges. Approximate planning boundaries, not official boundaries or bird ranges.":country==="australia"?"Planning regions follow generalised state and territory boundaries.":"Planning regions follow the three main island groups; outlying islands are omitted."} <a href="https://www.naturalearthdata.com/" target="_blank" rel="noreferrer" className="underline">Natural Earth geography</a>{country==="colombia"?" · Areas authored by AVES":" · Public domain"}.</p>}
    {(failed||tileFailed)&&<p role="status" className="px-2 text-xs">{failed?"The satellite map could not open. The planning map remains available.":"Some satellite tiles could not load. Try another area or return to the planning map."}</p>}
    <p className="px-2 py-1 text-[10px] leading-4 text-gray-600">Satellite · 2016 composite · Historical landscape, not current conditions. Regional labels mark broad planning areas, not bird locations or ecological boundaries. Use Move for dragging; pinch or use + / − for detail.</p>
  </section>;
}
