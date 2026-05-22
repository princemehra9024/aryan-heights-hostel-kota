import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLightbox } from "@/context/LightboxContext";
import ownerImg from "@/assets/owner.jpg";
import founderImg from "@/assets/founder.jpg";
import logo from "@/assets/logo.png";

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const root = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { openLightbox } = useLightbox();

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
    <section ref={root} id="about" className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-[1700px] mx-auto px-5 md:px-8 grid md:grid-cols-12 gap-8 relative z-10">
        <div className="md:col-span-2 eyebrow text-foreground/55">(01) — About</div>
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

              {/* Named person cards */}
              <div className="flex flex-col gap-4 md:items-end w-full">
                {[
                  { src: founderImg, name: "Sh. Mukesh Bhatnagar", role: "Founder" },
                  { src: ownerImg,   name: "Aryan Bhatnagar",      role: "Owner" },
                ].map((person, i) => (
                  <div
                    key={i}
                    ref={(el) => { cardsRef.current[i] = el; }}
                    className="floating-bubble relative group flex items-center gap-4 px-5 py-3 surface rounded-2xl border border-hairline cursor-pointer overflow-hidden transition-transform duration-300 hover:-translate-y-1"
                    onClick={() => openLightbox([{ src: person.src, alt: `${person.name} – ${person.role}, Aryan Heights` }])}
                  >
                    <div className="glow-effect absolute w-32 h-32 rounded-full pointer-events-none opacity-0" style={{ background: "radial-gradient(circle, hsl(0 60% 45% / 0.12) 0%, transparent 70%)", transform: "translate(-50%,-50%)" }} />
                    <img
                      data-a-thumb
                      src={person.src}
                      alt={person.name}
                      loading="lazy"
                      className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover brightness-[1.2] contrast-[1.1] saturate-[1.05] border-2 border-accent/30 shrink-0 transition-transform duration-500 group-hover:scale-110"
                    />
                    <div>
                      <div className="font-display text-base md:text-lg leading-tight">{person.name}</div>
                      <div className="eyebrow text-foreground/50 text-[0.65rem] tracking-[0.18em] mt-0.5">{person.role}</div>
                    </div>
                    <div className="ml-auto text-accent/40 group-hover:text-accent transition-colors duration-300 text-lg">↗</div>
                  </div>
                ))}

                {/* Staff badge */}
                <div data-a-thumb className="flex items-center gap-3 px-5 py-3 surface rounded-2xl border border-hairline">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center font-display text-sm text-accent">20+</div>
                  <div className="eyebrow text-foreground/55 text-[0.65rem] tracking-[0.15em]">Dedicated staff members<br/>you'll know by name</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 -right-[5%] w-[40vw] h-[40vw] max-w-[400px] max-h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 -left-[5%] w-[30vw] h-[30vw] max-w-[300px] max-h-[300px] bg-foreground/5 rounded-full blur-[100px] pointer-events-none" />
    </section>
  );
};
