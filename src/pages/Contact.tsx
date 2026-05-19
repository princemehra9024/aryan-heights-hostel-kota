import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Nav } from "@/components/aryan/Nav";
import { Footer } from "@/components/aryan/Footer";
import { SEO } from "@/components/aryan/SEO";
import { Cursor } from "@/components/aryan/Cursor";
import { SmoothScroll } from "@/components/aryan/SmoothScroll";
import heroImg from "@/assets/hero-building.png";

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ─────────────────────────────────────────────────── */
const HERO_STATS = [
  { final: "500+", label: "Students Housed" },
  { final: "10+",  label: "Years Experience" },
  { final: "24/7", label: "Warden Support"   },
  { final: "100%", label: "Security"         },
];

const INFO_GRID = [
  { h: "Location", v: "A-723(A), Indra Vihar\nKota, Rajasthan" },
  { h: "Hours",    v: "Mon — Sun\n09:00 — 20:00"               },
  { h: "Phone",    v: "+91 94141 41723"                         },
  { h: "Email",    v: "info@aryanheights.in"                    },
];

/* ─── Main Component ────────────────────────────────────────── */
export default function ContactPage() {
  const root   = useRef<HTMLDivElement>(null);
  const bgRef  = useRef<HTMLImageElement>(null);

  /* Separate hero stat refs from strip stat refs */
  const heroStatRefs  = useRef<(HTMLSpanElement | null)[]>([]);
  const stripStatRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    const t = `*New Inquiry (Aryan Heights)*%0A%0A*Name:* ${form.name}%0A*Email:* ${form.email || "N/A"}%0A*Phone:* ${form.phone}%0A*Message:* ${form.message || "None"}`;
    window.open(`https://wa.me/919414141723?text=${t}`, "_blank");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    /* Set hero stats to final values immediately (no animation delay) */
    heroStatRefs.current.forEach((el, i) => {
      if (el) el.textContent = HERO_STATS[i].final;
    });

    const ctx = gsap.context(() => {

      /* ── Parallax bg ─────────────────────────────────────── */
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 18, ease: "none",
          scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: true },
        });
      }

      /* ── Hero entrance timeline ──────────────────────────── */
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(".h-overlay",    { opacity: 0, duration: 1.4 }, 0)
        .from(".h-eyebrow",    { opacity: 0, y: 20, duration: 1 }, 0.25)
        .from(".h-trust-hd",   { opacity: 0, x: 24, duration: 0.9 }, 0.3)
        .from(".h-trust-item", { opacity: 0, x: 24, duration: 0.8, stagger: 0.08 }, 0.4)
        .fromTo(".h-block",
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", duration: 1.3, stagger: 0.14 }, 0.4)
        .from(".h-divider",    { scaleX: 0, transformOrigin: "left", duration: 1.4 }, 0.4)
        .from(".h-sub",        { opacity: 0, y: 28, duration: 1.1 }, 0.85)
        .from(".h-cta",        { opacity: 0, y: 20, duration: 1, stagger: 0.1 }, 0.95)
        .from(".h-scroll",     { opacity: 0, y: 14, duration: 0.9 }, 1.3);

      /* ── Strip stat counters (on scroll) ─────────────────── */
      stripStatRefs.current.forEach((el, i) => {
        if (!el) return;
        const raw = HERO_STATS[i].final;
        // For values like "24/7" or "100%" that can't be counted, just reveal them
        const numMatch = raw.match(/^(\d+)/);
        if (!numMatch) { 
          gsap.fromTo(el, { opacity: 0, y: 10 }, {
            opacity: 1, y: 0, duration: 0.6, ease: "expo.out",
            scrollTrigger: { trigger: ".strip-section", start: "top 85%", once: true },
            onStart: () => { if (el) el.textContent = raw; }
          });
          return;
        }
        const num = parseInt(numMatch[1], 10);
        const suf = raw.slice(numMatch[1].length);
        gsap.fromTo({ v: 0 }, { v: num }, {
          duration: 2, ease: "power2.out",
          scrollTrigger: { trigger: ".strip-section", start: "top 85%", once: true },
          onUpdate: function () {
            if (el) el.textContent = Math.round((this.targets()[0] as { v: number }).v) + suf;
          },
          onComplete: () => { if (el) el.textContent = raw; },
        });
      });

      /* ── Form section ─────────────────────────────────────── */
      gsap.from(".f-reveal", {
        opacity: 0, y: 40, duration: 1.2, ease: "expo.out", stagger: 0.07,
        scrollTrigger: { trigger: ".form-section", start: "top 80%", once: true },
      });

      /* ── WhatsApp bar ─────────────────────────────────────── */
      gsap.from(".wa-reveal", {
        opacity: 0, y: 30, duration: 1, ease: "expo.out", stagger: 0.1,
        scrollTrigger: { trigger: ".wa-section", start: "top 85%", once: true },
      });

    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="min-h-screen bg-bg text-foreground selection:bg-maroon selection:text-white flex flex-col overflow-x-hidden">
      <SmoothScroll />
      <Cursor />
      <SEO title="Contact Us | Aryan Heights" description="Get in touch with Aryan Heights Premium Boys Hostel in Kota." />
      <Nav />

      <main className="flex-1 flex flex-col">

        {/* ═══ HERO ════════════════════════════════════════════ */}
        <section className="hero-section relative w-full min-h-screen flex flex-col overflow-hidden">

          {/* Background — parallax wrapper */}
          <div className="absolute inset-0 overflow-hidden scale-110 origin-center">
            <img
              ref={bgRef}
              src={heroImg}
              alt=""
              className="w-full h-full object-cover object-center will-change-transform"
            />
          </div>

          {/* Multi-layer overlays */}
          <div className="h-overlay absolute inset-0 bg-[#0b0c10]/70" />
          <div className="h-overlay absolute inset-0 bg-gradient-to-b from-[#0b0c10]/20 via-transparent to-[#0b0c10]/95" />
          <div className="h-overlay absolute inset-0 bg-gradient-to-r from-[#0b0c10]/60 via-transparent to-transparent" />

          {/* Content */}
          <div className="relative z-10 flex flex-col flex-1 px-5 md:px-12 xl:px-20 pt-[110px] md:pt-[130px] pb-10 md:pb-14">

            {/* Row 1: eyebrow + trust stats */}
            <div className="flex items-start justify-between gap-4 mb-10 md:mb-14">
              <div className="h-eyebrow flex items-center gap-3">
                <span className="block h-px w-8" style={{ background: "hsl(var(--maroon))" }} />
                <span className="eyebrow tracking-[0.22em]" style={{ color: "hsl(var(--maroon))" }}>
                  Aryan Heights &nbsp;·&nbsp; Contact
                </span>
              </div>

              {/* Trust stats — fixed refs, set immediately */}
              <div className="hidden md:flex flex-col items-end gap-4">
                <span className="h-trust-hd eyebrow text-white/40 tracking-[0.2em]">Trusted by students</span>
                <div className="grid grid-cols-2 gap-x-10 gap-y-4">
                  {HERO_STATS.map((s, i) => (
                    <div key={s.label} className="h-trust-item flex flex-col items-end">
                      <span className="font-display text-2xl xl:text-3xl leading-none text-white">
                        <span ref={el => heroStatRefs.current[i] = el}>{s.final}</span>
                      </span>
                      <span className="eyebrow text-white/40 mt-1">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Row 2: Stencil headline blocks */}
            <div className="flex flex-col gap-2 md:gap-3 mb-8 md:mb-10">
              <div className="h-block" style={{ display: "block" }}>
                <span className="font-display uppercase leading-none tracking-tighter inline-block px-4 md:px-6 py-1.5 text-[12vw] sm:text-[10vw] md:text-[8.5vw] xl:text-[7.5vw]"
                  style={{ background: "hsl(var(--ivory))", color: "hsl(var(--bg))" }}>
                  Get In
                </span>
              </div>
              <div className="h-block pl-4 md:pl-10" style={{ display: "block" }}>
                <span className="font-display uppercase leading-none tracking-tighter inline-block px-4 md:px-6 py-1.5 text-[12vw] sm:text-[10vw] md:text-[8.5vw] xl:text-[7.5vw]"
                  style={{ background: "hsl(var(--maroon))", color: "hsl(var(--ivory))" }}>
                  Touch
                </span>
              </div>
              <div className="h-block" style={{ display: "block" }}>
                <span className="font-display uppercase leading-none tracking-tighter italic inline-block px-4 md:px-6 py-1.5 text-[12vw] sm:text-[10vw] md:text-[8.5vw] xl:text-[7.5vw]"
                  style={{ border: "1.5px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.12)" }}>
                  With Us
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="h-divider h-px mb-8 md:mb-10" style={{ background: "rgba(255,255,255,0.12)" }} />

            {/* Row 3: Subtitle + CTAs */}
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 md:gap-10">
              <p className="h-sub max-w-md text-white/50 text-base md:text-lg leading-relaxed">
                Premium student accommodations in Kota — where ambitious
                individuals thrive in a focused, safe, and inspiring community.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#contact-form"
                  className="h-cta group flex items-center gap-3 px-7 py-3.5 rounded-full border border-white/15 bg-white/5 hover:bg-white hover:border-white transition-all duration-500">
                  <span className="eyebrow text-white/75 group-hover:text-bg tracking-[0.2em] transition-colors duration-400">
                    Send Inquiry
                  </span>
                  <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-400 group-hover:bg-bg"
                    style={{ background: "hsl(var(--maroon))" }}>
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </a>
                <a href="https://wa.me/919414141723" target="_blank" rel="noopener noreferrer"
                  className="h-cta group flex items-center gap-3 px-7 py-3.5 rounded-full border border-[#25D366]/30 bg-[#25D366]/10 hover:bg-[#25D366] hover:border-[#25D366] transition-all duration-500">
                  <svg className="w-4 h-4 text-[#25D366] group-hover:text-white transition-colors duration-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span className="eyebrow text-[#25D366] group-hover:text-white tracking-[0.2em] transition-colors duration-400">
                    WhatsApp
                  </span>
                </a>
              </div>
            </div>

            {/* Scroll cue */}
            <div className="h-scroll flex items-center gap-3 mt-auto pt-8 md:pt-12">
              <div className="flex items-center justify-center w-9 h-9 rounded-full border border-white/15">
                <svg className="w-3.5 h-3.5 text-white/40 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <span className="eyebrow text-white/30 tracking-[0.22em]">Scroll to inquire</span>
            </div>
          </div>
        </section>

        {/* ═══ STATS STRIP ══════════════════════════════════════ */}
        <div className="strip-section border-y border-hairline grid grid-cols-2 md:grid-cols-4 divide-x divide-hairline">
          {HERO_STATS.map((s, i) => (
            <div key={s.label} className="flex flex-col items-center justify-center py-10 px-6 gap-2 group hover:bg-foreground/[0.02] transition-colors duration-500">
              <span className="font-display text-4xl md:text-5xl leading-none text-foreground">
                <span ref={el => stripStatRefs.current[i] = el}>0</span>
              </span>
              <span className="eyebrow text-foreground/40 mt-1 text-center">{s.label}</span>
            </div>
          ))}
        </div>

        {/* ═══ FORM SECTION ═════════════════════════════════════ */}
        <section id="contact-form" className="form-section border-b border-hairline">
          <div className="grid md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-hairline">

            {/* Left: Info */}
            <div className="md:col-span-5 p-6 md:p-14 xl:p-16 flex flex-col justify-between gap-14">
              <div>
                <div className="f-reveal flex items-center gap-3 mb-8">
                  <span className="block h-px w-6" style={{ background: "hsl(var(--maroon))" }} />
                  <span className="eyebrow tracking-[0.25em]" style={{ color: "hsl(var(--maroon))" }}>Our Details</span>
                </div>
                <p className="f-reveal text-foreground/60 text-lg leading-relaxed max-w-sm mb-12">
                  Aryan Heights offers premium student accommodations — a focused,
                  supportive community right in the heart of Kota.
                </p>
                <div className="grid grid-cols-2 gap-x-8 gap-y-10">
                  {INFO_GRID.map(d => (
                    <div key={d.h} className="f-reveal">
                      <h3 className="eyebrow text-foreground/35 mb-3">{d.h}</h3>
                      <p className="font-display text-lg leading-snug" style={{ whiteSpace: "pre-line" }}>{d.v}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="f-reveal">
                <h3 className="eyebrow text-foreground/35 mb-5">Social</h3>
                <div className="flex flex-wrap gap-8">
                  {["Instagram", "Facebook"].map(s => (
                    <a key={s} href="#"
                      className="relative overflow-hidden font-display text-lg uppercase hover:text-maroon transition-colors group">
                      <span className="inline-block group-hover:-translate-y-full transition-transform duration-500">{s}</span>
                      <span className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                        style={{ color: "hsl(var(--maroon))" }}>{s}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="md:col-span-7 p-6 md:p-14 xl:p-16 bg-foreground/[0.015]">
              <div className="max-w-2xl">
                <div className="f-reveal flex items-center gap-3 mb-8">
                  <span className="block h-px w-6" style={{ background: "hsl(var(--maroon))" }} />
                  <span className="eyebrow tracking-[0.25em]" style={{ color: "hsl(var(--maroon))" }}>Send a Message</span>
                </div>
                <h2 className="f-reveal font-display text-4xl md:text-5xl xl:text-6xl tracking-tighter mb-12">
                  Send an inquiry
                </h2>
                <form onSubmit={submit} className="flex flex-col gap-10">
                  {[
                    { name: "name",  ph: "YOUR NAME *",    type: "text",  req: true  },
                    { name: "email", ph: "EMAIL ADDRESS",  type: "email", req: false },
                    { name: "phone", ph: "PHONE NUMBER *", type: "tel",   req: true  },
                  ].map(f => (
                    <div key={f.name} className="f-reveal relative">
                      <input required={f.req} type={f.type} name={f.name}
                        value={form[f.name as keyof typeof form]} onChange={change}
                        placeholder={f.ph}
                        className="w-full bg-transparent border-b border-hairline py-4 font-display text-xl md:text-2xl focus:outline-none transition-colors placeholder:text-foreground/20 uppercase tracking-wide peer"
                        onFocus={e => (e.currentTarget.style.borderBottomColor = "hsl(var(--maroon))")}
                        onBlur={e  => (e.currentTarget.style.borderBottomColor = "")}
                      />
                    </div>
                  ))}
                  <div className="f-reveal relative">
                    <textarea name="message" value={form.message} onChange={change}
                      placeholder="MESSAGE (OPTIONAL)" rows={3}
                      className="w-full bg-transparent border-b border-hairline py-4 font-display text-xl md:text-2xl focus:outline-none transition-colors placeholder:text-foreground/20 uppercase resize-none"
                      onFocus={e => (e.currentTarget.style.borderBottomColor = "hsl(var(--maroon))")}
                      onBlur={e  => (e.currentTarget.style.borderBottomColor = "")}
                    />
                  </div>
                  <div className="f-reveal">
                    <button type="submit"
                      className="group relative flex items-center gap-5 px-9 py-5 rounded-full border border-hairline overflow-hidden hover:border-transparent transition-colors duration-500">
                      <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                        style={{ background: "hsl(var(--maroon))", transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }} />
                      <span className="relative z-10 eyebrow text-foreground group-hover:text-white tracking-[0.22em] transition-colors duration-300">
                        Submit Request
                      </span>
                      <span className="relative z-10 text-foreground group-hover:text-white group-hover:translate-x-1 transition-all duration-300">→</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ WHATSAPP BAR ══════════════════════════════════════ */}
        <section className="wa-section border-t border-hairline">
          <a href="https://wa.me/919414141723" target="_blank" rel="noopener noreferrer"
            className="group relative flex flex-col md:flex-row items-start md:items-center justify-between w-full p-8 md:p-16 overflow-hidden transition-colors duration-700 hover:bg-maroon">
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-[0.07] transition-opacity duration-700 pointer-events-none select-none">
              <span className="font-display text-[18vw] leading-none whitespace-nowrap text-white">WHATSAPP</span>
            </div>
            <div className="relative z-10 wa-reveal">
              <div className="eyebrow text-foreground/40 group-hover:text-white/60 transition-colors duration-500 mb-4">Instant Response</div>
              <h2 className="font-display text-5xl md:text-[5.5rem] leading-none tracking-tighter uppercase text-foreground group-hover:text-white transition-colors duration-500">
                Connect Directly
              </h2>
            </div>
            <div className="relative z-10 wa-reveal mt-10 md:mt-0 flex items-center gap-6">
              <span className="hidden lg:block font-display text-2xl xl:text-3xl uppercase tracking-widest text-foreground group-hover:text-white transition-colors duration-500">
                +91 94141 41723
              </span>
              <div className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full border border-foreground/20 bg-background group-hover:border-white/30 group-hover:bg-white/10 transition-all duration-500">
                <svg className="h-6 w-6 md:h-7 md:w-7 text-foreground group-hover:text-white group-hover:rotate-45 transition-all duration-500"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </a>
        </section>

      </main>
      <Footer />
    </div>
  );
}
