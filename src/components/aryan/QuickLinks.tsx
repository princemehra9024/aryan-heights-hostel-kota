import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export const QuickLinks = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const links = [
    { title: "Home", href: "/", isRouter: true, desc: "Back to main" },
    { title: "Rooms", href: "/rooms", isRouter: true, desc: "Explore our premium living spaces" },
    { title: "Contact", href: "/contact", isRouter: true, desc: "Get in touch with us" },
    { title: "Privacy Policy", href: "/policies", isRouter: true, desc: "Read our privacy guidelines" },
    { title: "Gallery", href: "/#gallery", isRouter: false, desc: "See the hostel in pictures" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".quick-link-item", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-20 md:py-32 relative border-t border-hairline">
      <div className="max-w-[1700px] mx-auto px-5 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
          <div>
            <h2 className="font-display text-4xl md:text-6xl tracking-tight mb-4">Quick Navigation</h2>
            <p className="eyebrow text-foreground/60 max-w-md">Access our main pages and policies directly.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {links.map((link, idx) => {
            const inner = (
              <div className="p-8 border border-hairline rounded-2xl bg-surface hover:bg-surface/80 transition-all duration-300 group h-full flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-2xl md:text-3xl mb-3 group-hover:text-maroon transition-colors">{link.title}</h3>
                  <p className="text-sm text-foreground/60">{link.desc}</p>
                </div>
                <div className="mt-8 flex justify-end">
                  <div className="w-10 h-10 rounded-full border border-hairline flex items-center justify-center group-hover:bg-maroon group-hover:border-maroon group-hover:text-white transition-all duration-300">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                      <line x1="5" y1="19" x2="19" y2="5"></line>
                      <polyline points="9 5 19 5 19 15"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
            );

            return (
              <div key={idx} className="quick-link-item h-full">
                {link.isRouter ? (
                  <Link to={link.href} className="block h-full">{inner}</Link>
                ) : (
                  <a href={link.href} className="block h-full">{inner}</a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
