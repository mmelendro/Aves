export const fitMapView = { x: 0, y: 0, zoom: 1 };
export function constrainMapView(view, box, panMargin = 0) {
  const zoom = Math.max(1, Math.min(4, view.zoom));
  const xMargin = box.width * panMargin,
    yMargin = box.height * panMargin;
  return {
    zoom,
    x: Math.min(xMargin, Math.max(box.width * (1 - zoom) - xMargin, view.x)),
    y: Math.min(yMargin, Math.max(box.height * (1 - zoom) - yMargin, view.y)),
  };
}
/** Keep the map coordinate beneath the fingers stationary while zoom changes. */
export function zoomMapAt(view, factor, point, box, panMargin = 0) {
  const zoom = Math.max(1, Math.min(4, view.zoom * factor)),
    ratio = zoom / view.zoom;
  return constrainMapView(
    {
      zoom,
      x: point.x - (point.x - view.x) * ratio,
      y: point.y - (point.y - view.y) * ratio,
    },
    box,
    panMargin,
  );
}
export function mapGestureView(start, initial, current, box, panMargin = 0) {
  if (!initial.length || current.length !== initial.length) return start;
  const mid = (points) => ({
    x: points.reduce((n, p) => n + p.x, 0) / points.length,
    y: points.reduce((n, p) => n + p.y, 0) / points.length,
  });
  const a = mid(initial),
    b = mid(current);
  let next = start;
  if (initial.length === 2) {
    const distance = (points) =>
      Math.hypot(points[1].x - points[0].x, points[1].y - points[0].y);
    const old = distance(initial);
    if (old > 0)
      next = zoomMapAt(start, distance(current) / old, a, box, panMargin);
  }
  return constrainMapView(
    { ...next, x: next.x + b.x - a.x, y: next.y + b.y - a.y },
    box,
    panMargin,
  );
}

/** A double tap zooms the map, never the surrounding page. Ignore moved gestures. */
export function isMapDoubleTap(previous, current) {
  return Boolean(
    previous &&
    current.at >= previous.at &&
    current.at - previous.at <= 350 &&
    Math.hypot(current.x - previous.x, current.y - previous.y) <= 28,
  );
}
