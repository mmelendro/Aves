"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, ExternalLink, Loader2 } from "lucide-react"

interface GoogleCalendarModalProps {
  isOpen: boolean
  onClose: () => void
}

export function GoogleCalendarModal({ isOpen, onClose }: GoogleCalendarModalProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const calendarUrl =
    "https://calendar.google.com/calendar/appointments/schedules/AcZssZ1mXX026neUIehbViYvZCFxxkZ7aTaga8rMBslAp2r0VsuTWoYN_43n_SRjZUeSVefNaKYftXEr?gv=true"

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true)
      setHasError(false)
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden"
    } else {
      // Restore body scroll when modal is closed
      document.body.style.overflow = "unset"
    }

    // Cleanup function to restore scroll on unmount
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const handleIframeLoad = () => {
    setIsLoading(false)
  }

  const handleIframeError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  const openInNewTab = () => {
    window.open(calendarUrl, "_blank", "noopener,noreferrer")
    onClose()
  }

  const handleClose = () => {
    document.body.style.overflow = "unset"
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl w-full h-[90vh] max-h-[800px] p-0 gap-0 bg-white border-0 shadow-2xl fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[100] focus:outline-none">
        {/* Fixed Header with proper z-index and positioning */}
        <DialogHeader className="px-6 py-4 border-b border-gray-200 flex-shrink-0 bg-white relative z-10 rounded-t-lg">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-gray-900 pr-4">
              Schedule Your Birding Consultation
            </DialogTitle>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={openInNewTab}
                className="text-emerald-600 border-emerald-300 hover:bg-emerald-50 bg-white hover:border-emerald-400 transition-colors"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open in New Tab
              </Button>
              <DialogClose asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-gray-100 transition-colors"
                  onClick={handleClose}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </DialogClose>
            </div>
          </div>
        </DialogHeader>

        {/* Content Area with proper isolation */}
        <div className="flex-1 relative overflow-hidden bg-white">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-20">
              <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Loading scheduling interface...</p>
                <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
              </div>
            </div>
          )}

          {hasError ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-20">
              <div className="text-center max-w-md mx-auto p-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <X className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Unable to Load Scheduler</h3>
                <p className="text-gray-600 mb-6">
                  We're having trouble loading the scheduling interface. Please try opening it in a new tab.
                </p>
                <div className="space-y-3">
                  <Button
                    onClick={openInNewTab}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open Scheduler in New Tab
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleClose}
                    className="w-full bg-white border-gray-300 hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <iframe
              src={calendarUrl}
              className="w-full h-full border-0 bg-white"
              title="Schedule Birding Consultation"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              allow="camera; microphone; geolocation"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation allow-popups-to-escape-sandbox"
              style={{
                minHeight: "600px",
                isolation: "isolate",
              }}
            />
          )}
        </div>

        {/* Mobile-friendly footer with additional options */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex-shrink-0 sm:hidden rounded-b-lg">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-3">
              Having trouble? You can also schedule directly through Google Calendar.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={openInNewTab}
              className="text-emerald-600 border-emerald-300 hover:bg-emerald-50 bg-white hover:border-emerald-400 transition-colors"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Open in Browser
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
