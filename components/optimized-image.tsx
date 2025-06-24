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
  fallback?: string
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
  fallback = "/placeholder-user.jpg",
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(src)

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
    if (currentSrc !== fallback) {
      // Provide specific fallbacks for known broken team member images
      let specificFallback = fallback
      if (src.includes("Jaider Carrillo") || alt.includes("Jaider Carrillo")) {
        specificFallback = "/images/manakin-1.jpg" // Use a bird image as professional placeholder
      } else if (src.includes("jose-luis-ropero") || alt.includes("Jose Luis Ropero")) {
        specificFallback = "/images/manakin-2.jpg" // Use a different bird image as placeholder
      }

      setCurrentSrc(specificFallback)
      setHasError(false)
      setIsLoading(true)
    }
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden flex items-center justify-center",
        // Enhanced responsive container with proper aspect ratio handling
        "w-full h-full",
        // Only apply hover effects on non-touch devices
        "md:group md:hover:scale-105 md:hover:brightness-110",
        // Enhanced logo container styling with special ProAves treatment
        src.includes("logo") || src.includes("partners")
          ? "bg-white rounded-lg border border-gray-100 shadow-sm"
          : "bg-gray-100 rounded-lg",
        // Special styling for ProAves logo with conservation theme - enhanced for GIF
        src.includes("proaves") ? "border-emerald-200 bg-gradient-to-br from-white to-emerald-50 shadow-md" : "",
        // Enhanced visual hierarchy for partner logos with GIF support
        src.includes("partners") ? "hover:shadow-lg transition-shadow duration-200" : "",
        // GIF-specific optimizations for smooth animation
        src.includes(".gif") ? "will-change-transform backface-visibility-hidden" : "",
        // Add context-aware styling for bird images with proper containment
        src.includes("/images/") && !src.includes("logo") && !src.includes("partners")
          ? "bg-gradient-to-br from-emerald-50 to-blue-50"
          : "",
        // Enhanced styling for team member images
        src.includes("team") || alt.toLowerCase().includes("guide") || alt.toLowerCase().includes("specialist")
          ? "bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200"
          : "",
        className,
      )}
      style={{
        aspectRatio: `${width}/${height}`,
        touchAction: "pan-y pinch-zoom",
        // Enhanced container constraints for proper image scaling
        maxWidth: "100%",
        maxHeight: "100%",
        // Ensure proper containment without overflow
        contain: "layout style",
        // GIF performance optimizations
        ...(src.includes(".gif") && {
          transform: "translateZ(0)", // Hardware acceleration for GIF
          WebkitTransform: "translateZ(0)",
        }),
        // Enhanced responsive behavior for toucan and bird images
        ...((src.includes("toucan") || src.includes("bird") || alt.toLowerCase().includes("toucan")) && {
          minHeight: "200px",
          maxHeight: "600px",
        }),
        ...style,
      }}
    >
      <Image
        src={
          currentSrc ||
          (src.includes("Jaider Carrillo")
            ? "/images/manakin-1.jpg"
            : src.includes("jose-luis-ropero")
              ? "/images/manakin-2.jpg"
              : "/placeholder-user.jpg")
        }
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        style={{
          objectFit:
            src.includes("logo") || src.includes("partners")
              ? "contain"
              : src.includes("toucan") || alt.toLowerCase().includes("toucan")
                ? "cover"
                : "cover",
          width: "100%",
          height: "100%",
          maxWidth: "100%",
          maxHeight: "100%",
          // Enhanced responsive logo handling with strict maximum constraints
          minWidth: src.includes("logo") ? (width >= 50 ? "28px" : "24px") : "24px",
          minHeight: src.includes("logo") ? (height >= 50 ? "28px" : "24px") : "24px",
          // Enhanced scaling for toucan images to fill frame completely
          ...((src.includes("toucan") || alt.toLowerCase().includes("toucan")) && {
            minWidth: "100%",
            minHeight: "100%",
            objectFit: "cover",
            objectPosition: "center center",
          }),
          // Ensure proper scaling on all devices without distortion
          transform: "scale(1)",
          transformOrigin: "center",
          // Prevent layout shift during loading
          aspectRatio: `${width}/${height}`,
          touchAction: "pan-y pinch-zoom",
          // Optimized padding for logos to prevent edge cropping and ensure proper framing
          padding:
            src.includes("logo") || src.includes("partners")
              ? src.includes("proaves")
                ? "8px"
                : width >= 50
                  ? "2px"
                  : "4px"
              : "0",
          // Enhanced object positioning for toucan images
          objectPosition: src.includes("toucan") || alt.toLowerCase().includes("toucan") ? "center center" : "center",
          // GIF-specific optimizations
          ...(src.includes(".gif") && {
            imageRendering: "auto",
            WebkitImageRendering: "auto",
            msImageRendering: "auto",
          }),
          ...style,
        }}
        className={cn(
          // Enhanced responsive transitions - only on desktop
          "md:transition-all md:duration-300 md:ease-in-out",
          // Improved responsive scaling and centering with proper containment
          src.includes("logo") ? "object-contain mx-auto" : "object-cover mx-auto",
          // Enhanced responsive sizing constraints to prevent overflow
          "max-w-full max-h-full w-full h-full",
          // Enhanced classes for toucan images to ensure full frame coverage
          (src.includes("toucan") || alt.toLowerCase().includes("toucan")) &&
            "!object-cover !w-full !h-full !min-w-full !min-h-full",
          // Loading and error states
          isLoading ? "blur-sm" : "blur-0",
          hasError ? "opacity-50" : "opacity-100",
          // Interactive states
          onClick ? "cursor-pointer" : "",
          // Context-aware logo sizing with strict maximum constraints
          src.includes("logo") &&
            // Header logos - with strict maximum limits to prevent oversizing
            (width >= 50 || height >= 50
              ? "sm:max-w-[40px] sm:max-h-[40px] md:max-w-[44px] md:max-h-[44px] lg:max-w-[48px] lg:max-h-[48px] xl:max-w-[50px] xl:max-h-[50px]"
              : // Footer logos - smaller, balanced size
                "sm:max-w-[28px] sm:max-h-[28px] md:max-w-[32px] md:max-h-[32px] lg:max-w-[36px] lg:max-h-[36px]"),

          // Add strict containment classes to prevent overflow (only for logos)
          src.includes("logo") && "!max-w-[50px] !max-h-[50px]",
          // Ensure proper containment within frame
          "flex-shrink-0",
        )}
        onLoad={() => setIsLoading(false)}
        onError={handleError}
        onClick={
          onClick ||
          (src.includes("logo")
            ? () => {
                if (typeof window !== "undefined") {
                  window.location.href = "/#top"
                }
              }
            : undefined)
        }
        loading={priority ? "eager" : "lazy"}
        sizes="(max-width: 640px) 32px, (max-width: 768px) 36px, 40px"
      />
      {isLoading && <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />}
      {hasError && currentSrc === fallback && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400 text-sm">
            {alt.toLowerCase().includes("guide") || alt.toLowerCase().includes("specialist")
              ? "Team member photo unavailable"
              : "Image unavailable"}
          </span>
        </div>
      )}
    </div>
  )
}
