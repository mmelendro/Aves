"use client"
import {useEffect} from "react"
const pending=new Map<symbol,string>()
export function confirmDiscardPendingEdits(){return pending.size===0||window.confirm([...new Set(pending.values())].join("\n\n"))}
function beforeUnload(event:BeforeUnloadEvent){if(pending.size){event.preventDefault();event.returnValue=""}}
let guardedUrl="",guardedState:unknown
function sameScope(left:string,right:string){const a=new URL(left),b=new URL(right);return a.origin===b.origin&&a.pathname===b.pathname&&a.search===b.search}
function rememberLocation(){guardedUrl=window.location.href;guardedState=window.history.state}
function popState(event:PopStateEvent){
 if(!pending.size)return
 if(sameScope(window.location.href,guardedUrl)){rememberLocation();return}
 if(!confirmDiscardPendingEdits()){event.stopImmediatePropagation();window.history.pushState(guardedState,"",guardedUrl)}
 else rememberLocation()
}
function click(event:MouseEvent){
 if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return
 const anchor=(event.target as Element|null)?.closest?.("a[href]") as HTMLAnchorElement|null
 if(!anchor||anchor.target==="_blank"||anchor.hasAttribute("download"))return
 const target=new URL(anchor.href,window.location.href)
 if(sameScope(target.href,window.location.href))return
 if(!confirmDiscardPendingEdits()){event.preventDefault();event.stopImmediatePropagation()}
}
/** Native unload and captured links protect unsaved content without saving it implicitly. */
export function useUnsavedChanges(dirty:boolean,message="You have unsaved trip edits. Leave and discard them?"){
 useEffect(()=>{
  if(!dirty)return
  const id=Symbol();if(!pending.size){rememberLocation();window.addEventListener("beforeunload",beforeUnload);window.addEventListener("popstate",popState,true);window.addEventListener("hashchange",rememberLocation);document.addEventListener("click",click,true)}pending.set(id,message)
  return()=>{pending.delete(id);if(!pending.size){window.removeEventListener("beforeunload",beforeUnload);window.removeEventListener("popstate",popState,true);window.removeEventListener("hashchange",rememberLocation);document.removeEventListener("click",click,true)}}
 },[dirty,message])
}
