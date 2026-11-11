"use client";
import { southIslandPlanner } from "@/lib/south-island-trip-planner";
import IslandTripPlanner from "./island-trip-planner";
/** Compatibility boundary for the published South Island page. */
export default function SouthIslandTripPlanner() {
  return <IslandTripPlanner planner={southIslandPlanner} />;
}
