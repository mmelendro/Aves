/**
 * The homepage's geographic entry point. World context stays on the server;
 * the three country controls share selection with the homepage bird viewer.
 * Geometry is preprojected; optional catalogue metadata chooses which countries
 * AVES currently offers. Neutral land is context, not an available destination.
 */
import { destinations } from "@/content/destinations"
import world from "@/content/world-map.json"
import styles from "./world-destination-map.module.css"
import WorldMapCountry from "./world-map-country"
import WorldMapScene from "./world-map-scene"

export default function WorldDestinationMap() {
  const mapped = destinations.flatMap(destination => {
    const country = world.countries.find(country => country.code === destination.worldMap?.countryCode)
    return country && destination.worldMap ? [{ destination, country, label: destination.worldMap }] : []
  })
  const available = new Set(mapped.map(({ country }) => country.code))
  // Derive zoom targets from the real projected outline, never from label
  // positions. Only these three small transforms cross the client boundary.
  const targets = Object.fromEntries(mapped.map(({ destination, country }) => {
    const points = [...country.path.matchAll(/([\d.]+),([\d.]+)/g)].map(([, x, y]) => [Number(x), Number(y)])
    const xs = points.map(point => point[0]), ys = points.map(point => point[1])
    const left = Math.min(...xs), right = Math.max(...xs), top = Math.min(...ys), bottom = Math.max(...ys)
    return [destination.id, { x: (left + right) / 2, y: (top + bottom) / 2, scale: Math.min(8, 800 / (right - left), 440 / (bottom - top)) }]
  }))

  return (
    <figure aria-labelledby="world-map-heading" className={`${styles.map} min-w-0 overflow-hidden rounded-3xl border border-emerald-200/80 bg-white/90 shadow-sm`}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-5 pt-5 sm:px-6">
        <h2 id="world-map-heading" className="text-lg font-medium text-emerald-950">Find your next destination</h2>
        <p className="text-xs text-emerald-800">Choose a country to meet its birds</p>
      </div>
      <div className="flex min-h-0 flex-1 items-center">
      {/* A group, rather than role=img, keeps the three SVG buttons accessible. */}
      <svg viewBox={world.viewBox} role="group" aria-labelledby="world-map-title world-map-description" className="block h-full w-full" preserveAspectRatio="xMidYMid meet">
        <title id="world-map-title">AVES destinations on an Equal Earth world map</title>
        <desc id="world-map-description">Select Colombia, Australia or New Zealand to zoom into its regional map and change the bird carousel. Back to world returns here. Use Explore to open the selected country's page. Other countries provide geographic context. Large text selection buttons are above; direct destination links are in the footer.</desc>
        <WorldMapScene targets={targets}>
        <g aria-hidden="true" pointerEvents="none">
          <path d={world.outline} fill="#f2faf7" stroke="#c8e4d8" strokeWidth="1" />
          <path d={world.graticule} fill="none" stroke="#deeee7" strokeWidth="0.7" />
          {world.countries.filter(country => !available.has(country.code)).map(country => (
            <path key={country.code} d={country.path} fill="#d1e4da" stroke="#f7fcf9" strokeWidth="0.65" fillRule="evenodd" />
          ))}
        </g>
        {mapped.map(({ destination, country, label }) => <WorldMapCountry key={destination.id} id={destination.id} name={destination.name} path={country.path} anchor={country.anchor} label={label} />)}
        </WorldMapScene>
      </svg>
      </div>
      <figcaption className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-emerald-100 px-5 py-4 text-xs leading-5 text-emerald-900 sm:px-6">
        <span className="inline-flex items-center gap-2"><span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-emerald-700" />AVES destinations</span>
        <span>Equal Earth · <a href="https://www.naturalearthdata.com/about/terms-of-use/" className="underline underline-offset-2">Natural Earth</a></span>
      </figcaption>
    </figure>
  )
}
