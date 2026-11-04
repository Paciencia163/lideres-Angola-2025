import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { gallery, unsplash, unsplashSrcSet } from "@/data/content";

const ratioClass = { portrait: "aspect-[4/5]", landscape: "aspect-[3/2]", square: "aspect-square" } as const;

const GallerySection = ({ heading = true }: { heading?: boolean }) => {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;
  const current = open ? gallery[index] : null;

  const go = useCallback((dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + gallery.length) % gallery.length)), []);

  return (
    <section id="galeria" aria-label="Galeria" className="section">
      <div className="container-luxe">
        {heading && (
          <SectionHeading
            eyebrow="Galeria"
            title={
              <>
                Momentos que ficam na <em className="text-primary">memória</em>
              </>
            }
            description="Reviva a elegância, a emoção e o brilho das noites de gala."
          />
        )}

        <Stagger gap={0.07} className="masonry">
          {gallery.map((img, i) => (
            <StaggerItem key={img.id}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="group relative block w-full overflow-hidden border border-transparent text-left transition-colors duration-500 hover:border-primary/40"
                aria-label={`Ampliar fotografia: ${img.caption}`}
              >
                <img
                  src={unsplash(img.imageId, 800)}
                  srcSet={unsplashSrcSet(img.imageId, [400, 800, 1200])}
                  sizes="(min-width:1024px) 33vw, (min-width:560px) 50vw, 100vw"
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                  className={`${ratioClass[img.ratio]} w-full object-cover grayscale-[30%] transition-[transform,filter] duration-[1.2s] ease-luxury group-hover:scale-[1.04] group-hover:grayscale-0`}
                />
                <span className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute bottom-0 left-0 p-5">
                  <span className="block text-[0.6rem] uppercase tracking-[0.28em] text-primary">{String(i + 1).padStart(2, "0")}</span>
                  <span className="mt-1 block font-display text-lg text-foreground">{img.caption}</span>
                </span>
              </button>
            </StaggerItem>
          ))}
        </Stagger>

        {heading && (
          <div className="mt-12 text-center">
            <Button asChild variant="gold-outline" size="lg">
              <Link to="/galeria">Abrir galeria</Link>
            </Button>
          </div>
        )}
      </div>

      <Dialog open={open} onOpenChange={(o) => !o && setIndex(null)}>
        <DialogContent
          className="flex h-[100svh] max-w-none flex-col items-center justify-center border-0 bg-background/95 p-0 backdrop-blur-xl sm:rounded-none [&>button:last-child]:hidden"
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") go(-1);
            if (e.key === "ArrowRight") go(1);
          }}
        >
          {current && (
            <>
              <DialogTitle className="sr-only">{current.caption}</DialogTitle>
              <DialogDescription className="sr-only">{current.alt}</DialogDescription>
              <img
                key={current.id}
                src={unsplash(current.imageId, 1800, 80)}
                alt={current.alt}
                className="max-h-[78svh] w-auto max-w-[94vw] animate-in fade-in-0 zoom-in-95 object-contain duration-500"
              />
              <div className="mt-6 flex items-center gap-6">
                <button onClick={() => go(-1)} aria-label="Fotografia anterior" className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/40 text-primary transition-colors hover:bg-primary/10">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <p className="min-w-[10rem] text-center">
                  <span className="block font-display text-lg text-foreground">{current.caption}</span>
                  <span className="text-xs tracking-[0.2em] text-muted-foreground">
                    {(index ?? 0) + 1} / {gallery.length}
                  </span>
                </p>
                <button onClick={() => go(1)} aria-label="Fotografia seguinte" className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/40 text-primary transition-colors hover:bg-primary/10">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
              <button
                onClick={() => setIndex(null)}
                aria-label="Fechar galeria"
                className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <X className="h-5 w-5" />
              </button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default GallerySection;
