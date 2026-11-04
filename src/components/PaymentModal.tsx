import { useState } from "react";
import { Building2, Check, Copy, CreditCard, ExternalLink, MessageCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { site, formatKz } from "@/config/site";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PaymentModal = ({ open, onOpenChange }: PaymentModalProps) => {
  const [copied, setCopied] = useState(false);
  const { bank, priceKz, paymentLink, freeInvitesPerNominee } = site.tickets;

  const copyIban = async () => {
    try {
      await navigator.clipboard.writeText(bank.iban.replace(/\s/g, ""));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* sem acesso à área de transferência */
    }
  };

  const rows = [
    { label: "Banco", value: bank.name },
    { label: "Titular", value: bank.holder },
    { label: "IBAN", value: bank.iban, mono: true },
    { label: "Valor", value: formatKz(priceKz), gold: true },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92svh] max-w-xl overflow-y-auto rounded-none border-primary/30 bg-card p-6 sm:p-10">
        <DialogHeader className="text-left">
          <p className="eyebrow">Bilhete adicional</p>
          <DialogTitle className="mt-3 font-display text-3xl font-normal text-foreground">Comprar bilhete</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {formatKz(priceKz)} por bilhete · cada nomeado tem {freeInvitesPerNominee} convite gratuito.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 space-y-8">
          <section aria-labelledby="pag-online">
            <h3 id="pag-online" className="flex items-center gap-3 font-display text-xl text-foreground">
              <CreditCard className="h-5 w-5 text-primary" strokeWidth={1.25} /> Pagamento online
            </h3>
            <Button asChild variant="gold" size="lg" className="mt-4 w-full">
              <a href={paymentLink} target="_blank" rel="noopener noreferrer">
                Pagar agora <ExternalLink />
              </a>
            </Button>
          </section>

          <div className="gold-rule" />

          <section aria-labelledby="pag-transf">
            <h3 id="pag-transf" className="flex items-center gap-3 font-display text-xl text-foreground">
              <Building2 className="h-5 w-5 text-primary" strokeWidth={1.25} /> Transferência bancária
            </h3>
            <dl className="mt-4 divide-y divide-border border-y border-border text-sm">
              {rows.map((r) => (
                <div key={r.label} className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-muted-foreground">{r.label}</dt>
                  <dd className={r.gold ? "font-medium text-primary" : r.mono ? "font-mono text-xs text-foreground" : "text-foreground"}>{r.value}</dd>
                </div>
              ))}
            </dl>
            <Button variant="outline" size="sm" onClick={copyIban} className="mt-4">
              {copied ? <Check className="text-primary" /> : <Copy />}
              {copied ? "IBAN copiado" : "Copiar IBAN"}
            </Button>
            <a
              href={site.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-start gap-3 border border-primary/25 bg-primary/5 p-4 text-sm text-foreground hover:border-primary/50"
            >
              <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>
                Envie o comprovativo por WhatsApp para <span className="text-primary">{site.contact.phone}</span>. A sua presença é confirmada por e-mail ou WhatsApp.
              </span>
            </a>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
