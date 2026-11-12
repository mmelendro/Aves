"use client"
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
  const {planId,replace,remove}=useMedia(),busyRef=useRef(false),prefix=useId()
  const [details,setDetails]=useState(()=>mediaDetailsSchema.strip().parse(item)),[dirty,setDirty]=useState(false),[busy,setBusy]=useState(false),[feedback,setFeedback]=useState("")
  const [view,setView]=useState(false),[confirmRemove,setConfirmRemove]=useState(false)
  useEffect(()=>{setDetails(mediaDetailsSchema.strip().parse(item));setDirty(false)},[item.id,item.revision])
  useEffect(()=>{if(!dirty)return;const warn=(e:BeforeUnloadEvent)=>{e.preventDefault();e.returnValue=""};window.addEventListener("beforeunload",warn);return()=>window.removeEventListener("beforeunload",warn)},[dirty])
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
    <div className="flex flex-wrap items-center justify-between gap-3"><p className="font-medium text-emerald-950 break-words">{item.caption||`Private ${item.kind}`}</p><span className="text-xs text-gray-500">{(item.bytes/1024).toFixed(0)} KiB</span></div>
    {item.state==="ready"?<><Button type="button" variant="outline" aria-expanded={view} onClick={()=>setView(!view)}>{view?"Hide upload":item.kind==="photo"?"View private photo":"Play recording"}</Button>{view&&(item.kind==="photo"?<div className="relative h-72 sm:h-96 overflow-hidden rounded-xl bg-emerald-50"><PhotoZoom label={item.caption||"Private journal photo"}>{/* Keep the authenticated URL out of Next's public image cache. */}<img src={src} alt={item.caption||"Your private journal photograph"} className="h-full w-full object-contain" onError={()=>setFeedback("This photo could not be loaded. Hide it and try again.")}/></PhotoZoom></div>:<audio aria-label={item.caption||"Your private recording"} controls preload="none" src={src} className="w-full" onError={()=>setFeedback("This recording could not be played. Hide it and try again, or use a supported audio copy.")}/>)}
    <details><summary className="min-h-11 cursor-pointer text-sm text-emerald-800">Caption, creator, date and notes</summary><fieldset disabled={busy} className="grid gap-4 sm:grid-cols-2">
      <label htmlFor={`${prefix}-caption`} className="text-sm sm:col-span-2">{item.kind==="photo"?"Photo caption":"Recording title"}<input id={`${prefix}-caption`} className={field} value={details.caption} maxLength={300} onChange={e=>{setDetails({...details,caption:e.target.value});setDirty(true)}}/></label>
      <label className="text-sm">Creator<input className={field} value={details.creator} maxLength={160} onChange={e=>{setDetails({...details,creator:e.target.value});setDirty(true)}}/></label>
      <label className="text-sm">{item.kind==="photo"?"Photo date":"Recording date"}<input type="date" className={field} value={details.recordedOn} onChange={e=>{setDetails({...details,recordedOn:e.target.value});setDirty(true)}}/></label>
      <label className="text-sm">Display order<input type="number" min={0} max={999} className={field} value={details.position} onChange={e=>{setDetails({...details,position:Number(e.target.value)});setDirty(true)}}/></label>
      <label className="text-sm sm:col-span-2">{item.kind==="audio"?"Recording notes":"Photo notes"}<textarea className={field} rows={3} value={details.notes} maxLength={1500} onChange={e=>{setDetails({...details,notes:e.target.value});setDirty(true)}}/></label>
      <div className="sm:col-span-2"><Button type="button" onClick={()=>void save()} disabled={!dirty||busy}>{busy?"Saving…":"Save upload details"}</Button>{dirty&&<p className="mt-2 text-sm">These upload details have unsaved changes.</p>}</div>
    </fieldset></details>{item.creator&&<p className="text-xs text-emerald-700">{item.kind==="photo"?"Photo":"Recording"}: {item.creator}</p>}</>:<p role="status" className="text-sm">{item.state==="pending"?"This upload was interrupted. Retry the original file below, or remove this incomplete upload.":"Removal is unfinished. Retry removal to finish clearing its stored file."}</p>}
    <Button type="button" variant="ghost" disabled={busy} onClick={()=>setConfirmRemove(!confirmRemove)}>Remove upload</Button>{confirmRemove&&<div className="rounded-xl border border-amber-200 bg-amber-50 p-3 space-y-3"><p className="text-sm">This permanently removes this uploaded copy and its details. Your original file and journal entry stay with you.</p><Button type="button" variant="outline" disabled={busy} onClick={()=>void erase()}>Confirm permanent upload removal</Button><Button type="button" variant="ghost" onClick={()=>setConfirmRemove(false)}>Keep upload</Button></div>}
    {feedback&&<p role="status" className="text-sm text-emerald-950">{feedback}</p>}
  </article>
}
export function TripJournalMedia({entryId,enabled}:{entryId:string;enabled:boolean}){
  const {planId,items,loading,error,reload,replace}=useMedia(),busyRef=useRef(false)
  const [file,setFile]=useState<Blob|null>(null),[uploadId,setUploadId]=useState(""),[busy,setBusy]=useState(false),[feedback,setFeedback]=useState("")
  const input=useRef<HTMLInputElement>(null)
  async function choose(selected:File|undefined){
    setFile(null);setFeedback("");if(!selected)return
    busyRef.current=true;setBusy(true)
    try{
      const prepared=selected.type.startsWith("image/")?await prepareJournalPhoto(selected):selected
      if(prepared.size>MAX_TRIP_MEDIA_BYTES)throw Error("Choose a recording under 3 MiB, or a smaller photo.")
      const mime=mediaSignature(new Uint8Array(await prepared.arrayBuffer()));if(!mime)throw Error("Choose a JPEG, PNG, WebP, MP3, M4A, WAV, Ogg or WebM file.")
      setFile(new Blob([prepared],{type:mime}));setUploadId(crypto.randomUUID());setFeedback("File ready. Choose Upload privately to save this copy.")
    }catch(e){setFeedback(errorMessage(e))}finally{busyRef.current=false;setBusy(false)}
  }
  useEffect(()=>{if(!file)return;const warn=(e:BeforeUnloadEvent)=>{e.preventDefault();e.returnValue=""};window.addEventListener("beforeunload",warn);return()=>window.removeEventListener("beforeunload",warn)},[file])
  async function upload(){
    if(!file||busyRef.current||!enabled)return;busyRef.current=true;setBusy(true);setFeedback("")
    try{const r=await accountRequest<{item:unknown}>(`/api/account/plans/${planId}/media?entry=${entryId}`,{method:"POST",headers:{"Content-Type":file.type,"Idempotency-Key":uploadId},body:file});const saved=mediaItemSchema.parse(r.item);if(saved.id!==uploadId||saved.entryId!==entryId||saved.state!=="ready")throw Error("This upload could not be confirmed. Keep the selected file and retry.");replace(saved);setFile(null);if(input.current)input.current.value="";setFeedback("Your private upload is saved.")}catch(e){setFeedback(errorMessage(e))}finally{busyRef.current=false;setBusy(false)}
  }
  return <section aria-label="Journal photos and recordings" className="border-t border-emerald-100 pt-5 space-y-4">
    <h3 className="font-medium text-emerald-950">Photos and recordings</h3><p className="text-xs leading-6 text-gray-600">Private to you. Photos are prepared as JPEG copies up to 2048 pixels; originals stay unchanged. Audio can be MP3, M4A, WAV, Ogg or WebM. Each saved file must be under 3 MiB. Up to 20 files across your trips in this pilot.</p>
    {!enabled&&<p className="text-sm text-emerald-800">Save your workspace changes before adding media to this entry.</p>}
    {error?<div role="alert"><p>{error}</p><Button type="button" variant="outline" onClick={()=>void reload()}>Retry loading uploads</Button></div>:loading?<p role="status">Loading private uploads…</p>:null}
    <fieldset disabled={busy||!enabled||loading||Boolean(error)} className="space-y-3"><label className="block text-sm">Choose a photo or recording<input ref={input} type="file" accept="image/jpeg,image/png,image/webp,audio/mpeg,audio/mp4,audio/wav,audio/ogg,audio/webm,.mp3,.m4a,.wav,.ogg,.webm" className="mt-2 block w-full min-w-0 text-sm file:mr-3 file:rounded-full file:border file:border-emerald-200 file:bg-white file:px-4 file:py-3" onChange={e=>void choose(e.target.files?.[0])}/></label><Button type="button" variant="outline" disabled={!file||busy} onClick={()=>void upload()}>{busy?"Preparing or uploading…":"Upload privately"}</Button></fieldset>
    {feedback&&<p role="status" className="text-sm text-emerald-950">{feedback}</p>}
    <div className="space-y-4">{items.filter(m=>m.entryId===entryId).sort((a,b)=>a.position-b.position).map(item=><JournalMediaCard key={item.id} item={item}/>)}</div>
  </section>
}
