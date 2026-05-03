import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import logo from "@/assets/logo.png";

/* ─────────────────────────────────────────────────────────────
   LOADER / SPLASH SCREEN
   Always renders in DARK mode regardless of site theme.
   Fixed: bars now use a forced dark color, not bg-background
   which would be cream/ivory in light mode.
───────────────────────────────────────────────────────────── */
export const Loader = () => {
  const container  = useRef<HTMLDivElement>(null);
  const content    = useRef<HTMLDivElement>(null);
  const logoRef    = useRef<HTMLImageElement>(null);
  const titleRef   = useRef<HTMLHeadingElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const barRefs    = useRef<HTMLDivElement[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    /* ── Split title into individual words, then characters ── */
    const title = titleRef.current;
    if (title) {
      const text = title.textContent || "";
      title.innerHTML = text
        .split(" ")
        .map(
          (word) =>
            `<span class="inline-block whitespace-nowrap">${word
              .split("")
              .map(
                (char) =>
                  `<span class="loader-char inline-block" style="transform:translateY(110%);opacity:0">${char}</span>`
              )
              .join("")}</span>`
        )
        .join(`<span class="inline-block w-[0.3em]"></span>`);
    }

    /* ── Main entrance timeline ── */
    const tl = gsap.timeline({
      onComplete: () => {
        /* Exit animation — bars collapse from center out */
        const exitTl = gsap.timeline({ onComplete: () => setDone(true) });

        exitTl
          .to(content.current, {
            opacity: 0,
            y: -50,
            scale: 0.97,
            filter: "blur(12px)",
            duration: 0.9,
            ease: "expo.inOut",
          })
          .to(
            barRefs.current,
            {
              scaleY: 0,
              duration: 1.4,
              stagger: { amount: 0.35, from: "center" },
              ease: "expo.inOut",
            },
            "-=0.5"
          );
      },
    });

    /* Initial GSAP states */
    gsap.set(barRefs.current,    { scaleY: 1, transformOrigin: "top" });
    gsap.set(logoRef.current,    { opacity: 0, scale: 0.75, y: 30 });
    gsap.set(counterRef.current, { opacity: 0, y: 12 });
    gsap.set(progressRef.current, { scaleX: 0, transformOrigin: "left" });

    /* 1. Logo reveal */
    tl.to(logoRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 1.4,
      ease: "expo.out",
    });

    /* 2. Title letters stagger in */
    if (title) {
      tl.to(
        title.querySelectorAll(".loader-char"),
        { y: "0%", opacity: 1, duration: 1.1, stagger: 0.028, ease: "expo.out" },
        "-=1"
      );
    }

    /* 3. Counter fades in */
    tl.to(counterRef.current, { opacity: 1, y: 0, duration: 0.9 }, "-=2.8");

    /* 4. Counter counts 0 → 100 */
    const obj = { v: 0 };
    tl.to(
      obj,
      {
        v: 100,
        duration: 1.8, // Reduced from 3.2s
        ease: "power2.inOut",
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = Math.round(obj.v)
              .toString()
              .padStart(3, "0");
          }
        },
      },
      "-=2.8"
    );

    /* 5. Progress bar fills in sync with counter */
    tl.to(progressRef.current, { scaleX: 1, duration: 1.8, ease: "power2.inOut" }, "<");

    return () => { tl.kill(); };
  }, []);

  if (done) return null;

  return (
    <div
      ref={container}
      className="fixed inset-0 z-[100] flex flex-col overflow-hidden"
      style={{ background: "#0b0c10" }}          /* ← Always dark, never inherits theme */
    >
      {/* ── Grain overlay ── */}
      <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.04] mix-blend-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <filter id="splashNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#splashNoise)" />
        </svg>
      </div>

      {/* ── Vertical wipe bars — forced dark ── */}
      <div className="absolute inset-0 flex">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            ref={(el) => { if (el) barRefs.current[i] = el; }}
            className="flex-1 origin-top"
            style={{
              background: i % 2 === 0 ? "#0b0c10" : "#0d0f14",
              borderRight: "1px solid rgba(255,255,255,0.02)",
            }}
          />
        ))}
      </div>

      {/* ── Warm radial glow — maroon accent ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 60%, hsl(0 50% 18% / 0.35) 0%, transparent 70%)",
        }}
      />

      {/* ── Centre content ── */}
      <div ref={content} className="relative z-10 flex-1 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-10 md:gap-14 max-w-5xl px-8 w-full">

          {/* Logo */}
          <div className="relative flex items-center justify-center">
            <div
              className="absolute w-32 h-32 rounded-full blur-3xl opacity-20"
              style={{ background: "hsl(0 50% 30%)" }}
            />
            <img
              ref={logoRef}
              src={logo}
              alt="Aryan Heights"
              className="relative w-16 h-16 md:w-24 md:h-24 object-contain"
              style={{ filter: "brightness(0) invert(1)", opacity: 0 }}
            />
          </div>

          {/* Brand Name */}
          <h1
            ref={titleRef}
            className="font-display uppercase leading-none text-white/90 text-center w-full flex flex-wrap justify-center"
            style={{
              fontSize: "clamp(2rem, 9vw, 9vw)",
              letterSpacing: "0.12em",
              gap: "0 0.05em",
            }}
          >
            Aryan Heights
          </h1>

          {/* Counter + progress */}
          <div className="flex flex-col items-center gap-5 w-full max-w-xs">
            <div
              ref={counterRef}
              className="font-display text-3xl md:text-5xl tabular-nums"
              style={{ color: "hsl(0 50% 38% / 0.9)", letterSpacing: "0.1em" }}
            >
              000
            </div>
            {/* Progress bar */}
            <div className="w-full h-px" style={{ background: "rgba(255,255,255,0.08)" }}>
              <div
                ref={progressRef}
                className="h-full"
                style={{ background: "hsl(0 50% 35%)", transformOrigin: "left" }}
              />
            </div>
          </div>
        </div>

        {/* Bottom metadata strip */}
        <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
          <div className="flex flex-col gap-1">
            <span className="eyebrow text-white/20 text-[0.58rem] tracking-[0.2em]">Curated Residence</span>
            <span className="font-display text-base md:text-lg text-white/55">Est. 2010</span>
          </div>
          <div className="hidden md:flex flex-col items-center gap-1">
            <span className="eyebrow text-white/20 text-[0.58rem] tracking-[0.2em]">Series</span>
            <span className="font-display text-base md:text-lg text-white/55">Vol. 26</span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="eyebrow text-white/20 text-[0.58rem] tracking-[0.2em]">Region</span>
            <span className="font-display text-base md:text-lg text-white/55">Kota · RJ</span>
          </div>
        </div>
      </div>

      {/* ── Subtle vertical structure lines ── */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.04 }}>
        {[1, 2, 3, 4, 5].map((n) => (
          <div
            key={n}
            className="absolute top-0 bottom-0 w-px"
            style={{ left: `${(n / 6) * 100}%`, background: "white" }}
          />
        ))}
      </div>
    </div>
  );
};
