import { Button } from "@/components/ui/button";
import { Award, Calendar, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-silk">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-black">
          <div className="absolute inset-0 animate-shimmer opacity-30"></div>
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-5xl mx-auto space-y-8 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/30 rounded-full px-6 py-2">
              <Award className="text-primary" size={20} />
              <span className="text-primary font-heading font-semibold text-sm tracking-wider">
                EDIÇÃO 2025
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl font-heading font-bold leading-tight">
              <span className="text-gradient-gold">
                GALA DE PREMIAÇÃO
              </span>
              <br />
              <span className="text-foreground">
                PRÉMIOS LÍDERES ANGOLA 2025
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl font-elegant text-silver-light max-w-3xl mx-auto">
              Celebrando a Excelência e a Liderança em Angola
            </p>

            {/* Event Details */}
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 text-foreground">
              <div className="flex items-center space-x-2">
                <Calendar className="text-primary" size={24} />
                <span className="font-body text-lg">18 de Dezembro de 2025</span>
              </div>
              <div className="hidden md:block w-px h-6 bg-primary/30"></div>
              <div className="flex items-center space-x-2">
                <MapPin className="text-primary" size={24} />
                <span className="font-body text-lg">Hotel Epic Sana, Luanda</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 pt-8">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 py-6 text-lg animate-glow group"
              >
                <Link to="/ingressos" className="flex items-center space-x-2">
                  <span>Adquirir Ingresso</span>
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-8 py-6 text-lg transition-luxury"
              >
                <Link to="/sobre">Sobre a Gala</Link>
              </Button>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12">
              <Link
                to="/categorias"
                className="card-luxury p-6 text-center hover:scale-105 transition-luxury group"
              >
                <h3 className="font-heading text-primary font-semibold mb-2">Categorias</h3>
                <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  10 Categorias
                </p>
              </Link>

              <Link
                to="/nomeacoes"
                className="card-luxury p-6 text-center hover:scale-105 transition-luxury group"
              >
                <h3 className="font-heading text-primary font-semibold mb-2">Nomeações</h3>
                <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  Indique um Líder
                </p>
              </Link>

              <Link
                to="/edicao-2025"
                className="card-luxury p-6 text-center hover:scale-105 transition-luxury group"
              >
                <h3 className="font-heading text-primary font-semibold mb-2">Edição 2025</h3>
                <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  Tema e Destaques
                </p>
              </Link>

              <Link
                to="/contactos"
                className="card-luxury p-6 text-center hover:scale-105 transition-luxury group"
              >
                <h3 className="font-heading text-primary font-semibold mb-2">Contactos</h3>
                <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  Fale Connosco
                </p>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-primary rounded-full"></div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
