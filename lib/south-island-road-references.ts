import data from "@/content/south-island-road-references.json";

/** Published town-to-town corridor references. Never live routing, exact lodging
 * travel, a guaranteed arrival time, or a substitute for checking road conditions. */
export const roadReferenceData = data;
export type RoadReference = (typeof data.corridors)[number] & {
  publisher: string;
  url: string;
  kind: string;
  stopPolicy: string;
  reviewedAt: string;
};
export function roadReference(
  fromId: string,
  toId: string,
): RoadReference | null {
  const corridor = data.corridors.find(
    (c) =>
      (c.fromId === fromId && c.toId === toId) ||
      (c.fromId === toId && c.toId === fromId),
  );
  if (!corridor) return null;
  const source = data.sources[corridor.sourceId as keyof typeof data.sources];
  return { ...corridor, ...source, reviewedAt: data.reviewedAt };
}
export function roadTimeLabel(minutes: number) {
  const h = Math.floor(minutes / 60),
    m = minutes % 60;
  return [h ? `${h} h` : "", m ? `${m} min` : ""].filter(Boolean).join(" ");
}
