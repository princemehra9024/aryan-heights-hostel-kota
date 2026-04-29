import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  text: string;
  className?: string;
  once?: boolean;
  delay?: number;
  stagger?: number;
}

export const TextReveal = ({ text, className, once = true, delay = 0, stagger = 0.015 }: TextRevealProps) => {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;

    const words = root.current.querySelectorAll(".word");
    
    gsap.fromTo(
      words,
      {
        yPercent: 100,
        opacity: 0,
      },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1.2,
        ease: "expo.out",
        stagger: stagger,
        delay: delay,
        scrollTrigger: {
          trigger: root.current,
          start: "top 90%",
          toggleActions: once ? "play none none none" : "play none none reverse",
        },
      }
    );
  }, [text, once, delay, stagger]);

  return (
    <div ref={root} className={`overflow-hidden flex flex-wrap ${className}`}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] py-[0.1em]">
          <span className="word inline-block">{word}</span>
        </span>
      ))}
    </div>
  );
};
