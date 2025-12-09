import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import { Award, Users, Sparkles, Calendar, Clock, MapPin, ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Edicao2025 = () => {
  const highlights = [
    {
      icon: Award,
      title: "Cerimônia de Premiação",
      description: "Reconhecimento formal dos 76 nomeados em categorias distintas"
    },
    {
      icon: Users,
      title: "Networking Premium",
      description: "Conecte-se com líderes empresariais, governamentais e culturais"
    },
    {
      icon: Sparkles,
      title: "Performances Exclusivas",
      description: "Shows artísticos e apresentações culturais de alto nível"
    }
  ];

  const schedule = [
    { time: "18:00", title: "Recepção", desc: "Cocktail de boas-vindas e networking" },
    { time: "19:00", title: "Abertura Oficial", desc: "Discursos de abertura e apresentação do evento" },
    { time: "19:30", title: "Jantar de Gala", desc: "Menu premium com performances artísticas" },
    { time: "21:00", title: "Cerimônia de Premiação", desc: "Anúncio e homenagem aos líderes em todas as categorias" },
    { time: "23:00", title: "Encerramento", desc: "After party e networking final" },
  ];

  const participants = [
    { emoji: "👔", title: "Líderes Empresariais", desc: "CEOs e empreendedores de destaque" },
    { emoji: "🏛️", title: "Figuras Governamentais", desc: "Autoridades e gestores públicos" },
    { emoji: "🎭", title: "Personalidades Culturais", desc: "Artistas e criadores influentes" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        
        <div className="absolute top-40 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-8 animate-fade-in">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">EDIÇÃO 2025</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <span className="text-gradient-gold">Liderar é Servir</span>
              <br />
              <span className="text-foreground">Angola</span>
            </h1>
            
            <p className="text-xl md:text-2xl font-elegant text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              O tema que define nossa primeira edição histórica
            </p>
          </div>
        </div>
      </section>

      {/* Theme Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-card to-background border border-primary/20 rounded-3xl p-8 md:p-12 animate-fade-in">
              <h2 className="text-3xl font-heading font-bold text-foreground mb-6 text-center">
                Nosso <span className="text-gradient-gold">Tema</span>
              </h2>
              <div className="space-y-6 text-muted-foreground font-body leading-relaxed text-lg">
                <p>
                  <span className="text-primary font-semibold">"Liderar é Servir Angola"</span> não é apenas um slogan - é uma filosofia que permeia cada aspecto dos Prémios Líderes Angola 2025.
                </p>
                <p>
                  Acreditamos que a verdadeira liderança não se mede apenas por conquistas pessoais, mas pelo impacto positivo que geramos na sociedade, nas comunidades e no futuro do nosso país.
                </p>
                <p className="text-2xl font-elegant italic text-primary text-center py-6 border-y border-primary/20">
                  "Os grandes líderes não buscam ser servidos, mas servir."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Date Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-card via-card/80 to-card/60 border border-primary/30 rounded-3xl p-10 md:p-16 text-center backdrop-blur-sm">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
                <Star className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Data do Evento</span>
              </div>
              
              <p className="text-6xl md:text-7xl font-heading font-bold text-gradient-gold mb-4">
                18 de Dezembro
              </p>
              <p className="text-4xl font-elegant text-foreground mb-8">
                2025
              </p>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-6 border-t border-primary/20">
                <div className="flex items-center gap-3">
                  <MapPin className="text-primary w-6 h-6" />
                  <span className="text-xl font-body text-foreground">Hotel Epic Sana</span>
                </div>
                <div className="hidden md:block w-px h-6 bg-primary/30" />
                <div className="flex items-center gap-3">
                  <Clock className="text-primary w-6 h-6" />
                  <span className="text-xl font-body text-foreground">18:00 - 23:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-center mb-12">
              Destaques do <span className="text-gradient-gold">Evento</span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-card to-background border border-primary/20 rounded-2xl p-8 text-center transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_40px_hsl(43_74%_52%_/_0.15)] animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/30 group-hover:scale-110 transition-transform">
                    <highlight.icon className="text-primary w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {highlight.title}
                  </h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">
                    {highlight.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Program */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-card to-background border border-primary/20 rounded-3xl p-8 md:p-12 animate-fade-in">
              <h2 className="text-3xl font-heading font-bold text-foreground mb-10 text-center">
                Programa da <span className="text-gradient-gold">Gala</span>
              </h2>
              
              <div className="space-y-0">
                {schedule.map((item, index) => (
                  <div key={index} className="group flex items-start gap-6 py-6 border-b border-primary/10 last:border-0 hover:bg-primary/5 px-4 -mx-4 rounded-xl transition-colors">
                    <div className="w-20 flex-shrink-0">
                      <span className="text-2xl font-heading font-bold text-primary">{item.time}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-heading font-semibold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-sm text-muted-foreground font-body">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Participants */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-card to-background border border-primary/30 rounded-3xl p-8 md:p-12 animate-fade-in">
              <h2 className="text-3xl font-heading font-bold text-foreground mb-10 text-center">
                Quem <span className="text-gradient-gold">Participa?</span>
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                {participants.map((item, index) => (
                  <div key={index} className="text-center group">
                    <div className="text-5xl mb-4">{item.emoji}</div>
                    <h4 className="font-heading font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-sm text-muted-foreground font-body">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
                Galeria de <span className="text-gradient-gold">Momentos</span>
              </h2>
              <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
                Reviva os momentos mais marcantes das nossas celebrações de liderança e excelência
              </p>
            </div>
            <Gallery />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/20 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
              <Award className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Garanta Sua Presença</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
              <span className="text-foreground">Faça Parte Desta</span>
              <br />
              <span className="text-gradient-gold">Noite Especial</span>
            </h2>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
              Adquira seu ingresso e celebre a liderança que transforma Angola
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/ingressos"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_hsl(43_74%_52%_/_0.4)] group"
              >
                <span>Adquirir Ingresso</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/nomeacoes"
                className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-primary/50 text-primary hover:bg-primary/10 font-semibold px-8 py-4 rounded-xl transition-all duration-300"
              >
                <span>Ver Nomeados</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Edicao2025;
