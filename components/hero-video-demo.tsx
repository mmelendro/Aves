"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play } from "lucide-react"
import YouTubeBackground from "@/components/youtube-background"

export default function HeroVideoDemo() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden min-h-[90vh]">
      {/* YouTube Background */}
      <div className="absolute inset-0">
        <YouTubeBackground
          videoId="eEteVfDagrs"
          className="w-full h-full"
          overlay={true}
          controls={true}
          startTime={0}
        />
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-6">
            <Badge className="bg-emerald-100/90 text-emerald-800 hover:bg-emerald-100/90 backdrop-blur-sm border border-emerald-200/50 text-lg px-6 py-2">
              🌿 Hero Section Video Background Demo
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight drop-shadow-2xl">
              Discover Colombia's
              <span className="text-emerald-300 block drop-shadow-2xl">Natural Paradise</span>
            </h1>
            <p className="text-2xl text-white/95 leading-relaxed drop-shadow-lg backdrop-blur-sm bg-black/20 p-6 rounded-2xl border border-white/30 max-w-3xl mx-auto">
              Experience the breathtaking beauty of Sierra Nevada mountains and Tayrona National Park through our
              immersive birding expeditions across Colombia's most spectacular landscapes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-xl px-10 py-6 shadow-2xl border border-emerald-500/50 backdrop-blur-sm"
            >
              Explore Our Tours
              <ArrowRight className="ml-3 w-6 h-6" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/50 text-white hover:bg-white/10 text-xl px-10 py-6 shadow-2xl backdrop-blur-sm"
            >
              Watch Full Video
              <Play className="ml-3 w-6 h-6" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 backdrop-blur-sm bg-white/10 p-8 rounded-2xl border border-white/30">
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-300 drop-shadow-lg mb-2">1,900+</div>
              <div className="text-lg text-white/90 drop-shadow-md">Bird Species</div>
              <div className="text-sm text-white/70 mt-1">Most biodiverse country</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-300 drop-shadow-lg mb-2">4</div>
              <div className="text-lg text-white/90 drop-shadow-md">Max Group Size</div>
              <div className="text-sm text-white/70 mt-1">Intimate experiences</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-300 drop-shadow-lg mb-2">100%</div>
              <div className="text-lg text-white/90 drop-shadow-md">Carbon Neutral</div>
              <div className="text-sm text-white/70 mt-1">Sustainable tourism</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
