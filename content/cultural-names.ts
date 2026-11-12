/** Reviewed name context, separate from taxonomy, official naming and photo attribution.
 * Missing records/recordings stay missing. Never infer language or fabricate pronunciation. */
export type CulturalNameRecord={
  id:string;kind:"place"|"bird";entityId:string;countryId:string;name:string;
  language:string|null;context:string;publisher:string;sourceUrl:string;reviewedOn:string;
  pronunciationGuide?:{label:string;url:string};
}
export const culturalNames:readonly CulturalNameRecord[]=[
 {id:"tui-te-aka",kind:"bird",entityId:"nz-tui",countryId:"new-zealand",name:"tūī",language:"te reo Māori",context:"Te Aka records this Māori name for Prosthemadera novaeseelandiae. This dictionary entry does not establish a preferred form for every iwi or dialect.",publisher:"Te Aka Māori Dictionary",sourceUrl:"https://maoridictionary.co.nz/word/8660",reviewedOn:"2026-11-13"},
 {id:"kaka-te-aka",kind:"bird",entityId:"nz-kaka",countryId:"new-zealand",name:"kākā",language:"te reo Māori",context:"Te Aka identifies Nestor meridionalis under this name. The dictionary also records a broader parrot meaning, so the species context matters. No universal iwi or dialect preference is implied.",publisher:"Te Aka Māori Dictionary",sourceUrl:"https://maoridictionary.co.nz/word/2081",reviewedOn:"2026-11-13"},
 {id:"kereru-te-aka",kind:"bird",entityId:"nz-kereru",countryId:"new-zealand",name:"kererū",language:"te reo Māori",context:"Te Aka records this Māori name for Hemiphaga novaeseelandiae and lists alternative names. This entry is language context, not a claim that every iwi uses the same form.",publisher:"Te Aka Māori Dictionary",sourceUrl:"https://maoridictionary.co.nz/word/2574",reviewedOn:"2026-11-13"},
 {id:"kookaburra-dharug-resources",kind:"bird",entityId:"au-laughing-kookaburra",countryId:"australia",name:"guganigine",language:"Dharug",context:"The Dharug and Dharawal Resources dictionary records this name for kookaburra. It provides Sydney Basin language context, not a name for every Aboriginal language or Australian region. The source page offers pronunciation.",publisher:"Dharug and Dharawal Resources",sourceUrl:"https://dharug.dalang.com.au/language/view_word/1015",reviewedOn:"2026-11-13",pronunciationGuide:{label:"Pronunciation reference at Dharug and Dharawal Resources",url:"https://dharug.dalang.com.au/language/view_word/1015"}},
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
