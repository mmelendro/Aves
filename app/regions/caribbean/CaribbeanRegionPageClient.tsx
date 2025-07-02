"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { MapPin, Star, Users, Clock, TelescopeIcon as Binoculars, Camera, ArrowRight } from "lucide-react"
import Link from "next/link"
import { caribbeanData } from "@/lib/caribbean-data"
import YouTubeHeroBackground from "@/components/youtube-hero-background"
import HighlightCards from "@/components/highlight-cards"
import TestimonialSection from "@/components/testimonial-section"
import CaribbeanBirdCarousel from "@/components/caribbean-bird-carousel"
import InteractiveRegionMap from "@/components/interactive-region-map"
import CollapsibleTargetSpecies from "@/components/collapsible-target-species"
import CollapsibleItinerary from "@/components/collapsible-itinerary"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import { useState } from "react"

export default function CaribbeanRegionPageClient() {
  const [showDiscountModal, setShowDiscountModal] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white">
      <style jsx>{`
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  .animate-shimmer {
    animation: shimmer 2s infinite;
  }
`}</style>
      {/* Navigation Header */}
      <NavigationHeader currentPage="/regions/caribbean" />

      {/* YouTube Hero Background Section */}
      <YouTubeHeroBackground
        title="Caribbean Coast Paradise"
        subtitle="Where turquoise waters meet endemic treasures"
        videoId="eEteVfDagrs"
        fallbackImage="/images/caribbean-coast-fallback.jpg"
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        {/* Highlights Section */}
        <section className="mb-12 sm:mb-16">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
              Caribbean Coast Highlights
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover the incredible diversity of Colombia's Caribbean coast, from endemic species to pristine
              mangroves and crystal-clear waters
            </p>
          </div>
          <HighlightCards highlights={caribbeanData.highlights} />

          {/* CTA after highlights */}
          <div className="text-center mt-6 sm:mt-8">
            <Link href="/shopping?tour=🍃%20Adventure%20Tours&region=🏖️%20Caribbean%20Coast&from=highlights">
              <Button className="bg-gradient-to-r from-cyan-500 to-orange-500 hover:from-cyan-600 hover:to-orange-600 text-white px-6 py-2 touch-manipulation transform hover:scale-105 transition-all duration-300">
                Experience These Highlights
              </Button>
            </Link>
          </div>
        </section>

        {/* Featured Species Carousel */}
        <section id="featured-species" className="mb-12 sm:mb-16">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
              Featured Caribbean Species
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Meet the spectacular birds that make the Caribbean coast a world-class birding destination
            </p>
          </div>
          <div className="flex justify-center">
            <CaribbeanBirdCarousel />
          </div>

          {/* CTA after carousel */}
          <div className="text-center mt-6 sm:mt-8">
            <Link href="/shopping?tour=🪶%20Vision%20Tours&region=🏖️%20Caribbean%20Coast&from=species-carousel">
              <Button className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-6 py-2 touch-manipulation transform hover:scale-105 transition-all duration-300">
                Book Photography Tour
              </Button>
            </Link>
          </div>
        </section>

        {/* Interactive Collapsible Sections */}
        <section id="interactive-sections" className="mb-12 sm:mb-16">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
              Explore Your Adventure
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Dive deep into the locations, species, and experiences that await you on the Caribbean coast
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {/* Key Locations */}
            <InteractiveRegionMap locations={caribbeanData.mapLocations} region="Caribbean Coast" />

            {/* Target Species */}
            <CollapsibleTargetSpecies species={caribbeanData.keySpecies} region="Caribbean Coast" />

            {/* Complete Itinerary */}
            <CollapsibleItinerary
              conciseItinerary={caribbeanData.conciseItinerary}
              detailedItinerary={caribbeanData.detailedItinerary}
              region="Caribbean Coast"
            />
          </div>
        </section>

        {/* Expectations Grid */}
        <section className="mb-12 sm:mb-16">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">What to Expect</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Your Caribbean coast birding adventure offers incredible diversity and unforgettable experiences
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {Object.entries(caribbeanData.expectations).map(([key, expectation]) => (
              <Card
                key={key}
                className="text-center hover:shadow-lg transition-all duration-300 border-l-4 border-cyan-500"
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{expectation.icon}</div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-800">{expectation.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{expectation.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA after expectations */}
          <div className="text-center mt-6 sm:mt-8">
            <Link href="/shopping?tour=🌼%20Elevate%20Tours&region=🏖️%20Caribbean%20Coast&from=expectations">
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-2 touch-manipulation transform hover:scale-105 transition-all duration-300">
                Book Elevate Package
              </Button>
            </Link>
          </div>
        </section>

        {/* Itinerary Section */}
        <section id="itinerary-section" className="mb-12 sm:mb-16">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
              8-Day Caribbean Birding Itinerary
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive journey from coastal mangroves to Sierra Nevada cloud forests
            </p>
          </div>
          <CollapsibleItinerary
            conciseItinerary={caribbeanData.conciseItinerary}
            detailedItinerary={caribbeanData.detailedItinerary}
            region="Caribbean Coast"
          />

          {/* CTA after itinerary */}
          <div className="text-center mt-6 sm:mt-8">
            <Link href="/shopping?tour=🍃%20Adventure%20Tours&region=🏖️%20Caribbean%20Coast&from=itinerary">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-2 touch-manipulation transform hover:scale-105 transition-all duration-300">
                Book Adventure Tour
              </Button>
            </Link>
          </div>
        </section>

        {/* Sierra Nevada Cross-sell */}
        <section className="mb-12 sm:mb-16">
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6 sm:p-8">
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-shadow-lg">Extend Your Adventure</h3>
                <p className="mb-4 sm:mb-6 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed text-white/90">
                  Discover the world's most irreplaceable site for threatened species. The Sierra Nevada de Santa Marta
                  is home to 24 endemic bird species found nowhere else on Earth.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <Link href="/tours/adventure/sierra-nevada">
                    <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30 px-6 w-full sm:w-auto touch-manipulation backdrop-blur-sm">
                      Explore Sierra Nevada
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/shopping?tour=🍃%20Adventure%20Tours&region=🏔️%20Sierra%20Nevada%20de%20Santa%20Marta&from=caribbean-cross-sell">
                    <Button
                      variant="outline"
                      className="border-white/60 text-white hover:bg-white/20 bg-white/10 backdrop-blur-sm px-6 w-full sm:w-auto touch-manipulation"
                    >
                      Book Sierra Nevada Tour
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Testimonial */}
        <section className="mb-12 sm:mb-16">
          <TestimonialSection testimonial={caribbeanData.testimonial} />

          {/* CTA after testimonial */}
          <div className="text-center mt-6 sm:mt-8">
            <Link href="/shopping?tour=🍓%20Souls%20Tours&region=🏖️%20Caribbean%20Coast&from=testimonial">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-2 touch-manipulation transform hover:scale-105 transition-all duration-300">
                Book Romantic Couples Tour
              </Button>
            </Link>
          </div>
        </section>

        {/* Curious Facts */}
        <section className="mb-12 sm:mb-16">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">Fascinating Facts</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover the remarkable secrets of Colombia's Caribbean coast ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {caribbeanData.curiousFacts.map((fact, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-all duration-300 border-l-4 border-orange-500"
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{fact.icon}</div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-800">{fact.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{fact.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA after curious facts */}
          <div className="text-center mt-6 sm:mt-8">
            <Link href="/shopping?tour=🪶%20Vision%20Tours&region=🏖️%20Caribbean%20Coast&from=facts">
              <Button className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white px-6 py-2 touch-manipulation transform hover:scale-105 transition-all duration-300">
                Book Photography Tour
              </Button>
            </Link>
          </div>
        </section>

        {/* Final Call to Action */}
        <section className="mb-8 sm:mb-16">
          <Card className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-black/20"></div>
            <CardContent className="p-8 sm:p-12 text-center relative z-10">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-shadow-lg">
                Ready for Your Caribbean Adventure?
              </h2>
              <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
                Join us for an unforgettable journey through Colombia's most spectacular coastal birding destinations.
                Limited to 8 participants for an intimate, personalized experience.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                  <span className="font-semibold text-sm sm:text-base">Max 4 guests</span>
                </div>
                <div className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                  <span className="font-semibold text-sm sm:text-base">8 days / 7 nights</span>
                </div>
                <div className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <Binoculars className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                  <span className="font-semibold text-sm sm:text-base">18+ target species</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                <Link
                  href="/shopping?tour=🍃%20Adventure%20Tours&region=🏖️%20Caribbean%20Coast&from=final-cta&discount=25&discountType=early-bird&originalPrice=8000&discountedPrice=6000"
                  className="w-full sm:w-auto"
                >
                  <Button
                    size="lg"
                    onClick={(e) => {
                      e.preventDefault()
                      setShowDiscountModal(true)
                    }}
                    className="relative bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:from-yellow-300 hover:via-orange-400 hover:to-red-400 text-white px-8 sm:px-12 py-4 text-xl sm:text-2xl font-bold shadow-2xl w-full sm:w-auto max-w-md mx-auto touch-manipulation transform hover:scale-105 transition-all duration-300 animate-pulse border-2 border-yellow-300 overflow-hidden rounded-xl"
                  >
                    {/* Animated background shimmer */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>

                    {/* Button content */}
                    <div className="relative z-10 text-center">
                      <div className="text-xl sm:text-2xl font-black text-white drop-shadow-lg">
                        Book Now – 25% OFF!
                      </div>
                    </div>

                    {/* HOT! corner badge */}
                    <div className="absolute -top-2 -right-2 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full animate-pulse shadow-lg border-2 border-white">
                      HOT!
                    </div>
                  </Button>
                </Link>
                <Link href="/contact?subject=Caribbean+Coast+Questions" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/20 px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold bg-white/10 backdrop-blur-sm w-full sm:w-auto touch-manipulation transform hover:scale-105 transition-all duration-300"
                  >
                    <Camera className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                    Ask Our Experts
                  </Button>
                </Link>
              </div>

              <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm opacity-75">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current flex-shrink-0" />
                  <span>4.9/5 rating</span>
                </div>
                <Separator orientation="vertical" className="h-4 bg-white/30 hidden sm:block" />
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span>4 ecosystems</span>
                </div>
                <Separator orientation="vertical" className="h-4 bg-white/30 hidden sm:block" />
                <span>All meals included</span>
              </div>
            </CardContent>
          </Card>
        </section>
        {/* Discount Details Modal */}
        {showDiscountModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform animate-fade-in-up">
              <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white p-6 rounded-t-2xl text-center">
                <h3 className="text-2xl font-bold mb-2">🔥 Early Bird Special! 🔥</h3>
                <p className="text-yellow-100 text-sm">Limited Time Offer</p>
              </div>

              <div className="p-6 space-y-4">
                <div className="text-center space-y-3">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-gray-600 text-sm mb-1">Original Price</p>
                    <p className="text-2xl font-bold text-gray-400 line-through">$8,000 USD</p>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-gray-600 text-sm mb-1">Early Bird Price</p>
                    <p className="text-3xl font-bold text-green-600">$6,000 USD</p>
                    <p className="text-green-700 text-sm font-semibold">Save $2,000!</p>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-yellow-800 text-sm font-semibold">⚡ Only 11 spots available at this price!</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Link
                    href="/shopping?tour=🍃%20Adventure%20Tours&region=🏖️%20Caribbean%20Coast&from=final-cta&discount=25&discountType=early-bird&originalPrice=8000&discountedPrice=6000"
                    className="flex-1"
                  >
                    <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3">
                      Book Now - $6,000
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={() => setShowDiscountModal(false)}
                    className="px-6 py-3 border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
