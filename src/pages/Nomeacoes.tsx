import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import { Users, Award, Ticket, Info, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

const Nomeacoes = () => {
  return (
    <div className="min-h-screen bg-silk">
      <Navigation />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-gradient-gold mb-6">
              Nomeações
            </h1>
            <p className="text-xl font-elegant text-silver-light">
              Reconheça os líderes que transformam Angola
            </p>
          </div>

          {/* Main Content */}
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Process Explanation */}
            <div className="card-luxury p-8 md:p-12 animate-fade-in">
              <div className="flex items-center space-x-3 mb-6">
                <Users className="text-primary" size={32} />
                <h2 className="text-3xl font-heading font-bold text-primary">
                  Processo de Nomeação
                </h2>
              </div>
              <div className="space-y-4 text-foreground font-body leading-relaxed">
                <p>
                  Os <span className="text-primary font-semibold">Prémios Líderes Angola 2025</span> reconhecem{" "}
                  <span className="text-primary font-semibold">76 nomeados</span> em 18 categorias distintas, divididas entre figuras individuais e instituições.
                </p>
                <p>
                  As nomeações são abertas ao público e visam identificar personalidades, empresas e
                  projetos que se destacam pela liderança, inovação e impacto positivo em Angola.
                </p>
                <p className="text-silver-light">
                  Cada indicação é cuidadosamente avaliada por nosso júri especializado, composto por
                  profissionais de diversas áreas.
                </p>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card-luxury p-8 text-center animate-fade-in hover:scale-105 transition-luxury">
                <Award className="text-primary mx-auto mb-4 animate-glow" size={48} />
                <h3 className="text-4xl font-heading font-bold text-gradient-gold mb-2">76</h3>
                <p className="text-foreground font-body">Nomeados</p>
              </div>

              <div className="card-luxury p-8 text-center animate-fade-in hover:scale-105 transition-luxury">
                <Users className="text-primary mx-auto mb-4 animate-glow" size={48} />
                <h3 className="text-4xl font-heading font-bold text-gradient-gold mb-2">150</h3>
                <p className="text-foreground font-body">Lugares Disponíveis</p>
              </div>
            </div>

            {/* Ticket Policy */}
            <div className="card-luxury p-8 md:p-12 animate-fade-in border-2 border-primary/30">
              <div className="flex items-start space-x-3 mb-6">
                <Ticket className="text-primary mt-1" size={32} />
                <div>
                  <h2 className="text-3xl font-heading font-bold text-primary mb-2">
                    Política de Ingressos
                  </h2>
                  <p className="text-silver-light font-body text-sm">
                    Sistema de convites e acompanhantes
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-primary/10 p-6 rounded-lg border border-primary/30">
                  <h3 className="text-xl font-heading font-semibold text-primary mb-3">
                    Para Nomeados
                  </h3>
                  <p className="text-foreground font-body">
                    Cada nomeado recebe <span className="text-primary font-bold">1 convite gratuito</span> para
                    participar da Gala de Premiação.
                  </p>
                </div>

                <div className="bg-muted/30 p-6 rounded-lg border border-primary/20">
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

                <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
                  <div className="flex items-start space-x-3">
                    <Info className="text-primary mt-1 flex-shrink-0" size={20} />
                    <div className="text-foreground font-body text-sm leading-relaxed">
                      <p className="mb-2">
                        <span className="font-semibold text-primary">Política de sustentabilidade:</span> Os valores
                        dos ingressos adicionais contribuem para a viabilidade e continuidade do projeto
                        Prémios Líderes Angola.
                      </p>
                      <p>
                        Este investimento garante um evento de alta qualidade e permite que possamos continuar
                        reconhecendo a excelência em Angola.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Lista de Nomeados */}
            <div className="card-luxury p-8 md:p-12 animate-fade-in">
              <div className="flex items-center space-x-3 mb-8">
                <Trophy className="text-primary" size={32} />
                <h2 className="text-3xl font-heading font-bold text-primary">
                  Nomeados Edição 2025
                </h2>
              </div>

              {/* Categorias de Figuras */}
              <div className="mb-12">
                <h3 className="text-2xl font-heading font-bold text-gradient-gold mb-6 text-center">
                  Categorias de Figuras
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { categoria: "Líder Empresarial e Gestores Privados", nomeados: ["Wilson Ganga", "Adilson Nelumba", "Silvestre Tulumba Kapose", "Leonel Correia"] },
                    { categoria: "Líderes em Gestão Pública e Políticos", nomeados: ["Bornito de Sousa", "Adão de Almeida", "José de Lima Massano", "Vera Daves", "Aia-Eza Nacília Gomes da Silva", "Cristina Lourenço", "Marcio de Jesus Lopes Daniel", "Ana Paula do Sacramento Neto"] },
                    { categoria: "Líder Mulheres", nomeados: ["Elizabeth Dias dos Santos Burity", "Marley Seloh", "Juliana Fontes Pereira", "Lisandra Francisco Nelumba", "Ana Dias Lourenço", "Beatriz Neto Silva"] },
                    { categoria: "Líder Jovem do Ano", nomeados: ["Isabel Filipa", "Jesse Madalena", "Nair Nany", "Mateus Esteita"] },
                    { categoria: "Líder Cultural, Turismo e Artístico", nomeados: ["Nadir Tati", "Paulo Flores", "COREO DU", "Elvina de Azevedo", "Ana Cristina Costa", "Maria Borges", "Leila Lopes"] },
                    { categoria: "Líder em Educação e Conhecimento", nomeados: ["Carlos Feijó"] },
                    { categoria: "Líder em Saúde e Bem-Estar", nomeados: ["Sílvia Lutucuta", "Carlos Alberto Pinto", "Sweine Coelho"] },
                    { categoria: "Líder em Comunicação e Media", nomeados: ["Ernesto Bartolomeu", "Zenaida Machado", "Benvindo Magalhães", "Dina Simão", "Patricia Pacheco", "Mariano da Fonseca", "Igor Benza"] },
                    { categoria: "Líder na Diáspora Angolana", nomeados: ["Pedro Muenho", "Gelson Dala", "Pura Experiência"] },
                  ].map((categoria, idx) => (
                    <Card key={idx} className="p-6 bg-primary/5 border-primary/20 hover:border-primary/40 transition-luxury">
                      <h4 className="text-lg font-heading font-bold text-primary mb-4">
                        {categoria.categoria}
                      </h4>
                      <ul className="space-y-2">
                        {categoria.nomeados.map((nome, nIdx) => (
                          <li key={nIdx} className="flex items-center space-x-2 text-foreground font-body text-sm">
                            <Award className="text-primary/60 flex-shrink-0" size={16} />
                            <span>{nome}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Categorias de Instituições */}
              <div>
                <h3 className="text-2xl font-heading font-bold text-gradient-gold mb-6 text-center">
                  Categorias de Instituições ou Empresas
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { categoria: "Líder em Inovação e Tecnologia", nomeados: ["ANDA", "UGO", "Unitel"] },
                    { categoria: "Líder em Sustentabilidade e Ambiente", nomeados: ["MKV"] },
                    { categoria: "Líder no Setor Público e Governança", nomeados: ["Governo Provincial do Namibe", "Governo Provincial do Huambo", "CIPRA", "Porto do Lobito", "Minjud", "Ministério das Relações Exteriores", "CCIAM", "Embaixada da China em Angola"] },
                    { categoria: "Líder em Comunicação", nomeados: ["Zap TV", "Rádio Platina FM", "Club K", "Pensar Angola", "Fly Podcast", "TV Zimbo", "Goza Aqui"] },
                    { categoria: "Líder em Finanças e Banca", nomeados: ["Banco BAI", "PayPay", "Banco Mundial", "Bodiva", "Banco Nacional"] },
                    { categoria: "Líder em Responsabilidade Social Corporativa", nomeados: ["ABBB", "Miss Angola Universo", "Instituto Innate"] },
                    { categoria: "Líder na Indústria e Produção Nacional", nomeados: ["AgroLider"] },
                    { categoria: "Líder em Turismo, Hotelaria e Lazer", nomeados: ["Epic Sana Hotel", "Detalhe de Luxo"] },
                    { categoria: "Líder em Infraestruturas e Construção Civil", nomeados: ["Grupo WM", "Montegil", "Group Copia"] },
                  ].map((categoria, idx) => (
                    <Card key={`inst-${idx}`} className="p-6 bg-secondary/10 border-secondary/30 hover:border-secondary/50 transition-luxury">
                      <h4 className="text-lg font-heading font-bold text-primary mb-4">
                        {categoria.categoria}
                      </h4>
                      <ul className="space-y-2">
                        {categoria.nomeados.map((nome, nIdx) => (
                          <li key={nIdx} className="flex items-center space-x-2 text-foreground font-body text-sm">
                            <Award className="text-secondary/70 flex-shrink-0" size={16} />
                            <span>{nome}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Galeria de Edições Anteriores */}
            <div className="card-luxury p-8 md:p-12 animate-fade-in">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-heading font-bold text-primary mb-3">
                  Momentos das Edições Anteriores
                </h2>
                <p className="text-foreground font-body">
                  Reviva os momentos mais marcantes das nossas Galas de Premiação
                </p>
              </div>
              
              <Gallery />
            </div>

            {/* CTA */}
            <div className="bg-gradient-gold p-8 md:p-12 rounded-lg text-center animate-fade-in">
              <h2 className="text-3xl font-heading font-bold text-primary-foreground mb-4">
                Indique um Líder
              </h2>
              <p className="text-primary-foreground/90 font-body mb-8 max-w-2xl mx-auto">
                Ajude-nos a identificar os verdadeiros líderes de Angola que merecem ser
                reconhecidos na nossa Gala de Premiação.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-background text-primary hover:bg-background/90 font-semibold px-8 py-6 text-lg"
              >
                <Link to="/contactos">Nomear Agora</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Nomeacoes;
