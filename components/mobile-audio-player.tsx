"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Pause, Volume2, VolumeX, RotateCcw } from "lucide-react"

interface MobileAudioPlayerProps {
  src: string
  title: string
  autoPlay?: boolean
  className?: string
}

export default function MobileAudioPlayer({ src, title, autoPlay = false, className }: MobileAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [canPlay, setCanPlay] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // Mobile-optimized audio setup
    audio.preload = "metadata"
    audio.crossOrigin = "anonymous"
    audio.setAttribute("playsinline", "true")
    audio.setAttribute("webkit-playsinline", "true")
    audio.volume = 0.6

    const handleLoadStart = () => {
      setIsLoading(true)
      setError(null)
    }

    const handleCanPlay = () => {
      setIsLoading(false)
      setCanPlay(true)
      setError(null)

      if (autoPlay) {
        // Attempt autoplay with user gesture requirement
        const playPromise = audio.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsPlaying(true))
            .catch((error) => {
              console.log("Autoplay prevented:", error)
              setIsPlaying(false)
            })
        }
      }
    }

    const handleError = (e: Event) => {
      setIsLoading(false)
      setCanPlay(false)
      setIsPlaying(false)

      if (audio.error) {
        switch (audio.error.code) {
          case MediaError.MEDIA_ERR_ABORTED:
            setError("Audio loading was aborted")
            break
          case MediaError.MEDIA_ERR_NETWORK:
            setError("Network error loading audio")
            break
          case MediaError.MEDIA_ERR_DECODE:
            setError("Audio format not supported")
            break
          case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
            setError("Audio file not found")
            break
          default:
            setError("Unknown audio error")
        }
      } else {
        setError("Audio playback failed")
      }
    }

    const handleEnded = () => {
      setIsPlaying(false)
    }

    audio.addEventListener("loadstart", handleLoadStart)
    audio.addEventListener("canplay", handleCanPlay)
    audio.addEventListener("error", handleError)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("loadstart", handleLoadStart)
      audio.removeEventListener("canplay", handleCanPlay)
      audio.removeEventListener("error", handleError)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [autoPlay])

  const togglePlayPause = () => {
    const audio = audioRef.current
    if (!audio || !canPlay) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      const playPromise = audio.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((error) => {
            console.error("Play failed:", error)
            setError("Playback failed - tap to try again")
            setIsPlaying(false)
          })
      }
    }
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return

    audio.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const retry = () => {
    const audio = audioRef.current
    if (!audio) return

    setError(null)
    setIsLoading(true)
    audio.load()
  }

  return (
    <Card className={className}>
      <CardContent className="p-4">
        <audio ref={audioRef} src={src} />

        <div className="space-y-3">
          <div className="text-sm font-medium truncate">{title}</div>

          {error && <div className="text-xs text-red-600 bg-red-50 p-2 rounded">{error}</div>}

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={togglePlayPause}
              disabled={!canPlay || isLoading}
              className="flex-shrink-0 bg-transparent"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </Button>

            <Button variant="ghost" size="sm" onClick={toggleMute} disabled={!canPlay} className="flex-shrink-0">
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>

            {error && (
              <Button variant="ghost" size="sm" onClick={retry} className="flex-shrink-0">
                <RotateCcw className="w-4 h-4" />
              </Button>
            )}

            <div className="flex-1 text-xs text-gray-500">
              {isLoading && "Loading..."}
              {canPlay && !isPlaying && !error && "Ready to play"}
              {isPlaying && "Playing"}
              {error && "Error occurred"}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
