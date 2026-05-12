import { createContext, useContext, useRef, useState, useCallback, useEffect, type ReactNode } from "react";
import { gsap } from "gsap";

/* ── Types ─────────────────────────────────────────────────── */
interface LightboxImage {
  src: string;
  alt: string;
}

interface LightboxContextValue {
  openLightbox: (images: LightboxImage[], startIndex?: number) => void;
}

/* ── Context ────────────────────────────────────────────────── */
const LightboxContext = createContext<LightboxContextValue>({
  openLightbox: () => {},
});

export const useLightbox = () => useContext(LightboxContext);

/* ── Lightbox UI ────────────────────────────────────────────── */
const LightboxModal = ({
  images,
  startIndex,
  onClose,
}: {
  images: LightboxImage[];
  startIndex: number;
  onClose: () => void;
}) => {
  const [current, setCurrent] = useState(startIndex);
  const overlayRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  /* entrance */
  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
    gsap.fromTo(imgRef.current, { scale: 0.88, opacity: 0, y: 24 }, { scale: 1, opacity: 1, y: 0, duration: 0.45, ease: "expo.out" });
    /* lock scroll */
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  /* cross-fade on image change */
  const changeTo = useCallback((next: number) => {
    gsap.to(imgRef.current, {
      opacity: 0, scale: 0.94, duration: 0.2, ease: "power2.in",
      onComplete: () => {
        setCurrent(next);
        gsap.to(imgRef.current, { opacity: 1, scale: 1, duration: 0.3, ease: "expo.out" });
      },
    });
  }, []);

  const prev = useCallback(() => changeTo((current - 1 + images.length) % images.length), [current, changeTo, images.length]);
  const next = useCallback(() => changeTo((current + 1) % images.length), [current, changeTo, images.length]);

  /* keyboard */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next]);

  const handleClose = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.22, ease: "power2.in", onComplete: onClose });
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[300] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.93)", backdropFilter: "blur(16px)" }}
      onClick={handleClose}
    >
      {/* Close */}
      <button
        onClick={handleClose}
        className="absolute top-5 right-5 w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white transition-all duration-200 z-20"
        aria-label="Close lightbox"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Prev — only show if multiple images */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="absolute left-4 md:left-8 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white transition-all duration-200 z-20"
          aria-label="Previous image"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      )}

      {/* Image container */}
      <div
        className="relative flex flex-col items-center gap-4 max-w-[90vw] max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          ref={imgRef}
          src={images[current].src}
          alt={images[current].alt}
          className="max-w-[90vw] max-h-[78vh] object-contain rounded-lg shadow-2xl select-none"
        />

        {/* Caption row */}
        <div className="flex items-center gap-5 text-white/50">
          {images.length > 1 && (
            <span className="font-display text-xl text-white/80 tabular-nums">
              {String(current + 1).padStart(2, "0")}
              <span className="text-white/25 text-sm"> / {String(images.length).padStart(2, "0")}</span>
            </span>
          )}
          <span className="eyebrow text-white/55 text-[0.65rem] tracking-[0.2em]">{images[current].alt}</span>
        </div>

        {/* Dot indicators — only if multiple */}
        {images.length > 1 && (
          <div className="flex gap-2 items-center">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => changeTo(i)}
                aria-label={`Go to image ${i + 1}`}
              >
                <div
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? "22px" : "6px",
                    height: "6px",
                    background: i === current ? "hsl(0 60% 50%)" : "rgba(255,255,255,0.2)",
                  }}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="absolute right-4 md:right-8 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white transition-all duration-200 z-20"
          aria-label="Next image"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      )}
    </div>
  );
};

/* ── Provider ───────────────────────────────────────────────── */
export const LightboxProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<{ images: LightboxImage[]; startIndex: number } | null>(null);

  const openLightbox = useCallback((images: LightboxImage[], startIndex = 0) => {
    setState({ images, startIndex });
  }, []);

  return (
    <LightboxContext.Provider value={{ openLightbox }}>
      {children}
      {state && (
        <LightboxModal
          images={state.images}
          startIndex={state.startIndex}
          onClose={() => setState(null)}
        />
      )}
    </LightboxContext.Provider>
  );
};
