import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PaymentModal from "@/components/PaymentModal";
import { Ticket, Gift, CreditCard, Calendar, MapPin, Check, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";

const Ingressos = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const benefits = [
    "Acesso à cerimônia completa de premiação",
    "Jantar de gala de luxo",
    "Performances artísticas exclusivas",
    "Networking com líderes empresariais",
    "Presentes exclusivos para convidados",
    "Fotografia e cobertura profissional"
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
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl mb-8 border border-primary/30 animate-fade-in">
              <Ticket className="text-primary w-10 h-10" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <span className="text-foreground">Adquira Seu</span>
              <br />
              <span className="text-gradient-gold">Ingresso</span>
            </h1>
            
            <p className="text-xl md:text-2xl font-elegant text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Garanta a sua presença no evento mais prestigiado de Angola
            </p>
          </div>
        </div>
      </section>

      {/* Event Info */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-card via-card/80 to-card/60 border border-primary/30 rounded-3xl p-10 text-center backdrop-blur-sm">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Gala de Premiação 2025</span>
              </div>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
                <div className="flex items-center gap-3">
                  <Calendar className="text-primary w-6 h-6" />
                  <span className="text-xl font-body text-foreground">18 de Dezembro de 2025</span>
                </div>
                <div className="hidden md:block w-px h-6 bg-primary/30" />
                <div className="flex items-center gap-3">
                  <MapPin className="text-primary w-6 h-6" />
                  <span className="text-xl font-body text-foreground">Hotel Epic Sana, Luanda</span>
                </div>
              </div>
              
              <p className="text-xl font-elegant italic text-primary">
                "Liderar é Servir Angola"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ticket Types */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Free Invite */}
              <div className="group bg-gradient-to-br from-card to-background border border-primary/20 rounded-2xl p-8 transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_40px_hsl(43_74%_52%_/_0.15)] animate-fade-in">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center border border-primary/30">
                    <Gift className="text-primary w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-foreground">
                    Convite Gratuito
                  </h3>
                </div>
                <div className="space-y-4 text-muted-foreground font-body">
                  <p>
                    Cada <span className="text-primary font-semibold">nomeado</span> recebe{" "}
                    <span className="text-primary font-bold text-xl">1 convite gratuito</span> para o evento.
                  </p>
                  <div className="bg-primary/10 p-4 rounded-xl border border-primary/20">
                    <p className="text-sm">
                      Se você foi nomeado, receberá seu convite por e-mail ou WhatsApp.
                    </p>
                  </div>
                </div>
              </div>

              {/* Paid Ticket */}
              <div className="group bg-gradient-to-br from-card to-background border-2 border-primary/50 rounded-2xl p-8 transition-all duration-500 hover:shadow-[0_0_40px_hsl(43_74%_52%_/_0.2)] animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary/30 to-primary/10 rounded-xl flex items-center justify-center border border-primary/50">
                    <Ticket className="text-primary w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-foreground">
                    Ingressos Adicionais
                  </h3>
                </div>
                <div className="space-y-4 text-muted-foreground font-body">
                  <p>Para acompanhantes e convidados especiais:</p>
                  <div className="bg-primary/20 p-6 rounded-xl text-center border border-primary/30">
                    <p className="text-5xl font-heading font-bold text-gradient-gold mb-2">
                      125.000 Kz
                    </p>
                    <p className="text-sm text-muted-foreground">por ingresso</p>
                  </div>
                  <p className="text-sm text-center">
                    Sujeito a disponibilidade - 120 lugares no total
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Purchase Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-card to-background border-2 border-primary/50 rounded-3xl p-8 md:p-12 animate-fade-in">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl mb-6 border border-primary/30">
                  <CreditCard className="text-primary w-8 h-8" />
                </div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                  <span className="text-foreground">Adquira</span>{" "}
                  <span className="text-gradient-gold">Seu Ingresso</span>
                </h2>
                <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
                  Escolha entre transferência bancária ou pagamento online para garantir sua presença neste evento exclusivo.
                </p>
              </div>

              <div className="flex justify-center mb-10">
                <Button
                  onClick={() => setShowPaymentModal(true)}
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-12 py-8 text-xl rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_hsl(43_74%_52%_/_0.4)] group"
                >
                  <span>ADQUIRIR INGRESSO</span>
                  <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              <div className="grid md:grid-cols-3 gap-6 text-center pt-8 border-t border-primary/20">
                <div className="space-y-2">
                  <div className="text-primary font-semibold font-body">💳 Pagamento Seguro</div>
                  <p className="text-sm text-muted-foreground">Transferência ou Online</p>
                </div>
                <div className="space-y-2">
                  <div className="text-primary font-semibold font-body">✓ Confirmação Rápida</div>
                  <p className="text-sm text-muted-foreground">Por e-mail ou WhatsApp</p>
                </div>
                <div className="space-y-2">
                  <div className="text-primary font-semibold font-body">🎟️ Ingresso Digital</div>
                  <p className="text-sm text-muted-foreground">Envio imediato após confirmação</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-card to-background border border-primary/20 rounded-3xl p-8 md:p-12 animate-fade-in">
              <h3 className="text-3xl font-heading font-bold text-foreground mb-8 text-center">
                O Que Está <span className="text-gradient-gold">Incluído</span>
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-primary/5 rounded-xl border border-primary/10 hover:border-primary/30 transition-colors">
                    <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Check className="text-primary w-5 h-5" />
                    </div>
                    <span className="text-foreground font-body">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/20 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              <span className="text-foreground">Tem Dúvidas?</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Entre em contacto connosco para mais informações sobre ingressos e o evento.
            </p>
            <Link
              to="/contactos"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-primary/50 text-primary hover:bg-primary/10 font-semibold px-8 py-4 rounded-xl transition-all duration-300"
            >
              <span>Falar Connosco</span>
            </Link>
          </div>
        </div>
      </section>

      <PaymentModal open={showPaymentModal} onOpenChange={setShowPaymentModal} />
      <Footer />
    </div>
  );
};

export default Ingressos;
