/** Coarse planning habitats for the existing South Island media collection.
 * Explicit associations follow each profile's local occurrence/habitat sources;
 * they are not habitat polygons, precise sightings or photographic locations.
 * Conservation access and seasonal limits remain in the original Info panel.
 */
import type { BirdProfile } from "@/components/public-explorer/content/birds"

export const southIslandEcosystems = [
  { id: "forest", name: "Forest & scrub", description: "Native forest, regenerating bush and wooded margins, from Nelson Lakes to Fiordland." },
  { id: "mountains", name: "Mountains & tussock", description: "High-country forest edges, tussock and alpine rock. Takahē viewing in this collection is at managed conservation sites; wild populations are not general visitor destinations." },
  { id: "freshwater", name: "Rivers, lakes & wetlands", description: "Freshwater habitats vary: whio need fast rivers, grebes open lakes and bitterns reedbeds. A shared category does not mean they share one site." },
  { id: "coast", name: "Coasts & offshore waters", description: "Coastal vegetation, lagoons and marine feeding areas. Seabird outings and managed penguin viewing need separate access and seasonal checks." },
] as const
export type SouthIslandEcosystem = typeof southIslandEcosystems[number]["id"]
export type SouthIslandEcosystemFilter = "all" | SouthIslandEcosystem

// Conservative viewing-habitat associations, reviewed 9 November 2026 using
// the profiles' DOC/NZ Birds Online references. Marine birds' sensitive nesting
// colonies are not added as mountain/forest viewing recommendations.
export const southIslandBirdEcosystems: Readonly<Record<string, readonly SouthIslandEcosystem[] | undefined>> = {
  "nz-kea": ["forest", "mountains"],
  "nz-tui": ["forest"],
  "nz-fantail": ["forest"],
  "nz-takahe": ["mountains"],
  "nz-little-penguin": ["coast"],
  "nz-tokoeka": ["forest", "mountains"],
  "nz-bellbird": ["forest"],
  "nz-grey-warbler": ["forest"],
  "nz-kaka": ["forest"],
  "nz-morepork": ["forest"],
  "nz-kereru": ["forest"],
  "nz-new-zealand-falcon": ["forest", "mountains"],
  "nz-orange-fronted-parakeet": ["forest"],
  "nz-south-island-robin": ["forest"],
  "nz-paradise-shelduck": ["freshwater"],
  "nz-rock-wren": ["mountains"],
  "nz-south-island-saddleback": ["forest"],
  "nz-silvereye": ["forest"],
  "nz-south-island-tomtit": ["forest"],
  "nz-western-weka": ["forest", "freshwater"],
  "nz-westland-petrel": ["coast"],
  "nz-white-heron": ["freshwater", "coast"],
  "nz-yellow-eyed-penguin": ["coast"],
  "nz-yellowhead": ["forest"],
  "nz-australasian-crested-grebe": ["freshwater"],
  "nz-black-stilt": ["freshwater"],
  "nz-blue-duck": ["freshwater"],
  "nz-huttons-shearwater": ["coast"],
  "nz-australasian-bittern": ["freshwater"],
  "nz-extra-rifleman": ["forest"],
}

/** Keep the caller's already-local collection and original rights/call records.
 * Unmapped birds remain in All; never guess a habitat from a name or photo.
 */
export function filterSouthIslandBirds(birds: readonly BirdProfile[], ecosystem: SouthIslandEcosystemFilter): BirdProfile[] {
  return birds.filter(bird => ecosystem === "all" || southIslandBirdEcosystems[bird.id]?.includes(ecosystem))
}
