import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Target, Eye, Heart, Sparkles, Award, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Sobre = () => {
  const values = [
    { icon: Heart, title: "Excelência", desc: "Reconhecemos apenas o mais alto nível de liderança" },
    { icon: Target, title: "Ética", desc: "Integridade e transparência em todas as decisões" },
    { icon: Eye, title: "Inovação", desc: "Valorizamos o pensamento transformador" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        
        <div className="absolute top-40 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Sobre o Evento</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <span className="text-foreground">Uma Celebração da</span>
              <br />
              <span className="text-gradient-gold">Liderança Angolana</span>
            </h1>
            
            <p className="text-xl md:text-2xl font-elegant text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Reconhecendo quem inspira, lidera e transforma Angola
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-card to-background border border-primary/20 rounded-3xl p-8 md:p-12 mb-12 animate-fade-in">
              <h2 className="text-3xl font-heading font-bold text-foreground mb-6">
                Os <span className="text-gradient-gold">Prémios Líderes Angola</span>
              </h2>
              <div className="space-y-4 text-muted-foreground font-body leading-relaxed text-lg">
                <p>
                  Uma iniciativa da <span className="text-primary font-semibold">Luadeira Digital Angola</span> que reconhece personalidades, instituições e projetos com impacto positivo no país.
                </p>
                <p>
                  O evento distingue quem inspira, lidera e transforma Angola através de suas ações, decisões e compromisso com o desenvolvimento nacional.
                </p>
                <p className="text-xl font-elegant italic text-primary border-l-4 border-primary/30 pl-6 py-2">
                  "Liderar é servir Angola" - não é apenas nosso tema, é nossa filosofia.
                </p>
              </div>
            </div>

            {/* Mission & Vision */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="group bg-gradient-to-br from-card to-background border border-primary/20 rounded-2xl p-8 transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_40px_hsl(43_74%_52%_/_0.15)] animate-fade-in">
                <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center mb-6 border border-primary/30 group-hover:scale-110 transition-transform">
                  <Target className="text-primary w-7 h-7" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                  Missão
                </h3>
                <p className="text-muted-foreground font-body leading-relaxed">
                  Valorizar a liderança transformadora que contribui para o progresso, a inovação e o bem-estar da sociedade angolana.
                </p>
              </div>

              <div className="group bg-gradient-to-br from-card to-background border border-primary/20 rounded-2xl p-8 transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_40px_hsl(43_74%_52%_/_0.15)] animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center mb-6 border border-primary/30 group-hover:scale-110 transition-transform">
                  <Eye className="text-primary w-7 h-7" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                  Visão
                </h3>
                <p className="text-muted-foreground font-body leading-relaxed">
                  Ser o palco máximo de reconhecimento nacional, celebrando anualmente os líderes que moldam o futuro de Angola.
                </p>
              </div>
            </div>

            {/* Values */}
            <div className="bg-gradient-to-br from-card to-background border border-primary/20 rounded-3xl p-8 md:p-12 animate-fade-in">
              <h2 className="text-3xl font-heading font-bold text-foreground mb-10 text-center">
                Nossos <span className="text-gradient-gold">Valores</span>
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {values.map((value, index) => (
                  <div key={index} className="text-center group">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-primary/30 group-hover:scale-110 group-hover:border-primary/50 transition-all duration-300">
                      <value.icon className="text-primary w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {value.title}
                    </h4>
                    <p className="text-sm text-muted-foreground font-body">
                      {value.desc}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mt-10 pt-10 border-t border-primary/20">
                <div className="text-center px-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Award className="text-primary w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-heading font-semibold text-foreground mb-2">
                    Compromisso
                  </h4>
                  <p className="text-sm text-muted-foreground font-body">
                    Com o desenvolvimento sustentável de Angola
                  </p>
                </div>
                <div className="text-center px-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Users className="text-primary w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-heading font-semibold text-foreground mb-2">
                    Liderança
                  </h4>
                  <p className="text-sm text-muted-foreground font-body">
                    Que inspira e transforma gerações
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Organizer Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/20 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-card via-card/80 to-card/60 border border-primary/30 rounded-3xl p-10 md:p-16 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-2xl translate-x-1/2 translate-y-1/2" />
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Organização</span>
                </div>
                
                <h3 className="text-2xl text-muted-foreground font-body mb-4">
                  Organizado por
                </h3>
                <p className="text-4xl md:text-5xl font-heading font-bold text-gradient-gold mb-4">
                  Luadeira Digital Angola
                </p>
                <p className="text-lg text-muted-foreground font-body mb-8">
                  Líder em eventos corporativos e reconhecimento profissional
                </p>
                
                <Link
                  to="/contactos"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_hsl(43_74%_52%_/_0.4)] group"
                >
                  <span>Entre em Contacto</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Sobre;
