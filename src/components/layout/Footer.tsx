import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";
import Logo from "@/components/brand/Logo";
import { site, eventDateLong } from "@/config/site";
import { sendForm } from "@/lib/forms";
import { toast } from "sonner";

const quickLinks = [
  { to: "/sobre", label: "Sobre os Prémios" },
  { to: "/categorias", label: "Categorias" },
  { to: "/nomeados", label: "Nomeados" },
  { to: "/indicacao", label: "Indicação" },
  { to: "/vencedores", label: "Vencedores" },
];

const eventLinks = [
  { to: `/edicao-${site.edition}`, label: `Edição ${site.edition}` },
  { to: "/ingressos", label: "Bilhetes" },
  { to: "/galeria", label: "Galeria" },
  { to: "/patrocinadores", label: "Patrocinadores" },
  { to: "/contactos", label: "Contactos" },
];

const socials = [
  { href: site.social.instagram, label: "Instagram", icon: Instagram },
  { href: site.social.facebook, label: "Facebook", icon: Facebook },
  { href: site.social.linkedin, label: "LinkedIn", icon: Linkedin },
  { href: site.social.youtube, label: "YouTube", icon: Youtube },
];

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      toast.error("Indique um e-mail válido.");
      return;
    }
    setBusy(true);
    try {
      const mode = await sendForm("newsletter", { email: email.trim() });
      toast.success(mode === "enviado" ? "Subscrição confirmada. Obrigado!" : "Conclua a subscrição enviando o e-mail que foi aberto.");
      setEmail("");
    } catch {
      toast.error("Não foi possível subscrever. Tente novamente.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="w-full" noValidate>
      <label htmlFor="newsletter-email" className="eyebrow mb-4 block">
        Newsletter
      </label>
      <p className="mb-5 text-sm leading-relaxed text-muted-foreground">Novidades sobre indicações, nomeados e a gala, directamente no seu e-mail.</p>
      <div className="flex border-b border-primary/40 focus-within:border-primary">
        <input
          id="newsletter-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="O seu e-mail"
          className="h-12 min-w-0 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
        />
        <button
          type="submit"
          disabled={busy}
          aria-label="Subscrever newsletter"
          className="flex h-12 w-12 items-center justify-center text-primary transition-transform duration-300 hover:translate-x-1 disabled:opacity-50"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
};

const Footer = () => (
  <footer className="relative border-t border-primary/15 bg-surface">
    <div className="container-luxe py-20 md:py-24">
      <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-6 max-w-sm font-display text-xl italic leading-snug text-foreground/90">“{site.theme}”</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {site.tagline}. Uma iniciativa da {site.organizer}, em parceria com a {site.coOrganizer}.
          </p>
          <ul className="mt-8 flex gap-3">
            {socials.map(({ href, label, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors duration-300 hover:border-primary hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Ligações rápidas" className="grid grid-cols-2 gap-8 lg:col-span-4">
          <div>
            <p className="eyebrow mb-5">Prémios</p>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-foreground/75 transition-colors hover:text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-5">A Gala</p>
            <ul className="space-y-3">
              {eventLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-foreground/75 transition-colors hover:text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="space-y-10 md:col-span-2 lg:col-span-4">
          <address className="not-italic">
            <p className="eyebrow mb-5">Contactos</p>
            <ul className="space-y-3 text-sm text-foreground/80">
              <li>
                <a href={site.contact.phoneHref} className="flex items-center gap-3 hover:text-primary">
                  <Phone className="h-4 w-4 text-primary" /> {site.contact.phone}
                </a>
              </li>
              <li>
                <a href={site.contact.phone2Href} className="flex items-center gap-3 hover:text-primary">
                  <Phone className="h-4 w-4 text-primary" /> {site.contact.phone2}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.contact.email}`} className="flex items-center gap-3 break-all hover:text-primary">
                  <Mail className="h-4 w-4 shrink-0 text-primary" /> {site.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-primary" /> {site.event.venue}, {site.event.city} · {eventDateLong}
              </li>
            </ul>
          </address>
          <Newsletter />
        </div>
      </div>

      <div className="gold-rule mt-20" />
      <div className="mt-8 flex flex-col gap-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.organizer}. Todos os direitos reservados.
        </p>
        <p className="uppercase tracking-[0.2em]">
          {site.name} · Edição {site.edition}
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
