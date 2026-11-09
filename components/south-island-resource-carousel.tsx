"use client"

import { useContext, useEffect, useId, useRef, useState } from "react"
import Image from "next/image"
import { BookOpen, ChevronLeft, ChevronRight, Feather, Loader2, MapPin, Pause, Play, RotateCcw, Volume2, VolumeX, X } from "lucide-react"
import { southIslandResources } from "@/content/south-island"
import { SouthIslandHabitatContext } from "./south-island-habitat-context"
import styles from "./south-island-resource-carousel.module.css"

function timestamp(seconds: number) {
  const whole = Math.max(0, Math.floor(Number.isFinite(seconds) ? seconds : 0))
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, "0")}`
}

/** One visible resource/player at a time: no hidden episodes keep playing.
 * The feed enclosures and video IDs are curated in content, never user input.
 * Switching the keyed player also cleans up a pending play() and its media.
 */
export default function SouthIslandResourceCarousel() {
  const discovery = useContext(SouthIslandHabitatContext)
  const [index, setIndex] = useState(0)
  const id = useId()
  const resource = southIslandResources[index]
  const mapPlace = resource.mapPlace
  const select = (next: number) => setIndex((next + southIslandResources.length) % southIslandResources.length)
  return <section aria-label="South Island resources" aria-roledescription="carousel" className={styles.carousel}>
    <div className={styles.toolbar}>
      <label htmlFor={id} className="sr-only">Choose a South Island resource</label>
      <select id={id} value={index} onChange={event => select(Number(event.target.value))} className={styles.select}>
        {southIslandResources.map((item, i) => <option key={item.id} value={i}>{item.kind} · {item.title}</option>)}
      </select>
      <div className="flex shrink-0 items-center gap-2">
        <span className="text-xs tabular-nums text-emerald-800">{index + 1} / {southIslandResources.length}</span>
        <button type="button" className={styles.feather} aria-label="Previous resource" title="Previous resource" onClick={() => select(index - 1)}><ChevronLeft size={19} aria-hidden="true" /></button>
        <button type="button" className={styles.feather} aria-label="Next resource" title="Next resource" onClick={() => select(index + 1)}><ChevronRight size={19} aria-hidden="true" /></button>
      </div>
    </div>
    <article className={styles.card} aria-roledescription="slide" aria-label={`${index + 1} of ${southIslandResources.length}: ${resource.title}`}>
      <ResourcePlayer key={resource.id} resource={resource} />
      <div className={styles.copy}>
        <p className="text-xs font-medium uppercase tracking-widest text-emerald-700">{resource.kind} · South Island field notes</p>
        <h3 className="mt-3 text-2xl font-medium tracking-tight text-emerald-950">{resource.title}</h3>
        <p className="mt-2 text-xs leading-5 text-gray-500">{resource.publisher}</p>
        <p className="mt-4 text-sm font-medium text-emerald-800">{resource.context}</p>
        {mapPlace && discovery && <a href="#south-island-bird-map" className={styles.mapLink}
          onClick={() => discovery.selectPlace(mapPlace.id)}><MapPin size={16} aria-hidden="true" />Show {mapPlace.name} on the map</a>}
        <p className="mt-3 text-sm leading-6 text-gray-600">{resource.description}</p>
        <a className={styles.link} href={resource.href} target="_blank" rel="noreferrer">{resource.action}<span className="sr-only"> (opens in a new tab)</span></a>
      </div>
    </article>
    <p className="sr-only" role="status">{resource.kind}: {resource.title}, resource {index + 1} of {southIslandResources.length}</p>
  </section>
}

function ResourcePlayer({ resource }: { resource: typeof southIslandResources[number] }) {
  const audio = useRef<HTMLAudioElement>(null)
  const active = useRef(true)
  const playAttempt = useRef(0)
  const videoButton = useRef<HTMLButtonElement>(null)
  const restoreVideoFocus = useRef(false)
  const [playing, setPlaying] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [position, setPosition] = useState(0)
  const [duration, setDuration] = useState(0)
  const [muted, setMuted] = useState(false)
  const [video, setVideo] = useState(false)
  const playback = resource.playback

  useEffect(() => {
    if (!video && restoreVideoFocus.current) {
      restoreVideoFocus.current = false
      videoButton.current?.focus({ preventScroll: true })
    }
  }, [video])

  useEffect(() => {
    active.current = true
    const element = audio.current
    // Native play events do not bubble, so capture them. A bird call stops this
    // podcast and unloads any video; loading a video first stops native audio.
    const anotherPlaying = (event: Event) => {
      if (event.target !== element) { element?.pause(); setVideo(false) }
    }
    document.addEventListener("play", anotherPlaying, true)
    return () => {
      active.current = false
      playAttempt.current++
      document.removeEventListener("play", anotherPlaying, true)
      element?.pause()
      element?.removeAttribute("src")
      element?.load()
    }
  }, [])

  function stopOtherAudio() {
    document.querySelectorAll<HTMLMediaElement>("audio,video").forEach(item => { if (item !== audio.current) item.pause() })
  }
  async function toggle() {
    const element = audio.current
    if (!element || playback?.type !== "audio") return
    const attempt = ++playAttempt.current
    if (!element.paused) { element.pause(); setLoading(false); return }
    setError(false); setLoading(true); stopOtherAudio()
    // No src, metadata or third-party request exists until this explicit click.
    if (!element.getAttribute("src")) element.src = playback.src
    try {
      await element.play()
      if (!active.current) element.pause()
    } catch { if (active.current && attempt === playAttempt.current) { setError(true); setLoading(false) } }
  }

  return <div className={styles.player}>
    {video && playback?.type === "youtube" ? <>
      <iframe title={`${resource.title} — DOC video player`} src={playback.src} className={styles.video}
        allow="encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
      <button type="button" className={styles.unload} onClick={() => { restoreVideoFocus.current = true; setVideo(false) }}><X size={17} aria-hidden="true" />Close video</button>
    </> : <>
      <div className={styles.illustration}><Image src="/images/brand/aves-new-zealand-bird.png" alt="AVES kea, the South Island player’s regional bird" width={88} height={88} className="mx-auto h-[88px] w-[88px] object-contain" /><svg aria-hidden="true" viewBox="0 0 420 60" className={styles.contour}><path d="M0 52 65 35 94 49 145 9 192 44 229 24 267 50 Q300 33 335 48 T420 45" /></svg></div>
      {!playback ? <BookOpen className="mx-auto text-emerald-700" size={24} aria-hidden="true" /> : <button ref={videoButton} type="button" className={`${styles.feather} ${styles.play}`} aria-label={playback.type === "audio" ? loading ? "Cancel podcast loading" : playing ? "Pause podcast" : error ? "Retry podcast" : "Play podcast" : "Load DOC video"}
        title={playback.type === "audio" ? playing ? "Pause podcast" : "Play podcast" : "Load DOC video"}
        aria-pressed={playback.type === "audio" ? playing : undefined} onClick={playback.type === "audio" ? toggle : () => { stopOtherAudio(); setVideo(true) }}>
        {loading ? <Loader2 className="animate-spin motion-reduce:animate-none" size={24} aria-hidden="true" /> : playing ? <Pause size={24} aria-hidden="true" /> : <Play size={24} aria-hidden="true" />}
      </button>}
      <p className="mt-4 px-5 text-center text-xs leading-5 text-emerald-800">{playback?.type === "audio" ? "Listen to DOC · Sounds of Science" : playback ? "Load YouTube player · then press play" : "Read at the original source"}</p>
      {playback?.type === "youtube" && <p className="mx-auto mt-2 max-w-sm px-5 text-center text-xs leading-5 text-gray-500">Loading connects to YouTube. Its playback, captions and full-screen controls stay available.</p>}
    </>}
    {playback?.type === "audio" && <div className={styles.audioControls}>
      <audio ref={audio} preload="none" aria-label={`${resource.title} podcast`} data-aves-resource-audio
        onPlaying={() => { setPlaying(true); setLoading(false) }} onPause={() => { setPlaying(false); setLoading(false) }} onEnded={() => setPlaying(false)}
        onWaiting={() => { if (!audio.current?.paused) setLoading(true) }}
        onTimeUpdate={event => setPosition(event.currentTarget.currentTime)}
        onDurationChange={event => setDuration(Number.isFinite(event.currentTarget.duration) ? event.currentTarget.duration : 0)}
        onError={() => { setError(true); setLoading(false); setPlaying(false) }} />
      <label className="sr-only" htmlFor={`seek-${resource.id}`}>Podcast position</label>
      <input id={`seek-${resource.id}`} aria-valuetext={`${timestamp(position)} of ${timestamp(duration)}`} type="range" min={0} max={duration || 1} step={1} value={position} disabled={!duration}
        onChange={event => { if (audio.current) audio.current.currentTime = Number(event.target.value); setPosition(Number(event.target.value)) }} className={styles.range} />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs tabular-nums text-emerald-900">{timestamp(position)} / {timestamp(duration)}</span>
        <div className="flex items-center gap-2">
          <button type="button" className={styles.feather} title="Back 15 seconds" aria-label="Back 15 seconds" disabled={!duration} onClick={() => { if (audio.current) audio.current.currentTime = Math.max(0, audio.current.currentTime - 15) }}><RotateCcw size={18} aria-hidden="true" /></button>
          <button type="button" className={styles.feather} title={muted ? "Unmute podcast" : "Mute podcast"} aria-label={muted ? "Unmute podcast" : "Mute podcast"} aria-pressed={muted} onClick={() => { if (audio.current) audio.current.muted = !muted; setMuted(!muted) }}>{muted ? <VolumeX size={18} aria-hidden="true" /> : <Volume2 size={18} aria-hidden="true" />}</button>
        </div>
      </div>
      <p role="status" className="mt-2 text-xs leading-5 text-emerald-900">{error ? "The recording could not play. Retry or open the episode on DOC below." : loading ? "Loading podcast…" : "Streams from DOC’s podcast host when you press play."}</p>
    </div>}
    <p className="mt-auto flex items-center justify-center gap-2 px-4 pb-5 pt-4 text-xs text-emerald-700"><Feather size={14} aria-hidden="true" />Curated by AVES · published by {resource.kind === "Reading" && resource.id === "kea-reading" ? "NZ Birds Online" : "DOC"}</p>
  </div>
}
