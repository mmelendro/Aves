import type { IslandPlanningContext } from "./island-planning-types";
export type RoadReference = {
  fromId: string;
  toId: string;
  minutes: number;
  sourceId: string;
  publisher: string;
  url: string;
  kind: string;
  stopPolicy: string;
  reviewedAt: string;
};
export function roadTimeLabel(minutes: number) {
  const h = Math.floor(minutes / 60),
    m = minutes % 60;
  return [h ? `${h} h` : "", m ? `${m} min` : ""].filter(Boolean).join(" ");
}

export function createRoadReferences(data: IslandPlanningContext["roads"]) {
  /** Published town-to-town corridor references. Never live routing, exact lodging
   * travel, a guaranteed arrival time, or a substitute for checking road conditions. */
  const roadReferenceData = data;
  function roadReference(fromId: string, toId: string): RoadReference | null {
    const corridor = data.corridors.find(
      (c) =>
        (c.fromId === fromId && c.toId === toId) ||
        (c.fromId === toId && c.toId === fromId),
    );
    if (!corridor) return null;
    const source = data.sources[corridor.sourceId as keyof typeof data.sources];
    return { ...corridor, ...source, reviewedAt: data.reviewedAt };
  }
  return { roadReferenceData, roadReference, roadTimeLabel };
}
