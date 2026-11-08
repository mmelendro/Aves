/** Width rules shared by the divider's pointer and keyboard controls. */
export const DISCOVERY_HANDLE_WIDTH = 44
export const DISCOVERY_MIN_PANEL_WIDTH = 256
export const DISCOVERY_PAIR_MIN_WIDTH = 624

export function discoverySplitBounds(width: number) {
  const available = width - DISCOVERY_HANDLE_WIDTH
  // Below the pairing breakpoint, both panels become independent stacked cards.
  const min = available > 0 ? Math.min(50, Math.max(35, DISCOVERY_MIN_PANEL_WIDTH / available * 100)) : 50
  return { min, max: 100 - min }
}

export function clampDiscoverySplit(share: number, width: number) {
  const { min, max } = discoverySplitBounds(width)
  return Math.min(max, Math.max(min, Number.isFinite(share) ? share : 50))
}

// Measure movement from the initial grab so clicking off-centre does not jump the divider.
export function dragDiscoverySplit(startShare: number, deltaX: number, width: number) {
  const available = width - DISCOVERY_HANDLE_WIDTH
  return clampDiscoverySplit(available > 0 ? startShare + deltaX / available * 100 : 50, width)
}
