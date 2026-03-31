"use client";

import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";
import EducationSection from "@/components/EducationSection";
import CareerSection from "@/components/CareerSection";
import ProjectShowcaseSection from "@/components/ProjectShowcaseSection";
import CareerJourneySection from "@/components/CareerJourneySection";
import CertHonorSection from "@/components/CertHonorSection";
import MethodologySection from "@/components/MethodologySection";
import HobbiesSection from "@/components/HobbiesSection";
import FooterSection from "@/components/FooterSection";
import Navbar from "@/components/Navbar";
import { SiteConfigProvider, useSiteConfig } from "@/components/SiteConfigContext";
import { LanguageProvider } from "@/components/LanguageContext";
import { useSoftSnap } from "@/hooks/useSoftSnap";

const MagneticCursor = dynamic(() => import("@/components/MagneticCursor"), {
  ssr: false,
});

const AdminPanel = dynamic(() => import("@/components/AdminPanel"), {
  ssr: false,
});

function AdminGate() {
  const { isAdmin } = useSiteConfig();
  if (!isAdmin) return null;
  return <AdminPanel />;
}

export default function Home() {
  useSoftSnap();

  return (
    <LanguageProvider>
    <SiteConfigProvider>
      <main className="relative lg:pl-[72px]">
        <MagneticCursor />
        <Navbar />
        <HeroSection />
        <EducationSection />
        <CareerSection />
        <ProjectShowcaseSection />
        <CareerJourneySection />
        <CertHonorSection />
        <MethodologySection />
        <HobbiesSection />
        <FooterSection />
        <AdminGate />
      </main>
    </SiteConfigProvider>
    </LanguageProvider>
  );
}
