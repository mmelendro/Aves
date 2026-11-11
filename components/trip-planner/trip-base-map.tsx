import {
  tripAreas,
  tripAreaById,
  placesAt,
} from "@/lib/south-island-trip-planner";
import { ecosystemMapPoint } from "@/lib/ecosystem-map-camera";
import geography from "@/content/south-island-ecosystem-map.json";
import { external } from "./presentation";

/** Broad area selection and schematic base order; deliberately not a road map. */
export default function TripBaseMap({
  areaId,
  activeBases,
  onSelect,
}: {
  areaId: string;
  activeBases: string[];
  onSelect: (id: string) => void;
}) {
  return (
    <div className="min-w-0 rounded-3xl border border-emerald-200 bg-white p-4">
      <h3 className="font-semibold text-emerald-950">Choose a planning base</h3>
      <p className="mt-2 text-xs leading-6 text-gray-600">
        Markers represent broad areas, not property entrances. Route lines show
        the order of bases, not roads.
      </p>
      <svg
        viewBox="0 0 480 640"
        role="group"
        aria-label="South Island planning bases"
        className="mx-auto block max-h-[29rem] w-full"
      >
        <path d={geography.outline} fill="#ecf4ed" stroke="#9bb8a7" />
        {activeBases.length > 1 && (
          <polyline
            points={activeBases
              .map((base) => {
                const a = tripAreaById.get(base)!,
                  p = ecosystemMapPoint(
                    a.longitude,
                    a.latitude,
                    geography.bbox,
                  );
                return `${p.x},${p.y}`;
              })
              .join(" ")}
            fill="none"
            stroke="#0369a1"
            strokeDasharray="7 5"
            strokeWidth="3"
          />
        )}
        {tripAreas.map((a, i) => {
          const p = ecosystemMapPoint(a.longitude, a.latitude, geography.bbox),
            selected = areaId === a.id || activeBases.includes(a.id);
          return (
            <g
              key={a.id}
              role="button"
              tabIndex={0}
              aria-label={`Plan around ${a.name}`}
              aria-pressed={areaId === a.id}
              onClick={() => onSelect(a.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(a.id);
                }
              }}
              className="cursor-pointer outline-none [&:focus-visible>circle]:stroke-blue-700"
            >
              <circle
                cx={p.x}
                cy={p.y}
                r="21"
                fill={selected ? "#065f46" : "white"}
                stroke="#047857"
                strokeWidth="2"
              />
              <text
                x={p.x}
                y={p.y + 5}
                textAnchor="middle"
                fontSize="14"
                fontWeight="600"
                fill={selected ? "white" : "#065f46"}
                pointerEvents="none"
              >
                {i + 1}
              </text>
              <title>
                {a.name}: {placesAt(a.id).length} references
              </title>
            </g>
          );
        })}
      </svg>
      <div className="grid grid-cols-2 gap-1 text-xs">
        {tripAreas.map((a, i) => (
          <button
            type="button"
            key={a.id}
            className="min-h-11 rounded-lg px-2 text-left text-emerald-900 hover:bg-emerald-50"
            onClick={() => onSelect(a.id)}
          >
            {i + 1}. {a.name}
          </button>
        ))}
      </div>
      <p className="mt-2 text-[10px] leading-5 text-gray-600">
        Outline:{" "}
        <a
          className="underline"
          href={geography.source.coastlineUrl}
          {...external}
        >
          Natural Earth (public domain)
        </a>
        . Area reference sources are linked with the accommodation searches
        below. © OpenStreetMap contributors where used;{" "}
        <a
          href="https://www.openstreetmap.org/copyright"
          {...external}
          className="underline"
        >
          ODbL
        </a>
        .
      </p>
    </div>
  );
}
