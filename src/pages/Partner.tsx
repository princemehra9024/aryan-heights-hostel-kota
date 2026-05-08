import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SEO } from "@/components/aryan/SEO";
import { Nav } from "@/components/aryan/Nav";
import { Cursor } from "@/components/aryan/Cursor";
import { SmoothScroll } from "@/components/aryan/SmoothScroll";
import { Footer } from "@/components/aryan/Footer";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export const Partner = () => {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Basic GSAP entrance animations
    const ctx = gsap.context(() => {
      gsap.from("[data-hero-text]", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: "expo.out",
        delay: 0.2
      });

      gsap.from(".trust-card", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".trust-grid", start: "top 80%" }
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      title: "Guaranteed Rent",
      desc: "Receive timely payments without the hassle of chasing tenants. We ensure consistent income flow for your asset.",
      num: "01"
    },
    {
      title: "Flawless Maintenance",
      desc: "Our dedicated in-house team maintains your property like our own, ensuring zero damage and premium upkeep year-round.",
      num: "02"
    },
    {
      title: "Disciplined Tenants",
      desc: "We rigorously screen our students. Only serious, discipline-focused aspirants reside in our managed properties.",
      num: "03"
    },
    {
      title: "Long-Term Security",
      desc: "Partner with a reputed, trusted brand in Kota. We seek long-term leases, giving you complete peace of mind.",
      num: "04"
    }
  ];

  return (
    <main ref={root} className="bg-background text-foreground grain relative overflow-x-clip w-full min-h-screen flex flex-col">
      <SEO 
        title="Partner With Us | Aryan Heights" 
        description="Lease your property to Aryan Heights. We offer guaranteed rent, flawless maintenance, and complete peace of mind for property owners in Kota."
      />
      <SmoothScroll />
      <Cursor />
      <Nav />

      {/* Hero Section */}
      <section className="pt-40 md:pt-56 pb-20 md:pb-32 px-5 md:px-8 max-w-[1700px] mx-auto w-full">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-8">
            <div data-hero-text className="eyebrow text-maroon mb-6 md:mb-8">
              Exclusive Partnership
            </div>
            <h1 data-hero-text className="font-display text-5xl md:text-8xl leading-[0.9] tracking-tighter mb-8">
              Your Asset. <br/>
              <span className="text-foreground/40 italic">Our Responsibility.</span>
            </h1>
            <p data-hero-text className="text-foreground/70 text-lg md:text-xl max-w-2xl leading-relaxed mb-12">
              We are expanding our premium hostel network across Kota. If you own a high-quality property and want zero operational headaches, guaranteed returns, and absolute asset protection, let's talk.
            </p>
            <div data-hero-text>
              <a href="tel:+917737477740" className="btn-arrow inline-flex group">
                Discuss a Lease
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Lease To Us */}
      <section className="py-24 md:py-40 bg-surface border-y border-hairline relative">
        <div className="max-w-[1700px] mx-auto px-5 md:px-8">
          <div className="mb-16 md:mb-24">
            <h2 className="font-display text-4xl md:text-6xl tracking-tighter mb-6">
              Why landlords trust <span className="text-maroon italic">Aryan Heights.</span>
            </h2>
          </div>

          <div className="trust-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="trust-card p-8 md:p-10 border border-hairline bg-background rounded-2xl hover:border-maroon/30 transition-colors">
                <div className="font-display text-maroon text-2xl mb-6">{f.num}</div>
                <h3 className="font-display text-xl md:text-2xl tracking-tight mb-4">{f.title}</h3>
                <p className="text-foreground/60 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="py-24 md:py-32 flex-1 flex flex-col justify-center items-center text-center px-5 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-maroon/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl">
          <h2 className="font-display text-4xl md:text-6xl tracking-tighter mb-8">
            Ready to secure your property's future?
          </h2>
          <p className="text-foreground/60 mb-10">
            Reach out to our management team directly for a confidential discussion regarding your property.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="tel:+917737477740" className="btn-arrow w-full sm:w-auto justify-center">
              Call +91 77374 77740
            </a>
            <Link to="/contact" className="btn-ghost w-full sm:w-auto justify-center">
              Visit Office
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Partner;
