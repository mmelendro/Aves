const partners = [
  {
    id: "proaves",
    name: "ProAves",
    type: "Conservation Organization",
    location: "Colombia",
    description:
      "Colombia's leading conservation organization dedicated to protecting birds and their habitats. ProAves manages numerous reserves across the country, offering exceptional birding experiences.",
    specialties: ["Bird Conservation", "Habitat Preservation", "Ecotourism", "Research"],
    website: "https://proaves.org",
    contact: "info@proaves.org",
    established: "1998",
    area: "Varies by reserve",
    elevation: "Varies by reserve",
    highlights: [
      "El Dorado Bird Reserve",
      "Reinita Cielo Azul Reserve",
      "ProAves Ecotours",
      "Scientific Research Opportunities",
    ],
  },
  {
    id: "termales-del-ruiz",
    name: "Termales del Ruiz",
    type: "Ecotourism Lodge & Reserve",
    location: "Manizales, Caldas",
    description:
      "A renowned ecotourism destination in the Central Andes, famous for its hummingbird feeders and paramo ecosystem. Termales del Ruiz offers comfortable lodging and excellent birdwatching opportunities.",
    specialties: ["Hummingbird Photography", "Paramo Birding", "Thermal Baths", "Andean Scenery"],
    website: "https://termalesdelruiz.com",
    contact: "info@termalesdelruiz.com",
    established: "1984",
    area: "Varies",
    elevation: "3,400m",
    highlights: ["Sword-billed Hummingbird", "Buff-winged Starfrontlet", "Hot Springs", "Andean Condor sightings"],
  },
  {
    id: "montezuma",
    name: "Montezuma Rainforest Lodge",
    type: "Ecolodge",
    location: "El Cairo, Valle del Cauca",
    description:
      "Nestled in the heart of the Chocó rainforest, Montezuma Ecolodge provides access to some of the most biodiverse habitats in the world. Expect incredible birding and wildlife viewing.",
    specialties: ["Chocó Endemics", "Rainforest Birding", "Wildlife Observation", "Hiking"],
    website: "https://montezumalodge.com",
    contact: "info@montezumalodge.com",
    established: "2005",
    area: "Private Reserve",
    elevation: "1,300-1,800m",
    highlights: ["Goldringed Tanager", "Chocó Toucan", "Spectacled Bear", "Howler Monkeys"],
  },
  {
    id: "reserva-rio-blanco",
    name: "Reserva Río Blanco",
    type: "Cloud Forest Reserve",
    location: "Manizales, Caldas",
    description:
      "A pristine cloud forest reserve in the Central Andes, home to spectacular endemic birds including the Chestnut-crowned Antpitta and Black-billed Mountain-Toucan. This protected area offers exceptional birding opportunities in montane ecosystems.",
    specialties: ["Chestnut-crowned Antpitta", "Black-billed Mountain-Toucan", "Andean Motmot", "Cloud forest species"],
    website: "https://reservarioblanco.com",
    contact: "info@reservarioblanco.com",
    established: "1985",
    area: "4,932 hectares",
    elevation: "2,150-2,800m",
    highlights: [
      "Endemic bird photography opportunities",
      "Guided cloud forest walks",
      "Research station facilities",
      "Conservation education programs",
    ],
  },
]

const PartnerCard = ({ partner }) => {
  return (
    <div id={partner.id} className="bg-white rounded-lg shadow-md p-6 mb-4">
      <h3 className="text-xl font-semibold mb-2">{partner.name}</h3>
      <p className="text-gray-600 mb-2">
        {partner.type} - {partner.location}
      </p>
      <p className="text-gray-700 mb-4">{partner.description}</p>
      <h4 className="text-lg font-semibold mb-1">Specialties:</h4>
      <ul className="list-disc list-inside text-gray-700 mb-4">
        {partner.specialties.map((specialty, index) => (
          <li key={index}>{specialty}</li>
        ))}
      </ul>
      <p className="text-gray-600 mb-1">
        Website:{" "}
        <a href={partner.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
          {partner.website}
        </a>
      </p>
      <p className="text-gray-600 mb-1">Contact: {partner.contact}</p>
      <p className="text-gray-600 mb-1">Established: {partner.established}</p>
      <p className="text-gray-600 mb-4">
        Area: {partner.area} - Elevation: {partner.elevation}
      </p>
      <h4 className="text-lg font-semibold mb-1">Highlights:</h4>
      <ul className="list-disc list-inside text-gray-700">
        {partner.highlights.map((highlight, index) => (
          <li key={index}>{highlight}</li>
        ))}
      </ul>
    </div>
  )
}

const PartnersPage = () => {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Our Valued Partners</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map((partner) => (
          <PartnerCard key={partner.id} partner={partner} />
        ))}
      </div>
    </div>
  )
}

export default PartnersPage
