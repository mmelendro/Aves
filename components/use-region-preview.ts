"use client"
import { useRef, type MouseEvent, type KeyboardEvent } from "react"
import { useRouter } from "next/navigation"
import { publicPages } from "@/lib/public-pages"
import { mediaClientHref } from "@/lib/media-navigation"
import { regionActivation } from "@/lib/region-activation"

/** First activation previews immediately. A later activation opens the guide.
 * No double-tap timer or touch gesture interception: browser zoom still works.
 */
export function useRegionPreview(onPreview: (id: string) => void, navigate?: (href: string) => void) {
  const router = useRouter()
  const go = navigate ?? (href => {
    const local = mediaClientHref(href, window.location.href, publicPages.map(page => page.href))
    if (local !== null) router.push(local)
    else window.location.assign(href)
  })
  const armed = useRef<string | null>(null)
  function preview(id: string) { armed.current = id || null; onPreview(id) }
  function activate(event: MouseEvent, id: string) {
    if (regionActivation(armed.current, id, event).native) return
    event.preventDefault()
    preview(id)
  }
  function activateButton(id: string, href: string) {
    if (armed.current === id) { go(href); return }
    preview(id)
  }
  function activateKey(event: KeyboardEvent, id: string, href: string) {
    // SVG anchors do not activate consistently with Enter in every browser.
    if (event.key !== "Enter" || event.repeat || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return
    event.preventDefault()
    activateButton(id, href)
  }
  return { preview, activate, activateButton, activateKey, clear: () => { armed.current = null } }
}
