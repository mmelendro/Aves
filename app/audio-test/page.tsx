"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AudioDiagnostics from "@/components/audio-diagnostics"
import MobileAudioPlayer from "@/components/mobile-audio-player"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"

export default function AudioTestPage() {
  const [selectedAudio, setSelectedAudio] = useState("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gnbhel1-njVmyxK8Wn7VWVxZmnAUGhKKqEHDmg.mp3")

  const audioFiles = [
    { file: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gnbhel1-njVmyxK8Wn7VWVxZmnAUGhKKqEHDmg.mp3", name: "Green-bearded Helmetcrest" },
    { file: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rabtho1-zlI0qx9zdy6wFmPwI8rEJXXYXjJp3H.mp3", name: "Rainbow-bearded Thornbill" },
    { file: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chcant2-6pqzdAPhoSOUOXsdXTRugdtXK67CbY.mp3", name: "Chestnut-crowned Antpitta" },
    { file: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Yellow-throated%20Toucan-YZaM0Q4HERiJp55ECemjfgYkdJIYwZ.mp3", name: "Yellow-throated Toucan" },
  ]

  return (
    <div className="min-h-screen bg-white">
      <NavigationHeader currentPage="/audio-test" />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Audio Testing & Diagnostics</h1>

          <Tabs defaultValue="diagnostics" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="diagnostics">Diagnostics</TabsTrigger>
              <TabsTrigger value="player">Mobile Player</TabsTrigger>
              <TabsTrigger value="carousel">Carousel Test</TabsTrigger>
            </TabsList>

            <TabsContent value="diagnostics">
              <AudioDiagnostics />
            </TabsContent>

            <TabsContent value="player" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Mobile Audio Player Test</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Select Audio File:</label>
                    <select
                      value={selectedAudio}
                      onChange={(e) => setSelectedAudio(e.target.value)}
                      className="w-full p-2 border rounded"
                    >
                      {audioFiles.map((audio) => (
                        <option key={audio.file} value={audio.file}>
                          {audio.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <MobileAudioPlayer
                    src={selectedAudio}
                    title={audioFiles.find((a) => a.file === selectedAudio)?.name || "Unknown"}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="carousel">
              <Card>
                <CardHeader>
                  <CardTitle>Carousel Audio Test</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Test the actual carousel component with enhanced mobile audio support.
                  </p>
                  <Button asChild>
                    <a href="/">Go to Homepage Carousel</a>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  )
}
