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
import {
  Headphones,
  Play,
  ExternalLink,
  Languages,
  Camera,
  Video,
  Coffee,
  TreePine,
} from "lucide-react";

export default function LearningResourcesPanel() {
  return (
    <TabsContent value="learning" className="space-y-6">
      <div className="space-y-8">
        {/* Expert Podcasts Section */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* English Podcasts */}
          <Card id="podcasts-section">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Headphones className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <CardTitle>Expert Birding Podcasts</CardTitle>
                  <CardDescription>
                    English-language expert interviews
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Image
                      src="/images/logos/american-birding-podcast-logo.jpeg"
                      alt="American Birding Podcast"
                      width={32}
                      height={32}
                      className="rounded"
                    />
                    <div>
                      <h4 className="font-semibold text-sm">
                        Birding Means Business in Colombia
                      </h4>
                      <p className="text-xs text-gray-500">
                        American Birding Podcast
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-2">
                    <Badge variant="outline" className="text-xs">
                      Business
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Tourism
                    </Badge>
                  </div>
                  <iframe
                    allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                    frameBorder="0"
                    height="120"
                    style={{
                      width: "100%",
                      overflow: "hidden",
                      borderRadius: "6px",
                    }}
                    sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                    src="https://embed.podcasts.apple.com/us/podcast/03-06-birding-means-business-in-colombia-with-john-myers/id1186824033?i=1000432701676"
                  />
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Image
                      src="/images/logos/life-list-logo.png"
                      alt="Life List Podcast"
                      width={32}
                      height={32}
                      className="rounded"
                    />
                    <div>
                      <h4 className="font-semibold text-sm">
                        Evolution of Birding in Colombia
                      </h4>
                      <p className="text-xs text-gray-500">Life List Podcast</p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-2">
                    <Badge variant="outline" className="text-xs">
                      Evolution
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Local Experts
                    </Badge>
                  </div>
                  <iframe
                    allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                    frameBorder="0"
                    height="120"
                    style={{
                      width: "100%",
                      overflow: "hidden",
                      borderRadius: "6px",
                    }}
                    sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                    src="https://embed.podcasts.apple.com/us/podcast/the-evolution-of-birding-in-colombia-with-diego-calderon/id1578168978?i=1000567878189"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Spanish Podcasts */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Languages className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <CardTitle>Aves de Colombia Podcast</CardTitle>
                  <CardDescription>🇨🇴 Contenido en Español</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Image
                      src="/images/logos/aves-de-colombia-podcast-logo.png"
                      alt="Aves de Colombia"
                      width={32}
                      height={32}
                      className="rounded"
                    />
                    <div>
                      <h4 className="font-semibold text-sm">
                        AVES DE COLOMBIA - Episodio 1
                      </h4>
                      <p className="text-xs text-gray-500">
                        Temporada 1 • Episodio Inaugural
                      </p>
                    </div>
                  </div>
                  <iframe
                    src="https://widget.spreaker.com/player?episode_id=18463946&theme=light&chapters-image=true"
                    width="100%"
                    height="120px"
                    title="AVES DE COLOMBIA Episodio 1"
                    frameBorder="0"
                    className="rounded"
                  />
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Image
                      src="/images/logos/aves-de-colombia-podcast-logo.png"
                      alt="Aves de Colombia"
                      width={32}
                      height={32}
                      className="rounded"
                    />
                    <div>
                      <h4 className="font-semibold text-sm">
                        Las aves imitadoras
                      </h4>
                      <p className="text-xs text-gray-500">
                        Temporada 2 • Primer Episodio
                      </p>
                    </div>
                  </div>
                  <iframe
                    src="https://widget.spreaker.com/player?episode_id=53195666&theme=light&chapters-image=true"
                    width="100%"
                    height="120px"
                    title="Las aves imitadoras"
                    frameBorder="0"
                    className="rounded"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Video Learning Resources - Consolidated Section */}
        <Card id="video-series">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-1 border">
                <Image
                  src="/images/logos/birders-show-full-logo.png"
                  alt="The Birders Show"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div>
                <CardTitle>The Birding Show - Complete Video Series</CardTitle>
                <CardDescription>
                  Expert birding content and field guides from Colombia
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Toucan and Hummingbird Heaven */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Play className="w-4 h-4 text-emerald-600" />
                  <h4 className="font-semibold">
                    Toucan and Hummingbird Heaven
                  </h4>
                </div>
                <div className="aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/y-qMGrpnQO8?si=3jyrBuUjJCDhyMIg"
                    title="Toucan and Hummingbird Heaven | Caldas, Colombia | Field Guides"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="rounded-lg"
                  />
                </div>
                <div className="flex gap-2">
                  <Badge variant="secondary">Caldas</Badge>
                  <Badge variant="secondary">Toucans</Badge>
                  <Badge variant="secondary">Hummingbirds</Badge>
                </div>
                <p className="text-sm text-gray-600">
                  Explore the incredible diversity of toucans and hummingbirds
                  in Colombia's coffee region.
                </p>
              </div>

              {/* Colombia's Coolest Hummingbird */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Camera className="w-4 h-4 text-blue-600" />
                  <h4 className="font-semibold">
                    Colombia's Coolest Hummingbird?
                  </h4>
                </div>
                <div className="aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/_oT3ECFNaMI?si=oJwg7Kg7t-tuw_JH"
                    title="Is This Colombia's Coolest Hummingbird? | Caldas, Colombia | Field Guides"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="rounded-lg"
                  />
                </div>
                <div className="flex gap-2">
                  <Badge variant="secondary">Caldas</Badge>
                  <Badge variant="secondary">Endemic</Badge>
                  <Badge variant="secondary">Hummingbird</Badge>
                </div>
                <p className="text-sm text-gray-600">
                  Discover one of Colombia's most spectacular hummingbird
                  species in the cloud forests.
                </p>
              </div>

              {/* Coffee Region Birding */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Coffee className="w-4 h-4 text-amber-600" />
                  <h4 className="font-semibold">
                    Birding in the Coffee Region
                  </h4>
                </div>
                <div className="aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/OfimHCHfd2c?si=XQ5h1iXDlsvAl8GK"
                    title="Birding in the Coffee Region | Caldas, Colombia | Field Guides"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="rounded-lg"
                  />
                </div>
                <div className="flex gap-2">
                  <Badge variant="secondary">Coffee Region</Badge>
                  <Badge variant="secondary">Multi-Species</Badge>
                  <Badge variant="secondary">Expert Guides</Badge>
                </div>
                <p className="text-sm text-gray-600">
                  Complete guide to birding in Colombia's famous coffee-growing
                  region of Caldas.
                </p>
              </div>

              {/* Pacific Jungle Adventure */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <TreePine className="w-4 h-4 text-green-600" />
                  <h4 className="font-semibold">
                    Pacific Jungle Birding Adventure
                  </h4>
                </div>
                <div className="aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/zy-gTRyJLiM?si=eT4GlQecKYfrmMSu"
                    title="Birding Adventures in Colombia's Pacific Jungle | Valle del Cauca, Colombia | Field Guides"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="rounded-lg"
                  />
                </div>
                <div className="flex gap-2">
                  <Badge variant="secondary">Pacific Coast</Badge>
                  <Badge variant="secondary">Valle del Cauca</Badge>
                  <Badge variant="secondary">Rainforest</Badge>
                </div>
                <p className="text-sm text-gray-600">
                  Adventure through Colombia's biodiverse Pacific jungle and its
                  incredible bird life.
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Video className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-blue-900">
                  Complete Video Series
                </h4>
              </div>
              <p className="text-sm text-blue-800 mb-3">
                These four episodes provide comprehensive coverage of Colombia's
                most important birding regions, from the coffee-growing
                highlands to the Pacific rainforests.
              </p>
              <Button
                asChild
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
              >
                <a
                  href="https://thebirdersshow.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Visit The Birding Show Channel
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  );
}
