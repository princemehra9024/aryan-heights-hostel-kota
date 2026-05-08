import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import w1 from "@/assets/warden-1.jpg";
import w2 from "@/assets/warden-2.jpg";
import w3 from "@/assets/warden-3.jpg";

const team = [
  { n: "Mr. Rajendra Sharma", r: "Senior Warden · 14 yrs", img: w1 },
  { n: "Mr. Ankit Verma", r: "Hostel Manager · 8 yrs", img: w2 },
  { n: "Mrs. Sunita Joshi", r: "Mess In-charge · 11 yrs", img: w3 },
];

export const Wardens = () => {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-w-line]", {
        yPercent: 110, stagger: 0.08, duration: 1.1, ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={root} className="py-28 md:py-40 border-t border-hairline">
      <div className="max-w-[1700px] mx-auto px-5 md:px-8 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <div className="relative aspect-[3/4] overflow-hidden surface">
            {team.map((m, i) => (
              <img key={i} src={m.img} alt={m.n} loading="lazy"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${active === i ? "opacity-100" : "opacity-0"}`} />
            ))}
          </div>
        </div>
        <div className="md:col-span-7 flex flex-col gap-10">
          <div className="flex flex-col gap-8">
            <div>
              <div className="eyebrow text-foreground/55 mb-4">(07) — Team</div>
              <h2 className="font-display text-5xl md:text-7xl leading-[1] tracking-tighter">
                <span className="block overflow-hidden"><span data-w-line className="block">People who'll know</span></span>
                <span className="block overflow-hidden"><span data-w-line className="block text-foreground/55">your son by name.</span></span>
              </h2>
            </div>
            
            <div className="flex flex-col gap-4 opacity-30">
              <div className="hairline w-full" />
              <div className="hairline w-3/4" />
              <div className="hairline w-1/2" />
            </div>
          </div>
          <ul className="divide-y divide-hairline border-b border-hairline mt-10">
            {team.map((m, i) => (
              <li key={i} onMouseEnter={() => setActive(i)}
                className={`group py-10 flex items-center justify-between cursor-pointer transition-all ${active === i ? "px-6 bg-surface/50 text-foreground" : "px-0 text-foreground/45 hover:text-foreground/70"}`}>
                <div className="flex items-center gap-6">
                  <span className="eyebrow text-[0.6rem] opacity-40">0{i + 1}</span>
                  <span className="font-display text-3xl md:text-5xl tracking-tighter transition-transform group-hover:translate-x-2">{m.n}</span>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="eyebrow">{m.r}</span>
                  <div className={`h-px bg-maroon transition-all duration-500 ${active === i ? "w-20" : "w-0"}`} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
