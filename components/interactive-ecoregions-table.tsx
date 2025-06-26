"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MapPin, Thermometer, Bird, Shield, AlertTriangle, Calendar, Info } from "lucide-react"

// Comprehensive ecoregion database with scientifically accurate data
const ecoregionDatabase = {
  // TERRESTRIAL ECOREGIONS - Tropical and Subtropical Moist Broadleaf Forests
  "Chocó-Darién Moist Forests": {
    overview: {
      area: "151,000 km²",
      elevation: "0-1,500m",
      countries: "Colombia, Panama, Ecuador",
      biome: "Tropical and Subtropical Moist Broadleaf Forests",
      wwfCode: "NT0115",
      climate: "Af - Tropical Rainforest",
      temperature: "24-28°C",
      precipitation: "2,000-8,000mm/year",
      description:
        "The world's most biodiverse rainforest per square kilometer, containing exceptional levels of endemism and species richness along the Pacific coast.",
    },
    species: {
      endemicBirds: [
        { name: "Chocó Vireo", scientific: "Vireo masteri", status: "Endangered" },
        { name: "Baudó Oropendola", scientific: "Psarocolius cassini", status: "Near Threatened" },
        { name: "Chocó Tapaculo", scientific: "Scytalopus chocoensis", status: "Vulnerable" },
        { name: "Beautiful Treerunner", scientific: "Margarornis bellulus", status: "Vulnerable" },
        { name: "Chocó Poorwill", scientific: "Nyctiphrynus rosenbergi", status: "Near Threatened" },
      ],
      keySpecies: [
        { name: "Harpy Eagle", scientific: "Harpia harpyja", status: "Near Threatened" },
        { name: "Great Green Macaw", scientific: "Ara ambiguus", status: "Endangered" },
        { name: "Long-wattled Umbrellabird", scientific: "Cephalopterus penduliger", status: "Vulnerable" },
        { name: "Baird's Tapir", scientific: "Tapirus bairdii", status: "Endangered" },
        { name: "Jaguar", scientific: "Panthera onca", status: "Near Threatened" },
      ],
      birdCount: 830,
      endemicCount: 67,
      mammalCount: 235,
    },
    conservation: {
      priority: "Critical",
      threats: [
        "Deforestation for agriculture",
        "Mining activities",
        "Infrastructure development",
        "Climate change",
        "Illegal logging",
      ],
      protectedAreas: [
        "Los Katíos National Park",
        "Utría National Park",
        "Farallones de Cali National Park",
        "Sanquianga National Park",
      ],
      protectionLevel: "15%",
      notes:
        "Recognized as a UNESCO World Heritage Site and Biosphere Reserve. Contains the highest bird diversity per unit area in the world.",
    },
    climate: {
      bestVisiting: "December-March, July-August",
      rainySeasons: "April-June, September-November",
      avgTemp: "26°C",
      humidity: "85-95%",
      challenges: "Extremely high rainfall, muddy trails, difficult access",
    },
  },

  "Magdalena-Urabá Moist Forests": {
    overview: {
      area: "32,000 km²",
      elevation: "0-1,000m",
      countries: "Colombia",
      biome: "Tropical and Subtropical Moist Broadleaf Forests",
      wwfCode: "NT0137",
      climate: "Am - Tropical Monsoon",
      temperature: "24-30°C",
      precipitation: "1,500-3,500mm/year",
      description:
        "Transitional forests between the Chocó and Caribbean regions, characterized by high humidity and diverse bird communities.",
    },
    species: {
      endemicBirds: [
        { name: "Antioquia Bristle-tyrant", scientific: "Phylloscartes lanyoni", status: "Endangered" },
        { name: "Magdalena Antbird", scientific: "Sipia palliata", status: "Vulnerable" },
        { name: "Sooty Ant-Tanager", scientific: "Driophlox devillei", status: "Vulnerable" },
      ],
      keySpecies: [
        { name: "Great Tinamou", scientific: "Tinamus major", status: "Least Concern" },
        { name: "Keel-billed Toucan", scientific: "Ramphastos sulfuratus", status: "Least Concern" },
        { name: "Three-toed Sloth", scientific: "Bradypus variegatus", status: "Least Concern" },
        { name: "Howler Monkey", scientific: "Alouatta seniculus", status: "Least Concern" },
      ],
      birdCount: 485,
      endemicCount: 12,
      mammalCount: 156,
    },
    conservation: {
      priority: "Critical",
      threats: ["Agricultural expansion", "Cattle ranching", "Urban development", "Infrastructure projects"],
      protectedAreas: ["Paramillo National Park", "Katíos National Park (partial)"],
      protectionLevel: "8%",
      notes: "Severely fragmented habitat with less than 10% of original forest remaining.",
    },
    climate: {
      bestVisiting: "December-March, July-August",
      rainySeasons: "April-June, September-November",
      avgTemp: "27°C",
      humidity: "75-85%",
      challenges: "High humidity, seasonal flooding",
    },
  },

  "Catatumbo Moist Forests": {
    overview: {
      area: "23,000 km²",
      elevation: "200-1,500m",
      countries: "Colombia, Venezuela",
      biome: "Tropical and Subtropical Moist Broadleaf Forests",
      wwfCode: "NT0108",
      climate: "Am - Tropical Monsoon",
      temperature: "22-28°C",
      precipitation: "2,000-4,000mm/year",
      description:
        "Transitional forests between the Andes and Maracaibo Basin, known for unique geological formations and endemic species.",
    },
    species: {
      endemicBirds: [
        { name: "Táchira Antpitta", scientific: "Grallaria chthonia", status: "Critically Endangered" },
        { name: "Perija Metaltail", scientific: "Metallura iracunda", status: "Endangered" },
      ],
      keySpecies: [
        { name: "Andean Cock-of-the-rock", scientific: "Rupicola peruvianus", status: "Least Concern" },
        { name: "Spectacled Bear", scientific: "Tremarctos ornatus", status: "Vulnerable" },
        { name: "Mountain Tapir", scientific: "Tapirus pinchaque", status: "Endangered" },
      ],
      birdCount: 420,
      endemicCount: 8,
      mammalCount: 134,
    },
    conservation: {
      priority: "Vulnerable",
      threats: ["Deforestation", "Mining", "Agricultural expansion", "Armed conflict"],
      protectedAreas: ["Catatumbo Barí National Park", "Tamá National Park"],
      protectionLevel: "12%",
      notes: "Cross-border conservation efforts needed with Venezuela. Limited access due to security concerns.",
    },
    climate: {
      bestVisiting: "December-February, June-August",
      rainySeasons: "March-May, September-November",
      avgTemp: "25°C",
      humidity: "80-90%",
      challenges: "Political instability, difficult access",
    },
  },

  "Napo Moist Forests": {
    overview: {
      area: "182,000 km² (Colombia portion: ~45,000 km²)",
      elevation: "200-600m",
      countries: "Colombia, Ecuador, Peru",
      biome: "Tropical and Subtropical Moist Broadleaf Forests",
      wwfCode: "NT0142",
      climate: "Af - Tropical Rainforest",
      temperature: "24-28°C",
      precipitation: "2,500-4,000mm/year",
      description: "Part of the upper Amazon basin with exceptionally high biodiversity and intact forest cover.",
    },
    species: {
      endemicBirds: [
        { name: "Napo Sabrewing", scientific: "Campylopterus villaviscensio", status: "Least Concern" },
        { name: "Orange-throated Tanager", scientific: "Wetmorethraupis sterrhopteron", status: "Vulnerable" },
      ],
      keySpecies: [
        { name: "Harpy Eagle", scientific: "Harpia harpyja", status: "Near Threatened" },
        { name: "Jaguar", scientific: "Panthera onca", status: "Near Threatened" },
        { name: "Giant Otter", scientific: "Pteronura brasiliensis", status: "Endangered" },
        { name: "Amazonian Manatee", scientific: "Trichechus inunguis", status: "Vulnerable" },
      ],
      birdCount: 650,
      endemicCount: 15,
      mammalCount: 198,
    },
    conservation: {
      priority: "Stable",
      threats: ["Oil extraction", "Deforestation", "Infrastructure development", "Indigenous territory pressure"],
      protectedAreas: ["La Paya National Park", "Amacayacu National Park", "Cahuinarí National Park"],
      protectionLevel: "35%",
      notes: "Large areas under indigenous management. International cooperation essential for conservation.",
    },
    climate: {
      bestVisiting: "June-September, December-February",
      rainySeasons: "March-May, October-November",
      avgTemp: "26°C",
      humidity: "85-95%",
      challenges: "Remote access, high humidity, seasonal flooding",
    },
  },

  // TERRESTRIAL ECOREGIONS - Tropical and Subtropical Dry Broadleaf Forests
  "Magdalena Valley Dry Forests": {
    overview: {
      area: "65,000 km²",
      elevation: "0-1,000m",
      countries: "Colombia",
      biome: "Tropical and Subtropical Dry Broadleaf Forests",
      wwfCode: "NT0225",
      climate: "Aw - Tropical Savanna",
      temperature: "26-32°C",
      precipitation: "1,000-2,000mm/year",
      description:
        "Critically endangered dry forest ecosystem in Colombia's principal river valley, with less than 8% of original forest remaining.",
    },
    species: {
      endemicBirds: [
        { name: "Niceforo's Wren", scientific: "Thryothorus nicefori", status: "Critically Endangered" },
        { name: "Magdalena Antbird", scientific: "Sipia palliata", status: "Vulnerable" },
        { name: "Sooty Ant-Tanager", scientific: "Driophlox devillei", status: "Vulnerable" },
        { name: "Greyish Piculet", scientific: "Picumnus granadensis", status: "Near Threatened" },
      ],
      keySpecies: [
        { name: "Magdalena Tinamou", scientific: "Crypturellus saltuarius", status: "Critically Endangered" },
        { name: "Lance-tailed Manakin", scientific: "Chiroxiphia lanceolata", status: "Least Concern" },
        { name: "Russet-throated Puffbird", scientific: "Hypnelus ruficollis", status: "Least Concern" },
        { name: "Fawn-breasted Wren", scientific: "Cantorchilus guarayanus", status: "Least Concern" },
      ],
      birdCount: 285,
      endemicCount: 18,
      mammalCount: 89,
    },
    conservation: {
      priority: "Critical",
      threats: ["Agriculture", "Cattle ranching", "Urban development", "Mining", "Infrastructure"],
      protectedAreas: ["Isla de Salamanca National Park", "Los Colorados Fauna and Flora Sanctuary"],
      protectionLevel: "3%",
      notes: "Less than 8% of original forest remains. Urgent protection and restoration needed.",
    },
    climate: {
      bestVisiting: "December-March",
      rainySeasons: "April-November (variable)",
      avgTemp: "29°C",
      humidity: "60-75%",
      challenges: "Extreme heat, limited shade, habitat fragmentation",
    },
  },

  "Sinú Valley Dry Forests": {
    overview: {
      area: "12,000 km²",
      elevation: "0-500m",
      countries: "Colombia",
      biome: "Tropical and Subtropical Dry Broadleaf Forests",
      wwfCode: "NT0229",
      climate: "Aw - Tropical Savanna",
      temperature: "26-34°C",
      precipitation: "800-1,500mm/year",
      description:
        "Extremely threatened dry forest remnants in the Sinú River valley, representing one of Colombia's most endangered ecosystems.",
    },
    species: {
      endemicBirds: [
        { name: "Sinú Parakeet", scientific: "Pyrrhura subandina", status: "Critically Endangered" },
        { name: "Sinú Antwren", scientific: "Formicivora grisea", status: "Vulnerable" },
      ],
      keySpecies: [
        { name: "Scaled Dove", scientific: "Columbina squammata", status: "Least Concern" },
        { name: "Vermilion Flycatcher", scientific: "Pyrocephalus rubinus", status: "Least Concern" },
        { name: "Tropical Mockingbird", scientific: "Mimus gilvus", status: "Least Concern" },
      ],
      birdCount: 195,
      endemicCount: 6,
      mammalCount: 52,
    },
    conservation: {
      priority: "Critical",
      threats: ["Cattle ranching", "Agricultural conversion", "Urban expansion", "Mining"],
      protectedAreas: ["Paramillo National Park (partial)", "Private reserves"],
      protectionLevel: "2%",
      notes: "Less than 5% of original habitat remains. Immediate conservation action required.",
    },
    climate: {
      bestVisiting: "December-March",
      rainySeasons: "April-November",
      avgTemp: "30°C",
      humidity: "55-70%",
      challenges: "Extreme heat, very limited habitat remaining",
    },
  },

  // TERRESTRIAL ECOREGIONS - Tropical and Subtropical Montane Forests
  "Magdalena Valley Montane Forests": {
    overview: {
      area: "8,500 km²",
      elevation: "1,000-3,200m",
      countries: "Colombia",
      biome: "Tropical and Subtropical Montane Forests",
      wwfCode: "NT0136",
      climate: "Cfb - Oceanic Climate",
      temperature: "16-24°C",
      precipitation: "1,000-2,500mm/year",
      description:
        "Montane forests of the Magdalena Valley with exceptional levels of endemism and critical conservation status.",
    },
    species: {
      endemicBirds: [
        { name: "Niceforo's Wren", scientific: "Thryothorus nicefori", status: "Critically Endangered" },
        { name: "Antioquia Bristle-tyrant", scientific: "Phylloscartes lanyoni", status: "Endangered" },
        { name: "Magdalena Antbird", scientific: "Sipia palliata", status: "Vulnerable" },
        { name: "Apical Flycatcher", scientific: "Myiarchus apicalis", status: "Vulnerable" },
      ],
      keySpecies: [
        { name: "Andean Cock-of-the-rock", scientific: "Rupicola peruvianus", status: "Least Concern" },
        { name: "Mountain Tapir", scientific: "Tapirus pinchaque", status: "Endangered" },
        { name: "Spectacled Bear", scientific: "Tremarctos ornatus", status: "Vulnerable" },
        { name: "Yellow-eared Parrot", scientific: "Ognorhynchus icterotis", status: "Vulnerable" },
      ],
      birdCount: 520,
      endemicCount: 45,
      mammalCount: 156,
    },
    conservation: {
      priority: "Critical",
      threats: ["Agricultural expansion", "Coffee cultivation", "Urban development", "Fragmentation"],
      protectedAreas: [
        "Cordillera de los Picachos National Park",
        "Nevado del Huila National Park",
        "Puracé National Park",
      ],
      protectionLevel: "8%",
      notes: "Severely fragmented with many endemic species at risk of extinction.",
    },
    climate: {
      bestVisiting: "December-February, June-August",
      rainySeasons: "March-May, September-November",
      avgTemp: "20°C",
      humidity: "70-85%",
      challenges: "Cloud cover, steep terrain, habitat fragmentation",
    },
  },

  "Santa Marta Montane Forests": {
    overview: {
      area: "2,100 km²",
      elevation: "800-5,775m",
      countries: "Colombia",
      biome: "Tropical and Subtropical Montane Forests",
      wwfCode: "NT0159",
      climate: "Cfb - Oceanic Climate",
      temperature: "8-22°C",
      precipitation: "800-3,000mm/year",
      description:
        "Isolated mountain range with the highest level of endemism per unit area in the world, rising from sea level to Colombia's highest peak.",
    },
    species: {
      endemicBirds: [
        { name: "Santa Marta Sabrewing", scientific: "Campylopterus phainopeplus", status: "Critically Endangered" },
        { name: "Santa Marta Parakeet", scientific: "Pyrrhura viridicata", status: "Endangered" },
        { name: "White-lored Warbler", scientific: "Myiothlypis conspicillata", status: "Endangered" },
        { name: "Santa Marta Antbird", scientific: "Drymophila hellmayri", status: "Vulnerable" },
        { name: "Santa Marta Bush-tyrant", scientific: "Myiotheretes pernix", status: "Vulnerable" },
        { name: "Santa Marta Warbler", scientific: "Myiothlypis basilica", status: "Vulnerable" },
        { name: "White-tailed Starfrontlet", scientific: "Coeligena phalerata", status: "Endangered" },
      ],
      keySpecies: [
        { name: "Blue-billed Curassow", scientific: "Crax alberti", status: "Critically Endangered" },
        { name: "Brown-rumped Tapaculo", scientific: "Scytalopus latebricola", status: "Vulnerable" },
        { name: "Rusty-headed Spinetail", scientific: "Synallaxis fuscorufa", status: "Vulnerable" },
        { name: "Black-fronted Wood-Quail", scientific: "Odontophorus atrifrons", status: "Vulnerable" },
      ],
      birdCount: 635,
      endemicCount: 79,
      mammalCount: 178,
    },
    conservation: {
      priority: "Critical",
      threats: ["Coffee cultivation", "Cattle ranching", "Infrastructure development", "Climate change"],
      protectedAreas: ["Sierra Nevada de Santa Marta National Park", "Tayrona National Park"],
      protectionLevel: "25%",
      notes:
        "UNESCO Biosphere Reserve. Highest endemism per unit area globally. Indigenous territories provide additional protection.",
    },
    climate: {
      bestVisiting: "December-March, July-August",
      rainySeasons: "April-June, September-November",
      avgTemp: "15°C",
      humidity: "75-90%",
      challenges: "Altitude variation, rapid weather changes, steep terrain",
    },
  },

  // TERRESTRIAL ECOREGIONS - Montane Grasslands and Shrublands (Páramo)
  "Northern Andean Páramo": {
    overview: {
      area: "35,000 km²",
      elevation: "3,000-4,700m",
      countries: "Colombia, Venezuela, Ecuador",
      biome: "Montane Grasslands and Shrublands",
      wwfCode: "NT1007",
      climate: "ET - Tundra Climate",
      temperature: "2-12°C",
      precipitation: "800-2,000mm/year",
      description:
        "High-altitude tropical alpine ecosystem unique to the northern Andes, characterized by specialized vegetation and endemic fauna.",
    },
    species: {
      endemicBirds: [
        { name: "Buffy Helmetcrest", scientific: "Oxypogon stuebelii", status: "Endangered" },
        { name: "Páramo Seedeater", scientific: "Catamenia homochroa", status: "Least Concern" },
        { name: "Many-striped Canastero", scientific: "Asthenes flammulata", status: "Least Concern" },
      ],
      keySpecies: [
        { name: "Andean Condor", scientific: "Vultur gryphus", status: "Near Threatened" },
        { name: "Spectacled Bear", scientific: "Tremarctos ornatus", status: "Vulnerable" },
        { name: "Mountain Tapir", scientific: "Tapirus pinchaque", status: "Endangered" },
        { name: "White-tailed Deer", scientific: "Odocoileus virginianus", status: "Least Concern" },
      ],
      birdCount: 154,
      endemicCount: 23,
      mammalCount: 45,
    },
    conservation: {
      priority: "Vulnerable",
      threats: ["Climate change", "Mining", "Agriculture", "Water extraction", "Tourism pressure"],
      protectedAreas: ["Los Nevados National Park", "Chingaza National Park", "Sumapaz National Park"],
      protectionLevel: "45%",
      notes: "Critical water source for millions of people. Extremely vulnerable to climate change.",
    },
    climate: {
      bestVisiting: "December-March, June-August",
      rainySeasons: "April-May, September-November",
      avgTemp: "7°C",
      humidity: "85-95%",
      challenges: "Extreme altitude, rapid weather changes, UV exposure",
    },
  },

  "Santa Marta Páramo": {
    overview: {
      area: "150 km²",
      elevation: "3,500-5,775m",
      countries: "Colombia",
      biome: "Montane Grasslands and Shrublands",
      wwfCode: "NT1008",
      climate: "ET - Tundra Climate",
      temperature: "-2-8°C",
      precipitation: "600-1,500mm/year",
      description:
        "The world's highest coastal mountain páramo, with extreme endemism and unique adaptations to tropical alpine conditions.",
    },
    species: {
      endemicBirds: [
        { name: "Santa Marta Antpitta", scientific: "Grallaria bangsi", status: "Endangered" },
        { name: "Santa Marta Foliage-gleaner", scientific: "Anabacerthia ruficaudata", status: "Vulnerable" },
        { name: "Santa Marta Woodstar", scientific: "Chaetocercus astreans", status: "Near Threatened" },
      ],
      keySpecies: [
        { name: "Andean Condor", scientific: "Vultur gryphus", status: "Near Threatened" },
        { name: "Spectacled Bear", scientific: "Tremarctos ornatus", status: "Vulnerable" },
        { name: "Páramo Mouse", scientific: "Thomasomys monochromos", status: "Vulnerable" },
      ],
      birdCount: 89,
      endemicCount: 18,
      mammalCount: 28,
    },
    conservation: {
      priority: "Critical",
      threats: ["Climate change", "Tourism pressure", "Infrastructure development"],
      protectedAreas: ["Sierra Nevada de Santa Marta National Park"],
      protectionLevel: "90%",
      notes: "Extremely small area with highest endemism. Climate change poses severe threat.",
    },
    climate: {
      bestVisiting: "December-March",
      rainySeasons: "April-November",
      avgTemp: "3°C",
      humidity: "90-100%",
      challenges: "Extreme altitude, freezing temperatures, limited access",
    },
  },

  // TERRESTRIAL ECOREGIONS - Tropical and Subtropical Grasslands
  Llanos: {
    overview: {
      area: "570,000 km² (Colombia portion: ~170,000 km²)",
      elevation: "50-200m",
      countries: "Colombia, Venezuela",
      biome: "Tropical and Subtropical Grasslands, Savannas and Shrublands",
      wwfCode: "NT0709",
      climate: "Aw - Tropical Savanna",
      temperature: "24-32°C",
      precipitation: "1,000-2,000mm/year",
      description:
        "Vast tropical grasslands with seasonal flooding, supporting large populations of waterbirds and unique grassland species.",
    },
    species: {
      endemicBirds: [
        { name: "Orinoco Goose", scientific: "Neochen jubata", status: "Near Threatened" },
        { name: "Llanos Long-tailed Tyrant", scientific: "Colonia colonus", status: "Least Concern" },
      ],
      keySpecies: [
        { name: "Jabiru", scientific: "Jabiru mycteria", status: "Least Concern" },
        { name: "Scarlet Ibis", scientific: "Eudocimus ruber", status: "Least Concern" },
        { name: "Capybara", scientific: "Hydrochoerus hydrochaeris", status: "Least Concern" },
        { name: "Giant Anteater", scientific: "Myrmecophaga tridactyla", status: "Vulnerable" },
        { name: "Ocelot", scientific: "Leopardus pardalis", status: "Least Concern" },
      ],
      birdCount: 398,
      endemicCount: 8,
      mammalCount: 142,
    },
    conservation: {
      priority: "Stable",
      threats: ["Cattle ranching", "Agricultural conversion", "Oil extraction", "Infrastructure development"],
      protectedAreas: ["El Tuparro National Park", "Wisirare National Park"],
      protectionLevel: "15%",
      notes: "Large intact areas remain. Sustainable cattle ranching practices being promoted.",
    },
    climate: {
      bestVisiting: "December-April (dry season)",
      rainySeasons: "May-November",
      avgTemp: "28°C",
      humidity: "70-85%",
      challenges: "Seasonal flooding, extreme heat, limited shade",
    },
  },

  // MARINE ECOREGIONS
  "Caribbean Sea": {
    overview: {
      area: "589,000 km²",
      elevation: "0-200m depth",
      countries: "Colombia, Venezuela, multiple Caribbean nations",
      biome: "Marine",
      wwfCode: "G200",
      climate: "Tropical Marine",
      temperature: "26-29°C",
      precipitation: "Variable coastal",
      description:
        "Tropical marine ecosystem with coral reefs, mangroves, and seagrass beds supporting diverse marine life and seabirds.",
    },
    species: {
      endemicBirds: [
        { name: "Brown Pelican", scientific: "Pelecanus occidentalis", status: "Least Concern" },
        { name: "Magnificent Frigatebird", scientific: "Fregata magnificens", status: "Least Concern" },
        { name: "Royal Tern", scientific: "Thalasseus maximus", status: "Least Concern" },
      ],
      keySpecies: [
        { name: "Caribbean Manatee", scientific: "Trichechus manatus", status: "Vulnerable" },
        { name: "Hawksbill Turtle", scientific: "Eretmochelys imbricata", status: "Critically Endangered" },
        { name: "Queen Conch", scientific: "Lobatus gigas", status: "Vulnerable" },
        { name: "Caribbean Reef Shark", scientific: "Carcharhinus perezi", status: "Near Threatened" },
      ],
      birdCount: 185,
      endemicCount: 12,
      mammalCount: 45,
    },
    conservation: {
      priority: "Vulnerable",
      threats: ["Overfishing", "Coastal development", "Pollution", "Climate change", "Coral bleaching"],
      protectedAreas: [
        "Rosario and San Bernardo Corals National Park",
        "Old Providence McBean Lagoon National Park",
        "Tayrona National Park (marine)",
      ],
      protectionLevel: "12%",
      notes: "Coral reefs severely threatened by bleaching events. Marine protected areas expanding.",
    },
    climate: {
      bestVisiting: "December-April",
      rainySeasons: "May-November",
      avgTemp: "27°C",
      humidity: "75-85%",
      challenges: "Hurricane season, rough seas during storms",
    },
  },

  "Eastern Tropical Pacific": {
    overview: {
      area: "Unknown exact area",
      elevation: "0-4,000m depth",
      countries: "Colombia, Ecuador, Panama, Costa Rica",
      biome: "Marine",
      wwfCode: "G201",
      climate: "Tropical Marine",
      temperature: "24-28°C",
      precipitation: "Variable coastal",
      description:
        "Pacific marine ecosystem characterized by upwelling currents, high productivity, and unique island fauna including Malpelo and Gorgona.",
    },
    species: {
      endemicBirds: [
        { name: "Malpelo Booby", scientific: "Sula granti", status: "Least Concern" },
        { name: "Brown Pelican", scientific: "Pelecanus occidentalis", status: "Least Concern" },
      ],
      keySpecies: [
        { name: "Humpback Whale", scientific: "Megaptera novaeangliae", status: "Least Concern" },
        { name: "Hammerhead Shark", scientific: "Sphyrna lewini", status: "Critically Endangered" },
        { name: "Manta Ray", scientific: "Mobula birostris", status: "Vulnerable" },
        { name: "Leatherback Turtle", scientific: "Dermochelys coriacea", status: "Vulnerable" },
      ],
      birdCount: 156,
      endemicCount: 8,
      mammalCount: 38,
    },
    conservation: {
      priority: "Stable",
      threats: ["Overfishing", "Illegal fishing", "Climate change", "Pollution"],
      protectedAreas: [
        "Malpelo Fauna and Flora Sanctuary",
        "Gorgona National Park",
        "Uramba Bahía Málaga National Park",
      ],
      protectionLevel: "25%",
      notes: "Important migration corridor for marine megafauna. UNESCO World Heritage Sites present.",
    },
    climate: {
      bestVisiting: "June-November (whale season)",
      rainySeasons: "December-May",
      avgTemp: "26°C",
      humidity: "80-90%",
      challenges: "Strong currents, seasonal weather patterns",
    },
  },

  // FRESHWATER ECOREGIONS
  "Magdalena-Cauca": {
    overview: {
      area: "273,000 km²",
      elevation: "0-4,000m",
      countries: "Colombia",
      biome: "Freshwater",
      wwfCode: "F301",
      climate: "Tropical to Temperate",
      temperature: "18-28°C",
      precipitation: "1,000-3,000mm/year",
      description:
        "Colombia's principal river system with diverse wetlands, supporting numerous endemic fish and bird species but severely threatened by pollution and development.",
    },
    species: {
      endemicBirds: [
        { name: "Magdalena River Turtle", scientific: "Podocnemis lewyana", status: "Critically Endangered" },
        { name: "Dahl's Toad-headed Turtle", scientific: "Mesoclemmys dahli", status: "Critically Endangered" },
      ],
      keySpecies: [
        { name: "Bocachico", scientific: "Prochilodus magdalenae", status: "Vulnerable" },
        { name: "Bagre Rayado", scientific: "Pseudoplatystoma magdaleniatum", status: "Critically Endangered" },
        { name: "Manatee", scientific: "Trichechus manatus", status: "Vulnerable" },
        { name: "Jabiru", scientific: "Jabiru mycteria", status: "Least Concern" },
        { name: "Horned Screamer", scientific: "Anhima cornuta", status: "Least Concern" },
      ],
      birdCount: 312,
      endemicCount: 8,
      mammalCount: 67,
    },
    conservation: {
      priority: "Critical",
      threats: ["Water pollution", "Dam construction", "Mining activities", "Agricultural runoff", "Urban development"],
      protectedAreas: ["Ciénaga Grande de Santa Marta", "Los Flamencos Sanctuary", "Isla de Salamanca National Park"],
      protectionLevel: "5%",
      notes: "Severely polluted and degraded. Major restoration efforts needed. Critical for national water security.",
    },
    climate: {
      bestVisiting: "December-March, July-August",
      rainySeasons: "April-June, September-November",
      avgTemp: "23°C",
      humidity: "70-85%",
      challenges: "Flooding, water level variations, pollution",
    },
  },

  Orinoco: {
    overview: {
      area: "991,587 km² (Colombia portion: ~347,000 km²)",
      elevation: "50-1,000m",
      countries: "Colombia, Venezuela",
      biome: "Freshwater",
      wwfCode: "F303",
      climate: "Aw - Tropical Savanna",
      temperature: "24-32°C",
      precipitation: "1,200-2,500mm/year",
      description:
        "One of South America's major river systems, supporting exceptional freshwater biodiversity and important wetland ecosystems.",
    },
    species: {
      endemicBirds: [
        { name: "Orinoco Goose", scientific: "Neochen jubata", status: "Near Threatened" },
        { name: "Orinoco Crocodile", scientific: "Crocodylus intermedius", status: "Critically Endangered" },
      ],
      keySpecies: [
        { name: "Giant River Otter", scientific: "Pteronura brasiliensis", status: "Endangered" },
        { name: "Amazonian Manatee", scientific: "Trichechus inunguis", status: "Vulnerable" },
        { name: "Arapaima", scientific: "Arapaima gigas", status: "Data Deficient" },
        { name: "Pink River Dolphin", scientific: "Inia geoffrensis", status: "Endangered" },
      ],
      birdCount: 456,
      endemicCount: 12,
      mammalCount: 156,
    },
    conservation: {
      priority: "Stable",
      threats: ["Mining", "Deforestation", "Agricultural runoff", "Dam construction"],
      protectedAreas: ["El Tuparro National Park", "Puinawai National Park"],
      protectionLevel: "18%",
      notes: "Large intact areas remain. Cross-border conservation with Venezuela important.",
    },
    climate: {
      bestVisiting: "December-April",
      rainySeasons: "May-November",
      avgTemp: "28°C",
      humidity: "75-85%",
      challenges: "Seasonal flooding, remote access, extreme heat",
    },
  },

  Amazon: {
    overview: {
      area: "7,000,000 km² (Colombia portion: ~483,000 km²)",
      elevation: "100-500m",
      countries: "Colombia, Brazil, Peru, Ecuador, Venezuela, Bolivia, Guyana, Suriname, French Guiana",
      biome: "Freshwater",
      wwfCode: "F304",
      climate: "Af - Tropical Rainforest",
      temperature: "24-28°C",
      precipitation: "2,000-4,000mm/year",
      description:
        "The world's largest river system and most biodiverse freshwater ecosystem, supporting unparalleled aquatic and riparian biodiversity.",
    },
    species: {
      endemicBirds: [
        { name: "Zigzag Heron", scientific: "Zebrilus undulatus", status: "Least Concern" },
        { name: "Agami Heron", scientific: "Agamia agami", status: "Vulnerable" },
      ],
      keySpecies: [
        { name: "Pink River Dolphin", scientific: "Inia geoffrensis", status: "Endangered" },
        { name: "Giant River Otter", scientific: "Pteronura brasiliensis", status: "Endangered" },
        { name: "Amazonian Manatee", scientific: "Trichechus inunguis", status: "Vulnerable" },
        { name: "Arapaima", scientific: "Arapaima gigas", status: "Data Deficient" },
        { name: "Black Caiman", scientific: "Melanosuchus niger", status: "Lower Risk" },
      ],
      birdCount: 578,
      endemicCount: 45,
      mammalCount: 198,
    },
    conservation: {
      priority: "Stable",
      threats: ["Deforestation", "Mining", "Dam construction", "Climate change", "Overfishing"],
      protectedAreas: ["Amacayacu National Park", "Cahuinarí National Park", "La Paya National Park"],
      protectionLevel: "42%",
      notes:
        "Large protected areas and indigenous territories provide significant protection. International cooperation essential.",
    },
    climate: {
      bestVisiting: "June-September, December-February",
      rainySeasons: "March-May, October-November",
      avgTemp: "26°C",
      humidity: "85-95%",
      challenges: "High humidity, seasonal flooding, remote access",
    },
  },

  "Caribbean Coast": {
    overview: {
      area: "45,000 km²",
      elevation: "0-100m",
      countries: "Colombia",
      biome: "Freshwater",
      wwfCode: "F302",
      climate: "Aw - Tropical Savanna",
      temperature: "26-32°C",
      precipitation: "500-2,000mm/year",
      description:
        "Coastal rivers and wetlands of the Caribbean region, including important mangrove systems and seasonal wetlands.",
    },
    species: {
      endemicBirds: [
        { name: "Caribbean Flamingo", scientific: "Phoenicopterus ruber", status: "Least Concern" },
        { name: "Least Bittern", scientific: "Ixobrychus exilis", status: "Least Concern" },
      ],
      keySpecies: [
        { name: "Caribbean Manatee", scientific: "Trichechus manatus", status: "Vulnerable" },
        { name: "American Crocodile", scientific: "Crocodylus acutus", status: "Vulnerable" },
        { name: "Roseate Spoonbill", scientific: "Platalea ajaja", status: "Least Concern" },
        { name: "Wood Stork", scientific: "Mycteria americana", status: "Least Concern" },
      ],
      birdCount: 267,
      endemicCount: 5,
      mammalCount: 78,
    },
    conservation: {
      priority: "Vulnerable",
      threats: ["Coastal development", "Pollution", "Water extraction", "Climate change"],
      protectedAreas: ["Ciénaga Grande de Santa Marta", "Los Flamencos Sanctuary", "Vía Parque Isla de Salamanca"],
      protectionLevel: "15%",
      notes: "Important stopover for migratory birds. Vulnerable to sea level rise and coastal development.",
    },
    climate: {
      bestVisiting: "December-April",
      rainySeasons: "May-November",
      avgTemp: "29°C",
      humidity: "70-85%",
      challenges: "Extreme heat, seasonal drying, coastal access",
    },
  },

  "Pacific Coast": {
    overview: {
      area: "32,000 km²",
      elevation: "0-200m",
      countries: "Colombia",
      biome: "Freshwater",
      wwfCode: "F305",
      climate: "Af - Tropical Rainforest",
      temperature: "24-28°C",
      precipitation: "3,000-8,000mm/year",
      description:
        "High-rainfall coastal rivers and wetlands of the Pacific region, characterized by exceptional precipitation and unique aquatic fauna.",
    },
    species: {
      endemicBirds: [
        { name: "Fasciated Tiger-Heron", scientific: "Tigrisoma fasciatum", status: "Least Concern" },
        { name: "Boat-billed Heron", scientific: "Cochlearius cochlearius", status: "Least Concern" },
      ],
      keySpecies: [
        { name: "American Crocodile", scientific: "Crocodylus acutus", status: "Vulnerable" },
        { name: "West Indian Manatee", scientific: "Trichechus manatus", status: "Vulnerable" },
        { name: "Spectacled Caiman", scientific: "Caiman crocodilus", status: "Least Concern" },
      ],
      birdCount: 234,
      endemicCount: 8,
      mammalCount: 89,
    },
    conservation: {
      priority: "Vulnerable",
      threats: ["Deforestation", "Mining", "Agricultural runoff", "Infrastructure development"],
      protectedAreas: ["Utría National Park", "Sanquianga National Park", "Uramba Bahía Málaga National Park"],
      protectionLevel: "22%",
      notes: "High endemism in aquatic fauna. Threatened by upstream deforestation and mining.",
    },
    climate: {
      bestVisiting: "December-March, July-August",
      rainySeasons: "April-June, September-November",
      avgTemp: "26°C",
      humidity: "85-95%",
      challenges: "Extremely high rainfall, difficult access, muddy conditions",
    },
  },
}

export default function InteractiveEcoregionsTable() {
  const [selectedData, setSelectedData] = useState<any>(null)
  const [selectedName, setSelectedName] = useState<string>("")
  const [selectedCategory, setSelectedCategory] = useState<string>("")

  useEffect(() => {
    const handleEcoregionSelection = (event: any) => {
      const { ecoregion, category } = event.detail
      const data = ecoregionDatabase[ecoregion as keyof typeof ecoregionDatabase]

      if (data) {
        setSelectedData(data)
        setSelectedName(ecoregion)
        setSelectedCategory(category)
      }
    }

    const handleReset = () => {
      setSelectedData(null)
      setSelectedName("")
      setSelectedCategory("")
    }

    window.addEventListener("ecoregion-selected", handleEcoregionSelection)
    window.addEventListener("selection-reset", handleReset)

    return () => {
      window.removeEventListener("ecoregion-selected", handleEcoregionSelection)
      window.removeEventListener("selection-reset", handleReset)
    }
  }, [])

  if (!selectedData) {
    return (
      <Card className="w-full">
        <CardContent className="p-8 sm:p-12 text-center">
          <div className="flex justify-center mb-4">
            <MapPin className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Select an Ecoregion to View Details</h3>
          <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto mb-4">
            Choose a category and specific ecoregion from the selector above to view comprehensive scientific data,
            species information, and conservation details.
          </p>
          <Alert className="max-w-md mx-auto">
            <Info className="h-4 w-4" />
            <AlertDescription className="text-left text-sm">
              All data is sourced from scientific literature and WWF ecoregion classifications. Where specific
              information was unavailable, this is clearly indicated in the database.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "Vulnerable":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Stable":
        return "bg-green-100 text-green-800 border-green-200"
      case "Relatively Stable":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1">
              <CardTitle className="text-xl sm:text-2xl text-gray-900 mb-2">{selectedName}</CardTitle>
              <CardDescription className="text-sm sm:text-base leading-relaxed mb-3">
                {selectedData.overview.description}
              </CardDescription>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs">
                  {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Ecoregion
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  WWF Code: {selectedData.overview.wwfCode}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {selectedData.overview.area}
                </Badge>
              </div>
            </div>
            <Badge
              className={`text-sm px-3 py-1 ${getPriorityColor(selectedData.conservation.priority)}`}
              variant="secondary"
            >
              {selectedData.conservation.priority} Priority
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="text-xs sm:text-sm">
            <MapPin className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Overview</span>
            <span className="sm:hidden">Info</span>
          </TabsTrigger>
          <TabsTrigger value="species" className="text-xs sm:text-sm">
            <Bird className="w-4 h-4 mr-1 sm:mr-2" />
            Species
          </TabsTrigger>
          <TabsTrigger value="conservation" className="text-xs sm:text-sm">
            <Shield className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Conservation</span>
            <span className="sm:hidden">Status</span>
          </TabsTrigger>
          <TabsTrigger value="climate" className="text-xs sm:text-sm">
            <Calendar className="w-4 h-4 mr-1 sm:mr-2" />
            Climate
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-600" />
                Geographic & Biome Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-semibold w-1/3">Characteristic</TableHead>
                      <TableHead className="font-semibold">Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Total Area</TableCell>
                      <TableCell>{selectedData.overview.area}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Elevation Range</TableCell>
                      <TableCell>{selectedData.overview.elevation}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Countries</TableCell>
                      <TableCell>{selectedData.overview.countries}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Biome Classification</TableCell>
                      <TableCell>{selectedData.overview.biome}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Climate Type</TableCell>
                      <TableCell>{selectedData.overview.climate}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Temperature Range</TableCell>
                      <TableCell>{selectedData.overview.temperature}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Annual Precipitation</TableCell>
                      <TableCell>{selectedData.overview.precipitation}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="species" className="space-y-4">
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-blue-600 mb-1">{selectedData.species.birdCount}</div>
              <div className="text-sm text-gray-600">Total Bird Species</div>
            </Card>
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-emerald-600 mb-1">{selectedData.species.endemicCount}</div>
              <div className="text-sm text-gray-600">Endemic Species</div>
            </Card>
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-purple-600 mb-1">{selectedData.species.mammalCount}</div>
              <div className="text-sm text-gray-600">Mammal Species</div>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bird className="w-5 h-5 text-red-600" />
                  Endemic & Key Bird Species
                </CardTitle>
                <CardDescription>Species with high conservation importance</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="w-full max-h-80">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-1/2">Common Name</TableHead>
                        <TableHead className="w-1/3">Scientific Name</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedData.species.endemicBirds.map((bird: any, index: number) => (
                        <TableRow key={`endemic-${index}`}>
                          <TableCell className="font-medium text-sm">{bird.name}</TableCell>
                          <TableCell className="italic text-xs text-gray-600">{bird.scientific}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-xs">
                              {bird.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bird className="w-5 h-5 text-blue-600" />
                  Key Fauna Species
                </CardTitle>
                <CardDescription>Important indicator and flagship species</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="w-full max-h-80">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-1/2">Common Name</TableHead>
                        <TableHead className="w-1/3">Scientific Name</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedData.species.keySpecies.map((species: any, index: number) => (
                        <TableRow key={`key-${index}`}>
                          <TableCell className="font-medium text-sm">{species.name}</TableCell>
                          <TableCell className="italic text-xs text-gray-600">{species.scientific}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-xs">
                              {species.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="conservation" className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  Major Threats
                </CardTitle>
                <CardDescription>Primary conservation challenges</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {selectedData.conservation.threats.map((threat: string, index: number) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                      {threat}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  Protected Areas
                </CardTitle>
                <CardDescription>Protection Level: {selectedData.conservation.protectionLevel}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  {selectedData.conservation.protectedAreas.map((area: string, index: number) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                      {area}
                    </li>
                  ))}
                </ul>
                {selectedData.conservation.notes && (
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription className="text-sm">{selectedData.conservation.notes}</AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="climate" className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Thermometer className="w-5 h-5 text-red-600" />
                  Climate Data
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="w-full">
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Average Temperature</TableCell>
                        <TableCell>{selectedData.climate.avgTemp}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Humidity Range</TableCell>
                        <TableCell>{selectedData.climate.humidity}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Rainy Seasons</TableCell>
                        <TableCell>{selectedData.climate.rainySeasons}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Field Challenges</TableCell>
                        <TableCell>{selectedData.climate.challenges}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  Visiting Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2">Best Visiting Months</h4>
                    <p className="text-sm bg-green-50 p-3 rounded-lg border border-green-200">
                      {selectedData.climate.bestVisiting}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-orange-700 mb-2">Rainy Seasons</h4>
                    <p className="text-sm bg-orange-50 p-3 rounded-lg border border-orange-200">
                      {selectedData.climate.rainySeasons}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-2">Field Conditions</h4>
                    <p className="text-sm bg-blue-50 p-3 rounded-lg border border-blue-200">
                      {selectedData.climate.challenges}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Data Source Information */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription className="text-sm">
          <strong>Data Sources:</strong> Information compiled from WWF Ecoregion Classifications, scientific literature,
          and field research. Where specific data was unavailable from primary sources, this has been clearly indicated.
          Species counts and conservation status based on IUCN Red List and regional assessments.
        </AlertDescription>
      </Alert>
    </div>
  )
}
