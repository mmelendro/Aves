"use client"
import {useUnsavedChanges} from "./unsaved-changes"
import {useUiCopy} from "@/components/ui-copy-context"
import {createContext,useCallback,useContext,useEffect,useId,useRef,useState,type ReactNode} from "react"
import {Button} from "@/components/ui/button"
import PhotoZoom from "@/components/photo-zoom"
import {accountRequest,errorMessage} from "./account-api"
import {MAX_TRIP_MEDIA_BYTES,mediaDetailsSchema,mediaItemSchema,mediaListSchema,mediaSignature,type TripMediaItem} from "@/lib/trip-media"
import {prepareJournalPhoto} from "@/lib/prepare-journal-photo"
const field="mt-1 block min-h-11 w-full min-w-0 rounded-xl border border-emerald-200 bg-white px-3 py-2 text-sm"
type MediaContextValue={planId:string;items:TripMediaItem[];loading:boolean;error:string;reload:()=>Promise<void>;replace:(item:TripMediaItem)=>void;remove:(id:string)=>void}
const MediaContext=createContext<MediaContextValue|null>(null)
export function TripMediaProvider({planId,children}:{planId:string;children:ReactNode}){
  const [items,setItems]=useState<TripMediaItem[]>([]),[loading,setLoading]=useState(true),[error,setError]=useState("")
  const active=useRef(true)
  const reload=useCallback(async()=>{
    setLoading(true);setError("")
    try{const result=mediaListSchema.parse(await accountRequest<unknown>(`/api/account/plans/${planId}/media`));if(active.current)setItems(result.items)}catch(e){if(active.current)setError(errorMessage(e))}finally{if(active.current)setLoading(false)}
  },[planId])
  useEffect(()=>{active.current=true;void reload();return()=>{active.current=false}},[reload])
  return <MediaContext.Provider value={{planId,items,loading,error,reload,replace:item=>setItems(current=>current.some(m=>m.id===item.id)?current.map(m=>m.id===item.id?item:m):[...current,item]),remove:id=>setItems(current=>current.filter(m=>m.id!==id))}}>{children}</MediaContext.Provider>
}
function useMedia(){const value=useContext(MediaContext);if(!value)throw new Error("Trip media provider required");return value}
export function JournalMediaCard({item}:{item:TripMediaItem}){
 const uiCopy=useUiCopy()

  const {planId,replace,remove}=useMedia(),busyRef=useRef(false),prefix=useId()
  const [details,setDetails]=useState(()=>mediaDetailsSchema.strip().parse(item)),[dirty,setDirty]=useState(false),[busy,setBusy]=useState(false),[feedback,setFeedback]=useState("")
  const [view,setView]=useState(false),[confirmRemove,setConfirmRemove]=useState(false)
  useEffect(()=>{setDetails(mediaDetailsSchema.strip().parse(item));setDirty(false)},[item.id,item.revision])
  useUnsavedChanges(dirty,uiCopy("You have unsaved media details. Leave and discard them?"))
  async function save(){
    if(busyRef.current)return
    const parsed=mediaDetailsSchema.safeParse(details);if(!parsed.success){setFeedback("Check the date and note lengths before saving.");return}
    busyRef.current=true;setBusy(true);setFeedback("")
    try{const r=await accountRequest<{item:unknown}>(`/api/account/plans/${planId}/media/${item.id}`,{method:"PATCH",body:JSON.stringify({...parsed.data,expectedRevision:item.revision})});const saved=mediaItemSchema.parse(r.item);if(saved.id!==item.id||saved.revision!==item.revision+1||JSON.stringify(mediaDetailsSchema.strip().parse(saved))!==JSON.stringify(parsed.data))throw Error("The saved details could not be confirmed. Keep them here and retry.");replace(saved);setDirty(false);setFeedback("Upload details saved.")}catch(e){setFeedback(errorMessage(e))}finally{busyRef.current=false;setBusy(false)}
  }
  async function erase(){
    if(busyRef.current)return;busyRef.current=true;setBusy(true);setView(false);setFeedback("")
    try{const result=await accountRequest<{removed:boolean;id:string}>(`/api/account/plans/${planId}/media/${item.id}`,{method:"DELETE",body:JSON.stringify({expectedRevision:item.revision})});if(result.removed!==true||result.id!==item.id)throw Error("Removal could not be confirmed. Reopen and review this upload.");remove(item.id)}catch(e){setFeedback(errorMessage(e))}finally{busyRef.current=false;setBusy(false)}
  }
  const src=`/api/account/plans/${planId}/media/${item.id}/content`
  return <article className="rounded-xl border border-emerald-100 bg-white p-4 space-y-4">
    <div className="flex flex-wrap items-center justify-between gap-3"><p className="font-medium text-emerald-950 break-words">{item.caption||uiCopy("Private {kind}",{kind:uiCopy(item.kind)})}</p><span className="text-xs text-gray-500">{(item.bytes/1024).toFixed(0)} KiB</span></div>
    {item.state==="ready"?<><Button type="button" variant="outline" aria-expanded={view} onClick={()=>setView(!view)}>{view ? uiCopy("Hide upload") : item.kind==="photo" ? uiCopy("View private photo") : item.kind==="audio" ? uiCopy("Play recording") : uiCopy("Document details")}</Button>{view&&(item.kind==="document"?<p className="text-sm text-gray-600">{uiCopy("PDF documents download as private copies. They are not embedded or opened automatically.")}</p>:item.kind==="photo"?<div className="relative h-72 sm:h-96 overflow-hidden rounded-xl bg-emerald-50"><PhotoZoom label={item.caption||"Private journal photo"}>{/* Keep the authenticated URL out of Next's public image cache. */}<img src={src} alt={item.caption||"Your private journal photograph"} className="h-full w-full object-contain" onError={()=>setFeedback("This photo could not be loaded. Hide it and try again.")}/></PhotoZoom></div>:<audio aria-label={item.caption||"Your private recording"} controls preload="none" src={src} className="w-full" onError={()=>setFeedback("This recording could not be played. Hide it and try again, or use a supported audio copy.")}/>)}
    <a href={`${src}?download=1`} className="inline-flex min-h-11 items-center text-sm text-emerald-800 underline">{uiCopy("Download private copy")}</a>
    <details><summary className="min-h-11 cursor-pointer text-sm text-emerald-800">{uiCopy("Caption, creator, date and notes")}</summary><fieldset disabled={busy} className="grid gap-4 sm:grid-cols-2">
      <label htmlFor={`${prefix}-caption`} className="text-sm sm:col-span-2">{item.kind==="photo" ? uiCopy("Photo caption") : item.kind==="audio" ? uiCopy("Recording title") : uiCopy("Document title")}<input id={`${prefix}-caption`} className={field} value={details.caption} maxLength={300} onChange={e=>{setDetails({...details,caption:e.target.value});setDirty(true)}}/></label>
      <label className="text-sm">{uiCopy("Creator")}<input className={field} value={details.creator} maxLength={160} onChange={e=>{setDetails({...details,creator:e.target.value});setDirty(true)}}/></label>
      <label className="text-sm">{item.kind==="photo" ? uiCopy("Photo date") : item.kind==="audio" ? uiCopy("Recording date") : uiCopy("Document date")}<input type="date" className={field} value={details.recordedOn} onChange={e=>{setDetails({...details,recordedOn:e.target.value});setDirty(true)}}/></label>
      <label className="text-sm">{uiCopy("Display order")}<input type="number" min={0} max={999} className={field} value={details.position} onChange={e=>{setDetails({...details,position:Number(e.target.value)});setDirty(true)}}/></label>
      <label className="text-sm sm:col-span-2">{item.kind==="audio" ? uiCopy("Recording notes") : item.kind==="photo" ? uiCopy("Photo notes") : uiCopy("Document notes")}<textarea className={field} rows={3} value={details.notes} maxLength={1500} onChange={e=>{setDetails({...details,notes:e.target.value});setDirty(true)}}/></label>
      <div className="sm:col-span-2"><Button type="button" onClick={()=>void save()} disabled={!dirty||busy}>{busy ? uiCopy("Saving…") : uiCopy("Save upload details")}</Button>{dirty&&<p className="mt-2 text-sm">{uiCopy("These upload details have unsaved changes.")}</p>}</div>
    </fieldset></details>{item.creator&&<p className="text-xs text-emerald-700">{item.kind==="photo" ? uiCopy("Photo") : item.kind==="audio" ? uiCopy("Recording") : uiCopy("Document")}: {item.creator}</p>}</>:<p role="status" className="text-sm">{item.state==="pending" ? uiCopy("This upload was interrupted. Retry the original file below, or remove this incomplete upload.") : uiCopy("Removal is unfinished. Retry removal to finish clearing its stored file.")}</p>}
    <Button type="button" variant="ghost" disabled={busy} onClick={()=>setConfirmRemove(!confirmRemove)}>{uiCopy("Remove upload")}</Button>{confirmRemove&&<div className="rounded-xl border border-amber-200 bg-amber-50 p-3 space-y-3"><p className="text-sm">{uiCopy("This permanently removes this uploaded copy and its details. Your original file and journal entry stay with you.")}</p><Button type="button" variant="outline" disabled={busy} onClick={()=>void erase()}>{uiCopy("Confirm permanent upload removal")}</Button><Button type="button" variant="ghost" onClick={()=>setConfirmRemove(false)}>{uiCopy("Keep upload")}</Button></div>}
    {feedback&&<p role="status" className="text-sm text-emerald-950">{uiCopy(feedback)}</p>}
  </article>
}
export function TripJournalMedia({entryId,enabled}:{entryId:string;enabled:boolean}){
 const uiCopy=useUiCopy()

  const {planId,items,loading,error,reload,replace}=useMedia(),busyRef=useRef(false)
  const [file,setFile]=useState<Blob|null>(null),[uploadId,setUploadId]=useState(""),[retryId,setRetryId]=useState(""),[attempted,setAttempted]=useState(false),[phase,setPhase]=useState<"preparing"|"uploading"|null>(null),[busy,setBusy]=useState(false),[feedback,setFeedback]=useState("")
  const input=useRef<HTMLInputElement>(null)
  async function choose(selected:File|undefined){
    if(busyRef.current)return
    setFile(null);setAttempted(false);setFeedback("");if(!selected)return
    busyRef.current=true;setBusy(true);setPhase("preparing")
    try{
      const prepared=selected.type.startsWith("image/")?await prepareJournalPhoto(selected):selected
      if(prepared.size>MAX_TRIP_MEDIA_BYTES)throw Error("Choose a file up to 3 MiB, or a smaller photo.")
      const mime=mediaSignature(new Uint8Array(await prepared.arrayBuffer()));if(!mime)throw Error("Choose a JPEG, PNG, WebP, MP3, M4A, WAV, Ogg, WebM or PDF file.")
      const pending=items.find(item=>item.id===retryId&&item.entryId===entryId&&item.state==="pending")
      // Reuse the server reservation after a reload; the API also verifies the content hash.
      if(retryId&&(!pending||pending.mime!==mime||pending.bytes!==prepared.size))throw Error("Choose the original file for this incomplete upload. Its format and prepared size must match.")
      setFile(new Blob([prepared],{type:mime}));setUploadId(pending?.id||crypto.randomUUID());setFeedback(pending?"Original file ready. Retry to finish the existing upload.":"File ready. Choose Upload privately to save this copy.")
    }catch(e){setFeedback(errorMessage(e))}finally{busyRef.current=false;setBusy(false);setPhase(null)}
  }
  useUnsavedChanges(Boolean(file)||busy,uiCopy("A selected upload is not confirmed saved. Leave this page?"))
  async function upload(){
    if(!file||busyRef.current||!enabled)return;busyRef.current=true;setBusy(true);setPhase("uploading");setAttempted(true);setFeedback("")
    const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),60_000)
    try{const r=await accountRequest<{item:unknown}>(`/api/account/plans/${planId}/media?entry=${entryId}`,{method:"POST",headers:{"Content-Type":file.type,"Idempotency-Key":uploadId},body:file,signal:controller.signal});const saved=mediaItemSchema.parse(r.item);if(saved.id!==uploadId||saved.entryId!==entryId||saved.state!=="ready")throw Error("This upload could not be confirmed. Keep the selected file and retry.");replace(saved);setFile(null);setRetryId("");setAttempted(false);if(input.current)input.current.value="";setFeedback("Your private upload is saved.")}catch(e){setFeedback(e instanceof Error&&(e.name==="TimeoutError"||e.name==="AbortError")?"The upload took too long to confirm. Your selected copy is still here. Retry to check or finish the same upload.":errorMessage(e))}finally{busyRef.current=false;setBusy(false);setPhase(null);clearTimeout(timeout)}
  }
  return <section aria-label={uiCopy("Journal photos, recordings and documents")} className="border-t border-emerald-100 pt-5 space-y-4">
    <h3 className="font-medium text-emerald-950">{uiCopy("Photos, recordings and documents")}</h3><p className="text-xs leading-6 text-gray-600">{uiCopy("Private to you. Photos are prepared as JPEG copies up to 2048 pixels; originals stay unchanged. Audio can be MP3, M4A, WAV, Ogg or WebM. Tickets and receipts can be PDF copies; PDFs download without an embedded preview. Each saved file can be up to 3 MiB. Up to 20 files across your trips in this pilot. Incomplete uploads count towards that limit. Remove an unused upload to free space. A shared pilot limit also applies.")}</p>
    {!enabled&&<p className="text-sm text-emerald-800">{uiCopy("Save your workspace changes before adding media to this entry.")}</p>}
    {error?<div role="alert"><p>{uiCopy(error)}</p><Button type="button" variant="outline" onClick={()=>void reload()}>{uiCopy("Retry loading uploads")}</Button></div>:loading?<p role="status">{uiCopy("Loading private uploads…")}</p>:null}
    {!error&&<Button type="button" variant="ghost" disabled={busy||loading} onClick={()=>void reload()}>{uiCopy("Refresh saved uploads")}</Button>}
    <fieldset disabled={busy||!enabled||loading||Boolean(error)} className="space-y-3">{items.some(item=>item.entryId===entryId&&item.state==="pending")&&<label className="block text-sm">{uiCopy("Upload destination")}<select className={field} value={retryId} disabled={Boolean(file)} onChange={e=>{setRetryId(e.target.value);setFeedback("");if(input.current)input.current.value=""}}><option value="">{uiCopy("New private upload")}</option>{items.filter(item=>item.entryId===entryId&&item.state==="pending").map((item,index)=><option key={item.id} value={item.id}>{uiCopy("Finish incomplete ")}{item.kind} {index+1} ({Math.ceil(item.bytes/1024)} KiB)</option>)}</select></label>}<label className="block text-sm">{retryId ? uiCopy("Choose the original file again") : uiCopy("Choose a photo, recording or PDF")}<input ref={input} disabled={Boolean(file)} type="file" accept="image/jpeg,image/png,image/webp,audio/mpeg,audio/mp4,audio/wav,audio/ogg,audio/webm,application/pdf,.pdf,.mp3,.m4a,.wav,.ogg,.webm" className="mt-2 block w-full min-w-0 text-sm file:mr-3 file:rounded-full file:border file:border-emerald-200 file:bg-white file:px-4 file:py-3" onChange={e=>void choose(e.target.files?.[0])}/></label><Button type="button" variant="outline" disabled={!file||busy} onClick={()=>void upload()}>{busy ? (phase==="preparing" ? uiCopy("Preparing private copy…") : uiCopy("Uploading private copy…")) : attempted||retryId ? uiCopy("Retry private upload") : uiCopy("Upload privately")}</Button>{file&&<Button type="button" variant="ghost" onClick={()=>{setFile(null);setRetryId("");setAttempted(false);if(input.current)input.current.value="";setFeedback("Selected copy cleared from this page. Any saved or incomplete upload stays private. Reload uploads to review it before starting another.")}}>{uiCopy("Clear selected copy")}</Button>}</fieldset>
    {file&&<p className="text-sm text-gray-600">{uiCopy("Selected copy: ")}{Math.ceil(file.size/1024)} KiB. {attempted ? uiCopy("If the connection failed, retry this selected copy. AVES checks the same upload reference and file contents to avoid saving a second copy.") : uiCopy("Keep this page open until saving is confirmed.")}</p>}
    {feedback&&<p role="status" className="text-sm text-emerald-950">{uiCopy(feedback)}</p>}
    <div className="space-y-4">{items.filter(m=>m.entryId===entryId).sort((a,b)=>a.position-b.position).map(item=><JournalMediaCard key={item.id} item={item}/>)}</div>
  </section>
}
