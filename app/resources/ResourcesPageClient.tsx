/** Resource sections share controlled tabs so shortcuts do not depend on Radix DOM internals. */
"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { NavigationHeader } from "@/components/navigation-header";
import { Footer } from "@/components/footer";
import { BookOpen, MapPin, Users, Leaf, Bird, Star, Video } from "lucide-react";
import PlanningResourcesPanel from "@/components/resources/planning-panel";
import LearningResourcesPanel from "@/components/resources/learning-panel";
import GuidesResourcesPanel from "@/components/resources/guides-panel";
import ConservationResourcesPanel from "@/components/resources/conservation-panel";

export default function ResourcesPageClient() {
  const [tab, setTab] = useState("planning");
  const [destination, setDestination] = useState<string | null>(null);
  function showSection(nextTab: string, section: string) {
    setTab(nextTab);
    setDestination(section);
  }
  useEffect(() => {
    if (!destination) return;
    // Radix mounts the selected panel before this effect runs. No timer or simulated click is needed.
    document
      .getElementById(destination)
      ?.scrollIntoView({ behavior: "smooth" });
    setDestination(null);
  }, [tab, destination]);
  return (
    <div className="min-h-screen bg-white">
      <NavigationHeader currentPage="/resources" />
      <main id="main-content" tabIndex={-1}>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-emerald-100 p-4 rounded-full">
                  <BookOpen className="w-12 h-12 text-emerald-600" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
                Expert Resources Hub
              </h1>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                Your comprehensive birding resource center. From expert podcasts
                to official guides, preparation tips, and conservation
                insights—everything you need for your Colombian birding
                adventure.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <button
                  onClick={() => showSection("learning", "podcasts-section")}
                  className="bg-white rounded-lg p-4 shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="text-2xl font-bold text-emerald-600">15+</div>
                  <div className="text-sm text-gray-600">Expert Podcasts</div>
                </button>
                <button
                  onClick={() => showSection("planning", "audubon-trails")}
                  className="bg-white rounded-lg p-4 shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="text-2xl font-bold text-blue-600">4</div>
                  <div className="text-sm text-gray-600">Official Trails</div>
                </button>
                <button
                  onClick={() => showSection("guides", "resources")}
                  className="bg-white rounded-lg p-4 shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="text-2xl font-bold text-purple-600">7+</div>
                  <div className="text-sm text-gray-600">Video Guides</div>
                </button>
                <button
                  onClick={() => (window.location.href = "/avifauna-explorer")}
                  className="bg-white rounded-lg p-4 shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="text-2xl font-bold text-orange-600">
                    1,900+
                  </div>
                  <div className="text-sm text-gray-600">Bird Species</div>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" asChild>
                  <a href="#resources">
                    <Bird className="w-5 h-5 mr-2" />
                    Explore Resources
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="/contact">
                    <Users className="w-5 h-5 mr-2" />
                    Contact Our Experts
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Quote */}
        <section className="py-8 bg-emerald-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-4">
                <Star className="w-8 h-8 text-emerald-600" />
              </div>
              <p className="text-2xl md:text-3xl font-light text-gray-800 mb-4">
                Explore Colombia through its birds, places and the people who
                study them.
              </p>
              <p className="text-gray-600">
                Independent resources to inform your reading and trip ideas.
                Follow each publisher's original link for context.
              </p>
            </div>
          </div>
        </section>

        {/* Main Resources Section with Tabs */}
        <section id="resources" className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Comprehensive Resource Library
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                  Explore our curated collection of expert resources, organized
                  by your birding journey stage.
                </p>
              </div>

              <Tabs value={tab} onValueChange={setTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
                  <TabsTrigger
                    value="planning"
                    className="flex items-center gap-2"
                  >
                    <MapPin className="w-4 h-4" />
                    <span className="hidden sm:inline">Trip Planning</span>
                    <span className="sm:hidden">Plan</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="learning"
                    className="flex items-center gap-2"
                  >
                    <Video className="w-4 h-4" />
                    <span className="hidden sm:inline">Learning</span>
                    <span className="sm:hidden">Learn</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="guides"
                    className="flex items-center gap-2"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span className="hidden sm:inline">Field Guides</span>
                    <span className="sm:hidden">Guides</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="conservation"
                    className="flex items-center gap-2"
                  >
                    <Leaf className="w-4 h-4" />
                    <span className="hidden sm:inline">Conservation</span>
                    <span className="sm:hidden">Impact</span>
                  </TabsTrigger>
                </TabsList>

                {/* Trip Planning Tab */}
                <PlanningResourcesPanel />

                {/* Learning Tab - Restructured with all video content */}
                <LearningResourcesPanel />

                {/* Field Guides Tab */}
                <GuidesResourcesPanel />

                {/* Conservation Tab - Updated with National Geographic video */}
                <ConservationResourcesPanel />
              </Tabs>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-br from-emerald-600 to-blue-600">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Experience Colombia's Incredible Birds?
              </h2>
              <p className="text-xl mb-6 opacity-90">
                Now that you're prepared with expert insights, comprehensive
                resources, and official birding trails, let our experienced
                guides show you the wonders of Colombian birding firsthand.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-emerald-600 hover:bg-gray-100"
                  asChild
                >
                  <a href="/tours">
                    <Bird className="w-5 h-5 mr-2" />
                    Book Your Colombian Adventure
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-emerald-600 bg-transparent"
                  asChild
                >
                  <a href="/contact">
                    <Users className="w-5 h-5 mr-2" />
                    Speak with Our Experts
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
