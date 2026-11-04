import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Countdown from "@/components/event/Countdown";
import { site, eventDay, eventMonth, eventTime, eventWeekday } from "@/config/site";
import { heroImageId, unsplash, unsplashSrcSet } from "@/data/content";
import { EASE } from "@/lib/motion";
import logoGala from "@/assets/brand/logo-gala.webp";

const item = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE, delay } },
});

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const HeroSection = () => (
  <section aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
    {/* Fundo: fotografia escurecida com gradiente */}
    <div className="absolute inset-0 -z-10">
      <img
        src={unsplash(heroImageId, 1600)}
        srcSet={unsplashSrcSet(heroImageId, [640, 1024, 1600, 2200])}
        sizes="100vw"
        alt=""
        fetchPriority="high"
        decoding="async"
        className="h-full w-full animate-slow-zoom object-cover object-center opacity-40 grayscale-[35%]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/55 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,transparent_0%,hsl(var(--background))_75%)]" />
      <div className="absolute inset-x-0 top-0 h-[60vh] bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.14),transparent_65%)]" />
    </div>

    <div className="container-luxe flex flex-1 flex-col items-center justify-center pb-28 pt-[calc(var(--nav-height)+3rem)] text-center">
      <motion.div {...item(0.1)} className="mb-8 flex items-center gap-4">
        <span className="gold-rule-short" />
        <p className="eyebrow">
          Edição {site.edition} · Luanda
        </p>
        <span className="gold-rule-short" />
      </motion.div>

      <motion.h1 id="hero-title" {...item(0.25)} className="w-full max-w-[min(42rem,90vw)]">
        <img
          src={logoGala}
          alt={`Gala de Premiação ${site.name} ${site.edition}`}
          width={1600}
          height={753}
          fetchPriority="high"
          decoding="async"
          className="h-auto w-full drop-shadow-[0_8px_40px_hsl(var(--primary)/0.25)]"
        />
      </motion.h1>

      <motion.p {...item(0.4)} className="mt-7 max-w-xl font-display text-lg italic text-foreground/80 sm:text-2xl">
        {site.tagline}
      </motion.p>

      {/* Bloco de data, hora e local */}
      <motion.dl
        {...item(0.55)}
        className="mt-12 grid w-full max-w-2xl grid-cols-1 border-y border-primary/25 text-left xs:grid-cols-3 xs:text-center"
      >
        {[
          { term: "Data", value: `${eventDay} de ${eventMonth}`, sub: `${capitalize(eventWeekday)}, ${site.edition}` },
          { term: "Hora", value: eventTime, sub: "Recepção dos convidados" },
          { term: "Local", value: site.event.venue, sub: site.event.city },
        ].map((d, i) => (
          <div
            key={d.term}
            className={`flex items-baseline justify-between gap-4 px-1 py-4 xs:block xs:px-4 xs:py-5 ${i > 0 ? "border-t border-primary/15 xs:border-l xs:border-t-0" : ""}`}
          >
            <dt className="eyebrow text-[0.6rem]">{d.term}</dt>
            <dd className="xs:mt-2">
              <span className="block font-display text-lg text-foreground sm:text-xl">{d.value}</span>
              <span className="hidden text-xs text-muted-foreground xs:block">{d.sub}</span>
            </dd>
          </div>
        ))}
      </motion.dl>
      {!site.event.confirmed && (
        <motion.p {...item(0.6)} className="mt-3 text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground">
          Data provisória · Confirmação em breve
        </motion.p>
      )}

      <motion.div {...item(0.7)} className="mt-10 w-full max-w-lg">
        <Countdown to={site.event.startsAt} />
      </motion.div>

      <motion.div {...item(0.85)} className="mt-10 flex w-full flex-col gap-3 xs:w-auto sm:flex-row sm:gap-4">
        <Button asChild variant="gold" size="lg">
          <Link to="/indicacao">Fazer Indicação</Link>
        </Button>
        <Button asChild variant="gold-outline" size="lg">
          <Link to="/categorias">Ver Categorias</Link>
        </Button>
      </motion.div>
    </div>

    {/* Indicador de scroll */}
    <a
      href="#sobre"
      aria-label="Descer para a secção Sobre"
      className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-primary"
    >
      <span>Descobrir</span>
      <span className="relative h-12 w-px overflow-hidden bg-primary/20">
        <span className="absolute inset-x-0 top-0 h-1/2 animate-scroll-cue bg-primary" />
      </span>
    </a>
  </section>
);

export default HeroSection;
