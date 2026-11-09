"use client"

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react"
import Image from "next/image"
import { Maximize2, Minimize2, Pause, Play, Volume2, VolumeX, X } from "lucide-react"
import { southIslandResources } from "@/content/south-island"
import styles from "./aves-media-provider.module.css"

type Resource = typeof southIslandResources[number]
type MediaContextValue = { resourceId: string | null; open: (id: string) => void }
const MediaContext = createContext<MediaContextValue | null>(null)
export const useAvesMedia = () => useContext(MediaContext)

interface VideoPlayer {
  playVideo(): void
  pauseVideo(): void
  mute(): void
  unMute(): void
  isMuted(): boolean
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
 * Playback is intentionally not restored after refresh, closing or leaving AVES. */
export function AvesMediaProvider({ children }: { children: ReactNode }) {
  const [resourceId, setResourceId] = useState<string | null>(null)
  const [expanded, setExpanded] = useState(false)
  const opener = useRef<HTMLElement | null>(null)
  function open(id: string) {
    if (!southIslandResources.some(item => item.id === id && item.playback)) return
    opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    setResourceId(id)
    setExpanded(false)
  }
  function close() {
    setResourceId(null)
    if (opener.current?.isConnected) opener.current.focus({ preventScroll: true })
  }
  const resource = southIslandResources.find(item => item.id === resourceId)
  return <MediaContext.Provider value={{ resourceId, open }}>
    {children}
    {resource && <MediaDock key={resource.id} resource={resource} expanded={expanded} setExpanded={setExpanded} close={close} />}
    {/* Space below the document keeps the dock from hiding the final links. */}
    {resource && <div aria-hidden="true" style={{ height: resource.playback?.type === "youtube" ? 360 : 160 }} />}
  </MediaContext.Provider>
}

function time(seconds: number) {
  const value = Math.max(0, Math.floor(Number.isFinite(seconds) ? seconds : 0))
  return `${Math.floor(value / 60)}:${String(value % 60).padStart(2, "0")}`
}

function MediaDock({ resource, expanded, setExpanded, close }: {
  resource: Resource; expanded: boolean; setExpanded: (value: boolean) => void; close: () => void
}) {
  const audio = useRef<HTMLAudioElement>(null)
  const frame = useRef<HTMLDivElement>(null)
  const video = useRef<VideoPlayer | null>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState("")
  const [position, setPosition] = useState(0)
  const [duration, setDuration] = useState(0)
  const playback = resource.playback!

  useEffect(() => {
    let active = true
    const element = audio.current
    const container = frame.current
    const stopOthers = () => document.querySelectorAll<HTMLMediaElement>("audio,video").forEach(item => { if (item !== element) item.pause() })
    const anotherPlaying = (event: Event) => {
      if (event.target !== element) { element?.pause(); video.current?.pauseVideo() }
    }
    stopOthers()
    document.addEventListener("play", anotherPlaying, true)
    if (playback.type === "audio" && element) {
      // This effect only mounts following an explicit Play action. Safari may
      // still require a second tap; the dock always retains a Play control.
      element.src = playback.src
      element.play().catch(() => { if (active) setError("Tap play to start the podcast.") })
    } else if (container) {
      // The API owns this iframe inside a React-owned empty wrapper. It can
      // destroy its listeners and timers without removing React-owned nodes.
      const iframe = document.createElement("iframe")
      const url = new URL(playback.src)
      url.searchParams.set("enablejsapi", "1")
      url.searchParams.set("origin", window.location.origin)
      iframe.src = url.href
      iframe.title = `${resource.title} — DOC video player`
      iframe.allow = "encrypted-media; picture-in-picture; fullscreen"
      iframe.allowFullscreen = true
      iframe.referrerPolicy = "strict-origin-when-cross-origin"
      container.appendChild(iframe)
      loadVideoAPI().then(api => {
        if (!active || !iframe.isConnected) return
        video.current = new api.Player(iframe, { events: {
          onReady: () => { if (active) setReady(true) },
          onStateChange: event => { if (active) { setPlaying(event.data === 1); setMuted(video.current?.isMuted() ?? false); if (event.data === 1) stopOthers() } },
          onError: () => { if (active) setError("This video could not play. Open the original source below.") },
        } })
      }).catch(() => { if (active) setError("Use the video's own controls, or open its original source.") })
    }
    return () => {
      active = false
      document.removeEventListener("play", anotherPlaying, true)
      element?.pause(); element?.removeAttribute("src"); element?.load()
      video.current?.destroy(); video.current = null
      container?.replaceChildren()
    }
  }, [playback])

  function toggle() {
    setError("")
    if (audio.current) {
      if (audio.current.paused) {
        document.querySelectorAll<HTMLMediaElement>("audio,video").forEach(item => { if (item !== audio.current) item.pause() })
        audio.current.play().catch(() => setError("Unable to play. Try the original source below."))
      }
      else audio.current.pause()
    } else if (playing) video.current?.pauseVideo()
    else video.current?.playVideo()
  }
  function toggleMute() {
    if (audio.current) audio.current.muted = !muted
    else if (muted) video.current?.unMute()
    else video.current?.mute()
    setMuted(!muted)
  }
  return <aside onKeyDown={event => { if (event.key === "Escape") { event.stopPropagation(); if (expanded) setExpanded(false); else close() } }} aria-label="AVES travel media player" className={`${styles.dock} ${expanded ? styles.expanded : ""}`}>
    <div className={styles.heading}>
      <Image src="/images/brand/aves-new-zealand-bird.png" alt="" width={36} height={36} />
      <div className={styles.title}><span>South Island · {resource.kind}</span><strong title={resource.title}>{resource.title}</strong></div>
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
    {expanded && <div className={styles.details}><p>{resource.description}</p><a href={resource.href} target="_blank" rel="noreferrer">{resource.action} ↗</a><p>Continues during New Zealand page navigation. Refreshing, closing this tab or opening shared accounts/Australia ends playback.</p></div>}
  </aside>
}
