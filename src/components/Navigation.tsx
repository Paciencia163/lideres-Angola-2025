import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const navLinks = [
  { to: "/", label: "Início" },
  { to: "/sobre", label: "Sobre" },
  { to: "/categorias", label: "Categorias" },
  { to: "/nomeacoes", label: "Nomeados" },
  { to: "/#vencedores", label: "Vencedores" },
  { to: "/#galeria", label: "Galeria" },
  { to: "/#patrocinadores", label: "Patrocinadores" },
  { to: "/contactos", label: "Contactos" },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  const isActive = (to: string) => location.pathname + location.hash === to || (to === "/" && location.pathname === "/" && !location.hash);

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-background/85 backdrop-blur-md border-b border-border" : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="container mx-auto px-5 h-20 flex items-center justify-between">
          <Link to="/" className="flex flex-col leading-none" aria-label="Prémios Líderes Angola — Início">
            <span className="font-heading text-xl tracking-wide text-foreground">Prémios Líderes</span>
            <span className="eyebrow mt-1 text-[0.6rem]">Angola</span>
          </Link>

          <div className="hidden xl:flex items-center gap-7">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`text-[0.72rem] uppercase tracking-[0.2em] transition-colors ${
                  isActive(l.to) ? "text-primary" : "text-foreground/75 hover:text-primary"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Button asChild className="hidden sm:inline-flex rounded-none px-6 uppercase tracking-[0.2em] text-xs">
              <Link to="/votar">Votar</Link>
            </Button>
            <button
              onClick={() => setIsOpen(true)}
              className="xl:hidden text-foreground p-2"
              aria-label="Abrir menu"
            >
              <Menu size={26} />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background flex flex-col"
          >
            <div className="container mx-auto px-5 h-20 flex items-center justify-between">
              <span className="font-heading text-xl">Prémios Líderes</span>
              <button onClick={() => setIsOpen(false)} aria-label="Fechar menu" className="p-2 text-primary">
                <X size={28} />
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-center px-8 gap-5">
              {navLinks.map((l, i) => (
                <motion.div key={l.to} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}>
                  <Link to={l.to} onClick={() => setIsOpen(false)} className="font-heading text-3xl text-foreground hover:text-primary transition-colors">
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <Button asChild size="lg" className="mt-6 rounded-none uppercase tracking-[0.2em] h-14">
                <Link to="/votar" onClick={() => setIsOpen(false)}>Votar Agora</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
