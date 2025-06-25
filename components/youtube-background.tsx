"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, Loader2, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface YouTubeBackgroundProps {
  videoId: string
  className?: string
  overlay?: boolean
  controls?: boolean
  startTime?: number
  endTime?: number
}

export default function YouTubeBackground({
  videoId,
  className = "",
  overlay = true,
  controls = true,
  startTime = 0,
  endTime,
}: YouTubeBackgroundProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [player, setPlayer] = useState<any>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [apiLoaded, setApiLoaded] = useState(false)
  const playerRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Check if YouTube API is already loaded
  useEffect(() => {
    if (typeof window !== "undefined" && window.YT && window.YT.Player) {
      setApiLoaded(true)
    }
  }, [])

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!containerRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: "50px",
        threshold: 0.1,
      },
    )

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  // Load YouTube API when needed
  useEffect(() => {
    if (!isIntersecting || apiLoaded) return

    const loadYouTubeAPI = () => {
      if (typeof window === "undefined") return

      // Check if script already exists
      const existingScript = document.querySelector('script[src*="youtube.com/iframe_api"]')
      if (existingScript) {
        setApiLoaded(true)
        return
      }

      const script = document.createElement("script")
      script.src = "https://www.youtube.com/iframe_api"
      script.async = true
      script.defer = true

      script.onload = () => {
        setApiLoaded(true)
      }

      script.onerror = () => {
        console.error("Failed to load YouTube API")
        setHasError(true)
        setIsLoading(false)
      }

      document.head.appendChild(script)

      // Global callback for YouTube API
      window.onYouTubeIframeAPIReady = () => {
        setApiLoaded(true)
      }
    }

    loadYouTubeAPI()
  }, [isIntersecting, apiLoaded])

  // Initialize YouTube player
  useEffect(() => {
    if (!apiLoaded || !playerRef.current || !isIntersecting || player) return

    const initializePlayer = () => {
      try {
        if (!window.YT || !window.YT.Player) {
          setTimeout(initializePlayer, 100)
          return
        }

        const newPlayer = new window.YT.Player(playerRef.current, {
          videoId: videoId,
          playerVars: {
            autoplay: 1,
            mute: 1,
            loop: 1,
            playlist: videoId,
            controls: 0,
            showinfo: 0,
            rel: 0,
            iv_load_policy: 3,
            modestbranding: 1,
            playsinline: 1,
            start: startTime,
            end: endTime,
            enablejsapi: 1,
            origin: window.location.origin,
            quality: "hd720",
            vq: "hd720",
          },
          events: {
            onReady: (event: any) => {
              console.log("YouTube player ready")
              setIsLoading(false)
              setPlayer(event.target)
              event.target.setPlaybackQuality("hd720")
              event.target.playVideo()
            },
            onStateChange: (event: any) => {
              if (event.data === window.YT.PlayerState.PLAYING) {
                setIsPlaying(true)
                // Upgrade quality after initial load
                setTimeout(() => {
                  if (navigator.connection && navigator.connection.effectiveType === "4g") {
                    event.target.setPlaybackQuality("hd1080")
                  }
                }, 3000)
              } else if (event.data === window.YT.PlayerState.PAUSED) {
                setIsPlaying(false)
              } else if (event.data === window.YT.PlayerState.ENDED) {
                event.target.seekTo(startTime || 0)
                event.target.playVideo()
              }
            },
            onError: (event: any) => {
              console.error("YouTube player error:", event.data)
              setHasError(true)
              setIsLoading(false)
            },
          },
        })
      } catch (error) {
        console.error("YouTube player initialization failed:", error)
        setHasError(true)
        setIsLoading(false)
      }
    }

    initializePlayer()
  }, [apiLoaded, videoId, startTime, endTime, isIntersecting, player])

  const togglePlay = () => {
    if (player) {
      if (isPlaying) {
        player.pauseVideo()
      } else {
        player.playVideo()
      }
    }
  }

  const toggleMute = () => {
    if (player) {
      if (isMuted) {
        player.unMute()
        setIsMuted(false)
      } else {
        player.mute()
        setIsMuted(true)
      }
    }
  }

  const openInYouTube = () => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank")
  }

  return (
    <div ref={containerRef} className={`relative w-full h-full ${className}`}>
      {/* YouTube Player Container */}
      {isIntersecting && (
        <div className="absolute inset-0 w-full h-full">
          <div
            ref={playerRef}
            className="w-full h-full"
            style={{
              transform: "scale(1.1)",
              transformOrigin: "center center",
            }}
          />
        </div>
      )}

      {/* Enhanced Overlay with Interaction Support */}
      {overlay && (
        <div
          className={cn(
            "absolute inset-0 pointer-events-none transition-opacity duration-300",
            "bg-gradient-to-b from-black/5 via-transparent to-black/20",
            isLoading && "bg-black/10",
            hasError && "bg-red-900/10",
          )}
          style={{
            background: hasError
              ? "linear-gradient(to bottom, rgba(239, 68, 68, 0.05), transparent, rgba(239, 68, 68, 0.1))"
              : isLoading
                ? "linear-gradient(to bottom, rgba(0, 0, 0, 0.1), transparent, rgba(0, 0, 0, 0.15))"
                : "linear-gradient(to bottom, rgba(0, 0, 0, 0.05), transparent, rgba(0, 0, 0, 0.2))",
          }}
        />
      )}

      {/* Loading State */}
      {(isLoading || !isIntersecting) && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-50 to-blue-50">
          <div className="flex flex-col items-center space-y-4 text-emerald-600">
            <Loader2 className="w-8 h-8 animate-spin" />
            <p className="text-sm font-medium">
              {!isIntersecting ? "Preparing Sierra Nevada footage..." : "Loading Sierra Nevada footage..."}
            </p>
          </div>
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-50 to-blue-50">
          <div className="text-center text-gray-600 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
              <ExternalLink className="w-8 h-8 text-emerald-600" />
            </div>
            <div>
              <p className="text-lg font-medium text-gray-900">Video temporarily unavailable</p>
              <p className="text-sm text-gray-600 mb-4">Experience the beauty of Sierra Nevada & Tayrona</p>
              <Button onClick={openInYouTube} size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                Watch on YouTube
                <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Video Controls */}
      {controls && !isLoading && !hasError && isIntersecting && (
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
          <Button
            size="sm"
            variant="secondary"
            className="bg-black/50 hover:bg-black/70 text-white border-0 backdrop-blur-sm"
            onClick={openInYouTube}
            aria-label="Watch on YouTube"
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Accessibility */}
      <div className="sr-only">
        Background video showing aerial footage of Tayrona National Park and Sierra Nevada mountains in Colombia,
        showcasing the Caribbean coastline and tropical landscapes that make Colombia a premier birding destination.
      </div>
    </div>
  )
}

// Extend window type for YouTube API
declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
  }
}
