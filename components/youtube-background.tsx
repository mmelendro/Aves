"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, Loader2, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

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
  const playerRef = useRef<HTMLDivElement>(null)
  const [isYouTubeAPIReady, setIsYouTubeAPIReady] = useState(false)

  // Load YouTube API
  useEffect(() => {
    if (typeof window !== "undefined" && !window.YT) {
      const tag = document.createElement("script")
      tag.src = "https://www.youtube.com/iframe_api"
      const firstScriptTag = document.getElementsByTagName("script")[0]
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)

      window.onYouTubeIframeAPIReady = () => {
        setIsYouTubeAPIReady(true)
      }
    } else if (window.YT && window.YT.Player) {
      setIsYouTubeAPIReady(true)
    }
  }, [])

  // Initialize YouTube player
  useEffect(() => {
    if (isYouTubeAPIReady && playerRef.current && !player) {
      try {
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
          },
          events: {
            onReady: (event: any) => {
              setIsLoading(false)
              setPlayer(event.target)
              // Attempt to play
              event.target.playVideo()
            },
            onStateChange: (event: any) => {
              if (event.data === window.YT.PlayerState.PLAYING) {
                setIsPlaying(true)
              } else if (event.data === window.YT.PlayerState.PAUSED) {
                setIsPlaying(false)
              } else if (event.data === window.YT.PlayerState.ENDED) {
                // Loop the video
                event.target.seekTo(startTime || 0)
                event.target.playVideo()
              }
            },
            onError: () => {
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
  }, [isYouTubeAPIReady, videoId, startTime, endTime, player])

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
    <div className={`relative w-full h-full ${className}`}>
      {/* YouTube Player Container */}
      <div className="absolute inset-0 w-full h-full">
        <div
          ref={playerRef}
          className="w-full h-full"
          style={{
            transform: "scale(1.1)", // Slight zoom to hide YouTube controls
            transformOrigin: "center center",
          }}
        />
      </div>

      {/* Overlay */}
      {overlay && (
        <div className="absolute inset-0 bg-black/40 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-50 to-blue-50">
          <div className="flex flex-col items-center space-y-4 text-emerald-600">
            <Loader2 className="w-8 h-8 animate-spin" />
            <p className="text-sm font-medium">Loading Sierra Nevada footage...</p>
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
