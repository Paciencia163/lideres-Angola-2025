import { motion, useInView, animate, useReducedMotion } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";

export const Reveal = ({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export const SectionHeading = ({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) => (
  <Reveal className="text-center max-w-2xl mx-auto mb-14">
    <p className="eyebrow">{eyebrow}</p>
    <h2 className="mt-4 text-4xl md:text-5xl font-heading">{title}</h2>
    <div className="gold-rule w-24 mx-auto mt-6" />
    {intro && <p className="mt-6 text-muted-foreground leading-relaxed">{intro}</p>}
  </Reveal>
);

export const CountUp = ({ to, suffix = "" }: { to: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduce) return setV(to);
    const c = animate(0, to, { duration: 1.8, onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inView, to, reduce]);
  return <span ref={ref}>{v}{suffix}</span>;
};
