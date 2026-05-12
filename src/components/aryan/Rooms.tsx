import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import roomSingleImg from "@/assets/room-single.jpg";
import roomDoubleImg from "@/assets/room-double.jpg";
import hallwayImg from "@/assets/hallway.jpg";
import studyRoomImg from "@/assets/study-room.jpg";

gsap.registerPlugin(ScrollTrigger);

const tiers = [
  { id: "01", name: "AC Single Room",  price: "On Call", tag: "Balcony",     img: roomSingleImg, featured: false },
  { id: "02", name: "AC Single Room",  price: "On Call", tag: "Non-Balcony • Most Picked", img: roomSingleImg, featured: true  },
  { id: "03", name: "AC Double Room",  price: "On Call", tag: "Balcony",     img: roomDoubleImg },
];

export const Rooms = () => {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading lines
      gsap.from(".rh-line", {
        yPercent: 110,
        stagger: 0.09,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
      });
      // Cards
      gsap.from(".rh-card", {
        y: 60,
        opacity: 0,
        stagger: 0.12,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".rh-cards", start: "top 82%", once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="rooms"
      className="py-16 md:py-24 border-t border-hairline bg-background"
    >
      <div className="max-w-[1700px] mx-auto px-5 md:px-12">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-10 mb-12 md:mb-24">
          <div>
            <div className="overflow-hidden mb-2">
              <span className="rh-line eyebrow text-foreground/50 text-[0.65rem] tracking-widest block">
                (02) — ROOMS &amp; PRICING
              </span>
            </div>
            <div className="overflow-hidden">
              <h2 className="rh-line font-display text-[12vw] sm:text-6xl md:text-8xl leading-[0.95] md:leading-[0.92] tracking-tighter">
                Pick the room.
              </h2>
            </div>
            <div className="overflow-hidden">
              <h2 className="rh-line font-display text-[12vw] sm:text-6xl md:text-8xl leading-[0.95] md:leading-[0.92] tracking-tighter text-maroon italic">
                We handle the rest.
              </h2>
            </div>
          </div>

          <div className="max-w-xs md:mb-3">
            <p className="text-foreground/60 text-sm md:text-base leading-relaxed mb-5 md:mb-7">
              Three curated tiers. All-inclusive rates. Zero deposit surprises.
            </p>
            <Link
              to="/rooms"
              className="group inline-flex items-center gap-3 btn-pill text-xs md:text-sm"
            >
              View all rooms
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* ── Teaser Cards ── */}
        <div className="rh-cards grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {tiers.map((t) => (
            <Link
              key={t.id}
              to="/rooms"
              className={`rh-card group relative rounded-[1.5rem] md:rounded-[1.75rem] overflow-hidden cursor-pointer block
                ${t.featured
                  ? "ring-1 ring-maroon/50 shadow-[0_20px_60px_-10px_rgba(128,0,32,0.2)]"
                  : "border border-hairline"
                }
              `}
              style={{ minHeight: "400px" }}
            >
              {/* Image */}
              <img
                src={t.img}
                alt={t.name}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

              {/* Badge */}
              {t.featured && (
                <div className="absolute top-4 left-4 md:top-5 md:left-5 z-10">
                  <span className="eyebrow text-[0.55rem] px-3 py-1.5 bg-maroon text-white rounded-full tracking-widest">
                    Most Picked
                  </span>
                </div>
              )}

              {/* Tier number */}
              <div className="absolute top-4 right-4 md:top-5 md:right-5 z-10">
                <span className="eyebrow text-[0.55rem] text-white/80 md:text-white/60">/{t.id}</span>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7 z-10">
                <span className="eyebrow text-[0.58rem] text-white/80 md:text-white/60 tracking-widest block mb-2">{t.tag}</span>
                <h3 className="font-display text-2xl md:text-3xl text-white leading-tight tracking-tight mb-2 md:mb-3">{t.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-lg md:text-xl text-white">{t.price}</span>
                  {t.price !== "On Call" && <span className="text-white/70 md:text-white/50 text-[0.65rem] md:text-xs">/ month</span>}
                  {t.price === "On Call" && <span className="text-white/70 md:text-white/50 text-[0.65rem] md:text-xs">call for pricing</span>}
                </div>

                {/* Arrow — slides in on hover */}
                <div className="mt-4 md:mt-5 flex items-center gap-2 text-white/0 group-hover:text-white/90 transition-all duration-400 translate-y-2 group-hover:translate-y-0">
                  <span className="eyebrow text-[0.6rem] tracking-widest">View Details</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ── Bottom note ── */}
        <p className="mt-10 text-center eyebrow text-foreground/35 text-[0.62rem] tracking-widest">
          All rooms include attached bathroom · daily housekeeping · Wi-Fi · hot water · power backup
        </p>

      </div>
    </section>
  );
};
