import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import hero from "@/assets/hero-building.jpg";

const rotators = ["High-Speed WiFi", "In-house Gym", "Mess Facility", "24×7 Security", "RO Drinking Water", "Power Backup"];

export const Hero = () => {
  const root = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Syncing with the Loader exit (Loader finishes intro at 4.5s, bars start sliding out at 4.9s)
      const tl = gsap.timeline({ delay: 5.0, defaults: { ease: "expo.out" } });
      
      tl.from("[data-hero-line] span", { yPercent: 110, duration: 1.4, stagger: 0.1 })
        .from("[data-hero-tag]", { opacity: 0, x: -20, duration: 1 }, "-=1")
        .from(img.current, { scale: 1.15, filter: "blur(10px)", duration: 2, ease: "power4.out" }, "-=1.4")
        .from("[data-hero-meta]", { opacity: 0, y: 20, duration: 1, stagger: 0.1 }, "-=1.2")
        .from("[data-hero-rotator]", { opacity: 0, y: 20, duration: 1 }, "-=1.0");

      gsap.to(img.current, {
        yPercent: 18, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });

      // Static amenities — no auto-slide, user sees all at once
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="top" className="relative min-h-[100svh] overflow-hidden pt-28 md:pt-32">
      <div className="max-w-[1700px] mx-auto px-5 md:px-8 grid md:grid-cols-12 gap-6 md:gap-10">
        <div className="md:col-span-7 z-10">
          <div data-hero-tag className="eyebrow text-foreground/60 mb-8 flex items-center gap-3">
            <span className="w-10 h-px bg-maroon" /> Premium Boys Hostel · Since 2010
          </div>
          <h1 className="font-display text-[14vw] md:text-[8.5vw] leading-[0.92] tracking-tight">
            <span data-hero-line className="block overflow-hidden"><span className="block">A premium</span></span>
            <span data-hero-line className="block overflow-hidden"><span className="block">boys' hostel,</span></span>
            <span data-hero-line className="block overflow-hidden"><span className="block">in <span className="text-maroon">Kota.</span></span></span>
          </h1>
          <div className="hairline mt-12" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            {[["15+","Years of Trust"],["1200+","Aspirants Housed"],["24/7","Security & Care"],["3min","To Allen Campus"]].map(([n,l]) => (
              <div data-hero-meta key={l}>
                <div className="font-display text-3xl md:text-4xl">{n}</div>
                <div className="eyebrow text-foreground/55 mt-2">{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="md:col-span-5 relative h-[60svh] md:h-[80svh] overflow-hidden rounded-sm">
          <img ref={img} src={hero} alt="Aryan Heights hostel exterior at golden hour" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1280} />
          <div className="absolute top-6 left-6 eyebrow text-foreground/80">Indra Vihar · Kota</div>
          <div className="absolute top-6 right-6 eyebrow text-foreground/80">26.91°N · 75.79°E</div>
          <div data-hero-rotator className="absolute bottom-6 left-6 right-6">
            <div className="eyebrow text-foreground/60 mb-3">What you get</div>
            <div className="flex flex-wrap gap-2">
              {rotators.map((r, i) => (
                <span key={i} className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium tracking-wide bg-background/60 backdrop-blur-md text-foreground/90 border border-foreground/10">{r}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 eyebrow text-foreground/55 flex flex-col items-center gap-2">
        <span>Scroll</span>
        <span className="w-px h-10 bg-foreground/30 animate-pulse" />
      </div>
    </section>
  );
};
