import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import { Users, Award, Ticket, Info, Trophy, Sparkles, Building2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ScrollReveal } from "@/hooks/use-scroll-reveal";

const Nomeacoes = () => {
  const figurasCategorias = [
    { categoria: "Líder em Defesa dos Direitos Humanos", nomeados: ["Victorina Cuanga", "Esperança Sita Garreth"] },
    { categoria: "Líder em Ensino e Conhecimento", nomeados: ["Venceslau Andrade", "Evandra Martins", "Carlos Feijó", "Matias Caxixi", "Ana Pita Gros Martins da Silva", "Amilcar Mário António", "Otávio Muanza"] },
    { categoria: "Líder em Ciências e Inovação", nomeados: ["Marco Paulo e Marco Romero"] },
    { categoria: "Líder em Saúde e Bem-estar", nomeados: ["Sweni Coelho", "Silva Lutucuta", "Jovita André"] },
    { categoria: "Líder em Gestão Pública", nomeados: ["Vera Daves", "Márcio de Jesus Lopes Daniel", "Cristina Lourenço"] },
    { categoria: "Líder em Produção de Conteúdo Digital", nomeados: ["Silirasday"] },
    { categoria: "Líder em Criação de Conteúdo sobre Finança e Economia", nomeados: ["Nuno Baio", "Euclides Francisco"] },
    { categoria: "Líder Empresarial Sector Privado", nomeados: ["Sarchel Nécesio", "Wilson Ganga", "Adilson Nelumba", "Bento Kangamba", "António Duarte", "Edmasio Casimiro", "Rosário André Pedro Kivota", "Eliseu Quituxi", "Julio Varela", "Lucas Cassanguidi"] },
    { categoria: "Líder Mulher do Ano", nomeados: ["Berta Rodrigue Issa", "Ludmila Cangundo", "Marleyh Selo", "Laurinda Macedo", "Juliana Fontes Pereira", "Neusa Semedo Colsoul", "Lisandra Francisco", "Beatriz A. N. Silva", "Karina Barbosa", "Mara Quiosa"] },
    { categoria: "Líder em Comunicação na Diáspora", nomeados: ["Pedro Muenho", "Hariana Vera"] },
    { categoria: "Líder Jovem do Ano", nomeados: ["Nair Nany", "Jessi Madalena"] },
    { categoria: "Líder em Literatura e Impacto Social", nomeados: ["Nituecheni Africano"] },
    { categoria: "Líder Juvenil de Impacto Social", nomeados: ["Mateus Esteita"] },
    { categoria: "Líder em Comunicação, Marketing e Assessoria de Imprensa", nomeados: ["Mariano da Fonseca", "Monaliza Queiroz"] },
    { categoria: "Líder em Comunicação Social e Televisão", nomeados: ["Benvindo Magalhães", "Dina Simão"] },
    { categoria: "Líder em Comunicação e Televisão", nomeados: ["Geovany Comandala"] },
    { categoria: "Líder em Finanças e Economia", nomeados: ["Geraldo Dala"] },
    { categoria: "Líder em Impacto Social na Diáspora Angolana", nomeados: ["Gabriel Cambinda"] },
    { categoria: "Líder em Literatura e Arte na Diáspora Angolana", nomeados: ["Cutana Carvalho"] },
    { categoria: "Líder Regional Norte", nomeados: ["Francisco Amado John"] },
    { categoria: "Líder em Responsabilidade Social, Cultural e Criatividade", nomeados: ["Conde dos Bolos"] },
    { categoria: "Líder em Impacto Social Notável", nomeados: ["Fly Skuad"] },
    { categoria: "Líder em Política e Gestão Pública", nomeados: ["Danila Bragança"] },
    { categoria: "Líder em Responsabilidade Social, Arte e Cultural", nomeados: ["C4 Pedro", "Yola Araújo"] },
    { categoria: "Líder em Impacto e Responsabilidade Social e Corporativa", nomeados: ["Cumbi Jr", "Patrícia Gonçalves", "Link Duílio"] },
    { categoria: "Líder em Responsabilidade Social e Cultural", nomeados: ["Vina Criolo", "Soraya da Piedade"] },
    { categoria: "Líder em Responsabilidade Social, Moda e Cultural", nomeados: ["Sara Mosquito", "Hadjalmar El Vaim", "Nadir Taty"] },
    { categoria: "Líder em Gestão Empresarial no Sector Privado", nomeados: ["Benedito P. Manuel", "Aparna Krovi", "Leonel Correia", "Maria Uini Baptista", "Adilson Paulo", "Euridce Nascimento", "Pedro Godinho"] },
    { categoria: "Líder em Responsabilidade Social, Cultural e Turismo", nomeados: ["Leila Lopes"] },
    { categoria: "Líder em Empreendedorismo Local", nomeados: ["Guilherme Afonso"] },
    { categoria: "Líder em Política Pública", nomeados: ["Aia Eza da Silva"] },
    { categoria: "Líder em Diplomacia Política", nomeados: ["Stella Santiago", "Dalva Ringote"] },
    { categoria: "Líder em Negócios, Cultural e Turismo", nomeados: ["Leon Lemos"] },
  ];

  const instituicoesCategorias = [
    { categoria: "Líder em Hotelaria e Lazer", nomeados: ["Hotel Sivam", "Hotel EPIC Sana"] },
    { categoria: "Líder em Responsabilidade Social e Desenvolvimento Pessoal", nomeados: ["Instituto Innante"] },
    { categoria: "Líder em Comunicação, Podcast de Debates", nomeados: ["Goza Aqui", "Pensar Angola"] },
    { categoria: "Líder em Ensino e Desenvolvimento Humano", nomeados: ["Universidade Gregório Semedo", "Universidade Unibela", "Universidade Muandume Ya Ndemufayo", "Bolsas de estudos Emanuel Xirimbimbi"] },
    { categoria: "Líder em Governação", nomeados: ["Governo Provincial do Huambo", "Governo Provincial do Namibe"] },
    { categoria: "Líder em Responsabilidade Social e Desenvolvimento Humano", nomeados: ["FIJE"] },
    { categoria: "Líder em Comunicação e Apoio Social", nomeados: ["Fly Podcast"] },
    { categoria: "Líder em Restauração e Lazer", nomeados: ["Detalhe de Luxo"] },
    { categoria: "Líder na Indústria e Produção Nacional", nomeados: ["Novaagrolider", "Catoca", "Yetwene"] },
    { categoria: "Líder em Finanças e Banca", nomeados: ["Banco BAI", "Paypay"] },
    { categoria: "Líder no Sector Público", nomeados: ["CCIAM"] },
    { categoria: "Líder em Responsabilidade Social Corporativa", nomeados: ["Angola Business byn Border"] },
    { categoria: "Líder no Sector Automobilístico", nomeados: ["Jetour"] },
    { categoria: "Líder em Mobilidade Urbana", nomeados: ["Ugo", "EV GRUPO"] },
    { categoria: "Líder em Saúde Pública", nomeados: ["Hospital Materno Infantil", "Ordem dos Médicos"] },
    { categoria: "Líder em Televisão", nomeados: ["TV Zimbo"] },
    { categoria: "Líder em Rádio e Comunicação no Digital", nomeados: ["Platina Fm"] },
    { categoria: "Líder em Responsabilidade Social", nomeados: ["Associação dos Vitiligos", "Associação MKV", "Miss Angola Universo"] },
    { categoria: "Líder em Infraestrutura e Fiscalização e Construção Civil", nomeados: ["Group Copia", "Tegma SU"] },
    { categoria: "Líder em Inovação e Tecnologia, Telecomunicações e Comunicação", nomeados: ["Portal de TI", "Ouranós Record"] },
    { categoria: "Líder em Restauração e Turismo na Diáspora Angolana", nomeados: ["Pura Experiência"] },
    { categoria: "Líder em Informação Jornal Digital", nomeados: ["Club K"] },
    { categoria: "Líder em Asseguramento e Protecção", nomeados: ["Socorro"] },
  ];

  const totalNomeados = figurasCategorias.reduce((acc, cat) => acc + cat.nomeados.length, 0) + 
                        instituicoesCategorias.reduce((acc, cat) => acc + cat.nomeados.length, 0);
  const totalCategorias = figurasCategorias.length + instituicoesCategorias.length;

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
              <Trophy className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">{totalNomeados} Nomeados • {totalCategorias} Categorias</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <span className="text-gradient-gold">Nomeações</span>
            </h1>
            
            <p className="text-xl md:text-2xl font-elegant text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Reconhecendo os líderes que transformam Angola
            </p>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-card to-background border border-primary/20 rounded-3xl p-8 md:p-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center border border-primary/30">
                  <Users className="text-primary w-7 h-7" />
                </div>
                <h2 className="text-3xl font-heading font-bold text-foreground">
                  Processo de Nomeação
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground font-body leading-relaxed text-lg">
                <p>
                  Os <span className="text-primary font-semibold">Prémios Líderes Angola 2025</span> reconhecem{" "}
                  <span className="text-primary font-semibold">{totalNomeados} nomeados</span> em {totalCategorias} categorias distintas, divididas entre figuras individuais e instituições.
                </p>
                <p>
                  As nomeações visam identificar personalidades, empresas e projetos que se destacam pela liderança, inovação e impacto positivo em Angola.
                </p>
                <p className="text-sm">
                  Cada indicação é cuidadosamente avaliada por nosso júri especializado.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { number: totalNomeados.toString(), label: "Nomeados" },
              { number: totalCategorias.toString(), label: "Categorias" },
              { number: "150", label: "Lugares" },
              { number: "2025", label: "Edição" }
            ].map((stat, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="text-center bg-card/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-6">
                  <div className="text-4xl md:text-5xl font-heading font-bold text-gradient-gold mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Ticket Policy */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-card to-background border-2 border-primary/30 rounded-3xl p-8 md:p-12">
              <div className="flex items-start gap-4 mb-8">
                <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center border border-primary/30 flex-shrink-0">
                  <Ticket className="text-primary w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
                    Política de Ingressos
                  </h2>
                  <p className="text-muted-foreground font-body text-sm">
                    Sistema de convites e acompanhantes
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-primary/10 p-6 rounded-xl border border-primary/20">
                  <h3 className="text-xl font-heading font-semibold text-primary mb-3">
                    Para Nomeados
                  </h3>
                  <p className="text-foreground font-body">
                    Cada nomeado recebe <span className="text-primary font-bold">1 convite gratuito</span> para participar da Gala de Premiação.
                  </p>
                </div>

                <div className="bg-muted/30 p-6 rounded-xl border border-primary/20">
                  <h3 className="text-xl font-heading font-semibold text-primary mb-3">
                    Acompanhantes Adicionais
                  </h3>
                  <p className="text-foreground font-body mb-4">
                    Ingressos adicionais para acompanhantes:
                  </p>
                  <div className="bg-primary/20 p-4 rounded-lg text-center">
                    <p className="text-3xl font-heading font-bold text-primary">
                      125.000 Kz
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">por ingresso adicional</p>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 mt-6">
                <div className="flex items-start gap-3">
                  <Info className="text-primary mt-1 flex-shrink-0 w-5 h-5" />
                  <div className="text-muted-foreground font-body text-sm leading-relaxed">
                    <p className="mb-2">
                      <span className="font-semibold text-primary">Política de sustentabilidade:</span> Os valores dos ingressos adicionais contribuem para a viabilidade e continuidade do projeto Prémios Líderes Angola.
                    </p>
                    <p>
                      Este investimento garante um evento de alta qualidade e permite que possamos continuar reconhecendo a excelência em Angola.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Nominees List - Figuras */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Nomeados 2025</span>
              </div>
              <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
                Categorias de <span className="text-gradient-gold">Figuras</span>
              </h2>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {figurasCategorias.map((cat, idx) => (
                <ScrollReveal key={idx} delay={(idx % 6) * 0.05}>
                  <div className="group bg-gradient-to-br from-card to-background border border-primary/20 rounded-xl p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_20px_hsl(43_74%_52%_/_0.1)] h-full">
                    <h4 className="text-sm font-heading font-bold text-primary mb-3 leading-tight">
                      {cat.categoria}
                    </h4>
                    <ul className="space-y-1.5">
                      {cat.nomeados.map((nome, nIdx) => (
                        <li key={nIdx} className="flex items-center gap-2 text-foreground font-body text-sm">
                          <Award className="text-primary/60 flex-shrink-0 w-3.5 h-3.5" />
                          <span>{nome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Nominees List - Instituições */}
      <section className="py-20 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 border border-secondary/30 rounded-full mb-6">
                <Building2 className="w-4 h-4 text-secondary" />
                <span className="text-sm font-medium text-secondary">Instituições e Empresas</span>
              </div>
              <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
                Categorias de <span className="text-gradient-gold">Instituições</span>
              </h2>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {instituicoesCategorias.map((cat, idx) => (
                <ScrollReveal key={`inst-${idx}`} delay={(idx % 6) * 0.05}>
                  <div className="group bg-gradient-to-br from-card to-background border border-secondary/20 rounded-xl p-5 transition-all duration-300 hover:border-secondary/40 hover:shadow-[0_0_20px_hsl(0_0%_75%_/_0.1)] h-full">
                    <h4 className="text-sm font-heading font-bold text-primary mb-3 leading-tight">
                      {cat.categoria}
                    </h4>
                    <ul className="space-y-1.5">
                      {cat.nomeados.map((nome, nIdx) => (
                        <li key={nIdx} className="flex items-center gap-2 text-foreground font-body text-sm">
                          <Building2 className="text-secondary/60 flex-shrink-0 w-3.5 h-3.5" />
                          <span>{nome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
                Galeria de <span className="text-gradient-gold">Eventos</span>
              </h2>
              <p className="text-muted-foreground font-body">
                Momentos marcantes das edições anteriores
              </p>
            </div>
            <Gallery />
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10" />
        
        <ScrollReveal className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
              Garanta sua Presença na <span className="text-gradient-gold">Gala 2025</span>
            </h2>
            <p className="text-muted-foreground font-body text-lg mb-8">
              Não perca a oportunidade de participar da maior celebração da liderança angolana.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-heading group">
              <Link to="/ingressos">
                Adquirir Ingressos
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
};

export default Nomeacoes;
