"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import { GoogleCalendarModal } from "@/components/google-calendar-modal"

interface GoogleCalendarButtonProps {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export function GoogleCalendarButton({ variant = "default", size = "sm", className = "" }: GoogleCalendarButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  // Ensure consistent green styling across all instances
  const buttonClasses =
    variant === "default"
      ? "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600 hover:border-emerald-700 transition-colors"
      : variant === "outline"
        ? "border-emerald-300 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-400 bg-white transition-colors"
        : ""

  return (
    <>
      <Button
        onClick={handleOpenModal}
        variant={variant}
        size={size}
        className={`flex items-center gap-2 ${buttonClasses} ${className}`}
      >
        <Calendar className="w-4 h-4" />
        Schedule Call
      </Button>

      <GoogleCalendarModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  )
}
