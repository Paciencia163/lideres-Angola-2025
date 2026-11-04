import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Logo from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { site } from "@/config/site";
import { EASE } from "@/lib/motion";

const navLinks = [
  { to: "/", label: "Início" },
  { to: "/sobre", label: "Sobre" },
  { to: "/categorias", label: "Categorias" },
  { to: "/nomeados", label: "Nomeados" },
  { to: "/vencedores", label: "Vencedores" },
  { to: "/galeria", label: "Galeria" },
  { to: "/patrocinadores", label: "Patrocinadores" },
  { to: "/contactos", label: "Contactos" },
];

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ease-luxury",
          solid ? "border-b border-primary/10 bg-background/80 backdrop-blur-xl" : "border-b border-transparent bg-transparent",
        )}
      >
        <nav aria-label="Navegação principal" className="container-luxe flex h-nav items-center justify-between gap-6">
          <Link to="/" aria-label={`${site.name} — página inicial`} className="relative z-10">
            <Logo />
          </Link>

          <ul className="hidden items-center gap-6 xl:flex 2xl:gap-7">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    cn(
                      "group relative py-2 font-sans text-[0.7rem] uppercase tracking-[0.2em] transition-colors duration-300",
                      isActive ? "text-primary" : "text-foreground/75 hover:text-foreground",
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      <span
                        className={cn(
                          "absolute -bottom-0.5 left-0 h-px bg-primary transition-all duration-500 ease-luxury",
                          isActive ? "w-full" : "w-0 group-hover:w-full",
                        )}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Button asChild variant="gold-outline" size="sm" className="hidden sm:inline-flex">
              <Link to="/entrar">Entrar</Link>
            </Button>
            <Button asChild variant="gold" size="sm" className="hidden sm:inline-flex">
              <Link to="/indicacao">Indicar</Link>
            </Button>

            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              className="relative z-10 -mr-2 flex h-11 w-11 flex-col items-center justify-center gap-[7px] xl:hidden"
            >
              <span className={cn("h-px w-6 bg-foreground transition-transform duration-500 ease-luxury", open && "translate-y-[4px] rotate-45")} />
              <span className={cn("h-px w-6 bg-foreground transition-transform duration-500 ease-luxury", open && "-translate-y-[4px] -rotate-45")} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col bg-background pt-nav xl:hidden"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.10),transparent_60%)]" />
            <motion.ul
              className="container-luxe relative flex flex-1 flex-col justify-center gap-1 py-8"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.25 } } }}
            >
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.to}
                  variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
                >
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    className={({ isActive }) =>
                      cn(
                        "flex items-baseline gap-4 border-b border-border/60 py-3 font-display text-[1.9rem] leading-tight transition-colors xs:text-4xl",
                        isActive ? "text-primary" : "text-foreground hover:text-primary",
                      )
                    }
                  >
                    <span className="w-6 font-sans text-[0.65rem] tracking-[0.2em] text-primary/70">{String(i + 1).padStart(2, "0")}</span>
                    {link.label}
                  </NavLink>
                </motion.li>
              ))}
            </motion.ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.6 } }}
              className="container-luxe relative flex flex-col gap-4 pb-10"
            >
              <Button asChild variant="gold-outline" size="lg" className="w-full">
                <Link to="/entrar">Entrar</Link>
              </Button>
              <Button asChild variant="gold" size="lg" className="w-full">
                <Link to="/indicacao">Fazer Indicação</Link>
              </Button>
              <a href={site.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                WhatsApp {site.contact.phone} <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
