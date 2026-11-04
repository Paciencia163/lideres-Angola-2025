import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { GALA } from "@/lib/galaData";

const Footer = () => {
  const [email, setEmail] = useState("");
  return (
    <footer className="relative border-t border-border bg-card/40">
      <div className="container mx-auto px-5 py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-heading text-2xl">Prémios Líderes</p>
          <p className="eyebrow mt-1">Angola</p>
          <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
            Celebrando a Excelência e a Liderança em Angola.
          </p>
          <div className="flex gap-4 mt-6">
            {[Facebook, Instagram, Linkedin, Youtube].map((I, i) => (
              <a key={i} href="#" aria-label="Rede social" className="text-muted-foreground hover:text-primary transition-colors">
                <I size={18} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <p className="eyebrow mb-5">Links rápidos</p>
          <ul className="space-y-3 text-sm">
            {[["/sobre", "Sobre"], ["/categorias", "Categorias"], ["/nomeacoes", "Nomeados"], ["/votar", "Votar"], ["/ingressos", "Ingressos"], ["/entrar", "Área reservada"]].map(([to, l]) => (
              <li key={to}><Link to={to} className="text-foreground/75 hover:text-primary transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-5">Contactos</p>
          <ul className="space-y-3 text-sm text-foreground/80">
            <li className="flex gap-3"><Phone size={16} className="text-primary mt-0.5" />+244 922 812 224</li>
            <li className="flex gap-3"><Mail size={16} className="text-primary mt-0.5" />angolajobssummit@gmail.com</li>
            <li className="flex gap-3"><MapPin size={16} className="text-primary mt-0.5" />{GALA.venue}, {GALA.city}</li>
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-5">Newsletter</p>
          <p className="text-sm text-muted-foreground mb-4">Receba as novidades da gala em primeira mão.</p>
          <form
            onSubmit={(e) => { e.preventDefault(); if (!/\S+@\S+\.\S+/.test(email)) return toast.error("Email inválido"); toast.success("Obrigado! Subscrição registada."); setEmail(""); }}
            className="flex"
          >
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="O seu email" aria-label="Email" className="rounded-none bg-background" />
            <Button type="submit" className="rounded-none">OK</Button>
          </form>
        </div>
      </div>
      <div className="gold-rule" />
      <p className="py-6 text-center text-xs text-muted-foreground tracking-wider">
        © {new Date().getFullYear()} Luadeira Digital Angola. Todos os direitos reservados.
      </p>
    </footer>
  );
};

export default Footer;
