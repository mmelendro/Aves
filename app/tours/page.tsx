"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowRight, Users, Globe, Award } from "lucide-react"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import TourComparison from "@/components/tour-comparison"

export default function ToursPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Replace the existing header with: */}
      <NavigationHeader currentPage="/tours" />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 mb-6">
              🌿 Four Unique Colombian Birding Experiences
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">Explore Our Tours</h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              From adventure expeditions to luxury experiences, discover Colombia's incredible avian diversity through
              our carefully crafted tour offerings. Each journey supports conservation and local communities.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">1,900+</div>
                <div className="text-sm text-gray-600">Bird Species</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">4</div>
                <div className="text-sm text-gray-600">Max Group Size</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">10</div>
                <div className="text-sm text-gray-600">Bioregions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">100%</div>
                <div className="text-sm text-gray-600">Carbon Neutral</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tour Types Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Adventure Tours - A */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">🍃 AVES Adventure</h3>
                  <Badge className="bg-emerald-100 text-emerald-800">A</Badge>
                </div>
                <p className="text-gray-600 mb-6">
                  Our signature birding expeditions across Colombia's prime hotspots. 7-14 days of immersive wildlife
                  discovery through diverse ecosystems.
                </p>
                <div className="space-y-3 mb-6">
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
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-emerald-600">$8,000</div>
                      <div className="text-sm text-gray-500">avg. per person</div>
                    </div>
                  </div>
                  <Link href="/tours/adventure" className="block">
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                      Explore Adventure Tours
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Vision Tours - V */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">🪶 AVES Vision</h3>
                  <Badge className="bg-purple-100 text-purple-800">V</Badge>
                </div>
                <p className="text-gray-600 mb-6">
                  Specialized photography and videography workshops with professional wildlife photographers capturing
                  Colombia's avian beauty.
                </p>
                <div className="space-y-3 mb-6">
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
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-purple-600">$10,000</div>
                      <div className="text-sm text-gray-500">avg. per person</div>
                    </div>
                  </div>
                  <Link href="/tours/vision" className="block">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      Explore Vision Tours
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Elevate Tours - E */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">🌼 AVES Elevate</h3>
                  <Badge className="bg-yellow-100 text-yellow-800">E</Badge>
                </div>
                <p className="text-gray-600 mb-6">
                  Premium expeditions with luxury amenities in exclusive locations for the ultimate comfort experience
                  in Colombia's finest reserves.
                </p>
                <div className="space-y-3 mb-6">
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
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-yellow-500">$12,000</div>
                      <div className="text-sm text-gray-500">avg. per person</div>
                    </div>
                  </div>
                  <Link href="/tours/elevate" className="block">
                    <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white">
                      Explore Elevate Tours
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Souls Tours - S */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">🍓 AVES Souls</h3>
                  <Badge className="bg-red-100 text-red-800">S</Badge>
                </div>
                <p className="text-gray-600 mb-6">
                  Romantic retreats combining birding with intimate experiences in secluded, breathtaking locations
                  perfect for couples.
                </p>
                <div className="space-y-3 mb-6">
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
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-red-500">$14,000</div>
                      <div className="text-sm text-gray-500">avg. per person</div>
                    </div>
                  </div>
                  <Link href="/tours/souls" className="block">
                    <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
                      Explore Souls Tours
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tour Comparison Section - Moved from Homepage */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Compare Our Tours</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Not sure which tour is right for you? Use our detailed comparison tool to explore the differences and find
              your perfect Colombian birding adventure.
            </p>
          </div>
          <TourComparison />
        </div>
      </section>

      {/* Why Choose AVES Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose AVES?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to providing exceptional birding experiences while supporting conservation and local
              communities.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 border-0 shadow-lg">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Small Groups</h3>
              <p className="text-gray-600">
                Maximum 4 participants per tour ensures personalized attention and minimal environmental impact.
              </p>
            </Card>
            <Card className="text-center p-8 border-0 shadow-lg">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Conservation Focus</h3>
              <p className="text-gray-600">
                Every tour directly supports habitat protection and community conservation initiatives.
              </p>
            </Card>
            <Card className="text-center p-8 border-0 shadow-lg">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Expert Guides</h3>
              <p className="text-gray-600">
                Professional ornithologists and local experts provide unmatched knowledge and insights.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Your Colombian Birding Adventure?</h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join us for an unforgettable journey through Colombia's diverse ecosystems and discover why it's the world's
            premier birding destination.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shopping">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 text-lg px-8 py-4">
                Book Your Tour
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-emerald-600 text-lg px-8 py-4"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Use the centralized Footer component */}
      <Footer />
    </div>
  )
}
