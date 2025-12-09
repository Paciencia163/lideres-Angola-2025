import { Button } from "@/components/ui/button";
import { Award, Calendar, MapPin, ArrowRight, Sparkles, Users, Trophy, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Index = () => {
  const quickLinks = [
    { to: "/categorias", title: "Categorias", subtitle: "10 Categorias", icon: Trophy },
    { to: "/nomeacoes", title: "Nomeações", subtitle: "76 Nomeados", icon: Users },
    { to: "/edicao-2025", title: "Edição 2025", subtitle: "Tema e Destaques", icon: Sparkles },
    { to: "/contactos", title: "Contactos", subtitle: "Fale Connosco", icon: Star },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
        </div>

        {/* Decorative Lines */}
        <div className="absolute top-32 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute bottom-32 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-5xl mx-auto space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/10 border border-primary/30 rounded-full animate-fade-in">
              <Award className="text-primary w-5 h-5" />
              <span className="text-primary font-heading font-semibold text-sm tracking-wider">
                EDIÇÃO 2025
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold leading-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <span className="text-gradient-gold">
                GALA DE PREMIAÇÃO
              </span>
              <br />
              <span className="text-foreground text-4xl md:text-5xl lg:text-6xl">
                PRÉMIOS LÍDERES ANGOLA
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl font-elegant text-muted-foreground max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Celebrando a Excelência e a Liderança que Transforma Angola
            </p>

            {/* Event Details */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center gap-3 px-5 py-3 bg-card/50 border border-primary/20 rounded-xl backdrop-blur-sm">
                <Calendar className="text-primary w-5 h-5" />
                <span className="font-body text-foreground">18 de Dezembro de 2025</span>
              </div>
              <div className="flex items-center gap-3 px-5 py-3 bg-card/50 border border-primary/20 rounded-xl backdrop-blur-sm">
                <MapPin className="text-primary w-5 h-5" />
                <span className="font-body text-foreground">Hotel Epic Sana, Luanda</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 py-6 text-lg rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_hsl(43_74%_52%_/_0.4)] group"
              >
                <Link to="/ingressos" className="flex items-center gap-2">
                  <span>Adquirir Ingresso</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-primary/50 text-primary hover:bg-primary/10 font-semibold px-8 py-6 text-lg rounded-xl transition-all duration-300"
              >
                <Link to="/sobre">Sobre a Gala</Link>
              </Button>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.to}
                  className="group relative bg-gradient-to-br from-card to-background border border-primary/20 rounded-2xl p-6 overflow-hidden transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_30px_hsl(43_74%_52%_/_0.15)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:to-transparent transition-all duration-500" />
                  
                  <div className="relative z-10">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                      <link.icon className="text-primary w-5 h-5" />
                    </div>
                    <h3 className="font-heading text-foreground font-semibold mb-1 group-hover:text-primary transition-colors">
                      {link.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {link.subtitle}
                    </p>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/60 transition-all duration-500" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-primary rounded-full" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
