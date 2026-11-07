import HomepageBirdCarousel from "@/components/homepage-bird-carousel"
import { birdData } from "@/content/birds"
import { regionalBirdSelections } from "@/content/regional-birds"

export function RegionalBirdCarousel({ regionId }: { regionId: string }) {
  const selections = regionalBirdSelections[regionId] || []
  const birds = selections.flatMap(selection => {
    const bird = birdData.find(item => item.id === selection.birdId)
    return bird ? [{ ...bird, regionSlug: regionId, localOccurrence: selection.whereFound }] : []
  })
  if (!birds.length) return null
  const sources = [...new Map(selections.flatMap(item => item.sources || []).map(source => [source.url, source])).values()]
  return <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center mb-10">
    <div className="min-w-0"><p className="mb-4 font-semibold text-emerald-900">A selection of birds to look for in this region</p><HomepageBirdCarousel key={regionId} birds={birds} autoPlay={false} className="max-w-xl" /></div>
    <div>
      <h3 className="text-2xl font-semibold text-gray-900">Meet the local birdlife</h3>
      <p className="mt-4 text-gray-600 leading-relaxed">Explore a few of the birds recorded in this region. Each photograph includes a local place to look, with the wider range and habitat in the bird information panel. Listen to a call where a credited recording is available.</p>
      <p className="mt-4 text-gray-600 leading-relaxed">These birds are inspiration for a personal itinerary. Sightings depend on season, habitat and conditions.</p>
      {sources.length > 0 && <details className="mt-6 text-sm text-gray-600"><summary className="cursor-pointer py-3 font-medium text-emerald-800">Sources for these regional records</summary><ul className="mt-2 space-y-3">{sources.map(source => <li key={source.url}><a className="underline underline-offset-4 text-emerald-800" href={source.url}>{source.title}</a></li>)}</ul></details>}
    </div>
  </div>
}
