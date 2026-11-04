import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { categories, type Category } from "@/data/categories";
import { site } from "@/config/site";

export const CategoryCard = ({ category, index }: { category: Category; index: number }) => {
  const Icon = category.icon;
  return (
    <Link
      to={`/indicacao?categoria=${category.slug}`}
      className="card-luxe group flex h-full flex-col p-7 hover:-translate-y-1.5 md:p-8"
      aria-label={`${category.title} — fazer uma indicação nesta categoria`}
    >
      <div className="mb-10 flex items-start justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/40 text-primary transition-colors duration-500 group-hover:border-primary group-hover:bg-primary/10">
          <Icon className="h-5 w-5" strokeWidth={1.25} />
        </span>
        <span className="font-display text-sm text-muted-foreground/60">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <h3 className="font-display text-xl leading-snug text-foreground transition-colors duration-300 group-hover:text-primary">
        {category.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{category.description}</p>
      <span className="mt-8 inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.22em] text-primary/80 transition-colors group-hover:text-primary">
        Indicar
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
      <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-primary transition-transform duration-700 ease-luxury group-hover:scale-x-100" />
    </Link>
  );
};

const CategoriesSection = ({ heading = true }: { heading?: boolean }) => (
  <section id="categorias" aria-label="Categorias" className="section section-alt">
    <div className="container-luxe">
      {heading && (
        <SectionHeading
          eyebrow={`Categorias ${site.edition}`}
          title={
            <>
              {categories.length} categorias de <em className="text-primary">excelência</em>
            </>
          }
          description="Da administração pública à cultura, cada categoria reconhece uma forma diferente de servir Angola."
        />
      )}
      <Stagger gap={0.06} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-5">
        {categories.map((c, i) => (
          <StaggerItem key={c.slug}>
            <CategoryCard category={c} index={i} />
          </StaggerItem>
        ))}
        {heading && (
          <StaggerItem className="flex sm:col-span-2 lg:col-span-1 xl:col-span-2">
            <div className="flex w-full flex-col justify-center border border-dashed border-primary/25 p-8 text-center xl:text-left">
              <p className="font-display text-2xl text-foreground">Conhece um líder inspirador?</p>
              <p className="mt-3 text-sm text-muted-foreground">Indique quem merece ser reconhecido em cada categoria.</p>
              <div className="mt-6">
                <Button asChild variant="gold-outline">
                  <Link to="/indicacao">Fazer indicação</Link>
                </Button>
              </div>
            </div>
          </StaggerItem>
        )}
      </Stagger>
    </div>
  </section>
);

export default CategoriesSection;
