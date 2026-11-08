/**
 * Keep a content record's focal point in the middle of an object-fit: cover photo.
 * CSS percentage object-position aligns matching percentages of the frame and
 * image; that is not the same as centring a bird as the frame changes shape.
 */
export function coverFocalPosition({
  frameWidth, frameHeight, imageWidth, imageHeight, position = "center",
}: {
  frameWidth: number; frameHeight: number; imageWidth: number; imageHeight: number; position?: string
}): string {
  // Retain the authored CSS while the image/frame is unmeasured or unsupported.
  if (![frameWidth, frameHeight, imageWidth, imageHeight].every(value => Number.isFinite(value) && value > 0)) return position
  const words = position.trim().toLowerCase().split(/\s+/)
  if (words.length > 2) return position
  if (words.length === 1) words.push("center")
  // CSS also accepts vertical-first keyword pairs, such as "top left".
  if (["top", "bottom"].includes(words[0])) words.reverse()
  const fraction = (word: string, start: string, end: string) => {
    if (word === start) return 0
    if (word === end) return 1
    if (word === "center") return 0.5
    return /^-?\d+(?:\.\d+)?%$/.test(word) ? Math.max(0, Math.min(1, Number.parseFloat(word) / 100)) : undefined
  }
  const x = fraction(words[0], "left", "right")
  const y = fraction(words[1], "top", "bottom")
  if (x === undefined || y === undefined) return position

  const scale = Math.max(frameWidth / imageWidth, frameHeight / imageHeight)
  const offset = (frame: number, image: number, focal: number) => {
    const covered = image * scale
    // Centre when possible; clamp at the photograph's edges to avoid empty space.
    return Math.min(0, Math.max(frame - covered, frame / 2 - focal * covered))
  }
  return `${offset(frameWidth, imageWidth, x)}px ${offset(frameHeight, imageHeight, y)}px`
}
