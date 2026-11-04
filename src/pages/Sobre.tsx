import { Link } from "react-router-dom";
import { Award, Eye, Gem, Lightbulb, Scale, Target, Users } from "lucide-react";
import PageTransition from "@/components/layout/PageTransition";
import PageHero from "@/components/sections/PageHero";
import AboutSection from "@/components/sections/AboutSection";
import SectionHeading from "@/components/sections/SectionHeading";
import FinalCTA from "@/components/sections/FinalCTA";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { editionsHistory, jury } from "@/data/content";
import { useSeo } from "@/hooks/use-seo";

const pillars = [
  { icon: Target, title: "Missão", text: "Valorizar a liderança transformadora que contribui para o progresso, a inovação e o bem-estar da sociedade angolana." },
  { icon: Eye, title: "Visão", text: "Ser o palco máximo de reconhecimento nacional, celebrando anualmente os líderes que moldam o futuro de Angola." },
];

const values = [
  { icon: Gem, title: "Excelência", text: "Reconhecemos apenas o mais alto nível de liderança." },
  { icon: Scale, title: "Ética", text: "Integridade e transparência em todas as decisões." },
  { icon: Lightbulb, title: "Inovação", text: "Valorizamos o pensamento transformador." },
  { icon: Award, title: "Compromisso", text: "Com o desenvolvimento sustentável de Angola." },
  { icon: Users, title: "Liderança", text: "Que inspira e transforma gerações." },
];

const Sobre = () => {
  useSeo("Sobre", `Conheça os ${site.name}: percurso, fundador, júri e valores da iniciativa da ${site.organizer}.`);
  return (
    <PageTransition>
      <PageHero
        eyebrow="Sobre o Evento"
        title={
          <>
            Uma celebração da <em className="text-primary">liderança angolana</em>
          </>
        }
        description="Reconhecendo quem inspira, lidera e transforma Angola."
      />

      <AboutSection showLink={false} />

      <section className="section section-alt">
        <div className="container-luxe">
          <Stagger className="grid gap-px bg-primary/15 md:grid-cols-2">
            {pillars.map(({ icon: Icon, title, text }) => (
              <StaggerItem key={title} className="bg-card p-10 md:p-14">
                <Icon className="h-7 w-7 text-primary" strokeWidth={1.25} />
                <h2 className="mt-8 font-display text-3xl text-foreground md:text-4xl">{title}</h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">{text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Os nossos valores"
            title={
              <>
                Princípios que guiam cada <em className="text-primary">distinção</em>
              </>
            }
          />
          <Stagger className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {values.map(({ icon: Icon, title, text }) => (
              <StaggerItem key={title} className="border-t border-primary/30 pt-6">
                <Icon className="h-5 w-5 text-primary" strokeWidth={1.25} />
                <h3 className="mt-5 font-display text-xl text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="O percurso"
            title={
              <>
                Edições já <em className="text-primary">realizadas</em>
              </>
            }
          />
          <Stagger className="grid gap-px bg-primary/15 md:grid-cols-3">
            {editionsHistory.map((e) => (
              <StaggerItem key={`${e.year}-${e.place}`} className="bg-card p-10">
                <p className="font-display text-5xl text-primary">{e.year}</p>
                <h3 className="mt-6 font-display text-2xl text-foreground">{e.place}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">{e.detail}</p>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{e.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Comissão de jurados"
            title={
              <>
                Quem avalia as <em className="text-primary">nomeações</em>
              </>
            }
            description={jury.criteria}
          />
          <Stagger className="grid gap-px bg-primary/15 md:grid-cols-3">
            {jury.board.map((j) => (
              <StaggerItem key={j.name} className="bg-background p-8 text-center">
                <h3 className="font-display text-2xl text-foreground">{j.name}</h3>
                <p className="mt-2 text-xs uppercase tracking-[0.22em] text-primary">{j.role}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-12 text-center">
            <p className="eyebrow">Membros</p>
            <ul className="mx-auto mt-5 flex max-w-3xl flex-wrap justify-center gap-x-8 gap-y-3 font-display text-lg text-foreground/90">
              {jury.members.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section section-alt">
        <Reveal className="container-luxe max-w-3xl text-center">
          <p className="eyebrow">O fundador</p>
          <p className="mt-6 text-display-md text-foreground">{site.founder.name}</p>
          <p className="mt-3 text-xs uppercase tracking-[0.24em] text-primary">{site.founder.role}</p>
          <p className="mx-auto mt-6 max-w-lg text-muted-foreground">
            Criador da iniciativa e responsável pela sua coordenação, à frente da {site.organizer}, entidade promotora dos {site.name}.
          </p>
          <p className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground">
            Organização da edição {site.edition}: {site.organizer} e {site.coOrganizer}.
          </p>
          <blockquote className="mx-auto mt-12 max-w-xl border-y border-primary/20 py-8 font-display text-2xl italic text-foreground/90">
            “Reconhecemos hoje. Inspiramos o amanhã.”
          </blockquote>
          <Button asChild variant="gold-outline" size="lg" className="mt-12">
            <Link to="/contactos">Entrar em contacto</Link>
          </Button>
        </Reveal>
      </section>

      <FinalCTA />
    </PageTransition>
  );
};

export default Sobre;
