"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bird, Trees, Target } from "lucide-react"

interface HighlightCardsProps {
  highlights: {
    birds: string[]
    habitats: string[]
    targets: string[]
  }
}

export default function HighlightCards({ highlights }: HighlightCardsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
      <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-orange-500">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-3 p-3 bg-orange-100 rounded-full w-fit">
            <Bird className="w-6 h-6 text-orange-600" />
          </div>
          <CardTitle className="text-lg text-gray-800">Featured Birds</CardTitle>
          <p className="text-sm text-gray-600">Key species you'll encounter</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {highlights.birds.map((bird, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-orange-50 rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                <span className="text-sm font-medium text-gray-800">{bird}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-green-500">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-3 p-3 bg-green-100 rounded-full w-fit">
            <Trees className="w-6 h-6 text-green-600" />
          </div>
          <CardTitle className="text-lg text-gray-800">Key Habitats</CardTitle>
          <p className="text-sm text-gray-600">Diverse ecosystems to explore</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {highlights.habitats.map((habitat, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                <span className="text-sm font-medium text-gray-800">{habitat}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-red-500">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-3 p-3 bg-red-100 rounded-full w-fit">
            <Target className="w-6 h-6 text-red-600" />
          </div>
          <CardTitle className="text-lg text-gray-800">Target Species</CardTitle>
          <p className="text-sm text-gray-600">Endemic & specialty birds</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {highlights.targets.map((target, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-red-50 rounded-lg">
                <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                <span className="text-sm font-medium text-gray-800">{target}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
