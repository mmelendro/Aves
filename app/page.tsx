"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Star,
  Users,
  Leaf,
  Globe,
  Award,
  ArrowRight,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Menu,
  X,
  ChevronDown,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AVESLandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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
                  className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
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

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <Link href="/shopping">
              <Button className="bg-emerald-600 hover:bg-emerald-700">Book Your Journey</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <nav className="container mx-auto px-4 py-4 space-y-4">
              <div className="py-2">
                <div className="text-gray-700 font-medium py-2">Tours</div>
                <div className="pl-4 space-y-2">
                  <Link
                    href="/tours"
                    className="block text-gray-600 hover:text-emerald-600 transition-colors py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    All Tours Overview
                  </Link>
                  <Link
                    href="/tours/adventure"
                    className="block text-gray-600 hover:text-emerald-600 transition-colors py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    🍃 AVES Adventure
                  </Link>
                  <Link
                    href="/tours/vision"
                    className="block text-gray-600 hover:text-emerald-600 transition-colors py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    🪶 AVES Vision
                  </Link>
                  <Link
                    href="/tours/elevate"
                    className="block text-gray-600 hover:text-emerald-600 transition-colors py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    🌼 AVES Elevate
                  </Link>
                  <Link
                    href="/tours/souls"
                    className="block text-gray-600 hover:text-emerald-600 transition-colors py-1"
                    onClick={() => setMobileMenuOpen(false)}
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
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About AVES
                  </Link>
                  <Link
                    href="/team"
                    className="block text-gray-600 hover:text-emerald-600 transition-colors py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Our Team
                  </Link>
                </div>
              </div>
              <Link
                href="/about/b-corp"
                className="block text-gray-700 hover:text-emerald-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                B Corp Journey
              </Link>
              <Link
                href="/blog"
                className="block text-gray-700 hover:text-emerald-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/conservation"
                className="block text-gray-700 hover:text-emerald-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Conservation
              </Link>
              <Link
                href="/contact"
                className="block text-gray-700 hover:text-emerald-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-4">
                <Link href="/shopping">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Book Your Journey</Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-blue-50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
                  🌿 B Corp Certified • Carbon Neutral Tours
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Discover Colombia's
                  <span className="text-emerald-600 block">1,900+ Bird Species</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Join exclusive small-group birding expeditions across Colombia's diverse ecosystems. Experience the
                  world's most biodiverse country while supporting conservation and local communities.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/tours">
                  <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8 py-4">
                    Explore Our Tours
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 text-lg px-8 py-4"
                >
                  Download Brochure
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8 border-t">
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600">1,900+</div>
                  <div className="text-sm text-gray-600">Bird Species</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600">4</div>
                  <div className="text-sm text-gray-600">Max Group Size</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600">100%</div>
                  <div className="text-sm text-gray-600">Carbon Neutral</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/cardinal-guajiro.jpg"
                  alt="Vermilion Cardinal - striking red bird with black face mask, known as Ishuu in Wayuu language, representing the cultural connection between indigenous communities and Colombia's avian diversity"
                  width={480}
                  height={600}
                  className="object-cover w-full h-full"
                  style={{ objectPosition: "center 20%" }}
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg">
                <a
                  href="https://ebird.org/species/vercar1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 hover:bg-gray-50 transition-colors rounded-lg p-1 -m-1"
                >
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Vermilion Cardinal</div>
                    <div className="text-sm text-gray-600 italic">Cardinalis phoeniceus</div>
                    <div className="text-xs text-emerald-600">
                      Ishuu (Wayuu) • Cardenal Guajiro (Spanish) • Caribbean Coast Endemic • View on eBird →
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tour Types Section */}
      <section id="tours" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Four Unique Birding Experiences</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each tour is carefully crafted for different interests and comfort levels, all featuring expert guides and
              premium accommodations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Adventure Tours - Green Leaf */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">🍃 AVES Adventure</h3>
                <p className="text-gray-600 mb-4">
                  Our signature birding expeditions across Colombia's prime hotspots. 7-14 days of immersive wildlife
                  discovery through diverse ecosystems.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mr-2" />
                    Professional ornithologist guides
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mr-2" />
                    Premium eco-lodges
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mr-2" />
                    Conservation project visits
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-emerald-600">$8,000</div>
                    <div className="text-sm text-gray-500">avg. per person</div>
                  </div>
                  <Link href="/tours/adventure">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Vision Tours - Purple Feather */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">🪶 AVES Vision</h3>
                <p className="text-gray-600 mb-4">
                  Specialized photography and videography workshops with professional wildlife photographers capturing
                  Colombia's avian beauty.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-purple-600 mr-2" />
                    Exclusive photography hides
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-purple-600 mr-2" />
                    Personalized technical instruction
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-purple-600 mr-2" />
                    Post-processing sessions
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-purple-600">$10,000</div>
                    <div className="text-sm text-gray-500">avg. per person</div>
                  </div>
                  <Link href="/tours/vision">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Elevate Tours - Yellow Sunflower */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">🌼 AVES Elevate</h3>
                <p className="text-gray-600 mb-4">
                  Premium expeditions with luxury amenities in exclusive locations for the ultimate comfort experience
                  in Colombia's finest reserves.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-yellow-500 mr-2" />
                    Customized itineraries
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-yellow-500 mr-2" />
                    Gourmet dining experiences
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-yellow-500 mr-2" />
                    Wellness facilities access
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-yellow-500">$12,000</div>
                    <div className="text-sm text-gray-500">avg. per person</div>
                  </div>
                  <Link href="/tours/elevate">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Souls Tours - Red Heart */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">🍓 AVES Souls</h3>
                <p className="text-gray-600 mb-4">
                  Romantic retreats combining birding with intimate experiences in secluded, breathtaking locations
                  perfect for couples.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-red-500 mr-2" />
                    Couples-only experiences
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-red-500 mr-2" />
                    Private romantic dining
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-red-500 mr-2" />
                    Commemorative activities
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-red-500">$14,000</div>
                    <div className="text-sm text-gray-500">avg. per person</div>
                  </div>
                  <Link href="/tours/souls">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Colombia Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Colombia is the World's Premier Birding Destination
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Colombia is home to nearly 20% of all bird species on Earth, making it the most biodiverse country for
                avian life. From the Andes to the Amazon, the Caribbean coast to the Pacific, each ecosystem offers
                unique species found nowhere else.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center p-4 bg-emerald-50 rounded-lg">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">1,900+</div>
                  <div className="text-sm text-gray-700">Bird Species</div>
                </div>
                <div className="text-center p-4 bg-emerald-50 rounded-lg">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">200+</div>
                  <div className="text-sm text-gray-700">Endemic Species</div>
                </div>
                <div className="text-center p-4 bg-emerald-50 rounded-lg">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">10</div>
                  <div className="text-sm text-gray-700">Bioregions</div>
                </div>
                <div className="text-center p-4 bg-emerald-50 rounded-lg">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">85+</div>
                  <div className="text-sm text-gray-700">Hummingbird Species</div>
                </div>
              </div>

              <a href="https://ebird.org/region/CO" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                  Discover Colombia's Birds
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/green-hermit-hummingbird.jpg"
                  alt="Green Hermit Hummingbird - large emerald-green hummingbird with curved bill and white-tipped tail, known as Colibrí Ermitaño Verde in Spanish, representing Colombia's incredible hummingbird diversity with over 85 species"
                  width={600}
                  height={450}
                  className="object-cover w-full h-full"
                  style={{ objectPosition: "center 30%" }}
                />
              </div>
              <div className="absolute -top-6 -right-6 bg-white rounded-xl p-4 shadow-lg">
                <a
                  href="https://ebird.org/species/greher1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 hover:bg-gray-50 transition-colors rounded-lg p-1 -m-1"
                >
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Globe className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Green Hermit</div>
                    <div className="text-sm text-gray-600 italic">Phaethornis guy</div>
                    <div className="text-xs text-emerald-600">
                      Colibrí Ermitaño Verde (Spanish) • Cloud Forest Specialist • View on eBird →
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conservation Impact Section */}
      <section id="conservation" className="py-20 bg-emerald-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 mb-4">🌱 Conservation Impact</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Travel That Makes a Difference</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every AVES tour directly supports habitat conservation and local communities. We're committed to becoming
              the first B Corp certified birding company in Colombia.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center p-8 border-0 shadow-lg">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Carbon Neutral Tours</h3>
              <p className="text-gray-600">
                All tours operate with full carbon neutrality, with offsets reinvested in critical bird habitat
                preservation projects.
              </p>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Community Support</h3>
              <p className="text-gray-600">
                We partner with local communities, providing fair employment and supporting community-managed
                conservation initiatives.
              </p>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Habitat Protection</h3>
              <p className="text-gray-600">
                10% of net profits fund our Conservation Endowment Trust, dedicated to permanent habitat restoration and
                protection.
              </p>
            </Card>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Pursuing B Corp Certification</h3>
                <p className="text-gray-600 mb-6">
                  AVES is committed to meeting the highest standards of social and environmental responsibility. We're
                  working toward B Corp certification, joining BirdsChile as only the second birding-focused B Corp
                  globally.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-emerald-600 mr-3" />
                    <span className="text-gray-700">Transparent impact reporting</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-emerald-600 mr-3" />
                    <span className="text-gray-700">Stakeholder governance model</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-emerald-600 mr-3" />
                    <span className="text-gray-700">Environmental accountability</span>
                  </div>
                </div>
              </div>
              <div className="aspect-square rounded-xl overflow-hidden relative">
                <Image
                  src="/images/masked-trogon-male.jpg"
                  alt="Masked Trogon male - brilliant red-breasted bird with black head and barred black-and-white tail, known as Trogón Enmascarado in Spanish, representing cloud forest conservation efforts in Colombia's montane ecosystems"
                  width={400}
                  height={400}
                  className="object-cover w-full h-full"
                  style={{ objectPosition: "center 25%" }}
                />
                <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-3 shadow-lg">
                  <a
                    href="https://ebird.org/species/mastro1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 hover:bg-gray-50 transition-colors rounded-lg p-1 -m-1"
                  >
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Star className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="text-xs">
                      <div className="font-semibold text-gray-900">Masked Trogon</div>
                      <div className="text-gray-600 italic">Trogon personatus</div>
                      <div className="text-emerald-600">
                        Trogón Enmascarado (Spanish) • Cloud Forest Jewel • eBird →
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About AVES Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative">
              <Image
                src="/images/chestnut-crowned-antpitta.jpg"
                alt="Chestnut-crowned Antpitta - secretive ground-dwelling bird with distinctive rufous crown and heavily streaked underparts, known as Tororoi Coronirrufo in Spanish, representing AVES' scientific approach to finding elusive cloud forest specialists"
                width={600}
                height={450}
                className="object-cover w-full h-full"
                style={{ objectPosition: "center 30%" }}
              />
              <div className="absolute -top-4 -left-4 bg-white rounded-xl p-3 shadow-lg">
                <a
                  href="https://ebird.org/species/chcant2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 hover:bg-gray-50 transition-colors rounded-lg p-1 -m-1"
                >
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <Award className="w-4 h-4 text-red-600" />
                  </div>
                  <div className="text-xs">
                    <div className="font-semibold text-gray-900">Chestnut-crowned Antpitta</div>
                    <div className="text-gray-600 italic">Grallaria ruficapilla</div>
                    <div className="text-red-600">
                      Tororoi Coronirrufo (Spanish) • Cloud Forest Specialist • eBird →
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <div>
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 mb-4">About AVES</Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Pioneering Sustainable Birding Tourism</h2>
              <p className="text-lg text-gray-600 mb-6">
                AVES Birdwatching Tours was founded with a simple yet powerful vision: to create transformative birding
                experiences that showcase Colombia's incredible biodiversity while directly contributing to its
                conservation for future generations.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mr-3 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-900">Conservation-First Approach</div>
                    <div className="text-gray-600">
                      Every tour directly funds habitat protection and community development
                    </div>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mr-3 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-900">Expert Local Partnerships</div>
                    <div className="text-gray-600">
                      Collaborating with Colombia's top ornithologists and conservation organizations
                    </div>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mr-3 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-900">Small Group Excellence</div>
                    <div className="text-gray-600">
                      Maximum 4 guests per tour for personalized, low-impact experiences
                    </div>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mr-3 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-900">B Corp Standards</div>
                    <div className="text-gray-600">
                      Committed to the highest levels of social and environmental accountability
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-lg p-6 mb-8">
                <h3 className="font-semibold text-gray-900 mb-2">Our Mission</h3>
                <p className="text-gray-700 italic">
                  "To deliver immersive, scientifically enriched birding experiences that transparently finance
                  ecosystem restoration, uplift local communities, and foster lasting environmental stewardship."
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm border">
                  <div className="text-2xl font-bold text-emerald-600 mb-1">2025</div>
                  <div className="text-sm text-gray-600">Founded</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm border">
                  <div className="text-2xl font-bold text-emerald-600 mb-1">100%</div>
                  <div className="text-sm text-gray-600">Carbon Neutral</div>
                </div>
              </div>

              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white"
                >
                  Learn About Our Impact
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Guests Say</h2>
            <p className="text-xl text-gray-600">Hear from birders who've experienced Colombia's magic with AVES</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 border-0 shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-gray-700 mb-6">
                "As experienced birders, we were impressed by the quality of guides and the exclusive access to pristine
                habitats. The conservation focus made our trip even more meaningful."
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <div className="font-semibold text-gray-900">Lisa & Peter</div>
                  <div className="text-sm text-gray-600">Pender Island, BC</div>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-0 shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-gray-700 mb-6">
                "The small group size and personalized attention made all the difference. Every detail was perfectly
                planned, and the eco-lodges were exceptional."
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <div className="font-semibold text-gray-900">Royann and Sylvain</div>
                  <div className="text-sm text-gray-600">Vancouver Island, BC</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready for Your Colombian Birding Adventure?</h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join us for an exclusive, conservation-focused birding experience in the world's most biodiverse country.
            Limited to 4 guests per tour for the ultimate personalized adventure.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/shopping">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 text-lg px-8 py-4">
                Book Your Journey Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <a href="https://calendly.com/aves-tours/consultation" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-emerald-600 text-lg px-8 py-4"
              >
                Schedule a Consultation
              </Button>
            </a>
          </div>

          <p className="text-emerald-100 text-sm">Tours launching Q1 2026 • Early bird pricing available</p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              <p className="text-lg text-gray-600 mb-8">
                Ready to plan your Colombian birding adventure? We'd love to hear from you and help create the perfect
                tour for your interests and schedule.
              </p>

              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                    <Mail className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Email</div>
                    <div className="text-gray-600">info@aves.com</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                    <Phone className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Phone</div>
                    <div className="text-gray-600">+1 (555) 123-AVES</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                    <MapPin className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Based in</div>
                    <div className="text-gray-600">Vancouver, Canada & Bogotá, Colombia</div>
                  </div>
                </div>
              </div>
            </div>

            <Card className="p-8 border-0 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Request Information</h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <Input placeholder="Your first name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <Input placeholder="Your last name" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <Input type="email" placeholder="your.email@example.com" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Interested Tour Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500">
                    <option>Select a tour type</option>
                    <option>AVES Adventure</option>
                    <option>AVES Vision</option>
                    <option>AVES Elevate</option>
                    <option>AVES Souls</option>
                    <option>Not sure yet</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bioregions of Interest</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500">
                    <option>Select bioregion(s)</option>
                    <option>Quetzal Highlands (Western Andes)</option>
                    <option>Hummingbird Haven (Central Andes)</option>
                    <option>Páramo Paradise (Eastern Andes)</option>
                    <option>Wetland Wonders (Llanos)</option>
                    <option>Canopy Kingdom (Amazon)</option>
                    <option>Endemic Empire (Biogeographic Chocó)</option>
                    <option>Coastal Crown (Caribbean + Sierra Nevada)</option>
                    <option>Valley Voyager (Cauca Valley)</option>
                    <option>River Realm (Magdalena Valley)</option>
                    <option>Massif Majesty (Macizo Colombiano)</option>
                    <option>Multiple regions</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    rows={4}
                    placeholder="Tell us about your birding interests and any questions you have..."
                  ></textarea>
                </div>

                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Send Message</Button>
              </form>
            </Card>
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
                    🦅 About AVES
                  </Link>
                </li>
                <li>
                  <Link href="/team" className="hover:text-white transition-colors flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link href="/conservation" className="hover:text-white transition-colors">
                    🌱 Conservation
                  </Link>
                </li>
                <li>
                  <Link href="/about/b-corp" className="hover:text-white transition-colors flex items-center group">
                    <span className="mr-1 text-xs font-bold bg-white text-gray-900 px-1 rounded">B</span>B Corp Journey
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
