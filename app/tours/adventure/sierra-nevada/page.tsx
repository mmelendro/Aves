import { NavigationHeader } from "@/components/navigation-header"

export default function SierraNevadaAdventure() {
  return (
    <div>
      {/* Navigation Header */}
      <NavigationHeader currentPage="/tours/adventure/sierra-nevada" />

      <main className="container mx-auto py-12">
        <h1 className="text-4xl font-bold mb-6">Sierra Nevada Adventure</h1>
        <p className="text-gray-700 leading-relaxed">
          Embark on an unforgettable adventure through the majestic Sierra Nevada mountains. This tour offers
          breathtaking views, challenging hikes, and a chance to connect with nature.
        </p>

        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Highlights</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Explore stunning alpine lakes</li>
            <li>Hike through ancient forests</li>
            <li>Witness panoramic mountain vistas</li>
            <li>Enjoy campfire stories under the stars</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Itinerary</h2>
          <p className="text-gray-700 leading-relaxed">
            Day 1: Arrival and acclimatization hike. Day 2: Summit attempt of a prominent peak. Day 3: Exploration of a
            hidden valley. Day 4: Departure.
          </p>
        </section>
      </main>
    </div>
  )
}
