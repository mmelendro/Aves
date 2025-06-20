"use client"

import type React from "react"

import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  style?: React.CSSProperties
  onClick?: () => void
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  style,
  onClick,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  return (
    <div
      className={cn(
        "relative overflow-hidden flex items-center justify-center",
        // Only apply hover effects on non-touch devices
        "md:group md:hover:scale-105 md:hover:brightness-110",
        className,
      )}
      style={{
        aspectRatio: `${width}/${height}`,
        touchAction: "pan-y pinch-zoom",
        ...style,
      }}
    >
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        style={{
          objectFit: "contain",
          width: "100%",
          height: "100%",
          maxWidth: "100%",
          maxHeight: "100%",
          // Enhanced responsive logo handling
          minWidth: "24px",
          minHeight: "24px",
          // Ensure proper scaling on all devices
          transform: "scale(1)",
          transformOrigin: "center",
          // Prevent layout shift during loading
          aspectRatio: `${width}/${height}`,
          touchAction: "pan-y pinch-zoom",
          ...style,
        }}
        className={cn(
          // Enhanced responsive transitions - only on desktop
          "md:transition-all md:duration-300 md:ease-in-out",
          // Improved responsive scaling and centering
          "object-contain mx-auto",
          // Responsive sizing constraints
          "max-w-full max-h-full",
          // Loading and error states
          isLoading ? "blur-sm" : "blur-0",
          hasError ? "opacity-50" : "opacity-100",
          // Interactive states
          onClick ? "cursor-pointer" : "",
          // Logo-specific responsive classes - optimized for footer balance
          "sm:max-w-[16px] sm:max-h-[16px]",
          "md:max-w-[18px] md:max-h-[18px]",
          "lg:max-w-[20px] lg:max-h-[20px]",
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false)
          setHasError(true)
        }}
        onClick={onClick}
        loading={priority ? "eager" : "lazy"}
        sizes="(max-width: 640px) 16px, (max-width: 768px) 18px, 20px"
      />
      {isLoading && <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />}
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400 text-sm">Image unavailable</span>
        </div>
      )}
    </div>
  )
}
