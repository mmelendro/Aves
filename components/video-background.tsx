"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VideoBackgroundProps {
  src: string
  poster?: string
  className?: string
  overlay?: boolean
  controls?: boolean
}

export default function VideoBackground({
  src,
  poster,
  className = "",
  overlay = true,
  controls = true,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedData = () => {
      setIsLoading(false)
      // Attempt to play the video
      video.play().catch((error) => {
        console.log("Autoplay prevented:", error)
        setIsPlaying(false)
      })
    }

    const handleError = () => {
      setIsLoading(false)
      setHasError(true)
    }

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    video.addEventListener("loadeddata", handleLoadedData)
    video.addEventListener("error", handleError)
    video.addEventListener("play", handlePlay)
    video.addEventListener("pause", handlePause)

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData)
      video.removeEventListener("error", handleError)
      video.removeEventListener("play", handlePlay)
      video.removeEventListener("pause", handlePause)
    }
  }, [])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play().catch((error) => {
        console.log("Play failed:", error)
      })
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !video.muted
    setIsMuted(video.muted)
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Video Element */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted={isMuted}
        loop
        playsInline
        poster={poster}
        preload="metadata"
        style={{ filter: hasError ? "blur(10px)" : "none" }}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      {overlay && (
        <div className="absolute inset-0 bg-black/30 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="flex flex-col items-center space-y-4 text-white">
            <Loader2 className="w-8 h-8 animate-spin" />
            <p className="text-sm">Loading video...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-50 to-blue-50">
          <div className="text-center text-gray-600">
            <p className="text-lg font-medium">Video unavailable</p>
            <p className="text-sm">Displaying fallback background</p>
          </div>
        </div>
      )}

      {/* Video Controls */}
      {controls && !isLoading && !hasError && (
        <div className="absolute bottom-4 right-4 flex space-x-2 z-10">
          <Button
            size="sm"
            variant="secondary"
            className="bg-black/50 hover:bg-black/70 text-white border-0 backdrop-blur-sm"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="bg-black/50 hover:bg-black/70 text-white border-0 backdrop-blur-sm"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>
        </div>
      )}

      {/* Accessibility */}
      <div className="sr-only">
        Background video showing aerial footage of Tayrona National Park and Sierra Nevada mountains in Colombia
      </div>
    </div>
  )
}
