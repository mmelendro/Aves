"use client"
import {useUiCopy} from "@/components/ui-copy-context"
import {useEffect,useId,useRef,useState} from "react"
import {accountRequest,errorMessage,tripCountry,type TripPlan} from "./account-api"
import type {DiscoveryItem} from "@/lib/discovery-index"
type Saved={ids:string[];places:DiscoveryItem[]}
export default function FavouritePlaces({plans,onSaved}:{plans:TripPlan[];onSaved:(plan:TripPlan)=>void}){
 const uiCopy=useUiCopy()

 const id=useId(),busyRef=useRef(false),[state,setState]=useState<Saved|null>(null),[feedback,setFeedback]=useState(""),[busy,setBusy]=useState(false),[query,setQuery]=useState(""),[chosen,setChosen]=useState(""),[target,setTarget]=useState(""),[attempt,setAttempt]=useState(0),[failed,setFailed]=useState(false)
 useEffect(()=>{let active=true;setFailed(false);accountRequest<Saved>("/api/account/favourites").then(value=>{if(!Array.isArray(value.ids)||!Array.isArray(value.places))throw Error("Your favourites could not be opened.");if(active){setState(value);setFeedback("")}}).catch(e=>{if(active){setFeedback(errorMessage(e));setFailed(true)}});return()=>{active=false}},[attempt])
 async function change(placeId:string,remove=false){
  if(busyRef.current)return;busyRef.current=true;setBusy(true);setFeedback("")
  try{const r=await accountRequest<{placeId:string;stored?:boolean;removed?:boolean}>("/api/account/favourites",{method:remove?"DELETE":"POST",body:JSON.stringify({placeId})});if(r.placeId!==placeId||!(remove?r.removed:r.stored))throw Error("This change could not be confirmed. Please retry.");setState(s=>s?{...s,ids:remove?s.ids.filter(v=>v!==placeId):[...new Set([...s.ids,placeId])]}:s);setFeedback(remove?"Favourite removed.":"Place saved to your private favourites.")}
  catch(e){setFeedback(errorMessage(e))}finally{busyRef.current=false;setBusy(false)}
 }
 async function reuse(){
  const plan=plans.find(p=>p.id===target),place=state?.places.find(p=>p.id===chosen)
  if(busyRef.current||!plan||!place||plan.status!=="draft"||tripCountry(plan.country)!==place.countryId)return
  const line=`Place idea [${place.id}]: ${place.name}. Reference: ${place.sourceUrl??"https://aves.bio"+place.href}`
  const message=plan.message.split(/\r?\n/).map(s=>s.trim()).includes(line)?plan.message:`${plan.message}${plan.message?"\n\n":""}${line}`
  if(message.length>5000){setFeedback("Your notes are nearly full. Shorten them before adding this place.");return}
  busyRef.current=true;setBusy(true);setFeedback("")
  try{const {title,country,regions,travelWhen,partySize,questionnaire}=plan
   const r=await accountRequest<{plan:TripPlan}>(`/api/account/plans/${plan.id}`,{method:"PATCH",body:JSON.stringify({title,country,regions,travelWhen,partySize,message,...(questionnaire?{questionnaire}:{}),expectedUpdatedAt:plan.updatedAt})})
   if(r.plan?.id!==plan.id||r.plan.message!==message||r.plan.status!=="draft"||!r.plan.updatedAt)throw Error("The saved trip could not be confirmed. Keep your favourite and retry.")
   onSaved(r.plan);setFeedback("Place added to the saved trip’s notes. No booking was made.")
  }catch(e){setFeedback(errorMessage(e))}finally{busyRef.current=false;setBusy(false)}
 }
 const shown=state?.places.filter(p=>`${p.name} ${p.countryId}`.toLocaleLowerCase().includes(query.toLocaleLowerCase()))??[]
 const favourite=state?.places.find(p=>p.id===chosen),targets=plans.filter(p=>p.status==="draft"&&tripCountry(p.country)===favourite?.countryId)
 return <section aria-label={uiCopy("Favourite places")} className="space-y-4"><h3 className="text-xl font-medium">{uiCopy("Your favourite places, across trips")}</h3><p className="text-sm leading-6 text-gray-600">{uiCopy("Saved privately to your account. Keep public place references here, then deliberately add one to a saved draft in the same country. This does not reserve or endorse a place.")}</p>
  {feedback&&<p role="status" className="text-sm">{uiCopy(feedback)}</p>}
  {!state?(failed?<button type="button" className="min-h-11 rounded border px-4" onClick={()=>setAttempt(attempt+1)}>{uiCopy("Try opening favourites again")}</button>:<p>{uiCopy("Opening your favourites…")}</p>):<fieldset disabled={busy} className="space-y-4">
   <label htmlFor={`${id}-find`} className="block">{uiCopy("Find a reviewed place")}<input id={`${id}-find`} className="mt-1 block min-h-11 w-full rounded border px-3" value={query} maxLength={120} onChange={e=>{setQuery(e.target.value);setChosen("");setTarget("")}}/></label>
   <label htmlFor={`${id}-place`} className="block">{uiCopy("Place")}<select id={`${id}-place`} aria-label={uiCopy("Place")} value={shown.some(p=>p.id===chosen)?chosen:""} onChange={e=>{setChosen(e.target.value);setTarget("")}} className="mt-1 block min-h-11 w-full min-w-0 rounded border px-2"><option value="">{uiCopy("Choose a place")}</option>{shown.map(p=><option key={p.id} value={p.id}>{p.name} · {p.countryId}</option>)}</select></label>
   <button type="button" className="min-h-11 rounded border px-4" disabled={!chosen||state.ids.includes(chosen)} onClick={()=>void change(chosen)}>{uiCopy("Save favourite place")}</button>
   <ul className="space-y-2">{state.ids.map(key=>{const p=state.places.find(p=>p.id===key);return p?<li key={key} className="flex flex-wrap items-center gap-3 rounded border p-3"><a href={p.href} className="min-w-0 break-words underline">{p.name}</a><button type="button" className="min-h-11 px-2 underline" onClick={()=>{setChosen(key);setTarget("")}}>{uiCopy("Use in a trip")}<span className="sr-only">: {p.name}</span></button><button type="button" className="min-h-11 px-2 underline" onClick={()=>void change(key,true)}>{uiCopy("Remove")}<span className="sr-only">: {p.name}</span></button></li>:null})}</ul>
   {!state.ids.length&&<p className="text-sm">{uiCopy("No favourite places saved yet.")}</p>}
   {favourite&&state.ids.includes(chosen)&&<div className="space-y-3 rounded-xl bg-emerald-50 p-4"><p>{uiCopy("Use ")}{favourite.name} {uiCopy(" in a saved draft")}</p><label htmlFor={`${id}-trip`} className="block">{uiCopy("Your trip")}<select id={`${id}-trip`} aria-label={uiCopy("Your trip")} className="mt-1 block min-h-11 w-full rounded border px-2" value={target} onChange={e=>setTarget(e.target.value)}><option value="">{uiCopy("Choose a draft in ")}{favourite.countryId}</option>{targets.map(p=><option key={p.id} value={p.id}>{p.title}</option>)}</select></label><button type="button" disabled={!target} className="min-h-11 rounded border bg-white px-4" onClick={()=>void reuse()}>{uiCopy("Add place to this saved trip")}</button><p className="text-xs">{uiCopy("Your existing notes stay intact. An uncertain response keeps this favourite available for retry.")}</p></div>}
  </fieldset>}
 </section>
}
