import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ownerImg from "@/assets/owner.jpg";
import founderImg from "@/assets/founder.jpg";

gsap.registerPlugin(ScrollTrigger);

export const Wardens = () => {
  const root = useRef<HTMLElement>(null);
  const [activeImg, setActiveImg] = useState(0);
  const images = [founderImg, ownerImg];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImg((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-w-line]", {
        yPercent: 110, stagger: 0.08, duration: 1.1, ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
      
      gsap.from(".fade-up", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.15,
        delay: 0.2,
        scrollTrigger: {
          trigger: root.current,
          start: "top 60%",
        }
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="wardens" className="relative min-h-[85dvh] w-full flex items-center justify-center border-t border-hairline py-16 md:py-0 bg-background overflow-hidden">
      
      {/* Background Watermark */}
      <div className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.02] flex items-center justify-center overflow-hidden z-0">
        <h2 className="font-display text-[25vw] whitespace-nowrap">LEADERSHIP</h2>
      </div>

      <div className="max-w-[1700px] w-full mx-auto px-5 md:px-8 grid md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 relative z-10">
        
        {/* Left: Image (Stretched to cover space) */}
        <div className="md:col-span-5 lg:col-span-4 fade-up">
          <div className="relative h-full min-h-[400px] md:min-h-[500px] lg:min-h-[550px] w-full overflow-hidden rounded-sm group shadow-2xl bg-surface">
            <div className="absolute inset-0 bg-maroon/20 z-10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            {images.map((src, i) => (
              <img 
                key={i}
                src={src} 
                alt="Leadership" 
                loading="lazy"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${i === activeImg ? 'opacity-100 z-10' : 'opacity-0 z-0'}`} 
              />
            ))}
            
            {/* Spinning Badge Overlay */}
            <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 z-20 w-24 h-24 md:w-28 md:h-28 rounded-full border border-white/20 backdrop-blur-md bg-black/30 flex items-center justify-center animate-[spin_15s_linear_infinite]">
               <svg viewBox="0 0 100 100" className="w-full h-full p-2">
                 <path id="curve" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                 <text className="text-[10.5px] uppercase tracking-[0.16em] font-bold" style={{ fill: 'rgba(255,255,255,0.9)' }}>
                   <textPath href="#curve">
                     • Trusted Leadership • Absolute Security 
                   </textPath>
                 </text>
               </svg>
            </div>
          </div>
        </div>

        {/* Right: Content */}
        <div className="md:col-span-7 lg:col-span-8 flex flex-col justify-center">
          <div className="flex flex-col gap-6 mb-6">
            <div>
              <div className="fade-up eyebrow text-maroon mb-4">(06) — Personal Care</div>
              <h2 className="font-display text-5xl md:text-6xl lg:text-[5.5rem] leading-[0.9] tracking-tighter">
                <span className="block overflow-hidden pb-2"><span data-w-line className="block">People who'll know</span></span>
                <span className="block overflow-hidden pb-2"><span data-w-line className="block text-foreground/55 italic">your son by name.</span></span>
              </h2>
            </div>
            
            <div className="fade-up flex flex-col gap-3 opacity-30 mt-2">
              <div className="hairline w-full" />
              <div className="hairline w-3/4" />
              <div className="hairline w-1/2" />
            </div>
          </div>

          <div className="fade-up group py-5 flex flex-col sm:flex-row sm:items-center justify-between border-t border-hairline relative transition-colors hover:bg-surface/30 px-4 -mx-4 rounded-lg cursor-default">
            <div className="flex items-center gap-6 mb-4 sm:mb-0">
              <span className="eyebrow text-[0.6rem] opacity-40">01</span>
              <span className="font-display text-3xl md:text-5xl tracking-tighter transition-transform duration-500 group-hover:translate-x-2">Mr. Rajendra Sharma</span>
            </div>
            <div className="flex flex-col items-start sm:items-end gap-1">
              <span className="eyebrow text-maroon">Founder</span>
              <div className="h-px bg-maroon w-0 group-hover:w-16 transition-all duration-500 mt-1" />
            </div>
          </div>

          <div className="fade-up group py-5 flex flex-col sm:flex-row sm:items-center justify-between border-b border-hairline relative transition-colors hover:bg-surface/30 px-4 -mx-4 rounded-lg cursor-default">
            <div className="flex items-center gap-6 mb-4 sm:mb-0">
              <span className="eyebrow text-[0.6rem] opacity-40">02</span>
              <span className="font-display text-3xl md:text-5xl tracking-tighter transition-transform duration-500 group-hover:translate-x-2">Owner</span>
            </div>
            <div className="flex flex-col items-start sm:items-end gap-1">
              <span className="eyebrow text-maroon">Management</span>
              <div className="h-px bg-maroon w-0 group-hover:w-16 transition-all duration-500 mt-1" />
            </div>
          </div>

          <p className="fade-up text-foreground/60 leading-relaxed text-base md:text-lg max-w-xl mt-6 font-tight">
            We don't believe in absentee management. Our founder is personally involved in the daily operations, ensuring a secure, disciplined, and nurturing environment for every student.
          </p>
        </div>

      </div>
    </section>
  );
};
