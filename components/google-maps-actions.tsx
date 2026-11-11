import { googleMapsLink } from "@/lib/google-maps-links";
/** The visitor chooses to open Google; no Google resources load before that action. */
export default function GoogleMapsActions({ query, area = false }: { query: string; area?: boolean }) {
  return <div className="mt-2 text-xs leading-5">
    <div className="flex flex-wrap gap-x-4"><a href={googleMapsLink("search", query)} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center rounded font-semibold text-emerald-800 underline">{area ? "Search this area on Google Maps" : "View on Google Maps"}<span className="sr-only"> (opens in a new tab)</span></a><a href={googleMapsLink("directions", query)} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center rounded font-semibold text-emerald-800 underline">Directions on Google Maps<span className="sr-only"> (opens in a new tab)</span></a></div>
    <p className="text-gray-600">{area ? "Area search, not an exact entrance. " : "Confirm the matching listing and entrance. "}Google provides its own business information and directions; access and arrangements still need checking.</p>
  </div>;
}
