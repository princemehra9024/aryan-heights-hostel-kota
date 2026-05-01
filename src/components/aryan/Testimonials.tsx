import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const items = [
  { q: "Two years at Aryan Heights and I never once worried about my son. Premium AC room, attached bathroom, home-style food — everything a parent hopes for. The discipline here is real.", a: "Ramesh Gupta · Parent · 2024" },
  { q: "The dedicated study environment changed everything for me. Silent, distraction-free, always available. Indra Vihar location means coaching institutes are right there. Best decision I made in Kota.", a: "Priyank Sharma · Resident · 2023–24" },
  { q: "AC room with balcony, in-house gym, clean mess, RO water, power backup — I never had to think about anything except my preparation. That peace of mind is priceless.", a: "Deepak Meena · Resident · 2024" },
];

export const Testimonials = () => {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-quote]", {
        opacity: 0, y: 80, stagger: 0.2, duration: 1.2, ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={root} className="py-32 md:py-44 bg-ink text-ivory">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="font-mono-tag text-ivory/60 mb-12">(06) — Voices</div>
        <div className="space-y-20">
          {items.map((it, i) => (
            <blockquote data-quote key={i} className="grid md:grid-cols-12 gap-8">
              <span className="md:col-span-1 font-display text-5xl text-maroon italic font-serif-i">"</span>
              <p className="md:col-span-9 font-display text-3xl md:text-5xl leading-[1.15]">{it.q}</p>
              <footer className="md:col-span-2 font-mono-tag text-ivory/60 self-end">{it.a}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};
