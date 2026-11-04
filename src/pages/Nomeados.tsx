import { useState } from "react";
import { Building2, ChevronDown, User } from "lucide-react";
import PageTransition from "@/components/layout/PageTransition";
import PageHero from "@/components/sections/PageHero";
import NomineesSection from "@/components/sections/NomineesSection";
import SectionHeading from "@/components/sections/SectionHeading";
import FinalCTA from "@/components/sections/FinalCTA";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { archive2025Figuras, archive2025Instituicoes, archive2025Stats, type ArchiveCategory } from "@/data/nominees";
import { site, formatKz } from "@/config/site";
import { featuredNominees } from "@/data/content";
import { useSeo } from "@/hooks/use-seo";
import { cn } from "@/lib/utils";

const ArchiveList = ({ items, icon: Icon }: { items: ArchiveCategory[]; icon: typeof User }) => (
  <Stagger gap={0.03} className="grid gap-px bg-border/70 sm:grid-cols-2 lg:grid-cols-3">
    {items.map((cat) => (
      <StaggerItem key={cat.categoria} className="bg-background p-6">
        <h4 className="font-display text-base leading-snug text-primary">{cat.categoria}</h4>
        <ul className="mt-4 space-y-2">
          {cat.nomeados.map((n) => (
            <li key={n} className="flex items-start gap-2.5 text-sm text-foreground/85">
              <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary/50" strokeWidth={1.5} />
              {n}
            </li>
          ))}
        </ul>
      </StaggerItem>
    ))}
  </Stagger>
);

const Nomeados = () => {
  useSeo("Nomeados", `Nomeados dos ${site.name} ${site.edition} e arquivo da edição de 2025.`);
  const [showArchive, setShowArchive] = useState(false);

  return (
    <PageTransition>
      <PageHero
        eyebrow={`Nomeados ${site.edition}`}
        title={
          <>
            Os rostos da <em className="text-primary">liderança</em>
          </>
        }
        description="Personalidades, empresas e projectos que se destacam pela liderança, inovação e impacto positivo em Angola. Cada indicação é avaliada por um júri especializado."
      />

      <section className="section">
        <div className="container-luxe">
          <SectionHeading
            eyebrow={`Nomeados em destaque · ${site.edition}`}
            title={
              <>
                Primeiros nomes <em className="text-primary">anunciados</em>
              </>
            }
            description={`${site.awards.figures} personalidades e ${site.awards.institutions} instituições previstas, além de ${site.awards.posthumous} distinções a título póstumo.`}
          />
          <Stagger className="grid gap-px bg-primary/15 sm:grid-cols-2 lg:grid-cols-4">
            {featuredNominees.map((n) => (
              <StaggerItem key={n.name} className="bg-card p-8">
                <h3 className="font-display text-2xl text-foreground">{n.name}</h3>
                <p className="mt-3 text-sm text-primary/90">{n.category}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Nomeação e presença no evento são estados distintos. A presença depende de confirmação individual.
          </p>
        </div>
      </section>

      <NomineesSection heading={false} />

      {/* Política de convites */}
      <section className="section section-alt">
        <div className="container-luxe">
          <SectionHeading eyebrow="Política de convites" title="Para nomeados e acompanhantes" />
          <Stagger className="mx-auto grid max-w-4xl gap-px bg-primary/15 md:grid-cols-2">
            <StaggerItem className="bg-card p-10">
              <p className="eyebrow">Nomeados</p>
              <p className="mt-5 font-display text-5xl text-foreground">{site.tickets.freeInvitesPerNominee}</p>
              <p className="mt-2 text-muted-foreground">convite gratuito por nomeado para a gala.</p>
            </StaggerItem>
            <StaggerItem className="bg-card p-10">
              <p className="eyebrow">Acompanhantes</p>
              <p className="mt-5 font-display text-5xl text-foreground">{formatKz(site.tickets.priceKz)}</p>
              <p className="mt-2 text-muted-foreground">por bilhete adicional, sujeito a disponibilidade.</p>
            </StaggerItem>
          </Stagger>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
            Os valores dos bilhetes adicionais contribuem para a viabilidade e continuidade do projecto, garantindo um evento de elevada qualidade.
          </p>
        </div>
      </section>

      {/* Arquivo 2025 */}
      <section className="section">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Arquivo · 2025"
            title={
              <>
                Nomeados da <em className="text-primary">edição de 2025</em>
              </>
            }
            description={`${archive2025Stats.nominees} nomeados em ${archive2025Stats.categories} categorias, entre figuras individuais e instituições.`}
          />
          <div className="text-center">
            <button
              onClick={() => setShowArchive((s) => !s)}
              aria-expanded={showArchive}
              aria-controls="arquivo-2025"
              className="inline-flex h-12 items-center gap-3 border border-primary/50 px-6 text-xs uppercase tracking-[0.2em] text-primary transition-colors hover:bg-primary/10"
            >
              {showArchive ? "Ocultar arquivo" : "Ver arquivo completo"}
              <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", showArchive && "rotate-180")} />
            </button>
          </div>
          {showArchive && (
            <div id="arquivo-2025" className="mt-16 space-y-16">
              <div>
                <h3 className="mb-6 flex items-center gap-3 font-display text-2xl text-foreground">
                  <User className="h-5 w-5 text-primary" strokeWidth={1.25} /> Figuras
                </h3>
                <ArchiveList items={archive2025Figuras} icon={User} />
              </div>
              <div>
                <h3 className="mb-6 flex items-center gap-3 font-display text-2xl text-foreground">
                  <Building2 className="h-5 w-5 text-primary" strokeWidth={1.25} /> Instituições e Empresas
                </h3>
                <ArchiveList items={archive2025Instituicoes} icon={Building2} />
              </div>
            </div>
          )}
        </div>
      </section>

      <FinalCTA />
    </PageTransition>
  );
};

export default Nomeados;
