import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE, delay } },
});

/** Cabeçalho das páginas interiores. */
const PageHero = ({ eyebrow, title, description, children }: PageHeroProps) => (
  <section className="relative overflow-hidden pb-16 pt-[calc(var(--nav-height)+5rem)] md:pb-24 md:pt-[calc(var(--nav-height)+7rem)]">
    <div className="pointer-events-none absolute inset-x-0 top-0 h-[70%] bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.12),transparent_65%)]" />
    <div className="container-luxe relative text-center">
      <motion.div {...enter(0.05)} className="mb-7 flex items-center justify-center gap-4">
        <span className="gold-rule-short" />
        <p className="eyebrow">{eyebrow}</p>
        <span className="gold-rule-short" />
      </motion.div>
      <motion.h1 {...enter(0.15)} className="mx-auto max-w-4xl text-display-lg text-foreground">
        {title}
      </motion.h1>
      {description && (
        <motion.p {...enter(0.28)} className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {description}
        </motion.p>
      )}
      {children && <motion.div {...enter(0.4)}>{children}</motion.div>}
    </div>
    <div className="gold-rule absolute bottom-0 left-0" />
  </section>
);

export default PageHero;
