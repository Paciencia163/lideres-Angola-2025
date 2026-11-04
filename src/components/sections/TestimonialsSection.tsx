import SectionHeading from "./SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { testimonials } from "@/data/content";

const TestimonialsSection = () => (
  <section id="imprensa" aria-label="Imprensa e Testemunhos" className="section">
    <div className="container-luxe">
      <SectionHeading
        eyebrow="Imprensa e Testemunhos"
        title={
          <>
            O que dizem de <em className="text-primary">nós</em>
          </>
        }
      />
      <Stagger className="grid gap-px bg-primary/15 md:grid-cols-3">
        {testimonials.map((t) => (
          <StaggerItem key={t.id} className="bg-background">
            <figure className="flex h-full flex-col p-8 md:p-10">
              <span aria-hidden="true" className="font-display text-6xl leading-none text-primary/60">
                “
              </span>
              <blockquote className="mt-2 flex-1 font-display text-xl italic leading-relaxed text-foreground/90">{t.quote}</blockquote>
              <figcaption className="mt-8 border-t border-primary/15 pt-5">
                <p className="text-sm text-foreground">{t.author}</p>
                <p className="mt-1 text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">{t.role}</p>
              </figcaption>
            </figure>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  </section>
);

export default TestimonialsSection;
