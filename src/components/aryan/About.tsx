import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import w1 from "@/assets/warden-1.jpg";
import w2 from "@/assets/warden-2.jpg";
import w3 from "@/assets/warden-3.jpg";

export const About = () => {
  const root = useRef<HTMLElement>(null);
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
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={root} id="about" className="py-28 md:py-40">
      <div className="max-w-[1700px] mx-auto px-5 md:px-8 grid md:grid-cols-12 gap-8">
        <div className="md:col-span-2 eyebrow text-foreground/55">(02) — About</div>
        <div className="md:col-span-9">
          <h2 className="font-display text-[8vw] md:text-[4.2vw] leading-[1.02] tracking-tighter">
            <span className="block overflow-hidden"><span data-a-line className="block">A home that quietly</span></span>
            <span className="block overflow-hidden"><span data-a-line className="block">backs his ambition —</span></span>
            <span className="block overflow-hidden"><span data-a-line className="block text-foreground/55">since 2010.</span></span>
          </h2>
          <div className="flex gap-4 mt-8 opacity-20">
            <div className="hairline flex-1" />
            <div className="hairline w-24" />
            <div className="hairline w-12" />
          </div>
          <div className="grid md:grid-cols-12 gap-8 mt-8 md:mt-14">
            <p className="md:col-span-7 text-lg text-foreground/75 leading-relaxed">
              Aryan Heights Boys Hostel is a premium, fully furnished student accommodation located in the prime area of Indra Vihar, Kota. Designed for serious aspirants, the hostel offers a शांत, distraction-free environment with modern amenities, ensuring comfort, safety, and productivity for students preparing for competitive exams.
            </p>
            <div className="md:col-span-5 flex flex-col justify-end gap-6">
              <div className="flex -space-x-3">
                {[w1, w2, w3].map((src, i) => (
                  <img key={i} data-a-thumb src={src} alt="warden" loading="lazy" className="w-16 h-16 rounded-full object-cover border-2 border-background" />
                ))}
                <div data-a-thumb className="w-16 h-16 rounded-full border-2 border-background bg-surface flex items-center justify-center font-display text-base">20+</div>
              </div>
              <div className="eyebrow text-foreground/55">Wardens, mess team & housekeeping you'll know by name</div>
              <a href="#contact" className="btn-pill self-start">About us <span>→</span></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
