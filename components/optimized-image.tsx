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
      className={cn("relative overflow-hidden group flex items-center justify-center", className)}
      style={{ aspectRatio: `${width}/${height}` }}
    >
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        style={{
          ...style,
          objectFit: "contain",
          width: "100%",
          height: "100%",
          maxWidth: "100%",
          maxHeight: "100%",
        }}
        className={cn(
          "transition-all duration-300 ease-in-out",
          "group-hover:scale-105 group-hover:brightness-110",
          isLoading ? "blur-sm" : "blur-0",
          hasError ? "opacity-50" : "opacity-100",
          onClick ? "cursor-pointer" : "",
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false)
          setHasError(true)
        }}
        onClick={onClick}
        loading={priority ? "eager" : "lazy"}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
