"use client"
import {useEffect,useState,type ComponentProps} from "react"
import PlaceGallery from "./place-gallery"
import type {GalleryPhoto} from "@/lib/place-gallery"
import {loadGalleryPhotos} from "@/lib/load-gallery-photos"
export default function DeferredPlaceGallery(props:Omit<ComponentProps<typeof PlaceGallery>,"photos">){
 const [loaded,setLoaded]=useState<{country:string;photos:GalleryPhoto[]}|null>(null),[failed,setFailed]=useState(false),[attempt,setAttempt]=useState(0)
 useEffect(()=>{let active=true;setFailed(false);loadGalleryPhotos(props.countryId).then(photos=>{if(active)setLoaded({country:props.countryId,photos})}).catch(()=>{if(active)setFailed(true)});return()=>{active=false}},[props.countryId,attempt])
 if(failed)return <div role="alert"><p>Reviewed landscapes could not be opened.</p><button type="button" className="min-h-11 underline" onClick={()=>setAttempt(a=>a+1)}>Retry landscapes</button></div>
 if(!loaded||loaded.country!==props.countryId)return <p role="status">Opening reviewed landscapes…</p>
 return <PlaceGallery {...props} photos={loaded.photos}/>
}
