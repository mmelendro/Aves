import type { Metadata } from "next"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import InteractiveEcoregionsTable from "@/components/interactive-ecoregions-table"
import EcoregionSelector from "@/components/ecoregion-selector"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, TreePine, Droplets, Fish, BarChart3, MapPin, Bird } from "lucide-react"

export const metadata: Metadata = {
  title: "Colombia's Ecoregions | Interactive Scientific Database | AVES Colombia",
  description:
    "Explore Colombia's complete ecoregion classification system through our interactive database. Detailed scientific information on 31 ecoregions including terrestrial, marine, and freshwater ecosystems.",
  keywords: [
    "Colombia ecoregions database",
    "Colombian biodiversity interactive",
    "ecoregions classification Colombia",
    "terrestrial ecoregions Colombia",
    "marine ecoregions Colombia",
    "freshwater ecoregions Colombia",
    "scientific birding Colombia",
    "biodiversity hotspots Colombia",
    "conservation priorities Colombia",
    "endemic species Colombia",
  ],
}

export default function BioregionsPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavigationHeader currentPage="/bioregions" />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-emerald-100 p-4 rounded-full">
                <BarChart3 className="w-8 h-8 sm:w-12 sm:h-12 text-emerald-600" />
              </div>
            </div>
            <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 mb-4 text-xs sm:text-sm">
              🗃️ Interactive Scientific Database
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
              Colombia's Ecoregions Database
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed max-w-4xl mx-auto">
              Explore Colombia's complete ecoregion classification system through our interactive database. Select any
              ecoregion to view detailed scientific information, species data, conservation status, and birding
              opportunities across 31 distinct ecological regions.
            </p>

            {/* Key Statistics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto mb-8">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-emerald-600 mb-1">31</div>
                <div className="text-xs sm:text-sm text-gray-600">Total Ecoregions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">24</div>
                <div className="text-xs sm:text-sm text-gray-600">Terrestrial</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">2</div>
                <div className="text-xs sm:text-sm text-gray-600">Marine</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-indigo-600 mb-1">5</div>
                <div className="text-xs sm:text-sm text-gray-600">Freshwater</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="min-h-[48px]">
                <a href="#ecoregions-database">
                  <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Explore Database
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild className="min-h-[48px]">
                <a href="/tours">
                  <Bird className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Plan Your Birding Tour
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Database Overview */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Scientific Classification System
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
                Colombia's ecoregions are classified using the World Wildlife Fund's scientific framework, organizing
                ecosystems by their distinctive species assemblages, environmental conditions, and ecological processes.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-8">
              {/* Terrestrial Ecoregions */}
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="bg-gradient-to-br from-green-50 to-emerald-50">
                  <div className="flex items-center gap-3 mb-2">
                    <TreePine className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                    <CardTitle className="text-lg sm:text-xl">Terrestrial Ecoregions</CardTitle>
                  </div>
                  <CardDescription className="text-sm sm:text-base">
                    Land-based ecosystems from sea level to 5,775m elevation
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl sm:text-3xl font-bold text-green-600">24</span>
                      <Badge variant="secondary" className="text-xs">
                        Most Diverse
                      </Badge>
                    </div>
                    <div className="space-y-2 text-xs sm:text-sm text-gray-600">
                      <div>• Tropical moist forests (8 ecoregions)</div>
                      <div>• Montane grasslands & shrublands (4 ecoregions)</div>
                      <div>• Tropical dry forests (3 ecoregions)</div>
                      <div>• Flooded grasslands (2 ecoregions)</div>
                      <div>• Tropical grasslands (2 ecoregions)</div>
                      <div>• Deserts & xeric shrublands (2 ecoregions)</div>
                      <div>• Mangroves (2 ecoregions)</div>
                      <div>• Montane forests (1 ecoregion)</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Marine Ecoregions */}
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="bg-gradient-to-br from-blue-50 to-cyan-50">
                  <div className="flex items-center gap-3 mb-2">
                    <Droplets className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                    <CardTitle className="text-lg sm:text-xl">Marine Ecoregions</CardTitle>
                  </div>
                  <CardDescription className="text-sm sm:text-base">
                    Coastal and oceanic ecosystems of two major seas
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl sm:text-3xl font-bold text-blue-600">2</span>
                      <Badge variant="secondary" className="text-xs">
                        Two Oceans
                      </Badge>
                    </div>
                    <div className="space-y-2 text-xs sm:text-sm text-gray-600">
                      <div>• Caribbean Sea ecoregion</div>
                      <div>• Eastern Tropical Pacific ecoregion</div>
                      <div>• Coral reef ecosystems</div>
                      <div>• Mangrove forests</div>
                      <div>• Rocky intertidal zones</div>
                      <div>• Seagrass beds</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Freshwater Ecoregions */}
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="bg-gradient-to-br from-indigo-50 to-purple-50">
                  <div className="flex items-center gap-3 mb-2">
                    <Fish className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600" />
                    <CardTitle className="text-lg sm:text-xl">Freshwater Ecoregions</CardTitle>
                  </div>
                  <CardDescription className="text-sm sm:text-base">
                    River systems, lakes, and wetland ecosystems
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl sm:text-3xl font-bold text-indigo-600">5</span>
                      <Badge variant="secondary" className="text-xs">
                        Major Basins
                      </Badge>
                    </div>
                    <div className="space-y-2 text-xs sm:text-sm text-gray-600">
                      <div>• Magdalena-Cauca basin</div>
                      <div>• Caribbean Coast rivers</div>
                      <div>• Orinoco basin</div>
                      <div>• Amazon basin</div>
                      <div>• Pacific Coast rivers</div>
                      <div>• High-altitude lakes</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* How to Use Database */}
            <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
                  <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                  How to Use the Database
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-3 gap-4 text-sm sm:text-base">
                  <div className="flex items-start gap-3">
                    <div className="bg-emerald-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Select Category</h4>
                      <p className="text-gray-600 text-sm">Choose from Terrestrial, Marine, or Freshwater ecoregions</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-emerald-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Choose Ecoregion</h4>
                      <p className="text-gray-600 text-sm">Select a specific ecoregion from the dropdown menu</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-emerald-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Explore Data</h4>
                      <p className="text-gray-600 text-sm">View detailed scientific information in the dynamic table</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Interactive Database Section */}
      <section id="ecoregions-database" className="py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Interactive Ecoregions Database
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto mb-6">
                Select any ecoregion below to view comprehensive scientific data including species information,
                conservation status, climate data, and birding opportunities.
              </p>
            </div>

            {/* Ecoregion Selector */}
            <div className="mb-8">
              <EcoregionSelector />
            </div>

            {/* Interactive Table */}
            <InteractiveEcoregionsTable />
          </div>
        </div>
      </section>

      {/* Conservation Importance */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Global Conservation Significance
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
              Colombia's ecoregions represent some of the world's most critical biodiversity hotspots. Our database
              provides essential information for conservation planning, research, and sustainable tourism development.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
              <Card className="p-4 sm:p-6 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-red-600 mb-2">8</div>
                <div className="text-xs sm:text-sm text-gray-600">Critical Priority Ecoregions</div>
              </Card>
              <Card className="p-4 sm:p-6 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-2">12</div>
                <div className="text-xs sm:text-sm text-gray-600">Vulnerable Ecoregions</div>
              </Card>
              <Card className="p-4 sm:p-6 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">7</div>
                <div className="text-xs sm:text-sm text-gray-600">Stable Ecoregions</div>
              </Card>
              <Card className="p-4 sm:p-6 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-emerald-600 mb-2">4</div>
                <div className="text-xs sm:text-sm text-gray-600">Relatively Stable</div>
              </Card>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="min-h-[48px]">
                <a href="/conservation">
                  <TreePine className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Conservation Efforts
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild className="min-h-[48px]">
                <a href="/tours">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Support Through Tourism
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
