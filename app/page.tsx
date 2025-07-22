"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  CheckCircle,
  Star,
  Calendar,
  TelescopeIcon as Binoculars,
  Clock,
  Map,
  Bird,
  Globe,
  TreePine,
  Mountain,
} from "lucide-react"
import Link from "next/link"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import HomepageBirdCarousel from "@/components/homepage-bird-carousel"

export default function AVESLandingPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedTourTypes, setSelectedTourTypes] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [currentReview, setCurrentReview] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    travelDate: "",
    groupSize: "1 person",
    desiredDuration: "8 days",
    experienceLevel: "Beginner birder",
    specialRequests: "",
  })

  const reviews = [
    {
      text: "Over 500 species including 40+ endemics! I photographed 330+ species across Caribbean, SNSM, and 3 Andes tours in one incredible month. This was the best experience of my life.",
      author: "Royann",
      location: "USA",
      role: "Wildlife Photographer",
      rating: 5,
    },
    {
      text: "Une expérience extraordinaire! Les guides connaissent chaque chant d'oiseau. J'ai vu des espèces que je n'aurais jamais imaginées. Merci AVES pour cette aventure inoubliable!",
      author: "Sylvain",
      location: "Quebec, Canada",
      role: "Ornithologue Amateur",
      rating: 5,
    },
    {
      text: "At 80+ years old, this was our final birding adventure, and AVES made it absolutely perfect. Professional, caring guides who understood our pace. We couldn't have asked for a better farewell trip.",
      author: "Lisa & Peter",
      location: "Pender Island, BC",
      role: "Birding Enthusiasts",
      rating: 5,
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

    // Auto-rotate reviews every 6 seconds
    const reviewInterval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length)
    }, 6000)

    return () => clearInterval(reviewInterval)
  }, [])

  const toggleSelection = (item: string, selectedItems: string[], setSelectedItems: (items: string[]) => void) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((selected) => selected !== item))
    } else {
      setSelectedItems([...selectedItems, item])
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const generateEmailLink = () => {
    const subject = encodeURIComponent("Colombian Birding Tour Inquiry")
    const body = encodeURIComponent(`Hello AVES Team,

I'm interested in planning a Colombian birding adventure. Here are my details:

Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Travel Date: ${formData.travelDate || "Not specified"}
Group Size: ${formData.groupSize}
Desired Duration: ${formData.desiredDuration}
Experience Level: ${formData.experienceLevel}

Interested Tour Types: ${selectedTourTypes.length > 0 ? selectedTourTypes.join(", ") : "Not specified"}
Desired Locations: ${selectedLocations.length > 0 ? selectedLocations.join(", ") : "Not specified"}

Special Interests/Requests: ${formData.specialRequests || "None specified"}

I look forward to hearing from you within 24 hours as mentioned on your website.

Best regards,
${formData.firstName} ${formData.lastName}`)

    return `mailto:info@aves.bio?subject=${subject}&body=${body}`
  }

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
                  🌿 B Corp Certified • Carbon Neutral Tours
                </Badge>

                <h1 className={`font-bold text-gray-900 leading-tight ${responsive.textSize.hero}`}>
                  Discover Colombia's
                  <span className="text-emerald-600 block">1,900+ Bird Species</span>
                </h1>

                <p
                  className={`text-gray-600 leading-relaxed ${responsive.textSize.body} max-w-2xl ${isMobile ? "mx-auto" : ""}`}
                >
                  Join exclusive small-group expeditions with expert ornithologist guides across the world's most
                  biodiverse country.
                </p>

                {/* Key Value Props */}
                <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-emerald-100 shadow-lg p-4 lg:p-6">
                  <div
                    className={`${isMobile ? "grid grid-cols-1 gap-3 text-sm" : "grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm lg:text-base"}`}
                  >
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="text-emerald-600 flex-shrink-0 w-5 h-5" />
                      <span className="text-gray-700">Expert ornithologist guides</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="text-emerald-600 flex-shrink-0 w-5 h-5" />
                      <span className="text-gray-700">Maximum 4 guests per tour</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="text-emerald-600 flex-shrink-0 w-5 h-5" />
                      <span className="text-gray-700">78+ endemic species</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="text-emerald-600 flex-shrink-0 w-5 h-5" />
                      <span className="text-gray-700">100% carbon neutral</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Primary CTAs */}
              <div className={`flex gap-4 ${isMobile ? "flex-col" : "flex-col sm:flex-row"}`}>
                <Link href="/tours" className={isMobile ? "w-full" : "flex-1"}>
                  <Button
                    size="lg"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-base lg:text-lg px-8 py-4"
                  >
                    <Binoculars className="mr-2 w-5 h-5" />
                    Explore Our Tours
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/shopping" className={isMobile ? "w-full" : "flex-1"}>
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

              {/* Urgency Element */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-800">
                <div className="flex items-start space-x-3">
                  <Clock className="flex-shrink-0 w-5 h-5 mt-0.5" />
                  <span className="font-medium text-sm lg:text-base">
                    Limited Availability: Only 2-3 tours per month • Book early
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
                Explore Colombia's Bioregions
              </h2>
              <p className={`text-gray-600 mx-auto max-w-4xl ${responsive.textSize.body} leading-relaxed`}>
                Discover 11 unique bioregions, each offering distinct ecosystems and endemic bird species. From Amazon
                rainforests to Andean cloud forests, plan your perfect birding adventure.
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
              <Link href="/aves-explorer" className="group block">
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-emerald-50 to-green-50">
                  <CardContent className={`text-center ${isMobile ? "p-6" : "p-6 lg:p-8"}`}>
                    <div className="w-12 h-12 lg:w-14 lg:h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6 group-hover:bg-emerald-200 transition-colors">
                      <TreePine className="w-6 h-6 lg:w-7 lg:h-7 text-emerald-600" />
                    </div>
                    <h3
                      className={`font-bold text-gray-900 mb-3 lg:mb-4 ${isMobile ? "text-lg" : "text-xl lg:text-2xl"}`}
                    >
                      Amazon
                    </h3>
                    <p
                      className={`text-gray-600 mb-4 lg:mb-6 leading-relaxed ${isMobile ? "text-sm" : "text-base lg:text-lg"}`}
                    >
                      Pristine rainforests with the highest biodiversity on Earth
                    </p>
                    <div className={`text-emerald-600 font-semibold ${isMobile ? "text-sm" : "text-base lg:text-lg"}`}>
                      1,100+ species
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/aves-explorer" className="group block">
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-blue-50 to-indigo-50">
                  <CardContent className={`text-center ${isMobile ? "p-6" : "p-6 lg:p-8"}`}>
                    <div className="w-12 h-12 lg:w-14 lg:h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6 group-hover:bg-blue-200 transition-colors">
                      <Mountain className="w-6 h-6 lg:w-7 lg:h-7 text-blue-600" />
                    </div>
                    <h3
                      className={`font-bold text-gray-900 mb-3 lg:mb-4 ${isMobile ? "text-lg" : "text-xl lg:text-2xl"}`}
                    >
                      Andean Ranges
                    </h3>
                    <p
                      className={`text-gray-600 mb-4 lg:mb-6 leading-relaxed ${isMobile ? "text-sm" : "text-base lg:text-lg"}`}
                    >
                      Cloud forests and páramo with spectacular endemic species
                    </p>
                    <div className={`text-blue-600 font-semibold ${isMobile ? "text-sm" : "text-base lg:text-lg"}`}>
                      1,100+ species • 55 endemics
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/aves-explorer" className="group block">
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
                      Sierra Nevada
                    </h3>
                    <p
                      className={`text-gray-600 mb-4 lg:mb-6 leading-relaxed ${isMobile ? "text-sm" : "text-base lg:text-lg"}`}
                    >
                      World's highest coastal mountain with unique endemics
                    </p>
                    <div className={`text-orange-600 font-semibold ${isMobile ? "text-sm" : "text-base lg:text-lg"}`}>
                      500+ species • 26 endemics
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
                  Explore Interactive Map
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className={`bg-white transition-all duration-500 ${responsive.sectionSpacing}`}>
        <div className={`container mx-auto ${responsive.container}`}>
          <div className="text-center mb-12">
            <h2 className={`font-bold text-gray-900 mb-4 ${responsive.textSize.section}`}>What Our Guests Say</h2>
            <p className={`text-gray-600 mx-auto max-w-2xl ${responsive.textSize.body}`}>
              Hear from birding enthusiasts who have experienced Colombia's incredible avifauna with AVES.
            </p>
          </div>

          <div className={responsive.grid.features}>
            {reviews.map((review, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="text-yellow-400 fill-current w-4 h-4" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic leading-relaxed mb-6 flex-grow text-sm lg:text-base">
                    "{review.text}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
