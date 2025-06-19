import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, CheckCircle, Clock, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function SierraNevadaTourPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/">
              <Image
                src="/images/aves-logo.png"
                alt="AVES Birdwatching Tours Logo"
                width={50}
                height={50}
                className="object-contain"
              />
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/tours" className="text-emerald-600 font-medium">
              Tours
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-emerald-600 transition-colors">
              About
            </Link>
            <Link href="/about/b-corp" className="text-gray-700 hover:text-emerald-600 transition-colors">
              B Corp Journey
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Blog
            </Link>
            <Link href="/conservation" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Conservation
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Contact
            </Link>
          </nav>
          <Button className="bg-emerald-600 hover:bg-emerald-700">Book Your Journey</Button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <Image
          src="/images/cardinal-guajiro.jpg"
          alt="Sierra Nevada de Santa Marta landscape with endemic birds"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <Badge className="bg-emerald-500 text-white mb-4">AVES Adventure Tour</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl">
              Sierra Nevada Indigenous Birding Experience
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              An 8-day immersive journey through Colombia's most biodiverse mountain range with expert indigenous guides
            </p>
          </div>
        </div>
      </div>

      {/* Tour Overview */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-2/3">
              <div className="prose prose-lg max-w-none">
                <h2>Tour Overview</h2>
                <p>
                  Experience the world's highest coastal mountain range through the eyes of those who know it best - the
                  indigenous Kogi and Wayuu peoples who have called these mountains home for centuries. This carefully
                  crafted 8-day itinerary takes you from misty cloud forests to coastal scrublands, with expert local
                  guides revealing both the incredible biodiversity and rich cultural heritage of the region.
                </p>
                <p>
                  The Sierra Nevada de Santa Marta is a UNESCO Biosphere Reserve and one of the most important endemism
                  centers in the world. With over 600 bird species, including 19 endemics found nowhere else on Earth,
                  this mountain range offers unparalleled birding opportunities in a variety of ecosystems.
                </p>

                <h3>Highlights</h3>
                <ul>
                  <li>Search for 19 endemic bird species with expert local guides</li>
                  <li>Experience meaningful cultural exchange with Kogi and Wayuu communities</li>
                  <li>Explore five distinct ecosystems from cloud forest to coastal scrubland</li>
                  <li>Support indigenous-led conservation initiatives</li>
                  <li>Small group size (maximum 4 participants) for minimal impact</li>
                </ul>

                <div className="bg-emerald-50 p-6 rounded-lg my-8">
                  <h3 className="text-emerald-800">Read About This Experience</h3>
                  <p>
                    Explore our detailed blog post about this exact itinerary, written by our lead guide Martin
                    Melendro:
                  </p>
                  <Link
                    href="/blog/sierra-nevada-indigenous-birding"
                    className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    Read: Guardians of the Sky - Birding with the Kogi and Wayuu →
                  </Link>
                </div>
              </div>
            </div>

            <div className="md:w-1/3">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Tour Details</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Calendar className="w-5 h-5 text-emerald-600 mt-1 mr-3" />
                    <div>
                      <p className="font-medium">Duration</p>
                      <p className="text-gray-600">8 days, 7 nights</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Users className="w-5 h-5 text-emerald-600 mt-1 mr-3" />
                    <div>
                      <p className="font-medium">Group Size</p>
                      <p className="text-gray-600">Maximum 4 participants</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-emerald-600 mt-1 mr-3" />
                    <div>
                      <p className="font-medium">Locations</p>
                      <p className="text-gray-600">El Dorado, Minca, Tayrona, Riohacha</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="w-5 h-5 text-emerald-600 mt-1 mr-3" />
                    <div>
                      <p className="font-medium">Best Time</p>
                      <p className="text-gray-600">January-April, September-December</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-end mb-2">
                    <p className="text-gray-600">Starting from</p>
                    <p className="text-3xl font-bold text-emerald-600">$8,000</p>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">per person, based on double occupancy</p>
                  <Link href="/shopping?preset=sierra-nevada">
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Book This Journey</Button>
                  </Link>
                  <Button variant="outline" className="w-full mt-3">
                    Request Custom Dates
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Day by Day Itinerary */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Day by Day Itinerary</h2>

          <div className="space-y-6">
            {/* Day 1-3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 relative">
                  <Image
                    src="/images/blue-crowned-motmot-new.jpg"
                    alt="El Dorado Reserve cloud forest"
                    width={400}
                    height={300}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6 md:w-2/3">
                  <Badge className="bg-emerald-100 text-emerald-800 mb-2">Days 1-3</Badge>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">El Dorado Cloud Forest Immersion</h3>
                  <p className="text-gray-600 mb-4">
                    Our expedition begins with three full days in the misty cloud forests of El Dorado Reserve, where
                    David's intimate knowledge of the endemic species proves invaluable. The extended stay allows us to
                    explore different trail systems at various times of day, maximizing our chances with the region's
                    most elusive endemics.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 mr-2 flex-shrink-0" />
                      <p className="text-gray-700">Day 1: Arrival and introduction to cloud forest birding</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 mr-2 flex-shrink-0" />
                      <p className="text-gray-700">Day 2: Full day exploring remote trails for endemic species</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 mr-2 flex-shrink-0" />
                      <p className="text-gray-700">Day 3: Flexible day for photography and return visits</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Day 4-5 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 relative">
                  <Image
                    src="/images/green-honeycreeper-blue.jpg"
                    alt="Minca transitional forests"
                    width={400}
                    height={300}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6 md:w-2/3">
                  <Badge className="bg-emerald-100 text-emerald-800 mb-2">Days 4-5</Badge>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Minca Transitional Zone Deep Dive</h3>
                  <p className="text-gray-600 mb-4">
                    Our two days in Minca allow for thorough exploration of the transitional zone between cloud forest
                    and dry forest. This ecological gradient creates unique birding opportunities as species from
                    different elevations overlap in this remarkable area.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 mr-2 flex-shrink-0" />
                      <p className="text-gray-700">
                        Day 4: Higher elevation trails exploring cloud forest and mid-elevation species
                      </p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 mr-2 flex-shrink-0" />
                      <p className="text-gray-700">Day 5: Lower elevation trails and different habitat types</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Day 6-7 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 relative">
                  <Image
                    src="/images/martin-melendro.jpg"
                    alt="Tayrona National Park and Kogi cultural exchange"
                    width={400}
                    height={300}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6 md:w-2/3">
                  <Badge className="bg-emerald-100 text-emerald-800 mb-2">Days 6-7</Badge>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Tayrona National Park & Kogi Cultural Exchange
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Two full days with Dagoberto in Tayrona's diverse habitats provide unparalleled access to this
                    complex ecosystem. The extended time allows for both intensive birding and meaningful cultural
                    exchange with the Kogi people.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 mr-2 flex-shrink-0" />
                      <p className="text-gray-700">Day 6: Coastal forests and specialized avifauna</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 mr-2 flex-shrink-0" />
                      <p className="text-gray-700">
                        Day 7: Inland valleys, higher elevations, and Kogi cultural exchange
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Day 8 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 relative">
                  <Image
                    src="/images/cardinal-guajiro.jpg"
                    alt="Riohacha coastal scrublands"
                    width={400}
                    height={300}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6 md:w-2/3">
                  <Badge className="bg-emerald-100 text-emerald-800 mb-2">Day 8</Badge>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Riohacha - Cardinal Guajiro Finale</h3>
                  <p className="text-gray-600 mb-4">
                    Our final day brings us to the coastal scrublands around Riohacha, where Yeferson's ancestral
                    knowledge of the Wayuu territory proves essential for finding the endemic Vermilion Cardinal
                    (Cardinal Guajiro).
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 mr-2 flex-shrink-0" />
                      <p className="text-gray-700">Morning search for the Vermilion Cardinal in Wayuu territory</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 mr-2 flex-shrink-0" />
                      <p className="text-gray-700">Cultural exchange with Wayuu community</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 mr-2 flex-shrink-0" />
                      <p className="text-gray-700">Departure or extension options</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-emerald-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-emerald-800 mb-4">Customization Options</h3>
            <p className="text-gray-700 mb-4">
              This 8-day structure provides the perfect balance of depth and flexibility. We can adapt the daily
              schedule based on:
            </p>
            <ul className="grid md:grid-cols-2 gap-x-6 gap-y-2">
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-emerald-600 mr-2 flex-shrink-0" />
                <span>Weather conditions</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-emerald-600 mr-2 flex-shrink-0" />
                <span>Group interests and target species</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-emerald-600 mr-2 flex-shrink-0" />
                <span>Bird activity patterns</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-emerald-600 mr-2 flex-shrink-0" />
                <span>Photography priorities</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-emerald-600 mr-2 flex-shrink-0" />
                <span>Cultural experience preferences</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-emerald-600 mr-2 flex-shrink-0" />
                <span>Physical activity levels</span>
              </li>
            </ul>
            <div className="mt-6">
              <Link href="/contact">
                <Button variant="outline" className="bg-white">
                  Discuss Customization Options
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Target Species */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Target Species</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-bold text-emerald-800 mb-2">Endemic Species</h3>
              <ul className="space-y-1 text-gray-700">
                <li>• Santa Marta Parakeet (Pyrrhura viridicata)</li>
                <li>• Santa Marta Warbler (Myiothlypis basilica)</li>
                <li>• Santa Marta Woodstar (Chaetocercus astreans)</li>
                <li>• Santa Marta Antpitta (Grallaria bangsi)</li>
                <li>• White-tailed Starfrontlet (Coeligena phalerata)</li>
                <li>• Vermilion Cardinal (Cardinalis phoeniceus)</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-bold text-emerald-800 mb-2">Near-Endemic Species</h3>
              <ul className="space-y-1 text-gray-700">
                <li>• Blue-naped Chlorophonia (Chlorophonia cyanea)</li>
                <li>• Golden-winged Sparrow (Arremon schlegeli)</li>
                <li>• Black-fronted Wood-Quail (Odontophorus atrifrons)</li>
                <li>• Rosy Thrush-Tanager (Rhodinocichla rosea)</li>
                <li>• Black-backed Antshrike (Thamnophilus melanonotus)</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-bold text-emerald-800 mb-2">Highlight Species</h3>
              <ul className="space-y-1 text-gray-700">
                <li>• Blue-billed Curassow (Crax alberti)</li>
                <li>• Emerald Toucanet (Aulacorhynchus prasinus)</li>
                <li>• Green Honeycreeper (Chlorophanes spiza)</li>
                <li>• Keel-billed Toucan (Ramphastos sulfuratus)</li>
                <li>• Masked Trogon (Trogon personatus)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Accommodations */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Accommodations</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48">
                <Image src="/images/la-esmeralda-exterior.jpg" alt="El Dorado Lodge" fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900">El Dorado Lodge</h3>
                <p className="text-gray-600 text-sm">Days 1-3: Cloud forest eco-lodge</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48">
                <Image src="/images/la-esmeralda-interior-1.jpg" alt="Minca Eco-Hotel" fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900">Minca Eco-Hotel</h3>
                <p className="text-gray-600 text-sm">Days 4-5: Boutique hotel in transitional forest</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="/images/la-esmeralda-interior-2.jpg"
                  alt="Tayrona Eco-Lodge"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900">Tayrona Eco-Lodge</h3>
                <p className="text-gray-600 text-sm">Days 6-7: Sustainable lodge near national park</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="/images/la-esmeralda-group.jpg"
                  alt="Riohacha Boutique Hotel"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900">Riohacha Boutique Hotel</h3>
                <p className="text-gray-600 text-sm">Day 8: Comfortable hotel in coastal town</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Experience the Sierra Nevada?</h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join us on this unforgettable 8-day journey through Colombia's most biodiverse mountain range with expert
            indigenous guides.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shopping?preset=sierra-nevada">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100">
                Book This Journey
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-emerald-600"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Image
                  src="/images/aves-logo.png"
                  alt="AVES Birdwatching Tours Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <p className="text-gray-400 mb-4">
                Premium birding tours in Colombia, committed to conservation and sustainable tourism.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Tours</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/tours/adventure" className="hover:text-white transition-colors">
                    🍃 AVES Adventure
                  </Link>
                </li>
                <li>
                  <Link href="/tours/vision" className="hover:text-white transition-colors">
                    🪶 AVES Vision
                  </Link>
                </li>
                <li>
                  <Link href="/tours/elevate" className="hover:text-white transition-colors">
                    🌼 AVES Elevate
                  </Link>
                </li>
                <li>
                  <Link href="/tours/souls" className="hover:text-white transition-colors">
                    🍓 AVES Souls
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About AVES
                  </Link>
                </li>
                <li>
                  <Link href="/conservation" className="hover:text-white transition-colors">
                    Conservation
                  </Link>
                </li>
                <li>
                  <Link href="/about/b-corp" className="hover:text-white transition-colors">
                    B Corp Journey
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Bird Guide
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Travel Tips
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" className="hover:text-white transition-colors">
                    📞 Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400 text-sm">© 2025 AVES. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
