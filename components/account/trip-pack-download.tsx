"use client"
import {useRef,useState} from "react"
import type {Preparation} from "@/lib/trip-workspace"
import type {TravelRecord} from "@/lib/trip-records"
export default function TripPackDownload({planId,preparations,records,workspaceRevision,recordsRevision,ready}:{planId:string;preparations:Preparation[];records:TravelRecord[];workspaceRevision:number;recordsRevision:number;ready:boolean}){
 const [itinerary,setItinerary]=useState(true),[tasks,setTasks]=useState<string[]>([]),[selected,setSelected]=useState<string[]>([]),[busy,setBusy]=useState(false),[feedback,setFeedback]=useState(""),busyRef=useRef(false)
 const toggle=(ids:string[],id:string)=>ids.includes(id)?ids.filter(v=>v!==id):[...ids,id]
 async function download(){
  if(!ready||busyRef.current)return;busyRef.current=true;setBusy(true);setFeedback("")
  try{const response=await fetch(`/api/account/plans/${planId}/pack`,{method:"POST",credentials:"same-origin",cache:"no-store",headers:{"Content-Type":"application/json"},body:JSON.stringify({includeItinerary:itinerary,preparationIds:tasks,recordIds:selected,workspaceRevision,recordsRevision})})
   if(!response.ok){const r=await response.json().catch(()=>null);throw Error(r?.error||"The trip pack could not be confirmed. Please retry.")}
   if(!response.headers.get("content-type")?.startsWith("text/html")||!response.headers.get("content-disposition")?.startsWith("attachment"))throw Error("The downloaded file could not be confirmed.")
   const file=await response.blob(),url=URL.createObjectURL(file),a=document.createElement("a");a.href=url;a.download="aves-private-trip-pack.html";document.body.appendChild(a);a.click();a.remove();window.setTimeout(()=>URL.revokeObjectURL(url),1000);setFeedback("Your selected trip pack is downloaded. Keep it private.")
  }catch(e){setFeedback(e instanceof Error?e.message:"Please retry the download.")}finally{busyRef.current=false;setBusy(false)}
 }
 return <details className="rounded-xl border border-emerald-200 p-4"><summary className="min-h-11 cursor-pointer font-medium text-emerald-950">Download a practical trip pack</summary><p className="mt-3 text-sm leading-6">Choose exactly what to include from your saved trip. The pack opens offline and can be printed. Selected booking references and notes are private. Journal entries, removed items, photos and attachment files are excluded.</p>{!ready&&<p className="mt-3 text-sm">Save the workspace and travel records before downloading current details.</p>}<fieldset disabled={!ready||busy} className="mt-4 space-y-3">
  <label className="flex min-h-11 items-center gap-3"><input type="checkbox" checked={itinerary} onChange={e=>setItinerary(e.target.checked)}/>Saved itinerary and planning notes</label>
  <div><h3 className="font-medium">Preparations to include</h3>{preparations.filter(t=>!t.deleted).map(t=><label key={t.id} className="flex min-h-11 items-center gap-3"><input type="checkbox" checked={tasks.includes(t.id)} onChange={()=>setTasks(toggle(tasks,t.id))}/>{t.title}</label>)}</div>
  <div><h3 className="font-medium">Practical records to include</h3>{records.filter(r=>!r.deleted).map(r=><label key={r.id} className="flex min-h-11 items-center gap-3"><input type="checkbox" checked={selected.includes(r.id)} onChange={()=>setSelected(toggle(selected,r.id))}/>{r.title} · {r.kind}</label>)}</div>
  <button type="button" onClick={()=>void download()} disabled={!itinerary&&!tasks.length&&!selected.length} className="min-h-11 rounded-lg bg-emerald-800 px-4 text-white">{busy?"Preparing your file…":"Download selected trip pack"}</button>
 </fieldset>{feedback&&<p role="status" className="mt-3 text-sm">{feedback}</p>}</details>
}
