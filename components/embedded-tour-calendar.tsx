"use client"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, CalendarIcon, AlertTriangle, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface EmbeddedTourCalendarProps {
  selectedDate?: Date
  onDateSelect: (date: Date | undefined) => void
  minDate?: Date
  className?: string
  disabled?: boolean
}

export function EmbeddedTourCalendar({
  selectedDate,
  onDateSelect,
  minDate,
  className,
  disabled = false,
}: EmbeddedTourCalendarProps) {
  // Calculate minimum date (1 month from today if not specified)
  const getMinDate = () => {
    if (minDate) return minDate
    const today = new Date()
    const oneMonthFromNow = new Date(today)
    oneMonthFromNow.setMonth(today.getMonth() + 1)
    return oneMonthFromNow
  }

  const minimumDate = getMinDate()
  const today = new Date()

  const handleDateSelect = (date: Date | undefined) => {
    if (date && date < minimumDate) {
      return // Don't allow selection of dates before minimum
    }
    onDateSelect(date)
  }

  const isDateDisabled = (date: Date) => {
    return date < minimumDate
  }

  const formatSelectedDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Card className={cn("border-2 border-blue-200 shadow-lg", className)}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-xl">
          <CalendarIcon className="w-5 h-5 mr-3 text-blue-600" />
          Select Your Tour Start Date
        </CardTitle>
        <div className="space-y-3">
          {/* Booking Requirements Banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-amber-800 mb-1">Advance Booking Required</h4>
                <p className="text-sm text-amber-700">
                  Tours must be booked at least 1 month in advance for proper planning and coordination.
                </p>
                <p className="text-sm text-amber-700 mt-1">
                  <span className="font-medium">Earliest available date:</span>{" "}
                  {minimumDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Selected Date Display */}
          {selectedDate && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-emerald-800 mb-1">Selected Start Date</h4>
                  <p className="text-lg font-semibold text-emerald-700">{formatSelectedDate(selectedDate)}</p>
                  <p className="text-sm text-emerald-600 mt-1">
                    Your tour will begin on this date. Subsequent tour dates will be calculated automatically.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* No Date Selected */}
          {!selectedDate && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">No Date Selected</h4>
                  <p className="text-sm text-gray-600">
                    Please select a start date from the calendar below to see your complete tour schedule.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            disabled={disabled ? () => true : isDateDisabled}
            className="rounded-md border border-gray-200 bg-white shadow-sm"
            classNames={{
              months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
              month: "space-y-4",
              caption: "flex justify-center pt-1 relative items-center",
              caption_label: "text-sm font-medium",
              nav: "space-x-1 flex items-center",
              nav_button: cn(
                "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 border border-gray-300 rounded-md hover:bg-gray-100",
              ),
              nav_button_previous: "absolute left-1",
              nav_button_next: "absolute right-1",
              table: "w-full border-collapse space-y-1",
              head_row: "flex",
              head_cell: "text-gray-500 rounded-md w-9 font-normal text-[0.8rem]",
              row: "flex w-full mt-2",
              cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-emerald-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
              day: cn(
                "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-emerald-50 rounded-md transition-colors",
                "focus:bg-emerald-100 focus:text-emerald-900",
              ),
              day_selected:
                "bg-emerald-600 text-white hover:bg-emerald-600 hover:text-white focus:bg-emerald-600 focus:text-white",
              day_today: "bg-blue-100 text-blue-900 font-semibold",
              day_outside: "text-gray-400 opacity-50",
              day_disabled: "text-gray-400 opacity-30 cursor-not-allowed hover:bg-transparent",
              day_range_middle: "aria-selected:bg-emerald-100 aria-selected:text-emerald-900",
              day_hidden: "invisible",
            }}
            components={{
              IconLeft: ({ ...props }) => <span className="text-gray-600">‹</span>,
              IconRight: ({ ...props }) => <span className="text-gray-600">›</span>,
            }}
          />
        </div>

        {/* Calendar Legend */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-100 border border-blue-200 rounded"></div>
            <span className="text-gray-600">Today</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-emerald-600 rounded"></div>
            <span className="text-gray-600">Selected Date</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-200 rounded opacity-50"></div>
            <span className="text-gray-600">Unavailable</span>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="text-sm font-medium text-blue-800 mb-2">Planning Your Tour</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Select your preferred start date from the available dates above</li>
            <li>• Tour schedules will be automatically calculated based on your selection</li>
            <li>• Rest days between tours will be factored into the overall timeline</li>
            <li>• You can modify your selection at any time before booking</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
