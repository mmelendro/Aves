"use client"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface Highlight {
  icon: ReactNode
  title: string
  description: string
  color: string
}

interface HighlightCardsProps {
  highlights: Highlight[]
  className?: string
}

function HighlightCards({ highlights, className }: HighlightCardsProps) {
  const getColorClasses = (color: string) => {
    switch (color) {
      case "emerald":
        return "bg-emerald-50 border-emerald-200 text-emerald-600"
      case "blue":
        return "bg-blue-50 border-blue-200 text-blue-600"
      case "purple":
        return "bg-purple-50 border-purple-200 text-purple-600"
      case "orange":
        return "bg-orange-50 border-orange-200 text-orange-600"
      case "red":
        return "bg-red-50 border-red-200 text-red-600"
      case "yellow":
        return "bg-yellow-50 border-yellow-200 text-yellow-600"
      default:
        return "bg-gray-50 border-gray-200 text-gray-600"
    }
  }

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", className)}>
      {highlights.map((highlight, index) => (
        <Card
          key={index}
          className={cn(
            "border-2 transition-all duration-300 hover:shadow-lg hover:scale-105",
            getColorClasses(highlight.color),
          )}
        >
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-4">
              <div
                className={cn(
                  "p-3 rounded-full",
                  highlight.color === "emerald" && "bg-emerald-100",
                  highlight.color === "blue" && "bg-blue-100",
                  highlight.color === "purple" && "bg-purple-100",
                  highlight.color === "orange" && "bg-orange-100",
                  highlight.color === "red" && "bg-red-100",
                  highlight.color === "yellow" && "bg-yellow-100",
                  !["emerald", "blue", "purple", "orange", "red", "yellow"].includes(highlight.color) && "bg-gray-100",
                )}
              >
                {highlight.icon}
              </div>
            </div>
            <h3 className="font-semibold text-lg mb-2 text-gray-900">{highlight.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{highlight.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default HighlightCards
export { HighlightCards }
