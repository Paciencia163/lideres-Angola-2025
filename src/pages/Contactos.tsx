import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Phone, Mail, MapPin, MessageCircle, Clock, Sparkles, ChevronDown } from "lucide-react";
import { useState } from "react";

const Contactos = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

  const faqs = [
    {
      question: "Como posso nomear alguém?",
      answer: "Entre em contacto connosco através de qualquer um dos canais acima e nossa equipe irá orientá-lo no processo de nomeação."
    },
    {
      question: "Quando receberei a confirmação do meu ingresso?",
      answer: "A confirmação é enviada em até 24 horas após a verificação do pagamento, por e-mail ou WhatsApp."
    },
    {
      question: "Há estacionamento disponível no local?",
      answer: "Sim, o Hotel Epic Sana oferece estacionamento gratuito para todos os convidados do evento."
    },
    {
      question: "Qual é o dress code do evento?",
      answer: "O dress code é formal/gala. Trajes elegantes são obrigatórios para manter o padrão de excelência do evento."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        
        <div className="absolute top-40 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Fale Connosco</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <span className="text-gradient-gold">Contactos</span>
            </h1>
            
            <p className="text-xl md:text-2xl font-elegant text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Estamos à disposição para esclarecer suas dúvidas
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {contactMethods.map((method, index) => (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-card to-background border border-primary/20 rounded-2xl p-6 transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_40px_hsl(43_74%_52%_/_0.15)] animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center flex-shrink-0 border border-primary/30 group-hover:scale-110 transition-transform">
                      <method.icon className="text-primary w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {method.title}
                      </h3>
                      {method.link ? (
                        <a
                          href={method.link}
                          className="text-muted-foreground font-body hover:text-primary transition-colors"
                          target={method.link.startsWith('http') ? '_blank' : undefined}
                          rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                          {method.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground font-body">{method.value}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Office Hours */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-card via-card/80 to-card/60 border border-primary/30 rounded-3xl p-10 text-center backdrop-blur-sm">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-xl mb-6 border border-primary/30">
                <Clock className="text-primary w-7 h-7" />
              </div>
              <h2 className="text-3xl font-heading font-bold text-foreground mb-6">
                Horário de <span className="text-gradient-gold">Atendimento</span>
              </h2>
              <div className="space-y-3">
                <p className="text-lg text-foreground font-body">
                  <span className="text-primary font-semibold">Segunda a Sexta:</span> 09:00 - 18:00
                </p>
                <p className="text-lg text-foreground font-body">
                  <span className="text-primary font-semibold">Sábado:</span> 09:00 - 13:00
                </p>
                <p className="text-muted-foreground font-body text-sm mt-4">
                  Domingo e feriados: Fechado
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Location */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-card to-background border-2 border-primary/30 rounded-3xl p-8 md:p-12 animate-fade-in">
              <h2 className="text-3xl font-heading font-bold text-foreground mb-8 text-center">
                Local do <span className="text-gradient-gold">Evento</span>
              </h2>
              <div className="text-center space-y-6">
                <div>
                  <h3 className="text-3xl font-heading font-semibold text-gradient-gold mb-2">
                    Hotel Epic Sana
                  </h3>
                  <p className="text-lg text-muted-foreground font-body">
                    Um dos hotéis mais luxuosos de Luanda
                  </p>
                </div>
                <div className="bg-primary/10 p-6 rounded-xl border border-primary/20 max-w-md mx-auto">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <MapPin className="text-primary w-5 h-5" />
                    <span className="text-lg text-foreground font-body">Luanda, Angola</span>
                  </div>
                  <p className="text-sm text-muted-foreground font-body">
                    Instalações de classe mundial com capacidade para eventos de grande porte
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-card to-background border border-primary/20 rounded-3xl p-8 md:p-12 animate-fade-in">
              <h2 className="text-3xl font-heading font-bold text-foreground mb-10 text-center">
                Perguntas <span className="text-gradient-gold">Frequentes</span>
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border border-primary/20 rounded-xl overflow-hidden hover:border-primary/40 transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full flex items-center justify-between p-5 text-left"
                    >
                      <h4 className="font-heading font-semibold text-foreground pr-4">
                        {faq.question}
                      </h4>
                      <ChevronDown
                        className={`text-primary w-5 h-5 flex-shrink-0 transition-transform ${
                          openFaq === index ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openFaq === index && (
                      <div className="px-5 pb-5">
                        <p className="text-muted-foreground font-body text-sm leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/20 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-card via-card/80 to-card/60 border border-primary/30 rounded-3xl p-10 md:p-16 backdrop-blur-sm">
              <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
                Siga-nos nas <span className="text-gradient-gold">Redes Sociais</span>
              </h2>
              <p className="text-lg text-muted-foreground font-body mb-8">
                Fique por dentro das últimas novidades sobre o evento
              </p>
              <div className="flex justify-center gap-4">
                <a href="#" className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/30 hover:bg-primary/20 hover:border-primary/50 transition-all text-2xl">
                  📱
                </a>
                <a href="#" className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/30 hover:bg-primary/20 hover:border-primary/50 transition-all text-2xl">
                  💼
                </a>
                <a href="#" className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/30 hover:bg-primary/20 hover:border-primary/50 transition-all text-2xl">
                  📸
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contactos;
