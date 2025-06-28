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

      {/* Hero Section - Streamlined for Conversion */}
      <section
        className={`relative py-12 sm:py-16 lg:py-24 overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-blue-50 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8 order-2 lg:order-1">
              <div className="space-y-6">
                <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 animate-pulse">
                  🌿 B Corp Certified • Carbon Neutral Tours
                </Badge>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                  Discover Colombia's
                  <span className="text-emerald-600 block">1,900+ Bird Species</span>
                </h1>
                <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed">
                  Join exclusive small-group expeditions with expert ornithologist guides across the world's most
                  biodiverse country.
                </p>

                {/* Key Value Props - Simplified */}
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-emerald-100 shadow-lg">
                  <div className="grid grid-cols-2 gap-4 text-sm">
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
                      <span className="text-gray-700">78+ endemic species</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span className="text-gray-700">100% carbon neutral</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Primary CTAs - Streamlined */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/tours" className="flex-1">
                  <Button
                    size="lg"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-base px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <Binoculars className="mr-2 w-5 h-5" />
                    Explore Our Tours
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link href="#contact" className="flex-1">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 text-base px-8 py-4 shadow-md hover:shadow-lg transition-all duration-300 bg-transparent"
                  >
                    <Calendar className="mr-2 w-5 h-5" />
                    Plan My Trip
                  </Button>
                </Link>
              </div>

              {/* Urgency Element */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-center space-x-3 text-amber-800">
                  <Clock className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">Limited Availability: Only 2-3 tours per month • Book early</span>
                </div>
              </div>
            </div>

            {/* Enhanced Birds Carousel */}
            <div className="relative order-1 lg:order-2">
              <div className="aspect-[4/3] lg:aspect-[3/4]">
                <EnhancedEndemicBirdsCarousel
                  className="shadow-xl rounded-xl"
                  autoPlay={true}
                  autoPlayInterval={7000}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-emerald-100 rounded-full opacity-20 -translate-y-16 sm:-translate-y-24 lg:-translate-y-32 translate-x-16 sm:translate-x-24 lg:translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-36 sm:h-36 lg:w-48 lg:h-48 bg-blue-100 rounded-full opacity-20 translate-y-12 sm:translate-y-18 lg:translate-y-24 -translate-x-12 sm:-translate-x-18 lg:-translate-x-24"></div>
      </section>

      {/* Social Proof Section - Streamlined */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Guests Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from birding enthusiasts who have experienced Colombia's incredible avifauna with AVES.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic leading-relaxed mb-4">"{review.text}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{review.author}</p>
                    <p className="text-sm text-gray-600">
                      {review.role}, {review.location}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tour Types Section - Updated without AVES acronym */}
      <section id="tours" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Four Unique Birding Experiences</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
              Each tour is carefully crafted for different interests and comfort levels, all featuring expert guides and
              premium accommodations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Adventure Tours */}
            <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="absolute top-0 right-0 bg-emerald-600 text-white px-3 py-1 text-xs font-bold rounded-bl-lg">
                POPULAR
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900">🍃 Adventure Tours</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">4.9</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  Our signature birding expeditions across Colombia's prime hotspots. 7-14 days of immersive wildlife
                  discovery.
                </p>
                <div className="space-y-2 mb-5">
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
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xl font-bold text-emerald-600">$8,000</div>
                      <div className="text-xs text-gray-500">avg. per person</div>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-800 text-xs">7-14 days</Badge>
                  </div>
                  <Link href="/tours/adventure" className="block">
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-sm">View Details & Book</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Vision Tours */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900">🪶 Vision Tours</h3>
                  <Camera className="w-5 h-5 text-purple-600" />
                </div>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  Specialized photography workshops with professional wildlife photographers capturing Colombia's avian
                  beauty.
                </p>
                <div className="space-y-2 mb-5">
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
                      className="w-full border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white text-sm bg-transparent"
                    >
                      View Details & Book
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Elevate Tours */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900">🌼 Elevate Tours</h3>
                  <Award className="w-5 h-5 text-yellow-500" />
                </div>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  Premium expeditions with luxury amenities in exclusive locations for the ultimate comfort experience.
                </p>
                <div className="space-y-2 mb-5">
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
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xl font-bold text-yellow-600">$15,000</div>
                      <div className="text-xs text-gray-500">avg. per person</div>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800 text-xs">8-10 days</Badge>
                  </div>
                  <Link href="/tours/elevate" className="block">
                    <Button
                      variant="outline"
                      className="w-full border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white text-sm bg-transparent"
                    >
                      View Details & Book
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Souls Tours */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900">🍓 Souls Tours</h3>
                  <Heart className="w-5 h-5 text-red-500" />
                </div>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  Cultural immersion tours combining birding with indigenous communities and traditional crafts.
                </p>
                <div className="space-y-2 mb-5">
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
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xl font-bold text-red-600">$6,500</div>
                      <div className="text-xs text-gray-500">avg. per person</div>
                    </div>
                    <Badge className="bg-red-100 text-red-800 text-xs">6-8 days</Badge>
                  </div>
                  <Link href="/tours/souls" className="block">
                    <Button
                      variant="outline"
                      className="w-full border-red-600 text-red-600 hover:bg-red-600 hover:text-white text-sm bg-transparent"
                    >
                      View Details & Book
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-6 border border-emerald-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Can't Decide? Let Us Help You Choose</h3>
              <p className="text-base text-gray-600 mb-4 max-w-2xl mx-auto">
                Our birding experts will recommend the perfect tour based on your interests, experience level, and
                travel preferences.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/contact">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-sm px-6">
                    <Mail className="mr-2 w-4 h-4" />
                    Get Personal Recommendations
                  </Button>
                </Link>
                <Link href="/tours">
                  <Button
                    variant="outline"
                    className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 text-sm px-6 bg-transparent"
                  >
                    Compare All Tours
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose AVES - Consolidated Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose AVES</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We're passionate conservationists, expert birders, and your partners in discovering Colombia's incredible
              avian diversity with award-winning excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Expert Guides */}
            <div className="text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Local Guides</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our certified ornithologist guides know every bird call, behavior, and habitat across Colombia's diverse
                regions, ensuring exceptional wildlife encounters.
              </p>
              <Link
                href="/team"
                className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Meet Our Guides
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {/* Conservation & B Corp */}
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">B Corp Certified Conservation</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Every tour directly supports habitat protection and local communities. We're B Corp certified and
                operate 100% carbon-neutral expeditions with verified impact.
              </p>
              <div className="flex flex-col gap-2">
                <Link
                  href="/about/b-corp"
                  className="inline-flex items-center text-green-600 hover:text-green-700 font-medium text-sm"
                >
                  Our B Corp Journey
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
                <Link
                  href="/conservation"
                  className="inline-flex items-center text-green-600 hover:text-green-700 font-medium text-sm"
                >
                  Conservation Impact
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </div>
            </div>

            {/* Exclusive Access & Recognition */}
            <div className="text-center md:col-span-2 lg:col-span-1">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Exclusive Access & Recognition</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Access private reserves and research stations unavailable to others. Recommended by leading
                ornithologists and featured in top birding publications worldwide.
              </p>
              <Link
                href="/about/partners"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                Our Partner Network
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 bg-gradient-to-r from-gray-50 to-emerald-50 rounded-xl p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-emerald-600 mb-1">B Corp</div>
                <div className="text-sm text-gray-600">Certified</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600 mb-1">100%</div>
                <div className="text-sm text-gray-600">Carbon Neutral</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600 mb-1">Max 4</div>
                <div className="text-sm text-gray-600">Guests per Tour</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600 mb-1">24hr</div>
                <div className="text-sm text-gray-600">Response Time</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Colombia by the Numbers - Interactive & Streamlined */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Colombia by the Numbers</h2>
            <p className="text-lg text-gray-600">Discover why Colombia is the world's birding capital</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Link href="/endemic-birds" className="group block">
              <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-emerald-200 hover:border-emerald-300">
                <div className="text-4xl font-bold text-emerald-600 mb-2 group-hover:text-emerald-700">1,900+</div>
                <div className="text-sm text-gray-600 group-hover:text-gray-700">Bird Species</div>
                <div className="text-xs text-emerald-600 mt-1 group-hover:text-emerald-700">#1 Globally</div>
                <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="w-4 h-4 mx-auto text-emerald-600" />
                </div>
              </div>
            </Link>

            <Link href="/endemic-birds" className="group block">
              <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-blue-200 hover:border-blue-300">
                <div className="text-4xl font-bold text-blue-600 mb-2 group-hover:text-blue-700">78+</div>
                <div className="text-sm text-gray-600 group-hover:text-gray-700">Endemic Species</div>
                <div className="text-xs text-blue-600 mt-1 group-hover:text-blue-700">Found Nowhere Else</div>
                <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="w-4 h-4 mx-auto text-blue-600" />
                </div>
              </div>
            </Link>

            <Link href="/bioregions" className="group block">
              <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-purple-200 hover:border-purple-300">
                <div className="text-4xl font-bold text-purple-600 mb-2 group-hover:text-purple-700">11</div>
                <div className="text-sm text-gray-600 group-hover:text-gray-700">Bioregions</div>
                <div className="text-xs text-purple-600 mt-1 group-hover:text-purple-700">Diverse Ecosystems</div>
                <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="w-4 h-4 mx-auto text-purple-600" />
                </div>
              </div>
            </Link>

            <Link href="/endemic-birds" className="group block">
              <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-orange-200 hover:border-orange-300">
                <div className="text-4xl font-bold text-orange-600 mb-2 group-hover:text-orange-700">165</div>
                <div className="text-sm text-gray-600 group-hover:text-gray-700">Hummingbird Species</div>
                <div className="text-xs text-orange-600 mt-1 group-hover:text-orange-700">Most in the World</div>
                <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="w-4 h-4 mx-auto text-orange-600" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Form Section - Maintained as Requested */}
      <section id="contact" className="py-16 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Plan Your Colombian Birding Adventure</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Tell us about your birding interests. We'll respond within 24 hours with personalized recommendations.
              </p>
            </div>

            <Card className="shadow-xl border-0">
              <CardContent className="p-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Contact Form */}
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                        <Input
                          placeholder="Your first name"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                        <Input
                          placeholder="Your last name"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                      <Input
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Travel Date</label>
                        <Input
                          type="date"
                          value={formData.travelDate}
                          onChange={(e) => handleInputChange("travelDate", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Group Size</label>
                        <select
                          value={formData.groupSize}
                          onChange={(e) => handleInputChange("groupSize", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                          {GROUP_SIZE_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                        <select
                          value={formData.desiredDuration}
                          onChange={(e) => handleInputChange("desiredDuration", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                          {DURATION_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                        <select
                          value={formData.experienceLevel}
                          onChange={(e) => handleInputChange("experienceLevel", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                      <div className="flex items-center justify-between mb-3">
                        <label className="block text-sm font-medium text-gray-700">
                          Interested Tour Types (select all that apply)
                        </label>
                        <Link
                          href="/tours"
                          className="text-xs text-emerald-600 hover:text-emerald-700 hover:underline flex items-center gap-1"
                        >
                          <ExternalLink className="w-3 h-3" />
                          View All Tours
                        </Link>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {TOUR_TYPE_OPTIONS.map((tourType) => (
                          <button
                            key={tourType}
                            type="button"
                            onClick={() => toggleSelection(tourType, selectedTourTypes, setSelectedTourTypes)}
                            className={`text-left p-3 rounded-lg border text-sm transition-all ${
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
                      <div className="flex items-center justify-between mb-3">
                        <label className="block text-sm font-medium text-gray-700">
                          Preferred Biogeographic Regions (select all that interest you)
                        </label>
                        <Link
                          href="/bioregions"
                          className="text-xs text-emerald-600 hover:text-emerald-700 hover:underline flex items-center gap-1"
                        >
                          <Map className="w-3 h-3" />
                          Explore Map
                        </Link>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {LOCATION_OPTIONS.map((location) => (
                          <label
                            key={location}
                            className="flex items-center space-x-2 p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={selectedLocations.includes(location)}
                              onChange={() => toggleSelection(location, selectedLocations, setSelectedLocations)}
                              className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                            />
                            <span className="text-xs text-gray-700">{location}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Special Interests or Requests
                      </label>
                      <textarea
                        placeholder="Tell us about specific birds you'd like to see, dietary restrictions, or any other special requests..."
                        value={formData.specialRequests}
                        onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                        rows={4}
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
                      <Button size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700 text-base py-4">
                        <Mail className="mr-2 w-5 h-5" />
                        Send My Inquiry
                      </Button>
                    </a>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Why Book Direct?</h3>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-gray-900">24-Hour Response</div>
                            <div className="text-sm text-gray-600">Personal response from our birding experts</div>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-gray-900">Custom Itineraries</div>
                            <div className="text-sm text-gray-600">Tailored to your interests and experience</div>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-gray-900">No Booking Fees</div>
                            <div className="text-sm text-gray-600">Best rates when you book direct</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Mail className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-gray-900">Email</div>
                            <div className="text-sm text-gray-600">info@aves.com</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-gray-900">Based in</div>
                            <div className="text-sm text-gray-600">Bogotá, Colombia</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Clock className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-gray-900">Response Time</div>
                            <div className="text-sm text-gray-600">Within 24 hours</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <Award className="w-6 h-6 text-amber-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-bold text-amber-800 mb-2">Limited Availability</div>
                          <div className="text-sm text-amber-700">
                            We operate only 2-3 tours per month to ensure exceptional quality. Book early to secure your
                            preferred dates.
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

      <Footer />

      <FloatingAVESNavigation />
    </div>
  )
}
