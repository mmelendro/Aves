"use client";
import {requestMapPhotos} from "@/lib/map-photo-request";
import {mapBasemaps} from "@/content/map-basemaps";
import {useMapControlsRegistration} from "./map-controls-context";
import dynamic from "next/dynamic";
import {useCallback,useEffect,useRef,useState} from "react";
import {map as createMap,tileLayer,marker,divIcon,control,type TileLayer,type Map as GeographicMap} from "leaflet";
import "leaflet/dist/leaflet.css";
import focus from "@/content/geographic-map-focus.json";
import {createMapCameraMemory,mapCameraKey} from "@/lib/map-camera-memory";
import {destinationRegions} from "@/content/destination-regions";
import {useMapLayers} from "./map-layer-context";

export type GeographicScope={country:string;region?:string;highlightRegion?:string;selectCountry?:(id:string)=>void;selectRegion?:(id:string)=>void;onMapReady?:(map:GeographicMap|null)=>void};
const GeographicPlanningWorld=dynamic(()=>import("./geographic-planning-world"),{ssr:false});
const GeographicProtectedAreas=dynamic(()=>import("./geographic-protected-areas"),{ssr:false});
const AustraliaProtectedAreas=dynamic(()=>import("./australia-protected-areas"),{ssr:false});
const NewZealandProtectedAreas=dynamic(()=>import("./new-zealand-protected-areas"),{ssr:false});
const NorthIslandPlanningLayer=dynamic(()=>import("./north-island-planning-layer"),{ssr:false});
const GeographicPlanningLayer=dynamic(()=>import("./geographic-planning-layer"),{ssr:false});
type Focus={bounds:number[];regions:Record<string,number[]>};
const countries=focus as unknown as Record<string,Focus>;
const cameraMemory=createMapCameraMemory();


/** A single geographic tile engine remains mounted through country/region choices.
 * Only a public display preference is stored; no location permission or private trip data is sent.
 */
export default function GeographicSatelliteMap({country,region="",highlightRegion="",selectCountry,selectRegion,onMapReady}:GeographicScope){
  const basemap=useRef<TileLayer|null>(null);
  const [initAttempt,setInitAttempt]=useState(0);
  const container=useRef<HTMLDivElement>(null),map=useRef<GeographicMap|null>(null);
  const [ready,setReady]=useState(false),[failed,setFailed]=useState(false),[tileFailed,setTileFailed]=useState(false);
  const {layers}=useMapLayers();
  const registerControls=useMapControlsRegistration();
  const regionPicker=useRef<HTMLSelectElement>(null);
  const cameraScope=useRef(mapCameraKey(country,region));
  const planning=layers.background==="habitats";
  const showPlanning=Boolean(country&&layers.planningRegions);
  const activateRegion=(id:string)=>{callbacks.current.selectRegion?.(id);requestMapPhotos({countryId:country,kind:"region",regionId:id,name:destinationRegions[country]?.find(r=>r.id===id)?.name||id});regionPicker.current?.focus({preventScroll:true});};
  const callbacks=useRef({selectCountry,selectRegion});callbacks.current={selectCountry,selectRegion};
  const resetCamera=useCallback(()=>{
    const current=map.current;if(!current)return;
    current.stop();
    const bounds=country==="new-zealand"&&region==="south-island" ? countries[country].bounds : countries[country]?.regions[region]??countries[country]?.bounds;
    if(bounds)current.fitBounds([[bounds[1],bounds[0]],[bounds[3],bounds[2]]],{padding:[28,28],maxZoom:11,animate:false});
    else current.fitBounds([[-60,-180],[80,180]],{padding:[12,12],animate:false});
  },[country,region]);
  useEffect(()=>{
    if(!container.current)return;
    let current:GeographicMap;
    try{
      current=createMap(container.current,{center:[12,0],zoom:0,minZoom:0,maxZoom:19,trackResize:false,scrollWheelZoom:false,dragging:true,touchZoom:true,doubleClickZoom:true,zoomControl:false,attributionControl:true,worldCopyJump:true});
      map.current=current;
      current.on("moveend",()=>{const centre=current.getCenter();cameraMemory.remember(cameraScope.current,{centre:[centre.lat,centre.lng],zoom:current.getZoom()});});
      const reportCamera=()=>{const centre=current.getCenter();container.current?.setAttribute("data-map-camera",JSON.stringify({centre:[centre.lat,centre.lng],zoom:current.getZoom(),bounds:current.getBounds(),size:current.getSize()}));};
      current.on("movestart",()=>container.current?.setAttribute("data-map-moving","true"));
      current.on("moveend",()=>{container.current?.setAttribute("data-map-moving","false");reportCamera();});
      current.on("resize",reportCamera);reportCamera();
      current.createPane("habitatPane").style.zIndex="350";
      current.createPane("protectedAreasPane").style.zIndex="360";
      current.createPane("routePane").style.zIndex="650";
      current.createPane("planningRegionsPane").style.zIndex="340";
      control.scale({imperial:false}).addTo(current);
      container.current.setAttribute("aria-label","Geographic map. Drag to pan, pinch or double tap to zoom. Arrow keys and plus or minus also work.");
      current.dragging.enable();current.touchZoom.enable();current.doubleClickZoom.enable();
      setReady(true);
    }catch{map.current?.remove();map.current=null;basemap.current=null;setReady(false);setFailed(true);return;}
    const resize=()=>{
      const size=current.getSize();
      if(size.x===container.current?.clientWidth&&size.y===container.current?.clientHeight)return;
      current.stop();
      const centre=current.getCenter(),zoom=current.getZoom();
      current.invalidateSize({animate:false});
      // Leaflet rounds half-pixel size deltas. Reapply the exact centre so
      // repeated resizing/fullscreen changes cannot accumulate camera drift.
      const resizeOptions={animate:false,reset:true};
      current.setView(centre,zoom,resizeOptions);
    };
    const observer=new ResizeObserver(resize);observer.observe(container.current);
    document.addEventListener("aves:map-resize",resize);
    return()=>{observer.disconnect();document.removeEventListener("aves:map-resize",resize);current.remove();map.current=null;basemap.current=null;};
  },[initAttempt]);
  useEffect(()=>{if(!ready||!map.current||!registerControls)return;const current=map.current;return registerControls({zoomIn:()=>current.zoomIn(),zoomOut:()=>current.zoomOut(),reset:resetCamera})},[ready,registerControls,resetCamera]);
  useEffect(()=>{const current=map.current;if(!ready||!current)return;setTileFailed(false);if(layers.background==='habitats')return;const key=layers.background==='roads'||layers.background==='topographic'?layers.background:'satellite';const style=mapBasemaps[key];basemap.current?.remove();basemap.current=tileLayer(style.url,{maxNativeZoom:style.maxNativeZoom,maxZoom:19,attribution:style.attribution,keepBuffer:1,updateWhenIdle:true}).on('tileerror',()=>setTileFailed(true)).addTo(current);setTileFailed(false);return()=>{basemap.current?.remove();basemap.current=null}},[ready,layers.background]);
  useEffect(()=>{onMapReady?.(map.current);return()=>onMapReady?.(null)},[onMapReady,ready]);
  useEffect(()=>{
    const current=map.current;if(!current||!ready)return;
    // A scope selection must finish even if expansion/resizing interrupts a zoom animation.
    // Native drag/pinch/zoom remains available after this deterministic camera move.
    const key=mapCameraKey(country,region),remembered=cameraMemory.recall(key);
    current.stop();cameraScope.current=key;
    if(remembered)current.setView(remembered.centre,remembered.zoom,{animate:false});
    else resetCamera();
  },[country,region,ready,resetCamera]);
  useEffect(()=>{
    const current=map.current;if(!current||!ready)return;
    const targets=country?(destinationRegions[country]??[]).map(r=>({id:r.id,name:r.name,bounds:countries[country]?.regions[r.id]})):["colombia","australia","new-zealand"].map(id=>({id,name:id==="new-zealand"?"New Zealand":id==="australia"?"Australia":"Colombia",bounds:countries[id].bounds}));
    // Enabled polygons provide the targets and selected label. Avoid stacking
    // large region pills over their outlines; the native selector remains.
    const markers=((showPlanning||planning&&!country)?[]:targets).flatMap(target=>{
      if(!target.bounds)return[];
      const b=target.bounds,button=document.createElement("button");button.type="button";button.textContent=target.name;button.className="geographic-map-target";
      button.setAttribute("aria-label",`Explore ${target.name}`);button.setAttribute("aria-pressed",String((region||highlightRegion)===target.id));
      button.onclick=()=>{if(country)callbacks.current.selectRegion?.(target.id);else callbacks.current.selectCountry?.(target.id);requestMapPhotos({countryId:country||target.id,kind:country?"region":"country",regionId:country?target.id:undefined,name:target.name});};
      return[marker([(b[1]+b[3])/2,(b[0]+b[2])/2],{icon:divIcon({html:button,className:"geographic-map-marker",iconSize:[0,0]}),keyboard:false}).addTo(current)];
    });return()=>markers.forEach(m=>m.remove());
  },[country,region,highlightRegion,ready,showPlanning,planning]);
  return <section data-geographic-satellite="true" data-map-background={layers.background} className="geographic-map-shell" aria-label="Continuous geographic exploration">
    <div className="flex flex-wrap items-center gap-2 px-2 py-1">
      {selectCountry&&<label className="min-w-0 max-w-full text-xs">Destination <select aria-label="Map destination" value={country} onChange={e=>selectCountry(e.target.value)} className="min-h-11 max-w-full rounded-lg border bg-white px-2"><option value="">World</option><option value="colombia">Colombia</option><option value="australia">Australia</option><option value="new-zealand">New Zealand</option></select></label>}
      {country&&selectRegion&&<label className="min-w-0 max-w-full text-xs">Region <select ref={regionPicker} aria-label="Map region" value={region} onChange={e=>selectRegion(e.target.value)} className="min-h-11 max-w-full rounded-lg border bg-white px-2"><option value="">All regions</option>{(destinationRegions[country]??[]).map(r=><option key={r.id} value={r.id}>{r.name}</option>)}</select></label>}
      <button type="button" className="min-h-11 px-2 text-xs underline" onClick={resetCamera}>Reset map view</button>
    </div>
    {ready&&map.current&&country==="colombia"&&<GeographicProtectedAreas map={map.current}/>}
    {ready&&map.current&&country==="australia"&&<AustraliaProtectedAreas map={map.current}/>}
    {ready&&map.current&&country==="new-zealand"&&region!=="south-island"&&<NewZealandProtectedAreas map={map.current}/>}
    {ready&&map.current&&country==="new-zealand"&&region==="north-island"&&<NorthIslandPlanningLayer map={map.current}/>}
    <div ref={container} className="geographic-map-canvas" style={{background:planning?"#eaf2ef":undefined}}/>
    {ready&&map.current&&planning&&<GeographicPlanningWorld map={map.current} country={country} onSelect={selectCountry}/>}
    {ready&&map.current&&showPlanning&&<GeographicPlanningLayer map={map.current} country={country} region={region||highlightRegion} onSelect={activateRegion}/>}
    {country&&<p className="px-2 py-1 text-[10px] leading-4 text-emerald-950">{country==="colombia"?"Planning regions: adjoining AVES areas with shared edges. Approximate planning boundaries, not official boundaries or bird ranges.":country==="australia"?"Planning regions follow generalised state and territory boundaries.":"Planning regions follow the three main island groups; outlying islands are omitted."} <a href="https://www.naturalearthdata.com/" target="_blank" rel="noreferrer" className="inline-flex min-h-6 items-center underline">Natural Earth geography</a>{country==="colombia"?" · Areas authored by AVES":" · Public domain"}.</p>}
    {(failed||tileFailed)&&<div className="px-2 text-xs"><p role="status">{failed?"The map could not open. Choose a destination or region above, or retry.":"Some background tiles could not load. Your selected place and map view are still here."}</p><button type="button" className="mt-1 min-h-11 rounded border border-emerald-700 bg-white px-3 font-medium text-emerald-900" onClick={()=>{setTileFailed(false);if(failed){setFailed(false);setInitAttempt(value=>value+1)}else basemap.current?.redraw();}}>{failed?"Retry Map":"Retry Background Tiles"}</button></div>}
    <p className="px-2 py-1 text-[10px] leading-4 text-gray-600">Planning geography: Natural Earth, public domain. Satellite: historical 2016 composite, not current conditions. Regional labels mark broad planning areas, not bird locations or ecological boundaries. Drag to move; pinch or double tap to zoom. Scroll the page outside the map.</p>
  </section>;
}
