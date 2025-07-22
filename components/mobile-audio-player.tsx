"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Pause, Volume2, VolumeX, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

interface MobileAudioPlayerProps {
  src: string
  title: string
  className?: string
}

export default function MobileAudioPlayer({ src, title, className }: MobileAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [userInteracted, setUserInteracted] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
      setIsLoading(false)
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }

    const handleError = () => {
      setError("Failed to load audio file")
      setIsLoading(false)
    }

    const handleLoadStart = () => {
      setIsLoading(true)
      setError(null)
    }

    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("error", handleError)
    audio.addEventListener("loadstart", handleLoadStart)

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("error", handleError)
      audio.removeEventListener("loadstart", handleLoadStart)
    }
  }, [src])

  const togglePlayPause = async () => {
    const audio = audioRef.current
    if (!audio) return

    setUserInteracted(true)

    try {
      if (isPlaying) {
        audio.pause()
        setIsPlaying(false)
      } else {
        const playPromise = audio.play()
        if (playPromise !== undefined) {
          await playPromise
          setIsPlaying(true)
        }
      }
    } catch (error) {
      console.error("Error playing audio:", error)
      setError("Playback failed. Tap to retry.")
      setIsPlaying(false)
    }
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    const progressBar = progressRef.current
    if (!audio || !progressBar) return

    const rect = progressBar.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const newTime = (clickX / rect.width) * duration

    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isMuted) {
      audio.volume = volume
      setIsMuted(false)
    } else {
      audio.volume = 0
      setIsMuted(true)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value)
    const audio = audioRef.current
    if (!audio) return

    setVolume(newVolume)
    audio.volume = newVolume
    setIsMuted(newVolume === 0)
  }

  const resetAudio = () => {
    const audio = audioRef.current
    if (!audio) return

    audio.currentTime = 0
    setCurrentTime(0)
    setIsPlaying(false)
    setError(null)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <Card className={cn("w-full max-w-md mx-auto", className)}>
      <CardContent className="p-4">
        <audio ref={audioRef} src={src} preload="metadata" playsInline webkit-playsinline="true" />

        <div className="space-y-4">
          {/* Title */}
          <div className="text-center">
            <h3 className="font-medium text-gray-900 truncate">{title}</h3>
            {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div
              ref={progressRef}
              className="w-full h-2 bg-gray-200 rounded-full cursor-pointer relative overflow-hidden"
              onClick={handleProgressClick}
            >
              <div
                className="h-full bg-emerald-600 rounded-full transition-all duration-100"
                style={{ width: `${progressPercentage}%` }}
              />
              {isLoading && <div className="absolute inset-0 bg-gray-300 animate-pulse rounded-full" />}
            </div>

            <div className="flex justify-between text-xs text-gray-500">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={resetAudio}
              disabled={isLoading}
              className="w-10 h-10 p-0 bg-transparent"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>

            <Button
              onClick={togglePlayPause}
              disabled={isLoading || !!error}
              className="w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-700"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 text-white ml-0.5" />
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={toggleMute}
              disabled={isLoading}
              className="w-10 h-10 p-0 bg-transparent"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center space-x-2">
            <VolumeX className="w-4 h-4 text-gray-400" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #10b981 0%, #10b981 ${(isMuted ? 0 : volume) * 100}%, #e5e7eb ${(isMuted ? 0 : volume) * 100}%, #e5e7eb 100%)`,
              }}
            />
            <Volume2 className="w-4 h-4 text-gray-400" />
          </div>

          {/* Mobile-specific tips */}
          {!userInteracted && (
            <div className="text-xs text-gray-500 text-center bg-gray-50 p-2 rounded">
              Tap play button to start audio playback
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
