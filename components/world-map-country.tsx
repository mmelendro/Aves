/** Only the three interactive country shapes need client-side selection state. */
"use client"

import {requestMapPhotos} from "@/lib/map-photo-request"
import { useDestinationSelection } from "@/components/destination-selection-context"
import styles from "./world-destination-map.module.css"

interface WorldMapCountryProps {
  id: string
  name: string
  path: string
  anchor: number[]
  label: { x: number; y: number; width: number }
}

export default function WorldMapCountry({ id, name, path, anchor, label }: WorldMapCountryProps) {
  const { selectedId, selectDestination, matchingCountryIds } = useDestinationSelection()
  return (
    <g data-bird-filter-match={matchingCountryIds ? matchingCountryIds.includes(id) : undefined} role="button" tabIndex={0} aria-label={`Show ${name} birds`} aria-pressed={selectedId === id} aria-controls="homepage-country-preview" className={styles.destination}
      onClick={() => {selectDestination(id);requestMapPhotos({countryId:id,kind:"country",name})}}
      onKeyDown={event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          selectDestination(id)
          requestMapPhotos({countryId:id,kind:"country",name})
        }
      }}>
      <path d={path} className={styles.country} strokeWidth="1.5" fillRule="evenodd" />
      <path d={`M${anchor.join(",")}L${label.x + label.width / 2},${label.y}`} className={styles.leader} fill="none" strokeWidth="2" />
      <circle cx={anchor[0]} cy={anchor[1]} r="6" fill="white" stroke="#047857" strokeWidth="3" />
      {/* The transparent hit area stays generous when the visible label shrinks.
          Equivalent 44px text buttons above work even for tiny island shapes. */}
      <rect x={label.x - 8} y={label.y - 10} width={label.width + 16} height="88" rx="20" fill="transparent" />
      <rect x={label.x} y={label.y} width={label.width} rx="16" className={styles.label} strokeWidth="1.5" />
      <text x={label.x + label.width / 2} y={label.y + 30} textAnchor="middle" fontWeight="500" className={styles.text}>{name}</text>
    </g>
  )
}
