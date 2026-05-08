import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const properties = [
  { name: "Prestige Tower", address: "G88, Indravihar" },
  { name: "Matrix Tower", address: "53, Mahaveer Nagar Special" },
  { name: "Impacta Tower", address: "85, Mahaveer Nagar" },
  { name: "Royal Tower", address: "151, Rajeev Gandhi Nagar" },
  { name: "Vinayak Tower", address: "111, Mahaveer Nagar 1st, Kota" },
];

export const Properties = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Elegant Entrance Animation
      gsap.from(".property-row", {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 85%",
        },
      });

      // Subtle parallax on the background watermark
      gsap.to(".bg-watermark", {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="properties" 
      className="w-full bg-surface relative border-t border-hairline flex flex-col pt-20 pb-20 md:pt-36 md:pb-36 overflow-hidden"
    >
      {/* Background Watermark */}
      <div className="absolute top-1/3 left-0 w-full overflow-hidden pointer-events-none flex justify-center opacity-[0.02] z-0">
         <h2 className="bg-watermark font-display text-[25vw] whitespace-nowrap tracking-tighter leading-none">
           PORTFOLIO
         </h2>
      </div>

      <div className="max-w-[1800px] w-full mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-24">
          <div>
            <div className="eyebrow text-foreground/55 mb-2 md:mb-4">(09) — OUR PORTFOLIO</div>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tighter">
              Our <span className="text-maroon italic">Properties.</span>
            </h2>
          </div>
          <div className="max-w-lg hidden md:block pb-2">
            <p className="text-foreground/60 text-lg leading-relaxed font-tight">
              Explore our extended network of premium living spaces across Kota, maintaining the same commitment to excellence and student success.
            </p>
          </div>
        </div>

        {/* Interactive List - Address Always Visible */}
        <div ref={listRef} className="flex flex-col border-b border-hairline">
          {properties.map((prop, idx) => (
            <div 
              key={idx}
              className="property-row group border-t border-hairline relative overflow-hidden transition-colors duration-500 cursor-pointer"
            >
              {/* Elegant Hover Background Fill */}
              <div className="absolute inset-0 bg-maroon translate-y-[101%] group-hover:translate-y-0 transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] z-0" />

              <div className="relative z-10 py-8 md:py-12 px-2 md:px-6 flex flex-col xl:flex-row xl:items-center justify-between gap-6 xl:gap-12">
                 
                 {/* Left: Number and Name */}
                 <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10">
                    <span className="font-mono text-foreground/30 text-xl md:text-3xl transition-colors duration-500 group-hover:text-white/60">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-display text-4xl md:text-6xl lg:text-7xl uppercase tracking-tighter transition-all duration-500 group-hover:text-white group-hover:italic md:group-hover:translate-x-4">
                      {prop.name}
                    </h3>
                 </div>
                 
                 {/* Right: Address and Animated Icon */}
                 <div className="flex flex-row items-center justify-between xl:justify-end gap-4 md:gap-12 mt-2 md:mt-0 md:pl-[5.5rem] xl:pl-0">
                    
                    {/* Always visible address */}
                    <div className="flex items-center gap-3 md:gap-4 transition-all duration-500 xl:group-hover:-translate-x-4">
                       <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-hairline bg-background flex items-center justify-center shrink-0 transition-colors duration-500 group-hover:border-transparent group-hover:bg-white/10">
                         <MapPin className="w-4 h-4 md:w-5 md:h-5 text-maroon transition-colors duration-500 group-hover:text-white" strokeWidth={1.5} />
                       </div>
                       <p className="font-tight text-sm md:text-2xl uppercase tracking-tight text-foreground/80 transition-colors duration-500 group-hover:text-white max-w-[180px] md:max-w-[350px]">
                         {prop.address}
                       </p>
                    </div>

                    {/* Animated Arrow Icon */}
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-hairline flex items-center justify-center transition-all duration-500 group-hover:border-white/30 group-hover:bg-white shrink-0 ml-auto xl:ml-0">
                      <ArrowRight className="w-5 h-5 md:w-8 md:h-8 text-foreground/40 transition-colors duration-500 group-hover:text-maroon group-hover:translate-x-1" strokeWidth={1.5} />
                    </div>

                 </div>

              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};
