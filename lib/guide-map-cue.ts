import data from "@/content/guide-map-cues.json"

export type GuideMapCue = { label: string; image: string; viewBox: string }
export const mapCueSources = data.sources
const cues: Record<string, GuideMapCue> = data.cues

/** Small pre-generated SVGs retain the exact reviewed regional highlight.
 * Importing a thumbnail must never import every country's interactive geometry.
 * Regenerate with scripts/generate-guide-map-cues.cjs after geometry changes. */
export function guideMapCue(country?: string, regionId?: string, regionLabel?: string): GuideMapCue {
  const key = `${country}/${regionId}`
  const cue = Object.hasOwn(cues, key) ? cues[key]
    : country && Object.hasOwn(cues, country) ? cues[country] : cues.world
  return { ...cue, label: regionLabel || cue.label }
}
