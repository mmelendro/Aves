/** Display-only opacity. Imagery keeps its real registration and full visibility. */
export function satelliteHabitatStyle({ satellite, selected, habitat, opacity }) {
  if (!satellite) return { fillOpacity: selected === 'all' || selected === habitat ? 1 : .18, strokeOpacity: 0, strokeWidth: 0 }
  const active = selected === habitat
  const shade = Number.isFinite(opacity) ? Math.max(0, Math.min(1, opacity)) : .45
  return { fillOpacity: active ? shade : 0, strokeOpacity: active ? 1 : 0, strokeWidth: active ? 1.1 : 0 }
}
