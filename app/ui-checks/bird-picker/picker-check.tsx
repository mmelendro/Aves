"use client"
import { useState } from "react"
import NewZealandBirdPicker from "@/components/new-zealand-bird-picker"
export default function PickerCheck() {
  const [selected, setSelected] = useState<string[]>([])
  return <main className="mx-auto max-w-xl p-4 text-gray-900">
    <h1 className="mb-3 text-xl font-semibold">Bird picker component check</h1>
    <p className="mb-5 text-sm leading-6">Public reference data only. Choices stay in memory and are never saved. No private plans or account operations are available here.</p>
    <NewZealandBirdPicker selected={selected} onChange={setSelected} />
  </main>
}
