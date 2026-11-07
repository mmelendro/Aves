/**
 * Builds a small mixed-country selection for the global homepage.
 * map creates copies with country-aware links; spread (...) retains other fields.
 * flatMap interleaves Colombia, Australia and New Zealand instead of grouping them.
 */
import { birdData, type BirdProfile } from "./birds"
import { newZealandCarouselBirds } from "./new-zealand-carousel"
import australianSelection from "./global-australian-birds.json"

// Small, sourced selection from the Australian catalogue. Assets and recording
// licences stay on the maintained Australian application rather than being copied.
const australiaBirds: BirdProfile[] = australianSelection.map(bird => ({
  ...bird,
  image: `/australia${bird.image}`,
  audioFile: `/australia${bird.audioFile}`,
  primaryRegion: `${bird.primaryRegion}, Australia`,
  regionHref: `/australia/regions/${bird.regionSlug}`,
  audioCreditHref: `/australia/credits#audio-${bird.id}`,
  photoCredit: { ...bird.photoCredit, teamLink: undefined },
}))

const colombiaBirds = birdData.slice(0, 3).map(bird => ({
  ...bird,
  primaryRegion: `${bird.primaryRegion}, Colombia`,
  regionHref: `/regions/${bird.regionSlug}`,
}))
const nzBirds = newZealandCarouselBirds.slice(0, 3).map(bird => ({
  ...bird,
  primaryRegion: `${bird.primaryRegion}, New Zealand`,
  regionHref: "/new-zealand#regions",
}))

export const globalBirds: BirdProfile[] = colombiaBirds.flatMap((bird, index) => [bird, australiaBirds[index], nzBirds[index]])
