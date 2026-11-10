"use client"

import {useEffect,useRef,useState} from "react"
import {TripPlanEditor} from "./trip-plan-editor"
import type {TripFields,TripPlan} from "./account-api"
import {NZ_PLACE_IDEAS_KEY,writeNzPlaceIdeas} from "@/lib/nz-place-ideas"

/** Preview fixture only: save/reopen is synthetic memory, never an account/API. */
export default function SyntheticPlannerCheck(){
 const [mode,setMode]=useState<"idle"|"edit"|"saved">("idle")
 const [saved,setSaved]=useState<TripPlan|null>(null)
 const [calls,setCalls]=useState(0)
 const [failNext,setFailNext]=useState(false)
 const oldBasket=useRef<string|null>(null)
 const active=useRef(false)
 async function transport<T>(path:string,options:RequestInit={}):Promise<T>{
  if(!/^\/api\/account\/plans(?:\/[a-z0-9-]+)?$/.test(path) || !["POST","PATCH"].includes(options.method||""))throw new Error("Unexpected synthetic request")
  setCalls(value=>value+1)
  if(failNext){setFailNext(false);throw new Error("Synthetic save failure. No network request was made.")}
  const fields=JSON.parse(String(options.body)) as TripFields & {id?:string;expectedUpdatedAt?:string}
  const plan:TripPlan={...fields,id:fields.id||saved?.id||"00000000-0000-4000-8000-000000000123",status:"draft",updatedAt:new Date().toISOString()}
  return {plan} as T
 }
 function start(){
  if(!active.current){oldBasket.current=sessionStorage.getItem(NZ_PLACE_IDEAS_KEY);active.current=true}
  writeNzPlaceIdeas(sessionStorage,["mountains","coast"])
  setSaved(null);setCalls(0);setMode("edit")
 }
 function restoreBasket(){
  if(active.current){if(oldBasket.current===null)sessionStorage.removeItem(NZ_PLACE_IDEAS_KEY);else sessionStorage.setItem(NZ_PLACE_IDEAS_KEY,oldBasket.current)}
  active.current=false
 }
 useEffect(()=>()=>restoreBasket(),[])
 function clear(){
  restoreBasket();setSaved(null);setCalls(0);setFailNext(false);setMode("idle")
 }
 return <main className="mx-auto max-w-3xl space-y-5 p-4 sm:p-8 text-gray-900">
  <h1 className="text-2xl font-semibold">Synthetic planner UI check</h1>
  <p>This preview fixture uses public place IDs and synthetic notes only. No sign-in, account API, email or database save. Do not enter personal information. Save/reopen here checks the interface, not hosted persistence.</p>
  <p role="status">Synthetic transport calls: {calls}</p>
  {mode==="idle"?<button type="button" className="min-h-11 rounded border px-4" onClick={start}>Load synthetic place ideas</button>:<>
   <button type="button" className="min-h-11 rounded border px-4" onClick={clear}>Clear synthetic fixture</button>
   {mode==="edit"&&<><label className="flex min-h-11 items-center gap-2"><input type="checkbox" checked={failNext} onChange={e=>setFailNext(e.target.checked)}/>Fail next synthetic save</label><TripPlanEditor key={saved?.updatedAt||"new"} plan={saved||undefined} initial={{country:"new-zealand",regions:["south-island"]}} transport={transport} onSaved={plan=>{setSaved(plan);setMode("saved")}} onCancel={()=>{if(saved)setMode("saved");else clear()}}/></>}
   {mode==="saved"&&saved&&<section aria-label="Synthetic saved draft" className="space-y-3 rounded border p-4"><h2 className="text-xl">Synthetic saved draft</h2><p>Saved in this fixture’s memory only.</p><pre className="whitespace-pre-wrap break-words" aria-label="Synthetic saved notes">{saved.message}</pre><button type="button" className="min-h-11 rounded border px-4" onClick={()=>setMode("edit")}>Reopen synthetic draft</button></section>}
  </>}
 </main>
}
