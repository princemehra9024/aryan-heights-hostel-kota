import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import room from "@/assets/room-single.jpg";
import mess from "@/assets/mess-hall.jpg";
import study from "@/assets/study-room.jpg";
import gym from "@/assets/gym.jpg";

const services = [
  { title: "Rooms", copy: "Single & twin sharing, AC and non-AC, attached bath, daily housekeeping.", img: room, n: "01" },
  { title: "Mess", copy: "Three home-style meals, real ghee, weekly menu rotation, parent-tasted.", img: mess, n: "02" },
  { title: "Study Halls", copy: "Silent floors, individual desks, 24/7 access, lit just right.", img: study, n: "03" },
  { title: "Wellness", copy: "Gym, rooftop, doctor on call, mental wellness check-ins.", img: gym, n: "04" },
];

export const Facilities = () => {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-svc-card]", {
        y: 80, opacity: 0, stagger: 0.1, duration: 1, ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={root} id="facilities" className="py-28 md:py-40 border-t border-hairline">
      <div className="max-w-[1700px] mx-auto px-5 md:px-8">
        <div className="grid md:grid-cols-12 gap-8 items-end mb-16">
          <div className="md:col-span-2 eyebrow text-foreground/55">(03) — Services</div>
          <div className="md:col-span-7">
            <h2 className="font-display text-5xl md:text-7xl leading-[1] tracking-tighter">Built for the way<br/>he actually lives.</h2>
            <div className="flex gap-4 mt-8 opacity-20 md:hidden">
              <div className="hairline flex-1" />
              <div className="hairline w-12" />
            </div>
          </div>
          <p className="md:col-span-3 text-foreground/65 text-sm">Four pillars. No compromises. Every floor designed by parents who once sent their own son to Kota.</p>
        </div>
        <div className="hidden md:flex gap-4 mb-12 opacity-20">
          <div className="hairline w-40" />
          <div className="hairline flex-1" />
          <div className="hairline w-20" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s) => (
            <article key={s.title} data-svc-card className="group relative overflow-hidden surface aspect-[4/5]">
              <img src={s.img} alt={s.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-[1200ms] ease-[var(--ease-out-expo)]" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, hsl(var(--bg) / 0.1), hsl(var(--bg) / 0.85))" }} />
              <div className="absolute top-5 left-5 eyebrow text-foreground/80">{s.n}</div>
              <div className="absolute top-5 right-5 w-9 h-9 rounded-full border border-foreground/40 flex items-center justify-center text-foreground/80 group-hover:bg-ivory group-hover:text-ink transition-all">→</div>
              <div className="absolute bottom-5 left-5 right-5">
                <h3 className="font-display text-3xl mb-2">{s.title}</h3>
                <p className="text-sm text-foreground/75">{s.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
