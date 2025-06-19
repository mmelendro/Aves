import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Users, Leaf, Award, ArrowRight, Calendar, LocateIcon as Location } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ToursOverview() {
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
            <Link href="/conservation" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Conservation
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Contact
            </Link>
          </nav>
          <Button className="bg-emerald-600 hover:bg-emerald-700">Book Your Journey</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 mb-4">
            🍃 Four Unique Experiences
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Choose Your Colombian Adventure</h1>
          <p className="text-xl text-gray-600 max-w3xl mx-auto mb-8">
            From intimate birding expeditions to luxury eco-retreats, each AVES tour is designed to showcase Colombia's
            incredible biodiversity while supporting conservation efforts.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">1,900+</div>
              <div className="text-sm text-gray-600">Bird Species</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">4</div>
              <div className="text-sm text-gray-600">Max Group Size</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">10</div>
              <div className="text-sm text-gray-600">Bioregions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">100%</div>
              <div className="text-sm text-gray-600">Carbon Neutral</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Adventure Tours */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
              <div className="aspect-[4/3] relative">
                <Image
                  src="/images/cardinal-guajiro.jpg"
                  alt="AVES Adventure Tour"
                  width={600}
                  height={450}
                  className="object-cover w-full h-full"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-emerald-600 text-white">Most Popular</Badge>
                </div>
              </div>
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                    <Leaf className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">🍃 AVES Adventure</h3>
                    <p className="text-emerald-600 font-medium">Classic Birding Expeditions</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">
                  Our signature birding expeditions across Colombia's prime hotspots. Experience diverse ecosystems from
                  the Andes to the Amazon with expert ornithologist guides.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 text-emerald-600 mr-3" />
                    <span>7-14 day expeditions</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="w-4 h-4 text-emerald-600 mr-3" />
                    <span>Maximum 4 guests per tour</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Location className="w-4 h-4 text-emerald-600 mr-3" />
                    <span>Multiple bioregions covered</span>
                  </div>
                </div>
                <div className="mb-4">
                  <Link
                    href="/blog/sierra-nevada-indigenous-birding"
                    className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    📖 Read: Sierra Nevada Indigenous Birding Experience →
                  </Link>
                </div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-3xl font-bold text-emerald-600">$8,000</div>
                    <div className="text-sm text-gray-500">avg. per person</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Starting from</div>
                    <div className="font-semibold">7 days</div>
                  </div>
                </div>
                <Link href="/shopping?preset=adventure">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                    Book Adventure Journey
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Vision Tours */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
              <div className="aspect-[4/3] relative">
                <Image
                  src="/images/blue-crowned-motmot-new.jpg"
                  alt="AVES Vision Tour"
                  width={600}
                  height={450}
                  className="object-cover w-full h-full"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-purple-600 text-white">Photography Focus</Badge>
                </div>
              </div>
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <Award className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">🪶 AVES Vision</h3>
                    <p className="text-purple-600 font-medium">Photography Workshops</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">
                  Specialized photography and videography workshops with professional wildlife photographers. Capture
                  Colombia's avian beauty with expert technical guidance.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 text-purple-600 mr-3" />
                    <span>10-12 day workshops</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="w-4 h-4 text-purple-600 mr-3" />
                    <span>Maximum 3 photographers</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Location className="w-4 h-4 text-purple-600 mr-3" />
                    <span>Exclusive photography hides</span>
                  </div>
                </div>
                <div className="mb-4">
                  <Link
                    href="/blog/choco-toucan-expedition"
                    className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                  >
                    📖 Read: Chocó Toucan Photography Expedition →
                  </Link>
                </div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-3xl font-bold text-purple-600">$10,000</div>
                    <div className="text-sm text-gray-500">avg. per person</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Starting from</div>
                    <div className="font-semibold">10 days</div>
                  </div>
                </div>
                <Link href="/shopping?preset=vision">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Book Vision Journey
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Elevate Tours */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
              <div className="aspect-[4/3] relative">
                <Image
                  src="/images/vermillion-flycatcher.jpg"
                  alt="AVES Elevate Tour"
                  width={600}
                  height={450}
                  className="object-cover w-full h-full"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-yellow-600 text-white">Luxury Experience</Badge>
                </div>
              </div>
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                    <Star className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">🌼 AVES Elevate</h3>
                    <p className="text-yellow-600 font-medium">Premium Expeditions</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">
                  Premium expeditions with luxury amenities in exclusive locations. Experience Colombia's finest
                  reserves with the ultimate comfort and personalized service.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 text-yellow-600 mr-3" />
                    <span>8-15 day expeditions</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="w-4 h-4 text-yellow-600 mr-3" />
                    <span>Maximum 4 guests</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Location className="w-4 h-4 text-yellow-600 mr-3" />
                    <span>Luxury eco-lodges</span>
                  </div>
                </div>
                <div className="mb-4">
                  <Link
                    href="/blog/paramo-manizales-thornbill"
                    className="text-sm text-yellow-600 hover:text-yellow-700 font-medium"
                  >
                    📖 Read: Páramo Manizales Thornbill Discovery →
                  </Link>
                </div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-3xl font-bold text-yellow-600">$12,000</div>
                    <div className="text-sm text-gray-500">avg. per person</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Starting from</div>
                    <div className="font-semibold">8 days</div>
                  </div>
                </div>
                <Link href="/shopping?preset=elevate">
                  <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
                    Book Elevate Journey
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Souls Tours */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
              <div className="aspect-[4/3] relative">
                <Image
                  src="/images/parrot-cecropia.jpg"
                  alt="AVES Souls Tour"
                  width={600}
                  height={450}
                  className="object-cover w-full h-full"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-red-600 text-white">Couples Retreat</Badge>
                </div>
              </div>
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">🍓 AVES Souls</h3>
                    <p className="text-red-600 font-medium">Romantic Retreats</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">
                  Romantic retreats combining birding with intimate experiences. Perfect for couples seeking adventure
                  together in Colombia's most breathtaking locations.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 text-red-600 mr-3" />
                    <span>7-10 day retreats</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="w-4 h-4 text-red-600 mr-3" />
                    <span>Couples only</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Location className="w-4 h-4 text-red-600 mr-3" />
                    <span>Secluded romantic locations</span>
                  </div>
                </div>
                <div className="mb-4">
                  <Link
                    href="/blog/choco-endemic-expedition"
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    📖 Read: Chocó Endemic Species Expedition →
                  </Link>
                </div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-3xl font-bold text-red-600">$14,000</div>
                    <div className="text-sm text-gray-500">avg. per person</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Starting from</div>
                    <div className="font-semibold">7 days</div>
                  </div>
                </div>
                <Link href="/shopping?preset=souls">
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    Book Souls Journey
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Choose Your Adventure?</h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Not sure which tour is right for you? Schedule a consultation with our team to find the perfect Colombian
            birding experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 text-lg px-8 py-4">
                Schedule Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-emerald-600 text-lg px-8 py-4"
            >
              Download Brochure
            </Button>
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
