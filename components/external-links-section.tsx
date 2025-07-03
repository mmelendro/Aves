"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LucideExternalLink, BookOpen, Globe, Camera, Music } from "lucide-react"
import { cn } from "@/lib/utils"

interface Link {
  title: string
  description: string
  url: string
  type: "guide" | "research" | "photography" | "audio" | "general"
  badge?: string
}

interface ExternalLinksSectionProps {
  region: string
  className?: string
}

const regionLinksData: Record<string, { title: string; links: Link[] }> = {
  caribbean: {
    title: "Additional Resources",
    links: [
      {
        title: "eBird Caribbean Coast Hotspots",
        description: "Explore real-time bird sightings and hotspots in the Caribbean region",
        url: "https://ebird.org/region/CO-ATL",
        type: "research",
        badge: "Live Data",
      },
      {
        title: "Sierra Nevada de Santa Marta Guide",
        description: "Comprehensive field guide to the birds of Sierra Nevada",
        url: "#",
        type: "guide",
        badge: "Field Guide",
      },
      {
        title: "Kogi Indigenous Culture",
        description: "Learn about the indigenous communities of the Sierra Nevada",
        url: "#",
        type: "general",
        badge: "Cultural",
      },
      {
        title: "Caribbean Coast Photography",
        description: "Stunning photography from the region's diverse ecosystems",
        url: "#",
        type: "photography",
        badge: "Gallery",
      },
    ],
  },
}

function ExternalLinksSection({ region, className }: ExternalLinksSectionProps) {
  const data = regionLinksData[region]

  if (!data || !data.links.length) {
    return null
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "guide":
        return <BookOpen className="w-5 h-5" />
      case "research":
        return <Globe className="w-5 h-5" />
      case "photography":
        return <Camera className="w-5 h-5" />
      case "audio":
        return <Music className="w-5 h-5" />
      default:
        return <LucideExternalLink className="w-5 h-5" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "guide":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "research":
        return "bg-green-100 text-green-800 border-green-200"
      case "photography":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "audio":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className={cn("w-full max-w-4xl mx-auto", className)}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
            <LucideExternalLink className="w-6 h-6 text-blue-500" />
            {data.title}
          </CardTitle>
          <p className="text-gray-600">Explore additional resources to enhance your Caribbean coast experience</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.links.map((link, index) => (
              <Card key={index} className="border-2 hover:border-blue-300 transition-colors">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {getIcon(link.type)}
                        <h4 className="font-semibold text-gray-900">{link.title}</h4>
                      </div>
                      {link.badge && (
                        <Badge className={cn("text-xs font-medium border", getTypeColor(link.type))}>
                          {link.badge}
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 leading-relaxed">{link.description}</p>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent"
                      onClick={() => {
                        if (link.url !== "#") {
                          window.open(link.url, "_blank", "noopener,noreferrer")
                        }
                      }}
                      disabled={link.url === "#"}
                    >
                      <LucideExternalLink className="w-4 h-4 mr-2" />
                      {link.url === "#" ? "Coming Soon" : "Visit Resource"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg text-center">
            <p className="text-sm text-blue-800">
              <strong>Have a resource to share?</strong> Contact us to add valuable links that could help fellow birders
              explore the Caribbean coast region.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ExternalLinksSection
export { ExternalLinksSection }
