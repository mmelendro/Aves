export interface HeaderGeometryInput { width: number; wordCenter: number; navLeft: number; navRight: number }
export function newZealandHeaderGeometry(input: HeaderGeometryInput): {
  boundary: string; ridges: string[]; water: string[]; whales: string[];
  birds: { x: number; y: number; size: number; rotation: number }[];
  baseline: number; compact: boolean;
}
