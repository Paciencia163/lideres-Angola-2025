import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PaymentModal from "@/components/PaymentModal";
import { Ticket, Gift, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Ingressos = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  return (
    <div className="min-h-screen bg-silk">
      <Navigation />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-16 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/20 rounded-full mb-6 animate-glow">
              <Ticket className="text-primary" size={40} />
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-gradient-gold mb-6">
              Adquirir Ingresso
            </h1>
            <p className="text-xl font-elegant text-silver-light">
              Garanta a sua presença no evento mais prestigiado de Angola
            </p>
          </div>

          {/* Main Content */}
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Event Highlight */}
            <div className="bg-gradient-gold p-8 md:p-12 rounded-lg text-center animate-fade-in">
              <h2 className="text-3xl font-heading font-bold text-primary-foreground mb-4">
                Gala de Premiação 2025
              </h2>
              <div className="space-y-2 text-primary-foreground font-body">
                <p className="text-xl">📅 18 de Dezembro de 2025</p>
                <p className="text-xl">🏨 Hotel Epic Sana, Luanda</p>
                <p className="text-lg mt-4 font-elegant italic">
                  "Liderar é Servir Angola"
                </p>
              </div>
            </div>

            {/* Ticket Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card-luxury p-8 animate-fade-in">
                <div className="flex items-center space-x-3 mb-6">
                  <Gift className="text-primary" size={32} />
                  <h3 className="text-2xl font-heading font-bold text-primary">
                    Convite Gratuito
                  </h3>
                </div>
                <div className="space-y-4 text-foreground font-body">
                  <p>
                    Cada <span className="text-primary font-semibold">nomeado</span> recebe{" "}
                    <span className="text-primary font-bold text-xl">1 convite gratuito</span> para
                    o evento.
                  </p>
                  <div className="bg-primary/10 p-4 rounded-lg border border-primary/30">
                    <p className="text-sm text-muted-foreground">
                      Se você foi nomeado, receberá seu convite por e-mail ou WhatsApp.
                    </p>
                  </div>
                </div>
              </div>

              <div className="card-luxury p-8 animate-fade-in">
                <div className="flex items-center space-x-3 mb-6">
                  <Ticket className="text-primary" size={32} />
                  <h3 className="text-2xl font-heading font-bold text-primary">
                    Ingressos Adicionais
                  </h3>
                </div>
                <div className="space-y-4 text-foreground font-body">
                  <p>Para acompanhantes e convidados especiais:</p>
                  <div className="bg-primary/20 p-6 rounded-lg text-center">
                    <p className="text-4xl font-heading font-bold text-primary mb-2">
                      125.000 Kz
                    </p>
                    <p className="text-sm text-muted-foreground">por ingresso</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Sujeito a disponibilidade - 120 lugares no total
                  </p>
                </div>
              </div>
            </div>

            {/* Purchase Section */}
            <div className="card-luxury p-8 md:p-12 animate-fade-in border-2 border-primary/50">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4 animate-glow">
                  <CreditCard className="text-primary" size={32} />
                </div>
                <h2 className="text-3xl font-heading font-bold text-gradient-gold mb-4">
                  Adquira Seu Ingresso
                </h2>
                <p className="text-foreground font-body max-w-2xl mx-auto">
                  Escolha entre transferência bancária ou pagamento online para garantir sua presença
                  neste evento exclusivo.
                </p>
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={() => setShowPaymentModal(true)}
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-12 py-8 text-xl animate-glow"
                >
                  ADQUIRIR INGRESSO
                </Button>
              </div>

              <div className="mt-8 grid md:grid-cols-3 gap-6 text-center">
                <div className="space-y-2">
                  <p className="text-primary font-semibold font-body">💳 Pagamento Seguro</p>
                  <p className="text-sm text-muted-foreground">Transferência ou Online</p>
                </div>
                <div className="space-y-2">
                  <p className="text-primary font-semibold font-body">✓ Confirmação Rápida</p>
                  <p className="text-sm text-muted-foreground">Por e-mail ou WhatsApp</p>
                </div>
                <div className="space-y-2">
                  <p className="text-primary font-semibold font-body">🎟️ Ingresso Digital</p>
                  <p className="text-sm text-muted-foreground">Envio imediato após confirmação</p>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="card-luxury p-8 md:p-12 animate-fade-in">
              <h3 className="text-2xl font-heading font-bold text-primary mb-6 text-center">
                O Que Está Incluído
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <ul className="space-y-3 text-foreground font-body">
                  <li className="flex items-start space-x-2">
                    <span className="text-primary">✓</span>
                    <span>Acesso à cerimônia completa de premiação</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary">✓</span>
                    <span>Jantar de gala de luxo</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary">✓</span>
                    <span>Performances artísticas exclusivas</span>
                  </li>
                </ul>
                <ul className="space-y-3 text-foreground font-body">
                  <li className="flex items-start space-x-2">
                    <span className="text-primary">✓</span>
                    <span>Networking com líderes empresariais</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary">✓</span>
                    <span>Presentes exclusivos para convidados</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary">✓</span>
                    <span>Fotografia e cobertura profissional</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <PaymentModal open={showPaymentModal} onOpenChange={setShowPaymentModal} />
      <Footer />
    </div>
  );
};

export default Ingressos;
