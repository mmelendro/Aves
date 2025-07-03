"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Volume2, CheckCircle, XCircle, AlertTriangle } from "lucide-react"

interface AudioTestResult {
  file: string
  name: string
  status: "loading" | "success" | "error" | "not-tested"
  error?: string
  duration?: number
  canPlay?: boolean
}

const audioFiles = [
  { file: "/audio/gnbhel1.mp3", name: "Green-bearded Helmetcrest" },
  { file: "/audio/rabtho1.mp3", name: "Rainbow-bearded Thornbill" },
  { file: "/audio/chcant2.mp3", name: "Chestnut-crowned Antpitta" },
  { file: "/audio/yellow-throated-toucan.mp3", name: "Yellow-throated Toucan" },
]

export default function AudioDiagnostics() {
  const [testResults, setTestResults] = useState<AudioTestResult[]>(
    audioFiles.map((f) => ({ ...f, status: "not-tested" })),
  )
  const [deviceInfo, setDeviceInfo] = useState<string>("")
  const [audioSupport, setAudioSupport] = useState<any>({})
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    // Gather device information
    const userAgent = navigator.userAgent
    const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent)
    const isIOS = /iPhone|iPad|iPod/i.test(userAgent)

    setDeviceInfo(`${isMobile ? "Mobile" : "Desktop"} | ${isIOS ? "iOS" : "Other"} | ${userAgent.substring(0, 50)}...`)

    // Test audio format support
    const audio = document.createElement("audio")
    const support = {
      mp3: audio.canPlayType("audio/mpeg"),
      wav: audio.canPlayType("audio/wav"),
      ogg: audio.canPlayType("audio/ogg"),
      m4a: audio.canPlayType("audio/mp4"),
    }
    setAudioSupport(support)
  }, [])

  const testAudioFile = async (audioFile: AudioTestResult, index: number) => {
    setTestResults((prev) => prev.map((item, i) => (i === index ? { ...item, status: "loading" } : item)))

    try {
      // First, check if file exists
      const response = await fetch(audioFile.file, { method: "HEAD" })
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: File not found`)
      }

      // Test audio playback
      const audio = new Audio()
      audio.preload = "metadata"
      audio.crossOrigin = "anonymous"
      audio.setAttribute("playsinline", "true")
      audio.setAttribute("webkit-playsinline", "true")

      return new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error("Audio loading timeout"))
        }, 10000)

        audio.onloadedmetadata = () => {
          clearTimeout(timeout)
          setTestResults((prev) =>
            prev.map((item, i) =>
              i === index
                ? {
                    ...item,
                    status: "success",
                    duration: audio.duration,
                    canPlay: true,
                  }
                : item,
            ),
          )
          resolve()
        }

        audio.onerror = (e) => {
          clearTimeout(timeout)
          const errorMsg = audio.error
            ? `Error ${audio.error.code}: ${getErrorMessage(audio.error.code)}`
            : "Unknown audio error"

          setTestResults((prev) =>
            prev.map((item, i) =>
              i === index
                ? {
                    ...item,
                    status: "error",
                    error: errorMsg,
                    canPlay: false,
                  }
                : item,
            ),
          )
          reject(new Error(errorMsg))
        }

        audio.src = audioFile.file
      })
    } catch (error) {
      setTestResults((prev) =>
        prev.map((item, i) =>
          i === index
            ? {
                ...item,
                status: "error",
                error: error instanceof Error ? error.message : "Unknown error",
                canPlay: false,
              }
            : item,
        ),
      )
    }
  }

  const getErrorMessage = (errorCode: number) => {
    switch (errorCode) {
      case MediaError.MEDIA_ERR_ABORTED:
        return "Loading aborted"
      case MediaError.MEDIA_ERR_NETWORK:
        return "Network error"
      case MediaError.MEDIA_ERR_DECODE:
        return "Decode error"
      case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
        return "Format not supported"
      default:
        return "Unknown error"
    }
  }

  const runAllTests = async () => {
    setIsRunning(true)
    for (let i = 0; i < audioFiles.length; i++) {
      await testAudioFile(testResults[i], i)
      // Small delay between tests
      await new Promise((resolve) => setTimeout(resolve, 500))
    }
    setIsRunning(false)
  }

  const playTestAudio = (audioFile: string) => {
    const audio = new Audio(audioFile)
    audio.volume = 0.5
    audio.play().catch(console.error)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Audio Diagnostics Tool</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Device Information */}
          <div>
            <h3 className="font-semibold mb-2">Device Information</h3>
            <p className="text-sm text-gray-600 break-all">{deviceInfo}</p>
          </div>

          {/* Audio Format Support */}
          <div>
            <h3 className="font-semibold mb-2">Audio Format Support</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {Object.entries(audioSupport).map(([format, support]) => (
                <Badge key={format} variant={support ? "default" : "destructive"} className="justify-center">
                  {format.toUpperCase()}: {support ? "✓" : "✗"}
                </Badge>
              ))}
            </div>
          </div>

          {/* Test Controls */}
          <div className="flex gap-2">
            <Button onClick={runAllTests} disabled={isRunning}>
              {isRunning ? "Testing..." : "Run All Tests"}
            </Button>
            <Button
              variant="outline"
              onClick={() => setTestResults(audioFiles.map((f) => ({ ...f, status: "not-tested" })))}
            >
              Reset
            </Button>
          </div>

          {/* Test Results */}
          <div className="space-y-2">
            <h3 className="font-semibold">Test Results</h3>
            {testResults.map((result, index) => (
              <div key={result.file} className="flex items-center justify-between p-3 border rounded">
                <div className="flex-1">
                  <div className="font-medium">{result.name}</div>
                  <div className="text-sm text-gray-500">{result.file}</div>
                  {result.duration && (
                    <div className="text-xs text-gray-400">Duration: {result.duration.toFixed(2)}s</div>
                  )}
                  {result.error && <div className="text-xs text-red-500">{result.error}</div>}
                </div>

                <div className="flex items-center gap-2">
                  {result.status === "loading" && (
                    <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  )}
                  {result.status === "success" && (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <Button size="sm" variant="outline" onClick={() => playTestAudio(result.file)}>
                        <Volume2 className="w-3 h-3" />
                      </Button>
                    </>
                  )}
                  {result.status === "error" && <XCircle className="w-4 h-4 text-red-500" />}
                  {result.status === "not-tested" && <AlertTriangle className="w-4 h-4 text-gray-400" />}

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => testAudioFile(result, index)}
                    disabled={result.status === "loading"}
                  >
                    Test
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
