"use client"
import {accountRequest} from "./account-api"
import {tripPackInfoSchema} from "@/lib/trip-pack"
import {useUiCopy} from "@/components/ui-copy-context"
import {useEffect,useRef,useState} from "react"
import type {Preparation} from "@/lib/trip-workspace"
import type {TravelRecord} from "@/lib/trip-records"
export default function TripPackDownload({planId,preparations,records,workspaceRevision,recordsRevision,ready}:{planId:string;preparations:Preparation[];records:TravelRecord[];workspaceRevision:number;recordsRevision:number;ready:boolean}){
 const uiCopy=useUiCopy()

 const [itinerary,setItinerary]=useState(true),[tasks,setTasks]=useState<string[]>([]),[selected,setSelected]=useState<string[]>([]),[busy,setBusy]=useState(false),[feedback,setFeedback]=useState(""),busyRef=useRef(false)
 const [brief,setBrief]=useState(false),[editable,setEditable]=useState(false),[info,setInfo]=useState<{planUpdatedAt:string;itineraryRevision:number;routeCount:number}|null>(null),[infoBusy,setInfoBusy]=useState(false)
 async function loadInfo(){setInfoBusy(true);try{const r=tripPackInfoSchema.parse(await accountRequest<unknown>(`/api/account/plans/${planId}/pack`));setInfo(r);if(!r.routeCount)setEditable(false);setFeedback(r.routeCount?"Saved brief and route details loaded. Review your selection.":"Saved brief loaded. No editable itinerary is saved for this trip.")}catch(e){setInfo(null);setFeedback(e instanceof Error?e.message:"Saved pack details could not be loaded.")}finally{setInfoBusy(false)}}
 const [selectionNotice,setSelectionNotice]=useState("")
 useEffect(()=>{
  const activeTasks=new Set(preparations.filter(t=>!t.deleted).map(t=>t.id)),activeRecords=new Set(records.filter(r=>!r.deleted).map(r=>r.id))
  const nextTasks=tasks.filter(id=>activeTasks.has(id)),nextRecords=selected.filter(id=>activeRecords.has(id))
  if(nextTasks.length!==tasks.length||nextRecords.length!==selected.length){setTasks(nextTasks);setSelected(nextRecords);setSelectionNotice("Unavailable items were removed from your selection. Review the remaining choices before downloading.")}
 },[preparations,records,tasks,selected])
 const toggle=(ids:string[],id:string)=>ids.includes(id)?ids.filter(v=>v!==id):[...ids,id]
 async function download(){
  if(!ready||busyRef.current||infoBusy||((brief||editable)&&!info))return;busyRef.current=true;setBusy(true);setFeedback("")
  try{const response=await fetch(`/api/account/plans/${planId}/pack`,{method:"POST",credentials:"same-origin",cache:"no-store",headers:{"Content-Type":"application/json"},body:JSON.stringify({includeItinerary:itinerary,includeBrief:brief,includeEditableRoutes:editable,...(info?{planUpdatedAt:info.planUpdatedAt,itineraryRevision:info.itineraryRevision}:{}),preparationIds:tasks.filter(id=>preparations.some(t=>t.id===id&&!t.deleted)),recordIds:selected.filter(id=>records.some(r=>r.id===id&&!r.deleted)),workspaceRevision,recordsRevision})})
   if(!response.ok){const r=await response.json().catch(()=>null);throw Error(r?.error||"The trip pack could not be confirmed. Please retry.")}
   if(!response.headers.get("content-type")?.startsWith("text/html")||!response.headers.get("content-disposition")?.startsWith("attachment"))throw Error("The downloaded file could not be confirmed.")
   const file=await response.blob(),url=URL.createObjectURL(file),a=document.createElement("a");a.href=url;a.download="aves-private-trip-pack.html";document.body.appendChild(a);a.click();a.remove();window.setTimeout(()=>URL.revokeObjectURL(url),1000);setFeedback("Your selected offline trip pack is downloaded. Open it once to check it. Download a fresh copy after changes.")
  }catch(e){setFeedback(e instanceof Error?e.message:"Please retry the download.")}finally{busyRef.current=false;setBusy(false)}
 }
 return <details className="rounded-xl border border-emerald-200 p-4"><summary className="min-h-11 cursor-pointer font-medium text-emerald-950">{uiCopy("Download a practical trip pack")}</summary><p className="mt-3 text-sm leading-6">{uiCopy("Choose exactly what to include from your saved trip. The pack opens offline and can be printed. Selected booking references and notes are private. Journal entries, removed items, photos and attachment files are excluded.")}</p><p className="mt-3 text-sm leading-6">{uiCopy("This is a dated offline snapshot, not a live booking feed. After a change, save your trip and download a replacement. To clear private local data, delete the file and any printed PDF from Downloads, Files and their Recently Deleted or Trash folders, including synced copies. Signing out does not remove downloaded files. The app does not cache private trips.")}</p>{!ready&&<p className="mt-3 text-sm">{uiCopy("Save the workspace and travel records before downloading current details.")}</p>}<fieldset disabled={!ready||busy} className="mt-4 space-y-3">
  <label className="flex min-h-11 items-center gap-3"><input type="checkbox" checked={itinerary} onChange={e=>setItinerary(e.target.checked)}/>{uiCopy("Saved itinerary and planning notes")}</label>
  <label className="flex min-h-11 items-center gap-3"><input type="checkbox" checked={brief} onChange={e=>{setBrief(e.target.checked);if(e.target.checked)void loadInfo()}}/>{uiCopy("Saved destination, dates, party and spending preferences")}</label>
  <label className="flex min-h-11 items-center gap-3"><input type="checkbox" checked={editable} onChange={e=>{setEditable(e.target.checked);if(e.target.checked)void loadInfo()}}/>{uiCopy("Saved editable itineraries")}</label>
  {(brief||editable||info)&&<button type="button" disabled={infoBusy} className="min-h-11 underline" onClick={()=>void loadInfo()}>{uiCopy(infoBusy?"Loading saved pack details…":"Refresh saved pack details")}</button>}
  <div><h3 className="font-medium">{uiCopy("Preparations to include")}</h3>{preparations.filter(t=>!t.deleted).map(t=><label key={t.id} className="flex min-h-11 items-center gap-3"><input type="checkbox" checked={tasks.includes(t.id)} onChange={()=>setTasks(toggle(tasks,t.id))}/>{t.title}</label>)}</div>
  <div><h3 className="font-medium">{uiCopy("Practical records to include")}</h3>{records.filter(r=>!r.deleted).map(r=><label key={r.id} className="flex min-h-11 items-center gap-3"><input type="checkbox" checked={selected.includes(r.id)} onChange={()=>setSelected(toggle(selected,r.id))}/>{r.title} · {r.kind}</label>)}</div>
  <button type="button" onClick={()=>void download()} disabled={infoBusy||((brief||editable)&&!info)||(!itinerary&&!brief&&!editable&&!tasks.length&&!selected.length)} className="min-h-11 rounded-lg bg-emerald-800 px-4 text-white">{busy ? uiCopy("Preparing your file…") : uiCopy("Download selected trip pack")}</button>
 </fieldset>{selectionNotice&&<p role="status" className="mt-3 text-sm">{uiCopy(selectionNotice)}</p>}{feedback&&<p role="status" className="mt-3 text-sm">{uiCopy(feedback)}</p>}</details>
}
