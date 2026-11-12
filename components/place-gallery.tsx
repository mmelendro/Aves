"use client";

import { useId, type KeyboardEvent } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { galleryPhotos, type GalleryPhoto } from "@/lib/place-gallery";
import type { DestinationRegion } from "@/content/destination-regions";
import { CarouselButton, CarouselCount } from "./carousel-controls";
import PhotoCredit from "./photo-credit";
import PhotoZoom from "./photo-zoom";
import ExpandableMedia from "./expandable-media";
import styles from "./south-island-places-explorer.module.css";

/** A shared photo surface. Selecting a photograph previews its planning region
 * on the existing map; it does not navigate, zoom or change the bird collection. */
export default function PlaceGallery({countryId, countryName, regionId, regions, selectedPhotoId, onPhotoChange, onRegionChange}: {
  countryId: string; countryName: string; regionId: string;
  regions: readonly DestinationRegion[]; selectedPhotoId?: string;
  onPhotoChange: (photo: GalleryPhoto) => void; onRegionChange: (id: string) => void;
}) {
  const id = useId();
  const photos = galleryPhotos(countryId, regionId);
  if (!photos.length) return null;
  const active = Math.max(0, photos.findIndex(photo => photo.id === selectedPhotoId));
  const photo = photos[active];
  const region = regions.find(item => item.id === photo.regionId);
  function move(delta: number) { onPhotoChange(photos[(active + delta + photos.length) % photos.length]); }
  function keydown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); move(event.key === "ArrowLeft" ? -1 : 1); }
  }
  return <section id="place-gallery" aria-labelledby={`${id}-heading`} className="mt-7 scroll-mt-28">
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div><h2 id={`${id}-heading`} className="text-2xl font-medium text-emerald-950">A window into {countryName}</h2><p className="mt-2 text-sm leading-6 text-gray-600">Explore reviewed landscapes by region. These photographs show places, not current conditions or promised wildlife.</p></div>
      <label className="block text-sm text-emerald-950">Landscape region<select className="mt-1 block min-h-11 max-w-full rounded-xl border border-emerald-200 bg-white px-3" value={regionId} onChange={event => onRegionChange(event.target.value)}><option value="">All regions</option>{regions.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
    </div>
    <ExpandableMedia label={`${countryName} landscapes`} kind="place"><section className={styles.card} aria-label={`${countryName} places carousel`}>
      <div data-place-image className={styles.frame} tabIndex={0} onKeyDown={keydown}>
        <PhotoZoom key={photo.src} label={photo.placeName}><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 623px) 100vw, 70vw" className={styles.image}/></PhotoZoom>
        <div className={styles.top}><span className={styles.counter}><CarouselCount index={active + 1} total={photos.length}/></span></div>
        <div className={styles.arrows}><CarouselButton tone="overlay" aria-label="Previous landscape" title="Previous landscape" disabled={photos.length < 2} onClick={() => move(-1)}><ChevronLeft aria-hidden="true"/></CarouselButton><CarouselButton tone="overlay" aria-label="Next landscape" title="Next landscape" disabled={photos.length < 2} onClick={() => move(1)}><ChevronRight aria-hidden="true"/></CarouselButton></div>
        <div className={styles.caption} aria-live="polite"><p className="text-xs">{region?.name ?? photo.regionId}</p><h3 className="text-xl font-medium">{photo.placeName}</h3><p className="mt-1 text-xs">{photo.caption}</p><PhotoCredit key={photo.src} creator={photo.creator} sourceUrl={photo.sourceUrl} licence={photo.licence} licenceUrl={photo.licenceUrl} modifications={photo.modifications}/></div>
      </div>
    </section></ExpandableMedia>
    <p className="mt-3 text-xs leading-6 text-gray-600">{regionId ? `${photos.length} reviewed ${photos.length === 1 ? "photograph" : "photographs"} in this regional collection.` : "A balanced preview from each island’s reviewed collection. More regional photographs are being added."} Map preview: {region?.name}. <button type="button" className="ml-2 min-h-11 font-semibold text-emerald-800 underline" onClick={() => onRegionChange("")}>All regions</button>{region && !regionId && <button type="button" className="ml-4 min-h-11 font-semibold text-emerald-800 underline" onClick={() => onRegionChange(photo.regionId)}>Explore {region.name}</button>}</p>
  </section>;
}
