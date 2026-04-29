import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import g1 from "@/assets/hero-building.jpg";
import g2 from "@/assets/room-single.jpg";
import g3 from "@/assets/study-room.jpg";
import g4 from "@/assets/gym.jpg";
import g5 from "@/assets/rooftop.jpg";
import g6 from "@/assets/hallway.jpg";
import g7 from "@/assets/mess-hall.jpg";

const imgs = [
  { src: g1, label: "Facade · 2024" },
  { src: g3, label: "Study Hall" },
  { src: g2, label: "Single Room" },
  { src: g5, label: "Rooftop Lounge" },
  { src: g4, label: "Gymnasium" },
  { src: g7, label: "Mess Hall" },
  { src: g6, label: "West Wing" },
];

export const Gallery = () => {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const total = track.current!.scrollWidth - window.innerWidth + 100;
      gsap.to(track.current, {
        x: -total,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${total}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={root} id="gallery" className="relative overflow-hidden">
      <div className="pt-24 pb-10 px-5 md:px-8 max-w-[1700px] mx-auto grid md:grid-cols-12 gap-8 items-end border-t border-hairline">
        <div className="md:col-span-2 eyebrow text-foreground/55 pt-10">(06) — Gallery</div>
        <h2 className="md:col-span-7 font-display text-5xl md:text-7xl leading-[1] tracking-tighter pt-10">
          Step inside, <span className="text-foreground/55">slowly.</span>
        </h2>
        <p className="md:col-span-3 eyebrow text-foreground/45 pt-10">Drag · Scroll · 07 frames</p>
      </div>
      <div className="h-[78svh] flex items-center">
        <div ref={track} className="flex gap-6 pl-5 md:pl-8 will-change-transform" data-cursor>
          {imgs.map((im, i) => (
            <figure key={i} className="relative shrink-0 surface" style={{ width: i % 2 ? "44vw" : "32vw", height: i % 2 ? "60svh" : "70svh" }}>
              <img src={im.src} alt={im.label} className="w-full h-full object-cover" loading="lazy" />
              <figcaption className="eyebrow text-foreground/60 mt-3 flex justify-between absolute -bottom-7 left-0 right-0">
                <span>0{i + 1}</span><span>{im.label}</span>
              </figcaption>
            </figure>
          ))}
          <div className="shrink-0 w-[20vw]" />
        </div>
      </div>
    </section>
  );
};
