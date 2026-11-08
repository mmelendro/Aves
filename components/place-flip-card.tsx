"use client"

/** A small place-media adapter, separate from species/audio state. The outer
 * toggle stays mounted so keyboard focus never lands on the hidden card face.
 * Both faces share one frame; inert removes the reverse from tab navigation.
 */
import { useId, useState, type ReactNode } from "react"
import Image from "next/image"
import { Camera, ChevronLeft, ChevronRight, Map } from "lucide-react"
import styles from "./place-flip-card.module.css"

export type PlacePhoto = {
  src: string; alt: string; caption: string; creator: string
  sourceUrl: string; licence: string; licenceUrl: string; modifications: string
}

type Props = { name: string; photos: readonly PlacePhoto[]; map: ReactNode; children: ReactNode }

export default function PlaceFlipCard({ name, photos, map, children }: Props) {
  const id = useId()
  const [showMap, setShowMap] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)
  const photo = photos[photoIndex]
  if (!photo) return <article className={styles.card}>{children}{map}</article>

  return <article className={styles.card} aria-label={`${name} place card`}>
    <div className={styles.toolbar}>
      <span className="text-sm font-medium text-emerald-950">Explore {name}</span>
      <button type="button" aria-controls={`${id}-faces`} aria-label={`Show ${showMap ? "photos" : "local map"} of ${name}`} onClick={() => setShowMap(value => !value)} className={styles.flipButton}>
        {showMap ? <Camera size={16} aria-hidden="true" /> : <Map size={16} aria-hidden="true" />}
        {showMap ? "Photos" : "Local map"}
      </button>
    </div>
    <div className={styles.scene}>
      <div id={`${id}-faces`} className={styles.faces} data-map-visible={showMap}>
        <div className={`${styles.face} ${styles.photos}`} aria-hidden={showMap} inert={showMap}>
          <figure className={styles.figure} aria-roledescription="carousel" aria-label={`${name} landscape photographs`}>
            <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1279px) 46vw, 588px" className={styles.image} loading="lazy" />
            <span className={styles.counter} aria-label={`Photograph ${photoIndex + 1} of ${photos.length}`}>{photoIndex + 1} / {photos.length}</span>
            {photos.length > 1 && <div className={styles.arrows}>
              <button type="button" className={styles.imageButton} aria-label={`Previous ${name} photograph`} onClick={() => setPhotoIndex(value => (value + photos.length - 1) % photos.length)}><ChevronLeft aria-hidden="true" size={20} /></button>
              <button type="button" className={styles.imageButton} aria-label={`Next ${name} photograph`} onClick={() => setPhotoIndex(value => (value + 1) % photos.length)}><ChevronRight aria-hidden="true" size={20} /></button>
            </div>}
            <figcaption className={styles.caption} aria-live="polite" aria-atomic="true">
              <p className="text-sm font-medium">{photo.caption}</p>
              <p className="mt-1 text-xs leading-5">{photo.creator} · <a href={photo.sourceUrl} target="_blank" rel="noreferrer">Original</a> · <a href={photo.licenceUrl} target="_blank" rel="noreferrer">{photo.licence}</a><span className="block">{photo.modifications}</span></p>
            </figcaption>
          </figure>
        </div>
        <div className={`${styles.face} ${styles.map}`} aria-hidden={!showMap} inert={!showMap}>{map}</div>
      </div>
    </div>
    <p className="sr-only" role="status">{showMap ? `Local map of ${name}` : `Landscape photographs of ${name}`}</p>
    <div className={styles.copy}>{children}</div>
    <noscript><p className="px-6 pb-5 text-sm">Interactive map and additional photographs require JavaScript. The place guidance and photograph credits remain available.</p></noscript>
  </article>
}
