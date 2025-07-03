"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { Play, Pause, Volume2, VolumeX, Wifi, WifiOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface YouTubeHeroBackgroundProps {
  videoId: string
  title?: string
  subtitle?: string
  children?: React.ReactNode
  className?: string
  showAttribution?: boolean
  attributionText?: string
}

// Network speed detection and quality mapping
const getOptimalQuality = (connectionSpeed: string, isMobile: boolean) => {
  if (isMobile) {
    switch (connectionSpeed) {
      case "fast":
        return "hd720"
      case "medium":
        return "large"
      default:
        return "medium"
    }
  }

  switch (connectionSpeed) {
    case "fast":
      return "hd1080"
    case "medium":
      return "hd720"
    default:
      return "large"
  }
}

// Detect connection speed
const detectConnectionSpeed = async (): Promise<string> => {
  try {
    // Use Network Information API if available
    if ("connection" in navigator) {
      const connection = (navigator as any).connection
      if (connection) {
        const effectiveType = connection.effectiveType
        switch (effectiveType) {
          case "4g":
            return "fast"
          case "3g":
            return "medium"
          default:
            return "slow"
        }
      }
    }

    // Fallback: Simple speed test
    const startTime = performance.now()
    await fetch("/images/aves-logo.png", { cache: "no-cache" })
    const endTime = performance.now()
    const duration = endTime - startTime

    if (duration < 100) return "fast"
    if (duration < 300) return "medium"
    return "slow"
  } catch {
    return "medium" // Safe default
  }
}

export default function YouTubeHeroBackground({
  videoId,
  title,
  subtitle,
  children,
  className,
  showAttribution = true,
  attributionText = "8K Drone Footage by Martín Melendro Torres",
}: YouTubeHeroBackgroundProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [connectionSpeed, setConnectionSpeed] = useState<string>("medium")
  const [currentQuality, setCurrentQuality] = useState<string>("hd720")
  const [showControls, setShowControls] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [player, setPlayer] = useState<any>(null)
  const [isAPIReady, setIsAPIReady] = useState(false)
  const playerRef = useRef<HTMLDivElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout>()

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
      )
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Detect connection speed on mount
  useEffect(() => {
    const checkSpeed = async () => {
      const speed = await detectConnectionSpeed()
      setConnectionSpeed(speed)
      setCurrentQuality(getOptimalQuality(speed, isMobile))
    }
    checkSpeed()
  }, [isMobile])

  // Load YouTube API
  useEffect(() => {
    if (typeof window === "undefined") return

    const loadYouTubeAPI = () => {
      if (window.YT && window.YT.Player) {
        setIsAPIReady(true)
        return
      }

      if (!document.querySelector('script[src*="youtube"]')) {
        const script = document.createElement("script")
        script.src = "https://www.youtube.com/iframe_api"
        script.async = true
        document.head.appendChild(script)
      }

      window.onYouTubeIframeAPIReady = () => {
        setIsAPIReady(true)
      }
    }

    loadYouTubeAPI()
  }, [])

  // Initialize player when API is ready
  useEffect(() => {
    if (!isAPIReady || !playerRef.current || player) return

    const initializePlayer = () => {
      try {
        const newPlayer = new window.YT.Player(playerRef.current, {
          videoId,
          playerVars: {
            autoplay: 1,
            mute: 1,
            controls: 0,
            showinfo: 0,
            rel: 0,
            loop: 1,
            playlist: videoId,
            modestbranding: 1,
            iv_load_policy: 3,
            fs: 0,
            cc_load_policy: 0,
            playsinline: 1,
            enablejsapi: 1,
            origin: window.location.origin,
            quality: currentQuality,
          },
          events: {
            onReady: (event: any) => {
              setPlayer(event.target)
              setIsLoading(false)

              // Attempt to play with sound first, fallback to muted
              event.target.unMute()
              event.target.playVideo()

              // Check if playing after a short delay
              setTimeout(() => {
                const state = event.target.getPlayerState()
                if (state !== 1) {
                  // Not playing
                  event.target.mute()
                  event.target.playVideo()
                  setIsMuted(true)
                } else {
                  setIsMuted(false)
                }
                setIsPlaying(true)
              }, 1000)
            },
            onStateChange: (event: any) => {
              setIsPlaying(event.data === 1)

              // Handle quality changes and errors
              if (event.data === -1) {
                // Unstarted/Error
                const availableQualities = event.target.getAvailableQualityLevels()
                if (availableQualities.length > 0) {
                  const fallbackQuality = availableQualities[Math.min(1, availableQualities.length - 1)]
                  event.target.setPlaybackQuality(fallbackQuality)
                  setCurrentQuality(fallbackQuality)
                }
              }
            },
            onError: (event: any) => {
              console.warn("YouTube player error:", event.data)
              // Try lower quality on error
              if (player) {
                const lowerQuality = currentQuality === "hd1080" ? "hd720" : "large"
                player.setPlaybackQuality(lowerQuality)
                setCurrentQuality(lowerQuality)
              }
            },
          },
        })
      } catch (error) {
        console.warn("Error initializing YouTube player:", error)
        setIsLoading(false)
      }
    }

    initializePlayer()
  }, [isAPIReady, videoId, currentQuality])

  // Control handlers
  const togglePlay = useCallback(() => {
    if (!player) return
    try {
      if (isPlaying) {
        player.pauseVideo()
      } else {
        player.playVideo()
      }
    } catch (error) {
      console.warn("Error toggling play:", error)
    }
  }, [player, isPlaying])

  const toggleMute = useCallback(() => {
    if (!player) return
    try {
      if (isMuted) {
        player.unMute()
        setIsMuted(false)
      } else {
        player.mute()
        setIsMuted(true)
      }
    } catch (error) {
      console.warn("Error toggling mute:", error)
    }
  }, [player, isMuted])

  // Show/hide controls on hover
  const handleMouseEnter = useCallback(() => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false)
    }, 2000)
  }, [])

  // Get connection speed icon and color
  const getConnectionIcon = () => {
    switch (connectionSpeed) {
      case "fast":
        return <Wifi className="w-4 h-4 text-green-400" />
      case "medium":
        return <Wifi className="w-4 h-4 text-yellow-400" />
      default:
        return <WifiOff className="w-4 h-4 text-red-400" />
    }
  }

  const getQualityColor = () => {
    switch (currentQuality) {
      case "hd1080":
        return "text-green-400"
      case "hd720":
        return "text-blue-400"
      default:
        return "text-yellow-400"
    }
  }

  return (
    <div
      className={cn(
        "relative w-full h-screen overflow-hidden bg-gradient-to-br from-cyan-900 via-blue-900 to-emerald-900",
        className,
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* YouTube Video Container */}
      <div className="absolute inset-0 youtube-container">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-cyan-900 via-blue-900 to-emerald-900">
            <div className="text-center text-white">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4" />
              <p className="text-lg font-medium">Loading 8K Experience...</p>
              <div className="flex items-center justify-center mt-2 space-x-2">
                {getConnectionIcon()}
                <span className="text-sm opacity-75">
                  {connectionSpeed === "fast" ? "Fast" : connectionSpeed === "medium" ? "Medium" : "Slow"} Connection
                </span>
              </div>
            </div>
          </div>
        )}

        <div
          ref={playerRef}
          className="absolute inset-0"
          style={{
            width: "100%",
            height: "100%",
            pointerEvents: showControls ? "auto" : "none",
          }}
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 via-transparent to-emerald-900/20 pointer-events-none" />

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
        {title && (
          <h1 className="youtube-hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-4 sm:mb-6 text-shadow-2xl animate-fade-in-up">
            {title}
          </h1>
        )}

        {subtitle && (
          <p className="youtube-hero-subtitle text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 mb-8 sm:mb-12 max-w-4xl text-shadow-lg animate-fade-in-up">
            {subtitle}
          </p>
        )}

        {children}

        {/* Floating Stats */}
        <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
          <div className="caribbean-stats grid grid-cols-2 md:grid-cols-4 gap-4 text-white">
            <div className="text-center animate-tropical-float">
              <div className="text-2xl sm:text-3xl font-bold text-shadow">🏝️</div>
              <div className="text-xs sm:text-sm opacity-75">Caribbean Coast</div>
            </div>
            <div className="text-center animate-tropical-float" style={{ animationDelay: "1s" }}>
              <div className="text-2xl sm:text-3xl font-bold text-shadow">⛰️</div>
              <div className="text-xs sm:text-sm opacity-75">Sierra Nevada</div>
            </div>
            <div className="text-center animate-tropical-float" style={{ animationDelay: "2s" }}>
              <div className="text-2xl sm:text-3xl font-bold text-shadow">🦅</div>
              <div className="text-xs sm:text-sm opacity-75">300+ Species</div>
            </div>
            <div className="text-center animate-tropical-float" style={{ animationDelay: "3s" }}>
              <div className="text-2xl sm:text-3xl font-bold text-shadow">🌿</div>
              <div className="text-xs sm:text-sm opacity-75">5 Ecosystems</div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Controls */}
      <div
        className={cn(
          "absolute top-4 right-4 flex items-center space-x-2 transition-all duration-300 z-20",
          showControls ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none",
        )}
      >
        {/* Quality and Connection Indicator */}
        <div className="flex items-center space-x-2 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-sm">
          {getConnectionIcon()}
          <span className={cn("font-medium", getQualityColor())}>{currentQuality.toUpperCase()}</span>
        </div>

        {/* Play/Pause Button */}
        <Button
          size="sm"
          variant="secondary"
          onClick={togglePlay}
          className="bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white border-white/20"
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>

        {/* Mute/Unmute Button */}
        <Button
          size="sm"
          variant="secondary"
          onClick={toggleMute}
          className="bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white border-white/20"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </Button>
      </div>

      {/* Attribution */}
      {showAttribution && (
        <div className="absolute bottom-4 right-4 text-white/60 text-xs bg-black/30 backdrop-blur-sm rounded px-2 py-1">
          {attributionText}
        </div>
      )}

      {/* Wave Animation */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-cyan-500/20 to-transparent animate-wave-motion" />
        <div
          className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-blue-500/15 to-transparent animate-wave-motion"
          style={{ animationDelay: "2s" }}
        />
      </div>
    </div>
  )
}
