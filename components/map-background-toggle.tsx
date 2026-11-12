"use client";

import { Globe } from "lucide-react";
import { useMapLayers } from "./map-layer-context";
import { mapControlButtonClass } from "./map-layer-picker";

/** Switch only the shared background. Geography, overlays and bird wishes stay independent. */
export default function MapBackgroundToggle() {
  const { layers, update } = useMapLayers();
  const satellite = layers.background === "satellite";
  return (
    <button
      type="button"
      className={`${mapControlButtonClass} ${satellite ? "border-emerald-700 bg-emerald-800 text-white" : "bg-white text-emerald-950"}`}
      aria-label="Satellite map"
      aria-pressed={satellite}
      title={satellite ? "Turn satellite map off" : "Turn satellite map on"}
      onClick={() =>
        update({ background: satellite ? "habitats" : "satellite" })
      }
    >
      <Globe size={18} aria-hidden="true" />
    </button>
  );
}
