"use client";
import {arrivalReferences} from "@/lib/journey-reference-points";
import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { TripJourneyStep } from "@/lib/trip-journey";
export type TripJourney = {
  islandId: string;
  steps: TripJourneyStep[];
  index: number;
};
/** Public page-local preview only. It never changes route inputs or private notes. */
const Context = createContext<{
  journeyMotion:boolean;
  setJourneyMotion:(enabled:boolean)=>void;
  bases: string[];
  setBases: (bases: string[]) => void;
  selectedBase: { id: string } | null;
  selectBase: (base: string) => void;
  journey: TripJourney | null;
  startJourney: (islandId: string, steps: TripJourneyStep[]) => void;
  goToStep: (index: number) => void;
  stopJourney: () => void;
  selectArrivalReference:(id:string)=>void;
} | null>(null);
export function TripMapProvider({ children }: { children: ReactNode }) {
  const [journeyMotion,setJourneyMotion]=useState(true);
  const [bases, setBases] = useState<string[]>([]),
    [selectedBase, setSelectedBase] = useState<{ id: string } | null>(null),
    [journey, setJourney] = useState<TripJourney | null>(null);
  const selectBase = useCallback((id: string) => {
    setJourney(null);
    setSelectedBase({ id });
  }, []);
  const startJourney = useCallback(
    (islandId: string, steps: TripJourneyStep[]) =>
      setJourney(steps.length ? { islandId, steps, index: 0 } : null),
    [],
  );
  const goToStep = useCallback(
    (index: number) =>
      setJourney((current) =>
        current && Number.isInteger(index)
          ? {
              ...current,
              index: Math.max(0, Math.min(current.steps.length - 1, index)),
            }
          : current,
      ),
    [],
  );
  const selectArrivalReference=useCallback((id:string)=>setJourney(current=>{
    if(!current)return current;
    const step=current.steps[current.index],point=arrivalReferences(step.baseId,step.kind).find(p=>p.id===id);
    if(id&&!point)return current;
    return {...current,steps:current.steps.map((s,i)=>i===current.index?{...s,mapPoint:point}:s)};
  }),[]);
  const stopJourney = useCallback(() => setJourney(null), []);
  return (
    <Context.Provider
      value={{
        journeyMotion,setJourneyMotion,
        bases,
        setBases,
        selectedBase,
        selectBase,
        journey,
        startJourney,
        goToStep,
        stopJourney,
        selectArrivalReference,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export const useTripMap = () => useContext(Context);
