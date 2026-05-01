import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logo from "@/assets/logo.png";

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
    <section ref={root} id="contact" className="pt-28 md:pt-40 border-t border-hairline">
      <div className="max-w-[1700px] mx-auto px-5 md:px-8">
        <div className="eyebrow text-foreground/55 mb-10">(10) — Visit Us</div>
        <h2 className="font-display text-[14vw] md:text-[9vw] leading-[0.95] tracking-tighter">
          <span className="block overflow-hidden"><span data-cta-line className="block">Ready to find</span></span>
          <span className="block overflow-hidden"><span data-cta-line className="block text-foreground/55">his next home?</span></span>
          <span className="block overflow-hidden"><span data-cta-line className="block">Book a visit.</span></span>
        </h2>

        <div className="hairline mt-16 mb-12" />

        <div className="grid md:grid-cols-12 gap-10 pb-16">
          <div className="md:col-span-3">
            <div className="eyebrow text-foreground/55 mb-3">Hostel</div>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li><a href="#about" className="hover:text-foreground">About</a></li>
              <li><a href="#rooms" className="hover:text-foreground">Rooms & Pricing</a></li>
              <li><a href="#facilities" className="hover:text-foreground">Facilities</a></li>
              <li><a href="#mess" className="hover:text-foreground">Mess</a></li>
              <li><a href="#gallery" className="hover:text-foreground">Gallery</a></li>
            </ul>
          </div>
          <div className="md:col-span-3">
            <div className="eyebrow text-foreground/55 mb-3">Address</div>
            <p className="font-display text-xl leading-snug">Aryan Heights Boys Hostel<br/>A-723(A), Indra Vihar<br/>Kota, Rajasthan</p>
          </div>
          <div className="md:col-span-3">
            <div className="eyebrow text-foreground/55 mb-3">Reach Out</div>
            <p className="font-display text-xl">+91 94141 41723<br/>+91 77374 77740</p>
            <p className="eyebrow text-foreground/55 mt-4">Mon — Sun · 9 AM — 8 PM</p>
          </div>
          <div className="md:col-span-3 flex md:justify-end items-end">
            <a href="https://wa.me/919414141723" className="btn-arrow">WhatsApp Us <span>→</span></a>
          </div>
        </div>

        <div className="border-t border-hairline py-12 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-6">
            <img src={logo} alt="" className="w-20 h-20 object-contain opacity-85" />
            <div className="flex flex-col">
              <span className="font-display text-4xl tracking-tighter opacity-80">Aryan Heights</span>
              <span className="eyebrow text-foreground/45 mt-1">Premium Boys Hostel · Kota · Since 2010</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 eyebrow text-foreground/40 text-right">
            <span>© 2026 Aryan Heights</span>
            <span>Designed with care · Rajasthan</span>
          </div>
        </div>
      </div>
    </section>
  );
};
