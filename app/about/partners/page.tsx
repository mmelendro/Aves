"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, ExternalLink, Mail, Calendar, MapPin, Mountain, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import OptimizedImage from "@/components/optimized-image"

const partners = [
  {
    id: "proaves",
    name: "ProAves",
    type: "Conservation Organization",
    location: "Colombia",
    description:
      "Colombia's leading conservation organization dedicated to protecting birds and their habitats. ProAves manages numerous reserves across the country, offering exceptional birding experiences while conducting vital conservation research and community engagement programs.",
    specialties: ["Bird Conservation", "Habitat Preservation", "Ecotourism", "Research", "Community Engagement"],
    website: "https://proaves.org",
    contact: "info@proaves.org",
    established: "1998",
    area: "Multiple reserves nationwide",
    elevation: "Sea level to 4,000m",
    highlights: [
      "El Dorado Bird Reserve - Home to 20+ endemic species",
      "Reinita Cielo Azul Reserve - Critical habitat protection",
      "ProAves Ecotours - Sustainable tourism programs",
      "Scientific Research Opportunities",
      "Community-based conservation initiatives",
    ],
    category: "conservation",
    logo: "/images/partners/proaves-logo.gif",
    tags: ["Endemic Species", "Research", "Community Conservation", "Multiple Reserves"],
  },
  {
    id: "termales-del-ruiz",
    name: "Termales del Ruiz",
    type: "Ecotourism Lodge & Reserve",
    location: "Manizales, Caldas",
    description:
      "A renowned ecotourism destination in the Central Andes, famous for its spectacular hummingbird feeders and pristine paramo ecosystem. Termales del Ruiz offers comfortable lodging, natural hot springs, and world-class birdwatching opportunities in one of Colombia's most scenic locations.",
    specialties: [
      "Hummingbird Photography",
      "Paramo Birding",
      "Thermal Baths",
      "Andean Scenery",
      "High-altitude Species",
    ],
    website: "https://termalesdelruiz.com",
    contact: "info@termalesdelruiz.com",
    established: "1984",
    area: "Private reserve in Paramo ecosystem",
    elevation: "3,400m",
    highlights: [
      "Sword-billed Hummingbird feeding stations",
      "Buff-winged Starfrontlet photography opportunities",
      "Natural thermal hot springs",
      "Andean Condor sightings",
      "Paramo ecosystem exploration",
      "High-altitude endemic species",
    ],
    category: "lodges",
    logo: "/placeholder.svg?height=80&width=120&text=Termales+del+Ruiz",
    tags: ["Hummingbirds", "Hot Springs", "High Altitude", "Photography"],
  },
  {
    id: "montezuma",
    name: "Montezuma Rainforest Lodge",
    type: "Ecolodge",
    location: "El Cairo, Valle del Cauca",
    description:
      "Nestled in the heart of the Chocó biogeographic region, Montezuma Ecolodge provides exclusive access to some of the most biodiverse habitats on Earth. This family-owned lodge combines comfort with conservation, offering incredible birding and wildlife viewing in pristine rainforest settings.",
    specialties: ["Chocó Endemics", "Rainforest Birding", "Wildlife Observation", "Hiking", "Night Birding"],
    website: "https://montezumalodge.com",
    contact: "info@montezumalodge.com",
    established: "2005",
    area: "Private rainforest reserve",
    elevation: "1,300-1,800m",
    highlights: [
      "Goldringed Tanager - Chocó endemic",
      "Chocó Toucan sightings",
      "Spectacled Bear habitat",
      "Howler Monkey encounters",
      "Night birding expeditions",
      "Pristine rainforest trails",
    ],
    category: "lodges",
    logo: "/placeholder.svg?height=80&width=120&text=Montezuma+Lodge",
    tags: ["Chocó Endemics", "Rainforest", "Wildlife", "Night Birding"],
  },
  {
    id: "reserva-rio-blanco",
    name: "Reserva Río Blanco",
    type: "Cloud Forest Reserve",
    location: "Manizales, Caldas",
    description:
      "A pristine cloud forest reserve in the Central Andes, home to spectacular endemic birds including the famous Chestnut-crowned Antpitta and Black-billed Mountain-Toucan. This protected area offers exceptional birding opportunities in montane ecosystems with well-maintained trails and research facilities.",
    specialties: [
      "Chestnut-crowned Antpitta",
      "Black-billed Mountain-Toucan",
      "Andean Motmot",
      "Cloud forest species",
      "Endemic Photography",
    ],
    website: "https://reservarioblanco.com",
    contact: "info@reservarioblanco.com",
    established: "1985",
    area: "4,932 hectares",
    elevation: "2,150-2,800m",
    highlights: [
      "Chestnut-crowned Antpitta feeding station",
      "Black-billed Mountain-Toucan photography",
      "Guided cloud forest walks",
      "Research station facilities",
      "Conservation education programs",
      "Endemic bird photography opportunities",
    ],
    category: "reserves",
    logo: "/placeholder.svg?height=80&width=120&text=Rio+Blanco",
    tags: ["Cloud Forest", "Antpitta", "Mountain-Toucan", "Research"],
  },
  {
    id: "selva-lodge",
    name: "Selva Lodge Eco-Resort",
    type: "Eco-Resort",
    location: "Amazon Basin, Colombia",
    description:
      "Located deep in the Colombian Amazon, Selva Lodge offers an authentic rainforest experience with access to incredible biodiversity. The lodge specializes in lowland rainforest birding, with expert guides and comfortable accommodations in one of the world's most biodiverse regions.",
    specialties: ["Amazon Birding", "Lowland Rainforest", "Canopy Birding", "River Expeditions", "Indigenous Culture"],
    website: "https://selvalodge.com",
    contact: "reservas@selvalodge.com",
    established: "2010",
    area: "Amazon rainforest concession",
    elevation: "200-400m",
    highlights: [
      "Harpy Eagle territory",
      "Canopy tower birding",
      "River birding expeditions",
      "Indigenous community visits",
      "Night jungle walks",
      "Over 400 bird species recorded",
    ],
    category: "lodges",
    logo: "/placeholder.svg?height=80&width=120&text=Selva+Lodge",
    tags: ["Amazon", "Harpy Eagle", "Canopy", "Indigenous Culture"],
  },
  {
    id: "fundacion-yubarta",
    name: "Fundación Yubarta",
    type: "Marine Conservation Organization",
    location: "Pacific Coast, Colombia",
    description:
      "Dedicated to the conservation of marine ecosystems and seabirds along Colombia's Pacific coast. Fundación Yubarta conducts research on humpback whales and seabirds while promoting sustainable coastal tourism and community-based conservation programs.",
    specialties: [
      "Seabird Conservation",
      "Marine Ecosystems",
      "Whale Research",
      "Coastal Birding",
      "Community Programs",
    ],
    website: "https://yubarta.org",
    contact: "info@yubarta.org",
    established: "1999",
    area: "Pacific coastal waters",
    elevation: "Sea level",
    highlights: [
      "Seabird research programs",
      "Humpback whale migration studies",
      "Coastal birding expeditions",
      "Community conservation training",
      "Marine protected area management",
      "Pelagic birding opportunities",
    ],
    category: "conservation",
    logo: "/placeholder.svg?height=80&width=120&text=Yubarta",
    tags: ["Seabirds", "Marine Conservation", "Whales", "Pacific Coast"],
  },
]

const categories = {
  conservation: {
    title: "Conservation Organizations",
    description:
      "Leading organizations dedicated to bird conservation, research, and habitat protection across Colombia",
    icon: "🦅",
    color: "from-emerald-50 to-green-50",
    hoverColor: "hover:from-emerald-100 hover:to-green-100",
  },
  lodges: {
    title: "Ecolodges & Accommodations",
    description:
      "Premium lodges and eco-resorts offering exceptional birding experiences with comfortable accommodations",
    icon: "🏨",
    color: "from-blue-50 to-cyan-50",
    hoverColor: "hover:from-blue-100 hover:to-cyan-100",
  },
  reserves: {
    title: "Nature Reserves & Protected Areas",
    description: "Protected areas and reserves providing access to pristine habitats and endemic species",
    icon: "🌲",
    color: "from-green-50 to-emerald-50",
    hoverColor: "hover:from-green-100 hover:to-emerald-100",
  },
}

const PartnerCard = ({ partner }: { partner: (typeof partners)[0] }) => {
  return (
    <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-4 mb-3">
          <div className="flex-shrink-0">
            <OptimizedImage
              src={partner.logo}
              alt={`${partner.name} logo`}
              width={80}
              height={60}
              className="w-20 h-15 object-contain rounded-lg bg-white p-2 border"
            />
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">{partner.name}</CardTitle>
            <CardDescription className="text-sm text-gray-600 mb-2">
              <div className="flex items-center gap-1 mb-1">
                <MapPin className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">
                  {partner.type} • {partner.location}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3 flex-shrink-0" />
                <span>Est. {partner.established}</span>
              </div>
            </CardDescription>
          </div>
        </div>
        <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">{partner.description}</p>
      </CardHeader>

      <CardContent className="pt-0 space-y-3">
        {/* Tags */}
        <div>
          <div className="flex flex-wrap gap-1">
            {partner.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs px-2 py-1">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Location Details */}
        <div className="grid grid-cols-1 gap-2 text-xs bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center gap-2">
            <Globe className="h-3 w-3 text-gray-500" />
            <span className="font-medium text-gray-700">Area:</span>
            <span className="text-gray-600 truncate">{partner.area}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mountain className="h-3 w-3 text-gray-500" />
            <span className="font-medium text-gray-700">Elevation:</span>
            <span className="text-gray-600">{partner.elevation}</span>
          </div>
        </div>

        {/* Key Highlights */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Key Highlights</h4>
          <ul className="space-y-1 max-h-24 overflow-y-auto">
            {partner.highlights.slice(0, 4).map((highlight, index) => (
              <li key={index} className="text-xs text-gray-600 flex items-start gap-2">
                <span className="text-emerald-500 mt-0.5 flex-shrink-0">•</span>
                <span className="line-clamp-1">{highlight}</span>
              </li>
            ))}
            {partner.highlights.length > 4 && (
              <li className="text-xs text-gray-500 italic">+{partner.highlights.length - 4} more highlights...</li>
            )}
          </ul>
        </div>

        <Separator />

        {/* Contact Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 h-8 text-xs bg-transparent"
            onClick={() => window.open(partner.website, "_blank")}
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            Website
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 h-8 text-xs bg-transparent"
            onClick={() => window.open(`mailto:${partner.contact}`, "_blank")}
          >
            <Mail className="h-3 w-3 mr-1" />
            Contact
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

const CollapsibleSection = ({
  category,
  categoryData,
  partners: categoryPartners,
  isOpen,
  onToggle,
}: {
  category: string
  categoryData: (typeof categories)[keyof typeof categories]
  partners: typeof partners
  isOpen: boolean
  onToggle: () => void
}) => {
  return (
    <div id={category} className="scroll-mt-20">
      <div
        className={`flex items-center justify-between p-4 bg-gradient-to-r ${categoryData.color} rounded-lg cursor-pointer ${categoryData.hoverColor} transition-all duration-200 border border-gray-200`}
        onClick={onToggle}
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{categoryData.icon}</span>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{categoryData.title}</h2>
            <p className="text-gray-600 text-sm mt-0.5 hidden sm:block">{categoryData.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-white text-xs">
            {categoryPartners.length}
          </Badge>
          {isOpen ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
        </div>
      </div>

      {isOpen && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {categoryPartners.map((partner) => (
            <PartnerCard key={partner.id} partner={partner} />
          ))}
        </div>
      )}
    </div>
  )
}

const PartnersPage = () => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    conservation: true,
    lodges: false,
    reserves: false,
  })

  const toggleSection = (category: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  const expandAll = () => {
    setOpenSections({
      conservation: true,
      lodges: true,
      reserves: true,
    })
  }

  const collapseAll = () => {
    setOpenSections({
      conservation: false,
      lodges: false,
      reserves: false,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationHeader currentPage="/about/partners" />

      {/* Hero Section - Condensed */}
      <div className="bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Valued Partners</h1>
            <p className="text-lg md:text-xl text-emerald-100 mb-6 leading-relaxed">
              Collaborating with Colombia's finest conservation organizations, ecolodges, and nature reserves to deliver
              exceptional birding experiences while supporting local communities and conservation efforts.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                onClick={expandAll}
                variant="secondary"
                size="sm"
                className="bg-white/10 hover:bg-white/20 text-white border-white/20"
              >
                Expand All
              </Button>
              <Button
                onClick={collapseAll}
                variant="secondary"
                size="sm"
                className="bg-white/10 hover:bg-white/20 text-white border-white/20"
              >
                Collapse All
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Navigation - Condensed */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap justify-center gap-2">
            {Object.entries(categories).map(([key, category]) => (
              <Button
                key={key}
                variant="ghost"
                size="sm"
                onClick={() => {
                  document.getElementById(key)?.scrollIntoView({ behavior: "smooth" })
                  if (!openSections[key]) {
                    toggleSection(key)
                  }
                }}
                className="flex items-center gap-1 text-xs h-8"
              >
                <span>{category.icon}</span>
                <span className="hidden sm:inline">{category.title}</span>
                <span className="sm:hidden">{category.title.split(" ")[0]}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content - Condensed Spacing */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {Object.entries(categories).map(([categoryKey, categoryData]) => {
            const categoryPartners = partners.filter((p) => p.category === categoryKey)
            return (
              <CollapsibleSection
                key={categoryKey}
                category={categoryKey}
                categoryData={categoryData}
                partners={categoryPartners}
                isOpen={openSections[categoryKey]}
                onToggle={() => toggleSection(categoryKey)}
              />
            )
          })}
        </div>

        {/* Partnership CTA - Condensed */}
        <div className="max-w-4xl mx-auto mt-12">
          <Card className="bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl text-center text-gray-900">Interested in Partnering with AVES?</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-gray-700 text-center mb-4 text-sm leading-relaxed">
                We're always looking to collaborate with organizations that share our commitment to sustainable birding
                tourism and conservation. If you're interested in becoming a partner, we'd love to hear from you.
              </p>
              <div className="flex justify-center">
                <Button
                  className="bg-emerald-600 hover:bg-emerald-700"
                  onClick={() => window.open("/contact", "_blank")}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Get in Touch
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default PartnersPage
