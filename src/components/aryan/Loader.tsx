import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import logo from "@/assets/logo.png";

export const Loader = () => {
  const container = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const barRefs = useRef<HTMLDivElement[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Split title into letters for staggered animation
    const title = titleRef.current;
    if (title) {
      const text = title.textContent || "";
      title.innerHTML = text
        .split("")
        .map((char) => `<span class="inline-block translate-y-[110%] opacity-0">${char === " " ? "&nbsp;" : char}</span>`)
        .join("");
    }

    const tl = gsap.timeline({
      onComplete: () => {
        // Exit animation
        const exitTl = gsap.timeline({
          onComplete: () => setDone(true),
        });

        exitTl.to(content.current, {
          opacity: 0,
          y: -40,
          scale: 0.98,
          filter: "blur(10px)",
          duration: 1,
          ease: "expo.inOut"
        });

        exitTl.to(barRefs.current, {
          scaleY: 0,
          duration: 1.5,
          stagger: {
            amount: 0.4,
            from: "center"
          },
          ease: "expo.inOut"
        }, "-=0.6");
      },
    });

    // Initial state
    gsap.set(barRefs.current, { scaleY: 1 });
    gsap.set(logoRef.current, { opacity: 0, scale: 0.8, y: 20 });
    gsap.set(counterRef.current, { opacity: 0, y: 10 });

    // Intro sequence
    tl.to(logoRef.current, {
      opacity: 0.8,
      scale: 1,
      y: 0,
      duration: 1.5,
      ease: "expo.out"
    });

    if (title) {
      tl.to(title.querySelectorAll("span"), {
        y: "0%",
        opacity: 1,
        duration: 1.2,
        stagger: 0.03,
        ease: "expo.out"
      }, "-=1");
    }

    // Counter logic
    const obj = { v: 0 };
    tl.to(obj, {
      v: 100,
      duration: 3,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = Math.round(obj.v).toString().padStart(3, "0");
        }
      }
    }, "-=1.5");

    tl.to(counterRef.current, {
      opacity: 1,
      y: 0,
      duration: 1
    }, "-=3");

    return () => {
      tl.kill();
    };
  }, []);

  if (done) return null;

  return (
    <div ref={container} className="fixed inset-0 z-[100] flex flex-col overflow-hidden bg-black">
      {/* Editorial Grain */}
      <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      {/* Background Bars */}
      <div className="absolute inset-0 flex">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            ref={(el) => (el ? (barRefs.current[i] = el) : null)}
            className="flex-1 bg-background origin-top border-r border-white/[0.03] last:border-r-0"
          />
        ))}
      </div>

      {/* Content */}
      <div ref={content} className="relative z-10 flex-1 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-16 max-w-5xl px-8 w-full">
          <div className="relative">
            <img 
              ref={logoRef}
              src={logo} 
              alt="Aryan Heights" 
              className="w-20 h-20 md:w-28 md:h-28 object-contain brightness-0 invert opacity-60" 
            />
            {/* Subtle glow behind logo */}
            <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full scale-150" />
          </div>
          
          <div className="text-center">
            <h1 
              ref={titleRef}
              className="font-display text-4xl md:text-7xl lg:text-9xl tracking-[0.25em] uppercase leading-none text-foreground/90 whitespace-nowrap"
            >
              Aryan Heights
            </h1>
          </div>

          <div className="mt-4 flex flex-col items-center gap-4">
            <div 
              ref={counterRef}
              className="font-mono-tag text-2xl md:text-4xl text-foreground/30 tabular-nums"
            >
              000
            </div>
            <div className="h-px w-12 bg-white/10" />
          </div>
        </div>

        {/* Floating Metadata */}
        <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
          <div className="flex flex-col gap-1">
            <span className="eyebrow text-foreground/20 text-[0.6rem]">Curated Residence</span>
            <span className="font-display text-lg opacity-60">Est. 2010</span>
          </div>
          
          <div className="hidden md:flex flex-col items-center">
             <span className="eyebrow text-foreground/20 text-[0.6rem]">Series</span>
             <span className="font-display text-lg opacity-60">Vol. 26</span>
          </div>

          <div className="flex flex-col items-end gap-1 text-right">
            <span className="eyebrow text-foreground/20 text-[0.6rem]">Region</span>
            <span className="font-display text-lg opacity-60">Kota · RJ</span>
          </div>
        </div>
      </div>
      
      {/* Structural Accents */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
        <div className="v-hairline absolute left-1/6" />
        <div className="v-hairline absolute left-2/6" />
        <div className="v-hairline absolute left-3/6" />
        <div className="v-hairline absolute left-4/6" />
        <div className="v-hairline absolute left-5/6" />
      </div>
    </div>
  );
};
