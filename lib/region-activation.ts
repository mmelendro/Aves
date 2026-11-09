/** A preview is deliberate, not inferred from a default/hovered highlight.
 * Modifier/middle clicks retain the browser's native new-tab behaviour.
 */
export function regionActivation(armedId: string | null, id: string, event: { button: number; ctrlKey?: boolean; metaKey?: boolean; shiftKey?: boolean; altKey?: boolean }) {
  const plain = event.button === 0 && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey
  return { preview: plain && armedId !== id, native: !plain || armedId === id }
}
