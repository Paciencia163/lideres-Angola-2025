import { useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Loader2, Mail, MapPin, MessageCircle, Phone, Youtube } from "lucide-react";
import PageTransition from "@/components/layout/PageTransition";
import PageHero from "@/components/sections/PageHero";
import SectionHeading from "@/components/sections/SectionHeading";
import VenueSection from "@/components/sections/VenueSection";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { faqs } from "@/data/content";
import { sendForm } from "@/lib/forms";
import { useSeo } from "@/hooks/use-seo";
import { toast } from "sonner";

const subjects: Record<string, string> = {
  geral: "Informação geral",
  bilhetes: "Bilhetes",
  candidatura: "Candidatura / Indicação de nomeado",
  patrocinio: "Patrocínio e parcerias",
  imprensa: "Imprensa",
};

const methods = [
  { icon: Phone, label: "Telefone", value: site.contact.phone, href: site.contact.phoneHref },
  { icon: Phone, label: "Telefone (alternativo)", value: site.contact.phone2, href: site.contact.phone2Href },
  { icon: MessageCircle, label: "WhatsApp", value: site.contact.phone, href: site.contact.whatsapp },
  { icon: Mail, label: "E-mail", value: site.contact.email, href: `mailto:${site.contact.email}` },
  { icon: MapPin, label: "Local do evento", value: `${site.event.venue}, ${site.event.city}` },
];

const inputCls =
  "mt-2 h-12 w-full border-b border-input bg-transparent text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none";

const ContactForm = () => {
  const [params] = useSearchParams();
  const initial = params.get("assunto") ?? "geral";
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    if (!data.nome?.trim() || !data.mensagem?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email ?? "")) {
      toast.error("Preencha o nome, um e-mail válido e a mensagem.");
      return;
    }
    setBusy(true);
    try {
      const mode = await sendForm("contacto", { ...data, assunto: subjects[data.assunto] ?? data.assunto });
      toast.success(mode === "enviado" ? "Mensagem enviada. Responderemos em breve." : "Abrimos o seu e-mail com a mensagem preenchida — basta enviar.");
      if (mode === "enviado") form.reset();
    } catch {
      toast.error("Não foi possível enviar. Tente por WhatsApp ou telefone.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-8 sm:grid-cols-2">
      <label className="block text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
        Nome
        <input name="nome" autoComplete="name" required className={inputCls} />
      </label>
      <label className="block text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
        E-mail
        <input name="email" type="email" inputMode="email" autoComplete="email" required className={inputCls} />
      </label>
      <label className="block text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
        Telefone (opcional)
        <input name="telefone" type="tel" inputMode="tel" autoComplete="tel" className={inputCls} />
      </label>
      <label className="block text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
        Assunto
        <select name="assunto" defaultValue={subjects[initial] ? initial : "geral"} className={`${inputCls} appearance-none`}>
          {Object.entries(subjects).map(([k, v]) => (
            <option key={k} value={k} className="bg-card">
              {v}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground sm:col-span-2">
        Mensagem
        <textarea name="mensagem" required rows={4} className={`${inputCls} h-auto resize-none py-3`} />
      </label>
      <div className="sm:col-span-2">
        <Button type="submit" variant="gold" size="lg" disabled={busy} className="w-full sm:w-auto">
          {busy && <Loader2 className="animate-spin" />}
          Enviar mensagem
        </Button>
      </div>
    </form>
  );
};

const Contactos = () => {
  useSeo("Contactos", `Fale com a organização dos ${site.name}: telefone, WhatsApp, e-mail e perguntas frequentes.`);
  return (
    <PageTransition>
      <PageHero
        eyebrow="Fale connosco"
        title={<em className="text-primary">Contactos</em>}
        description="Estamos à disposição para esclarecer as suas dúvidas sobre a gala, bilhetes, nomeações e parcerias."
      />

      <section className="section">
        <div className="container-luxe grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Stagger className="divide-y divide-primary/15 border-y border-primary/15">
              {methods.map(({ icon: Icon, label, value, href }) => (
                <StaggerItem key={label}>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="group flex items-center gap-5 py-6"
                    >
                      <Icon className="h-5 w-5 shrink-0 text-primary" strokeWidth={1.25} />
                      <span className="min-w-0">
                        <span className="block text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">{label}</span>
                        <span className="mt-1 block break-all text-lg text-foreground transition-colors group-hover:text-primary">{value}</span>
                      </span>
                    </a>
                  ) : (
                    <div className="flex items-center gap-5 py-6">
                      <Icon className="h-5 w-5 shrink-0 text-primary" strokeWidth={1.25} />
                      <span>
                        <span className="block text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">{label}</span>
                        <span className="mt-1 block text-lg text-foreground">{value}</span>
                      </span>
                    </div>
                  )}
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal className="mt-12">
              <p className="eyebrow">Horário de atendimento</p>
              <dl className="mt-5 space-y-3 text-sm">
                {site.contact.hours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">{h.days}</dt>
                    <dd className="text-foreground">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal className="mt-12">
              <p className="eyebrow">Redes sociais</p>
              <ul className="mt-5 flex gap-3">
                {[
                  { href: site.social.instagram, label: "Instagram", icon: Instagram },
                  { href: site.social.facebook, label: "Facebook", icon: Facebook },
                  { href: site.social.linkedin, label: "LinkedIn", icon: Linkedin },
                  { href: site.social.youtube, label: "YouTube", icon: Youtube },
                ].map(({ href, label, icon: Icon }) => (
                  <li key={label}>
                    <a href={href} aria-label={label} className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:border-primary hover:text-primary">
                      <Icon className="h-4 w-4" />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="border border-border bg-card p-6 sm:p-10 lg:col-span-7">
            <h2 className="font-display text-3xl text-foreground">Envie-nos uma mensagem</h2>
            <p className="mb-10 mt-2 text-sm text-muted-foreground">Respondemos em dias úteis, dentro do horário de atendimento.</p>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container-luxe max-w-3xl">
          <SectionHeading eyebrow="Perguntas frequentes" title="Tudo o que precisa de saber" />
          <Reveal>
            <Accordion type="single" collapsible className="border-t border-primary/15">
              {faqs.map((f, i) => (
                <AccordionItem key={f.question} value={`faq-${i}`} className="border-b border-primary/15">
                  <AccordionTrigger className="py-6 text-left font-display text-lg font-normal text-foreground hover:text-primary hover:no-underline [&>svg]:text-primary">
                    {f.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-base leading-relaxed text-muted-foreground">{f.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      <VenueSection />
    </PageTransition>
  );
};

export default Contactos;
