"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TabsContent } from "@/components/ui/tabs";
import Image from "next/image";
import { BrandBird } from "@/components/brand-bird";
import { ExternalLink, Globe, Leaf, Star, Award, Heart } from "lucide-react";

export default function ConservationResourcesPanel() {
  return (
    <TabsContent value="conservation" className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Audubon Conservation */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-20 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0 p-2">
                <Image
                  src="/images/logos/audubon-logo.png"
                  alt="National Audubon Society"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold">Colombia Conservation</h3>
                  <Award className="w-4 h-4 text-yellow-500" />
                </div>
                <p className="text-sm text-gray-500 mb-2">
                  National Audubon Society
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Learn about Audubon's conservation work in Colombia, including
                  habitat protection, community engagement, and sustainable
                  ecotourism initiatives.
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline" className="text-xs">
                    Conservation
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Habitat Protection
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Community
                  </Badge>
                </div>
                <Button
                  asChild
                  size="sm"
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <a
                    href="https://www.audubon.org/conservation/americas/ecotourism/colombia"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Learn About Conservation
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AVES Conservation Impact */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-20 bg-white rounded-lg flex items-center justify-center flex-shrink-0 p-2 border">
                <BrandBird
                  country="colombia"
                  size={48}
                  className="object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">AVES Conservation Impact</h3>
                <p className="text-sm text-gray-500 mb-2">
                  Our Commitment to Colombia
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Discover how AVES tours directly support local communities,
                  habitat conservation, and scientific research while providing
                  unforgettable birding experiences.
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline" className="text-xs">
                    Local Impact
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Research Support
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    B Corp
                  </Badge>
                </div>
                <Button
                  asChild
                  size="sm"
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                >
                  <a href="/conservation">
                    <Leaf className="w-4 h-4 mr-2" />
                    See Our Impact
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conservation Videos */}
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-purple-600" />
              Conservation Stories & Impact
            </CardTitle>
            <CardDescription>
              Understanding Colombia's conservation efforts and biodiversity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Birdwatching with FARC | National Geographic */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-4 h-4 text-blue-600" />
                  <h4 className="font-semibold">
                    Birdwatching with FARC | National Geographic
                  </h4>
                </div>
                <div className="aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/ZF9rfNphh5I?start=26"
                    title="Birdwatching with FARC | National Geographic"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="rounded-lg"
                  />
                </div>
                <div className="flex gap-2">
                  <Badge variant="secondary">National Geographic</Badge>
                  <Badge variant="secondary">Peace Process</Badge>
                  <Badge variant="secondary">Conservation</Badge>
                </div>
                <p className="text-sm text-gray-600">
                  A powerful National Geographic documentary exploring how
                  Colombia's peace process has opened new opportunities for
                  conservation and birdwatching, featuring former FARC members
                  who now protect biodiversity in previously inaccessible
                  regions.
                </p>
              </div>

              {/* The Importance of Avitourism for Conservation */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-4 h-4 text-red-600" />
                  <h4 className="font-semibold">
                    The Importance of Avitourism for Conservation
                  </h4>
                </div>
                <div className="aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/ONDXPGaDN40?start=114"
                    title="The Importance of Avitourism for Conservation – Bird Watching Colombia"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="rounded-lg"
                  />
                </div>
                <div className="flex gap-2">
                  <Badge variant="secondary">Avitourism</Badge>
                  <Badge variant="secondary">Conservation Impact</Badge>
                  <Badge variant="secondary">Sustainable Tourism</Badge>
                </div>
                <p className="text-sm text-gray-600">
                  Discover how bird watching tourism creates powerful economic
                  incentives for conservation in Colombia, directly supporting
                  local communities while protecting critical habitats and
                  endangered species through sustainable ecotourism practices.
                </p>
              </div>

              {/* The case for a birdwatching vacation | TEDx */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-purple-600" />
                  <h4 className="font-semibold">
                    The Case for a Birdwatching Vacation
                  </h4>
                </div>
                <div className="aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/DVBDf0rYYbQ"
                    title="The case for a birdwatching vacation | Natalia Ocampo-Peñuela | TEDxSantaCruz"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="rounded-lg"
                  />
                </div>
                <div className="flex gap-2">
                  <Badge variant="secondary">TEDx Talk</Badge>
                  <Badge variant="secondary">Travel Benefits</Badge>
                  <Badge variant="secondary">Conservation Science</Badge>
                </div>
                <p className="text-sm text-gray-600">
                  Conservation scientist Natalia Ocampo-Peñuela presents a
                  compelling TEDx talk on why birdwatching vacations offer
                  unique benefits for both travelers and conservation. Discover
                  how birding tourism creates meaningful connections with nature
                  while supporting scientific research and local communities.
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Leaf className="w-5 h-5 text-green-600" />
                <h4 className="font-semibold text-green-900">
                  Conservation Through Ecotourism
                </h4>
              </div>
              <p className="text-sm text-green-800 mb-3">
                These videos highlight how responsible birding and ecotourism
                directly contribute to conservation efforts, community
                development, and habitat protection in Colombia.
              </p>
              <Button
                asChild
                size="sm"
                className="bg-green-600 hover:bg-green-700"
              >
                <a href="/conservation">
                  <Heart className="w-4 h-4 mr-2" />
                  Learn About Our Conservation Impact
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  );
}
