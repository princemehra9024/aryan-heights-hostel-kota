import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import hallway from "@/assets/hallway.jpg";
import rooftop from "@/assets/rooftop.jpg";
import gym from "@/assets/gym.jpg";
import study from "@/assets/study-room.jpg";
import mess from "@/assets/mess-hall.jpg";
import room from "@/assets/room-single.jpg";

const slides = [
  { t: "Wi-Fi 300 Mbps", c: "Dedicated fibre line, redundant routers, never throttled during mocks.", img: hallway },
  { t: "RO + UV Water", c: "On every floor, tested monthly, zero plastic bottles.", img: room },
  { t: "Power Backup", c: "Full-load generator + inverter. Lights stay on, AC stays on.", img: study },
  { t: "CCTV & Security", c: "32 cameras, biometric entry, two wardens on duty 24/7.", img: rooftop },
  { t: "Laundry", c: "Pickup Mon & Thu, machine-washed, ironed, returned in 24 hrs.", img: mess },
  { t: "Housekeeping", c: "Daily room cleaning, weekly deep-clean, fresh linen weekly.", img: gym },
];

export const FacilitiesSlider = () => {
  const [i, setI] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!track.current) return;
    gsap.to(track.current, { xPercent: -100 * i, duration: 1, ease: "expo.inOut" });
  }, [i]);
  const next = () => setI((p) => (p + 1) % slides.length);
  const prev = () => setI((p) => (p - 1 + slides.length) % slides.length);
  return (
    <section className="py-28 md:py-40 border-t border-hairline overflow-hidden">
      <div className="max-w-[1700px] mx-auto px-5 md:px-8">
        <div className="grid md:grid-cols-12 gap-8 items-end mb-12">
          <div className="md:col-span-2 eyebrow text-foreground/55">(05) — Facilities</div>
          <h2 className="md:col-span-7 font-display text-5xl md:text-7xl leading-[1] tracking-tighter">Quietly engineered<br/>to never get in his way.</h2>
          <div className="md:col-span-3 flex md:justify-end items-center gap-4">
            <span className="font-display text-xl">{String(i + 1).padStart(2, "0")} <span className="text-foreground/40">/ {String(slides.length).padStart(2, "0")}</span></span>
            <div className="flex gap-2">
              <button onClick={prev} aria-label="Prev" className="w-11 h-11 rounded-full border border-hairline hover:bg-ivory hover:text-ink transition-colors">←</button>
              <button onClick={next} aria-label="Next" className="w-11 h-11 rounded-full border border-hairline hover:bg-ivory hover:text-ink transition-colors">→</button>
            </div>
          </div>
        </div>
        <div className="relative" data-cursor>
          <div ref={track} className="flex w-full will-change-transform">
            {slides.map((s, idx) => (
              <div key={idx} className="w-full shrink-0 grid md:grid-cols-12 gap-6 pr-6">
                <div className="md:col-span-7 aspect-[16/10] overflow-hidden surface relative">
                  <img src={s.img} alt={s.t} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div className="md:col-span-5 flex flex-col justify-end gap-5 pb-2">
                  <div className="eyebrow text-maroon">0{idx + 1}</div>
                  <h3 className="font-display text-4xl md:text-5xl tracking-tighter">{s.t}</h3>
                  <p className="text-foreground/70 text-base max-w-md">{s.c}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
