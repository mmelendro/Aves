"use client";
import { northIslandPlanner } from "@/lib/island-planners";
import IslandTripPlanner from "./island-trip-planner";
export default function NorthIslandTripPlanner() {
  return <IslandTripPlanner planner={northIslandPlanner} />;
}
