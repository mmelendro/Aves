import type { PlacePhoto } from "@/components/place-flip-card"

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
]
