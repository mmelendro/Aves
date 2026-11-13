"use client"
import {useEffect,useRef,useState} from "react"
import type { GalleryPhoto } from "@/lib/place-gallery"
import {matchingMapPhotos,type MapPhotoRequest} from "@/lib/map-photo-request"
import {loadGalleryPhotos} from "@/lib/load-gallery-photos"
import RecoverablePhoto from "./recoverable-photo"
import PhotoCredit from "./photo-credit"
export default function MapLocationPhotos({request,onReturn}:{request:MapPhotoRequest;onReturn:()=>void}){
 const [loaded,setLoaded]=useState<{country:string;photos:GalleryPhoto[]}|null>(null),[failed,setFailed]=useState(false),[attempt,setAttempt]=useState(0),[index,setIndex]=useState(0)
 const section=useRef<HTMLElement>(null)
 useEffect(()=>{let active=true;setFailed(false);loadGalleryPhotos(request.countryId).then(photos=>{if(active)setLoaded({country:request.countryId,photos})}).catch(()=>{if(active)setFailed(true)});return()=>{active=false}},[request.countryId,attempt])
 useEffect(()=>{setIndex(0);section.current?.scrollIntoView({block:"nearest",behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})},[request])
 const photos=loaded?.country===request.countryId ? matchingMapPhotos(loaded.photos,request) : []
 const photo=photos[Math.min(index,Math.max(0,photos.length-1))]
 return <section ref={section} aria-label={`Location photographs: ${request.name}`} className="my-4 min-w-0 scroll-mt-32 rounded-2xl border border-emerald-200 bg-white p-4 text-emerald-950">
  <div className="mb-3 flex flex-wrap items-center justify-between gap-3"><h3 className="text-lg font-semibold">Photos of {request.name}</h3><button type="button" className="min-h-11 rounded-lg border border-emerald-700 px-3 text-sm underline" onClick={onReturn}>Return to map</button></div>
  {failed ? <div role="alert"><p>The reviewed photos could not load.</p><button type="button" className="min-h-11 underline" onClick={()=>setAttempt(value=>value+1)}>Retry location photos</button></div> : loaded?.country!==request.countryId ? <p role="status">Opening location photos…</p> : photo ? <>
   <div className="relative h-[min(45svh,24rem)] min-h-48 overflow-hidden rounded-xl bg-emerald-50"><RecoverablePhoto key={photo.src} src={photo.src} alt={photo.alt} fill sizes="(max-width:703px) 90vw,700px" className="object-contain"/></div>
   <p className="mt-2 font-medium">{photo.placeName}</p><p className="text-sm">{photo.caption}</p>
   <PhotoCredit key={photo.src} creator={photo.creator} sourceUrl={photo.sourceUrl} licence={photo.licence} licenceUrl={photo.licenceUrl} modifications={photo.modifications} capturedOn={photo.capturedOn} dateBasis={photo.dateBasis}/>
   <div className="mt-2 flex flex-wrap items-center gap-3"><button type="button" aria-label="Previous location photograph" className="min-h-11 rounded border px-3 disabled:opacity-50" disabled={photos.length<2} onClick={()=>setIndex(value=>(value-1+photos.length)%photos.length)}>Previous</button><span aria-live="polite">{Math.min(index+1,photos.length)} of {photos.length}</span><button type="button" aria-label="Next location photograph" className="min-h-11 rounded border px-3 disabled:opacity-50" disabled={photos.length<2} onClick={()=>setIndex(value=>(value+1)%photos.length)}>Next</button></div>
   <p className="mt-2 text-xs text-gray-600">Reviewed {request.kind==='place'?'place photographs':'landscapes from this collection'}, not current conditions or promised wildlife.</p>
  </> : <p role="status">No reviewed photographs for {request.name} yet. The map and location sources remain available.</p>}
 </section>
}
