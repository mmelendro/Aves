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
        // Enhanced logo container styling with special ProAves treatment and footer optimization
        src.includes("logo") || src.includes("partners")
          ? `bg-white rounded-lg border border-gray-100 shadow-sm ${
              // Footer logo containers - expanded by factor of 4 for enhanced visibility with centering
              className?.includes("footer") || (typeof window !== "undefined" && window.location.pathname === "/")
                ? "max-w-[80px] w-[80px] h-[80px] sm:max-w-[96px] sm:w-[96px] sm:h-[96px] md:max-w-[112px] md:w-[112px] md:h-[112px] mx-auto flex-shrink-0"
                : "max-w-[40px] w-[40px] h-[40px] sm:max-w-[44px] sm:w-[44px] sm:h-[44px]"
            }`
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
        // Footer-specific centering
        src.includes("logo") &&
          (className?.includes("footer") || (typeof window !== "undefined" && window.location.pathname === "/"))
          ? "mx-auto justify-self-center place-self-center"
          : "",
        // Carousel-specific container optimizations for full image visibility
        className?.includes("carousel")
          ? "bg-gradient-to-br from-emerald-50 to-blue-50 border border-emerald-100 shadow-sm"
          : "",
        // Carousel active slide gets enhanced styling
        className?.includes("carousel-active") ? "ring-2 ring-emerald-200 shadow-lg" : "",
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
        // Footer logo centering optimization
        ...(src.includes("logo") &&
          (className?.includes("footer") || (typeof window !== "undefined" && window.location.pathname === "/")) && {
            maxWidth: "112px",
            maxHeight: "112px",
            width: "112px",
            height: "112px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }),
        // Footer logo size optimization - expanded by factor of 4
        ...(src.includes("logo") &&
          (className?.includes("footer") || (typeof window !== "undefined" && window.location.pathname === "/")) && {
            maxWidth: "112px",
            maxHeight: "112px",
            width: "112px",
            height: "112px",
          }),
        // Carousel-specific aspect ratio and containment
        ...(className?.includes("carousel") && {
          aspectRatio: "16/10",
          minHeight: "200px",
          maxHeight: "500px",
          contain: "layout style paint",
          willChange: "transform",
        }),
        // Ensure proper image containment for carousel slides
        ...(className?.includes("carousel") && {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }),
        // Performance optimization for carousel images
        ...(className?.includes("carousel") && {
          contentVisibility: "auto",
          containIntrinsicSize: "800px 500px",
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
          // Enhanced responsive logo handling with footer optimization
          minWidth: src.includes("logo")
            ? className?.includes("footer") || (typeof window !== "undefined" && window.location.pathname === "/")
              ? "80px" // Footer logos - expanded by factor of 4
              : width >= 50
                ? "28px"
                : "24px" // Header logos - standard size
            : "24px",
          minHeight: src.includes("logo")
            ? className?.includes("footer") || (typeof window !== "undefined" && window.location.pathname === "/")
              ? "80px" // Footer logos - expanded by factor of 4
              : height >= 50
                ? "28px"
                : "24px" // Header logos - standard size
            : "24px",
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
          // Carousel-specific optimizations
          className?.includes("carousel") ? "select-none pointer-events-none" : "",
          // Enhanced classes for toucan images to ensure full frame coverage
          (src.includes("toucan") || alt.toLowerCase().includes("toucan")) &&
            "!object-cover !w-full !h-full !min-w-full !min-h-full",
          // Loading and error states
          isLoading ? "blur-sm" : "blur-0",
          hasError ? "opacity-50" : "opacity-100",
          // Interactive states
          onClick ? "cursor-pointer" : "",
          // Context-aware logo sizing with footer optimization
          src.includes("logo") &&
            // Footer logos - expanded by factor of 4 for enhanced visibility
            (className?.includes("footer") || (typeof window !== "undefined" && window.location.pathname === "/")
              ? "sm:max-w-[80px] sm:max-h-[80px] md:max-w-[96px] md:max-h-[96px] lg:max-w-[112px] lg:max-h-[112px]"
              : // Header logos - standard size with strict maximum limits
                width >= 50 || height >= 50
                ? "sm:max-w-[40px] sm:max-h-[40px] md:max-w-[44px] md:max-h-[44px] lg:max-w-[48px] lg:max-h-[48px] xl:max-w-[50px] xl:max-h-[50px]"
                : "sm:max-w-[28px] sm:max-h-[28px] md:max-w-[32px] md:max-h-[32px] lg:max-w-[36px] lg:max-h-[36px]"),

          // Add strict containment classes to prevent overflow (only for logos)
          src.includes("logo") && "!max-w-[50px] !max-h-[50px]",
          // Ensure proper containment within frame
          "flex-shrink-0",
        )}
        loading={
          priority || className?.includes("carousel-active")
            ? "eager"
            : className?.includes("carousel")
              ? "lazy"
              : priority
                ? "eager"
                : "lazy"
        }
        sizes={
          className?.includes("carousel")
            ? "(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 800px"
            : src.includes("logo")
              ? "(max-width: 640px) 32px, (max-width: 768px) 36px, 40px"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        }
        {...(className?.includes("carousel") && {
          "data-carousel": "true",
          onLoad: () => {
            setIsLoading(false)
            // Preload next carousel image
            if (typeof window !== "undefined" && window.requestIdleCallback) {
              window.requestIdleCallback(() => {
                // Preload logic handled by carousel component
              })
            }
          },
        })}
        {...(className?.includes("carousel") && {
          fetchPriority: className?.includes("carousel-active") ? "high" : "low",
          decoding: "async",
        })}
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
