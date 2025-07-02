"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX, Play, Pause } from "lucide-react"
import Link from "next/link"

interface YouTubeHeroBackgroundProps {
  title: string
  subtitle: string
  videoId: string
  fallbackImage?: string
}

export default function YouTubeHeroBackground({
  title,
  subtitle,
  videoId,
  fallbackImage = "/images/caribbean-coast-fallback.jpg",
}: YouTubeHeroBackgroundProps) {
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)
  const [showControls, setShowControls] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* YouTube Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <div className="youtube-container">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=1`}
            title="Caribbean Coast Background Video"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="absolute top-1/2 left-1/2 w-screen h-screen min-w-full min-h-full object-cover transform -translate-x-1/2 -translate-y-1/2 scale-105"
            style={{
              width: "100vw",
              height: "56.25vw", // 16:9 aspect ratio
              minHeight: "100vh",
              minWidth: "177.77vh", // 16:9 aspect ratio
            }}
          />
        </div>

        {/* Fallback Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${fallbackImage})` }}
        />
      </div>

      {/* Caribbean-themed Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/30 via-transparent to-orange-900/30" />

      {/* Main Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          {/* Main Title with Caribbean Styling */}
          <h1 className="youtube-hero-title text-5xl sm:text-6xl lg:text-8xl font-bold mb-6 animate-fade-in-up text-shadow-2xl">
            <span className="bg-gradient-to-r from-cyan-300 via-white to-orange-300 bg-clip-text text-transparent">
              {title}
            </span>
          </h1>

          {/* Subtitle with Wave Animation */}
          <div className="relative mb-8 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <p className="youtube-hero-subtitle text-lg sm:text-xl lg:text-2xl text-white/90 font-medium text-shadow-lg">
              {subtitle}
            </p>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-cyan-400 to-orange-400 rounded-full animate-wave-motion" />
          </div>

          {/* Caribbean-themed Stats */}
          <div
            className="caribbean-stats grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 mb-8 animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            <button
              onClick={() => scrollToSection("featured-species")}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer transform hover:scale-105"
            >
              <div className="text-2xl sm:text-3xl font-bold text-cyan-300 mb-1">300+</div>
              <div className="text-sm text-white/80">Bird Species</div>
            </button>
            <button
              onClick={() => scrollToSection("itinerary-section")}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer transform hover:scale-105"
            >
              <div className="text-2xl sm:text-3xl font-bold text-orange-300 mb-1">8 Days</div>
              <div className="text-sm text-white/80">Adventure</div>
            </button>
            <button
              onClick={() => scrollToSection("interactive-sections")}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer transform hover:scale-105"
            >
              <div className="text-2xl sm:text-3xl font-bold text-emerald-300 mb-1">4</div>
              <div className="text-sm text-white/80">Ecosystems</div>
            </button>
          </div>

          {/* CTA Buttons with Caribbean Styling */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up"
            style={{ animationDelay: "0.9s" }}
          >
            <Link
              href="/shopping?tour=🍃%20Adventure%20Tours&region=🏖️%20Caribbean%20Coast&from=caribbean-hero"
              className="w-full sm:w-auto"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-orange-500 hover:from-cyan-600 hover:to-orange-600 text-white px-8 py-4 text-lg font-bold shadow-2xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto border-2 border-white/20"
              >
                Book Caribbean Adventure
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white/60 text-white hover:bg-white/20 px-8 py-4 text-lg font-semibold shadow-xl bg-white/10 backdrop-blur-sm transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
              onClick={() => scrollToSection("interactive-sections")}
            >
              Explore Details
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/80 rounded-full mt-2 animate-caribbean-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Video Controls */}
      <div
        className="absolute top-4 right-4 flex gap-2 opacity-0 hover:opacity-100 transition-opacity duration-300"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <Button
          size="sm"
          variant="outline"
          className="bg-black/50 border-white/30 text-white hover:bg-black/70"
          onClick={() => setIsMuted(!isMuted)}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="bg-black/50 border-white/30 text-white hover:bg-black/70"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
      </div>

      {/* Attribution */}
      <div className="absolute bottom-4 left-4 text-xs text-white/60">
        Video: Tayrona National Park by Martín Melendro Torres
      </div>
    </section>
  )
}
