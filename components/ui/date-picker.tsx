"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DatePickerProps {
  date?: Date
  onDateChange?: (date: Date | undefined) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  minDate?: Date
}

export function DatePicker({
  date,
  onDateChange,
  placeholder = "Pick a date",
  className,
  disabled = false,
  minDate,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)

  // Calculate minimum date (1 month from today if not specified)
  const getMinDate = () => {
    if (minDate) return minDate
    const today = new Date()
    const oneMonthFromNow = new Date(today)
    oneMonthFromNow.setMonth(today.getMonth() + 1)
    return oneMonthFromNow
  }

  const minimumDate = getMinDate()

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      // Ensure the selected date meets minimum requirements
      if (selectedDate < minimumDate) {
        return // Don't allow selection of dates before minimum
      }
    }
    onDateChange?.(selectedDate)
    setOpen(false)
  }

  const isDateDisabled = (date: Date) => {
    return date < minimumDate
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground", className)}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          disabled={isDateDisabled}
          initialFocus
          className="rounded-md border"
        />
        <div className="p-3 border-t border-gray-200 bg-gray-50">
          <p className="text-xs text-gray-600 text-center">Tours must be booked at least 1 month in advance</p>
        </div>
      </PopoverContent>
    </Popover>
  )
}
