"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Bird, ChevronDown, ChevronUp, MapPin, Clock, Mountain } from 'lucide-react'
import OptimizedImage from "./optimized-image"
import Link from "next/link"

interface TargetSpecies {
  name: string
  scientificName: string
  image: string
  description: string
  status: string
  funFact: string
  habitat?: string
  bestTime?: string
  elevation?: string
}

interface CollapsibleTargetSpeciesProps {
  species: TargetSpecies[]
  region: string
}

function CollapsibleTargetSpecies({ species, region }: CollapsibleTargetSpeciesProps) {
  const [isOpen, setIsOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Endemic":
        return "bg-red-100 text-red-800 border-red-200"
      case "Near Endemic":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Spectacular":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "Resident":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <CollapsibleTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between p-4 sm:p-6 h-auto border-l-4 border-l-orange-500 hover:bg-orange-50 bg-transparent transition-all duration-200"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-full flex-shrink-0">
              <Bird className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
            </div>
            <div className="text-left min-w-0 flex-1">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">Target Species</h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">
                {species.length} signature birds of the {region} region
              </p>
            </div>
          </div>
          <div className="flex-shrink-0 ml-2">
            {isOpen ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </div>
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent className="pt-4 sm:pt-6">
        <Accordion type="single" collapsible className="w-full space-y-3 sm:space-y-4">
          {species.map((bird, index) => (
            <AccordionItem
              key={index}
              value={`species-${index}`}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <AccordionTrigger className="px-4 sm:px-6 py-3 sm:py-4 hover:bg-gray-50 [&[data-state=open]]:bg-orange-50 [&>svg]:shrink-0">
                <div className="flex items-center gap-3 sm:gap-4 w-full min-w-0">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <OptimizedImage
                      src={bird.image}
                      alt={bird.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-start gap-2 mb-1">
                      <h4 className="font-semibold text-base sm:text-lg text-gray-800 line-clamp-1 flex-1">
                        {bird.name}
                      </h4>
                      <Badge className={`text-xs border flex-shrink-0 ${getStatusColor(bird.status)}`}>
                        {bird.status}
                      </Badge>
                    </div>
                    <p className="text-xs sm:text-sm italic text-gray-500 line-clamp-1">{bird.scientificName}</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 sm:px-6 pb-4 sm:pb-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                  {/* Image Section */}
                  <div className="lg:col-span-1">
                    <div className="aspect-square rounded-lg overflow-hidden mb-4">
                      <OptimizedImage
                        src={bird.image}
                        alt={bird.name}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="space-y-2">
                      {bird.habitat && (
                        <div className="flex items-start gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{bird.habitat}</span>
                        </div>
                      )}
                      {bird.bestTime && (
                        <div className="flex items-start gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{bird.bestTime}</span>
                        </div>
                      )}
                      {bird.elevation && (
                        <div className="flex items-start gap-2 text-sm text-gray-600">
                          <Mountain className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                          <span>{bird.elevation}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="lg:col-span-2 space-y-4">
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">About This Species</h5>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{bird.description}</p>
                    </div>

                    <div className="bg-gradient-to-r from-orange-50 to-red-50 p-3 sm:p-4 rounded-lg border-l-4 border-orange-500">
                      <h5 className="font-semibold text-orange-800 mb-2 flex items-center gap-2 text-sm sm:text-base">
                        <Bird className="w-4 h-4 flex-shrink-0" />
                        Fun Fact
                      </h5>
                      <p className="text-orange-700 leading-relaxed text-sm sm:text-base">{bird.funFact}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link
                        href={`/checkout?region=${region.toLowerCase().replace(/\s+/g, "-")}&source=species-${index}`}
                        className="flex-1"
                      >
                        <Button className="bg-orange-500 hover:bg-orange-600 text-white w-full touch-manipulation">
                          See This Bird on Tour
                        </Button>
                      </Link>
                      <Link
                        href={`/contact?subject=${encodeURIComponent(`${bird.name} - ${region} Tour`)}`}
                        className="flex-1"
                      >
                        <Button
                          variant="outline"
                          className="border-orange-500 text-orange-500 hover:bg-orange-50 w-full bg-transparent touch-manipulation"
                        >
                          Ask About This Species
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Section CTA */}
        <div className="mt-6 sm:mt-8">
          <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
            <CardContent className="p-4 sm:p-6 text-center">
              <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">Ready to See These Amazing Birds?</h4>
              <p className="text-gray-600 mb-4 max-w-2xl mx-auto text-sm sm:text-base">
                Join our expert guides to observe these spectacular species in their natural Caribbean coast habitats.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href={`/checkout?region=${region.toLowerCase().replace(/\s+/g, "-")}&source=target-species-section`}
                >
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 touch-manipulation">
                    Book {region} Tour
                  </Button>
                </Link>
                <Link href="/contact?subject=Target+Species+Questions">
                  <Button
                    variant="outline"
                    className="border-orange-500 text-orange-500 hover:bg-orange-50 px-6 bg-transparent touch-manipulation"
                  >
                    Speak with Our Experts
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export default CollapsibleTargetSpecies
export { CollapsibleTargetSpecies }
