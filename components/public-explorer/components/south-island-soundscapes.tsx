"use client"

import { useContext } from "react"
import { AudioLines, Pause } from "lucide-react"
import { SouthIslandHabitatContext } from "./south-island-habitat-context"
import { useAvesMedia } from "./aves-media-provider"
import { southIslandSoundscape, soundscapeCreator } from "@/components/public-explorer/content/south-island-soundscapes"
import { sitePath } from "@/components/public-explorer/lib/site-path"

/** The map offers region listening; the shared dock owns all playback controls. */
export default function SouthIslandSoundscapes() {
  const habitat = useContext(SouthIslandHabitatContext)?.value ?? "all"
  const track = southIslandSoundscape(habitat)
  const media = useAvesMedia()
  const id = track ? `soundscape:south-island:${track.id}` : ""
  const playing = Boolean(media?.resourceId === id && media.playing)
  const label = !track ? "Regional recording not yet available" : playing ? "Pause region soundscape" : "Listen to this region"
  return <button type="button" aria-label={label} title={track ? `${label} · ${track.location}` : "No verified mountain recording yet"} aria-pressed={playing} disabled={!track || !media}
    data-region-listen="south-island" className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-emerald-200 bg-emerald-950 text-emerald-50 shadow-sm hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 disabled:opacity-40"
    onClick={() => {
      if (!track || !media) return
      if (playing) { media.pause(); return }
      media.play({ id, country: "new-zealand", regionId: "south-island", kind: "Soundscape", title: track.title,
        playback: { type: "audio", src: sitePath(track.src) }, href: sitePath(`/credits#soundscape-${track.id}`), action: "Recording source & credits",
        description: `${track.location}. Representative Canterbury habitat ambience, not live sound or the selected map place. ${track.sourceTitle}, by ${soundscapeCreator}. CC0 1.0. Repeated 60-second excerpt, trimmed, level-adjusted and faded by AVES. A stream or shore recording does not represent offshore or underwater sound. Learn sounds here; do not use playback to attract wildlife.` })
    }}>{playing ? <Pause size={18} aria-hidden="true" /> : <AudioLines size={18} aria-hidden="true" />}</button>
}
