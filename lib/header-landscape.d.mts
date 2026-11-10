export interface HeaderProfile { terrain: string; water: string }
export const releasedAustraliaHeaders: Record<string, HeaderProfile | undefined>
export function contextualHeaderGeometry(input: { width: number; wordCenter: number }, profile: HeaderProfile): { boundary: string; ridges: string[]; water: string[]; whales: string[]; birds: {x:number;y:number;size:number;rotation:number}[]; baseline: number; compact: boolean }
