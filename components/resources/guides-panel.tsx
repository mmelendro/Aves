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
import { BookOpen, ExternalLink, Globe, Award, TrendingUp } from "lucide-react";

export default function GuidesResourcesPanel() {
  return (
    <TabsContent value="guides" className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Colombia.travel Official Guide */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold">
                    Essential Guide to Bird Watching in Colombia
                  </h3>
                  <Award className="w-4 h-4 text-yellow-500" />
                </div>
                <p className="text-sm text-gray-500 mb-2">
                  Colombia.travel • Official Tourism Guide
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  The official comprehensive guide covering Colombia's best
                  birding sites, seasonal timing, and practical travel
                  information.
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline" className="text-xs">
                    Official
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Comprehensive
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Free
                  </Badge>
                </div>
                <Button
                  asChild
                  size="sm"
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                >
                  <a
                    href="https://colombia.travel/en/blog/your-essential-guide-bird-watching-and-bird-sites-in-colombia"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Read Official Guide
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Birds of Colombia Database */}
        <Card id="species-database">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-20 bg-black rounded-lg flex items-center justify-center flex-shrink-0 p-2">
                <Image
                  src="/images/logos/birds-of-colombia-logo.png"
                  alt="Birds of Colombia"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">Birds of Colombia</h3>
                <p className="text-sm text-gray-500 mb-2">
                  Comprehensive Species Database
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  The most complete online resource for Colombian birds,
                  featuring detailed species information, photos, sounds, and
                  distribution maps.
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline" className="text-xs">
                    1,900+ Species
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Photos & Sounds
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Maps
                  </Badge>
                </div>
                <Button
                  asChild
                  size="sm"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <a
                    href="https://birdsofcolombia.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Explore Species Database
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* McMullan Birding Field Guides */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">
                  McMullan Birding Field Guides
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                  Professional Field Guide Collection
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Comprehensive collection of professional field guides and
                  birding books, including specialized guides for Colombian
                  birds and Neotropical species.
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline" className="text-xs">
                    Field Guides
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Professional
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Neotropical
                  </Badge>
                </div>
                <Button
                  asChild
                  size="sm"
                  className="w-full bg-amber-600 hover:bg-amber-700"
                >
                  <a
                    href="https://mcmullanbirding.com/libros/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Browse Field Guide Collection
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interactive Tools */}
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              Interactive Exploration Tools
            </CardTitle>
            <CardDescription>
              Discover Colombia's incredible biodiversity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="border-purple-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">🦅</span>
                    <div>
                      <h4 className="font-semibold">Avifauna Explorer</h4>
                      <p className="text-sm text-gray-600">
                        1,900+ Colombian bird species
                      </p>
                    </div>
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full bg-transparent"
                  >
                    <a href="/avifauna-explorer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Explore Species
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-purple-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">🗺️</span>
                    <div>
                      <h4 className="font-semibold">Interactive Bioregions</h4>
                      <p className="text-sm text-gray-600">
                        Explore Colombia's ecosystems
                      </p>
                    </div>
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full bg-transparent"
                  >
                    <a href="/bioregions">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Explore Regions
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  );
}
