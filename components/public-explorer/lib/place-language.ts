/** Geographic articles belong in sentences, while map labels keep their short names. */
const placesWithArticle = new Set([
  "Pacific", "Western Andes", "Central Andes", "Eastern Andes", "Cauca Valley", "Magdalena Valley",
  "Caribbean", "Sierra Nevada de Santa Marta", "Llanos", "Colombian Massif", "North Island", "South Island",
  "Northern Territory", "Australian Capital Territory", "ACT",
])

export function placeInSentence(name: string): string {
  return placesWithArticle.has(name) ? `the ${name}` : name
}
