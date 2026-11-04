import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import AnimatedCounter from "@/components/event/AnimatedCounter";
import { site } from "@/config/site";
import { editionsHistory } from "@/data/content";

const { awards } = site;

const stats = [
  { value: editionsHistory.length, label: "Edições realizadas", suffix: "" },
  { value: awards.figures, label: `Personalidades em ${site.edition}`, suffix: "" },
  { value: awards.institutions, label: `Instituições em ${site.edition}`, suffix: "" },
  { value: awards.figureCategories + awards.institutionCategories, label: "Categorias", suffix: "" },
];

const AboutSection = ({ showLink = true }: { showLink?: boolean }) => (
  <section id="sobre" aria-labelledby="sobre-title" className="section">
    <div className="container-luxe">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <div className="mb-6 flex items-center gap-4">
            <span className="gold-rule-short" />
            <p className="eyebrow">Sobre os Prémios</p>
          </div>
          <h2 id="sobre-title" className="text-display-md text-foreground">
            Uma noite para honrar quem <em className="text-primary">lidera</em> e <em className="text-primary">transforma</em> Angola.
          </h2>
        </Reveal>

        <Reveal delay={0.15} className="space-y-6 text-base leading-relaxed text-muted-foreground md:text-lg lg:col-span-6 lg:col-start-7 lg:pt-14">
          <p>
            Os <span className="text-foreground">{site.name}</span> são uma cerimónia de reconhecimento de personalidades e instituições
            pelo seu contributo para Angola, promovida pela {site.organizer}.
          </p>
          <p>
            Valorizamos o mérito e tornamos visíveis percursos que inspiram a sociedade:{" "}
            <span className="font-display italic text-foreground">reconhecemos hoje, inspiramos o amanhã.</span>
          </p>
          {showLink && (
            <Link to="/sobre" className="group inline-flex items-center gap-3 pt-2 text-xs uppercase tracking-[0.22em] text-primary">
              Conhecer a iniciativa
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          )}
        </Reveal>
      </div>

      <Stagger className="mt-20 grid grid-cols-2 gap-px border-y border-primary/20 bg-primary/10 md:mt-28 md:grid-cols-4">
        {stats.map((s) => (
          <StaggerItem key={s.label} className="bg-background px-4 py-10 sm:px-8 md:py-12">
            <AnimatedCounter value={s.value} suffix={s.suffix} className="block font-display text-5xl text-primary md:text-6xl" />
            <span className="mt-3 block text-[0.65rem] uppercase tracking-[0.24em] text-muted-foreground">{s.label}</span>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  </section>
);

export default AboutSection;
