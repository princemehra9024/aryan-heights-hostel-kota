import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const Cursor = () => {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const xTo = gsap.quickTo(ring.current, "x", { duration: 0.5, ease: "expo.out" });
    const yTo = gsap.quickTo(ring.current, "y", { duration: 0.5, ease: "expo.out" });
    const xD = gsap.quickTo(dot.current, "x", { duration: 0.15, ease: "expo.out" });
    const yD = gsap.quickTo(dot.current, "y", { duration: 0.15, ease: "expo.out" });
    const move = (e: MouseEvent) => { xTo(e.clientX); yTo(e.clientY); xD(e.clientX); yD(e.clientY); };
    const enter = () => ring.current?.classList.add("hovering");
    const leave = () => ring.current?.classList.remove("hovering");
    window.addEventListener("mousemove", move);
    document.querySelectorAll("a,button,[data-cursor]").forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className="cursor-ring" />
      <style>{`.cursor-ring.hovering{ width:72px; height:72px; background: hsl(var(--ivory) / 0.1); border-color: hsl(var(--ivory)); }`}</style>
    </>
  );
};
