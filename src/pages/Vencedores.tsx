import PageTransition from "@/components/layout/PageTransition";
import PageHero from "@/components/sections/PageHero";
import WinnersSection from "@/components/sections/WinnersSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FinalCTA from "@/components/sections/FinalCTA";
import { winners } from "@/data/content";
import { site } from "@/config/site";
import { useSeo } from "@/hooks/use-seo";

const Vencedores = () => {
  useSeo("Vencedores", `Vencedores das edições anteriores e Hall da Fama dos ${site.name}.`);
  return (
    <PageTransition>
      <PageHero
        eyebrow="Vencedores e Hall da Fama"
        title={
          <>
            Líderes que fizeram <em className="text-primary">história</em>
          </>
        }
        description={`Os distinguidos desde a 1.ª edição, em ${site.firstEdition}.`}
      />
      <WinnersSection heading={false} limit={winners.length} />
      <TestimonialsSection />
      <FinalCTA />
    </PageTransition>
  );
};

export default Vencedores;
