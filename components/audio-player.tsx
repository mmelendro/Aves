"use client"

import { Play, Pause } from "lucide-react"
import { useAvesMedia } from "./aves-media-provider"

type Props = { src: string; title: string; species: string; className?: string }

export default function AudioPlayer({ src, title, species, className }: Props) {
  const media = useAvesMedia()
  const id = `article:${species}`
  const playing = media?.resourceId === id && media.playing
  return <div className={className}>
    <button type="button" disabled={!media} aria-pressed={playing} aria-label={playing ? "Pause bird call" : "Listen to this bird"}
      className="inline-flex min-h-11 items-center gap-3 rounded-full bg-emerald-800 px-5 py-3 font-semibold text-white hover:bg-emerald-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
      onClick={() => { if (playing) media?.pause(); else media?.play({id,country:"colombia",regionId:"pacific",title,kind:"Bird call",playback:{type:"audio",src},description:species,href:src,action:"Original recording"}) }}>
      {playing ? <Pause size={18} aria-hidden="true" /> : <Play size={18} aria-hidden="true" />}<span>{playing ? "Pause" : "Listen to this bird"}</span>
    </button><p className="mt-2 text-sm text-emerald-900">{title} · {species}</p>
  </div>
}
