"use client";
import { useTripMap } from "./trip-map-context";
import { useMapLayers } from "../map-layer-context";
import { southIslandPlanning } from "@/content/new-zealand-planning-context";
import { ecosystemMapPoint } from "@/lib/ecosystem-map-camera";
import geography from "@/content/south-island-ecosystem-map.json";

/** Sequence only: straight connectors must never imply road geometry or travel times. */
export default function TripRouteOverlay() {
  const trip = useTripMap();
  const { layers } = useMapLayers();
  if (!layers.itinerary || !trip?.bases.length) return null;
  const points = trip.bases.flatMap(id => {
    const area = southIslandPlanning.catalogue.areas.find(a => a.id === id);
    return area ? [{ area, xy: ecosystemMapPoint(area.longitude, area.latitude, geography.bbox) }] : [];
  });
  return <g data-map-layer="itinerary" pointerEvents="none" aria-label="Itinerary base order, not roads">
    {points.length > 1 && <polyline points={points.map(p => `${p.xy.x},${p.xy.y}`).join(" ")} fill="none" stroke="#0369a1" strokeWidth="3" strokeDasharray="7 5" vectorEffect="non-scaling-stroke" />}
    {points.map(({area,xy},i) => <g key={`${i}-${area.id}`}><title>{i+1}. {area.name} · itinerary base</title><circle cx={xy.x} cy={xy.y} r="11" fill="#0369a1" stroke="white" strokeWidth="2"/><text x={xy.x} y={xy.y+4} textAnchor="middle" fontSize="11" fill="white">{i+1}</text></g>)}
  </g>;
}
