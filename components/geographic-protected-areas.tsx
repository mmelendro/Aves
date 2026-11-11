"use client";
import {useEffect,useId,useRef,useState} from "react";
import {geoJSON,tooltip,type Map as GeographicMap,type GeoJSON,type Path} from "leaflet";
import type {FeatureCollection,Polygon,MultiPolygon} from "geojson";
import catalogue from "@/content/colombia-protected-areas.json";
import {useMapLayers} from "./map-layer-context";

type Area=typeof catalogue.areas[number];
type Areas=FeatureCollection<Polygon|MultiPolygon,Area>;

/** One optional national snapshot on the existing map. Selection moves only the
 * camera; it never assigns bird occurrence, access permission or a trip stop.
 */
export default function GeographicProtectedAreas({map}:{map:GeographicMap}){
  const {layers,update}=useMapLayers(),enabled=layers.protectedAreas;
  const [data,setData]=useState<Areas|null>(null),[status,setStatus]=useState("idle");
  const [selected,setSelected]=useState(""),[open,setOpen]=useState(false);
  const id=useId(),picker=useRef<HTMLSelectElement>(null),toggle=useRef<HTMLButtonElement>(null),group=useRef<GeoJSON|null>(null);
  const close=()=>{setOpen(false);toggle.current?.focus({preventScroll:true});};
  const area=catalogue.areas.find(item=>item.id===selected);
  const choose=(value:string)=>{
    const target=catalogue.areas.find(item=>item.id===value);setSelected(value);
    if(target){const b=target.bounds;map.fitBounds([[b[1],b[0]],[b[3],b[2]]],{padding:[48,48],maxZoom:13,animate:false});}
  };
  const activate=useRef<(value:string)=>void>(()=>{});
  activate.current=value=>{choose(value);setOpen(true);};
  // Abort a disabled/unmounted request. A completed snapshot stays in memory
  // through regional selections and on/off, without rebuilding the tile map.
  useEffect(()=>{
    if(!enabled||data)return;
    const controller=new AbortController();setStatus("loading");
    fetch(catalogue.geometryPath,{signal:controller.signal}).then(response=>{
      if(!response.ok)throw new Error("Boundary snapshot unavailable");return response.json();
    }).then(result=>{
      if(controller.signal.aborted)return;
      if(result.type!=="FeatureCollection"||result.features?.length!==catalogue.count)throw new Error("Invalid boundary snapshot");
      setData(result as Areas);setStatus("ready");
    }).catch(()=>{if(!controller.signal.aborted)setStatus("error");});
    return()=>controller.abort();
  },[enabled,data]);
  useEffect(()=>{
    if(!enabled)return;
    const credit='Protected areas: <a href="https://runap.parquesnacionales.gov.co/cifras">PNN / RUNAP · 6 Nov 2026</a> (AVES adaptation · <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>)';
    map.attributionControl.addAttribution(credit);
    return()=>{map.attributionControl.removeAttribution(credit);};
  },[map,enabled]);
  useEffect(()=>{
    if(!enabled||!data)return;
    const layer=geoJSON(data,{pane:"protectedAreasPane",style:{color:"#fbbf24",weight:1.5,fillColor:"#fbbf24",fillOpacity:.09,opacity:.95},onEachFeature:(feature,path)=>{
      const properties=feature.properties as Area;
      const name=document.createElement("span");name.textContent=`${properties.name} · ${properties.category}`;
      path.bindTooltip(name,{sticky:true});
      path.on("click",()=>activate.current(properties.id));
      path.on("add",()=>{
        const element=(path as Path).getElement();if(!element)return;
        element.setAttribute("data-protected-area",properties.id);element.setAttribute("role","button");
        element.setAttribute("aria-label",`Explore protected area: ${properties.name}`);element.setAttribute("tabindex","0");
        element.addEventListener("keydown",event=>{
          const key=(event as KeyboardEvent).key;
          if((key==="Enter"||key===" ")&&!(event as KeyboardEvent).repeat){event.preventDefault();activate.current(properties.id);}
        });
        element.addEventListener("focus",()=>path.openTooltip());element.addEventListener("blur",()=>path.closeTooltip());
      });
    }}).addTo(map);group.current=layer;
    return()=>{layer.remove();group.current=null;};
  },[map,data,enabled]);
  useEffect(()=>{
    group.current?.eachLayer(layer=>{
      const path=layer as Path&{feature:{properties:Area}};
      path.setStyle({weight:path.feature.properties.id===selected?3:1.5,fillOpacity:path.feature.properties.id===selected?.22:.09});
      path.getElement()?.setAttribute("aria-pressed",String(path.feature.properties.id===selected));
    });
    if(!enabled||!area||!data)return;
    const label=document.createElement("span");label.textContent=area.name;
    const marker=tooltip({permanent:true,direction:"center",className:"geographic-region-name",interactive:false})
      .setLatLng([area.labelPoint[1],area.labelPoint[0]]).setContent(label).addTo(map);
    return()=>{marker.remove();};
  },[map,selected,enabled,data,area]);
  useEffect(()=>{if(open)picker.current?.focus({preventScroll:true});},[open,status]);
  return <div className="relative z-[700] flex min-h-11 flex-wrap items-center gap-2 px-2 text-xs text-emerald-950">
    <label className="inline-flex min-h-11 cursor-pointer items-center gap-2"><input type="checkbox" checked={enabled} onChange={event=>{update({protectedAreas:event.target.checked});if(!event.target.checked)setOpen(false);}}/><span aria-hidden="true" className="h-2 w-3 border-2 border-amber-500"/>National protected areas</label>
    <button ref={toggle} type="button" className="min-h-11 px-2 underline" aria-expanded={open} aria-controls={id} onClick={()=>setOpen(value=>!value)}>Explore {catalogue.count} areas</button>
    {open&&<div id={id} role="region" aria-label="Protected area details" onKeyDown={event=>{if(event.key==="Escape"){event.preventDefault();close();}}} className="absolute left-2 right-2 top-full z-10 max-h-[55vh] max-w-sm overflow-y-auto rounded-xl border border-emerald-200 bg-white p-3 shadow-xl">
      <div className="flex items-center justify-between gap-2"><strong>Colombia’s national areas</strong><button type="button" aria-label="Close protected area details" className="min-h-11 min-w-11 rounded-lg border" onClick={close}>×</button></div>
      <label htmlFor={`${id}-area`} className="block">Find a park or reserve</label>
      <select ref={picker} id={`${id}-area`} aria-label="Protected area" value={selected} disabled={!enabled||status!=="ready"} onChange={event=>choose(event.target.value)} className="my-2 min-h-11 w-full min-w-0 rounded-lg border bg-white px-2">
        <option value="">Choose an area</option>{catalogue.areas.map(item=><option key={item.id} value={item.id}>{item.name}</option>)}
      </select>
      {!enabled&&<p>Enable National protected areas to explore their boundaries.</p>}
      {enabled&&status==="loading"&&<p role="status">Loading protected boundaries…</p>}
      {enabled&&status==="error"&&<p role="status">Boundaries could not load. Turn this layer off and on to retry. The satellite map remains available.</p>}
      {area&&<div className="space-y-1"><p className="font-semibold">{area.name}</p><p>{area.category}</p><a href={area.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center underline">Official RUNAP record</a></div>}
      <p className="mt-2 leading-5">Amber outlines show {catalogue.count} national areas from RUNAP, 6 November 2026. Regional, private and provisional records are omitted. Boundaries are generalised. Check current entry rules and closures with the area’s manager.</p>
      <p className="mt-2 leading-5">Parques Nacionales Naturales de Colombia / RUNAP. Geometry adapted by AVES. <a className="underline" href={catalogue.licenceUrl} target="_blank" rel="noreferrer">CC BY-SA 4.0</a> · <a className="underline" href={catalogue.sourceUrl} target="_blank" rel="noreferrer">Source</a> · <a className="underline" href={catalogue.geometryPath} download>Download layer</a></p>
    </div>}
  </div>;
}
