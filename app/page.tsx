"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Users, Globe, Award, ArrowRight, CheckCircle, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"
import OptimizedImage from "@/components/optimized-image"
import SpeciesTooltip from "@/components/species-tooltip"
import TourComparison from "@/components/tour-comparison"
import { CookieManagementButton } from "@/components/cookie-management-button"
import { NavigationHeader } from "@/components/navigation-header"

export default function AVESLandingPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const vermilionCardinalData = {
    commonName: "Vermilion Cardinal",
    scientificName: "Cardinalis phoeniceus",
    spanishName: "Cardenal Guajiro",
    ebirdCode: "vercar1",
    description: "Endemic to northern Colombia and Venezuela, known as Ishuu in Wayuu language",
  }

  const greenHermitData = {
    commonName: "Green Hermit",
    scientificName: "Phaethornis guy",
    spanishName: "Colibrí Ermitaño Verde",
    ebirdCode: "greher1",
    description: "Large hummingbird specialist of cloud forest environments",
  }

  const maskedTrogonData = {
    commonName: "Masked Trogon",
    scientificName: "Trogon personatus",
    spanishName: "Trogón Enmascarado",
    ebirdCode: "mastro1",
    description: "Brilliant red-breasted cloud forest jewel",
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <NavigationHeader currentPage="/" />

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
                <OptimizedImage
                  src="/images/cardinal-guajiro.jpg"
                  alt="Vermilion Cardinal - striking red bird with black face mask, known as Ishuu in Wayuu language, representing the cultural connection between indigenous communities and Colombia's avian diversity"
                  width={480}
                  height={600}
                  className="object-cover w-full h-full"
                  style={{
                    objectPosition: "center 20%",
                    touchAction: "pan-y pinch-zoom",
                  }}
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg">
                <a
                  href="https://ebird.org/species/vercar1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 hover:bg-gray-50 transition-colors rounded-lg p-1 -m-1"
                  style={{ touchAction: "manipulation" }}
                >
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      <SpeciesTooltip species={vermilionCardinalData}>Vermilion Cardinal</SpeciesTooltip>
                    </div>
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

      {/* Tour Comparison Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Compare Our Tours</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Not sure which tour is right for you? Use our comparison tool to explore the differences and find your
              perfect Colombian birding adventure.
            </p>
          </div>
          <TourComparison />
        </div>
      </section>

      {/* Why Colombia Section */}
      <section className="py-20 bg-gray-50">
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
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-emerald-600 mb-1">1,900+</div>
                  <div className="text-sm text-gray-700">Bird Species</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-emerald-600 mb-1">200+</div>
                  <div className="text-sm text-gray-700">Endemic Species</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-emerald-600 mb-1">10</div>
                  <div className="text-sm text-gray-700">Bioregions</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-emerald-600 mb-1">85+</div>
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
                <OptimizedImage
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
                    <div className="font-semibold text-gray-900">
                      <SpeciesTooltip species={greenHermitData}>Green Hermit</SpeciesTooltip>
                    </div>
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
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Interested Tour Types (select all that apply)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-sm text-gray-700">🍃 AVES Adventure</span>
                    </label>
                    <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-sm text-gray-700">🪶 AVES Vision</span>
                    </label>
                    <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-sm text-gray-700">🌼 AVES Elevate</span>
                    </label>
                    <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-sm text-gray-700">🍓 AVES Souls</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Bioregions of Interest (select all that apply)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-3">
                    <label className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-sm text-gray-700">Quetzal Highlands (Western Andes)</span>
                    </label>
                    <label className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-sm text-gray-700">Hummingbird Haven (Central Andes)</span>
                    </label>
                    <label className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-sm text-gray-700">Páramo Paradise (Eastern Andes)</span>
                    </label>
                    <label className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-sm text-gray-700">Wetland Wonders (Llanos)</span>
                    </label>
                    <label className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-sm text-gray-700">Canopy Kingdom (Amazon)</span>
                    </label>
                    <label className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-sm text-gray-700">Endemic Empire (Biogeographic Chocó)</span>
                    </label>
                    <label className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-sm text-gray-700">Coastal Crown (Caribbean + Sierra Nevada)</span>
                    </label>
                    <label className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-sm text-gray-700">Valley Voyager (Cauca Valley)</span>
                    </label>
                    <label className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-sm text-gray-700">River Realm (Magdalena Valley)</span>
                    </label>
                    <label className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-sm text-gray-700">Massif Majesty (Macizo Colombiano)</span>
                    </label>
                  </div>
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
                <OptimizedImage
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
                  <Link href="/about" className="hover:text-white transition-colors">
                    About AVES
                  </Link>
                </li>
                <li>
                  <Link href="/team" className="hover:text-white transition-colors flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link href="/about/partners" className="hover:text-white transition-colors">
                    Our Partners
                  </Link>
                </li>
                <li>
                  <Link href="/conservation" className="hover:text-white transition-colors">
                    Conservation
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
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2025 AVES. All rights reserved.</p>
            <div className="flex space-x-6 text-sm text-gray-400 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <CookieManagementButton
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white transition-colors p-0 h-auto font-normal"
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
