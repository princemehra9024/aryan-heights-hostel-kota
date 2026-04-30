import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import logo from "@/assets/logo.png";

export const Loader = () => {
  const container = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const barRefs = useRef<HTMLDivElement[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Exit animation
        const exitTl = gsap.timeline({
          onComplete: () => setDone(true),
        });

        exitTl.to(content.current, {
          opacity: 0,
          y: -20,
          duration: 0.8,
          ease: "power4.inOut"
        });

        exitTl.to(barRefs.current, {
          scaleY: 0,
          duration: 1.2,
          stagger: {
            each: 0.1,
            from: "start"
          },
          ease: "expo.inOut"
        }, "-=0.4");
      },
    });

    // Initial state
    gsap.set(barRefs.current, { scaleY: 1 });
    gsap.set([logoRef.current, textRef.current, counterRef.current], { 
      opacity: 0, 
      y: 40 
    });

    // Intro animation
    tl.to(logoRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power4.out"
    });

    tl.to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power4.out"
    }, "-=0.8");

    // Counter animation
    const obj = { v: 0 };
    tl.to(obj, {
      v: 100,
      duration: 2.5,
      ease: "none",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = Math.round(obj.v).toString().padStart(3, "0");
        }
      }
    }, "-=1");

    tl.to(counterRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8
    }, "-=2.5");

    return () => {
      tl.kill();
    };
  }, []);

  if (done) return null;

  return (
    <div ref={container} className="fixed inset-0 z-[100] flex flex-col overflow-hidden">
      {/* Background Bars */}
      <div className="absolute inset-0 flex">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            ref={(el) => (el ? (barRefs.current[i] = el) : null)}
            className="flex-1 bg-background origin-top border-r border-white/5 last:border-r-0"
          />
        ))}
      </div>

      {/* Content */}
      <div ref={content} className="relative z-10 flex-1 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-12 max-w-4xl px-8">
          <div className="overflow-hidden">
            <img 
              ref={logoRef}
              src={logo} 
              alt="Aryan Heights" 
              className="w-24 h-24 md:w-32 md:h-32 object-contain brightness-0 invert opacity-80" 
            />
          </div>
          
          <div className="overflow-hidden text-center">
            <h1 
              ref={textRef}
              className="font-display text-5xl md:text-8xl tracking-[0.2em] uppercase leading-none"
            >
              Aryan <br className="md:hidden" /> Heights
            </h1>
          </div>

          <div className="overflow-hidden mt-8">
            <div 
              ref={counterRef}
              className="font-mono-tag text-3xl md:text-5xl text-foreground/40"
            >
              000
            </div>
          </div>
        </div>

        {/* Floating Details */}
        <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end overflow-hidden">
          <div className="flex flex-col gap-2">
            <span className="eyebrow text-foreground/30">Established</span>
            <span className="font-display text-xl">2010</span>
          </div>
          <div className="flex flex-col items-end gap-2 text-right">
            <span className="eyebrow text-foreground/30">Location</span>
            <span className="font-display text-xl text-right">Kota, Rajasthan</span>
          </div>
        </div>
      </div>
      
      {/* Decorative lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="v-hairline absolute left-1/4" />
        <div className="v-hairline absolute left-2/4" />
        <div className="v-hairline absolute left-3/4" />
      </div>
    </div>
  );
};
