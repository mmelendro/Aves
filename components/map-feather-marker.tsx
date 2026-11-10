import { Feather } from "lucide-react"

/** Decorative selection cue. The enclosing link/button supplies the region name. */
export default function MapFeatherMarker({ size = 28 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden="true" focusable="false" data-map-feather="true">
    <circle cx="14" cy="14" r="12.5" fill="#065f46" stroke="white" strokeWidth="2" />
    <Feather x="6" y="6" width="16" height="16" color="white" strokeWidth="1.6" />
  </svg>
}
