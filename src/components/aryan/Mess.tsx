import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import mess from "@/assets/mess-hall.jpg";

gsap.registerPlugin(ScrollTrigger);

const mealSections = [
  {
    title: "Breakfast",
    main: "Tea · Stuffed Paratha",
    rotationTitle: "Rotating Items",
    rotation: "Sandwich, Puri Sabzi, Idli Sambar, Dosa, Poha, Upma, Bread Butter/Jam, Veg Cutlet, Aloo/Paneer/Methi Paratha, Veg Uttapam, Masala/Plain Dosa, Bread Pakora, Veg Roll, Pav Bhaji, Aloo Bonda, Sabudana Khichdi, Sprouts/Corn Chaat, Vegetable Maggi, Cheese Sandwich."
  },
  {
    title: "Lunch",
    main: "Dal · Rice · Roti · Curd/Raita",
    rotationTitle: "Varieties",
    subSections: [
      { name: "Dal", items: "Toor, Tadka, Moong, Split Moong, Chana, Fry, Panchmel, Makhani, Masoor." },
      { name: "Gravy", items: "Aloo Tamatar, Mix Veg, Chole, Rajma, Kadhi Pakoda, Matar/Butter/Palak Paneer, Lauki Chana, Aloo Gobi Gravy, Sev Tamatar, Malai Kofta." },
      { name: "Dry", items: "Aloo Jeera, Bhindi Masala, Aloo Gobi, Cabbage Peas, Beans Aloo, Baingan Bharta, Aloo Methi, Tinda Masala, Carrot Peas, Pumpkin, Soyabean." }
    ]
  },
  {
    title: "High Tea",
    main: "Tea",
    rotationTitle: "Snacks",
    rotation: "Biscuits, Toast, Khari, Bhel Puri, Namkeen, Mixture, Veg Sandwich, Poha, Sprouts/Corn Chaat."
  },
  {
    title: "Dinner",
    main: "Dal · Rice · Roti · Milk",
    rotationTitle: "Varieties",
    subSections: [
      { name: "Vegetable", items: "Aloo Gobi, Mix Veg, Bhindi Masala, Beans Aloo, Pumpkin Curry, Baingan Bharta, Aloo Methi, Cabbage, Soyabean, Tinda Masala, Carrot Peas, Aloo Tamatar, Lauki Sabzi, Sev Tamatar." },
      { name: "Special", items: "Pizza, Halwa, Gulab Jamun, Kheer, Ice Cream, Fruit Custard, Jalebi, Rasgulla, Paneer Dish, Sweets." }
    ]
  }
];

export const Mess = () => {
  const root = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        ScrollTrigger.create({
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          pin: "[data-mess-img]",
          pinSpacing: false,
        });
      });

      gsap.from("[data-meal-card]", {
        y: 40, opacity: 0, stagger: 0.1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 60%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="mess" className="py-24 md:py-40 border-t border-hairline relative bg-background">
      <div className="max-w-[1700px] mx-auto px-5 md:px-8 grid md:grid-cols-12 gap-12 md:gap-20">
        
        {/* Sticky Image Section */}
        <div data-mess-img className="md:col-span-5 h-[50vh] md:h-[85vh] overflow-hidden rounded-3xl surface sticky top-8">
          <img src={mess} alt="Mess hall" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8">
            <div className="eyebrow text-white/80 mb-2 underline decoration-maroon underline-offset-4">Quality Standard</div>
            <p className="text-white text-lg font-light leading-relaxed">Nutritious, hygienic, and home-style meals prepared with premium ingredients daily.</p>
          </div>
        </div>

        {/* Menu Content Section */}
        <div className="md:col-span-7">
          <div className="eyebrow text-foreground/55 mb-6">(03) — Mess & Nutrition</div>
          <h2 className="font-display text-5xl md:text-8xl leading-[0.95] tracking-tighter mb-16 md:mb-24">
            Balanced<br /><span className="text-foreground/40 italic">Nourishment.</span>
          </h2>

          <div className="space-y-12">
            {mealSections.map((meal) => (
              <div data-meal-card key={meal.title} className="group border-t border-hairline pt-10 pb-6">
                <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 mb-8">
                  <h3 className="font-display text-4xl md:text-5xl text-maroon group-hover:translate-x-2 transition-transform duration-500">{meal.title}</h3>
                  <div className="text-xl md:text-2xl font-light text-foreground/80">{meal.main}</div>
                </div>

                {meal.rotation && (
                  <div className="bg-surface/30 p-6 rounded-2xl border border-hairline/50">
                    <span className="eyebrow text-foreground/40 text-[0.6rem] block mb-3 uppercase tracking-[0.2em]">{meal.rotationTitle}</span>
                    <p className="text-sm leading-relaxed text-foreground/60">{meal.rotation}</p>
                  </div>
                )}

                {meal.subSections && (
                  <div className="grid md:grid-cols-1 gap-6">
                    {meal.subSections.map((sub) => (
                      <div key={sub.name} className="flex flex-col md:flex-row md:gap-8 border-b border-hairline/30 pb-6 last:border-0">
                        <div className="eyebrow text-foreground/40 text-[0.6rem] min-w-[80px] pt-1 uppercase tracking-widest mb-2 md:mb-0">{sub.name} Options</div>
                        <p className="text-sm text-foreground/70 leading-relaxed italic">{sub.items}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-20 p-8 border border-hairline bg-surface rounded-3xl">
            <div className="flex items-center gap-4 text-maroon mb-4 font-display text-xl">
              <span>Note</span>
            </div>
            <p className="text-sm text-foreground/60 leading-relaxed">
              Items are served on a rotating basis to ensure variety and seasonal freshness. We prioritize hygiene and use only branded oils and fresh produce.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
