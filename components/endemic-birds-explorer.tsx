"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Bird,
  Search,
  ExternalLink,
  RotateCcw,
  MapPin,
  Calendar,
  AlertTriangle,
  Info,
  Star,
  Filter,
  SortAsc,
  Eye,
  Globe,
  TreePine,
  Mountain,
  ShoppingBag,
  BookOpen,
  ChevronRight,
  Users,
  TelescopeIcon as Binoculars,
} from "lucide-react"

// Enhanced endemic species data with verified eBird links
const endemicSpeciesData = [
  // Sierra Nevada de Santa Marta (SNSM) - 23 species (key representatives)
  {
    commonName: "Santa Marta Parakeet",
    scientificName: "Pyrrhura viridicata",
    spanishName: "Periquito de Santa Marta",
    ebirdCode: "sampar1",
    ebirdUrl: "https://ebird.org/species/sampar1",
    regions: ["SNSM"],
    conservationStatus: "Endangered",
    habitat: "Cloud forests and forest edges",
    description:
      "Colorful parakeet endemic to Sierra Nevada de Santa Marta, threatened by habitat loss and capture for pet trade.",
    elevation: "1200-2800m",
    bestTime: "December-March, July-August",
    imageUrl: "/placeholder.svg?height=200&width=300&text=Santa+Marta+Parakeet",
  },
  {
    commonName: "Santa Marta Blossomcrown",
    scientificName: "Anthocephala floriceps",
    spanishName: "Colibrí coronado de Santa Marta",
    ebirdCode: "blosac1",
    ebirdUrl: "https://ebird.org/species/blosac1",
    regions: ["SNSM"],
    conservationStatus: "Critically Endangered",
    habitat: "Cloud forest edges",
    description: "Tiny hummingbird with distinctive crown, one of the world's most endangered hummingbirds.",
    elevation: "1800-2800m",
    bestTime: "December-March",
    imageUrl: "/placeholder.svg?height=200&width=300&text=Santa+Marta+Blossomcrown",
  },
  {
    commonName: "Blue-bearded Helmetcrest",
    scientificName: "Oxypogon cyanolaemus",
    spanishName: "Colibrí crestado barbazul",
    ebirdCode: "blbhel2",
    ebirdUrl: "https://ebird.org/species/blbhel2",
    regions: ["SNSM"],
    conservationStatus: "Critically Endangered",
    habitat: "Páramo grasslands",
    description: "Distinctive páramo hummingbird with unique blue beard, extremely rare and localized.",
    elevation: "3000-4200m",
    bestTime: "December-March",
    imageUrl: "/placeholder.svg?height=200&width=300&text=Blue-bearded+Helmetcrest",
  },
  {
    commonName: "Santa Marta Warbler",
    scientificName: "Myiothlypis basilica",
    spanishName: "Reinita de Santa Marta",
    ebirdCode: "samwar1",
    ebirdUrl: "https://ebird.org/species/samwar1",
    regions: ["SNSM"],
    conservationStatus: "Endangered",
    habitat: "Cloud forest understory",
    description: "Endemic warbler of montane forests, active insectivore with distinctive plumage pattern.",
    elevation: "1500-2800m",
    bestTime: "December-March",
    imageUrl: "/placeholder.svg?height=200&width=300&text=Santa+Marta+Warbler",
  },

  // Western Andes (AW) - Key species
  {
    commonName: "Gorgeted Puffleg",
    scientificName: "Eriocnemis isabellae",
    spanishName: "Calzadito gorgiblanco",
    ebirdCode: "gorpuf1",
    ebirdUrl: "https://ebird.org/species/gorpuf1",
    regions: ["AW"],
    conservationStatus: "Critically Endangered",
    habitat: "Cloud forest edges",
    description: "Rare hummingbird with distinctive throat, one of the world's most endangered hummingbirds.",
    elevation: "1800-2800m",
    bestTime: "December-March",
    imageUrl: "/placeholder.svg?height=200&width=300&text=Gorgeted+Puffleg",
  },
  {
    commonName: "Colorful Puffleg",
    scientificName: "Eriocnemis mirabilis",
    spanishName: "Calzadito multicolor",
    ebirdCode: "colpuf1",
    ebirdUrl: "https://ebird.org/species/colpuf1",
    regions: ["AW"],
    conservationStatus: "Critically Endangered",
    habitat: "Cloud forests",
    description: "Spectacular hummingbird with iridescent plumage, extremely rare and localized.",
    elevation: "1800-2600m",
    bestTime: "December-March",
    imageUrl: "/placeholder.svg?height=200&width=300&text=Colorful+Puffleg",
  },
  {
    commonName: "Dusky Starfrontlet",
    scientificName: "Coeligena orina",
    spanishName: "Inca oscuro",
    ebirdCode: "dussta1",
    ebirdUrl: "https://ebird.org/species/dussta1",
    regions: ["AW"],
    conservationStatus: "Critically Endangered",
    habitat: "Cloud forests",
    description: "Large dark hummingbird, critically endangered with very small known population.",
    elevation: "1800-2800m",
    bestTime: "December-March",
    imageUrl: "/placeholder.svg?height=200&width=300&text=Dusky+Starfrontlet",
  },

  // Central Andes (AC) - Key species
  {
    commonName: "Indigo-winged Parrot",
    scientificName: "Hapalopsittaca fuertesi",
    spanishName: "Cotorra aliazul",
    ebirdCode: "indpar1",
    ebirdUrl: "https://ebird.org/species/indpar1",
    regions: ["AC"],
    conservationStatus: "Critically Endangered",
    habitat: "Cloud forests",
    description: "Rare montane parrot, critically endangered with fewer than 300 individuals remaining.",
    elevation: "2000-3400m",
    bestTime: "December-March",
    imageUrl: "/placeholder.svg?height=200&width=300&text=Indigo-winged+Parrot",
  },
  {
    commonName: "Buffy Helmetcrest",
    scientificName: "Oxypogon stuebelii",
    spanishName: "Colibrí crestado leonado",
    ebirdCode: "bufhel1",
    ebirdUrl: "https://ebird.org/species/bufhel1",
    regions: ["AC"],
    conservationStatus: "Endangered",
    habitat: "Páramo grasslands",
    description: "High-altitude hummingbird specialist, adapted to harsh páramo conditions.",
    elevation: "3000-4200m",
    bestTime: "December-March",
    imageUrl: "/placeholder.svg?height=200&width=300&text=Buffy+Helmetcrest",
  },

  // Eastern Andes (AE) - Key species
  {
    commonName: "Bogotá Rail",
    scientificName: "Rallus semiplumbeus",
    spanishName: "Rascón bogotano",
    ebirdCode: "bograi1",
    ebirdUrl: "https://ebird.org/species/bograi1",
    regions: ["AE"],
    conservationStatus: "Endangered",
    habitat: "Wetlands and marshes",
    description: "Secretive wetland bird, critically threatened by wetland drainage and urbanization.",
    elevation: "2500-3200m",
    bestTime: "December-March",
    imageUrl: "/placeholder.svg?height=200&width=300&text=Bogota+Rail",
  },
  {
    commonName: "Apolinar's Wren",
    scientificName: "Cistothorus apolinari",
    spanishName: "Cucarachero de Apolinar",
    ebirdCode: "aplwre1",
    ebirdUrl: "https://ebird.org/species/aplwre1",
    regions: ["AE"],
    conservationStatus: "Endangered",
    habitat: "Wetland edges",
    description: "Marsh-dwelling wren, threatened by wetland destruction around Bogotá.",
    elevation: "2500-3200m",
    bestTime: "December-March",
    imageUrl: "/placeholder.svg?height=200&width=300&text=Apolinar's+Wren",
  },

  // Caribbean Coast (CA) - Key species
  {
    commonName: "Sapphire-bellied Hummingbird",
    scientificName: "Chrysuronia lilliae",
    spanishName: "Colibrí ventriazul",
    ebirdCode: "sabehl1",
    ebirdUrl: "https://ebird.org/species/sabehl1",
    regions: ["CA"],
    conservationStatus: "Critically Endangered",
    habitat: "Dry forests and gardens",
    description:
      "Small hummingbird endemic to northern Colombia, critically endangered with fewer than 1000 individuals remaining.",
    elevation: "0-500m",
    bestTime: "December-March",
    imageUrl: "/placeholder.svg?height=200&width=300&text=Sapphire-bellied+Hummingbird",
  },
  {
    commonName: "Blue-billed Curassow",
    scientificName: "Crax alberti",
    spanishName: "Paujil piquiazul",
    ebirdCode: "blbcur1",
    ebirdUrl: "https://ebird.org/species/blbcur1",
    regions: ["CA", "VIC", "VIM"],
    conservationStatus: "Critically Endangered",
    habitat: "Humid lowland forests",
    description:
      "Large ground-dwelling bird of lowland forests, critically endangered due to habitat loss and hunting pressure.",
    elevation: "0-1000m",
    bestTime: "Year-round",
    imageUrl: "/placeholder.svg?height=200&width=300&text=Blue-billed+Curassow",
  },

  // Pacific/Chocó (PC) - Key species
  {
    commonName: "Sooty-capped Puffbird",
    scientificName: "Bucco noanamae",
    spanishName: "Buco coroninegro",
    ebirdCode: "socpuf2",
    ebirdUrl: "https://ebird.org/species/socpuf2",
    regions: ["PC"],
    conservationStatus: "Near Threatened",
    habitat: "Lowland rainforest",
    description: "Chunky bird of Pacific lowlands, sits motionless for long periods waiting for prey.",
    elevation: "0-800m",
    bestTime: "January-March, July-September",
    imageUrl: "/placeholder.svg?height=200&width=300&text=Sooty-capped+Puffbird",
  },

  // Magdalena Valley (VIM) - Key species
  {
    commonName: "White-mantled Barbet",
    scientificName: "Capito hypoleucus",
    spanishName: "Barbudo capiblanco",
    ebirdCode: "whmbab1",
    ebirdUrl: "https://ebird.org/species/whmbab1",
    regions: ["VIM"],
    conservationStatus: "Near Threatened",
    habitat: "Dry forests",
    description: "Colorful barbet of dry forests, important seed disperser for native trees.",
    elevation: "200-1500m",
    bestTime: "December-March",
    imageUrl: "/placeholder.svg?height=200&width=300&text=White-mantled+Barbet",
  },
  {
    commonName: "Niceforo's Wren",
    scientificName: "Thryophilus nicefori",
    spanishName: "Cucarachero de Nicéforo",
    ebirdCode: "nicwre1",
    ebirdUrl: "https://ebird.org/species/nicwre1",
    regions: ["AE", "VIM"],
    conservationStatus: "Endangered",
    habitat: "Dry forest undergrowth",
    description: "Secretive wren of dry forests, critically threatened by habitat loss.",
    elevation: "300-1200m",
    bestTime: "December-March",
    imageUrl: "/placeholder.svg?height=200&width=300&text=Niceforo's+Wren",
  },

  // Amazon (AM) - Key species
  {
    commonName: "Chiribiquete Emerald",
    scientificName: "Chlorostilbon olivaresi",
    spanishName: "Esmeralda de Chiribiquete",
    ebirdCode: "chroli1",
    ebirdUrl: "https://ebird.org/species/chroli1",
    regions: ["AM"],
    conservationStatus: "Data Deficient",
    habitat: "Tepui summits",
    description: "Recently discovered hummingbird from tepuis, known from very few specimens.",
    elevation: "1500-2000m",
    bestTime: "June-September",
    imageUrl: "/placeholder.svg?height=200&width=300&text=Chiribiquete+Emerald",
  },

  // Colombian Massif (CM) - Key species
  {
    commonName: "Rainbow-bearded Thornbill",
    scientificName: "Chalcostigma herrani",
    spanishName: "Colibrí barbirrainbow",
    ebirdCode: "rabtho1",
    ebirdUrl: "https://ebird.org/species/rabtho1",
    regions: ["CM"],
    conservationStatus: "Near Threatened",
    habitat: "Páramo and high-altitude scrub",
    description: "High-altitude hummingbird specialist with distinctive iridescent throat patch.",
    elevation: "3000-4500m",
    bestTime: "December-March",
    imageUrl: "/placeholder.svg?height=200&width=300&text=Rainbow-bearded+Thornbill",
  },
]

// Enhanced ecoregion data with quasi-species and semi-species counts
const ecoregionsData = [
  {
    id: "SNSM",
    name: "Sierra Nevada de Santa Marta",
    fullName: "Sierra Nevada de Santa Marta",
    description: "World's highest coastal mountain range with exceptional endemism per unit area.",
    detailedDescription:
      "An isolated triangular massif rising abruptly from the Caribbean coast to snow-capped peaks at 5,775m. This unique geography creates extreme elevational gradients and climatic zones within short distances, resulting in the highest level of endemism per unit area of any mountain range in the world.",
    area: "17,000 km²",
    elevation: "0 - 5,775m",
    climate: "Tropical to alpine",
    bestTime: "December - March, July - August",
    color: "#8B5CF6",
    gradient: "from-purple-500 to-indigo-600",
    endemicSpeciesCount: 23,
    quasiSpeciesCount: 8,
    semiSpeciesCount: 12,
    totalSpeciesCount: 635,
    keyHabitats: ["Cloud forests", "Páramo", "Elfin forests", "Alpine zones"],
    threats: ["Deforestation", "Agriculture expansion", "Climate change"],
    conservationStatus: "Highly threatened",
    icon: Mountain,
    primaryColor: "purple",
    guidebook: "Guía de las Aves de la Sierra Nevada de Santa Marta",
  },
  {
    id: "AW",
    name: "Western Andes",
    fullName: "Cordillera Occidental",
    description: "Western mountain range with the highest number of endemic bird species.",
    detailedDescription:
      "The Western Andes features the greatest diversity of endemic birds, with 36 species found nowhere else. The range includes diverse habitats from cloud forests to páramo, with many species restricted to specific elevational zones.",
    area: "76,000 km²",
    elevation: "1,000 - 4,250m",
    climate: "Montane tropical",
    bestTime: "December - March, June - August",
    color: "#8B5CF6",
    gradient: "from-violet-500 to-purple-600",
    endemicSpeciesCount: 36,
    quasiSpeciesCount: 15,
    semiSpeciesCount: 22,
    totalSpeciesCount: 785,
    keyHabitats: ["Cloud forests", "Páramo", "Elfin forests", "Montane scrub"],
    threats: ["Deforestation", "Mining", "Agriculture expansion"],
    conservationStatus: "Highly threatened",
    icon: Mountain,
    primaryColor: "violet",
    guidebook: "Aves del Occidente Colombiano",
  },
  {
    id: "AC",
    name: "Central Andes",
    fullName: "Cordillera Central",
    description: "Central mountain range featuring the Coffee Triangle and diverse montane ecosystems.",
    detailedDescription:
      "The Central Andes includes Colombia's famous Coffee Triangle and harbors 34 endemic bird species. This range features the country's highest peaks and most extensive páramo ecosystems.",
    area: "110,000 km²",
    elevation: "1,000 - 5,400m",
    climate: "Montane tropical to alpine",
    bestTime: "December - March, June - August",
    color: "#DC2626",
    gradient: "from-red-500 to-rose-600",
    endemicSpeciesCount: 34,
    quasiSpeciesCount: 18,
    semiSpeciesCount: 25,
    totalSpeciesCount: 720,
    keyHabitats: ["Cloud forests", "Páramo", "Coffee plantations", "Alpine zones"],
    threats: ["Coffee expansion", "Urbanization", "Mining"],
    conservationStatus: "Highly threatened",
    icon: Mountain,
    primaryColor: "red",
    guidebook: "Guía de las Aves de los Andes Colombianos",
  },
  {
    id: "AE",
    name: "Eastern Andes",
    fullName: "Cordillera Oriental",
    description: "Eastern mountain range including Bogotá's surroundings with extensive páramo.",
    detailedDescription:
      "The Eastern Andes is the most extensive of Colombia's three Andean ranges, including the capital Bogotá and surrounding highlands. The region features extensive páramo ecosystems and high-altitude wetlands.",
    area: "130,000 km²",
    elevation: "500 - 5,400m",
    climate: "Montane tropical to alpine",
    bestTime: "December - March, June - August",
    color: "#7C3AED",
    gradient: "from-purple-600 to-indigo-700",
    endemicSpeciesCount: 20,
    quasiSpeciesCount: 12,
    semiSpeciesCount: 16,
    totalSpeciesCount: 650,
    keyHabitats: ["Cloud forests", "Páramo", "High-altitude wetlands", "Urban areas"],
    threats: ["Urbanization", "Agriculture", "Mining"],
    conservationStatus: "Highly threatened",
    icon: Mountain,
    primaryColor: "purple",
    guidebook: "Guía de las Aves de los Andes Colombianos",
  },
  {
    id: "CA",
    name: "Caribbean Coast",
    fullName: "Caribbean Coast",
    description: "Coastal plains, dry forests, and unique San Andrés archipelago.",
    detailedDescription:
      "The Caribbean ecoregion encompasses Colombia's northern coast and offshore islands, featuring a mosaic of dry forests, wetlands, and marine ecosystems including the unique San Andrés and Providencia archipelago.",
    area: "132,000 km²",
    elevation: "0 - 500m",
    climate: "Tropical dry to semi-arid",
    bestTime: "December - April",
    color: "#3B82F6",
    gradient: "from-blue-400 to-cyan-500",
    endemicSpeciesCount: 6,
    quasiSpeciesCount: 4,
    semiSpeciesCount: 7,
    totalSpeciesCount: 485,
    keyHabitats: ["Dry forests", "Coastal wetlands", "Island ecosystems", "Mangroves"],
    threats: ["Coastal development", "Tourism pressure", "Introduced species"],
    conservationStatus: "Moderately threatened",
    icon: Globe,
    primaryColor: "blue",
    guidebook: "Guía de las Aves del Caribe Colombiano",
  },
  {
    id: "PC",
    name: "Pacific/Chocó",
    fullName: "Pacific Coast & Chocó",
    description: "World's most biodiverse rainforest per square kilometer.",
    detailedDescription:
      "The Chocó biogeographic region is considered one of the world's biodiversity hotspots, receiving some of the highest rainfall on Earth. This creates lush rainforests with extraordinary species diversity and endemism.",
    area: "187,000 km²",
    elevation: "0 - 4,000m",
    climate: "Tropical rainforest",
    bestTime: "January - March, July - September",
    color: "#10B981",
    gradient: "from-emerald-500 to-green-600",
    endemicSpeciesCount: 2,
    quasiSpeciesCount: 8,
    semiSpeciesCount: 14,
    totalSpeciesCount: 875,
    keyHabitats: ["Lowland rainforest", "Montane rainforest", "Coastal forests", "Wetlands"],
    threats: ["Deforestation", "Mining", "Palm oil plantations"],
    conservationStatus: "Critically threatened",
    icon: TreePine,
    primaryColor: "emerald",
    guidebook: "Aves del Occidente Colombiano",
  },
  {
    id: "VIM",
    name: "Magdalena Valley",
    fullName: "Magdalena Inter-Andean Valley",
    description: "Colombia's principal river valley with critically endangered dry forests.",
    detailedDescription:
      "The Magdalena Valley is Colombia's most important river system and historically its main transportation corridor. The valley's dry forests are among the most threatened ecosystems in the country.",
    area: "190,000 km²",
    elevation: "0 - 1,500m",
    climate: "Tropical dry to humid",
    bestTime: "December - March, July - August",
    color: "#059669",
    gradient: "from-emerald-600 to-teal-600",
    endemicSpeciesCount: 9,
    quasiSpeciesCount: 6,
    semiSpeciesCount: 11,
    totalSpeciesCount: 520,
    keyHabitats: ["Dry forests", "Gallery forests", "Wetlands", "Agricultural areas"],
    threats: ["Deforestation", "Agriculture", "Urbanization"],
    conservationStatus: "Critically threatened",
    icon: MapPin,
    primaryColor: "emerald",
    guidebook: "Guía de las Aves de los Andes Colombianos",
  },
  {
    id: "AM",
    name: "Amazon Basin",
    fullName: "Amazon Basin",
    description: "Colombia's portion of the world's largest rainforest with unique tepui formations.",
    detailedDescription:
      "The Colombian Amazon covers nearly half the country's territory, featuring vast lowland rainforests and unique tepui formations. The region includes Chiribiquete National Park, a UNESCO World Heritage site.",
    area: "483,000 km²",
    elevation: "100 - 3,000m",
    climate: "Tropical rainforest",
    bestTime: "June - September",
    color: "#16A34A",
    gradient: "from-green-500 to-emerald-600",
    endemicSpeciesCount: 1,
    quasiSpeciesCount: 12,
    semiSpeciesCount: 28,
    totalSpeciesCount: 1250,
    keyHabitats: ["Lowland rainforest", "Tepui summits", "River systems", "Flooded forests"],
    threats: ["Deforestation", "Cattle ranching", "Illegal mining"],
    conservationStatus: "Moderately threatened",
    icon: TreePine,
    primaryColor: "green",
    guidebook: "Aves de la Amazonia Colombiana",
  },
  {
    id: "CM",
    name: "Colombian Massif",
    fullName: "Macizo Colombiano",
    description: "Mountainous region where the Andes divide into three ranges.",
    detailedDescription:
      "The Colombian Massif is where the Andes divide into three separate ranges. This region features extensive páramo ecosystems and is the source of major rivers including the Magdalena and Cauca.",
    area: "35,000 km²",
    elevation: "1,000 - 4,750m",
    climate: "Montane tropical to alpine",
    bestTime: "December - March, June - August",
    color: "#BE185D",
    gradient: "from-pink-600 to-rose-700",
    endemicSpeciesCount: 3,
    quasiSpeciesCount: 2,
    semiSpeciesCount: 5,
    totalSpeciesCount: 380,
    keyHabitats: ["Páramo", "Cloud forests", "High-altitude scrub", "Alpine zones"],
    threats: ["Agriculture expansion", "Mining", "Climate change"],
    conservationStatus: "Moderately threatened",
    icon: Mountain,
    primaryColor: "pink",
    guidebook: "Guía de las Aves de los Andes Colombianos",
  },
  {
    id: "LL",
    name: "Llanos",
    fullName: "Llanos Orientales",
    description: "Vast tropical grasslands extending into Venezuela.",
    detailedDescription:
      "The Llanos are vast tropical grasslands that extend from Colombia into Venezuela. While this region doesn't harbor endemic bird species, it supports enormous populations of waterbirds and grassland specialists.",
    area: "250,000 km²",
    elevation: "100 - 500m",
    climate: "Tropical savanna",
    bestTime: "December - March",
    color: "#EAB308",
    gradient: "from-yellow-400 to-amber-500",
    endemicSpeciesCount: 0,
    quasiSpeciesCount: 3,
    semiSpeciesCount: 8,
    totalSpeciesCount: 450,
    keyHabitats: ["Grasslands", "Gallery forests", "Wetlands", "Agricultural areas"],
    threats: ["Cattle ranching", "Oil extraction", "Agriculture expansion"],
    conservationStatus: "Moderately threatened",
    icon: Globe,
    primaryColor: "yellow",
    guidebook: "Guía de las Aves de la Orinoquia Colombiana",
  },
]

// McMullan Birding guidebook data
const guidebookData = [
  {
    title: "Aves del Occidente Colombiano",
    subtitle: "Birds of Western Colombia Field Guide",
    description: "Comprehensive coverage of western Colombia including Pacific coast, Chocó, and Cauca Valley.",
    url: "https://mcmullanbirding.com/libros/aves-del-occidente-colombiano/",
    regions: ["PC", "AW"],
    speciesCount: "1,100+",
    gradient: "from-emerald-500 to-green-600",
    icon: TreePine,
  },
  {
    title: "Guía de las Aves de los Andes Colombianos",
    subtitle: "Guide to the Birds of the Colombian Andes",
    description: "Detailed guide to montane species across all three Andean ranges.",
    url: "https://mcmullanbirding.com/libros/guia-aves-de-los-andes-colombianos/",
    regions: ["AW", "AC", "AE", "CM"],
    speciesCount: "800+",
    gradient: "from-violet-500 to-purple-600",
    icon: Mountain,
  },
  {
    title: "Guía de las Aves del Caribe Colombiano",
    subtitle: "Guide to the Birds of the Colombian Caribbean",
    description: "Complete coverage of Caribbean coast species and island ecosystems.",
    url: "https://mcmullanbirding.com/libros/guia-aves-del-caribe-colombiano/",
    regions: ["CA"],
    speciesCount: "485+",
    gradient: "from-blue-400 to-cyan-500",
    icon: Globe,
  },
  {
    title: "Guía de las Aves de la Sierra Nevada de Santa Marta",
    subtitle: "Guide to the Birds of Sierra Nevada de Santa Marta",
    description: "Specialized guide to the world's highest coastal mountain range.",
    url: "https://mcmullanbirding.com/libros/guia-aves-de-la-sierra-nevada-de-santa-marta/",
    regions: ["SNSM"],
    speciesCount: "635+",
    gradient: "from-purple-500 to-indigo-600",
    icon: Mountain,
  },
  {
    title: "Aves de la Amazonia Colombiana",
    subtitle: "Birds of the Colombian Amazon",
    description: "Comprehensive guide to Colombia's Amazon basin and tepui formations.",
    url: "https://mcmullanbirding.com/libros/aves-de-la-amazonia-colombiana/",
    regions: ["AM"],
    speciesCount: "1,250+",
    gradient: "from-green-500 to-emerald-600",
    icon: TreePine,
  },
  {
    title: "Guía de las Aves de la Orinoquia Colombiana",
    subtitle: "Guide to the Birds of the Colombian Orinoco",
    description: "Field guide to the vast grasslands and wetlands of eastern Colombia.",
    url: "https://mcmullanbirding.com/libros/guia-aves-de-la-orinoquia-colombiana/",
    regions: ["LL"],
    speciesCount: "450+",
    gradient: "from-yellow-400 to-amber-500",
    icon: Globe,
  },
]

interface SpeciesModalProps {
  species: (typeof endemicSpeciesData)[0] | null
  isOpen: boolean
  onClose: () => void
}

function SpeciesModal({ species, isOpen, onClose }: SpeciesModalProps) {
  if (!species) return null

  const getConservationColor = (status: string) => {
    switch (status) {
      case "Critically Endangered":
        return "bg-red-100 text-red-800 border-red-200"
      case "Endangered":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Vulnerable":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Near Threatened":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Least Concern":
        return "bg-green-100 text-green-800 border-green-200"
      case "Data Deficient":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "Extinct":
        return "bg-black text-white border-black"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getConservationIcon = (status: string) => {
    switch (status) {
      case "Critically Endangered":
      case "Endangered":
      case "Extinct":
        return <AlertTriangle className="w-4 h-4" />
      case "Vulnerable":
      case "Near Threatened":
        return <Info className="w-4 h-4" />
      default:
        return <Star className="w-4 h-4" />
    }
  }

  const generateBookingUrl = () => {
    const regions = species.regions.join(",")
    return `/shopping?regions=${encodeURIComponent(regions)}&species=${encodeURIComponent(species.commonName)}`
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-xl border-0 shadow-2xl">
        <DialogHeader className="pb-6">
          <DialogTitle className="text-2xl md:text-3xl flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            <div className="bg-gradient-to-br from-emerald-500 to-blue-600 p-2 rounded-full">
              <Bird className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            {species.commonName}
          </DialogTitle>
          <DialogDescription className="text-lg md:text-xl italic text-gray-600 font-medium">
            {species.scientificName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 md:space-y-8">
          {/* Species Image */}
          <div className="relative overflow-hidden rounded-2xl shadow-xl">
            <img
              src={species.imageUrl || "/placeholder.svg"}
              alt={species.commonName}
              className="w-full h-60 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute top-4 right-4">
              <Badge
                className={`${getConservationColor(species.conservationStatus)} flex items-center gap-2 text-xs md:text-sm px-3 md:px-4 py-1 md:py-2 shadow-lg`}
              >
                {getConservationIcon(species.conservationStatus)}
                {species.conservationStatus}
              </Badge>
            </div>
            <div className="absolute bottom-4 left-4 text-white">
              <div className="text-xs md:text-sm opacity-90 mb-1">Spanish Name</div>
              <div className="text-base md:text-lg font-semibold">{species.spanishName}</div>
            </div>
          </div>

          {/* Information Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-4 md:p-6 border border-emerald-100">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-base md:text-lg">
                <Info className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />
                Basic Information
              </h4>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-100 p-2 rounded-lg">
                    <MapPin className="w-3 h-3 md:w-4 md:h-4 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-xs md:text-sm text-gray-600">Elevation Range</div>
                    <div className="font-medium text-sm md:text-base">{species.elevation}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Calendar className="w-3 h-3 md:w-4 md:h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-xs md:text-sm text-gray-600">Best Viewing Time</div>
                    <div className="font-medium text-sm md:text-base">{species.bestTime}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <TreePine className="w-3 h-3 md:w-4 md:h-4 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-xs md:text-sm text-gray-600">Preferred Habitat</div>
                    <div className="font-medium text-sm md:text-base">{species.habitat}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl p-4 md:p-6 text-white">
              <h4 className="font-bold mb-3 flex items-center gap-2 text-base md:text-lg">
                <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
                Ready to See This Species?
              </h4>
              <p className="text-white/90 text-xs md:text-sm mb-4">
                Book a tour to experience this incredible endemic species in its natural habitat with our expert guides.
              </p>
              <Button
                asChild
                className="w-full bg-white text-emerald-600 hover:bg-gray-50 shadow-lg text-sm md:text-base"
              >
                <a href={generateBookingUrl()}>
                  <ShoppingBag className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                  Book Your Journey
                </a>
              </Button>
            </div>
          </div>

          {/* Description */}
          <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-4 md:p-8 border border-gray-100">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-base md:text-xl">
              <Bird className="w-5 h-5 md:w-6 md:h-6 text-emerald-600" />
              Species Description
            </h4>
            <p className="text-gray-700 leading-relaxed text-sm md:text-lg">{species.description}</p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              asChild
              className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white shadow-lg text-sm md:text-lg py-4 md:py-6"
            >
              <a href={species.ebirdUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" />
                View on eBird
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 text-sm md:text-lg py-4 md:py-6 bg-transparent"
            >
              <a href={generateBookingUrl()}>
                <ShoppingBag className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" />
                Book Tour
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function EndemicBirdsExplorer() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRegion, setSelectedRegion] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("common")
  const [selectedSpecies, setSelectedSpecies] = useState<(typeof endemicSpeciesData)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Filter and sort species
  const filteredSpecies = useMemo(() => {
    let filtered = endemicSpeciesData

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (species) =>
          species.commonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          species.scientificName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          species.spanishName.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by region
    if (selectedRegion && selectedRegion !== "all") {
      filtered = filtered.filter((species) => species.regions.includes(selectedRegion))
    }

    // Sort species
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "scientific":
          return a.scientificName.localeCompare(b.scientificName)
        case "conservation":
          const statusOrder = [
            "Extinct",
            "Critically Endangered",
            "Endangered",
            "Vulnerable",
            "Near Threatened",
            "Least Concern",
            "Data Deficient",
          ]
          return statusOrder.indexOf(a.conservationStatus) - statusOrder.indexOf(b.conservationStatus)
        default:
          return a.commonName.localeCompare(b.commonName)
      }
    })

    return filtered
  }, [searchTerm, selectedRegion, sortBy])

  const handleSpeciesClick = (species: (typeof endemicSpeciesData)[0]) => {
    setSelectedSpecies(species)
    setIsModalOpen(true)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedRegion("all")
    setSortBy("common")
  }

  const getConservationColor = (status: string) => {
    switch (status) {
      case "Critically Endangered":
        return "border-l-red-500 bg-gradient-to-r from-red-50 to-red-100"
      case "Endangered":
        return "border-l-orange-500 bg-gradient-to-r from-orange-50 to-orange-100"
      case "Vulnerable":
        return "border-l-yellow-500 bg-gradient-to-r from-yellow-50 to-yellow-100"
      case "Near Threatened":
        return "border-l-blue-500 bg-gradient-to-r from-blue-50 to-blue-100"
      case "Least Concern":
        return "border-l-green-500 bg-gradient-to-r from-green-50 to-green-100"
      case "Data Deficient":
        return "border-l-gray-500 bg-gradient-to-r from-gray-50 to-gray-100"
      default:
        return "border-l-gray-500 bg-gradient-to-r from-gray-50 to-gray-100"
    }
  }

  const totalEndemics = ecoregionsData.reduce((sum, region) => sum + region.endemicSpeciesCount, 0)
  const totalQuasiSpecies = ecoregionsData.reduce((sum, region) => sum + region.quasiSpeciesCount, 0)
  const totalSemiSpecies = ecoregionsData.reduce((sum, region) => sum + region.semiSpeciesCount, 0)

  return (
    <div className="space-y-6 md:space-y-12">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl p-4 md:p-6 text-white text-center">
          <div className="text-2xl md:text-3xl font-bold mb-1">{totalEndemics}</div>
          <div className="text-xs md:text-sm opacity-90">Endemic Species</div>
          <div className="text-xs opacity-75 mt-1">Found nowhere else</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-4 md:p-6 text-white text-center">
          <div className="text-2xl md:text-3xl font-bold mb-1">{totalQuasiSpecies}</div>
          <div className="text-xs md:text-sm opacity-90">Quasi-species</div>
          <div className="text-xs opacity-75 mt-1">Near-endemic forms</div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-4 md:p-6 text-white text-center">
          <div className="text-2xl md:text-3xl font-bold mb-1">{totalSemiSpecies}</div>
          <div className="text-xs md:text-sm opacity-90">Semi-species</div>
          <div className="text-xs opacity-75 mt-1">Subspecies complexes</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-4 md:p-6 text-white text-center">
          <div className="text-2xl md:text-3xl font-bold mb-1">{ecoregionsData.length}</div>
          <div className="text-xs md:text-sm opacity-90">Ecoregions</div>
          <div className="text-xs opacity-75 mt-1">Distinct habitats</div>
        </div>
      </div>

      {/* Search and Filter */}
      <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="pb-4 md:pb-6">
          <CardTitle className="flex items-center gap-3 text-xl md:text-2xl">
            <div className="bg-gradient-to-br from-emerald-500 to-blue-600 p-2 rounded-lg">
              <Search className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            Explore Endemic Species
          </CardTitle>
          <CardDescription className="text-sm md:text-lg">
            Search and filter Colombia's endemic birds by name, region, or conservation status
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 md:space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
            <Input
              placeholder="Search by common name, scientific name, or Spanish name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 md:pl-12 h-12 md:h-14 text-sm md:text-lg border-2 border-gray-200 focus:border-emerald-500 rounded-xl bg-white/90"
            />
          </div>

          {/* Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="space-y-2">
              <label className="text-xs md:text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Filter className="w-3 h-3 md:w-4 md:h-4" />
                Filter by Ecoregion
              </label>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="h-10 md:h-12 border-2 border-gray-200 focus:border-emerald-500 rounded-xl bg-white/90">
                  <SelectValue placeholder="All ecoregions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All ecoregions</SelectItem>
                  {ecoregionsData
                    .filter((region) => region.endemicSpeciesCount > 0)
                    .map((region) => (
                      <SelectItem key={region.id} value={region.id}>
                        {region.name} ({region.endemicSpeciesCount} endemic
                        {region.endemicSpeciesCount !== 1 ? "s" : ""})
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs md:text-sm font-semibold text-gray-700 flex items-center gap-2">
                <SortAsc className="w-3 h-3 md:w-4 md:h-4" />
                Sort by
              </label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-10 md:h-12 border-2 border-gray-200 focus:border-emerald-500 rounded-xl bg-white/90">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="common">Common Name</SelectItem>
                  <SelectItem value="scientific">Scientific Name</SelectItem>
                  <SelectItem value="conservation">Conservation Status</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs md:text-sm font-semibold text-gray-700 flex items-center gap-2">
                <RotateCcw className="w-3 h-3 md:w-4 md:h-4" />
                Quick Actions
              </label>
              <Button
                onClick={clearFilters}
                variant="outline"
                className="w-full h-10 md:h-12 border-2 border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 rounded-xl bg-transparent"
              >
                <RotateCcw className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Results Summary */}
          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-4 md:p-6 border border-emerald-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-100 p-2 rounded-lg">
                  <Eye className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm md:text-base">
                    Showing {filteredSpecies.length} of {endemicSpeciesData.length} endemic species
                  </div>
                  {selectedRegion && selectedRegion !== "all" && (
                    <div className="text-xs md:text-sm text-gray-600">
                      Filtered by: {ecoregionsData.find((r) => r.id === selectedRegion)?.name}
                    </div>
                  )}
                </div>
              </div>
              {(searchTerm || selectedRegion !== "all") && (
                <Button onClick={clearFilters} variant="ghost" size="sm" className="text-emerald-600">
                  <RotateCcw className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                  Reset
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Species Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {filteredSpecies.map((species) => (
          <Card
            key={species.ebirdCode}
            className={`group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 md:hover:-translate-y-2 border-l-4 ${getConservationColor(
              species.conservationStatus,
            )} border-0 bg-white/90 backdrop-blur-sm overflow-hidden`}
            onClick={() => handleSpeciesClick(species)}
          >
            <div className="relative overflow-hidden">
              <img
                src={species.imageUrl || "/placeholder.svg"}
                alt={species.commonName}
                className="w-full h-40 md:h-56 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-3 md:top-4 right-3 md:right-4">
                <Badge
                  className={`${getConservationColor(species.conservationStatus)
                    .replace("bg-gradient-to-r from-", "bg-")
                    .replace(/-50 to-.*-100/, "-100")} text-xs shadow-lg`}
                >
                  {species.conservationStatus}
                </Badge>
              </div>
              <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 right-3 md:right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-xs opacity-90">Click to explore</div>
              </div>
            </div>
            <CardContent className="p-4 md:p-6">
              <div className="space-y-3 md:space-y-4">
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                    {species.commonName}
                  </h3>
                  <p className="text-xs md:text-sm italic text-gray-600 font-medium">{species.scientificName}</p>
                  <p className="text-xs md:text-sm text-gray-500">{species.spanishName}</p>
                </div>

                <div className="space-y-2 md:space-y-3">
                  <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                    <MapPin className="w-3 h-3 md:w-4 md:h-4 text-emerald-600" />
                    <span>{species.elevation}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                    <Calendar className="w-3 h-3 md:w-4 md:h-4 text-blue-600" />
                    <span>{species.bestTime}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-semibold text-gray-700">Found in:</div>
                  <div className="flex flex-wrap gap-1">
                    {species.regions.slice(0, 2).map((regionCode) => {
                      const region = ecoregionsData.find((r) => r.id === regionCode)
                      return (
                        <Badge
                          key={regionCode}
                          variant="secondary"
                          className={`text-xs bg-gradient-to-r ${region?.gradient || "from-gray-400 to-gray-500"} text-white border-0`}
                        >
                          {region?.name || regionCode}
                        </Badge>
                      )
                    })}
                    {species.regions.length > 2 && (
                      <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                        +{species.regions.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>

                <p className="text-xs md:text-sm text-gray-600 line-clamp-2 md:line-clamp-3">{species.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results State */}
      {filteredSpecies.length === 0 && (
        <Card className="text-center py-12 md:py-16 border-0 bg-white/80 backdrop-blur-sm shadow-xl">
          <CardContent>
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
              <Search className="w-8 h-8 md:w-10 md:h-10 text-gray-400" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">No species found</h3>
            <p className="text-gray-600 mb-4 md:mb-6 max-w-md mx-auto text-sm md:text-base">
              Try adjusting your search terms or filters to find the endemic species you're looking for.
            </p>
            <Button onClick={clearFilters} className="bg-emerald-600 hover:bg-emerald-700">
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Ecoregions Overview */}
      <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl md:text-2xl">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg">
              <Globe className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            Colombian Ecoregions
          </CardTitle>
          <CardDescription className="text-sm md:text-lg">
            Explore the diverse ecosystems that harbor Colombia's endemic bird species
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {ecoregionsData
              .filter((region) => region.endemicSpeciesCount > 0)
              .map((region) => {
                const IconComponent = region.icon
                return (
                  <Card
                    key={region.id}
                    className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 bg-white/90 backdrop-blur-sm overflow-hidden"
                    onClick={() => setSelectedRegion(region.id)}
                  >
                    <div className={`h-1 md:h-2 bg-gradient-to-r ${region.gradient}`}></div>
                    <CardContent className="p-4 md:p-6">
                      <div className="space-y-3 md:space-y-4">
                        <div className="flex items-start gap-3 md:gap-4">
                          <div className={`bg-gradient-to-br ${region.gradient} p-2 md:p-3 rounded-lg shadow-md`}>
                            <IconComponent className="w-4 h-4 md:w-6 md:h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900 text-sm md:text-lg group-hover:text-emerald-600 transition-colors">
                              {region.name}
                            </h4>
                            <p className="text-xs md:text-sm text-gray-600 font-medium">{region.fullName}</p>
                          </div>
                        </div>

                        <p className="text-xs md:text-sm text-gray-700 leading-relaxed line-clamp-2 md:line-clamp-3">
                          {region.description}
                        </p>

                        <div className="grid grid-cols-3 gap-2 md:gap-4 text-center">
                          <div className="bg-emerald-50 rounded-lg p-2 md:p-3">
                            <div className="text-lg md:text-2xl font-bold text-emerald-600">
                              {region.endemicSpeciesCount}
                            </div>
                            <div className="text-xs text-emerald-700">Endemic</div>
                          </div>
                          <div className="bg-purple-50 rounded-lg p-2 md:p-3">
                            <div className="text-lg md:text-2xl font-bold text-purple-600">
                              {region.quasiSpeciesCount}
                            </div>
                            <div className="text-xs text-purple-700">Quasi</div>
                          </div>
                          <div className="bg-blue-50 rounded-lg p-2 md:p-3">
                            <div className="text-lg md:text-2xl font-bold text-blue-600">{region.semiSpeciesCount}</div>
                            <div className="text-xs text-blue-700">Semi</div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="text-xs font-semibold text-gray-700">Key Information:</div>
                          <div className="grid grid-cols-1 gap-1 text-xs text-gray-600">
                            <div className="flex justify-between">
                              <span>Total Species:</span>
                              <span className="font-medium">{region.totalSpeciesCount}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Elevation:</span>
                              <span className="font-medium">{region.elevation}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Best Time:</span>
                              <span className="font-medium">{region.bestTime}</span>
                            </div>
                          </div>
                        </div>

                        <Button
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedRegion(region.id)
                          }}
                          className={`w-full bg-gradient-to-r ${region.gradient} hover:opacity-90 text-white shadow-md text-xs md:text-sm`}
                        >
                          <Filter className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                          View Species
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
          </div>
        </CardContent>
      </Card>

      {/* McMullan Birding Guidebooks */}
      <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl md:text-2xl">
            <div className="bg-gradient-to-br from-orange-500 to-red-600 p-2 rounded-lg">
              <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            McMullan Birding Field Guides
          </CardTitle>
          <CardDescription className="text-sm md:text-lg">
            Comprehensive field guides covering all Colombian ecoregions with detailed species accounts including
            quasi-species and semi-species
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {guidebookData.map((guide) => {
              const IconComponent = guide.icon
              return (
                <Card
                  key={guide.title}
                  className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 bg-white/90 backdrop-blur-sm overflow-hidden"
                >
                  <div className={`h-1 md:h-2 bg-gradient-to-r ${guide.gradient}`}></div>
                  <CardContent className="p-4 md:p-6">
                    <div className="space-y-3 md:space-y-4">
                      <div className="flex items-start gap-3 md:gap-4">
                        <div className={`bg-gradient-to-br ${guide.gradient} p-2 md:p-3 rounded-lg shadow-md`}>
                          <IconComponent className="w-4 h-4 md:w-6 md:h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 text-sm md:text-base group-hover:text-emerald-600 transition-colors leading-tight">
                            {guide.title}
                          </h4>
                          <p className="text-xs md:text-sm text-gray-600 font-medium italic">{guide.subtitle}</p>
                        </div>
                      </div>

                      <p className="text-xs md:text-sm text-gray-700 leading-relaxed">{guide.description}</p>

                      <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg p-3 md:p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-gray-700">Coverage:</span>
                          <span className="text-xs font-bold text-emerald-600">{guide.speciesCount} species</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {guide.regions.map((regionCode) => {
                            const region = ecoregionsData.find((r) => r.id === regionCode)
                            return (
                              <Badge
                                key={regionCode}
                                variant="secondary"
                                className="text-xs bg-gray-100 text-gray-700 border border-gray-200"
                              >
                                {region?.name || regionCode}
                              </Badge>
                            )
                          })}
                        </div>
                      </div>

                      <Button
                        asChild
                        className={`w-full bg-gradient-to-r ${guide.gradient} hover:opacity-90 text-white shadow-md text-xs md:text-sm`}
                      >
                        <a href={guide.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                          View Guide Details
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="shadow-xl border-0 bg-gradient-to-br from-emerald-500 via-blue-600 to-purple-700 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-black/20"></div>
        <CardContent className="relative p-6 md:p-12 text-center">
          <div className="max-w-4xl mx-auto space-y-4 md:space-y-8">
            <div className="space-y-3 md:space-y-4">
              <h2 className="text-2xl md:text-4xl font-bold">Ready to Experience Colombia's Endemic Birds?</h2>
              <p className="text-base md:text-xl opacity-90 leading-relaxed">
                Join our expert-guided tours to witness these incredible species in their natural habitats. From the
                cloud forests of the Andes to the rainforests of the Chocó, discover the birds found nowhere else on
                Earth.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 text-center">
              <div className="space-y-2">
                <div className="bg-white/20 rounded-full p-3 md:p-4 w-fit mx-auto">
                  <Users className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <div className="text-sm md:text-lg font-semibold">Expert Local Guides</div>
                <div className="text-xs md:text-sm opacity-80">
                  Learn from passionate birders who know every call and habitat
                </div>
              </div>
              <div className="space-y-2">
                <div className="bg-white/20 rounded-full p-3 md:p-4 w-fit mx-auto">
                  <Binoculars className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <div className="text-sm md:text-lg font-semibold">Premium Equipment</div>
                <div className="text-xs md:text-sm opacity-80">
                  High-quality optics and field guides for the best experience
                </div>
              </div>
              <div className="space-y-2">
                <div className="bg-white/20 rounded-full p-3 md:p-4 w-fit mx-auto">
                  <TreePine className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <div className="text-sm md:text-lg font-semibold">Conservation Focus</div>
                <div className="text-xs md:text-sm opacity-80">
                  Support local communities and bird conservation efforts
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-emerald-600 hover:bg-gray-50 shadow-xl text-sm md:text-lg px-6 md:px-8 py-3 md:py-4"
              >
                <a href="/shopping">
                  <ShoppingBag className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" />
                  Book Your Adventure
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-emerald-600 bg-transparent text-sm md:text-lg px-6 md:px-8 py-3 md:py-4"
              >
                <a href="/tours">
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" />
                  Explore Tours
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Species Modal */}
      <SpeciesModal species={selectedSpecies} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}

export default EndemicBirdsExplorer
