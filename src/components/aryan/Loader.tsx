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
                  `<span class="loader-char inline-block" style="transform:translateY(120%) rotateZ(15deg) scale(0.8); filter:blur(8px); opacity:0; transform-origin:bottom left;">${char}</span>`
              )
              .join("")}</span>`
        )
        .join(`<span class="inline-block w-[0.2em] md:w-[0.4em]"></span>`);
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
    gsap.set(logoRef.current,    { opacity: 0, scale: 0.4, y: 50, rotationY: 90, rotationZ: -10 });
    gsap.set(counterRef.current, { opacity: 0, y: 12 });
    gsap.set(progressRef.current, { scaleX: 0, transformOrigin: "left" });

    /* 1. Logo reveal */
    tl.to(logoRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      rotationY: 0,
      rotationZ: 0,
      duration: 1.8,
      ease: "back.out(1.2)",
    });

    /* 1.5 Continuous logo float */
    gsap.to(logoRef.current, {
      y: -10,
      rotationZ: 2,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1.8,
    });

    /* 2. Title letters stagger in - much more premium feel */
    if (title) {
      tl.to(
        title.querySelectorAll(".loader-char"),
        { 
          y: "0%", 
          rotationZ: 0, 
          scale: 1, 
          filter: "blur(0px)", 
          opacity: 1, 
          duration: 1.4, 
          stagger: 0.04, 
          ease: "expo.out" 
        },
        "-=1.4"
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
          <div className="relative flex items-center justify-center perspective-[1000px]">
            <div
              className="absolute w-72 h-72 md:w-[28rem] md:h-[28rem] rounded-full blur-[100px] opacity-50 mix-blend-screen"
              style={{ background: "hsl(0 60% 40%)" }}
            />
            <div
              className="absolute w-48 h-48 md:w-72 md:h-72 rounded-full blur-[70px] opacity-70 mix-blend-screen"
              style={{ background: "hsl(0 80% 60%)" }}
            />
            <img
              ref={logoRef}
              src={logo}
              alt="Aryan Heights"
              className="relative w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 object-contain drop-shadow-2xl"
              style={{ filter: "brightness(0) invert(1)", opacity: 0, transformStyle: "preserve-3d" }}
            />
          </div>

          {/* Brand Name */}
          <h1
            ref={titleRef}
            className="font-display uppercase text-white/90 text-center w-full flex flex-wrap justify-center drop-shadow-lg"
            style={{
              fontSize: "clamp(2rem, 7vw, 6.5rem)",
              letterSpacing: "0.15em",
              lineHeight: "1.1",
              gap: "0.1em",
            }}
          >
            Aryan Heights
          </h1>

          {/* Counter + progress */}
          <div className="flex flex-col items-center gap-5 w-full max-w-xs">
            <div
              ref={counterRef}
              className="font-display text-4xl md:text-6xl tabular-nums drop-shadow-md"
              style={{ color: "hsl(0 60% 45%)", letterSpacing: "0.1em" }}
            >
              000
            </div>
            {/* Progress bar */}
            <div className="w-full h-[2px] rounded-full overflow-hidden relative shadow-[0_0_15px_rgba(255,0,0,0.1)]" style={{ background: "rgba(255,255,255,0.05)" }}>
              <div
                ref={progressRef}
                className="absolute inset-y-0 left-0 w-full"
                style={{ 
                  background: "linear-gradient(90deg, hsl(0 60% 30%), hsl(0 80% 50%))", 
                  transformOrigin: "left",
                  boxShadow: "0 0 10px hsl(0 80% 50% / 0.5)"
                }}
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
