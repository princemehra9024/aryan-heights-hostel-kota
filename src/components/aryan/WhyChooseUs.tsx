import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  ["15+", "Years of Service"],
  ["1200+", "Aspirants Housed"],
  ["AC", "Rooms Only"],
  ["Walk", "To Coaching Institutes"],
  ["24×7", "Security & Warden"],
  ["RO", "Purified Water"],
];

const quotes = [
  { q: "Two years at Aryan Heights and I never once worried about my son. The warden knows him by name. The food is honest. The environment is exactly what a serious student needs.", a: "Ramesh Gupta · Parent · 2024" },
  { q: "The study environment here changed how I prepared. Quiet, distraction-free, open when I needed it most. Aryan Heights gave me the focus I came to Kota for.", a: "Priyank Sharma · Resident · 2023–24" },
  { q: "AC room, attached bathroom, gym, mess — everything under one roof. No need to go anywhere. Indra Vihar location is perfect, coaching institutes are just a walk away.", a: "Deepak Meena · Resident · 2024" },
];

export const WhyChooseUs = () => {
  const root = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-stat]", {
        y: 60, opacity: 0, stagger: 0.06, duration: 0.9, ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={root} className="py-16 md:py-24 border-t border-hairline">
      <div className="max-w-[1700px] mx-auto px-5 md:px-8">
        <div className="grid md:grid-cols-12 gap-8 items-end mb-16">
          <div className="md:col-span-2 eyebrow text-foreground/55">(07) — Why us</div>
          <h2 className="md:col-span-10 font-display text-5xl md:text-7xl leading-[1] tracking-tighter">
            Why families choose Aryan Heights — <span className="text-foreground/55">again, and again.</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 border-t border-hairline">
          {stats.map(([n, l]) => (
            <div key={l} data-stat className="border-b border-r border-hairline p-6 md:p-8 last:border-r-0">
              <div className="font-display text-4xl md:text-6xl tracking-tighter">{n}</div>
              <div className="eyebrow text-foreground/55 mt-3">{l}</div>
            </div>
          ))}
        </div>

        <div className="mt-20 grid md:grid-cols-12 gap-8 items-end">
          <blockquote className="md:col-span-9">
            <p className="font-display text-3xl md:text-5xl leading-[1.15] tracking-tight">"{quotes[i].q}"</p>
            <footer className="eyebrow text-foreground/55 mt-6">{quotes[i].a}</footer>
          </blockquote>
          <div className="md:col-span-3 flex md:justify-end items-center gap-4">
            <span className="font-display text-xl">{String(i + 1).padStart(2, "0")} <span className="text-foreground/40">/ {String(quotes.length).padStart(2, "0")}</span></span>
            <div className="flex gap-2">
              <button onClick={() => setI((p) => (p - 1 + quotes.length) % quotes.length)} aria-label="Prev" className="w-11 h-11 rounded-full border border-hairline hover:bg-ivory hover:text-ink transition-colors">←</button>
              <button onClick={() => setI((p) => (p + 1) % quotes.length)} aria-label="Next" className="w-11 h-11 rounded-full border border-hairline hover:bg-ivory hover:text-ink transition-colors">→</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
