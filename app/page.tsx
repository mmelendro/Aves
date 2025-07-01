"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Users,
  Award,
  ArrowRight,
  CheckCircle,
  Mail,
  Star,
  Calendar,
  Shield,
  TelescopeIcon as Binoculars,
  Clock,
  Map,
  Bird,
  Globe,
  TreePine,
  Mountain,
} from "lucide-react"
import Link from "next/link"
import EnhancedEndemicBirdsCarousel from "@/components/enhanced-endemic-birds-carousel"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import {
  DURATION_OPTIONS,
  LOCATION_OPTIONS,
  TOUR_TYPE_OPTIONS,
  EXPERIENCE_LEVELS,
  GROUP_SIZE_OPTIONS,
} from "@/lib/form-options"

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

    return `mailto:info@aves.com?subject=${subject}&body=${body}`
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
        ? "space-y-8"
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

      {/* Hero Section - Completely Redesigned for Perfect Responsive Layout */}
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
                <Link href="#contact" className={isMobile ? "w-full" : "flex-1"}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 shadow-md hover:shadow-lg transition-all duration-300 bg-transparent text-base lg:text-lg px-8 py-4"
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

            {/* Enhanced Birds Carousel - Right Side on Desktop, Bottom on Mobile */}
            <div className={`relative ${isMobile ? "mt-8" : "lg:order-2"}`}>
              <div
                className={`w-full mx-auto ${
                  isMobile ? "aspect-[4/3] max-w-md" : isTablet ? "aspect-[4/3] max-w-lg" : "aspect-[3/4] max-w-xl"
                }`}
              >
                <EnhancedEndemicBirdsCarousel
                  className="shadow-2xl rounded-2xl w-full h-full"
                  autoPlay={true}
                  autoPlayInterval={7000}
                />
              </div>
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
                      Amazon & Pacific
                    </h3>
                    <p
                      className={`text-gray-600 mb-4 lg:mb-6 leading-relaxed ${isMobile ? "text-sm" : "text-base lg:text-lg"}`}
                    >
                      Pristine rainforests with the highest biodiversity on Earth
                    </p>
                    <div className={`text-emerald-600 font-semibold ${isMobile ? "text-sm" : "text-base lg:text-lg"}`}>
                      875+ species • 67 endemics
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
                      720+ species • 45 endemics
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
                      635+ species • 79 endemics
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
                  <div>
                    <p className="font-semibold text-gray-900">{review.author}</p>
                    <p className="text-gray-600 text-sm">
                      {review.role}, {review.location}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose AVES - Redesigned with Card-Style CTAs */}
      <section className={`bg-gray-50 transition-all duration-500 ${responsive.sectionSpacing}`}>
        <div className={`container mx-auto ${responsive.container}`}>
          <div className="text-center mb-12">
            <h2 className={`font-bold text-gray-900 mb-4 ${responsive.textSize.section}`}>Why Choose AVES</h2>
            <p className={`text-gray-600 mx-auto max-w-3xl ${responsive.textSize.body}`}>
              We're passionate conservationists, expert birders, and your partners in discovering Colombia's incredible
              avian diversity with award-winning excellence.
            </p>
          </div>

          <div className={responsive.grid.features}>
            {/* Expert Guides - Card Style */}
            <Link href="/team" className="group block">
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 hover:border-emerald-300">
                <CardContent className="text-center p-6">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-200 transition-colors">
                    <Users className="text-emerald-600 w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-4 text-xl group-hover:text-emerald-700 transition-colors">
                    Expert Local Guides
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6 group-hover:text-gray-700 transition-colors">
                    Our certified ornithologist guides know every bird call, behavior, and habitat across Colombia's
                    diverse regions, ensuring exceptional wildlife encounters.
                  </p>
                  <div className="font-bold text-emerald-600 mb-2 group-hover:text-emerald-700 text-2xl lg:text-3xl transition-colors">
                    Expert
                  </div>
                  <div className="text-gray-600 group-hover:text-gray-700 text-sm lg:text-base transition-colors">
                    Ornithologist Guides
                  </div>
                  <div className="text-emerald-600 mt-1 group-hover:text-emerald-700 text-xs transition-colors">
                    Meet Our Team
                  </div>
                  <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight className="mx-auto text-emerald-600 w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Conservation & B Corp - Card Style with Multiple Links */}
            <div className="space-y-4">
              <Link href="/about/b-corp" className="group block">
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 hover:border-green-300">
                  <CardContent className="text-center p-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                      <Shield className="text-green-600 w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2 text-lg group-hover:text-green-700 transition-colors">
                      B Corp Certified
                    </h4>
                    <div className="font-bold text-green-600 mb-1 group-hover:text-green-700 text-xl transition-colors">
                      B Corp
                    </div>
                    <div className="text-gray-600 group-hover:text-gray-700 text-sm transition-colors">
                      Certified Business
                    </div>
                    <div className="text-green-600 mt-1 group-hover:text-green-700 text-xs transition-colors">
                      Our Journey
                    </div>
                    <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowRight className="mx-auto text-green-600 w-3 h-3" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/conservation" className="group block">
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 hover:border-green-300">
                  <CardContent className="text-center p-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                      <Shield className="text-green-600 w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2 text-lg group-hover:text-green-700 transition-colors">
                      Conservation Impact
                    </h4>
                    <div className="font-bold text-green-600 mb-1 group-hover:text-green-700 text-xl transition-colors">
                      100%
                    </div>
                    <div className="text-gray-600 group-hover:text-gray-700 text-sm transition-colors">
                      Carbon Neutral
                    </div>
                    <div className="text-green-600 mt-1 group-hover:text-green-700 text-xs transition-colors">
                      Our Impact
                    </div>
                    <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowRight className="mx-auto text-green-600 w-3 h-3" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>

            {/* Exclusive Access & Recognition - Card Style */}
            <Link href="/about/partners" className="group block">
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 hover:border-blue-300">
                <CardContent className="text-center p-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                    <Award className="text-blue-600 w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-4 text-xl group-hover:text-blue-700 transition-colors">
                    Exclusive Access & Recognition
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6 group-hover:text-gray-700 transition-colors">
                    Access private reserves and research stations unavailable to others. Recommended by leading
                    ornithologists and featured in top birding publications worldwide.
                  </p>
                  <div className="font-bold text-blue-600 mb-2 group-hover:text-blue-700 text-2xl lg:text-3xl transition-colors">
                    Exclusive
                  </div>
                  <div className="text-gray-600 group-hover:text-gray-700 text-sm lg:text-base transition-colors">
                    Partner Network
                  </div>
                  <div className="text-blue-600 mt-1 group-hover:text-blue-700 text-xs transition-colors">
                    View Partners
                  </div>
                  <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight className="mx-auto text-blue-600 w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="bg-gradient-to-r from-gray-50 to-emerald-50 rounded-xl mt-12 p-8">
            <div className={responsive.grid.stats}>
              <div className="text-center">
                <div className="font-bold text-emerald-600 mb-1 text-2xl lg:text-3xl">B Corp</div>
                <div className="text-gray-600 text-sm">Certified</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-green-600 mb-1 text-2xl lg:text-3xl">100%</div>
                <div className="text-gray-600 text-sm">Carbon Neutral</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-blue-600 mb-1 text-2xl lg:text-3xl">Max 4</div>
                <div className="text-gray-600 text-sm">Guests per Tour</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-purple-600 mb-1 text-2xl lg:text-3xl">24hr</div>
                <div className="text-gray-600 text-sm">Response Time</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section - Enhanced with Better Padding */}
      <section
        id="contact"
        className={`bg-gradient-to-br from-emerald-50 to-blue-50 transition-all duration-500 ${responsive.sectionSpacing} pt-32`}
      >
        <div className={`container mx-auto ${responsive.container}`}>
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className={`font-bold text-gray-900 mb-4 ${responsive.textSize.section}`}>
                Plan Your Colombian Birding Adventure
              </h2>
              <p className={`text-gray-600 mx-auto max-w-2xl ${responsive.textSize.body}`}>
                Tell us about your birding interests. We'll respond within 24 hours with personalized recommendations.
              </p>
            </div>

            <Card className="shadow-xl border-0">
              <CardContent className="p-8">
                <div className={`${isMobile ? "space-y-8" : "grid lg:grid-cols-2 gap-12"}`}>
                  {/* Contact Form */}
                  <div className="space-y-6">
                    <div className={`${isMobile ? "space-y-4" : "grid grid-cols-2 gap-4"}`}>
                      <div>
                        <label className="block font-medium text-gray-700 mb-2 text-sm">First Name *</label>
                        <Input
                          placeholder="Your first name"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          className="h-11"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-gray-700 mb-2 text-sm">Last Name *</label>
                        <Input
                          placeholder="Your last name"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          className="h-11"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-medium text-gray-700 mb-2 text-sm">Email Address *</label>
                      <Input
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="h-11"
                      />
                    </div>

                    <div className={`${isMobile ? "space-y-4" : "grid grid-cols-2 gap-4"}`}>
                      <div>
                        <label className="block font-medium text-gray-700 mb-2 text-sm">Travel Date</label>
                        <Input
                          type="date"
                          value={formData.travelDate}
                          onChange={(e) => handleInputChange("travelDate", e.target.value)}
                          className="h-11"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-gray-700 mb-2 text-sm">Group Size</label>
                        <select
                          value={formData.groupSize}
                          onChange={(e) => handleInputChange("groupSize", e.target.value)}
                          className="w-full px-3 py-2 h-11 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                          {GROUP_SIZE_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className={`${isMobile ? "space-y-4" : "grid grid-cols-2 gap-4"}`}>
                      <div>
                        <label className="block font-medium text-gray-700 mb-2 text-sm">Duration</label>
                        <select
                          value={formData.desiredDuration}
                          onChange={(e) => handleInputChange("desiredDuration", e.target.value)}
                          className="w-full px-3 py-2 h-11 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                          {DURATION_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block font-medium text-gray-700 mb-2 text-sm">Experience Level</label>
                        <select
                          value={formData.experienceLevel}
                          onChange={(e) => handleInputChange("experienceLevel", e.target.value)}
                          className="w-full px-3 py-2 h-11 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                          {EXPERIENCE_LEVELS.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-medium text-gray-700 mb-2 text-sm">
                        Special Interests or Requests
                      </label>
                      <textarea
                        placeholder="Tell us about specific birds you'd like to see, photography interests, accessibility needs, etc."
                        value={formData.specialRequests}
                        onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 h-24 resize-none"
                      />
                    </div>
                  </div>

                  {/* Tour Preferences */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4 text-lg">Tour Types of Interest</h3>
                      <div className="space-y-2">
                        {TOUR_TYPE_OPTIONS.map((type) => (
                          <label key={type} className="flex items-center space-x-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedTourTypes.includes(type)}
                              onChange={() => toggleSelection(type, selectedTourTypes, setSelectedTourTypes)}
                              className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                            />
                            <span className="text-gray-700 text-sm">{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4 text-lg">Preferred Locations</h3>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {LOCATION_OPTIONS.map((location) => (
                          <label key={location} className="flex items-center space-x-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedLocations.includes(location)}
                              onChange={() => toggleSelection(location, selectedLocations, setSelectedLocations)}
                              className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                            />
                            <span className="text-gray-700 text-sm">{location}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="text-emerald-600 flex-shrink-0 w-5 h-5 mt-0.5" />
                        <div>
                          <p className="font-medium text-emerald-800 text-sm">24-Hour Response Guarantee</p>
                          <p className="text-emerald-700 text-xs mt-1">
                            We'll respond with personalized recommendations within 24 hours
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <a href={generateEmailLink()} className="inline-block w-full sm:w-auto">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-lg px-12 py-4"
                    >
                      <Mail className="mr-2 w-5 h-5" />
                      Send My Inquiry
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </a>
                  <p className="text-gray-600 text-sm mt-4">
                    Or email us directly at{" "}
                    <a href="mailto:info@aves.com" className="text-emerald-600 hover:underline">
                      info@aves.com
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
