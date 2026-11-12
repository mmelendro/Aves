"use client"
import {useState} from "react"
import {birdStories} from "@/content/bird-stories"
export default function BirdStory({birdId,countryId,onOpen}:{birdId:string;countryId:string;onOpen?:()=>void}){
 const [spanish,setSpanish]=useState(false),story=birdStories.find(s=>s.birdId===birdId&&s.countryId===countryId)
 if(!story)return null
 const copy=spanish?story.es:story.en
 return <details className="mt-3 rounded-xl border border-emerald-100 bg-white px-4 text-sm text-emerald-950" onToggle={e=>{if(e.currentTarget.open)onOpen?.()}}><summary className="min-h-11 cursor-pointer py-3 font-medium">{spanish?"Una historia del ave":"A bird story"} · {copy.title}</summary><article lang={spanish?"es":"en"} className="pb-4"><button type="button" className="mb-3 min-h-11 underline" onClick={()=>setSpanish(!spanish)} lang={spanish?"en":"es"}>{spanish?"Read in English":"Leer en español"}</button><p className="leading-7">{copy.text}</p><p className="mt-3 text-xs">{spanish?"Texto original de AVES basado en historia natural general. No describe un avistamiento de nuestros viajes.":"Original AVES writing based on general natural history. This does not describe a sighting on one of our trips."}</p><a href={story.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-11 items-center underline">{spanish?"Fuente de los datos":"Factual source"}: {story.source}</a><p className="text-xs">{spanish?"Revisado":"Reviewed"}: {story.reviewedOn}</p></article></details>
}
