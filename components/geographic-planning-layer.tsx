"use client";
import {useEffect,useRef,useState} from "react";
import {geoJSON,layerGroup,tooltip,type Map as GeographicMap,type Path,type PathOptions} from "leaflet";
import type {FeatureCollection,Geometry} from "geojson";

type RegionProperties={id:string;name:string;kind:string;colour:string;labelPoint:number[]};
type Regions=FeatureCollection<Geometry,RegionProperties>;
const loadRegions=(country:string)=>country==="colombia"?import("@/content/geographic-planning-regions/colombia.json"):country==="australia"?import("@/content/geographic-planning-regions/australia.json"):country==="new-zealand"?import("@/content/geographic-planning-regions/new-zealand.json"):Promise.reject(new Error("Unsupported planning country"));

/** Reviewed geography loads only for the visible country and enabled overlay.
 * Layer changes do not recreate the tile map or change the visitor's camera.
 */
export default function GeographicPlanningLayer({map,country,region,onSelect}:{map:GeographicMap;country:string;region:string;onSelect?:(id:string)=>void}){
  const [failed,setFailed]=useState(false);
  const select=useRef(onSelect);select.current=onSelect;
  useEffect(()=>{
    let active=true;
    const group=layerGroup().addTo(map);
    setFailed(false);
    loadRegions(country).then(module=>{
      if(!active)return;
      const data=module.default as Regions;
      const style=(properties:RegionProperties,hover=false):PathOptions=>({
        color:properties.colour,weight:properties.id===region?2.5:hover?2:1.3,
        fillColor:properties.colour,fillOpacity:properties.id===region?.13:hover?.09:.045,
        opacity:properties.id===region?1:.8,dashArray:properties.kind==="approximate-planning-area"?"6 4":undefined,
      });
      geoJSON(data,{pane:"planningRegionsPane",style:feature=>style(feature!.properties),onEachFeature:(feature,layer)=>{
        const properties=feature.properties as RegionProperties;
        const path=layer as Path;
        const name=document.createElement("span");name.textContent=properties.name;
        layer.bindTooltip(name,{sticky:true});
        layer.on("click",()=>select.current?.(properties.id));
        layer.on("mouseover",()=>path.setStyle(style(properties,true)));
        layer.on("mouseout",()=>path.setStyle(style(properties)));
        layer.on("add",()=>{
          const element=path.getElement();if(!element)return;
          element.setAttribute("role","button");element.setAttribute("tabindex","0");
          element.setAttribute("aria-label",`Select planning region: ${properties.name}`);
          element.setAttribute("aria-pressed",String(properties.id===region));
          element.setAttribute("data-planning-region",properties.id);
          element.addEventListener("keydown",event=>{
            const key=(event as KeyboardEvent).key;
            if((key==="Enter"||key===" ")&&!(event as KeyboardEvent).repeat){event.preventDefault();select.current?.(properties.id);}
          });
          element.addEventListener("focus",()=>{path.setStyle(style(properties,true));layer.openTooltip();});
          element.addEventListener("blur",()=>{path.setStyle(style(properties));layer.closeTooltip();});
        });
      }}).addTo(group);
      const selected=data.features.find(f=>f.properties.id===region);
      if(selected){
        const label=document.createElement("span");label.textContent=selected.properties.name;
        const [longitude,latitude]=selected.properties.labelPoint;
        tooltip({permanent:true,direction:"center",className:"geographic-region-name",interactive:false})
          .setLatLng([latitude,longitude]).setContent(label).addTo(group);
      }
    }).catch(()=>{if(active)setFailed(true);});
    return()=>{active=false;group.remove();};
  },[map,country,region]);
  return failed?<p role="status" className="px-2 text-xs text-amber-900">Planning outlines could not load. The region selector and satellite map remain available.</p>:null;
}
