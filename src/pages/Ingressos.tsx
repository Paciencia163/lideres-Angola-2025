import { useState } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import PageTransition from "@/components/layout/PageTransition";
import PageHero from "@/components/sections/PageHero";
import SectionHeading from "@/components/sections/SectionHeading";
import PaymentModal from "@/components/PaymentModal";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { site, formatKz, eventDateLong } from "@/config/site";
import { useSeo } from "@/hooks/use-seo";

const benefits = [
  "Acesso à cerimónia completa de premiação",
  "Jantar de gala",
  "Actuações artísticas exclusivas",
  "Networking com líderes empresariais",
  "Lembranças exclusivas para convidados",
  "Fotografia e cobertura profissional",
];

const steps = [
  { title: "Pagamento seguro", text: "Transferência bancária ou pagamento online." },
  { title: "Confirmação rápida", text: "Por e-mail ou WhatsApp, até 24 horas após verificação." },
  { title: "Bilhete digital", text: "Envio após confirmação do pagamento." },
];

const Ingressos = () => {
  useSeo("Bilhetes", `Bilhetes para a gala dos ${site.name} ${site.edition}: ${formatKz(site.tickets.priceKz)} por bilhete adicional.`);
  const [open, setOpen] = useState(false);

  return (
    <PageTransition>
      <PageHero
        eyebrow={`Gala de Premiação ${site.edition}`}
        title={
          <>
            Garanta o seu <em className="text-primary">lugar</em>
          </>
        }
        description="A noite mais prestigiada da liderança angolana, num ambiente exclusivo e com lugares limitados."
      >
        <p className="mt-8 text-xs uppercase tracking-[0.24em] text-foreground/80">
          {eventDateLong} · {site.event.venue}, {site.event.city}
        </p>
      </PageHero>

      <section className="section">
        <div className="container-luxe">
          <Stagger className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
            <StaggerItem className="card-luxe flex flex-col p-10">
              <p className="eyebrow">Convite</p>
              <h2 className="mt-5 font-display text-3xl text-foreground">Para nomeados</h2>
              <p className="mt-8 font-display text-6xl text-foreground">Gratuito</p>
              <p className="mt-6 flex-1 text-muted-foreground">
                Cada nomeado recebe {site.tickets.freeInvitesPerNominee} convite gratuito, enviado por e-mail ou WhatsApp.
              </p>
            </StaggerItem>
            <StaggerItem className="card-luxe flex flex-col border-primary/50 p-10">
              <p className="eyebrow">Bilhete adicional</p>
              <h2 className="mt-5 font-display text-3xl text-foreground">Acompanhantes e convidados</h2>
              <p className="mt-8 font-display text-6xl text-primary">{formatKz(site.tickets.priceKz)}</p>
              <p className="mt-6 flex-1 text-muted-foreground">Por bilhete. Sujeito a disponibilidade — capacidade de referência de {site.event.capacity} convidados.</p>
              <Button variant="gold" size="lg" className="mt-10 w-full" onClick={() => setOpen(true)}>
                Comprar bilhete
              </Button>
            </StaggerItem>
          </Stagger>

          <Stagger className="mx-auto mt-16 grid max-w-5xl gap-px bg-primary/15 sm:grid-cols-3">
            {steps.map((s, i) => (
              <StaggerItem key={s.title} className="bg-background p-8">
                <span className="font-display text-sm text-primary">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-3 font-display text-xl text-foreground">{s.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container-luxe max-w-4xl">
          <SectionHeading eyebrow="O que está incluído" title="Uma experiência completa" />
          <Reveal>
            <ul className="grid gap-x-12 sm:grid-cols-2">
              {benefits.map((b) => (
                <li key={b} className="flex items-center gap-4 border-b border-primary/15 py-5 text-foreground">
                  <Check className="h-4 w-4 shrink-0 text-primary" />
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <Reveal className="container-luxe text-center">
          <h2 className="text-display-md text-foreground">Tem dúvidas?</h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">Contacte-nos para mais informações sobre bilhetes e o evento.</p>
          <Button asChild variant="gold-outline" size="lg" className="mt-10">
            <Link to="/contactos">Falar connosco</Link>
          </Button>
        </Reveal>
      </section>

      <PaymentModal open={open} onOpenChange={setOpen} />
    </PageTransition>
  );
};

export default Ingressos;
