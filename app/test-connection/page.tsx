import { DatabaseConnectionTest } from "@/components/database-connection-test"

export default function TestConnectionPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <DatabaseConnectionTest />
    </div>
  )
}
