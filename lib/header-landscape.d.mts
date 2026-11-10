export interface HeaderGeometryInput { width: number; wordCenter: number; navLeft: number; navRight: number }
export function newZealandHeaderGeometry(input: HeaderGeometryInput): {
  boundary: string; ridges: string[]; water: string[]; whales: string[];
  birds: { x: number; y: number; size: number; rotation: number }[];
  baseline: number; compact: boolean;
}

export interface ContextualHeaderProfile { terrain: string; water: string }
export const releasedColombiaHeaders: Record<string, ContextualHeaderProfile | undefined>
export function contextualHeaderGeometry(input: HeaderGeometryInput, profile: ContextualHeaderProfile): ReturnType<typeof newZealandHeaderGeometry>

export function selectedHeaderProfile(country: string, regionId?: string, placeId?: string): ContextualHeaderProfile | undefined
