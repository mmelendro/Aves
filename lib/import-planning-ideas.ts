import { validNzBirdIds } from "@/content/new-zealand-checklist"
import { islandPlanner } from "./island-planners"
import type { TripDraft } from "./island-planning-types"
import { mergeNzPlaceNotes } from "./nz-place-ideas"

type DraftIdeas = { message: string; birdIds: string[]; regions: string[] }
type IncomingIdeas = { birdIds: string[]; placeIds: string[]; itineraries: TripDraft[] }

/** A deliberate, atomic merge into unsaved fields. Failure leaves every field
 * intact. This function never saves, shares, consumes tab storage or calls an API. */
export function importPlanningIdeas(current: DraftIdeas, incoming: IncomingIdeas): DraftIdeas & { error?: string } {
  const fail = (error: string) => ({ ...current, error })
  const places = mergeNzPlaceNotes(current.message, incoming.placeIds)
  if (places.error) return fail(places.error)
  let message = places.message
  const birds = new Set([...current.birdIds, ...incoming.birdIds])
  const regions = new Set(current.regions)
  try {
    for (const draft of incoming.itineraries) {
      const planner = islandPlanner(draft?.input?.islandId || "south-island")
      if (!planner) return fail("An itinerary could not be verified. Rebuild it before importing.")
      const merged = planner.mergeTripNotes(message, draft)
      if (merged.error) return fail(merged.error)
      message = merged.message
      draft.input.birdIds.forEach(id => birds.add(id))
      regions.add(planner.context.id)
    }
    const birdIds = [...birds]
    if (!validNzBirdIds(birdIds)) return fail("Some bird choices could not be verified. Please review them before importing.")
    return { message, birdIds, regions: [...regions] }
  } catch {
    return fail("These ideas could not be verified. Your current draft is unchanged.")
  }
}
