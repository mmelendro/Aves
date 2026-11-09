"use client"

import { useContext, useId, useState } from "react"
import Image from "next/image"
import { BookOpen, ChevronLeft, ChevronRight, Feather, MapPin, Play } from "lucide-react"
import { southIslandResources } from "@/content/south-island"
import { SouthIslandHabitatContext } from "./south-island-habitat-context"
import { useAvesMedia } from "./aves-media-provider"
import styles from "./south-island-resource-carousel.module.css"

/** Browsing changes the preview only. The shared layout keeps the chosen
 * recording alive until another one is played or the visitor closes it. */
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
  const media = useAvesMedia()
  const playback = resource.playback
  return <div className={styles.player}>
    <div className={styles.illustration}><Image src="/images/brand/aves-new-zealand-bird.png" alt="AVES kea, the South Island player’s regional bird" width={88} height={88} className="mx-auto h-[88px] w-[88px] object-contain" /><svg aria-hidden="true" viewBox="0 0 420 60" className={styles.contour}><path d="M0 52 65 35 94 49 145 9 192 44 229 24 267 50 Q300 33 335 48 T420 45" /></svg></div>
    {!playback ? <BookOpen className="mx-auto text-emerald-700" size={24} aria-hidden="true" /> : <button type="button" className={`${styles.feather} ${styles.play}`} aria-label={playback.type === "audio" ? "Play podcast" : "Load DOC video"}
      title={playback.type === "audio" ? "Play podcast" : "Load DOC video"} onClick={() => media?.open(resource.id)}><Play size={24} aria-hidden="true" /></button>}
    <p className="mt-4 px-5 text-center text-xs leading-5 text-emerald-800">{playback ? media?.resourceId === resource.id ? "Open in your travel player" : "Listen or watch as you explore" : "Read at the original source"}</p>
    {playback?.type === "youtube" && <p className="mx-auto mt-2 max-w-sm px-5 text-center text-xs leading-5 text-gray-500">Loading connects to YouTube. Its captions and full-screen controls stay available.</p>}
    <p className="mt-auto flex items-center justify-center gap-2 px-4 pb-5 pt-4 text-xs text-emerald-700"><Feather size={14} aria-hidden="true" />Curated by AVES · published by {resource.kind === "Reading" && resource.id === "kea-reading" ? "NZ Birds Online" : "DOC"}</p>
  </div>
}
