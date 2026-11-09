"use client"
import { useRef, type MouseEvent } from "react"
import { regionActivation } from "@/lib/region-activation"

/** First activation previews immediately. A later activation opens the guide.
 * No double-tap timer or touch gesture interception: browser zoom still works.
 */
export function useRegionPreview(onPreview: (id: string) => void) {
  const armed = useRef<string | null>(null)
  function preview(id: string) { armed.current = id || null; onPreview(id) }
  function activate(event: MouseEvent, id: string) {
    if (regionActivation(armed.current, id, event).native) return
    event.preventDefault()
    preview(id)
  }
  function activateButton(id: string, href: string) {
    if (armed.current === id) { window.location.assign(href); return }
    preview(id)
  }
  return { preview, activate, activateButton, clear: () => { armed.current = null } }
}
