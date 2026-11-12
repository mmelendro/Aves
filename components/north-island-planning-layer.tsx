"use client";
import {useJourneyMapMotion} from "@/lib/use-journey-map-motion";
import { useEffect, useRef } from "react";
import { marker, divIcon, polyline, type Map as GeographicMap } from "leaflet";
import { northIslandPlanner as planner } from "@/lib/island-planners";
import { useTripMap } from "./trip-planner/trip-map-context";
import { useMapLayers } from "./map-layer-context";
/** Broad settlement references on the existing geographic surface, never roads or bird locations. */
export default function NorthIslandPlanningLayer({
  map,
}: {
  map: GeographicMap;
}) {
  const trip = useTripMap(),
    { layers } = useMapLayers();
  const journeyStep =
    trip?.journey?.islandId === "north-island"
      ? trip.journey.steps[trip.journey.index]
      : undefined;
  const selection = journeyStep || trip?.selectedBase;
  const handledSelection = useRef<typeof selection>(
    journeyStep ? undefined : selection,
  );
  const fitCorridor = () =>
    map.fitBounds(
      planner.tripAreas.map(
        (a) => [a.latitude, a.longitude] as [number, number],
      ),
      { padding: [40, 40], maxZoom: 9, animate: false },
    );
  const selected = journeyStep?.baseId || trip?.selectedBase?.id,
    select = trip?.selectBase;
  const routeKey = trip?.bases.join("|") || "";
  useEffect(() => {
    const points = layers.planning
      ? planner.tripAreas.map((area) => {
          const button = document.createElement("button");
          button.type = "button";
          button.textContent = area.name;
          button.className =
            "geographic-map-target" +
            (journeyStep?.baseId === area.id ? " aves-journey-target" : "");
          button.setAttribute(
            "aria-label",
            `Preview planning base: ${area.name}`,
          );
          button.setAttribute("aria-pressed", String(selected === area.id));
          button.onclick = () => select?.(area.id);
          return marker([area.latitude, area.longitude], {
            pane: "routePane",
            icon: divIcon({
              html: button,
              className: "geographic-map-marker",
              iconSize: [0, 0],
            }),
            keyboard: false,
          }).addTo(map);
        })
      : [];
    const bases = routeKey.split("|").flatMap((id) => {
      const a = planner.tripAreaById.get(id);
      return a ? [[a.latitude, a.longitude] as [number, number]] : [];
    });
    const route =
      layers.itinerary && bases.length > 1
        ? polyline(bases, {
            pane: "routePane",
            color: "#0369a1",
            weight: 3,
            dashArray: "7 5",
            interactive: false,
          }).addTo(map)
        : null;
    return () => {
      points.forEach((p) => p.remove());
      route?.remove();
    };
  }, [
    map,
    layers.planning,
    layers.itinerary,
    selected,
    select,
    routeKey,
    journeyStep,
  ]);
  useEffect(() => {
    // Initial/remounted display preserves the geographic engine's camera. Only
    // a new explicit preview request focuses a base, including repeat clicks.
    if (handledSelection.current === selection) return;
    handledSelection.current = selection;
    const a = planner.tripAreaById.get(
      journeyStep?.baseId || selection?.id || "",
    );
    if (a && !journeyStep)
      map.setView([a.latitude, a.longitude], 9, {
        animate:
          Boolean(journeyStep) &&
          !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      });
  }, [map, selection]);
  useJourneyMapMotion(map,"north-island");
  return (
    <div className="px-2 py-1 text-xs leading-5 text-emerald-950">
      <button
        type="button"
        onClick={fitCorridor}
        className="min-h-11 rounded px-2 font-semibold underline"
      >
        Fit Auckland to Rotorua corridor
      </button>
      <label className="flex flex-wrap items-center gap-2">
        Preview a corridor base
        <select
          aria-label="Preview a North Island planning base"
          value={planner.tripAreaById.has(selected || "") ? selected : ""}
          onChange={(e) => select?.(e.target.value)}
          className="min-h-11 max-w-full rounded-lg border bg-white px-2"
        >
          <option value="">Choose a base</option>
          {planner.tripAreas.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>
      </label>
      <p>
        Three broad town references. Blue connectors show itinerary base order,
        not roads. Local travel and access need checking. Settlement
        coordinates: Natural Earth 5.1.2, public domain.{" "}
        <a
          href="https://www.naturalearthdata.com/downloads/10m-cultural-vectors/10m-populated-places/"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          Source
        </a>
        .
      </p>
    </div>
  );
}
