import HomepageBirdCarousel from "@/components/homepage-bird-carousel"
import { newZealandCarouselBirds, newZealandPhotoCredits } from "@/content/new-zealand-carousel"

const resourceLink = "inline-flex min-h-11 items-center rounded text-sm font-semibold text-emerald-800 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"

export default function NewZealandBirdCarousel() {
  return (
    <div className="mt-9">
      <div className="mx-auto max-w-lg">
          <HomepageBirdCarousel birds={newZealandCarouselBirds} autoPlay={false} showBirdPicker />
          <p className="mx-auto mt-4 max-w-md text-center text-sm leading-6 text-gray-600">{newZealandCarouselBirds.length} featured species, with a South Island focus. This is a selection, not a complete checklist. Open species details for range, habitat and source guides.</p>
          <p className="mx-auto mt-3 max-w-md text-center text-xs leading-5 text-gray-600">Enjoy the recordings here for learning; avoid playing them to attract wild birds. Photographs and recordings may come from different locations.</p>
      </div>
      <details id="new-zealand-photo-credits" className="mt-8 rounded-2xl border border-emerald-200 bg-white px-5 py-3 text-sm">
        <summary className="min-h-11 cursor-pointer content-center rounded font-semibold text-emerald-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700">Photograph credits and licences</summary>
        <ul className="grid gap-5 py-4 sm:grid-cols-2 lg:grid-cols-3">
          {newZealandPhotoCredits.map(photo => (
            <li key={photo.id} className="min-w-0 space-y-2 leading-6 text-gray-600">
              <p className="font-semibold text-gray-900">{photo.creator}</p>
              <a href={photo.sourceUrl} target="_blank" rel="noreferrer" className={`${resourceLink} break-words`}>{photo.title}</a>
              <p><a href={photo.licenseUrl} target="_blank" rel="noreferrer" className={resourceLink}>{photo.license}</a> · via Wikimedia Commons</p>
              <p className="text-xs leading-5">{photo.modifications}</p>
            </li>
          ))}
        </ul>
      </details>
    </div>
  )
}
