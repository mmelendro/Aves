import { NavigationHeader } from "@/components/navigation-header"

export default function ShoppingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* Navigation Header */}
      <NavigationHeader currentPage="/shopping" />

      <div>
        <h1>Shopping Page</h1>
        <p>This is the shopping page content.</p>
      </div>
    </main>
  )
}
