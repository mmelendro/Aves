import {birdConservation,statusLabels,type ConservationBird} from "@/lib/bird-conservation"

/** Text labels supplement colour. Assessments describe species, not an individual photo. */
export default function BirdConservationLabel({bird,sources=false}:{bird:ConservationBird;sources?:boolean}) {
 const record=birdConservation(bird), status=record?.globalStatus ?? "unknown"
 return <div className="space-y-1 text-xs leading-5" data-bird-conservation>
  <p>{record?.endemicTo && <span>Endemic to {record.endemicTo} · </span>}<span>Global species status: {statusLabels[status]}</span></p>
  {sources&&<>
   {record?.statusSource&&<p><a className="underline" href={record.statusSource} target="_blank" rel="noreferrer">GBIF / IUCN status snapshot</a> · checked {record.checkedAt}</p>}
   {record?.endemicSource&&<p><a className="underline" href={record.endemicSource} target="_blank" rel="noreferrer">Endemism reference</a></p>}
   {record?.nationalStatus&&<p>{record.nationalStatus.system}: {record.nationalStatus.label} · <a className="underline" href={record.nationalStatus.source} target="_blank" rel="noreferrer">National reference</a></p>}
   <p className="text-gray-600">Species-level global and national classifications can differ. Status is not a sighting forecast or permission to approach wildlife.</p>
  </>}
 </div>
}
