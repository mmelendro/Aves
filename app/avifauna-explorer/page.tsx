import type { Metadata } from "next"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import { ColombianAvifaunaExplorer } from "@/components/colombian-avifauna-explorer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, Bird, Search, Camera, Heart, MapPin, Zap, TreePine, Mountain } from "lucide-react"

export const metadata: Metadata = {
  title: "Colombian Avifauna Explorer | Interactive Bird Species Guide | AVES Colombia",
  description:
    "Explore Colombia's incredible bird diversity with our comprehensive avifauna explorer. Discover 1,900+ species across 11 biogeographic regions, including endemic species, spectacular residents, and common favorites.",
  keywords: [
    "Colombian birds",
    "Colombia avifauna",
    "bird species Colombia",
    "Colombian bird diversity",
    "endemic birds Colombia",
    "birding Colombia",
    "Colombia bird guide",
    "interactive bird explorer",
    "Colombian biodiversity",
    "bird watching Colombia",
    "AVES Colombia tours",
    "birding tours Colombia",
    "Colombian bird regions",
    "11 biogeographic regions Colombia",
    "bird identification Colombia",
  ],
  openGraph: {
    title: "Colombian Avifauna Explorer | Interactive Bird Species Guide",
    description:
      "Explore Colombia's incredible bird diversity with our comprehensive avifauna explorer featuring 1,900+ species across 11 biogeographic regions",
    images: ["/images/aves-logo.png"],
  },
}

export default function AvifaunaExplorerPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavigationHeader currentPage="/avifauna-explorer" />

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
              🌎 World's Most Diverse Avifauna
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Colombian Avifauna Explorer
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed max-w-4xl mx-auto">
              Discover Colombia's extraordinary bird diversity through our comprehensive avifauna explorer. Navigate
              through 11 distinct biogeographic regions and explore over 1,900 species, from endemic treasures to
              spectacular residents that make Colombia the world's premier birding destination.
            </p>

            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
                <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-lg mx-auto mb-4">
                  <Bird className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">1,900+ Species</h3>
                <p className="text-sm text-gray-600">More bird species than any other country on Earth</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">11 Regions</h3>
                <p className="text-sm text-gray-600">Distinct biogeographic regions with unique characteristics</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-4">
                  <Search className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Interactive Explorer</h3>
                <p className="text-sm text-gray-600">Search, filter, and explore with detailed species information</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
                <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mx-auto mb-4">
                  <Camera className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Tour Integration</h3>
                <p className="text-sm text-gray-600">Seamlessly book tours to see your favorite species</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-1">78+</div>
                <div className="text-sm text-gray-600">Endemic Species</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">200+</div>
                <div className="text-sm text-gray-600">Spectacular Species</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">135+</div>
                <div className="text-sm text-gray-600">Hummingbird Species</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-1">11</div>
                <div className="text-sm text-gray-600">Biogeographic Regions</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                asChild
                className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white shadow-lg"
              >
                <a href="#avifauna-explorer">
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
                  Book Your Tour
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
                Why Colombia Has the World's Most Diverse Avifauna
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Colombia's unique position and diverse geography across 11 distinct biogeographic regions create the
                perfect conditions for extraordinary bird diversity
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="mx-auto bg-emerald-100 p-3 rounded-full w-fit mb-4">
                    <Globe className="w-8 h-8 text-emerald-600" />
                  </div>
                  <CardTitle className="text-xl">Strategic Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Positioned at the intersection of North and South America, Colombia serves as a bridge for bird
                    migration and evolution, creating unique biogeographic regions.
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
                    zones and isolated ecosystems that promote speciation.
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
                    forests, Pacific rainforest, and high-altitude páramo.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Bird Categories Overview */}
            <Card className="bg-gradient-to-r from-blue-50 to-emerald-50 border-blue-200 mb-8">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Explore by Bird Category</h3>
                  <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                    Our avifauna explorer organizes Colombia's incredible bird diversity into categories, making it easy
                    to discover species that match your interests.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-lg mx-auto mb-4">
                      <Bird className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Endemic Species</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      78+ species found nowhere else on Earth, representing Colombia's unique evolutionary heritage.
                    </p>
                    <Badge className="bg-emerald-100 text-emerald-800">Exclusive to Colombia</Badge>
                  </div>
                  <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-4">
                      <Camera className="w-6 h-6 text-purple-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Spectacular Species</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Iconic and sought-after birds that draw birders from around the world to Colombia.
                    </p>
                    <Badge className="bg-purple-100 text-purple-800">Must-See Species</Badge>
                  </div>
                  <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-4">
                      <Heart className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Common Favorites</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Beloved resident species that are reliable to see and delight birders of all levels.
                    </p>
                    <Badge className="bg-blue-100 text-blue-800">Birder Favorites</Badge>
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
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Conservation Through Birding Tourism</h3>
                <p className="text-lg text-gray-700 mb-6 max-w-3xl mx-auto">
                  Many of Colombia's bird species face threats from habitat loss and climate change. Responsible birding
                  tourism helps fund conservation efforts and provides economic incentives for habitat protection across
                  all biogeographic regions.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-red-600 mb-1">15+</div>
                    <div className="text-sm text-gray-600">Critically Endangered Species</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600 mb-1">25+</div>
                    <div className="text-sm text-gray-600">Endangered Species</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-600 mb-1">40+</div>
                    <div className="text-sm text-gray-600">Vulnerable/Near Threatened</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Interactive Explorer */}
      <section id="avifauna-explorer" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <ColombianAvifaunaExplorer />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
