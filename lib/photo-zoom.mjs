/** Do not magnify past the loaded photograph's native pixel dimensions. */
export function photoZoomLimit(width, height, viewportWidth, viewportHeight) {
  if (![width, height, viewportWidth, viewportHeight].every(value => Number.isFinite(value) && value > 0)) return 1
  const fit = Math.min(viewportWidth / width, viewportHeight / height)
  return Math.max(1, Math.min(2, 1 / fit))
}
