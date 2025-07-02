export const caribbeanData = {
  hero: {
    title: "Caribbean Coast & Foothills",
    subtitle: "Discover coastal & Sierra Nevada foothills – Riohacha, Las Gaviotas, mangroves & dry forest.",
    videoSrc: "/videos/caribbean-drone.mp4",
    videoPoster: "/images/cardinal-guajiro.jpg",
  },

  highlights: {
    birds: [
      "Lance-tailed Manakin",
      "White-bellied Antbird",
      "Buff-breasted Wren",
      "Barred Antshrike",
      "Crimson-crested Woodpecker",
    ],
    habitats: [
      "Las Gaviotas & Río Ancho lowland forests",
      "Riohacha scrub",
      "Salamanca/Flamencos mangroves",
      "Tayrona National Park dry forest",
    ],
    targets: ["Crested Bobwhite", "Groove-billed Ani", "Red-billed Emerald", "Pied Puffbird", "Bicolored Conebill"],
  },

  // Caribbean-specific bird data for the carousel
  carouselBirds: [
    {
      id: "1",
      commonName: "Vermilion Cardinal",
      scientificName: "Paroaria nigrogenis",
      spanishName: "Cardenal Guajiro",
      primaryRegion: "Caribbean Coast",
      secondaryRegions: ["Magdalena Valley"],
      ecoregions: ["Dry tropical forest", "Thorny scrubland", "Desert edges", "Arid lowlands"],
      regionSlug: "caribbean-coast",
      status: "Endemic",
      difficulty: "Moderate",
      habitat: "Dry scrublands and thorny forests of the Guajira Peninsula",
      bestTime: "December - April (dry season)",
      elevation: "0 - 800m",
      image: "/images/cardinal-guajiro.jpg",
      photoCredit: {
        photographer: "Royann Petrell",
        title: "Wildlife Photographer",
      },
    },
    {
      id: "2",
      commonName: "Lance-tailed Manakin",
      scientificName: "Chiroxiphia lanceolata",
      spanishName: "Saltarín Colilargo",
      primaryRegion: "Caribbean Coast",
      secondaryRegions: ["Magdalena Valley"],
      ecoregions: ["Lowland forest", "Forest understory", "Secondary growth", "Gallery forest"],
      regionSlug: "caribbean-coast",
      status: "Near Endemic",
      difficulty: "Moderate",
      habitat: "Lowland forests and forest edges with dense understory",
      bestTime: "Year-round (most active early morning)",
      elevation: "0 - 1,200m",
      image: "/images/manakin-1.jpg",
      photoCredit: {
        photographer: "Martin Meléndro",
        title: "AVES Guide",
        teamLink: "/team#martin-melendro",
      },
    },
    {
      id: "3",
      commonName: "White-bellied Antbird",
      scientificName: "Myrmeciza longipes",
      spanishName: "Hormiguero Ventriblanco",
      primaryRegion: "Caribbean Coast",
      secondaryRegions: ["Magdalena Valley", "Pacific Coast Chocó"],
      ecoregions: ["Forest understory", "Dense leaf litter", "Army ant followers", "Humid lowland forest"],
      regionSlug: "caribbean-coast",
      status: "Spectacular",
      difficulty: "Challenging",
      habitat: "Dense forest understory, following army ant swarms",
      bestTime: "Year-round (dawn and dusk)",
      elevation: "0 - 1,500m",
      image: "/images/blue-bird.jpg",
      photoCredit: {
        photographer: "David Jara",
        title: "AVES Guide",
        teamLink: "/team#david-jara",
      },
    },
    {
      id: "4",
      commonName: "Buff-breasted Wren",
      scientificName: "Cantorchilus leucotis",
      spanishName: "Cucarachero Pechianteado",
      primaryRegion: "Caribbean Coast",
      secondaryRegions: ["Magdalena Valley"],
      ecoregions: ["Scrubland", "Thorny forest", "Desert edges", "Dry woodland"],
      regionSlug: "caribbean-coast",
      status: "Near Endemic",
      difficulty: "Easy",
      habitat: "Dry scrublands, thorny forests, and desert edges",
      bestTime: "Year-round (most vocal at dawn)",
      elevation: "0 - 1,000m",
      image: "/images/yellow-warbler.jpg",
      photoCredit: {
        photographer: "Nicolás Rozo",
        title: "AVES Guide",
        teamLink: "/team#nicolas-rozo",
      },
    },
    {
      id: "5",
      commonName: "Crimson-crested Woodpecker",
      scientificName: "Campephilus melanoleucos",
      spanishName: "Carpintero Crestirrojo",
      primaryRegion: "Caribbean Coast",
      secondaryRegions: ["Magdalena Valley", "Pacific Coast Chocó"],
      ecoregions: ["Dry forest", "Gallery forest", "Forest edges", "Large trees"],
      regionSlug: "caribbean-coast",
      status: "Spectacular",
      difficulty: "Moderate",
      habitat: "Dry forests and gallery forests with large trees",
      bestTime: "Year-round (most active early morning)",
      elevation: "0 - 1,800m",
      image: "/images/red-headed-barbet.jpg",
      photoCredit: {
        photographer: "Gleison Guarín",
        title: "AVES Guide",
        teamLink: "/team#gleison-guarin",
      },
    },
    {
      id: "6",
      commonName: "Red-billed Emerald",
      scientificName: "Chlorostilbon gibsoni",
      spanishName: "Esmeralda Piquirroja",
      primaryRegion: "Caribbean Coast",
      secondaryRegions: ["Magdalena Valley"],
      ecoregions: ["Gardens", "Forest edge", "Flowering trees", "Urban areas"],
      regionSlug: "caribbean-coast",
      status: "Endemic",
      difficulty: "Easy",
      habitat: "Gardens, forest edges, and areas with flowering plants",
      bestTime: "Year-round (most active during flowering seasons)",
      elevation: "0 - 1,500m",
      image: "/images/green-hermit-feeding.jpg",
      photoCredit: {
        photographer: "Juan Camilo",
        title: "AVES Guide",
        teamLink: "/team#juan-camilo",
      },
    },
  ],

  mapLocations: [
    {
      id: "riohacha",
      name: "Riohacha",
      coordinates: [11.5444, -72.9072],
      description: "Coastal scrubland birding with endemic species",
      highlights: ["Vermilion Cardinal", "Crested Bobwhite", "Groove-billed Ani"],
    },
    {
      id: "las-gaviotas",
      name: "Las Gaviotas",
      coordinates: [11.2167, -73.25],
      description: "Lowland forest birding paradise",
      highlights: ["Lance-tailed Manakin", "White-bellied Antbird", "Buff-breasted Wren"],
    },
    {
      id: "salamanca",
      name: "Salamanca National Park",
      coordinates: [11.0833, -74.0833],
      description: "Mangrove and coastal wetland birding",
      highlights: ["Red-billed Emerald", "Pied Puffbird", "Bicolored Conebill"],
    },
    {
      id: "tayrona",
      name: "Tayrona National Park",
      coordinates: [11.3167, -73.9667],
      description: "Dry forest and foothill trails",
      highlights: ["Barred Antshrike", "Crimson-crested Woodpecker", "Various tanagers"],
    },
  ],

  conciseItinerary: [
    {
      step: 1,
      title: "Arrival & Orientation",
      location: "Riohacha/Santa Marta",
      description:
        "Arrive at your coastal base and begin with orientation birding in nearby scrublands and coastal areas.",
      highlights: ["Airport transfer", "Welcome briefing", "First birding session", "Equipment check"],
    },
    {
      step: 2,
      title: "Lowland & Mangrove Birding",
      location: "Las Gaviotas & Salamanca",
      description: "Explore pristine lowland forests and mangrove ecosystems, targeting endemic and specialty species.",
      highlights: ["Las Gaviotas forest", "Mangrove birding", "Salamanca wetlands", "Endemic species focus"],
    },
    {
      step: 3,
      title: "Foothill & Tayrona Exploration",
      location: "Sierra Nevada foothills & Tayrona",
      description: "Venture into Sierra Nevada foothills and Tayrona's dry forest trails for diverse bird communities.",
      highlights: ["Foothill birding", "Tayrona trails", "Dry forest species", "Photography opportunities"],
    },
    {
      step: 4,
      title: "Cultural & Beach Wrap-up",
      location: "Tungueka & coastal areas",
      description: "Experience Kogi indigenous culture at Tungueka and enjoy final coastal birding before departure.",
      highlights: ["Kogi cultural visit", "Tungueka experience", "Final birding", "Departure preparation"],
    },
  ],

  expectations: {
    coastal: {
      icon: "🌴",
      title: "Coastal Diversity",
      description:
        "Experience incredible bird diversity across mangroves, scrublands, and coastal forests with over 200 species possible.",
    },
    endemic: {
      icon: "🦜",
      title: "Endemic Species",
      description: "Encounter unique Caribbean coast endemics and specialties found nowhere else in Colombia.",
    },
    climate: {
      icon: "☀️",
      title: "Perfect Climate",
      description: "Enjoy year-round birding weather with warm temperatures and minimal rainfall in coastal areas.",
    },
    culture: {
      icon: "🎭",
      title: "Cultural Immersion",
      description: "Connect with indigenous Kogi communities and learn about their deep relationship with nature.",
    },
  },

  keySpecies: [
    {
      name: "Vermilion Cardinal",
      scientificName: "Paroaria nigrogenis",
      image: "/images/cardinal-guajiro.jpg",
      description:
        "The crown jewel of Caribbean coastal birding, this stunning cardinal displays brilliant red plumage and is endemic to northern Colombia and Venezuela.",
      status: "Endemic",
      funFact:
        "Males perform elaborate courtship displays, raising their distinctive crests while singing from prominent perches.",
    },
    {
      name: "Lance-tailed Manakin",
      scientificName: "Chiroxiphia lanceolata",
      image: "/images/manakin-1.jpg",
      description:
        "A spectacular manakin species known for its cooperative breeding displays and distinctive long tail feathers.",
      status: "Resident",
      funFact:
        "Males perform synchronized courtship dances with multiple partners, creating one of nature's most elaborate displays.",
    },
    {
      name: "White-bellied Antbird",
      scientificName: "Myrmeciza longipes",
      image: "/images/blue-bird.jpg",
      description:
        "A secretive understory species that follows army ant swarms, representing the rich diversity of Caribbean lowland forests.",
      status: "Resident",
      funFact:
        "These birds have developed a unique relationship with army ants, following swarms to catch insects disturbed by the ants.",
    },
  ],

  testimonial: {
    quote:
      "The Caribbean coast exceeded all expectations! The diversity from mangroves to dry forests was incredible, and seeing the Vermilion Cardinal was a life-changing moment. Our guide's knowledge of both birds and local culture made this trip unforgettable.",
    author: "Sarah Mitchell",
    location: "Toronto, Canada",
    trip: "Caribbean Coast Adventure",
    rating: 5,
    image: "/placeholder-user.jpg",
  },

  speciesList: [
    { name: "Vermilion Cardinal", scientific: "Paroaria nigrogenis", status: "Endemic" },
    { name: "Lance-tailed Manakin", scientific: "Chiroxiphia lanceolata", status: "Resident" },
    { name: "White-bellied Antbird", scientific: "Myrmeciza longipes", status: "Resident" },
    { name: "Buff-breasted Wren", scientific: "Cantorchilus leucotis", status: "Resident" },
    { name: "Barred Antshrike", scientific: "Thamnophilus doliatus", status: "Resident" },
    { name: "Crimson-crested Woodpecker", scientific: "Campephilus melanoleucos", status: "Resident" },
    { name: "Crested Bobwhite", scientific: "Colinus cristatus", status: "Endemic" },
    { name: "Groove-billed Ani", scientific: "Crotophaga sulcirostris", status: "Resident" },
    { name: "Red-billed Emerald", scientific: "Chlorostilbon gibsoni", status: "Endemic" },
    { name: "Pied Puffbird", scientific: "Notharchus tectus", status: "Resident" },
    { name: "Bicolored Conebill", scientific: "Conirostrum bicolor", status: "Resident" },
    { name: "Rufous-tailed Hummingbird", scientific: "Amazilia tzacatl", status: "Resident" },
    { name: "Yellow-crowned Amazon", scientific: "Amazona ochrocephala", status: "Resident" },
    { name: "Collared Aracari", scientific: "Pteroglossus torquatus", status: "Resident" },
    { name: "Green Honeycreeper", scientific: "Chlorophanes spiza", status: "Resident" },
    { name: "Masked Trogon", scientific: "Trogon personatus", status: "Resident" },
    { name: "Yellow-throated Toucan", scientific: "Ramphastos ambiguus", status: "Resident" },
    { name: "King Vulture", scientific: "Sarcoramphus papa", status: "Resident" },
  ],

  detailedItinerary: [
    {
      day: 1,
      title: "Arrival in Santa Marta",
      activities: [
        "Airport pickup and transfer to accommodation",
        "Welcome briefing and equipment check",
        "Afternoon birding at Quinta de San Pedro Alejandrino",
        "Evening species checklist review",
      ],
      accommodation: "Hotel Casa Verde",
      meals: "Dinner",
    },
    {
      day: 2,
      title: "Riohacha Scrublands",
      activities: [
        "Early morning departure to Riohacha",
        "Scrubland birding for Vermilion Cardinal",
        "Coastal wetland exploration",
        "Afternoon rest and local culture experience",
      ],
      accommodation: "Hotel Almirante Padilla",
      meals: "Breakfast, Lunch, Dinner",
    },
    {
      day: 3,
      title: "Las Gaviotas Forest Reserve",
      activities: [
        "Pre-dawn departure to Las Gaviotas",
        "Full day lowland forest birding",
        "Manakin lek observation",
        "Night sounds and nocturnal species",
      ],
      accommodation: "Las Gaviotas Eco-Lodge",
      meals: "Breakfast, Lunch, Dinner",
    },
    {
      day: 4,
      title: "Río Ancho Exploration",
      activities: [
        "Dawn chorus birding along Río Ancho",
        "Canopy tower birding session",
        "Afternoon antbird following",
        "Evening photography workshop",
      ],
      accommodation: "Las Gaviotas Eco-Lodge",
      meals: "Breakfast, Lunch, Dinner",
    },
    {
      day: 5,
      title: "Salamanca National Park",
      activities: [
        "Transfer to Salamanca National Park",
        "Mangrove birding by boat",
        "Coastal wetland exploration",
        "Flamingo observation (seasonal)",
      ],
      accommodation: "Hotel Decamerón Baru",
      meals: "Breakfast, Lunch, Dinner",
    },
    {
      day: 6,
      title: "Tayrona National Park",
      activities: [
        "Early morning Tayrona entrance",
        "Dry forest trail birding",
        "Coastal forest exploration",
        "Beach and mangrove interface birding",
      ],
      accommodation: "Hotel Casa Verde",
      meals: "Breakfast, Lunch, Dinner",
    },
    {
      day: 7,
      title: "Sierra Nevada Foothills",
      activities: [
        "Foothill birding excursion",
        "Mid-elevation species targeting",
        "Cultural visit to Tungueka (Kogi community)",
        "Traditional lunch with community",
      ],
      accommodation: "Hotel Casa Verde",
      meals: "Breakfast, Lunch, Dinner",
    },
    {
      day: 8,
      title: "Departure",
      activities: ["Final morning birding session", "Species list compilation", "Transfer to airport", "Departure"],
      accommodation: "N/A",
      meals: "Breakfast",
    },
  ],

  accommodations: [
    {
      name: "Hotel Casa Verde",
      location: "Santa Marta",
      description: "Comfortable colonial-style hotel in the heart of Santa Marta's historic district",
      amenities: ["Air conditioning", "WiFi", "Restaurant", "Pool", "Historic location"],
      rating: 4.2,
      nights: 4,
    },
    {
      name: "Las Gaviotas Eco-Lodge",
      location: "Las Gaviotas Reserve",
      description: "Rustic eco-lodge within the forest reserve, perfect for early morning birding",
      amenities: ["Fan cooling", "Shared bathrooms", "Restaurant", "Birding trails", "Canopy tower"],
      rating: 4.0,
      nights: 2,
    },
    {
      name: "Hotel Almirante Padilla",
      location: "Riohacha",
      description: "Modern hotel near Riohacha's coastal birding sites",
      amenities: ["Air conditioning", "WiFi", "Restaurant", "Beach access", "Tour desk"],
      rating: 3.8,
      nights: 1,
    },
    {
      name: "Hotel Decamerón Baru",
      location: "Near Salamanca NP",
      description: "Beach resort with easy access to Salamanca National Park",
      amenities: ["All-inclusive", "Beach access", "Multiple restaurants", "Pool", "Activities"],
      rating: 4.1,
      nights: 1,
    },
  ],

  curiousFacts: [
    {
      icon: "🌊",
      title: "Mangrove Diversity",
      description:
        "The Caribbean coast hosts five different mangrove species, creating unique microhabitats that support over 150 bird species in these coastal forests alone.",
    },
    {
      icon: "🦅",
      title: "Endemic Hotspot",
      description:
        "The Caribbean region is home to 12 endemic bird species, including the spectacular Vermilion Cardinal, found only in northern Colombia and northwestern Venezuela.",
    },
    {
      icon: "🌿",
      title: "Dry Forest Rarity",
      description:
        "Less than 2% of Colombia's original dry forest remains, making Tayrona National Park's dry forest one of the most important conservation areas in the country.",
    },
    {
      icon: "🎭",
      title: "Indigenous Wisdom",
      description:
        "The Kogi people of the Sierra Nevada consider themselves the 'Elder Brothers' of humanity and maintain detailed knowledge of over 300 bird species in their traditional territory.",
    },
    {
      icon: "🦜",
      title: "Migration Marvel",
      description:
        "The Caribbean coast serves as a crucial stopover for over 50 species of North American migrants, with some traveling over 2,000 miles non-stop across the Caribbean Sea.",
    },
    {
      icon: "🌺",
      title: "Pollination Network",
      description:
        "Caribbean hummingbirds pollinate over 80 plant species, including many endemic flowers found nowhere else on Earth, creating intricate ecological relationships.",
    },
  ],

  externalLinks: [],
}
