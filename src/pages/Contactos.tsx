import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

const Contactos = () => {
  const contactMethods = [
    {
      icon: Phone,
      title: "Telefone",
      value: "+244 922 812 224",
      link: "tel:+244922812224"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      value: "+244 922 812 224",
      link: "https://wa.me/244922812224"
    },
    {
      icon: Mail,
      title: "E-mail",
      value: "angolajobssummit@gmail.com",
      link: "mailto:angolajobssummit@gmail.com"
    },
    {
      icon: MapPin,
      title: "Local do Evento",
      value: "Hotel Epic Sana, Luanda",
      link: null
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
              Contactos
            </h1>
            <p className="text-xl font-elegant text-silver-light">
              Estamos à disposição para esclarecer suas dúvidas
            </p>
          </div>

          {/* Main Content */}
          <div className="max-w-5xl mx-auto space-y-12">
            {/* Contact Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {contactMethods.map((method, index) => (
                <div
                  key={index}
                  className="card-luxury p-8 animate-fade-in hover:scale-105 transition-luxury group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors animate-glow">
                      <method.icon className="text-primary" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-heading font-semibold text-primary mb-2">
                        {method.title}
                      </h3>
                      {method.link ? (
                        <a
                          href={method.link}
                          className="text-foreground font-body hover:text-primary transition-colors"
                          target={method.link.startsWith('http') ? '_blank' : undefined}
                          rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                          {method.value}
                        </a>
                      ) : (
                        <p className="text-foreground font-body">{method.value}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Office Hours */}
            <div className="card-luxury p-8 md:p-12 animate-fade-in">
              <h2 className="text-3xl font-heading font-bold text-primary mb-6 text-center">
                Horário de Atendimento
              </h2>
              <div className="space-y-4 text-center">
                <div className="space-y-2">
                  <p className="text-foreground font-body">
                    <span className="text-primary font-semibold">Segunda a Sexta:</span> 09:00 - 18:00
                  </p>
                  <p className="text-foreground font-body">
                    <span className="text-primary font-semibold">Sábado:</span> 09:00 - 13:00
                  </p>
                  <p className="text-muted-foreground font-body text-sm mt-4">
                    Domingo e feriados: Fechado
                  </p>
                </div>
              </div>
            </div>

            {/* Event Location */}
            <div className="card-luxury p-8 md:p-12 animate-fade-in border-2 border-primary/30">
              <h2 className="text-3xl font-heading font-bold text-primary mb-6 text-center">
                Local do Evento
              </h2>
              <div className="text-center space-y-6">
                <div>
                  <h3 className="text-2xl font-heading font-semibold text-gradient-gold mb-2">
                    Hotel Epic Sana
                  </h3>
                  <p className="text-foreground font-body">
                    Um dos hotéis mais luxuosos de Luanda
                  </p>
                </div>
                <div className="bg-primary/10 p-6 rounded-lg border border-primary/30">
                  <p className="text-foreground font-body mb-4">
                    📍 Luanda, Angola
                  </p>
                  <p className="text-sm text-muted-foreground font-body">
                    Instalações de classe mundial com capacidade para eventos de grande porte
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="card-luxury p-8 md:p-12 animate-fade-in">
              <h2 className="text-3xl font-heading font-bold text-primary mb-8 text-center">
                Perguntas Frequentes
              </h2>
              <div className="space-y-6">
                <div className="border-b border-primary/20 pb-6">
                  <h4 className="font-heading font-semibold text-foreground mb-2">
                    Como posso nomear alguém?
                  </h4>
                  <p className="text-sm text-muted-foreground font-body">
                    Entre em contacto connosco através de qualquer um dos canais acima e nossa equipe
                    irá orientá-lo no processo de nomeação.
                  </p>
                </div>

                <div className="border-b border-primary/20 pb-6">
                  <h4 className="font-heading font-semibold text-foreground mb-2">
                    Quando receberei a confirmação do meu ingresso?
                  </h4>
                  <p className="text-sm text-muted-foreground font-body">
                    A confirmação é enviada em até 24 horas após a verificação do pagamento,
                    por e-mail ou WhatsApp.
                  </p>
                </div>

                <div className="border-b border-primary/20 pb-6">
                  <h4 className="font-heading font-semibold text-foreground mb-2">
                    Há estacionamento disponível no local?
                  </h4>
                  <p className="text-sm text-muted-foreground font-body">
                    Sim, o Hotel Epic Sana oferece estacionamento gratuito para todos os convidados
                    do evento.
                  </p>
                </div>

                <div>
                  <h4 className="font-heading font-semibold text-foreground mb-2">
                    Qual é o dress code do evento?
                  </h4>
                  <p className="text-sm text-muted-foreground font-body">
                    O dress code é formal/gala. Trajes elegantes são obrigatórios para manter o
                    padrão de excelência do evento.
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-gradient-gold p-8 md:p-12 rounded-lg text-center animate-fade-in">
              <h2 className="text-3xl font-heading font-bold text-primary-foreground mb-4">
                Siga-nos nas Redes Sociais
              </h2>
              <p className="text-primary-foreground/90 font-body mb-6">
                Fique por dentro das últimas novidades sobre o evento
              </p>
              <div className="flex justify-center space-x-4">
                <div className="text-4xl">📱</div>
                <div className="text-4xl">💼</div>
                <div className="text-4xl">📸</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contactos;
