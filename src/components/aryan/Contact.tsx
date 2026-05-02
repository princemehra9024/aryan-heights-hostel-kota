import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    <section ref={root} id="contact" className="pt-28 md:pt-40 pb-20 md:pb-32 border-t border-hairline">
      <div className="max-w-[1700px] mx-auto px-5 md:px-8">
        <div className="eyebrow text-foreground/55 mb-10">(10) — Visit Us</div>
        <h2 className="font-display text-[14vw] md:text-[9vw] leading-[0.95] tracking-tighter">
          <span className="block overflow-hidden"><span data-cta-line className="block">Ready to find</span></span>
          <span className="block overflow-hidden"><span data-cta-line className="block text-foreground/55">his next home?</span></span>
          <span className="block overflow-hidden"><span data-cta-line className="block">Book a visit.</span></span>
        </h2>
      </div>
    </section>
  );
};
