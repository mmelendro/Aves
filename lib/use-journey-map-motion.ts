"use client";
import {useEffect,useState} from "react";
import {marker,divIcon,polyline,type Map as GeographicMap} from "leaflet";
import {useTripMap} from "@/components/trip-planner/trip-map-context";
import {useMapLayers} from "@/components/map-layer-context";
import {planningContext} from "@/content/new-zealand-planning-context";

/** Temporary layers on the existing map. Straight travel cues never trace a road. */
export function useJourneyMapMotion(map:GeographicMap|null,islandId:string){
 const trip=useTripMap(),{layers}=useMapLayers();
 const step=trip?.journey?.islandId===islandId?trip.journey.steps[trip.journey.index]:undefined;
 const enabled=trip?.journeyMotion??true;
 const [preference,setPreference]=useState(0);
 useEffect(()=>{const media=window.matchMedia('(prefers-reduced-motion: reduce)');const changed=()=>setPreference(n=>n+1);media.addEventListener('change',changed);return()=>media.removeEventListener('change',changed)},[]);
 useEffect(()=>{
  if(!map||!step||!layers.itinerary)return;
  const areas=planningContext(islandId)?.catalogue.areas,area=areas?.find(a=>a.id===step.baseId);
  if(!area)return;
  const animate=enabled&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const container=map.getContainer();container.dataset.journeyAnimation=animate?'on':'off';
  const target=step.mapPoint??area;
  const label=document.createElement('span');label.className='geographic-map-target aves-journey-location'+(step.kind==='overnight'?' aves-journey-night':'');
  label.textContent=step.kind==='overnight'?`Overnight · ${step.mapPoint?.name??area.name}`:step.mapPoint?.name??'';
  label.setAttribute('role','img');label.setAttribute('aria-label',step.kind==='overnight'?`Overnight reference: ${step.mapPoint?.name??area.name}`:`Journey reference: ${step.mapPoint?.name??area.name}`);
  const pin=(step.mapPoint||step.kind==='overnight')?marker([target.latitude,target.longitude],{pane:'routePane',icon:divIcon({html:label,className:'geographic-map-marker',iconSize:[0,0]}),keyboard:false}).addTo(map):null;
  if(!step.transfer)map.setView([target.latitude,target.longitude],step.mapPoint?12:9,{animate});
  let frame=0;
  const travel=step.transfer;
  const line=travel?polyline([[travel.from.latitude,travel.from.longitude],[travel.to.latitude,travel.to.longitude]],{pane:'routePane',color:'#0e7490',weight:4,dashArray:'5 7',interactive:false}).addTo(map):null;
  const beadElement=document.createElement('span');beadElement.className='aves-journey-bead';beadElement.setAttribute('role','img');beadElement.setAttribute('aria-label','Illustrated transfer progress, not a road or live location');
  const bead=travel?marker([travel.to.latitude,travel.to.longitude],{pane:'routePane',icon:divIcon({html:beadElement,className:'geographic-map-marker',iconSize:[0,0]}),keyboard:false}).addTo(map):null;
  if(travel){
   map.fitBounds([[travel.from.latitude,travel.from.longitude],[travel.to.latitude,travel.to.longitude]],{padding:[55,55],maxZoom:9,animate});
   if(animate&&bead){let start:number|undefined;const tick=(now:number)=>{start??=now;const t=Math.min(1,(now-start)/1200),smooth=t*t*(3-2*t);bead.setLatLng([travel.from.latitude+(travel.to.latitude-travel.from.latitude)*smooth,travel.from.longitude+(travel.to.longitude-travel.from.longitude)*smooth]);if(t<1)frame=requestAnimationFrame(tick)};frame=requestAnimationFrame(tick)}
  }
  return()=>{cancelAnimationFrame(frame);pin?.remove();line?.remove();bead?.remove();map.stop();delete container.dataset.journeyAnimation};
 },[map,islandId,step,enabled,layers.itinerary,preference]);
}
