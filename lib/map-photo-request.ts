import type { GalleryPhoto } from "@/lib/place-gallery"
import { isEnabledTripCountry } from "@/content/trip-options"
export type MapPhotoRequest = { countryId:string; kind:"country"|"region"|"place"; name:string; regionId?:string; placeId?:string }
export const MAP_PHOTO_EVENT="aves:map-location-photos"
export const CLEAR_MAP_PHOTOS_EVENT="aves:clear-map-location-photos"
let owner:HTMLElement|null=null
/** Public, transient display intent only. No location is persisted or submitted. */
export function noteMapPhotoOwner(element:HTMLElement|null){owner=element}
export function requestMapPhotos(request:MapPhotoRequest){
 if(typeof window==="undefined"||!owner?.isConnected||!isEnabledTripCountry(request.countryId))return
 window.dispatchEvent(new CustomEvent(MAP_PHOTO_EVENT,{detail:{owner,request}}))
}
export function clearMapPhotos(){if(typeof window!=="undefined")window.dispatchEvent(new Event(CLEAR_MAP_PHOTOS_EVENT))}
/** Exact reviewed joins only; never substitute nearby scenery for an unmatched place. */
export function matchingMapPhotos(photos:readonly GalleryPhoto[],request:MapPhotoRequest){
 const place=request.countryId==="new-zealand"&&request.placeId==="lake-rotoiti" ? "forest-and-lakes" : request.placeId
 return photos.filter(photo=>photo.countryId===request.countryId&&(request.kind==="place" ? photo.placeId===place : request.kind==="region" ? photo.regionId===request.regionId : true))
}
