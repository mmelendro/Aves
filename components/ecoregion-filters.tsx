"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { TreePine, Droplets, Fish, Filter, X } from "lucide-react"

interface FilterOption {
  id: string
  label: string
  icon: React.ReactNode
  count: number
  color: string
}

const filterOptions: FilterOption[] = [
  {
    id: "terrestrial",
    label: "Terrestrial",
    icon: <TreePine className="w-4 h-4" />,
    count: 24,
    color: "bg-green-100 text-green-800",
  },
  {
    id: "marine",
    label: "Marine",
    icon: <Droplets className="w-4 h-4" />,
    count: 2,
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: "freshwater",
    label: "Freshwater",
    icon: <Fish className="w-4 h-4" />,
    count: 5,
    color: "bg-indigo-100 text-indigo-800",
  },
]

const priorityFilters = [
  { id: "critical", label: "Critical Priority", color: "bg-red-100 text-red-800" },
  { id: "vulnerable", label: "Vulnerable", color: "bg-orange-100 text-orange-800" },
  { id: "stable", label: "Stable", color: "bg-green-100 text-green-800" },
]

export function EcoregionFilters() {
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  const toggleFilter = (filterId: string) => {
    setActiveFilters((prev) => (prev.includes(filterId) ? prev.filter((id) => id !== filterId) : [...prev, filterId]))
  }

  const clearFilters = () => {
    setActiveFilters([])
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Filter Toggle Button */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          <span className="hidden sm:inline">Filter Ecoregions</span>
          <span className="sm:hidden">Filters</span>
          {activeFilters.length > 0 && (
            <Badge variant="secondary" className="ml-1 text-xs">
              {activeFilters.length}
            </Badge>
          )}
        </Button>

        {activeFilters.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="flex items-center gap-2 text-gray-500">
            <X className="w-4 h-4" />
            Clear All
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {activeFilters.map((filterId) => {
            const option = [...filterOptions, ...priorityFilters].find((opt) => opt.id === filterId)
            if (!option) return null

            return (
              <Badge
                key={filterId}
                className={`${option.color} cursor-pointer hover:opacity-80 flex items-center gap-1`}
                onClick={() => toggleFilter(filterId)}
              >
                {option.icon && option.icon}
                {option.label}
                <X className="w-3 h-3 ml-1" />
              </Badge>
            )
          })}
        </div>
      )}

      {/* Filter Options */}
      {showFilters && (
        <Card className="mb-6">
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-6">
              {/* Ecosystem Type Filters */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 text-sm">Ecosystem Type</h4>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.map((option) => (
                    <Button
                      key={option.id}
                      variant={activeFilters.includes(option.id) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleFilter(option.id)}
                      className="flex items-center gap-2 text-xs sm:text-sm"
                    >
                      {option.icon}
                      {option.label}
                      <Badge variant="secondary" className="ml-1 text-xs">
                        {option.count}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Conservation Priority Filters */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 text-sm">Conservation Priority</h4>
                <div className="flex flex-wrap gap-2">
                  {priorityFilters.map((filter) => (
                    <Button
                      key={filter.id}
                      variant={activeFilters.includes(filter.id) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleFilter(filter.id)}
                      className="text-xs sm:text-sm"
                    >
                      {filter.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
