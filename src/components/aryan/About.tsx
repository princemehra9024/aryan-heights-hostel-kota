import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import w1 from "@/assets/warden-1.jpg";
import w2 from "@/assets/warden-2.jpg";
import w3 from "@/assets/warden-3.jpg";
import logo from "@/assets/logo.png";

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const root = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-a-line]", {
        yPercent: 110, stagger: 0.08, duration: 1.1, ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
      gsap.from("[data-a-thumb]", {
        scale: 0.8, opacity: 0, stagger: 0.1, duration: 0.9, ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });

      
      // Floating animation for the image bubbles
      gsap.to(".floating-bubble", {
        y: -8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        duration: 2.5,
        stagger: 0.2
      });
    }, root);

    // Mouse move effect for boxes
    const cards = cardsRef.current;
    const handleMouseMove = (e: any, card: any) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      gsap.to(card.querySelector('.glow-effect'), {
        x, y,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out"
      });
    };
    
    const handleMouseLeave = (card: any) => {
      gsap.to(card.querySelector('.glow-effect'), {
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
      });
    };

    const cleanupFns: (() => void)[] = [];
    cards.forEach(card => {
      if (!card) return;
      const onMove = (e: any) => handleMouseMove(e, card);
      const onLeave = () => handleMouseLeave(card);
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      cleanupFns.push(() => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => {
      ctx.revert();
      cleanupFns.forEach(fn => fn());
    };
  }, []);

  return (
    <section ref={root} id="about" className="py-28 md:py-40 relative overflow-hidden">
      <div className="max-w-[1700px] mx-auto px-5 md:px-8 grid md:grid-cols-12 gap-8 relative z-10">
        <div className="md:col-span-2 eyebrow text-foreground/55">(02) — About</div>
        <div className="md:col-span-9">
          <h2 className="font-display text-[8vw] md:text-[4.2vw] leading-[1.02] tracking-tighter">
            <span className="block overflow-hidden"><span data-a-line className="block">A home that quietly</span></span>
            <span className="block overflow-hidden"><span data-a-line className="block text-accent">backs his ambition —</span></span>
            <span className="block overflow-hidden"><span data-a-line className="block text-foreground/55">since 2010.</span></span>
          </h2>
          
          <div className="flex gap-4 mt-8 opacity-20">
            <div className="hairline flex-1" />
            <div className="hairline w-24" />
            <div className="hairline w-12" />
          </div>

          <div className="grid md:grid-cols-12 gap-8 mt-8 md:mt-14 items-end">
            <p className="md:col-span-7 text-lg md:text-xl text-foreground/75 leading-relaxed font-light">
              At Aryan Heights Hostel, we believe a student's environment dictates their success. We provide a meticulously managed, premium living space designed to remove daily friction, so you can focus completely on your goals.
            </p>
            <div className="md:col-span-5 flex flex-col md:items-end gap-6">
              <div className="flex -space-x-4">
                {[w1, w2, w3].map((src, i) => (
                  <div key={i} className="floating-bubble relative group cursor-pointer">
                    <img data-a-thumb src={src} alt="warden" loading="lazy" className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-4 border-background transition-transform duration-500 group-hover:scale-110 relative z-10" />
                    <div className="absolute inset-0 rounded-full border-4 border-accent opacity-0 group-hover:opacity-100 scale-110 transition-all duration-500 z-0"></div>
                  </div>
                ))}
                <div data-a-thumb className="floating-bubble w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-background bg-surface flex items-center justify-center font-display text-lg relative z-10 transition-transform duration-500 hover:scale-110 cursor-pointer hover:bg-accent hover:text-white">
                  20+
                </div>
              </div>
              <div className="eyebrow text-foreground/55 md:text-right">Dedicated staff members <br className="hidden md:block"/>you'll know by name</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 -right-[10%] w-[40vw] h-[40vw] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 -left-[10%] w-[30vw] h-[30vw] bg-foreground/5 rounded-full blur-[100px] pointer-events-none" />
    </section>
  );
};
