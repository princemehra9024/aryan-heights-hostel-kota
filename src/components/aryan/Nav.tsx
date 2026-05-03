import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import logo from "@/assets/logo.png";
import { FullscreenMenu } from "./FullscreenMenu";
import { useTheme } from "@/context/ThemeContext";

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const EyeIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

// Sub-links for Home dropdown
const homeAnchors = [
  { label: "About", href: "/#about" },
  { label: "Mess", href: "/#mess" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Wardens", href: "/#wardens" },
  { label: "Rules", href: "/#rules" },
];

const mainLinks = [
  { label: "Home", href: "/", isDropdown: true },
  { label: "Rooms", href: "/rooms" },
  { label: "Policies", href: "/policies" },
  { label: "Contact", href: "/contact" }
];

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const { theme, toggle } = useTheme();
  const location = useLocation();
  const isContactPage = location.pathname === "/contact";
  const forceDarkStyle = theme === "dark" || isContactPage;
  const navIsDark = scrolled ? theme === "dark" : forceDarkStyle;
  const headerRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (headerRef.current) {
      // Only delay on homepage "/" — waiting for the splash screen loader (4.8s).
      // All other pages (contact, rooms, etc.) show navbar immediately.
      const isHome = location.pathname === "/";
      gsap.set(headerRef.current, { yPercent: -100, opacity: 0 });
      gsap.to(headerRef.current, {
        yPercent: 0,
        opacity: 1,
        duration: 1.2,
        ease: "expo.out",
        delay: isHome ? 2.8 : 0.3, // Reduced from 4.8s
      });
    }
  }, [location.pathname]);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-[50]"
        style={{ opacity: 0 }}
      >
        {/* ── Top gradient — always visible, ensures nav legibility on hero ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: scrolled
              ? "none"
              : navIsDark
              ? "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 70%, transparent 100%)"
              : "linear-gradient(to bottom, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.1) 70%, transparent 100%)",
            transition: "all 0.7s ease",
          }}
        />

        {/* ── Glass background — appears on scroll ── */}
        <div
          className="absolute inset-0 transition-all duration-700"
          style={{
            background: scrolled ? `hsl(var(--bg) / 0.95)` : "transparent",
            backdropFilter: scrolled ? "blur(32px) saturate(1.8)" : "none",
            WebkitBackdropFilter: scrolled ? "blur(32px) saturate(1.8)" : "none",
            boxShadow: scrolled
              ? "0 1px 0 hsl(var(--hairline) / 0.6), 0 8px 32px -8px hsl(var(--bg) / 0.6)"
              : "none",
          }}
        />

        {/* ── Maroon accent line — top edge on scroll ── */}
        <div
          className="absolute top-0 left-0 right-0 h-[3px] transition-all duration-700"
          style={{
            background: "linear-gradient(90deg, transparent 5%, hsl(var(--maroon)) 50%, transparent 95%)",
            opacity: scrolled ? 0.9 : 0,
            transform: scrolled ? "scaleX(1)" : "scaleX(0.3)",
          }}
        />

        {/* ── Inner Container ── */}
        <div
          className={`relative z-10 max-w-[1700px] mx-auto px-5 md:px-10 flex items-center justify-between transition-all duration-700 ${
            scrolled ? "h-[80px] md:h-[90px]" : "h-[96px] md:h-[110px]"
          }`}
        >
          {/* ════ LEFT: Logo ════ */}
          <Link to="/" className="flex items-center gap-4 md:gap-5 group relative" data-cursor>
            {/* Subtle glow behind logo on hover */}
            <div className="absolute -inset-4 rounded-full bg-maroon/0 group-hover:bg-maroon/5 transition-all duration-500" />
            
            <div className="relative flex items-center justify-center py-1">
              <img
                src={logo}
                alt="Aryan Heights"
                className={`object-contain transition-all duration-500 group-hover:scale-105 drop-shadow-md ${
                  scrolled ? "w-10 h-10 md:w-12 md:h-12" : "w-14 h-14 md:w-[72px] md:h-[72px]"
                }`}
                style={{
                  /* Always theme-aware */
                  filter: navIsDark
                    ? (scrolled ? "brightness(0) invert(1)" : "brightness(0) invert(1) drop-shadow(0 0 12px rgba(255,255,255,0.15))")
                    : "none",
                }}
              />
            </div>

            {/* Typography */}
            <div className="hidden sm:flex flex-col leading-none relative">
              <span
                className={`font-display font-bold tracking-[0.03em] transition-all duration-500 ${
                  scrolled ? "text-[1.1rem] md:text-[1.25rem]" : "text-[1.4rem] md:text-[1.7rem]"
                }`}
                style={{ color: scrolled ? "hsl(var(--foreground))" : navIsDark ? "rgba(255,255,255,0.95)" : "hsl(var(--foreground))" }}
              >
                Aryan Heights
              </span>
              <span
                className={`eyebrow font-medium uppercase tracking-[0.25em] transition-all duration-500 ${
                  scrolled ? "text-[0.55rem] md:text-[0.6rem] mt-1" : "text-[0.65rem] md:text-[0.75rem] mt-1.5"
                }`}
                style={{ color: scrolled ? "hsl(var(--maroon))" : "hsl(var(--maroon))" }}
              >
                Boys Hostel · Kota
              </span>
            </div>
          </Link>

          {/* ════ CENTER: Nav Links ════ */}
          <nav className="hidden lg:flex items-center relative">
            {/* Pill — dark glass before scroll, theme-aware after */}
            <div
              className="flex items-center gap-1 rounded-full px-1.5 py-1 shadow-sm backdrop-blur-md transition-all duration-500"
              style={{
                background: scrolled ? "hsl(var(--surface) / 0.85)" : navIsDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
                border: scrolled ? "1px solid hsl(var(--hairline))" : navIsDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(0,0,0,0.1)",
              }}
            >
              {mainLinks.map((l) => (
                <div 
                  key={l.label} 
                  className="relative group"
                  onMouseEnter={() => setHoveredLink(l.label)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <Link
                    to={l.href}
                    className="relative px-4 py-2 flex items-center gap-1.5 rounded-full text-[0.68rem] font-medium tracking-[0.12em] uppercase transition-all duration-300"
                    style={{
                      color: hoveredLink === l.label
                        ? (navIsDark ? "rgba(255,255,255,1)" : "rgba(0,0,0,1)")
                        : scrolled
                        ? "hsl(var(--foreground) / 0.65)"
                        : navIsDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)",
                      background: hoveredLink === l.label ? (navIsDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)") : "transparent",
                    }}
                  >
                    {l.label}
                    {l.isDropdown && (
                      <svg className="w-3 h-3 transition-transform group-hover:rotate-180 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {l.isDropdown && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-3 group-hover:translate-y-0 z-50">
                      <div className="py-2 px-2 rounded-2xl shadow-2xl backdrop-blur-2xl border relative overflow-hidden"
                        style={{
                           background: scrolled ? "hsl(var(--bg) / 0.85)" : "rgba(11,12,16,0.65)",
                           borderColor: scrolled ? "hsl(var(--hairline))" : "rgba(255,255,255,0.12)",
                           boxShadow: scrolled ? "0 20px 40px -10px rgba(0,0,0,0.1)" : "0 20px 40px -10px rgba(0,0,0,0.4)",
                        }}>
                        {/* Subtle inner border for glass effect */}
                        <div className="absolute inset-0 pointer-events-none rounded-2xl border border-white/5" />
                        
                        {homeAnchors.map((anchor) => (
                          <a
                            key={anchor.href}
                            href={anchor.href}
                            className="group/item relative flex items-center justify-between px-4 py-3 text-[0.65rem] font-bold tracking-[0.15em] uppercase transition-all duration-300 rounded-xl overflow-hidden"
                            style={{
                              color: scrolled ? "hsl(var(--foreground) / 0.75)" : "rgba(255,255,255,0.75)",
                            }}
                            onMouseEnter={e => {
                               e.currentTarget.style.color = scrolled ? "hsl(var(--maroon))" : "white";
                            }}
                            onMouseLeave={e => {
                               e.currentTarget.style.color = scrolled ? "hsl(var(--foreground) / 0.75)" : "rgba(255,255,255,0.75)";
                            }}
                          >
                            {/* Animated background highlight */}
                            <div 
                              className="absolute inset-0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"
                              style={{ 
                                background: scrolled ? "linear-gradient(90deg, hsl(var(--maroon) / 0.05), transparent)" : "linear-gradient(90deg, rgba(255,255,255,0.06), transparent)"
                              }} 
                            />
                            
                            {/* Text that slides right slightly */}
                            <span className="relative z-10 transition-transform duration-300 ease-out group-hover/item:translate-x-1">
                              {anchor.label}
                            </span>
                            
                            {/* Arrow that slides in from left */}
                            <svg 
                              className="relative z-10 w-3.5 h-3.5 opacity-0 -translate-x-3 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300 ease-out" 
                              fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            </svg>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>

          {/* ════ RIGHT: Actions ════ */}
          <div className="flex items-center gap-1.5 md:gap-2.5">
            {/* Theme toggle */}
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm"
              style={{
                border: scrolled ? "1px solid hsl(var(--hairline))" : navIsDark ? "1px solid rgba(255,255,255,0.22)" : "1px solid rgba(0,0,0,0.15)",
                color: scrolled ? "hsl(var(--foreground) / 0.55)" : navIsDark ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.65)",
                background: "transparent",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.color = scrolled ? "hsl(var(--foreground))" : navIsDark ? "rgba(255,255,255,1)" : "rgba(0,0,0,1)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = scrolled ? "hsl(var(--foreground) / 0.35)" : navIsDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.3)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.color = scrolled ? "hsl(var(--foreground) / 0.55)" : navIsDark ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.65)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = scrolled ? "hsl(var(--hairline))" : navIsDark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.15)";
              }}
            >
              <span className="transition-transform duration-500 hover:rotate-180 scale-90 md:scale-100">
                {theme === "dark" ? <SunIcon /> : <MoonIcon />}
              </span>
            </button>

            {/* Book a Visit button */}
            <Link
              to="/contact"
              className="hidden md:inline-flex items-center justify-center relative overflow-hidden px-6 py-2.5 rounded-full group transition-all duration-500 shadow-sm"
              style={{
                border: scrolled ? "1px solid hsl(var(--maroon) / 0.35)" : navIsDark ? "1px solid rgba(255,255,255,0.25)" : "1px solid rgba(0,0,0,0.2)",
              }}
            >
              <div className="absolute inset-0 bg-maroon translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-out rounded-full" />
              <span
                className="relative z-10 text-[0.65rem] font-bold tracking-[0.15em] uppercase transition-colors duration-500 group-hover:text-white flex items-center gap-2"
                style={{ color: scrolled ? "hsl(var(--foreground))" : navIsDark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.8)" }}
              >
                Book a Visit
                <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">→</span>
              </span>
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="w-9 h-9 md:w-10 md:h-10 rounded-full flex flex-col items-center justify-center gap-[4px] md:gap-[5px] transition-all duration-300 group ml-0 shadow-sm"
              style={{
                border: scrolled ? "1px solid hsl(var(--hairline))" : navIsDark ? "1px solid rgba(255,255,255,0.22)" : "1px solid rgba(0,0,0,0.15)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = scrolled ? "hsl(var(--foreground) / 0.35)" : navIsDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.3)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = scrolled ? "hsl(var(--hairline))" : navIsDark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.15)";
              }}
            >
              <span
                className="h-[1.5px] transition-all duration-300 group-hover:w-[18px]"
                style={{ width: "16px", background: scrolled ? "hsl(var(--foreground) / 0.6)" : navIsDark ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.7)" }}
              />
              <span
                className="h-[1.5px] transition-all duration-300 group-hover:w-[18px]"
                style={{ width: "11px", background: scrolled ? "hsl(var(--foreground) / 0.6)" : navIsDark ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.7)" }}
              />
            </button>
          </div>
        </div>

        {/* ── Bottom hairline ── */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px transition-opacity duration-700"
          style={{
            background: `linear-gradient(90deg, transparent, hsl(var(--hairline)), transparent)`,
            opacity: scrolled ? 0.8 : 0.15,
          }}
        />
      </header>

      <FullscreenMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
};
