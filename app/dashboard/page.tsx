export const dynamic = "force-dynamic"

import DashboardClient from "./DashboardClient"
import { BookingsProvider } from "@/hooks/use-bookings"
import { ColombiaAccountNotice } from "@/components/colombia-account-notice"

export default function DashboardPage() {
  return (
    <>
      <div className="bg-gray-50 px-4 py-4">
        <div className="container mx-auto">
          <ColombiaAccountNotice />
        </div>
      </div>
      <BookingsProvider>
        <DashboardClient initialProfile={null} />
      </BookingsProvider>
    </>
  )
}
