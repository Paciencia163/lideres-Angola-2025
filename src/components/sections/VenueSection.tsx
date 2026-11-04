import { Car, Clock, MapPin, Shirt } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { site, eventTime } from "@/config/site";

const info = [
  { icon: MapPin, label: "Endereço", value: site.event.address },
  { icon: Clock, label: "Recepção", value: `A partir das ${eventTime}` },
  { icon: Shirt, label: "Código de vestuário", value: site.event.dressCode },
  { icon: Car, label: "Estacionamento", value: "Disponível no hotel para convidados" },
];

const VenueSection = () => {
  const q = encodeURIComponent(site.event.mapQuery);
  return (
    <section id="local" aria-label="Local do evento" className="section">
      <div className="container-luxe">
        <SectionHeading
          align="left"
          eyebrow="Local do Evento"
          title={
            <>
              {site.event.venue}, <em className="text-primary">{site.event.city}</em>
            </>
          }
          description={`Jantar de gala e entrega de prémios, com convívio institucional e empresarial. Capacidade de referência de ${site.event.capacity} convidados.`}
        />

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="relative min-h-[320px] overflow-hidden border border-primary/20 lg:col-span-7 lg:min-h-[460px]">
            <iframe
              title={`Mapa: ${site.event.venue}, ${site.event.city}`}
              src={`https://www.google.com/maps?q=${q}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0 [filter:grayscale(1)_invert(0.92)_contrast(0.9)_brightness(0.95)]"
            />
          </Reveal>

          <Reveal delay={0.15} className="flex flex-col lg:col-span-5">
            <dl className="divide-y divide-primary/15 border-y border-primary/15">
              {info.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex gap-5 py-6">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" strokeWidth={1.25} />
                  <div>
                    <dt className="text-[0.65rem] uppercase tracking-[0.24em] text-muted-foreground">{label}</dt>
                    <dd className="mt-1.5 text-foreground">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
            <Button asChild variant="gold-outline" size="lg" className="mt-8 self-start">
              <a href={`https://www.google.com/maps/search/?api=1&query=${q}`} target="_blank" rel="noopener noreferrer">
                Obter direcções
              </a>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default VenueSection;
