import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, User, MapPin, Thermometer, Mountain, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import AuthorBio from "@/components/author-bio"

export default function ParamoManizalesThornbillPost() {
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
            <Link href="/tours" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Tours
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-emerald-600 transition-colors">
              About
            </Link>
            <Link href="/conservation" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Conservation
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Contact
            </Link>
          </nav>
          <Button className="bg-emerald-600 hover:bg-emerald-700">Book Your Adventure</Button>
        </div>
      </header>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/blog" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>

        <div className="mb-8">
          <Badge className="bg-blue-100 text-blue-800 mb-4">High Altitude Birding</Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Fire and Ice: From Páramo Peaks to Thermal Springs and Manakin Magic
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              <Link href="/team#martin-melendro" className="hover:text-emerald-600 transition-colors">
                Martin Melendro
              </Link>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              November 8, 2024
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              Manizales & Chinchiná, Caldas
            </div>
            <span>8 min read</span>
          </div>
        </div>

        {/* Author Bio */}
        <AuthorBio />

        {/* Hero Image */}
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-12 shadow-2xl">
          <Image
            src="/images/rainbow-bearded-thornbill.jpg"
            alt="Rainbow-bearded Thornbill (Chalcostigma herrani) displaying its spectacular iridescent throat and orange-red crest in high-altitude páramo habitat"
            width={1200}
            height={675}
            className="object-cover w-full h-full"
          />
          <div className="absolute bottom-4 left-4 bg-black/70 text-white p-3 rounded-lg">
            <p className="text-sm font-medium">Rainbow-bearded Thornbill (Chalcostigma herrani)</p>
            <p className="text-xs opacity-90">High-altitude hummingbird specialist of the páramo</p>
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            An eight-day journey through Colombia's Central Andes reveals the extraordinary diversity that exists within
            a single mountain range. From the frigid páramo heights where Rainbow-bearded Thornbills defy the elements,
            through therapeutic thermal springs, to the lush cloud forests where manakins dance in the understory, this
            expedition showcases the incredible ecological transitions that make Colombia the world's most biodiverse
            country. Based from a comfortable villa with modern amenities, we explored multiple reserves around
            Manizales, each offering unique birding opportunities and conservation stories.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Eight Days in the Central Andes</h2>

          <p className="mb-6">
            Our base for this comprehensive exploration was a comfortable villa near Manizales, complete with a swimming
            pool and modern amenities that provided the perfect respite after long days in the field. This strategic
            location allowed us to explore multiple reserves and habitats within daily reach, from high-altitude páramo
            to mid-elevation cloud forests, each offering distinct birding opportunities.
          </p>

          <p className="mb-6">
            The itinerary included visits to several key locations: the páramo heights of Los Nevados National Park, the
            therapeutic waters of Termales del Ruiz, the CHEC La Esmeralda reserve, and the renowned Hacienda el Bosque
            in the Río Blanco Reserve (
            <a
              href="https://www.instagram.com/haciendaelbosque/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 hover:text-emerald-700 underline"
            >
              @haciendaelbosque
            </a>
            ). Each location contributed unique species and ecological insights to our understanding of Andean
            biodiversity.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Into the Páramo: Colombia's Sky Islands</h2>

          <p className="mb-6">
            Our expedition began before dawn, ascending the winding mountain roads toward Los Nevados National Park. As
            we climbed through successive vegetation zones—from coffee plantations through cloud forest to the
            otherworldly páramo—the temperature dropped and the landscape transformed into something almost alien. Giant
            frailejones (Espeletia) dotted the rolling hills like sentinels, their silver-woolly leaves adapted to
            intense UV radiation and dramatic temperature swings.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8 rounded-r-lg">
            <div className="flex items-start">
              <Mountain className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-blue-900 mb-2">Páramo Ecology</h3>
                <p className="text-blue-800">
                  The páramo ecosystem exists only in the high mountains of tropical South America, functioning as
                  massive water factories that capture moisture from clouds and store it in specialized vegetation.
                  These "islands in the sky" provide fresh water for over 70% of Colombia's population while harboring
                  extraordinary endemic biodiversity.
                </p>
              </div>
            </div>
          </div>

          <p className="mb-6">
            At 4,200 meters, we encountered our first Rainbow-bearded Thornbills. These remarkable hummingbirds, no
            larger than a ping-pong ball, navigate conditions that would challenge mountaineers. Their iridescent throat
            patches—ranging from emerald green to fiery orange-red—caught the early morning light like tiny stained
            glass windows as they fed on the nectar of hardy páramo flowers.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Thermal Refuge at Termales del Ruiz</h2>

          <p className="mb-6">
            After hours in the frigid páramo, our descent to{" "}
            <a
              href="https://termalesdelruiz.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 hover:text-emerald-700 underline"
            >
              Termales del Ruiz
            </a>{" "}
            felt like entering another world. These natural hot springs, heated by geothermal activity from the nearby
            Nevado del Ruiz volcano, provide a surreal contrast to the harsh mountain environment we'd just experienced.
          </p>

          <div className="bg-orange-50 border-l-4 border-orange-500 p-6 my-8 rounded-r-lg">
            <div className="flex items-start">
              <Thermometer className="w-6 h-6 text-orange-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-orange-900 mb-2">Geothermal Birding</h3>
                <p className="text-orange-800">
                  The thermal springs create unique microclimates that attract birds from various elevations. We
                  observed species typically found at lower altitudes taking advantage of the warmer conditions, while
                  high-altitude specialists like the Rainbow-bearded Thornbill used the thermal areas as energy-saving
                  refugia during cold periods.
                </p>
              </div>
            </div>
          </div>

          <p className="mb-6">
            Soaking in the 42°C mineral-rich pools while watching hummingbirds navigate the steam and mist created an
            almost mystical experience. The contrast between the icy páramo air and the warm thermal waters perfectly
            captured the extremes that define this remarkable ecosystem. Even more fascinating was observing how various
            bird species utilized these geothermal areas as thermal refugia, conserving precious energy in this
            challenging high-altitude environment.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Descent to La Esmeralda: Manakin Paradise</h2>

          <p className="mb-6">
            Our journey continued with a dramatic descent from the páramo heights to the lush cloud forests of the CHEC
            La Esmeralda reserve near Chinchiná. This transition from the harsh, open páramo to the misty, moss-draped
            cloud forest represents one of the most dramatic ecological gradients on Earth, compressed into just a few
            kilometers of elevation change.
          </p>

          <div className="relative aspect-[4/3] rounded-lg overflow-hidden my-8 shadow-lg">
            <Image
              src="/images/la-esmeralda-exterior.jpg"
              alt="CHEC La Esmeralda reserve eco-lodge nestled in pristine cloud forest near Chinchiná"
              width={600}
              height={450}
              className="object-cover w-full h-full"
            />
            <div className="absolute bottom-4 left-4 bg-black/70 text-white p-3 rounded-lg">
              <p className="text-sm font-medium">CHEC La Esmeralda Reserve</p>
              <p className="text-xs opacity-90">Eco-lodge in pristine cloud forest habitat</p>
            </div>
          </div>

          <p className="mb-6">
            La Esmeralda represents conservation success through corporate responsibility. CHEC (Central Hidroeléctrica
            de Caldas) has protected this pristine cloud forest as part of their watershed conservation program,
            creating a sanctuary where some of Colombia's most spectacular endemic birds thrive in undisturbed habitat.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">The Two-Hour Manakin Challenge</h2>

          <p className="mb-6">
            Our local guides at La Esmeralda had made a bold promise: they would show us three different manakin species
            within two hours. Given the secretive nature of these forest understory specialists, this seemed optimistic.
            However, their intimate knowledge of the forest and years of experience tracking these elusive birds proved
            invaluable.
          </p>

          <div className="grid md:grid-cols-2 gap-8 my-8">
            <div>
              <Image
                src="/images/la-esmeralda-interior-1.jpg"
                alt="Comfortable interior of La Esmeralda eco-lodge with wooden construction and forest views"
                width={400}
                height={300}
                className="rounded-lg shadow-lg object-cover w-full h-64"
              />
              <p className="text-sm text-gray-600 mt-2 italic">Comfortable accommodations at La Esmeralda</p>
            </div>
            <div className="flex flex-col justify-center">
              <p className="mb-4">
                The lodge itself exemplifies sustainable ecotourism design. Built entirely from locally sourced
                materials and powered by renewable energy, it provides comfortable accommodations while maintaining
                minimal environmental impact. Large windows offer panoramic views of the surrounding cloud forest,
                allowing guests to bird-watch from the comfort of the lodge.
              </p>
            </div>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-6 my-8 rounded-r-lg">
            <div className="flex items-start">
              <Clock className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-green-900 mb-2">The Manakin Challenge</h3>
                <p className="text-green-800">
                  Our expert local guides used a combination of playback calls, knowledge of fruiting trees, and
                  understanding of manakin behavior patterns to locate three species in rapid succession. Their
                  expertise transformed what could have been hours of fruitless searching into a masterclass in tropical
                  bird ecology.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Three Manakins in Two Hours</h2>

          <p className="mb-6">
            The guides' confidence proved well-founded. Within the first hour, we had located all three target species,
            each occupying a different niche within the cloud forest ecosystem. The experience showcased not only the
            incredible biodiversity of La Esmeralda but also the deep ecological knowledge of our local guides.
          </p>

          <div className="grid md:grid-cols-3 gap-6 my-8">
            <div className="text-center">
              <Image
                src="/images/manakin-1.jpg"
                alt="Wire-tailed Manakin performing courtship display in cloud forest understory at La Esmeralda"
                width={300}
                height={200}
                className="rounded-lg shadow-lg object-contain w-full h-48 bg-gray-50 mb-3"
              />
              <p className="text-sm font-medium text-gray-900">Wire-tailed Manakin</p>
              <p className="text-xs text-gray-600">
                <a
                  href="https://ebird.org/species/witman2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:text-emerald-700"
                >
                  Pipra filicauda - View on eBird
                </a>
              </p>
            </div>
            <div className="text-center">
              <Image
                src="/images/manakin-2.jpg"
                alt="Golden-winged Manakin displaying brilliant yellow wing patches in La Esmeralda cloud forest"
                width={300}
                height={200}
                className="rounded-lg shadow-lg object-contain w-full h-48 bg-gray-50 mb-3"
              />
              <p className="text-sm font-medium text-gray-900">Golden-winged Manakin</p>
              <p className="text-xs text-gray-600">
                <a
                  href="https://ebird.org/species/gowman1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:text-emerald-700"
                >
                  Masius chrysopterus - View on eBird
                </a>
              </p>
            </div>
            <div className="text-center">
              <Image
                src="/images/manakin-3.jpg"
                alt="Orange-collared Manakin showing distinctive orange collar in cloud forest habitat"
                width={300}
                height={200}
                className="rounded-lg shadow-lg object-contain w-full h-48 bg-gray-50 mb-3"
              />
              <p className="text-sm font-medium text-gray-900">Orange-collared Manakin</p>
              <p className="text-xs text-gray-600">
                <a
                  href="https://ebird.org/species/orcman1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:text-emerald-700"
                >
                  Manacus aurantiacus - View on eBird
                </a>
              </p>
            </div>
          </div>

          <p className="mb-6">
            Each species demonstrated unique adaptations to cloud forest life. The Wire-tailed Manakin, with its
            distinctive elongated tail feathers, performed acrobatic displays in the forest understory. The
            Golden-winged Manakin, endemic to the Colombian Andes, flashed its brilliant yellow wing patches as it moved
            through the canopy. The Orange-collared Manakin, perhaps the most spectacular of the three, displayed its
            vibrant orange collar against the misty green backdrop of the cloud forest.
          </p>

          <div className="relative aspect-[4/3] rounded-lg overflow-hidden my-8 shadow-lg">
            <Image
              src="/images/la-esmeralda-group.jpg"
              alt="Successful birding group with local guides at CHEC La Esmeralda reserve after observing three manakin species"
              width={600}
              height={450}
              className="object-cover w-full h-full"
            />
            <div className="absolute bottom-4 left-4 bg-black/70 text-white p-3 rounded-lg">
              <p className="text-sm font-medium">Mission Accomplished</p>
              <p className="text-xs opacity-90">Celebrating three manakin species in two hours</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            Hacienda el Bosque: A Conservation Success Story
          </h2>

          <p className="mb-6">
            One of the expedition highlights was our visit to Hacienda el Bosque in the Río Blanco Reserve, a pioneering
            ecotourism operation that has protected critical cloud forest habitat for over three decades. This
            family-run reserve demonstrates how private conservation initiatives can create sustainable models for both
            biodiversity protection and community development.
          </p>

          <p className="mb-6">
            The hacienda's strategic location in the Río Blanco watershed provides access to pristine cloud forest where
            endemic species thrive alongside Neotropical migrants. The property's commitment to conservation extends
            beyond bird protection to include watershed management, sustainable agriculture practices, and environmental
            education programs for local communities.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Conservation Through Ecotourism</h2>

          <p className="mb-6">
            Our experience at La Esmeralda exemplifies how responsible ecotourism can support conservation. CHEC's
            investment in protecting this cloud forest habitat, combined with their commitment to sustainable tourism
            practices, creates a model for corporate environmental responsibility that benefits both biodiversity and
            local communities.
          </p>

          <div className="grid md:grid-cols-2 gap-8 my-8">
            <div className="flex flex-col justify-center">
              <p className="mb-4">
                The reserve's success in maintaining pristine habitat while providing sustainable livelihoods for local
                guides demonstrates the potential for conservation and economic development to work hand in hand. The
                guides' expertise, developed through years of intimate forest knowledge, represents an invaluable
                resource for both conservation research and ecotourism.
              </p>
            </div>
            <div>
              <Image
                src="/images/la-esmeralda-interior-2.jpg"
                alt="Open-plan interior of La Esmeralda lodge showing sustainable design and forest integration"
                width={400}
                height={300}
                className="rounded-lg shadow-lg object-cover w-full h-64"
              />
              <p className="text-sm text-gray-600 mt-2 italic">Sustainable design integrates with forest environment</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">From Extremes to Abundance</h2>

          <p className="mb-6">
            This expedition perfectly captured the incredible diversity of Colombian ecosystems within a single day's
            journey. From the harsh, wind-swept páramo where Rainbow-bearded Thornbills defy the elements, through the
            therapeutic warmth of geothermal springs, to the lush abundance of cloud forest manakin habitat, we
            experienced the full spectrum of montane tropical ecology.
          </p>

          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 my-8 rounded-r-lg">
            <h3 className="font-bold text-emerald-900 mb-2">Species Highlights</h3>
            <ul className="text-emerald-800 space-y-1">
              <li>
                • <strong>Rainbow-bearded Thornbill</strong> (<em>Chalcostigma herrani</em>) -{" "}
                <a
                  href="https://ebird.org/species/rabtho1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:text-emerald-700"
                >
                  Páramo specialist
                </a>
              </li>
              <li>
                • <strong>Wire-tailed Manakin</strong> (<em>Pipra filicauda</em>) -{" "}
                <a
                  href="https://ebird.org/species/witman2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:text-emerald-700"
                >
                  Cloud forest understory
                </a>
              </li>
              <li>
                • <strong>Golden-winged Manakin</strong> (<em>Masius chrysopterus</em>) -{" "}
                <a
                  href="https://ebird.org/species/gowman1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:text-emerald-700"
                >
                  Colombian endemic
                </a>
              </li>
              <li>
                • <strong>Orange-collared Manakin</strong> (<em>Manacus aurantiacus</em>) -{" "}
                <a
                  href="https://ebird.org/species/orcman1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:text-emerald-700"
                >
                  Montane specialist
                </a>
              </li>
            </ul>
          </div>

          <p className="mb-8">
            As we departed La Esmeralda, the contrast between our morning in the frigid páramo and afternoon in the
            warm, humid cloud forest seemed almost impossible. Yet this dramatic ecological transition, compressed into
            just a few hours of travel, perfectly encapsulates what makes Colombia the world's most biodiverse country.
            From the ultimate high-altitude specialists to the exuberant diversity of tropical forests, every elevation
            tells a different story of adaptation and survival.
          </p>

          <div className="border-t border-gray-200 pt-8 mt-12">
            <p className="text-sm text-gray-600 italic">
              This expedition was conducted in partnership with CHEC and Termales del Ruiz. Special thanks to the expert
              local guides at La Esmeralda whose knowledge and dedication made the manakin observations possible, and to
              the staff at Termales del Ruiz for their hospitality and commitment to sustainable tourism.
            </p>
          </div>
        </div>

        {/* Blog Post Metadata */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-2">Blog Post Metadata</h2>
          <p>
            <strong>Author:</strong> John Doe
          </p>
          <p>
            <strong>Date:</strong> <span>April 8, 2025</span>
          </p>
          <p>
            <strong>Category:</strong> Nature, Conservation
          </p>
        </div>

        {/* Related Links */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Experience High-Altitude Birding</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href="/tours/adventure"
              className="block p-6 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <h4 className="font-bold text-blue-900 mb-2">Páramo Expeditions</h4>
              <p className="text-blue-800">Discover high-altitude specialists in Colombia's unique páramo ecosystem</p>
            </Link>
            <Link
              href="/tours/elevate"
              className="block p-6 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
            >
              <h4 className="font-bold text-orange-900 mb-2">Thermal Springs & Cloud Forest</h4>
              <p className="text-orange-800">Combine birding with relaxation and manakin magic</p>
            </Link>
          </div>
        </div>
      </article>

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
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer">
                  <span className="text-sm">f</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer">
                  <span className="text-sm">ig</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer">
                  <span className="text-sm">tw</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Tours</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/tours/adventure" className="hover:text-white transition-colors">
                    AVES Adventure
                  </Link>
                </li>
                <li>
                  <Link href="/tours/vision" className="hover:text-white transition-colors">
                    AVES Vision
                  </Link>
                </li>
                <li>
                  <Link href="/tours/elevate" className="hover:text-white transition-colors">
                    AVES Elevate
                  </Link>
                </li>
                <li>
                  <Link href="/tours/souls" className="hover:text-white transition-colors">
                    AVES Souls
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#about" className="hover:text-white transition-colors">
                    🦅 About AVES
                  </Link>
                </li>
                <li>
                  <Link href="#conservation" className="hover:text-white transition-colors">
                    🌱 Conservation
                  </Link>
                </li>
                <li>
                  <Link href="/#conservation" className="hover:text-white transition-colors flex items-center group">
                    <span className="mr-1">🌱</span>B Corp Journey & Sustainability
                    <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">↑</span>
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    📝 Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    🐦 Bird Guide
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    ✈️ Travel Tips
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    📞 Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2025 AVES. All rights reserved.</p>
            <div className="flex space-x-6 text-sm text-gray-400 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-white transition-colors">
                🔒 Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                📋 Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-white transition-colors">
                🍪 Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
