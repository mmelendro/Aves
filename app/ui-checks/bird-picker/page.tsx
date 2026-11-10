import { notFound } from "next/navigation"
import PickerCheck from "./picker-check"
export const metadata = { title: "AVES bird picker component check", robots: { index: false, follow: false } }
export default function Page() {
  if (process.env.VERCEL_ENV !== "preview") notFound()
  return <PickerCheck />
}
