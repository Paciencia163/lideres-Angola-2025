import { motion, type HTMLMotionProps } from "framer-motion";
import { fadeUp, stagger, viewport } from "@/lib/motion";

type RevealProps = HTMLMotionProps<"div"> & { delay?: number };

/** Revela o conteúdo com fade + deslize quando entra no ecrã. */
export const Reveal = ({ delay = 0, children, ...props }: RevealProps) => (
  <motion.div
    initial="hidden"
    whileInView="show"
    viewport={viewport}
    variants={{
      hidden: fadeUp.hidden,
      show: { ...(fadeUp.show as object), transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay } },
    }}
    {...props}
  >
    {children}
  </motion.div>
);

type StaggerProps = HTMLMotionProps<"div"> & { gap?: number; delay?: number };

/** Contentor que anima os filhos <StaggerItem> em sequência. */
export const Stagger = ({ gap = 0.08, delay = 0, children, ...props }: StaggerProps) => (
  <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={stagger(gap, delay)} {...props}>
    {children}
  </motion.div>
);

export const StaggerItem = ({ children, ...props }: HTMLMotionProps<"div">) => (
  <motion.div variants={fadeUp} {...props}>
    {children}
  </motion.div>
);
