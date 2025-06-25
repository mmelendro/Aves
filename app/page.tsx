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

      {/* Hero Section - Enhanced Value Proposition */}
      <section
        className={`relative py-16 lg:py-24 overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-blue-50 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 animate-pulse">
                  🌿 B Corp Certified • Carbon Neutral Tours
                </Badge>
                <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Discover Colombia's
                  <span className="text-emerald-600 block">1,900+ Bird Species</span>
                  <span className="text-2xl lg:text-3xl text-gray-600 font-normal block mt-2">
                    With Expert Naturalist Guides
                  </span>
                </h1>
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 border border-emerald-100 shadow-lg">
                  <p className="text-lg text-gray-700 leading-relaxed font-medium mb-4">
                    Join exclusive small-group birding expeditions across Colombia's diverse ecosystems. Experience the
                    world's most biodiverse country while supporting conservation and local communities.
                  </p>

                  {/* Value Propositions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span className="text-gray-700">Expert ornithologist guides</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span className="text-gray-700">Maximum 4 guests per tour</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span className="text-gray-700">Premium eco-lodges</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span className="text-gray-700">100% carbon neutral</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span className="text-gray-700">B Corp certified</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span className="text-gray-700">Small groups (max 4)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/tours" className="flex-1">
                  <Button
                    size="lg"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-base px-6 py-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <Binoculars className="mr-2 w-5 h-5" />
                    Explore Our Tours
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/contact" className="flex-1">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 text-base px-6 py-4 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <Calendar className="mr-2 w-5 h-5" />
                    Plan My Trip
                  </Button>
                </Link>
              </div>

              {/* Urgency/Scarcity Element */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 text-amber-800">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">Limited Availability: Only 2-3 tours per month</span>
                </div>
              </div>
            </div>

            {/* Endemic Birds Carousel */}
            <div className="relative">
              <EndemicBirdsCarousel className="shadow-2xl" autoPlay={true} autoPlayInterval={7000} />

              {/* Floating testimonial */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg border border-gray-100 max-w-xs hidden lg:block">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 italic">
                      "Absolutely incredible experience! Saw 180+ species in 10 days."
                    </p>
                    <p className="text-xs text-gray-500 mt-1">- Royann, Wildlife Photographer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100 rounded-full opacity-20 -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-100 rounded-full opacity-20 translate-y-24 -translate-x-24"></div>
      </section>

      {/* Tour Types Section - Enhanced with Better CTAs */}
      <section id="tours" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 mb-4">
              🦅 Choose Your Adventure
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Four Unique Birding Experiences</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Each tour is carefully crafted for different interests and comfort levels, all featuring expert guides and
              premium accommodations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Adventure Tours - Enhanced */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-emerald-600 text-white px-3 py-1 text-xs font-bold rounded-bl-lg">
                POPULAR
              </div>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900">🍃 AVES Adventure</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">4.9</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4 text-sm">
                  Our signature birding expeditions across Colombia's prime hotspots. 7-14 days of immersive wildlife
                  discovery through diverse ecosystems.
                </p>
                <div className="space-y-2 mb-5">
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckCircle className="w-3 h-3 text-emerald-600 mr-2" />
                    Professional ornithologist guides
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckCircle className="w-3 h-3 text-emerald-600 mr-2" />
                    Premium eco-lodges
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckCircle className="w-3 h-3 text-emerald-600 mr-2" />
                    Conservation project visits
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xl font-bold text-emerald-600">$8,000</div>
                      <div className="text-xs text-gray-500">avg. per person</div>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-800 text-xs">7-14 days</Badge>
                  </div>
                  <Link href="/tours/adventure" className="block">
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-xs">View Details & Book</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Vision Tours - Enhanced */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900">🪶 AVES Vision</h3>
                  <Camera className="w-5 h-5 text-purple-600" />
                </div>
                <p className="text-gray-600 mb-4 text-sm">
                  Specialized photography and videography workshops with professional wildlife photographers capturing
                  Colombia's avian beauty.
                </p>
                <div className="space-y-2 mb-5">
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckCircle className="w-3 h-3 text-purple-600 mr-2" />
                    Exclusive photography hides
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckCircle className="w-3 h-3 text-purple-600 mr-2" />
                    Post-processing sessions
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckCircle className="w-3 h-3 text-purple-600 mr-2" />
                    Professional equipment included
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xl font-bold text-purple-600">$10,000</div>
                      <div className="text-xs text-gray-500">avg. per person</div>
                    </div>
                    <Badge className="bg-purple-100 text-purple-800 text-xs">10-12 days</Badge>
                  </div>
                  <Link href="/tours/vision" className="block">
                    <Button
                      variant="outline"
                      className="w-full border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white text-xs"
                    >
                      View Details & Book
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Elevate Tours - Enhanced */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900">🌼 AVES Elevate</h3>
                  <Award className="w-5 h-5 text-yellow-500" />
                </div>
                <p className="text-gray-600 mb-4 text-sm">
                  Premium expeditions with luxury amenities in exclusive locations for the ultimate comfort experience
                  in Colombia's finest reserves.
                </p>
                <div className="space-y-2 mb-5">
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckCircle className="w-3 h-3 text-yellow-500 mr-2" />
                    Luxury accommodations
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckCircle className="w-3 h-3 text-yellow-500 mr-2" />
                    Private chef & spa access
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckCircle className="w-3 h-3 text-yellow-500 mr-2" />
                    Helicopter transfers
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xl font-bold text-yellow-500">$12,000</div>
                      <div className="text-xs text-gray-500">avg. per person</div>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800 text-xs">8-10 days</Badge>
                  </div>
                  <Link href="/tours/elevate" className="block">
                    <Button
                      variant="outline"
                      className="w-full border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white text-xs"
                    >
                      View Details & Book
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Souls Tours - Enhanced */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900">🍓 AVES Souls</h3>
                  <Heart className="w-5 h-5 text-red-500" />
                </div>
                <p className="text-gray-600 mb-4 text-sm">
                  Romantic retreats combining birding with intimate experiences in secluded, breathtaking locations
                  perfect for couples.
                </p>
                <div className="space-y-2 mb-5">
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckCircle className="w-3 h-3 text-red-500 mr-2" />
                    Couples-only experiences
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckCircle className="w-3 h-3 text-red-500 mr-2" />
                    Private romantic dining
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckCircle className="w-3 h-3 text-red-500 mr-2" />
                    Sunset photography sessions
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xl font-bold text-red-500">$14,000</div>
                      <div className="text-xs text-gray-500">avg. per person</div>
                    </div>
                    <Badge className="bg-red-100 text-red-800 text-xs">6-8 days</Badge>
                  </div>
                  <Link href="/tours/souls" className="block">
                    <Button
                      variant="outline"
                      className="w-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white text-xs"
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
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Not Sure Which Tour is Right for You?</h3>
              <p className="text-gray-600 mb-6">
                Our birding experts will help you choose the perfect Colombian adventure based on your interests,
                experience level, and travel preferences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                    <Mail className="mr-2 w-4 h-4" />
                    Contact Our Experts
                  </Button>
                </Link>
                <Link href="/tours">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
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
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Guests Say</h2>
            <p className="text-lg text-gray-600">Real experiences from real birding enthusiasts</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Royann's Updated Review */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">5.0</span>
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "Absolutely extraordinary! I photographed over 500 species including more than 30 endemics. The guides
                  knew exactly where to position me for the perfect shots. My camera has never captured such incredible
                  diversity!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-emerald-600 font-bold">R</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Royann</p>
                    <p className="text-sm text-gray-600">Wildlife Photographer, USA</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sylvain's Review in French */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">5.0</span>
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "Une expérience absolument magnifique! Les guides étaient exceptionnels et connaissaient parfaitement
                  les habitats. J'ai observé des espèces que je n'aurais jamais imaginé voir. Un voyage inoubliable au
                  cœur de la biodiversité colombienne!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-emerald-600 font-bold">S</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Sylvain</p>
                    <p className="text-sm text-gray-600">Ornithologue amateur, Québec</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lisa & Peter's Updated Review */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">5.0</span>
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "At our age, we thought our traveling days were behind us, but AVES made this the most memorable trip
                  of our lives! The care, attention, and incredible birds we saw exceeded all expectations. A perfect
                  adventure for our 80s!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-emerald-600 font-bold">L&P</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Lisa & Peter</p>
                    <p className="text-sm text-gray-600">Retirees, Pender Island</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Colombia Section - Enhanced */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 mb-4">
                🌎 World's #1 Birding Destination
              </Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why Colombia is the World's Premier Birding Destination
              </h2>
              <p className="text-base text-gray-600 mb-6">
                Colombia is home to nearly 20% of all bird species on Earth, making it the most biodiverse country for
                avian life. From the Andes to the Amazon, the Caribbean coast to the Pacific, each ecosystem offers
                unique species found nowhere else.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <a
                  href="https://birdsofcolombia.com/pages/birds-by-order-and-family"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center p-4 bg-emerald-50 rounded-lg border border-emerald-100 hover:bg-emerald-100 hover:border-emerald-200 transition-all duration-300 hover:shadow-md cursor-pointer group"
                >
                  <div className="text-3xl font-bold text-emerald-600 mb-1 group-hover:text-emerald-700">1,900+</div>
                  <div className="text-sm text-gray-700 group-hover:text-gray-800">Bird Species</div>
                  <div className="text-xs text-emerald-600 mt-1 group-hover:text-emerald-700">20% of world total</div>
                </a>
                <a
                  href="https://birdsofcolombia.com/pages/endemic-birds"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center p-4 bg-emerald-50 rounded-lg border border-emerald-100 hover:bg-emerald-100 hover:border-emerald-200 transition-all duration-300 hover:shadow-md cursor-pointer group"
                >
                  <div className="text-3xl font-bold text-emerald-600 mb-1 group-hover:text-emerald-700">80+</div>
                  <div className="text-sm text-gray-700 group-hover:text-gray-800">Endemic Species</div>
                  <div className="text-xs text-emerald-600 mt-1 group-hover:text-emerald-700">Found nowhere else</div>
                </a>
                <a
                  href="https://birdsofcolombia.com/pages/hummingbirds-2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center p-4 bg-emerald-50 rounded-lg border border-emerald-100 hover:bg-emerald-100 hover:border-emerald-200 transition-all duration-300 hover:shadow-md cursor-pointer group"
                >
                  <div className="text-3xl font-bold text-emerald-600 mb-1 group-hover:text-emerald-700">135+</div>
                  <div className="text-sm text-gray-700 group-hover:text-gray-800">Hummingbird Species</div>
                  <div className="text-xs text-emerald-600 mt-1 group-hover:text-emerald-700">Most in the world</div>
                </a>
                <div className="text-center p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                  <div className="text-3xl font-bold text-emerald-600 mb-1">10</div>
                  <div className="text-sm text-gray-700">Bioregions</div>
                  <div className="text-xs text-emerald-600 mt-1">Diverse ecosystems</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://ebird.org/region/CO" target="_blank" rel="noopener noreferrer">
                  <Button size="default" className="bg-emerald-600 hover:bg-emerald-700">
                    <Globe className="mr-2 w-4 h-4" />
                    Explore on eBird
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </a>
                <Link href="/tours">
                  <Button
                    size="default"
                    variant="outline"
                    className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                  >
                    <Calendar className="mr-2 w-4 h-4" />
                    Plan Your Visit
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <OptimizedImage
                  src="/images/green-hermit-hummingbird.jpg"
                  alt="Green Hermit Hummingbird - large emerald-green hummingbird with curved bill and white-tipped tail, known as Colibrí Ermitaño Verde in Spanish, representing Colombia's incredible hummingbird diversity with over 85 species"
                  width={600}
                  height={450}
                  className="object-cover w-full h-full"
                  style={{ objectPosition: "center 30%" }}
                />
              </div>
              <div className="absolute -top-4 -right-4 bg-white rounded-xl p-3 shadow-lg">
                <a
                  href="https://ebird.org/species/greher1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 hover:bg-gray-50 transition-colors rounded-lg p-1 -m-1"
                >
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Globe className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">
                      <SpeciesTooltip species={greenHermitData}>Green Hermit</SpeciesTooltip>
                    </div>
                    <div className="text-xs text-gray-600 italic">Phaethornis guy</div>
                    <div className="text-xs text-emerald-600">Cloud Forest Specialist • eBird →</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conservation Impact Section - Enhanced */}
      <section id="conservation" className="py-16 bg-emerald-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 mb-4">🌱 Conservation Impact</Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Travel That Makes a Difference</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Every AVES tour directly supports habitat conservation and local communities. We're committed to becoming
              the first B Corp certified birding company in Colombia.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Carbon Neutral Tours</h3>
              <p className="text-gray-600 text-sm mb-4">
                All tours operate with full carbon neutrality, with offsets reinvested in critical bird habitat
                preservation projects.
              </p>
              <div className="text-2xl font-bold text-emerald-600">100%</div>
              <div className="text-xs text-gray-500">Carbon Neutral Since 2020</div>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Community Support</h3>
              <p className="text-gray-600 text-sm mb-4">
                We partner with local communities, providing fair employment and supporting community-managed
                conservation initiatives.
              </p>
              <Link href="/about/partners">
                <Button variant="outline" size="sm" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
                  View Our Partners
                  <ArrowRight className="ml-2 w-3 h-3" />
                </Button>
              </Link>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Habitat Protection</h3>
              <p className="text-gray-600 text-sm mb-4">
                10% of net profits fund our Conservation Endowment Trust, dedicated to permanent habitat restoration and
                protection across Colombia's critical ecosystems.
              </p>
              <Link href="/conservation">
                <Button variant="outline" size="sm" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
                  Learn About Our Conservation Efforts
                  <ArrowRight className="ml-2 w-3 h-3" />
                </Button>
              </Link>
            </Card>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Pursuing B Corp Certification</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  AVES is committed to meeting the highest standards of social and environmental responsibility. We're
                  working toward B Corp certification, joining BirdsChile as only the second birding-focused B Corp
                  globally.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mr-2" />
                    <span className="text-gray-700 text-sm">Transparent impact reporting</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mr-2" />
                    <span className="text-gray-700 text-sm">Stakeholder governance model</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mr-2" />
                    <span className="text-gray-700 text-sm">Environmental accountability</span>
                  </div>
                </div>
                <Link href="/about/b-corp">
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
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
                <div className="absolute -bottom-3 -right-3 bg-white rounded-xl p-2 shadow-lg">
                  <a
                    href="https://ebird.org/species/mastro1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 hover:bg-gray-50 transition-colors rounded-lg p-1 -m-1"
                  >
                    <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Award className="w-3 h-3 text-emerald-600" />
                    </div>
                    <div className="text-xs">
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
      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 mb-4">
                📞 Expert Consultation
              </Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Plan Your Perfect Colombian Adventure</h2>
              <p className="text-base text-gray-600 mb-6">
                Ready to plan your Colombian birding adventure? Our expert team will help you choose the perfect tour
                and create an unforgettable experience tailored to your interests.
              </p>

              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                    <Mail className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Email</div>
                    <a
                      href={generateEmailLink()}
                      className="text-emerald-600 hover:text-emerald-700 hover:underline transition-colors"
                    >
                      info@aves.com
                    </a>
                    <div className="text-xs text-emerald-600">Response within 24 hours</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                    <MapPin className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Offices</div>
                    <div className="text-gray-600">Vancouver, Canada & Bogotá, Colombia</div>
                    <div className="text-xs text-emerald-600">Local expertise, global reach</div>
                  </div>
                </div>
              </div>
            </div>

            <Card className="p-6 border-0 shadow-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Get Your Custom Tour Quote</h3>
              <p className="text-sm text-gray-600 mb-6">
                Fill out this form and we'll send you a personalized tour recommendation and quote within 24 hours.
              </p>

              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">First Name *</label>
                    <Input
                      placeholder="Your first name"
                      className="text-sm"
                      required
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Last Name *</label>
                    <Input
                      placeholder="Your last name"
                      className="text-sm"
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
                    className="text-sm"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Travel Dates</label>
                    <Input
                      type="date"
                      className="text-sm"
                      value={formData.travelDate}
                      onChange={(e) => handleInputChange("travelDate", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Group Size</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
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

                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Desired Duration</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
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

                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-sm py-3">
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
