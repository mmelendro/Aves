/**
 * Adapts NZ editorial entries and licensed media credits into BirdProfile records.
 * The shared carousel can then render NZ birds without its own UI implementation.
 * The original selection, expansion and supplement are combined at the bottom.
 */
import type { BirdProfile } from "@/content/birds"
import { newZealandBirds, newZealandEbirdLinks } from "@/content/new-zealand"
import { expansionBirds, expansionPhotoCredits } from "@/content/new-zealand-expansion"
import { newZealandSupplementBirds, newZealandSupplementPhotoCredits } from "@/content/new-zealand-supplement"
import { newZealandBirdIslands, type NewZealandIslandId } from "@/content/new-zealand-bird-islands"
import { newZealandRegionHref } from "@/lib/new-zealand-region-links"

// Commercial reuse licences verified against the individual Commons file pages
// on 7 November 2026. These are real photographs, not generated illustrations.
const originalPhotoCredits = [
  {
    id: "nz-kea", scientificName: "Nestor notabilis", region: "South Island",
    image: "/images/destinations/kea-new-zealand.jpg",
    title: "Kea (Nestor notabilis) -side -NZ-8a.jpg", creator: "Piotr Zurek",
    location: "New Zealand",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Kea_(Nestor_notabilis)_-side_-NZ-8a.jpg",
    license: "CC BY-SA 2.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
    modifications: "Original photograph retained; the portrait carousel crops the displayed frame with CSS. Responsive image compression may apply. Image adaptations remain under CC BY-SA 2.0.",
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

const newZealandAudio = {
  "nz-kea": { file: "/audio/nz-kea.mp3", label: "Kea responding to recorded calls · Department of Conservation (NZ)" },
  "nz-tui": { file: "/audio/nz-tui.mp3", label: "Tūī communication calls · Department of Conservation (NZ)" },
  "nz-fantail": { file: "/audio/nz-fantail.mp3", label: "North Island fantail feeding calls · Department of Conservation (NZ)" },
  "nz-takahe": { file: "/audio/nz-takahe.mp3", label: "Takahē song · Department of Conservation (NZ)" },
  "nz-little-penguin": { file: "/audio/nz-little-penguin.mp3", label: "Little penguins calling at dusk in New Zealand · Benchill" },
  "nz-tokoeka": { file: "/audio/nz-tokoeka.mp3", label: "Tokoeka song, Ocean Beach, Stewart Island / Rakiura · ZHANG Shen (XC389022)" },
} as const

// Each percentage marks the original photograph's focal point. The shared
// cover-framing helper keeps that point centered where the image edges allow;
// it does not modify the photograph or change its media/credit record.
const originalPortraitPositions: Record<(typeof originalPhotoCredits)[number]["id"], string> = {
  "nz-kea": "85% center",
  "nz-tui": "85% center",
  "nz-fantail": "center",
  "nz-takahe": "80% center",
  "nz-little-penguin": "35% center",
  "nz-tokoeka": "85% center",
}

const originalCarouselBirds: BirdProfile[] = newZealandBirds.map(bird => {
  const photo = originalPhotoCredits.find(entry => entry.scientificName === bird.scientific)
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
    imagePosition: originalPortraitPositions[photo.id],
    audioFile: newZealandAudio[photo.id].file,
    audioLabel: newZealandAudio[photo.id].label,
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

export const newZealandCarouselBirds: BirdProfile[] = [...originalCarouselBirds, ...expansionBirds, ...newZealandSupplementBirds]
// Build local collections once: stable profile objects avoid effect loops when
// the carousel reports a new bird to its map. Media and rights stay unchanged.
const regionalCollections = Object.fromEntries((["north-island", "south-island", "rakiura"] as const).map(id => [id,
  newZealandCarouselBirds.filter(bird => newZealandBirdIslands[bird.id]?.includes(id)).map(bird => ({
    ...bird, regionSlug: id, regionHref: newZealandRegionHref(id),
    primaryRegion: id === "south-island" ? "South Island" : id === "north-island" ? "North Island" : "Stewart Island / Rakiura",
  })),
])) as Record<NewZealandIslandId, BirdProfile[]>

export function newZealandRegionBirds(id?: NewZealandIslandId): BirdProfile[] {
  return id ? regionalCollections[id] : newZealandCarouselBirds
}
export const newZealandPhotoCredits = [...originalPhotoCredits, ...expansionPhotoCredits, ...newZealandSupplementPhotoCredits]
