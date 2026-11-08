"use client"

/** One reversible word, not a link or a slideshow. Both faces occupy the same
 * grid cell so AVES never pushes the rest of the heading around. The heading's
 * readable sentence stays stable for assistive technology.
 */
import { useRef, useState } from "react"
import styles from "./birds-brand-word.module.css"

export default function BirdsBrandWord() {
  const [flipped, setFlipped] = useState(false)
  const pointerFocus = useRef(false)

  return <button type="button" className={styles.word} data-flipped={flipped} aria-label="Switch between birds and AVES" aria-pressed={flipped} title="AVES means birds"
    onPointerEnter={event => { if (event.pointerType !== "touch") setFlipped(true) }}
    onPointerLeave={event => { if (event.pointerType !== "touch") setFlipped(false) }}
    onPointerDown={() => { pointerFocus.current = true }}
    onPointerCancel={() => { pointerFocus.current = false; setFlipped(false) }}
    onFocus={() => {
      // Pointer focus is followed by click: let that single click do the flip.
      // Keyboard focus previews AVES immediately, just as hovering does.
      if (!pointerFocus.current) setFlipped(true)
      pointerFocus.current = false
    }}
    onBlur={() => { pointerFocus.current = false; setFlipped(false) }}
    onClick={() => { pointerFocus.current = false; setFlipped(value => !value) }}
    onKeyDown={event => { if (event.key === "Escape") setFlipped(false) }}>
    <span className={styles.rotor} aria-hidden="true">
      <span className={styles.front}>birds</span>
      <span className={styles.back}>AVES</span>
    </span>
  </button>
}
