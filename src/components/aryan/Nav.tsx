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

// Links that are anchors on home page
const homeAnchors = [
  { label: "About", href: "/#about" },
  { label: "Facilities", href: "/#facilities" },
  { label: "Gallery", href: "/#gallery" },
];

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const location = useLocation();
  const isRoomsPage = location.pathname === "/rooms";
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Initial entrance animation synced with the splash screen (only on initial load)
    // Wait for the splash screen to finish (~4.8s) then animate the nav down
    if (headerRef.current) {
      gsap.from(headerRef.current, {
        yPercent: -100,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        delay: 4.8 // Just slightly before the hero text
      });
    }
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-700 ${
          scrolled
            ? "py-2 bg-background/80 backdrop-blur-xl border-b border-hairline shadow-sm"
            : "py-4"
        }`}
      >
        <div className="max-w-[1700px] mx-auto px-5 md:px-8 flex items-center justify-between gap-6">

          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-3 group" data-cursor>
            <div className="relative overflow-hidden rounded-full w-12 h-12 flex items-center justify-center">
              <img
                src={logo}
                alt="Aryan Heights"
                className="w-12 h-12 object-contain transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span className="font-display text-base tracking-wide text-foreground">Aryan Heights</span>
              <span className="eyebrow text-foreground/50 text-[0.58rem] mt-0.5">Boys Hostel · Kota</span>
            </div>
          </Link>

          {/* ── Desktop nav links ── */}
          <nav className="hidden md:flex items-center gap-8">
            {homeAnchors.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative text-sm text-foreground/70 hover:text-foreground transition-colors duration-300 group"
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-maroon transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            {/* Rooms — dedicated page link */}
            <Link
              to="/rooms"
              className={`relative text-sm transition-colors duration-300 group ${
                isRoomsPage ? "text-maroon font-semibold" : "text-foreground/70 hover:text-foreground"
              }`}
            >
              Rooms
              <span className={`absolute -bottom-0.5 left-0 h-px bg-maroon transition-all duration-300 group-hover:w-full ${isRoomsPage ? "w-full" : "w-0"}`} />
            </Link>
          </nav>

          {/* ── Right controls ── */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="w-9 h-9 rounded-full border border-hairline flex items-center justify-center text-foreground/70 hover:text-foreground hover:border-maroon hover:bg-surface transition-all duration-300"
            >
              <span className="transition-all duration-300">
                {theme === "dark" ? <SunIcon /> : <MoonIcon />}
              </span>
            </button>

            <a
              href="https://wa.me/919829000000"
              className="hidden sm:inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-maroon transition-colors duration-300"
            >
              Enquire
            </a>

            <Link to="/rooms" className="btn-pill text-xs hidden sm:inline-flex">
              Book a Visit
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="w-9 h-9 rounded-full border border-hairline flex flex-col items-center justify-center gap-[5px] hover:bg-surface hover:border-maroon transition-all duration-300 group"
            >
              <span className="w-4 h-px bg-foreground/70 transition-all duration-300 group-hover:w-5 group-hover:bg-foreground" />
              <span className="w-3 h-px bg-foreground/70 transition-all duration-300 group-hover:w-5 group-hover:bg-foreground" />
            </button>
          </div>
        </div>
      </header>

      <FullscreenMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
};
