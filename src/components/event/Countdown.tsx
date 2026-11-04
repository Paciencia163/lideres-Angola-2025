import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const diff = (target: number) => {
  const ms = Math.max(0, target - Date.now());
  return {
    done: ms === 0,
    parts: [
      { label: "Dias", value: Math.floor(ms / 86_400_000) },
      { label: "Horas", value: Math.floor(ms / 3_600_000) % 24 },
      { label: "Minutos", value: Math.floor(ms / 60_000) % 60 },
      { label: "Segundos", value: Math.floor(ms / 1000) % 60 },
    ],
  };
};

const Digit = ({ value }: { value: string }) => {
  const reduce = useReducedMotion();
  return (
    <span className="relative inline-flex h-[1.1em] overflow-hidden tabular-nums">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={reduce ? false : { y: "-100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={reduce ? undefined : { y: "100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

interface CountdownProps {
  to: string;
  className?: string;
}

const Countdown = ({ to, className }: CountdownProps) => {
  const target = new Date(to).getTime();
  const [state, setState] = useState(() => diff(target));

  useEffect(() => {
    const id = window.setInterval(() => setState(diff(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  if (state.done) {
    return <p className={cn("eyebrow", className)}>A gala já começou</p>;
  }

  return (
    <div className={cn("grid grid-cols-4 gap-px bg-primary/20", className)} role="timer" aria-label="Contagem decrescente para a gala">
      {state.parts.map((p) => (
        <div key={p.label} className="flex flex-col items-center bg-background/80 px-2 py-4 backdrop-blur-md sm:px-6 sm:py-5">
          <span className="font-display text-3xl leading-none text-foreground sm:text-5xl" aria-hidden="true">
            <Digit value={String(p.value).padStart(2, "0")} />
          </span>
          <span className="mt-2 font-sans text-[0.6rem] uppercase tracking-[0.28em] text-primary sm:text-[0.65rem]">{p.label}</span>
        </div>
      ))}
      <span className="sr-only">
        Faltam {state.parts[0].value} dias, {state.parts[1].value} horas e {state.parts[2].value} minutos.
      </span>
    </div>
  );
};

export default Countdown;
