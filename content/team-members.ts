/** Published editorial records, separated from their page layout. */
import { Globe } from "lucide-react";

export const teamMembers = [
  {
    id: "martin-melendro",
    name: "Martín Melendro",
    role: "Developing AVES",
    badge: "AVES",
    badgeColor: "bg-emerald-100 text-emerald-800",
    roleColor: "text-emerald-600",
    image: "/images/martin-melendro.jpg",
    alt: "Martín Melendro",
    bio: "Martín Melendro is developing AVES, bringing together his interests in birdlife, nature and thoughtful travel.",
    expertise: [],
    details: [],
    links: [
      {
        icon: Globe,
        text: "View eBird Profile",
        url: "https://ebird.org/profile/NDc2OTE5OA",
        color: "text-emerald-600 hover:text-emerald-700",
      },
    ],
  },
];
