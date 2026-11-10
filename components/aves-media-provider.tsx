"use client"

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react"
import { BrandBird } from "@/components/brand-bird"
import { useRouter } from "next/navigation"
import { playForegroundMedia, setEmbeddedMediaFocus } from "@/lib/media-focus"
import { mediaIdentity } from "@/lib/media-identity"
import { mediaClientHref } from "@/lib/media-navigation"
import { Maximize2, Minimize2, Pause, Play, Volume2, VolumeX, X } from "lucide-react"
import { travelMediaResources } from "@/content/travel-media"
import { MEDIA_HANDOFF_KEY, readMediaHandoff, type MediaHandoff } from "@/lib/media-handoff"
import styles from "./aves-media-provider.module.css"

type Resource = typeof travelMediaResources[number]
type MediaContextValue = { resourceId: string | null; open: (id: string) => void }
const MediaContext = createContext<MediaContextValue | null>(null)
export const useAvesMedia = () => useContext(MediaContext)

interface VideoPlayer {
  playVideo(): void
  pauseVideo(): void
  mute(): void
  unMute(): void
  isMuted(): boolean
  getCurrentTime(): number
  destroy(): void
}
type VideoAPI = { Player: new (element: HTMLIFrameElement, options: { events: {
  onReady: () => void
  onStateChange: (event: { data: number }) => void
  onError: () => void
} }) => VideoPlayer }
type MediaWindow = Window & { YT?: VideoAPI; onYouTubeIframeAPIReady?: () => void }
let videoAPI: Promise<VideoAPI> | undefined

/** Only load Google's supported API after an explicit video request. Preserve
 * another embed's ready callback; never read inside a cross-origin iframe. */
function loadVideoAPI(): Promise<VideoAPI> {
  const host = window as MediaWindow
  if (host.YT?.Player) return Promise.resolve(host.YT)
  if (!videoAPI) videoAPI = new Promise((resolve, reject) => {
    const previous = host.onYouTubeIframeAPIReady
    const timeout = window.setTimeout(() => { videoAPI = undefined; reject(new Error("Video controls unavailable")) }, 15000)
    host.onYouTubeIframeAPIReady = () => {
      previous?.()
      window.clearTimeout(timeout)
      if (host.YT?.Player) resolve(host.YT)
    }
    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const script = document.createElement("script")
      script.src = "https://www.youtube.com/iframe_api"
      script.onerror = () => { window.clearTimeout(timeout); videoAPI = undefined; reject(new Error("Video controls unavailable")) }
      document.head.appendChild(script)
    }
  })
  return videoAPI
}

/** The shared layout owns the player, so Next navigation does not replace the
 * audio/iframe. Nothing is fetched until a visitor chooses a curated resource.
 * A document reload can only restore a paused, explicitly resumable checkpoint. */
export function AvesMediaProvider({ children, assetBase = "", navigationPaths = [] }: { children: ReactNode; assetBase?: string; navigationPaths?: readonly string[] }) {
  const router = useRouter()
  const [resourceId, setResourceId] = useState<string | null>(null)
  const [expanded, setExpanded] = useState(false)
  const [handoff, setHandoff] = useState<MediaHandoff | null>(null)
  const [resumeRequired, setResumeRequired] = useState(false)
  useEffect(() => {
    const restore = () => {
      try {
        const saved = readMediaHandoff(sessionStorage.getItem(MEDIA_HANDOFF_KEY))
        setHandoff(saved)
        setResourceId(saved?.resourceId ?? null)
        setResumeRequired(Boolean(saved))
        if (!saved) sessionStorage.removeItem(MEDIA_HANDOFF_KEY)
      } catch { /* Storage can be disabled. Ordinary playback still works. */ }
    }
    const returned = (event: PageTransitionEvent) => { if (event.persisted) restore() }
    restore()
    // A cached page must not resurrect a player closed in the other app.
    window.addEventListener("pageshow", returned)
    return () => window.removeEventListener("pageshow", returned)
  }, [])
  useEffect(() => {
    if (!resourceId) return
    // Bubble after preview handlers. A prevented first tap stays a preview;
    // native modifiers/new tabs, downloads and hash links stay native as well.
    const navigate = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return
      const anchor = event.target instanceof Element ? event.target.closest("a[href]") : null
      if (!anchor || anchor.hasAttribute("download") || (anchor.getAttribute("target") && anchor.getAttribute("target") !== "_self") || anchor.getAttribute("rel")?.split(/\s+/).includes("external")) return
      const href = mediaClientHref(anchor.getAttribute("href")!, window.location.href, navigationPaths, assetBase)
      if (href !== null) { event.preventDefault(); router.push(href) }
    }
    document.addEventListener("click", navigate)
    return () => document.removeEventListener("click", navigate)
  }, [resourceId, navigationPaths, assetBase, router])
  const remember = useCallback((id: string, position: number, muted: boolean) => {
    try { sessionStorage.setItem(MEDIA_HANDOFF_KEY, JSON.stringify({ version: 1, resourceId: id, position, muted, savedAt: Date.now() })) } catch { /* No storage is required for playback. */ }
  }, [])
  const opener = useRef<HTMLElement | null>(null)
  function open(id: string) {
    if (!travelMediaResources.some(item => item.id === id && item.playback)) return
    opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    // Reopening the same resource preserves its stream and position.
    if (id !== resourceId) { setHandoff(null); remember(id, 0, false) }
    setResumeRequired(false)
    setResourceId(id)
    setExpanded(false)
  }
  function close() {
    setResourceId(null)
    setHandoff(null)
    setResumeRequired(false)
    try { sessionStorage.removeItem(MEDIA_HANDOFF_KEY) } catch { /* Optional storage. */ }
    if (opener.current?.isConnected) opener.current.focus({ preventScroll: true })
  }
  const resource = travelMediaResources.find(item => item.id === resourceId)
  return <MediaContext.Provider value={{ resourceId, open }}>
    {children}
    {resource && (resumeRequired ? <aside className={styles.dock} aria-label="AVES travel media player" onKeyDown={event => { if (event.key === "Escape") { event.stopPropagation(); close() } }}>
      <div className={styles.heading}><BrandBird country={resource.country} regionId={resource.country === "new-zealand" ? "south-island" : undefined} placeId={resource.mapPlace?.id} size={36} /><div className={styles.title}><span>Ready when you are</span><strong>{resource.title}</strong></div><button className={styles.feather} onClick={close} aria-label="Close player and stop playback"><X size={18} /></button></div>
      <p className={styles.note}>Playback paused while the page changed. Resume from {time(handoff?.position || 0)}.</p>
      <button className={styles.resume} onClick={() => setResumeRequired(false)}><Play size={18} aria-hidden="true" />Resume media</button>
    </aside> : <MediaDock key={resource.id} resource={resource} expanded={expanded} setExpanded={setExpanded} close={close} initial={handoff?.resourceId === resource.id ? handoff : null} remember={remember} />)}
    {/* Space below the document keeps the dock from hiding the final links. */}
    {resource && <div aria-hidden="true" style={{ height: resource.playback?.type === "youtube" ? 360 : 160 }} />}
  </MediaContext.Provider>
}

function time(seconds: number) {
  const value = Math.max(0, Math.floor(Number.isFinite(seconds) ? seconds : 0))
  return `${Math.floor(value / 60)}:${String(value % 60).padStart(2, "0")}`
}

function MediaDock({ resource, expanded, setExpanded, close, initial, remember }: {
  resource: Resource; expanded: boolean; setExpanded: (value: boolean) => void; close: () => void
  initial: MediaHandoff | null; remember: (id: string, position: number, muted: boolean) => void
}) {
  const audio = useRef<HTMLAudioElement>(null)
  const frame = useRef<HTMLDivElement>(null)
  const video = useRef<VideoPlayer | null>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(initial?.muted ?? false)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState("")
  const [position, setPosition] = useState(initial?.position ?? 0)
  const starting = useRef(initial)
  const [duration, setDuration] = useState(0)
  const playback = resource.playback!
  const identity = mediaIdentity(resource.country)

  useEffect(() => {
    let active = true
    const element = audio.current
    const container = frame.current
    const stopOthers = () => document.querySelectorAll<HTMLMediaElement>("audio:not([data-aves-ambience]),video").forEach(item => { if (item !== element) item.pause() })
    const anotherPlaying = (event: Event) => {
      if (event.target !== element && !(event.target instanceof HTMLElement && event.target.hasAttribute("data-aves-ambience"))) { element?.pause(); video.current?.pauseVideo() }
    }
    let videoStarted = false
    let videoActive = false
    const seek = () => {
      if (element && starting.current) element.currentTime = Math.min(starting.current.position, Number.isFinite(element.duration) ? element.duration : starting.current.position)
    }
    const checkpoint = () => {
      // Loading a slow publisher must not overwrite a useful saved position with zero.
      const seconds = element?.readyState ? element.currentTime : videoStarted ? video.current?.getCurrentTime() ?? 0 : starting.current?.position ?? 0
      const isMuted = element?.muted ?? (videoStarted ? video.current?.isMuted() : starting.current?.muted) ?? false
      if (video.current) setEmbeddedMediaFocus(resource.id, videoActive && !isMuted ? "playing" : null)
      if (Number.isFinite(seconds)) remember(resource.id, seconds, isMuted)
    }
    const leaving = () => { checkpoint(); element?.pause(); video.current?.pauseVideo(); setEmbeddedMediaFocus(resource.id, null) }
    window.addEventListener("pagehide", leaving)
    const timer = window.setInterval(checkpoint, 1000)
    stopOthers()
    document.addEventListener("play", anotherPlaying, true)
    if (playback.type === "audio" && element) {
      // This effect only mounts following an explicit Play action. Safari may
      // still require a second tap; the dock always retains a Play control.
      element.muted = starting.current?.muted ?? false
      element.addEventListener("loadedmetadata", seek, { once: true })
      element.src = playback.src
      playForegroundMedia(element).catch(() => { if (active) setError("Tap play to start the podcast.") })
    } else if (container) {
      // Reserve foreground priority while supported controls initialise.
      setEmbeddedMediaFocus(resource.id, "playing")
      // The API owns this iframe inside a React-owned empty wrapper. It can
      // destroy its listeners and timers without removing React-owned nodes.
      const iframe = document.createElement("iframe")
      const url = new URL(playback.src)
      url.searchParams.set("enablejsapi", "1")
      if (starting.current?.position) url.searchParams.set("start", String(Math.floor(starting.current.position)))
      url.searchParams.set("origin", window.location.origin)
      iframe.src = url.href
      iframe.title = `${resource.title} — DOC video player`
      // The permission lets a user's dock Play action reach YouTube through its
      // API. No autoplay URL parameter or play-on-ready action is used.
      iframe.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen"
      iframe.allowFullscreen = true
      iframe.referrerPolicy = "strict-origin-when-cross-origin"
      container.appendChild(iframe)
      loadVideoAPI().then(api => {
        if (!active || !iframe.isConnected) return
        video.current = new api.Player(iframe, { events: {
          onReady: () => { if (active) { if (starting.current?.muted) video.current?.mute(); setEmbeddedMediaFocus(resource.id, videoActive ? "playing" : null); setReady(true) } },
          onStateChange: event => {
            if (!active) return
            if (event.data === 1) videoStarted = true
            videoActive = [1, 3].includes(event.data)
            const silent = video.current?.isMuted() ?? false
            setEmbeddedMediaFocus(resource.id, videoActive && !silent ? "playing" : null)
            setPlaying(event.data === 1)
            setMuted(silent)
            if (event.data === 1) stopOthers()
          },
          onError: () => { if (active) { setEmbeddedMediaFocus(resource.id, null); setError("This video could not play. Open the original source below.") } },
        } })
      }).catch(() => { if (active) { setEmbeddedMediaFocus(resource.id, "unknown"); setError("Use the video's own controls, or open its original source.") } })
    }
    return () => {
      active = false
      setEmbeddedMediaFocus(resource.id, null)
      window.clearInterval(timer)
      window.removeEventListener("pagehide", leaving)
      document.removeEventListener("play", anotherPlaying, true)
      element?.removeEventListener("loadedmetadata", seek)
      element?.pause(); element?.removeAttribute("src"); element?.load()
      video.current?.destroy(); video.current = null
      container?.replaceChildren()
    }
  }, [playback, remember, resource.id])

  function toggle() {
    setError("")
    if (audio.current) {
      if (audio.current.paused) {
        document.querySelectorAll<HTMLMediaElement>("audio:not([data-aves-ambience]),video").forEach(item => { if (item !== audio.current) item.pause() })
        playForegroundMedia(audio.current).catch(() => setError("Unable to play. Try the original source below."))
      }
      else audio.current.pause()
    } else if (playing) video.current?.pauseVideo()
    else { setEmbeddedMediaFocus(resource.id, muted ? null : "playing"); video.current?.playVideo() }
  }
  function toggleMute() {
    if (audio.current) audio.current.muted = !muted
    else if (muted) video.current?.unMute()
    else video.current?.mute()
    setMuted(!muted)
  }
  return <aside onKeyDown={event => { if (event.key === "Escape") { event.stopPropagation(); if (expanded) setExpanded(false); else close() } }} aria-label="AVES travel media player" className={`${styles.dock} ${expanded ? styles.expanded : ""}`}>
    <div className={styles.heading}>
      <BrandBird country={resource.country} regionId={resource.country === "new-zealand" ? "south-island" : undefined} placeId={resource.mapPlace?.id} size={36} />
      <div className={styles.title}><span>{identity.country} · {resource.kind}</span><strong title={resource.title}>{resource.title}</strong></div>
      <button className={styles.feather} onClick={() => setExpanded(!expanded)} aria-label={expanded ? "Compact player" : "Expand player"} title={expanded ? "Compact player" : "Expand player"}>{expanded ? <Minimize2 size={17} /> : <Maximize2 size={17} />}</button>
      <button className={styles.feather} onClick={close} aria-label="Close player and stop playback" title="Close and stop"><X size={18} /></button>
    </div>
    {/* This iframe stays in the same tree position when docking/expanding or
        navigating. CSS changes its size without restarting the programme. */}
    {playback.type === "youtube" && <div ref={frame} className={styles.video} />}
    {playback.type === "audio" && <audio ref={audio} preload="none" data-aves-resource-audio aria-label={`${resource.title} podcast`}
      onPlaying={() => { setPlaying(true); setError("") }} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)}
      onTimeUpdate={event => setPosition(event.currentTarget.currentTime)}
      onDurationChange={event => setDuration(Number.isFinite(event.currentTarget.duration) ? event.currentTarget.duration : 0)}
      onError={() => { setPlaying(false); setError("Unable to load the recording. Try the original source below.") }} />}
    <div className={styles.controls}>
      <button className={styles.feather} onClick={toggle} disabled={playback.type === "youtube" && !ready} aria-label={playing ? "Pause media" : "Play media"} title={playing ? "Pause" : "Play"}>{playing ? <Pause size={18} /> : <Play size={18} />}</button>
      {playback.type === "audio" && <div className={styles.seek}><label htmlFor="aves-media-seek" className="sr-only">Podcast position</label><input id="aves-media-seek" type="range" min={0} max={duration || 1} value={position} step={1} disabled={!duration} aria-valuetext={`${time(position)} of ${time(duration)}`} onChange={event => { if (audio.current) audio.current.currentTime = Number(event.target.value); setPosition(Number(event.target.value)) }} /><span>{time(position)} / {time(duration)}</span></div>}
      {playback.type === "youtube" && <span className={styles.videoHint}>DOC · YouTube</span>}
      <button className={styles.feather} onClick={toggleMute} disabled={playback.type === "youtube" && !ready} aria-label={muted ? "Unmute media" : "Mute media"} title={muted ? "Unmute" : "Mute"} aria-pressed={muted}>{muted ? <VolumeX size={18} /> : <Volume2 size={18} />}</button>
    </div>
    {error && <p className={styles.note} role="status">{error} <a href={resource.href} target="_blank" rel="noreferrer">Original source</a></p>}
    {expanded && <div className={styles.details}><p>{resource.description}</p><a href={resource.href} target="_blank" rel="noreferrer">{resource.action} ↗</a><p>Continues while browsing within this app. Moving between AVES apps or reloading pauses playback; choose Resume to continue. Video may need its Play control. Closing the player clears its saved position.</p></div>}
  </aside>
}
