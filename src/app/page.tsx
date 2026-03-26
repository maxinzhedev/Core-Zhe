"use client";

import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";
import EducationSection from "@/components/EducationSection";
import CareerSection from "@/components/CareerSection";
import ProjectShowcaseSection from "@/components/ProjectShowcaseSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import FusionSection from "@/components/FusionSection";
import BackstageSection from "@/components/BackstageSection";
import ThemeToggle from "@/components/ThemeToggle";

const MagneticCursor = dynamic(() => import("@/components/MagneticCursor"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="relative">
      <MagneticCursor />
      <ThemeToggle />
      <HeroSection />
      <EducationSection />
      <CareerSection />
      <ProjectShowcaseSection />
      <CapabilitiesSection />
      <FusionSection />
      <BackstageSection />
    </main>
  );
}
