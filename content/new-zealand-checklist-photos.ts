/** Reuse the verified catalogue and credits, joining subspecies to their living
 * parent species. A photograph documents its named taxon and location only.
 */
import { newZealandCarouselBirds, newZealandPhotoCredits } from "./new-zealand-carousel"
import { featuredNzBirdId } from "./new-zealand-checklist"

export const nzChecklistPhotos = new Map(newZealandCarouselBirds.flatMap(bird => {
  const id = featuredNzBirdId(bird.scientificName)
  const credit = newZealandPhotoCredits.find(photo => ("image" in photo ? photo.image === bird.image && photo.scientificName === bird.scientificName : photo.path === bird.image && photo.id === bird.id))
  return id && credit ? [[id, { bird, credit }] as const] : []
}))
