import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import logo from "@/assets/logo.png";

export const Loader = () => {
  const root = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);
  useEffect(() => {
    const obj = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(root.current, {
          yPercent: -100, duration: 1.1, ease: "expo.inOut",
          onComplete: () => setDone(true),
        });
      },
    });
    tl.to(obj, {
      v: 100, duration: 1.6, ease: "power2.inOut",
      onUpdate: () => { if (num.current) num.current.textContent = String(Math.round(obj.v)).padStart(3, "0"); },
    });
  }, []);
  if (done) return null;
  return (
    <div ref={root} className="fixed inset-0 z-[100] bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <img src={logo} alt="" className="w-32 h-32 object-contain" />
        <div className="font-display text-4xl md:text-5xl tracking-tighter">Aryan Heights</div>
        <div className="font-mono-tag text-foreground/60"><span ref={num}>000</span> / 100</div>
      </div>
      <div className="absolute bottom-8 left-8 eyebrow text-foreground/40">Aryan Heights · Kota</div>
      <div className="absolute bottom-8 right-8 eyebrow text-foreground/40">2026 Edition</div>
    </div>
  );
};
