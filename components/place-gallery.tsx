"use client";

import { useEffect, useId, type KeyboardEvent } from "react";
import RecoverablePhoto from "./recoverable-photo";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type {GalleryPhoto} from "@/lib/place-gallery";
import {orderGalleryPhotos} from "@/lib/gallery-order";
import type { DestinationRegion } from "@/content/destination-regions";
import { CarouselButton, CarouselCount } from "./carousel-controls";
import NzPlaceIdeas from "./nz-place-ideas";
import PhotoCredit from "./photo-credit";
import PhotoZoom from "./photo-zoom";
import CulturalNameContext from "./cultural-name-context";
import ExpandableMedia from "./expandable-media";
import ConservationDirectory from "./conservation-directory";
import styles from "./south-island-places-explorer.module.css";

/** A shared photo surface. Selecting a photograph previews its planning region
 * on the existing map; it does not navigate, zoom or change the bird collection. */
export default function PlaceGallery({countryId, countryName, regionId, regions, selectedPhotoId, selectedPlaceId, photos:collection, onPhotoPreview, onPhotoChange, onRegionChange, mapHref}: {
  countryId: string; countryName: string; regionId: string;
  regions: readonly DestinationRegion[]; selectedPhotoId?: string; selectedPlaceId?: string; mapHref: string;
  photos:readonly GalleryPhoto[]; onPhotoPreview?:(photo:GalleryPhoto)=>void;
  onPhotoChange: (photo: GalleryPhoto) => void; onRegionChange: (id: string) => void;
}) {
  const id = useId();
  const galleryPhotos=(_country:string,region="")=>orderGalleryPhotos(collection,region);
  const photos = galleryPhotos(countryId, regionId);
  const available = collection;

  const active = Math.max(0, photos.findIndex(photo => selectedPhotoId ? photo.id === selectedPhotoId : photo.placeId === selectedPlaceId));
  const photo = photos[active];
  useEffect(()=>{if(photo)onPhotoPreview?.(photo)},[photo,onPhotoPreview]);
  if (!available.length) return null;
  const region = regions.find(item => item.id === photo?.regionId);
  function move(delta: number) { if (!photos.length) return; onPhotoChange(photos[(active + delta + photos.length) % photos.length]); }
  function keydown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); move(event.key === "ArrowLeft" ? -1 : 1); }
  }
  return <section id="place-gallery" aria-labelledby={`${id}-heading`} className="mt-7 scroll-mt-28">
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div><h2 id={`${id}-heading`} className="text-2xl font-medium text-emerald-950">A window into {countryName}</h2><p className="mt-2 text-sm leading-6 text-gray-600">Explore reviewed landscapes by region. These photographs show places, not current conditions or promised wildlife.</p></div>
      <label className="block w-full min-w-0 max-w-full text-sm text-emerald-950 sm:w-auto">Landscape region<select aria-label="Landscape region" className="mt-1 block min-h-11 w-full min-w-0 max-w-full rounded-xl border border-emerald-200 bg-white px-3" value={regionId} onChange={event => onRegionChange(event.target.value)}><option value="">All regions</option>{regions.map(item => <option key={item.id} value={item.id}>{item.name} ({galleryPhotos(countryId, item.id).length} photos)</option>)}</select></label>
    </div>
    {photo ? <><ExpandableMedia label={`${countryName} landscapes`} kind="place"><section className={styles.card} aria-label={`${countryName} places carousel`}>
      <div data-place-image className={styles.frame} tabIndex={0} onKeyDown={keydown}>
        <PhotoZoom key={photo.src} label={photo.placeName}><RecoverablePhoto src={photo.src} alt={photo.alt} fill sizes="(max-width: 623px) 100vw, 70vw" className={styles.image}/></PhotoZoom>
        <div className={styles.top}><span className={styles.counter}><CarouselCount index={active + 1} total={photos.length}/></span></div>
        <div className={styles.arrows}><CarouselButton tone="overlay" aria-label="Previous landscape" title="Previous landscape" disabled={photos.length < 2} onClick={() => move(-1)}><ChevronLeft aria-hidden="true"/></CarouselButton><CarouselButton tone="overlay" aria-label="Next landscape" title="Next landscape" disabled={photos.length < 2} onClick={() => move(1)}><ChevronRight aria-hidden="true"/></CarouselButton></div>
        <div className={styles.caption} aria-live="polite"><p className="text-xs">{region?.name ?? photo.regionId}</p><h3 className="text-xl font-medium">{photo.placeName}</h3><p className="mt-1 text-xs">{photo.caption}</p><PhotoCredit key={photo.src} creator={photo.creator} sourceUrl={photo.sourceUrl} licence={photo.licence} licenceUrl={photo.licenceUrl} modifications={photo.modifications} capturedOn={photo.capturedOn} dateBasis={photo.dateBasis}/></div>
      </div>
    </section></ExpandableMedia>
    <CulturalNameContext key={photo.id} kind="place" entityId={photo.placeId} countryId={countryId}/>
    {countryId==="new-zealand"&&<NzPlaceIdeas placeId={`landscape:${photo.id}`} regionId={photo.regionId}/>}
    <p className="mt-3 text-xs leading-6 text-gray-600">{regionId ? `${photos.length} reviewed ${photos.length === 1 ? "photograph" : "photographs"} in this regional collection.` : "A balanced preview from the regions with reviewed photographs. Regions with no reviewed photos are still being researched."} Map preview: {region?.name}. <a href={mapHref} className="ml-2 inline-flex min-h-11 items-center font-semibold text-emerald-800 underline">Show on the map above</a> <button type="button" className="ml-2 min-h-11 font-semibold text-emerald-800 underline" onClick={() => onRegionChange("")}>All regions</button>{region && !regionId && <button type="button" className="ml-4 min-h-11 font-semibold text-emerald-800 underline" onClick={() => onRegionChange(photo.regionId)}>Explore {region.name}</button>}</p></> : <div className="rounded-2xl border border-emerald-100 bg-white p-5"><p className="text-sm text-gray-600">Reviewed landscape photographs for this region are still being added.</p><button type="button" onClick={() => onRegionChange("")} className="mt-3 min-h-11 text-sm font-semibold text-emerald-800 underline">Return to available landscapes</button><a href={mapHref} className="ml-4 inline-flex min-h-11 items-center text-sm text-emerald-800 underline">Return to the map</a></div>}
    <ConservationDirectory countryId={countryId} regions={regions} mapHref={mapHref} onRegionChange={onRegionChange}/>
  </section>;
}
