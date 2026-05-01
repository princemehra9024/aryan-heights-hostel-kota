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

// Links that are anchors on home page
const homeAnchors = [
  { label: "About", href: "/#about" },
  { label: "Facilities", href: "/#facilities" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Contact", href: "/contact" },
];

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const { theme, toggle } = useTheme();
  const location = useLocation();
  const isRoomsPage = location.pathname === "/rooms";
  const headerRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (headerRef.current) {
      // Set initial state explicitly
      gsap.set(headerRef.current, { yPercent: -100, opacity: 0 });
      gsap.to(headerRef.current, {
        yPercent: 0,
        opacity: 1,
        duration: 1.4,
        ease: "expo.out",
        delay: 4.8,
      });
    }
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-[50]"
        style={{ opacity: 0 }}
      >
        {/* ── Glass background — appears on scroll ── */}
        <div
          className="absolute inset-0 transition-all duration-700"
          style={{
            background: scrolled
              ? `hsl(var(--bg) / 0.95)`
              : "transparent",
            backdropFilter: scrolled ? "blur(32px) saturate(1.8)" : "none",
            WebkitBackdropFilter: scrolled ? "blur(32px) saturate(1.8)" : "none",
            boxShadow: scrolled
              ? "0 1px 0 hsl(var(--hairline) / 0.6), 0 8px 32px -8px hsl(var(--bg) / 0.6)"
              : "none",
          }}
        />

        {/* ── Maroon accent line — top edge ── */}
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
            
            <div className="relative flex items-center justify-center">
              <img
                src={logo}
                alt="Aryan Heights"
                className={`object-contain transition-all duration-500 group-hover:scale-110 drop-shadow-md ${
                  scrolled ? "w-12 h-12 md:w-14 md:h-14" : "w-16 h-16 md:w-[84px] md:h-[84px]"
                } ${theme === "dark" ? "brightness-0 invert opacity-100 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" : ""}`}
              />
            </div>

            {/* Typography */}
            <div className="hidden sm:flex flex-col leading-none relative">
              <span
                className={`font-display font-bold tracking-[0.03em] text-foreground transition-all duration-500 ${
                  scrolled ? "text-[1.1rem] md:text-[1.25rem]" : "text-[1.4rem] md:text-[1.7rem]"
                }`}
              >
                Aryan Heights
              </span>
              <span className={`eyebrow font-medium text-maroon transition-all duration-500 uppercase tracking-[0.25em] ${
                scrolled ? "text-[0.55rem] md:text-[0.6rem] mt-1" : "text-[0.65rem] md:text-[0.75rem] mt-1.5"
              }`}>
                Boys Hostel · Kota
              </span>
            </div>
          </Link>

          {/* ════ CENTER: Nav Links ════ */}
          <nav className="hidden lg:flex items-center relative">
            {/* Pill background container — upgraded glass effect */}
            <div className="flex items-center gap-1 bg-surface/80 backdrop-blur-md rounded-full px-1.5 py-1 border border-hairline shadow-sm">
              {homeAnchors.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onMouseEnter={() => setHoveredLink(l.label)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className={`relative px-4 py-2 rounded-full text-[0.68rem] font-medium tracking-[0.12em] uppercase transition-all duration-300 ${
                    hoveredLink === l.label
                      ? "text-foreground bg-foreground/[0.08]"
                      : "text-foreground/60 hover:text-foreground/90"
                  }`}
                >
                  {l.label}
                </a>
              ))}
              {/* Divider */}
              <div className="w-px h-4 bg-hairline mx-2" />
              {/* Enquire */}
              <a
                href="https://wa.me/919829000000"
                onMouseEnter={() => setHoveredLink("Enquire")}
                onMouseLeave={() => setHoveredLink(null)}
                className={`relative px-4 py-2 rounded-full text-[0.68rem] font-medium tracking-[0.12em] uppercase transition-all duration-300 ${
                  hoveredLink === "Enquire"
                    ? "text-maroon bg-maroon/10"
                    : "text-foreground/50 hover:text-foreground/80"
                }`}
              >
                Enquire
              </a>
            </div>
          </nav>

          {/* ════ RIGHT: Actions ════ */}
          <div className="flex items-center gap-2 md:gap-2.5">
            {/* Theme toggle */}
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="w-9 h-9 rounded-full border border-hairline flex items-center justify-center text-foreground/50 hover:text-foreground hover:border-foreground/30 hover:bg-foreground/5 transition-all duration-300 shadow-sm"
            >
              <span className="transition-transform duration-500 hover:rotate-180">
                {theme === "dark" ? <SunIcon /> : <MoonIcon />}
              </span>
            </button>

            {/* Book a Visit button — Unique interactive design */}
            <Link
              to="/rooms"
              className="hidden md:inline-flex items-center justify-center relative overflow-hidden px-6 py-2.5 rounded-full border border-maroon/30 group transition-all duration-500 shadow-sm hover:border-maroon"
            >
              <div className="absolute inset-0 bg-maroon translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-out rounded-full" />
              <span className="relative z-10 text-[0.65rem] font-bold tracking-[0.15em] uppercase text-foreground transition-colors duration-500 group-hover:text-white flex items-center gap-2">
                Book a Visit
                <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">→</span>
              </span>
            </Link>

            {/* Hamburger — refined */}
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="w-10 h-10 rounded-full border border-hairline flex flex-col items-center justify-center gap-[5px] hover:border-foreground/30 hover:bg-foreground/5 transition-all duration-300 group ml-0.5 shadow-sm"
            >
              <span
                className="h-[1.5px] bg-foreground/60 transition-all duration-300 group-hover:bg-foreground group-hover:w-[18px]"
                style={{ width: "16px" }}
              />
              <span
                className="h-[1.5px] bg-foreground/60 transition-all duration-300 group-hover:bg-foreground group-hover:w-[18px]"
                style={{ width: "11px" }}
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
