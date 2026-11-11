"use client"

import {useEffect, useState} from "react"
import {nzPlanningPlaces, readNzPlaceIdeas, writeNzPlaceIdeas} from "@/lib/nz-place-ideas"

export default function NzPlaceIdeas({placeId}:{placeId:string}) {
  const [selected,setSelected]=useState<string[]>([])
  const [storage,setStorage]=useState(true)
  const place=nzPlanningPlaces.find(item=>item.id===placeId)
  useEffect(()=>{try{setSelected(readNzPlaceIdeas(window.sessionStorage))}catch{setStorage(false)}},[])
  if(!place)return null
  function change(ids:string[]){
    setSelected(ids)
    try{setStorage(writeNzPlaceIdeas(window.sessionStorage,ids))}catch{setStorage(false)}
  }
  const chosen=selected.includes(place.id)
  return <section aria-label="Your South Island place ideas" className="mt-5 rounded-xl border border-emerald-200 bg-white p-4 text-emerald-950">
    <h3 className="font-medium">Places you would like to explore</h3>
    <button type="button" aria-pressed={chosen} className="mt-3 min-h-11 rounded-full border border-emerald-300 px-4 py-2 text-sm font-medium hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700" onClick={()=>change(chosen?selected.filter(id=>id!==place.id):[...selected,place.id])}>{chosen?`Remove ${place.label} from place ideas`:`Add ${place.label} to place ideas`}</button>
    <p role="status" className="mt-3 text-sm">{selected.length?`${selected.length} place idea${selected.length===1?"":"s"} in this tab: ${nzPlanningPlaces.filter(item=>selected.includes(item.id)).map(item=>item.label).join(", ")}.`:"Choose a landscape above, then add the place if it interests you."}</p>
    <p className="mt-2 text-xs leading-6">{storage?"These ideas stay in this browser tab for up to a day. In your private brief, choose Add Place Ideas to Notes, review your notes, then Save My Draft. Adding an idea here does not save a private plan or confirm access or arrangements.":"This browser cannot carry these ideas between pages. Note the names above and add them to your private brief manually."}</p>
    <a className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4" href="/account?country=new-zealand&region=south-island">Review place ideas in your private brief</a>
  </section>
}
