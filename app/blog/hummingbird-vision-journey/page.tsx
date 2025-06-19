"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, MapPin, Menu, X, ChevronDown, Camera, Heart, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { AuthorBio } from "@/components/author-bio"

export default function HummingbirdVisionJourneyPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const hummingbirdSpecies = [
    {
      image: "/images/rainbow-bearded-thornbill-vision.jpg",
      commonName: "Rainbow-bearded Thornbill",
      scientificName: "Chalcostigma herrani",
      spanishName: "Colibrí Barbirrojo",
      location: "Chingaza National Park",
      elevation: "3,200m",
      ebirdUrl: "https://ebird.org/species/rabth1",
    },
    {
      image: "/images/violet-tailed-sylph.jpg",
      commonName: "Violet-tailed Sylph",
      scientificName: "Aglaiocercus coelestis",
      spanishName: "Silfo Colivioleta",
      location: "Tatamá National Park",
      elevation: "2,400m",
      ebirdUrl: "https://ebird.org/species/vitsy1",
    },
    {
      image: "/images/collared-inca.jpg",
      commonName: "Collared Inca",
      scientificName: "Coeligena torquata",
      spanishName: "Inca Acollarado",
      location: "Jardín, Antioquia",
      elevation: "1,800m",
      ebirdUrl: "https://ebird.org/species/colin1",
    },
    {
      image: "/images/long-tailed-sylph.jpg",
      commonName: "Long-tailed Sylph",
      scientificName: "Aglaiocercus kingii",
      spanishName: "Silfo Colilargo",
      location: "Eastern Cordillera",
      elevation: "2,100m",
      ebirdUrl: "https://ebird.org/species/lotsy1",
    },
  ]

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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Tours Dropdown */}
            <div className="relative group">
              <button className="flex items-center text-gray-700 hover:text-emerald-600 transition-colors">
                Tours
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link
                  href="/tours"
                  className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors border-b"
                >
                  All Tours Overview
                </Link>
                <Link
                  href="/tours/adventure"
                  className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                >
                  🍃 AVES Adventure
                </Link>
                <Link
                  href="/tours/vision"
                  className="block px-4 py-3 text-purple-600 hover:text-purple-700 hover:bg-purple-50 transition-colors font-medium"
                >
                  🪶 AVES Vision
                </Link>
                <Link
                  href="/tours/elevate"
                  className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                >
                  🌼 AVES Elevate
                </Link>
                <Link
                  href="/tours/souls"
                  className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                >
                  🍓 AVES Souls
                </Link>
              </div>
            </div>
            {/* About Dropdown */}
            <div className="relative group">
              <button className="flex items-center text-gray-700 hover:text-emerald-600 transition-colors">
                About
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link
                  href="/about"
                  className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                >
                  About AVES
                </Link>
                <Link
                  href="/team"
                  className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                >
                  Our Team
                </Link>
              </div>
            </div>
            <Link href="/about/b-corp" className="text-gray-700 hover:text-emerald-600 transition-colors">
              B Corp Journey
            </Link>
            <Link href="/blog" className="text-emerald-600 font-semibold">
              Blog
            </Link>
            <Link href="/conservation" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Conservation
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <Link href="/shopping">
            <Button className="hidden md:block bg-emerald-600 hover:bg-emerald-700">Book Your Journey</Button>
          </Link>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <nav className="container mx-auto px-4 py-4 space-y-4">
              <div className="py-2">
                <div className="text-gray-700 font-medium py-2">Tours</div>
                <div className="pl-4 space-y-2">
                  <Link
                    href="/tours"
                    className="block text-gray-600 hover:text-emerald-600 transition-colors py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    All Tours Overview
                  </Link>
                  <Link
                    href="/tours/adventure"
                    className="block text-gray-600 hover:text-emerald-600 transition-colors py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    🍃 AVES Adventure
                  </Link>
                  <Link
                    href="/tours/vision"
                    className="block text-purple-600 hover:text-purple-700 transition-colors py-1 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    🪶 AVES Vision
                  </Link>
                  <Link
                    href="/tours/elevate"
                    className="block text-gray-600 hover:text-emerald-600 transition-colors py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    🌼 AVES Elevate
                  </Link>
                  <Link
                    href="/tours/souls"
                    className="block text-gray-600 hover:text-emerald-600 transition-colors py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    🍓 AVES Souls
                  </Link>
                </div>
              </div>
              <div className="py-2">
                <div className="text-gray-700 font-medium py-2">About</div>
                <div className="pl-4 space-y-2">
                  <Link
                    href="/about"
                    className="block text-gray-600 hover:text-emerald-600 transition-colors py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About AVES
                  </Link>
                  <Link
                    href="/team"
                    className="block text-gray-600 hover:text-emerald-600 transition-colors py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Our Team
                  </Link>
                </div>
              </div>
              <Link
                href="/about/b-corp"
                className="block text-gray-700 hover:text-emerald-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                B Corp Journey
              </Link>
              <Link
                href="/blog"
                className="block text-emerald-600 font-semibold py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/conservation"
                className="block text-gray-700 hover:text-emerald-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Conservation
              </Link>
              <Link
                href="/contact"
                className="block text-gray-700 hover:text-emerald-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-4">
                <Link href="/shopping">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 mt-4">Book Your Journey</Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-purple-50 via-indigo-50 to-emerald-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-emerald-600/5" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-purple-100 text-purple-800 mb-6 text-sm px-4 py-2">
              Vision Photography Series • Part IV
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Jewels of the Andes: A Vision Journey Through Colombia's Hummingbird Sanctuaries
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              In the sacred heights of Colombia's three Andean cordilleras, where mist meets mountain and time seems to
              pause, we embark on a spiritual pilgrimage to witness nature's most exquisite aerial dancers—the
              hummingbirds.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-gray-600 mb-8">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                <Link href="/team#martin-melendro" className="hover:text-purple-600 transition-colors">
                  Martin Melendro
                </Link>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                June 12, 2025
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Three Andean Cordilleras
              </div>
              <div className="flex items-center">
                <Camera className="w-5 h-5 mr-2" />
                12 min read
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tours/vision">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg">
                  <Eye className="w-5 h-5 mr-2" />
                  Begin Your Vision Journey
                </Button>
              </Link>
              <Link href="/shopping?preset=vision-hummingbird">
                <Button
                  variant="outline"
                  className="border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-3 text-lg"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Photography Expedition
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Opening */}
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-xl leading-relaxed text-gray-700 mb-8">
                There exists a realm where the physical and spiritual converge—where the beating of wings creates a
                meditation, where iridescent feathers catch light like fragments of heaven, and where the simple act of
                witnessing becomes a form of prayer. This is the world of Colombia's hummingbirds, and this is our final
                chapter in the Vision series: a journey that transcends photography to become a pilgrimage of the soul.
              </p>

              <p className="text-lg leading-relaxed text-gray-700 mb-8">
                Over eight transformative days, we traverse Colombia's three magnificent Andean cordilleras—each a
                cathedral of biodiversity, each home to species found nowhere else on Earth. From the mystical páramos
                of Chingaza to the cloud forests of Jardín, from the endemic sanctuaries of Tatamá to the hidden valleys
                where ancient wisdom still flows, we seek not just photographs, but moments of profound connection with
                these aerial angels.
              </p>
            </div>

            {/* Featured Image */}
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-12 shadow-2xl">
              <Image
                src="/images/rainbow-bearded-thornbill-vision.jpg"
                alt="Rainbow-bearded Thornbill displaying its spectacular fiery throat in high-altitude páramo habitat"
                width={1200}
                height={675}
                className="object-cover w-full h-full"
                style={{ objectPosition: "center 30%" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Rainbow-bearded Thornbill</h3>
                <p className="text-lg opacity-90">Chalcostigma herrani • Colibrí Barbirrojo</p>
                <p className="text-sm opacity-75">Chingaza National Park, 3,200m elevation</p>
              </div>
            </div>

            {/* The Sacred Geography */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                <Heart className="w-8 h-8 mr-3 text-purple-600" />
                The Sacred Geography of Vision
              </h2>

              <div className="prose prose-lg max-w-none mb-8">
                <p className="text-lg leading-relaxed text-gray-700 mb-6">
                  Our Vision Journey unfolds across three sacred landscapes, each offering its own revelation, its own
                  teaching about the delicate balance between patience and presence that defines both hummingbird
                  photography and spiritual practice.
                </p>
              </div>

              {/* Chingaza Section */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Chingaza: Temple of the Páramo</h3>
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      At 3,200 meters above sea level, Chingaza National Park exists in a realm between earth and sky.
                      Here, in the high-altitude páramo ecosystem, we encounter the Rainbow-bearded Thornbill—a species
                      so perfectly adapted to these harsh conditions that it seems to embody the very spirit of
                      resilience.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      In the pre-dawn cold, as mist rises from ancient lakes and the first light touches the
                      frailejones, we practice the art of stillness. The thornbill's fiery throat patch—a burst of
                      orange and red against the muted páramo palette—becomes our meditation object, teaching us about
                      finding warmth and beauty in the most austere environments.
                    </p>
                    <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Scientific Name:</strong> Chalcostigma herrani
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Spanish Name:</strong> Colibrí Barbirrojo
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Elevation:</strong> 3,000-4,000m
                      </p>
                      <Link
                        href="https://ebird.org/species/rabth1"
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        View on eBird →
                      </Link>
                    </div>
                  </div>
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src="/images/copper-rumped-hummingbird.jpg"
                      alt="Copper-rumped Hummingbird showing brilliant golden-green iridescence in páramo habitat"
                      width={600}
                      height={450}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>

              {/* Jardín Section */}
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-8 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Jardín: Garden of Earthly Delights</h3>
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src="/images/collared-inca.jpg"
                      alt="Collared Inca displaying its distinctive black and white collar in cloud forest habitat"
                      width={600}
                      height={450}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Descending from the páramo's austerity, we enter the lush embrace of Jardín's cloud forests. Here,
                      at 1,800 meters, the Collared Inca reigns supreme—a hummingbird whose elegant black and white
                      collar speaks to the formal beauty of nature's design.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      In Jardín's gardens and forest edges, we learn the rhythm of abundance. Multiple species share the
                      same flowering trees, creating a symphony of wings and territorial displays. The photography here
                      becomes a dance—anticipating movement, reading behavior, finding harmony in apparent chaos.
                    </p>
                    <div className="bg-white rounded-lg p-4 border-l-4 border-emerald-500">
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Scientific Name:</strong> Coeligena torquata
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Spanish Name:</strong> Inca Acollarado
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Elevation:</strong> 1,500-2,500m
                      </p>
                      <Link
                        href="https://ebird.org/species/colin1"
                        className="text-emerald-600 hover:text-emerald-700 text-sm"
                      >
                        View on eBird →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tatamá Section */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Tatamá: Sanctuary of Endemism</h3>
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      In the Western Cordillera's crown jewel, Tatamá National Park, we encounter species found nowhere
                      else on Earth. The Violet-tailed Sylph, with its impossibly long tail streamers and electric blue
                      crown, represents the pinnacle of hummingbird evolution—beauty refined to its absolute essence.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Here, at 2,400 meters, we practice the deepest form of wildlife photography: the art of becoming
                      invisible while remaining fully present. The sylph's courtship displays—aerial ballets of
                      impossible grace—teach us about the sacred nature of beauty itself.
                    </p>
                    <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Scientific Name:</strong> Aglaiocercus coelestis
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Spanish Name:</strong> Silfo Colivioleta
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Elevation:</strong> 2,000-3,000m
                      </p>
                      <Link
                        href="https://ebird.org/species/vitsy1"
                        className="text-purple-600 hover:text-purple-700 text-sm"
                      >
                        View on eBird →
                      </Link>
                    </div>
                  </div>
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src="/images/violet-tailed-sylph.jpg"
                      alt="Violet-tailed Sylph displaying its spectacular blue crown and long tail streamers"
                      width={600}
                      height={450}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Species Gallery */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                <Camera className="w-8 h-8 mr-3 text-purple-600" />
                Portraits of the Divine
              </h2>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {/* Green Hermit Feeding */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="relative aspect-[16/9]">
                    <Image
                      src="/images/green-hermit-feeding.jpg"
                      alt="Green Hermit hummingbird feeding from bright pink tropical flowers"
                      width={600}
                      height={338}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Green Hermit</h3>
                    <p className="text-gray-600 mb-2">
                      <em>Phaethornis guy</em> • Ermitaño Verde
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed mb-4">
                      The hermit hummingbirds represent a different philosophy of existence—preferring the forest's
                      understory to open gardens, embodying the contemplative path of seeking nectar in shadow rather
                      than sunlight.
                    </p>
                    <Link
                      href="https://ebird.org/species/greher1"
                      className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                    >
                      View on eBird →
                    </Link>
                  </div>
                </div>

                {/* White-necked Jacobin */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="relative aspect-[16/9]">
                    <Image
                      src="/images/white-necked-jacobin.jpg"
                      alt="White-necked Jacobin displaying its distinctive white collar and dark plumage"
                      width={600}
                      height={338}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">White-necked Jacobin</h3>
                    <p className="text-gray-600 mb-2">
                      <em>Florisuga mellivora</em> • Jacobino Nuquiblanco
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed mb-4">
                      With its striking monochromatic elegance, the jacobin teaches us about the power of simplicity—
                      how sometimes the most profound beauty lies in the perfect balance of light and shadow.
                    </p>
                    <Link
                      href="https://ebird.org/species/whnj1"
                      className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                    >
                      View on eBird →
                    </Link>
                  </div>
                </div>

                {/* Rufous-tailed Hummingbird */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="relative aspect-[16/9]">
                    <Image
                      src="/images/rufous-tailed-hummingbird.jpg"
                      alt="Rufous-tailed Hummingbird showing beautiful green and rufous coloration"
                      width={600}
                      height={338}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Rufous-tailed Hummingbird</h3>
                    <p className="text-gray-600 mb-2">
                      <em>Amazilia tzacatl</em> • Colibrí Colirrufo
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed mb-4">
                      Perhaps the most approachable of our subjects, the rufous-tailed hummingbird embodies the joy of
                      accessibility—reminding us that profound beauty often dwells in the familiar and everyday.
                    </p>
                    <Link
                      href="https://ebird.org/species/ruthu1"
                      className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                    >
                      View on eBird →
                    </Link>
                  </div>
                </div>

                {/* Long-tailed Sylph */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="relative aspect-[16/9]">
                    <Image
                      src="/images/long-tailed-sylph.jpg"
                      alt="Long-tailed Sylph displaying its spectacular elongated tail feathers"
                      width={600}
                      height={338}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Long-tailed Sylph</h3>
                    <p className="text-gray-600 mb-2">
                      <em>Aglaiocercus kingii</em> • Silfo Colilargo
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed mb-4">
                      The male's extraordinary tail feathers—longer than his entire body—represent nature's commitment
                      to beauty for its own sake, a living reminder that aesthetics and survival are not opposing
                      forces.
                    </p>
                    <Link
                      href="https://ebird.org/species/lotsy1"
                      className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                    >
                      View on eBird →
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* The Vision Philosophy */}
            <section className="mb-16">
              <div className="bg-gradient-to-br from-purple-100 via-indigo-100 to-emerald-100 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <Eye className="w-8 h-8 mr-3 text-purple-600" />
                  The Philosophy of Vision
                </h2>

                <div className="prose prose-lg max-w-none">
                  <p className="text-lg leading-relaxed text-gray-700 mb-6">
                    What distinguishes our Vision Journey from mere wildlife photography is the understanding that we
                    are not simply capturing images—we are participating in a sacred exchange. Each photograph becomes a
                    prayer, each moment of patient waiting a form of meditation, each successful capture a gift of
                    grace.
                  </p>

                  <p className="text-lg leading-relaxed text-gray-700 mb-6">
                    The hummingbird, with its impossible flight patterns and jewel-like beauty, serves as our teacher in
                    the art of presence. To photograph these aerial masters, we must learn to anticipate without
                    controlling, to be ready without being tense, to see without grasping.
                  </p>

                  <blockquote className="border-l-4 border-purple-500 pl-6 italic text-xl text-gray-800 my-8">
                    "In the space between the hummingbird's wingbeats—80 times per second—exists an entire universe of
                    possibility. Our cameras may freeze a single moment, but our hearts capture the eternal dance."
                  </blockquote>

                  <p className="text-lg leading-relaxed text-gray-700 mb-6">
                    This is why we call it Vision—not just the act of seeing, but the cultivation of insight. Through
                    eight days of patient observation, technical mastery, and spiritual practice, we develop not just
                    better photographs, but a deeper way of being in relationship with the natural world.
                  </p>
                </div>
              </div>
            </section>

            {/* Technical Mastery */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">The Art of Hummingbird Photography</h2>

              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Sacred Technique</h3>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      <strong>Shutter Speed:</strong> 1/2000s minimum to freeze wing motion, though we often push to
                      1/4000s for the most dynamic shots. The goal is to capture the poetry of motion without losing the
                      detail that makes each species unique.
                    </p>
                    <p>
                      <strong>Focus Strategy:</strong> Back-button focus with single-point AF, allowing us to track
                      these aerial dancers while maintaining compositional control. We practice the meditation of
                      following without chasing.
                    </p>
                    <p>
                      <strong>Light as Teacher:</strong> Early morning and late afternoon provide the warm, directional
                      light that brings out the iridescence in hummingbird feathers. We learn to read light like a
                      spiritual text.
                    </p>
                    <p>
                      <strong>Patience as Practice:</strong> Hours of stillness for minutes of action. This ratio
                      teaches us about the nature of dedication and the rewards of sustained attention.
                    </p>
                  </div>
                </div>

                <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/buff-tailed-coronet.jpg"
                    alt="Buff-tailed Coronet displaying its distinctive yellow spectacles in cloud forest habitat"
                    width={600}
                    height={450}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-sm font-medium">Buff-tailed Coronet</p>
                    <p className="text-xs opacity-90">Boissonneaua flavescens</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Call to Journey */}
            <section className="mb-16">
              <div className="bg-gradient-to-r from-purple-600 to-emerald-600 rounded-2xl p-8 text-white text-center">
                <h2 className="text-3xl font-bold mb-6">Begin Your Vision Journey</h2>
                <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
                  This is more than a photography tour—it's an invitation to see the world through new eyes, to develop
                  not just technical skills but spiritual awareness, to return home not just with images but with a
                  transformed relationship to beauty itself.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/tours/vision">
                    <Button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 text-lg">
                      <Eye className="w-5 h-5 mr-2" />
                      Explore AVES Vision
                    </Button>
                  </Link>
                  <Link href="/shopping?preset=vision-hummingbird">
                    <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg">
                      <Camera className="w-5 h-5 mr-2" />
                      Book Photography Tour
                    </Button>
                  </Link>
                </div>
              </div>
            </section>

            {/* Author Bio */}
            <AuthorBio />

            {/* Related Posts */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Continue the Vision Series</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <Link href="/blog/sierra-nevada-indigenous-birding" className="group">
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="relative aspect-[16/9]">
                      <Image
                        src="/images/cardinal-guajiro.jpg"
                        alt="Vermilion Cardinal in Sierra Nevada"
                        width={400}
                        height={225}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        style={{ objectPosition: "center 20%" }}
                      />
                    </div>
                    <div className="p-6">
                      <Badge className="bg-emerald-100 text-emerald-800 mb-3">Part I</Badge>
                      <h3 className="font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                        Guardians of the Sky: Indigenous Birding
                      </h3>
                      <p className="text-sm text-gray-600">Sierra Nevada de Santa Marta</p>
                    </div>
                  </div>
                </Link>

                <Link href="/blog/paramo-manizales-thornbill" className="group">
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="relative aspect-[16/9]">
                      <Image
                        src="/images/rainbow-bearded-thornbill.jpg"
                        alt="Rainbow-bearded Thornbill in páramo"
                        width={400}
                        height={225}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        style={{ objectPosition: "center 30%" }}
                      />
                    </div>
                    <div className="p-6">
                      <Badge className="bg-blue-100 text-blue-800 mb-3">Part II</Badge>
                      <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        Fire and Ice: Páramo to Thermal Springs
                      </h3>
                      <p className="text-sm text-gray-600">Manizales & Chinchiná</p>
                    </div>
                  </div>
                </Link>

                <Link href="/blog/choco-toucan-expedition" className="group">
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="relative aspect-[16/9]">
                      <Image
                        src="/images/yellow-throated-toucan-blog.jpg"
                        alt="Yellow-throated Toucan in Chocó"
                        width={400}
                        height={225}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        style={{ objectPosition: "center 40%" }}
                      />
                    </div>
                    <div className="p-6">
                      <Badge className="bg-green-100 text-green-800 mb-3">Part III</Badge>
                      <h3 className="font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                        Into the Heart of Chocó
                      </h3>
                      <p className="text-sm text-gray-600">Biogeographic Chocó</p>
                    </div>
                  </div>
                </Link>
              </div>
            </section>
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
                  <Link href="/tours/adventure" className="hover:text-white transition-colors flex items-center">
                    🍃 AVES Adventure
                  </Link>
                </li>
                <li>
                  <Link href="/tours/vision" className="hover:text-white transition-colors flex items-center">
                    🪶 AVES Vision
                  </Link>
                </li>
                <li>
                  <Link href="/tours/elevate" className="hover:text-white transition-colors flex items-center">
                    🌼 AVES Elevate
                  </Link>
                </li>
                <li>
                  <Link href="/tours/souls" className="hover:text-white transition-colors flex items-center">
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
                    🦅 About AVES
                  </Link>
                </li>
                <li>
                  <Link href="/team" className="hover:text-white transition-colors">
                    👥 Our Team
                  </Link>
                </li>
                <li>
                  <Link href="/conservation" className="hover:text-white transition-colors">
                    🌱 Conservation
                  </Link>
                </li>
                <li>
                  <Link href="/about/b-corp" className="hover:text-white transition-colors flex items-center group">
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
