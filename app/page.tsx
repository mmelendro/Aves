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
  Bird,
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
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
              <div className="space-y-4 sm:space-y-6">
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

                {/* Integrated Avifauna Information */}
                <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-4 sm:p-6 border border-emerald-200 shadow-sm">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="bg-emerald-100 p-2 rounded-full flex-shrink-0">
                      <Bird className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                        Colombia's Incredible Avifauna
                      </h3>
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
                        Join exclusive small-group birding expeditions across Colombia's diverse ecosystems. Experience
                        the world's most biodiverse country while supporting conservation and local communities.
                      </p>
                      <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                          <span className="text-gray-600">78+ Endemic Species</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-gray-600">11 Bioregions</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-emerald-100 shadow-lg">
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
                    className="w-full border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 text-sm sm:text-base px-4 sm:px-6 py-3 sm:py-4 shadow-md hover:shadow-lg transition-all duration-300 min-h-[48px] bg-transparent"
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

            {/* Enhanced Birds Carousel - Mobile Optimized */}
            <div className="relative order-1 lg:order-2">
              <div className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]">
                <EnhancedEndemicBirdsCarousel
                  className="shadow-xl sm:shadow-2xl rounded-lg sm:rounded-xl"
                  autoPlay={true}
                  autoPlayInterval={7000}
                />
              </div>

              {/* Floating testimonial - Enhanced positioning */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl border border-gray-100 max-w-sm hidden lg:block xl:block">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Star className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 italic mb-2">
                      "Absolutely incredible experience! Saw 180+ species in 10 days. The guides' expertise was
                      phenomenal."
                    </p>
                    <p className="text-xs text-gray-500">- Royann, Wildlife Photographer</p>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                      ))}
                    </div>
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
                      className="w-full border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white text-xs sm:text-sm min-h-[40px] bg-transparent"
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
                      <div className="text-lg sm:text-xl font-bold text-yellow-600">$15,000</div>
                      <div className="text-xs text-gray-500">avg. per person</div>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800 text-xs">8-10 days</Badge>
                  </div>
                  <Link href="/tours/elevate" className="block">
                    <Button
                      variant="outline"
                      className="w-full border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white text-xs sm:text-sm min-h-[40px] bg-transparent"
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
                  Cultural immersion tours combining birding with indigenous communities, traditional crafts, and local
                  conservation initiatives.
                </p>
                <div className="space-y-1 sm:space-y-2 mb-4 sm:mb-5">
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckCircle className="w-3 h-3 text-red-500 mr-2 flex-shrink-0" />
                    <span>Indigenous community visits</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckCircle className="w-3 h-3 text-red-500 mr-2 flex-shrink-0" />
                    <span>Traditional craft workshops</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckCircle className="w-3 h-3 text-red-500 mr-2 flex-shrink-0" />
                    <span>Community-based lodging</span>
                  </div>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg sm:text-xl font-bold text-red-600">$6,500</div>
                      <div className="text-xs text-gray-500">avg. per person</div>
                    </div>
                    <Badge className="bg-red-100 text-red-800 text-xs">6-8 days</Badge>
                  </div>
                  <Link href="/tours/souls" className="block">
                    <Button
                      variant="outline"
                      className="w-full border-red-600 text-red-600 hover:bg-red-600 hover:text-white text-xs sm:text-sm min-h-[40px] bg-transparent"
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
            <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-4 sm:p-6 border border-emerald-200">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                Can't Decide? Let Us Help You Choose
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 max-w-2xl mx-auto">
                Our birding experts will recommend the perfect tour based on your interests, experience level, and
                travel preferences.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
                <Link href="/contact">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-xs sm:text-sm px-4 sm:px-6 min-h-[40px]">
                    <Mail className="mr-2 w-3 h-3 sm:w-4 sm:h-4" />
                    Get Personal Recommendations
                  </Button>
                </Link>
                <Link href="/tours">
                  <Button
                    variant="outline"
                    className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 text-xs sm:text-sm px-4 sm:px-6 min-h-[40px] bg-transparent"
                  >
                    Compare All Tours
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose AVES Section - Enhanced Mobile */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="text-center mb-8 sm:mb-12">
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 mb-3 sm:mb-4 text-xs sm:text-sm">
              🏆 Why Choose AVES
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">The AVES Difference</h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're not just another tour company. We're passionate conservationists, expert birders, and your partners
              in discovering Colombia's incredible avian diversity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Expert Guides - Enhanced */}
            <div className="text-center group">
              <div className="bg-emerald-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Expert Local Guides</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                Our certified ornithologist guides average 15+ years of experience and know every bird call, behavior,
                and habitat across Colombia's diverse regions.
              </p>
              <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600" />
                  <span>Certified ornithologists</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600" />
                  <span>15+ years average experience</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600" />
                  <span>Fluent English & Spanish</span>
                </div>
              </div>
            </div>

            {/* Conservation Focus - Enhanced */}
            <div className="text-center group">
              <div className="bg-green-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                <Leaf className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Conservation Impact</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                Every tour directly supports habitat protection and local communities. We're B Corp certified and
                operate 100% carbon-neutral expeditions.
              </p>
              <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                  <span>B Corp certified company</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                  <span>100% carbon neutral tours</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                  <span>Direct community support</span>
                </div>
              </div>
            </div>

            {/* Exclusive Access - Enhanced */}
            <div className="text-center group sm:col-span-2 lg:col-span-1">
              <div className="bg-blue-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Exclusive Access</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                Access private reserves, research stations, and remote locations unavailable to other tour operators.
                Small groups ensure minimal impact and maximum wildlife encounters.
              </p>
              <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                  <span>Private reserve access</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                  <span>Maximum 4 guests per tour</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                  <span>Research station visits</span>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Statistics Section */}
          <div className="mt-8 sm:mt-12 bg-gradient-to-r from-gray-50 to-emerald-50 rounded-xl p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center">
              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-600 mb-1 sm:mb-2">1,900+</div>
                <div className="text-xs sm:text-sm text-gray-600">Bird Species in Colombia</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600 mb-1 sm:mb-2">78+</div>
                <div className="text-xs sm:text-sm text-gray-600">Endemic Species</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-600 mb-1 sm:mb-2">98%</div>
                <div className="text-xs sm:text-sm text-gray-600">Guest Satisfaction</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-orange-600 mb-1 sm:mb-2">15+</div>
                <div className="text-xs sm:text-sm text-gray-600">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Form Section - Mobile Optimized */}
      <section id="contact" className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6 sm:mb-8">
              <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 mb-3 sm:mb-4 text-xs sm:text-sm">
                📧 Get Started Today
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                Plan Your Colombian Birding Adventure
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Tell us about your birding interests and travel preferences. We'll respond within 24 hours with
                personalized recommendations and availability.
              </p>
            </div>

            <Card className="shadow-xl border-0">
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
                  {/* Contact Form */}
                  <div className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">First Name *</label>
                        <Input
                          placeholder="Your first name"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          className="text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Last Name *</label>
                        <Input
                          placeholder="Your last name"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          className="text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Email Address *</label>
                      <Input
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Travel Date</label>
                        <Input
                          type="date"
                          value={formData.travelDate}
                          onChange={(e) => handleInputChange("travelDate", e.target.value)}
                          className="text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Group Size</label>
                        <select
                          value={formData.groupSize}
                          onChange={(e) => handleInputChange("groupSize", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                        >
                          {GROUP_SIZE_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Duration</label>
                        <select
                          value={formData.desiredDuration}
                          onChange={(e) => handleInputChange("desiredDuration", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                        >
                          {DURATION_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Experience Level</label>
                        <select
                          value={formData.experienceLevel}
                          onChange={(e) => handleInputChange("experienceLevel", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                        >
                          {EXPERIENCE_LEVELS.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Tour Type Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                        Interested Tour Types (select all that apply)
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {TOUR_TYPE_OPTIONS.map((tourType) => (
                          <button
                            key={tourType}
                            type="button"
                            onClick={() => toggleSelection(tourType, selectedTourTypes, setSelectedTourTypes)}
                            className={`text-left p-2 sm:p-3 rounded-lg border text-xs sm:text-sm transition-all ${
                              selectedTourTypes.includes(tourType)
                                ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                                : "border-gray-200 hover:border-emerald-300 text-gray-700"
                            }`}
                          >
                            {tourType}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Location Preferences */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                        Preferred Locations (select all that interest you)
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {LOCATION_OPTIONS.map((location) => (
                          <button
                            key={location}
                            type="button"
                            onClick={() => toggleSelection(location, selectedLocations, setSelectedLocations)}
                            className={`text-left p-2 sm:p-3 rounded-lg border text-xs sm:text-sm transition-all ${
                              selectedLocations.includes(location)
                                ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                                : "border-gray-200 hover:border-emerald-300 text-gray-700"
                            }`}
                          >
                            {location}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Special Interests or Requests
                      </label>
                      <textarea
                        placeholder="Tell us about specific birds you'd like to see, dietary restrictions, mobility considerations, or any other special requests..."
                        value={formData.specialRequests}
                        onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                      />
                    </div>

                    <a
                      href={generateEmailLink()}
                      className="block w-full"
                      onClick={(e) => {
                        if (!formData.firstName || !formData.lastName || !formData.email) {
                          e.preventDefault()
                          alert("Please fill in your name and email address before sending your inquiry.")
                        }
                      }}
                    >
                      <Button
                        size="lg"
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-sm sm:text-base min-h-[48px]"
                      >
                        <Mail className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                        Send My Inquiry
                      </Button>
                    </a>
                  </div>

                  {/* Contact Information & Trust Signals */}
                  <div className="space-y-4 sm:space-y-6">
                    <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-lg p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                        Why Book Directly With AVES?
                      </h3>
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex items-start space-x-2 sm:space-x-3">
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-gray-900 text-sm sm:text-base">24-Hour Response</div>
                            <div className="text-xs sm:text-sm text-gray-600">
                              Personal response from our birding experts within 24 hours
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2 sm:space-x-3">
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-gray-900 text-sm sm:text-base">Custom Itineraries</div>
                            <div className="text-xs sm:text-sm text-gray-600">
                              Tailored recommendations based on your interests and experience
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2 sm:space-x-3">
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-gray-900 text-sm sm:text-base">Best Price Guarantee</div>
                            <div className="text-xs sm:text-sm text-gray-600">
                              No booking fees or hidden costs when you book direct
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2 sm:space-x-3">
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-gray-900 text-sm sm:text-base">Flexible Booking</div>
                            <div className="text-xs sm:text-sm text-gray-600">
                              Free date changes up to 60 days before departure
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Contact Information</h3>
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-gray-900 text-sm sm:text-base">Email</div>
                            <div className="text-xs sm:text-sm text-gray-600">info@aves.com</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-gray-900 text-sm sm:text-base">Based in</div>
                            <div className="text-xs sm:text-sm text-gray-600">Bogotá, Colombia</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-gray-900 text-sm sm:text-base">Response Time</div>
                            <div className="text-xs sm:text-sm text-gray-600">Within 24 hours</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 sm:p-6">
                      <div className="flex items-start space-x-2 sm:space-x-3">
                        <Award className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-bold text-amber-800 text-sm sm:text-base mb-1 sm:mb-2">
                            Limited Availability
                          </div>
                          <div className="text-xs sm:text-sm text-amber-700">
                            We operate only 2-3 tours per month to ensure exceptional quality and minimal environmental
                            impact. Book early to secure your preferred dates.
                          </div>
                        </div>
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
