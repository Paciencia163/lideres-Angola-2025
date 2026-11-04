import PageTransition from "@/components/layout/PageTransition";
import PageHero from "@/components/sections/PageHero";
import GallerySection from "@/components/sections/GallerySection";
import FinalCTA from "@/components/sections/FinalCTA";
import { site } from "@/config/site";
import { useSeo } from "@/hooks/use-seo";

const Galeria = () => {
  useSeo("Galeria", `Fotografias da gala dos ${site.name}.`);
  return (
    <PageTransition>
      <PageHero
        eyebrow="Galeria"
        title={
          <>
            Momentos que ficam na <em className="text-primary">memória</em>
          </>
        }
        description="Reviva os momentos mais marcantes das nossas celebrações de liderança e excelência."
      />
      <GallerySection heading={false} />
      <FinalCTA />
    </PageTransition>
  );
};

export default Galeria;
