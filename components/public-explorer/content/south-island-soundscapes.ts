import type { SouthIslandEcosystemFilter } from "./south-island-ecosystems"

/** Creator-published CC0 field recordings, checked 10 November 2026. These are
 * representative Canterbury ambience, not live sound or a selected-place claim. */
export const southIslandSoundscapes = [
  { id: "forest", title: "Forest birds & distant river", location: "Peel Forest, Canterbury", src: "https://aves.bio/audio/soundscapes/south-island-forest.mp3", source: "https://freesound.org/people/Desmond178/sounds/844342/", sourceTitle: "Peel forest NZ river and birds", excerptStart: 15 },
  { id: "freshwater", title: "Stream & nearby birds", location: "Awa Awa reserve, Canterbury", src: "https://aves.bio/audio/soundscapes/south-island-stream.mp3", source: "https://freesound.org/people/Desmond178/sounds/845785/", sourceTitle: "stream and birds New Zealand", excerptStart: 15 },
  { id: "coast", title: "Small shore waves", location: "Wakanui Beach, Canterbury", src: "https://aves.bio/audio/soundscapes/south-island-coast.mp3", source: "https://freesound.org/people/Desmond178/sounds/844480/", sourceTitle: "Wakanui small waves", excerptStart: 35 },
] as const
export const soundscapeCreator = "Desmond178"
export const soundscapeLicence = "https://creativecommons.org/publicdomain/zero/1.0/"

export function southIslandSoundscape(habitat: SouthIslandEcosystemFilter) {
  // All habitats has an explicitly labelled forest sampler. Never substitute a
  // coastal/forest recording for an unavailable alpine soundscape.
  return southIslandSoundscapes.find(item => item.id === (habitat === "all" ? "forest" : habitat)) ?? null
}
