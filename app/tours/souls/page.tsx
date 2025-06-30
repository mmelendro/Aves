"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, ArrowRight, CheckCircle, Clock, Award, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"

export default function SoulsPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <NavigationHeader currentPage="/tours/souls" />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-pink-50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                  🍓 Cultural Immersion & Amazon Transition
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Souls Tours
                  <span className="text-red-600 block">Eastern Cordillera Cultural Journey</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Connect with Colombia's indigenous communities and witness the transition from Andean peaks to Amazon
                  lowlands. Experience traditional ecological knowledge alongside world-class birding.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/shopping?preset=souls">
                  <Button size="lg" className="bg-red-600 hover:bg-red-700 text-lg px-8 py-4">
                    Book Souls Journey
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-red-600 text-red-600 hover:bg-red-50 text-lg px-8 py-4 bg-transparent"
                  >
                    Ask Questions
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8 border-t">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">$1,750</div>
                  <div className="text-sm text-gray-600">per person/day</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">7-14</div>
                  <div className="text-sm text-gray-600">days</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">4</div>
                  <div className="text-sm text-gray-600">max guests</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl relative">
                <Image
                  src="/images/vermillion-flycatcher.jpg"
                  alt="Vermilion Flycatcher in Eastern Cordillera representing Souls Tours"
                  width={480}
                  height={600}
                  className="object-cover w-full h-full"
                  style={{ objectPosition: "center 20%" }}
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
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Souls Tours</div>
                    <div className="text-sm text-gray-600">Cultural Immersion</div>
                    <div className="text-xs text-red-600">Indigenous partnerships • Amazon transition</div>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Makes Souls Tours Special</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our cultural immersion expeditions combine traditional ecological knowledge with modern conservation
              science, creating meaningful connections between communities and wildlife.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 border-0 shadow-lg">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Indigenous Partnerships</h3>
              <p className="text-gray-600">
                Authentic cultural exchanges with indigenous communities, learning traditional bird knowledge and
                supporting community-based conservation initiatives.
              </p>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Amazon Transition Zone</h3>
              <p className="text-gray-600">
                Explore the unique ecosystem where Andean mountains meet Amazon rainforest, home to incredible
                biodiversity and endemic species.
              </p>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Community Impact</h3>
              <p className="text-gray-600">
                Direct support for indigenous communities through fair-trade partnerships, with a portion of proceeds
                funding local conservation projects.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Sample Itinerary */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Sample 8-Day Souls Itinerary</h2>
            <p className="text-xl text-gray-600">
              A cultural and ecological journey through Colombia's Eastern Cordillera and Amazon transition zone
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {[
                {
                  day: "Day 1-2",
                  location: "Bogotá & Sumapaz Páramo",
                  description: "Cultural orientation and high-altitude páramo birding with local community guides",
                  highlights: "Bearded Helmetcrest, Páramo Pipit, Many-striped Canastero",
                },
                {
                  day: "Day 3-4",
                  location: "Eastern Cordillera Cloud Forest",
                  description:
                    "Indigenous-guided forest walks learning traditional bird knowledge and medicinal plants",
                  highlights: "Chestnut-crowned Antpitta, Golden-crowned Tanager, Rusty-breasted Antpitta",
                },
                {
                  day: "Day 5-6",
                  location: "Macarena Mountains",
                  description: "Transition zone birding with endemic species and community conservation projects",
                  highlights: "Orinoco Goose, Vermilion Flycatcher, White-bearded Flycatcher",
                },
                {
                  day: "Day 7-8",
                  location: "Amazon Foothills",
                  description: "Lowland rainforest immersion with indigenous guides and traditional ceremonies",
                  highlights: "Harpy Eagle, Zigzag Heron, Amazonian Umbrellabird",
                },
              ].map((item, index) => (
                <Card key={index} className="p-6 border-0 shadow-lg">
                  <div className="grid md:grid-cols-4 gap-4 items-center">
                    <div className="text-center md:text-left">
                      <div className="text-2xl font-bold text-red-600 mb-1">{item.day}</div>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Souls Stories from the Field</h2>
            <p className="text-xl text-gray-600">
              Experience the deep connections between culture, community, and conservation through our guides' stories
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden border-0 shadow-xl">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="aspect-[4/3] md:aspect-auto relative">
                  <Image
                    src="/images/vermillion-flycatcher.jpg"
                    alt="Cultural birding expedition with indigenous communities"
                    width={600}
                    height={400}
                    className="object-cover w-full h-full"
                    style={{ objectPosition: "center 20%" }}
                  />
                  <Badge className="absolute top-4 left-4 bg-red-600 text-white">Featured Story</Badge>
                </div>
                <CardContent className="p-8 flex flex-col justify-center">
                  <Badge className="bg-red-100 text-red-800 w-fit mb-4">Cultural Exchange</Badge>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Voices of the Forest: Learning from Indigenous Bird Keepers
                  </h3>
                  <p className="text-gray-600 mb-6">
                    A transformative Souls tour experience working with indigenous communities in the Eastern
                    Cordillera, discovering how traditional knowledge enhances modern conservation efforts.
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mb-6">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>June 10, 2025</span>
                    <Clock className="w-4 h-4 ml-4 mr-2" />
                    <span>9 min read</span>
                  </div>
                  <Link href="/blog/indigenous-bird-keepers">
                    <Button className="bg-red-600 hover:bg-red-700 w-fit">
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
      <section className="py-20 bg-red-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Souls Tour Pricing</h2>
            <p className="text-xl text-gray-600">
              Premium cultural immersion expeditions with indigenous community partnerships
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="p-8 border-0 shadow-xl">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="text-6xl font-bold text-red-600 mb-4">$1,750</div>
                  <div className="text-xl text-gray-600 mb-6">per person per day</div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-red-600 mr-3" />
                      <span className="text-gray-700">Indigenous community guides</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-red-600 mr-3" />
                      <span className="text-gray-700">Cultural ceremony participation</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-red-600 mr-3" />
                      <span className="text-gray-700">Community project support</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-red-600 mr-3" />
                      <span className="text-gray-700">Traditional knowledge workshops</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-red-600 mr-3" />
                      <span className="text-gray-700">Fair-trade community support</span>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 mb-6">
                    <div className="text-sm text-gray-600 mb-2">Sample pricing for 2 people, 8 days:</div>
                    <div className="text-2xl font-bold text-gray-900">$28,000 total</div>
                    <div className="text-sm text-gray-500">($14,000 per person)</div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Flexible Duration Options</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                        <span className="font-medium">7 days</span>
                        <span className="text-red-600 font-bold">$12,250/person</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-red-100 rounded-lg border-2 border-red-500">
                        <span className="font-medium">8 days (Recommended)</span>
                        <span className="text-red-600 font-bold">$14,000/person</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                        <span className="font-medium">10 days</span>
                        <span className="text-red-600 font-bold">$17,500/person</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                        <span className="font-medium">14 days</span>
                        <span className="text-red-600 font-bold">$24,500/person</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Link href="/shopping?preset=souls">
                      <Button size="lg" className="w-full bg-red-600 hover:bg-red-700">
                        Book Souls Journey
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </Link>
                    <Link href="/contact">
                      <Button
                        size="lg"
                        variant="outline"
                        className="w-full border-red-600 text-red-600 hover:bg-red-50 bg-transparent"
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
