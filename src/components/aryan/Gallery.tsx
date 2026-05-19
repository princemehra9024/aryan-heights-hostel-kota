import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLightbox } from "@/context/LightboxContext";

gsap.registerPlugin(ScrollTrigger);
import g1 from "@/assets/hero-building.png";
import g2 from "@/assets/room-single.jpg";
import g3 from "@/assets/study-room.jpg";
import g4 from "@/assets/gym.jpg";
import g5 from "@/assets/hallway.jpg";
import g6 from "@/assets/waiting-room.jpg";
import g7 from "@/assets/mess-hall.jpg";

const imgs = [
  { src: g1, label: "Facade · 2024" },
  { src: g3, label: "Study Area" },
  { src: g2, label: "Single Room" },
  { src: g5, label: "Silent Environment" },
  { src: g4, label: "Gymnasium" },
  { src: g7, label: "Mess Hall" },
  { src: g6, label: "Waiting Lounge" },
];


const galleryImgs = imgs.map((im) => ({ src: im.src, alt: im.label }));


/* ── Gallery ──────────────────────────────────────────────────── */
export const Gallery = () => {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const { openLightbox } = useLightbox();

  const handleOpen = (i: number) => openLightbox(galleryImgs, i);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (isMobile) return;

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
    <>
      <section ref={root} id="gallery" className="relative overflow-hidden">
        {/* Header */}
        <div className="pt-16 pb-10 px-5 md:px-8 max-w-[1700px] mx-auto grid md:grid-cols-12 gap-8 items-end border-t border-hairline">
          <div className="md:col-span-2 eyebrow text-foreground/55 pt-10">(05) — Gallery</div>
          <h2 className="md:col-span-7 font-display text-5xl md:text-7xl leading-[1] tracking-tighter pt-10">
            Step inside, <span className="text-foreground/55">slowly.</span>
          </h2>
          <p className="md:col-span-3 eyebrow text-foreground/45 pt-10 hidden md:block">
            Click any image · 07 frames
          </p>
          <p className="md:hidden eyebrow text-foreground/45">Tap any image · 07 frames</p>
        </div>

        {/* ── DESKTOP: horizontal scroll track ── */}
        <div className="hidden md:flex h-[78svh] items-center">
          <div ref={track} className="flex gap-6 pl-5 md:pl-8 will-change-transform" data-cursor>
            {imgs.map((im, i) => (
              <figure
                key={i}
                className="relative shrink-0 surface cursor-pointer group"
                style={{ width: i % 2 ? "44vw" : "32vw", height: i % 2 ? "60svh" : "70svh" }}
                onClick={() => handleOpen(i)}
              >
                <img
                  src={im.src}
                  alt={im.label}
                  className="w-full h-full object-cover brightness-[1.25] contrast-[1.15] saturate-[1.1] transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-400">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                  </div>
                </div>
                <figcaption className="eyebrow text-foreground/60 mt-3 flex justify-between absolute -bottom-7 left-0 right-0">
                  <span>0{i + 1}</span>
                  <span>{im.label}</span>
                </figcaption>
              </figure>
            ))}
            <div className="shrink-0 w-[20vw]" />
          </div>
        </div>

        {/* ── MOBILE: simple 2-column grid ── */}
        <div className="md:hidden px-5 pb-16 grid grid-cols-2 gap-4">
          {imgs.map((im, i) => (
            <figure
              key={i}
              className={`relative surface overflow-hidden rounded-xl cursor-pointer group ${i === 0 ? "col-span-2" : ""}`}
              style={{ aspectRatio: i === 0 ? "16/9" : "4/5" }}
              onClick={() => handleOpen(i)}
            >
              <img
                src={im.src}
                alt={im.label}
                className="w-full h-full object-cover brightness-[1.25] contrast-[1.15] saturate-[1.1] transition-transform duration-500 group-active:scale-95"
                loading="lazy"
              />
              {/* Tap indicator */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-active:bg-black/20 transition-colors duration-200">
                <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  </svg>
                </div>
              </div>
              <figcaption className="eyebrow text-white/90 absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/50 to-transparent flex justify-between text-[0.6rem]">
                <span>0{i + 1}</span>
                <span>{im.label}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
};
