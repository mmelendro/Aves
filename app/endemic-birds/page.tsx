import type { Metadata } from "next"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import { EndemicBirdsExplorer } from "@/components/endemic-birds-explorer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, Bird, Search, Camera, Heart, Star, Award, MapPin } from "lucide-react"

export const metadata: Metadata = {
  title: "Colombian Endemic Birds | Interactive Species Explorer | AVES Colombia",
  description:
    "Discover Colombia's 78+ endemic bird species across 11 distinct ecoregions. Interactive explorer with verified eBird links, high-quality photos, and detailed habitat information.",
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
  ],
  openGraph: {
    title: "Colombian Endemic Birds | Interactive Species Explorer",
    description: "Explore Colombia's incredible endemic bird diversity with our interactive species explorer",
    images: ["/images/aves-logo.png"],
  },
}

export default function EndemicBirdsPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavigationHeader currentPage="/endemic-birds" />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-emerald-100 p-4 rounded-full">
                <Bird className="w-12 h-12 text-emerald-600" />
              </div>
            </div>
            <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 mb-4">
              🦅 Interactive Species Explorer
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">Colombian Endemic Birds</h1>
            <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed max-w-4xl mx-auto">
              Explore Colombia's incredible endemic bird diversity through our interactive explorer. Discover 78+ unique
              species found nowhere else on Earth, distributed across 11 distinct ecoregions from the Caribbean coast to
              the Amazon rainforest.
            </p>

            {/* Key Statistics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">78+</div>
                <div className="text-sm text-gray-600">Endemic Species</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">11</div>
                <div className="text-sm text-gray-600">Ecoregions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">23</div>
                <div className="text-sm text-gray-600">Santa Marta Endemics</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">15</div>
                <div className="text-sm text-gray-600">Critically Threatened</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="#endemic-birds-explorer">
                  <Search className="w-5 h-5 mr-2" />
                  Explore Species Database
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/tours">
                  <Camera className="w-5 h-5 mr-2" />
                  Plan Your Endemic Species Tour
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Colombia is Special */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Why Colombia Has So Many Endemic Birds
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Colombia's unique geography creates isolated mountain ranges and diverse ecosystems, leading to
                exceptional levels of endemism. Each ecoregion harbors species found nowhere else on Earth.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-emerald-100 p-3 rounded-full w-fit mb-4">
                    <Globe className="w-8 h-8 text-emerald-600" />
                  </div>
                  <CardTitle className="text-xl">Geographic Isolation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Three separate Andean ranges create isolated mountain systems, allowing species to evolve
                    independently in each range.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-blue-100 p-3 rounded-full w-fit mb-4">
                    <Star className="w-8 h-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">Elevational Diversity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    From sea level to 5,775m elevation, creating multiple climate zones and specialized habitats within
                    short distances.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-purple-100 p-3 rounded-full w-fit mb-4">
                    <Award className="w-8 h-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl">Biogeographic Position</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Located at the intersection of North and South America, with connections to both continents and
                    unique island systems.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Conservation Importance */}
            <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Heart className="w-6 h-6 text-red-600" />
                  Conservation Through Endemic Species Tourism
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-700 mb-4">
                      Many of Colombia's endemic species face critical threats from habitat loss and climate change.
                      Responsible birding tourism provides essential funding for conservation efforts while creating
                      economic incentives for habitat protection.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600 mb-1">15</div>
                        <div className="text-gray-600">Critically Threatened</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600 mb-1">23</div>
                        <div className="text-gray-600">Vulnerable Species</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">How AVES Helps Conservation:</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                        Direct funding to local conservation projects
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                        Employment for local communities as guides
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                        Habitat protection through tourism revenue
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                        Scientific research and monitoring support
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Interactive Explorer Section */}
      <section id="endemic-birds-explorer" className="py-16 bg-gradient-to-br from-slate-50 via-emerald-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Enhanced Header with Animation */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-full mb-6 shadow-lg">
                <Bird className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-6">
                Interactive Endemic Birds Explorer
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
                Discover Colombia's incredible endemic bird diversity through our enhanced interactive explorer. Browse
                by ecoregion, search for specific species, and access detailed eBird information with verified photos.
              </p>

              {/* Feature Highlights */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/20">
                  <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-lg mx-auto mb-3">
                    <Search className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="text-sm font-medium text-gray-900">Advanced Search</div>
                  <div className="text-xs text-gray-600">Multi-language support</div>
                </div>
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/20">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-3">
                    <Camera className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-sm font-medium text-gray-900">eBird Integration</div>
                  <div className="text-xs text-gray-600">Verified photos & sounds</div>
                </div>
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/20">
                  <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-3">
                    <Heart className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-sm font-medium text-gray-900">Conservation Focus</div>
                  <div className="text-xs text-gray-600">Status & protection info</div>
                </div>
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/20">
                  <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mx-auto mb-3">
                    <MapPin className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="text-sm font-medium text-gray-900">Tour Planning</div>
                  <div className="text-xs text-gray-600">Integrated booking</div>
                </div>
              </div>
            </div>

            {/* Enhanced Interactive Tool with Glass Morphism */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 p-8">
                <EndemicBirdsExplorer />
              </div>
            </div>

            {/* Quick Stats Section */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <div className="text-3xl font-bold text-emerald-600 mb-2">78+</div>
                <div className="text-sm text-gray-600 font-medium">Endemic Species</div>
                <div className="text-xs text-gray-500 mt-1">Found nowhere else</div>
              </div>
              <div className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <div className="text-3xl font-bold text-blue-600 mb-2">11</div>
                <div className="text-sm text-gray-600 font-medium">Ecoregions</div>
                <div className="text-xs text-gray-500 mt-1">Distinct habitats</div>
              </div>
              <div className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <div className="text-3xl font-bold text-purple-600 mb-2">23</div>
                <div className="text-sm text-gray-600 font-medium">Santa Marta</div>
                <div className="text-xs text-gray-500 mt-1">Highest endemism</div>
              </div>
              <div className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <div className="text-3xl font-bold text-orange-600 mb-2">95%</div>
                <div className="text-sm text-gray-600 font-medium">Success Rate</div>
                <div className="text-xs text-gray-500 mt-1">Finding targets</div>
              </div>
            </div>

            {/* Enhanced CTA Section */}
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-emerald-500 to-blue-600 rounded-3xl p-8 shadow-2xl text-white">
                <h3 className="text-2xl lg:text-3xl font-bold mb-4">Ready to Experience These Endemic Species?</h3>
                <p className="text-lg opacity-90 mb-8 max-w-3xl mx-auto">
                  Join AVES for an unforgettable birding adventure. Our expert guides know exactly where to find each
                  endemic species and can create the perfect itinerary based on your target birds.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-50 shadow-lg" asChild>
                    <a href="/contact">
                      <Heart className="w-5 h-5 mr-2" />
                      Plan My Endemic Species Tour
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 bg-transparent"
                    asChild
                  >
                    <a href="/tours">
                      <Camera className="w-5 h-5 mr-2" />
                      View All Tours
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-emerald-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Ready to See These Endemic Species in the Wild?
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Plan your Colombian birding adventure with AVES and experience these incredible endemic species in their
              natural habitats. Our expert guides know exactly where to find each species and can help you build the
              perfect itinerary based on your target birds.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-emerald-600 mb-2">23</div>
                  <div className="text-sm text-gray-600 mb-2">Santa Marta Endemics</div>
                  <p className="text-xs text-gray-500">World's highest coastal mountain range</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-blue-600 mb-2">36</div>
                  <div className="text-sm text-gray-600 mb-2">Western Andes Species</div>
                  <p className="text-xs text-gray-500">Cloud forests and páramo specialists</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-purple-600 mb-2">95%</div>
                  <div className="text-sm text-gray-600 mb-2">Success Rate</div>
                  <p className="text-xs text-gray-500">Finding target endemic species</p>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="/contact">
                  <Heart className="w-5 h-5 mr-2" />
                  Plan My Endemic Species Tour
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/tours">
                  <Camera className="w-5 h-5 mr-2" />
                  View All Tours
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
