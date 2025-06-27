"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MapPin, Bird, Search, ExternalLink, RotateCcw, Camera, Heart } from "lucide-react"

// Endemic species data with ecoregion distribution
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
    description: "Endemic to the Caribbean coast of Colombia",
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
    description: "Large ground-dwelling bird of lowland forests",
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
    description: "Small hummingbird endemic to northern Colombia",
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
    description: "Endemic to San Andrés Island",
  },

  // Sierra Nevada de Santa Marta (SNSM) - 23 species
  {
    commonName: "Santa Marta Parakeet",
    scientificName: "Pyrrhura viridicata",
    spanishName: "Periquito de Santa Marta",
    ebirdCode: "sampar1",
    ebirdUrl: "https://ebird.org/species/sampar1",
    regions: ["SNSM"],
    conservationStatus: "Endangered",
    habitat: "Cloud forests and forest edges",
    description: "Colorful parakeet endemic to Sierra Nevada de Santa Marta",
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
    description: "Small owl endemic to Santa Marta mountains",
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
    description: "Tiny hummingbird with distinctive crown",
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
    description: "High-altitude hummingbird specialist",
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
    description: "Distinctive páramo hummingbird",
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
    description: "Large hummingbird of cloud forests",
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
    description: "Tiny hummingbird with iridescent plumage",
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
    description: "Large hummingbird of dense forests",
  },
  {
    commonName: "Rusty-headed Spinetail",
    scientificName: "Synallaxis fuscorufa",
    spanishName: "Rastrojero cabecirrufo",
    ebirdCode: "russpi1",
    ebirdUrl: "https://ebird.org/species/russpi1",
    regions: ["SNSM"],
    conservationStatus: "Endangered",
    habitat: "Dense undergrowth",
    description: "Secretive understory bird",
  },
  {
    commonName: "Santa Marta Foliage-gleaner",
    scientificName: "Clibanornis rufipectus",
    spanishName: "Hojarasquero de Santa Marta",
    ebirdCode: "samfog1",
    ebirdUrl: "https://ebird.org/species/samfog1",
    regions: ["SNSM"],
    conservationStatus: "Endangered",
    habitat: "Cloud forest understory",
    description: "Insectivorous bird of dense forests",
  },
  {
    commonName: "Santa Marta Antpitta",
    scientificName: "Grallaria bangsi",
    spanishName: "Tororoi de Santa Marta",
    ebirdCode: "samang1",
    ebirdUrl: "https://ebird.org/species/samang1",
    regions: ["SNSM"],
    conservationStatus: "Endangered",
    habitat: "Cloud forest floor",
    description: "Ground-dwelling forest bird",
  },
  {
    commonName: "Santa Marta Tapaculo",
    scientificName: "Scytalopus sanctaemartae",
    spanishName: "Tapaculo de Santa Marta",
    ebirdCode: "samtap1",
    ebirdUrl: "https://ebird.org/species/samtap1",
    regions: ["SNSM"],
    conservationStatus: "Endangered",
    habitat: "Dense undergrowth",
    description: "Secretive ground-dwelling bird",
  },
  {
    commonName: "Brown-rumped Tapaculo",
    scientificName: "Scytalopus latebricola",
    spanishName: "Tapaculo lomipardo",
    ebirdCode: "brmtap1",
    ebirdUrl: "https://ebird.org/species/brmtap1",
    regions: ["SNSM"],
    conservationStatus: "Endangered",
    habitat: "Montane forest undergrowth",
    description: "Elusive forest floor specialist",
  },
  {
    commonName: "Santa Marta Bush-Tyrant",
    scientificName: "Myiotheretes pernix",
    spanishName: "Atrapamoscas de Santa Marta",
    ebirdCode: "sambty1",
    ebirdUrl: "https://ebird.org/species/sambty1",
    regions: ["SNSM"],
    conservationStatus: "Endangered",
    habitat: "Forest edges and clearings",
    description: "Flycatcher of montane areas",
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
    description: "Small secretive wren",
  },
  {
    commonName: "Hermit Wood-Wren",
    scientificName: "Henicorhina anachoreta",
    spanishName: "Cucarachero ermitaño",
    ebirdCode: "herwre1",
    ebirdUrl: "https://ebird.org/species/herwre1",
    regions: ["SNSM"],
    conservationStatus: "Endangered",
    habitat: "Cloud forest understory",
    description: "Secretive forest wren",
  },
  {
    commonName: "Black-cheeked Mountain-Tanager",
    scientificName: "Anisognathus melanogenys",
    spanishName: "Tangara montana carinegra",
    ebirdCode: "blctan1",
    ebirdUrl: "https://ebird.org/species/blctan1",
    regions: ["SNSM"],
    conservationStatus: "Endangered",
    habitat: "Cloud forests",
    description: "Colorful montane tanager",
  },
  {
    commonName: "Santa Marta Brushfinch",
    scientificName: "Atlapetes melanocephalus",
    spanishName: "Atlapetes de Santa Marta",
    ebirdCode: "sambfs1",
    ebirdUrl: "https://ebird.org/species/sambfs1",
    regions: ["SNSM"],
    conservationStatus: "Endangered",
    habitat: "Forest edges and scrub",
    description: "Seed-eating bird of montane areas",
  },
  {
    commonName: "Yellow-crowned Redstart",
    scientificName: "Myioborus flavivertex",
    spanishName: "Candelita coroniamarilla",
    ebirdCode: "ycrwar1",
    ebirdUrl: "https://ebird.org/species/ycrwar1",
    regions: ["SNSM"],
    conservationStatus: "Endangered",
    habitat: "Cloud forest canopy",
    description: "Active insectivorous warbler",
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
    description: "Endemic warbler of montane forests",
  },
  {
    commonName: "White-lored Warbler",
    scientificName: "Myiothlypis conspicillata",
    spanishName: "Reinita loriblanca",
    ebirdCode: "wlorwar1",
    ebirdUrl: "https://ebird.org/species/wlorwar1",
    regions: ["SNSM"],
    conservationStatus: "Endangered",
    habitat: "Cloud forests",
    description: "Distinctive warbler with white facial markings",
  },
  {
    commonName: "Sierra Nevada Brushfinch",
    scientificName: "Arremon basilicus",
    spanishName: "Saltón de la Sierra Nevada",
    ebirdCode: "snbrfs1",
    ebirdUrl: "https://ebird.org/species/snbrfs1",
    regions: ["SNSM"],
    conservationStatus: "Endangered",
    habitat: "Montane scrub and forest edges",
    description: "Endemic brushfinch of Sierra Nevada",
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
    description: "Chunky bird of Pacific lowlands",
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
    description: "Large colonial nesting bird",
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
    description: "Recently discovered hummingbird from tepuis",
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
    description: "Large ground bird of dry areas",
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
    description: "Tiny woodpecker of dry areas",
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
    description: "Small flycatcher of montane areas",
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
    description: "Endemic wren of Cauca Valley",
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
    description: "Colorful barbet of dry forests",
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
    description: "Striking woodpecker of dry areas",
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
    description: "Secretive wren of dry forests",
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
    description: "Dark tanager of dry forests",
  },
  {
    commonName: "Velvet-fronted Euphonia",
    scientificName: "Euphonia concinna",
    spanishName: "Eufonia frentiaterciopelada",
    ebirdCode: "velfroi1",
    ebirdUrl: "https://ebird.org/species/velfroi1",
    regions: ["VIM"],
    conservationStatus: "Near Threatened",
    habitat: "Dry forest canopy",
    description: "Small frugivorous bird",
  },
  {
    commonName: "Chestnut-bellied Hummingbird",
    scientificName: "Amazilia castaneiventris",
    spanishName: "Colibrí ventricastaño",
    ebirdCode: "chbhum1",
    ebirdUrl: "https://ebird.org/species/chbhum1",
    regions: ["AE", "VIM"],
    conservationStatus: "Endangered",
    habitat: "Dry forest edges",
    description: "Medium-sized hummingbird",
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
    description: "Ground-dwelling dove",
  },
  {
    commonName: "Magdalena Tapaculo",
    scientificName: "Scytalopus rodriguezi",
    spanishName: "Tapaculo del Magdalena",
    ebirdCode: "magtap1",
    ebirdUrl: "https://ebird.org/species/magtap1",
    regions: ["AE", "VIM"],
    conservationStatus: "Endangered",
    habitat: "Dense undergrowth",
    description: "Secretive ground bird",
  },
  {
    commonName: "Apical Flycatcher",
    scientificName: "Myiarchus apicalis",
    spanishName: "Copetón apical",
    ebirdCode: "appfly1",
    ebirdUrl: "https://ebird.org/species/appfly1",
    regions: ["AW", "AC", "AE", "VIC", "VIM"],
    conservationStatus: "Least Concern",
    habitat: "Dry forests and edges",
    description: "Medium-sized flycatcher",
  },

  // Western Andes (AW) - 36 species (showing key ones)
  {
    commonName: "Cauca Guan",
    scientificName: "Penelope perspicax",
    spanishName: "Pava caucana",
    ebirdCode: "caugua1",
    ebirdUrl: "https://ebird.org/species/caugua1",
    regions: ["AW", "AC"],
    conservationStatus: "Endangered",
    habitat: "Cloud forests",
    description: "Large ground bird of montane forests",
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
    description: "Rare hummingbird with distinctive throat",
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
    description: "Spectacular hummingbird with iridescent plumage",
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
    description: "Large dark hummingbird",
  },
  {
    commonName: "Tatamá Tapaculo",
    scientificName: "Scytalopus alvarezlopezi",
    spanishName: "Tapaculo del Tatamá",
    ebirdCode: "tattap1",
    ebirdUrl: "https://ebird.org/species/tattap1",
    regions: ["AW"],
    conservationStatus: "Endangered",
    habitat: "Cloud forest undergrowth",
    description: "Recently described tapaculo",
  },
  {
    commonName: "Urrao Antpitta",
    scientificName: "Grallaria urraoensis",
    spanishName: "Tororoi de Urrao",
    ebirdCode: "urpant1",
    ebirdUrl: "https://ebird.org/species/urpant1",
    regions: ["AW"],
    conservationStatus: "Endangered",
    habitat: "Cloud forest floor",
    description: "Ground-dwelling forest bird",
  },
  {
    commonName: "Munchique Wood-Wren",
    scientificName: "Henicorhina negreti",
    spanishName: "Cucarachero de Munchique",
    ebirdCode: "mucwre1",
    ebirdUrl: "https://ebird.org/species/mucwre1",
    regions: ["AW"],
    conservationStatus: "Endangered",
    habitat: "Cloud forest understory",
    description: "Endemic wren of Western Andes",
  },
  {
    commonName: "Black-and-gold Tanager",
    scientificName: "Bangsia melanochlamys",
    spanishName: "Tangara negridorada",
    ebirdCode: "blgtan1",
    ebirdUrl: "https://ebird.org/species/blgtan1",
    regions: ["AW", "AC"],
    conservationStatus: "Vulnerable",
    habitat: "Cloud forests",
    description: "Striking black and yellow tanager",
  },
  {
    commonName: "Gold-ringed Tanager",
    scientificName: "Bangsia aureocincta",
    spanishName: "Tangara anillodorada",
    ebirdCode: "gortan1",
    ebirdUrl: "https://ebird.org/species/gortan1",
    regions: ["AW"],
    conservationStatus: "Near Threatened",
    habitat: "Cloud forests",
    description: "Colorful montane tanager",
  },
  {
    commonName: "Multicolored Tanager",
    scientificName: "Chlorochrysa nitidissima",
    spanishName: "Tangara multicolor",
    ebirdCode: "multan1",
    ebirdUrl: "https://ebird.org/species/multan1",
    regions: ["AW", "AC"],
    conservationStatus: "Vulnerable",
    habitat: "Cloud forest canopy",
    description: "Brilliantly colored tanager",
  },
  {
    commonName: "Chestnut-bellied Flowerpiercer",
    scientificName: "Diglossa gloriosissima",
    spanishName: "Pinchaflor ventricastaño",
    ebirdCode: "chbflp1",
    ebirdUrl: "https://ebird.org/species/chbflp1",
    regions: ["AW"],
    conservationStatus: "Vulnerable",
    habitat: "Cloud forest edges",
    description: "Nectar-feeding specialist",
  },
  {
    commonName: "Crested Ant-Tanager",
    scientificName: "Habia cristata",
    spanishName: "Tangara hormiguera crestada",
    ebirdCode: "criant1",
    ebirdUrl: "https://ebird.org/species/criant1",
    regions: ["AW", "AC"],
    conservationStatus: "Near Threatened",
    habitat: "Cloud forest understory",
    description: "Distinctive crested tanager",
  },
  {
    commonName: "Red-bellied Grackle",
    scientificName: "Hypopyrrhus pyrohypogaster",
    spanishName: "Chamón",
    ebirdCode: "redgra1",
    ebirdUrl: "https://ebird.org/species/redgra1",
    regions: ["AW", "AC", "AE"],
    conservationStatus: "Vulnerable",
    habitat: "Cloud forests and edges",
    description: "Large blackbird with red belly",
  },
  {
    commonName: "Paramillo Tapaculo",
    scientificName: "Scytalopus canus",
    spanishName: "Tapaculo del Paramillo",
    ebirdCode: "partap1",
    ebirdUrl: "https://ebird.org/species/partap1",
    regions: ["AW"],
    conservationStatus: "Endangered",
    habitat: "Páramo and cloud forest",
    description: "High-altitude tapaculo",
  },

  // Central Andes (AC) - 34 species (showing key ones)
  {
    commonName: "Rufous-fronted Parakeet",
    scientificName: "Bolborhynchus ferrugineifrons",
    spanishName: "Periquito frentirrufo",
    ebirdCode: "rufpar1",
    ebirdUrl: "https://ebird.org/species/rufpar1",
    regions: ["AC"],
    conservationStatus: "Vulnerable",
    habitat: "Cloud forests",
    description: "Small montane parakeet",
  },
  {
    commonName: "Indigo-winged Parrot",
    scientificName: "Hapalopsittaca fuertesi",
    spanishName: "Cotorra aliazul",
    ebirdCode: "indpar1",
    ebirdUrl: "https://ebird.org/species/indpar1",
    regions: ["AC"],
    conservationStatus: "Critically Endangered",
    habitat: "Cloud forests",
    description: "Rare montane parrot",
  },
  {
    commonName: "Tolima Blossomcrown",
    scientificName: "Anthocephala berlepschi",
    spanishName: "Colibrí coronado del Tolima",
    ebirdCode: "blosac2",
    ebirdUrl: "https://ebird.org/species/blosac2",
    regions: ["AC"],
    conservationStatus: "Critically Endangered",
    habitat: "Cloud forest edges",
    description: "Tiny endemic hummingbird",
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
    description: "High-altitude hummingbird",
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
    description: "Secretive ground-dwelling bird",
  },
  {
    commonName: "Stiles's Tapaculo",
    scientificName: "Scytalopus stilesi",
    spanishName: "Tapaculo de Stiles",
    ebirdCode: "stltap1",
    ebirdUrl: "https://ebird.org/species/stltap1",
    regions: ["AC"],
    conservationStatus: "Endangered",
    habitat: "Cloud forest undergrowth",
    description: "Recently described tapaculo",
  },
  {
    commonName: "Chestnut-capped Piha",
    scientificName: "Lipaugus weberi",
    spanishName: "Piha coroniparda",
    ebirdCode: "chcpih1",
    ebirdUrl: "https://ebird.org/species/chcpih1",
    regions: ["AC"],
    conservationStatus: "Vulnerable",
    habitat: "Cloud forests",
    description: "Large frugivorous bird",
  },
  {
    commonName: "Yellow-headed Brushfinch",
    scientificName: "Atlapetes flaviceps",
    spanishName: "Atlapetes cabeciamarillo",
    ebirdCode: "yhbfs1",
    ebirdUrl: "https://ebird.org/species/yhbfs1",
    regions: ["AC"],
    conservationStatus: "Vulnerable",
    habitat: "Cloud forest edges",
    description: "Distinctive yellow-headed finch",
  },
  {
    commonName: "Antioquia Brushfinch",
    scientificName: "Atlapetes blancae",
    spanishName: "Atlapetes de Antioquia",
    ebirdCode: "antbfs1",
    ebirdUrl: "https://ebird.org/species/antbfs1",
    regions: ["AC"],
    conservationStatus: "Endangered",
    habitat: "Cloud forest edges",
    description: "Endemic brushfinch of Central Andes",
  },

  // Eastern Andes (AE) - 20 species (showing key ones)
  {
    commonName: "Chestnut Wood-Quail",
    scientificName: "Odontophorus hyperythrus",
    spanishName: "Perdiz colorada",
    ebirdCode: "chwqua1",
    ebirdUrl: "https://ebird.org/species/chwqua1",
    regions: ["AW", "AC", "AE"],
    conservationStatus: "Near Threatened",
    habitat: "Cloud forest floor",
    description: "Ground-dwelling game bird",
  },
  {
    commonName: "Gorgeted Wood-Quail",
    scientificName: "Odontophorus strophium",
    spanishName: "Perdiz santandereana",
    ebirdCode: "gowqua1",
    ebirdUrl: "https://ebird.org/species/gowqua1",
    regions: ["AE"],
    conservationStatus: "Endangered",
    habitat: "Cloud forest floor",
    description: "Rare montane quail",
  },
  {
    commonName: "Colombian Grebe",
    scientificName: "Podiceps andinus",
    spanishName: "Zampullín colombiano",
    ebirdCode: "colgre1",
    ebirdUrl: "https://ebird.org/species/colgre1",
    regions: ["AE"],
    conservationStatus: "Extinct",
    habitat: "High-altitude lakes",
    description: "Recently extinct waterbird",
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
    description: "Secretive wetland bird",
  },
  {
    commonName: "Yellow-eared Parrot",
    scientificName: "Ognorhynchus icterotis",
    spanishName: "Loro orejiamarillo",
    ebirdCode: "yeppar1",
    ebirdUrl: "https://ebird.org/species/yeppar1",
    regions: ["AW", "AC", "AE"],
    conservationStatus: "Endangered",
    habitat: "Cloud forests with wax palms",
    description: "Large parrot dependent on wax palms",
  },
  {
    commonName: "Brown-breasted Parakeet",
    scientificName: "Pyrrhura calliptera",
    spanishName: "Periquito aliasamarillo",
    ebirdCode: "brbpar1",
    ebirdUrl: "https://ebird.org/species/brbpar1",
    regions: ["AE"],
    conservationStatus: "Vulnerable",
    habitat: "Cloud forests",
    description: "Endemic parakeet of Eastern Andes",
  },
  {
    commonName: "Green-bearded Helmetcrest",
    scientificName: "Oxypogon guerinii",
    spanishName: "Colibrí crestado barbiverdi",
    ebirdCode: "grbhel1",
    ebirdUrl: "https://ebird.org/species/grbhel1",
    regions: ["AE"],
    conservationStatus: "Endangered",
    habitat: "Páramo grasslands",
    description: "High-altitude hummingbird specialist",
  },
  {
    commonName: "Black Inca",
    scientificName: "Coeligena prunellei",
    spanishName: "Inca negro",
    ebirdCode: "blainc1",
    ebirdUrl: "https://ebird.org/species/blainc1",
    regions: ["AE"],
    conservationStatus: "Vulnerable",
    habitat: "Cloud forests",
    description: "Large dark hummingbird",
  },
  {
    commonName: "Silvery-throated Spinetail",
    scientificName: "Synallaxis subpudica",
    spanishName: "Rastrojero gorgiplatado",
    ebirdCode: "silspp1",
    ebirdUrl: "https://ebird.org/species/silspp1",
    regions: ["AE"],
    conservationStatus: "Endangered",
    habitat: "Dense undergrowth",
    description: "Secretive understory bird",
  },
  {
    commonName: "Parker's Antbird",
    scientificName: "Cercomacroides parkeri",
    spanishName: "Hormiguero de Parker",
    ebirdCode: "parant1",
    ebirdUrl: "https://ebird.org/species/parant1",
    regions: ["AW", "AC", "AE"],
    conservationStatus: "Vulnerable",
    habitat: "Cloud forest understory",
    description: "Ant-following specialist",
  },
  {
    commonName: "Cundinamarca Antpitta",
    scientificName: "Grallaria kaestneri",
    spanishName: "Tororoi de Cundinamarca",
    ebirdCode: "cundan1",
    ebirdUrl: "https://ebird.org/species/cundan1",
    regions: ["AE"],
    conservationStatus: "Endangered",
    habitat: "Cloud forest floor",
    description: "Ground-dwelling forest bird",
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
    description: "Marsh-dwelling wren",
  },
  {
    commonName: "Turquoise Dacnis",
    scientificName: "Dacnis hartlaubi",
    spanishName: "Dacnis turquesa",
    ebirdCode: "turdac1",
    ebirdUrl: "https://ebird.org/species/turdac1",
    regions: ["AW", "AC", "AE"],
    conservationStatus: "Near Threatened",
    habitat: "Cloud forest canopy",
    description: "Small nectar-feeding bird",
  },
  {
    commonName: "Dusky-headed Brushfinch",
    scientificName: "Atlapetes fuscoolivaceus",
    spanishName: "Atlapetes cabecipardo",
    ebirdCode: "dhbfs1",
    ebirdUrl: "https://ebird.org/species/dhbfs1",
    regions: ["AE", "CM"],
    conservationStatus: "Vulnerable",
    habitat: "Cloud forest edges",
    description: "Montane seed-eating bird",
  },
  {
    commonName: "Mountain Grackle",
    scientificName: "Macroagelaius subalaris",
    spanishName: "Chamón montañero",
    ebirdCode: "mougra1",
    ebirdUrl: "https://ebird.org/species/mougra1",
    regions: ["AE"],
    conservationStatus: "Vulnerable",
    habitat: "Páramo and wetlands",
    description: "High-altitude blackbird",
  },

  // Colombian Massif (CM) - 3 species
  {
    commonName: "Colorful Puffleg",
    scientificName: "Eriocnemis mirabilis",
    spanishName: "Calzadito multicolor",
    ebirdCode: "colpuf1",
    ebirdUrl: "https://ebird.org/species/colpuf1",
    regions: ["AW"],
    conservationStatus: "Critically Endangered",
    habitat: "Cloud forests",
    description: "Spectacular hummingbird with iridescent plumage",
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
    description: "Rare hummingbird with distinctive throat",
  },
  {
    commonName: "Rainbow-bearded Thornbill",
    scientificName: "Chalcostigma herrani",
    spanishName: "Colibrí barbirrainbow",
    ebirdCode: "rabtho1",
    ebirdUrl: "https://ebird.org/species/rabtho1",
    regions: ["CM"],
    conservationStatus: "Near Threatened",
    habitat: "Páramo and high-altitude scrub",
    description: "High-altitude hummingbird specialist",
  },

  // Llanos (LL) - 0 species (no endemics in this region)
]

// Ecoregion data with coordinates and descriptions
const ecoregionsData = [
  {
    id: "CA",
    name: "Caribe",
    fullName: "Caribbean Coast",
    description: "Coastal plains, dry forests, and the unique San Andrés archipelago",
    coordinates: { lat: 10.5, lng: -74.5 },
    area: "132,000 km²",
    elevation: "0 - 500m",
    climate: "Tropical dry to semi-arid",
    bestTime: "December - April",
    color: "#3B82F6",
    speciesCount: 6,
  },
  {
    id: "SNSM",
    name: "Sierra Nevada de Santa Marta",
    fullName: "Sierra Nevada de Santa Marta",
    description: "World's highest coastal mountain range with exceptional endemism per unit area",
    coordinates: { lat: 10.8, lng: -73.7 },
    area: "17,000 km²",
    elevation: "0 - 5,775m",
    climate: "Tropical to alpine",
    bestTime: "December - March, July - August",
    color: "#8B5CF6",
    speciesCount: 23,
  },
  {
    id: "PC",
    name: "Pacific/Chocó",
    fullName: "Pacific Coast & Chocó",
    description: "World's most biodiverse rainforest per square kilometer",
    coordinates: { lat: 5.5, lng: -77.0 },
    area: "187,000 km²",
    elevation: "0 - 4,000m",
    climate: "Tropical rainforest",
    bestTime: "January - March, July - September",
    color: "#10B981",
    speciesCount: 2,
  },
  {
    id: "AM",
    name: "Amazonas",
    fullName: "Amazon Basin",
    description: "Colombia's portion of the world's largest rainforest with unique tepui formations",
    coordinates: { lat: -1.0, lng: -70.0 },
    area: "483,000 km²",
    elevation: "100 - 3,000m",
    climate: "Tropical rainforest",
    bestTime: "June - September",
    color: "#16A34A",
    speciesCount: 1,
  },
  {
    id: "VIC",
    name: "Valle Interandino del Cauca",
    fullName: "Cauca Inter-Andean Valley",
    description: "Fertile valley between Western and Central Andes with dry forest remnants",
    coordinates: { lat: 3.5, lng: -76.5 },
    area: "22,000 km²",
    elevation: "900 - 2,000m",
    climate: "Tropical dry to humid",
    bestTime: "December - March, July - August",
    color: "#F59E0B",
    speciesCount: 7,
  },
  {
    id: "VIM",
    name: "Valle Interandino del Magdalena",
    fullName: "Magdalena Inter-Andean Valley",
    description: "Colombia's principal river valley with critically endangered dry forests",
    coordinates: { lat: 8.0, lng: -74.0 },
    area: "190,000 km²",
    elevation: "0 - 1,500m",
    climate: "Tropical dry to humid",
    bestTime: "December - March, July - August",
    color: "#059669",
    speciesCount: 9,
  },
  {
    id: "AW",
    name: "Western Andes",
    fullName: "Cordillera Occidental",
    description: "Western mountain range with diverse elevational zones and high endemism",
    coordinates: { lat: 5.0, lng: -76.0 },
    area: "76,000 km²",
    elevation: "1,000 - 4,250m",
    climate: "Montane tropical",
    bestTime: "December - March, June - August",
    color: "#8B5CF6",
    speciesCount: 36,
  },
  {
    id: "AC",
    name: "Central Andes",
    fullName: "Cordillera Central",
    description: "Central mountain range featuring the Coffee Triangle and diverse montane ecosystems",
    coordinates: { lat: 5.5, lng: -75.0 },
    area: "110,000 km²",
    elevation: "1,000 - 5,400m",
    climate: "Montane tropical to alpine",
    bestTime: "December - March, June - August",
    color: "#DC2626",
    speciesCount: 34,
  },
  {
    id: "AE",
    name: "Eastern Andes",
    fullName: "Cordillera Oriental",
    description: "Eastern mountain range including Bogotá's surroundings and extensive páramo",
    coordinates: { lat: 5.0, lng: -73.0 },
    area: "130,000 km²",
    elevation: "500 - 5,400m",
    climate: "Montane tropical to alpine",
    bestTime: "December - March, June - August",
    color: "#7C3AED",
    speciesCount: 20,
  },
  {
    id: "CM",
    name: "Colombian Massif",
    fullName: "Macizo Colombiano",
    description: "Mountainous region where the Andes divide into three ranges",
    coordinates: { lat: 1.5, lng: -76.5 },
    area: "35,000 km²",
    elevation: "1,000 - 4,750m",
    climate: "Montane tropical to alpine",
    bestTime: "December - March, June - August",
    color: "#BE185D",
    speciesCount: 3,
  },
  {
    id: "LL",
    name: "Llanos",
    fullName: "Llanos Orientales",
    description: "Vast tropical grasslands extending into Venezuela",
    coordinates: { lat: 4.0, lng: -70.0 },
    area: "250,000 km²",
    elevation: "100 - 500m",
    climate: "Tropical savanna",
    bestTime: "December - March",
    color: "#EAB308",
    speciesCount: 0,
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl flex items-center gap-2">
            <Bird className="w-6 h-6 text-emerald-600" />
            {species.commonName}
          </DialogTitle>
          <DialogDescription className="text-base italic">{species.scientificName}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Spanish Name</h4>
              <p className="text-gray-700">{species.spanishName}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Conservation Status</h4>
              <Badge className={`${getConservationColor(species.conservationStatus)} text-sm`}>
                {species.conservationStatus}
              </Badge>
            </div>
          </div>

          {/* Description and Habitat */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
            <p className="text-gray-700 mb-4">{species.description}</p>
            <h4 className="font-semibold text-gray-900 mb-2">Habitat</h4>
            <p className="text-gray-700">{species.habitat}</p>
          </div>

          {/* Ecoregions */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Found in Ecoregions</h4>
            <div className="flex flex-wrap gap-2">
              {species.regions.map((regionCode) => {
                const region = ecoregionsData.find((r) => r.id === regionCode)
                return (
                  <Badge key={regionCode} variant="outline" className="text-sm">
                    {region?.name || regionCode}
                  </Badge>
                )
              })}
            </div>
          </div>

          {/* eBird Link */}
          <div className="pt-4 border-t">
            <Button asChild className="w-full">
              <a href={species.ebirdUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                View on eBird
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function InteractiveEndemicBirdsExplorer() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [conservationFilter, setConservationFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("common")
  const [selectedSpecies, setSelectedSpecies] = useState<(typeof endemicSpeciesData)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Filter and sort species based on current selections
  const filteredSpecies = useMemo(() => {
    let filtered = endemicSpeciesData

    // Filter by selected region
    if (selectedRegion) {
      filtered = filtered.filter((species) => species.regions.includes(selectedRegion))
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

    // Filter by conservation status
    if (conservationFilter !== "all") {
      if (conservationFilter === "threatened") {
        filtered = filtered.filter((species) =>
          ["Critically Endangered", "Endangered", "Vulnerable"].includes(species.conservationStatus),
        )
      } else {
        filtered = filtered.filter((species) => species.conservationStatus === conservationFilter)
      }
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
  }, [selectedRegion, searchTerm, conservationFilter, sortBy])

  const handleSpeciesClick = (species: (typeof endemicSpeciesData)[0]) => {
    setSelectedSpecies(species)
    setIsModalOpen(true)
  }

  const handleRegionClick = (regionId: string) => {
    setSelectedRegion(selectedRegion === regionId ? null : regionId)
  }

  const resetFilters = () => {
    setSelectedRegion(null)
    setSearchTerm("")
    setConservationFilter("all")
    setSortBy("common")
  }

  return (
    <div className="space-y-6">
      {/* Interactive Map */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl flex items-center gap-2">
            <MapPin className="w-6 h-6 text-emerald-600" />
            Colombian Ecoregions Map
          </CardTitle>
          <CardDescription>Click on any ecoregion to explore its endemic bird species</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-4 mb-6">
            <div className="aspect-[4/3] w-full max-w-4xl mx-auto relative">
              <svg
                viewBox="0 0 800 600"
                className="w-full h-full"
                style={{ filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))" }}
              >
                {/* Water bodies */}
                <defs>
                  <pattern id="water" patternUnits="userSpaceOnUse" width="4" height="4">
                    <rect width="4" height="4" fill="#3B82F6" opacity="0.1" />
                    <path
                      d="M 0,4 l 4,-4 M -1,1 l 2,-2 M 3,5 l 2,-2"
                      stroke="#3B82F6"
                      strokeWidth="0.5"
                      opacity="0.3"
                    />
                  </pattern>
                </defs>

                {/* Caribbean Sea */}
                <rect x="0" y="0" width="800" height="150" fill="url(#water)" />

                {/* Pacific Ocean */}
                <rect x="0" y="150" width="200" height="450" fill="url(#water)" />

                {/* Caribbean Coast (CA) */}
                <path
                  d="M 200 50 L 400 50 L 450 100 L 400 150 L 200 150 Z"
                  fill={selectedRegion === "CA" ? "#3B82F6" : "#DBEAFE"}
                  stroke="#1E40AF"
                  strokeWidth="2"
                  className="cursor-pointer transition-all duration-200 hover:opacity-80"
                  onClick={() => handleRegionClick("CA")}
                />

                {/* Sierra Nevada de Santa Marta (SNSM) */}
                <circle
                  cx="350"
                  cy="100"
                  r="30"
                  fill={selectedRegion === "SNSM" ? "#8B5CF6" : "#EDE9FE"}
                  stroke="#7C3AED"
                  strokeWidth="2"
                  className="cursor-pointer transition-all duration-200 hover:opacity-80"
                  onClick={() => handleRegionClick("SNSM")}
                />

                {/* Pacific/Chocó (PC) */}
                <path
                  d="M 200 150 L 300 150 L 320 300 L 280 450 L 200 450 Z"
                  fill={selectedRegion === "PC" ? "#10B981" : "#D1FAE5"}
                  stroke="#047857"
                  strokeWidth="2"
                  className="cursor-pointer transition-all duration-200 hover:opacity-80"
                  onClick={() => handleRegionClick("PC")}
                />

                {/* Western Andes (AW) */}
                <path
                  d="M 300 150 L 400 150 L 420 300 L 380 450 L 320 450 L 320 300 Z"
                  fill={selectedRegion === "AW" ? "#8B5CF6" : "#EDE9FE"}
                  stroke="#7C3AED"
                  strokeWidth="2"
                  className="cursor-pointer transition-all duration-200 hover:opacity-80"
                  onClick={() => handleRegionClick("AW")}
                />

                {/* Cauca Valley (VIC) */}
                <path
                  d="M 400 200 L 480 200 L 480 350 L 420 350 L 420 300 L 400 250 Z"
                  fill={selectedRegion === "VIC" ? "#F59E0B" : "#FEF3C7"}
                  stroke="#D97706"
                  strokeWidth="2"
                  className="cursor-pointer transition-all duration-200 hover:opacity-80"
                  onClick={() => handleRegionClick("VIC")}
                />

                {/* Central Andes (AC) */}
                <path
                  d="M 480 150 L 580 150 L 600 300 L 560 450 L 480 450 L 480 350 L 480 200 Z"
                  fill={selectedRegion === "AC" ? "#DC2626" : "#FEE2E2"}
                  stroke="#B91C1C"
                  strokeWidth="2"
                  className="cursor-pointer transition-all duration-200 hover:opacity-80"
                  onClick={() => handleRegionClick("AC")}
                />

                {/* Magdalena Valley (VIM) */}
                <path
                  d="M 450 100 L 550 100 L 580 150 L 580 300 L 520 350 L 480 300 L 450 200 Z"
                  fill={selectedRegion === "VIM" ? "#059669" : "#D1FAE5"}
                  stroke="#047857"
                  strokeWidth="2"
                  className="cursor-pointer transition-all duration-200 hover:opacity-80"
                  onClick={() => handleRegionClick("VIM")}
                />

                {/* Eastern Andes (AE) */}
                <path
                  d="M 580 150 L 680 150 L 700 300 L 660 450 L 600 450 L 600 300 Z"
                  fill={selectedRegion === "AE" ? "#7C3AED" : "#EDE9FE"}
                  stroke="#6D28D9"
                  strokeWidth="2"
                  className="cursor-pointer transition-all duration-200 hover:opacity-80"
                  onClick={() => handleRegionClick("AE")}
                />

                {/* Llanos (LL) */}
                <path
                  d="M 680 150 L 800 150 L 800 350 L 700 350 L 700 300 Z"
                  fill={selectedRegion === "LL" ? "#EAB308" : "#FEF3C7"}
                  stroke="#CA8A04"
                  strokeWidth="2"
                  className="cursor-pointer transition-all duration-200 hover:opacity-80"
                  onClick={() => handleRegionClick("LL")}
                />

                {/* Amazon (AM) */}
                <path
                  d="M 560 450 L 800 450 L 800 600 L 200 600 L 280 450 L 380 450 Z"
                  fill={selectedRegion === "AM" ? "#16A34A" : "#DCFCE7"}
                  stroke="#15803D"
                  strokeWidth="2"
                  className="cursor-pointer transition-all duration-200 hover:opacity-80"
                  onClick={() => handleRegionClick("AM")}
                />

                {/* Colombian Massif (CM) */}
                <path
                  d="M 380 450 L 480 450 L 520 500 L 480 550 L 380 550 L 340 500 Z"
                  fill={selectedRegion === "CM" ? "#BE185D" : "#FCE7F3"}
                  stroke="#BE185D"
                  strokeWidth="2"
                  className="cursor-pointer transition-all duration-200 hover:opacity-80"
                  onClick={() => handleRegionClick("CM")}
                />

                {/* Region Labels */}
                <text
                  x="325"
                  y="100"
                  textAnchor="middle"
                  className="text-xs font-medium fill-gray-700 pointer-events-none"
                >
                  Caribbean
                </text>
                <text
                  x="350"
                  y="140"
                  textAnchor="middle"
                  className="text-xs font-medium fill-gray-700 pointer-events-none"
                >
                  SNSM
                </text>
                <text
                  x="250"
                  y="300"
                  textAnchor="middle"
                  className="text-xs font-medium fill-gray-700 pointer-events-none"
                >
                  Chocó
                </text>
                <text
                  x="360"
                  y="300"
                  textAnchor="middle"
                  className="text-xs font-medium fill-gray-700 pointer-events-none"
                >
                  W. Andes
                </text>
                <text
                  x="440"
                  y="275"
                  textAnchor="middle"
                  className="text-xs font-medium fill-gray-700 pointer-events-none"
                >
                  Cauca V.
                </text>
                <text
                  x="530"
                  y="300"
                  textAnchor="middle"
                  className="text-xs font-medium fill-gray-700 pointer-events-none"
                >
                  C. Andes
                </text>
                <text
                  x="515"
                  y="225"
                  textAnchor="middle"
                  className="text-xs font-medium fill-gray-700 pointer-events-none"
                >
                  Magdalena V.
                </text>
                <text
                  x="640"
                  y="300"
                  textAnchor="middle"
                  className="text-xs font-medium fill-gray-700 pointer-events-none"
                >
                  E. Andes
                </text>
                <text
                  x="740"
                  y="250"
                  textAnchor="middle"
                  className="text-xs font-medium fill-gray-700 pointer-events-none"
                >
                  Llanos
                </text>
                <text
                  x="500"
                  y="525"
                  textAnchor="middle"
                  className="text-xs font-medium fill-gray-700 pointer-events-none"
                >
                  Amazon
                </text>
                <text
                  x="430"
                  y="500"
                  textAnchor="middle"
                  className="text-xs font-medium fill-gray-700 pointer-events-none"
                >
                  Massif
                </text>
              </svg>
            </div>

            {/* Selected Region Info */}
            {selectedRegion && (
              <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
                {(() => {
                  const region = ecoregionsData.find((r) => r.id === selectedRegion)
                  if (!region) return null

                  return (
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg mb-2">{region.fullName}</h4>
                      <p className="text-gray-600 text-sm mb-3">{region.description}</p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                        <div>
                          <span className="font-medium">Area:</span> {region.area}
                        </div>
                        <div>
                          <span className="font-medium">Elevation:</span> {region.elevation}
                        </div>
                        <div>
                          <span className="font-medium">Climate:</span> {region.climate}
                        </div>
                        <div>
                          <span className="font-medium">Endemic Species:</span> {region.speciesCount}
                        </div>
                      </div>
                    </div>
                  )
                })()}
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
            {ecoregionsData.map((region) => (
              <div key={region.id} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded border"
                  style={{ backgroundColor: region.color + "40", borderColor: region.color }}
                />
                <span className="text-gray-600 truncate">
                  {region.name} ({region.speciesCount})
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
            <Search className="w-5 h-5 text-emerald-600" />
            Search & Filter Endemic Species
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search Species</label>
              <Input
                placeholder="Common, scientific, or Spanish name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-sm"
              />
            </div>

            {/* Conservation Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Conservation Status</label>
              <Select value={conservationFilter} onValueChange={setConservationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="threatened">Threatened Species</SelectItem>
                  <SelectItem value="Critically Endangered">Critically Endangered</SelectItem>
                  <SelectItem value="Endangered">Endangered</SelectItem>
                  <SelectItem value="Vulnerable">Vulnerable</SelectItem>
                  <SelectItem value="Near Threatened">Near Threatened</SelectItem>
                  <SelectItem value="Least Concern">Least Concern</SelectItem>
                  <SelectItem value="Data Deficient">Data Deficient</SelectItem>
                  <SelectItem value="Extinct">Extinct</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="common">Common Name</SelectItem>
                  <SelectItem value="scientific">Scientific Name</SelectItem>
                  <SelectItem value="conservation">Conservation Status</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Reset */}
            <div className="flex items-end">
              <Button variant="outline" onClick={resetFilters} className="w-full bg-transparent">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset Filters
              </Button>
            </div>
          </div>

          {/* Active Filters Summary */}
          <div className="mt-4 flex flex-wrap gap-2">
            {selectedRegion && (
              <Badge variant="secondary" className="text-xs">
                Region: {ecoregionsData.find((r) => r.id === selectedRegion)?.name}
              </Badge>
            )}
            {searchTerm && (
              <Badge variant="secondary" className="text-xs">
                Search: "{searchTerm}"
              </Badge>
            )}
            {conservationFilter !== "all" && (
              <Badge variant="secondary" className="text-xs">
                Status: {conservationFilter}
              </Badge>
            )}
            <Badge variant="outline" className="text-xs">
              {filteredSpecies.length} species found
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Species List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
            <Bird className="w-5 h-5 text-emerald-600" />
            Endemic Species ({filteredSpecies.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredSpecies.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Bird className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No species found matching your criteria.</p>
              <Button variant="outline" onClick={resetFilters} className="mt-4 bg-transparent">
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredSpecies.map((species, index) => (
                <Card
                  key={index}
                  className="cursor-pointer hover:shadow-md transition-shadow duration-200 border-l-4"
                  style={{
                    borderLeftColor:
                      species.conservationStatus === "Critically Endangered"
                        ? "#DC2626"
                        : species.conservationStatus === "Endangered"
                          ? "#EA580C"
                          : species.conservationStatus === "Vulnerable"
                            ? "#D97706"
                            : species.conservationStatus === "Near Threatened"
                              ? "#2563EB"
                              : species.conservationStatus === "Extinct"
                                ? "#000000"
                                : "#059669",
                  }}
                  onClick={() => handleSpeciesClick(species)}
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-base sm:text-lg">{species.commonName}</h4>
                        <p className="text-gray-600 italic text-sm">{species.scientificName}</p>
                        <p className="text-gray-500 text-sm">{species.spanishName}</p>
                        <p className="text-gray-600 text-sm mt-1">{species.description}</p>
                      </div>
                      <div className="flex flex-col sm:items-end gap-2">
                        <Badge
                          className={`text-xs ${
                            species.conservationStatus === "Critically Endangered"
                              ? "bg-red-100 text-red-800"
                              : species.conservationStatus === "Endangered"
                                ? "bg-orange-100 text-orange-800"
                                : species.conservationStatus === "Vulnerable"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : species.conservationStatus === "Near Threatened"
                                    ? "bg-blue-100 text-blue-800"
                                    : species.conservationStatus === "Extinct"
                                      ? "bg-black text-white"
                                      : "bg-green-100 text-green-800"
                          }`}
                        >
                          {species.conservationStatus}
                        </Badge>
                        <div className="flex flex-wrap gap-1">
                          {species.regions.map((regionCode) => {
                            const region = ecoregionsData.find((r) => r.id === regionCode)
                            return (
                              <Badge key={regionCode} variant="outline" className="text-xs">
                                {region?.name || regionCode}
                              </Badge>
                            )
                          })}
                        </div>
                        <Button size="sm" variant="outline" asChild>
                          <a
                            href={species.ebirdUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="w-3 h-3 mr-1" />
                            eBird
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Species Modal */}
      <SpeciesModal species={selectedSpecies} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* CTA Integration */}
      {filteredSpecies.length > 0 && (
        <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Ready to See These Endemic Species in the Wild?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Plan your Colombian birding adventure with AVES and experience these incredible endemic species in their
              natural habitats. Our expert guides know exactly where to find each species.
            </p>
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
          </CardContent>
        </Card>
      )}
    </div>
  )
}
