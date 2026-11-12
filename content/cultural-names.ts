/** Reviewed name context, separate from taxonomy, official naming and photo attribution.
 * Missing records/recordings stay missing. Never infer language or fabricate pronunciation. */
export type CulturalNameRecord={
  id:string;kind:"place"|"bird";entityId:string;countryId:string;name:string;
  language:string|null;context:string;publisher:string;sourceUrl:string;reviewedOn:string;
  pronunciationGuide?:{label:string;url:string};
}
export const culturalNames:readonly CulturalNameRecord[]=[
 {id:"kumanday-national-parks-history",kind:"place",entityId:"nevado-del-ruiz",countryId:"colombia",name:"Kumanday",language:null,
  context:"Historical Quimbaya name for Nevado del Ruiz, as recorded by Parques Nacionales Naturales de Colombia. The source does not identify a language variety or provide pronunciation audio.",
  publisher:"Parques Nacionales Naturales de Colombia",sourceUrl:"https://www.parquesnacionales.gov.co/nuestros-parques/parque-nacional-natural-los-nevados/",reviewedOn:"2026-11-12"},
 {id:"kea-te-aka",kind:"bird",entityId:"nz-kea",countryId:"new-zealand",name:"kea",language:"te reo Māori",
  context:"Māori bird name recorded by Te Aka for Nestor notabilis. This entry does not establish a preferred name for every iwi or dialect.",
  publisher:"Te Aka Māori Dictionary",sourceUrl:"https://maoridictionary.co.nz/word/2505",reviewedOn:"2026-11-12",pronunciationGuide:{label:"Hear pronunciation at Te Aka",url:"https://maoridictionary.co.nz/word/2505"}},
]
export function reviewedNames(kind:CulturalNameRecord["kind"],entityId:string,countryId?:string){
 return culturalNames.filter(record=>record.kind===kind&&record.entityId===entityId&&(!countryId||record.countryId===countryId))
}
