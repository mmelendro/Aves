/** Public playback coordination only. No preferences, URLs or account data. */
const embedded = new Map<string, "playing" | "unknown">()
const pending = new Set<HTMLMediaElement>()
const changed = () => window.dispatchEvent(new Event("aves:media-focus"))

export function setEmbeddedMediaFocus(id: string, state: "playing" | "unknown" | null) {
  if (embedded.get(id) === (state ?? undefined)) return
  if (state) embedded.set(id, state)
  else embedded.delete(id)
  changed()
}

// Keep play() inside the original user gesture. Announce intent first, allowing
// ambience gain to start ducking before a foreground recording starts.
export function playForegroundMedia(element: HTMLMediaElement): Promise<void> {
  pending.add(element)
  changed()
  try {
    return element.play().finally(() => { pending.delete(element); changed() })
  } catch (error) {
    pending.delete(element); changed()
    return Promise.reject(error)
  }
}

export function foregroundMediaStatus(elements: readonly Pick<HTMLMediaElement, "paused" | "ended" | "muted" | "volume">[], states: readonly string[], requested = false) {
  return {
    busy: requested || states.includes("playing") || elements.some(item => !item.paused && !item.ended && !item.muted && item.volume > 0),
    uncertain: states.includes("unknown"),
  }
}

export function readForegroundMedia() {
  return foregroundMediaStatus(Array.from(document.querySelectorAll<HTMLMediaElement>("audio:not([data-aves-ambience]),video")), [...embedded.values()], pending.size > 0)
}

export function subscribeForegroundMedia(update: () => void) {
  const events = ["play", "playing", "pause", "ended", "error", "emptied", "volumechange"]
  events.forEach(name => document.addEventListener(name, update, true))
  window.addEventListener("aves:media-focus", update)
  // Removed media must not leave a stale ducking reservation behind.
  const observer = new MutationObserver(update)
  observer.observe(document.body, { childList: true, subtree: true })
  update()
  return () => {
    events.forEach(name => document.removeEventListener(name, update, true))
    window.removeEventListener("aves:media-focus", update)
    observer.disconnect()
  }
}
