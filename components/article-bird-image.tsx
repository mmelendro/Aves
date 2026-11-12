"use client";

/** Credited article photograph and its existing interactive disclosures. */
import { Badge } from "@/components/ui/badge";
import {
  Camera,
  ArrowRight,
  Info,
  Users,
  ExternalLink,
  Globe,
  TreePine,
  Shield,
  Home,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

interface EnhancedBirdImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  photographer: string;
  guide: string;
  guideLink: string;
  location: string;
  locationLink: string;
  species: {
    commonName: string;
    spanishName?: string;
    scientificName: string;
    conservation?: string;
  };
  ebirdUrl: string;
  regions: string[];
  ecosystems: string[];
  className?: string;
  aspectRatio?: string;
  imagePosition?: string;
}

export default function EnhancedBirdImage({
  src,
  alt,
  width,
  height,
  photographer,
  guide,
  guideLink,
  location,
  locationLink,
  species,
  ebirdUrl,
  regions,
  ecosystems,
  className = "",
  aspectRatio = "4/3",
  imagePosition = "center",
}: EnhancedBirdImageProps) {
  const [showOverlay, setShowOverlay] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showCredit, setShowCredit] = useState(false);

  return (
    <div
      className={`relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 ${className}`}
      style={{ aspectRatio }}
      onMouseEnter={() => setShowOverlay(true)}
      onMouseLeave={() => setShowOverlay(false)}
    >
      {/* Enhanced Image with Wildlife Photography Effects */}
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
        style={{
          filter:
            "contrast(1.15) saturate(1.3) brightness(1.08) sharpness(1.2)",
          objectPosition: imagePosition,
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Interactive Buttons */}
      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 group-focus-within:translate-y-0">
        {/* Camera Credit Toggle Button */}
        <Button
          variant="ghost"
          size="sm"
          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-0 rounded-full p-2 transition-all duration-200 hover:scale-110"
          aria-label="Toggle photo credit"
          onClick={() => setShowCredit(!showCredit)}
        >
          <Camera className="w-4 h-4" />
        </Button>

        {/* More Info Button */}
        <Button
          variant="ghost"
          size="sm"
          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-0 rounded-full p-2 transition-all duration-200 hover:scale-110"
          aria-label="Toggle photo information"
          onClick={() => setShowInfo(!showInfo)}
        >
          <Info className="w-4 h-4" />
        </Button>
      </div>

      {/* Sliding Info Overlay */}
      <div
        className={`absolute inset-0 bg-black/90 backdrop-blur-sm transition-all duration-500 ease-in-out ${
          showInfo ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header with species name - only show when info is displayed */}
          <div className="p-4 border-b border-white/20">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">
                  {species.commonName}
                </h3>
                {species.spanishName && (
                  <p className="text-emerald-300 text-sm font-medium">
                    {species.spanishName}
                  </p>
                )}
                <p className="text-white/80 text-sm italic">
                  {species.scientificName}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 rounded-full p-2"
                onClick={() => setShowInfo(false)}
              >
                ×
              </Button>
            </div>
          </div>

          {/* Scrollable Content */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4 text-white">
              {/* eBird Link - Direct link without code display */}
              <Link
                href={ebirdUrl}
                target="_blank"
                className="flex items-center gap-3 p-3 bg-emerald-600/20 hover:bg-emerald-600/30 rounded-lg transition-colors group"
              >
                <div className="bg-emerald-500/30 p-2 rounded-full">
                  <ExternalLink className="w-5 h-5 text-emerald-300" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-emerald-200">View on eBird</p>
                  <p className="text-sm text-emerald-300">
                    Complete species profile & sounds
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-300 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Geographic Regions with emoji icons */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-blue-300 font-medium">
                  <Globe className="w-4 h-4" />
                  🌍 Geographic Distribution
                </div>
                <div className="grid gap-2">
                  {regions.map((region, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2 bg-blue-600/20 rounded-md"
                    >
                      <span className="text-lg">📍</span>
                      <span className="text-sm text-blue-200">{region}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ecosystems with nature emojis */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-green-300 font-medium">
                  <TreePine className="w-4 h-4" />
                  🌿 Natural Habitats
                </div>
                <div className="grid gap-2">
                  {ecosystems.map((ecosystem, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2 bg-green-600/20 rounded-md"
                    >
                      <span className="text-lg">
                        {ecosystem.includes("forest")
                          ? "🌲"
                          : ecosystem.includes("scrub")
                            ? "🌵"
                            : ecosystem.includes("canopy")
                              ? "🌳"
                              : ecosystem.includes("desert")
                                ? "🏜️"
                                : "🌱"}
                      </span>
                      <span className="text-sm text-green-200">
                        {ecosystem}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conservation Status with shield emoji */}
              {species.conservation && (
                <div className="p-3 bg-amber-600/20 border border-amber-500/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-amber-300" />
                    <span className="text-sm text-amber-300 font-medium">
                      🛡️ Conservation Status
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">
                      {species.conservation.includes("Critically")
                        ? "🔴"
                        : species.conservation.includes("Endangered")
                          ? "🟠"
                          : species.conservation.includes("Threatened")
                            ? "🟡"
                            : "🟢"}
                    </span>
                    <p className="font-medium text-amber-200">
                      {species.conservation}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Toggleable Photo Credit Overlay */}
      <div
        className={`absolute top-16 right-4 bg-black/80 backdrop-blur-sm text-white p-3 rounded-lg text-xs transition-all duration-300 max-w-xs ${
          showCredit && showOverlay && !showInfo
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Camera className="w-3 h-3 text-blue-300" />
            <span className="font-medium text-blue-200">
              Photo by {photographer}
            </span>
          </div>
          {guide && (
            <div className="flex items-center gap-2">
              <Users className="w-3 h-3 text-emerald-300" />
              <span className="text-emerald-200">
                Guide:{" "}
                <Link
                  href={guideLink}
                  className="hover:text-emerald-100 transition-colors underline"
                >
                  {guide}
                </Link>
              </span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Home className="w-3 h-3 text-amber-300" />
            <span className="text-amber-200">
              Location:{" "}
              <Link
                href={locationLink}
                className="hover:text-amber-100 transition-colors underline"
              >
                {location}
              </Link>
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Info Bar - Hidden when info overlay is shown */}
      {!showInfo && (
        <div
          className={`absolute bottom-0 left-0 right-0 text-white transition-all duration-300 ${
            showOverlay
              ? "translate-y-0 opacity-100"
              : "translate-y-2 opacity-90"
          }`}
        >
          <div className="backdrop-blur-md bg-black/70 rounded-lg px-2 py-1 mx-1 mb-1 border border-white/20">
            <h3 className="font-medium text-sm text-white drop-shadow-lg leading-none">
              {species.commonName}
            </h3>
            {species.spanishName && (
              <p className="text-emerald-200 text-xs font-medium drop-shadow-md leading-none">
                {species.spanishName}
              </p>
            )}
            <p className="text-xs text-white/95 italic drop-shadow-md leading-none">
              {species.scientificName}
            </p>
            {species.conservation && (
              <Badge className="mt-0.5 bg-amber-500/90 text-white hover:bg-amber-500 backdrop-blur-sm text-xs border border-amber-400/50 px-1.5 py-0 leading-none h-3.5 inline-block">
                {species.conservation}
              </Badge>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
