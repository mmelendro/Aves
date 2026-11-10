export type MapView = { x: number; y: number; zoom: number }
export const fitMapView: MapView
export function constrainMapView(view: MapView, box: { width: number; height: number }): MapView
export function zoomMapAt(view: MapView, factor: number, point: {x:number;y:number}, box: {width:number;height:number}): MapView
export function mapGestureView(start: MapView, initial: {x:number;y:number}[], current: {x:number;y:number}[], box: {width:number;height:number}): MapView
