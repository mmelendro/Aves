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
  Camera,
  Heart,
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
} from "lucide-react"

// Enhanced endemic species data with verified eBird links
const endemicSpeciesData = [
  // Caribe (CA) - 6 species
  {
    commonName: "Chestnut-winged Chachalaca",
    scientificName: "Ortalis garrula",
    spanishName: "Guacharaca caribeña",
    ebirdCode: "chwcha1",
    ebirdUrl: "https://ebird.org/species/chwcha1",
    regions: ["CA"],
    conservationStatus: "Least Concern",
    habitat: "Dry forests and scrublands",
    description:
      "Endemic to the Caribbean coast of Colombia, this large ground-dwelling bird is known for its loud, raucous calls at dawn and dusk.",
    elevation: "0-500m",
    bestTime: "December-April",
    imageUrl: "/placeholder.svg?height=200&width=300&text=Chestnut-winged+Chachalaca",
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
    commonName: "San Andrés Vireo",
    scientificName: "Vireo caribaeus",
    spanishName: "Verderón de San Andrés",
    ebirdCode: "sanvir1",
    ebirdUrl: "https://ebird.org/species/sanvir1",
    regions: ["CA"],
    conservationStatus: "Near Threatened",
    habitat: "Island forests and gardens",
    description:
      "Endemic to San Andrés Island, this small songbird is threatened by habitat loss and introduced species.",
    elevation: "0-100m",
    bestTime: "Year-round",
    imageUrl: "/placeholder.svg?height=200&width=300&text=San+Andres+Vireo",
  },
  {
    commonName: "Rusty-faced Parrot",
    scientificName: "Hapalopsittaca amazonina",
    spanishName: "Cotorra carirrufa",
    ebirdCode: "rufpar2",
    ebirdUrl: "https://ebird.org/species/rufpar2",
    regions: ["CA"],
    conservationStatus: "Vulnerable",
    habitat: "Cloud forests",
    description: "Medium-sized parrot found in cloud forests of the Caribbean mountains.",
    elevation: "1500-3000m",
    bestTime: "December-March",
    imageUrl: "/placeholder.svg?height=200&width=300&text=Rusty-faced+Parrot",
  },
  {
    commonName: "Santa Marta Antbird",
    scientificName: "Drymophila hellmayri",
    spanishName: "Hormiguero de Santa Marta",
    ebirdCode: "samant1",
    ebirdUrl: "https://ebird.org/species/samant1",
    regions: ["CA"],
    conservationStatus: "Endangered",
    habitat: "Cloud forest understory",
    description: "Small understory bird endemic to the Santa Marta mountains.",
    elevation: "1800-2800m",
    bestTime: "December-March",
    imageUrl: "/placeholder.svg?height=200&width=300&text=Santa+Marta+Antbird",
  },

  // Sierra Nevada de Santa Marta (SNSM) - 23 species (showing key ones)
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
    commonName: "Santa Marta Screech-Owl",
    scientificName: "Megascops gilesi",
    spanishName: "Autillo de Santa Marta",
    ebirdCode: "samsco3",
    ebirdUrl: "https://ebird.org/species/samsco3",
    regions: ["SNSM"],
    conservationStatus: "Endangered",
    habitat: "Montane forests",
    description: "Small owl endemic to Santa Marta mountains, known for its distinctive call pattern.",
    elevation: "1500-2500m",
    bestTime: "Year-round (nocturnal)",
    imageUrl: "/placeholder.svg?height=200&width=300&text=Santa+Marta+Screech-Owl",
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
    commonName: "Black-backed Thornbill",
    scientificName: "Ramphomicron dorsale",
    spanishName: "Colibrí dorsinegro",
    ebirdCode: "blbtho1",
    ebirdUrl: "https://ebird.org/species/blbtho1",
    regions: ["SNSM"],
    conservationStatus: "Critically Endangered",
    habitat: "Páramo and elfin forest",
    description: "High-altitude hummingbird specialist, critically endangered with very small population.",
    elevation: "2800-4200m",
    bestTime: "December-March",
    imageUrl: "/placeholder.svg?height=200&width=300&text=Black-backed+Thornbill",
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
    commonName: "White-tailed Starfrontlet",
    scientificName: "Coeligena phalerata",
    spanishName: "Inca coliblanco",
    ebirdCode: "whtsta3",
    ebirdUrl: "https://ebird.org/species/whtsta3",
    regions: ["SNSM"],
    conservationStatus: "Endangered",
    habitat: "Cloud forests",
    description: "Large hummingbird of cloud forests, distinguished by its white tail and iridescent plumage.",
    elevation: "1800-3000m",
    bestTime: "December-March",
    imageUrl: "/placeholder.svg?height=200&width=300&text=White-tailed+Starfrontlet",
  },
  {
    commonName: "Santa Marta Woodstar",
    scientificName: "Chaetocercus astreans",
    spanishName: "Estrellita de Santa Marta",
    ebirdCode: "samwoo1",
    ebirdUrl: "https://ebird.org/species/samwoo1",
    regions: ["SNSM"],
    conservationStatus: "Endangered",
    habitat: "Forest edges and clearings",
    description: "Tiny hummingbird with iridescent plumage, endemic to Santa Marta mountains.",
    elevation: "1200-2500m",
    bestTime: "December-March",
    imageUrl: "/placeholder.svg?height=200&width=300&text=Santa+Marta+Woodstar",
  },
  {
    commonName: "Santa Marta Sabrewing",
    scientificName: "Campylopterus phainopeplus",
    spanishName: "Ala de sable de Santa Marta",
    ebirdCode: "samsab1",
    ebirdUrl: "https://ebird.org/species/samsab1",
    regions: ["SNSM"],
    conservationStatus: "Endangered",
    habitat: "Cloud forest understory",
    description: "Large hummingbird of dense forests, known for its distinctive wing shape and powerful flight.",
    elevation: "1500-2800m",
    bestTime: "December-March",
    imageUrl: "/placeholder.svg?height=200&width=300&text=Santa+Marta+Sabrewing",
  },
  {
    commonName: "Santa Marta Wren",
    scientificName: "Troglodytes monticola",
    spanishName: "Cucarachero de Santa Marta",
    ebirdCode: "samwre1",
    ebirdUrl: "https://ebird.org/species/samwre1",
    regions: ["SNSM"],
    conservationStatus: "Endangered",
    habitat: "Dense undergrowth",
    description: "Small secretive wren endemic to Santa Marta mountains, known for its complex song.",
    elevation: "1800-3200m",
    bestTime: "December-March",
    imageUrl: "/placeholder.svg?height=200&width=300&text=Santa+Marta+Wren",
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

  // Pacific/Chocó (PC) - 2 species
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
  {
    commonName: "Baudo Oropendola",
    scientificName: "Psarocolius cassini",
    spanishName: "Oropéndola del Baudó",
    ebirdCode: "baooro1",
    ebirdUrl: "https://ebird.org/species/baooro1",
    regions: ["PC"],
    conservationStatus: "Least Concern",
    habitat: "Rainforest canopy",
    description: "Large colonial nesting bird, builds distinctive hanging nests in tall trees.",
    elevation: "0-1200m",
    bestTime: "January-March",
    imageUrl: "/placeholder.svg?height=200&width=300&text=Baudo+Oropendola",
  },

  // Amazonas (AM) - 1 species
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

  // Valle Interandino del Cauca (VIC) - 7 species
  {
    commonName: "Colombian Chachalaca",
    scientificName: "Ortalis columbiana",
    spanishName: "Guacharaca colombiana",
    ebirdCode: "colcha1",
    ebirdUrl: "https://ebird.org/species/colcha1",
    regions: ["AW", "AC", "AE", "VIC", "VIM"],
    conservationStatus: "Least Concern",
    habitat: "Dry forests and scrublands",
    description: "Large ground bird of dry areas, important seed disperser in degraded habitats.",
    elevation: "0-2000m",
    bestTime: "December-March",
    imageUrl: "/placeholder.svg?height=200&width=300&text=Colombian+Chachalaca",
  },
  {
    commonName: "Grayish Piculet",
    scientificName: "Picumnus granadensis",
    spanishName: "Carpinterito gris",
    ebirdCode: "grypic1",
    ebirdUrl: "https://ebird.org/species/grypic1",
    regions: ["VIC"],
    conservationStatus: "Least Concern",
    habitat: "Dry forests and edges",
    description: "Tiny woodpecker of dry areas, often found in mixed-species flocks.",
    elevation: "500-1800m",
    bestTime: "December-March",
    imageUrl: "/placeholder.svg?height=200&width=300&text=Grayish+Piculet",
  },
  {
    commonName: "Antioquia Bristle-Tyrant",
    scientificName: "Phylloscartes lanyoni",
    spanishName: "Tiranúelo antioqueño",
    ebirdCode: "antbty1",
    ebirdUrl: "https://ebird.org/species/antbty1",
    regions: ["VIC", "AC"],
    conservationStatus: "Endangered",
    habitat: "Cloud forest edges",
    description: "Small flycatcher of montane areas, threatened by habitat fragmentation.",
    elevation: "1800-2800m",
    bestTime: "December-March",
    imageUrl: "/placeholder.svg?height=200&width=300&text=Antioquia+Bristle-Tyrant",
  },
  {
    commonName: "Antioquia Wren",
    scientificName: "Thryophilus sernai",
    spanishName: "Cucarachero paisa",
    ebirdCode: "antwre1",
    ebirdUrl: "https://ebird.org/species/antwre1",
    regions: ["VIC"],
    conservationStatus: "Endangered",
    habitat: "Dry forest undergrowth",
    description: "Endemic wren of Cauca Valley, threatened by habitat loss and fragmentation.",
    elevation: "800-1500m",
    bestTime: "December-March",
    imageUrl: "/placeholder.svg?height=200&width=300&text=Antioquia+Wren",
  },

  // Valle Interandino del Magdalena (VIM) - 9 species
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
    commonName: "Beautiful Woodpecker",
    scientificName: "Melanerpes pulcher",
    spanishName: "Carpintero hermoso",
    ebirdCode: "beawoo1",
    ebirdUrl: "https://ebird.org/species/beawoo1",
    regions: ["VIM"],
    conservationStatus: "Near Threatened",
    habitat: "Dry forests and edges",
    description: "Striking woodpecker of dry areas, known for its beautiful plumage pattern.",
    elevation: "0-1200m",
    bestTime: "December-March",
    imageUrl: "/placeholder.svg?height=200&width=300&text=Beautiful+Woodpecker",
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
  {
    commonName: "Sooty Ant-Tanager",
    scientificName: "Habia gutturalis",
    spanishName: "Tangara hormiguera tiznada",
    ebirdCode: "soaant1",
    ebirdUrl: "https://ebird.org/species/soaant1",
    regions: ["VIM"],
    conservationStatus: "Endangered",
    habitat: "Dry forest understory",
    description: "Dark tanager of dry forests, follows army ant swarms to catch fleeing insects.",
    elevation: "200-1000m",
    bestTime: "December-March",
    imageUrl: "/placeholder.svg?height=200&width=300&text=Sooty+Ant-Tanager",
  },
  {
    commonName: "Tolima Dove",
    scientificName: "Leptotila conoveri",
    spanishName: "Tórtola tolimense",
    ebirdCode: "toldov1",
    ebirdUrl: "https://ebird.org/species/toldov1",
    regions: ["AE", "AC", "CM", "VIM"],
    conservationStatus: "Endangered",
    habitat: "Dry forests",
    description: "Ground-dwelling dove of dry forests, threatened by habitat loss and hunting.",
    elevation: "300-1800m",
    bestTime: "December-March",
    imageUrl: "/placeholder.svg?height=200&width=300&text=Tolima+Dove",
  },

  // Western Andes (AW) - Key species
  {
    commonName: "Cauca Guan",
    scientificName: "Penelope perspicax",
    spanishName: "Pava caucana",
    ebirdCode: "caugua1",
    ebirdUrl: "https://ebird.org/species/caugua1",
    regions: ["AW", "AC"],
    conservationStatus: "Endangered",
    habitat: "Cloud forests",
    description: "Large ground bird of montane forests, important seed disperser for large-seeded trees.",
    elevation: "1500-3200m",
    bestTime: "December-March",
    imageUrl: "/placeholder.svg?height=200&width=300&text=Cauca+Guan",
  },
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
  {
    commonName: "Brown-banded Antpitta",
    scientificName: "Grallaria milleri",
    spanishName: "Tororoi pardo",
    ebirdCode: "brnant1",
    ebirdUrl: "https://ebird.org/species/brnant1",
    regions: ["AC"],
    conservationStatus: "Endangered",
    habitat: "Cloud forest floor",
    description: "Secretive ground-dwelling bird, extremely difficult to observe in dense undergrowth.",
    elevation: "2000-3200m",
    bestTime: "December-March",
    imageUrl: "/placeholder.svg?height=200&width=300&text=Brown-banded+Antpitta",
  },

  // Eastern Andes (AE) - Key species
  {
    commonName: "Colombian Grebe",
    scientificName: "Podiceps andinus",
    spanishName: "Zampullín colombiano",
    ebirdCode: "colgre1",
    ebirdUrl: "https://ebird.org/species/colgre1",
    regions: ["AE"],
    conservationStatus: "Extinct",
    habitat: "High-altitude lakes",
    description:
      "Recently extinct waterbird, last confirmed sighting in 1977. Habitat loss and introduced species led to extinction.",
    elevation: "2500-3000m",
    bestTime: "Extinct since 1977",
    imageUrl: "/placeholder.svg?height=200&width=300&text=Colombian+Grebe+(Extinct)",
  },
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

  // Colombian Massif (CM) - 3 species
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

// Enhanced ecoregion data with total species counts and visual elements
const ecoregionsData = [
  {
    id: "CA",
    name: "Caribe",
    fullName: "Caribbean Coast",
    description:
      "Coastal plains, dry forests, and unique San Andrés archipelago with diverse marine and terrestrial ecosystems.",
    detailedDescription:
      "The Caribbean ecoregion encompasses Colombia's northern coast and offshore islands, featuring a mosaic of dry forests, wetlands, and marine ecosystems. The region includes the unique San Andrés and Providencia archipelago, which harbors several endemic species. Climate varies from arid to semi-humid, with distinct wet and dry seasons.",
    area: "132,000 km²",
    elevation: "0 - 500m",
    climate: "Tropical dry to semi-arid",
    bestTime: "December - April",
    color: "#3B82F6",
    gradient: "from-blue-400 to-cyan-500",
    endemicSpeciesCount: 6,
    totalSpeciesCount: 485,
    keyHabitats: ["Dry forests", "Coastal wetlands", "Island ecosystems", "Mangroves"],
    threats: ["Coastal development", "Tourism pressure", "Introduced species", "Climate change"],
    conservationStatus: "Moderately threatened",
    icon: Globe,
    primaryColor: "blue",
  },
  {
    id: "SNSM",
    name: "Sierra Nevada de Santa Marta",
    fullName: "Sierra Nevada de Santa Marta",
    description:
      "World's highest coastal mountain range with exceptional endemism per unit area, rising from sea level to 5,775m.",
    detailedDescription:
      "An isolated triangular massif rising abruptly from the Caribbean coast to snow-capped peaks. This unique geography creates extreme elevational gradients and climatic zones within short distances, resulting in the highest level of endemism per unit area of any mountain range in the world. Home to 23 endemic bird species.",
    area: "17,000 km²",
    elevation: "0 - 5,775m",
    climate: "Tropical to alpine",
    bestTime: "December - March, July - August",
    color: "#8B5CF6",
    gradient: "from-purple-500 to-indigo-600",
    endemicSpeciesCount: 23,
    totalSpeciesCount: 635,
    keyHabitats: ["Cloud forests", "Páramo", "Elfin forests", "Alpine zones"],
    threats: ["Deforestation", "Agriculture expansion", "Climate change", "Infrastructure development"],
    conservationStatus: "Highly threatened",
    icon: Mountain,
    primaryColor: "purple",
  },
  {
    id: "PC",
    name: "Pacific/Chocó",
    fullName: "Pacific Coast & Chocó",
    description:
      "World's most biodiverse rainforest per square kilometer, with exceptional rainfall and endemic species.",
    detailedDescription:
      "The Chocó biogeographic region is considered one of the world's biodiversity hotspots, receiving some of the highest rainfall on Earth. This creates lush rainforests with extraordinary species diversity and endemism. The region extends from sea level to the western slopes of the Andes.",
    area: "187,000 km²",
    elevation: "0 - 4,000m",
    climate: "Tropical rainforest",
    bestTime: "January - March, July - September",
    color: "#10B981",
    gradient: "from-emerald-500 to-green-600",
    endemicSpeciesCount: 2,
    totalSpeciesCount: 875,
    keyHabitats: ["Lowland rainforest", "Montane rainforest", "Coastal forests", "Wetlands"],
    threats: ["Deforestation", "Mining", "Palm oil plantations", "Infrastructure development"],
    conservationStatus: "Critically threatened",
    icon: TreePine,
    primaryColor: "emerald",
  },
  {
    id: "AM",
    name: "Amazonas",
    fullName: "Amazon Basin",
    description:
      "Colombia's portion of the world's largest rainforest with unique tepui formations and incredible biodiversity.",
    detailedDescription:
      "The Colombian Amazon covers nearly half the country's territory, featuring vast lowland rainforests and unique tepui formations. The region includes Chiribiquete National Park, a UNESCO World Heritage site with ancient rock art and endemic species on isolated table mountains.",
    area: "483,000 km²",
    elevation: "100 - 3,000m",
    climate: "Tropical rainforest",
    bestTime: "June - September",
    color: "#16A34A",
    gradient: "from-green-500 to-emerald-600",
    endemicSpeciesCount: 1,
    totalSpeciesCount: 1250,
    keyHabitats: ["Lowland rainforest", "Tepui summits", "River systems", "Flooded forests"],
    threats: ["Deforestation", "Cattle ranching", "Illegal mining", "Infrastructure development"],
    conservationStatus: "Moderately threatened",
    icon: TreePine,
    primaryColor: "green",
  },
  {
    id: "VIC",
    name: "Valle Interandino del Cauca",
    fullName: "Cauca Inter-Andean Valley",
    description: "Fertile valley between Western and Central Andes with critically endangered dry forest remnants.",
    detailedDescription:
      "This inter-Andean valley is one of Colombia's most densely populated and agriculturally important regions. Originally covered by dry forests, most natural habitat has been converted to agriculture and urban areas, making remaining forest fragments extremely valuable for endemic species conservation.",
    area: "22,000 km²",
    elevation: "900 - 2,000m",
    climate: "Tropical dry to humid",
    bestTime: "December - March, July - August",
    color: "#F59E0B",
    gradient: "from-amber-400 to-orange-500",
    endemicSpeciesCount: 7,
    totalSpeciesCount: 425,
    keyHabitats: ["Dry forests", "Gallery forests", "Agricultural landscapes", "Urban areas"],
    threats: ["Habitat fragmentation", "Urbanization", "Agriculture expansion", "Pollution"],
    conservationStatus: "Critically threatened",
    icon: MapPin,
    primaryColor: "amber",
  },
  {
    id: "VIM",
    name: "Valle Interandino del Magdalena",
    fullName: "Magdalena Inter-Andean Valley",
    description:
      "Colombia's principal river valley with critically endangered dry forests and high endemic bird diversity.",
    detailedDescription:
      "The Magdalena Valley is Colombia's most important river system and historically its main transportation corridor. The valley's dry forests are among the most threatened ecosystems in the country, with less than 5% of original forest cover remaining. Despite this, the region harbors numerous endemic species.",
    area: "190,000 km²",
    elevation: "0 - 1,500m",
    climate: "Tropical dry to humid",
    bestTime: "December - March, July - August",
    color: "#059669",
    gradient: "from-emerald-600 to-teal-600",
    endemicSpeciesCount: 9,
    totalSpeciesCount: 520,
    keyHabitats: ["Dry forests", "Gallery forests", "Wetlands", "Agricultural areas"],
    threats: ["Deforestation", "Agriculture", "Urbanization", "Mining"],
    conservationStatus: "Critically threatened",
    icon: MapPin,
    primaryColor: "emerald",
  },
  {
    id: "AW",
    name: "Western Andes",
    fullName: "Cordillera Occidental",
    description:
      "Western mountain range with diverse elevational zones and the highest number of endemic bird species.",
    detailedDescription:
      "The Western Andes (Cordillera Occidental) is the westernmost of Colombia's three Andean ranges. It features the greatest diversity of endemic birds, with 36 species found nowhere else. The range includes diverse habitats from cloud forests to páramo, with many species restricted to specific elevational zones.",
    area: "76,000 km²",
    elevation: "1,000 - 4,250m",
    climate: "Montane tropical",
    bestTime: "December - March, June - August",
    color: "#8B5CF6",
    gradient: "from-violet-500 to-purple-600",
    endemicSpeciesCount: 36,
    totalSpeciesCount: 785,
    keyHabitats: ["Cloud forests", "Páramo", "Elfin forests", "Montane scrub"],
    threats: ["Deforestation", "Mining", "Agriculture expansion", "Climate change"],
    conservationStatus: "Highly threatened",
    icon: Mountain,
    primaryColor: "violet",
  },
  {
    id: "AC",
    name: "Central Andes",
    fullName: "Cordillera Central",
    description:
      "Central mountain range featuring the Coffee Triangle and diverse montane ecosystems with 34 endemic species.",
    detailedDescription:
      "The Central Andes (Cordillera Central) includes Colombia's famous Coffee Triangle and harbors 34 endemic bird species. This range features the country's highest peaks and most extensive páramo ecosystems. The region's cloud forests are critical for water regulation and endemic species conservation.",
    area: "110,000 km²",
    elevation: "1,000 - 5,400m",
    climate: "Montane tropical to alpine",
    bestTime: "December - March, June - August",
    color: "#DC2626",
    gradient: "from-red-500 to-rose-600",
    endemicSpeciesCount: 34,
    totalSpeciesCount: 720,
    keyHabitats: ["Cloud forests", "Páramo", "Coffee plantations", "Alpine zones"],
    threats: ["Coffee expansion", "Urbanization", "Mining", "Climate change"],
    conservationStatus: "Highly threatened",
    icon: Mountain,
    primaryColor: "red",
  },
  {
    id: "AE",
    name: "Eastern Andes",
    fullName: "Cordillera Oriental",
    description: "Eastern mountain range including Bogotá's surroundings with extensive páramo and 20 endemic species.",
    detailedDescription:
      "The Eastern Andes (Cordillera Oriental) is the most extensive of Colombia's three Andean ranges, including the capital Bogotá and surrounding highlands. The region features extensive páramo ecosystems and high-altitude wetlands, home to 20 endemic bird species including the recently extinct Colombian Grebe.",
    area: "130,000 km²",
    elevation: "500 - 5,400m",
    climate: "Montane tropical to alpine",
    bestTime: "December - March, June - August",
    color: "#7C3AED",
    gradient: "from-purple-600 to-indigo-700",
    endemicSpeciesCount: 20,
    totalSpeciesCount: 650,
    keyHabitats: ["Cloud forests", "Páramo", "High-altitude wetlands", "Urban areas"],
    threats: ["Urbanization", "Agriculture", "Mining", "Wetland drainage"],
    conservationStatus: "Highly threatened",
    icon: Mountain,
    primaryColor: "purple",
  },
  {
    id: "CM",
    name: "Colombian Massif",
    fullName: "Macizo Colombiano",
    description: "Mountainous region where the Andes divide into three ranges, featuring unique páramo ecosystems.",
    detailedDescription:
      "The Colombian Massif is where the Andes divide into three separate ranges. This region features extensive páramo ecosystems and is the source of major rivers including the Magdalena and Cauca. Despite its small size, it harbors several endemic species adapted to high-altitude conditions.",
    area: "35,000 km²",
    elevation: "1,000 - 4,750m",
    climate: "Montane tropical to alpine",
    bestTime: "December - March, June - August",
    color: "#BE185D",
    gradient: "from-pink-600 to-rose-700",
    endemicSpeciesCount: 3,
    totalSpeciesCount: 380,
    keyHabitats: ["Páramo", "Cloud forests", "High-altitude scrub", "Alpine zones"],
    threats: ["Agriculture expansion", "Mining", "Climate change", "Infrastructure development"],
    conservationStatus: "Moderately threatened",
    icon: Mountain,
    primaryColor: "pink",
  },
  {
    id: "LL",
    name: "Llanos",
    fullName: "Llanos Orientales",
    description:
      "Vast tropical grasslands extending into Venezuela, with no endemic bird species but high overall diversity.",
    detailedDescription:
      "The Llanos are vast tropical grasslands that extend from Colombia into Venezuela. While this region doesn't harbor endemic bird species, it supports enormous populations of waterbirds and grassland specialists. The region is important for cattle ranching and oil production.",
    area: "250,000 km²",
    elevation: "100 - 500m",
    climate: "Tropical savanna",
    bestTime: "December - March",
    color: "#EAB308",
    gradient: "from-yellow-400 to-amber-500",
    endemicSpeciesCount: 0,
    totalSpeciesCount: 450,
    keyHabitats: ["Grasslands", "Gallery forests", "Wetlands", "Agricultural areas"],
    threats: ["Cattle ranching", "Oil extraction", "Agriculture expansion", "Infrastructure development"],
    conservationStatus: "Moderately threatened",
    icon: Globe,
    primaryColor: "yellow",
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

  // Generate URL for booking with pre-selected regions
  const generateBookingUrl = () => {
    const regions = species.regions.join(",")
    return `/shopping?regions=${encodeURIComponent(regions)}&species=${encodeURIComponent(species.commonName)}`
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-xl border-0 shadow-2xl">
        <DialogHeader className="pb-6">
          <DialogTitle className="text-3xl flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            <div className="bg-gradient-to-br from-emerald-500 to-blue-600 p-2 rounded-full">
              <Bird className="w-6 h-6 text-white" />
            </div>
            {species.commonName}
          </DialogTitle>
          <DialogDescription className="text-xl italic text-gray-600 font-medium">
            {species.scientificName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8">
          {/* Species Image with Enhanced Layout */}
          <div className="relative overflow-hidden rounded-2xl shadow-xl">
            <img
              src={species.imageUrl || "/placeholder.svg"}
              alt={species.commonName}
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute top-6 right-6">
              <Badge
                className={`${getConservationColor(species.conservationStatus)} flex items-center gap-2 text-sm px-4 py-2 shadow-lg`}
              >
                {getConservationIcon(species.conservationStatus)}
                {species.conservationStatus}
              </Badge>
            </div>
            <div className="absolute bottom-6 left-6 text-white">
              <div className="text-sm opacity-90 mb-1">Spanish Name</div>
              <div className="text-lg font-semibold">{species.spanishName}</div>
            </div>
          </div>

          {/* Enhanced Information Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-6 border border-emerald-100">
                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-lg">
                  <Info className="w-5 h-5 text-emerald-600" />
                  Basic Information
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-emerald-100 p-2 rounded-lg">
                      <Globe className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">eBird Code</div>
                      <div className="font-medium">{species.ebirdCode}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <MapPin className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Elevation Range</div>
                      <div className="font-medium">{species.elevation}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <Calendar className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Best Viewing Time</div>
                      <div className="font-medium">{species.bestTime}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <TreePine className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Preferred Habitat</div>
                      <div className="font-medium">{species.habitat}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-lg">
                  <MapPin className="w-5 h-5 text-purple-600" />
                  Distribution & Habitat
                </h4>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-3">Found in these ecoregions:</div>
                    <div className="flex flex-wrap gap-2">
                      {species.regions.map((regionCode) => {
                        const region = ecoregionsData.find((r) => r.id === regionCode)
                        return (
                          <Badge
                            key={regionCode}
                            className={`bg-gradient-to-r ${region?.gradient || "from-gray-400 to-gray-500"} text-white border-0 shadow-sm`}
                          >
                            {region?.name || regionCode}
                          </Badge>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Strategic CTA in Species Modal */}
              <div className="bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl p-6 text-white">
                <h4 className="font-bold mb-3 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Ready to See This Species?
                </h4>
                <p className="text-white/90 text-sm mb-4">
                  Book a tour to the{" "}
                  {species.regions.map((r) => ecoregionsData.find((reg) => reg.id === r)?.name).join(" and ")} region
                  {species.regions.length > 1 ? "s" : ""} and experience this incredible endemic species in its natural
                  habitat.
                </p>
                <Button asChild className="w-full bg-white text-emerald-600 hover:bg-gray-50 shadow-lg">
                  <a href={generateBookingUrl()}>
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Book Your Journey to See {species.commonName}
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Enhanced Description */}
          <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-8 border border-gray-100">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-xl">
              <Bird className="w-6 h-6 text-emerald-600" />
              Species Description
            </h4>
            <p className="text-gray-700 leading-relaxed text-lg">{species.description}</p>
          </div>

          {/* Enhanced Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              asChild
              className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white shadow-lg text-lg py-6"
            >
              <a href={species.ebirdUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-5 h-5 mr-3" />
                View on eBird - Photos, Sounds & Maps
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 text-lg py-6 bg-transparent"
            >
              <a href={generateBookingUrl()}>
                <ShoppingBag className="w-5 h-5 mr-3" />
                Book Tour to See This Species
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function EndemicBirdsExplorer() {
  const [selectedRegion, setSelectedRegion] = useState<string>("SNSM")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedEcoregions, setSelectedEcoregions] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<string>("common")
  const [selectedSpecies, setSelectedSpecies] = useState<(typeof endemicSpeciesData)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Filter and sort species based on current selections
  const filteredSpecies = useMemo(() => {
    let filtered = endemicSpeciesData

    // Filter by selected region (main region selector)
    if (selectedRegion) {
      filtered = filtered.filter((species) => species.regions.includes(selectedRegion))
    }

    // Filter by additional ecoregion filter
    if (selectedEcoregions.length > 0) {
      filtered = filtered.filter((species) => selectedEcoregions.some((region) => species.regions.includes(region)))
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (species) =>
          species.commonName.toLowerCase().includes(term) ||
          species.scientificName.toLowerCase().includes(term) ||
          species.spanishName.toLowerCase().includes(term),
      )
    }

    // Sort species
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "scientific":
          return a.scientificName.localeCompare(b.scientificName)
        case "conservation":
          const statusOrder = {
            Extinct: 0,
            "Critically Endangered": 1,
            Endangered: 2,
            Vulnerable: 3,
            "Near Threatened": 4,
            "Least Concern": 5,
            "Data Deficient": 6,
          }
          return (
            (statusOrder[a.conservationStatus as keyof typeof statusOrder] || 7) -
            (statusOrder[b.conservationStatus as keyof typeof statusOrder] || 7)
          )
        default:
          return a.commonName.localeCompare(b.commonName)
      }
    })

    return filtered
  }, [selectedRegion, selectedEcoregions, searchTerm, sortBy])

  const handleSpeciesClick = (species: (typeof endemicSpeciesData)[0]) => {
    setSelectedSpecies(species)
    setIsModalOpen(true)
  }

  const resetFilters = () => {
    setSearchTerm("")
    setSelectedEcoregions([])
    setSortBy("common")
  }

  const toggleEcoregionFilter = (regionId: string) => {
    setSelectedEcoregions((prev) =>
      prev.includes(regionId) ? prev.filter((id) => id !== regionId) : [...prev, regionId],
    )
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
      case "Extinct":
        return "border-l-black bg-gradient-to-r from-gray-50 to-gray-100"
      default:
        return "border-l-gray-500 bg-gradient-to-r from-gray-50 to-gray-100"
    }
  }

  const selectedRegionData = ecoregionsData.find((r) => r.id === selectedRegion)

  // Generate URL for booking with pre-selected regions
  const generateRegionBookingUrl = (regionIds: string[]) => {
    const regions = regionIds.join(",")
    return `/shopping?regions=${encodeURIComponent(regions)}`
  }

  return (
    <div className="space-y-8">
      {/* Enhanced Search and Filter Controls */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-t-xl">
          <CardTitle className="text-2xl flex items-center gap-3">
            <div className="bg-gradient-to-br from-emerald-500 to-blue-600 p-2 rounded-lg">
              <Search className="w-6 h-6 text-white" />
            </div>
            Advanced Species Search & Filter
          </CardTitle>
          <CardDescription className="text-lg">
            Search by name or filter by ecoregion. Currently showing{" "}
            <span className="font-semibold text-emerald-600">{filteredSpecies.length}</span> species.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Enhanced Search */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Search className="w-4 h-4 text-emerald-600" />
                Search Species
              </label>
              <Input
                placeholder="Common, scientific, or Spanish name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-base border-2 border-gray-200 focus:border-emerald-500 rounded-xl"
              />
            </div>

            {/* Enhanced Ecoregion Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Filter className="w-4 h-4 text-blue-600" />
                Additional Ecoregion Filters
              </label>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                {ecoregionsData
                  .filter((region) => region.endemicSpeciesCount > 0)
                  .map((region) => (
                    <Button
                      key={region.id}
                      variant="outline"
                      size="sm"
                      className={`border-2 rounded-xl text-xs ${
                        selectedEcoregions.includes(region.id)
                          ? `bg-gradient-to-r ${region.gradient} text-white border-transparent`
                          : "bg-transparent border-gray-200 text-gray-700 hover:border-gray-300"
                      }`}
                      onClick={() => toggleEcoregionFilter(region.id)}
                    >
                      {region.name} ({region.endemicSpeciesCount})
                    </Button>
                  ))}
              </div>
            </div>

            {/* Enhanced Sort */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                <SortAsc className="w-4 h-4 text-purple-600" />
                Sort By
              </label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="border-2 border-gray-200 focus:border-purple-500 rounded-xl">
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="common">📝 Common Name</SelectItem>
                  <SelectItem value="scientific">🔬 Scientific Name</SelectItem>
                  <SelectItem value="conservation">⚠️ Conservation Status</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Enhanced Reset Button and Stats */}
          <div className="mt-6 flex justify-between items-center">
            <Button
              variant="outline"
              onClick={resetFilters}
              className="border-2 hover:bg-gray-50 rounded-xl bg-transparent"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset All Filters
            </Button>
            <div className="text-base text-gray-600 bg-gray-50 px-4 py-2 rounded-xl">
              <span className="font-semibold text-emerald-600">{filteredSpecies.length}</span> of{" "}
              <span className="font-semibold">{endemicSpeciesData.length}</span> species shown
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Ecoregion Carousel */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-emerald-50 to-blue-50">
          <CardTitle className="text-2xl flex items-center gap-3">
            <div className="bg-gradient-to-br from-emerald-500 to-blue-600 p-2 rounded-lg">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            Explore Colombian Ecoregions
          </CardTitle>
          <CardDescription className="text-lg">
            Select an ecoregion to explore its endemic bird species and learn about the unique habitat.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          {/* Enhanced Region Selector */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {ecoregionsData
              .filter((region) => region.endemicSpeciesCount > 0)
              .map((region) => {
                const IconComponent = region.icon
                return (
                  <button
                    key={region.id}
                    onClick={() => setSelectedRegion(region.id)}
                    className={`p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                      selectedRegion === region.id
                        ? `bg-gradient-to-br ${region.gradient} text-white border-transparent shadow-lg`
                        : "bg-white border-gray-200 hover:border-gray-300 text-gray-700"
                    }`}
                  >
                    <div className="text-center space-y-2">
                      <div className="flex justify-center">
                        <IconComponent
                          className={`w-6 h-6 ${selectedRegion === region.id ? "text-white" : "text-gray-600"}`}
                        />
                      </div>
                      <div className="font-semibold text-sm">{region.name}</div>
                      <div className={`text-xs ${selectedRegion === region.id ? "text-white/90" : "text-gray-500"}`}>
                        {region.endemicSpeciesCount} endemic
                      </div>
                      <div className={`text-xs ${selectedRegion === region.id ? "text-white/70" : "text-gray-400"}`}>
                        {region.totalSpeciesCount} total
                      </div>
                    </div>
                  </button>
                )
              })}
          </div>

          {/* Enhanced Region Information */}
          {selectedRegionData && (
            <div className="space-y-8">
              <Card className={`bg-gradient-to-br ${selectedRegionData.gradient} text-white border-0 shadow-xl`}>
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-white/20 p-3 rounded-xl">
                      <selectedRegionData.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-3xl text-white">{selectedRegionData.fullName}</CardTitle>
                      <CardDescription className="text-white/90 text-lg">
                        {selectedRegionData.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                    <div className="text-center bg-white/20 rounded-xl p-4">
                      <div className="text-3xl font-bold text-white mb-1">{selectedRegionData.endemicSpeciesCount}</div>
                      <div className="text-sm text-white/90">Endemic Species</div>
                      <div className="text-sm text-white/70 mt-1">In this ecoregion</div>
                    </div>
                    <div className="text-center bg-white/20 rounded-xl p-4">
                      <div className="text-3xl font-bold text-white mb-1">{selectedRegionData.totalSpeciesCount}</div>
                      <div className="text-sm text-white/90">Total Species</div>
                    </div>
                    <div className="text-center bg-white/20 rounded-xl p-4">
                      <div className="text-lg font-semibold text-white mb-1">{selectedRegionData.area}</div>
                      <div className="text-sm text-white/90">Total Area</div>
                    </div>
                    <div className="text-center bg-white/20 rounded-xl p-4">
                      <div className="text-lg font-semibold text-white mb-1">{selectedRegionData.elevation}</div>
                      <div className="text-sm text-white/90">Elevation Range</div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                        <TreePine className="w-5 h-5" />
                        Key Habitats
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedRegionData.keyHabitats.map((habitat) => (
                          <Badge key={habitat} className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                            {habitat}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" />
                        Conservation Status
                      </h4>
                      <Badge className="bg-white/20 text-white border-white/30">
                        {selectedRegionData.conservationStatus}
                      </Badge>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-white/90 leading-relaxed">{selectedRegionData.detailedDescription}</p>
                  </div>

                  {/* Strategic CTA in Ecoregion Overview */}
                  <div className="bg-white/20 rounded-2xl p-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div>
                        <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                          <ShoppingBag className="w-5 h-5" />
                          Ready to Explore {selectedRegionData.name}?
                        </h4>
                        <p className="text-white/90 text-sm">
                          Book a tour to see {selectedRegionData.endemicSpeciesCount} endemic species in their natural
                          habitat.
                        </p>
                      </div>
                      <Button
                        asChild
                        className="bg-white text-emerald-600 hover:bg-gray-50 shadow-xl whitespace-nowrap"
                      >
                        <a href={generateRegionBookingUrl([selectedRegionData.id])}>
                          <ShoppingBag className="w-4 h-4 mr-2" />
                          Book {selectedRegionData.name} Tour
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Species List */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Bird className="w-7 h-7 text-emerald-600" />
                  Endemic Species in {selectedRegionData.fullName}
                  <Badge className="bg-emerald-100 text-emerald-800 text-lg px-3 py-1">{filteredSpecies.length}</Badge>
                </h3>

                {filteredSpecies.length === 0 ? (
                  <Card className="p-12 text-center bg-gradient-to-br from-gray-50 to-slate-50 border-0 shadow-lg">
                    <div className="bg-gray-100 p-4 rounded-full w-fit mx-auto mb-6">
                      <Bird className="w-12 h-12 text-gray-400" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-700 mb-4">
                      {selectedRegionData.endemicSpeciesCount === 0
                        ? "No Endemic Species"
                        : "No Species Match Your Search"}
                    </h4>
                    <p className="text-gray-500 mb-6 max-w-md mx-auto">
                      {selectedRegionData.endemicSpeciesCount === 0
                        ? "This ecoregion doesn't harbor any endemic bird species, but supports many other important species."
                        : "Try adjusting your search terms or filters to find the species you're looking for."}
                    </p>
                    {searchTerm || selectedEcoregions.length > 0 ? (
                      <Button variant="outline" onClick={resetFilters} className="rounded-xl bg-transparent">
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Clear All Filters
                      </Button>
                    ) : null}
                  </Card>
                ) : (
                  <div className="grid gap-6">
                    {filteredSpecies.map((species, index) => (
                      <Card
                        key={index}
                        className={`cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border-l-4 ${getConservationColor(
                          species.conservationStatus,
                        )} border-0 shadow-lg overflow-hidden`}
                        onClick={() => handleSpeciesClick(species)}
                      >
                        <CardContent className="p-6">
                          <div className="flex flex-col lg:flex-row gap-6">
                            <div className="lg:w-40 lg:h-32 flex-shrink-0">
                              <img
                                src={species.imageUrl || "/placeholder.svg"}
                                alt={species.commonName}
                                className="w-full h-32 object-cover rounded-xl shadow-md"
                              />
                            </div>
                            <div className="flex-1 space-y-4">
                              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                                <div>
                                  <h4 className="font-bold text-gray-900 text-xl mb-1">{species.commonName}</h4>
                                  <p className="text-gray-600 italic text-base mb-1">{species.scientificName}</p>
                                  <p className="text-gray-500 text-sm">{species.spanishName}</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                  <Badge
                                    className={`text-sm w-fit ${
                                      species.conservationStatus === "Critically Endangered"
                                        ? "bg-red-100 text-red-800 border-red-200"
                                        : species.conservationStatus === "Endangered"
                                          ? "bg-orange-100 text-orange-800 border-orange-200"
                                          : species.conservationStatus === "Vulnerable"
                                            ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                                            : species.conservationStatus === "Near Threatened"
                                              ? "bg-blue-100 text-blue-800 border-blue-200"
                                              : species.conservationStatus === "Extinct"
                                                ? "bg-black text-white"
                                                : "bg-green-100 text-green-800 border-green-200"
                                    }`}
                                  >
                                    {species.conservationStatus}
                                  </Badge>
                                </div>
                              </div>
                              <p className="text-gray-600 leading-relaxed line-clamp-2">{species.description}</p>
                              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                                <div className="flex items-center gap-2">
                                  <MapPin className="w-4 h-4 text-emerald-600" />
                                  <span className="font-medium">{species.elevation}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4 text-blue-600" />
                                  <span className="font-medium">{species.bestTime}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <TreePine className="w-4 h-4 text-green-600" />
                                  <span className="font-medium">{species.habitat}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex lg:flex-col gap-3">
                              <Button
                                size="sm"
                                variant="outline"
                                asChild
                                onClick={(e) => e.stopPropagation()}
                                className="rounded-xl"
                              >
                                <a href={species.ebirdUrl} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="w-4 h-4 mr-2" />
                                  eBird
                                </a>
                              </Button>
                              <Button
                                size="sm"
                                className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white rounded-xl"
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                Details
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Species Modal */}
      <SpeciesModal species={selectedSpecies} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Enhanced CTA Integration */}
      {filteredSpecies.length > 0 && selectedRegionData && (
        <Card className="bg-gradient-to-br from-emerald-500 via-blue-600 to-purple-700 text-white border-0 shadow-2xl overflow-hidden">
          <CardContent className="p-8 text-center relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-600/20 backdrop-blur-sm" />
            <div className="relative z-10">
              <div className="bg-white/20 p-4 rounded-full w-fit mx-auto mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Ready to See {selectedRegionData.fullName} Endemic Species?</h3>
              <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto leading-relaxed">
                Join AVES for an unforgettable birding adventure in {selectedRegionData.fullName}. Our expert guides
                know exactly where to find each endemic species and can create the perfect itinerary based on your
                target birds.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
                <div className="bg-white/20 rounded-2xl p-6">
                  <div className="text-3xl font-bold mb-2">{selectedRegionData.endemicSpeciesCount}</div>
                  <div className="text-white/90">Endemic Species</div>
                  <div className="text-sm text-white/70 mt-1">In this ecoregion</div>
                </div>
                <div className="bg-white/20 rounded-2xl p-6">
                  <div className="text-3xl font-bold mb-2">95%</div>
                  <div className="text-white/90">Success Rate</div>
                  <div className="text-sm text-white/70 mt-1">Finding target species</div>
                </div>
                <div className="bg-white/20 rounded-2xl p-6">
                  <div className="text-3xl font-bold mb-2">15+</div>
                  <div className="text-white/90">Years Experience</div>
                  <div className="text-sm text-white/70 mt-1">In this region</div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-emerald-600 hover:bg-gray-50 shadow-xl text-lg py-6 px-8 rounded-2xl"
                  asChild
                >
                  <a href={generateRegionBookingUrl([selectedRegionData.id])}>
                    <ShoppingBag className="w-5 h-5 mr-3" />
                    Plan My {selectedRegionData.name} Tour
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 text-lg py-6 px-8 rounded-2xl bg-transparent"
                  asChild
                >
                  <a href="/tours">
                    <Camera className="w-5 h-5 mr-3" />
                    View All Tours
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
