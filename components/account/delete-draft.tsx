"use client"
import {useUiCopy} from "@/components/ui-copy-context"
import {useRef,useState} from "react"
import {accountRequest,errorMessage,type TripPlan} from "./account-api"
import {Button} from "@/components/ui/button"
/** User confirms a specific unchanged draft. This control never deletes on mount. */
export function DeleteDraft({plan,onDeleted,disabled}:{plan:TripPlan;onDeleted:()=>void;disabled:boolean}){
 const uiCopy=useUiCopy()

 const [confirm,setConfirm]=useState(false),[busy,setBusy]=useState(false),[error,setError]=useState(""),lock=useRef(false)
 async function remove(){
  if(lock.current)return;lock.current=true;setBusy(true);setError("")
  try{const result=await accountRequest<{success:boolean}>(`/api/account/plans/${plan.id}`,{method:"DELETE",body:JSON.stringify({expectedUpdatedAt:plan.updatedAt})});if(result.success!==true)throw Error("Deletion could not be confirmed. Refresh saved plans before retrying.");onDeleted()}
  catch(e){setError(errorMessage(e))}finally{lock.current=false;setBusy(false)}
 }
 return <div className="w-full">{confirm?<div className="mt-3 rounded-lg border border-red-200 p-4"><p className="text-sm">{uiCopy("Permanently delete this draft and its checklist, journal, practical records and bird album? Download a complete private backup from the trip workspace first if you want to keep them. Private uploads must be removed before deletion.")}</p><div className="mt-3 flex flex-wrap gap-3"><Button type="button" variant="destructive" disabled={busy||disabled} onClick={()=>void remove()}>{busy ? uiCopy("Deleting draft…") : uiCopy("Permanently delete this draft")}</Button><Button type="button" variant="outline" disabled={busy} onClick={()=>{setConfirm(false);setError("")}}>{uiCopy("Keep draft")}</Button></div></div>:<Button type="button" variant="ghost" disabled={disabled} onClick={()=>setConfirm(true)}>{uiCopy("Delete unused draft")}</Button>}{error&&<p role="alert" className="mt-2 text-sm text-red-800">{uiCopy(error)}</p>}</div>
}
