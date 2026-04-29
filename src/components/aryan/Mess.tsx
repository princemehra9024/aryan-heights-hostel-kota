import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import mess from "@/assets/mess-hall.jpg";

const menu = [
  { day: "Mon", b: "Aloo Paratha · Curd", l: "Rajma · Jeera Rice · Salad", d: "Paneer Butter Masala · Roti" },
  { day: "Tue", b: "Poha · Banana", l: "Chole · Bhatura · Pickle", d: "Mix Veg · Dal Tadka · Roti" },
  { day: "Wed", b: "Idli · Sambhar", l: "Kadhi · Pulao", d: "Aloo Gobi · Dal · Roti" },
  { day: "Thu", b: "Sandwich · Milk", l: "Chana Masala · Rice", d: "Paneer Bhurji · Roti" },
  { day: "Fri", b: "Upma · Chai", l: "Sambhar Rice · Papad", d: "Special: Veg Biryani · Raita" },
  { day: "Sat", b: "Pancake · Fruit", l: "Rajma · Rice", d: "Malai Kofta · Roti" },
  { day: "Sun", b: "Puri · Sabji", l: "Chole · Rice · Halwa", d: "Pizza Night · Soup" },
];

export const Mess = () => {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "+=80%",
        pin: "[data-mess-img]",
        pinSpacing: false,
      });
      gsap.from("[data-menu-row]", {
        x: -40, opacity: 0, stagger: 0.08, duration: 0.9, ease: "expo.out",
        scrollTrigger: { trigger: "[data-menu-row]", start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={root} id="mess" className="py-28 md:py-40 border-t border-hairline relative">
      <div className="max-w-[1700px] mx-auto px-5 md:px-8 grid md:grid-cols-12 gap-12">
        <div data-mess-img className="md:col-span-5 h-[80svh] overflow-hidden">
          <img src={mess} alt="Mess hall" className="w-full h-full object-cover" loading="lazy" />
          <div className="eyebrow text-foreground/55 mt-3">Three meals · Snacks · Pure veg</div>
        </div>
        <div className="md:col-span-7">
          <div className="eyebrow text-foreground/55 mb-6">(06) — Mess</div>
          <h2 className="font-display text-5xl md:text-7xl leading-[1] tracking-tighter mb-12">
            Cooked the way<br /><span className="text-foreground/55">your mother would.</span>
          </h2>
          <div className="border-t border-hairline">
            {menu.map((m) => (
              <div data-menu-row key={m.day} className="grid grid-cols-12 gap-4 py-5 border-b border-hairline items-baseline">
                <div className="col-span-2 font-display text-2xl text-maroon">{m.day}</div>
                <div className="col-span-10 md:col-span-10 grid md:grid-cols-3 gap-3 text-sm text-foreground/80">
                  <div><span className="eyebrow text-foreground/45 block mb-1">Breakfast</span>{m.b}</div>
                  <div><span className="eyebrow text-foreground/45 block mb-1">Lunch</span>{m.l}</div>
                  <div><span className="eyebrow text-foreground/45 block mb-1">Dinner</span>{m.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
