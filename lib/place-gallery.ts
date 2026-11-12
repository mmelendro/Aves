import { southIslandPlaceContexts, type PlacePhoto } from "@/content/south-island-place-media";
import additions from "@/content/place-gallery-additions.json";

export type GalleryPhoto = PlacePhoto & {
  id: string;
  countryId: string;
  regionId: string;
  placeId: string;
  placeName: string;
};

/** Country and regional views reference the same credited photo objects. */
export const placeGalleryPhotos: readonly GalleryPhoto[] = [
  ...southIslandPlaceContexts.flatMap(place => place.photos.map(photo => ({
    ...photo, id: photo.src, countryId: "new-zealand", regionId: "south-island",
    placeId: place.id, placeName: place.label,
  }))),
  ...additions.photos.filter(photo => photo.regionId !== "south-island").map(photo => ({ ...photo, id: photo.src })),
];

/** Round-robin places before regions so a larger library cannot crowd out a
 * smaller one. Country previews show at most two images per planning region;
 * a selected region exposes its full reviewed collection. Unknown scopes close. */
export function galleryPhotos(countryId: string, regionId = ""): GalleryPhoto[] {
  const photos = placeGalleryPhotos.filter(photo => photo.countryId === countryId && (!regionId || photo.regionId === regionId));
  const groups = new Map<string, GalleryPhoto[]>();
  for (const photo of photos) {
    const key = regionId ? photo.placeId : photo.regionId;
    groups.set(key, [...(groups.get(key) ?? []), photo]);
  }
  if (!regionId) for (const [region, group] of groups) {
    const places = [...new Set(group.map(photo => photo.placeId))];
    const ordered = places.flatMap(place => group.find(photo => photo.placeId === place)!);
    groups.set(region, [...ordered, ...group.filter(photo => !ordered.includes(photo))].slice(0, 2));
  }
  const ordered: GalleryPhoto[] = [];
  const length = Math.max(0, ...[...groups.values()].map(group => group.length));
  for (let index = 0; index < length; index++) for (const group of groups.values()) if (group[index]) ordered.push(group[index]);
  return ordered;
}
