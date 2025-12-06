import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import { Award, Users, Sparkles, Calendar } from "lucide-react";

const Edicao2025 = () => {
  const highlights = [
    {
      icon: Award,
      title: "Cerimônia de Premiação",
      description: "Reconhecimento formal dos 50 nomeados em 10 categorias distintas"
    },
    {
      icon: Users,
      title: "Networking Premium",
      description: "Oportunidade de conectar com líderes empresariais, governamentais e culturais"
    },
    {
      icon: Sparkles,
      title: "Performances Exclusivas",
      description: "Shows artísticos e apresentações culturais de alto nível"
    }
  ];

  return (
    <div className="min-h-screen bg-silk">
      <Navigation />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-16 animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/30 rounded-full px-6 py-2 mb-6">
              <Calendar className="text-primary" size={20} />
              <span className="text-primary font-heading font-semibold text-sm tracking-wider">
                EDIÇÃO 2025
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
              <span className="text-gradient-gold">Liderar é Servir</span>
              <br />
              <span className="text-foreground">Angola</span>
            </h1>
            <p className="text-xl font-elegant text-silver-light">
              O tema que define nossa primeira edição histórica
            </p>
          </div>

          {/* Main Content */}
          <div className="max-w-5xl mx-auto space-y-12">
            {/* Theme Explanation */}
            <div className="card-luxury p-8 md:p-12 animate-fade-in">
              <h2 className="text-3xl font-heading font-bold text-primary mb-6 text-center">
                Nosso Tema
              </h2>
              <div className="space-y-6 text-foreground font-body leading-relaxed">
                <p className="text-lg">
                  <span className="text-primary font-semibold">"Liderar é Servir Angola"</span> não é apenas
                  um slogan - é uma filosofia que permeia cada aspecto dos Prémios Líderes Angola 2025.
                </p>
                <p>
                  Acreditamos que a verdadeira liderança não se mede apenas por conquistas pessoais,
                  mas pelo impacto positivo que geramos na sociedade, nas comunidades e no futuro do nosso país.
                </p>
                <p className="text-silver-light italic text-center text-xl mt-8">
                  "Os grandes líderes não buscam ser servidos, mas servir."
                </p>
              </div>
            </div>

            {/* Event Date */}
            <div className="bg-gradient-gold p-8 md:p-12 rounded-lg text-center animate-fade-in">
              <h2 className="text-3xl font-heading font-bold text-primary-foreground mb-6">
                Data do Evento
              </h2>
              <div className="space-y-4">
                <p className="text-5xl font-heading font-bold text-primary-foreground">
                  18 de Dezembro
                </p>
                <p className="text-3xl font-elegant text-primary-foreground/90">
                  2025
                </p>
                <div className="mt-6 pt-6 border-t border-primary-foreground/20">
                  <p className="text-2xl font-body text-primary-foreground">
                    🏨 Hotel Epic Sana
                  </p>
                  <p className="text-xl font-body text-primary-foreground/90 mt-2">
                    Luanda, Angola
                  </p>
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="animate-fade-in">
              <h2 className="text-3xl font-heading font-bold text-center text-primary mb-10">
                Destaques do Evento
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="card-luxury p-8 text-center hover:scale-105 transition-luxury group"
                  >
                    <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/30 transition-colors animate-glow">
                      <highlight.icon className="text-primary" size={36} />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-primary mb-3">
                      {highlight.title}
                    </h3>
                    <p className="text-foreground font-body text-sm leading-relaxed">
                      {highlight.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Program Overview */}
            <div className="card-luxury p-8 md:p-12 animate-fade-in">
              <h2 className="text-3xl font-heading font-bold text-primary mb-8 text-center">
                Programa da Gala
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4 pb-6 border-b border-primary/20">
                  <div className="w-20 flex-shrink-0">
                    <span className="text-primary font-heading font-bold text-lg">18:00</span>
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-foreground mb-2">Recepção</h4>
                    <p className="text-sm text-muted-foreground font-body">
                      Cocktail de boas-vindas e networking
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 pb-6 border-b border-primary/20">
                  <div className="w-20 flex-shrink-0">
                    <span className="text-primary font-heading font-bold text-lg">19:00</span>
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-foreground mb-2">
                      Abertura Oficial
                    </h4>
                    <p className="text-sm text-muted-foreground font-body">
                      Discursos de abertura e apresentação do evento
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 pb-6 border-b border-primary/20">
                  <div className="w-20 flex-shrink-0">
                    <span className="text-primary font-heading font-bold text-lg">19:30</span>
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-foreground mb-2">Jantar de Gala</h4>
                    <p className="text-sm text-muted-foreground font-body">
                      Menu premium com performances artísticas
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 pb-6 border-b border-primary/20">
                  <div className="w-20 flex-shrink-0">
                    <span className="text-primary font-heading font-bold text-lg">21:00</span>
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-foreground mb-2">
                      Cerimônia de Premiação
                    </h4>
                    <p className="text-sm text-muted-foreground font-body">
                      Anúncio e homenagem aos líderes em todas as categorias
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-20 flex-shrink-0">
                    <span className="text-primary font-heading font-bold text-lg">23:00</span>
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-foreground mb-2">Encerramento</h4>
                    <p className="text-sm text-muted-foreground font-body">
                      After party e networking final
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Participation */}
            <div className="card-luxury p-8 md:p-12 animate-fade-in border-2 border-primary/30">
              <h2 className="text-3xl font-heading font-bold text-primary mb-6 text-center">
                Quem Participa?
              </h2>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-4xl mb-3">👔</div>
                  <h4 className="font-heading font-semibold text-foreground mb-2">
                    Líderes Empresariais
                  </h4>
                  <p className="text-sm text-muted-foreground font-body">
                    CEOs e empreendedores de destaque
                  </p>
                </div>
                <div>
                  <div className="text-4xl mb-3">🏛️</div>
                  <h4 className="font-heading font-semibold text-foreground mb-2">
                    Figuras Governamentais
                  </h4>
                  <p className="text-sm text-muted-foreground font-body">
                    Autoridades e gestores públicos
                  </p>
                </div>
                <div>
                  <div className="text-4xl mb-3">🎭</div>
                  <h4 className="font-heading font-semibold text-foreground mb-2">
                    Personalidades Culturais
                  </h4>
                  <p className="text-sm text-muted-foreground font-body">
                    Artistas e criadores influentes
                  </p>
                </div>
              </div>
            </div>

            {/* Gallery Section */}
            <div className="animate-fade-in">
              <h2 className="text-3xl font-heading font-bold text-center text-primary mb-4">
                Galeria de Momentos
              </h2>
              <p className="text-center text-muted-foreground font-body mb-10 max-w-2xl mx-auto">
                Reviva os momentos mais marcantes das nossas celebrações de liderança e excelência
              </p>
              <Gallery />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Edicao2025;
