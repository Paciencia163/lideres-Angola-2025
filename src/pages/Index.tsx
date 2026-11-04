import PageTransition from "@/components/layout/PageTransition";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import CategoriesSection from "@/components/sections/CategoriesSection";
import NomineesSection from "@/components/sections/NomineesSection";
import WinnersSection from "@/components/sections/WinnersSection";
import GallerySection from "@/components/sections/GallerySection";
import ProgrammeSection from "@/components/sections/ProgrammeSection";
import VenueSection from "@/components/sections/VenueSection";
import SponsorsSection from "@/components/sections/SponsorsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FinalCTA from "@/components/sections/FinalCTA";
import { useSeo } from "@/hooks/use-seo";

const Index = () => {
  useSeo(null);
  return (
    <PageTransition>
      <HeroSection />
      <AboutSection />
      <CategoriesSection />
      <NomineesSection />
      <WinnersSection />
      <GallerySection />
      <ProgrammeSection />
      <VenueSection />
      <SponsorsSection />
      <TestimonialsSection />
      <FinalCTA />
    </PageTransition>
  );
};

export default Index;
