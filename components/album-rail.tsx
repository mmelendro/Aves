"use client";
import {useId,useRef,type ReactNode} from "react";

/** Native scrolling and server-rendered cards also work without JavaScript. */
export default function AlbumRail({children,label}:{children:ReactNode;label:string}){
 const rail=useRef<HTMLDivElement>(null),id=useId();
 function move(direction:number){const node=rail.current;if(node)node.scrollBy({left:direction*node.clientWidth*.85,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
 return <div className="album-shell">
  <div className="flex items-center justify-between gap-3"><p className="text-xs text-emerald-800">Swipe to browse</p><div className="flex gap-2">
   <button type="button" aria-label={`Previous ${label}`} aria-controls={id} className="album-arrow" onClick={()=>move(-1)}>←</button>
   <button type="button" aria-label={`Next ${label}`} aria-controls={id} className="album-arrow" onClick={()=>move(1)}>→</button>
  </div></div>
  <div ref={rail} id={id} role="region" aria-label={label} tabIndex={0} className="album-rail">{children}</div>
 </div>;
}
