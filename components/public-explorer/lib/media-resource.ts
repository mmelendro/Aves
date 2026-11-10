import type { BirdProfile } from "@/components/public-explorer/content/birds"
import { sitePath } from "@/components/public-explorer/lib/site-path"

export type MediaResource = {
  id: string; country: string; regionId?: string; title: string; kind: string
  description: string; href: string; action: string
  mapPlace?: { id: string } | null
  playback: { type: "audio" | "youtube"; src: string } | null
}

/** Public catalogue metadata only. Dynamic calls are never restored from storage. */
export function birdMediaResource(bird: BirdProfile): MediaResource | null {
  if (!bird.audioFile) return null
  const country = bird.id.startsWith("nz-") ? "new-zealand" : bird.id.startsWith("au-") ? "australia" : "colombia"
  return {
    id: `bird:${country}:${bird.id}`, country, regionId: bird.regionSlug,
    title: bird.commonName, kind: "Bird call", playback: { type: "audio", src: sitePath(bird.audioFile) },
    description: `${bird.scientificName}. ${bird.localOccurrence || bird.distribution} Learn sounds here; do not use playback to attract wildlife in the field.`,
    href: ("audioCreditHref" in bird && typeof bird.audioCreditHref === "string" ? bird.audioCreditHref : "") || sitePath(`/credits#audio-${bird.id}`), action: "Recording source & credits",
  }
}
