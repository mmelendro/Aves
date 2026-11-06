import original from "./birds-original.json"
import expansionA from "./birds-expansion-a.json"
import expansionB from "./birds-expansion-b.json"

export type BirdProfile = {
  id: string
  commonName: string
  scientificName: string
  primaryRegion: string
  regionSlug: string
  distribution: string
  localOccurrence?: string
  habitat: string
  image: string
  imagePosition?: string
  audioFile?: string
  audioLabel?: string
  sources: { title: string; url: string }[]
  photoCredit: { photographer: string; title: string; teamLink?: string; instagramPost?: string; reserve?: string; reserveLink?: string }
}

export const birdData: BirdProfile[] = [...original, ...expansionA, ...expansionB]
