import { travelMediaResources } from "@/content/travel-media"

// Tab-scoped, same-origin public playback state only. Never store page/account URLs,
// credentials, guest choices or arbitrary media sources. Restoring never plays.
export const MEDIA_HANDOFF_KEY = "aves.travel-media.v1"
export type MediaHandoff = { version: 1; resourceId: string; position: number; muted: boolean; savedAt: number }
const lifetime = 6 * 60 * 60 * 1000

export function readMediaHandoff(raw: string | null, now = Date.now()): MediaHandoff | null {
  try {
    const value = JSON.parse(raw || "null")
    if (!value || value.version !== 1 || !travelMediaResources.some(item => item.id === value.resourceId && item.playback) ||
      !Number.isFinite(value.position) || value.position < 0 || value.position > 7 * 24 * 3600 ||
      typeof value.muted !== "boolean" || !Number.isFinite(value.savedAt) || value.savedAt > now || now - value.savedAt > lifetime) return null
    return { version: 1, resourceId: value.resourceId, position: value.position, muted: value.muted, savedAt: value.savedAt }
  } catch { return null }
}
