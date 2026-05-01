import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Nav } from "@/components/aryan/Nav";
import { Footer } from "@/components/aryan/Footer";
import { SEO } from "@/components/aryan/SEO";

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      gsap.from(".reveal-text", {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.2,
      });

      gsap.from(".reveal-line", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.5,
        ease: "power3.inOut",
        delay: 0.5,
      });

      gsap.from(".reveal-content", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out",
        delay: 0.8,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="min-h-screen bg-bg text-foreground selection:bg-maroon selection:text-white">
      <SEO 
        title="Contact Us | Aryan Heights" 
        description="Get in touch with Aryan Heights Premium Boys Hostel in Kota. We are here to help you find your next home."
      />
      
      <Nav />

      <main className="pt-[150px] md:pt-[200px] pb-24 px-5 md:px-10 max-w-[1700px] mx-auto min-h-screen flex flex-col justify-center">
        {/* Header Section - Obsidian Assembly Style (Huge Typography) */}
        <div className="flex flex-col gap-4 mb-20 md:mb-32">
          <div className="overflow-hidden">
            <h1 className="font-display text-[15vw] md:text-[10vw] leading-[0.85] tracking-tighter reveal-text uppercase">
              LET'S
            </h1>
          </div>
          <div className="overflow-hidden flex items-center gap-6 md:gap-12">
            <h1 className="font-display text-[15vw] md:text-[10vw] leading-[0.85] tracking-tighter reveal-text uppercase italic text-maroon pr-4 md:pr-0">
              CONNECT
            </h1>
            <div className="hidden md:block h-[2px] bg-foreground/20 flex-1 reveal-line" />
          </div>
        </div>

        {/* Info Split Section */}
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 mb-20">
          <div className="flex flex-col gap-12 reveal-content">
            <div>
              <div className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-foreground/40 mb-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-maroon animate-pulse" />
                Location
              </div>
              <p className="font-display text-2xl md:text-3xl leading-snug">
                Aryan Heights Boys Hostel<br/>
                A-723(A), Indra Vihar<br/>
                Kota, Rajasthan
              </p>
            </div>
            
            <div>
              <div className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-foreground/40 mb-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-maroon animate-pulse" />
                Contact Details
              </div>
              <p className="font-display text-2xl md:text-3xl leading-snug">
                +91 94141 41723<br/>
                +91 77374 77740
              </p>
              <p className="text-sm font-medium text-foreground/50 mt-4 tracking-wide uppercase">
                Mon — Sun · 9 AM — 8 PM
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between reveal-content border-l border-foreground/10 pl-0 md:pl-12 pt-8 md:pt-0 border-t md:border-t-0">
            <p className="text-xl md:text-2xl leading-relaxed text-foreground/80 font-medium">
              We coordinate premium living spaces and student operations across Kota. Reach out to secure your next home or schedule an exclusive tour of our facilities.
            </p>
            
            <div className="mt-12 md:mt-0">
              <div className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-foreground/40 mb-4">
                Social Connect
              </div>
              <div className="flex gap-6">
                <a href="#" className="text-sm font-bold tracking-widest uppercase hover:text-maroon transition-colors">Instagram</a>
                <a href="#" className="text-sm font-bold tracking-widest uppercase hover:text-maroon transition-colors">Facebook</a>
                <a href="#" className="text-sm font-bold tracking-widest uppercase hover:text-maroon transition-colors">YouTube</a>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Button for WhatsApp */}
        <div className="w-full reveal-content mt-auto">
          <a 
            href="https://wa.me/919414141723" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative flex w-full flex-col md:flex-row items-start md:items-center justify-between overflow-hidden rounded-2xl border border-foreground/10 bg-surface/30 p-8 md:p-12 backdrop-blur-md transition-all duration-700 hover:border-maroon/50 hover:shadow-[0_0_40px_rgba(var(--maroon-rgb),0.3)] gap-6 md:gap-0"
          >
            {/* Hover Background Animation */}
            <div className="absolute inset-0 z-0 bg-maroon translate-y-[101%] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0" />
            
            <div className="relative z-10 flex flex-col gap-2">
              <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-foreground/50 group-hover:text-white/70 transition-colors duration-500">
                Direct Line
              </span>
              <h2 className="font-display text-3xl md:text-6xl tracking-tight text-foreground group-hover:text-white transition-colors duration-500">
                Chat on WhatsApp
              </h2>
            </div>
            
            <div className="relative z-10 flex h-14 w-14 md:h-24 md:w-24 items-center justify-center rounded-full border border-foreground/20 bg-background group-hover:border-white/30 group-hover:bg-white/10 transition-all duration-500">
              <svg className="h-5 w-5 md:h-10 md:w-10 text-foreground group-hover:text-white transition-all duration-500 group-hover:rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
