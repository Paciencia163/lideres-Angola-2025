import { Link } from "react-router-dom";
import { Crown } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import Portrait from "@/components/event/Portrait";
import { Button } from "@/components/ui/button";
import { hallOfFame, winners } from "@/data/content";

interface WinnersSectionProps {
  heading?: boolean;
  limit?: number;
}

const WinnersSection = ({ heading = true, limit = 4 }: WinnersSectionProps) => (
  <section id="vencedores" aria-label="Vencedores" className="section section-alt">
    <div className="container-luxe">
      {heading && (
        <SectionHeading
          align="left"
          eyebrow="Edições anteriores"
          title={
            <>
              Vencedores que fizeram <em className="text-primary">história</em>
            </>
          }
          action={
            <Button asChild variant="ivory-ghost" className="px-0">
              <Link to="/vencedores">Ver todos os vencedores →</Link>
            </Button>
          }
        />
      )}

      <Stagger className="grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4">
        {winners.slice(0, limit).map((w) => (
          <StaggerItem key={w.id}>
            <figure className="group">
              <div className="relative overflow-hidden border border-border transition-colors duration-500 group-hover:border-primary/40">
                <Portrait src={w.photo} alt={w.name} label="Fotografia a inserir" />
                <span className="absolute left-3 top-3 bg-background/80 px-2.5 py-1 font-display text-sm text-primary backdrop-blur">{w.year}</span>
              </div>
              <figcaption className="mt-4">
                <p className="font-display text-lg text-foreground sm:text-xl">{w.name}</p>
                <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{w.category}</p>
              </figcaption>
            </figure>
          </StaggerItem>
        ))}
      </Stagger>

      {/* Hall da Fama */}
      <Reveal className="mt-24 border border-primary/25 bg-background/60 p-8 md:p-14">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Crown className="h-7 w-7 text-primary" strokeWidth={1.25} />
            <h3 className="mt-6 font-display text-3xl text-foreground md:text-4xl">Hall da Fama</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Homenagem permanente às personalidades cujo percurso definiu o padrão de liderança em Angola.
            </p>
          </div>
          <ol className="divide-y divide-primary/15 border-y border-primary/15 lg:col-span-8">
            {hallOfFame.map((h, i) => (
              <li key={h.id} className="flex items-baseline gap-6 py-6">
                <span className="font-display text-sm text-primary">{String(i + 1).padStart(2, "0")}</span>
                <div className="flex-1">
                  <p className="font-display text-xl text-foreground md:text-2xl">{h.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">{h.distinction}</p>
                </div>
                <span className="font-display text-lg text-foreground/60">{h.year}</span>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </div>
  </section>
);

export default WinnersSection;
