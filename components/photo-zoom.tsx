"use client"

import { useContext, useEffect, useRef, useState, type ReactNode } from "react"
import { Hand, Minus, Plus, RotateCcw } from "lucide-react"
import { ExpandedMediaContext } from "./expandable-media"
import { constrainMapView, fitMapView, mapGestureView, zoomMapAt, type MapView } from "@/lib/map-gestures.mjs"
import { photoZoomLimit } from "@/lib/photo-zoom.mjs"
import styles from "./photo-zoom.module.css"

/** Only the photograph moves. Captions, credits and carousel controls stay fixed. */
export default function PhotoZoom({ children, label }: { children: ReactNode; label: string }) {
  const expanded = useContext(ExpandedMediaContext)
  const surface = useRef<HTMLDivElement>(null)
  const [view, setView] = useState<MapView>(fitMapView)
  const viewRef = useRef(view)
  const [move, setMove] = useState(false)
  const [limit, setLimit] = useState(1)
  const pointers = useRef(new Map<number, { x: number; y: number }>())
  const start = useRef<{ view: MapView; points: { x: number; y: number }[] } | null>(null)
  const box = () => ({ width: surface.current?.clientWidth || 1, height: surface.current?.clientHeight || 1 })
  function commit(next: MapView) {
    const bounded = constrainMapView({ ...next, zoom: Math.min(limit, next.zoom) }, box())
    viewRef.current = bounded
    setView(bounded)
  }
  function clearPointers() { pointers.current.clear(); start.current = null }
  function reset() { clearPointers(); viewRef.current = fitMapView; setView(fitMapView) }
  function measure() {
    const image = surface.current?.querySelector("img")
    const size = box()
    setLimit(image ? photoZoomLimit(image.naturalWidth, image.naturalHeight, size.width, size.height) : 1)
  }
  function zoom(factor: number) {
    const size = box()
    const target = Math.max(1, Math.min(limit, viewRef.current.zoom * factor))
    commit(zoomMapAt(viewRef.current, target / viewRef.current.zoom, { x: size.width / 2, y: size.height / 2 }, size))
  }
  useEffect(() => {
    reset(); setMove(false)
    const element = surface.current
    if (!element || !expanded) return
    const observer = new ResizeObserver(() => { reset(); measure() })
    observer.observe(element)
    measure()
    return () => { observer.disconnect(); clearPointers() }
  }, [expanded])
  const active = expanded && move
  return <>
    <div ref={surface} className={styles.surface} onLoadCapture={measure}
      tabIndex={expanded ? 0 : undefined} role={expanded ? "group" : undefined}
      aria-label={expanded ? `${label} photograph zoom surface` : undefined}
      style={{ touchAction: active ? "none" : "pan-y pinch-zoom", cursor: active ? "grab" : undefined }}
      onKeyDown={event => {
        if (!expanded || event.target !== event.currentTarget) return
        const offsets: Record<string, [number, number]> = { ArrowLeft: [35, 0], ArrowRight: [-35, 0], ArrowUp: [0, 35], ArrowDown: [0, -35] }
        if (offsets[event.key]) { event.preventDefault(); event.stopPropagation(); const [x, y] = offsets[event.key]; commit({ ...viewRef.current, x: viewRef.current.x + x, y: viewRef.current.y + y }) }
        else if (["+", "=", "-", "Home"].includes(event.key)) { event.preventDefault(); event.stopPropagation(); if (event.key === "Home") reset(); else zoom(event.key === "-" ? 1 / 1.25 : 1.25) }
      }}
      onPointerDown={event => {
        if ((event.target as HTMLElement).closest("button, a, input, select, textarea")) return
        if (!active || (event.pointerType === "mouse" && event.button !== 0) || pointers.current.size >= 2) return
        event.stopPropagation()
        const rect = event.currentTarget.getBoundingClientRect()
        pointers.current.set(event.pointerId, { x: event.clientX - rect.left, y: event.clientY - rect.top })
        event.currentTarget.setPointerCapture(event.pointerId)
        start.current = { view: viewRef.current, points: [...pointers.current.values()] }
      }}
      onPointerMove={event => {
        if (!active || !start.current || !pointers.current.has(event.pointerId)) return
        event.preventDefault(); event.stopPropagation()
        const rect = event.currentTarget.getBoundingClientRect()
        pointers.current.set(event.pointerId, { x: event.clientX - rect.left, y: event.clientY - rect.top })
        const gesture = mapGestureView(start.current.view, start.current.points, [...pointers.current.values()], box())
        // Clamp the scale around the same anchor rather than shifting at its limit.
        if (gesture.zoom <= limit) commit(gesture)
      }}
      onPointerUp={event => {
        if (!pointers.current.has(event.pointerId)) return
        event.stopPropagation(); pointers.current.delete(event.pointerId)
        if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
        start.current = pointers.current.size ? { view: viewRef.current, points: [...pointers.current.values()] } : null
      }}
      onPointerCancel={clearPointers} onLostPointerCapture={event => {
        pointers.current.delete(event.pointerId)
        start.current = pointers.current.size ? { view: viewRef.current, points: [...pointers.current.values()] } : null
      }}
      onTouchStart={event => { if (active) event.stopPropagation() }}
      onTouchEnd={event => { if (active) event.stopPropagation() }}>
      <div className={styles.image} style={{ transform: expanded ? `translate(${view.x}px,${view.y}px) scale(${view.zoom})` : undefined }}>{children}</div>
    </div>
    {expanded && <div data-photo-zoom-controls="true" className={styles.tools} role="group" aria-label={`${label} photograph controls`}>
      <button type="button" aria-label="Zoom photograph in" disabled={view.zoom >= limit - .001} onClick={() => zoom(1.25)}><Plus size={18} aria-hidden="true" /></button>
      <button type="button" aria-label="Zoom photograph out" disabled={view.zoom <= 1} onClick={() => zoom(1 / 1.25)}><Minus size={18} aria-hidden="true" /></button>
      <button type="button" aria-label="Reset photograph zoom" onClick={reset}><RotateCcw size={18} aria-hidden="true" /></button>
      <button type="button" aria-label="Move and pinch photograph" aria-pressed={move} disabled={limit <= 1} onClick={() => { clearPointers(); setMove(value => !value) }}><Hand size={18} aria-hidden="true" /></button>
      <span role="status">{view.zoom.toFixed(1)}×</span>
      <p>{limit <= 1 ? "Full available resolution" : "+ / − to zoom · Home to fit · Move to drag or pinch"}</p>
    </div>}
  </>
}
