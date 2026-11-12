/** Camera coordinates stay in the original 480 × 640 SVG frame. Zooming never
 * changes the LCDB geometry or suggests more source detail. These pure helpers
 * also keep the distance scale independent of panel/window pixel dimensions.
 */
export type MapCamera = { x: number; y: number; zoom: number };
export const ecosystemMapFrame = {
  width: 480,
  height: 640,
  maxZoom: 4,
} as const;
export const initialMapCamera: MapCamera = { x: 0, y: 0, zoom: 1 };

export function clampMapCamera(camera: MapCamera, panMargin = 0): MapCamera {
  const zoom = Math.min(ecosystemMapFrame.maxZoom, Math.max(1, camera.zoom));
  return {
    zoom,
    x: Math.min(
      480 - 480 / zoom + (480 * panMargin) / zoom,
      Math.max(panMargin ? (-480 * panMargin) / zoom : 0, camera.x),
    ),
    y: Math.min(
      640 - 640 / zoom + (640 * panMargin) / zoom,
      Math.max(panMargin ? (-640 * panMargin) / zoom : 0, camera.y),
    ),
  };
}

/** Zoom around the current view centre, including when clamped at an edge. */
export function zoomMapCamera(
  camera: MapCamera,
  factor: number,
  panMargin = 0,
): MapCamera {
  const zoom = clampMapCamera({ ...camera, zoom: camera.zoom * factor }).zoom;
  return clampMapCamera(
    {
      zoom,
      x: camera.x + 240 / camera.zoom - 240 / zoom,
      y: camera.y + 320 / camera.zoom - 320 / zoom,
    },
    panMargin,
  );
}

export function panMapCamera(
  camera: MapCamera,
  dx: number,
  dy: number,
  panMargin = 0,
): MapCamera {
  return clampMapCamera(
    { ...camera, x: camera.x + dx, y: camera.y + dy },
    panMargin,
  );
}

export function ecosystemMapPoint(
  longitude: number,
  latitude: number,
  bbox: readonly number[],
) {
  const resolution = (bbox[2] - bbox[0]) / 480;
  // Server/browser trig implementations can differ at their last decimal.
  // Six SVG decimals are far below source resolution and keep hydration stable.
  const x = ((6378137 * longitude * Math.PI) / 180 - bbox[0]) / resolution;
  const y =
    (bbox[3] -
      6378137 * Math.log(Math.tan(Math.PI / 4 + (latitude * Math.PI) / 360))) /
    resolution;
  return { x: Number(x.toFixed(6)), y: Number(y.toFixed(6)) };
}

export function focusEcosystemMapPoint(
  camera: MapCamera,
  point: { x: number; y: number },
) {
  const zoom = Math.max(camera.zoom, 2);
  return clampMapCamera({
    zoom,
    x: point.x - 240 / zoom,
    y: point.y - 320 / zoom,
  });
}

/** Web Mercator uses spherical projected metres. Convert its horizontal scale
 * to the WGS84 ellipsoid's parallel distance at the CURRENT view-centre latitude.
 * A scale is local: it cannot describe all latitudes across the island at once.
 * svgPixelsPerUnit includes preserveAspectRatio letterboxing and divider resize.
 */
export function ecosystemMapScale(
  camera: MapCamera,
  bbox: readonly number[],
  svgPixelsPerUnit: number,
) {
  if (!(svgPixelsPerUnit > 0)) return null;
  const projectedMetresPerUnit = (bbox[2] - bbox[0]) / 480;
  const centreNorthing =
    bbox[3] - (camera.y + 320 / camera.zoom) * projectedMetresPerUnit;
  const latitude =
    2 * Math.atan(Math.exp(centreNorthing / 6378137)) - Math.PI / 2;
  const eccentricitySquared = 0.0066943799901413165;
  const groundFactor =
    Math.cos(latitude) /
    Math.sqrt(1 - eccentricitySquared * Math.sin(latitude) ** 2);
  const metresPerPixel =
    (projectedMetresPerUnit * groundFactor) / (camera.zoom * svgPixelsPerUnit);
  const targetMetres = metresPerPixel * 110;
  const power = 10 ** Math.floor(Math.log10(targetMetres));
  const distanceMetres =
    [5, 2, 1]
      .map((multiplier) => multiplier * power)
      .find((value) => value <= targetMetres) || power;
  return {
    latitude: (latitude * 180) / Math.PI,
    metresPerPixel,
    distanceMetres,
    widthPixels: distanceMetres / metresPerPixel,
  };
}
