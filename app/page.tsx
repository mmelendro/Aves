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
  MapPin,
  Star,
  Calendar,
  Shield,
  Camera,
  Heart,
  TelescopeIcon as Binoculars,
  Clock,
  ExternalLink,
  Map,
} from "lucide-react"
import Link from "next/link"
import EnhancedEndemicBirdsCarousel from "@/components/enhanced-endemic-birds-carousel"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import FloatingAVESNavigation from "@/components/floating-aves-navigation"
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

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
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

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <NavigationHeader currentPage="/" />

      {/* Hero Section - Mobile Optimized */}
      <section
        className={`relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-blue-50 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        } ${isMobile ? "py-8 px-4" : "py-12 sm:py-16 lg:py-24"}`}
      >
        <div className={`container mx-auto relative z-10 ${isMobile ? "px-2" : "px-4 sm:px-6"}`}>
          <div className={`${isMobile ? "space-y-6" : "grid lg:grid-cols-2 gap-8 lg:gap-16 items-center"}`}>
            {/* Text Content */}
            <div className={`${isMobile ? "text-center space-y-4" : "space-y-6 lg:space-y-8 order-2 lg:order-1"}`}>
              <div className={`${isMobile ? "space-y-3" : "space-y-4 lg:space-y-6"}`}>
                <Badge
                  className={`bg-emerald-100 text-emerald-800 hover:bg-emerald-100 animate-pulse ${
                    isMobile ? "text-xs px-2 py-1" : ""
                  }`}
                >
                  🌿 B Corp Certified • Carbon Neutral Tours
                </Badge>
                <h1
                  className={`font-bold text-gray-900 leading-tight ${
                    isMobile ? "text-2xl sm:text-3xl" : "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
                  }`}
                >
                  Discover Colombia's
                  <span className="text-emerald-600 block">1,900+ Bird Species</span>
                </h1>
                <p
                  className={`text-gray-600 leading-relaxed ${
                    isMobile ? "text-base px-2" : "text-lg sm:text-xl lg:text-2xl"
                  }`}
                >
                  Join exclusive small-group expeditions with expert ornithologist guides across the world's most
                  biodiverse country.
                </p>

                {/* Key Value Props - Mobile Optimized */}
                <div
                  className={`bg-white/90 backdrop-blur-sm rounded-xl border border-emerald-100 shadow-lg ${
                    isMobile ? "p-3 mx-2" : "p-4 sm:p-6"
                  }`}
                >
                  <div
                    className={`${isMobile ? "grid grid-cols-1 gap-2 text-xs" : "grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm"}`}
                  >
                    <div className="flex items-center space-x-2">
                      <CheckCircle className={`text-emerald-600 flex-shrink-0 ${isMobile ? "w-3 h-3" : "w-4 h-4"}`} />
                      <span className="text-gray-700">Expert ornithologist guides</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className={`text-emerald-600 flex-shrink-0 ${isMobile ? "w-3 h-3" : "w-4 h-4"}`} />
                      <span className="text-gray-700">Maximum 4 guests per tour</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className={`text-emerald-600 flex-shrink-0 ${isMobile ? "w-3 h-3" : "w-4 h-4"}`} />
                      <span className="text-gray-700">78+ endemic species</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className={`text-emerald-600 flex-shrink-0 ${isMobile ? "w-3 h-3" : "w-4 h-4"}`} />
                      <span className="text-gray-700">100% carbon neutral</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Primary CTAs - Mobile Optimized */}
              <div className={`flex flex-col gap-3 ${isMobile ? "px-2" : "sm:gap-4"}`}>
                <Link href="/tours" className="w-full">
                  <Button
                    size={isMobile ? "default" : "lg"}
                    className={`w-full bg-emerald-600 hover:bg-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                      isMobile ? "text-sm px-4 py-3 h-12" : "text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4"
                    }`}
                  >
                    <Binoculars className={`mr-2 ${isMobile ? "w-4 h-4" : "w-4 h-4 sm:w-5 sm:h-5"}`} />
                    Explore Our Tours
                    <ArrowRight className={`ml-2 ${isMobile ? "w-3 h-3" : "w-3 h-3 sm:w-4 sm:h-4"}`} />
                  </Button>
                </Link>
                <Link href="#contact" className="w-full">
                  <Button
                    size={isMobile ? "default" : "lg"}
                    variant="outline"
                    className={`w-full border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 shadow-md hover:shadow-lg transition-all duration-300 bg-transparent ${
                      isMobile ? "text-sm px-4 py-3 h-12" : "text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4"
                    }`}
                  >
                    <Calendar className={`mr-2 ${isMobile ? "w-4 h-4" : "w-4 h-4 sm:w-5 sm:h-5"}`} />
                    Plan My Trip
                  </Button>
                </Link>
              </div>

              {/* Urgency Element - Mobile Optimized */}
              <div
                className={`bg-amber-50 border border-amber-200 rounded-lg text-amber-800 ${
                  isMobile ? "p-3 mx-2" : "p-3 sm:p-4"
                }`}
              >
                <div className={`flex space-x-3 ${isMobile ? "items-start text-xs" : "items-start sm:items-center"}`}>
                  <Clock
                    className={`flex-shrink-0 ${isMobile ? "w-4 h-4 mt-0.5" : "w-4 h-4 sm:w-5 sm:h-5 mt-0.5 sm:mt-0"}`}
                  />
                  <span className={`font-medium ${isMobile ? "text-xs leading-tight" : "text-sm sm:text-base"}`}>
                    Limited Availability: Only 2-3 tours per month • Book early
                  </span>
                </div>
              </div>
            </div>

            {/* Enhanced Birds Carousel - Mobile Optimized */}
            <div className={`relative ${isMobile ? "mt-6" : "order-1 lg:order-2"}`}>
              <div
                className={`w-full mx-auto ${
                  isMobile
                    ? "aspect-[4/3] max-w-sm"
                    : "aspect-[4/3] sm:aspect-[4/3] lg:aspect-[3/4] max-w-lg lg:max-w-none"
                }`}
              >
                <EnhancedEndemicBirdsCarousel
                  className={`shadow-xl rounded-xl w-full h-full ${isMobile ? "mx-auto" : ""}`}
                  autoPlay={true}
                  autoPlayInterval={7000}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements - Mobile Optimized */}
        <div
          className={`absolute top-0 right-0 bg-emerald-100 rounded-full opacity-20 ${
            isMobile
              ? "w-16 h-16 -translate-y-8 translate-x-8"
              : "w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 -translate-y-16 sm:-translate-y-24 lg:-translate-y-32 translate-x-16 sm:translate-x-24 lg:translate-x-32"
          }`}
        ></div>
        <div
          className={`absolute bottom-0 left-0 bg-blue-100 rounded-full opacity-20 ${
            isMobile
              ? "w-12 h-12 translate-y-6 -translate-x-6"
              : "w-24 h-24 sm:w-36 sm:h-36 lg:w-48 lg:h-48 translate-y-12 sm:translate-y-18 lg:translate-y-24 -translate-x-12 sm:-translate-x-18 lg:-translate-x-24"
          }`}
        ></div>
      </section>

      {/* Social Proof Section - Mobile Optimized */}
      <section className={`bg-white ${isMobile ? "py-8 px-4" : "py-16"}`}>
        <div className={`container mx-auto ${isMobile ? "px-2" : "px-4 sm:px-6"}`}>
          <div className={`text-center ${isMobile ? "mb-6" : "mb-12"}`}>
            <h2 className={`font-bold text-gray-900 mb-4 ${isMobile ? "text-2xl" : "text-3xl"}`}>
              What Our Guests Say
            </h2>
            <p className={`text-gray-600 mx-auto ${isMobile ? "text-base px-2" : "text-lg max-w-2xl"}`}>
              Hear from birding enthusiasts who have experienced Colombia's incredible avifauna with AVES.
            </p>
          </div>

          <div className={`${isMobile ? "space-y-4" : "grid grid-cols-1 md:grid-cols-3 gap-8"}`}>
            {reviews.map((review, index) => (
              <Card
                key={index}
                className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${isMobile ? "mx-2" : ""}`}
              >
                <CardContent className={isMobile ? "p-4" : "p-6"}>
                  <div className={`flex items-center ${isMobile ? "mb-3" : "mb-4"}`}>
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className={`text-yellow-400 fill-current ${isMobile ? "w-3 h-3" : "w-4 h-4"}`} />
                    ))}
                  </div>
                  <p className={`text-gray-700 italic leading-relaxed mb-4 ${isMobile ? "text-sm" : ""}`}>
                    "{review.text}"
                  </p>
                  <div>
                    <p className={`font-semibold text-gray-900 ${isMobile ? "text-sm" : ""}`}>{review.author}</p>
                    <p className={`text-gray-600 ${isMobile ? "text-xs" : "text-sm"}`}>
                      {review.role}, {review.location}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tour Types Section - Mobile Optimized */}
      <section id="tours" className={`bg-gray-50 ${isMobile ? "py-8 px-4" : "py-16"}`}>
        <div className={`container mx-auto ${isMobile ? "px-2" : "px-4 sm:px-6"}`}>
          <div className={`text-center ${isMobile ? "mb-6" : "mb-12"}`}>
            <h2 className={`font-bold text-gray-900 mb-4 ${isMobile ? "text-2xl" : "text-3xl"}`}>
              Four Unique Birding Experiences
            </h2>
            <p className={`text-gray-600 mx-auto mb-6 ${isMobile ? "text-base px-2" : "text-lg max-w-3xl"}`}>
              Each tour is carefully crafted for different interests and comfort levels, all featuring expert guides and
              premium accommodations.
            </p>
          </div>

          <div className={`${isMobile ? "space-y-4 mb-6" : "grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"}`}>
            {/* Adventure Tours - Mobile Optimized */}
            <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="absolute top-0 right-0 bg-emerald-600 text-white px-3 py-1 text-xs font-bold rounded-bl-lg">
                POPULAR
              </div>
              <CardContent className={isMobile ? "p-4" : "p-6"}>
                <div className={`flex items-center justify-between ${isMobile ? "mb-2" : "mb-3"}`}>
                  <h3 className={`font-bold text-gray-900 ${isMobile ? "text-base" : "text-lg"}`}>
                    🍃 Adventure Tours
                  </h3>
                  <div className="flex items-center space-x-1">
                    <Star className={`text-yellow-400 fill-current ${isMobile ? "w-3 h-3" : "w-4 h-4"}`} />
                    <span className={`text-gray-600 ${isMobile ? "text-xs" : "text-sm"}`}>4.9</span>
                  </div>
                </div>
                <p className={`text-gray-600 mb-4 leading-relaxed ${isMobile ? "text-xs" : "text-sm"}`}>
                  Our signature birding expeditions across Colombia's prime hotspots. 7-14 days of immersive wildlife
                  discovery.
                </p>
                <div className={`space-y-2 ${isMobile ? "mb-3" : "mb-5"}`}>
                  <div className={`flex items-center text-gray-600 ${isMobile ? "text-xs" : "text-xs"}`}>
                    <CheckCircle
                      className={`text-emerald-600 mr-2 flex-shrink-0 ${isMobile ? "w-2 h-2" : "w-3 h-3"}`}
                    />
                    <span>Professional ornithologist guides</span>
                  </div>
                  <div className={`flex items-center text-gray-600 ${isMobile ? "text-xs" : "text-xs"}`}>
                    <CheckCircle
                      className={`text-emerald-600 mr-2 flex-shrink-0 ${isMobile ? "w-2 h-2" : "w-3 h-3"}`}
                    />
                    <span>Premium eco-lodges</span>
                  </div>
                  <div className={`flex items-center text-gray-600 ${isMobile ? "text-xs" : "text-xs"}`}>
                    <CheckCircle
                      className={`text-emerald-600 mr-2 flex-shrink-0 ${isMobile ? "w-2 h-2" : "w-3 h-3"}`}
                    />
                    <span>Conservation project visits</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className={`font-bold text-emerald-600 ${isMobile ? "text-lg" : "text-xl"}`}>$8,000</div>
                      <div className={`text-gray-500 ${isMobile ? "text-xs" : "text-xs"}`}>avg. per person</div>
                    </div>
                    <Badge className={`bg-emerald-100 text-emerald-800 ${isMobile ? "text-xs" : "text-xs"}`}>
                      7-14 days
                    </Badge>
                  </div>
                  <Link href="/tours/adventure" className="block">
                    <Button
                      className={`w-full bg-emerald-600 hover:bg-emerald-700 ${isMobile ? "text-xs h-9" : "text-sm"}`}
                    >
                      View Details & Book
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Vision Tours - Mobile Optimized */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className={isMobile ? "p-4" : "p-6"}>
                <div className={`flex items-center justify-between ${isMobile ? "mb-2" : "mb-3"}`}>
                  <h3 className={`font-bold text-gray-900 ${isMobile ? "text-base" : "text-lg"}`}>🪶 Vision Tours</h3>
                  <Camera className={`text-purple-600 ${isMobile ? "w-4 h-4" : "w-5 h-5"}`} />
                </div>
                <p className={`text-gray-600 mb-4 leading-relaxed ${isMobile ? "text-xs" : "text-sm"}`}>
                  Specialized photography workshops with professional wildlife photographers capturing Colombia's avian
                  beauty.
                </p>
                <div className={`space-y-2 ${isMobile ? "mb-3" : "mb-5"}`}>
                  <div className={`flex items-center text-gray-600 ${isMobile ? "text-xs" : "text-xs"}`}>
                    <CheckCircle className={`text-purple-600 mr-2 flex-shrink-0 ${isMobile ? "w-2 h-2" : "w-3 h-3"}`} />
                    <span>Exclusive photography hides</span>
                  </div>
                  <div className={`flex items-center text-gray-600 ${isMobile ? "text-xs" : "text-xs"}`}>
                    <CheckCircle className={`text-purple-600 mr-2 flex-shrink-0 ${isMobile ? "w-2 h-2" : "w-3 h-3"}`} />
                    <span>Post-processing sessions</span>
                  </div>
                  <div className={`flex items-center text-gray-600 ${isMobile ? "text-xs" : "text-xs"}`}>
                    <CheckCircle className={`text-purple-600 mr-2 flex-shrink-0 ${isMobile ? "w-2 h-2" : "w-3 h-3"}`} />
                    <span>Professional equipment included</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className={`font-bold text-purple-600 ${isMobile ? "text-lg" : "text-xl"}`}>$10,000</div>
                      <div className={`text-gray-500 ${isMobile ? "text-xs" : "text-xs"}`}>avg. per person</div>
                    </div>
                    <Badge className={`bg-purple-100 text-purple-800 ${isMobile ? "text-xs" : "text-xs"}`}>
                      10-12 days
                    </Badge>
                  </div>
                  <Link href="/tours/vision" className="block">
                    <Button
                      variant="outline"
                      className={`w-full border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white bg-transparent ${
                        isMobile ? "text-xs h-9" : "text-sm"
                      }`}
                    >
                      View Details & Book
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Elevate Tours - Mobile Optimized */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className={isMobile ? "p-4" : "p-6"}>
                <div className={`flex items-center justify-between ${isMobile ? "mb-2" : "mb-3"}`}>
                  <h3 className={`font-bold text-gray-900 ${isMobile ? "text-base" : "text-lg"}`}>🌼 Elevate Tours</h3>
                  <Award className={`text-yellow-500 ${isMobile ? "w-4 h-4" : "w-5 h-5"}`} />
                </div>
                <p className={`text-gray-600 mb-4 leading-relaxed ${isMobile ? "text-xs" : "text-sm"}`}>
                  Premium expeditions with luxury amenities in exclusive locations for the ultimate comfort experience.
                </p>
                <div className={`space-y-2 ${isMobile ? "mb-3" : "mb-5"}`}>
                  <div className={`flex items-center text-gray-600 ${isMobile ? "text-xs" : "text-xs"}`}>
                    <CheckCircle className={`text-yellow-500 mr-2 flex-shrink-0 ${isMobile ? "w-2 h-2" : "w-3 h-3"}`} />
                    <span>Luxury accommodations</span>
                  </div>
                  <div className={`flex items-center text-gray-600 ${isMobile ? "text-xs" : "text-xs"}`}>
                    <CheckCircle className={`text-yellow-500 mr-2 flex-shrink-0 ${isMobile ? "w-2 h-2" : "w-3 h-3"}`} />
                    <span>Private chef & spa access</span>
                  </div>
                  <div className={`flex items-center text-gray-600 ${isMobile ? "text-xs" : "text-xs"}`}>
                    <CheckCircle className={`text-yellow-500 mr-2 flex-shrink-0 ${isMobile ? "w-2 h-2" : "w-3 h-3"}`} />
                    <span>Helicopter transfers</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className={`font-bold text-yellow-600 ${isMobile ? "text-lg" : "text-xl"}`}>$12,000</div>
                      <div className={`text-gray-500 ${isMobile ? "text-xs" : "text-xs"}`}>avg. per person</div>
                    </div>
                    <Badge className={`bg-yellow-100 text-yellow-800 ${isMobile ? "text-xs" : "text-xs"}`}>
                      8-10 days
                    </Badge>
                  </div>
                  <Link href="/tours/elevate" className="block">
                    <Button
                      variant="outline"
                      className={`w-full border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white bg-transparent ${
                        isMobile ? "text-xs h-9" : "text-sm"
                      }`}
                    >
                      View Details & Book
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Souls Tours - Mobile Optimized */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className={isMobile ? "p-4" : "p-6"}>
                <div className={`flex items-center justify-between ${isMobile ? "mb-2" : "mb-3"}`}>
                  <h3 className={`font-bold text-gray-900 ${isMobile ? "text-base" : "text-lg"}`}>🍓 Souls Tours</h3>
                  <Heart className={`text-red-500 ${isMobile ? "w-4 h-4" : "w-5 h-5"}`} />
                </div>
                <p className={`text-gray-600 mb-4 leading-relaxed ${isMobile ? "text-xs" : "text-sm"}`}>
                  Cultural immersion tours combining birding with indigenous communities and traditional crafts.
                </p>
                <div className={`space-y-2 ${isMobile ? "mb-3" : "mb-5"}`}>
                  <div className={`flex items-center text-gray-600 ${isMobile ? "text-xs" : "text-xs"}`}>
                    <CheckCircle className={`text-red-500 mr-2 flex-shrink-0 ${isMobile ? "w-2 h-2" : "w-3 h-3"}`} />
                    <span>Indigenous community visits</span>
                  </div>
                  <div className={`flex items-center text-gray-600 ${isMobile ? "text-xs" : "text-xs"}`}>
                    <CheckCircle className={`text-red-500 mr-2 flex-shrink-0 ${isMobile ? "w-2 h-2" : "w-3 h-3"}`} />
                    <span>Traditional craft workshops</span>
                  </div>
                  <div className={`flex items-center text-gray-600 ${isMobile ? "text-xs" : "text-xs"}`}>
                    <CheckCircle className={`text-red-500 mr-2 flex-shrink-0 ${isMobile ? "w-2 h-2" : "w-3 h-3"}`} />
                    <span>Community-based lodging</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className={`font-bold text-red-600 ${isMobile ? "text-lg" : "text-xl"}`}>$14,000</div>
                      <div className={`text-gray-500 ${isMobile ? "text-xs" : "text-xs"}`}>avg. per person</div>
                    </div>
                    <Badge className={`bg-red-100 text-red-800 ${isMobile ? "text-xs" : "text-xs"}`}>6-8 days</Badge>
                  </div>
                  <Link href="/tours/souls" className="block">
                    <Button
                      variant="outline"
                      className={`w-full border-red-600 text-red-600 hover:bg-red-600 hover:text-white bg-transparent ${
                        isMobile ? "text-xs h-9" : "text-sm"
                      }`}
                    >
                      View Details & Book
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section - Mobile Optimized */}
          <div className="text-center">
            <div
              className={`bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl border border-emerald-200 ${
                isMobile ? "p-4 mx-2" : "p-6"
              }`}
            >
              <h3 className={`font-bold text-gray-900 mb-3 ${isMobile ? "text-lg" : "text-xl"}`}>
                Can't Decide? Let Us Help You Choose
              </h3>
              <p className={`text-gray-600 mb-4 mx-auto ${isMobile ? "text-sm px-2" : "text-base max-w-2xl"}`}>
                Our birding experts will recommend the perfect tour based on your interests, experience level, and
                travel preferences.
              </p>
              <div className={`${isMobile ? "flex flex-col gap-2" : "flex flex-col sm:flex-row gap-3 justify-center"}`}>
                <Link href="/contact">
                  <Button
                    className={`bg-emerald-600 hover:bg-emerald-700 ${
                      isMobile ? "text-xs px-4 w-full h-10" : "text-sm px-6"
                    }`}
                  >
                    <Mail className={`mr-2 ${isMobile ? "w-3 h-3" : "w-4 h-4"}`} />
                    Get Personal Recommendations
                  </Button>
                </Link>
                <Link href="/tours">
                  <Button
                    variant="outline"
                    className={`border-emerald-600 text-emerald-600 hover:bg-emerald-50 bg-transparent ${
                      isMobile ? "text-xs px-4 w-full h-10" : "text-sm px-6"
                    }`}
                  >
                    Compare All Tours
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose AVES - Mobile Optimized */}
      <section className={`bg-white ${isMobile ? "py-8 px-4" : "py-16"}`}>
        <div className={`container mx-auto ${isMobile ? "px-2" : "px-4 sm:px-6"}`}>
          <div className={`text-center ${isMobile ? "mb-6" : "mb-12"}`}>
            <h2 className={`font-bold text-gray-900 mb-4 ${isMobile ? "text-2xl" : "text-3xl"}`}>Why Choose AVES</h2>
            <p className={`text-gray-600 mx-auto ${isMobile ? "text-base px-2" : "text-lg max-w-3xl"}`}>
              We're passionate conservationists, expert birders, and your partners in discovering Colombia's incredible
              avian diversity with award-winning excellence.
            </p>
          </div>

          <div className={`${isMobile ? "space-y-6" : "grid md:grid-cols-2 lg:grid-cols-3 gap-8"}`}>
            {/* Expert Guides - Mobile Optimized */}
            <div className={`text-center ${isMobile ? "px-4" : ""}`}>
              <div
                className={`bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  isMobile ? "w-12 h-12" : "w-16 h-16"
                }`}
              >
                <Users className={`text-emerald-600 ${isMobile ? "w-6 h-6" : "w-8 h-8"}`} />
              </div>
              <h3 className={`font-bold text-gray-900 mb-3 ${isMobile ? "text-lg" : "text-xl"}`}>
                Expert Local Guides
              </h3>
              <p className={`text-gray-600 leading-relaxed mb-4 ${isMobile ? "text-sm" : ""}`}>
                Our certified ornithologist guides know every bird call, behavior, and habitat across Colombia's diverse
                regions, ensuring exceptional wildlife encounters.
              </p>
              <Link
                href="/team"
                className={`inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium ${
                  isMobile ? "text-sm" : ""
                }`}
              >
                Meet Our Guides
                <ArrowRight className={`ml-1 ${isMobile ? "w-3 h-3" : "w-4 h-4"}`} />
              </Link>
            </div>

            {/* Conservation & B Corp - Mobile Optimized */}
            <div className={`text-center ${isMobile ? "px-4" : ""}`}>
              <div
                className={`bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  isMobile ? "w-12 h-12" : "w-16 h-16"
                }`}
              >
                <Shield className={`text-green-600 ${isMobile ? "w-6 h-6" : "w-8 h-8"}`} />
              </div>
              <h3 className={`font-bold text-gray-900 mb-3 ${isMobile ? "text-lg" : "text-xl"}`}>
                B Corp Certified Conservation
              </h3>
              <p className={`text-gray-600 leading-relaxed mb-4 ${isMobile ? "text-sm" : ""}`}>
                Every tour directly supports habitat protection and local communities. We're B Corp certified and
                operate 100% carbon-neutral expeditions with verified impact.
              </p>
              <div className={`flex flex-col gap-2 ${isMobile ? "items-center" : ""}`}>
                <Link
                  href="/about/b-corp"
                  className={`inline-flex items-center text-green-600 hover:text-green-700 font-medium ${
                    isMobile ? "text-sm" : "text-sm"
                  }`}
                >
                  Our B Corp Journey
                  <ArrowRight className={`ml-1 ${isMobile ? "w-3 h-3" : "w-3 h-3"}`} />
                </Link>
                <Link
                  href="/conservation"
                  className={`inline-flex items-center text-green-600 hover:text-green-700 font-medium ${
                    isMobile ? "text-sm" : "text-sm"
                  }`}
                >
                  Conservation Impact
                  <ArrowRight className={`ml-1 ${isMobile ? "w-3 h-3" : "w-3 h-3"}`} />
                </Link>
              </div>
            </div>

            {/* Exclusive Access & Recognition - Mobile Optimized */}
            <div className={`text-center ${isMobile ? "px-4" : "md:col-span-2 lg:col-span-1"}`}>
              <div
                className={`bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  isMobile ? "w-12 h-12" : "w-16 h-16"
                }`}
              >
                <Award className={`text-blue-600 ${isMobile ? "w-6 h-6" : "w-8 h-8"}`} />
              </div>
              <h3 className={`font-bold text-gray-900 mb-3 ${isMobile ? "text-lg" : "text-xl"}`}>
                Exclusive Access & Recognition
              </h3>
              <p className={`text-gray-600 leading-relaxed mb-4 ${isMobile ? "text-sm" : ""}`}>
                Access private reserves and research stations unavailable to others. Recommended by leading
                ornithologists and featured in top birding publications worldwide.
              </p>
              <Link
                href="/about/partners"
                className={`inline-flex items-center text-blue-600 hover:text-blue-700 font-medium ${
                  isMobile ? "text-sm" : ""
                }`}
              >
                Our Partner Network
                <ArrowRight className={`ml-1 ${isMobile ? "w-3 h-3" : "w-4 h-4"}`} />
              </Link>
            </div>
          </div>

          {/* Trust Indicators - Mobile Optimized */}
          <div
            className={`bg-gradient-to-r from-gray-50 to-emerald-50 rounded-xl ${
              isMobile ? "mt-6 p-4 mx-2" : "mt-12 p-6"
            }`}
          >
            <div
              className={`text-center ${isMobile ? "grid grid-cols-2 gap-4" : "grid grid-cols-2 md:grid-cols-4 gap-6"}`}
            >
              <div>
                <div className={`font-bold text-emerald-600 mb-1 ${isMobile ? "text-lg" : "text-2xl"}`}>B Corp</div>
                <div className={`text-gray-600 ${isMobile ? "text-xs" : "text-sm"}`}>Certified</div>
              </div>
              <div>
                <div className={`font-bold text-green-600 mb-1 ${isMobile ? "text-lg" : "text-2xl"}`}>100%</div>
                <div className={`text-gray-600 ${isMobile ? "text-xs" : "text-sm"}`}>Carbon Neutral</div>
              </div>
              <div>
                <div className={`font-bold text-blue-600 mb-1 ${isMobile ? "text-lg" : "text-2xl"}`}>Max 4</div>
                <div className={`text-gray-600 ${isMobile ? "text-xs" : "text-sm"}`}>Guests per Tour</div>
              </div>
              <div>
                <div className={`font-bold text-purple-600 mb-1 ${isMobile ? "text-lg" : "text-2xl"}`}>24hr</div>
                <div className={`text-gray-600 ${isMobile ? "text-xs" : "text-sm"}`}>Response Time</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Colombia by the Numbers - Mobile Optimized */}
      <section className={`bg-gray-50 ${isMobile ? "py-8 px-4" : "py-16"}`}>
        <div className={`container mx-auto ${isMobile ? "px-2" : "px-4 sm:px-6"}`}>
          <div className={`text-center ${isMobile ? "mb-6" : "mb-12"}`}>
            <h2 className={`font-bold text-gray-900 mb-4 ${isMobile ? "text-2xl" : "text-3xl"}`}>
              Colombia by the Numbers
            </h2>
            <p className={`text-gray-600 ${isMobile ? "text-base" : "text-lg"}`}>
              Discover why Colombia is the world's birding capital
            </p>
          </div>

          <div
            className={`${isMobile ? "grid grid-cols-2 gap-3 mb-6" : "grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8"}`}
          >
            <Link href="/endemic-birds" className="group block">
              <div
                className={`bg-white rounded-xl text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-emerald-200 hover:border-emerald-300 ${
                  isMobile ? "p-3" : "p-4 sm:p-6"
                }`}
              >
                <div
                  className={`font-bold text-emerald-600 mb-2 group-hover:text-emerald-700 ${
                    isMobile ? "text-2xl" : "text-3xl sm:text-4xl"
                  }`}
                >
                  1,900+
                </div>
                <div className={`text-gray-600 group-hover:text-gray-700 ${isMobile ? "text-xs" : "text-sm"}`}>
                  Bird Species
                </div>
                <div
                  className={`text-emerald-600 mt-1 group-hover:text-emerald-700 ${isMobile ? "text-xs" : "text-xs"}`}
                >
                  #1 Globally
                </div>
                <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className={`mx-auto text-emerald-600 ${isMobile ? "w-3 h-3" : "w-4 h-4"}`} />
                </div>
              </div>
            </Link>

            <Link href="/endemic-birds" className="group block">
              <div
                className={`bg-white rounded-xl text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-blue-200 hover:border-blue-300 ${
                  isMobile ? "p-3" : "p-4 sm:p-6"
                }`}
              >
                <div
                  className={`font-bold text-blue-600 mb-2 group-hover:text-blue-700 ${
                    isMobile ? "text-2xl" : "text-3xl sm:text-4xl"
                  }`}
                >
                  78+
                </div>
                <div className={`text-gray-600 group-hover:text-gray-700 ${isMobile ? "text-xs" : "text-sm"}`}>
                  Endemic Species
                </div>
                <div className={`text-blue-600 mt-1 group-hover:text-blue-700 ${isMobile ? "text-xs" : "text-xs"}`}>
                  Found Nowhere Else
                </div>
                <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className={`mx-auto text-blue-600 ${isMobile ? "w-3 h-3" : "w-4 h-4"}`} />
                </div>
              </div>
            </Link>

            <Link href="/aves-explorer" className="group block">
              <div
                className={`bg-white rounded-xl text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-purple-200 hover:border-purple-300 ${
                  isMobile ? "p-3" : "p-4 sm:p-6"
                }`}
              >
                <div
                  className={`font-bold text-purple-600 mb-2 group-hover:text-purple-700 ${
                    isMobile ? "text-2xl" : "text-3xl sm:text-4xl"
                  }`}
                >
                  11
                </div>
                <div className={`text-gray-600 group-hover:text-gray-700 ${isMobile ? "text-xs" : "text-sm"}`}>
                  Bioregions
                </div>
                <div className={`text-purple-600 mt-1 group-hover:text-purple-700 ${isMobile ? "text-xs" : "text-xs"}`}>
                  Diverse Ecosystems
                </div>
                <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className={`mx-auto text-purple-600 ${isMobile ? "w-3 h-3" : "w-4 h-4"}`} />
                </div>
              </div>
            </Link>

            <Link href="/endemic-birds" className="group block">
              <div
                className={`bg-white rounded-xl text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-orange-200 hover:border-orange-300 ${
                  isMobile ? "p-3" : "p-4 sm:p-6"
                }`}
              >
                <div
                  className={`font-bold text-orange-600 mb-2 group-hover:text-orange-700 ${
                    isMobile ? "text-2xl" : "text-3xl sm:text-4xl"
                  }`}
                >
                  165
                </div>
                <div className={`text-gray-600 group-hover:text-gray-700 ${isMobile ? "text-xs" : "text-sm"}`}>
                  Hummingbird Species
                </div>
                <div className={`text-orange-600 mt-1 group-hover:text-orange-700 ${isMobile ? "text-xs" : "text-xs"}`}>
                  Most in the World
                </div>
                <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className={`mx-auto text-orange-600 ${isMobile ? "w-3 h-3" : "w-4 h-4"}`} />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Form Section - Mobile Optimized */}
      <section
        id="contact"
        className={`bg-gradient-to-br from-emerald-50 to-blue-50 ${isMobile ? "py-8 px-4" : "py-16"}`}
      >
        <div className={`container mx-auto ${isMobile ? "px-2" : "px-4"}`}>
          <div className={`mx-auto ${isMobile ? "max-w-full" : "max-w-4xl"}`}>
            <div className={`text-center ${isMobile ? "mb-6" : "mb-8"}`}>
              <h2 className={`font-bold text-gray-900 mb-4 ${isMobile ? "text-2xl" : "text-3xl"}`}>
                Plan Your Colombian Birding Adventure
              </h2>
              <p className={`text-gray-600 mx-auto ${isMobile ? "text-base px-2" : "text-xl max-w-2xl"}`}>
                Tell us about your birding interests. We'll respond within 24 hours with personalized recommendations.
              </p>
            </div>

            <Card className="shadow-xl border-0">
              <CardContent className={isMobile ? "p-4" : "p-8"}>
                <div className={`${isMobile ? "space-y-6" : "grid lg:grid-cols-2 gap-8"}`}>
                  {/* Contact Form - Mobile Optimized */}
                  <div className="space-y-6">
                    <div className={`${isMobile ? "space-y-4" : "grid grid-cols-2 gap-4"}`}>
                      <div>
                        <label className={`block font-medium text-gray-700 mb-2 ${isMobile ? "text-sm" : "text-sm"}`}>
                          First Name *
                        </label>
                        <Input
                          placeholder="Your first name"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          className={isMobile ? "h-10 text-sm" : ""}
                        />
                      </div>
                      <div>
                        <label className={`block font-medium text-gray-700 mb-2 ${isMobile ? "text-sm" : "text-sm"}`}>
                          Last Name *
                        </label>
                        <Input
                          placeholder="Your last name"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          className={isMobile ? "h-10 text-sm" : ""}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`block font-medium text-gray-700 mb-2 ${isMobile ? "text-sm" : "text-sm"}`}>
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={isMobile ? "h-10 text-sm" : ""}
                      />
                    </div>

                    <div className={`${isMobile ? "space-y-4" : "grid grid-cols-2 gap-4"}`}>
                      <div>
                        <label className={`block font-medium text-gray-700 mb-2 ${isMobile ? "text-sm" : "text-sm"}`}>
                          Travel Date
                        </label>
                        <Input
                          type="date"
                          value={formData.travelDate}
                          onChange={(e) => handleInputChange("travelDate", e.target.value)}
                          className={isMobile ? "h-10 text-sm" : ""}
                        />
                      </div>
                      <div>
                        <label className={`block font-medium text-gray-700 mb-2 ${isMobile ? "text-sm" : "text-sm"}`}>
                          Group Size
                        </label>
                        <select
                          value={formData.groupSize}
                          onChange={(e) => handleInputChange("groupSize", e.target.value)}
                          className={`w-full px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                            isMobile ? "py-2 h-10 text-sm" : "py-2"
                          }`}
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
                        <label className={`block font-medium text-gray-700 mb-2 ${isMobile ? "text-sm" : "text-sm"}`}>
                          Duration
                        </label>
                        <select
                          value={formData.desiredDuration}
                          onChange={(e) => handleInputChange("desiredDuration", e.target.value)}
                          className={`w-full px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                            isMobile ? "py-2 h-10 text-sm" : "py-2"
                          }`}
                        >
                          {DURATION_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className={`block font-medium text-gray-700 mb-2 ${isMobile ? "text-sm" : "text-sm"}`}>
                          Experience Level
                        </label>
                        <select
                          value={formData.experienceLevel}
                          onChange={(e) => handleInputChange("experienceLevel", e.target.value)}
                          className={`w-full px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                            isMobile ? "py-2 h-10 text-sm" : "py-2"
                          }`}
                        >
                          {EXPERIENCE_LEVELS.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Tour Type Selection - Mobile Optimized */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className={`block font-medium text-gray-700 ${isMobile ? "text-sm" : "text-sm"}`}>
                          Interested Tour Types (select all that apply)
                        </label>
                        <Link
                          href="/tours"
                          className={`text-emerald-600 hover:text-emerald-700 hover:underline flex items-center gap-1 ${
                            isMobile ? "text-xs" : "text-xs"
                          }`}
                        >
                          <ExternalLink className={`${isMobile ? "w-2 h-2" : "w-3 h-3"}`} />
                          View All Tours
                        </Link>
                      </div>
                      <div className={`${isMobile ? "grid grid-cols-1 gap-2" : "grid grid-cols-2 gap-2"}`}>
                        {TOUR_TYPE_OPTIONS.map((tourType) => (
                          <button
                            key={tourType}
                            type="button"
                            onClick={() => toggleSelection(tourType, selectedTourTypes, setSelectedTourTypes)}
                            className={`text-left rounded-lg border transition-all ${
                              selectedTourTypes.includes(tourType)
                                ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                                : "border-gray-200 hover:border-emerald-300 text-gray-700"
                            } ${isMobile ? "p-2 text-xs" : "p-3 text-sm"}`}
                          >
                            {tourType}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Location Preferences - Mobile Optimized */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className={`block font-medium text-gray-700 ${isMobile ? "text-sm" : "text-sm"}`}>
                          Preferred Biogeographic Regions (select all that interest you)
                        </label>
                        <Link
                          href="/aves-explorer"
                          className={`text-emerald-600 hover:text-emerald-700 hover:underline flex items-center gap-1 ${
                            isMobile ? "text-xs" : "text-xs"
                          }`}
                        >
                          <Map className={`${isMobile ? "w-2 h-2" : "w-3 h-3"}`} />
                          Explore Map
                        </Link>
                      </div>
                      <div className={`${isMobile ? "grid grid-cols-1 gap-1" : "grid grid-cols-2 gap-2"}`}>
                        {LOCATION_OPTIONS.map((location) => (
                          <label
                            key={location}
                            className={`flex items-center space-x-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer ${
                              isMobile ? "p-2" : "p-2"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={selectedLocations.includes(location)}
                              onChange={() => toggleSelection(location, selectedLocations, setSelectedLocations)}
                              className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                            />
                            <span className={`text-gray-700 ${isMobile ? "text-xs" : "text-xs"}`}>{location}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className={`block font-medium text-gray-700 mb-2 ${isMobile ? "text-sm" : "text-sm"}`}>
                        Special Interests or Requests
                      </label>
                      <textarea
                        placeholder="Tell us about specific birds you'd like to see, photography interests, accessibility needs, dietary restrictions, or any other special requests..."
                        value={formData.specialRequests}
                        onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                        rows={4}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none ${
                          isMobile ? "text-sm" : ""
                        }`}
                      />
                    </div>

                    <a
                      href={generateEmailLink()}
                      className="block w-full"
                      onClick={(e) => {
                        if (!formData.firstName || !formData.lastName || !formData.email) {
                          e.preventDefault()
                          alert("Please fill in your name and email address before submitting.")
                        }
                      }}
                    >
                      <Button
                        className={`w-full bg-emerald-600 hover:bg-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300 ${
                          isMobile ? "text-sm h-12" : "text-lg py-4"
                        }`}
                      >
                        <Mail className={`mr-2 ${isMobile ? "w-4 h-4" : "w-5 h-5"}`} />
                        Send My Inquiry
                        <ArrowRight className={`ml-2 ${isMobile ? "w-4 h-4" : "w-5 h-5"}`} />
                      </Button>
                    </a>

                    <p className={`text-gray-500 text-center ${isMobile ? "text-xs" : "text-sm"}`}>
                      We'll respond within 24 hours with personalized recommendations
                    </p>
                  </div>

                  {/* Contact Information - Mobile Optimized */}
                  <div
                    className={`bg-gradient-to-br from-emerald-50 to-blue-50 rounded-xl ${isMobile ? "p-4" : "p-6"}`}
                  >
                    <h3 className={`font-bold text-gray-900 mb-4 ${isMobile ? "text-lg" : "text-xl"}`}>
                      Get in Touch Directly
                    </h3>

                    <div className={`space-y-4 ${isMobile ? "mb-4" : "mb-6"}`}>
                      <div className="flex items-start space-x-3">
                        <Mail className={`text-emerald-600 mt-1 flex-shrink-0 ${isMobile ? "w-4 h-4" : "w-5 h-5"}`} />
                        <div>
                          <div className={`font-medium text-gray-900 ${isMobile ? "text-sm" : ""}`}>Email</div>
                          <a
                            href="mailto:info@aves.com"
                            className={`text-emerald-600 hover:text-emerald-700 hover:underline ${
                              isMobile ? "text-sm" : ""
                            }`}
                          >
                            info@aves.com
                          </a>
                          <div className={`text-gray-600 ${isMobile ? "text-xs" : "text-sm"}`}>
                            24-hour response guarantee
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <MapPin className={`text-emerald-600 mt-1 flex-shrink-0 ${isMobile ? "w-4 h-4" : "w-5 h-5"}`} />
                        <div>
                          <div className={`font-medium text-gray-900 ${isMobile ? "text-sm" : ""}`}>Based in</div>
                          <div className={`text-gray-700 ${isMobile ? "text-sm" : ""}`}>Bogotá, Colombia</div>
                          <div className={`text-gray-600 ${isMobile ? "text-xs" : "text-sm"}`}>
                            Operating nationwide
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Links - Mobile Optimized */}
                    <div className={`border-t border-emerald-200 pt-4 ${isMobile ? "space-y-2" : "space-y-3"}`}>
                      <h4 className={`font-medium text-gray-900 ${isMobile ? "text-sm" : ""}`}>Quick Links</h4>
                      <div className={`${isMobile ? "space-y-1" : "space-y-2"}`}>
                        <Link
                          href="/tours"
                          className={`flex items-center text-emerald-600 hover:text-emerald-700 hover:underline ${
                            isMobile ? "text-xs" : "text-sm"
                          }`}
                        >
                          <ArrowRight className={`mr-2 ${isMobile ? "w-2 h-2" : "w-3 h-3"}`} />
                          Browse All Tours
                        </Link>
                        <Link
                          href="/aves-explorer"
                          className={`flex items-center text-emerald-600 hover:text-emerald-700 hover:underline ${
                            isMobile ? "text-xs" : "text-sm"
                          }`}
                        >
                          <Map className={`mr-2 ${isMobile ? "w-2 h-2" : "w-3 h-3"}`} />
                          Explore Interactive Map
                        </Link>
                        <Link
                          href="/endemic-birds"
                          className={`flex items-center text-emerald-600 hover:text-emerald-700 hover:underline ${
                            isMobile ? "text-xs" : "text-sm"
                          }`}
                        >
                          <ArrowRight className={`mr-2 ${isMobile ? "w-2 h-2" : "w-3 h-3"}`} />
                          Endemic Birds Guide
                        </Link>
                        <Link
                          href="/travel-tips"
                          className={`flex items-center text-emerald-600 hover:text-emerald-700 hover:underline ${
                            isMobile ? "text-xs" : "text-sm"
                          }`}
                        >
                          <ArrowRight className={`mr-2 ${isMobile ? "w-2 h-2" : "w-3 h-3"}`} />
                          Travel Tips & Preparation
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Floating Navigation */}
      <FloatingAVESNavigation />
    </div>
  )
}
