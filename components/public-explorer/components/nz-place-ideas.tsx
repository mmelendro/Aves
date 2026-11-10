"use client"

import {useEffect, useRef, useState} from "react"
import {nzPlanningPlaces, nzPlaceIdeaText, readNzPlaceIdeas, writeNzPlaceIdeas} from "@/components/public-explorer/lib/nz-place-ideas"

export default function NzPlaceIdeas({placeId}:{placeId:string}) {
  const [selected,setSelected]=useState<string[]>([])
  const [storage,setStorage]=useState(true)
  const [copyNotice,setCopyNotice]=useState("")
  const notes=useRef<HTMLTextAreaElement>(null)
  const place=nzPlanningPlaces.find(item=>item.id===placeId)
  useEffect(()=>{try{setSelected(readNzPlaceIdeas(window.sessionStorage))}catch{setStorage(false)}},[])
  if(!place)return null
  function change(ids:string[]){
    setSelected(ids)
    setCopyNotice("")
    try{setStorage(writeNzPlaceIdeas(window.sessionStorage,ids))}catch{setStorage(false)}
  }
  async function copyNotes() {
    const text=nzPlaceIdeaText(selected)
    if(!text)return
    try{
      if(!navigator.clipboard?.writeText)throw new Error("Clipboard unavailable")
      await navigator.clipboard.writeText(text)
      setCopyNotice("Place notes copied. Paste them into Your Interests and Ideas in your private brief, review, then save.")
    }catch{
      notes.current?.focus(); notes.current?.select()
      setCopyNotice("Automatic copying is unavailable. Copy the selected text below, then paste it into your private brief.")
    }
  }
  const chosen=selected.includes(place.id)
  return <section aria-label="Your South Island place ideas" className="mt-5 rounded-xl border border-emerald-200 bg-white p-4 text-emerald-950">
    <h3 className="font-medium">Places you would like to explore</h3>
    <button type="button" aria-pressed={chosen} className="mt-3 min-h-11 rounded-full border border-emerald-300 px-4 py-2 text-sm font-medium hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700" onClick={()=>change(chosen?selected.filter(id=>id!==place.id):[...selected,place.id])}>{chosen?`Remove ${place.label} from place ideas`:`Add ${place.label} to place ideas`}</button>
    <p role="status" className="mt-3 text-sm">{selected.length?`${selected.length} place idea${selected.length===1?"":"s"} in this tab: ${nzPlanningPlaces.filter(item=>selected.includes(item.id)).map(item=>item.label).join(", ")}.`:"Choose a landscape above, then add the place if it interests you."}</p>
    <p className="mt-2 text-xs leading-6">{storage?"These ideas stay in this browser tab for up to a day. In your private brief, choose Add Place Ideas to Notes, review your notes, then Save My Draft. Adding an idea here does not save a private plan or confirm access or arrangements.":"This browser cannot carry these ideas between pages. Note the names above and add them to your private brief manually."}</p>
    {selected.length > 0 && <div className="mt-3 space-y-2">
      <label className="block text-xs font-medium" htmlFor="nz-place-notes-copy">Place notes to copy</label>
      <textarea ref={notes} id="nz-place-notes-copy" aria-label="Place notes to copy" readOnly value={nzPlaceIdeaText(selected)} rows={Math.min(4,Math.max(2,selected.length))} className="block w-full resize-y rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm leading-6" />
      <button type="button" onClick={copyNotes} className="min-h-11 rounded-lg border border-emerald-300 px-4 text-sm font-medium hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700">Copy place notes</button>
      <p className="text-xs leading-6">Use this if your browser or a sign-in page cannot carry your tab’s ideas. Copying does not save or share a plan.</p>
      <p role="status" className="text-xs leading-6">{copyNotice}</p>
    </div>}
    <a className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4" href="/account?country=new-zealand&region=south-island">Review place ideas in your private brief</a>
  </section>
}
