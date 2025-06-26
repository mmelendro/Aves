"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Users,
  Leaf,
  Globe,
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
} from "lucide-react"
import Link from "next/link"
import OptimizedImage from "@/components/optimized-image"
import SpeciesTooltip from "@/components/species-tooltip"
import EndemicBirdsCarousel from "@/components/endemic-birds-carousel"
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

  useEffect(() => {
    window.scrollTo(0, 0)
    setIsVisible(true)
  }, [])

  const greenHermitData = {
    commonName: "Green Hermit",
    scientificName: "Phaethornis guy",
    spanishName: "Colibrí Ermitaño Verde",
    ebirdCode: "greher1",
    description: "Large hummingbird specialist of cloud forest environments",
  }

  const maskedTrogonData = {
    commonName: "Masked Trogon",
    scientificName: "Trogon personatus",
    spanishName: "Trogón Enmascarado",
    ebirdCode: "mastro1",
    description: "Brilliant red-breasted cloud forest jewel",
  }

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

      {/* Hero Section - Enhanced Mobile Responsiveness */}
      <section
        className={`relative py-8 sm:py-12 lg:py-16 xl:py-24 overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-blue-50 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="container mx-auto px-3 sm:px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
            <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
              <div className="space-y-3 sm:space-y-4">
                <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 animate-pulse text-xs sm:text-sm">
                  🌿 B Corp Certified • Carbon Neutral Tours
                </Badge>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
                  Discover Colombia's
                  <span className="text-emerald-600 block">1,900+ Bird Species</span>
                  <span className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-gray-600 font-normal block mt-1 sm:mt-2">
                    With Expert Naturalist Guides
                  </span>
                </h1>
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-emerald-100 shadow-lg">
                  <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed font-medium mb-3 sm:mb-4">
                    Join exclusive small-group birding expeditions across Colombia's diverse ecosystems. Experience the
                    world's most biodiverse country while supporting conservation and local communities.
                  </p>

                  {/* Value Propositions - Mobile Optimized */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600 flex-shrink-0" />
                      <span className="text-gray-700">Expert ornithologist guides</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600 flex-shrink-0" />
                      <span className="text-gray-700">Maximum 4 guests per tour</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600 flex-shrink-0" />
                      <span className="text-gray-700">Premium eco-lodges</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600 flex-shrink-0" />
                      <span className="text-gray-700">100% carbon neutral</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600 flex-shrink-0" />
                      <span className="text-gray-700">B Corp certified</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600 flex-shrink-0" />
                      <span className="text-gray-700">Small groups (max 4)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced CTAs - Mobile Optimized */}
              <div className="flex flex-col gap-3 sm:gap-4">
                <Link href="/tours" className="w-full">
                  <Button
                    size="lg"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-sm sm:text-base px-4 sm:px-6 py-3 sm:py-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 min-h-[48px]"
                  >
                    <Binoculars className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                    Explore Our Tours
                    <ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                </Link>
                <Link href="/contact" className="w-full">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 text-sm sm:text-base px-4 sm:px-6 py-3 sm:py-4 shadow-md hover:shadow-lg transition-all duration-300 min-h-[48px]"
                  >
                    <Calendar className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                    Plan My Trip
                  </Button>
                </Link>
              </div>

              {/* Urgency/Scarcity Element - Mobile Optimized */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 sm:p-4">
                <div className="flex items-center space-x-2 text-amber-800">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium">Limited Availability: Only 2-3 tours per month</span>
                </div>
              </div>
            </div>

            {/* Endemic Birds Carousel - Mobile Optimized */}
            <div className="relative order-1 lg:order-2">
              <div className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]">
                <EndemicBirdsCarousel
                  className="shadow-xl sm:shadow-2xl rounded-lg sm:rounded-xl"
                  autoPlay={true}
                  autoPlayInterval={7000}
                />
              </div>

              {/* Floating testimonial - Hidden on mobile, visible on larger screens */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-3 sm:p-4 shadow-lg border border-gray-100 max-w-xs hidden sm:block lg:hidden xl:block">
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-700 italic">
                      "Absolutely incredible experience! Saw 180+ species in 10 days."
                    </p>
                    <p className="text-xs text-gray-500 mt-1">- Royann, Wildlife Photographer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements - Responsive */}
        <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-emerald-100 rounded-full opacity-20 -translate-y-16 sm:-translate-y-24 lg:-translate-y-32 translate-x-16 sm:translate-x-24 lg:translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-36 sm:h-36 lg:w-48 lg:h-48 bg-blue-100 rounded-full opacity-20 translate-y-12 sm:translate-y-18 lg:translate-y-24 -translate-x-12 sm:-translate-x-18 lg:-translate-x-24"></div>
      </section>

      {/* Tour Types Section - Enhanced with Better CTAs */}
      <section id="tours" className="py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="text-center mb-8 sm:mb-12">
            <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 mb-3 sm:mb-4 text-xs sm:text-sm">
              🦅 Choose Your Adventure
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Four Unique Birding Experiences
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Each tour is carefully crafted for different interests and comfort levels, all featuring expert guides and
              premium accommodations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* Adventure Tours - Enhanced Mobile */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-1 sm:hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-emerald-600 text-white px-2 sm:px-3 py-1 text-xs font-bold rounded-bl-lg">
                POPULAR
              </div>
              <CardContent className="p-4 sm:p-5">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900">🍃 AVES Adventure</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                    <span className="text-xs sm:text-sm text-gray-600">4.9</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed">
                  Our signature birding expeditions across Colombia's prime hotspots. 7-14 days of immersive wildlife
                  discovery through diverse ecosystems.
                </p>
                <div className="space-y-1 sm:space-y-2 mb-4 sm:mb-5">
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckCircle className="w-3 h-3 text-emerald-600 mr-2 flex-shrink-0" />
                    <span>Professional ornithologist guides</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckCircle className="w-3 h-3 text-emerald-600 mr-2 flex-shrink-0" />
                    <span>Premium eco-lodges</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckCircle className="w-3 h-3 text-emerald-600 mr-2 flex-shrink-0" />
                    <span>Conservation project visits</span>
                  </div>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg sm:text-xl font-bold text-emerald-600">$8,000</div>
                      <div className="text-xs text-gray-500">avg. per person</div>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-800 text-xs">7-14 days</Badge>
                  </div>
                  <Link href="/tours/adventure" className="block">
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-xs sm:text-sm min-h-[40px]">
                      View Details & Book
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Vision Tours - Enhanced */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-1 sm:hover:-translate-y-2">
              <CardContent className="p-4 sm:p-5">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900">🪶 AVES Vision</h3>
                  <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                </div>
                <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed">
                  Specialized photography and videography workshops with professional wildlife photographers capturing
                  Colombia's avian beauty.
                </p>
                <div className="space-y-1 sm:space-y-2 mb-4 sm:mb-5">
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckCircle className="w-3 h-3 text-purple-600 mr-2 flex-shrink-0" />
                    <span>Exclusive photography hides</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckCircle className="w-3 h-3 text-purple-600 mr-2 flex-shrink-0" />
                    <span>Post-processing sessions</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckCircle className="w-3 h-3 text-purple-600 mr-2 flex-shrink-0" />
                    <span>Professional equipment included</span>
                  </div>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg sm:text-xl font-bold text-purple-600">$10,000</div>
                      <div className="text-xs text-gray-500">avg. per person</div>
                    </div>
                    <Badge className="bg-purple-100 text-purple-800 text-xs">10-12 days</Badge>
                  </div>
                  <Link href="/tours/vision" className="block">
                    <Button
                      variant="outline"
                      className="w-full border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white text-xs sm:text-sm min-h-[40px]"
                    >
                      View Details & Book
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Elevate Tours - Enhanced */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-1 sm:hover:-translate-y-2">
              <CardContent className="p-4 sm:p-5">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900">🌼 AVES Elevate</h3>
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                </div>
                <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed">
                  Premium expeditions with luxury amenities in exclusive locations for the ultimate comfort experience
                  in Colombia's finest reserves.
                </p>
                <div className="space-y-1 sm:space-y-2 mb-4 sm:mb-5">
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckCircle className="w-3 h-3 text-yellow-500 mr-2 flex-shrink-0" />
                    <span>Luxury accommodations</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckCircle className="w-3 h-3 text-yellow-500 mr-2 flex-shrink-0" />
                    <span>Private chef & spa access</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckCircle className="w-3 h-3 text-yellow-500 mr-2 flex-shrink-0" />
                    <span>Helicopter transfers</span>
                  </div>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg sm:text-xl font-bold text-yellow-500">$12,000</div>
                      <div className="text-xs text-gray-500">avg. per person</div>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800 text-xs">8-10 days</Badge>
                  </div>
                  <Link href="/tours/elevate" className="block">
                    <Button
                      variant="outline"
                      className="w-full border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white text-xs sm:text-sm min-h-[40px]"
                    >
                      View Details & Book
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Souls Tours - Enhanced */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-1 sm:hover:-translate-y-2">
              <CardContent className="p-4 sm:p-5">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900">🍓 AVES Souls</h3>
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                </div>
                <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed">
                  Romantic retreats combining birding with intimate experiences in secluded, breathtaking locations
                  perfect for couples.
                </p>
                <div className="space-y-1 sm:space-y-2 mb-4 sm:mb-5">
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckCircle className="w-3 h-3 text-red-500 mr-2 flex-shrink-0" />
                    <span>Couples-only experiences</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckCircle className="w-3 h-3 text-red-500 mr-2 flex-shrink-0" />
                    <span>Private romantic dining</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckCircle className="w-3 h-3 text-red-500 mr-2 flex-shrink-0" />
                    <span>Sunset photography sessions</span>
                  </div>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg sm:text-xl font-bold text-red-500">$14,000</div>
                      <div className="text-xs text-gray-500">avg. per person</div>
                    </div>
                    <Badge className="bg-red-100 text-red-800 text-xs">6-8 days</Badge>
                  </div>
                  <Link href="/tours/souls" className="block">
                    <Button
                      variant="outline"
                      className="w-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white text-xs sm:text-sm min-h-[40px]"
                    >
                      View Details & Book
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced CTA Section */}
          <div className="text-center">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 max-w-2xl mx-auto">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                Not Sure Which Tour is Right for You?
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                Our birding experts will help you choose the perfect Colombian adventure based on your interests,
                experience level, and travel preferences.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 min-h-[48px]">
                    <Mail className="mr-2 w-4 h-4" />
                    Contact Our Experts
                  </Button>
                </Link>
                <Link href="/tours">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 min-h-[48px]"
                  >
                    <Binoculars className="mr-2 w-4 h-4" />
                    Compare All Tours
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section - Updated Reviews */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">What Our Guests Say</h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Real experiences from real birding enthusiasts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Royann's Updated Review */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="ml-2 text-xs sm:text-sm text-gray-600">5.0</span>
                </div>
                <p className="text-gray-700 mb-3 sm:mb-4 italic text-sm sm:text-base leading-relaxed">
                  "Absolutely extraordinary! I photographed over 500 species including more than 30 endemics. The guides
                  knew exactly where to position me for the perfect shots. My camera has never captured such incredible
                  diversity!"
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-emerald-600 font-bold text-sm sm:text-base">R</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">Royann</p>
                    <p className="text-xs sm:text-sm text-gray-600">Wildlife Photographer, USA</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sylvain's Review in French */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="ml-2 text-xs sm:text-sm text-gray-600">5.0</span>
                </div>
                <p className="text-gray-700 mb-3 sm:mb-4 italic text-sm sm:text-base leading-relaxed">
                  "Une expérience absolument magnifique! Les guides étaient exceptionnels et connaissaient parfaitement
                  les habitats. J'ai observé des espèces que je n'aurais jamais imaginé voir. Un voyage inoubliable au
                  cœur de la biodiversité colombienne!"
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-emerald-600 font-bold text-sm sm:text-base">S</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">Sylvain</p>
                    <p className="text-xs sm:text-sm text-gray-600">Ornithologue amateur, Québec</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lisa & Peter's Updated Review */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="ml-2 text-xs sm:text-sm text-gray-600">5.0</span>
                </div>
                <p className="text-gray-700 mb-3 sm:mb-4 italic text-sm sm:text-base leading-relaxed">
                  "At our age, we thought our traveling days were behind us, but AVES made this the most memorable trip
                  of our lives! The care, attention, and incredible birds we saw exceeded all expectations. A perfect
                  adventure for our 80s!"
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-emerald-600 font-bold text-sm sm:text-base">L&P</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">Lisa & Peter</p>
                    <p className="text-xs sm:text-sm text-gray-600">Retirees, Pender Island</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Colombia Section - Enhanced Mobile Responsiveness */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Content Column - Mobile First */}
            <div className="order-2 lg:order-1 space-y-4 sm:space-y-6">
              <div className="text-center lg:text-left">
                <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 mb-3 sm:mb-4 text-xs sm:text-sm">
                  🌎 World's #1 Birding Destination
                </Badge>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                  Why Colombia is the World's Premier Birding Destination
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                  Colombia is home to nearly 20% of all bird species on Earth, making it the most biodiverse country for
                  avian life. From the Andes to the Amazon, each ecosystem offers unique species found nowhere else.
                </p>
              </div>

              {/* Mobile-Optimized Statistics Grid */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
                <a
                  href="https://birdsofcolombia.com/pages/birds-by-order-and-family"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center p-3 sm:p-4 bg-emerald-50 rounded-lg border border-emerald-100 hover:bg-emerald-100 hover:border-emerald-200 transition-all duration-300 hover:shadow-md cursor-pointer group active:scale-95"
                >
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-emerald-600 mb-1 group-hover:text-emerald-700">
                    1,900+
                  </div>
                  <div className="text-xs sm:text-sm text-gray-700 group-hover:text-gray-800 font-medium">
                    Bird Species
                  </div>
                  <div className="text-xs text-emerald-600 mt-1 group-hover:text-emerald-700">20% of world total</div>
                </a>
                <a
                  href="https://birdsofcolombia.com/pages/endemic-birds"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center p-3 sm:p-4 bg-emerald-50 rounded-lg border border-emerald-100 hover:bg-emerald-100 hover:border-emerald-200 transition-all duration-300 hover:shadow-md cursor-pointer group active:scale-95"
                >
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-emerald-600 mb-1 group-hover:text-emerald-700">
                    80+
                  </div>
                  <div className="text-xs sm:text-sm text-gray-700 group-hover:text-gray-800 font-medium">
                    Endemic Species
                  </div>
                  <div className="text-xs text-emerald-600 mt-1 group-hover:text-emerald-700">Found nowhere else</div>
                </a>
                <a
                  href="https://birdsofcolombia.com/pages/hummingbirds-2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center p-3 sm:p-4 bg-emerald-50 rounded-lg border border-emerald-100 hover:bg-emerald-100 hover:border-emerald-200 transition-all duration-300 hover:shadow-md cursor-pointer group active:scale-95"
                >
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-emerald-600 mb-1 group-hover:text-emerald-700">
                    135+
                  </div>
                  <div className="text-xs sm:text-sm text-gray-700 group-hover:text-gray-800 font-medium">
                    Hummingbirds
                  </div>
                  <div className="text-xs text-emerald-600 mt-1 group-hover:text-emerald-700">Most in the world</div>
                </a>
                <div className="text-center p-3 sm:p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-emerald-600 mb-1">10</div>
                  <div className="text-xs sm:text-sm text-gray-700 font-medium">Bioregions</div>
                  <div className="text-xs text-emerald-600 mt-1">Diverse ecosystems</div>
                </div>
              </div>

              {/* Mobile-Optimized Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a href="https://ebird.org/region/CO" target="_blank" rel="noopener noreferrer" className="flex-1">
                  <Button
                    size="default"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 min-h-[44px] text-sm sm:text-base"
                  >
                    <Globe className="mr-2 w-4 h-4" />
                    Explore on eBird
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </a>
                <Link href="/tours" className="flex-1">
                  <Button
                    size="default"
                    variant="outline"
                    className="w-full border-emerald-600 text-emerald-600 hover:bg-emerald-50 min-h-[44px] text-sm sm:text-base"
                  >
                    <Calendar className="mr-2 w-4 h-4" />
                    Plan Your Visit
                  </Button>
                </Link>
              </div>
            </div>

            {/* Image Column - Mobile Optimized */}
            <div className="order-1 lg:order-2 relative">
              <div className="aspect-[4/3] sm:aspect-[5/4] lg:aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-2xl">
                <OptimizedImage
                  src="/images/green-hermit-hummingbird.jpg"
                  alt="Green Hermit Hummingbird - large emerald-green hummingbird with curved bill and white-tipped tail, known as Colibrí Ermitaño Verde in Spanish, representing Colombia's incredible hummingbird diversity with over 85 species"
                  width={600}
                  height={450}
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                  style={{ objectPosition: "center 30%" }}
                  priority
                />
              </div>

              {/* Mobile-Optimized Species Info Card */}
              <div className="absolute -bottom-2 sm:-bottom-4 -right-2 sm:-right-4 bg-white rounded-lg sm:rounded-xl p-2 sm:p-3 shadow-lg max-w-[200px] sm:max-w-xs">
                <a
                  href="https://ebird.org/species/greher1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 hover:bg-gray-50 transition-colors rounded-lg p-1 -m-1 active:scale-95"
                >
                  <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Globe className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-emerald-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-gray-900 text-xs sm:text-sm truncate">
                      <SpeciesTooltip species={greenHermitData}>Green Hermit</SpeciesTooltip>
                    </div>
                    <div className="text-xs text-gray-600 italic truncate">Phaethornis guy</div>
                    <div className="text-xs text-emerald-600 truncate">Cloud Forest • eBird →</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conservation Impact Section - Enhanced */}
      <section id="conservation" className="py-8 sm:py-12 lg:py-16 bg-emerald-50">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="text-center mb-8 sm:mb-12">
            <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 mb-3 sm:mb-4 text-xs sm:text-sm">
              🌱 Conservation Impact
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Travel That Makes a Difference
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Every AVES tour directly supports habitat conservation and local communities. We're committed to becoming
              the first B Corp certified birding company in Colombia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-12">
            <Card className="text-center p-4 sm:p-6 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Leaf className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3">Carbon Neutral Tours</h3>
              <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
                All tours operate with full carbon neutrality, with offsets reinvested in critical bird habitat
                preservation projects.
              </p>
              <div className="text-xl sm:text-2xl font-bold text-emerald-600">100%</div>
              <div className="text-xs text-gray-500">Carbon Neutral Since 2020</div>
            </Card>

            <Card className="text-center p-4 sm:p-6 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3">Community Support</h3>
              <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
                We partner with local communities, providing fair employment and supporting community-managed
                conservation initiatives.
              </p>
              <Link href="/about/partners">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 min-h-[36px]"
                >
                  View Our Partners
                  <ArrowRight className="ml-2 w-3 h-3" />
                </Button>
              </Link>
            </Card>

            <Card className="text-center p-4 sm:p-6 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3">Habitat Protection</h3>
              <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
                10% of net profits fund our Conservation Endowment Trust, dedicated to permanent habitat restoration and
                protection across Colombia's critical ecosystems.
              </p>
              <Link href="/conservation">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 min-h-[36px]"
                >
                  Learn About Our Conservation Efforts
                  <ArrowRight className="ml-2 w-3 h-3" />
                </Button>
              </Link>
            </Card>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg">
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6 items-center">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                  Pursuing B Corp Certification
                </h3>
                <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed">
                  AVES is committed to meeting the highest standards of social and environmental responsibility. We're
                  working toward B Corp certification, joining BirdsChile as only the second birding-focused B Corp
                  globally.
                </p>
                <div className="space-y-2 mb-4 sm:mb-6">
                  <div className="flex items-center">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600 mr-2" />
                    <span className="text-gray-700 text-xs sm:text-sm">Transparent impact reporting</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600 mr-2" />
                    <span className="text-gray-700 text-xs sm:text-sm">Stakeholder governance model</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600 mr-2" />
                    <span className="text-gray-700 text-xs sm:text-sm">Environmental accountability</span>
                  </div>
                </div>
                <Link href="/about/b-corp">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 min-h-[40px]">
                    Learn About Our B Corp Journey
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
              <div className="aspect-square rounded-xl overflow-hidden relative">
                <OptimizedImage
                  src="/images/masked-trogon-male.jpg"
                  alt="Masked Trogon representing cloud forest conservation efforts"
                  width={300}
                  height={300}
                  className="object-contain w-full h-full"
                  style={{ objectPosition: "center 25%" }}
                />
                <div className="absolute -bottom-1 sm:-bottom-3 -right-1 sm:-right-3 bg-white rounded-xl p-1 sm:p-2 shadow-lg">
                  <a
                    href="https://ebird.org/species/mastro1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 hover:bg-gray-50 transition-colors rounded-lg p-1 -m-1"
                  >
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Award className="w-2 h-2 sm:w-3 sm:h-3 text-emerald-600" />
                    </div>
                    <div className="text-xxs sm:text-xs">
                      <div className="font-semibold text-gray-900">
                        <SpeciesTooltip species={maskedTrogonData}>Masked Trogon</SpeciesTooltip>
                      </div>
                      <div className="text-gray-600 italic">Trogon personatus</div>
                      <div className="text-emerald-600">Conservation Success • eBird →</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            <div>
              <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 mb-3 sm:mb-4 text-xs sm:text-sm">
                📞 Expert Consultation
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                Plan Your Perfect Colombian Adventure
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                Ready to plan your Colombian birding adventure? Our expert team will help you choose the perfect tour
                and create an unforgettable experience tailored to your interests.
              </p>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm sm:text-base">Email</div>
                    <a
                      href={generateEmailLink()}
                      className="text-emerald-600 hover:text-emerald-700 hover:underline transition-colors text-xs sm:text-sm"
                    >
                      info@aves.com
                    </a>
                    <div className="text-xs text-emerald-600">Response within 24 hours</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm sm:text-base">Offices</div>
                    <div className="text-gray-600 text-xs sm:text-sm">Vancouver, Canada & Bogotá, Colombia</div>
                    <div className="text-xs text-emerald-600">Local expertise, global reach</div>
                  </div>
                </div>
              </div>
            </div>

            <Card className="p-4 sm:p-6 border-0 shadow-xl">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Get Your Custom Tour Quote</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
                Fill out this form and we'll send you a personalized tour recommendation and quote within 24 hours.
              </p>

              <form className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">First Name *</label>
                    <Input
                      placeholder="Your first name"
                      className="text-sm min-h-[44px]"
                      required
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Last Name *</label>
                    <Input
                      placeholder="Your last name"
                      className="text-sm min-h-[44px]"
                      required
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Email *</label>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    className="text-sm min-h-[44px]"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>

                {/* Mobile-optimized form fields with proper touch targets */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Travel Dates</label>
                    <Input
                      type="date"
                      className="text-sm min-h-[44px]"
                      value={formData.travelDate}
                      onChange={(e) => handleInputChange("travelDate", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Group Size</label>
                    <select
                      className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
                      value={formData.groupSize}
                      onChange={(e) => handleInputChange("groupSize", e.target.value)}
                    >
                      {GROUP_SIZE_OPTIONS.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Desired Duration</label>
                    <select
                      className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
                      value={formData.desiredDuration}
                      onChange={(e) => handleInputChange("desiredDuration", e.target.value)}
                    >
                      {DURATION_OPTIONS.map((duration) => (
                        <option key={duration} value={duration}>
                          {duration}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Desired Locations <span className="text-gray-500">(Select multiple)</span>
                    </label>
                    <div className="relative">
                      <div className="border border-gray-300 rounded-md p-2 bg-white max-h-32 overflow-y-auto">
                        {LOCATION_OPTIONS.map((location) => (
                          <label
                            key={location}
                            className="flex items-center space-x-2 py-1 cursor-pointer hover:bg-gray-50 rounded px-1"
                          >
                            <input
                              type="checkbox"
                              checked={selectedLocations.includes(location)}
                              onChange={() => toggleSelection(location, selectedLocations, setSelectedLocations)}
                              className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 text-xs"
                            />
                            <span className="text-xs text-gray-700">{location}</span>
                          </label>
                        ))}
                      </div>
                      {selectedLocations.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {selectedLocations.map((location) => (
                            <span
                              key={location}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                            >
                              {location.length > 20 ? `${location.substring(0, 20)}...` : location}
                              <button
                                type="button"
                                onClick={() => toggleSelection(location, selectedLocations, setSelectedLocations)}
                                className="ml-1 text-blue-600 hover:text-blue-800"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">
                    Interested Tour Types * (select all that apply)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {TOUR_TYPE_OPTIONS.map((tourType) => (
                      <label
                        key={tourType}
                        className="flex items-center space-x-2 p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedTourTypes.includes(tourType)}
                          onChange={() => toggleSelection(tourType, selectedTourTypes, setSelectedTourTypes)}
                          className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="text-xs text-gray-700">{tourType}</span>
                      </label>
                    ))}
                  </div>
                  {selectedTourTypes.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {selectedTourTypes.map((tourType) => (
                        <span
                          key={tourType}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-emerald-100 text-emerald-800"
                        >
                          {tourType}
                          <button
                            type="button"
                            onClick={() => toggleSelection(tourType, selectedTourTypes, setSelectedTourTypes)}
                            className="ml-1 text-emerald-600 hover:text-emerald-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Experience Level</label>
                  <select
                    className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
                    value={formData.experienceLevel}
                    onChange={(e) => handleInputChange("experienceLevel", e.target.value)}
                  >
                    {EXPERIENCE_LEVELS.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Special Interests or Requests</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    rows={3}
                    placeholder="Photography focus, specific species interests, accessibility needs, etc."
                    value={formData.specialRequests}
                    onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                  ></textarea>
                </div>

                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-sm py-3 min-h-[48px]">
                  Get My Custom Quote
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  We'll respond within 24 hours with a personalized recommendation and quote.
                </p>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Floating AVES Navigation */}
      <FloatingAVESNavigation autoHideDuration={8000} />

      {/* Footer */}
      <Footer />
    </div>
  )
}
