import galleryAdditions from "./south-island-gallery-additions.json"
export type PlacePhoto = {
  src: string; alt: string; caption: string; creator: string
  sourceUrl: string; licence: string; licenceUrl: string; modifications: string
}

/** Rights/locality reviewed on Commons and the DOC Devils Punchbowl guide,
 * 9 November 2026. These landscapes are not current conditions or sightings.
 * Keep each licence and creator with the photo when reusing this collection.
 */
export const arthursPassPhotos: readonly PlacePhoto[] = [
  {
    src: "/images/places/arthurs-pass-mountains.webp",
    alt: "Beech forest framing the mountain ridges from Devils Punchbowl Walking Track at Arthur’s Pass",
    caption: "Mountain beech forest · Devils Punchbowl Walking Track",
    creator: "Mike Dickison", sourceUrl: "https://commons.wikimedia.org/wiki/File:Mountains_from_Devils_Punchbowl_Walking_Track_MRD.jpg",
    licence: "CC BY 4.0", licenceUrl: "https://creativecommons.org/licenses/by/4.0/",
    modifications: "Resized and converted to WebP; cropped to fit the card.",
  },
  {
    src: "/images/places/arthurs-pass-waterfall.webp",
    alt: "Devils Punchbowl Falls above a forested creek in Arthur’s Pass National Park",
    caption: "Devils Punchbowl Falls · Arthur’s Pass",
    creator: "Alan Liefting", sourceUrl: "https://commons.wikimedia.org/wiki/File:Devils_Punchbowl_Waterfall,_New_Zealand.jpg",
    licence: "Public domain", licenceUrl: "https://commons.wikimedia.org/wiki/File:Devils_Punchbowl_Waterfall,_New_Zealand.jpg#Licensing",
    modifications: "Resized and converted to WebP; cropped to fit the card.",
  },
  ...galleryAdditions.photos.filter(photo => photo.regionId === "south-island" && photo.placeId === "mountains"),
]

/** Licensed, correctly located additions for the four-place discovery pair. */
export const additionalSouthIslandPlacePhotos: readonly PlacePhoto[] = [
  {
    "src": "/images/places/nelson-landscape.webp",
    "alt": "Lake Rotoiti and surrounding forested mountains in Nelson Lakes National Park",
    "caption": "Lake Rotoiti · Nelson Lakes",
    "creator": "Kris Jacques",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Lake_Rotoiti_at_Nelson_Lakes_National_Park.jpg",
    "licence": "CC BY-SA 2.5",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/2.5",
    "modifications": "Resized and converted to WebP; cropped to fit. Web rendition retains CC BY-SA 2.5."
  },
  {
    "src": "/images/places/fiordland-landscape.webp",
    "alt": "Lake Te Anau and the mountains of Fiordland under blue sky",
    "caption": "Lake Te Anau · Fiordland",
    "creator": "Krzysztof Golik",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Lake_Te_Anau_02.jpg",
    "licence": "CC BY-SA 4.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "modifications": "Resized and converted to WebP; cropped to fit. Web rendition retains CC BY-SA 4.0."
  },
  {
    "src": "/images/places/catlins-landscape.webp",
    "alt": "Rocky coastal platform and ocean at Curio Bay in the Catlins",
    "caption": "Curio Bay · The Catlins",
    "creator": "Karora",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Petrified_forest_at_Curio_Bay.jpg",
    "licence": "Public domain",
    "licenceUrl": "https://commons.wikimedia.org/wiki/File:Petrified_forest_at_Curio_Bay.jpg#Licensing",
    "modifications": "Resized and converted to WebP; cropped to fit. "
  }
]

/** Additional views reviewed on their Commons source pages, 12 November 2026. */
export const secondPlacePhotos: readonly PlacePhoto[] = [
  {src:"/images/places/nelson-rotoiti-kerr-bay.webp",alt:"Lake Rotoiti from the pebbled shore at Kerr Bay, with forested mountains and clouds",caption:"Kerr Bay shore · Lake Rotoiti",creator:"Michal Klajban",sourceUrl:"https://commons.wikimedia.org/wiki/File:Lake_Rotoiti,_New_Zealand_(1).JPG",licence:"CC BY-SA 4.0",licenceUrl:"https://creativecommons.org/licenses/by-sa/4.0/",modifications:"Resized and converted to WebP; cropped to fit. Web rendition retains CC BY-SA 4.0."},
  {src:"/images/places/fiordland-te-anau-shore.webp",alt:"Lake Te Anau on a cloudy day, with a water taxi beside the town shore",caption:"Town lakeshore · Lake Te Anau",creator:"Σ64",sourceUrl:"https://commons.wikimedia.org/wiki/File:Lake_Te_Anau,_New_Zealand_01.jpg",licence:"CC BY 4.0",licenceUrl:"https://creativecommons.org/licenses/by/4.0/",modifications:"Resized and converted to WebP; cropped to fit. Historical photograph, not a current transport offer."},
  {src:"/images/places/catlins-curio-bay-coast.webp",alt:"Waves breaking across the rocky coastline at Curio Bay in the Catlins",caption:"Rocky coastline · Curio Bay",creator:"Anagoria",sourceUrl:"https://commons.wikimedia.org/wiki/File:2019-01-15_123136_Curio_Bay_anagoria.jpg",licence:"CC BY 3.0",licenceUrl:"https://creativecommons.org/licenses/by/3.0/",modifications:"Resized and converted to WebP; cropped to fit."},
]

/** Public landscape reference points, not park/ecosystem boundaries or wildlife
 * locations. Non-Arthur points follow credited Commons geotags; the Lake Rotoiti
 * reference is from a separately geotagged South Island photograph, not a claim
 * that the displayed Kris Jacques photograph used that exact camera position.
 */
export const southIslandPlaceContexts = [
  { id: "mountains", label: "Arthur’s Pass", habitat: "mountains", latitude: -42.9409528, longitude: 171.5628387, location: "Arthur’s Pass village", source: "https://www.openstreetmap.org/node/165076707", photos: arthursPassPhotos },
  { id: "forest-and-lakes", label: "Nelson Lakes", habitat: "freshwater", latitude: -41.811469, longitude: 172.844331, location: "Lake Rotoiti", source: "https://commons.wikimedia.org/wiki/File:St_Arnaud_(New_Zealand)_banner_Lake_Rotoiti.jpg", photos: [additionalSouthIslandPlacePhotos[0], secondPlacePhotos[0], ...galleryAdditions.photos.filter(photo => photo.regionId === "south-island" && photo.placeId === "forest-and-lakes")] },
  { id: "southern-forest", label: "Fiordland", habitat: "forest", latitude: -45.231059, longitude: 167.811456, location: "Lake Te Anau", source: additionalSouthIslandPlacePhotos[1].sourceUrl, photos: [additionalSouthIslandPlacePhotos[1], secondPlacePhotos[1], ...galleryAdditions.photos.filter(photo => photo.regionId === "south-island" && photo.placeId === "southern-forest")] },
  { id: "coast", label: "Otago & the Catlins", habitat: "coast", latitude: -46.662119, longitude: 169.098100, location: "Curio Bay", source: additionalSouthIslandPlacePhotos[2].sourceUrl, photos: [additionalSouthIslandPlacePhotos[2], secondPlacePhotos[2], ...galleryAdditions.photos.filter(photo => photo.regionId === "south-island" && photo.placeId === "coast")] },
] as const
