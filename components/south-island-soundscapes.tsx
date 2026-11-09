"use client"

import { useContext, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Pause, Play, Volume2, VolumeX, X } from "lucide-react"
import { SouthIslandHabitatContext } from "./south-island-habitat-context"
import { southIslandSoundscape, soundscapeCreator, soundscapeLicence } from "@/content/south-island-soundscapes"
import { AmbienceController } from "@/lib/ambience-controller"
import { readForegroundMedia, subscribeForegroundMedia } from "@/lib/media-focus"
import player from "./aves-media-provider.module.css"
import styles from "./south-island-soundscapes.module.css"

export default function SouthIslandSoundscapes() {
  const habitat = useContext(SouthIslandHabitatContext)?.value ?? "all"
  const track = southIslandSoundscape(habitat)
  const host = useRef<HTMLDivElement>(null)
  const engine = useRef<AmbienceController | null>(null)
  const intent = useRef({ enabled: false, paused: false })
  const [enabled, setEnabled] = useState(false)
  const [paused, setPaused] = useState(false)
  const [volume, setVolume] = useState(25)
  const [muted, setMuted] = useState(false)
  const [foreground, setForeground] = useState(false)
  const [status, setStatus] = useState<"loading" | "playing" | "unavailable" | "error">("unavailable")
  const [note, setNote] = useState("")

  function pause(message: string) {
    intent.current.paused = true
    engine.current?.stop()
    setPaused(true)
    setNote(message)
  }

  function start() {
    if (!track || document.visibilityState === "hidden") return
    const focus = readForegroundMedia()
    if (focus.uncertain) { setNote("Close the video with unavailable controls before starting soundscapes."); return }
    try {
      if (!engine.current) {
        const Context = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
        if (!Context) throw new Error("Audio mixing unavailable")
        engine.current = new AmbienceController(new Context(), () => {
          const audio = document.createElement("audio")
          audio.dataset.avesAmbience = "true"
          host.current!.appendChild(audio)
          return audio
        }, result => {
          setStatus(result)
          if (result === "error") pause("Playback was blocked or the recording could not load. Choose Resume to try again.")
        })
      }
      intent.current = { enabled: true, paused: false }
      setEnabled(true); setPaused(false); setNote("")
      engine.current.level(volume / 100, muted, focus.busy)
      engine.current.select(track)
    } catch {
      engine.current?.dispose(); engine.current = null
      setStatus("error")
      setNote("Soundscapes could not start in this browser. The original recording remains available in credits.")
    }
  }

  function off() {
    intent.current = { enabled: false, paused: false }
    engine.current?.dispose(); engine.current = null
    setEnabled(false); setPaused(false); setNote("")
  }

  useEffect(() => {
    const unsubscribe = subscribeForegroundMedia(() => {
      const focus = readForegroundMedia()
      setForeground(previous => previous === focus.busy ? previous : focus.busy)
      if (focus.uncertain && intent.current.enabled && !intent.current.paused) pause("Video playback cannot be tracked. Close that video, then explicitly resume soundscapes.")
    })
    const hidden = () => {
      if (document.visibilityState === "hidden" && intent.current.enabled) pause("Paused while this page was hidden. Resume when you are ready.")
    }
    document.addEventListener("visibilitychange", hidden)
    return () => { unsubscribe(); document.removeEventListener("visibilitychange", hidden); engine.current?.dispose(); engine.current = null }
  }, [])

  useEffect(() => { engine.current?.level(volume / 100, muted, foreground) }, [volume, muted, foreground])
  useEffect(() => {
    if (intent.current.enabled && !intent.current.paused) engine.current?.select(track)
  }, [track])

  const state = !enabled ? "Off" : paused ? "Paused" : !track ? "Unavailable" : status === "loading" ? "Loading" : foreground ? "Quiet beneath foreground audio" : status === "playing" ? "Playing" : "Unavailable"
  return <section className={styles.panel} aria-label="South Island soundscapes" data-soundscape-state={state}>
    <div className={styles.row}>
      <Image src="/images/brand/aves-new-zealand-bird.png" alt="Kea · New Zealand soundscapes" width={36} height={36} />
      <div className={styles.title}><span>South Island soundscapes · {state}</span><strong>{track?.title ?? "No verified mountain recording yet"}</strong></div>
      <button type="button" className={player.feather} onClick={enabled && !paused ? () => pause("Paused by you.") : start} disabled={!track && !enabled} aria-label={enabled && !paused ? "Pause soundscape" : paused ? "Resume soundscape" : "Play soundscape"} aria-pressed={enabled && !paused}>{enabled && !paused ? <Pause size={18} /> : <Play size={18} />}</button>
      <button type="button" className={player.feather} onClick={() => setMuted(!muted)} aria-label={muted ? "Unmute soundscape" : "Mute soundscape"} aria-pressed={muted}>{muted ? <VolumeX size={18} /> : <Volume2 size={18} />}</button>
      {enabled && <button type="button" className={player.feather} onClick={off} aria-label="Turn soundscapes off"><X size={18} /></button>}
    </div>
    <label className={styles.volume}>Volume<input type="range" aria-label="Soundscape volume" min={0} max={100} step={1} value={volume} onChange={event => setVolume(Number(event.target.value))} /><span>{volume}%</span></label>
    <p className={styles.note}>{track ? `${habitat === "all" ? "Forest sampler · " : ""}${track.location}. Representative habitat ambience, not live sound or the selected map place.` : "Mountain ambience is unavailable. Other habitats keep their own recordings."} No sound loads until you choose Play.</p>
    {note && <p className={styles.note} role="status">{note}</p>}
    {track && <details className={styles.credits}><summary>Recording & credits</summary><p><a href={track.source} target="_blank" rel="noreferrer">{track.sourceTitle}</a> by {soundscapeCreator} · <a href={soundscapeLicence} target="_blank" rel="noreferrer">CC0 1.0</a>. Repeated 60-second excerpt, trimmed, level-adjusted and faded by AVES. <a href={`/credits#soundscape-${track.id}`}>Full credits</a>.</p><p>A river recording represents part of the freshwater group; shore waves do not represent offshore or underwater sound. Learn sounds here; never use playback to attract wildlife in the field.</p></details>}
    <div ref={host} hidden aria-hidden="true" />
  </section>
}
