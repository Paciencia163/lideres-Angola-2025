import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreditCard, Building2, Phone, ExternalLink } from "lucide-react";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PaymentModal = ({ open, onOpenChange }: PaymentModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="card-luxury max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading text-gradient-gold mb-2">
            Adquirir Ingresso
          </DialogTitle>
          <DialogDescription className="text-foreground">
            Escolha sua forma de pagamento preferida
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Price Info */}
          <div className="bg-muted/30 p-4 rounded-lg border border-primary/20">
            <p className="text-center text-xl font-semibold text-primary">
              125.000 Kz por ingresso adicional
            </p>
            <p className="text-center text-sm text-muted-foreground mt-1">
              Cada nomeado tem 1 convite gratuito
            </p>
          </div>

          {/* Bank Transfer */}
          <div className="card-luxury p-6 space-y-4">
            <div className="flex items-center space-x-3 mb-4">
              <Building2 className="text-primary" size={24} />
              <h3 className="text-lg font-heading font-semibold text-foreground">
                Transferência Bancária
              </h3>
            </div>

            <div className="space-y-3 text-sm font-body">
              <div className="flex justify-between border-b border-muted pb-2">
                <span className="text-muted-foreground">Banco:</span>
                <span className="text-foreground font-semibold">BAI</span>
              </div>
              <div className="flex justify-between border-b border-muted pb-2">
                <span className="text-muted-foreground">Titular:</span>
                <span className="text-foreground font-semibold">
                  Luadeira Digital Angola
                </span>
              </div>
              <div className="flex justify-between border-b border-muted pb-2">
                <span className="text-muted-foreground">NIB/IBAN:</span>
                <span className="text-foreground font-semibold font-mono text-xs">
                  AO06 0040 0000 1234 5678 9012 3
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Valor:</span>
                <span className="text-primary font-bold">125.000 Kz</span>
              </div>
            </div>

            <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/30">
              <div className="flex items-start space-x-2">
                <Phone className="text-primary mt-1" size={18} />
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">
                    Enviar comprovativo:
                  </p>
                  <p className="text-sm text-foreground">
                    WhatsApp: <span className="text-primary font-semibold">+244 922 812 224</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Online Payment */}
          <div className="card-luxury p-6">
            <div className="flex items-center space-x-3 mb-4">
              <CreditCard className="text-primary" size={24} />
              <h3 className="text-lg font-heading font-semibold text-foreground">
                Pagamento Online
              </h3>
            </div>

            <Button
              asChild
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold animate-glow"
            >
              <a
                href="https://www.paylink.com/premioslideresangola"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2"
              >
                <span>Pagar Agora Online</span>
                <ExternalLink size={18} />
              </a>
            </Button>
          </div>

          {/* Confirmation Notice */}
          <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
            <p className="text-sm text-center text-foreground font-body">
              ✓ Após o envio do comprovativo, a sua presença será confirmada por
              e-mail ou WhatsApp.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
