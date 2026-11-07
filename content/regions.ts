/**
 * The eleven Colombian planning regions and locally relevant bird selections.
 * selection looks up a bird by stable ID and adds a region-specific place to look.
 * It throws on an unknown ID so a broken content relationship is caught early.
 * Keep wider distribution in the bird catalogue and local notes in this file.
 */
import { birdData, type BirdSource } from "./birds"

export type RegionalBird = { birdId: string; whereFound: string; sources: BirdSource[] }
export type ColombiaRegion = {
  id: string
  mapId: string
  name: string
  description: string
  birds: RegionalBird[]
  // Summarise a verified shared range once. Explicit IDs keep other/future birds' range notes visible.
  sharedBirdRange?: { birdIds: string[]; text: string }
}

function selection(slug: string, whereFound: string, sources?: BirdSource[]): RegionalBird {
  const birdId = `co-${slug}`
  const bird = birdData.find(item => item.id === birdId)
  if (!bird) throw new Error(`Unknown regional bird: ${birdId}`)
  return { birdId, whereFound, sources: sources || bird.sources }
}

const casanare: BirdSource = {
  title: "Colombia National Parks — Paz de Ariporo, Casanare bird inventory",
  url: "https://old.parquesnacionales.gov.co/portal/wp-content/uploads/2019/09/Resol_165_260919_sgm.pdf",
}
const purace: BirdSource = {
  title: "WCS / National Parks / Universidad del Cauca — Birds of Puracé (2024)",
  url: "https://doi.org/10.19121/2024.Report.50880",
}
const valle: BirdSource = {
  title: "Instituto Humboldt — Birds of Valle del Cauca (2020), habitat-zone inventory",
  url: "https://revistas.humboldt.org.co/index.php/biota/article/download/738/915/3688",
}

// These are the eleven existing map regions, not administrative departments.
// Habitat notes describe where the birds occur; they do not promise sightings,
// reserve admission, a guide booking or a particular departure.
export const regions: ColombiaRegion[] = [
  {
    id: "pacific", mapId: "Pacific", name: "Pacific",
    description: "Rainforest, broad rivers and humid foothills on Colombia’s Pacific side. Explore forest birds of the Chocó and the lower western slopes of the Andes.",
    birds: [
      selection("choco-toucan", "Humid lowland and foothill forest on the Pacific side, where fruiting canopy trees provide feeding habitat."),
      selection("yellow-throated-toucan", "Tall wet forest and wooded foothills on the Pacific side. Listen from forest edges and scan fruiting trees."),
      selection("velvet-purple-coronet", "The forested foothills rising from the Pacific lowlands towards the Western Andes, especially flowering edges in wet forest."),
    ],
  },
  {
    id: "western-andes", mapId: "Western Andes", name: "Western Andes",
    description: "Cloud forest and wooded ridges along the Western Cordillera, with especially wet forests on its Pacific-facing slopes.",
    birds: [
      selection("velvet-purple-coronet", "Wet cloud forest and flowering edges on the Pacific-facing slopes of the Western Cordillera."),
      selection("black-billed-mountain-toucan", "Humid montane forest in the Western Cordillera, concentrating on fruiting trees and connected forest canopy."),
      selection("andean-motmot", "Wooded slopes and ravines, including forest edges and shaded gardens where mature vegetation remains."),
      selection("golden-headed-quetzal", "Quiet humid mountain forest, where fruiting trees and mature canopy offer suitable habitat."),
    ],
  },
  {
    id: "central-andes", mapId: "Central Andes", name: "Central Andes",
    description: "Colombia’s central mountain chain connects cloud forest and coffee-country slopes with cold páramo around its higher peaks.",
    birds: [
      selection("rainbow-bearded-thornbill", "Shrubby high-elevation páramo around the Ruiz area; this is a high-mountain bird, above the usual coffee-country routes."),
      selection("black-billed-mountain-toucan", "Cloud forests around Manizales and other wooded slopes of the Central Cordillera."),
      selection("chestnut-crowned-antpitta", "Damp forest undergrowth and ravines in the Central Cordillera, including the Río Blanco area."),
      selection("andean-motmot", "Forested ravines, woodland edges and shaded slopes in the Central Andes."),
    ],
  },
  {
    id: "eastern-andes", mapId: "Eastern Andes", name: "Eastern Andes",
    description: "The Eastern Cordillera spans high páramo, humid mountain forest and wooded foothills, with distinct habitats at each elevation.",
    birds: [
      selection("green-bearded-helmetcrest", "High páramo in the Eastern Cordillera, including the Sumapaz landscape south of Bogotá, among flowering shrubs and frailejones."),
      selection("black-billed-mountain-toucan", "Humid mountain forest in the Eastern Cordillera, well below the most exposed páramo."),
      selection("golden-headed-quetzal", "Mature humid mountain forest in the Eastern Cordillera and Perijá, looking towards quiet fruiting canopy trees."),
      selection("yellow-throated-toucan", "Warmer forested slopes and foothills, including suitable habitat in the Perijá region."),
    ],
  },
  {
    id: "cauca-valley", mapId: "Cauca Valley", name: "Cauca Valley",
    description: "Dry-forest remnants and open river-country landscapes lie between the Western and Central Andes, with wetter bird habitats on the wooded foothills.",
    birds: [
      selection("apical-flycatcher", "Dry woodland, scattered trees and scrub in the Cauca Valley; one of the region’s characteristic Colombian endemics."),
      selection("striolated-manakin", "Forest patches and wooded foothills of the Cauca Valley, with dense undergrowth and small fruiting trees.", [valle]),
      selection("andean-motmot", "Wooded foothills and ravines adjoining the valley, rather than the most open, treeless floodplain.", [valle]),
    ],
  },
  {
    id: "magdalena-valley", mapId: "Magdalena Valley", name: "Magdalena Valley",
    description: "A long inter-Andean river corridor, with dry woodland in some sectors and humid forest mosaics in others. Plan around the habitat, not just the valley name.",
    birds: [
      selection("apical-flycatcher", "Dry woodland and scrub in the middle and upper Magdalena basin, including the drier landscapes towards Huila."),
      selection("scaled-dove", "Open ground and pasture in the lower Magdalena region, with published records around San Fernando and Mompox. It is not uniformly distributed along the whole river.", [{ title: "Sociedad Antioqueña de Ornitología — Scaled Dove observations in northern Colombia", url: "https://www.sao.org.co/publicaciones/boletinsao/11-Estelaetal-Scardafella.pdf" }]),
      selection("yellow-throated-toucan", "Humid forest and wooded foothills in the Magdalena basin. A modern Tolima checklist documents it at Ataco; remaining forest determines suitable habitat.", [{ title: "Tolima bird checklist (2025) — specimen and photographic records", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12679288/" }]),
    ],
  },
  {
    id: "caribbean", mapId: "Caribbean", name: "Caribbean",
    description: "Northern Colombia brings together dry thorn scrub, coastal woodland, lagoons and mangroves. La Guajira offers a striking contrast with the Andean forests.",
    birds: [
      selection("vermilion-cardinal", "Dry thorn scrub and cactus country in La Guajira, including the landscape around Los Flamencos."),
      selection("scaled-dove", "Open ground and dry woodland in the Caribbean lowlands, including La Guajira."),
      selection("scarlet-ibis", "Suitable coastal wetlands and mangrove edges; Colombia National Parks lists it for Los Flamencos. Numbers and presence vary with water conditions."),
    ],
  },
  {
    id: "sierra-nevada-de-santa-marta", mapId: "SNSM", name: "Sierra Nevada de Santa Marta",
    description: "An isolated mountain range above the Caribbean, with forest birds found nowhere else. Its endemic species are distinct from those of the Andean cordilleras.",
    sharedBirdRange: {
      birdIds: ["co-santa-marta-brushfinch", "co-santa-marta-parakeet", "co-white-tailed-starfrontlet"],
      text: "The brushfinch, parakeet and starfrontlet featured here are found only in the Sierra Nevada de Santa Marta. Look for them in different mountain-forest habitats around El Dorado and San Lorenzo, as described below.",
    },
    birds: [
      selection("santa-marta-brushfinch", "Look in dense thickets and along mountain-forest edges around El Dorado."),
      selection("santa-marta-parakeet", "Explore upper montane forest around the San Lorenzo ridge. Keep your distance from nesting trees."),
      selection("white-tailed-starfrontlet", "Check flowering edges and openings in the humid forest around El Dorado."),
    ],
  },
  {
    id: "llanos", mapId: "Llanos", name: "Llanos",
    description: "Eastern savannas change with the water: flooded grasslands, river margins and gallery forests each support different bird communities.",
    birds: [
      selection("jabiru", "Shallow marshes and flooded savannas in Casanare, including the Paz de Ariporo region.", [casanare]),
      selection("scarlet-ibis", "Flooded grasslands and shallow wetlands in Casanare and Arauca; water levels shape where birds gather.", [casanare]),
      selection("hoatzin", "Dense vegetation beside slow water and lagoons in the eastern plains, including documented sites around Paz de Ariporo.", [casanare]),
      selection("sunbittern", "Shaded streams and river edges beside gallery forest, rather than exposed open savanna.", [casanare]),
    ],
  },
  {
    id: "amazonia", mapId: "Amazonia", name: "Amazonia",
    description: "Lowland rainforest, flooded forest and river-edge vegetation in Colombia’s Amazon basin. A forest trail and a quiet waterside route reveal very different birds.",
    birds: [
      selection("hoatzin", "Leafy river and lake margins in the Colombian Amazon; primary research records the species in Caquetá."),
      selection("golden-headed-manakin", "Humid lowland forest in south-eastern Colombia, including the Vaupés region; listen and look for small fruiting trees."),
      selection("scarlet-macaw", "Large forest blocks and wooded river corridors in Colombia’s Amazon basin, where mature nesting and feeding trees remain."),
    ],
  },
  {
    id: "colombian-massif", mapId: "Massif", name: "Colombian Massif",
    description: "Southern Andean headwaters, mountain forest and páramo around the meeting of Colombia’s major ranges, including the Puracé landscape.",
    birds: [
      selection("rainbow-bearded-thornbill", "Shrubby transitions between mountain forest and páramo in the Puracé landscape.", [purace]),
      selection("chestnut-crowned-antpitta", "Dense undergrowth and damp mountain forest around Puracé; a different habitat from the exposed high páramo.", [purace]),
      selection("andean-motmot", "Wooded slopes and forest edges in the Puracé landscape and the lower, warmer parts of the southern mountain system.", [purace]),
    ],
  },
]
