"use client"

import { useLayoutEffect, useRef, useState } from "react"
import { contextualHeaderGeometry, newZealandHeaderGeometry, type ContextualHeaderProfile } from "@/lib/header-landscape.mjs"

import styles from "./header-contour.module.css"

type Geometry = ReturnType<typeof newZealandHeaderGeometry>

/** Static decorative vectors; links and focus indicators stay above this layer. */
type Drawing = { width: number; geometry: Geometry; key: string }

export function HeaderContour({ profile, country = "colombia" }: { profile?: ContextualHeaderProfile; country?: string }) {
  const ref = useRef<SVGSVGElement>(null)
  const [drawing, setDrawing] = useState<Drawing | null>(null)
  const [previous, setPrevious] = useState<Drawing | null>(null)
  const latest = useRef<Drawing | null>(null)
  const sceneKey = profile ? `${country}-${profile.terrain}-${profile.water}` : "new-zealand"
  useLayoutEffect(() => {
    const svg = ref.current, header = svg?.closest("header")
    const word = header?.querySelector<HTMLElement>("[data-brand-wordmark]")
    const nav = header?.querySelector<HTMLElement>("[data-contour-navigation]")
    if (!svg || !header || !word || !nav) return
    function measure() {
      const h = header!.getBoundingClientRect(), b = word!.getBoundingClientRect(), n = nav!.getBoundingClientRect()
      const next = { key: sceneKey, width: h.width, geometry: profile ? contextualHeaderGeometry({ width: h.width, wordCenter: b.left - h.left + b.width / 2, navLeft: n.left - h.left, navRight: n.right - h.left }, profile) : newZealandHeaderGeometry({ width: h.width, wordCenter: b.left - h.left + b.width / 2, navLeft: n.left - h.left, navRight: n.right - h.left }) }
      if (latest.current && latest.current.key !== sceneKey) setPrevious(latest.current)
      latest.current = next
      setDrawing(next)
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(header); observer.observe(word); observer.observe(nav)
    let active = true
    document.fonts.ready.then(() => { if (active) measure() })
    return () => { active = false; observer.disconnect() }
  }, [profile, sceneKey])
  const g = drawing?.geometry
  return <svg ref={ref} data-header-contour={profile ? `${country}-${profile.terrain}` : "new-zealand"} aria-hidden="true" focusable="false" viewBox={`0 0 ${drawing?.width || 1440} 132`} preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 top-0 h-[132px] w-full text-emerald-700" fill="none">
    {previous && <g key={`old-${previous.key}`} className={styles.leave}><ContourScene g={previous.geometry} width={previous.width} /></g>}
    {g ? <g key={drawing!.key} className={previous ? styles.enter : undefined}><ContourScene g={g} width={drawing!.width} /></g> : <path d="M0 108H1440V0H0Z" fill="white" />}

  </svg>
}

function ContourScene({g,width}:{g:Geometry;width:number}){ return <>
    <path d={`${g.boundary} L${width} 0 H0 Z`} fill="white" />
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path data-landscape-boundary="true" d={g.boundary} strokeWidth="1.35" />
      {[...g.ridges, ...g.water].map((d, i) => <path key={i} d={d} strokeWidth=".65" />)}
      <g data-header-wildlife="true" strokeWidth=".7">
        {g.whales.map((d, i) => <path key={i} d={d} />)}
        {g.birds.map((bird, i) => <g key={i} transform={`translate(${bird.x} ${bird.y}) rotate(${bird.rotation}) scale(${bird.size})`}>
          <path d={i % 3 === 0 ? "M-1 -.2 Q-.5 -.52 0 0 Q.28 -.34 .9 -.52 M0 0 L.08 .2 L.2 .09" : "M-1 -.2 Q-.48 -.34 0 0 Q.48 -.34 1 -.2 M0 0 L.06 .2 L.15 .08"} strokeWidth={.7 / bird.size} />
        </g>)}
      </g>
    </g>
</> }
