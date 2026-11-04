import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import Portrait from "@/components/event/Portrait";
import { Button } from "@/components/ui/button";
import { categories, getCategory } from "@/data/categories";
import { nomineesByCategory, type Nominee } from "@/data/nominees";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";

export const NomineeCard = ({ nominee }: { nominee: Nominee }) => {
  const category = getCategory(nominee.categorySlug);
  return (
    <article className="card-luxe group flex h-full flex-col hover:-translate-y-1">
      <Portrait src={nominee.photo} alt={nominee.name} />
      <div className="flex flex-1 flex-col p-4 sm:p-6">
        <p className="eyebrow hidden text-[0.6rem] text-primary/80 sm:block">{category?.title}</p>
        <h3 className="font-display text-lg text-foreground sm:mt-3 sm:text-2xl">{nominee.name}</h3>
        <p className="mt-1 flex-1 text-xs text-muted-foreground sm:text-sm">{nominee.organization}</p>
      </div>
    </article>
  );
};

/** Filtro de categorias em "chips" com deslize horizontal no telemóvel. */
export const CategoryFilter = ({ value, onChange }: { value: string; onChange: (slug: string) => void }) => (
  <div className="-mx-5 mb-10 overflow-x-auto px-5 no-scrollbar sm:mx-0 sm:px-0" role="tablist" aria-label="Filtrar por categoria">
    <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap sm:justify-center">
      {categories.map((c) => (
        <button
          key={c.slug}
          role="tab"
          aria-selected={value === c.slug}
          onClick={() => onChange(c.slug)}
          className={cn(
            "h-10 whitespace-nowrap rounded-full border px-5 text-xs transition-colors duration-300",
            value === c.slug ? "border-primary bg-primary text-primary-foreground" : "border-border text-foreground/75 hover:border-primary/60 hover:text-foreground",
          )}
        >
          {c.title.replace(/^Liderança (n[oa]s? |em |)/, "")}
        </button>
      ))}
    </div>
  </div>
);

const NomineesSection = ({ heading = true }: { heading?: boolean }) => {
  const [active, setActive] = useState(categories[0].slug);
  const list = nomineesByCategory(active);

  return (
    <section id="nomeados" aria-label="Nomeados" className="section">
      <div className="container-luxe">
        {heading && (
          <SectionHeading
            eyebrow={`Nomeados ${site.edition}`}
            title={
              <>
                Os rostos da <em className="text-primary">liderança</em>
              </>
            }
            description="Conheça os nomeados de cada categoria que vão subir ao palco da gala."
          />
        )}
        <CategoryFilter value={active} onChange={setActive} />
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3"
          >
            {list.map((n) => (
              <NomineeCard key={n.id} nominee={n} />
            ))}
          </motion.div>
        </AnimatePresence>
        {list.some((n) => n.placeholder) && (
          <p className="mt-8 text-center text-xs uppercase tracking-[0.22em] text-muted-foreground">
            Nomeados oficiais da edição {site.edition} a anunciar
          </p>
        )}
        {heading && (
          <div className="mt-12 text-center">
            <Button asChild variant="gold-outline" size="lg">
              <Link to="/nomeados">Ver todos os nomeados</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default NomineesSection;
