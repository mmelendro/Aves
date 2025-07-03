"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Info, MapPin, Users, Camera, Bed } from "lucide-react"
import { cn } from "@/lib/utils"

interface AccordionSectionsProps {
  region: string
  className?: string
}

const regionAccordionData: Record<string, any> = {
  caribbean: {
    sections: [
      {
        id: "accommodations",
        title: "Accommodations",
        icon: <Bed className="w-5 h-5" />,
        content: {
          type: "accommodations",
          data: [
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
          ],
        },
      },
      {
        id: "species-list",
        title: "Complete Species List",
        icon: <Camera className="w-5 h-5" />,
        content: {
          type: "species-list",
          data: [
            { name: "Vermilion Cardinal", scientific: "Paroaria nigrogenis", status: "Endemic" },
            { name: "Lance-tailed Manakin", scientific: "Chiroxiphia lanceolata", status: "Resident" },
            { name: "White-bellied Antbird", scientific: "Myrmeciza longipes", status: "Resident" },
            { name: "Red-billed Emerald", scientific: "Chlorostilbon gibsoni", status: "Endemic" },
            { name: "Crested Bobwhite", scientific: "Colinus cristatus", status: "Endemic" },
            { name: "Buff-breasted Wren", scientific: "Cantorchilus leucotis", status: "Resident" },
            { name: "Barred Antshrike", scientific: "Thamnophilus doliatus", status: "Resident" },
            { name: "Crimson-crested Woodpecker", scientific: "Campephilus melanoleucos", status: "Resident" },
            { name: "Groove-billed Ani", scientific: "Crotophaga sulcirostris", status: "Resident" },
            { name: "Pied Puffbird", scientific: "Notharchus tectus", status: "Resident" },
            { name: "Bicolored Conebill", scientific: "Conirostrum bicolor", status: "Resident" },
            { name: "Yellow-crowned Amazon", scientific: "Amazona ochrocephala", status: "Resident" },
          ],
        },
      },
      {
        id: "curious-facts",
        title: "Curious Facts",
        icon: <Info className="w-5 h-5" />,
        content: {
          type: "facts",
          data: [
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
          ],
        },
      },
      {
        id: "what-to-expect",
        title: "What to Expect",
        icon: <Users className="w-5 h-5" />,
        content: {
          type: "expectations",
          data: [
            {
              icon: "🌴",
              title: "Coastal Diversity",
              description:
                "Experience incredible bird diversity across mangroves, scrublands, and coastal forests with over 200 species possible.",
            },
            {
              icon: "🦜",
              title: "Endemic Species",
              description: "Encounter unique Caribbean coast endemics and specialties found nowhere else in Colombia.",
            },
            {
              icon: "☀️",
              title: "Perfect Climate",
              description:
                "Enjoy year-round birding weather with warm temperatures and minimal rainfall in coastal areas.",
            },
            {
              icon: "🎭",
              title: "Cultural Immersion",
              description:
                "Connect with indigenous Kogi communities and learn about their deep relationship with nature.",
            },
          ],
        },
      },
    ],
  },
}

function AccordionSections({ region, className }: AccordionSectionsProps) {
  const data = regionAccordionData[region]

  if (!data) {
    return (
      <div className={cn("w-full max-w-4xl mx-auto", className)}>
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">Detailed information not available for this region.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderContent = (section: any) => {
    switch (section.content.type) {
      case "accommodations":
        return (
          <div className="space-y-4">
            {section.content.data.map((accommodation: any, index: number) => (
              <Card key={index} className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-lg">{accommodation.name}</h4>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <MapPin className="w-3 h-3" />
                        <span>{accommodation.location}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium">★ {accommodation.rating}</span>
                      </div>
                      <div className="text-xs text-gray-500">{accommodation.nights} nights</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{accommodation.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {accommodation.amenities.map((amenity: string, idx: number) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )

      case "species-list":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {section.content.data.map((species: any, index: number) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-sm">{species.name}</div>
                  <div className="text-xs italic text-gray-600">{species.scientific}</div>
                </div>
                <Badge variant={species.status === "Endemic" ? "default" : "secondary"} className="text-xs">
                  {species.status}
                </Badge>
              </div>
            ))}
          </div>
        )

      case "facts":
        return (
          <div className="space-y-4">
            {section.content.data.map((fact: any, index: number) => (
              <div key={index} className="flex gap-4 p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl flex-shrink-0">{fact.icon}</div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{fact.title}</h4>
                  <p className="text-sm text-gray-700">{fact.description}</p>
                </div>
              </div>
            ))}
          </div>
        )

      case "expectations":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {section.content.data.map((expectation: any, index: number) => (
              <div key={index} className="flex gap-3 p-4 bg-green-50 rounded-lg">
                <div className="text-xl flex-shrink-0">{expectation.icon}</div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{expectation.title}</h4>
                  <p className="text-sm text-gray-700">{expectation.description}</p>
                </div>
              </div>
            ))}
          </div>
        )

      default:
        return <div>Content not available</div>
    }
  }

  return (
    <div className={cn("w-full max-w-4xl mx-auto", className)}>
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Detailed Information</h2>
        <p className="text-lg text-gray-600">Everything you need to know about your Caribbean coast adventure</p>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {data.sections.map((section: any) => (
          <AccordionItem key={section.id} value={section.id} className="border rounded-lg">
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
              <div className="flex items-center gap-3">
                {section.icon}
                <span className="font-semibold text-left">{section.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">{renderContent(section)}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export default AccordionSections
export { AccordionSections }
