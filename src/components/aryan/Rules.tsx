import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Rules = () => {
  const root = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".rule-item", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const rules = [
    { title: "No Noise / Disturbance", desc: "Strictly no noise to maintain a शांत environment." },
    { title: "No Drugs / Alcohol", desc: "Zero tolerance for drugs or alcohol on premises." },
    { title: "Study-Friendly Environment", desc: "Discipline and a focus on studies are mandatory." },
    { title: "Hostel Timings", desc: "Entry and exit must strictly follow the hostel schedule." }
  ];

  return (
    <section ref={root} id="rules" className="py-24 md:py-32 bg-surface border-t border-hairline">
      <div className="max-w-[1700px] mx-auto px-5 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
          <div>
            <span className="eyebrow text-foreground/50 text-[0.65rem] tracking-widest block mb-4">
              (08) — CODE OF CONDUCT
            </span>
            <h2 className="font-display text-4xl md:text-6xl tracking-tighter">
              Rules &amp; <span className="text-maroon italic">Regulations</span>
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="text-foreground/60 text-sm leading-relaxed">
              To ensure comfort, safety, and productivity for all serious aspirants, we enforce a strict code of conduct.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rules.map((rule, idx) => (
            <div key={idx} className="rule-item p-8 border border-hairline bg-background rounded-2xl hover:border-maroon/30 transition-colors">
              <div className="font-display text-maroon text-2xl mb-4">0{idx + 1}</div>
              <h3 className="font-display text-xl tracking-tight mb-2">{rule.title}</h3>
              <p className="text-foreground/60 text-xs leading-relaxed">{rule.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
