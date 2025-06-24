"use client"

import type React from "react"

import { useState, useRef, useCallback, useEffect } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"

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
  beforeLabel = "Before Conservation",
  afterLabel = "After Conservation",
  className,
  height = 400,
  width = 600,
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const updateSliderPosition = useCallback((clientX: number) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }, [])

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      setIsDragging(true)
      updateSliderPosition(e.clientX)
    },
    [updateSliderPosition],
  )

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return
      e.preventDefault()
      updateSliderPosition(e.clientX)
    },
    [isDragging, updateSliderPosition],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault()
      setIsDragging(true)
      updateSliderPosition(e.touches[0].clientX)
    },
    [updateSliderPosition],
  )

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return
      e.preventDefault()
      updateSliderPosition(e.touches[0].clientX)
    },
    [isDragging, updateSliderPosition],
  )

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      document.addEventListener("touchmove", handleTouchMove, { passive: false })
      document.addEventListener("touchend", handleTouchEnd)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleTouchEnd)
    }
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd])

  return (
    <div className={cn("relative overflow-hidden rounded-lg shadow-lg bg-gray-200 mx-auto border", className)}>
      <div
        ref={containerRef}
        className="relative cursor-col-resize select-none bg-gray-100"
        style={{
          height: `${height}px`,
          width: "100%",
          maxWidth: "none",
          aspectRatio: "3/2",
          minHeight: "200px",
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* BEFORE Image (Base layer - Natural nest) */}
        <div className="absolute inset-0 w-full h-full bg-gray-200">
          <Image
            src={beforeImage || "/placeholder.svg"}
            alt={beforeAlt}
            fill
            className="object-cover w-full h-full"
            priority
            onLoad={() => setIsLoaded(true)}
            onError={(e) => {
              console.error("Before image failed to load:", beforeImage)
              e.currentTarget.src = "/placeholder.svg?height=400&width=600&text=Image+Not+Found"
            }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 600px"
            style={{
              objectPosition: "center center",
              filter: "contrast(1.05) saturate(1.1) brightness(1.02)",
            }}
            unoptimized={false}
          />
          {/* Subtle overlay to emphasize the natural solution */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/3 via-transparent to-emerald-900/6"></div>
          <div
            className={`absolute top-3 left-3 bg-emerald-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-md z-20 transition-opacity duration-300 ${sliderPosition < 50 ? "opacity-100" : "opacity-0"}`}
          >
            {beforeLabel}
          </div>
        </div>

        {/* AFTER Image (Overlay layer - Plastic nest) */}
        <div
          className="absolute inset-0 overflow-hidden w-full h-full bg-gray-200"
          style={{ width: `${sliderPosition}%` }}
        >
          <div
            className="relative w-full h-full"
            style={{ width: `${(100 / sliderPosition) * 100}%`, minWidth: "100%" }}
          >
            <Image
              src={afterImage || "/placeholder.svg"}
              alt={afterAlt}
              fill
              className="object-cover"
              priority
              onError={(e) => {
                console.error("After image failed to load:", afterImage)
                e.currentTarget.src = "/placeholder.svg?height=400&width=600&text=Image+Not+Found"
              }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 600px"
              style={{
                objectPosition: "center center",
                filter: "contrast(1.1) saturate(1.05)",
                width: "100%",
                height: "100%",
              }}
              unoptimized={false}
            />
          </div>
          <div
            className={`absolute top-3 right-3 bg-red-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-md z-20 transition-opacity duration-300 ${sliderPosition >= 50 ? "opacity-100" : "opacity-0"}`}
          >
            {afterLabel}
          </div>
        </div>

        {/* Slider Line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10 transition-opacity duration-300"
          style={{ left: `${sliderPosition}%`, opacity: isLoaded ? 1 : 0 }}
        >
          {/* Slider Handle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border-2 border-gray-300 cursor-col-resize flex items-center justify-center hover:scale-105 transition-all duration-200 hover:border-emerald-400">
            <div className="flex space-x-0.5">
              <div className="w-1 h-5 bg-gray-400 rounded-full"></div>
              <div className="w-1 h-5 bg-gray-400 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Instructions overlay */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white px-4 py-2 rounded-full text-xs font-medium backdrop-blur-sm">
          <span className="hidden sm:inline">Drag to reveal impact • </span>
          <span className="text-red-300">Polluted</span> → <span className="text-emerald-300">Protected</span>
        </div>

        {/* Loading overlay */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="text-gray-500 text-sm">Loading comparison...</div>
          </div>
        )}
      </div>
    </div>
  )
}
