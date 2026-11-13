/**
 * Country collections for the global homepage cards. Keep these out of the small
 * destination catalogue, which is also imported by navigation on other pages.
 * The Australian JSON is a metadata snapshot of australia/content/birds-original,
 * birds-expansion-a and birds-expansion-b. Its media and licences stay in that app.
 */
import { birdData, type BirdProfile } from "./birds"
import { newZealandCarouselBirds } from "./new-zealand-carousel"
import australianCatalogue from "./global-australian-birds.json"

export const destinationBirds: Record<string, BirdProfile[] | undefined> = {
  colombia: birdData.map(bird => ({
    ...bird,
    countryId: "colombia",
    regionHref: `/regions/${bird.regionSlug}`,
  })),
  australia: australianCatalogue.map(bird => ({
    ...bird,
    countryId: "australia",
    image: `/australia${bird.image}`,
    audioFile: bird.audioFile ? `/australia${bird.audioFile}` : undefined,
    regionHref: `/australia/regions/${bird.regionSlug}`,
    audioCreditHref: `/australia/credits#audio-${bird.id}`,
    photoCredit: { ...bird.photoCredit, teamLink: undefined },
  })),
  "new-zealand": newZealandCarouselBirds.map(bird => ({
    ...bird,
    countryId: "new-zealand",
    regionHref: bird.regionHref || "/new-zealand#regions",
  })),
}
