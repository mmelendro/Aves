/** The original explorer URL now uses the same single map as country and region
 * pages. Keep its sourced regional directory, without a second map or catalogue. */
import Link from "next/link"
import DestinationExplorerPage from "./destination-explorer-page"
import WorldDestinationMap from "./world-destination-map"
import { regions } from "@/content/regions"
import { placeInSentence } from "@/lib/place-language"

export function ColombianBirdsExplorer() {
  return <DestinationExplorerPage initialCountryId="colombia" map={<WorldDestinationMap/>}>
    <section aria-label="Colombian regional guides" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-medium text-emerald-950">Find your corner of Colombia</h2>
      <p className="mt-3 text-gray-600">Select a region on the map to explore here, or open its guide for more planning detail.</p>
      <nav aria-label="Colombia birding regions" className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{regions.map(region=><Link key={region.id} href={`/regions/${region.id}`} className="rounded-2xl border border-emerald-100 p-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700"><h3 className="font-semibold text-emerald-900">Explore {placeInSentence(region.name)}</h3><p className="mt-3 text-sm leading-7 text-gray-600">{region.description}</p></Link>)}</nav>
    </section>
  </DestinationExplorerPage>
}
