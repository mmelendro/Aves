/**
 * Fit a reviewed region's projected outline inside its existing SVG viewport.
 * A uniform scale preserves geography; a cap keeps tiny territories in context.
 * This reads the simple M/L/Z paths produced by our pinned map generators, not
 * arbitrary SVG artwork. Unsupported geometry safely keeps the full overview.
 */
export function mapZoomTransform(viewBox: string, paths: readonly string[], maxScale = 12): string {
  const identity = "translate(0px, 0px) scale(1)"
  const box = viewBox.trim().split(/\s+/).map(Number)
  if (box.length !== 4 || !box.every(Number.isFinite) || box[2] <= 0 || box[3] <= 0 || !Number.isFinite(maxScale) || maxScale < 1 || !paths.length) return identity
  if (paths.some(path => /[^MLZ0-9eE+\-.,\s]/i.test(path))) return identity
  const points = paths.flatMap(path => [...path.matchAll(/([+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?),([+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?)/gi)].map(([, x, y]) => [Number(x), Number(y)]))
  if (!points.length || points.some(point => !point.every(Number.isFinite))) return identity
  const left = Math.min(...points.map(point => point[0])), right = Math.max(...points.map(point => point[0]))
  const top = Math.min(...points.map(point => point[1])), bottom = Math.max(...points.map(point => point[1]))
  if (right <= left || bottom <= top) return identity
  const scale = Math.max(1, Math.min(maxScale, box[2] * .8 / (right - left), box[3] * .8 / (bottom - top)))
  const x = box[0] + box[2] / 2 - (left + right) / 2 * scale
  const y = box[1] + box[3] / 2 - (top + bottom) / 2 * scale
  const rounded = (value: number) => Number(value.toFixed(6))
  return `translate(${rounded(x)}px, ${rounded(y)}px) scale(${rounded(scale)})`
}
