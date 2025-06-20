import { NavigationHeader } from "@/components/navigation-header"

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* Navigation Header */}
      <NavigationHeader currentPage="/blog" />

      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1>Sierra Nevada Indigenous Birding</h1>
        <p>This is a blog post about birding in the Sierra Nevada.</p>
      </div>
    </main>
  )
}
