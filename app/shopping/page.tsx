"use client"

import { useState, useEffect } from "react"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  CalendarIcon,
  X,
  Info,
  ShoppingCart,
  Users,
  MapPin,
  CalendarIcon as CalendarLucide,
  Clock,
  Star,
  Heart,
  Camera,
  Mountain,
  Leaf,
} from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

// Tour data
const tours = {
  adventure: {
    name: "AVES Adventure",
    icon: Mountain,
    color: "emerald",
    description: "Immersive birding expeditions with indigenous guides",
    basePrice: 2800,
    duration: "8 days",
    groupSize: "4-8 people",
    difficulty: "Moderate to Challenging",
    highlights: ["Endemic species focus", "Indigenous cultural exchange", "Remote locations", "Expert local guides"],
  },
  vision: {
    name: "AVES Vision",
    icon: Camera,
    color: "purple",
    description: "Photography-focused tours for capturing stunning bird images",
    basePrice: 3200,
    duration: "7 days",
    groupSize: "3-6 people",
    difficulty: "Moderate",
    highlights: ["Photography workshops", "Golden hour sessions", "Specialized equipment", "Post-processing guidance"],
  },
  elevate: {
    name: "AVES Elevate",
    icon: Star,
    color: "yellow",
    description: "Luxury birding experiences with premium accommodations",
    basePrice: 4500,
    duration: "6 days",
    groupSize: "2-6 people",
    difficulty: "Easy to Moderate",
    highlights: ["Luxury lodges", "Private guides", "Gourmet meals", "Spa treatments"],
  },
  souls: {
    name: "AVES Souls",
    icon: Heart,
    color: "red",
    description: "Intimate couples retreats combining birding and romance",
    basePrice: 3800,
    duration: "5 days",
    groupSize: "2-4 people",
    difficulty: "Easy",
    highlights: ["Couples activities", "Romantic settings", "Private experiences", "Wellness focus"],
  },
}

const bioregions = {
  "western-andes": {
    name: "Western Andes",
    description: "Cloud forests and endemic hummingbirds",
    tours: ["adventure", "vision", "elevate"],
    highlights: ["Rainbow-bearded Thornbill", "Chestnut-crowned Antpitta", "Cloud forest specialists"],
  },
  "eastern-andes": {
    name: "Eastern Andes",
    description: "High-altitude páramo and Andean specialties",
    tours: ["adventure", "vision", "elevate"],
    highlights: ["Andean Cock-of-the-rock", "Páramo endemics", "Mountain specialists"],
  },
  "central-andes": {
    name: "Central Andes",
    description: "Coffee region biodiversity hotspot",
    tours: ["adventure", "vision", "elevate", "souls"],
    highlights: ["Coffee farm birding", "Mixed elevation zones", "Accessible locations"],
  },
  caribbean: {
    name: "Caribbean Coast",
    description: "Sierra Nevada endemics and coastal species",
    tours: ["adventure", "vision", "elevate"],
    highlights: ["Cardinal Guajiro", "Sierra Nevada endemics", "Indigenous partnerships"],
  },
  pacific: {
    name: "Pacific Coast",
    description: "Chocó endemics and coastal rainforests",
    tours: ["adventure", "vision"],
    highlights: ["Chocó endemics", "Coastal rainforests", "High biodiversity"],
  },
  choco: {
    name: "Chocó",
    description: "World's most biodiverse region",
    tours: ["adventure", "vision"],
    highlights: ["Highest endemism", "Pristine rainforests", "Rare species"],
  },
  llanos: {
    name: "Llanos",
    description: "Vast grasslands and wetland species",
    tours: ["adventure", "elevate"],
    highlights: ["Grassland specialists", "Wetland birds", "Open landscapes"],
  },
  amazon: {
    name: "Amazon",
    description: "Pristine rainforest and incredible diversity",
    tours: ["adventure", "vision", "elevate"],
    highlights: ["Amazon specialists", "Pristine rainforest", "Incredible diversity"],
  },
}

export default function ShoppingPage() {
  const searchParams = useSearchParams()

  // Pre-selection state
  const [prefilledInfo, setPrefilledInfo] = useState<{
    tour?: string
    region?: string
    from?: string
  }>({})
  const [showNotification, setShowNotification] = useState(false)

  // Form state
  const [selectedTour, setSelectedTour] = useState<string>("")
  const [selectedRegion, setSelectedRegion] = useState<string>("")
  const [selectedDates, setSelectedDates] = useState<Date[]>([])
  const [groupSize, setGroupSize] = useState<number>(2)
  const [accommodationType, setAccommodationType] = useState<string>("")
  const [addOns, setAddOns] = useState<string[]>([])
  const [specialRequests, setSpecialRequests] = useState<string>("")

  // Contact form state
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
  })

  // Initialize pre-selections from URL parameters
  useEffect(() => {
    const preset = searchParams.get("preset") || searchParams.get("tour")
    const region = searchParams.get("region") || searchParams.get("bioregion")
    const from = searchParams.get("from")

    const prefilled: any = {}
    let hasPreselection = false

    // Validate and set tour preset
    if (preset && tours[preset as keyof typeof tours]) {
      prefilled.tour = preset
      setSelectedTour(preset)
      hasPreselection = true
    }

    // Validate and set region
    if (region && bioregions[region as keyof typeof bioregions]) {
      prefilled.region = region
      setSelectedRegion(region)
      hasPreselection = true
    }

    // Set source page
    if (from) {
      prefilled.from = from
    }

    if (hasPreselection) {
      setPrefilledInfo(prefilled)
      setShowNotification(true)

      // Auto-dismiss notification after 8 seconds
      setTimeout(() => {
        setShowNotification(false)
      }, 8000)
    }
  }, [searchParams])

  const getNotificationMessage = () => {
    const { tour, region } = prefilledInfo

    if (tour && region) {
      const tourName = tours[tour as keyof typeof tours]?.name
      const regionName = bioregions[region as keyof typeof bioregions]?.name
      return `Great choice! We've pre-filled your selections with ${tourName} for ${regionName} based on your interest. You can customize everything below!`
    } else if (tour) {
      const tourName = tours[tour as keyof typeof tours]?.name
      return `Great choice! We've pre-filled your selections with ${tourName}. You can customize everything below!`
    } else if (region) {
      const regionName = bioregions[region as keyof typeof bioregions]?.name
      return `Great choice! We've pre-filled your selections for ${regionName}. You can customize everything below!`
    }

    return "Your selections have been pre-filled based on your interest!"
  }

  const calculatePrice = () => {
    if (!selectedTour) return 0

    const baseTour = tours[selectedTour as keyof typeof tours]
    let price = baseTour.basePrice

    // Group size adjustments
    if (groupSize === 1)
      price *= 1.5 // Solo traveler premium
    else if (groupSize >= 6) price *= 0.9 // Group discount

    // Add-on pricing
    const addOnPrices: { [key: string]: number } = {
      "photography-workshop": 400,
      "cultural-immersion": 300,
      "conservation-activity": 250,
      "spa-wellness": 500,
      "private-guide": 800,
      "equipment-rental": 150,
    }

    addOns.forEach((addon) => {
      price += addOnPrices[addon] || 0
    })

    return price
  }

  const availableTours = selectedRegion
    ? Object.entries(tours).filter(([key]) =>
        bioregions[selectedRegion as keyof typeof bioregions]?.tours.includes(key),
      )
    : Object.entries(tours)

  const handleAddOnChange = (addOnId: string, checked: boolean) => {
    if (checked) {
      setAddOns([...addOns, addOnId])
    } else {
      setAddOns(addOns.filter((id) => id !== addOnId))
    }
  }

  const generateEmailLink = () => {
    const tour = selectedTour ? tours[selectedTour as keyof typeof tours] : null
    const region = selectedRegion ? bioregions[selectedRegion as keyof typeof bioregions] : null

    const subject = encodeURIComponent(
      `AVES Tour Inquiry - ${tour?.name || "Custom Tour"} in ${region?.name || "Colombia"}`,
    )

    const body = encodeURIComponent(`Hello AVES Team,

I'm interested in booking a birding tour with the following details:

TOUR SELECTION:
- Tour Type: ${tour?.name || "Not selected"}
- Region: ${region?.name || "Not selected"}
- Dates: ${selectedDates.length > 0 ? selectedDates.map((d) => format(d, "PPP")).join(", ") : "Flexible"}
- Group Size: ${groupSize} ${groupSize === 1 ? "person" : "people"}
- Accommodation: ${accommodationType || "Standard"}

ADD-ONS:
${addOns.length > 0 ? addOns.map((addon) => `- ${addon.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}`).join("\n") : "- None selected"}

ESTIMATED PRICE: $${calculatePrice().toLocaleString()} USD

CONTACT INFORMATION:
- Name: ${contactInfo.name}
- Email: ${contactInfo.email}
- Phone: ${contactInfo.phone}
- Country: ${contactInfo.country}

SPECIAL REQUESTS:
${specialRequests || "None"}

Please send me more information about this tour and availability for my preferred dates.

Best regards,
${contactInfo.name}`)

    return `mailto:info@aves-tours.com?subject=${subject}&body=${body}`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationHeader currentPage="/shopping" />

      <div className="container mx-auto px-4 py-8">
        {/* Pre-selection Notification */}
        {showNotification && (
          <Alert className="mb-6 border-emerald-200 bg-emerald-50">
            <Info className="h-4 w-4 text-emerald-600" />
            <AlertDescription className="text-emerald-800 pr-8">{getNotificationMessage()}</AlertDescription>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-2 h-6 w-6 p-0 text-emerald-600 hover:text-emerald-800"
              onClick={() => setShowNotification(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </Alert>
        )}

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Plan Your Colombian Birding Adventure</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Customize your perfect birding experience with our expert guides and discover Colombia's incredible avian
            diversity
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Tour Selection */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: Choose Your Tour Type */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Step 1: Choose Your Tour Type
                  {prefilledInfo.tour && (
                    <Badge variant="secondary" className="ml-2">
                      Pre-selected
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>Select the birding experience that matches your interests and style</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {availableTours.map(([key, tour]) => {
                    const IconComponent = tour.icon
                    const isSelected = selectedTour === key
                    const isPreselected = prefilledInfo.tour === key

                    return (
                      <div
                        key={key}
                        className={cn(
                          "relative p-4 border-2 rounded-lg cursor-pointer transition-all",
                          isSelected
                            ? `border-${tour.color}-500 bg-${tour.color}-50`
                            : "border-gray-200 hover:border-gray-300",
                        )}
                        onClick={() => setSelectedTour(key)}
                      >
                        {isPreselected && (
                          <Badge className="absolute -top-2 -right-2 bg-emerald-600">Pre-selected</Badge>
                        )}
                        <div className="flex items-start gap-3">
                          <IconComponent
                            className={cn("w-6 h-6 mt-1", isSelected ? `text-${tour.color}-600` : "text-gray-400")}
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{tour.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">{tour.description}</p>
                            <div className="space-y-1 text-xs text-gray-500">
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {tour.duration}
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {tour.groupSize}
                              </div>
                              <div className="font-medium text-gray-900">
                                From ${tour.basePrice.toLocaleString()} USD
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Step 2: Choose Your Region */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Step 2: Choose Your Bioregion
                  {prefilledInfo.region && (
                    <Badge variant="secondary" className="ml-2">
                      Pre-selected
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>Each region offers unique species and ecosystems to explore</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(bioregions).map(([key, region]) => {
                    const isSelected = selectedRegion === key
                    const isPreselected = prefilledInfo.region === key
                    const isAvailable = !selectedTour || region.tours.includes(selectedTour)

                    return (
                      <div
                        key={key}
                        className={cn(
                          "relative p-4 border-2 rounded-lg transition-all",
                          !isAvailable
                            ? "border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed"
                            : isSelected
                              ? "border-emerald-500 bg-emerald-50 cursor-pointer"
                              : "border-gray-200 hover:border-gray-300 cursor-pointer",
                        )}
                        onClick={() => isAvailable && setSelectedRegion(key)}
                      >
                        {isPreselected && (
                          <Badge className="absolute -top-2 -right-2 bg-emerald-600">Pre-selected</Badge>
                        )}
                        <div className="flex items-start gap-3">
                          <Leaf className={cn("w-6 h-6 mt-1", isSelected ? "text-emerald-600" : "text-gray-400")} />
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{region.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">{region.description}</p>
                            <div className="space-y-1">
                              {region.highlights.map((highlight, index) => (
                                <div key={index} className="text-xs text-gray-500">
                                  • {highlight}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Step 3: Customize Your Experience */}
            {selectedTour && selectedRegion && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarLucide className="w-5 h-5" />
                    Step 3: Customize Your Experience
                  </CardTitle>
                  <CardDescription>Personalize your tour with dates, group size, and special add-ons</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Dates */}
                  <div>
                    <Label className="text-base font-medium">Preferred Dates</Label>
                    <p className="text-sm text-gray-600 mb-3">Select your travel dates (optional)</p>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !selectedDates.length && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDates.length > 0
                            ? selectedDates.map((date) => format(date, "PPP")).join(", ")
                            : "Select dates"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="multiple"
                          selected={selectedDates}
                          onSelect={(dates) => setSelectedDates(dates || [])}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Group Size */}
                  <div>
                    <Label className="text-base font-medium">Group Size</Label>
                    <p className="text-sm text-gray-600 mb-3">How many people will be traveling?</p>
                    <Select
                      value={groupSize.toString()}
                      onValueChange={(value) => setGroupSize(Number.parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((size) => (
                          <SelectItem key={size} value={size.toString()}>
                            {size} {size === 1 ? "person" : "people"}
                            {size === 1 && " (Solo traveler premium applies)"}
                            {size >= 6 && " (Group discount applies)"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Accommodation Type */}
                  <div>
                    <Label className="text-base font-medium">Accommodation Preference</Label>
                    <p className="text-sm text-gray-600 mb-3">Choose your preferred accommodation style</p>
                    <Select value={accommodationType} onValueChange={setAccommodationType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select accommodation type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard (Eco-lodges & Local Hotels)</SelectItem>
                        <SelectItem value="comfort">Comfort (Mid-range Hotels & Lodges)</SelectItem>
                        <SelectItem value="luxury">Luxury (Premium Lodges & Resorts)</SelectItem>
                        <SelectItem value="camping">Camping (Authentic Outdoor Experience)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Add-ons */}
                  <div>
                    <Label className="text-base font-medium">Add-on Experiences</Label>
                    <p className="text-sm text-gray-600 mb-3">Enhance your tour with additional activities</p>
                    <div className="grid md:grid-cols-2 gap-3">
                      {[
                        {
                          id: "photography-workshop",
                          name: "Photography Workshop",
                          price: 400,
                          description: "Professional bird photography guidance",
                        },
                        {
                          id: "cultural-immersion",
                          name: "Cultural Immersion",
                          price: 300,
                          description: "Extended time with indigenous communities",
                        },
                        {
                          id: "conservation-activity",
                          name: "Conservation Activity",
                          price: 250,
                          description: "Participate in local conservation projects",
                        },
                        {
                          id: "spa-wellness",
                          name: "Spa & Wellness",
                          price: 500,
                          description: "Relaxation and wellness treatments",
                        },
                        {
                          id: "private-guide",
                          name: "Private Guide",
                          price: 800,
                          description: "Dedicated personal guide for your group",
                        },
                        {
                          id: "equipment-rental",
                          name: "Equipment Rental",
                          price: 150,
                          description: "Binoculars, cameras, and field gear",
                        },
                      ].map((addon) => (
                        <div key={addon.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                          <Checkbox
                            id={addon.id}
                            checked={addOns.includes(addon.id)}
                            onCheckedChange={(checked) => handleAddOnChange(addon.id, checked as boolean)}
                          />
                          <div className="flex-1">
                            <Label htmlFor={addon.id} className="font-medium cursor-pointer">
                              {addon.name}
                            </Label>
                            <p className="text-sm text-gray-600">{addon.description}</p>
                            <p className="text-sm font-medium text-emerald-600">+${addon.price} USD</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <Label htmlFor="special-requests" className="text-base font-medium">
                      Special Requests
                    </Label>
                    <p className="text-sm text-gray-600 mb-3">
                      Any dietary restrictions, accessibility needs, or special interests?
                    </p>
                    <Textarea
                      id="special-requests"
                      placeholder="Tell us about any special requirements or interests..."
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Contact Information */}
            {selectedTour && selectedRegion && (
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Provide your details so we can send you a personalized quote</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={contactInfo.name}
                        onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={contactInfo.email}
                        onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={contactInfo.phone}
                        onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        value={contactInfo.country}
                        onChange={(e) => setContactInfo({ ...contactInfo, country: e.target.value })}
                        placeholder="Your country"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar - Tour Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card>
                <CardHeader>
                  <CardTitle>Tour Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedTour ? (
                    <div>
                      <h3 className="font-semibold text-lg">{tours[selectedTour as keyof typeof tours].name}</h3>
                      <p className="text-sm text-gray-600">{tours[selectedTour as keyof typeof tours].description}</p>
                      <div className="mt-2 space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Duration:</span>
                          <span>{tours[selectedTour as keyof typeof tours].duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Group Size:</span>
                          <span>{tours[selectedTour as keyof typeof tours].groupSize}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Difficulty:</span>
                          <span>{tours[selectedTour as keyof typeof tours].difficulty}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500">Select a tour type to see details</p>
                  )}

                  {selectedRegion && (
                    <div className="border-t pt-4">
                      <h4 className="font-semibold">{bioregions[selectedRegion as keyof typeof bioregions].name}</h4>
                      <p className="text-sm text-gray-600">
                        {bioregions[selectedRegion as keyof typeof bioregions].description}
                      </p>
                      <div className="mt-2">
                        <p className="text-sm font-medium">Highlights:</p>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {bioregions[selectedRegion as keyof typeof bioregions].highlights.map((highlight, index) => (
                            <li key={index}>• {highlight}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {selectedTour && selectedRegion && (
                    <div className="border-t pt-4">
                      <h4 className="font-semibold mb-2">Your Selections:</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Travelers:</span>
                          <span>
                            {groupSize} {groupSize === 1 ? "person" : "people"}
                          </span>
                        </div>
                        {selectedDates.length > 0 && (
                          <div className="flex justify-between">
                            <span>Dates:</span>
                            <span className="text-right">
                              {selectedDates.map((d) => format(d, "MMM d")).join(", ")}
                            </span>
                          </div>
                        )}
                        {accommodationType && (
                          <div className="flex justify-between">
                            <span>Accommodation:</span>
                            <span className="text-right capitalize">{accommodationType}</span>
                          </div>
                        )}
                        {addOns.length > 0 && (
                          <div>
                            <span className="font-medium">Add-ons:</span>
                            <ul className="mt-1 space-y-1">
                              {addOns.map((addon) => (
                                <li key={addon} className="text-xs text-gray-600">
                                  • {addon.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {selectedTour && (
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-semibold">Estimated Total:</span>
                        <span className="text-2xl font-bold text-emerald-600">
                          ${calculatePrice().toLocaleString()} USD
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mb-4">
                        *Final price may vary based on availability, season, and specific requirements
                      </p>

                      {contactInfo.name && contactInfo.email ? (
                        <Link href={generateEmailLink()}>
                          <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                            Request Quote via Email
                          </Button>
                        </Link>
                      ) : (
                        <Button disabled className="w-full">
                          Complete contact info to request quote
                        </Button>
                      )}

                      <div className="mt-3 text-center">
                        <Link href="/contact" className="text-sm text-emerald-600 hover:text-emerald-700">
                          Or contact us directly
                        </Link>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Why Choose AVES */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Why Choose AVES?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span>Expert local guides with deep ecological knowledge</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Heart className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span>Authentic partnerships with indigenous communities</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Leaf className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Sustainable tourism supporting conservation</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Camera className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span>Small groups for personalized experiences</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
