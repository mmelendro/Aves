/**
 * Builds a small mixed-country selection for the global homepage.
 * map creates copies with country-aware links; spread (...) retains other fields.
 * flatMap interleaves Colombia, Australia and New Zealand instead of grouping them.
 */
import type { BirdProfile } from "./birds"
import { destinationBirds } from "./destination-birds"

// Small, sourced selection from the Australian catalogue. Assets and recording
// licences stay on the maintained Australian application rather than being copied.
const australiaBirds: BirdProfile[] = destinationBirds.australia!.slice(0, 3).map(bird => ({
  ...bird,
  primaryRegion: `${bird.primaryRegion}, Australia`,
}))

const colombiaBirds = destinationBirds.colombia!.slice(0, 3).map(bird => ({
  ...bird,
  primaryRegion: `${bird.primaryRegion}, Colombia`,
  regionHref: `/regions/${bird.regionSlug}`,
}))
const nzBirds = destinationBirds["new-zealand"]!.slice(0, 3).map(bird => ({
  ...bird,
  primaryRegion: `${bird.primaryRegion}, New Zealand`,
  regionHref: "/new-zealand#regions",
}))

export const globalBirds: BirdProfile[] = colombiaBirds.flatMap((bird, index) => [bird, australiaBirds[index], nzBirds[index]])
