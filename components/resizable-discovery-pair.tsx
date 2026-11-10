/**
 * A reusable map/media pair. Only its containers resize; map geometry and photos
 * keep their own rendering rules. Children stay mounted when the layout stacks,
 * preserving the selected bird, open details and audio state across screen changes.
 */
"use client"

import { useColombiaHomeCopy } from "@/components/colombia-home-language"
import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from "react"
import { GripVertical, RotateCcw, BookOpen, FlipHorizontal2, Columns2 } from "lucide-react"
import { clampDiscoverySplit, discoverySplitBounds, dragDiscoverySplit, DISCOVERY_PAIR_MIN_WIDTH } from "@/lib/discovery-split"
import { FieldGuideContext } from "./field-guide-context"
import styles from "./resizable-discovery-pair.module.css"

type BirdCue = { commonName: string; image: string; imagePosition?: string }
type Props = { birdCue?: BirdCue; map: ReactNode; media: ReactNode; mapLabel: string; mediaId?: string; mediaFirst?: boolean; mediaLabel?: string }
type Drag = { pointerId: number; startX: number; share: number; width: number }

export default function ResizableDiscoveryPair({ map, media, mapLabel, mediaId, birdCue, mediaFirst = false, mediaLabel = "bird photographs" }: Props) {
  const localizeHome = useColombiaHomeCopy()

  const id = useId()
  const containerRef = useRef<HTMLDivElement>(null)
  const turnRef = useRef<HTMLButtonElement>(null)
  const separatorRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<Drag | null>(null)
  const [layout, setLayout] = useState<"guide" | "paired">("guide")
  const [face, setFace] = useState<"birds" | "map">("birds")
  const [width, setWidth] = useState(0)
  const [share, setShare] = useState(50)
  const [dragging, setDragging] = useState(false)
  const paired = layout === "paired" && width >= DISCOVERY_PAIR_MIN_WIDTH
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

  useEffect(() => {
    // Existing place/resource links must reveal the map face before native scrolling.
    function revealMap(hash: string) {
      if (!hash.startsWith("#")) return
      try {
        const target = document.getElementById(decodeURIComponent(hash.slice(1)))
        if (target && document.getElementById(`${id}-map`)?.contains(target)) setFace("map")
      } catch { /* An invalid fragment keeps native navigation unchanged. */ }
    }
    const followHash = () => revealMap(window.location.hash)
    const followLink = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return
      const link = event.target instanceof Element ? event.target.closest('a[href^="#"]') : null
      if (link) revealMap(link.getAttribute("href") || "")
    }
    followHash()
    window.addEventListener("hashchange", followHash)
    document.addEventListener("click", followLink)
    return () => { window.removeEventListener("hashchange", followHash); document.removeEventListener("click", followLink) }
  }, [id])

  // CSS uses these proportions only when both cards fit. No browser storage or account setting is needed.
  const leftShare = mediaFirst ? 100 - effectiveShare : effectiveShare
  const direction = mediaFirst ? -1 : 1
  const layoutStyle = { "--discovery-columns": `minmax(0, ${leftShare}fr) 44px minmax(0, ${100 - leftShare}fr)` } as CSSProperties

  function showBirds() { setFace("birds"); setLayout("guide"); turnRef.current?.focus({preventScroll:true}) }

  function finishDrag(pointerId: number) {
    if (dragRef.current?.pointerId !== pointerId) return
    dragRef.current = null
    setDragging(false)
    if (separatorRef.current?.hasPointerCapture(pointerId)) separatorRef.current.releasePointerCapture(pointerId)
  }

  return localizeHome(<div ref={containerRef} className={styles.container} data-field-guide="true">
    <div className={styles.guideToolbar}>
      <div className={styles.guideTitle}><BookOpen size={20} aria-hidden="true"/><span>Your bird guide</span><span className={styles.pageLabel}>{layout === "paired" ? "Map & birds" : face === "birds" ? "Birds" : "Map"}</span></div>
      <div className={styles.guideActions}>
        <button type="button" ref={turnRef} className={styles.turnButton} aria-controls={`${id}-birds ${id}-map`} onClick={() => { setLayout("guide"); setFace(face === "birds" ? "map" : "birds") }}>
          <FlipHorizontal2 size={19} aria-hidden="true"/>{face === "birds" ? "Turn to the map" : "Turn to the birds"}
        </button>
        <button type="button" className={styles.reset} aria-pressed={layout === "paired"} onClick={() => setLayout(layout === "paired" ? "guide" : "paired")}><Columns2 size={17} aria-hidden="true"/>{layout === "paired" ? "Return to the guide" : "Show map & birds together"}</button>
      </div>
    </div>
    <p className={styles.guideHelp}>Turn the card to explore the map and meet its birds. Your place and bird stay selected.</p>
    <span className="sr-only" role="status">{layout === "paired" ? "Map and birds shown together." : face === "birds" ? "Bird photographs side of the guide." : "Map side of the guide."}</span>
    <div className={styles.controls} hidden={layout === "guide"}>
      <p id={`${id}-help`}>Drag the divider or use its arrow keys to resize.</p>
      <button type="button" onClick={() => setShare(50)} className={styles.reset}>
        <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />Reset layout
      </button>
    </div>
    <div className={styles.pair} style={layoutStyle} data-dragging={dragging} data-media-first={mediaFirst} data-layout={layout} data-face={face}>
      {/* Media comes first on mobile; desktop can place it on either side. */}
      <div id={`${id}-birds`} className={styles.mediaPanel} inert={layout === "guide" && face !== "birds"} aria-hidden={layout === "guide" && face !== "birds"}><div id={mediaId}>{media}</div></div>
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
      <div id={`${id}-map`} className={styles.mapPanel} inert={layout === "guide" && face !== "map"} aria-hidden={layout === "guide" && face !== "map"}>
        {birdCue && <button type="button" className={styles.birdCue} onClick={showBirds} aria-label={`View ${birdCue.commonName} in the bird guide`}>
          <img src={birdCue.image} alt="" width={48} height={48} loading="lazy" style={{objectPosition:birdCue.imagePosition}}/>
          <span><span className={styles.cueCaption}>On the bird side</span><span className={styles.cueName}>{birdCue.commonName}</span></span><BookOpen size={18} aria-hidden="true"/>
        </button>}
        <FieldGuideContext.Provider value={{bird:birdCue,showBirds}}>{map}</FieldGuideContext.Provider>
      </div>
    </div>
  </div>)
}
