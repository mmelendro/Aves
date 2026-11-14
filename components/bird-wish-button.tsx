"use client"
import {useEffect,useState} from "react"
import {Heart} from "lucide-react"
export const birdWishEvent="aves:bird-wishes"
export function readBirdWishes(country:string):string[]{
 try{const value=JSON.parse(sessionStorage.getItem(`aves:bird-wishes:${country}`)||"null");return value&&Date.now()-value.at<86400000&&Array.isArray(value.ids)?value.ids.filter((id:unknown)=>typeof id==="string").slice(0,100):[]}catch{return []}
}
export function BirdWishButton({id,name,country}:{id:string;name:string;country:string}){
 const [selected,setSelected]=useState(false),[notice,setNotice]=useState("")
 useEffect(()=>{const update=()=>setSelected(readBirdWishes(country).includes(id));update();window.addEventListener(birdWishEvent,update);return()=>window.removeEventListener(birdWishEvent,update)},[country,id])
 function toggle(){try{const ids=readBirdWishes(country),next=ids.includes(id)?ids.filter(value=>value!==id):[...ids,id];if(next.length>100){setNotice("Your list has 100 birds. Save it to a trip before adding more.");return}sessionStorage.setItem(`aves:bird-wishes:${country}`,JSON.stringify({at:Date.now(),ids:next}));window.dispatchEvent(new Event(birdWishEvent));setNotice(next.includes(id)?"Added to this tab’s trip wishes. Open My Trips to add them to a saved plan.":"Removed from trip wishes.")}catch{setNotice("Your browser could not save this wish. Please allow storage and try again.")}}
 return <span className="inline-flex"><button type="button" onClick={toggle} aria-pressed={selected} aria-label={`${selected?"Remove":"Add"} ${name} ${selected?"from":"to"} trip wishes`} className="flex h-11 w-11 items-center justify-center rounded-full border border-emerald-200 bg-white/95 text-emerald-800 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"><Heart aria-hidden="true" size={20} fill={selected?"currentColor":"none"}/></button><span role="status" className="sr-only">{notice}</span></span>
}
