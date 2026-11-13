/**
 * Defines the shared BirdProfile shape and imports Colombia's public bird catalogue.
 * A ? marks an optional field. image/audioFile are media paths, sources are factual
 * references, and photoCredit identifies the creator. Range is not a sighting promise.
 */
import catalogue from "./birds-catalogue.json"

export type BirdSource = { title: string; url: string }
export type BirdProfile = {
  countryId?: string
  id: string
  commonName: string
  scientificName: string
  primaryRegion: string
  regionSlug: string
  regionHref?: string
  audioCreditHref?: string
  distribution: string
  localOccurrence?: string
  habitat: string
  image: string
  imagePosition?: string
  audioFile?: string
  audioLabel?: string
  sources: BirdSource[]
  photoCredit: {
    photographer: string
    title: string
    teamLink?: string
    instagramPost?: string
    reserve?: string
    reserveLink?: string
  }
}

// The featured region is an itinerary starting point, not the bird's whole range.
// Original AVES photographs retain their supplied attribution. New media has
// independently linked licences in image-credits.json and audio-credits.json.
export const birdData: BirdProfile[] = catalogue
