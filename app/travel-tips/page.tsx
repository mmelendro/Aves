import type { Metadata } from "next"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Plane,
  Backpack,
  Shield,
  Sun,
  Thermometer,
  AlertTriangle,
  CheckCircle,
  Heart,
  Bird,
  Calendar,
  Users,
  ExternalLink,
  BookOpen,
  Map,
} from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Colombia Birding Travel Tips | Essential Guide for Bird Watchers | AVES Colombia",
  description:
    "Complete travel guide for birding in Colombia. Essential tips on weather, gear, health, safety, and logistics for your Colombian bird watching adventure with AVES.",
  keywords: [
    "Colombia birding travel tips",
    "bird watching Colombia guide",
    "Colombia travel advice",
    "birding gear Colombia",
    "Colombia weather birding",
    "birding safety Colombia",
    "Colombia bird tours preparation",
    "AVES Colombia travel guide",
    "Colombian birding logistics",
    "bird watching equipment",
    "Colombia travel health",
    "birding photography tips",
  ],
  openGraph: {
    title: "Colombia Birding Travel Tips | Essential Guide for Bird Watchers",
    description:
      "Complete travel guide for birding in Colombia. Essential tips on weather, gear, health, safety, and logistics for your Colombian bird watching adventure.",
    images: ["/images/aves-logo.png"],
  },
}

export default function TravelTipsPage() {
  const travelTips = [
    {
      category: "Planning & Preparation",
      icon: Calendar,
      color: "emerald",
      tips: [
        {
          title: "Best Time to Visit",
          description: "Colombia's birding is excellent year-round, but timing varies by region.",
          details: [
            "Dry season (Dec-Mar): Best for most regions, easier access to remote areas",
            "Wet season (Apr-Nov): Fewer crowds, lush vegetation, active breeding behavior",
            "Andean regions: Year-round birding with seasonal variations",
            "Amazon: June-September for drier conditions",
            "Caribbean coast: December-April for optimal weather",
          ],
          priority: "high",
        },
        {
          title: "Booking Your Tour",
          description: "Plan ahead for the best experience with AVES Colombia.",
          details: [
            "Book 3-6 months in advance for peak season (Dec-Mar)",
            "Small group sizes (max 4 guests) fill up quickly",
            "Consider multiple regions for comprehensive birding",
            "Flexible dates allow for better availability",
            "Custom tours available for specific interests",
          ],
          priority: "high",
        },
        {
          title: "Research Your Target Species",
          description: "Maximize your birding success with preparation.",
          details: [
            "Study endemic species for your chosen regions",
            "Learn key bird calls and songs beforehand",
            "Download offline field guides and apps",
            "Review recent eBird reports for your destinations",
            "Set realistic expectations for rare species",
          ],
          priority: "medium",
        },
      ],
    },
    {
      category: "Health & Safety",
      icon: Shield,
      color: "red",
      tips: [
        {
          title: "Vaccinations & Health",
          description: "Protect yourself with proper medical preparation.",
          details: [
            "Yellow fever vaccination required for some regions",
            "Hepatitis A & B, typhoid, and routine vaccinations recommended",
            "Malaria prophylaxis for lowland areas (consult your doctor)",
            "Travel insurance with medical evacuation coverage",
            "Bring personal medications with prescriptions",
          ],
          priority: "high",
        },
        {
          title: "Safety Considerations",
          description: "Stay safe while birding in Colombia.",
          details: [
            "Always bird with experienced local guides",
            "Stay on designated trails and paths",
            "Inform others of your birding plans",
            "Carry emergency contact information",
            "Respect local communities and customs",
            "Avoid displaying expensive equipment openly",
          ],
          priority: "high",
        },
        {
          title: "Altitude Considerations",
          description: "Prepare for high-altitude birding locations.",
          details: [
            "Acclimatize gradually to elevations above 2,500m",
            "Stay hydrated and avoid alcohol initially",
            "Recognize symptoms of altitude sickness",
            "Descend if symptoms worsen",
            "Consider arriving a day early for high-altitude destinations",
          ],
          priority: "medium",
        },
      ],
    },
    {
      category: "Gear & Equipment",
      icon: Backpack,
      color: "blue",
      tips: [
        {
          title: "Essential Birding Gear",
          description: "Must-have equipment for Colombian birding.",
          details: [
            "High-quality binoculars (8x42 or 10x42 recommended)",
            "Spotting scope for open areas and distant birds",
            "Field notebook and pencils (waterproof)",
            "Headlamp with red filter for early morning starts",
            "Portable phone charger/power bank",
          ],
          priority: "high",
        },
        {
          title: "Photography Equipment",
          description: "Capture Colombia's incredible bird diversity.",
          details: [
            "Camera with telephoto lens (400mm+ recommended)",
            "Extra batteries and memory cards",
            "Weather protection for equipment",
            "Tripod or monopod for stability",
            "Lens cleaning kit for humid conditions",
          ],
          priority: "medium",
        },
        {
          title: "Clothing & Accessories",
          description: "Dress appropriately for diverse climates.",
          details: [
            "Layered clothing for temperature variations",
            "Waterproof rain jacket and pants",
            "Comfortable, broken-in hiking boots",
            "Sun hat and sunglasses",
            "Insect repellent (DEET-based)",
            "Quick-dry shirts and pants",
          ],
          priority: "high",
        },
      ],
    },
    {
      category: "Weather & Climate",
      icon: Sun,
      color: "yellow",
      tips: [
        {
          title: "Understanding Colombia's Climate",
          description: "Prepare for diverse weather conditions.",
          details: [
            "Tropical climate with regional variations",
            "Temperature depends more on altitude than season",
            "Lowlands: Hot and humid (25-35°C)",
            "Andean regions: Cool to cold (5-20°C)",
            "High mountains: Can be near freezing",
          ],
          priority: "medium",
        },
        {
          title: "Seasonal Patterns",
          description: "Weather varies by region and season.",
          details: [
            "Two dry seasons: Dec-Mar and Jun-Aug (varies by region)",
            "Wet season: More rain but still birdable",
            "Caribbean coast: Driest Dec-Apr",
            "Pacific coast: Wettest region year-round",
            "Amazon: Wet season May-Oct, dry season Nov-Apr",
          ],
          priority: "medium",
        },
        {
          title: "Daily Weather Patterns",
          description: "Plan your birding around daily weather cycles.",
          details: [
            "Early morning: Best birding activity (5:30-9:00 AM)",
            "Midday: Hot and less bird activity",
            "Late afternoon: Second peak of activity (3:00-6:00 PM)",
            "Evening: Owls and nightjars become active",
            "Rain often comes in afternoon/evening",
          ],
          priority: "medium",
        },
      ],
    },
    {
      category: "Cultural & Practical",
      icon: Heart,
      color: "purple",
      tips: [
        {
          title: "Cultural Awareness",
          description: "Respect local customs and communities.",
          details: [
            "Learn basic Spanish phrases",
            "Respect indigenous territories and customs",
            "Ask permission before photographing people",
            "Support local communities through responsible tourism",
            "Be patient and flexible with Latin American time",
          ],
          priority: "medium",
        },
        {
          title: "Money & Payments",
          description: "Handle finances effectively in Colombia.",
          details: [
            "Colombian Peso (COP) is the local currency",
            "Credit cards accepted in cities, cash needed in rural areas",
            "ATMs available in major towns",
            "US dollars can be exchanged in cities",
            "Tipping: 10% in restaurants, small amounts for guides",
          ],
          priority: "medium",
        },
        {
          title: "Communication",
          description: "Stay connected during your birding adventure.",
          details: [
            "International roaming can be expensive",
            "Local SIM cards available at airports",
            "WiFi available in most hotels and restaurants",
            "WhatsApp widely used for communication",
            "Download offline maps and translation apps",
          ],
          priority: "low",
        },
      ],
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getCategoryColor = (color: string) => {
    const colors = {
      emerald: "from-emerald-500 to-emerald-600",
      red: "from-red-500 to-red-600",
      blue: "from-blue-500 to-blue-600",
      yellow: "from-yellow-500 to-yellow-600",
      purple: "from-purple-500 to-purple-600",
    }
    return colors[color as keyof typeof colors] || colors.emerald
  }

  return (
    <div className="min-h-screen bg-white">
      <NavigationHeader currentPage="/travel-tips" />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <Plane className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Colombia Birding Travel Tips
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
            Essential advice and practical tips for your Colombian birding adventure. From gear recommendations to
            cultural insights, prepare for an unforgettable experience in the world's most biodiverse country.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">5</div>
              <div className="text-gray-600 font-medium">Key Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
              <div className="text-gray-600 font-medium">Essential Tips</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">11</div>
              <div className="text-gray-600 font-medium">Bioregions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">1,900+</div>
              <div className="text-gray-600 font-medium">Bird Species</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Link href="/tours">
                <Calendar className="w-5 h-5 mr-2" />
                Book Your Tour
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 bg-transparent"
            >
              <Link href="/aves-explorer">
                <Map className="w-5 h-5 mr-2" />
                Explore Colombia
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Travel Tips Sections */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-16">
            {travelTips.map((category, categoryIndex) => {
              const IconComponent = category.icon
              return (
                <div key={categoryIndex}>
                  {/* Category Header */}
                  <div className="text-center mb-12">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${getCategoryColor(
                        category.color,
                      )} rounded-full mb-6 shadow-lg`}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{category.category}</h2>
                  </div>

                  {/* Tips Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                    {category.tips.map((tip, tipIndex) => (
                      <Card
                        key={tipIndex}
                        className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg"
                      >
                        <CardHeader className="pb-4">
                          <div className="flex items-start justify-between">
                            <CardTitle className="text-xl group-hover:text-emerald-600 transition-colors pr-4">
                              {tip.title}
                            </CardTitle>
                            <Badge className={`${getPriorityColor(tip.priority)} text-xs font-medium flex-shrink-0`}>
                              {tip.priority}
                            </Badge>
                          </div>
                          <CardDescription className="text-gray-600 leading-relaxed">{tip.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <ul className="space-y-3">
                            {tip.details.map((detail, detailIndex) => (
                              <li key={detailIndex} className="flex items-start space-x-3">
                                <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700 text-sm leading-relaxed">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Quick Reference Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Quick Reference Guide</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Essential information at a glance for your Colombian birding adventure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Emergency Contacts */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle className="text-lg">Emergency</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Police:</span>
                  <span className="font-medium">123</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Medical:</span>
                  <span className="font-medium">125</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fire:</span>
                  <span className="font-medium">119</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tourist Police:</span>
                  <span className="font-medium">147</span>
                </div>
              </CardContent>
            </Card>

            {/* Weather Info */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Thermometer className="w-6 h-6 text-yellow-600" />
                </div>
                <CardTitle className="text-lg">Climate Zones</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sea Level:</span>
                  <span className="font-medium">28-32°C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">1000-2000m:</span>
                  <span className="font-medium">18-24°C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">2000-3000m:</span>
                  <span className="font-medium">12-18°C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">3000m+:</span>
                  <span className="font-medium">6-12°C</span>
                </div>
              </CardContent>
            </Card>

            {/* Useful Phrases */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Key Phrases</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-2 text-sm">
                <div>
                  <div className="text-gray-600">Hello:</div>
                  <div className="font-medium">Hola</div>
                </div>
                <div>
                  <div className="text-gray-600">Thank you:</div>
                  <div className="font-medium">Gracias</div>
                </div>
                <div>
                  <div className="text-gray-600">Where is...?:</div>
                  <div className="font-medium">¿Dónde está...?</div>
                </div>
                <div>
                  <div className="text-gray-600">Bird:</div>
                  <div className="font-medium">Pájaro / Ave</div>
                </div>
              </CardContent>
            </Card>

            {/* Packing Checklist */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">Must Pack</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                  <span>Binoculars</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                  <span>Rain jacket</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                  <span>Insect repellent</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                  <span>Field notebook</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                  <span>Power bank</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Additional Resources</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Helpful tools and resources to enhance your Colombian birding experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/aves-explorer" className="group">
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-emerald-50 to-green-50">
                <CardContent className="text-center p-8">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-200 transition-colors">
                    <Map className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors">
                    Explore Colombia
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Interactive map of Colombia's 11 bioregions with endemic species information and birding hotspots.
                  </p>
                  <div className="flex items-center justify-center text-emerald-600 group-hover:text-emerald-700">
                    <span className="font-medium">Explore Map</span>
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/resources" className="group">
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardContent className="text-center p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                    <BookOpen className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    Birding Resources
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Field guides, apps, websites, and tools to enhance your Colombian birding experience.
                  </p>
                  <div className="flex items-center justify-center text-blue-600 group-hover:text-blue-700">
                    <span className="font-medium">View Resources</span>
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/endemic-birds" className="group">
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-purple-50 to-pink-50">
                <CardContent className="text-center p-8">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors">
                    <Bird className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                    Endemic Birds
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Complete guide to Colombia's 78+ endemic bird species with photos, sounds, and habitat information.
                  </p>
                  <div className="flex items-center justify-center text-purple-600 group-hover:text-purple-700">
                    <span className="font-medium">Discover Endemics</span>
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-600 to-blue-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready for Your Colombian Adventure?</h2>
          <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
            Now that you're prepared, it's time to experience Colombia's incredible bird diversity firsthand. Join our
            expert-guided tours for an unforgettable birding adventure.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-emerald-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Link href="/tours">
                <Calendar className="w-5 h-5 mr-2" />
                Book Your Tour
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-emerald-700 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 bg-transparent"
            >
              <Link href="/contact">
                <Users className="w-5 h-5 mr-2" />
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
