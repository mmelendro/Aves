"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar, ArrowRight, CheckCircle, Clock, Award, Mountain } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"

export default function ElevatePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <NavigationHeader currentPage="/tours/elevate" />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-orange-50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                  🌼 High-Altitude Páramo Expeditions
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Elevate Tours
                  <span className="text-yellow-600 block">Central Cordillera Cloud Forest Journey</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Immerse yourself in Colombia's mystical cloud forests and high-altitude páramo ecosystems. Experience
                  endemic hummingbirds, rare thornbills, and the world's most biodiverse mountain coffee regions.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/shopping?preset=elevate">
                  <Button size="lg" className="bg-yellow-600 hover:bg-yellow-700 text-lg px-8 py-4">
                    Book Elevate Journey
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-yellow-600 text-yellow-600 hover:bg-yellow-50 text-lg px-8 py-4 bg-transparent"
                  >
                    Ask Questions
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8 border-t">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600">$1,500</div>
                  <div className="text-sm text-gray-600">per person/day</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600">7-14</div>
                  <div className="text-sm text-gray-600">days</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600">4</div>
                  <div className="text-sm text-gray-600">max guests</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl relative">
                <Image
                  src="/images/rainbow-bearded-thornbill.jpg"
                  alt="Rainbow-bearded Thornbill in páramo ecosystem representing Elevate Tours"
                  width={480}
                  height={600}
                  className="object-cover w-full h-full"
                  style={{ objectPosition: "center 25%" }}
                />

                {/* Photo Attribution Button */}
                <div className="absolute bottom-4 right-4 z-50">
                  <div className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 w-10 h-10 p-0 rounded-md flex items-center justify-center transition-colors relative group">
                    <span className="text-lg">📷</span>
                    <div className="absolute bottom-full right-0 mb-3 px-4 py-3 bg-black/95 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-[70] shadow-xl whitespace-nowrap">
                      <div className="text-center leading-relaxed">
                        <div className="font-medium">Photo © Royann Petrell</div>
                        <div className="text-emerald-300 text-xs mt-1">✨ Early Client</div>
                      </div>
                      <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/95"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Mountain className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Elevate Tours</div>
                    <div className="text-sm text-gray-600">High-Altitude Expeditions</div>
                    <div className="text-xs text-yellow-600">Cloud forests • Endemic species</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tour Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Makes Elevate Tours Special</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our high-altitude expeditions focus on Colombia's most unique ecosystems, from misty cloud forests to
              pristine páramo landscapes, home to extraordinary endemic species.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 border-0 shadow-lg">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mountain className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Páramo Ecosystem Specialists</h3>
              <p className="text-gray-600">
                Expert guides specializing in high-altitude ecosystems, with deep knowledge of endemic hummingbirds and
                rare mountain species.
              </p>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Coffee Farm Partnerships</h3>
              <p className="text-gray-600">
                Exclusive access to sustainable coffee farms in the cloud forest, combining birding with cultural
                immersion and conservation education.
              </p>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Endemic Species Focus</h3>
              <p className="text-gray-600">
                Specialized itineraries targeting Central Cordillera endemics, including rare thornbills, antpittas, and
                high-altitude hummingbirds.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Sample Itinerary */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Sample 8-Day Elevate Itinerary</h2>
            <p className="text-xl text-gray-600">
              A journey through Colombia's Central Cordillera, from coffee farms to pristine páramo ecosystems
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {[
                {
                  day: "Day 1-2",
                  location: "Manizales & Los Nevados National Park",
                  description: "High-altitude páramo birding and acclimatization in the volcanic landscape",
                  highlights: "Rainbow-bearded Thornbill, Buffy Helmetcrest, Páramo Seedeater",
                },
                {
                  day: "Day 3-4",
                  location: "Río Blanco Nature Reserve",
                  description: "Cloud forest birding at dawn and dusk with endemic antpitta encounters",
                  highlights: "Chestnut-crowned Antpitta, Multicolored Tanager, Golden-plumed Parakeet",
                },
                {
                  day: "Day 5-6",
                  location: "Coffee Triangle Cloud Forests",
                  description: "Sustainable coffee farm visits combined with intensive hummingbird photography",
                  highlights: "Green-bearded Helmetcrest, Tyrian Metaltail, Buff-tailed Coronet",
                },
                {
                  day: "Day 7-8",
                  location: "Otún Quimbaya Sanctuary",
                  description: "Final cloud forest immersion with endemic species and conservation project visits",
                  highlights: "Yellow-eared Parrot, Rusty-faced Parrot, Andean Cock-of-the-rock",
                },
              ].map((item, index) => (
                <Card key={index} className="p-6 border-0 shadow-lg">
                  <div className="grid md:grid-cols-4 gap-4 items-center">
                    <div className="text-center md:text-left">
                      <div className="text-2xl font-bold text-yellow-600 mb-1">{item.day}</div>
                      <div className="text-lg font-semibold text-gray-900">{item.location}</div>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                    <div className="text-sm text-gray-500">
                      <strong>Highlights:</strong> {item.highlights}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blog Post */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Elevate Stories from the Páramo</h2>
            <p className="text-xl text-gray-600">
              Discover the magic of high-altitude birding through our expert guides' field experiences
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden border-0 shadow-xl">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="aspect-[4/3] md:aspect-auto relative">
                  <Image
                    src="/images/rainbow-bearded-thornbill.jpg"
                    alt="Rainbow-bearded Thornbill discovery in Manizales páramo"
                    width={600}
                    height={400}
                    className="object-cover w-full h-full"
                    style={{ objectPosition: "center 25%" }}
                  />
                  <Badge className="absolute top-4 left-4 bg-yellow-600 text-white">Featured Story</Badge>
                </div>
                <CardContent className="p-8 flex flex-col justify-center">
                  <Badge className="bg-yellow-100 text-yellow-800 w-fit mb-4">Endemic Discovery</Badge>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Jewel of the Páramo: Discovering the Rainbow-bearded Thornbill
                  </h3>
                  <p className="text-gray-600 mb-6">
                    An extraordinary encounter with one of Colombia's most elusive high-altitude endemics in the misty
                    páramo of Manizales, showcasing the incredible biodiversity of our mountain ecosystems.
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mb-6">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>April 8, 2025</span>
                    <Clock className="w-4 h-4 ml-4 mr-2" />
                    <span>6 min read</span>
                  </div>
                  <Link href="/blog/paramo-manizales-thornbill">
                    <Button className="bg-yellow-600 hover:bg-yellow-700 w-fit">
                      Read Full Story
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing & Booking */}
      <section className="py-20 bg-yellow-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Elevate Tour Pricing</h2>
            <p className="text-xl text-gray-600">
              Premium high-altitude expeditions with specialized páramo and cloud forest access
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="p-8 border-0 shadow-xl">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="text-6xl font-bold text-yellow-600 mb-4">$1,500</div>
                  <div className="text-xl text-gray-600 mb-6">per person per day</div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-yellow-600 mr-3" />
                      <span className="text-gray-700">Páramo ecosystem specialist guide</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-yellow-600 mr-3" />
                      <span className="text-gray-700">Cloud forest lodge accommodation</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-yellow-600 mr-3" />
                      <span className="text-gray-700">Coffee farm cultural experiences</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-yellow-600 mr-3" />
                      <span className="text-gray-700">High-altitude gear provided</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-yellow-600 mr-3" />
                      <span className="text-gray-700">Endemic species guarantee</span>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 mb-6">
                    <div className="text-sm text-gray-600 mb-2">Sample pricing for 2 people, 8 days:</div>
                    <div className="text-2xl font-bold text-gray-900">$24,000 total</div>
                    <div className="text-sm text-gray-500">($12,000 per person)</div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Flexible Duration Options</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                        <span className="font-medium">7 days</span>
                        <span className="text-yellow-600 font-bold">$10,500/person</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-yellow-100 rounded-lg border-2 border-yellow-500">
                        <span className="font-medium">8 days (Recommended)</span>
                        <span className="text-yellow-600 font-bold">$12,000/person</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                        <span className="font-medium">10 days</span>
                        <span className="text-yellow-600 font-bold">$15,000/person</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                        <span className="font-medium">14 days</span>
                        <span className="text-yellow-600 font-bold">$21,000/person</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Link href="/shopping?preset=elevate">
                      <Button size="lg" className="w-full bg-yellow-600 hover:bg-yellow-700">
                        Book Elevate Journey
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </Link>
                    <Link href="/contact">
                      <Button
                        size="lg"
                        variant="outline"
                        className="w-full border-yellow-600 text-yellow-600 hover:bg-yellow-50 bg-transparent"
                      >
                        Ask Questions
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
