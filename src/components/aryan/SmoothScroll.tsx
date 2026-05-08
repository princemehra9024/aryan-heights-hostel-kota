import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const SmoothScroll = () => {
  useEffect(() => {
    // Disable smooth scroll on mobile — native touch momentum is better
    const isMobile = window.matchMedia("(max-width: 767px)").matches || "ontouchstart" in window;
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !isMobile,
      smoothTouch: false,   // always let touch be native
      wheelMultiplier: 1.1,
      touchMultiplier: 2,
    });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => { lenis.raf(time * 1000); };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Smooth anchor scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (anchor && anchor.getAttribute("href")?.startsWith("#")) {
        const id = anchor.getAttribute("href")?.substring(1);
        const element = document.getElementById(id || "");
        if (element) {
          e.preventDefault();
          // @ts-expect-error
          lenis.scrollTo(element, { offset: 0, duration: 2 });
        }
      }
    };
    document.addEventListener("click", handleAnchorClick);

    return () => {
      gsap.ticker.remove(raf);
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
    };
  }, []);
  return null;
};
