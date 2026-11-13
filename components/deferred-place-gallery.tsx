"use client"
import {useEffect,useState,type ComponentProps} from "react"
import PlaceGallery from "./place-gallery"
import type {GalleryPhoto} from "@/lib/place-gallery"
const loaders:Record<string,()=>Promise<{default:GalleryPhoto[]}>>={
 colombia:()=>import("@/content/gallery-colombia.json"),
 australia:()=>import("@/content/gallery-australia.json"),
 "new-zealand":()=>import("@/content/gallery-new-zealand.json"),
}
export default function DeferredPlaceGallery(props:Omit<ComponentProps<typeof PlaceGallery>,"photos">){
 const [loaded,setLoaded]=useState<{country:string;photos:GalleryPhoto[]}|null>(null),[failed,setFailed]=useState(false),[attempt,setAttempt]=useState(0)
 useEffect(()=>{let active=true;setFailed(false);const load=loaders[props.countryId];if(!load)return;load().then(m=>{if(active)setLoaded({country:props.countryId,photos:m.default})}).catch(()=>{if(active)setFailed(true)});return()=>{active=false}},[props.countryId,attempt])
 if(failed)return <div role="alert"><p>Reviewed landscapes could not be opened.</p><button type="button" className="min-h-11 underline" onClick={()=>setAttempt(a=>a+1)}>Retry landscapes</button></div>
 if(!loaded||loaded.country!==props.countryId)return <p role="status">Opening reviewed landscapes…</p>
 return <PlaceGallery {...props} photos={loaded.photos}/>
}
