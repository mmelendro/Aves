import { southIslandPlanner } from "./south-island-trip-planner";
/** Register only researched operational islands. Unknown IDs never fall back. */
export const islandPlanners = [southIslandPlanner];
export const islandPlanner = (id: string) =>
  islandPlanners.find((p) => p.context.id === id) ?? null;
