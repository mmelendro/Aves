/** Only the transform is client-side; the world geometry remains server output. */
"use client"

import type { ReactNode } from "react"
import { useDestinationSelection } from "./destination-selection-context"
import styles from "./world-destination-map.module.css"

export default function WorldMapScene({ targets, children }: { targets: Record<string, { x: number; y: number; scale: number }>; children: ReactNode }) {
  const { selectedId, zoomed } = useDestinationSelection()
  const target = zoomed ? targets[selectedId] : undefined
  // SVG CSS pixels use the viewBox coordinate system here. A uniform scale keeps
  // the Equal Earth geometry intact while the regional view fades into place.
  const transform = target ? `translate(${500 - target.x * target.scale}px, ${286 - target.y * target.scale}px) scale(${target.scale})` : "translate(0px, 0px) scale(1)"
  return <g className={styles.scene} style={{ transform }}>{children}</g>
}
