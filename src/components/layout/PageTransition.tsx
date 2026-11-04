import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

/** Envolve cada página para a transição suave entre rotas. */
const PageTransition = ({ children }: { children: ReactNode }) => (
  <motion.main
    id="conteudo"
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } }}
    exit={{ opacity: 0, transition: { duration: 0.25, ease: "easeIn" } }}
  >
    {children}
  </motion.main>
);

export default PageTransition;
