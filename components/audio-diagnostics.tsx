"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertCircle, Volume2 } from "lucide-react"

export default function AudioDiagnostics() {
  const [diagnostics, setDiagnostics] = useState({
    browserSupport: false,
    audioContext: false,
    mediaDevices: false,
    autoplayPolicy: "unknown",
    touchRequired: false,
  })

  const [testResults, setTestResults] = useState({
    basicPlayback: "pending",
    contextResume: "pending",
    volumeControl: "pending",
    mobileFriendly: "pending",
  })

  useEffect(() => {
    runDiagnostics()
  }, [])

  const runDiagnostics = async () => {
    // Browser support check
    const audioSupport = !!(window.Audio && document.createElement("audio").canPlayType)

    // AudioContext support
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
    const audioContextSupport = !!AudioContextClass

    // Media devices support
    const mediaDevicesSupport = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)

    // Touch device detection
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0

    // Autoplay policy detection
    let autoplayPolicy = "unknown"
    try {
      const audio = new Audio()
      const playPromise = audio.play()
      if (playPromise !== undefined) {
        try {
          await playPromise
          autoplayPolicy = "allowed"
          audio.pause()
        } catch (error) {
          autoplayPolicy = "blocked"
        }
      }
    } catch (error) {
      autoplayPolicy = "error"
    }

    setDiagnostics({
      browserSupport: audioSupport,
      audioContext: audioContextSupport,
      mediaDevices: mediaDevicesSupport,
      autoplayPolicy,
      touchRequired: isTouchDevice,
    })

    // Run tests
    await runTests()
  }

  const runTests = async () => {
    // Test 1: Basic playback
    try {
      const audio = new Audio("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gnbhel1-jW2PKUzvLWZei8669aA02TqmJyaG67.mp3")
      audio.volume = 0.1 // Low volume for testing

      const playPromise = audio.play()
      if (playPromise !== undefined) {
        await playPromise
        setTestResults((prev) => ({ ...prev, basicPlayback: "success" }))
        audio.pause()
      }
    } catch (error) {
      setTestResults((prev) => ({ ...prev, basicPlayback: "failed" }))
    }

    // Test 2: AudioContext resume
    if (diagnostics.audioContext) {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
        const audioContext = new AudioContextClass()

        if (audioContext.state === "suspended") {
          await audioContext.resume()
        }

        setTestResults((prev) => ({
          ...prev,
          contextResume: audioContext.state === "running" ? "success" : "failed",
        }))

        audioContext.close()
      } catch (error) {
        setTestResults((prev) => ({ ...prev, contextResume: "failed" }))
      }
    }

    // Test 3: Volume control
    try {
      const audio = new Audio()
      audio.volume = 0.5
      setTestResults((prev) => ({
        ...prev,
        volumeControl: audio.volume === 0.5 ? "success" : "failed",
      }))
    } catch (error) {
      setTestResults((prev) => ({ ...prev, volumeControl: "failed" }))
    }

    // Test 4: Mobile-friendly features
    const mobileScore = [
      diagnostics.touchRequired,
      diagnostics.audioContext,
      diagnostics.autoplayPolicy !== "unknown",
    ].filter(Boolean).length

    setTestResults((prev) => ({
      ...prev,
      mobileFriendly: mobileScore >= 2 ? "success" : "warning",
    }))
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "failed":
        return <XCircle className="w-4 h-4 text-red-600" />
      case "warning":
        return <AlertCircle className="w-4 h-4 text-yellow-600" />
      default:
        return <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800"
      case "failed":
        return "bg-red-100 text-red-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="w-5 h-5" />
            Browser Audio Diagnostics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Browser Capabilities</h4>

              <div className="flex items-center justify-between">
                <span className="text-sm">Audio Support</span>
                <Badge className={getStatusColor(diagnostics.browserSupport ? "success" : "failed")}>
                  {diagnostics.browserSupport ? "Supported" : "Not Supported"}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">AudioContext API</span>
                <Badge className={getStatusColor(diagnostics.audioContext ? "success" : "failed")}>
                  {diagnostics.audioContext ? "Available" : "Not Available"}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Media Devices</span>
                <Badge className={getStatusColor(diagnostics.mediaDevices ? "success" : "warning")}>
                  {diagnostics.mediaDevices ? "Available" : "Limited"}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Touch Device</span>
                <Badge className={getStatusColor(diagnostics.touchRequired ? "warning" : "success")}>
                  {diagnostics.touchRequired ? "Yes (Mobile)" : "No (Desktop)"}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Autoplay Policy</span>
                <Badge
                  className={getStatusColor(
                    diagnostics.autoplayPolicy === "allowed"
                      ? "success"
                      : diagnostics.autoplayPolicy === "blocked"
                        ? "warning"
                        : "failed",
                  )}
                >
                  {diagnostics.autoplayPolicy}
                </Badge>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-sm">Functionality Tests</h4>

              <div className="flex items-center justify-between">
                <span className="text-sm">Basic Playback</span>
                <div className="flex items-center gap-2">
                  {getStatusIcon(testResults.basicPlayback)}
                  <Badge className={getStatusColor(testResults.basicPlayback)}>{testResults.basicPlayback}</Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Context Resume</span>
                <div className="flex items-center gap-2">
                  {getStatusIcon(testResults.contextResume)}
                  <Badge className={getStatusColor(testResults.contextResume)}>{testResults.contextResume}</Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Volume Control</span>
                <div className="flex items-center gap-2">
                  {getStatusIcon(testResults.volumeControl)}
                  <Badge className={getStatusColor(testResults.volumeControl)}>{testResults.volumeControl}</Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Mobile Friendly</span>
                <div className="flex items-center gap-2">
                  {getStatusIcon(testResults.mobileFriendly)}
                  <Badge className={getStatusColor(testResults.mobileFriendly)}>{testResults.mobileFriendly}</Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <Button onClick={runDiagnostics} className="w-full">
              Re-run Diagnostics
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            {diagnostics.autoplayPolicy === "blocked" && (
              <div className="flex items-start gap-2 p-3 bg-yellow-50 rounded-lg">
                <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-yellow-800">Autoplay Blocked</p>
                  <p className="text-yellow-700">
                    Audio requires user interaction to play. This is normal browser behavior.
                  </p>
                </div>
              </div>
            )}

            {diagnostics.touchRequired && (
              <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-blue-800">Mobile Device Detected</p>
                  <p className="text-blue-700">
                    Enhanced mobile audio controls are active for better touch experience.
                  </p>
                </div>
              </div>
            )}

            {!diagnostics.audioContext && (
              <div className="flex items-start gap-2 p-3 bg-red-50 rounded-lg">
                <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-red-800">AudioContext Not Available</p>
                  <p className="text-red-700">
                    Advanced audio features may not work properly. Consider updating your browser.
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-2 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-green-800">Audio System Status</p>
                <p className="text-green-700">
                  The homepage bird carousel includes enhanced audio controls with mobile optimization, volume control,
                  and proper error handling for the best user experience.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
