import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Tower locations for Aryan Heights
const towers = [
  { name: "Prestige Tower", address: "A-688(E), Indra Vihar, Kota" },
  { name: "Majestic Tower", address: "53, Rajiv Gandhi Nagar Special, Kota" },
  { name: "Imperial Tower", address: "85, Mahaveer Nagar 1st, Kota" },
  { name: "Royal Tower", address: "191, Rajiv Gandhi Nagar Special, Kota" },
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
          {/* Map iframe — plain pin at exact coordinates, no business name from Google */}
          <iframe
            title="Aryan Heights Boys Hostel location"
            src="https://maps.google.com/maps?q=25.1413612,75.8468229&t=&z=18&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />

          {/* Custom hostel name label — top-left overlay on the map */}
          <div
            style={{
              position: "absolute",
              top: "16px",
              left: "16px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "rgba(255,255,255,0.97)",
              borderRadius: "14px",
              padding: "10px 16px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
              zIndex: 10,
              maxWidth: "calc(100% - 32px)",
            }}
          >
            {/* Red map pin icon */}
            <div style={{
              width: "36px", height: "36px", borderRadius: "50%",
              background: "linear-gradient(135deg,#e53935,#b71c1c)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, boxShadow: "0 2px 8px rgba(229,57,53,0.4)",
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
              </svg>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "14px", color: "#1a1a1a", lineHeight: 1.2 }}>
                Aryan Heights Boys Hostel
              </div>
              <div style={{ fontSize: "12px", color: "#666", marginTop: "2px" }}>
                A-723(B), Indra Vihar, Talwandi, Kota
              </div>
            </div>
          </div>

          {/* Map action buttons — bottom-right */}
          <div
            style={{
              position: "absolute",
              bottom: "16px",
              right: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              zIndex: 10,
            }}
          >
            {/* Get Directions button */}
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=25.1413612,75.8468229&destination_place_id=Aryan+Heights+Boys+Hostel+Kota"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "#1a73e8",
                color: "#fff",
                fontWeight: 700,
                fontSize: "13px",
                padding: "10px 16px",
                borderRadius: "9999px",
                boxShadow: "0 2px 12px rgba(26,115,232,0.45)",
                textDecoration: "none",
                transition: "box-shadow 0.2s, background 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#1558b0"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(26,115,232,0.6)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#1a73e8"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(26,115,232,0.45)"; }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="3 11 22 2 13 21 11 13 3 11"/>
              </svg>
              Directions to Aryan Heights
            </a>
            {/* Open in Maps button */}
            <a
              href="https://maps.app.goo.gl/EPmqmY8gDatV8oqU9"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "#fff",
                color: "#1a73e8",
                fontWeight: 600,
                fontSize: "13px",
                padding: "10px 16px",
                borderRadius: "9999px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
                textDecoration: "none",
                transition: "box-shadow 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.28)")}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.18)")}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="#1a73e8" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
              </svg>
              Aryan Heights on Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
