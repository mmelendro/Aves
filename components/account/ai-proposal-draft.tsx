"use client"

import { useEffect, useId, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { accountRequest, errorMessage } from "./account-api"
import type { AiDraft } from "@/lib/ai-proposal-handlers"

/** Separate unpriced notes: no send action, browser storage or public share URL.
 * The server/DB authorize every operation; hiding this panel is not a permission. */
export function AiProposalDraft({quoteId,disabled,onUse}:{quoteId:string;disabled:boolean;onUse:(text:string)=>void}){
 const fieldId=useId()
 const [draft,setDraft]=useState<AiDraft|null>(null)
 const [text,setText]=useState("")
 const [busy,setBusy]=useState(true)
 const [feedback,setFeedback]=useState("")
 const busyRef=useRef(false)
 const dirty=Boolean(draft&&text!==draft.text)
 useEffect(()=>{
  const controller=new AbortController()
  accountRequest<{draft:AiDraft|null}>(`/api/admin/quotes/${quoteId}/ai-draft`,{signal:controller.signal})
   .then(result=>{if(!controller.signal.aborted){setDraft(result.draft);setText(result.draft?.text||"")}})
   .catch(error=>{if(!controller.signal.aborted)setFeedback(errorMessage(error))})
   .finally(()=>{if(!controller.signal.aborted)setBusy(false)})
  return ()=>controller.abort()
 },[quoteId])

 async function requestDraft(save:boolean){
  if(busyRef.current)return
  busyRef.current=true;setBusy(true);setFeedback("")
  try{
   const result=await accountRequest<{draft:AiDraft}>(`/api/admin/quotes/${quoteId}/ai-draft`,{
    method:save?"PATCH":"POST",body:JSON.stringify(save?{text,expectedUpdatedAt:draft?.updatedAt}:{})})
   if(!result.draft?.text||!result.draft.updatedAt)throw new Error("The saved draft could not be confirmed. Reopen it before retrying.")
   setDraft(result.draft);setText(result.draft.text)
   setFeedback(save?"Private changes saved. Nothing sent.":"AI draft saved privately. Review the assumptions and sources before preparing a quote.")
  }catch(error){setFeedback(errorMessage(error))}
  finally{busyRef.current=false;setBusy(false)}
 }
 return <section aria-label="Private AI working draft" className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5 sm:p-7 space-y-4">
  <h3 className="text-xl font-semibold text-gray-900">Private AI working draft</h3>
  <p className="text-sm leading-6 text-gray-600">Uses this saved New Zealand request and a small reviewed reference library. Dates, bird ranges, suppliers, availability and prices need your checks. Only the AVES owner can read these unpriced notes.</p>
  {!draft?<Button onClick={()=>void requestDraft(false)} disabled={busy||disabled} className="bg-emerald-700 hover:bg-emerald-800">{busy?"Loading or drafting…":"Generate private AI draft"}</Button>:<>
   <label htmlFor={fieldId} className="block text-sm font-medium text-gray-900">Journey story, route options and review questions</label>
   <Textarea id={fieldId} value={text} onChange={event=>setText(event.target.value)} rows={16} maxLength={16000} disabled={busy||disabled} className="bg-white leading-6" />
   <div className="flex flex-wrap gap-3">
    <Button onClick={()=>void requestDraft(true)} disabled={busy||disabled||!dirty||!text.trim()}>Save private changes</Button>
    <Button variant="outline" disabled={busy||disabled||dirty||text.length>10000} onClick={()=>onUse(text)}>Use in proposal</Button>
   </div>
   {dirty&&<p className="text-sm text-amber-800">Unsaved edits—save before leaving this request or using them in a proposal.</p>}
   {text.length>10000&&<p className="text-sm text-amber-800">Shorten this to 10,000 characters before copying into a formal proposal.</p>}
   <p className="text-xs leading-5 text-gray-500">AI model: {draft.model}. This is not a quotation or reservation. Using it in a proposal leaves the price blank; review and sending remain separate actions.</p>
  </>}
  {feedback&&<p role="status" className="text-sm text-emerald-900 break-words">{feedback}</p>}
 </section>
}
