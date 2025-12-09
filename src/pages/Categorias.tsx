import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Award, Briefcase, Newspaper, GraduationCap, Heart, Palette, Lightbulb, Users, HandHeart, Building, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Categorias = () => {
  const categories = [
    {
      icon: Building,
      title: "Liderança no Setor Público",
      description: "Reconhecendo excelência na administração e serviço público",
      gradient: "from-primary/20 to-primary/5"
    },
    {
      icon: Briefcase,
      title: "Liderança Empresarial",
      description: "Empresários que impulsionam a economia nacional",
      gradient: "from-primary/25 to-primary/10"
    },
    {
      icon: Newspaper,
      title: "Liderança na Comunicação Social",
      description: "Profissionais que informam e educam a sociedade",
      gradient: "from-primary/20 to-primary/5"
    },
    {
      icon: GraduationCap,
      title: "Liderança na Educação e Formação",
      description: "Educadores que transformam vidas através do conhecimento",
      gradient: "from-primary/25 to-primary/10"
    },
    {
      icon: Heart,
      title: "Liderança na Saúde e Bem-Estar",
      description: "Profissionais dedicados ao cuidado da população",
      gradient: "from-primary/20 to-primary/5"
    },
    {
      icon: Palette,
      title: "Liderança na Cultura e Artes",
      description: "Artistas que enriquecem o patrimônio cultural angolano",
      gradient: "from-primary/25 to-primary/10"
    },
    {
      icon: Lightbulb,
      title: "Liderança Jovem e Inovação",
      description: "Jovens que lideram com criatividade e inovação",
      gradient: "from-primary/20 to-primary/5"
    },
    {
      icon: Users,
      title: "Liderança Feminina",
      description: "Mulheres que quebram barreiras e inspiram gerações",
      gradient: "from-primary/25 to-primary/10"
    },
    {
      icon: HandHeart,
      title: "Liderança Social e Comunitária",
      description: "Líderes que transformam comunidades e causas sociais",
      gradient: "from-primary/20 to-primary/5"
    },
    {
      icon: Award,
      title: "Liderança em Construção e Infraestruturas",
      description: "Profissionais que constroem o futuro de Angola",
      gradient: "from-primary/25 to-primary/10"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        
        {/* Decorative Lines */}
        <div className="absolute top-40 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute bottom-20 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">10 Categorias de Excelência</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <span className="text-foreground">Categorias de</span>
              <br />
              <span className="text-gradient-gold">Nomeação</span>
            </h1>
            
            <p className="text-xl md:text-2xl font-elegant text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Celebrando líderes que transformam Angola em diferentes setores da sociedade
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {categories.map((category, index) => (
              <div
                key={index}
                className="group relative animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Card */}
                <div className="relative h-full bg-gradient-to-br from-card to-background border border-primary/20 rounded-2xl p-6 overflow-hidden transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_40px_hsl(43_74%_52%_/_0.15)]">
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:to-transparent transition-all duration-500" />
                  
                  {/* Icon Container */}
                  <div className="relative z-10 mb-5">
                    <div className={`w-14 h-14 bg-gradient-to-br ${category.gradient} rounded-xl flex items-center justify-center border border-primary/30 group-hover:border-primary/50 transition-all duration-300 group-hover:scale-110`}>
                      <category.icon className="text-primary w-7 h-7" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-lg font-heading font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      {category.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  {/* Bottom Accent Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/60 transition-all duration-500" />
                </div>

                {/* Card Number */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs font-bold text-primary">{String(index + 1).padStart(2, '0')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: "10", label: "Categorias" },
              { number: "50+", label: "Nomeados" },
              { number: "2025", label: "Edição" },
              { number: "1", label: "Noite Especial" }
            ].map((stat, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-4xl md:text-5xl font-heading font-bold text-gradient-gold mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/20 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-card via-card/80 to-card/60 border border-primary/30 rounded-3xl p-10 md:p-16 backdrop-blur-sm relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-2xl translate-x-1/2 translate-y-1/2" />
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
                  <Award className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Faça Parte da História</span>
                </div>
                
                <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
                  <span className="text-foreground">Conhece um</span>
                  <br />
                  <span className="text-gradient-gold">Líder Inspirador?</span>
                </h2>
                
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                  Indique personalidades que merecem ser reconhecidas. As suas nomeações contribuem para identificar os verdadeiros líderes que transformam Angola.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/nomeacoes"
                    className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_hsl(43_74%_52%_/_0.4)] group"
                  >
                    <span>Ver Nomeados</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  
                  <Link
                    to="/ingressos"
                    className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-primary/50 text-primary hover:bg-primary/10 font-semibold px-8 py-4 rounded-xl transition-all duration-300"
                  >
                    <span>Adquirir Ingresso</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Categorias;
