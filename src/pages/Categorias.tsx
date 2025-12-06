import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Award, Briefcase, Newspaper, GraduationCap, Heart, Palette, Lightbulb, Users, HandHeart, Building } from "lucide-react";

const Categorias = () => {
  const categories = [
    {
      icon: Building,
      title: "Liderança no Setor Público",
      description: "Reconhecendo excelência na administração e serviço público"
    },
    {
      icon: Briefcase,
      title: "Liderança Empresarial",
      description: "Empresários que impulsionam a economia nacional"
    },
    {
      icon: Newspaper,
      title: "Liderança na Comunicação Social",
      description: "Profissionais que informam e educam a sociedade"
    },
    {
      icon: GraduationCap,
      title: "Liderança na Educação e Formação",
      description: "Educadores que transformam vidas através do conhecimento"
    },
    {
      icon: Heart,
      title: "Liderança na Saúde e Bem-Estar",
      description: "Profissionais dedicados ao cuidado da população"
    },
    {
      icon: Palette,
      title: "Liderança na Cultura e Artes",
      description: "Artistas que enriquecem o patrimônio cultural angolano"
    },
    {
      icon: Lightbulb,
      title: "Liderança Jovem e Inovação",
      description: "Jovens que lideram com criatividade e inovação"
    },
    {
      icon: Users,
      title: "Liderança Feminina",
      description: "Mulheres que quebram barreiras e inspiram gerações"
    },
    {
      icon: HandHeart,
      title: "Liderança Social e Comunitária",
      description: "Líderes que transformam comunidades e causas sociais"
    },
    {
      icon: Award,
      title: "Liderança em Construção e Infraestruturas",
      description: "Profissionais que constroem o futuro de Angola"
    }
  ];

  return (
    <div className="min-h-screen bg-silk">
      <Navigation />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-gradient-gold mb-6">
              Categorias de Nomeação
            </h1>
            <p className="text-xl font-elegant text-silver-light">
              10 categorias que celebram a excelência em diferentes setores
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {categories.map((category, index) => (
              <div
                key={index}
                className="card-luxury p-8 hover:scale-105 transition-luxury group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-colors animate-glow">
                  <category.icon className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-heading font-bold text-primary mb-3">
                  {category.title}
                </h3>
                <p className="text-foreground font-body leading-relaxed text-sm">
                  {category.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="max-w-4xl mx-auto mt-16 card-luxury p-8 md:p-12 text-center animate-fade-in">
            <h2 className="text-3xl font-heading font-bold text-gradient-gold mb-4">
              Conheça um Líder?
            </h2>
            <p className="text-foreground font-body mb-8 leading-relaxed">
              Indique personalidades inspiradoras que merecem ser reconhecidas em uma destas categorias.
              As nomeações contribuem para identificar os verdadeiros líderes de Angola.
            </p>
            <a
              href="/nomeacoes"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 py-4 rounded-md transition-luxury animate-glow"
            >
              Nomear um Líder
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Categorias;
