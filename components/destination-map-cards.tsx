/**
 * The country cards show regional maps instead of repeating the hero carousel.
 * The section stays server-rendered; each card adds its own location selector.
 * Colombia retains its original artwork outline and marker positions;
 * Australia is a public geometry snapshot of that separately deployed app.
 * NZ opens the dedicated South Island guide; other islands retain their anchors.
 */
import { destinations } from "@/content/destinations"
import HomepageCountryMapCard from "@/components/homepage-country-map-card"

const regionalMapCountries = new Set(["colombia", "australia", "new-zealand"])

export default function DestinationMapCards() {
  return <section aria-labelledby="regional-map-heading" className="mx-auto mt-14 max-w-6xl border-t border-emerald-100 pt-10">
    <h2 id="regional-map-heading" className="text-center text-2xl font-medium tracking-tight text-emerald-950">Find your place within each country</h2>
    <p className="mb-7 mt-3 text-center text-sm text-gray-600">Choose a region to explore its landscapes and birdlife.</p>
    <div className="grid items-start gap-6 md:grid-cols-3">
      {destinations.filter(country => regionalMapCountries.has(country.id)).map(country => <HomepageCountryMapCard key={country.id} country={country.id} name={country.name} href={country.href} />)}
    </div>
  </section>
}
