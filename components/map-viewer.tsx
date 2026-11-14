"use client"

import { useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react"
import dynamic from "next/dynamic"
import { useMapLayers } from "./map-layer-context"
import type { GeographicScope } from "./geographic-satellite-map"
const GeographicSatelliteMap = dynamic(()=>import("./geographic-satellite-map"),{ssr:false,loading:()=> <p role="status" className="p-4 text-xs">Opening satellite map…</p>})

import { Maximize2, Minimize2, Minus, Plus, RotateCcw } from "lucide-react"
import { constrainMapView, fitMapView, mapGestureView, zoomMapAt, isMapDoubleTap, type MapView } from "@/lib/map-gestures.mjs"
import BirdFilterControls from "./bird-filter-controls"
import { FieldGuideContext } from "./field-guide-context"
import MapLocationPhotos from "./map-location-photos"
import {MAP_PHOTO_EVENT,CLEAR_MAP_PHOTOS_EVENT,noteMapPhotoOwner,type MapPhotoRequest} from "@/lib/map-photo-request"
import {MapControlsContext, type MapZoomControls} from "./map-controls-context"
import styles from "./map-viewer.module.css"

/** Enlarge the same mounted map, preserving selection, credits and native links.
 * Drag, pinch and double tap work immediately on the map. Page/browser zoom
 * remains native outside its surface; the optional hand button pauses gestures.
 */
export function MapViewer({ geographicScope, children, label, gestures = true, credits, listenControl, layerControl, viewKey, onZoomOutAtMinimum }: { geographicScope?: GeographicScope; viewKey?: string; onZoomOutAtMinimum?: () => void; children: ReactNode; label: string; gestures?: boolean; credits?: ReactNode; listenControl?: ReactNode; layerControl?: ReactNode }) {
  const {layers}=useMapLayers()
  const geographic=layers.background !== "habitats" && Boolean(geographicScope)
  gestures=gestures && !geographic
  const [engineControls,setEngineControls]=useState<MapZoomControls|null>(null)
  const registerControls=useCallback((controls:MapZoomControls)=>{setEngineControls(controls);return()=>setEngineControls(null)},[])
  const guide = useContext(FieldGuideContext)
  const closePreview = useRef<(()=>void)|null>(null)
  const dialog = useRef<HTMLDialogElement>(null), surface = useRef<HTMLDivElement>(null), trigger = useRef<HTMLButtonElement>(null)
  const [expanded, setExpanded] = useState(false), [move, setMove] = useState(true), [view, setView] = useState<MapView>(fitMapView), [gesturing, setGesturing] = useState(false)
  const viewRef = useRef(view), points = useRef(new Map<number,{x:number;y:number}>())
  const start = useRef<{ view: MapView; points: {x:number;y:number}[] } | null>(null)
  const dragged = useRef(false), suppress = useRef(false), frame = useRef(0)
  const lastTap=useRef<{x:number;y:number;at:number}|null>(null)
  const [photoRequest,setPhotoRequest]=useState<MapPhotoRequest|null>(null)
  const [showPlaceInfo,setShowPlaceInfo]=useState(false)
  const mapTab=useRef<HTMLButtonElement>(null)
  useEffect(()=>{
    const open=(event:Event)=>{const detail=(event as CustomEvent<{owner:HTMLElement;request:MapPhotoRequest}>).detail;if(detail?.owner===dialog.current){setPhotoRequest(detail.request);setShowPlaceInfo(true)}else {setPhotoRequest(null);setShowPlaceInfo(false)}}
    const clear=()=>{setPhotoRequest(null);setShowPlaceInfo(false)}
    window.addEventListener(MAP_PHOTO_EVENT,open);window.addEventListener(CLEAR_MAP_PHOTOS_EVENT,clear);window.addEventListener('popstate',clear)
    return()=>{window.removeEventListener(MAP_PHOTO_EVENT,open);window.removeEventListener(CLEAR_MAP_PHOTOS_EVENT,clear);window.removeEventListener('popstate',clear)}
  },[])
  const active = gestures && (move || expanded)
  const box = () => ({ width: surface.current?.clientWidth || 1, height: surface.current?.clientHeight || 1 })
  const commit=useCallback((next: MapView) => { viewRef.current = next; cancelAnimationFrame(frame.current); frame.current = requestAnimationFrame(() => setView(next)) },[])
  const reset=useCallback(() => { points.current.clear(); start.current = null; setGesturing(false); commit(fitMapView) },[commit])
  useEffect(()=>{ reset() },[viewKey,reset])
  function zoom(factor: number) { const b = box(); commit(zoomMapAt(viewRef.current, factor, {x:b.width/2,y:b.height/2}, b,.35)) }
  function resize(open: boolean) {
    const element = dialog.current
    if (!element) return
    element.toggleAttribute("data-expanded", open)
    element.close()
    if (open) element.showModal(); else element.show()
    points.current.clear(); start.current = null; setGesturing(false)
    setExpanded(open)
    guide?.setMapExpanded?.(open)
    document.dispatchEvent(new Event("aves:map-resize"))
    if (!open) { const restore=closePreview.current; closePreview.current=null; if(restore)restore();else trigger.current?.focus({ preventScroll: true }) }
  }
  const registerMap=guide?.registerMap
  useEffect(()=>registerMap?.(restore=>{closePreview.current=restore;resizeCurrent.current(true)}),[registerMap])
  const resizeCurrent=useRef(resize);resizeCurrent.current=resize
  useEffect(()=>{if(guide?.mapExpanded!==undefined&&guide.mapExpanded!==expanded)resizeCurrent.current(guide.mapExpanded)},[guide?.mapExpanded,expanded])
  useEffect(() => {
    if (!expanded) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = previous }
  }, [expanded])
  useEffect(() => {
    const element = surface.current
    if (!element) return
    const observer = new ResizeObserver(() => { points.current.clear(); start.current = null; commit(constrainMapView(viewRef.current,box(),.35)) })
    observer.observe(element)
    return () => { observer.disconnect(); cancelAnimationFrame(frame.current) }
  }, [commit])
  return <MapControlsContext.Provider value={registerControls}><dialog onClickCapture={()=>noteMapPhotoOwner(dialog.current)} onKeyDownCapture={()=>noteMapPhotoOwner(dialog.current)} onChangeCapture={()=>noteMapPhotoOwner(dialog.current)} data-aves-map="true" data-geographic={geographic || undefined} ref={dialog} open data-expanded={expanded || undefined} className={styles.viewer} role={expanded ? "dialog" : "group"} aria-modal={expanded || undefined} aria-label={label} onCancel={e=>{e.preventDefault();resize(false)}}>
    <div data-map-controls="true" className={styles.toolbar} role="group" aria-label={`${label} view controls`}>
      {engineControls ? <>
        <button className={styles.control} type="button" aria-label={`Zoom ${label} in`} onClick={engineControls.zoomIn}><Plus size={18}/></button>
        <button className={styles.control} type="button" aria-label={`Zoom ${label} out`} onClick={engineControls.zoomOut}><Minus size={18}/></button>
        <button className={styles.control} type="button" aria-label={`Reset ${label} view`} onClick={engineControls.reset}><RotateCcw size={18}/></button>
      </> : gestures && <>
        <button className={styles.control} type="button" aria-label={`Zoom ${label} in`} disabled={view.zoom >= 4} onClick={()=>zoom(1.3)}><Plus size={18} aria-hidden="true"/></button>
        <button className={styles.control} type="button" aria-label={`Zoom ${label} out`} disabled={view.zoom <= 1 && !onZoomOutAtMinimum} onClick={()=>view.zoom <= 1 ? onZoomOutAtMinimum?.() : zoom(1/1.3)}><Minus size={18} aria-hidden="true"/></button>
        <button className={styles.control} type="button" aria-label={`Reset ${label} view`} onClick={reset}><RotateCcw size={18} aria-hidden="true"/></button>
        <span className="text-xs tabular-nums text-emerald-900" aria-live="off">{view.zoom.toFixed(1)}×</span>
      </>}
      {photoRequest && <div role="group" aria-label="Map or place information" className="inline-flex rounded-full border border-emerald-300 bg-white p-1"><button ref={mapTab} type="button" aria-pressed={!showPlaceInfo} className="min-h-11 rounded-full px-4 text-sm font-semibold text-emerald-900 aria-pressed:bg-emerald-100" onClick={()=>setShowPlaceInfo(false)}>Map</button><button type="button" aria-pressed={showPlaceInfo} className="min-h-11 rounded-full px-4 text-sm font-semibold text-emerald-900 aria-pressed:bg-emerald-100" onClick={()=>setShowPlaceInfo(true)}>Place info</button></div>}
      {layerControl}
      {/* eslint-disable-next-line @next/next/no-img-element -- A fixed 32px decorative thumbnail belongs to the labelled bird action. */}
      <div className="ml-auto flex min-w-0 flex-wrap items-center gap-1">{expanded && guide?.bird && <button type="button" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 text-sm text-emerald-950" onClick={()=>{resize(false);if(guide.openBirds)guide.openBirds();else guide.showBirds()}} aria-label={`View ${guide.bird.commonName} in the bird guide`}><img src={guide.bird.image} alt="" width={32} height={32} className="h-8 w-8 rounded-full object-cover" style={{objectPosition:guide.bird.imagePosition}}/><span>{guide.bird.commonName}</span></button>}<BirdFilterControls/>{listenControl}<button ref={trigger} className={styles.control} type="button" aria-expanded={expanded} aria-label={expanded ? `Close expanded ${label}` : `Enlarge ${label}`} onClick={()=>resize(!expanded)}>{expanded ? <Minimize2 size={18} aria-hidden="true"/> : <Maximize2 size={18} aria-hidden="true"/>}</button></div>
    </div>
    {gestures && <p className={styles.help}>{active ? "Drag to move · Pinch with two fingers · + / − to zoom · Double tap to zoom · Home to reset" : "Map gestures paused. Double tap to resume, or use the hand button. Scroll the page outside the map."}</p>}
    {photoRequest && <div data-map-place-info hidden={!showPlaceInfo} className="order-1 min-h-0 overflow-auto"><MapLocationPhotos request={photoRequest} onReturn={()=>{setShowPlaceInfo(false);requestAnimationFrame(()=>mapTab.current?.focus({preventScroll:true}))}}/></div>}
    <div hidden={Boolean(photoRequest)&&showPlaceInfo} ref={surface} data-map-surface="true" data-gesturing={gesturing || undefined} className={styles.surface} tabIndex={gestures ? 0 : undefined} role={gestures ? "group" : undefined} aria-label={gestures ? `${label} gesture surface` : undefined} style={{touchAction: active ? "none" : "pan-y pinch-zoom",cursor:active ? "grab" : undefined}}
      onKeyDown={e=>{if(!gestures || e.target!==e.currentTarget)return;const step=35; const keys:Record<string,[number,number]>={ArrowLeft:[step,0],ArrowRight:[-step,0],ArrowUp:[0,step],ArrowDown:[0,-step]};if(keys[e.key]){e.preventDefault();const [x,y]=keys[e.key];commit(constrainMapView({...viewRef.current,x:viewRef.current.x+x,y:viewRef.current.y+y},box(),.35))}else if(['+','=','-','Home'].includes(e.key)){e.preventDefault();if(e.key==='Home')reset();else zoom(e.key==='-'?1/1.3:1.3)}}}
      onPointerDown={e=>{if(!active || (e.pointerType==='mouse' && e.button!==0))return;const rect=e.currentTarget.getBoundingClientRect();points.current.set(e.pointerId,{x:e.clientX-rect.left,y:e.clientY-rect.top});if(points.current.size>2){points.current.delete(e.pointerId);return}setGesturing(true);dragged.current=points.current.size>1;suppress.current=points.current.size>1;start.current={view:viewRef.current,points:[...points.current.values()]}}}
      onPointerMove={e=>{if(!active || !points.current.has(e.pointerId) || !start.current)return;const rect=e.currentTarget.getBoundingClientRect();points.current.set(e.pointerId,{x:e.clientX-rect.left,y:e.clientY-rect.top});const current=[...points.current.values()];const moved=current.some((p,i)=>Math.hypot(p.x-start.current!.points[i].x,p.y-start.current!.points[i].y)>5);if(!dragged.current && !moved)return;dragged.current=true;suppress.current=true;e.preventDefault();if(!e.currentTarget.hasPointerCapture(e.pointerId))e.currentTarget.setPointerCapture(e.pointerId);commit(mapGestureView(start.current.view,start.current.points,current,box(),.35))}}
      onPointerUp={e=>{if(gestures&&!dragged.current&&points.current.size<=1){const tap={x:e.clientX,y:e.clientY,at:e.timeStamp};if(isMapDoubleTap(lastTap.current,tap)){const rect=e.currentTarget.getBoundingClientRect();setMove(true);commit(zoomMapAt(viewRef.current,1.5,{x:e.clientX-rect.left,y:e.clientY-rect.top},box(),.35));suppress.current=true;lastTap.current=null}else lastTap.current=tap}else lastTap.current=null;points.current.delete(e.pointerId);if(e.currentTarget.hasPointerCapture(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId);start.current=points.current.size?{view:viewRef.current,points:[...points.current.values()]}:null;setGesturing(points.current.size>0)}}
      onPointerLeave={e=>{if(!e.currentTarget.hasPointerCapture(e.pointerId)){points.current.delete(e.pointerId);start.current=null;setGesturing(points.current.size>0)}}}
      onPointerCancel={()=>{points.current.clear();start.current=null;setGesturing(false)}}
      onLostPointerCapture={e=>{points.current.delete(e.pointerId);start.current=points.current.size?{view:viewRef.current,points:[...points.current.values()]}:null;setGesturing(points.current.size>0)}}
      onClickCapture={e=>{if(suppress.current){e.preventDefault();e.stopPropagation();suppress.current=false}}}>
      <div className={styles.content} style={gestures ? {transform:`translate(${view.x}px,${view.y}px) scale(${view.zoom})`} : undefined}>{geographic && geographicScope ? <GeographicSatelliteMap {...geographicScope}/> : children}</div>
    </div>
    {expanded && credits && <div className="shrink-0 px-2 py-2 text-xs leading-5 text-emerald-900">{credits}</div>}
  </dialog></MapControlsContext.Provider>
}
