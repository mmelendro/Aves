"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, ExternalLink, BookOpen, Map, Bird, Headphones, Globe, Calendar, Star, ArrowRight } from "lucide-react"
import Link from "next/link"

interface Resource {
  id: string
  title: string
  description: string
  category: "field-guide" | "app" | "website" | "podcast" | "book" | "map" | "tool"
  type: "free" | "paid" | "freemium"
  rating: number
  url: string
  image?: string
  features: string[]
  tags: string[]
}

const resources: Resource[] = [
  {
    id: "ebird",
    title: "eBird Colombia",
    description:
      "The world's largest biodiversity citizen science project. Essential for tracking your sightings and exploring birding hotspots across Colombia.",
    category: "app",
    type: "free",
    rating: 5,
    url: "https://ebird.org/region/CO",
    features: ["Real-time sightings", "Hotspot maps", "Species lists", "Photo sharing"],
    tags: ["citizen science", "sightings", "hotspots", "mobile app"],
  },
  {
    id: "merlin",
    title: "Merlin Bird ID",
    description:
      "Cornell's powerful bird identification app with Colombia pack. Identify birds by photo, sound, or description.",
    category: "app",
    type: "free",
    rating: 5,
    url: "https://merlin.allaboutbirds.org",
    features: ["Photo ID", "Sound ID", "Colombia bird pack", "Offline access"],
    tags: ["identification", "photos", "sounds", "offline"],
  },
  {
    id: "xeno-canto",
    title: "Xeno-canto Colombia",
    description:
      "Comprehensive collection of Colombian bird sounds. Perfect for learning calls and songs before your trip.",
    category: "website",
    type: "free",
    rating: 5,
    url: "https://www.xeno-canto.org/explore/region/colombia",
    features: ["Bird sounds", "Sonograms", "Location data", "Quality ratings"],
    tags: ["sounds", "calls", "songs", "audio"],
  },
  {
    id: "birds-colombia",
    title: "Birds of Colombia Field Guide",
    description:
      "Comprehensive field guide covering all 1,900+ species found in Colombia. Essential reference for serious birders.",
    category: "book",
    type: "paid",
    rating: 5,
    url: "https://www.lynxedicions.com/birds-of-colombia",
    features: ["1,900+ species", "Range maps", "Detailed illustrations", "Habitat info"],
    tags: ["field guide", "comprehensive", "illustrations", "reference"],
  },
  {
    id: "colombia-birding-map",
    title: "Colombia Birding Regions Map",
    description: "Detailed map showing Colombia's 11 bioregions and key birding locations. Perfect for trip planning.",
    category: "map",
    type: "free",
    rating: 4,
    url: "/aves-explorer",
    features: ["Interactive map", "Bioregion details", "Endemic species", "Best times to visit"],
    tags: ["bioregions", "planning", "interactive", "endemics"],
  },
  {
    id: "inaturalist",
    title: "iNaturalist Colombia",
    description:
      "Community-driven platform for sharing and identifying wildlife observations. Great for connecting with local birders.",
    category: "app",
    type: "free",
    rating: 4,
    url: "https://www.inaturalist.org/places/colombia",
    features: ["Photo sharing", "Community ID", "Research grade data", "Local experts"],
    tags: ["community", "identification", "photos", "research"],
  },
  {
    id: "avibase",
    title: "Avibase Colombia",
    description: "Comprehensive database of Colombian birds with taxonomic information, checklists, and regional data.",
    category: "website",
    type: "free",
    rating: 4,
    url: "https://avibase.bsc-eoc.org/checklist.jsp?region=CO",
    features: ["Species checklists", "Taxonomic data", "Regional lists", "Scientific names"],
    tags: ["database", "taxonomy", "checklists", "scientific"],
  },
  {
    id: "neotropical-birds",
    title: "Neotropical Birds Online",
    description:
      "Cornell's comprehensive resource for Neotropical birds, including detailed species accounts for Colombian birds.",
    category: "website",
    type: "free",
    rating: 4,
    url: "https://neotropical.birds.cornell.edu",
    features: ["Species accounts", "Life history", "Conservation status", "Research data"],
    tags: ["neotropical", "research", "conservation", "life history"],
  },
  {
    id: "colombia-birding-podcast",
    title: "Aves de Colombia Podcast",
    description:
      "Spanish-language podcast featuring Colombian ornithologists discussing local birds, conservation, and birding locations.",
    category: "podcast",
    type: "free",
    rating: 4,
    url: "https://open.spotify.com/show/aves-colombia",
    features: ["Expert interviews", "Conservation topics", "Local insights", "Spanish language"],
    tags: ["podcast", "spanish", "conservation", "experts"],
  },
  {
    id: "birding-colombia-guide",
    title: "A Guide to Birding in Colombia",
    description: "Practical guidebook covering logistics, locations, and species for birding throughout Colombia.",
    category: "book",
    type: "paid",
    rating: 4,
    url: "https://www.amazon.com/Guide-Birding-Colombia/dp/example",
    features: ["Site guides", "Logistics info", "Species lists", "Travel tips"],
    tags: ["travel guide", "logistics", "sites", "practical"],
  },
]

const categories = [
  { id: "all", label: "All Resources", icon: Globe },
  { id: "app", label: "Mobile Apps", icon: Bird },
  { id: "website", label: "Websites", icon: Globe },
  { id: "book", label: "Field Guides", icon: BookOpen },
  { id: "map", label: "Maps & Tools", icon: Map },
  { id: "podcast", label: "Podcasts", icon: Headphones },
]

export default function ResourcesPageClient() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")

  const filteredResources = resources.filter((resource) => {
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory
    const matchesSearch =
      searchTerm === "" ||
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = selectedType === "all" || resource.type === selectedType

    return matchesCategory && matchesSearch && matchesType
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "app":
        return Bird
      case "website":
        return Globe
      case "book":
        return BookOpen
      case "map":
        return Map
      case "podcast":
        return Headphones
      default:
        return Globe
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "free":
        return "bg-green-100 text-green-800"
      case "paid":
        return "bg-blue-100 text-blue-800"
      case "freemium":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Birding Resources for Colombia
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
            Essential tools, guides, and resources to enhance your Colombian birding experience. From field guides to
            mobile apps, discover everything you need for successful birding adventures.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">{resources.length}</div>
              <div className="text-gray-600 font-medium">Curated Resources</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {resources.filter((r) => r.type === "free").length}
              </div>
              <div className="text-gray-600 font-medium">Free Resources</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">6</div>
              <div className="text-gray-600 font-medium">Categories</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-6">
              {/* Search Bar */}
              <div className="mb-6">
                <div className="relative max-w-md mx-auto">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search resources..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 text-base"
                  />
                </div>
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                {categories.map((category) => {
                  const IconComponent = category.icon
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                        selectedCategory === category.id
                          ? "bg-emerald-600 text-white shadow-lg"
                          : "bg-white text-gray-700 hover:bg-emerald-50 border border-gray-200"
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span className="text-sm font-medium">{category.label}</span>
                    </button>
                  )
                })}
              </div>

              {/* Type Filter */}
              <div className="flex justify-center gap-3">
                {["all", "free", "paid", "freemium"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedType === type ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => {
              const IconComponent = getCategoryIcon(resource.category)
              return (
                <Card
                  key={resource.id}
                  className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg bg-white/90 backdrop-blur-sm"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg group-hover:text-emerald-600 transition-colors">
                            {resource.title}
                          </CardTitle>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={getTypeColor(resource.type)}>{resource.type}</Badge>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 ${
                                    i < resource.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-gray-600 mb-4 leading-relaxed">
                      {resource.description}
                    </CardDescription>

                    {/* Features */}
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2 text-sm">Key Features:</h4>
                      <div className="flex flex-wrap gap-1">
                        {resource.features.slice(0, 3).map((feature, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full border border-emerald-200"
                          >
                            {feature}
                          </span>
                        ))}
                        {resource.features.length > 3 && (
                          <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-full border border-gray-200">
                            +{resource.features.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-1">
                        {resource.tags.slice(0, 4).map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-200"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700 group-hover:shadow-lg">
                      {resource.url.startsWith("/") ? (
                        <Link href={resource.url}>
                          <Map className="w-4 h-4 mr-2" />
                          Explore Resource
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      ) : (
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Visit Resource
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </a>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No resources found</h3>
              <p className="text-gray-600">Try adjusting your search terms or filters.</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-600 to-blue-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to Start Your Colombian Adventure?</h2>
          <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
            Armed with these resources, you're ready to explore Colombia's incredible bird diversity. Join our
            expert-guided tours for the ultimate birding experience.
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
              <Link href="/aves-explorer">
                <Map className="w-5 h-5 mr-2" />
                Explore Colombia
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
