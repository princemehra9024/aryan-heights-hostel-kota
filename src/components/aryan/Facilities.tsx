import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import logo from "@/assets/logo.png";
import { 
  UtensilsCrossed, 
  Shirt, 
  Sparkles, 
  Wifi, 
  Bus, 
  HeartPulse, 
  Fingerprint, 
  Dumbbell, 
  BookOpen, 
  ShieldCheck, 
  Droplets, 
  Zap, 
  Wrench, 
  Users 
} from "lucide-react";

const facilities = [
  { 
    icon: <UtensilsCrossed strokeWidth={1} className="w-12 h-12 md:w-20 md:h-20" />, 
    title: "Healthy Meals", desc: "Breakfast, Lunch, Snacks & Dinner.", 
    className: "col-span-2 md:col-span-2 row-span-1 md:row-span-2 bg-gradient-to-br from-surface to-surface/40", 
    layout: "col",
    titleClass: "text-2xl md:text-3xl lg:text-4xl",
    iconClass: "mb-auto text-maroon group-hover:text-white"
  },
  { 
    icon: <Shirt strokeWidth={1.5} className="w-8 h-8 md:w-10 md:h-10" />, 
    title: "Laundry", desc: "Clean & fresh clothes.", 
    className: "col-span-1 md:col-span-1 row-span-1 md:row-span-2 bg-surface",
    layout: "col",
    titleClass: "text-lg md:text-xl",
    iconClass: "mb-auto text-foreground/80 group-hover:text-white" 
  },
  { 
    icon: <Sparkles strokeWidth={1.5} className="w-8 h-8 md:w-10 md:h-10" />, 
    title: "Cleaning", desc: "Daily room cleaning.", 
    className: "col-span-1 md:col-span-1 row-span-1 md:row-span-2 bg-surface",
    layout: "col",
    titleClass: "text-lg md:text-xl",
    iconClass: "mb-auto text-foreground/80 group-hover:text-white" 
  },
  { 
    icon: <Wifi strokeWidth={1.5} className="w-8 h-8 md:w-10 md:h-10" />, 
    title: "Fast Wi-Fi", desc: "Reliable high-speed internet.", 
    className: "col-span-2 md:col-span-2 row-span-1 md:row-span-1 bg-surface",
    layout: "row",
    titleClass: "text-xl",
    iconClass: "text-foreground/80 group-hover:text-white" 
  },
  { 
    icon: <Bus strokeWidth={1.5} className="w-8 h-8 md:w-10 md:h-10" />, 
    title: "Transport", desc: "Safe coaching transport.", 
    className: "col-span-2 md:col-span-2 row-span-1 md:row-span-1 bg-surface",
    layout: "row",
    titleClass: "text-xl",
    iconClass: "text-foreground/80 group-hover:text-white" 
  },
  { 
    icon: <HeartPulse strokeWidth={1.5} className="w-6 h-6 md:w-8 md:h-8" />, 
    title: "Medical", desc: "Immediate help.", 
    className: "col-span-1 md:col-span-1 row-span-1 md:row-span-1 bg-surface",
    layout: "col",
    titleClass: "text-base md:text-lg",
    iconClass: "mb-auto text-maroon group-hover:text-white" 
  },
  { 
    icon: <Fingerprint strokeWidth={1.5} className="w-6 h-6 md:w-8 md:h-8" />, 
    title: "Biometric", desc: "Strict monitoring.", 
    className: "col-span-1 md:col-span-1 row-span-1 md:row-span-1 bg-surface",
    layout: "col",
    titleClass: "text-base md:text-lg",
    iconClass: "mb-auto text-foreground/80 group-hover:text-white" 
  },
  { 
    icon: <Dumbbell strokeWidth={1} className="w-12 h-12 md:w-20 md:h-20" />, 
    title: "Gym Facility", desc: "Well-equipped fitness center.", 
    className: "col-span-2 md:col-span-2 row-span-1 md:row-span-2 bg-gradient-to-tr from-surface to-surface/40",
    layout: "col",
    titleClass: "text-2xl md:text-3xl lg:text-4xl",
    iconClass: "mb-auto text-maroon group-hover:text-white" 
  },
  { 
    icon: <BookOpen strokeWidth={1.5} className="w-8 h-8 md:w-10 md:h-10" />, 
    title: "Study Area", desc: "Quiet environments.", 
    className: "col-span-2 md:col-span-2 row-span-1 md:row-span-1 bg-surface",
    layout: "row",
    titleClass: "text-xl",
    iconClass: "text-foreground/80 group-hover:text-white" 
  },
  { 
    icon: <ShieldCheck strokeWidth={1.5} className="w-8 h-8 md:w-10 md:h-10" />, 
    title: "Security", desc: "CCTV secure premises.", 
    className: "col-span-1 md:col-span-1 row-span-1 md:row-span-2 bg-surface",
    layout: "col",
    titleClass: "text-lg md:text-xl",
    iconClass: "mb-auto text-foreground/80 group-hover:text-white" 
  },
  { 
    icon: <Droplets strokeWidth={1.5} className="w-6 h-6 md:w-8 md:h-8" />, 
    title: "Water", desc: "24/7 supply.", 
    className: "col-span-1 md:col-span-1 row-span-1 md:row-span-1 bg-surface",
    layout: "col",
    titleClass: "text-base md:text-lg",
    iconClass: "mb-auto text-foreground/80 group-hover:text-white" 
  },
  { 
    icon: <Zap strokeWidth={1.5} className="w-6 h-6 md:w-8 md:h-8" />, 
    title: "Power", desc: "Uninterrupted.", 
    className: "col-span-1 md:col-span-1 row-span-1 md:row-span-1 bg-surface",
    layout: "col",
    titleClass: "text-base md:text-lg",
    iconClass: "mb-auto text-maroon group-hover:text-white" 
  },
  { 
    icon: <img src={logo} alt="Aryan Heights Logo" className="w-8 h-8 opacity-60 filter dark:invert dark:brightness-0 transition-opacity group-hover:opacity-100" />, 
    title: "Aryan Heights", desc: "Premium Living.", 
    className: "col-span-1 md:col-span-1 bg-surface", 
    layout: "col",
    titleClass: "text-base text-maroon italic",
    iconClass: "mb-auto" 
  },
  { 
    icon: <Wrench strokeWidth={1.5} className="w-8 h-8 md:w-10 md:h-10" />, 
    title: "Maintenance", desc: "Quick support.", 
    className: "col-span-2 md:col-span-1 row-span-1 md:row-span-1 bg-surface",
    layout: "col",
    titleClass: "text-lg md:text-xl",
    iconClass: "mb-auto text-foreground/80 group-hover:text-white" 
  },
  { 
    icon: <Users strokeWidth={1.5} className="w-8 h-8 md:w-10 md:h-10" />, 
    title: "Management", desc: "Supportive staff.", 
    className: "col-span-2 md:col-span-2 row-span-1 md:row-span-1 bg-surface",
    layout: "row",
    titleClass: "text-xl",
    iconClass: "text-foreground/80 group-hover:text-white" 
  },
];

export const Facilities = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. High-end 3D Assembly Animation
      gsap.from(".bento-card", {
        y: 80,
        opacity: 0,
        scale: 0.85,
        rotateX: -15,
        stagger: {
          amount: 0.8,
          from: "random", // Gives a beautiful puzzle-assembly feel
        },
        duration: 1.2,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // 2. Continuous Floating Animation for Icons
      gsap.to(".icon-float", {
        y: "-=6",
        rotation: 2,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 3. Premium Interactive Spotlight Logic
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardsContainerRef.current) return;
    const cards = cardsContainerRef.current.getElementsByClassName("bento-card");
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i] as HTMLElement;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    }
  };

  return (
    <section 
      ref={sectionRef} 
      id="facilities" 
      // Ensure the section fits into a single viewport on desktop
      className="h-auto md:h-screen w-full bg-background relative border-t border-hairline flex flex-col pt-16 pb-8 md:pt-20 md:pb-12 overflow-hidden"
    >
      <div className="max-w-[1800px] w-full mx-auto px-4 md:px-8 h-full flex flex-col">
        
        {/* Header - Compact height */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 md:mb-8 shrink-0">
          <div>
            <div className="eyebrow text-foreground/55 mb-2 md:mb-3">(04) — FACILITIES</div>
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tighter">
              Unmatched <span className="text-maroon italic">Ecosystem.</span>
            </h2>
          </div>
          <div className="max-w-sm hidden md:block pb-1">
            <p className="text-foreground/60 text-sm leading-relaxed font-tight">
              A comprehensive suite of premium services designed to remove daily friction so you can focus completely on your goals.
            </p>
          </div>
        </div>

        {/* Bento Grid - Exact 7x4 dense grid that flexibly fills remaining height */}
        <div 
          ref={cardsContainerRef}
          onMouseMove={handleMouseMove}
          className="flex-1 grid grid-cols-2 md:grid-cols-7 auto-rows-[minmax(100px,auto)] md:auto-rows-auto md:grid-rows-4 gap-2.5 md:gap-4 grid-flow-dense min-h-0"
        >
          {facilities.map((f, i) => {
            const isRowLayout = f.layout === "row";
            
            return (
              <div 
                key={i} 
                className={`bento-card group relative rounded-[1.5rem] md:rounded-[2rem] border border-hairline p-4 md:p-6 hover:border-maroon/50 transition-colors duration-500 overflow-hidden ${f.className} ${isRowLayout ? 'flex flex-row items-center gap-4' : 'flex flex-col'}`}
              >
                {/* Premium Interactive Spotlight Glow */}
                <div 
                  className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                  style={{
                    background: "radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.08), transparent 40%)"
                  }}
                />

                {/* Icon */}
                <div className={`relative z-10 ${f.iconClass} transition-all duration-500 group-hover:scale-110 origin-bottom-left shrink-0 ${f.layout === 'col' ? 'icon-float' : ''}`}>
                  {f.icon}
                </div>

                {/* Content */}
                <div className={`relative z-10 ${isRowLayout ? 'flex-1' : 'mt-auto'}`}>
                  <h3 className={`font-display leading-tight mb-1 ${f.titleClass}`}>
                    {f.title}
                  </h3>
                  <p className="text-foreground/60 leading-tight font-tight text-xs md:text-sm line-clamp-2 md:line-clamp-none">
                    {f.desc}
                  </p>
                </div>

                {/* Hover Overlay Glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-maroon/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
};
