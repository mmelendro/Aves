/** The first place-card pilot. Geography is a small attributed OSM extract,
 * rendered locally: no map SDK, tracking request, wildlife pins or API key.
 */
import { MapPin } from "lucide-react"
import PlaceFlipCard from "./place-flip-card"
import map from "@/content/arthurs-pass-map.json"
import { arthursPassPhotos } from "@/content/south-island-place-media"
import { southIslandPlaces } from "@/content/south-island"

export default function ArthursPassPlaceCard() {
  const place = southIslandPlaces[0]
  return <PlaceFlipCard name={place.name} photos={arthursPassPhotos} map={<figure className="flex h-full flex-col justify-center p-4">
    <svg viewBox={map.viewBox} role="img" aria-label="Local map showing Arthur’s Pass village, the mountain pass, State Highway 73 and nearby rivers. North is up." className="block w-full flex-1" style={{ minHeight: 210 }}>
      <defs><clipPath id="arthurs-pass-local-clip"><rect width="480" height="360" /></clipPath></defs>
      <g clipPath="url(#arthurs-pass-local-clip)">
        <rect width="480" height="360" fill="#eff8f3" />
        {map.paths.filter(path => path.kind === "river").map(path => <path key={path.id} d={path.d} fill="none" stroke="#7baebc" strokeWidth="2" />)}
        {map.paths.filter(path => path.kind === "road").map(path => <path key={path.id} d={path.d} fill="none" stroke="#b98548" strokeWidth="3" strokeLinejoin="round" />)}
        {map.markers.map(point => <g key={point.id}><circle cx={point.xy[0]} cy={point.xy[1]} r="7" fill="#047857" stroke="white" strokeWidth="3" /><text x={point.xy[0] + 13} y={point.xy[1] + 4} fontSize="14" fill="#064e3b" stroke="#eff8f3" strokeWidth="4" paintOrder="stroke" fontWeight="600">{point.name}</text></g>)}
        <g fill="#065f46"><text x="28" y="25" fontSize="13">N</text><path d="M33 33L27 50L33 46L39 50Z" /><text x="20" y="322" fontSize="11">Approx. 1 km</text><path d="M20 329v6h50v-6" fill="none" stroke="#065f46" strokeWidth="2" /></g>
      </g>
    </svg>
    <figcaption className="mt-2 text-xs leading-5 text-emerald-950"><p><span style={{ color: "#916124" }}>━</span> SH73 <span className="ml-3" style={{ color: "#347c95" }}>━</span> Rivers · North up</p><p className="mt-1">Local overview, not a walking or navigation map.</p><a href={map.source.url} target="_blank" rel="noreferrer" className="underline underline-offset-2">© OpenStreetMap contributors · ODbL</a><p className="text-[11px]">Data checked 9 November 2026. Scale approximate at map centre.</p></figcaption>
  </figure>}>
    <p className="mb-3 flex items-center gap-2 text-sm font-medium text-emerald-700"><MapPin className="h-4 w-4" aria-hidden="true" />{place.habitat}</p>
    <h3 className="text-2xl font-medium">{place.name}</h3>
    <p className="mt-3 text-sm font-medium leading-6 text-emerald-900">{place.birds}</p>
    <p className="mt-4 leading-7 text-gray-600">{place.description}</p>
    <p className="mt-4 text-sm leading-6 text-gray-600">{place.balance}</p>
    <a href={place.source.url} target="_blank" rel="noreferrer" className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-emerald-800 underline underline-offset-4">{place.source.title}<span className="sr-only"> (opens in a new tab)</span></a>
  </PlaceFlipCard>
}
