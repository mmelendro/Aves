"use client"
import type {ButtonHTMLAttributes, ReactNode, Ref} from "react"

/** One control pattern for bird, place, resource and team galleries. */
export function CarouselButton({tone="light",buttonRef,className="",...props}:ButtonHTMLAttributes<HTMLButtonElement>&{tone?:"light"|"overlay";buttonRef?:Ref<HTMLButtonElement>}){
  return <button ref={buttonRef} type="button" {...props} className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:opacity-40 motion-reduce:transition-none ${tone==="overlay"?"border-white/40 bg-slate-950/50 text-white backdrop-blur-md hover:bg-slate-950/70":"border-emerald-200 bg-white text-emerald-900 hover:bg-emerald-50"} ${className}`}/>;
}
export function CarouselCount({index,total,children}:{index:number;total:number;children?:ReactNode}){
  return <span className="whitespace-nowrap text-xs tabular-nums" aria-label={`Item ${index} of ${total}`}>{index} / {total}{children}</span>;
}
