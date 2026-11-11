"use client";
import {useEffect,useState} from "react";
import {Marker,type Map as Globe,type CanvasSource,type GeoJSONSource,type GeoJSONSourceSpecification} from "maplibre-gl";
import GeographicSatelliteMap from "./geographic-satellite-map";
import {useMapLayers} from "./map-layer-context";
import {useTripMap} from "./trip-planner/trip-map-context";
import {visiblePublicPlaces} from "@/lib/south-island-public-places";
import habitat from "@/content/south-island-ecosystem-map.json";
import conservation from "@/content/south-island-conservation-layers.json";
import parks from "@/content/south-island-layer-catalogue.json";
import tripCatalogue from "@/content/south-island-trip-catalogue.json";

/** Inverse of the published LCDB/DOC EPSG:3857 frame. No artwork positions are georeferenced. */
function geographicPoint(x:number,y:number):[number,number] {
  const b=habitat.bbox,resolution=(b[2]-b[0])/480;
  return [(b[0]+x*resolution)/6378137*180/Math.PI,(2*Math.atan(Math.exp((b[3]-y*resolution)/6378137))-Math.PI/2)*180/Math.PI];
}
const coordinates:[[number,number],[number,number],[number,number],[number,number]]=[geographicPoint(0,0),geographicPoint(480,0),geographicPoint(480,640),geographicPoint(0,640)];
const colours:Record<string,string>={forest:"#537b5d",mountains:"#ae9761",freshwater:"#438eac",coast:"#008477"};
export default function SouthIslandSatelliteMap({selected,onSelectIsland,latitude,longitude}:{selected:string;onSelectIsland?:(id:string)=>void;latitude?:number;longitude?:number}) {
  const [map,setMap]=useState<Globe|null>(null);
  const {layers,update}=useMapLayers(),trip=useTripMap();
  useEffect(()=>{
    if(!map)return;
    // Rasterise the already generalised official geometry with its original
    // even-odd holes, then drape it in geographic coordinates over the tiles.
    const canvas=document.createElement("canvas");canvas.width=960;canvas.height=1280;
    const context=canvas.getContext("2d");if(!context)return;
    context.scale(2,2);
    function paint(path:string,fill:string,opacity:number,stroke?:string){
      if(!context)return;const shape=new Path2D(path);context.globalAlpha=opacity;context.fillStyle=fill;context.fill(shape,"evenodd");
      if(stroke){context.globalAlpha=1;context.strokeStyle=stroke;context.lineWidth=.6;context.stroke(shape);}
    }
    if(selected!=="all"&&selected!=="coast")for(const layer of habitat.layers.filter(l=>l.id===selected))paint(layer.path,colours[layer.id],layers.overlayOpacity,colours[layer.id]);
    if(selected==="coast")paint(habitat.outline,"transparent",0,colours.coast);
    if(layers.conservation)paint(conservation.conservationPath,"#84a23c",.25,"#4d7c0f");
    if(layers.nationalParks)for(const park of conservation.parks)paint(park.path,"#f59e0b",layers.park===park.id ? .28 : .1,"#b45309");
    if(!map.getSource("south-island-overlays")){
      map.addSource("south-island-overlays",{type:"canvas",canvas,coordinates,animate:false});
      map.addLayer({id:"south-island-overlays",type:"raster",source:"south-island-overlays",paint:{"raster-fade-duration":0}});
    } else {
      const source=map.getSource("south-island-overlays") as CanvasSource;
      const original=source.getCanvas();const target=original.getContext("2d");target?.clearRect(0,0,960,1280);target?.drawImage(canvas,0,0);source.play();map.once("render",()=>source.pause());
    }
    map.triggerRepaint();
  },[map,selected,layers.overlayOpacity,layers.conservation,layers.nationalParks,layers.park]);
  useEffect(()=>{
    if(!map)return;
    const markers=visiblePublicPlaces(layers).map(point=>{
      const button=document.createElement("button");button.type="button";button.textContent=point.name;button.className="geographic-map-target";
      button.setAttribute("aria-label",`Preview place: ${point.name}`);button.setAttribute("aria-pressed",String(layers.point===point.id));
      button.onclick=()=>{update({point:point.id,park:""});if(point.tripAreaId)trip?.selectBase(point.tripAreaId);};
      return new Marker({element:button}).setLngLat([point.longitude,point.latitude]).addTo(map);
    });
    if(layers.nationalParks)for(const park of parks.parks){
      const button=document.createElement("button");button.type="button";button.textContent=park.name;button.className="geographic-map-target";button.onclick=()=>update({park:park.id,point:""});
      markers.push(new Marker({element:button}).setLngLat(geographicPoint(park.point[0],park.point[1])).addTo(map));
    }
    return ()=>markers.forEach(marker=>marker.remove());
  },[map,layers,update,trip]);
  useEffect(()=>{
    if(!map)return;
    const place=visiblePublicPlaces(layers).find(p=>p.id===layers.point),park=parks.parks.find(p=>layers.nationalParks&&p.id===layers.park);
    const centre=place?[place.longitude,place.latitude] as [number,number]:park?geographicPoint(park.point[0],park.point[1]):longitude!==undefined&&latitude!==undefined?[longitude,latitude] as [number,number]:null;
    if(centre)map.easeTo({center:centre,zoom:Math.max(map.getZoom(),9),duration:window.matchMedia("(prefers-reduced-motion: reduce)").matches?0:500});
  },[map,layers.point,layers.park,layers.nationalParks,latitude,longitude]);
  const bases=trip?.bases.join("|")??"";
  useEffect(()=>{
    if(!map)return;
    const areas=layers.itinerary?bases.split("|").flatMap(id=>{const area=tripCatalogue.areas.find(a=>a.id===id);return area?[area]:[]}):[];
    const data:Exclude<GeoJSONSourceSpecification["data"],string>={type:"FeatureCollection",features:areas.length>1?[{type:"Feature",properties:{},geometry:{type:"LineString",coordinates:areas.map(a=>[a.longitude,a.latitude])}}]:[]};
    if(!map.getSource("itinerary")){map.addSource("itinerary",{type:"geojson",data});map.addLayer({id:"itinerary",type:"line",source:"itinerary",paint:{"line-color":"#38bdf8","line-width":3,"line-dasharray":[2,2]}});}else(map.getSource("itinerary") as GeoJSONSource).setData(data);
    const markers=areas.map((area,i)=>{
      const label=document.createElement("span");label.className="geographic-map-target";label.textContent=String(i+1);label.title=`${i+1}. ${area.name} · itinerary base, not road routing`;
      return new Marker({element:label}).setLngLat([area.longitude,area.latitude]).addTo(map);
    });return ()=>markers.forEach(marker=>marker.remove());
  },[map,bases,layers.itinerary]);
  return <><GeographicSatelliteMap country="new-zealand" region="south-island" selectRegion={onSelectIsland} onMapReady={setMap}/><p className="px-2 text-[10px] leading-4">Habitat shading: LCDB 2023/24, generalised to about 2 km · DOC conservation 9 November 2026 · Route connectors show base order, not roads.</p></>;
}
