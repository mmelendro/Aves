"use client"

import { useState, useMemo } from "react"
import { Calendar, MapPin, Clock, Users, DollarSign, Filter, Search, X, ExternalLink, Star, Heart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface BirdingEvent {
  id: string
  name: string
  location: string
  region: string
  dates2025: string
  dates2026: string
  type: "festival" | "congress" | "fair" | "count" | "workshop" | "camp"
  description: string
  activities: string[]
  cost: string
  website?: string
  organizer: string
  registrationInfo: string
  highlights: string[]
  difficulty: "beginner" | "intermediate" | "advanced" | "all"
  featured: boolean
}

const birdingEvents: BirdingEvent[] = [
  {
    id: "colombia-birdfair",
    name: "Colombia Birdfair",
    location: "Cali, Valle del Cauca",
    region: "Valle del Cauca",
    dates2025: "13–16 Feb 2025 (pre-fair activities from 11 Feb)",
    dates2026: "12–15 Feb 2026",
    type: "fair",
    description:
      "Colombia's most important birding event, combining daily birding trips, conferences, workshops, a trade show and family activities.",
    activities: ["Daily birding trips", "Conferences", "Workshops", "Trade show", "Family activities"],
    cost: "Workshops ~COP 200,000; trips ~COP 170,000–200,000 (2019 prices)",
    website: "https://colombiabirdfair.com",
    organizer: "Colombia Birdfair Organization",
    registrationInfo: "Monitor official website for 2026 registration updates",
    highlights: ["International speakers", "Premium birding locations", "Photography workshops", "Trade exhibitions"],
    difficulty: "all",
    featured: true,
  },
  {
    id: "salento-birdfair",
    name: "Salento BirdFair",
    location: "Salento, Quindío",
    region: "Quindío",
    dates2025: "12–14 Sep 2025",
    dates2026: "12–14 Sep 2026 (estimated)",
    type: "fair",
    description: "Second edition emphasizing ancestral themes with pre-sale discounts available until 30 July.",
    activities: ["Birdwatching routes", "Conferences", "Immersive concert", "Art workshops", "Scientific illustration"],
    cost: "Conference pass COP 315,000; Scientific illustration workshop COP 108,000; Ceramics workshop COP 90,000; Immersive concert COP 112,500",
    website: "https://salentobirdfair.com",
    organizer: "Salento BirdFair Committee",
    registrationInfo: "Pre-sale discounts available until 30 July",
    highlights: ["Coffee region birding", "Ancestral themes", "Art integration", "Cultural immersion"],
    difficulty: "all",
    featured: true,
  },
  {
    id: "risaralda-bird-festival",
    name: "Risaralda Bird Festival",
    location: "Pereira, Risaralda",
    region: "Risaralda",
    dates2025: "20–24 Mar 2025",
    dates2026: "20–24 Mar 2026 (estimated)",
    type: "festival",
    description:
      "Eighth edition featuring academic sessions, cultural activities, parades and community birdwatching routes named after emblematic species.",
    activities: ["Academic sessions", "Cultural parades", "Community birdwatching routes", "Educational talks"],
    cost: "Registration fees not yet published",
    website: "https://www.risaraldabirdfestival.com",
    organizer: "Risaralda Tourism Board",
    registrationInfo: "Check official website for updates",
    highlights: ["Community involvement", "Endemic species focus", "Cultural integration", "Educational emphasis"],
    difficulty: "all",
    featured: true,
  },
  {
    id: "congreso-ornitologia",
    name: "VIII Congreso Colombiano de Ornitología",
    location: "Cali, Universidad del Valle",
    region: "Valle del Cauca",
    dates2025: "10–12 Dec 2025",
    dates2026: "10–12 Dec 2026 (estimated)",
    type: "congress",
    description:
      "National ornithology congress organized by the Asociación Colombiana de Ornitología, serving as the principal academic forum for researchers and students.",
    activities: ["Research presentations", "Academic sessions", "Student forums", "Networking events"],
    cost: "ACO members: COP 110,000 (students) / COP 200,000 (professionals); Non-members: COP 210,000 / COP 370,000",
    website: "https://viiicongreso.asociacioncolombianadeornitologia.org",
    organizer: "Asociación Colombiana de Ornitología",
    registrationInfo: "Different rates for ACO members and students",
    highlights: ["Academic research", "Scientific networking", "Student participation", "Professional development"],
    difficulty: "advanced",
    featured: true,
  },
  {
    id: "congreso-aviturismo",
    name: "13º Congreso Aviturismo Colombia",
    location: "Manizales, Caldas",
    region: "Caldas",
    dates2025: "14–16 Nov 2025",
    dates2026: "14–16 Nov 2026 (estimated)",
    type: "congress",
    description:
      "Congress focusing on bird tourism, mixing academic sessions with practical birding workshops across Caldas bird-rich hotspots.",
    activities: ["Academic lectures", "Symposia", "Education forums", "Practical birding workshops"],
    cost: "Registration details pending",
    website: "https://www.avescaldas.com",
    organizer: "Aves Caldas",
    registrationInfo: "Details to be announced",
    highlights: ["Tourism focus", "Practical workshops", "Hotspot visits", "Industry networking"],
    difficulty: "intermediate",
    featured: true,
  },
  {
    id: "conteo-aves-playeras",
    name: "Conteo de Aves Playeras",
    location: "Pacific Coast",
    region: "Pacific Coast",
    dates2025: "15 Jan – 15 Feb 2025",
    dates2026: "15 Jan – 15 Feb 2026 (estimated)",
    type: "count",
    description: "Citizen-science shorebird count along the Pacific coast.",
    activities: ["Shorebird counting", "Data collection", "Citizen science participation"],
    cost: "Free citizen-science event",
    organizer: "Colombian Ornithological Association",
    registrationInfo: "Open to all volunteers",
    highlights: ["Citizen science", "Shorebird focus", "Conservation data", "Coastal birding"],
    difficulty: "beginner",
    featured: false,
  },
  {
    id: "censo-neotropico",
    name: "Censo Neotrópico de aves acuáticas",
    location: "Nationwide",
    region: "National",
    dates2025: "1–16 Feb 2025",
    dates2026: "1–16 Feb 2026 (estimated)",
    type: "count",
    description: "Nationwide waterfowl census as part of the Neotropical waterbird count.",
    activities: ["Waterfowl counting", "Wetland surveys", "Data recording"],
    cost: "Volunteer count; no fee",
    organizer: "Wetlands International",
    registrationInfo: "Volunteer participation",
    highlights: ["Wetland conservation", "International coordination", "Waterfowl focus", "Habitat monitoring"],
    difficulty: "beginner",
    featured: false,
  },
  {
    id: "festival-jerico",
    name: "Festival de las Aves Jericó (2ª edición)",
    location: "Jericó, Antioquia",
    region: "Antioquia",
    dates2025: "7–9 Feb 2025",
    dates2026: "7–9 Feb 2026 (estimated)",
    type: "festival",
    description: "Community fair with tours, talks and crafts celebrating local bird diversity.",
    activities: ["Community tours", "Educational talks", "Local crafts", "Cultural activities"],
    cost: "Free or low-cost; excursion fees vary",
    organizer: "Jericó Municipality",
    registrationInfo: "Community event with open participation",
    highlights: ["Community involvement", "Local culture", "Affordable participation", "Regional birds"],
    difficulty: "beginner",
    featured: false,
  },
  {
    id: "festival-bangsia-negra",
    name: "III Festival de la Bangsia Negra y Oro",
    location: "Mistrató, Risaralda",
    region: "Risaralda",
    dates2025: "21–23 Feb 2025",
    dates2026: "21–23 Feb 2026 (estimated)",
    type: "festival",
    description: "Celebrates the endemic black-and-gold tanager with community activities.",
    activities: ["Endemic species focus", "Community celebrations", "Educational programs"],
    cost: "Community festival; entry usually free with low-cost excursions",
    organizer: "Mistrató Community",
    registrationInfo: "Open community participation",
    highlights: ["Endemic species", "Community celebration", "Conservation awareness", "Local involvement"],
    difficulty: "beginner",
    featured: false,
  },
  {
    id: "festival-laguna-cocha",
    name: "Festival comunitario de aves del Humedal Ramsar Laguna de la Cocha",
    location: "Laguna de la Cocha, Pasto (Nariño)",
    region: "Nariño",
    dates2025: "28 Feb – 2 Mar 2025",
    dates2026: "28 Feb – 2 Mar 2026 (estimated)",
    type: "festival",
    description: "Wetland bird conservation festival at the Ramsar site.",
    activities: ["Wetland birding", "Conservation education", "Community involvement"],
    cost: "Community festival; costs not published",
    organizer: "Local Conservation Groups",
    registrationInfo: "Community participation",
    highlights: ["Ramsar wetland", "Conservation focus", "High-altitude birding", "Endemic species"],
    difficulty: "intermediate",
    featured: false,
  },
  {
    id: "global-big-day",
    name: "Global Big Day",
    location: "Nationwide",
    region: "National",
    dates2025: "10 May 2025",
    dates2026: "9 May 2026 (likely)",
    type: "count",
    description: "Global citizen-science bird count where Colombia consistently ranks among top countries.",
    activities: ["24-hour bird counting", "eBird submissions", "Team participation"],
    cost: "Free participation",
    organizer: "Cornell Lab of Ornithology",
    registrationInfo: "Open to all participants via eBird",
    highlights: ["Global participation", "Colombia leadership", "Citizen science", "Competition element"],
    difficulty: "all",
    featured: true,
  },
  {
    id: "october-big-day",
    name: "October Big Day",
    location: "Nationwide",
    region: "National",
    dates2025: "11 Oct 2025",
    dates2026: "10 Oct 2026 (likely)",
    type: "count",
    description: "Global citizen-science bird count focusing on fall migration patterns.",
    activities: ["Migration monitoring", "Species counting", "Data contribution"],
    cost: "Free participation",
    organizer: "Cornell Lab of Ornithology",
    registrationInfo: "eBird participation",
    highlights: ["Migration focus", "Fall birding", "Global coordination", "Scientific contribution"],
    difficulty: "all",
    featured: false,
  },
  {
    id: "censos-navidenos",
    name: "Censos Navideños",
    location: "Nationwide",
    region: "National",
    dates2025: "14 Dec 2025 – 5 Jan 2026",
    dates2026: "14 Dec 2026 – 5 Jan 2027 (estimated)",
    type: "count",
    description: "Nationwide Christmas bird counts following the traditional Christmas Bird Count format.",
    activities: ["Christmas bird counts", "Winter bird surveys", "Community participation"],
    cost: "Free citizen-science counts",
    organizer: "Colombian Ornithological Groups",
    registrationInfo: "Local group coordination",
    highlights: ["Holiday tradition", "Winter birding", "Community involvement", "Long-term data"],
    difficulty: "all",
    featured: false,
  },
]

const regions = [
  "All Regions",
  "Valle del Cauca",
  "Quindío",
  "Risaralda",
  "Caldas",
  "Antioquia",
  "Nariño",
  "Pacific Coast",
  "National",
]
const eventTypes = ["All Types", "festival", "congress", "fair", "count", "workshop", "camp"]
const difficulties = ["All Levels", "beginner", "intermediate", "advanced", "all"]

export function BirdingCalendar() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("All Regions")
  const [selectedType, setSelectedType] = useState("All Types")
  const [selectedDifficulty, setSelectedDifficulty] = useState("All Levels")
  const [selectedYear, setSelectedYear] = useState("2025")
  const [favorites, setFavorites] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  const filteredEvents = useMemo(() => {
    return birdingEvents.filter((event) => {
      const matchesSearch =
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesRegion = selectedRegion === "All Regions" || event.region === selectedRegion
      const matchesType = selectedType === "All Types" || event.type === selectedType
      const matchesDifficulty =
        selectedDifficulty === "All Levels" || event.difficulty === selectedDifficulty || event.difficulty === "all"

      return matchesSearch && matchesRegion && matchesType && matchesDifficulty
    })
  }, [searchTerm, selectedRegion, selectedType, selectedDifficulty])

  const featuredEvents = filteredEvents.filter((event) => event.featured)
  const regularEvents = filteredEvents.filter((event) => !event.featured)

  const toggleFavorite = (eventId: string) => {
    setFavorites((prev) => (prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]))
  }

  const getEventTypeColor = (type: string) => {
    const colors = {
      festival: "bg-green-100 text-green-800",
      congress: "bg-blue-100 text-blue-800",
      fair: "bg-purple-100 text-purple-800",
      count: "bg-orange-100 text-orange-800",
      workshop: "bg-yellow-100 text-yellow-800",
      camp: "bg-pink-100 text-pink-800",
    }
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      beginner: "bg-green-100 text-green-700",
      intermediate: "bg-yellow-100 text-yellow-700",
      advanced: "bg-red-100 text-red-700",
      all: "bg-blue-100 text-blue-700",
    }
    return colors[difficulty as keyof typeof colors] || "bg-gray-100 text-gray-700"
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Colombia Birding Events Calendar</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Discover major birding festivals, ornithological congresses, and citizen science events across Colombia. Plan
          your birding adventures with our comprehensive events calendar.
        </p>

        {/* Year Selector */}
        <div className="flex justify-center mb-8">
          <Tabs value={selectedYear} onValueChange={setSelectedYear} className="w-full max-w-md">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="2025">2025 Events</TabsTrigger>
              <TabsTrigger value="2026">2026 Predicted</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search events, locations, or descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
            {showFilters && <X className="h-4 w-4" />}
          </Button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white rounded-lg border">
            <div>
              <label className="block text-sm font-medium mb-2">Region</label>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Event Type</label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {eventTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type === "All Types" ? type : type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Difficulty</label>
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map((difficulty) => (
                    <SelectItem key={difficulty} value={difficulty}>
                      {difficulty === "All Levels"
                        ? difficulty
                        : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {filteredEvents.length} events for {selectedYear}
          {searchTerm && ` matching "${searchTerm}"`}
        </p>
      </div>

      {/* Featured Events */}
      {featuredEvents.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Star className="h-6 w-6 text-yellow-500" />
            Featured Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                selectedYear={selectedYear}
                isFavorite={favorites.includes(event.id)}
                onToggleFavorite={() => toggleFavorite(event.id)}
                getEventTypeColor={getEventTypeColor}
                getDifficultyColor={getDifficultyColor}
              />
            ))}
          </div>
        </div>
      )}

      {/* All Events */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{featuredEvents.length > 0 ? "All Events" : "Events"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(featuredEvents.length > 0 ? regularEvents : filteredEvents).map((event) => (
            <EventCard
              key={event.id}
              event={event}
              selectedYear={selectedYear}
              isFavorite={favorites.includes(event.id)}
              onToggleFavorite={() => toggleFavorite(event.id)}
              getEventTypeColor={getEventTypeColor}
              getDifficultyColor={getDifficultyColor}
            />
          ))}
        </div>
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No events found</h3>
          <p className="text-gray-500">Try adjusting your search criteria or filters</p>
        </div>
      )}

      {/* Footer Info */}
      <div className="mt-16 p-6 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Important Notes</h3>
        <ul className="text-blue-800 space-y-2 text-sm">
          <li>
            • <strong>2026 dates are predictions</strong> based on 2025 patterns. Always verify with official sources.
          </li>
          <li>
            • <strong>Costs vary widely</strong> - from free community events to premium international fairs.
          </li>
          <li>
            • <strong>Early registration discounts</strong> are common for major events.
          </li>
          <li>
            • <strong>Citizen science events</strong> like Global Big Day are free and open to all skill levels.
          </li>
          <li>• Many local festivals may not have published their 2025-26 dates yet.</li>
        </ul>
      </div>
    </div>
  )
}

interface EventCardProps {
  event: BirdingEvent
  selectedYear: string
  isFavorite: boolean
  onToggleFavorite: () => void
  getEventTypeColor: (type: string) => string
  getDifficultyColor: (difficulty: string) => string
}

function EventCard({
  event,
  selectedYear,
  isFavorite,
  onToggleFavorite,
  getEventTypeColor,
  getDifficultyColor,
}: EventCardProps) {
  const eventDates = selectedYear === "2025" ? event.dates2025 : event.dates2026

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300 relative">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          <div className="flex gap-2 flex-wrap">
            <Badge className={getEventTypeColor(event.type)}>
              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
            </Badge>
            <Badge className={getDifficultyColor(event.difficulty)}>
              {event.difficulty === "all"
                ? "All Levels"
                : event.difficulty.charAt(0).toUpperCase() + event.difficulty.slice(1)}
            </Badge>
          </div>
          <Button variant="ghost" size="sm" onClick={onToggleFavorite} className="p-1 h-auto">
            <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
          </Button>
        </div>
        <CardTitle className="text-lg leading-tight">{event.name}</CardTitle>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="h-4 w-4" />
          {event.location}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          {eventDates}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-gray-700 text-sm mb-4 line-clamp-3">{event.description}</p>

        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <DollarSign className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-600">{event.cost}</span>
          </div>

          <div className="flex items-start gap-2">
            <Users className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-600">{event.organizer}</span>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                View Details
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-xl">{event.name}</DialogTitle>
              </DialogHeader>
              <EventDetails event={event} selectedYear={selectedYear} />
            </DialogContent>
          </Dialog>

          {event.website && (
            <Button variant="outline" size="sm" asChild>
              <a href={event.website} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function EventDetails({ event, selectedYear }: { event: BirdingEvent; selectedYear: string }) {
  const eventDates = selectedYear === "2025" ? event.dates2025 : event.dates2026

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-medium">Dates</p>
              <p className="text-sm text-gray-600">{eventDates}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-medium">Location</p>
              <p className="text-sm text-gray-600">{event.location}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-medium">Organizer</p>
              <p className="text-sm text-gray-600">{event.organizer}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-medium">Cost</p>
              <p className="text-sm text-gray-600">{event.cost}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-medium">Registration</p>
              <p className="text-sm text-gray-600">{event.registrationInfo}</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-2">Description</h4>
        <p className="text-gray-700">{event.description}</p>
      </div>

      <div>
        <h4 className="font-medium mb-2">Activities</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {event.activities.map((activity, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700">{activity}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-2">Highlights</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {event.highlights.map((highlight, index) => (
            <div key={index} className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-gray-700">{highlight}</span>
            </div>
          ))}
        </div>
      </div>

      {event.website && (
        <div className="pt-4 border-t">
          <Button asChild className="w-full">
            <a href={event.website} target="_blank" rel="noopener noreferrer">
              Visit Official Website
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      )}
    </div>
  )
}
