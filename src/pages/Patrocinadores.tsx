import { Link } from "react-router-dom";
import PageTransition from "@/components/layout/PageTransition";
import PageHero from "@/components/sections/PageHero";
import SectionHeading from "@/components/sections/SectionHeading";
import SponsorsSection from "@/components/sections/SponsorsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { sponsorshipTiers } from "@/data/content";
import { useSeo } from "@/hooks/use-seo";

const Patrocinadores = () => {
  useSeo("Patrocinadores", `Patrocinadores, parceiros e modalidades de patrocínio dos ${site.name} ${site.edition}.`);
  return (
    <PageTransition>
      <PageHero
        eyebrow="Patrocinadores e Parceiros"
        title={
          <>
            Quem torna esta noite <em className="text-primary">possível</em>
          </>
        }
        description="Marcas e instituições que partilham o compromisso de reconhecer a excelência em Angola."
      />
      <SponsorsSection heading={false} />

      <section id="modalidades" className="section">
        <div className="container-luxe">
          <SectionHeading
            eyebrow={`Patrocínio · ${site.forum.short} ${site.edition}`}
            title={
              <>
                Modalidades de <em className="text-primary">patrocínio</em>
              </>
            }
            description={`Associe a sua marca ao ${site.forum.name} e aos ${site.name}, a 17 de Dezembro de ${site.edition}.`}
          />
          <Stagger className="grid gap-px bg-primary/15 sm:grid-cols-2 lg:grid-cols-5">
            {sponsorshipTiers.map((t) => (
              <StaggerItem key={t.name} className="flex flex-col bg-card p-7">
                <h3 className="font-display text-3xl text-primary">{t.name}</h3>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-foreground/80">{t.positioning}</p>
                <p className="mt-6 text-sm text-foreground">{t.invites}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{t.highlights}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-12 flex flex-col items-center gap-5 text-center">
            <p className="max-w-xl text-sm text-muted-foreground">
              Valores, contrapartidas completas e condições na proposta de patrocínio. Organização conjunta da {site.organizer} e da {site.coOrganizer}.
            </p>
            <Button asChild variant="gold">
              <Link to="/contactos?assunto=patrocinio">Pedir a proposta de patrocínio</Link>
            </Button>
          </Reveal>
        </div>
      </section>

      <TestimonialsSection />
    </PageTransition>
  );
};

export default Patrocinadores;
