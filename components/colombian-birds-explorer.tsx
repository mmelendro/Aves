/**
 * Full Colombia Explorer. Visual marker coordinates are joined to sourced region
 * and bird records, then a selected region drives the detail panel and planning links.
 * The introductory carousel is independent of the map selection in this full-page view.
 */
"use client"

import { useHeaderLandscape } from "./header-landscape-context"
import { MapViewer } from "./map-viewer"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getRegionLinks } from "@/lib/region-links"
import { regions } from "@/content/regions"
import { birdData } from "@/content/birds"
import { Bird, TreePine, Mountain, ChevronRight, Waves, Leaf, Sun, Camera, ArrowRight, ChevronDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import ColombiaHeroExplorer from "@/components/colombia-hero-explorer"
import ColombiaMapArtwork from "@/components/colombia-map-artwork"

// Marker positions preserve the existing AVES map artwork; colours use the shared map palette.
// Descriptions and featured species come from the shared, sourced catalogue.
const regionMapVisuals = [
  {
    id: "Pacific",
    coordinates: { x: 8, y: 65 },
    color: "#32634e",
    icon: TreePine,
  },
  {
    id: "Western Andes",
    coordinates: { x: 20, y: 52 },
    color: "#406b57",
    icon: Mountain,
  },
  {
    id: "Central Andes",
    coordinates: { x: 32, y: 48 },
    color: "#517a63",
    icon: Mountain,
  },
  {
    id: "Eastern Andes",
    coordinates: { x: 48, y: 42 },
    color: "#628b73",
    icon: Mountain,
  },
  {
    id: "Cauca Valley",
    coordinates: { x: 26, y: 40 },
    color: "#3b705e",
    icon: Leaf,
  },
  {
    id: "Magdalena Valley",
    coordinates: { x: 40, y: 36 },
    color: "#4c806c",
    icon: Leaf,
  },
  {
    id: "Caribbean",
    coordinates: { x: 36, y: 18 },
    color: "#6b8b67",
    icon: Waves,
  },
  {
    id: "SNSM",
    coordinates: { x: 47, y: 10 },
    color: "#53795d",
    icon: Mountain,
  },
  {
    id: "Llanos",
    coordinates: { x: 70, y: 42 },
    color: "#758868",
    icon: Sun,
  },
  {
    id: "Amazonia",
    coordinates: { x: 56, y: 78 },
    color: "#3d765a",
    icon: TreePine,
  },
  {
    id: "Massif",
    coordinates: { x: 20, y: 65 },
    color: "#6a8266",
    icon: Mountain,
  },
]

// Match map IDs with content records once. A missing ID is a content error, not an empty card.
const bioregionsData = regionMapVisuals.map((visual) => {
  const region = regions.find((item) => item.mapId === visual.id)
  if (!region) throw new Error(`Unknown map region: ${visual.id}`)
  return {
    ...visual,
    name: region.name,
    description: region.description,
    birds: region.birds.map((selection) => {
      const bird = birdData.find((item) => item.id === selection.birdId)
      if (!bird) throw new Error(`Unknown map bird: ${selection.birdId}`)
      return { ...selection, commonName: bird.commonName }
    }),
  }
})

export function ColombianBirdsExplorer() {
  const { publish } = useHeaderLandscape()
  // Selection persists after a click; hover only controls temporary emphasis/tooltips.
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">("desktop")
  const [isGettingStartedOpen, setIsGettingStartedOpen] = useState(false)

  const currentRegion = selectedRegion ? bioregionsData.find((r) => r.id === selectedRegion) : null
  const currentLinks = getRegionLinks(currentRegion?.id || "")

  // Responsive screen size detection
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) {
        setScreenSize("mobile")
      } else if (width < 1024) {
        setScreenSize("tablet")
      } else {
        setScreenSize("desktop")
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Dynamic sizing based on screen size
  const getIconSizes = () => {
    switch (screenSize) {
      case "mobile":
        return {
          iconSize: "w-6 h-6",
          iconInnerSize: "w-3 h-3",
          borderWidth: "border-2",
          tooltipOffset: "top-8",
          tooltipPadding: "px-2 py-1",
          tooltipTextSize: "text-xs",
          hoverScale: "group-hover:scale-110",
          selectedScale: "scale-110",
          shadowSize: "shadow-md",
        }
      case "tablet":
        return {
          iconSize: "w-8 h-8",
          iconInnerSize: "w-4 h-4",
          borderWidth: "border-2",
          tooltipOffset: "top-10",
          tooltipPadding: "px-2 py-1",
          tooltipTextSize: "text-xs",
          hoverScale: "group-hover:scale-110",
          selectedScale: "scale-110",
          shadowSize: "shadow-lg",
        }
      default: // desktop
        return {
          iconSize: "w-10 h-10",
          iconInnerSize: "w-5 h-5",
          borderWidth: "border-3",
          tooltipOffset: "top-12",
          tooltipPadding: "px-3 py-2",
          tooltipTextSize: "text-sm",
          hoverScale: "group-hover:scale-110",
          selectedScale: "scale-110",
          shadowSize: "shadow-xl",
        }
    }
  }

  const iconSizes = getIconSizes()

  // Clicking the selected marker again clears the panel rather than navigating away.
  const handleRegionClick = (regionId: string) => {
    const next = selectedRegion === regionId ? undefined : regions.find(region=>region.mapId === regionId)?.id
    publish({country:"colombia",regionId:next})
    if (selectedRegion === regionId) {
      setSelectedRegion(null)
    } else {
      setSelectedRegion(regionId)
    }
  }

  const resetSelection = () => {
    publish({country:"colombia"})
    setSelectedRegion(null)
  }

  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900" aria-hidden="true" />
      <section className="relative z-10 py-8 lg:py-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
          <div className="order-2 w-full"><ColombiaHeroExplorer /></div>
          <div className="order-1 mx-auto max-w-4xl text-center text-white">
            <h1 className="mb-5 text-4xl font-bold sm:text-5xl lg:text-6xl">Explore Colombia</h1>
            <p className="mb-7 text-lg leading-relaxed text-emerald-50 sm:text-xl">Start with a bird, then explore its home. Choose a region on the map to discover local birdlife and shape your journey.</p>
            <div className="flex flex-wrap gap-3">
              <a href="#colombia-regions" className="inline-flex min-h-12 items-center rounded-full bg-white px-6 py-3 font-semibold text-emerald-900 hover:bg-emerald-50">Explore the map</a>
              <Link href="/tours" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-emerald-300 px-6 py-3 font-semibold text-white hover:bg-emerald-800"><Calendar className="h-4 w-4" aria-hidden="true" />Explore tour styles</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content with Transparent Background */}
      <div className="relative z-10">
        <section id="colombia-regions" className="scroll-mt-24 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Left Column - Biodiversity Info */}
              <div className="order-2 lg:order-1 space-y-8">
                {/* Colombia's Biodiversity - Enhanced Transparency */}
                <Card className="bg-white/10 backdrop-blur-lg shadow-2xl border border-white/20">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                        <Bird className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-xl font-bold text-white">Colombia's Biodiversity</h2>
                    </div>
                    <div className="w-16 h-1 bg-gradient-to-r from-emerald-400 to-blue-400 mb-6"></div>

                    <div className="space-y-4 text-white/90">
                      <p className="leading-relaxed">
                        Explore Colombia through the{" "}
                        <Badge
                          variant="secondary"
                          className="bg-emerald-500/20 text-emerald-200 font-semibold border border-emerald-400/30"
                        >
                          {regions.length} birding regions
                        </Badge>{" "}
                        on this AVES planning map, with{" "}
                        <Badge
                          variant="secondary"
                          className="bg-blue-500/20 text-blue-200 font-semibold border border-blue-400/30"
                        >
                          {birdData.length} featured birds
                        </Badge>{" "}
                        in our catalogue. These are starting points for an enquiry, not official ecological boundaries
                        or a complete bird checklist.
                      </p>

                      <p className="leading-relaxed">
                        Follow the region guides from Pacific forest and Andean cloud forest to Caribbean wetlands,
                        the Llanos and Amazonia. Each guide explains where its featured birds occur and links to the
                        sources behind those habitat notes.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Getting Started Accordion - Enhanced Transparency */}
                <Card className="bg-white/10 backdrop-blur-lg shadow-2xl border border-white/20">
                  <CardContent className="p-8">
                    <Collapsible open={isGettingStartedOpen} onOpenChange={setIsGettingStartedOpen}>
                      <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
                        <h3 className="text-lg font-semibold text-white">Getting Started</h3>
                        <ChevronDown
                          className={`w-5 h-5 text-white/70 transition-transform duration-200 ${
                            isGettingStartedOpen ? "rotate-180" : ""
                          }`}
                        />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-6">
                        <div className="space-y-4 text-white/80 text-sm bg-black/20 p-6 rounded-lg border border-white/20">
                          <p>
                            Select a region in the interactive map, open its guide and explore the featured birds.
                            Send a regional enquiry when you are ready to discuss your itinerary.
                          </p>
                          <ul className="space-y-3 ml-4">
                            <li className="flex items-start gap-2">
                              <span className="text-emerald-400">•</span>
                              <span>Use habitat notes to identify the places that interest you.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-emerald-400">•</span>
                              <span>Share your preferred dates, group size and walking pace.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-emerald-400">•</span>
                              <span>Access, guiding, timing and availability need individual confirmation.</span>
                            </li>
                          </ul>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </CardContent>
                </Card>

                {/* Selected Region Details - Enhanced Transparency */}
                {currentRegion && (
                  <Card id="selected-region-details" className="bg-white/10 backdrop-blur-lg shadow-2xl border border-white/20 animate-fade-in-up">
                    <CardContent className="p-8">
                      {/* Navigation Breadcrumb */}
                      <div className="mb-6 flex items-center gap-2 text-sm bg-black/20 p-4 rounded-lg border border-white/20">
                        <button
                          onClick={resetSelection}
                          className="hover:text-emerald-300 transition-colors font-medium flex items-center gap-2 text-white/80"
                        >
                          <ArrowRight className="w-4 h-4 rotate-180" />
                          All Regions
                        </button>
                        <ChevronRight className="w-4 h-4 text-white/60" />
                        <span className="text-white font-semibold">{currentRegion.name}</span>
                      </div>

                      {/* Region Header */}
                      <div className="flex items-center gap-3 mb-6">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md"
                          style={{ backgroundColor: currentRegion.color }}
                        >
                          <currentRegion.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">{currentRegion.name}</h3>
                          <p className="text-white/70 text-sm">
                            Regional birding inspiration
                          </p>
                        </div>
                      </div>

                      {/* Region Description */}
                      <p className="text-white/80 mb-6 text-sm leading-relaxed">{currentRegion.description}</p>

                      {/* Key Information */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-black/20 p-4 rounded-lg border border-white/20">
                          <h4 className="font-semibold text-white mb-2 text-sm">Featured Birds</h4>
                          <div className="space-y-2 text-xs">
                            <div className="flex justify-between">
                              <span className="text-white/70">In this guide:</span>
                              <span className="font-medium text-white">{currentRegion.birds.length}</span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-black/20 p-4 rounded-lg border border-white/20">
                          <h4 className="font-semibold text-white mb-2 text-sm">Plan Your Visit</h4>
                          <p className="font-medium text-xs text-white/80">Ask about timing, access and a suitable pace.</p>
                        </div>
                      </div>

                      {/* Key Species */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-white mb-3 text-sm">Birds to Explore</h4>
                        <div className="flex flex-wrap gap-2">
                          {currentRegion.birds.map((bird) => (
                            <span
                              key={bird.birdId}
                              className="px-3 py-1 text-xs rounded-full border border-white/30"
                              style={{
                                color: "white",
                                backgroundColor: `${currentRegion.color}30`,
                              }}
                            >
                              {bird.commonName}
                            </span>
                          ))}
                        </div>
                        <p className="mt-3 text-xs leading-relaxed text-white/70">
                          The region guide includes local habitat notes and sources. Sightings are never guaranteed.
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <Button
                          asChild
                          size="sm"
                          className="flex-1 text-xs"
                          style={{
                            backgroundColor: currentRegion.color,
                            borderColor: currentRegion.color,
                          }}
                        >
                          <Link href={currentLinks.guideHref}>
                            <Bird className="w-3 h-3 mr-1" />
                            Region Guide
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          asChild
                          size="sm"
                          className="flex-1 text-xs bg-transparent text-white border-white/30 hover:bg-white/10"
                        >
                          <Link href={currentLinks.enquiryHref}>
                            <Camera className="w-3 h-3 mr-1" />
                            Plan This Region
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Right Column - Interactive Map with Transparent Background */}
              <div className="order-1 lg:order-2">
                <Card className="bg-white/5 backdrop-blur-lg shadow-2xl border border-white/20">
                  <CardContent className="p-6 sm:p-8">
                    {/* Map Title */}
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold text-white mb-3">The Map</h2>
                      <p className="text-white/80 text-sm">
                        Click on any region to discover its unique ecosystems and species
                      </p>
                    </div>

                    {/* Interactive Map Container - Transparent Background */}
                    <MapViewer label="Colombia full explorer map" credits="AVES planning-region artwork · representative locations, not official ecological boundaries."><div className="relative bg-transparent rounded-lg p-6 mb-6 border border-white/20">
                      <div className="relative mx-auto">
                        <ColombiaMapArtwork
                          alt="Colombia Interactive Bioregions Map"
                          width={634}
                          height={802}
                          sizes="(min-width: 1024px) 40vw, 90vw"
                          className="w-full h-auto rounded-md shadow-lg opacity-90"
                        />

                        {/* Interactive Overlay */}
                        <div className="absolute inset-0">
                          {bioregionsData.map((region) => {
                            const IconComponent = region.icon
                            const isSelected = selectedRegion === region.id
                            const isHovered = hoveredRegion === region.id
                            return (
                              <button
                                key={region.id}
                                type="button"
                                onClick={() => handleRegionClick(region.id)}
                                onMouseEnter={() => setHoveredRegion(region.id)}
                                onMouseLeave={() => setHoveredRegion(null)}
                                className={`absolute flex h-11 w-11 items-center justify-center transform -translate-x-1/2 -translate-y-1/2 group z-10 focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded-full transition-all duration-300 ${iconSizes.hoverScale}`}
                                style={{
                                  left: `${region.coordinates.x}%`,
                                  top: `${region.coordinates.y}%`,
                                }}
                                aria-label={`Explore ${region.name} region`}
                                aria-pressed={isSelected}
                                aria-controls={currentRegion ? "selected-region-details" : undefined}
                              >
                                <div
                                  className={`${iconSizes.iconSize} rounded-full ${iconSizes.shadowSize} transition-all duration-300 flex items-center justify-center ${iconSizes.borderWidth} border-white ${
                                    isSelected
                                      ? `ring-2 ring-white ring-opacity-95 ${iconSizes.selectedScale} border-white`
                                      : ""
                                  }`}
                                  style={{
                                    backgroundColor: region.color,
                                    boxShadow: isSelected
                                      ? `0 0 0 2px ${region.color}40, 0 4px 15px ${region.color}70`
                                      : `0 2px 8px ${region.color}50`,
                                  }}
                                >
                                  <IconComponent
                                    className={`${iconSizes.iconInnerSize} text-white drop-shadow-sm`}
                                    style={{
                                      filter: "drop-shadow(0.5px 0.5px 1px rgba(0,0,0,0.8))",
                                    }}
                                  />
                                </div>
                                {isHovered && !isSelected && screenSize === "desktop" && (
                                  <div
                                    className={`absolute ${iconSizes.tooltipOffset} left-1/2 transform -translate-x-1/2 bg-black/90 backdrop-blur-sm ${iconSizes.tooltipPadding} rounded-md ${iconSizes.shadowSize} ${iconSizes.tooltipTextSize} font-medium whitespace-nowrap z-20 border border-white/30`}
                                  >
                                    <div className="font-bold text-white">{region.name}</div>
                                    <div className="text-xs text-white/70">Click to explore</div>
                                  </div>
                                )}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    </div>

                    </MapViewer>{/* Statistics Below Map - Enhanced Transparency */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="bg-emerald-500/20 backdrop-blur-sm text-white rounded-lg p-4 shadow-lg border border-emerald-400/30">
                        <div className="text-lg sm:text-xl font-bold">{birdData.length}</div>
                        <div className="text-emerald-200 text-xs font-medium">Featured Birds</div>
                      </div>
                      <div className="bg-blue-500/20 backdrop-blur-sm text-white rounded-lg p-4 shadow-lg border border-blue-400/30">
                        <div className="text-lg sm:text-xl font-bold">{regions.length}</div>
                        <div className="text-blue-200 text-xs font-medium">Region Guides</div>
                      </div>
                      <div className="bg-purple-500/20 backdrop-blur-sm text-white rounded-lg p-4 shadow-lg border border-purple-400/30">
                        <div className="text-lg sm:text-xl font-bold">Your Pace</div>
                        <div className="text-purple-200 text-xs font-medium">Personal Enquiries</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Call-to-Action Section with Maximum Transparency */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/5 backdrop-blur-sm relative overflow-hidden">
          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 text-shadow-2xl">
                Ready to Experience Colombia's Avian Wonders?
              </h2>
              <p className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto text-shadow-lg">
                Tell us which regions and birds interest you. We can discuss your dates, priorities and preferred pace
                before confirming a proposed itinerary.
              </p>
            </div>

            {/* CTA Buttons with Enhanced Transparency */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-12">
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-white/15 backdrop-blur-md text-white hover:bg-white/25 font-semibold py-4 border border-white/30 shadow-lg"
                >
                  <Link href="/tours">
                  <Calendar className="w-5 h-5 mr-2" />
                  View All Tours
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full border-white/40 text-white hover:bg-white/15 font-semibold py-4 bg-transparent backdrop-blur-md shadow-lg"
                >
                  <Link href="/contact">
                  <Users className="w-5 h-5 mr-2" />
                  Plan Custom Tour
                  </Link>
                </Button>
            </div>

            {/* Additional Information Grid with Maximum Transparency */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              <div className="text-white/90 bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                <div className="text-2xl font-bold text-white mb-3 text-shadow-lg">Regional Guides</div>
                <div className="text-sm text-shadow">Explore featured birds with habitat notes and linked sources</div>
              </div>
              <div className="text-white/90 bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                <div className="text-2xl font-bold text-white mb-3 text-shadow-lg">Your Priorities</div>
                <div className="text-sm text-shadow">Share your group size, interests and preferred walking pace</div>
              </div>
              <div className="text-white/90 bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                <div className="text-2xl font-bold text-white mb-3 text-shadow-lg">Plan Together</div>
                <div className="text-sm text-shadow">Confirm access, guiding and availability before making a booking</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
