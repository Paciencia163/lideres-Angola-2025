import { Link } from "react-router-dom";
import SectionHeading from "./SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { sponsors, sponsorTiers, type Sponsor } from "@/data/content";

const SponsorLogo = ({ sponsor }: { sponsor: Sponsor }) => {
  // Os logótipos são silhuetas normalizadas (mesmo peso visual, 640x360): servem de máscara
  // para pintar todos na mesma cor — marfim em repouso, dourado ao passar o rato.
  const inner = sponsor.logo ? (
    <span
      role="img"
      aria-label={sponsor.name}
      className="h-full w-full bg-foreground/75 transition-colors duration-500 group-hover:bg-primary"
      style={{
        maskImage: `url("${sponsor.logo}")`,
        WebkitMaskImage: `url("${sponsor.logo}")`,
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  ) : (
    <span className="px-4 text-center text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground/70 transition-colors group-hover:text-primary/80">
      {sponsor.name}
    </span>
  );

  const cls =
    "group flex aspect-[16/9] w-[calc(50%-0.375rem)] items-center justify-center border border-border bg-background/40 px-5 py-4 transition-colors duration-500 hover:border-primary/40 sm:w-[calc(33.333%-0.667rem)] md:w-[calc(25%-0.75rem)] lg:w-[calc(20%-0.8rem)]";

  return sponsor.url ? (
    <a href={sponsor.url} target="_blank" rel="noopener noreferrer" className={cls} aria-label={sponsor.name}>
      {inner}
    </a>
  ) : (
    <div className={cls}>{inner}</div>
  );
};

const SponsorsSection = ({ heading = true }: { heading?: boolean }) => (
  <section id="patrocinadores" aria-label="Patrocinadores e Parceiros" className="section section-alt">
    <div className="container-luxe">
      {heading && (
        <SectionHeading
          eyebrow="Patrocinadores e Parceiros"
          title={
            <>
              Quem torna esta noite <em className="text-primary">possível</em>
            </>
          }
        />
      )}

      <div className="space-y-16">
        {sponsorTiers.map(({ tier, label }) => {
          const list = sponsors.filter((s) => s.tier === tier);
          if (!list.length) return null;
          return (
            <Reveal key={tier}>
              <div className="mb-6 flex items-center gap-4">
                <p className="eyebrow whitespace-nowrap">{label}</p>
                <span className="gold-rule opacity-50" />
              </div>
              <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                {list.map((s) => (
                  <SponsorLogo key={s.id} sponsor={s} />
                ))}
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mt-16 flex flex-col items-center gap-5 text-center">
        <p className="max-w-md text-sm text-muted-foreground">Associe a sua marca à maior celebração da liderança angolana.</p>
        <Button asChild variant="gold-outline">
          <Link to="/contactos?assunto=patrocinio">Seja patrocinador</Link>
        </Button>
      </Reveal>
    </div>
  </section>
);

export default SponsorsSection;
