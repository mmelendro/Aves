"use client";
import { createContext, useContext, type ReactNode } from "react";
import type { IslandTripPlanner } from "@/lib/island-trip-planner";
const Context = createContext<IslandTripPlanner | null>(null);
export function IslandPlannerProvider({
  planner,
  children,
}: {
  planner: IslandTripPlanner;
  children: ReactNode;
}) {
  return <Context.Provider value={planner}>{children}</Context.Provider>;
}
export function useIslandPlanner() {
  const planner = useContext(Context);
  if (!planner) throw new Error("A planner needs its island context");
  return planner;
}
