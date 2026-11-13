"use client"
import dynamic from "next/dynamic"
import {useEffect,useRef,useState} from "react"
import {useUiCopy} from "@/components/ui-copy-context"
import {islandPlanners,islandPlanner} from "@/lib/island-planners"
import {readPlannerRecovery} from "@/lib/planner-recovery"
import {emptyItineraries,itineraryReceiptSchema,itinerariesSchema,replaceSavedRoute} from "@/lib/saved-itineraries"
import type {TripDraft} from "@/lib/island-planning-types"
import {accountRequest,errorMessage} from "./account-api"
import {confirmDiscardPendingEdits} from "./unsaved-changes"
import {MapLayerProvider} from "../map-layer-context"
import {TripMapProvider} from "../trip-planner/trip-map-context"
const IslandEditor=dynamic(()=>import("../island-trip-planner"),{loading:()=> <p role="status">Opening the itinerary editor…</p>})
export default function SavedItineraryEditor({planId}:{planId:string}){
 const uiCopy=useUiCopy(),lock=useRef(false)
 const [saved,setSaved]=useState({revision:0,data:emptyItineraries()}),[incoming,setIncoming]=useState<TripDraft[]>([]),[loading,setLoading]=useState(true),[failed,setFailed]=useState(false),[busy,setBusy]=useState(false),[notice,setNotice]=useState(""),[attempt,setAttempt]=useState(0),[editing,setEditing]=useState<string|null>(null)
 useEffect(()=>{let active=true;setLoading(true);setFailed(false);accountRequest<unknown>(`/api/account/plans/${planId}/itineraries`).then(raw=>{if(active)setSaved(itineraryReceiptSchema.parse(raw))}).catch(e=>{if(active){setFailed(true);setNotice(errorMessage(e))}}).finally(()=>{if(active)setLoading(false)});return()=>{active=false}},[planId,attempt])
 useEffect(()=>{try{setIncoming(islandPlanners.flatMap(p=>{const recovery=readPlannerRecovery(window.sessionStorage,p),draft=p.readTripDraft(window.sessionStorage)??(recovery&&JSON.stringify(recovery.input)===JSON.stringify(recovery.draft?.input)?recovery.draft:null);return draft?[draft]:[]}))}catch{}},[])
 async function save(draft:TripDraft){
  if(lock.current||loading||failed)throw Error("Reopen the saved itinerary before saving.")
  const data=itinerariesSchema.parse(replaceSavedRoute(saved.data,draft));lock.current=true;setBusy(true);setNotice("")
  try{
   const receipt=itineraryReceiptSchema.parse(await accountRequest<unknown>(`/api/account/plans/${planId}/itineraries`,{method:"PUT",body:JSON.stringify({expectedRevision:saved.revision,data})}))
   if(receipt.revision!==saved.revision+1||JSON.stringify(receipt.data)!==JSON.stringify(data))throw Error("The saved itinerary did not match these edits. Keep them and retry.")
   setSaved(receipt);setIncoming(list=>list.filter(r=>(r.input.islandId||"south-island")!==(draft.input.islandId||"south-island")));setEditing(null);setNotice("Your editable itinerary is saved privately. Existing notes and bookings are unchanged.");window.dispatchEvent(new Event("aves:itineraries-changed"))
  }finally{lock.current=false;setBusy(false)}
 }
 const route=saved.data.routes.find(r=>r.input.islandId===editing),planner=editing?islandPlanner(editing):null
 return <section className="rounded-2xl border border-emerald-200 bg-white p-5 sm:p-7 space-y-4" aria-label={uiCopy("Your editable itineraries")}><h2 className="text-2xl text-emerald-950">{uiCopy("Your editable itineraries")}</h2><p className="text-sm leading-6">{uiCopy("Keep a private day by day copy alongside your brief. Editing it does not change a submitted brief, supplier booking, expense or journal. Existing prose notes remain available in My Trips.")}</p>
 {loading?<p role="status">{uiCopy("Opening saved itineraries…")}</p>:failed?<div role="alert"><p>{uiCopy(notice)}</p><button type="button" className="min-h-11 underline" onClick={()=>setAttempt(a=>a+1)}>{uiCopy("Retry saved itineraries")}</button></div>:<>
 {!saved.data.routes.length&&<p className="text-sm">{uiCopy("No editable route has been saved yet. Build a route on an island page, then review a copy from this tab below.")}</p>}
 {saved.data.routes.map(r=>{const p=islandPlanner(r.input.islandId);return <article key={r.input.islandId} className="rounded-xl border border-emerald-100 p-4"><h3>{p?.context.name} · {r.input.days} {uiCopy("days")}</h3><p className="text-sm">{r.input.currency} · {r.input.adults??1} {uiCopy("adults")} · {r.input.rooms??1} {uiCopy("rooms/units")}</p>{p?.validTripDraft(r)?<button type="button" className="min-h-11 underline" disabled={busy} onClick={()=>{if(confirmDiscardPendingEdits())setEditing(r.input.islandId)}}>{uiCopy("Edit saved itinerary")}</button>:<p>{uiCopy("Catalogue references changed. Keep a backup and review this route before rebuilding.")}</p>}</article>})}
 {incoming.map(r=>{const p=islandPlanner(r.input.islandId||"south-island");return p&&<details key={p.context.id} className="rounded-xl border border-emerald-200 p-4"><summary className="min-h-11 cursor-pointer">{uiCopy("Review editable copy from this tab")}: {p.context.name} · {r.input.days} {uiCopy("days")}</summary><pre className="max-h-80 overflow-auto whitespace-pre-wrap text-xs">{p.tripDraftText(r)}</pre><p className="text-sm">{uiCopy("Saving this copy replaces only the editable route for this island. Review the existing route above first. Other islands, notes and records stay intact.")}</p><button type="button" disabled={busy||Boolean(editing)} className="min-h-11 underline" onClick={()=>void save(r).catch(e=>setNotice(errorMessage(e)))}>{uiCopy("Save reviewed editable copy")}</button></details>})}
 {route&&planner&&<div><button type="button" className="min-h-11 underline" onClick={()=>{if(confirmDiscardPendingEdits())setEditing(null)}}>{uiCopy("Close itinerary editor")}</button><TripMapProvider><MapLayerProvider><IslandEditor key={`${saved.revision}:${editing}`} planner={planner} initialDraft={route} onSave={save}/></MapLayerProvider></TripMapProvider></div>}
 {notice&&<p role="status">{uiCopy(notice)}</p>}
 <button type="button" className="min-h-11 underline" disabled={busy||Boolean(editing)} onClick={()=>setAttempt(a=>a+1)}>{uiCopy("Refresh saved itineraries")}</button>
 </>}
 </section>
}
