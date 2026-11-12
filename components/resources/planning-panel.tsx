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
  ExternalLink,
  MapPin,
  Globe,
  Leaf,
  Mountain,
  Download,
  CheckCircle,
} from "lucide-react";

export default function PlanningResourcesPanel() {
  return (
    <TabsContent value="planning" className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Official Audubon Trails */}
        <Card className="col-span-full" id="audubon-trails">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center p-1">
                <Image
                  src="/images/logos/audubon-logo.png"
                  alt="National Audubon Society"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div>
                <CardTitle className="text-xl">
                  Official Audubon Birding Trails
                </CardTitle>
                <CardDescription>
                  Comprehensive regional guides and itineraries
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-teal-200">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">Northern Colombia</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Caribbean coast & Sierra Nevada
                  </p>
                  <div className="flex gap-1 mb-3">
                    <Badge variant="outline" className="text-xs">
                      Caribbean
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Endemic
                    </Badge>
                  </div>
                  <Button
                    asChild
                    size="sm"
                    className="w-full bg-teal-600 hover:bg-teal-700"
                  >
                    <a
                      href="https://nas-national-prod.s3.amazonaws.com/ncbt_final_0.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-teal-200">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">Central Andes</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Cloud forests & high altitude
                  </p>
                  <div className="flex gap-1 mb-3">
                    <Badge variant="outline" className="text-xs">
                      Cloud Forest
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Manizales
                    </Badge>
                  </div>
                  <Button
                    asChild
                    size="sm"
                    className="w-full bg-teal-600 hover:bg-teal-700"
                  >
                    <a
                      href="https://nas-national-prod.s3.amazonaws.com/central_andes_itinerary.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-teal-200">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">Eastern Andes</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Páramo ecosystems & Bogotá
                  </p>
                  <div className="flex gap-1 mb-3">
                    <Badge variant="outline" className="text-xs">
                      Páramo
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Bogotá
                    </Badge>
                  </div>
                  <Button
                    asChild
                    size="sm"
                    className="w-full bg-teal-600 hover:bg-teal-700"
                  >
                    <a
                      href="https://nas-national-prod.s3.amazonaws.com/eastern_andes_birding_trail.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-teal-200">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">Southwestern Andes</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Chocó endemics & Pacific slope
                  </p>
                  <div className="flex gap-1 mb-3">
                    <Badge variant="outline" className="text-xs">
                      Chocó
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Pacific
                    </Badge>
                  </div>
                  <Button
                    asChild
                    size="sm"
                    className="w-full bg-teal-600 hover:bg-teal-700"
                  >
                    <a
                      href="https://nas-national-prod.s3.amazonaws.com/southwestern_andes_birding_trail.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Trip Preparation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-orange-600" />
              Trip Preparation Guide
            </CardTitle>
            <CardDescription>
              Expert preparation advice from The Birder's Show
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Comprehensive preparation guide covering equipment, timing, and
              expectations for your Colombian birding adventure.
            </p>
            <ul className="space-y-2 text-sm mb-4">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Essential equipment checklist
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Best timing for different regions
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Photography and recording tips
              </li>
            </ul>
            <Button
              asChild
              className="w-full bg-orange-600 hover:bg-orange-700"
            >
              <a
                href="https://thebirdersshow.com/blog/how-to-prepare-for-a-birding-trip-to-colombia"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Read Preparation Guide
              </a>
            </Button>
          </CardContent>
        </Card>

        {/* Regional Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mountain className="w-5 h-5 text-green-600" />
              Regional Birding Information
            </CardTitle>
            <CardDescription>
              Climate, timing & species highlights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Colombia's diverse geography creates distinct birding regions,
              each with unique species and optimal visiting times.
            </p>
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                <Mountain className="w-4 h-4 text-green-600" />
                <span className="text-sm">
                  Andean cloud forests (2,000-3,500m)
                </span>
              </div>
              <div className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                <Globe className="w-4 h-4 text-blue-600" />
                <span className="text-sm">Caribbean coastal lowlands</span>
              </div>
              <div className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                <Leaf className="w-4 h-4 text-emerald-600" />
                <span className="text-sm">Pacific slope rainforests</span>
              </div>
            </div>
            <Button asChild variant="outline" className="w-full bg-transparent">
              <a href="/tours">
                <MapPin className="w-4 h-4 mr-2" />
                Explore Our Regional Tours
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  );
}
