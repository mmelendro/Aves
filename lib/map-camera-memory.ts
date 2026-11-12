/** Tab-memory only. Camera memory is not copied into account records or
 * preference URLs. Imagery keeps its normal tile requests. Defensive copies
 * keep map consumers isolated. */
export type MapCamera = { centre: [number, number]; zoom: number };
export const mapCameraKey = (country: string, region: string) =>
  JSON.stringify([country, region]);
export function createMapCameraMemory() {
  const views = new Map<string, MapCamera>();
  return {
    remember(key: string, camera: MapCamera) {
      if (
        !camera.centre.every(Number.isFinite) ||
        Math.abs(camera.centre[0]) > 90 ||
        !Number.isFinite(camera.zoom) ||
        camera.zoom < 1 ||
        camera.zoom > 14
      )
        return;
      views.delete(key);
      views.set(key, { centre: [...camera.centre], zoom: camera.zoom });
      if (views.size > 64) {
        const oldest = views.keys().next().value;
        if (oldest !== undefined) views.delete(oldest);
      }
    },
    recall(key: string): MapCamera | undefined {
      const value = views.get(key);
      return value
        ? { centre: [...value.centre], zoom: value.zoom }
        : undefined;
    },
  };
}
