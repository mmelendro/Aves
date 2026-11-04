"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  CheckCircle,
  Calendar,
  TelescopeIcon as Binoculars,
  Clock,
  Map,
  Bird,
  Globe,
  TreePine,
  Mountain,
  Award,
  Leaf,
  Eye,
} from "lucide-react"
import Link from "next/link"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import HomepageBirdCarousel from "@/components/homepage-bird-carousel"
import { ContactFormSection } from "@/components/contact-form-section"

export default function AVESLandingPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentReview, setCurrentReview] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  const journeyIdeas = [
    {
      text: "Picture a morning beneath the rainforest canopy, listening for movement among the leaves. Queensland's tropical forests offer a starting point for your birding wish list.",
      title: "A rainforest perspective",
      location: "Queensland",
      category: "Destination inspiration",
    },
    {
      text: "Imagine exploring the contrast between Sydney's wetlands and the coastal bushland of Royal National Park. Tell us which birds, landscapes and pace of travel appeal to you.",
      title: "Forest, wetlands and coast",
      location: "New South Wales",
      category: "Destination inspiration",
    },
    {
      text: "Think of Tasmania's forests, coastal heath and island landscapes. Let the places and birdlife that interest you shape a conversation about your future Australian journey.",
      title: "An island of discoveries",
      location: "Tasmania",
      category: "Destination inspiration",
    },
  ]

  // Enhanced responsive detection
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setIsTablet(width >= 768 && width < 1024)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    setIsVisible(true)

    // Keep the original homepage rotation behaviour for the inspiration cards.
    const reviewInterval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % journeyIdeas.length)
    }, 6000)

    return () => clearInterval(reviewInterval)
  }, [])

  // Responsive class helpers
  const getResponsiveClasses = () => ({
    container: isMobile ? "px-4" : isTablet ? "px-6" : "px-4 sm:px-6 lg:px-8",
    heroSpacing: isMobile ? "py-12 px-4" : isTablet ? "py-16 px-6" : "py-20 lg:py-24",
    sectionSpacing: isMobile ? "py-16" : isTablet ? "py-20" : "py-24",
    textSize: {
      hero: isMobile ? "text-3xl sm:text-4xl" : isTablet ? "text-4xl lg:text-5xl" : "text-4xl lg:text-5xl xl:text-6xl",
      section: isMobile ? "text-2xl" : isTablet ? "text-3xl" : "text-3xl lg:text-4xl",
      body: isMobile ? "text-base" : isTablet ? "text-lg" : "text-lg lg:text-xl",
    },
    grid: {
      hero: isMobile ? "space-y-8" : "grid lg:grid-cols-2 gap-12 lg:gap-16 items-center",
      features: isMobile
        ? "grid grid-cols-1 gap-3 text-sm"
        : isTablet
          ? "grid md:grid-cols-2 gap-8"
          : "grid md:grid-cols-2 lg:grid-cols-3 gap-8",
      stats: isMobile
        ? "grid grid-cols-2 gap-4"
        : isTablet
          ? "grid grid-cols-2 lg:grid-cols-4 gap-6"
          : "grid grid-cols-2 lg:grid-cols-4 gap-8",
    },
  })

  const responsive = getResponsiveClasses()

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <NavigationHeader currentPage="/" />

      {/* Hero Section - Restored Two-Column Layout with Carousel */}
      <section
        className={`relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-blue-50 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        } ${responsive.heroSpacing}`}
      >
        <div className={`container mx-auto relative z-10 ${responsive.container}`}>
          <div className={responsive.grid.hero}>
            {/* Text Content - Left Side on Desktop, Top on Mobile */}
            <div className={`space-y-6 lg:space-y-8 ${isMobile ? "text-center" : "lg:order-1"}`}>
              <div className="space-y-4 lg:space-y-6">
                <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 animate-pulse inline-flex items-center gap-2">
                  🌿 Pursuing B Corp Certification • Australia Launch
                </Badge>

                <h1 className={`font-bold text-gray-900 leading-tight ${responsive.textSize.hero}`}>
                  Discover Australia's
                  <span className="text-emerald-600 block">Extraordinary Birdlife</span>
                </h1>

                <p
                  className={`text-gray-600 leading-relaxed ${responsive.textSize.body} max-w-2xl ${isMobile ? "mx-auto" : ""}`}
                >
                  Explore Queensland, New South Wales and Tasmania. Share your birding interests and travel ideas as
                  we prepare to launch AVES in Australia.
                </p>

                {/* Key Value Props */}
                <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-emerald-100 shadow-lg p-4 lg:p-6">
                  <div
                    className={`${isMobile ? "grid grid-cols-1 gap-3 text-sm" : "grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm lg:text-base"}`}
                  >
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="text-emerald-600 flex-shrink-0 w-5 h-5" />
                      <span className="text-gray-700">Three regions to explore</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="text-emerald-600 flex-shrink-0 w-5 h-5" />
                      <span className="text-gray-700">Custom trip enquiries</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="text-emerald-600 flex-shrink-0 w-5 h-5" />
                      <span className="text-gray-700">Birding and nature inspiration</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="text-emerald-600 flex-shrink-0 w-5 h-5" />
                      <span className="text-gray-700">Australia launch updates</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Primary CTAs */}
              <div className={`flex gap-4 ${isMobile ? "flex-col" : "flex-col sm:flex-row"}`}>
                <Link href="/aves-explorer" className={isMobile ? "w-full" : "flex-1"}>
                  <Button
                    size="lg"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-base lg:text-lg px-8 py-4"
                  >
                    <Binoculars className="mr-2 w-5 h-5" />
                    Explore Australian Regions
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/contact" className={isMobile ? "w-full" : "flex-1"}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 shadow-md hover:shadow-xl transition-all duration-300 bg-transparent text-base lg:text-lg px-8 py-4"
                  >
                    <Calendar className="mr-2 w-5 h-5" />
                    Plan My Trip
                  </Button>
                </Link>
              </div>

              {/* Australia Launch Updates */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-800">
                <div className="flex items-start space-x-3">
                  <Clock className="flex-shrink-0 w-5 h-5 mt-0.5" />
                  <span className="font-medium text-sm lg:text-base">
                    Australia launch in preparation • <Link href="/contact?intent=waitlist">Join the launch list</Link>
                  </span>
                </div>
              </div>
            </div>

            {/* Bird Carousel - Right Side on Desktop, Bottom on Mobile */}
            <div className={`relative ${isMobile ? "mt-8" : "lg:order-2"}`}>
              <HomepageBirdCarousel className="w-full" autoPlay={true} autoPlayInterval={8000} />
            </div>
          </div>
        </div>

        {/* Decorative Elements - Responsive */}
        <div
          className={`absolute top-0 right-0 bg-emerald-100 rounded-full opacity-20 ${
            isMobile
              ? "w-24 h-24 -translate-y-12 translate-x-12"
              : "w-48 h-48 lg:w-64 lg:h-64 -translate-y-24 lg:-translate-y-32 translate-x-24 lg:translate-x-32"
          }`}
        ></div>
        <div
          className={`absolute bottom-0 left-0 bg-blue-100 rounded-full opacity-20 ${
            isMobile
              ? "w-20 h-20 translate-y-10 -translate-x-10"
              : "w-36 h-36 lg:w-48 lg:h-48 translate-y-18 lg:translate-y-24 -translate-x-18 lg:-translate-x-24"
          }`}
        ></div>
      </section>

      {/* Bioregions Explorer Section - Enhanced with proper spacing and no truncation */}
      <section
        className={`bg-gradient-to-br from-blue-50 to-emerald-50 transition-all duration-500 ${responsive.sectionSpacing}`}
      >
        <div className={`container mx-auto ${responsive.container}`}>
          <div className="max-w-7xl mx-auto">
            {/* Section Header with improved spacing */}
            <div className="text-center mb-8 lg:mb-12 xl:mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-full mb-6 shadow-lg">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h2 className={`font-bold text-gray-900 mb-4 lg:mb-6 ${responsive.textSize.section}`}>
                Explore Australia's Regions
              </h2>
              <p className={`text-gray-600 mx-auto max-w-4xl ${responsive.textSize.body} leading-relaxed`}>
                Discover destination inspiration across three Australian regions. From Queensland's rainforests to New
                South Wales bushland and Tasmania's island landscapes, find what sparks your curiosity.
              </p>
            </div>

            {/* Bioregions Quick Preview Cards with enhanced responsive grid */}
            <div
              className={`mb-8 lg:mb-12 xl:mb-16 ${
                isMobile
                  ? "space-y-6"
                  : isTablet
                    ? "grid md:grid-cols-2 gap-6 lg:gap-8"
                    : "grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 xl:gap-10"
              }`}
            >
              <Link href="/aves-explorer?region=queensland" className="group block">
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-emerald-50 to-green-50">
                  <CardContent className={`text-center ${isMobile ? "p-6" : "p-6 lg:p-8"}`}>
                    <div className="w-12 h-12 lg:w-14 lg:h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6 group-hover:bg-emerald-200 transition-colors">
                      <TreePine className="w-6 h-6 lg:w-7 lg:h-7 text-emerald-600" />
                    </div>
                    <h3
                      className={`font-bold text-gray-900 mb-3 lg:mb-4 ${isMobile ? "text-lg" : "text-xl lg:text-2xl"}`}
                    >
                      Queensland
                    </h3>
                    <p
                      className={`text-gray-600 mb-4 lg:mb-6 leading-relaxed ${isMobile ? "text-sm" : "text-base lg:text-lg"}`}
                    >
                      Tropical rainforest, shaded creeks and forested coastal mountains
                    </p>
                    <div className={`text-emerald-600 font-semibold ${isMobile ? "text-sm" : "text-base lg:text-lg"}`}>
                      Rainforest birding inspiration
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/aves-explorer?region=new-south-wales" className="group block">
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-blue-50 to-indigo-50">
                  <CardContent className={`text-center ${isMobile ? "p-6" : "p-6 lg:p-8"}`}>
                    <div className="w-12 h-12 lg:w-14 lg:h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6 group-hover:bg-blue-200 transition-colors">
                      <Mountain className="w-6 h-6 lg:w-7 lg:h-7 text-blue-600" />
                    </div>
                    <h3
                      className={`font-bold text-gray-900 mb-3 lg:mb-4 ${isMobile ? "text-lg" : "text-xl lg:text-2xl"}`}
                    >
                      New South Wales
                    </h3>
                    <p
                      className={`text-gray-600 mb-4 lg:mb-6 leading-relaxed ${isMobile ? "text-sm" : "text-base lg:text-lg"}`}
                    >
                      Coastal bushland, woodland and wetlands around Sydney and beyond
                    </p>
                    <div className={`text-blue-600 font-semibold ${isMobile ? "text-sm" : "text-base lg:text-lg"}`}>
                      Forest, wetlands and coast
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/aves-explorer?region=tasmania" className="group block">
                <Card
                  className={`h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-orange-50 to-yellow-50 ${
                    isMobile ? "" : isTablet ? "md:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  <CardContent className={`text-center ${isMobile ? "p-6" : "p-6 lg:p-8"}`}>
                    <div className="w-12 h-12 lg:w-14 lg:h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6 group-hover:bg-orange-200 transition-colors">
                      <Bird className="w-6 h-6 lg:w-7 lg:h-7 text-orange-600" />
                    </div>
                    <h3
                      className={`font-bold text-gray-900 mb-3 lg:mb-4 ${isMobile ? "text-lg" : "text-xl lg:text-2xl"}`}
                    >
                      Tasmania
                    </h3>
                    <p
                      className={`text-gray-600 mb-4 lg:mb-6 leading-relaxed ${isMobile ? "text-sm" : "text-base lg:text-lg"}`}
                    >
                      Island forests and coastal heath with distinctive birdlife
                    </p>
                    <div className={`text-orange-600 font-semibold ${isMobile ? "text-sm" : "text-base lg:text-lg"}`}>
                      Island birding inspiration
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>

            {/* CTA to Full Explorer with enhanced spacing */}
            <div className="text-center">
              <Link href="/aves-explorer">
                <Button
                  size="lg"
                  className={`bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                    isMobile ? "text-base px-6 py-3" : "text-lg px-8 py-4"
                  }`}
                >
                  <Map className="mr-2 w-5 h-5" />
                  Explore Australian Regions
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Inspiration Section */}
      <section className={`bg-white transition-all duration-500 ${responsive.sectionSpacing}`}>
        <div className={`container mx-auto ${responsive.container}`}>
          <div className="text-center mb-12">
            <h2 className={`font-bold text-gray-900 mb-4 ${responsive.textSize.section}`}>Imagine Your Australian Journey</h2>
            <p className={`text-gray-600 mx-auto max-w-2xl ${responsive.textSize.body}`}>
              A few ideas to begin your planning conversation. These are destination inspirations, with itineraries and
              availability still to be confirmed.
            </p>
          </div>

          <div className={responsive.grid.features}>
            {journeyIdeas.map((idea, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <Bird className="text-yellow-400 fill-current w-4 h-4" />
                  </div>
                  <p className="text-gray-700 italic leading-relaxed mb-6 flex-grow text-sm lg:text-base">
                    {idea.text}
                  </p>
                  <div className="text-sm">
                    <div className="font-semibold text-gray-900">{idea.title}</div>
                    <div className="text-gray-600">{idea.location}</div>
                    <div className="text-gray-500">{idea.category}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose AVES Section */}
      <section className={`bg-gradient-to-br from-gray-50 to-blue-50 ${responsive.sectionSpacing}`}>
        <div className={`container mx-auto ${responsive.container}`}>
          <div className="text-center mb-12">
            <h2 className={`font-bold text-gray-900 mb-4 ${responsive.textSize.section}`}>Why Choose AVES</h2>
            <p className={`text-gray-600 mx-auto max-w-2xl ${responsive.textSize.body}`}>
              Start with the birds and places that interest you. Explore our Australian direction, share your travel
              preferences, and follow our launch and B Corp certification journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Your Journey</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Share Your Travel Ideas</p>
                <Link href="/contact" className="text-emerald-600 hover:text-emerald-700 text-sm mt-2 inline-block">
                  Start Planning
                </Link>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Leaf className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">B Corp</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Pursuing Certification</p>
                <Link
                  href="/about/b-corp"
                  className="text-emerald-600 hover:text-emerald-700 text-sm mt-2 inline-block"
                >
                  Our Journey
                </Link>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Eye className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Birdlife</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Discover Australian Regions</p>
                <Link
                  href="/aves-explorer"
                  className="text-emerald-600 hover:text-emerald-700 text-sm mt-2 inline-block"
                >
                  Explore Regions
                </Link>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Nature</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Make Room for Discovery</p>
                <Link
                  href="/contact?intent=waitlist"
                  className="text-emerald-600 hover:text-emerald-700 text-sm mt-2 inline-block"
                >
                  Follow the Launch
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form Section - No FAQ on homepage */}
      <ContactFormSection showTitle={true} showFAQ={false} variant="homepage" />

      {/* Footer */}
      <Footer />
    </div>
  )
}
