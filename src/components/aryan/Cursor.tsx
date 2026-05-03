import { useCallback, useEffect, useRef } from "react";
import { gsap } from "gsap";

export const Cursor = () => {
  const dot  = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((e: MouseEvent) => {
    // GSAP quickTo already batches RAF — no extra throttle needed here,
    // but we guard with passive:true on the listener (see below).
    xTo!(e.clientX);
    yTo!(e.clientY);
    xD!(e.clientX);
    yD!(e.clientY);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Store quickTo refs outside so handleMove closure can reach them
  let xTo: ReturnType<typeof gsap.quickTo> | undefined;
  let yTo: ReturnType<typeof gsap.quickTo> | undefined;
  let xD:  ReturnType<typeof gsap.quickTo> | undefined;
  let yD:  ReturnType<typeof gsap.quickTo> | undefined;

  useEffect(() => {
    // Only run on desktop — skip on touch/mobile devices
    if ("ontouchstart" in window || window.matchMedia("(max-width: 767px)").matches) return;

    xTo = gsap.quickTo(ring.current, "x", { duration: 0.5, ease: "expo.out" });
    yTo = gsap.quickTo(ring.current, "y", { duration: 0.5, ease: "expo.out" });
    xD  = gsap.quickTo(dot.current,  "x", { duration: 0.15, ease: "expo.out" });
    yD  = gsap.quickTo(dot.current,  "y", { duration: 0.15, ease: "expo.out" });

    // Throttle: only fire at 60fps max using rAF flag
    let rafPending = false;
    const move = (e: MouseEvent) => {
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(() => {
        xTo!(e.clientX);
        yTo!(e.clientY);
        xD!(e.clientX);
        yD!(e.clientY);
        rafPending = false;
      });
    };

    const enter = () => ring.current?.classList.add("hovering");
    const leave = () => ring.current?.classList.remove("hovering");

    // passive:true means the browser never blocks scroll to check for preventDefault
    window.addEventListener("mousemove", move, { passive: true });
    document.querySelectorAll("a,button,[data-cursor]").forEach((el) => {
      el.addEventListener("mouseenter", enter, { passive: true });
      el.addEventListener("mouseleave", leave, { passive: true });
    });

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <>
      <div ref={dot}  className="cursor-dot"  />
      <div ref={ring} className="cursor-ring" />
      <style>{`.cursor-ring.hovering{ width:72px; height:72px; background: hsl(var(--ivory) / 0.1); border-color: hsl(var(--ivory)); }`}</style>
    </>
  );
};
