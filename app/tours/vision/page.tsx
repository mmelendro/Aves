/**
 * Vision photography-style page with the common article bird carousel.
 * The labelled sections contain features, a sample itinerary, related story and
 * price/inquiry copy; they are editorial descriptions rather than a booking API.
 */
"use client"

import { TourProposal } from "@/components/tour-proposal"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, ArrowRight, Clock, Award, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import ArticleBirdCarousel from "@/components/article-bird-carousel"

export default function VisionPage() {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <NavigationHeader currentPage="/tours/vision" />
      <main id="main-content" tabIndex={-1}><p className="mx-auto max-w-4xl px-5 pt-6 text-sm leading-6 text-emerald-900">Trip inspiration. Sample activities, duration and group sizes are ideas to discuss, subject to availability and your personal proposal.</p>

      {/* Hero Section */}
      <section className="relative py-8 lg:py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-indigo-50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col gap-8">
            <div className="mx-auto max-w-4xl space-y-4 text-center">
                <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
                  🪶 Photography & Chocó Expeditions
                </Badge>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-gray-900 leading-tight">
                  Vision Tours
                  <span className="text-purple-600 block">Western Cordillera Chocó Immersion</span>
                </h1>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  Discover the world's most biodiverse rainforest through the lens. Specialized photography tours
                  focusing on Chocó endemics, with expert guidance for capturing Colombia's rarest birds.
                </p>
              </div>
            <div className="mx-auto w-full min-w-0"><ArticleBirdCarousel article="choco" /></div>
            <div className="mx-auto w-full max-w-3xl space-y-8"><div className="flex flex-col justify-center sm:flex-row gap-4">
                <Link href="/shopping?preset=vision">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-4">
                    Discuss your journey
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-purple-600 text-purple-600 hover:bg-purple-50 text-lg px-8 py-4 bg-transparent"
                  >
                    Ask Questions
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8 border-t">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">Personal quote</div>
                  <div className="text-sm text-gray-600">Route reviewed with you</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">7-14</div>
                  <div className="text-sm text-gray-600">days</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">4</div>
                  <div className="text-sm text-gray-600">max guests</div>
                </div>
              </div></div>


          </div>
        </div>
      </section>

      {/* Tour Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Makes Vision Tours Special</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our photography-focused expeditions combine expert birding with professional photography instruction,
              targeting the incredible endemic species of the Chocó bioregion.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 border-0 shadow-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Photography Specialists</h3>
              <p className="text-gray-600">
                Professional wildlife photographers and ornithologists who understand both bird behavior and optimal
                camera settings for rainforest conditions.
              </p>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Chocó Endemic Access</h3>
              <p className="text-gray-600">
                Exclusive access to pristine Chocó rainforest locations, including private reserves with the highest
                concentration of endemic species.
              </p>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Photography Equipment</h3>
              <p className="text-gray-600">
                Professional-grade photography equipment available, including telephoto lenses, tripods, and specialized
                rainforest protection gear.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Sample Itinerary */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Sample 8-Day Vision Tour Itinerary</h2>
            <p className="text-xl text-gray-600">
              A photography-focused journey through Colombia's Western Cordillera and Chocó rainforest
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {[
                {
                  day: "Day 1-2",
                  location: "Anchicayá Valley & San Cipriano",
                  description: "Lowland rainforest photography with endemic tanagers and antbirds",
                  highlights: "Chocó Vireo, Lemon-spectacled Tanager, Chocó Tapaculo",
                },
                {
                  day: "Day 3-4",
                  location: "Farallones de Cali National Park",
                  description: "Mid-elevation cloud forest with specialized hummingbird photography setups",
                  highlights: "Purple-chested Hummingbird, Multicolored Tanager, Beautiful Treerunner",
                },
                {
                  day: "Day 5-6",
                  location: "Río Ñambí Reserve",
                  description: "Dawn chorus recording and photography in pristine Chocó rainforest",
                  highlights: "Banded Ground-Cuckoo, Orange-breasted Fruiteater, Stub-tailed Antbird",
                },
                {
                  day: "Day 7-8",
                  location: "Utría National Park",
                  description: "Coastal rainforest and mangrove photography with Pacific endemic species",
                  highlights: "Baudo Oropendola, Rufous-crowned Antpitta, Chocó Screech-Owl",
                },
              ].map((item, index) => (
                <Card key={index} className="p-6 border-0 shadow-lg">
                  <div className="grid md:grid-cols-4 gap-4 items-center">
                    <div className="text-center md:text-left">
                      <div className="text-2xl font-bold text-purple-600 mb-1">{item.day}</div>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Vision Stories from the Chocó</h2>
            <p className="text-xl text-gray-600">
              Explore the art of rainforest photography through our expert guides' field experiences
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden border-0 shadow-xl">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="aspect-[4/3] md:aspect-auto relative">
                  <Image
                    src="/images/yellow-throated-toucan.jpg"
                    alt="Yellow-throated Toucan photography expedition in Chocó"
                    width={600}
                    height={400}
                    className="object-cover w-full h-full"
                    style={{ objectPosition: "center 25%" }}
                  />
                  <Badge className="absolute top-4 left-4 bg-purple-600 text-white">Featured Story</Badge>
                </div>
                <CardContent className="p-8 flex flex-col justify-center">
                  <Badge className="bg-purple-100 text-purple-800 w-fit mb-4">Photography Expedition</Badge>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Capturing Giants: A Chocó Toucan Photography Expedition
                  </h3>
                  <p className="text-gray-600 mb-6">
                    An immersive photography journey into the heart of the Chocó rainforest, documenting the incredible
                    diversity of toucans and their role in this unique ecosystem's conservation story.
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mb-6">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>May 22, 2025</span>
                    <Clock className="w-4 h-4 ml-4 mr-2" />
                    <span>7 min read</span>
                  </div>
                  <Link href="/blog/choco-toucan-expedition">
                    <Button className="bg-purple-600 hover:bg-purple-700 w-fit">
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
      <TourProposal style="vision"/>

      </main>
      <Footer />
    </div>
  )
}
