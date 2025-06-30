"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { cn } from "@/lib/utils"

interface BeforeAfterSliderProps {
  beforeImage: string
  afterImage: string
  beforeAlt: string
  afterAlt: string
  beforeLabel?: string
  afterLabel?: string
  className?: string
  height?: number
  width?: number
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeAlt,
  afterAlt,
  beforeLabel = "Before",
  afterLabel = "After",
  className,
  height = 400,
  width,
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = useCallback(() => {
    setIsDragging(true)
  }, [])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
      setSliderPosition(percentage)
    },
    [isDragging],
  )

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging || !containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = e.touches[0].clientX - rect.left
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
      setSliderPosition(percentage)
    },
    [isDragging],
  )

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden rounded-lg cursor-col-resize select-none w-full", className)}
      style={{ height, maxWidth: width || "100%" }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      {/* Base Image (Plastic Nest - Right side) */}
      <div className="absolute inset-0">
        <img
          src={afterImage || "/placeholder.svg"}
          alt={afterAlt}
          className="w-full h-full object-cover"
          draggable={false}
        />
        {afterLabel && (
          <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-md text-sm font-medium">
            {afterLabel}
          </div>
        )}
      </div>

      {/* Overlay Image (Natural Nest - Left side) */}
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
        <img
          src={beforeImage || "/placeholder.svg"}
          alt={beforeAlt}
          className="w-full h-full object-cover"
          draggable={false}
        />
        {beforeLabel && (
          <div className="absolute top-4 left-4 bg-emerald-600 text-white px-3 py-1 rounded-md text-sm font-medium">
            {beforeLabel}
          </div>
        )}
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize z-10"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
          <div className="w-4 h-4 flex items-center justify-center">
            <div className="w-0.5 h-3 bg-gray-400 mx-0.5"></div>
            <div className="w-0.5 h-3 bg-gray-400 mx-0.5"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
