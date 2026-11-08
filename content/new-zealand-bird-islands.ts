/**
 * Explicit featured planning regions, NOT a complete species range or a claim
 * that a photograph/recording came from that island. Every choice follows the
 * corresponding BirdProfile localOccurrence/source notes. Nearby sanctuary and
 * coastal outings belong to their island's planning region; access still varies.
 *
 * Broad original labels were checked against these range/viewing references:
 * Fantail: https://www.nzbirdsonline.org.nz/species/new-zealand-fantail
 * Little penguin: https://www.nzbirdsonline.org.nz/species/little-penguin
 * Takahē: https://www.doc.govt.nz/tiritirimatangi and the existing Te Anau notes.
 * Other records retain the sourced local examples in new-zealand-carousel,
 * new-zealand-expansion and new-zealand-supplement. Tests require every displayed
 * bird to have an explicit entry; adding a species cannot silently leave its map blank.
 */
export type NewZealandIslandId = "north-island" | "south-island" | "rakiura"

export const newZealandBirdIslands: Record<string, readonly NewZealandIslandId[] | undefined> = {
  "nz-kea": ["south-island"],
  "nz-tui": ["north-island", "south-island", "rakiura"],
  "nz-fantail": ["north-island", "south-island", "rakiura"],
  "nz-takahe": ["north-island", "south-island"],
  "nz-little-penguin": ["north-island", "south-island", "rakiura"],
  "nz-tokoeka": ["south-island", "rakiura"],
  "nz-bellbird": ["south-island", "rakiura"],
  "nz-grey-warbler": ["south-island"],
  "nz-kaka": ["south-island", "rakiura"],
  "nz-morepork": ["south-island"],
  "nz-kereru": ["north-island", "south-island", "rakiura"],
  "nz-new-zealand-falcon": ["south-island"],
  "nz-red-crowned-parakeet": ["rakiura"],
  "nz-orange-fronted-parakeet": ["south-island"],
  "nz-south-island-robin": ["south-island", "rakiura"],
  "nz-paradise-shelduck": ["south-island"],
  "nz-rock-wren": ["south-island"],
  "nz-south-island-saddleback": ["south-island", "rakiura"],
  "nz-silvereye": ["south-island"],
  "nz-south-island-tomtit": ["south-island"],
  "nz-western-weka": ["south-island"],
  "nz-westland-petrel": ["south-island"],
  "nz-white-heron": ["south-island"],
  "nz-yellow-eyed-penguin": ["south-island"],
  "nz-yellowhead": ["south-island", "rakiura"],
  "nz-australasian-crested-grebe": ["south-island"],
  "nz-black-stilt": ["south-island"],
  "nz-blue-duck": ["south-island"],
  "nz-huttons-shearwater": ["south-island"],
  "nz-australasian-bittern": ["south-island"],
  "nz-extra-rifleman": ["south-island"],
}
