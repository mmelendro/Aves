"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

interface RegionHeroVideoProps {
  title: string
  subtitle: string
  videoSrc: string
  videoPoster: string
}

export default function RegionHeroVideo({ title, subtitle, videoSrc, videoPoster }: RegionHeroVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      // Auto-play when component mounts
      video.play().catch(() => {
        // Auto-play failed, which is expected in many browsers
        setIsPlaying(false)
      })
      setIsPlaying(true)
    }
  }, [])

  const togglePlay = () => {
    const video = videoRef.current
    if (video) {
      if (isPlaying) {
        video.pause()
      } else {
        video.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (video) {
      video.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const scrollToMap = () => {
    const mapSection = document.getElementById("interactive-map")
    if (mapSection) {
      mapSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const scrollToItinerary = () => {
    const itinerarySection = document.getElementById("itinerary-section")
    if (itinerarySection) {
      itinerarySection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        poster={videoPoster}
        muted={isMuted}
        loop
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center text-white">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-shadow-lg">{title}</h1>
          <p className="text-xl md:text-2xl mb-8 text-shadow max-w-2xl mx-auto leading-relaxed">{subtitle}</p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg shadow-lg"
              onClick={scrollToMap}
            >
              Explore the Region
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-orange-500 px-8 py-3 text-lg bg-transparent shadow-lg"
              onClick={scrollToItinerary}
            >
              View Itinerary
            </Button>
          </div>
        </div>
      </div>

      {/* Video Controls */}
      <div className="absolute bottom-6 right-6 flex gap-2 z-20">
        <Button
          variant="secondary"
          size="sm"
          onClick={togglePlay}
          className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={toggleMute}
          className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </Button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
