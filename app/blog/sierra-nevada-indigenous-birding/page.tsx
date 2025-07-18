"use client"

import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Calendar,
  User,
  MapPin,
  Camera,
  Heart,
  ArrowRight,
  Info,
  Eye,
  Clock,
  Users,
  Instagram,
  ExternalLink,
  Globe,
  TreePine,
  Shield,
  Home,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from "react"

// Enhanced Image Component with Interactive Overlays
function EnhancedBirdImage({
  src,
  alt,
  width,
  height,
  photographer,
  guide,
  guideLink,
  location,
  locationLink,
  species,
  ebirdUrl,
  regions,
  ecosystems,
  className = "",
  aspectRatio = "4/3",
  imagePosition = "center",
}) {
  const [showOverlay, setShowOverlay] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [showCredit, setShowCredit] = useState(false)

  return (
    <div
      className={`relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 ${className}`}
      style={{ aspectRatio }}
      onMouseEnter={() => setShowOverlay(true)}
      onMouseLeave={() => setShowOverlay(false)}
    >
      {/* Enhanced Image with Wildlife Photography Effects */}
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
        style={{
          filter: "contrast(1.15) saturate(1.3) brightness(1.08) sharpness(1.2)",
          objectPosition: imagePosition,
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Interactive Buttons */}
      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
        {/* Camera Credit Toggle Button */}
        <Button
          variant="ghost"
          size="sm"
          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-0 rounded-full p-2 transition-all duration-200 hover:scale-110"
          onClick={() => setShowCredit(!showCredit)}
        >
          <Camera className="w-4 h-4" />
        </Button>

        {/* More Info Button */}
        <Button
          variant="ghost"
          size="sm"
          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-0 rounded-full p-2 transition-all duration-200 hover:scale-110"
          onClick={() => setShowInfo(!showInfo)}
        >
          <Info className="w-4 h-4" />
        </Button>
      </div>

      {/* Sliding Info Overlay */}
      <div
        className={`absolute inset-0 bg-black/90 backdrop-blur-sm transition-all duration-500 ease-in-out ${
          showInfo ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header with species name - only show when info is displayed */}
          <div className="p-4 border-b border-white/20">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{species.commonName}</h3>
                {species.spanishName && <p className="text-emerald-300 text-sm font-medium">{species.spanishName}</p>}
                <p className="text-white/80 text-sm italic">{species.scientificName}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 rounded-full p-2"
                onClick={() => setShowInfo(false)}
              >
                ×
              </Button>
            </div>
          </div>

          {/* Scrollable Content */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4 text-white">
              {/* eBird Link - Direct link without code display */}
              <Link
                href={ebirdUrl}
                target="_blank"
                className="flex items-center gap-3 p-3 bg-emerald-600/20 hover:bg-emerald-600/30 rounded-lg transition-colors group"
              >
                <div className="bg-emerald-500/30 p-2 rounded-full">
                  <ExternalLink className="w-5 h-5 text-emerald-300" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-emerald-200">View on eBird</p>
                  <p className="text-sm text-emerald-300">Complete species profile & sounds</p>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-300 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Geographic Regions with emoji icons */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-blue-300 font-medium">
                  <Globe className="w-4 h-4" />🌍 Geographic Distribution
                </div>
                <div className="grid gap-2">
                  {regions.map((region, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 bg-blue-600/20 rounded-md">
                      <span className="text-lg">📍</span>
                      <span className="text-sm text-blue-200">{region}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ecosystems with nature emojis */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-green-300 font-medium">
                  <TreePine className="w-4 h-4" />🌿 Natural Habitats
                </div>
                <div className="grid gap-2">
                  {ecosystems.map((ecosystem, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 bg-green-600/20 rounded-md">
                      <span className="text-lg">
                        {ecosystem.includes("forest")
                          ? "🌲"
                          : ecosystem.includes("scrub")
                            ? "🌵"
                            : ecosystem.includes("canopy")
                              ? "🌳"
                              : ecosystem.includes("desert")
                                ? "🏜️"
                                : "🌱"}
                      </span>
                      <span className="text-sm text-green-200">{ecosystem}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conservation Status with shield emoji */}
              {species.conservation && (
                <div className="p-3 bg-amber-600/20 border border-amber-500/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-amber-300" />
                    <span className="text-sm text-amber-300 font-medium">🛡️ Conservation Status</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">
                      {species.conservation.includes("Critically")
                        ? "🔴"
                        : species.conservation.includes("Endangered")
                          ? "🟠"
                          : species.conservation.includes("Threatened")
                            ? "🟡"
                            : "🟢"}
                    </span>
                    <p className="font-medium text-amber-200">{species.conservation}</p>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Toggleable Photo Credit Overlay */}
      <div
        className={`absolute top-16 right-4 bg-black/80 backdrop-blur-sm text-white p-3 rounded-lg text-xs transition-all duration-300 max-w-xs ${
          showCredit && showOverlay && !showInfo
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Camera className="w-3 h-3 text-blue-300" />
            <span className="font-medium text-blue-200">Photo by {photographer}</span>
          </div>
          {guide && (
            <div className="flex items-center gap-2">
              <Users className="w-3 h-3 text-emerald-300" />
              <span className="text-emerald-200">
                Guide:{" "}
                <Link href={guideLink} className="hover:text-emerald-100 transition-colors underline">
                  {guide}
                </Link>
              </span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Home className="w-3 h-3 text-amber-300" />
            <span className="text-amber-200">
              Location:{" "}
              <Link href={locationLink} className="hover:text-amber-100 transition-colors underline">
                {location}
              </Link>
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Info Bar - Hidden when info overlay is shown */}
      {!showInfo && (
        <div
          className={`absolute bottom-0 left-0 right-0 p-0.5 text-white transition-all duration-300 ${
            showOverlay ? "translate-y-0 opacity-100" : "translate-y-2 opacity-90"
          }`}
        >
          <div className="backdrop-blur-md bg-black/70 rounded-lg p-1 border border-white/20">
            <h3 className="font-medium text-xs text-white drop-shadow-lg leading-tight">{species.commonName}</h3>
            {species.spanishName && (
              <p className="text-emerald-200 text-xs font-medium drop-shadow-md leading-tight">{species.spanishName}</p>
            )}
            <p className="text-xs text-white/95 italic drop-shadow-md leading-tight">{species.scientificName}</p>
            {species.conservation && (
              <Badge className="mt-0.5 bg-amber-500/90 text-white hover:bg-amber-500 backdrop-blur-sm text-xs border border-amber-400/50 px-1 py-0 leading-tight h-3">
                {species.conservation}
              </Badge>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default function SierraNevadaBlogPost() {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <NavigationHeader currentPage="/blog" />

        {/* Breadcrumb */}
        <div className="bg-gray-50 py-4">
          <div className="container mx-auto px-4">
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-emerald-600 transition-colors">
                Home
              </Link>
              <span>→</span>
              <Link href="/blog" className="hover:text-emerald-600 transition-colors">
                Blog
              </Link>
              <span>→</span>
              <span className="text-gray-900">Guardians of the Sky: Birding with the Kogi and Wayuu</span>
            </nav>
          </div>
        </div>

        {/* Video Background Title Section */}
        <div className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Background Video */}
          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
            <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/El%20Dorado-uJoK4deoS3MdNzKIGAUTejTN6o5Bcx.mp4" type="video/mp4" />
          </video>

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Content Overlay */}
          <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>

            <Badge className="bg-emerald-600/80 text-white mb-6 backdrop-blur-sm">Indigenous Partnerships</Badge>

            <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight drop-shadow-2xl">Guardians of the Sky</h1>

            <p className="text-xl lg:text-2xl mb-8 text-white/90 drop-shadow-lg max-w-3xl mx-auto">
              Birding with the Kogi and Wayuu in Sierra Nevada de Santa Marta
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 text-white/80 mb-8">
              <div className="flex items-center backdrop-blur-sm bg-black/20 px-3 py-2 rounded-full">
                <User className="w-4 h-4 mr-2" />
                <Link href="/team#martin-melendro" className="hover:text-white transition-colors">
                  Martin Melendro
                </Link>
              </div>
              <div className="flex items-center backdrop-blur-sm bg-black/20 px-3 py-2 rounded-full">
                <Calendar className="w-4 h-4 mr-2" />
                March 15, 2025
              </div>
              <div className="flex items-center backdrop-blur-sm bg-black/20 px-3 py-2 rounded-full">
                <MapPin className="w-4 h-4 mr-2" />
                Sierra Nevada de Santa Marta
              </div>
              <div className="flex items-center backdrop-blur-sm bg-black/20 px-3 py-2 rounded-full">
                <Clock className="w-4 h-4 mr-2" />8 min read
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
            <div className="flex flex-col items-center">
              <span className="text-sm mb-2">Scroll to explore</span>
              <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Cardinal Feature Section */}
        <div className="relative py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <EnhancedBirdImage
                src="/images/cardinal-guajiro.jpg"
                alt="Vermilion Cardinal (Cardinalis phoeniceus) - the endemic Cardinal Guajiro showing its distinctive bright red plumage and alert facial features in Sierra Nevada de Santa Marta"
                width={800}
                height={600}
                photographer="Royann, Early Guest"
                guide="Yeferson Guale Epiayu"
                guideLink="/team#yeferson-guale-epiayu"
                location="Wayuu Territory"
                locationLink="/about/partners#wayuu-community"
                species={{
                  commonName: "Vermilion Cardinal",
                  spanishName: "Cardenal Guajiro",
                  scientificName: "Cardinalis phoeniceus",
                  conservation: "Near Threatened",
                }}
                ebirdUrl="https://ebird.org/species/vercar1"
                regions={["Northern Colombia Caribbean Coast", "La Guajira Peninsula", "Magdalena Department"]}
                ecosystems={[
                  "Dry tropical forests",
                  "Thorny scrublands",
                  "Coastal desert margins",
                  "Riparian corridors",
                ]}
                className="shadow-2xl"
                imagePosition="center 10%"
              />

              <div className="space-y-6">
                <div className="inline-flex items-center bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                  <Heart className="w-4 h-4 mr-2" />
                  Star Species
                </div>

                <h2 className="text-4xl font-bold text-gray-900">The Cardinal Guajiro</h2>

                <p className="text-lg text-gray-700 leading-relaxed">
                  Our journey's ultimate prize: the Vermilion Cardinal, known locally as Cardinal Guajiro. This
                  brilliant red bird represents one of Colombia's most striking endemic species, found only in the dry
                  forests and scrublands of the Caribbean coast.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-3 text-red-500" />
                    <span>Endemic to northern Colombia's Caribbean coast</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Camera className="w-5 h-5 mr-3 text-red-500" />
                    <span>Best photographed in early morning golden light</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <User className="w-5 h-5 mr-3 text-red-500" />
                    <span>Guided by Wayuu expert Yeferson Guale Epiayu</span>
                  </div>
                </div>

                <Link
                  href="/shopping?preset=sierra-nevada&tour=adventure&region=caribbean"
                  className="inline-flex items-center bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Experience This Journey
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <article className="max-w-4xl mx-auto px-4 py-8">
          <Link href="/blog" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>

          <div className="mb-8">
            <Badge className="bg-emerald-100 text-emerald-800 mb-4">Indigenous Partnerships</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Guardians of the Sky: Birding with the Kogi and Wayuu in Sierra Nevada de Santa Marta
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                <Link href="/team#martin-melendro" className="hover:text-emerald-600 transition-colors">
                  Martin Melendro
                </Link>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                March 15, 2025
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                Sierra Nevada de Santa Marta
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />8 min read
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              The pre-dawn air was crisp as we began our eight-day custom Adventure Tour through Colombia's Sierra
              Nevada de Santa Marta, the world's highest coastal mountain range. This intensive expedition, designed
              specifically for our group of four adventurous birders, would take us from the cloud forests of El Dorado
              to the coastal scrublands of Riohacha, combining both the Sierra Nevada and Caribbean regions in a single,
              comprehensive journey. Over the course of eight remarkable days, we documented over 300 bird species,
              including numerous endemics and critically endangered species. Working with an extraordinary team of local
              guides, we would discover both the region's incredible biodiversity and rich cultural heritage in what
              represents one of our most challenging and rewarding itineraries.
            </p>

            <Card className="my-8 border-amber-200 bg-amber-50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-amber-100 p-2 rounded-full">
                    <Info className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-amber-900 mb-2">Custom Adventure Tour Experience</h3>
                    <p className="text-amber-800 mb-3">
                      This Sierra Nevada + Caribbean 8-day combination represents our most intensive birding experience,
                      exclusively available as an Adventure Tour. The demanding pace and challenging terrain make it
                      ideal for experienced birders seeking maximum species diversity in minimal time.
                    </p>
                    <p className="text-amber-800 text-sm">
                      <strong>Prefer a different pace?</strong> We recommend dedicated 8-day tours for each region
                      separately, available across all four tour types: Adventure, Vision, Elevate, and Souls.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="my-8 border-emerald-200 bg-emerald-50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-emerald-100 p-2 rounded-full">
                    <Users className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-emerald-900 mb-2">Our Expert Guide Team</h3>
                    <p className="text-emerald-800 mb-3">
                      Our journey would unfold across eight immersive days and five distinct locations, each with its
                      own specialist guide.
                    </p>
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span>
                          <strong>
                            <Link href="/team#david-jara" className="text-emerald-700 hover:text-emerald-800">
                              David Jara
                            </Link>
                          </strong>{" "}
                          - El Dorado cloud forest expert
                          <Link
                            href="https://instagram.com/davidjara20"
                            target="_blank"
                            className="ml-1 text-emerald-600 hover:text-emerald-700"
                          >
                            <Instagram className="w-3 h-3 inline" />
                          </Link>
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span>
                          <strong>
                            <Link href="/team#david-faunal" className="text-emerald-700 hover:text-emerald-800">
                              David Faunal
                            </Link>
                          </strong>{" "}
                          - Minca transitional zone specialist
                          <Link
                            href="https://instagram.com/faunal_observatorioavesminca"
                            target="_blank"
                            className="ml-1 text-emerald-600 hover:text-emerald-700"
                          >
                            <Instagram className="w-3 h-3 inline" />
                          </Link>
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span>
                          <strong>
                            <Link href="/team#dagoberto-rudas" className="text-emerald-700 hover:text-emerald-800">
                              Dagoberto Rudas
                            </Link>
                          </strong>{" "}
                          - Tayrona National Park specialist
                          <Link
                            href="https://instagram.com/dago_rdg"
                            target="_blank"
                            className="ml-1 text-emerald-600 hover:text-emerald-700"
                          >
                            <Instagram className="w-3 h-3 inline" />
                          </Link>
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span>
                          <strong>
                            <Link href="/team#martin-melendro" className="text-emerald-700 hover:text-emerald-800">
                              Martin Melendro
                            </Link>
                          </strong>{" "}
                          - Cultural exchange facilitator
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span>
                          <strong>
                            <Link
                              href="/team#yeferson-guale-epiayu"
                              className="text-emerald-700 hover:text-emerald-800"
                            >
                              Yeferson Guale Epiayu
                            </Link>
                          </strong>{" "}
                          - Wayuu community guide
                          <Link
                            href="https://instagram.com/kalekalemana1921"
                            target="_blank"
                            className="ml-1 text-emerald-600 hover:text-emerald-700"
                          >
                            <Instagram className="w-3 h-3 inline" />
                          </Link>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6 flex items-center gap-3">
              Day 1-3: El Dorado Cloud Forest Immersion
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-5 h-5 text-gray-500" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>El Dorado Reserve is managed by our partner ProAves</p>
                </TooltipContent>
              </Tooltip>
            </h2>

            <p className="mb-6">
              Our expedition began with three full days in the misty cloud forests of{" "}
              <Link href="/about/partners#el-dorado" className="text-emerald-600 hover:text-emerald-700 font-medium">
                El Dorado Reserve
              </Link>
              , where{" "}
              <Link href="/team#david-jara" className="text-emerald-600 hover:text-emerald-700 font-medium">
                David Jara's
              </Link>{" "}
              intimate knowledge of the endemic species proved invaluable. The extended stay allowed us to explore
              different trail systems at various times of day, maximizing our chances with the region's most elusive
              endemics. Day one focused on the main trails and common species, day two took us to remote areas for
              specialized endemics, and day three provided flexibility for return visits to promising locations and
              photography opportunities.
            </p>

            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 my-8 rounded-r-lg">
              <div className="flex items-start">
                <Camera className="w-6 h-6 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-emerald-900 mb-2">Cloud Forest Immersion</h3>
                  <p className="text-emerald-800">
                    The ethereal beauty of El Dorado's cloud forest at dawn creates perfect conditions for endemic
                    species activity, when the mist provides ideal cover for our most elusive targets.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Day 4-5: Minca & El Observatorio de Aves</h2>

            <p className="mb-6">
              Our two days in Minca brought us to a remarkable location with deep historical significance.{" "}
              <Link href="/team#david-faunal" className="text-emerald-600 hover:text-emerald-700 font-medium">
                David Faunal
              </Link>{" "}
              guided us through his family's property,{" "}
              <Link href="/about/partners#el-faunal" className="text-emerald-600 hover:text-emerald-700 font-medium">
                El Observatorio de Aves
              </Link>
              , which sits on what was once Kogi territory. The family has spent years carefully excavating and
              preserving ancient Kogi ruins found on their land, creating a unique intersection of archaeological
              preservation and modern conservation.
            </p>

            <Card className="my-8 border-blue-200 bg-blue-50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Eye className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-900 mb-2">Cultural Heritage & Conservation</h3>
                    <p className="text-blue-800">
                      David Faunal's family property represents a unique model where archaeological preservation meets
                      modern birding tourism. The carefully maintained Kogi ruins serve as a reminder of the deep
                      cultural history of these mountains, while the family's commitment to habitat conservation creates
                      perfect conditions for both resident and migratory species.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <p className="mb-6">
              The first day focused on the higher elevation trails where cloud forest species overlap with mid-elevation
              specialists. The second day took us to lower elevations and different habitat types, creating a
              comprehensive understanding of this remarkable ecological gradient. The extended time here proved crucial
              for locating mixed-species flocks and understanding seasonal bird movements.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
              Day 6-7: Tayrona National Park & Cultural Exchange
            </h2>

            <p className="mb-6">
              Two full days in Tayrona's diverse habitats provided unparalleled access to this complex ecosystem with{" "}
              <Link href="/team#dagoberto-rudas" className="text-emerald-600 hover:text-emerald-700 font-medium">
                Dagoberto Rudas
              </Link>{" "}
              as our expert guide. Day six focused on the coastal forests and their specialized avifauna, while day
              seven took us inland to valleys and higher elevations. Dagoberto's intimate knowledge of the park and the
              jungle would prove essential for our most extraordinary encounter. The extended time allowed for both
              intensive birding and meaningful cultural exchange with the Kogi people, as Martin facilitated our
              respectful encounter and learning about traditional ecological knowledge.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Encounter with the Blue-billed Curassow</h3>

            <p className="mb-6">
              Day seven brought us our most extraordinary encounter. Deep in Tayrona's inland valleys, Dagoberto's
              expertise led us to one of Colombia's most elusive birds: the Blue-billed Curassow (<em>Crax alberti</em>
              ). This critically endangered species, endemic to Colombia, represents the ultimate prize for any serious
              birder visiting the region. Dagoberto's intimate knowledge of the jungle and years of experience in the
              park guided us to a pair of these magnificent birds.
            </p>

            {/* Enhanced Blue-billed Curassow Image - Optimized Layout */}
            <div className="my-6">
              <div className="float-left mr-6 mb-4 w-full md:w-1/2">
                <EnhancedBirdImage
                  src="/images/bubcur1.jpg"
                  alt="Blue-billed Curassow (Crax alberti) in its natural forest habitat in Tayrona National Park"
                  width={400}
                  height={300}
                  photographer="Royann, Early Guest"
                  guide="Dagoberto Rudas"
                  guideLink="/team#dagoberto-rudas"
                  location="Tayrona National Park"
                  locationLink="/about/partners#tayrona"
                  species={{
                    commonName: "Blue-billed Curassow",
                    spanishName: "Paujil Piquiazul",
                    scientificName: "Crax alberti",
                    conservation: "Critically Endangered",
                  }}
                  ebirdUrl="https://ebird.org/species/bubcur1"
                  regions={[
                    "Northern Colombia",
                    "Sierra Nevada de Santa Marta",
                    "Tayrona National Park",
                    "Magdalena River Valley",
                  ]}
                  ecosystems={[
                    "Humid lowland forests",
                    "Foothill forests",
                    "Primary rainforest",
                    "Secondary forest edges",
                  ]}
                  aspectRatio="4/3"
                  className="shadow-2xl"
                  imagePosition="center 60%"
                />
              </div>

              <div className="space-y-4">
                <div className="inline-flex items-center bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium w-fit">
                  <Shield className="w-4 h-4 mr-2" />
                  Critically Endangered
                </div>

                <h4 className="text-2xl font-bold text-gray-900">A Prehistoric Encounter</h4>

                <p className="text-gray-700 leading-relaxed">
                  Deep in Tayrona's inland valleys, Dagoberto's expertise led us to one of Colombia's most elusive
                  birds. This critically endangered species, endemic to Colombia, represents the ultimate prize for any
                  serious birder visiting the region. The moment we spotted the curassow pair was electric. These
                  magnificent birds, with their distinctive blue bills and imposing presence, emerged from the
                  understory like prehistoric apparitions.
                </p>

                <p className="text-gray-700 leading-relaxed">
                  Watching them forage through the leaf litter, completely unaware of our presence, felt like witnessing
                  a piece of Colombia's natural heritage that few people ever experience. The birds moved with
                  deliberate grace through the forest floor, their calls echoing through the humid air as they searched
                  for fallen fruits and insects.
                </p>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                  <div className="flex items-start">
                    <Eye className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h5 className="font-bold text-blue-900 mb-1">Expert Guide Insight</h5>
                      <p className="text-blue-800 text-sm">
                        Dagoberto's intimate knowledge of the jungle and years of experience in the park made this
                        encounter possible. His patient guidance and deep understanding of their behavior patterns
                        proved essential. "These birds are ghosts of the forest," he whispered as we watched them
                        disappear into the green shadows.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="clear-both"></div>
            </div>

            <p className="mb-6">
              The moment we spotted the curassow pair was electric. These magnificent birds, with their distinctive blue
              bills and imposing presence, emerged from the understory like prehistoric apparitions. Watching them
              forage through the leaf litter, completely unaware of our presence, felt like witnessing a piece of
              Colombia's natural heritage that few people ever experience. Dagoberto's patient guidance and deep
              understanding of their behavior patterns made this encounter possible.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Day 8: Riohacha - Cardinal Guajiro Finale</h2>

            <p className="mb-6">
              Our final day brought us to the coastal scrublands around Riohacha, where Yeferson's ancestral knowledge
              of the Wayuu territory would prove essential for finding the endemic Vermilion Cardinal. The dry forests
              and thorny scrublands of this region represent a completely different ecosystem from the cloud forests
              where we began.
            </p>

            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 my-8 rounded-r-lg">
              <div className="flex items-start">
                <Heart className="w-6 h-6 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-emerald-900 mb-2">Indigenous Wisdom in Conservation</h3>
                  <p className="text-emerald-800">
                    "The birds are the messengers of the mountain," Yeferson explained as we walked through the dry
                    forest. "They tell us about the health of our territory, about the rains that will come, about the
                    balance we must maintain."
                  </p>
                </div>
              </div>
            </div>

            <p className="mb-6">
              Yeferson's knowledge of bird behavior, passed down through generations of Wayuu tradition, proved
              invaluable. He could predict bird movements by reading subtle changes in wind patterns and vegetation,
              skills that no field guide could teach. His understanding of the Cardinal Guajiro's habits—when it feeds,
              where it nests, how it responds to seasonal changes—came from a lifetime of observation rooted in cultural
              connection to the land.
            </p>

            <p className="mb-6">
              During our search, Yeferson introduced us to his aunt, a respected Wayuu elder who taught us about local
              medicinal plants. Her knowledge was remarkable—she showed us various native plants, some of which are
              favored as food by local bird species, including the cardinal. This connection between traditional plant
              knowledge and bird ecology provided fascinating insights into the interconnected nature of the ecosystem
              and how indigenous communities understand these relationships.
            </p>

            <div className="grid md:grid-cols-2 gap-8 my-8">
              <div className="relative">
                <div className="transform -translate-y-12">
                  <EnhancedBirdImage
                    src="/images/red-lored-amazons-pair.jpg"
                    alt="Scarlet-fronted Parakeets (Psittacara wagleri) pair in Sierra Nevada habitat"
                    width={400}
                    height={300}
                    photographer="Royann, Early Guest"
                    guide="David Jara"
                    guideLink="/team#david-jara"
                    location="El Dorado Reserve"
                    locationLink="/about/partners#el-dorado"
                    species={{
                      commonName: "Scarlet-fronted Parakeet",
                      spanishName: "Perico Frentirrojo",
                      scientificName: "Psittacara wagleri",
                    }}
                    ebirdUrl="https://ebird.org/species/scfpar2"
                    regions={[
                      "Andean slopes of Colombia",
                      "Sierra Nevada de Santa Marta",
                      "Eastern Cordillera",
                      "Central Cordillera",
                    ]}
                    ecosystems={["Humid montane forests", "Cloud forests", "Forest edges", "Secondary growth areas"]}
                    aspectRatio="4/3"
                    imagePosition="center 25%"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-0.5 italic font-light opacity-80 leading-tight">
                  Scarlet-fronted Parakeets in El Dorado Reserve
                </p>
              </div>
              <div className="flex flex-col justify-center">
                <p className="mb-4">
                  The Vermilion Cardinal, known locally as Cardinal Guajiro, represents one of Colombia's most striking
                  endemic species. Found only in the dry forests and scrublands of the Caribbean coast, this brilliant
                  red bird has become a symbol of the region's unique biodiversity.
                </p>
                <p>
                  Our search began in the early morning hours when the cardinals are most active. Yeferson led us
                  through a network of trails known only to local communities, paths that wind through thorny scrub and
                  cacti-dotted landscapes that most tourists never see.
                </p>
              </div>
            </div>

            <p className="mb-6">
              The moment came just as the sun crested the mountains. A flash of brilliant red caught our
              attention—there, perched on a flowering <em>Guaiacum officinale</em> tree, was a male Cardinal Guajiro in
              perfect morning light. The bird's crimson plumage seemed to glow against the pale yellow flowers, creating
              a scene that epitomized the magic of Colombian birding.
            </p>

            <div className="bg-gray-50 p-6 rounded-lg my-8">
              <div className="flex items-start">
                <Camera className="w-6 h-6 text-gray-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Photography Ethics in Indigenous Territories</h3>
                  <p className="text-gray-700">
                    Before capturing any images, we followed protocols established with our indigenous guides.
                    Photography in sacred territories requires permission, respect, and understanding that some areas
                    and species hold special cultural significance that transcends their biological importance. For
                    photographers interested in this approach, our{" "}
                    <Link href="/tours/vision" className="text-purple-600 hover:text-purple-700">
                      AVES Vision photography workshops
                    </Link>{" "}
                    emphasize these ethical practices.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Beyond Birding: Cultural Exchange</h2>

            <p className="mb-6">
              What made this expedition truly special wasn't just the remarkable bird sightings—it was the cultural
              exchange that occurred throughout our journey. Sharing meals with Wayuu families, learning about
              traditional ecological calendars from Kogi elders, and understanding how indigenous communities view their
              role as guardians of biodiversity added profound depth to our birding experience.
            </p>

            <div className="grid md:grid-cols-2 gap-8 my-8">
              <div className="flex flex-col justify-center">
                <p className="mb-4">
                  The encounter with Yeferson's aunt was particularly enlightening. Her knowledge of medicinal plants
                  and their relationship to local bird species demonstrated the deep ecological understanding that
                  indigenous communities possess. When she pointed out subtle changes in plant flowering patterns that
                  indicated seasonal bird movements, we witnessed traditional ecological knowledge in action.
                </p>
                <p>
                  These interactions reminded us that birding in indigenous territories isn't just about adding species
                  to our lists—it's about understanding the complex relationships between people, birds, and landscapes
                  that have evolved over millennia.
                </p>
              </div>
              <div className="relative">
                <div className="transform -translate-y-12">
                  <EnhancedBirdImage
                    src="/images/green-honeycreeper-male.jpg"
                    alt="Blue-headed Parrot (Pionus menstruus) in Tayrona forest canopy"
                    width={400}
                    height={300}
                    photographer="Royann, Early Guest"
                    guide="Dagoberto Rudas"
                    guideLink="/team#dagoberto-rudas"
                    location="Tayrona National Park"
                    locationLink="/about/partners#tayrona"
                    species={{
                      commonName: "Blue-headed Parrot",
                      spanishName: "Loro Cabecizul",
                      scientificName: "Pionus menstruus",
                    }}
                    ebirdUrl="https://ebird.org/species/blhpar1"
                    regions={[
                      "Northern South America",
                      "Colombian Caribbean coast",
                      "Magdalena River Valley",
                      "Tayrona region",
                    ]}
                    ecosystems={[
                      "Humid lowland forests",
                      "Foothill forests",
                      "Forest canopy",
                      "Secondary growth areas",
                    ]}
                    aspectRatio="4/3"
                    imagePosition="center 45%"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-0.5 italic font-light opacity-80 leading-tight">
                  Blue-headed Parrot in Tayrona forest canopy
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Conservation Through Community Partnership</h2>

            <p className="mb-6">
              Our expedition highlighted the critical importance of community-based conservation. The Kogi and Wayuu
              peoples have protected these forests for generations, not through formal conservation programs, but
              through cultural practices that recognize the intrinsic value of biodiversity.
            </p>

            <p className="mb-6">
              Working with guides like Yeferson and Dagoberto ensures that tourism revenue directly benefits local
              communities while providing economic incentives for habitat protection. This model demonstrates how
              responsible birding tourism can support both conservation goals and indigenous rights. For couples seeking
              a more intimate experience of these partnerships, our{" "}
              <Link href="/tours/souls" className="text-red-600 hover:text-red-700">
                AVES Souls retreats
              </Link>{" "}
              offer a perfect balance of birding and cultural immersion.
            </p>

            <Card className="my-8 border-blue-200 bg-blue-50">
              <CardContent className="p-6">
                <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                  Species Highlights from Our Expedition
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4 text-blue-600" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>All species photographed by our early guest Royann</p>
                    </TooltipContent>
                  </Tooltip>
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm">
                        <strong>Vermilion Cardinal</strong> (<em>Cardinalis phoeniceus</em>) - Endemic
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm">
                        <strong>Blue-billed Curassow</strong> (<em>Crax alberti</em>) - Critically Endangered Endemic
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">
                        <strong>Santa Marta Parakeet</strong> (<em>Pyrrhura viridicata</em>) - Endemic
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">
                        <strong>White-tailed Starfrontlet</strong> (<em>Coeligena phalerata</em>) - Endemic
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">
                        <strong>Scarlet-fronted Parakeet</strong> (<em>Psittacara wagleri</em>)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">
                        <strong>Blue-headed Parrot</strong> (<em>Pionus menstruus</em>)
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Reflections on Responsible Birding</h2>

            <p className="mb-6">
              As we descended from the Sierra Nevada, our cameras full of images and our notebooks filled with
              observations, we carried with us something more valuable than any photograph: a deeper understanding of
              what it means to be a responsible birder in indigenous territories.
            </p>

            <p className="mb-6">
              The Sierra Nevada de Santa Marta isn't just a birding destination—it's a living landscape where culture
              and nature intertwine in ways that challenge our conventional understanding of conservation. Our guides
              didn't just show us birds; they showed us a different way of seeing the world, one where humans and nature
              exist in respectful partnership.
            </p>

            <p className="mb-8">
              For birders considering a visit to this remarkable region, remember that you're not just entering a
              national park or protected area—you're entering someone's home, someone's sacred space. Approach with
              respect, travel with indigenous guides, and understand that the most meaningful birding experiences often
              come not from the species we see, but from the people who help us see them.
            </p>

            <div className="border-t border-gray-200 pt-8 mt-12">
              <p className="text-sm text-gray-600 italic">
                Special thanks to Yeferson Guale Epiayu (@kalekalemana1921), David Jara (@davidjara20), David Faunal
                (@faunal_observatorioavesminca), and Dagoberto Rudas (@dago_rdg) for their guidance, wisdom, and
                friendship. Their commitment to sharing their cultural knowledge while protecting their ancestral
                territories makes experiences like this possible. Photography credits to Royann, our early guest and
                talented photographer who captured these remarkable moments.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Sierra Nevada 8-Day Itinerary</h2>

          <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden mb-8">
            <div className="bg-emerald-50 p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-emerald-800">
                  Our Intensive 8-Day Sierra Nevada + Caribbean Experience
                </h3>
                <Link
                  href="/tours/adventure/sierra-nevada"
                  className="text-sm bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  View Full Tour Details
                </Link>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              <div className="p-4 hover:bg-gray-50">
                <div className="flex items-center">
                  <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mr-3">
                    1
                  </span>
                  <div>
                    <h4 className="font-bold">El Dorado Reserve - Day 1</h4>
                    <p className="text-gray-600">
                      Arrival and introduction to cloud forest birding, focusing on common species and orientation
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 hover:bg-gray-50">
                <div className="flex items-center">
                  <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mr-3">
                    2
                  </span>
                  <div>
                    <h4 className="font-bold">El Dorado Reserve - Day 2</h4>
                    <p className="text-gray-600">
                      Full day exploring remote trails for endemic species with specialist guide David Jara
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 hover:bg-gray-50">
                <div className="flex items-center">
                  <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mr-3">
                    3
                  </span>
                  <div>
                    <h4 className="font-bold">El Dorado Reserve - Day 3</h4>
                    <p className="text-gray-600">
                      Flexible day for photography and return visits to promising locations
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 hover:bg-gray-50">
                <div className="flex items-center">
                  <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mr-3">
                    4
                  </span>
                  <div>
                    <h4 className="font-bold">Minca & El Observatorio - Day 1</h4>
                    <p className="text-gray-600">
                      Higher elevation trails with David Faunal, exploring cloud forest and mid-elevation species
                      overlap
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 hover:bg-gray-50">
                <div className="flex items-center">
                  <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mr-3">
                    5
                  </span>
                  <div>
                    <h4 className="font-bold">Minca & El Observatorio - Day 2</h4>
                    <p className="text-gray-600">
                      Lower elevation trails, Kogi ruins exploration, and different habitat types
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 hover:bg-gray-50">
                <div className="flex items-center">
                  <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mr-3">
                    6
                  </span>
                  <div>
                    <h4 className="font-bold">Tayrona National Park - Day 1</h4>
                    <p className="text-gray-600">Coastal forests and specialized avifauna with Dagoberto Rudas</p>
                  </div>
                </div>
              </div>

              <div className="p-4 hover:bg-gray-50">
                <div className="flex items-center">
                  <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mr-3">
                    7
                  </span>
                  <div>
                    <h4 className="font-bold">Tayrona & Blue-billed Curassow</h4>
                    <p className="text-gray-600">
                      Inland valleys, higher elevations, and Blue-billed Curassow encounter with Dagoberto
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 hover:bg-gray-50">
                <div className="flex items-center">
                  <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mr-3">
                    8
                  </span>
                  <div>
                    <h4 className="font-bold">Riohacha - Cardinal Guajiro</h4>
                    <p className="text-gray-600">
                      Coastal scrublands with Wayuu guide Yeferson Guale Epiayu searching for the endemic Vermilion
                      Cardinal
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <p className="text-gray-600 text-sm">
                  This intensive itinerary is exclusively available as an Adventure Tour
                </p>
                <Link
                  href="/contact"
                  className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition-colors"
                >
                  Request Customization
                </Link>
              </div>
            </div>
          </div>

          <Card className="my-8 border-amber-200 bg-amber-50">
            <CardContent className="p-6">
              <h3 className="font-bold text-amber-900 mb-4">Our Four Tour Types - Flexible Scheduling Options</h3>
              <p className="text-amber-800 mb-4 text-sm">
                While this intensive 8-day Sierra Nevada + Caribbean combination is exclusively available as an
                Adventure Tour, we offer all four tour types for dedicated regional experiences. Each tour type provides
                a unique approach to Colombian birding:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="border-l-4 border-emerald-500 pl-4">
                    <h4 className="font-bold text-emerald-900 mb-1">🍃 Adventure Tours</h4>
                    <p className="text-sm text-emerald-800 mb-2">
                      Our signature birding expeditions across Colombia's prime hotspots. 7-14 days of immersive
                      wildlife discovery through diverse ecosystems with professional ornithologist guides.
                    </p>
                    <div className="text-xs text-emerald-700">
                      • Premium eco-lodges • Conservation project visits • Small groups (max 4) • $8,000 avg.
                    </div>
                    <Link
                      href="/tours/adventure"
                      className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                    >
                      Learn More →
                    </Link>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-bold text-purple-900 mb-1">🪶 Vision Tours</h4>
                    <p className="text-sm text-purple-800 mb-2">
                      Specialized photography and videography workshops with professional wildlife photographers
                      capturing Colombia's avian beauty in exclusive photography hides.
                    </p>
                    <div className="text-xs text-purple-700">
                      • Exclusive photography hides • Technical instruction • Post-processing sessions • $10,000 avg.
                    </div>
                    <Link href="/tours/vision" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                      Learn More →
                    </Link>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h4 className="font-bold text-yellow-900 mb-1">🌼 Elevate Tours</h4>
                    <p className="text-sm text-yellow-800 mb-2">
                      Premium expeditions with luxury amenities in exclusive locations for the ultimate comfort
                      experience in Colombia's finest reserves with customized itineraries.
                    </p>
                    <div className="text-xs text-yellow-700">
                      • Customized itineraries • Gourmet dining • Wellness facilities • $12,000 avg.
                    </div>
                    <Link href="/tours/elevate" className="text-yellow-600 hover:text-yellow-700 text-sm font-medium">
                      Learn More →
                    </Link>
                  </div>

                  <div className="border-l-4 border-red-500 pl-4">
                    <h4 className="font-bold text-red-900 mb-1">🍓 Souls Tours</h4>
                    <p className="text-sm text-red-800 mb-2">
                      Romantic retreats combining birding with intimate experiences in secluded, breathtaking locations
                      perfect for couples (2 people only) with private romantic dining.
                    </p>
                    <div className="text-xs text-red-700">
                      • Couples-only (2 people) • Private romantic dining • Commemorative activities • $14,000 avg.
                    </div>
                    <Link href="/tours/souls" className="text-red-600 hover:text-red-700 text-sm font-medium">
                      Learn More →
                    </Link>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-amber-100 rounded-lg">
                <p className="text-xs text-amber-800">
                  <strong>Recommendation:</strong> For a more relaxed pace, consider dedicated 8-day tours for each
                  region separately, available across all four tour types. This allows for deeper exploration and is
                  suitable for all experience levels.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Related Links */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Plan Your Sierra Nevada Adventure</h3>
            <div className="text-center mb-8">
              <p className="text-lg text-gray-600 mb-6">
                Experience the magic of the Sierra Nevada with indigenous guides and discover endemic species found
                nowhere else on Earth. Choose from our four distinct tour types to match your preferences.
              </p>
              <Link href="/shopping?region=caribbean">
                <Button className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors inline-flex items-center gap-2">
                  Explore Our Sierra Nevada Tours
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Link
                href="/tours/adventure/sierra-nevada"
                className="block p-6 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
              >
                <h4 className="font-bold text-emerald-900 mb-2">Sierra Nevada 8-Day Itinerary</h4>
                <p className="text-emerald-800">Our intensive itinerary as described in this article</p>
              </Link>
              <Link href="/tours" className="block p-6 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors">
                <h4 className="font-bold text-emerald-900 mb-2">Compare All Tour Types</h4>
                <p className="text-emerald-800">Adventure, Vision, Elevate, and Souls - find your perfect match</p>
              </Link>
              <Link href="/contact" className="block p-6 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <h4 className="font-bold text-blue-900 mb-2">Custom Expeditions</h4>
                <p className="text-blue-800">Design your own indigenous community birding experience</p>
              </Link>
            </div>
          </div>

          <div className="mt-5 text-gray-500">
            <span>Published: March 15, 2025</span>
          </div>
        </article>
        <Footer />
      </div>
    </TooltipProvider>
  )
}
