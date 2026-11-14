"use client"
import {useEffect} from "react"
const pending=new Map<symbol,string>()
export function confirmDiscardPendingEdits(){return pending.size===0||window.confirm([...new Set(pending.values())].join("\n\n"))}
function beforeUnload(event:BeforeUnloadEvent){if(pending.size){event.preventDefault();event.returnValue=""}}
let guardedUrl="",guardedState:unknown
function sameDocument(a:string,b:string){
 const left=new URL(a),right=new URL(b)
 return left.origin===right.origin&&left.pathname===right.pathname&&left.search===right.search
}
function popState(event:PopStateEvent){
 if(!pending.size||window.location.href===guardedUrl)return
 // Section history is still the same editing session. Keep its most recent
 // anchor as the return point if a later departure is cancelled.
 if(sameDocument(window.location.href,guardedUrl)){guardedUrl=window.location.href;guardedState=window.history.state;return}
 if(!confirmDiscardPendingEdits()){event.stopImmediatePropagation();window.history.pushState(guardedState,"",guardedUrl)}
}
function click(event:MouseEvent){
 if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return
 const anchor=(event.target as Element|null)?.closest?.("a[href]") as HTMLAnchorElement|null
 if(!anchor||anchor.target==="_blank"||anchor.hasAttribute("download"))return
 const target=new URL(anchor.href,window.location.href)
 if(sameDocument(target.href,window.location.href))return
 if(!confirmDiscardPendingEdits()){event.preventDefault();event.stopImmediatePropagation()}
}
/** Native unload and captured links protect unsaved content without saving it implicitly. */
export function useUnsavedChanges(dirty:boolean,message="You have unsaved trip edits. Leave and discard them?"){
 useEffect(()=>{
  if(!dirty)return
  const id=Symbol();if(!pending.size){guardedUrl=window.location.href;guardedState=window.history.state;window.addEventListener("beforeunload",beforeUnload);window.addEventListener("popstate",popState,true);document.addEventListener("click",click,true)}pending.set(id,message)
  return()=>{pending.delete(id);if(!pending.size){window.removeEventListener("beforeunload",beforeUnload);window.removeEventListener("popstate",popState,true);document.removeEventListener("click",click,true)}}
 },[dirty,message])
}
