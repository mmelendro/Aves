"use client"

import { useContext, useEffect, useRef, useState, type ReactNode } from "react"
import { Hand, Maximize2, Minimize2, Minus, Plus, RotateCcw } from "lucide-react"
import { constrainMapView, fitMapView, mapGestureView, zoomMapAt, type MapView } from "@/lib/map-gestures.mjs"
import { FieldGuideContext } from "./field-guide-context"
import styles from "./map-viewer.module.css"

/** Enlarge the same mounted map, preserving selection, credits and native links.
 * Inline touch gestures require explicit Move; page/browser zoom remains native
 * elsewhere. Expanded maps own their gesture surface, not the whole document.
 */
export function MapViewer({ children, label, gestures = true, credits, listenControl, viewKey, onZoomOutAtMinimum }: { viewKey?: string; onZoomOutAtMinimum?: () => void; children: ReactNode; label: string; gestures?: boolean; credits?: ReactNode; listenControl?: ReactNode }) {
  const guide = useContext(FieldGuideContext)
  const dialog = useRef<HTMLDialogElement>(null), surface = useRef<HTMLDivElement>(null), trigger = useRef<HTMLButtonElement>(null)
  const [expanded, setExpanded] = useState(false), [move, setMove] = useState(false), [view, setView] = useState<MapView>(fitMapView), [gesturing, setGesturing] = useState(false)
  const viewRef = useRef(view), points = useRef(new Map<number,{x:number;y:number}>())
  const start = useRef<{ view: MapView; points: {x:number;y:number}[] } | null>(null)
  const dragged = useRef(false), suppress = useRef(false), frame = useRef(0)
  const active = gestures && (move || expanded)
  const box = () => ({ width: surface.current?.clientWidth || 1, height: surface.current?.clientHeight || 1 })
  function commit(next: MapView) { viewRef.current = next; cancelAnimationFrame(frame.current); frame.current = requestAnimationFrame(() => setView(next)) }
  function reset() { points.current.clear(); start.current = null; setGesturing(false); commit(fitMapView) }
  useEffect(()=>{ reset() },[viewKey])
  function zoom(factor: number) { const b = box(); commit(zoomMapAt(viewRef.current, factor, {x:b.width/2,y:b.height/2}, b)) }
  function resize(open: boolean) {
    const element = dialog.current
    if (!element) return
    element.toggleAttribute("data-expanded", open)
    element.close()
    if (open) element.showModal(); else element.show()
    points.current.clear(); start.current = null; setGesturing(false)
    setExpanded(open)
    document.dispatchEvent(new Event("aves:map-resize"))
    if (!open) trigger.current?.focus({ preventScroll: true })
  }
  useEffect(() => {
    if (!expanded) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = previous }
  }, [expanded])
  useEffect(() => {
    const element = surface.current
    if (!element) return
    const observer = new ResizeObserver(() => { points.current.clear(); start.current = null; commit(constrainMapView(viewRef.current,box())) })
    observer.observe(element)
    return () => { observer.disconnect(); cancelAnimationFrame(frame.current) }
  }, [])
  return <dialog data-aves-map="true" ref={dialog} open data-expanded={expanded || undefined} className={styles.viewer} role={expanded ? "dialog" : "group"} aria-modal={expanded || undefined} aria-label={label} onCancel={e=>{e.preventDefault();resize(false)}}>
    <div className={styles.toolbar} role="group" aria-label={`${label} view controls`}>
      {gestures && <>
        <button className={styles.control} type="button" aria-label={`Zoom ${label} in`} disabled={view.zoom >= 4} onClick={()=>zoom(1.3)}><Plus size={18} aria-hidden="true"/></button>
        <button className={styles.control} type="button" aria-label={`Zoom ${label} out`} disabled={view.zoom <= 1 && !onZoomOutAtMinimum} onClick={()=>view.zoom <= 1 ? onZoomOutAtMinimum?.() : zoom(1/1.3)}><Minus size={18} aria-hidden="true"/></button>
        <button className={styles.control} type="button" aria-label={`Reset ${label} view`} onClick={reset}><RotateCcw size={18} aria-hidden="true"/></button>
        {!expanded && <button className={styles.control} type="button" aria-label={`Use touch gestures on ${label}`} aria-pressed={move} onClick={()=>{setMove(!move);points.current.clear();start.current=null}}><Hand size={18} aria-hidden="true"/></button>}
        <span className="text-xs tabular-nums text-emerald-900" aria-live="off">{view.zoom.toFixed(1)}×</span>
      </>}
      <div className="ml-auto flex items-center gap-1">{expanded && guide?.bird && <button type="button" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 text-sm text-emerald-950" onClick={()=>{resize(false);guide.showBirds()}} aria-label={`View ${guide.bird.commonName} in the bird guide`}><img src={guide.bird.image} alt="" width={32} height={32} className="h-8 w-8 rounded-full object-cover" style={{objectPosition:guide.bird.imagePosition}}/><span>{guide.bird.commonName}</span></button>}{listenControl}<button ref={trigger} className={styles.control} type="button" aria-expanded={expanded} aria-label={expanded ? `Close expanded ${label}` : `Enlarge ${label}`} onClick={()=>resize(!expanded)}>{expanded ? <Minimize2 size={18} aria-hidden="true"/> : <Maximize2 size={18} aria-hidden="true"/>}</button></div>
    </div>
    {gestures && <p className={styles.help}>{active ? "Drag to move · Pinch with two fingers · + / − to zoom · Home to reset" : "Use the controls to zoom, or turn on Move for dragging and pinching. Page scrolling stays available."}</p>}
    <div ref={surface} data-gesturing={gesturing || undefined} className={styles.surface} tabIndex={gestures ? 0 : undefined} role={gestures ? "group" : undefined} aria-label={gestures ? `${label} gesture surface` : undefined} style={{touchAction: active ? "none" : "pan-y pinch-zoom",cursor:active ? "grab" : undefined}}
      onKeyDown={e=>{if(!gestures || e.target!==e.currentTarget)return;const step=35; const keys:Record<string,[number,number]>={ArrowLeft:[step,0],ArrowRight:[-step,0],ArrowUp:[0,step],ArrowDown:[0,-step]};if(keys[e.key]){e.preventDefault();const [x,y]=keys[e.key];commit(constrainMapView({...viewRef.current,x:viewRef.current.x+x,y:viewRef.current.y+y},box()))}else if(['+','=','-','Home'].includes(e.key)){e.preventDefault();if(e.key==='Home')reset();else zoom(e.key==='-'?1/1.3:1.3)}}}
      onPointerDown={e=>{if(!active || (e.pointerType==='mouse' && e.button!==0))return;const rect=e.currentTarget.getBoundingClientRect();points.current.set(e.pointerId,{x:e.clientX-rect.left,y:e.clientY-rect.top});if(points.current.size>2){points.current.delete(e.pointerId);return}setGesturing(true);dragged.current=false;suppress.current=points.current.size>1;start.current={view:viewRef.current,points:[...points.current.values()]}}}
      onPointerMove={e=>{if(!active || !points.current.has(e.pointerId) || !start.current)return;const rect=e.currentTarget.getBoundingClientRect();points.current.set(e.pointerId,{x:e.clientX-rect.left,y:e.clientY-rect.top});const current=[...points.current.values()];const moved=current.some((p,i)=>Math.hypot(p.x-start.current!.points[i].x,p.y-start.current!.points[i].y)>5);if(!dragged.current && !moved)return;dragged.current=true;suppress.current=true;e.preventDefault();if(!e.currentTarget.hasPointerCapture(e.pointerId))e.currentTarget.setPointerCapture(e.pointerId);commit(mapGestureView(start.current.view,start.current.points,current,box()))}}
      onPointerUp={e=>{points.current.delete(e.pointerId);if(e.currentTarget.hasPointerCapture(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId);start.current=points.current.size?{view:viewRef.current,points:[...points.current.values()]}:null;setGesturing(points.current.size>0)}}
      onPointerLeave={e=>{if(!e.currentTarget.hasPointerCapture(e.pointerId)){points.current.delete(e.pointerId);start.current=null;setGesturing(points.current.size>0)}}}
      onPointerCancel={()=>{points.current.clear();start.current=null;setGesturing(false)}}
      onLostPointerCapture={e=>{points.current.delete(e.pointerId);start.current=points.current.size?{view:viewRef.current,points:[...points.current.values()]}:null;setGesturing(points.current.size>0)}}
      onClickCapture={e=>{if(suppress.current){e.preventDefault();e.stopPropagation();suppress.current=false}}}>
      <div className={styles.content} style={gestures ? {transform:`translate(${view.x}px,${view.y}px) scale(${view.zoom})`} : undefined}>{children}</div>
    </div>
    {expanded && credits && <div className="shrink-0 px-2 py-2 text-xs leading-5 text-emerald-900">{credits}</div>}
  </dialog>
}
