export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600 mx-auto mb-4"></div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Loading AVES Explorer</h2>
        <p className="text-gray-600">Preparing your interactive birding experience...</p>
      </div>
    </div>
  )
}
