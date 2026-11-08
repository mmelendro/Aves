/**
 * The homepage's geographic entry point. This is a server component: country
 * links work before JavaScript loads, without a map service, key or cookies.
 * Geometry is preprojected; optional catalogue metadata chooses which countries
 * AVES currently offers. Neutral land is context, not an available destination.
 */
import { destinations } from "@/content/destinations"
import world from "@/content/world-map.json"
import styles from "./world-destination-map.module.css"

export default function WorldDestinationMap() {
  const mapped = destinations.flatMap(destination => {
    const country = world.countries.find(country => country.code === destination.worldMap?.countryCode)
    return country && destination.worldMap ? [{ destination, country, label: destination.worldMap }] : []
  })
  const available = new Set(mapped.map(({ country }) => country.code))

  return (
    <figure aria-labelledby="world-map-heading" className="min-w-0 overflow-hidden rounded-3xl border border-emerald-200/80 bg-white/90 shadow-sm">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-5 pt-5 sm:px-6">
        <h2 id="world-map-heading" className="text-lg font-medium text-emerald-950">Find your next destination</h2>
        <p className="text-xs text-emerald-800">Choose a highlighted country</p>
      </div>
      {/* A group, rather than role=img, keeps the three SVG links accessible. */}
      <svg viewBox={world.viewBox} role="group" aria-labelledby="world-map-title world-map-description" className="block h-auto w-full" preserveAspectRatio="xMidYMid meet">
        <title id="world-map-title">AVES destinations on an Equal Earth world map</title>
        <desc id="world-map-description">Choose Colombia, Australia or New Zealand. New Zealand is in development, with a private trip-planning beta. Other countries provide geographic context. The same destination links are also available beside the map.</desc>
        <g aria-hidden="true" pointerEvents="none">
          <path d={world.outline} fill="#f2faf7" stroke="#c8e4d8" strokeWidth="1" />
          <path d={world.graticule} fill="none" stroke="#deeee7" strokeWidth="0.7" />
          {world.countries.filter(country => !available.has(country.code)).map(country => (
            <path key={country.code} d={country.path} fill="#d1e4da" stroke="#f7fcf9" strokeWidth="0.65" fillRule="evenodd" />
          ))}
        </g>
        {mapped.map(({ destination, country, label }) => (
          // Native anchors cross the separately deployed Australian app safely.
          <a key={destination.id} href={destination.href} aria-label={`Explore ${destination.name}${destination.status ? " — in development, planning beta" : ""}`} className={styles.destination}>
            <path d={country.path} className={styles.country} strokeWidth="1.5" fillRule="evenodd" />
            <path d={`M${country.anchor.join(",")}L${label.x + label.width / 2},${label.y}`} className={styles.leader} fill="none" strokeWidth="2" />
            <circle cx={country.anchor[0]} cy={country.anchor[1]} r="6" fill="white" stroke="#047857" strokeWidth="3" />
            <rect x={label.x} y={label.y} width={label.width} height="74" rx="22" className={styles.label} strokeWidth="2" />
            <text x={label.x + label.width / 2} y={label.y + 45} textAnchor="middle" fontSize="29" fontWeight="600" className={styles.text}>{destination.name}</text>
          </a>
        ))}
      </svg>
      <figcaption className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-emerald-100 px-5 py-4 text-xs leading-5 text-emerald-900 sm:px-6">
        <span className="inline-flex items-center gap-2"><span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-emerald-700" />AVES destinations · New Zealand in development</span>
        <span>Equal Earth · <a href="https://www.naturalearthdata.com/about/terms-of-use/" className="underline underline-offset-2">Natural Earth</a></span>
      </figcaption>
    </figure>
  )
}
