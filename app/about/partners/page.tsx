"use client"

import { useState } from "react"
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Calendar,
  MapPin,
  Mountain,
  Globe,
  Instagram,
  Facebook,
  Building2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import OptimizedImage from "@/components/optimized-image"

const partners = [
  {
    id: "fundacion-proaves",
    name: "Fundación ProAves",
    type: "Conservation Organization",
    location: "Colombia",
    description:
      "Colombia's leading conservation organization dedicated to protecting birds and their habitats. ProAves manages numerous reserves across the country, conducting vital conservation research, habitat protection, and community engagement programs. They are pioneers in bird conservation in Colombia with over 25 years of experience.",
    specialties: [
      "Bird Conservation",
      "Habitat Preservation",
      "Research",
      "Community Engagement",
      "Reserve Management",
    ],
    website: "https://proaves.org/",
    socialMedia: {
      facebook: "https://www.facebook.com/ProAves",
      instagram: "https://www.instagram.com/proaves_colombia/",
    },
    established: "1998",
    area: "Multiple reserves nationwide",
    elevation: "Sea level to 4,000m",
    highlights: [
      "Over 25 years of conservation experience",
      "Manages 30+ nature reserves",
      "Protects 78+ endemic bird species",
      "Community-based conservation programs",
      "Scientific research and monitoring",
      "Environmental education initiatives",
    ],
    category: "conservation",
    logo: "/images/partners/proaves.gif",
    tags: ["Endemic Species", "Research", "Community Conservation", "Multiple Reserves"],
  },
  {
    id: "proaves-el-dorado-reserve",
    name: "ProAves El Dorado Reserve",
    type: "Bird Reserve",
    location: "Sierra Nevada de Santa Marta",
    description:
      "The crown jewel of ProAves reserves, El Dorado is home to over 20 endemic bird species found nowhere else on Earth. Located in the Sierra Nevada de Santa Marta, this reserve offers world-class birding opportunities and comfortable accommodations for researchers and birders alike.",
    specialties: ["Endemic Birds", "Research Station", "Birding Tours", "Scientific Research", "Photography"],
    website: "https://proaves.org/el-dorado/",
    parentOrganization: {
      name: "Fundación ProAves",
      website: "https://proaves.org/",
    },
    established: "2006",
    area: "1,200 hectares",
    elevation: "1,800-2,600m",
    highlights: [
      "20+ endemic bird species",
      "Santa Marta Parakeet breeding site",
      "Research station facilities",
      "Comfortable eco-lodge accommodation",
      "Professional birding guides",
      "Photography blinds and feeders",
    ],
    category: "reserves",
    logo: "/images/partners/el-dorado.png",
    tags: ["Endemics", "Sierra Nevada", "Research", "Accommodation"],
  },
  {
    id: "montezuma-rainforest-lodge",
    name: "Montezuma Rainforest Lodge",
    type: "Ecolodge",
    location: "El Cairo, Valle del Cauca",
    description:
      "Nestled in the heart of the Chocó biogeographic region, Montezuma Rainforest Lodge provides exclusive access to some of the most biodiverse habitats on Earth. This family-owned lodge combines comfort with conservation, offering incredible birding and wildlife viewing in pristine rainforest settings.",
    specialties: ["Chocó Endemics", "Rainforest Birding", "Wildlife Observation", "Hiking", "Night Birding"],
    website: "https://montezumarainforest.com/",
    socialMedia: {
      instagram: "https://www.instagram.com/montezumarainforest/",
    },
    established: "2005",
    area: "Private rainforest reserve",
    elevation: "1,300-1,800m",
    highlights: [
      "Chocó endemic bird species",
      "Pristine rainforest habitat",
      "Professional naturalist guides",
      "Comfortable eco-lodge facilities",
      "Night birding opportunities",
      "Wildlife photography",
    ],
    category: "lodges",
    logo: "/images/partners/montezuma.webp",
    tags: ["Chocó Endemics", "Rainforest", "Wildlife", "Night Birding"],
  },
  {
    id: "hacienda-el-bosque",
    name: "Hacienda El Bosque",
    type: "Eco-Hacienda",
    location: "Colombia",
    description:
      "A traditional Colombian hacienda transformed into an eco-friendly birding destination. Hacienda El Bosque offers authentic cultural experiences combined with excellent birding opportunities in diverse habitats including coffee plantations, secondary forest, and wetlands.",
    specialties: ["Coffee Plantation Birding", "Cultural Tourism", "Wetland Birds", "Traditional Architecture"],
    website: "https://haciendaelbosque.com/",
    established: "2010",
    area: "Traditional hacienda with diverse habitats",
    elevation: "1,200-1,600m",
    highlights: [
      "Coffee plantation birding",
      "Traditional Colombian architecture",
      "Wetland bird species",
      "Cultural immersion experiences",
      "Sustainable agriculture practices",
      "Local community involvement",
    ],
    category: "lodges",
    logo: "/images/partners/hacienda-el-bosque.png",
    tags: ["Coffee Plantation", "Cultural", "Wetlands", "Sustainable"],
  },
  {
    id: "fundacion-selva",
    name: "Fundación Selva",
    type: "Conservation Foundation",
    location: "Colombia",
    description:
      "Dedicated to the conservation of Colombia's tropical forests and their biodiversity. Fundación Selva works on habitat protection, research, and community-based conservation programs, with a special focus on forest bird species and their ecosystems.",
    specialties: ["Forest Conservation", "Biodiversity Research", "Community Programs", "Habitat Protection"],
    website: "https://selva.org.co/",
    socialMedia: {
      facebook: "https://www.facebook.com/FundacionSelva",
      instagram: "https://www.instagram.com/fundacion_selva/",
    },
    established: "2008",
    area: "Multiple forest conservation projects",
    elevation: "Varies by project",
    highlights: [
      "Tropical forest conservation",
      "Biodiversity research programs",
      "Community-based initiatives",
      "Habitat restoration projects",
      "Environmental education",
      "Scientific publications",
    ],
    category: "conservation",
    logo: "/images/partners/logo-selva.png",
    tags: ["Forest Conservation", "Research", "Community", "Restoration"],
  },
  {
    id: "refugio-la-esmeralda",
    name: "Refugio La Esmeralda",
    type: "Mountain Refuge",
    location: "Colombian Andes",
    description:
      "A high-altitude mountain refuge offering access to Andean bird species and spectacular mountain scenery. Refugio La Esmeralda provides rustic but comfortable accommodation for birders seeking high-elevation species in pristine montane environments.",
    specialties: ["High-altitude Birding", "Andean Species", "Mountain Hiking", "Photography"],
    website: "https://www.chec.com.co/",
    socialMedia: {
      instagram: "https://www.instagram.com/refugiolaesmeraldaoficial/",
    },
    parentOrganization: {
      name: "CHEC (Central Hidroeléctrica de Caldas)",
      website: "https://www.chec.com.co/",
    },
    established: "2012",
    area: "High-altitude mountain refuge",
    elevation: "3,200-3,800m",
    highlights: [
      "High-altitude bird species",
      "Spectacular mountain views",
      "Andean endemic species",
      "Photography opportunities",
      "Hiking trails",
      "Rustic mountain accommodation",
    ],
    category: "lodges",
    logo: "/images/partners/refugio-la-esmeralda.png",
    tags: ["High Altitude", "Andean Species", "Photography", "Hiking"],
  },
  {
    id: "finca-suasie",
    name: "Finca Suasie",
    type: "Private Reserve",
    location: "Colombia",
    description:
      "A private farm dedicated to sustainable agriculture and bird conservation. Finca Suasie demonstrates how agricultural practices can coexist with wildlife conservation, offering birding opportunities in a working farm environment with diverse habitats.",
    specialties: ["Sustainable Agriculture", "Farm Birding", "Habitat Diversity", "Conservation Education"],
    socialMedia: {
      instagram: "https://www.instagram.com/finca_suasie/",
    },
    isPrivateReserve: true,
    established: "2015",
    area: "Private farm with conservation areas",
    elevation: "1,000-1,400m",
    highlights: [
      "Sustainable farming practices",
      "Diverse bird habitats",
      "Agricultural birding",
      "Conservation education",
      "Habitat restoration",
      "Community involvement",
    ],
    category: "reserves",
    logo: "/images/partners/finca-suasie.png",
    tags: ["Private Reserve", "Sustainable Agriculture", "Farm Birding", "Education"],
  },
  {
    id: "termales-del-ruiz",
    name: "Termales del Ruiz",
    type: "Thermal Resort & Reserve",
    location: "Manizales, Caldas",
    description:
      "A renowned ecotourism destination in the Central Andes, famous for its spectacular hummingbird feeders and pristine paramo ecosystem. Termales del Ruiz offers comfortable lodging, natural hot springs, and world-class birdwatching opportunities in one of Colombia's most scenic locations.",
    specialties: ["Hummingbird Photography", "Paramo Birding", "Thermal Baths", "High-altitude Species"],
    website: "https://termalesdelruiz.com/",
    socialMedia: {
      facebook: "https://www.facebook.com/TermalesdelRuiz",
      instagram: "https://www.instagram.com/termalesdelruiz/",
    },
    established: "1984",
    area: "Paramo ecosystem reserve",
    elevation: "3,400m",
    highlights: [
      "World-famous hummingbird feeders",
      "Natural thermal hot springs",
      "Paramo ecosystem birding",
      "High-altitude species",
      "Photography opportunities",
      "Comfortable accommodation",
    ],
    category: "lodges",
    logo: "/images/partners/termales-del-ruiz.png",
    tags: ["Hummingbirds", "Hot Springs", "Paramo", "Photography"],
  },
  {
    id: "reserva-rio-blanco",
    name: "Reserva Río Blanco",
    type: "Cloud Forest Reserve",
    location: "Manizales, Caldas",
    description:
      "A pristine cloud forest reserve in the Central Andes, home to spectacular endemic birds including the famous Chestnut-crowned Antpitta and Black-billed Mountain-Toucan. This protected area offers exceptional birding opportunities in montane ecosystems with well-maintained trails and research facilities.",
    specialties: ["Cloud Forest Birds", "Antpitta Feeding", "Mountain-Toucan", "Research Station"],
    website: "https://reservarioblanco.co/",
    established: "1985",
    area: "4,932 hectares",
    elevation: "2,150-2,800m",
    highlights: [
      "Chestnut-crowned Antpitta feeding station",
      "Black-billed Mountain-Toucan",
      "Cloud forest ecosystem",
      "Research station facilities",
      "Well-maintained trails",
      "Endemic bird photography",
    ],
    category: "reserves",
    logo: "/placeholder.svg?height=80&width=120&text=Rio+Blanco",
    tags: ["Cloud Forest", "Antpitta", "Mountain-Toucan", "Research"],
  },
  {
    id: "reserva-sutu",
    name: "Reserva Sutu",
    type: "Private Nature Reserve",
    location: "Colombia",
    description:
      "A private nature reserve dedicated to bird conservation and sustainable ecotourism. Reserva Sutu offers pristine habitats and excellent birding opportunities while supporting local conservation efforts and community development programs.",
    specialties: ["Private Reserve", "Conservation", "Ecotourism", "Community Development"],
    socialMedia: {
      facebook: "https://www.facebook.com/reservasutu/",
      instagram: "https://www.instagram.com/reservasutu/",
    },
    isPrivateReserve: true,
    established: "2018",
    area: "Private nature reserve",
    elevation: "1,500-2,200m",
    highlights: [
      "Private conservation area",
      "Sustainable ecotourism",
      "Community development",
      "Bird conservation programs",
      "Habitat protection",
      "Environmental education",
    ],
    category: "reserves",
    logo: "/placeholder.svg?height=80&width=120&text=Sutu",
    tags: ["Private Reserve", "Conservation", "Community", "Ecotourism"],
  },
  {
    id: "jardin-de-rocas",
    name: "Jardín de Rocas",
    type: "Ecolodge & Nature Reserve",
    location: "Central Andes, Colombia",
    description:
      "A premier ecolodge and nature reserve specializing in cloud forest birding experiences. Jardín de Rocas offers exceptional opportunities to observe spectacular Neotropical species including the iconic Andean Cock-of-the-rock in their natural habitat. The lodge combines comfortable accommodation with expert guiding services in pristine montane forest environments.",
    specialties: ["Cock-of-the-rock", "Cloud Forest Birding", "Montane Species", "Photography", "Expert Guiding"],
    website: "https://www.jardinderocas.org/",
    socialMedia: {
      instagram: "https://www.instagram.com/jardinderocas/",
    },
    established: "2010",
    area: "Private cloud forest reserve",
    elevation: "1,400 - 2,400m",
    highlights: [
      "Andean Cock-of-the-rock observation",
      "Cloud forest ecosystem",
      "Expert naturalist guides",
      "Photography opportunities",
      "Comfortable ecolodge facilities",
      "Montane forest species diversity",
    ],
    category: "lodges",
    logo: "/placeholder.svg?height=80&width=120&text=Jardin+Rocas",
    tags: ["Cock-of-the-rock", "Cloud Forest", "Photography", "Expert Guides"],
  },
]

const categories = {
  conservation: {
    title: "Conservation Organizations",
    description: "Leading foundations and organizations dedicated to bird conservation and habitat protection",
    icon: "🦅",
    color: "from-emerald-50 to-green-50",
    hoverColor: "hover:from-emerald-100 hover:to-green-100",
  },
  lodges: {
    title: "Ecolodges & Accommodations",
    description: "Premium lodges and eco-resorts offering exceptional birding experiences with comfortable stays",
    icon: "🏨",
    color: "from-blue-50 to-cyan-50",
    hoverColor: "hover:from-blue-100 hover:to-cyan-100",
  },
  reserves: {
    title: "Nature Reserves & Protected Areas",
    description: "Protected areas and private reserves providing access to pristine habitats and endemic species",
    icon: "🌲",
    color: "from-green-50 to-emerald-50",
    hoverColor: "hover:from-green-100 hover:to-emerald-100",
  },
}

const PartnerCard = ({ partner }: { partner: (typeof partners)[0] }) => {
  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "instagram":
        return <Instagram className="h-3 w-3" />
      case "facebook":
        return <Facebook className="h-3 w-3" />
      default:
        return <ExternalLink className="h-3 w-3" />
    }
  }

  return (
    <Card
      id={partner.id}
      className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md scroll-mt-24"
    >
      <CardHeader className="pb-3">
        <div className="flex items-start gap-4 mb-3">
          <div className="flex-shrink-0 flex items-center justify-center">
            <OptimizedImage
              src={partner.logo}
              alt={`${partner.name} logo`}
              width={100}
              height={75}
              className="w-24 h-18 object-contain rounded-lg bg-white p-3 border shadow-sm"
              style={{
                maxWidth: "96px",
                maxHeight: "72px",
                minWidth: "96px",
                minHeight: "72px",
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">
              <a href={`#${partner.id}`} className="hover:text-emerald-600 transition-colors">
                {partner.name}
              </a>
            </CardTitle>
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

        {/* Parent Organization or Private Reserve Badge */}
        {partner.parentOrganization && (
          <div className="mb-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 text-sm text-blue-800">
              <Building2 className="h-4 w-4 flex-shrink-0" />
              <span className="font-medium">Owned by:</span>
              <a
                href={partner.parentOrganization.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline font-semibold"
              >
                {partner.parentOrganization.name}
              </a>
            </div>
          </div>
        )}

        {partner.isPrivateReserve && (
          <div className="mb-3">
            <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200 font-medium">
              Private Reserve
            </Badge>
          </div>
        )}

        <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">{partner.description}</p>
      </CardHeader>

      <CardContent className="pt-0 space-y-4">
        {/* Tags */}
        <div>
          <div className="flex flex-wrap gap-1.5">
            {partner.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs px-2 py-1 font-medium">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Location Details */}
        <div className="grid grid-cols-1 gap-2 text-xs bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center gap-2">
            <Globe className="h-3 w-3 text-gray-500 flex-shrink-0" />
            <span className="font-medium text-gray-700">Area:</span>
            <span className="text-gray-600 truncate">{partner.area}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mountain className="h-3 w-3 text-gray-500 flex-shrink-0" />
            <span className="font-medium text-gray-700">Elevation:</span>
            <span className="text-gray-600">{partner.elevation}</span>
          </div>
        </div>

        {/* Key Highlights */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Key Highlights</h4>
          <ul className="space-y-1.5 max-h-28 overflow-y-auto">
            {partner.highlights.slice(0, 4).map((highlight, index) => (
              <li key={index} className="text-xs text-gray-600 flex items-start gap-2">
                <span className="text-emerald-500 mt-0.5 flex-shrink-0 font-bold">•</span>
                <span className="line-clamp-1">{highlight}</span>
              </li>
            ))}
            {partner.highlights.length > 4 && (
              <li className="text-xs text-gray-500 italic">+{partner.highlights.length - 4} more highlights...</li>
            )}
          </ul>
        </div>

        <Separator />

        {/* Website and Social Media Links */}
        <div className="flex gap-2 flex-wrap">
          {partner.website && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 min-w-0 h-9 text-xs bg-transparent hover:bg-gray-50 font-medium"
              onClick={() => window.open(partner.website, "_blank")}
            >
              <ExternalLink className="h-3 w-3 mr-1.5" />
              Website
            </Button>
          )}
          {partner.socialMedia && (
            <div className="flex gap-1.5">
              {Object.entries(partner.socialMedia).map(([platform, url]) => (
                <Button
                  key={platform}
                  variant="outline"
                  size="sm"
                  className="h-9 w-9 p-0 bg-transparent hover:bg-gray-50"
                  onClick={() => window.open(url, "_blank")}
                  title={`Visit ${platform}`}
                >
                  {getSocialIcon(platform)}
                </Button>
              ))}
            </div>
          )}
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
    <div id={`${category}-section`} className="scroll-mt-20">
      <div
        className={`flex items-center justify-between p-4 bg-gradient-to-r ${categoryData.color} rounded-lg cursor-pointer ${categoryData.hoverColor} transition-all duration-200 border border-gray-200 shadow-sm`}
        onClick={onToggle}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{categoryData.icon}</span>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{categoryData.title}</h2>
            <p className="text-gray-600 text-sm mt-0.5 hidden sm:block">{categoryData.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-white text-xs font-medium px-2 py-1">
            {categoryPartners.length}
          </Badge>
          {isOpen ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
        </div>
      </div>

      {isOpen && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
    lodges: true,
    reserves: true,
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

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Valued Partners</h1>
            <p className="text-xl md:text-2xl text-emerald-100 mb-8 leading-relaxed">
              Collaborating with Colombia's finest conservation organizations, ecolodges, and nature reserves to deliver
              exceptional birding experiences while supporting local communities and conservation efforts.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={expandAll}
                variant="secondary"
                size="lg"
                className="bg-white/10 hover:bg-white/20 text-white border-white/20 font-medium"
              >
                Expand All Sections
              </Button>
              <Button
                onClick={collapseAll}
                variant="secondary"
                size="lg"
                className="bg-white/10 hover:bg-white/20 text-white border-white/20 font-medium"
              >
                Collapse All Sections
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap justify-center gap-3">
            {Object.entries(categories).map(([key, category]) => (
              <Button
                key={key}
                variant="ghost"
                size="sm"
                onClick={() => {
                  document.getElementById(`${key}-section`)?.scrollIntoView({ behavior: "smooth" })
                  if (!openSections[key]) {
                    toggleSection(key)
                  }
                }}
                className="flex items-center gap-2 text-sm h-10 px-4 font-medium hover:bg-gray-100"
              >
                <span className="text-lg">{category.icon}</span>
                <span className="hidden sm:inline">{category.title}</span>
                <span className="sm:hidden">{category.title.split(" ")[0]}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto space-y-8">
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
      </div>

      <Footer />
    </div>
  )
}

export default PartnersPage
