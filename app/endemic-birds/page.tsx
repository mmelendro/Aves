import type { Metadata } from "next"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import { InteractiveEndemicBirdsExplorer } from "@/components/interactive-endemic-birds-explorer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, Bird, Search, Camera, Heart, MapPin, Zap, TreePine, Mountain, Waves } from "lucide-react"

export const metadata: Metadata = {
  title: "Colombian Endemic Birds | Interactive Species Explorer | AVES Colombia",
  description:
    "Discover Colombia's 78+ endemic bird species across 11 distinct biogeographic regions. Interactive map-based explorer with detailed species information, eBird links, and tour planning integration.",
  keywords: [
    "Colombian endemic birds",
    "Colombia bird species",
    "endemic birds Colombia",
    "Sierra Nevada Santa Marta birds",
    "Chocó endemic species",
    "Andes endemic birds",
    "Colombian biodiversity",
    "birding Colombia",
    "endemic species explorer",
    "eBird Colombia",
    "bird photography Colombia",
    "conservation Colombia birds",
    "AVES Colombia tours",
    "birding tours Colombia",
    "interactive bird map",
    "Colombian birding regions",
    "11 biogeographic regions Colombia",
  ],
  openGraph: {
    title: "Colombian Endemic Birds | Interactive Species Explorer",
    description:
      "Explore Colombia's incredible endemic bird diversity across 11 distinct biogeographic regions with our interactive map-based species explorer",
    images: ["/images/aves-logo.png"],
  },
}

export default function EndemicBirdsPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavigationHeader currentPage="/endemic-birds" />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-br from-emerald-500 to-blue-600 p-4 rounded-full shadow-lg">
                <Bird className="w-12 h-12 text-white" />
              </div>
            </div>
            <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 mb-4 text-sm px-4 py-2">
              🗺️ 11 Distinct Biogeographic Regions
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Colombian Endemic Birds Explorer
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed max-w-4xl mx-auto">
              Discover Colombia's extraordinary endemic bird diversity through our interactive map-based explorer.
              Navigate through 11 distinct biogeographic regions, from the Sierra Nevada de Santa Marta to the Amazon
              Basin, and explore the unique species found nowhere else on Earth.
            </p>

            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
                <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-lg mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">11 Distinct Regions</h3>
                <p className="text-sm text-gray-600">
                  Explore each biogeographic region with accurate boundaries and endemic species data
                </p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-4">
                  <Search className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Detailed Information</h3>
                <p className="text-sm text-gray-600">
                  Access comprehensive species data, eBird links, and conservation status information
                </p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-4">
                  <Camera className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Tour Integration</h3>
                <p className="text-sm text-gray-600">
                  Seamlessly plan your birding adventure with integrated tour booking options
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-1">78+</div>
                <div className="text-sm text-gray-600">Endemic Species</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">11</div>
                <div className="text-sm text-gray-600">Biogeographic Regions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">23</div>
                <div className="text-sm text-gray-600">SNSM Endemics</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-1">1,900+</div>
                <div className="text-sm text-gray-600">Total Species</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                asChild
                className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white shadow-lg"
              >
                <a href="#endemic-birds-explorer">
                  <Zap className="w-5 h-5 mr-2" />
                  Start Exploring
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 bg-transparent"
              >
                <a href="/tours">
                  <Camera className="w-5 h-5 mr-2" />
                  Plan Your Tour
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Colombia Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Why Colombia Has the World's Highest Bird Diversity
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Colombia's unique position and diverse geography across 11 distinct biogeographic regions create the
                perfect conditions for extraordinary bird endemism
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="mx-auto bg-emerald-100 p-3 rounded-full w-fit mb-4">
                    <Globe className="w-8 h-8 text-emerald-600" />
                  </div>
                  <CardTitle className="text-xl">Geographic Position</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Located at the intersection of North and South America, with connections to both continents and
                    unique biogeographic regions including the Chocó hotspot and Sierra Nevada de Santa Marta.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="mx-auto bg-blue-100 p-3 rounded-full w-fit mb-4">
                    <Mountain className="w-8 h-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">Elevational Diversity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    From sea level to 5,775m elevation across three separate Andean ranges, creating diverse climate
                    zones and isolated mountain systems that promote speciation and endemism.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="mx-auto bg-purple-100 p-3 rounded-full w-fit mb-4">
                    <TreePine className="w-8 h-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl">Ecosystem Variety</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    11 distinct biogeographic regions including Amazon rainforest, Andean cloud forests, Caribbean dry
                    forests, Pacific rainforest, and high-altitude páramo grasslands.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* 11 Regions Overview */}
            <Card className="bg-gradient-to-r from-blue-50 to-emerald-50 border-blue-200 mb-8">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">11 Distinct Biogeographic Regions</h3>
                  <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                    Each region represents a unique combination of climate, elevation, and evolutionary history,
                    resulting in specialized bird communities and endemic species.
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg mx-auto mb-2">
                      <TreePine className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-sm font-medium text-gray-900">Pacific Coast</div>
                    <div className="text-xs text-gray-600">2 endemics</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg mx-auto mb-2">
                      <Mountain className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-sm font-medium text-gray-900">Western Andes</div>
                    <div className="text-xs text-gray-600">36 endemics</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-red-500 to-rose-600 rounded-lg mx-auto mb-2">
                      <Mountain className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-sm font-medium text-gray-900">Central Andes</div>
                    <div className="text-xs text-gray-600">34 endemics</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg mx-auto mb-2">
                      <Mountain className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-sm font-medium text-gray-900">Eastern Andes</div>
                    <div className="text-xs text-gray-600">20 endemics</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg mx-auto mb-2">
                      <Mountain className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-sm font-medium text-gray-900">Sierra Nevada</div>
                    <div className="text-xs text-gray-600">23 endemics</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg mx-auto mb-2">
                      <Waves className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-sm font-medium text-gray-900">Caribbean</div>
                    <div className="text-xs text-gray-600">6 endemics</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg mx-auto mb-2">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-sm font-medium text-gray-900">Interandean Valleys</div>
                    <div className="text-xs text-gray-600">12 endemics</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg mx-auto mb-2">
                      <TreePine className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-sm font-medium text-gray-900">Amazonia</div>
                    <div className="text-xs text-gray-600">1 endemic</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-pink-600 to-rose-700 rounded-lg mx-auto mb-2">
                      <Mountain className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-sm font-medium text-gray-900">Massif</div>
                    <div className="text-xs text-gray-600">3 endemics</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-lg mx-auto mb-2">
                      <Globe className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-sm font-medium text-gray-900">Llanos</div>
                    <div className="text-xs text-gray-600">Data pending</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Conservation Message */}
            <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Heart className="w-8 h-8 text-orange-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Conservation is Critical</h3>
                <p className="text-lg text-gray-700 mb-6 max-w-3xl mx-auto">
                  Many of Colombia's endemic species are threatened by habitat loss, climate change, and human
                  activities. Responsible birding tourism helps fund conservation efforts and provides economic
                  incentives for habitat protection across all 11 biogeographic regions.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-red-600 mb-1">15+</div>
                    <div className="text-sm text-gray-600">Critically Endangered</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600 mb-1">20+</div>
                    <div className="text-sm text-gray-600">Endangered</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-600 mb-1">25+</div>
                    <div className="text-sm text-gray-600">Vulnerable/Near Threatened</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Interactive Explorer */}
      <section id="endemic-birds-explorer" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <InteractiveEndemicBirdsExplorer />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
