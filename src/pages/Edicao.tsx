import { Award, Landmark, Mic } from "lucide-react";
import PageTransition from "@/components/layout/PageTransition";
import PageHero from "@/components/sections/PageHero";
import SectionHeading from "@/components/sections/SectionHeading";
import ProgrammeSection from "@/components/sections/ProgrammeSection";
import VenueSection from "@/components/sections/VenueSection";
import FinalCTA from "@/components/sections/FinalCTA";
import Countdown from "@/components/event/Countdown";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { site, eventDay, eventMonth, eventTime } from "@/config/site";
import { audienceProfiles, forumInternationalSpeakers, forumSpeakers, forumThemes, specialDistinctions } from "@/data/content";
import { useSeo } from "@/hooks/use-seo";

const { awards, forum } = site;

const highlights = [
  {
    icon: Award,
    title: "Entrega de prémios",
    text: `${awards.figures} personalidades em ${awards.figureCategories} categorias e ${awards.institutions} instituições em ${awards.institutionCategories} categorias.`,
  },
  {
    icon: Landmark,
    title: "Homenagens e distinções",
    text: `${awards.posthumous} homenagens a título póstumo e ${awards.specialDistinctions} distinções especiais, fora da contagem das ${awards.figures} figuras.`,
  },
  {
    icon: Mic,
    title: forum.name,
    text: `Na manhã do mesmo dia, no ${forum.venue}: painéis, exposição de soluções e networking.`,
  },
];

const SpeakerList = ({ items }: { items: { name: string; role: string }[] }) => (
  <Stagger className="grid gap-px bg-primary/15 sm:grid-cols-2 lg:grid-cols-3">
    {items.map((s) => (
      <StaggerItem key={s.name} className="bg-background p-7">
        <h4 className="font-display text-xl text-foreground">{s.name}</h4>
        <p className="mt-2 text-sm text-muted-foreground">{s.role}</p>
      </StaggerItem>
    ))}
  </Stagger>
);

const Edicao = () => {
  useSeo(`Edição ${site.edition}`, `Edição ${site.edition} dos ${site.name}: data, programa, fórum GILF, distinções e local da gala.`);
  return (
    <PageTransition>
      <PageHero
        eyebrow={`Edição ${site.edition} · 17 de Dezembro`}
        title={<em className="text-primary">{site.theme}</em>}
        description="O tema que define a nossa celebração da liderança."
      />

      <section className="section">
        <div className="container-luxe grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">O tema</p>
            <p className="mt-6 font-display text-3xl italic leading-snug text-foreground md:text-4xl">
              “Os grandes líderes não procuram ser servidos, mas servir.”
            </p>
          </Reveal>
          <Reveal delay={0.15} className="space-y-6 text-base leading-relaxed text-muted-foreground md:text-lg lg:col-span-6 lg:col-start-7">
            <p>
              <span className="text-foreground">“{site.theme}”</span> não é apenas um lema — é uma filosofia que atravessa cada aspecto dos {site.name}.
            </p>
            <p>
              Acreditamos que a verdadeira liderança não se mede apenas por conquistas pessoais, mas pelo impacto positivo que geramos na sociedade, nas
              comunidades e no futuro do nosso país.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section-alt">
        <Reveal className="container-luxe text-center">
          <p className="eyebrow">Data do evento</p>
          <p className="mt-6 font-display text-[clamp(4rem,14vw,9rem)] leading-none text-foreground">{eventDay}</p>
          <p className="mt-2 font-display text-3xl capitalize text-primary md:text-4xl">
            {eventMonth} {site.edition}
          </p>
          <p className="mt-6 text-xs uppercase tracking-[0.24em] text-muted-foreground">
            {site.event.venue} · {eventTime} {!site.event.confirmed && "· data provisória"}
          </p>
          <div className="mx-auto mt-12 max-w-lg">
            <Countdown to={site.event.startsAt} />
          </div>
        </Reveal>
      </section>

      <section className="section">
        <div className="container-luxe">
          <SectionHeading eyebrow="Destaques" title="O que o espera" />
          <Stagger className="grid gap-5 md:grid-cols-3">
            {highlights.map(({ icon: Icon, title, text }) => (
              <StaggerItem key={title} className="card-luxe p-8 hover:-translate-y-1">
                <Icon className="h-6 w-6 text-primary" strokeWidth={1.25} />
                <h3 className="mt-8 font-display text-2xl text-foreground">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Distinções especiais"
            title={
              <>
                Para lá das <em className="text-primary">categorias</em>
              </>
            }
            description={`Além das ${awards.posthumous} homenagens a título póstumo, em memória de legados que continuam a inspirar.`}
          />
          <Stagger className="mx-auto grid max-w-4xl gap-px bg-primary/15 sm:grid-cols-2 lg:grid-cols-3">
            {specialDistinctions.map((d) => (
              <StaggerItem key={d} className="bg-card p-8 text-center">
                <p className="font-display text-xl text-foreground">{d}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <ProgrammeSection />

      <section id="forum" className="section">
        <div className="container-luxe">
          <SectionHeading
            eyebrow={`${forum.short} ${site.edition} · ${forum.time}`}
            title={forum.name}
            description={`Um espaço de diálogo sobre liderança, investimento e desenvolvimento económico, no ${forum.venue}. Capacidade de referência de ${forum.capacity} participantes.`}
          />
          <Stagger className="grid gap-px bg-primary/15 sm:grid-cols-2 lg:grid-cols-3">
            {forumThemes.map((t) => (
              <StaggerItem key={t.title} className="bg-card p-8">
                <h3 className="font-display text-xl text-foreground">{t.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.text}</p>
              </StaggerItem>
            ))}
          </Stagger>

          <h3 className="eyebrow mt-20 mb-6">Oradores confirmados</h3>
          <SpeakerList items={forumSpeakers} />
          <h3 className="eyebrow mt-14 mb-6">Oradores internacionais</h3>
          <SpeakerList items={forumInternationalSpeakers} />
          <p className="mt-8 text-sm text-muted-foreground">A organização comunicará a distribuição dos painéis e o programa final.</p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container-luxe">
          <SectionHeading eyebrow="Audiência prevista" title="Quem participa" />
          <Stagger className="grid gap-px bg-primary/15 sm:grid-cols-2 lg:grid-cols-4">
            {audienceProfiles.map((a) => (
              <StaggerItem key={a} className="bg-background p-8 text-center">
                <h3 className="font-display text-xl text-foreground">{a}</h3>
              </StaggerItem>
            ))}
          </Stagger>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Capacidade de referência: {forum.capacity} participantes no fórum e {site.event.capacity} convidados na gala.
          </p>
        </div>
      </section>

      <VenueSection />
      <FinalCTA title="Faça parte desta noite" />
    </PageTransition>
  );
};

export default Edicao;
