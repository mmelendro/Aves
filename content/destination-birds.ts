/**
 * Country collections for the global homepage cards. Keep these out of the small
 * destination catalogue, which is also imported by navigation on other pages.
 * Australia reuses its maintained country catalogue and the same local media assets.
 */
import { birdData, type BirdProfile } from "./birds"
import { newZealandCarouselBirds } from "./new-zealand-carousel"
import { australianBirds } from "@/features/australia/content/carousel-birds"

export const destinationBirds: Record<string, BirdProfile[] | undefined> = {
  colombia: birdData.map(bird => ({
    ...bird,
    regionHref: `/regions/${bird.regionSlug}`,
  })),
  australia: australianBirds,
  "new-zealand": newZealandCarouselBirds.map(bird => ({
    ...bird,
    regionHref: bird.regionHref || "/new-zealand#regions",
  })),
}
