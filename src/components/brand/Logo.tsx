import { cn } from "@/lib/utils";
import logo from "@/assets/brand/logo.webp";

interface LogoProps {
  className?: string;
  /** Uso puramente decorativo (ex.: marca de água): escondido dos leitores de ecrã. */
  decorative?: boolean;
}

/** Logótipo oficial, gerado a partir de Logotipos/official por scripts/generate-brand-assets.mjs. */
const Logo = ({ className, decorative = false }: LogoProps) => (
  <img
    src={logo}
    alt={decorative ? "" : "Prémios Líderes Angola"}
    aria-hidden={decorative || undefined}
    width={900}
    height={379}
    decoding="async"
    className={cn("h-10 w-auto sm:h-12", className)}
  />
);

export default Logo;
