import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Início" },
    { to: "/sobre", label: "Sobre" },
    { to: "/categorias", label: "Categorias" },
    { to: "/nomeacoes", label: "Nomeações" },
    { to: "/ingressos", label: "Ingressos" },
    { to: "/edicao-2025", label: "Edição 2025" },
    { to: "/contactos", label: "Contactos" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-primary/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="text-2xl font-heading font-bold text-gradient-gold">
              PRÉMIOS LÍDERES ANGOLA
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-body text-sm uppercase tracking-wider transition-luxury ${
                  isActive(link.to)
                    ? "text-primary font-semibold"
                    : "text-foreground hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6 animate-glow"
            >
              <Link to="/ingressos">Adquirir Ingresso</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-primary"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden mt-4 pb-4 space-y-4 animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`block font-body text-sm uppercase tracking-wider py-2 transition-luxury ${
                  isActive(link.to)
                    ? "text-primary font-semibold"
                    : "text-foreground hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button
              asChild
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
            >
              <Link to="/ingressos" onClick={() => setIsOpen(false)}>
                Adquirir Ingresso
              </Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
