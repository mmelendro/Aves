/**
 * A reusable map/media pair. Only its containers resize; map geometry and photos
 * keep their own rendering rules. Children stay mounted when the layout stacks,
 * preserving the selected bird, open details and audio state across screen changes.
 */
"use client"

import { useColombiaHomeCopy } from "@/components/colombia-home-language"
import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from "react"
import { GripVertical, RotateCcw } from "lucide-react"
import { clampDiscoverySplit, discoverySplitBounds, dragDiscoverySplit, DISCOVERY_PAIR_MIN_WIDTH } from "@/lib/discovery-split"
import styles from "./resizable-discovery-pair.module.css"

type Props = { map: ReactNode; media: ReactNode; mapLabel: string; mediaId?: string; mediaFirst?: boolean; mediaLabel?: string }
type Drag = { pointerId: number; startX: number; share: number; width: number }

export default function ResizableDiscoveryPair({ map, media, mapLabel, mediaId, mediaFirst = false, mediaLabel = "bird photographs" }: Props) {
  const localizeHome = useColombiaHomeCopy()

  const id = useId()
  const containerRef = useRef<HTMLDivElement>(null)
  const separatorRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<Drag | null>(null)
  const [width, setWidth] = useState(0)
  const [share, setShare] = useState(50)
  const [dragging, setDragging] = useState(false)
  const paired = width >= DISCOVERY_PAIR_MIN_WIDTH
  const effectiveShare = clampDiscoverySplit(share, width)
  const bounds = discoverySplitBounds(width)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    // Observe the actual available container, not a guessed device/viewport size.
    // A narrower container also releases an in-progress drag and clamps its split.
    const observer = new ResizeObserver(entries => {
      const nextWidth = entries[0].contentRect.width
      setWidth(previous => previous === nextWidth ? previous : nextWidth)
      setShare(previous => clampDiscoverySplit(previous, nextWidth))
      const active = dragRef.current
      // Content-box and bounding-box readings can differ by a fraction of a
      // pixel. A height-only observer update must not interrupt an active drag.
      if (active && Math.abs(active.width - nextWidth) > 1) {
        dragRef.current = null
        setDragging(false)
        const separator = separatorRef.current
        if (separator?.hasPointerCapture(active.pointerId)) separator.releasePointerCapture(active.pointerId)
      }
    })
    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  // CSS uses these proportions only when both cards fit. No browser storage or account setting is needed.
  const leftShare = mediaFirst ? 100 - effectiveShare : effectiveShare
  const direction = mediaFirst ? -1 : 1
  const layoutStyle = { "--discovery-columns": `minmax(0, ${leftShare}fr) 44px minmax(0, ${100 - leftShare}fr)` } as CSSProperties

  function finishDrag(pointerId: number) {
    if (dragRef.current?.pointerId !== pointerId) return
    dragRef.current = null
    setDragging(false)
    if (separatorRef.current?.hasPointerCapture(pointerId)) separatorRef.current.releasePointerCapture(pointerId)
  }

  return localizeHome(<div ref={containerRef} className={styles.container}>
    <div className={styles.controls}>
      <p id={`${id}-help`}>Drag the divider or use its arrow keys to resize.</p>
      <button type="button" onClick={() => setShare(50)} className={styles.reset}>
        <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />Reset layout
      </button>
    </div>
    <div className={styles.pair} style={layoutStyle} data-dragging={dragging} data-media-first={mediaFirst}>
      {/* Media comes first on mobile; desktop can place it on either side. */}
      <div id={mediaId} className={styles.mediaPanel}>{media}</div>
      <div ref={separatorRef} role="separator" aria-orientation="vertical" aria-label={mapLabel}
        aria-controls={`${id}-map`} aria-describedby={`${id}-help`}
        aria-valuemin={Number(bounds.min.toFixed(1))} aria-valuemax={Number(bounds.max.toFixed(1))}
        aria-valuenow={Number(effectiveShare.toFixed(1))} aria-valuetext={`Map ${Math.round(effectiveShare)}%, ${mediaLabel} ${Math.round(100 - effectiveShare)}%`}
        tabIndex={paired ? 0 : -1} className={styles.divider}
        onKeyDown={event => {
          // Read current geometry in case input follows a window resize before
          // ResizeObserver has committed its next React update.
          const activeWidth = containerRef.current?.getBoundingClientRect().width ?? width
          if (activeWidth < DISCOVERY_PAIR_MIN_WIDTH) return
          const activeBounds = discoverySplitBounds(activeWidth)
          const activeShare = clampDiscoverySplit(share, activeWidth)
          const step = event.shiftKey ? 10 : 2
          const next = event.key === "ArrowLeft" ? activeShare - step * direction : event.key === "ArrowRight" ? activeShare + step * direction : event.key === "Home" ? activeBounds.min : event.key === "End" ? activeBounds.max : undefined
          if (next === undefined) return
          event.preventDefault()
          setShare(clampDiscoverySplit(next, activeWidth))
        }}
        onPointerDown={event => {
          const activeWidth = containerRef.current?.getBoundingClientRect().width ?? width
          if (activeWidth < DISCOVERY_PAIR_MIN_WIDTH || !event.isPrimary || event.button !== 0) return
          event.preventDefault()
          event.currentTarget.focus({ preventScroll: true })
          dragRef.current = { pointerId: event.pointerId, startX: event.clientX, share: clampDiscoverySplit(share, activeWidth), width: activeWidth }
          event.currentTarget.setPointerCapture(event.pointerId)
          setDragging(true)
        }}
        onPointerMove={event => {
          const active = dragRef.current
          if (active?.pointerId === event.pointerId) setShare(dragDiscoverySplit(active.share, (event.clientX - active.startX) * direction, active.width))
        }}
        onPointerUp={event => finishDrag(event.pointerId)} onPointerCancel={event => finishDrag(event.pointerId)}
        onLostPointerCapture={event => finishDrag(event.pointerId)}>
        <span className={styles.grip}><GripVertical className="h-5 w-5" aria-hidden="true" /></span>
      </div>
      <div id={`${id}-map`} className={styles.mapPanel}>{map}</div>
    </div>
  </div>)
}
