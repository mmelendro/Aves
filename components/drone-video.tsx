"use client"

import { useState } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DroneVideoProps {
  src: string
  title: string
  description: string
}

export default function DroneVideo({ src, title, description }: DroneVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const togglePlay = () => {
    const video = document.getElementById("drone-video") as HTMLVideoElement
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
    const video = document.getElementById("drone-video") as HTMLVideoElement
    if (video) {
      video.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const toggleFullscreen = () => {
    const video = document.getElementById("drone-video") as HTMLVideoElement
    if (video) {
      if (!isFullscreen) {
        video.requestFullscreen()
      } else {
        document.exitFullscreen()
      }
      setIsFullscreen(!isFullscreen)
    }
  }

  return (
    <div className="my-12">
      <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
        <video
          id="drone-video"
          controls
          className="w-full h-full object-cover"
          poster="/placeholder.svg?height=720&width=1280&text=Drone+Video+Thumbnail"
          muted={isMuted}
          loop
          playsInline
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute bottom-4 left-4 bg-black/70 text-white p-3 rounded-lg max-w-md">
          <h4 className="font-medium text-sm mb-1">{title}</h4>
          <p className="text-xs opacity-90">{description}</p>
        </div>
        {/* Video Controls Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
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

            <Button
              variant="secondary"
              size="sm"
              onClick={toggleFullscreen}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0"
            >
              <Maximize className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
