"use client";
import {useEffect,useRef,useState} from "react";
import {marker,divIcon,imageOverlay,polyline,type Map as GeographicMap} from "leaflet";
import {protectedAreaPalette as palette} from "@/lib/protected-area-palette";
import GeographicSatelliteMap from "./geographic-satellite-map";
import {useMapLayers} from "./map-layer-context";
import {useTripMap} from "./trip-planner/trip-map-context";
import {visiblePublicPlaces} from "@/lib/south-island-public-places";
import habitat from "@/content/south-island-ecosystem-map.json";
import conservation from "@/content/south-island-conservation-layers.json";
import parks from "@/content/south-island-layer-catalogue.json";
import tripCatalogue from "@/content/south-island-trip-catalogue.json";

/** Inverse of the source LCDB/DOC Mercator frame. Output is Leaflet latitude/longitude. */
function geographicPoint(x:number,y:number):[number,number]{
  const b=habitat.bbox,resolution=(b[2]-b[0])/480;
  return[(2*Math.atan(Math.exp((b[3]-y*resolution)/6378137))-Math.PI/2)*180/Math.PI,(b[0]+x*resolution)/6378137*180/Math.PI];
}
const colours:Record<string,string>={forest:"#537b5d",mountains:"#ae9761",freshwater:"#438eac",coast:"#008477"};
function labelMarker(map:GeographicMap,point:[number,number],name:string,onClick?:()=>void,pressed=false,pane="markerPane"){
  const element=document.createElement(onClick?"button":"span");element.textContent=name;element.className="geographic-map-target";
  if(element instanceof HTMLButtonElement){element.type="button";element.setAttribute("aria-pressed",String(pressed));element.onclick=onClick??null;}
  const item=marker(point,{icon:divIcon({html:element,className:"geographic-map-marker",iconSize:[0,0]}),keyboard:false,pane}).addTo(map);
  // At country scale use small targets, retaining full names for assistive technology.
  const resizeLabel=()=>{const compact=Boolean(onClick)&&map.getZoom()<7;element.textContent=compact?"•":name;if(!element.classList.contains("aves-route-ordinal"))element.setAttribute("aria-label",name);element.title=name;element.style.minWidth=compact?"24px":"";element.style.padding=compact?"0":"";element.style.backgroundColor=compact?"transparent":"";element.style.borderColor=compact?"transparent":"";element.style.boxShadow=compact?"none":"";element.style.fontSize=compact?"20px":"";};
  resizeLabel();map.on("zoomend",resizeLabel);item.on("remove",()=>map.off("zoomend",resizeLabel));
  return item;
}
export default function SouthIslandSatelliteMap({selected,onSelectIsland,latitude,longitude}:{selected:string;onSelectIsland?:(id:string)=>void;latitude?:number;longitude?:number}){
  const[map,setMap]=useState<GeographicMap|null>(null);
  const previousLocation=useRef({latitude,longitude});
  const{layers,update}=useMapLayers(),trip=useTripMap();
  useEffect(()=>{
    if(!map)return;
    // Preserve the original vector paths and even-odd holes in an image overlay,
    // georeferenced by its published Mercator extent rather than artwork pixels.
    const paths:string[]=[];
    const paint=(d:string,fill:string,opacity:number,stroke:string)=>paths.push(`<path d="${d}" fill="${fill}" fill-opacity="${opacity}" stroke="${stroke}" stroke-width=".6" fill-rule="evenodd"/>`);
    if(selected!=="all"&&selected!=="coast")for(const layer of habitat.layers.filter(l=>l.id===selected))paint(layer.path,colours[layer.id],layers.overlayOpacity,colours[layer.id]);
    if(selected==="coast")paint(habitat.outline,"none",0,colours.coast);
    if(layers.conservation)paint(conservation.conservationPath,"#84a23c",.25,"#4d7c0f");
    if(layers.nationalParks)for(const park of conservation.parks)paint(park.path,palette.colour,layers.park===park.id ? palette.selectedFillOpacity : palette.fillOpacity,palette.colour);
    const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 640" width="960" height="1280">${paths.join("")}</svg>`;
    const overlay=imageOverlay(`data:image/svg+xml,${encodeURIComponent(svg)}`,[geographicPoint(0,640),geographicPoint(480,0)],{pane:"habitatPane",interactive:false}).addTo(map);
    return()=>{overlay.remove();};
  },[map,selected,layers.overlayOpacity,layers.conservation,layers.nationalParks,layers.park]);
  useEffect(()=>{
    if(!map)return;
    const markers=visiblePublicPlaces(layers).map(point=>labelMarker(map,[point.latitude,point.longitude],point.name,()=>{update({point:point.id,park:""});if(point.tripAreaId)trip?.selectBase(point.tripAreaId);},layers.point===point.id));
    if(layers.nationalParks)for(const park of parks.parks)markers.push(labelMarker(map,geographicPoint(park.point[0],park.point[1]),park.name,()=>update({park:park.id,point:""}),layers.park===park.id));
    return()=>markers.forEach(m=>m.remove());
  },[map,layers,update,trip]);
  useEffect(()=>{
    if(!map)return;
    const place=visiblePublicPlaces(layers).find(p=>p.id===layers.point),park=parks.parks.find(p=>layers.nationalParks&&p.id===layers.park);
    const changed=previousLocation.current.latitude!==latitude||previousLocation.current.longitude!==longitude;
    previousLocation.current={latitude,longitude};
    const centre=place?[place.latitude,place.longitude] as[number,number]:park?geographicPoint(park.point[0],park.point[1]):changed&&longitude!==undefined&&latitude!==undefined?[latitude,longitude] as[number,number]:null;
    // Visibility toggles must not move a camera the visitor has already panned.
    if(centre)map.setView(centre,Math.max(map.getZoom(),9),{animate:!window.matchMedia("(prefers-reduced-motion: reduce)").matches});
  },[map,layers.point,layers.park,latitude,longitude]);
  const bases=trip?.bases.join("|")??"";
  const journeyStep=trip?.journey?.islandId==="south-island" ? trip.journey.steps[trip.journey.index] : undefined;
  const reference=journeyStep?.mapPoint;
  useEffect(()=>{
    if(!map||!reference)return;
    const pin=labelMarker(map,[reference.latitude,reference.longitude],reference.name,undefined,false,"routePane");
    pin.getElement()?.querySelector("span")?.classList.add("aves-journey-target");
    map.setView([reference.latitude,reference.longitude],12,{animate:!window.matchMedia("(prefers-reduced-motion: reduce)").matches});
    return()=>{pin.remove()};
  },[map,reference]);
  useEffect(()=>{
    if(!map)return;
    const areas=layers.itinerary?bases.split("|").flatMap(id=>{const a=tripCatalogue.areas.find(a=>a.id===id);return a?[a]:[]}):[];
    const line=polyline(areas.map(a=>[a.latitude,a.longitude]),{color:"#38bdf8",weight:3,dashArray:"7 5",interactive:false}).addTo(map);
    const markers=areas.map((area,i)=>{
      const m=labelMarker(map,[area.latitude,area.longitude],String(i+1),undefined,false,"routePane");
      const label=m.getElement()?.querySelector("span");
      label?.classList.add("aves-route-ordinal");
      label?.setAttribute("aria-label",`Itinerary stop ${i+1}: ${area.name}`);
      if(journeyStep?.baseId===area.id)label?.classList.add("aves-journey-target");
      return m;
    });
    return()=>{line.remove();markers.forEach(m=>m.remove());};
  },[map,bases,layers.itinerary,journeyStep]);
  return <><GeographicSatelliteMap country="new-zealand" region="south-island" selectRegion={onSelectIsland} onMapReady={setMap}/><p className="px-2 text-[10px] leading-4">Habitat shading: LCDB 2023/24, generalised to about 2 km · DOC conservation 9 November 2026 · Route connectors show base order, not roads.</p></>;
}
