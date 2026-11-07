import type { BirdProfile } from "@/content/birds"
import { newZealandBirds, newZealandEbirdLinks } from "@/content/new-zealand"

// Commercial reuse licences verified against the individual Commons file pages
// on 7 November 2026. These are real photographs, not generated illustrations.
export const newZealandPhotoCredits = [
  {
    id: "nz-kea", scientificName: "Nestor notabilis", region: "South Island",
    image: "/images/destinations/kea-new-zealand.jpg",
    title: "Kea (Nestor notabilis) -side -NZ-8a.jpg", creator: "Piotr Zurek",
    location: "New Zealand",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Kea_(Nestor_notabilis)_-side_-NZ-8a.jpg",
    license: "CC BY-SA 2.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
    modifications: "Existing original photograph reused without cropping in this carousel. Responsive image compression may apply. Image adaptations remain under CC BY-SA 2.0.",
  },
  {
    id: "nz-tui", scientificName: "Prosthemadera novaeseelandiae", region: "North, South & Stewart Islands",
    image: "/images/new-zealand/tui.webp",
    title: "Tui 06.jpg", creator: "Tony Wills",
    location: "Wrights Hill, Wellington, New Zealand",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Tui_06.jpg",
    originalUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tui_06.jpg",
    license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    modifications: "Resized and converted to WebP without cropping or generative edits. Image adaptations remain under CC BY-SA 3.0.",
  },
  {
    id: "nz-fantail", scientificName: "Rhipidura fuliginosa", region: "Widespread in New Zealand",
    image: "/images/new-zealand/fantail.webp",
    title: "Rhipidura fuliginosa2.jpg", creator: "Basar",
    location: "New Zealand",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Rhipidura_fuliginosa2.jpg",
    originalUrl: "https://upload.wikimedia.org/wikipedia/commons/6/61/Rhipidura_fuliginosa2.jpg",
    license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    modifications: "Resized and converted to WebP without cropping or generative edits. Image adaptations remain under CC BY-SA 4.0.",
  },
  {
    id: "nz-takahe", scientificName: "Porphyrio hochstetteri", region: "Protected sites",
    image: "/images/new-zealand/takahe.webp",
    title: "Porphyrio hochstetteri.jpg", creator: "Basar",
    location: "New Zealand",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Porphyrio_hochstetteri.jpg",
    originalUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Porphyrio_hochstetteri.jpg",
    license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    modifications: "Resized and converted to WebP without cropping or generative edits. Image adaptations remain under CC BY-SA 4.0.",
  },
  {
    id: "nz-little-penguin", scientificName: "Eudyptula minor", region: "New Zealand coast",
    image: "/images/new-zealand/little-penguin.webp",
    title: "Blue Penguin Kapiti.jpg", creator: "Duncan Wright",
    location: "Kāpiti Island, New Zealand",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Blue_Penguin_Kapiti.jpg",
    originalUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Blue_Penguin_Kapiti.jpg",
    license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    modifications: "Resized and converted to WebP without cropping or generative edits. Image adaptations remain under CC BY-SA 3.0.",
  },
  {
    id: "nz-tokoeka", scientificName: "Apteryx australis", region: "Southern New Zealand",
    image: "/images/new-zealand/tokoeka.webp",
    title: "Tokoeka.jpg", creator: "Glen Fergus",
    location: "Wild bird on Stewart Island / Rakiura, New Zealand",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Tokoeka.jpg",
    originalUrl: "https://upload.wikimedia.org/wikipedia/commons/9/99/Tokoeka.jpg",
    license: "CC BY-SA 2.5", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.5/",
    modifications: "Resized and converted to WebP without cropping or generative edits. Image adaptations remain under CC BY-SA 2.5.",
  },
] as const

export const newZealandCarouselBirds: BirdProfile[] = newZealandBirds.map(bird => {
  const photo = newZealandPhotoCredits.find(entry => entry.scientificName === bird.scientific)
  if (!photo) throw new Error(`Missing New Zealand photograph: ${bird.scientific}`)
  const ebirdUrl = newZealandEbirdLinks[bird.scientific]
  return {
    id: photo.id,
    commonName: bird.name,
    scientificName: bird.scientific,
    primaryRegion: photo.region,
    // NZ is an introduction in development, without an Explorer booking route.
    regionSlug: "",
    distribution: bird.where,
    localOccurrence: bird.where,
    habitat: `${bird.habitat}. ${bird.note}`,
    image: photo.image,
    sources: [
      ...(ebirdUrl ? [{ title: "eBird species guide", url: ebirdUrl }] : []),
      { title: "DOC species and visitor guidance", url: bird.source },
    ],
    photoCredit: {
      photographer: photo.creator,
      title: `${photo.title} · ${photo.license}`,
      reserve: photo.location,
      instagramPost: photo.sourceUrl,
    },
  }
})
