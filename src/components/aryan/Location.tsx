import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Location = () => {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-loc]", {
        y: 60, opacity: 0, stagger: 0.1, duration: 1, ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={root} className="py-16 md:py-24 border-t border-hairline">
      <div className="max-w-[1700px] mx-auto px-5 md:px-8 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <div className="eyebrow text-foreground/55 mb-4">(10) — Location</div>
          <h2 data-loc className="font-display text-5xl md:text-6xl leading-[0.95] tracking-tighter">Prime location in<br/>Indra Vihar.</h2>
          <p data-loc className="text-foreground/70 mt-6 max-w-md">Strategically situated in Indra Vihar, Kota — major coaching institutes are just a walk away, with markets, hospitals and bus connectivity all nearby.</p>
          <ul data-loc className="mt-8 space-y-3 text-sm">
            {[["Major Coaching Institutes","Walking Distance"],["Market & Daily Needs","Walking Distance"],["Bus Stand","Nearby"],["Hospitals & Medical Stores","Nearby"]].map(([n,t]) => (
              <li key={n} className="flex justify-between border-b border-hairline pb-3"><span>{n}</span><span className="text-foreground/55">{t}</span></li>
            ))}
          </ul>
        </div>
        <div data-loc className="md:col-span-8 aspect-[16/10] overflow-hidden surface relative">
          <iframe
            title="Aryan Heights location"
            src="https://maps.google.com/maps?q=Aryan%20Heights%20Hostel%20Indra%20Vihar%20Kota&t=&z=16&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
};
