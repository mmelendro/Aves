/**
 * Team directory with inline teamMembers records and separate advisory sections.
 * Accordion panels reveal profiles; in-page links use stable member IDs.
 * This is public editorial biography data, not customer-account information.
 * Only publish biographies, roles and permissions that the owner has verified.
 */
"use client";

import { TeamCarousel } from "@/components/team-carousel";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MapPin, ChevronDown } from "lucide-react";
import Link from "next/link";
import OptimizedImage from "@/components/optimized-image";
import { Footer } from "@/components/footer";
import { PageIntroduction } from "@/components/page-introduction";
import { NavigationHeader } from "@/components/navigation-header";
import { teamMembers } from "@/content/team-members";

export default function TeamPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [openMembers, setOpenMembers] = useState<string[]>([]);
  const scrollToMember = (memberId: string) => {
    if (teamMembers.some((member) => member.id === memberId))
      setOpenMembers((current) =>
        current.includes(memberId) ? current : [...current, memberId],
      );
    const element = document.getElementById(memberId);
    if (element) {
      if (teamMembers.some((member) => member.id === memberId))
        requestAnimationFrame(() =>
          element
            .querySelector<HTMLButtonElement>("button")
            ?.focus({ preventScroll: true }),
        );
      element.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <NavigationHeader currentPage="/team" />
      <main id="main-content" tabIndex={-1}>
        {/* Hero Section */}
        <PageIntroduction
          title="Our Team"
          eyebrow="AVES Colombia"
          description="Meet the passionate ornithologists, indigenous guides, and conservation experts who make AVES expeditions extraordinary. Our team combines scientific expertise with deep cultural knowledge and unwavering commitment to sustainable birding tourism."
        />

        {/* Quick Navigation */}
        <section className="py-8 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Quick Navigation
              </h2>

              {/* Guides Section */}
              <div className="mb-6">
                <div className="text-sm font-medium text-gray-500 mb-3">
                  Team
                </div>
                <TeamCarousel members={teamMembers} onSelect={scrollToMember} />
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-6"></div>

              {/* Advisory Board Section */}
              <div>
                <div className="text-sm font-medium text-gray-500 mb-3">
                  Advisory Board
                </div>
                <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                  <button
                    onClick={() => scrollToMember("royann-petrell")}
                    className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  >
                    Royann Petrell
                  </button>
                  <button
                    onClick={() => scrollToMember("sylvain-alie")}
                    className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  >
                    Sylvain Alie
                  </button>
                  <button
                    onClick={() => scrollToMember("lisa-baile")}
                    className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  >
                    Lisa Baile
                  </button>
                  <button
                    onClick={() => scrollToMember("peter")}
                    className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  >
                    Peter Paré
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Members Accordion */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Team
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our team brings together scientific expertise, traditional
                ecological knowledge, and deep cultural connections to create
                extraordinary birding experiences throughout Colombia.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Accordion
                type="multiple"
                value={openMembers}
                onValueChange={setOpenMembers}
                className="space-y-4"
              >
                {teamMembers.map((member) => (
                  <AccordionItem
                    key={member.id}
                    value={member.id}
                    id={member.id}
                    className="scroll-mt-36 bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden"
                  >
                    <AccordionTrigger className="hover:no-underline p-6 hover:bg-gray-100 transition-colors duration-200">
                      <div className="flex items-center gap-6 w-full">
                        {/* Profile Photo */}
                        <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 overflow-hidden rounded-full">
                          <OptimizedImage
                            src={member.image}
                            alt={member.alt}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                            style={{ objectFit: "cover" }}
                            fallback={member.fallback}
                          />
                        </div>

                        {/* Name and Role */}
                        <div className="flex-1 text-left">
                          <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                            <h3 className="text-lg md:text-xl font-bold text-gray-900">
                              {member.name}
                            </h3>
                            <Badge
                              className={`${member.badgeColor} text-xs md:text-sm w-fit`}
                            >
                              {member.badge}
                            </Badge>
                          </div>
                          <p
                            className={`${member.roleColor} font-medium text-sm md:text-base`}
                          >
                            {member.role}
                          </p>
                        </div>

                        {/* View Profile Indicator */}
                        <div className="flex items-center gap-2 text-emerald-600 font-medium text-sm">
                          <span className="hidden md:inline">View Profile</span>
                          <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                        </div>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="px-6 pb-6">
                      <div className="pt-4 border-t border-gray-200">
                        <div className="grid md:grid-cols-2 gap-6">
                          {/* Bio Section */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">
                              About
                            </h4>
                            <p className="text-gray-700 text-sm leading-relaxed mb-4">
                              {member.bio}
                            </p>

                            {/* Details */}
                            {member.details.length > 0 && (
                              <div className="space-y-2">
                                {member.details.map((detail, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center text-gray-600 text-sm"
                                  >
                                    <detail.icon className="w-4 h-4 mr-2 flex-shrink-0" />
                                    <span>{detail.text}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Expertise and Links */}
                          <div>
                            {member.expertise.length > 0 ? (
                              <>
                                <h4 className="font-semibold text-gray-900 mb-3">
                                  Areas of Expertise
                                </h4>
                                <ul className="space-y-1 mb-4">
                                  {member.expertise.map((skill, index) => (
                                    <li
                                      key={index}
                                      className="text-gray-700 text-sm"
                                    >
                                      • {skill}
                                    </li>
                                  ))}
                                </ul>
                              </>
                            ) : null}

                            {/* Links */}
                            {member.links.length > 0 && (
                              <div className="space-y-2">
                                <h5 className="font-medium text-gray-900 text-sm">
                                  Connect
                                </h5>
                                {member.links.map((link, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center text-sm"
                                  >
                                    <link.icon className="w-4 h-4 mr-2 flex-shrink-0" />
                                    <a
                                      href={link.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className={`${link.color} transition-colors font-medium`}
                                    >
                                      {link.text}
                                    </a>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Advisory Board Section */}
            <div className="mt-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Advisory Board
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Our Advisory Board brings together conservation advocates,
                  researchers, and sustainability experts who guide AVES'
                  mission of responsible birding tourism and habitat protection.
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <Accordion type="multiple" className="space-y-4">
                  {/* Royann Petrell */}
                  <AccordionItem
                    value="royann-petrell"
                    id="royann-petrell"
                    className="scroll-mt-36 bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden"
                  >
                    <AccordionTrigger className="hover:no-underline p-6 hover:bg-gray-100 transition-colors duration-200">
                      <div className="flex items-center gap-6 w-full">
                        <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 overflow-hidden rounded-full">
                          <OptimizedImage
                            src="/images/advisory-board/royann-petrell.jpeg"
                            alt="Royann Petrell - Conservation advocate and retired UBC professor in outdoor gear"
                            width={80}
                            height={80}
                            className="w-full h-full object-cover object-center"
                            style={{
                              objectFit: "cover",
                              objectPosition: "center",
                            }}
                          />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                            <h3 className="text-lg md:text-xl font-bold text-gray-900">
                              Royann Petrell
                            </h3>
                            <Badge className="bg-emerald-100 text-emerald-800 text-xs md:text-sm w-fit">
                              Conservation Advocate
                            </Badge>
                          </div>
                          <p className="text-emerald-600 font-medium text-sm md:text-base">
                            Retired UBC Professor & Marbled Murrelet Protector
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-emerald-600 font-medium text-sm">
                          <span className="hidden md:inline">View Profile</span>
                          <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="pt-4 border-t border-gray-200">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">
                              About
                            </h4>
                            <p className="text-gray-700 text-sm leading-relaxed mb-4">
                              Royann Petrell is a retired associate professor
                              from the University of British Columbia's Faculty
                              of Applied Science. Based in Courtenay on
                              Vancouver Island, she has been an avid bird
                              watcher since childhood and has dedicated her
                              retirement to protecting the marbled murrelet's
                              habitat. Her conservation efforts have included
                              legal challenges against logging companies to
                              protect critical seabird habitat.
                            </p>
                            <div className="space-y-2">
                              <div className="flex items-center text-gray-600 text-sm">
                                <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                                <span>Courtenay, Vancouver Island, BC</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">
                              Areas of Expertise
                            </h4>
                            <ul className="space-y-1 mb-4">
                              <li className="text-gray-700 text-sm">
                                • Marbled murrelet habitat protection
                              </li>
                              <li className="text-gray-700 text-sm">
                                • Seabird conservation advocacy
                              </li>
                              <li className="text-gray-700 text-sm">
                                • Old-growth forest preservation
                              </li>
                              <li className="text-gray-700 text-sm">
                                • Applied science research
                              </li>
                              <li className="text-gray-700 text-sm">
                                • Environmental litigation
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Sylvain Alie */}
                  <AccordionItem
                    value="sylvain-alie"
                    id="sylvain-alie"
                    className="scroll-mt-36 bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden"
                  >
                    <AccordionTrigger className="hover:no-underline p-6 hover:bg-gray-100 transition-colors duration-200">
                      <div className="flex items-center gap-6 w-full">
                        <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 overflow-hidden rounded-full">
                          <OptimizedImage
                            src="/images/advisory-board/sylvain-alie.jpeg"
                            alt="Sylvain Alie - Board chairperson wearing a wide-brimmed hat and binoculars in natural setting"
                            width={80}
                            height={80}
                            className="w-full h-full object-cover object-center"
                            style={{
                              objectFit: "cover",
                              objectPosition: "center",
                            }}
                          />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                            <h3 className="text-lg md:text-xl font-bold text-gray-900">
                              Sylvain Alie
                            </h3>
                            <Badge className="bg-blue-100 text-blue-800 text-xs md:text-sm w-fit">
                              Board Chairperson
                            </Badge>
                          </div>
                          <p className="text-blue-600 font-medium text-sm md:text-base">
                            Sustainable Agriculture & Business Leadership
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-emerald-600 font-medium text-sm">
                          <span className="hidden md:inline">View Profile</span>
                          <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="pt-4 border-t border-gray-200">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">
                              About
                            </h4>
                            <p className="text-gray-700 text-sm leading-relaxed mb-4">
                              Sylvain Alie serves as Board Chairperson of the
                              Comox Valley Growers and Seed Savers, bringing
                              extensive business leadership experience and a
                              deep passion for sustainable agriculture. A
                              Business Administration graduate who spent his
                              career in various fields including industrial
                              baking, Sylvain now lives on Steller Raven Farm
                              where he and his spouse Royann have practiced
                              organic farming for over 20 years, embodying the
                              "100 foot Diet" philosophy.
                            </p>
                            <div className="space-y-2">
                              <div className="flex items-center text-gray-600 text-sm">
                                <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                                <span>Steller Raven Farm, BC</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">
                              Areas of Expertise
                            </h4>
                            <ul className="space-y-1 mb-4">
                              <li className="text-gray-700 text-sm">
                                • Sustainable agriculture and organic farming
                              </li>
                              <li className="text-gray-700 text-sm">
                                • Business administration and leadership
                              </li>
                              <li className="text-gray-700 text-sm">
                                • Local food systems development
                              </li>
                              <li className="text-gray-700 text-sm">
                                • Community education and outreach
                              </li>
                              <li className="text-gray-700 text-sm">
                                • Environmental stewardship
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Lisa Baile */}
                  <AccordionItem
                    value="lisa-baile"
                    id="lisa-baile"
                    className="scroll-mt-36 bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden"
                  >
                    <AccordionTrigger className="hover:no-underline p-6 hover:bg-gray-100 transition-colors duration-200">
                      <div className="flex items-center gap-6 w-full">
                        <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 overflow-hidden rounded-full">
                          <OptimizedImage
                            src="/images/advisory-board/lisa-baile.jpeg"
                            alt="Lisa Baile - Medical researcher and wilderness education advocate in outdoor gear with binoculars"
                            width={80}
                            height={80}
                            className="w-full h-full object-cover object-center"
                            style={{
                              objectFit: "cover",
                              objectPosition: "center",
                            }}
                          />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                            <h3 className="text-lg md:text-xl font-bold text-gray-900">
                              Lisa Baile
                            </h3>
                            <Badge className="bg-purple-100 text-purple-800 text-xs md:text-sm w-fit">
                              Research & Education
                            </Badge>
                          </div>
                          <p className="text-purple-600 font-medium text-sm md:text-base">
                            Medical Researcher & Wilderness Education Advocate
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-emerald-600 font-medium text-sm">
                          <span className="hidden md:inline">View Profile</span>
                          <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="pt-4 border-t border-gray-200">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">
                              About
                            </h4>
                            <p className="text-gray-700 text-sm leading-relaxed mb-4">
                              Lisa Baile is a distinguished medical researcher
                              and author based on Pender Island. Born in London,
                              England in 1940, she earned her Master's degree in
                              Experimental Medicine from McGill University and
                              continued her research career at the University of
                              British Columbia. She is best known for her
                              biography "John Clarke: Explorer of the Coast
                              Mountains" and co-founded the Wilderness Education
                              Program in 1996.
                            </p>
                            <div className="space-y-2">
                              <div className="flex items-center text-gray-600 text-sm">
                                <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                                <span>Pender Island, BC</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">
                              Areas of Expertise
                            </h4>
                            <ul className="space-y-1 mb-4">
                              <li className="text-gray-700 text-sm">
                                • Medical research and experimental medicine
                              </li>
                              <li className="text-gray-700 text-sm">
                                • Wilderness education program development
                              </li>
                              <li className="text-gray-700 text-sm">
                                • Mountaineering and backcountry exploration
                              </li>
                              <li className="text-gray-700 text-sm">
                                • Scientific writing and biography
                              </li>
                              <li className="text-gray-700 text-sm">
                                • Conservation advocacy and education
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Peter Paré */}
                  <AccordionItem
                    value="peter"
                    id="peter"
                    className="scroll-mt-36 bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden"
                  >
                    <AccordionTrigger className="hover:no-underline p-6 hover:bg-gray-100 transition-colors duration-200">
                      <div className="flex items-center gap-6 w-full">
                        <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 overflow-hidden rounded-full">
                          <OptimizedImage
                            src="/images/advisory-board/peter-pare.jpeg"
                            alt="Peter Paré - Emeritus professor of respiratory medicine wearing a cap and green shirt outdoors"
                            width={80}
                            height={80}
                            className="w-full h-full object-cover object-center"
                            style={{
                              objectFit: "cover",
                              objectPosition: "center",
                            }}
                          />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                            <h3 className="text-lg md:text-xl font-bold text-gray-900">
                              Peter Paré
                            </h3>
                            <Badge className="bg-amber-100 text-amber-800 text-xs md:text-sm w-fit">
                              Medical Research Advisor
                            </Badge>
                          </div>
                          <p className="text-amber-800 font-medium text-sm md:text-base">
                            Emeritus Professor of Respiratory Medicine &
                            Pathology, UBC
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-emerald-600 font-medium text-sm">
                          <span className="hidden md:inline">View Profile</span>
                          <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="pt-4 border-t border-gray-200">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">
                              About
                            </h4>
                            <p className="text-gray-700 text-sm leading-relaxed mb-4">
                              Dr. Peter Paré is an emeritus Professor of
                              Respiratory Medicine and of Pathology at the
                              University of British Columbia and a Clinician
                              Scientist at St Paul's Hospital and the UBC Center
                              for Heart Lung Innovation. He earned his medical
                              degree from McGill University in 1969 and
                              completed residency training at the Royal Victoria
                              Hospital and the University of Nairobi before
                              doing a two-year postdoctoral fellowship at the
                              Meakins Christie Laboratories. Dr. Paré has served
                              in numerous leadership positions including Head of
                              the UBC and SPH Respiratory Divisions, Acting Head
                              of Medicine at St Paul's Hospital, and Director of
                              the UBC Clinical Investigator Program and the
                              iCAPTURE Centre at St. Paul's Hospital.
                            </p>
                            <div className="space-y-2">
                              <div className="flex items-center text-gray-600 text-sm">
                                <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                                <span>Pender Island, BC</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">
                              Areas of Expertise
                            </h4>
                            <ul className="space-y-1 mb-4">
                              <li className="text-gray-700 text-sm">
                                • Respiratory medicine and pathology
                              </li>
                              <li className="text-gray-700 text-sm">
                                • Asthma and COPD pathophysiology and genetics
                              </li>
                              <li className="text-gray-700 text-sm">
                                • Clinical research and medical education
                              </li>
                              <li className="text-gray-700 text-sm">
                                • Academic leadership and program development
                              </li>
                              <li className="text-gray-700 text-sm">
                                • Medical literature and scientific publishing
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-20 text-center bg-emerald-50 rounded-2xl p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to Meet Our Team?
              </h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Join us on an expedition and experience firsthand the expertise,
                passion, and cultural knowledge that makes AVES tours
                extraordinary. Our team is ready to share Colombia's avian
                treasures with you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8 py-3">
                  Book Your Adventure
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 text-lg px-8 py-3 bg-transparent"
                >
                  <Link href="/contact">Contact Our Team</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
      </main>
      <Footer />
    </div>
  );
}
