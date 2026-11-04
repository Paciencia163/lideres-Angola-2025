import { cn } from "@/lib/utils";

interface PortraitProps {
  src?: string;
  alt: string;
  className?: string;
  label?: string;
}

/** Fotografia de retrato; sem `src`, mostra uma silhueta elegante como espaço reservado. */
const Portrait = ({ src, alt, className, label = "Fotografia em breve" }: PortraitProps) => (
  <div className={cn("relative aspect-[4/5] overflow-hidden bg-surface", className)}>
    {src ? (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover grayscale-[20%] transition-[transform,filter] duration-700 ease-luxury group-hover:scale-[1.04] group-hover:grayscale-0"
      />
    ) : (
      <div role="img" aria-label={`${alt} — ${label}`} className="flex h-full w-full flex-col items-center justify-end">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,hsl(var(--primary)/0.10),transparent_70%)]" />
        <svg viewBox="0 0 120 150" aria-hidden="true" className="relative w-3/4 text-primary/25 transition-colors duration-500 group-hover:text-primary/40">
          <circle cx="60" cy="52" r="24" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <path d="M14 150c2-34 22-52 46-52s44 18 46 52" fill="none" stroke="currentColor" strokeWidth="0.8" />
        </svg>
        <span className="absolute left-1/2 top-4 -translate-x-1/2 whitespace-nowrap text-[0.55rem] uppercase tracking-[0.3em] text-muted-foreground/70">
          {label}
        </span>
      </div>
    )}
  </div>
);

export default Portrait;
