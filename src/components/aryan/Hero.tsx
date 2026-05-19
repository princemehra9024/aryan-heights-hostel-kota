import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImg from "../../assets/hero-building.png";

gsap.registerPlugin(ScrollTrigger);

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
    <section ref={root} id="top" className="relative min-h-[90svh] md:min-h-[100svh] pb-12 md:pb-0 overflow-hidden pt-20 md:pt-24">
      <div className="max-w-[1700px] mx-auto px-5 md:px-8 grid md:grid-cols-12 gap-8 md:gap-10 items-center">
        <div className="md:col-span-7 z-10">
          <div data-hero-tag className="eyebrow text-foreground/60 mb-6 md:mb-8 flex items-center gap-3">
            <span className="w-10 h-px bg-maroon" /> Premium Boys Hostel · Since 2010
          </div>
          <h1 className="font-display text-[12.5vw] leading-[0.95] md:text-[8.5vw] md:leading-[0.92] tracking-tight">
            <span data-hero-line className="block overflow-hidden"><span className="block">A premium</span></span>
            <span data-hero-line className="block overflow-hidden"><span className="block">boys' hostel,</span></span>
            <span data-hero-line className="block overflow-hidden"><span className="block">in <span className="text-maroon">Kota.</span></span></span>
          </h1>
          <div className="hairline mt-8 md:mt-12" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-6 md:mt-8">
            {[["15+","Years of Trust"],["1200+","Aspirants Housed"],["24/7","Security & Care"],["3min","To Allen Campus"]].map(([n,l]) => (
              <div data-hero-meta key={l}>
                <div className="font-display text-2xl md:text-4xl">{n}</div>
                <div className="eyebrow text-foreground/55 mt-1 md:mt-2 text-[0.65rem] md:text-xs">{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="md:col-span-5 relative h-[55svh] md:h-[80svh] overflow-hidden rounded-xl md:rounded-sm">
          <img 
            ref={img} 
            src={heroImg}
            alt="Aryan Heights hostel exterior at night" 
            className="absolute inset-0 w-full h-full object-cover" 
            loading="eager"
            // @ts-ignore
            fetchpriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50 pointer-events-none" />
          <div className="absolute top-5 left-5 eyebrow text-white/90 drop-shadow-md z-10">Indra Vihar · Kota</div>
          <div className="absolute top-5 right-5 eyebrow text-white/90 drop-shadow-md z-10">26.91°N · 75.79°E</div>
          <div data-hero-rotator className="absolute bottom-5 left-5 right-5 z-10">
            <div className="eyebrow text-white/80 mb-2 drop-shadow-md">What you get</div>
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {rotators.map((r, i) => (
                <span key={i} className="inline-flex items-center px-2.5 py-1 md:px-3 md:py-1.5 rounded-full text-[0.65rem] md:text-xs font-medium tracking-wide bg-black/40 backdrop-blur-md text-white border border-white/20">{r}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 eyebrow text-foreground/55 flex flex-col items-center gap-1.5 md:gap-2">
        <span>Scroll</span>
        <span className="w-px h-8 md:h-10 bg-foreground/30 animate-pulse" />
      </div>
    </section>
  );
};
