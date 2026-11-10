export const fitMapView = { x: 0, y: 0, zoom: 1 }
export function constrainMapView(view, box) {
  const zoom = Math.max(1, Math.min(4, view.zoom))
  return { zoom, x: Math.min(0, Math.max(box.width * (1 - zoom), view.x)), y: Math.min(0, Math.max(box.height * (1 - zoom), view.y)) }
}
/** Keep the map coordinate beneath the fingers stationary while zoom changes. */
export function zoomMapAt(view, factor, point, box) {
  const zoom = Math.max(1, Math.min(4, view.zoom * factor)), ratio = zoom / view.zoom
  return constrainMapView({ zoom, x: point.x - (point.x - view.x) * ratio, y: point.y - (point.y - view.y) * ratio }, box)
}
export function mapGestureView(start, initial, current, box) {
  if (!initial.length || current.length !== initial.length) return start
  const mid = points => ({ x: points.reduce((n,p)=>n+p.x,0)/points.length, y: points.reduce((n,p)=>n+p.y,0)/points.length })
  const a = mid(initial), b = mid(current)
  let next = start
  if (initial.length === 2) {
    const distance = points => Math.hypot(points[1].x-points[0].x, points[1].y-points[0].y)
    const old = distance(initial)
    if (old > 0) next = zoomMapAt(start, distance(current)/old, a, box)
  }
  return constrainMapView({ ...next, x: next.x + b.x - a.x, y: next.y + b.y - a.y }, box)
}
