"use client";
import {useEffect,useRef} from "react";
import {geoJSON,type Map as GeographicMap,type Path} from "leaflet";
import type {FeatureCollection} from "geojson";

/** The planning background shares the tile engine's projection and camera. */
export default function GeographicPlanningWorld({map,country,onSelect}:{map:GeographicMap;country:string;onSelect?:(id:string)=>void}){
  const select=useRef(onSelect);select.current=onSelect;
  useEffect(()=>{
    const abort=new AbortController();
    const world=geoJSON(undefined,{pane:"tilePane",style:{color:"#7c9e8a",weight:1,fillColor:"#dfeadd",fillOpacity:1},onEachFeature:(feature,layer)=>{
      const {id,name}=feature.properties;
      const label=document.createElement('span');label.textContent=name;
      layer.bindTooltip(label,{sticky:true});
      if(country||!id)return;
      layer.on('click',()=>select.current?.(id));
      layer.on('add',()=>{
        const element=(layer as Path).getElement();if(!element)return;
        element.setAttribute('role','button');element.setAttribute('tabindex','0');element.setAttribute('aria-label',`Explore ${name}`);
        element.addEventListener('keydown',event=>{if(['Enter',' '].includes((event as KeyboardEvent).key)){event.preventDefault();select.current?.(id);}});
        element.addEventListener('focus',()=>layer.openTooltip());element.addEventListener('blur',()=>layer.closeTooltip());
      });
    }}).addTo(map);
    fetch('/data/planning-world.geojson',{signal:abort.signal}).then(response=>{if(!response.ok)throw Error('Planning background unavailable');return response.json()}).then((data:FeatureCollection)=>{if(!abort.signal.aborted)world.addData(data)}).catch(()=>{/* Country overlays and the destination selector remain available. */});
    return()=>{abort.abort();world.remove();};
  },[map,country]);
  return null;
}
