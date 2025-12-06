import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-black border-t border-primary/20 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-heading font-bold text-gradient-gold mb-4">
              PRÉMIOS LÍDERES ANGOLA
            </h3>
            <p className="text-muted-foreground font-body text-sm">
              Celebrando a Excelência e a Liderança em Angola desde 2025
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-heading font-semibold text-primary mb-4">
              Contacto
            </h4>
            <div className="space-y-3 text-sm font-body">
              <div className="flex items-center space-x-2 text-foreground">
                <Phone size={16} className="text-primary" />
                <span>+244 922 812 224</span>
              </div>
              <div className="flex items-center space-x-2 text-foreground">
                <Mail size={16} className="text-primary" />
                <span>angolajobssummit@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2 text-foreground">
                <MapPin size={16} className="text-primary" />
                <span>Hotel Epic Sana, Luanda</span>
              </div>
            </div>
          </div>

          {/* Event Info */}
          <div>
            <h4 className="text-lg font-heading font-semibold text-primary mb-4">
              Evento 2025
            </h4>
            <div className="space-y-2 text-sm font-body text-foreground">
              <p>📅 18 de Dezembro de 2025</p>
              <p>🏨 Hotel Epic Sana</p>
              <p>📍 Luanda, Angola</p>
              <p className="text-primary font-semibold mt-4">
                Liderar é Servir Angola
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary/20 pt-6 text-center">
          <p className="text-sm font-body text-muted-foreground">
            © 2025 Luadeira Digital Angola. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
