import { northIslandPlanning } from "@/content/new-zealand-planning-context";
import { createIslandTripPlanner } from "./island-trip-planner";
import { southIslandPlanner } from "./south-island-trip-planner";
/** Register only researched operational islands. Unknown IDs never fall back. */
export const northIslandPlanner = createIslandTripPlanner(northIslandPlanning);
export const islandPlanners = [southIslandPlanner, northIslandPlanner];
export const islandPlanner = (id: string) =>
  islandPlanners.find((p) => p.context.id === id) ?? null;
