import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Contact = () => {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-cta-line]", {
        yPercent: 110, stagger: 0.08, duration: 1.1, ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={root} id="contact" className="pt-16 md:pt-24 pb-16 md:pb-24 border-t border-hairline">
      <div className="max-w-[1700px] mx-auto px-5 md:px-8">
        <div className="eyebrow text-foreground/55 mb-10">(11) — Visit Us</div>
        <h2 className="font-display text-[10vw] md:text-[7vw] leading-[0.95] tracking-tighter mb-8">
          <span className="block overflow-hidden"><span data-cta-line className="block">A Safe, Disciplined &</span></span>
          <span className="block overflow-hidden"><span data-cta-line className="block text-foreground/55">Study-Focused</span></span>
          <span className="block overflow-hidden"><span data-cta-line className="block">Environment.</span></span>
        </h2>
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 mt-12 overflow-hidden">
          <div data-cta-line>
            <div className="eyebrow text-foreground/55 mb-2">Call Us</div>
            <a href="tel:+917737477740" className="font-display text-4xl md:text-5xl hover:text-maroon transition-colors">
              +91 77374 77740
            </a>
          </div>
          <div data-cta-line>
            <div className="eyebrow text-foreground/55 mb-2">Visit Us</div>
            <p className="font-display text-2xl md:text-3xl text-foreground/80">
              Aryan Heights Hostel
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
