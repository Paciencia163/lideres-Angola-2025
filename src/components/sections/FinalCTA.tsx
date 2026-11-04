import { Link } from "react-router-dom";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import Logo from "@/components/brand/Logo";
import { site } from "@/config/site";

interface FinalCTAProps {
  title?: string;
  description?: string;
}

const FinalCTA = ({
  title = "Faça parte da história",
  description = `Indique quem merece ser reconhecido ou garanta o seu lugar na gala de ${site.edition}.`,
}: FinalCTAProps) => (
  <section aria-label="Participar" className="relative overflow-hidden border-t border-primary/15 py-28 md:py-40">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,hsl(var(--primary)/0.14),transparent_60%)]" />
    <Logo
      decorative
      className="pointer-events-none absolute left-1/2 top-1/2 h-auto w-[min(56rem,120vw)] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.05] sm:h-auto"
    />
    <Reveal className="container-luxe relative text-center">
      <p className="eyebrow">{site.name} {site.edition}</p>
      <h2 className="mx-auto mt-6 max-w-4xl text-display-lg text-foreground">
        {title.split(" ").slice(0, -1).join(" ")} <em className="text-gold-gradient">{title.split(" ").slice(-1)}</em>
      </h2>
      <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground md:text-lg">{description}</p>
      <div className="mt-12 flex flex-col items-stretch justify-center gap-3 xs:items-center sm:flex-row sm:gap-4">
        <Button asChild variant="gold" size="lg">
          <Link to="/indicacao">Fazer Indicação</Link>
        </Button>
        <Button asChild variant="gold-outline" size="lg">
          <Link to="/ingressos">Comprar Bilhete</Link>
        </Button>
      </div>
    </Reveal>
  </section>
);

export default FinalCTA;
