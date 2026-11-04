import PageTransition from "@/components/layout/PageTransition";
import PageHero from "@/components/sections/PageHero";
import CategoriesSection from "@/components/sections/CategoriesSection";
import FinalCTA from "@/components/sections/FinalCTA";
import { categories } from "@/data/categories";
import { site } from "@/config/site";
import { useSeo } from "@/hooks/use-seo";

const Categorias = () => {
  useSeo("Categorias", `As ${categories.length} categorias de nomeação dos ${site.name} ${site.edition}.`);
  return (
    <PageTransition>
      <PageHero
        eyebrow={`${site.awards.figureCategories + site.awards.institutionCategories} categorias em ${site.edition}`}
        title={
          <>
            Categorias de <em className="text-primary">nomeação</em>
          </>
        }
        description={`${site.awards.figureCategories} categorias para personalidades e ${site.awards.institutionCategories} para instituições. Seleccione uma área abaixo para fazer a sua indicação.`}
      />
      <CategoriesSection heading={false} />
      <FinalCTA title="Conhece um líder inspirador?" description="Indique personalidades e instituições que merecem ser reconhecidas em cada categoria." />
    </PageTransition>
  );
};

export default Categorias;
