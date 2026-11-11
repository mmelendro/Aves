"use client";
import { createContext, useContext, useState, type ReactNode } from "react";

/** Public page-local route order. Never persists or sends private itinerary notes. */
const Context = createContext<{
  bases: string[];
  setBases: (bases: string[]) => void;
  selectedBase: { id: string } | null;
  selectBase: (base: string) => void;
} | null>(null);
export function TripMapProvider({ children }: { children: ReactNode }) {
  const [bases, setBases] = useState<string[]>([]);
  const [selectedBase, setSelectedBase] = useState<{ id: string } | null>(null);
  return <Context.Provider value={{ bases, setBases, selectedBase, selectBase: id => setSelectedBase({ id }) }}>{children}</Context.Provider>;
}
export const useTripMap = () => useContext(Context);
