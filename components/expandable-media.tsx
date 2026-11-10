"use client"

import { createContext, useEffect, useRef, useState, type ReactNode } from "react"
import { Maximize2, Minimize2 } from "lucide-react"
import styles from "./expandable-media.module.css"

export const ExpandedMediaContext = createContext(false)

/** Enlarge the same viewer: slide, audio, Info and wish-list state survive.
 * Native modal positioning escapes the resizable panel's containing block and
 * keeps keyboard focus inside the viewer until it is closed.
 */
export default function ExpandableMedia({ children, label, enabled = true, kind = "bird" }: {
  children: ReactNode; label: string; enabled?: boolean; kind?: "bird" | "place"
}) {
  const dialog = useRef<HTMLDialogElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    if (!expanded) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = previous }
  }, [expanded])

  function resize(open: boolean) {
    const element = dialog.current
    if (!element) return
    // Switching a non-modal dialog to modal requires closing it first.
    // Its children stay mounted, so playback and selection are not duplicated.
    element.close()
    if (open) element.showModal()
    else element.show()
    setExpanded(open)
    if (!open) trigger.current?.focus({ preventScroll: true })
  }

  if (!enabled) return children
  return <dialog ref={dialog} open className={styles.viewer} data-expanded={expanded || undefined}
    role={expanded ? "dialog" : "group"} aria-modal={expanded || undefined} aria-label={label}
    onCancel={event => { event.preventDefault(); resize(false) }}>
    <ExpandedMediaContext.Provider value={expanded}>{children}</ExpandedMediaContext.Provider>
    <button ref={trigger} type="button" className={styles.control} data-kind={kind}
      aria-label={expanded ? `Close full-screen ${label}` : `Expand ${label}`}
      title={expanded ? "Close full-screen (Escape)" : "View full photograph"}
      aria-expanded={expanded} onClick={() => resize(!expanded)}>
      {expanded ? <Minimize2 size={19} aria-hidden="true" /> : <Maximize2 size={19} aria-hidden="true" />}
    </button>
  </dialog>
}
