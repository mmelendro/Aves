"use client"

import type React from "react"

import { useState } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ExternalLink } from "lucide-react"

interface SpeciesData {
  commonName: string
  scientificName: string
  spanishName: string
  ebirdCode?: string
  description?: string
}

interface SpeciesTooltipProps {
  species: SpeciesData
  children: React.ReactNode
}

export default function SpeciesTooltip({ species, children }: SpeciesTooltipProps) {
  const [isOpen, setIsOpen] = useState(false)

  const ebirdUrl = species.ebirdCode
    ? `https://ebird.org/species/${species.ebirdCode}`
    : `https://ebird.org/search?q=${encodeURIComponent(species.commonName)}`

  return (
    <TooltipProvider>
      <Tooltip open={isOpen} onOpenChange={setIsOpen}>
        <TooltipTrigger asChild>
          <span className="cursor-help underline decoration-dotted decoration-emerald-500 hover:decoration-solid transition-all">
            {children}
          </span>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs p-4 bg-white border border-gray-200 shadow-lg rounded-lg">
          <div className="space-y-2">
            <div>
              <h4 className="font-semibold text-gray-900">{species.commonName}</h4>
              <p className="text-sm italic text-gray-600">{species.scientificName}</p>
              <p className="text-sm text-emerald-600">{species.spanishName}</p>
            </div>
            {species.description && <p className="text-xs text-gray-500">{species.description}</p>}
            <a
              href={ebirdUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-xs text-blue-600 hover:text-blue-800 transition-colors"
            >
              View on eBird
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
