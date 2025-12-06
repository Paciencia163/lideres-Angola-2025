import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  caption?: string;
}

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Imagens placeholder - podem ser substituídas por imagens reais
  const images: GalleryImage[] = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
      alt: "Cerimônia de Premiação",
      caption: "Momento da entrega de prémios"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80",
      alt: "Networking Premium",
      caption: "Líderes conectando-se no evento"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
      alt: "Performance Cultural",
      caption: "Apresentação artística exclusiva"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
      alt: "Vencedores",
      caption: "Homenagem aos líderes premiados"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80",
      alt: "Jantar de Gala",
      caption: "Ambiente elegante e sofisticado"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&q=80",
      alt: "Momentos Especiais",
      caption: "Celebrando a excelência"
    }
  ];

  const handlePrevious = () => {
    if (selectedImage !== null && selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }
  };

  const handleNext = () => {
    if (selectedImage !== null && selectedImage < images.length - 1) {
      setSelectedImage(selectedImage + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrevious();
    if (e.key === "ArrowRight") handleNext();
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <div
            key={image.id}
            className="group relative overflow-hidden rounded-lg cursor-pointer animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => setSelectedImage(index)}
          >
            {/* Image Container */}
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-luxury group-hover:scale-110"
                loading="lazy"
              />
              
              {/* Gold Border Effect */}
              <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/80 transition-luxury" />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-luxury">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-foreground font-heading font-semibold text-lg">
                    {image.alt}
                  </p>
                  {image.caption && (
                    <p className="text-muted-foreground font-body text-sm mt-2">
                      {image.caption}
                    </p>
                  )}
                </div>
              </div>

              {/* Gold Glow on Hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-luxury pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-gold" />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-gold" />
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-gold" />
                <div className="absolute top-0 right-0 w-1 h-full bg-gradient-gold" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent 
          className="max-w-7xl w-full h-[90vh] bg-background/95 backdrop-blur-lg border-primary/30 p-0"
          onKeyDown={handleKeyDown}
        >
          {selectedImage !== null && (
            <div className="relative w-full h-full flex items-center justify-center p-4">
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-50 w-12 h-12 bg-background/80 hover:bg-primary/20 border border-primary/30 rounded-full flex items-center justify-center transition-luxury group"
              >
                <X className="text-primary group-hover:rotate-90 transition-luxury" size={24} />
              </button>

              {/* Navigation Buttons */}
              {selectedImage > 0 && (
                <button
                  onClick={handlePrevious}
                  className="absolute left-4 z-50 w-12 h-12 bg-background/80 hover:bg-primary/20 border border-primary/30 rounded-full flex items-center justify-center transition-luxury group"
                >
                  <ChevronLeft className="text-primary group-hover:-translate-x-1 transition-luxury" size={28} />
                </button>
              )}

              {selectedImage < images.length - 1 && (
                <button
                  onClick={handleNext}
                  className="absolute right-4 z-50 w-12 h-12 bg-background/80 hover:bg-primary/20 border border-primary/30 rounded-full flex items-center justify-center transition-luxury group"
                >
                  <ChevronRight className="text-primary group-hover:translate-x-1 transition-luxury" size={28} />
                </button>
              )}

              {/* Main Image */}
              <div className="relative max-w-full max-h-full flex flex-col items-center">
                <img
                  src={images[selectedImage].src}
                  alt={images[selectedImage].alt}
                  className="max-w-full max-h-[calc(90vh-120px)] object-contain rounded-lg shadow-luxury animate-scale-in"
                />
                
                {/* Caption */}
                <div className="mt-6 text-center max-w-2xl">
                  <h3 className="text-2xl font-heading font-bold text-primary mb-2">
                    {images[selectedImage].alt}
                  </h3>
                  {images[selectedImage].caption && (
                    <p className="text-foreground font-body">
                      {images[selectedImage].caption}
                    </p>
                  )}
                  <p className="text-muted-foreground font-body text-sm mt-2">
                    {selectedImage + 1} / {images.length}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Gallery;
