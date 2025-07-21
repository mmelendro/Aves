import type { Metadata } from "next"
import { BirdingCalendar } from "@/components/birding-calendar"

export const metadata: Metadata = {
  title: "Birding Events Calendar | AVES Colombia",
  description:
    "Discover major birding festivals, ornithological congresses, and citizen science events across Colombia. Plan your birding adventures with our comprehensive events calendar.",
  keywords: [
    "Colombia birding events",
    "bird festivals Colombia",
    "ornithology congress",
    "birding calendar",
    "Colombia Birdfair",
    "Salento BirdFair",
    "birding festivals 2025",
    "birding festivals 2026",
  ],
}

export default function CalendarPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      <BirdingCalendar />
    </div>
  )
}
