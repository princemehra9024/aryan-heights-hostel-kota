import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Tower locations for Aryan Heights
const towers = [
  { name: "Prestige Tower", address: "A-688(E), Indra Vihar, Kota" },
  { name: "Majestic Tower", address: "53, Rajeev Gandhi Nagar Special, Kota" },
  { name: "Imperial Tower", address: "85, Mahaveer Nagar 1st, Kota" },
  { name: "Royal Tower", address: "191, Rajeev Gandhi Nagar Special, Kota" },
  { name: "Vintage Tower", address: "111, Mahaveer Nagar 1st, Kota" },
];

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
          <h2 data-loc className="font-display text-5xl md:text-6xl leading-[0.95] tracking-tighter">Prime location in<br/>Landmark City.</h2>
          <p data-loc className="text-foreground/70 mt-6 max-w-md">Strategically situated in Landmark City, Kota — major coaching institutes are just a walk away, with markets, hospitals and bus connectivity all nearby.</p>
          <ul data-loc className="mt-8 space-y-3 text-sm">
            {[["Major Coaching Institutes","Walking Distance"],["Market & Daily Needs","Walking Distance"],["Bus Stand","Nearby"],["Hospitals & Medical Stores","Nearby"]].map(([n,t]) => (
              <li key={n} className="flex justify-between border-b border-hairline pb-3"><span>{n}</span><span className="text-foreground/55">{t}</span></li>
            ))}
            {/* Tower Locations */}
            <div className="mt-6">
              <h3 className="font-display text-xl mb-3">Our Towers</h3>
              <ul className="space-y-2 text-sm">
                {towers.map((tower) => (
                  <li key={tower.name} className="border-b border-hairline pb-2">
                    <span className="font-medium">{tower.name}:</span> <span className="text-foreground/70">{tower.address}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ul>
        </div>
        <div data-loc className="md:col-span-8 aspect-[16/10] overflow-hidden surface relative">
          <iframe
            title="Aryan Heights location"
            src="https://maps.google.com/maps?q=Shree%20Shyama%20Kunj%20Hostel%20Kota&t=&z=18&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
};
