import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Target, Eye, Heart } from "lucide-react";

const Sobre = () => {
  const values = [
    { icon: Heart, title: "Excelência", desc: "Reconhecemos apenas o mais alto nível" },
    { icon: Target, title: "Ética", desc: "Integridade em todas as decisões" },
    { icon: Eye, title: "Inovação", desc: "Valorizamos o pensamento transformador" },
  ];

  return (
    <div className="min-h-screen bg-silk">
      <Navigation />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-gradient-gold mb-6">
              Sobre o Evento
            </h1>
            <p className="text-xl font-elegant text-silver-light">
              Uma celebração da liderança que transforma Angola
            </p>
          </div>

          {/* Main Content */}
          <div className="max-w-5xl mx-auto space-y-12">
            {/* About */}
            <div className="card-luxury p-8 md:p-12 animate-fade-in">
              <h2 className="text-3xl font-heading font-bold text-primary mb-6">
                Os Prémios Líderes Angola
              </h2>
              <div className="space-y-4 text-foreground font-body leading-relaxed">
                <p>
                  Os <span className="text-primary font-semibold">Prémios Líderes Angola</span> são uma iniciativa da{" "}
                  <span className="text-primary font-semibold">Luadeira Digital Angola</span> que reconhece personalidades,
                  instituições e projetos com impacto positivo no país.
                </p>
                <p>
                  O evento distingue quem inspira, lidera e transforma Angola através de suas ações,
                  decisões e compromisso com o desenvolvimento nacional.
                </p>
                <p className="text-silver-light italic">
                  "Liderar é servir Angola" - não é apenas nosso tema, é nossa filosofia.
                </p>
              </div>
            </div>

            {/* Mission & Vision */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card-luxury p-8 animate-fade-in hover:scale-105 transition-luxury">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                  <Target className="text-primary" size={32} />
                </div>
                <h3 className="text-2xl font-heading font-bold text-primary mb-4">
                  Missão
                </h3>
                <p className="text-foreground font-body leading-relaxed">
                  Valorizar a liderança transformadora que contribui para o progresso,
                  a inovação e o bem-estar da sociedade angolana.
                </p>
              </div>

              <div className="card-luxury p-8 animate-fade-in hover:scale-105 transition-luxury">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                  <Eye className="text-primary" size={32} />
                </div>
                <h3 className="text-2xl font-heading font-bold text-primary mb-4">
                  Visão
                </h3>
                <p className="text-foreground font-body leading-relaxed">
                  Ser o palco máximo de reconhecimento nacional, celebrando anualmente
                  os líderes que moldam o futuro de Angola.
                </p>
              </div>
            </div>

            {/* Values */}
            <div className="card-luxury p-8 md:p-12 animate-fade-in">
              <h2 className="text-3xl font-heading font-bold text-primary mb-8 text-center">
                Nossos Valores
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {values.map((value, index) => (
                  <div key={index} className="text-center group">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <value.icon className="text-primary" size={36} />
                    </div>
                    <h4 className="text-xl font-heading font-semibold text-primary mb-2">
                      {value.title}
                    </h4>
                    <p className="text-sm text-muted-foreground font-body">
                      {value.desc}
                    </p>
                  </div>
                ))}
              </div>
              <div className="grid md:grid-cols-2 gap-6 mt-8 pt-8 border-t border-primary/20">
                <div className="text-center">
                  <h4 className="text-lg font-heading font-semibold text-primary mb-2">
                    Compromisso
                  </h4>
                  <p className="text-sm text-muted-foreground font-body">
                    Com o desenvolvimento sustentável
                  </p>
                </div>
                <div className="text-center">
                  <h4 className="text-lg font-heading font-semibold text-primary mb-2">
                    Liderança
                  </h4>
                  <p className="text-sm text-muted-foreground font-body">
                    Que inspira e transforma
                  </p>
                </div>
              </div>
            </div>

            {/* Organizer */}
            <div className="bg-gradient-gold p-8 md:p-12 rounded-lg text-center animate-fade-in">
              <h3 className="text-2xl font-heading font-bold text-primary-foreground mb-4">
                Organizado por
              </h3>
              <p className="text-3xl font-heading font-bold text-primary-foreground mb-2">
                Luadeira Digital Angola
              </p>
              <p className="text-primary-foreground/90 font-body">
                Líder em eventos corporativos e reconhecimento profissional
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Sobre;
