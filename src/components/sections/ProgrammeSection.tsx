import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { programme } from "@/data/content";
import { eventDateLong } from "@/config/site";
import { EASE, viewport } from "@/lib/motion";

const ProgrammeSection = () => (
  <section id="programa" aria-label="Programa do dia" className="section section-alt">
    <div className="container-luxe">
      <SectionHeading
        eyebrow="Programa do dia"
        title={
          <>
            Duas experiências no <em className="text-primary">mesmo dia</em>
          </>
        }
        description={`${eventDateLong.charAt(0).toUpperCase()}${eventDateLong.slice(1)} · Horários e locais sujeitos à confirmação operacional final.`}
      />

      <ol className="relative mx-auto max-w-3xl">
        {/* Linha vertical que se desenha ao entrar no ecrã */}
        <motion.span
          aria-hidden="true"
          className="absolute bottom-2 left-[5.25rem] top-2 w-px origin-top bg-gradient-to-b from-primary/70 via-primary/30 to-transparent sm:left-[7.5rem]"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={viewport}
          transition={{ duration: 1.6, ease: EASE }}
        />
        {programme.map((p, i) => (
          <motion.li
            key={p.title}
            className="group relative grid grid-cols-[5.25rem_1fr] gap-x-6 pb-12 last:pb-0 sm:grid-cols-[7.5rem_1fr] sm:gap-x-10"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewport}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 + i * 0.1 }}
          >
            <time className="pr-6 pt-0.5 text-right font-display text-2xl tabular-nums text-primary sm:text-3xl">{p.time}</time>
            <span
              aria-hidden="true"
              className="absolute left-[5.25rem] top-3 h-2.5 w-2.5 -translate-x-1/2 rotate-45 border border-primary bg-background transition-colors duration-300 group-hover:bg-primary sm:left-[7.5rem]"
            />
            <div>
              <h3 className="font-display text-xl text-foreground sm:text-2xl">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">{p.description}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  </section>
);

export default ProgrammeSection;
