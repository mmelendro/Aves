"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar, MapPin, ArrowRight, CheckCircle, Clock, Award, Leaf } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"

export default function AdventurePage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <NavigationHeader currentPage="/tours/adventure" />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-blue-50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
                  🍃 Classic Birding Expeditions
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Adventure Tours
                  <span className="text-emerald-600 block">Colombia's Premier Birding Experience</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Our signature birding expeditions across Colombia's prime hotspots. Experience diverse ecosystems from
                  the Andes to the Amazon with expert ornithologist guides and premium eco-lodges.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/shopping?preset=adventure">
                  <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8 py-4">
                    Book Adventure Journey
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 text-lg px-8 py-4 bg-transparent"
                  >
                    Ask Questions
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8 border-t">
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600">$1,000</div>
                  <div className="text-sm text-gray-600">per person/day</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600">7-14</div>
                  <div className="text-sm text-gray-600">days</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600">4</div>
                  <div className="text-sm text-gray-600">max guests</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/cardinal-guajiro.jpg"
                  alt="Vermilion Cardinal in Sierra Nevada de Santa Marta representing Adventure Tours"
                  width={480}
                  height={600}
                  className="object-cover w-full h-full"
                  style={{ objectPosition: "center 20%" }}
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Adventure Tours</div>
                    <div className="text-sm text-gray-600">Classic Birding Expeditions</div>
                    <div className="text-xs text-emerald-600">Premium eco-lodges • Expert guides</div>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Makes Adventure Tours Special</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our signature expeditions combine expert guiding, premium accommodations, and exclusive access to
              Colombia's most pristine birding locations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 border-0 shadow-lg">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Expert Ornithologist Guides</h3>
              <p className="text-gray-600">
                Professional ornithologists with decades of experience in Colombian ecosystems, fluent in local
                languages and bird calls.
              </p>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Premium Eco-Lodges</h3>
              <p className="text-gray-600">
                Carefully selected accommodations that balance comfort with environmental responsibility, often in
                exclusive locations.
              </p>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Conservation Project Visits</h3>
              <p className="text-gray-600">
                Exclusive access to active conservation projects, meeting researchers and seeing conservation in action.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Sample Itinerary */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Sample 8-Day Adventure Itinerary</h2>
            <p className="text-xl text-gray-600">
              A typical Adventure tour showcasing Colombia's incredible biodiversity across multiple ecosystems
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {[
                {
                  day: "Day 1-2",
                  location: "Bogotá & Eastern Cordillera",
                  description: "Arrival, acclimatization, and high-altitude birding in the páramo ecosystem",
                  highlights: "Bearded Helmetcrest, Many-striped Canastero, Rufous-browed Conebill",
                },
                {
                  day: "Day 3-4",
                  location: "Central Cordillera Cloud Forest",
                  description: "Immersive cloud forest birding with endemic species and hummingbird feeders",
                  highlights: "Multicolored Tanager, Chestnut-crowned Antpitta, Rainbow-bearded Thornbill",
                },
                {
                  day: "Day 5-6",
                  location: "Magdalena Valley",
                  description: "Dry forest and wetland birding in one of Colombia's most threatened ecosystems",
                  highlights: "Greyish Piculet, Apical Flycatcher, Scaled Piculet",
                },
                {
                  day: "Day 7-8",
                  location: "Western Cordillera",
                  description: "Chocó endemic species and Pacific slope specialties before departure",
                  highlights: "Chocó Vireo, Beautiful Treerunner, Orange-breasted Fruiteater",
                },
              ].map((item, index) => (
                <Card key={index} className="p-6 border-0 shadow-lg">
                  <div className="grid md:grid-cols-4 gap-4 items-center">
                    <div className="text-center md:text-left">
                      <div className="text-2xl font-bold text-emerald-600 mb-1">{item.day}</div>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Adventure Stories from the Field</h2>
            <p className="text-xl text-gray-600">
              Read about real Adventure tour experiences from our expert guides and guests
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden border-0 shadow-xl">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="aspect-[4/3] md:aspect-auto relative">
                  <Image
                    src="/images/cardinal-guajiro.jpg"
                    alt="Sierra Nevada indigenous birding expedition"
                    width={600}
                    height={400}
                    className="object-cover w-full h-full"
                    style={{ objectPosition: "center 20%" }}
                  />
                  <Badge className="absolute top-4 left-4 bg-emerald-600 text-white">Featured Story</Badge>
                </div>
                <CardContent className="p-8 flex flex-col justify-center">
                  <Badge className="bg-emerald-100 text-emerald-800 w-fit mb-4">Indigenous Partnerships</Badge>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Guardians of the Sky: Birding with the Kogi and Wayuu
                  </h3>
                  <p className="text-gray-600 mb-6">
                    An eight-day Adventure tour through the Sierra Nevada de Santa Marta, working with indigenous guides
                    to discover endemic species while learning about traditional ecological knowledge.
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mb-6">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>March 15, 2025</span>
                    <Clock className="w-4 h-4 ml-4 mr-2" />
                    <span>8 min read</span>
                  </div>
                  <Link href="/blog/sierra-nevada-indigenous-birding">
                    <Button className="bg-emerald-600 hover:bg-emerald-700 w-fit">
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
      <section className="py-20 bg-emerald-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Adventure Tour Pricing</h2>
            <p className="text-xl text-gray-600">
              Transparent, per-person-per-day pricing with flexible duration options
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="p-8 border-0 shadow-xl">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="text-6xl font-bold text-emerald-600 mb-4">$1,000</div>
                  <div className="text-xl text-gray-600 mb-6">per person per day</div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mr-3" />
                      <span className="text-gray-700">Professional ornithologist guide</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mr-3" />
                      <span className="text-gray-700">Premium eco-lodge accommodation</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mr-3" />
                      <span className="text-gray-700">All meals and transportation</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mr-3" />
                      <span className="text-gray-700">Conservation project visits</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mr-3" />
                      <span className="text-gray-700">Carbon offset included</span>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 mb-6">
                    <div className="text-sm text-gray-600 mb-2">Sample pricing for 2 people, 8 days:</div>
                    <div className="text-2xl font-bold text-gray-900">$16,000 total</div>
                    <div className="text-sm text-gray-500">($8,000 per person)</div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Flexible Duration Options</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                        <span className="font-medium">7 days</span>
                        <span className="text-emerald-600 font-bold">$7,000/person</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-emerald-100 rounded-lg border-2 border-emerald-500">
                        <span className="font-medium">8 days (Recommended)</span>
                        <span className="text-emerald-600 font-bold">$8,000/person</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                        <span className="font-medium">10 days</span>
                        <span className="text-emerald-600 font-bold">$10,000/person</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                        <span className="font-medium">14 days</span>
                        <span className="text-emerald-600 font-bold">$14,000/person</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Link href="/shopping?preset=adventure">
                      <Button size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700">
                        Book Adventure Journey
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </Link>
                    <Link href="/contact">
                      <Button
                        size="lg"
                        variant="outline"
                        className="w-full border-emerald-600 text-emerald-600 hover:bg-emerald-50 bg-transparent"
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

      {/* Global Footer */}
      <Footer />
    </div>
  )
}
