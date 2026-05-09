import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

// Links with full paths so they work from any page (e.g. /rooms → /#about)
const links = [
  { label: "Home",       href: "/" },
  { label: "Rooms",      href: "/rooms" },
  { label: "Contact",    href: "/contact" },
];

const otherLinks = [
  { label: "About",      href: "/#about" },
  { label: "Mess",       href: "/#mess" },
  { label: "Gallery",    href: "/#gallery" },
  { label: "Portfolio",  href: "/#properties" },
  { label: "Wardens",    href: "/#wardens" },
  { label: "Rules",      href: "/#rules" },
];

export const FullscreenMenu = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!root.current) return;
    if (open) {
      gsap.set(root.current, { display: "flex" });
      const tl = gsap.timeline();
      tl.fromTo(root.current, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.9, ease: "expo.inOut" })
        .from("[data-menu-link]", { yPercent: 110, opacity: 0, stagger: 0.06, duration: 0.8, ease: "expo.out" }, "-=0.4")
        .from("[data-menu-meta]", { opacity: 0, y: 20, stagger: 0.05, duration: 0.6 }, "-=0.4");
    } else {
      gsap.to(root.current, { clipPath: "inset(0 0 100% 0)", duration: 0.7, ease: "expo.inOut", onComplete: () => gsap.set(root.current, { display: "none" }) });
    }
  }, [open]);

  return (
    <div ref={root} style={{ display: "none" }} className="fixed inset-0 z-[90] bg-background flex-col">
      <div className="flex items-center justify-between px-5 md:px-8 py-5 border-b border-hairline">
        <span className="font-display text-base">Aryan Heights — Menu</span>
        <button onClick={onClose} aria-label="Close menu" className="w-10 h-10 rounded-full border border-hairline flex items-center justify-center text-lg hover:bg-ivory hover:text-ink transition-colors rotate-45">+</button>
      </div>
      <div className="flex-1 grid md:grid-cols-12 gap-8 px-5 md:px-8 py-10 overflow-y-auto">
        <nav className="md:col-span-8 flex flex-col justify-center gap-1">
          {links.map(({ label, href }, i) => (
            <Link
              key={href}
              to={href}
              onClick={onClose}
              className="block overflow-hidden"
            >
              <span
                data-menu-link
                className="font-display text-[10vw] md:text-[7vw] leading-[0.95] tracking-tighter hover:text-maroon transition-colors block"
              >
                <span className="text-foreground/40 text-[0.25em] align-top mr-4">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {label}
              </span>
            </Link>
          ))}
        </nav>
        <aside className="md:col-span-4 flex flex-col justify-end gap-8 text-sm">
          <div data-menu-meta>
            <div className="eyebrow text-foreground/50 mb-4">Discover</div>
            <div className="flex flex-col gap-2">
              {otherLinks.map((link) => (
                <Link key={link.href} to={link.href} onClick={onClose} className="font-display text-xl hover:text-maroon transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div data-menu-meta>
            <div className="eyebrow text-foreground/50 mb-2">Reach Out</div>
            <p className="font-display text-lg">+91 98290 00000<br/>hello@aryanheights.in</p>
          </div>
          <div data-menu-meta className="flex gap-5 text-foreground/60">
            <a href="#" className="hover:text-foreground">Instagram</a>
            <a href="#" className="hover:text-foreground">YouTube</a>
            <a href="#" className="hover:text-foreground">WhatsApp</a>
          </div>
        </aside>
      </div>
    </div>
  );
};
