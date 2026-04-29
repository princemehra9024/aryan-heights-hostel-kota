## Goal
Rebuild the Aryan Heights site to match the look, feel, and interaction language of aventuradentalarts.com — dark editorial, video-led, big bold sans-serif, slider/carousel-driven sections, magnetic CTAs, and Lenis-powered smooth scroll. Same content (hostel), same vibe (premium dental clinic style).

## Reference analysis (what makes that site feel like that)
- **Theme**: near-black background (`#0E1018`-ish), off-white text, single soft accent. No serifs anywhere.
- **Typography**: one large modern sans (display) used at huge sizes with tight tracking; smaller sans for body. No italics, no decorative type.
- **Nav**: ultra-minimal — left logo mark + wordmark, center "Menu" (opens fullscreen overlay) and "Services" dropdown, right "Patient form" + dark "Book A Call" pill + close/plus icon.
- **Hero**: full-bleed muted autoplay video on the right/background, big stacked headline on the left, a vertical rotating word list (Implant Restoration / Advanced Esthetic / Restorative Dentistry style) that cycles.
- **Sections used**: Intro/About with team thumbnails row, Services 4-card grid with image + title hover-zoom, Technology horizontal slider with `01 / 07` counter and prev/next, Team of Experts (image + name list), Why-Choose-Us stats grid + testimonial slider, big final CTA, dark footer with locations.
- **Motion**: Lenis smooth scroll, fullscreen menu reveal, word-by-word/char fade-up reveals on scroll, image scale-on-reveal, slider drag + buttons, magnetic CTA buttons, subtle cursor follower.

## What I'll build for Aryan Heights

### 1. Design system rewrite (`src/index.css`, `tailwind.config.ts`)
- Switch palette to dark: `--bg: #0E1018`, `--fg: #ECEAE4`, `--muted: #9A9CA3`, `--accent: maroon (kept from logo) #6B1A22`, `--surface: #14171F`.
- Drop Cormorant / Instrument Serif. Add **Inter Tight** (or **Neue Haas Grotesk** via fontsource fallback to Inter) as the only display + body font, weights 400/500/600.
- New utilities: `.font-display` (Inter Tight, -0.03em tracking), `.eyebrow` (uppercase 11px tracked), `.btn-pill` (dark pill with hover fill), `.magnetic` hook target.

### 2. Components (rewrite the `src/components/aryan/*` set)
- **SmoothScroll** — keep Lenis (already in place).
- **Cursor** — keep, restyle to white ring on dark.
- **Loader** — replace with centered ADA-style logo + counter, fades to reveal hero (already similar).
- **Nav** — minimal bar: logo + "Aryan Heights", center "Menu ☰" + "Rooms ▾", right "Enquire" link + dark "Book a Visit" pill + plus icon. Plus icon opens **FullscreenMenu**.
- **FullscreenMenu** (new) — full-viewport overlay with huge link list (About, Rooms, Facilities, Mess, Gallery, Visit), staggered char reveal, contact info bottom-left, socials bottom-right, close on plus rotate.
- **Hero** — left: stacked headline "A premium / boys' hostel / in Kota."; right: muted autoplay loop video (use a stock building/lifestyle video URL or fallback to Ken-Burns image); below headline a **vertical rotating word ticker** cycling: "24/7 Security", "Mess That Feels Like Home", "3 min to Allen", "Study Halls Open All Night".
- **Marquee** — keep but restyle (thin uppercase, hairline dividers between words).
- **About** — short intro paragraph + row of 3 team/warden circular thumbnails + "Since 2010" stat block, CTA "About us →".
- **Services** (replaces Facilities grid) — 4-card grid: Rooms, Mess, Study Halls, Wellness. Each card = image with hover-zoom + title bottom-left + arrow bottom-right.
- **Rooms** — keep pricing, restyle to dark cards with hairline borders, no serif.
- **Technology→Facilities slider** (new) — horizontal slider with `01 / 06` counter and prev/next: WiFi, RO Water, Power Backup, CCTV, Laundry, Housekeeping. Each slide = large image + title + short copy. Drag + button nav.
- **Mess** — keep pinned weekly menu, restyle dark, sans only.
- **Gallery** — keep horizontal scroll, restyle captions.
- **Team of Wardens** (new, replaces Testimonials position) — left big image, right stacked names + roles list with hover state.
- **Why Choose Us** (new) — stats grid (15+ Years, 1200+ Aspirants, 24/7 Care, 3 min to Allen, 98% Renewal, 4 Floors) + testimonial slider with `01 / 03` counter.
- **Location** — keep map but dark-styled.
- **CTA + Footer** — final dark section: "Ready to find his next home? Book a visit." + columns (Sections / Hostel / Address / Hours) + bottom row.

### 3. Interactions (GSAP)
- Lenis (already wired).
- Reveal: split headlines into lines, `yPercent: 110 → 0, stagger 0.06, expo.out` on `ScrollTrigger start: "top 80%"`.
- Image reveals: `clip-path inset(0 0 100% 0) → 0`, paired with internal `scale 1.15 → 1`.
- Hero rotating words: GSAP timeline yPercent loop, 2.2s per word.
- Sliders (Technology, Testimonials): GSAP `xPercent` tween between slides + drag with pointer events, counter updates, prev/next buttons.
- Fullscreen menu: timeline — overlay clip-path reveal top→bottom, then char stagger on links.
- Magnetic buttons: pointermove translates button + inner label toward cursor, springs back on leave.
- Cursor: white ring scales 2.5x on `[data-cursor="hover"]`, becomes filled on slider areas with "Drag" label.

### 4. Assets
- Reuse existing generated room/building/mess/study/gym/rooftop/hallway images (already in `src/assets/`).
- Add 1 hero video: a free CDN MP4 (e.g., a stock building/architecture loop) referenced by URL; fallback `<img>` poster = existing `hero-building.jpg`.
- Add 3 small warden portraits via AI generation.

### 5. Files touched
```
edit    src/index.css                         (palette + fonts + utilities)
edit    tailwind.config.ts                    (color tokens, font family)
edit    index.html                            (preconnect Inter Tight, meta)
edit    src/pages/Index.tsx                   (new section order)
rewrite src/components/aryan/Nav.tsx
rewrite src/components/aryan/Hero.tsx
rewrite src/components/aryan/About.tsx
rewrite src/components/aryan/Facilities.tsx   (→ Services 4-grid)
rewrite src/components/aryan/Rooms.tsx
rewrite src/components/aryan/Mess.tsx         (restyle only)
rewrite src/components/aryan/Gallery.tsx      (restyle only)
rewrite src/components/aryan/Testimonials.tsx (→ stats + slider)
rewrite src/components/aryan/Location.tsx
rewrite src/components/aryan/Contact.tsx      (final CTA + footer)
rewrite src/components/aryan/Loader.tsx
rewrite src/components/aryan/Cursor.tsx       (dark theme)
new     src/components/aryan/FullscreenMenu.tsx
new     src/components/aryan/FacilitiesSlider.tsx
new     src/components/aryan/Wardens.tsx
new     src/components/aryan/WhyChooseUs.tsx
new     src/hooks/useMagnetic.ts
new     3 warden portrait assets
```

### Final section order
Loader → Nav → Hero (video + rotating words) → Marquee → About + team row → Services 4-grid → Rooms/Pricing → Facilities slider → Mess (pinned) → Gallery (horizontal) → Wardens → Why Choose Us (stats + testimonial slider) → Location → CTA + Footer.

### Out of scope (ask if you want them)
- Real video shoot of the actual hostel — I'll use a stock loop.
- Multi-page routing (About / Services pages) — staying single-page like current.

Approve and I'll switch to build mode and ship it.