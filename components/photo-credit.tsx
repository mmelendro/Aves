"use client"
import {useRef} from "react"
import {Camera,X} from "lucide-react"

/** Inline disclosure keeps the active photograph, page scroll and parent viewer. */
export default function PhotoCredit({creator,sourceUrl,licence,licenceUrl,modifications,title,onOpen,capturedOn,dateBasis}:{creator:string;sourceUrl:string;licence?:string;licenceUrl?:string;modifications?:string;title?:string;capturedOn?:string;dateBasis?:string;onOpen?:()=>void}){
  const details=useRef<HTMLDetailsElement>(null),summary=useRef<HTMLElement>(null);
  const close=()=>{if(details.current)details.current.open=false;summary.current?.focus({preventScroll:true});};
  return <details ref={details} onToggle={event=>{if(event.currentTarget.open)onOpen?.();}} className="relative inline-block max-w-full text-left text-xs" onKeyDown={e=>{if(e.key==="Escape"&&details.current?.open){e.preventDefault();e.stopPropagation();close();}}}>
    <summary ref={summary} aria-label={`Photo credits: ${creator}`} className="inline-flex min-h-11 max-w-full cursor-pointer list-none items-center gap-1.5 rounded-full px-2 font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500"><Camera size={14} className="shrink-0" aria-hidden="true"/><span className="max-w-52 truncate">{creator}</span></summary>
    <div role="region" aria-label="Photograph credit" className="absolute bottom-full left-0 z-50 mb-1 w-64 max-w-[75vw] max-h-[min(24rem,60dvh)] overflow-y-auto rounded-xl border border-emerald-200 bg-white p-3 text-emerald-950 shadow-xl">
      <div className="sticky top-0 flex items-center justify-between gap-2 bg-white"><span className="font-semibold">Photo: {creator}</span><button type="button" aria-label="Close photo credits" className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full hover:bg-emerald-50" onClick={close}><X size={16} aria-hidden="true"/></button></div>
      {title&&<p className="mb-2 leading-5">{title}</p>}
      <a href={sourceUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center underline underline-offset-2">Original photograph<span className="sr-only"> (opens in a new tab)</span></a>
      {licence&&<p>{licenceUrl?<a href={licenceUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center underline underline-offset-2">{licence}<span className="sr-only"> (opens in a new tab)</span></a>:licence}</p>}
      {(capturedOn || dateBasis) && <p className="mt-2 leading-5">{capturedOn ? `Photographed ${capturedOn}.` : "Exact capture date not established."} {dateBasis}</p>}
      {modifications&&<p className="mt-1 leading-5">{modifications}</p>}
    </div>
  </details>;
}
