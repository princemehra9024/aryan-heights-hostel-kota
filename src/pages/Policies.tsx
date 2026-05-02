import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Nav } from "@/components/aryan/Nav";
import { Footer } from "@/components/aryan/Footer";
import { useTheme } from "@/context/ThemeContext";
import { SEO } from "@/components/aryan/SEO";
import { Cursor } from "@/components/aryan/Cursor";
import { SmoothScroll } from "@/components/aryan/SmoothScroll";

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ──────────────────────────────────────────────────────────────── */

const NAV_ITEMS = [
  { id: "privacy",    label: "Privacy Policy",              index: "01" },
  { id: "terms",      label: "Terms & Conditions",          index: "02" },
  { id: "refund",     label: "Refund & Cancellation",       index: "03" },
  { id: "rules",      label: "Hostel Rules",                index: "04" },
  { id: "disclaimer", label: "Disclaimer",                  index: "05" },
  { id: "contact",    label: "Contact Information",         index: "06" },
  { id: "faq",        label: "FAQ",                         index: "07" },
];

const POLICIES = [
  {
    id: "privacy",
    index: "01",
    title: "Privacy Policy",
    effectiveDate: "Effective: 1 January 2024",
    intro: "Aryan Heights is committed to protecting the privacy and security of our residents, parents, and website visitors. This policy explains how we collect, use, and safeguard your personal information.",
    points: [
      {
        heading: "1. Information We Collect",
        body: "We collect basic identification details (full name, phone number, and email address), government-issued ID proof, and any documentation mandated by local or state authorities for hostel registration purposes."
      },
      {
        heading: "2. How We Use Your Data",
        body: "Your information is used exclusively to manage your stay, communicate operational updates, and fulfil statutory obligations. We do not sell, rent, or share your personal data with any third party for commercial purposes."
      },
      {
        heading: "3. Data Security",
        body: "We implement strict physical access controls and digital security measures to ensure your personal information remains confidential and protected from unauthorised access."
      },
      {
        heading: "4. Cookies & Analytics",
        body: "Our website may use cookies to improve user experience and understand visitor behaviour at an aggregate level. You can manage or disable cookie preferences through your browser settings at any time."
      },
      {
        heading: "5. Your Rights",
        body: "You may request access to, correction of, or deletion of your personal data by contacting us at info@aryanheights.in. We will respond within 15 business days."
      },
    ]
  },
  {
    id: "terms",
    index: "02",
    title: "Terms & Conditions",
    effectiveDate: "Effective: 1 January 2024",
    intro: "By booking accommodation or utilising any service provided by Aryan Heights, you agree to be bound by the following terms and conditions. Please read them carefully before proceeding.",
    points: [
      {
        heading: "1. Admission & Occupancy",
        body: "Admission is subject to availability and a mandatory background verification. Only the registered resident is permitted to occupy the assigned room. Sub-letting, sharing, or transferring your allocated space to another individual is strictly prohibited."
      },
      {
        heading: "2. Behavioural Standards",
        body: "All residents must adhere to a code of respectful conduct toward fellow residents, warden staff, and hostel property. Any form of harassment, bullying, or intimidation will result in immediate termination of the stay."
      },
      {
        heading: "3. Property & Asset Responsibility",
        body: "Any accidental or intentional damage to hostel property, furniture, fixtures, or shared amenities will be assessed and charged to the responsible resident. The hostel is not liable for loss or theft of personal belongings."
      },
      {
        heading: "4. Right of Admission Reserved",
        body: "Management reserves the absolute right of admission and may terminate a stay without prior notice in cases of severe misconduct, repeated rule violations, or behaviour detrimental to the hostel community."
      },
      {
        heading: "5. Amendments to Terms",
        body: "Aryan Heights reserves the right to amend these terms at any time. Continued use of our facilities after changes constitutes acceptance of the revised terms. Residents will be notified of significant changes."
      },
    ]
  },
  {
    id: "refund",
    index: "03",
    title: "Refund & Cancellation Policy",
    effectiveDate: "Effective: 1 January 2024",
    intro: "We understand that circumstances can change. Our refund and cancellation framework is designed to be transparent and fair to all parties.",
    points: [
      {
        heading: "1. Booking Advance (Non-Refundable)",
        body: "The initial booking advance paid to secure a room is strictly non-refundable under all circumstances, regardless of the reason for cancellation. This amount is used to hold the room and cover administrative costs."
      },
      {
        heading: "2. Mid-Session Vacancy",
        body: "If a resident vacates the hostel mid-session for any reason (personal, academic, or otherwise), no refund will be provided for the remaining duration of the contracted period. The full session fee remains payable."
      },
      {
        heading: "3. Security Deposit",
        body: "A refundable security deposit (if collected) will be processed within 30 working days of the resident vacating the premises, provided there are no outstanding dues, unpaid meal charges, or damages to the property."
      },
      {
        heading: "4. Force Majeure",
        body: "In extraordinary circumstances such as natural disasters, government-mandated closures, or other force majeure events, refunds or credits will be evaluated on a case-by-case basis at the sole discretion of management."
      },
      {
        heading: "5. Exceptional Cases",
        body: "Any exception to this policy — including pro-rated refunds for medical emergencies — is solely at the discretion of management. Written requests must be submitted within 7 days of the event."
      },
    ]
  },
  {
    id: "rules",
    index: "04",
    title: "Hostel Rules",
    effectiveDate: "Mandatory for all residents",
    intro: "To ensure a safe, productive, and comfortable environment for every serious aspirant, Aryan Heights enforces the following non-negotiable code of conduct. Violation of any rule may result in disciplinary action or immediate eviction.",
    points: [
      {
        heading: "1. Silence & No Disturbance",
        body: "Maintain silence in corridors, study areas, and rooms at all times. Playing loud music, shouting, or any activity that disturbs fellow residents is strictly prohibited — particularly during designated study hours (6 AM – 10 PM)."
      },
      {
        heading: "2. Zero Tolerance for Substances",
        body: "Consumption, possession, or distribution of tobacco, alcohol, drugs, or any intoxicant on the hostel premises is a zero-tolerance offence and will result in immediate and permanent expulsion without refund."
      },
      {
        heading: "3. Hostel Timings & Gate Curfew",
        body: "Residents must strictly follow designated entry and exit timings. Late entry requires prior permission from the warden. Repeated gate violations will be escalated to parents and management."
      },
      {
        heading: "4. Cleanliness & Hygiene",
        body: "Rooms, bathrooms, and shared spaces must be kept clean at all times. Waste must be disposed of in designated bins. Housekeeping operates daily, and residents must cooperate and keep their spaces orderly."
      },
      {
        heading: "5. Visitor Policy",
        body: "No outside visitors are permitted inside the residential floors. Meetings with family or friends must be arranged at the reception area and during permissible visiting hours only."
      },
      {
        heading: "6. Electronic Devices & Appliances",
        body: "Use of personal electrical appliances (immersion rods, heaters, irons) is prohibited to prevent electrical hazards. Laptops and mobile phones are permitted but must not be used during study hours in shared spaces."
      },
    ]
  },
  {
    id: "disclaimer",
    index: "05",
    title: "Disclaimer",
    effectiveDate: "Last reviewed: 1 January 2024",
    intro: "The information provided on the Aryan Heights website and promotional materials is for general informational purposes only.",
    points: [
      {
        heading: "1. Accuracy of Information",
        body: "While we strive to keep all information accurate and up to date, we make no representations or warranties of any kind — express or implied — about the completeness, accuracy, reliability, suitability, or availability of the content on our website."
      },
      {
        heading: "2. Limitation of Liability",
        body: "Aryan Heights shall not be liable for any direct, indirect, incidental, consequential, or punitive loss or damage arising from reliance on information published on our website or communicated through our representatives."
      },
      {
        heading: "3. External Links",
        body: "Our website may contain links to third-party websites for reference. We have no control over the content, availability, or practices of those sites and accept no responsibility for them."
      },
      {
        heading: "4. Photographs & Imagery",
        body: "All photographs and visual representations on our website and marketing materials depict actual or representative rooms and facilities. Minor variations may exist between depicted and current room conditions."
      },
    ]
  },
  {
    id: "contact",
    index: "06",
    title: "Contact Information",
    effectiveDate: "Available Mon–Sun, 09:00 AM – 08:00 PM",
    intro: "We are always happy to assist prospective and current residents. Reach out to us through any of the channels below — our team typically responds within the same business day.",
    points: [
      {
        heading: "📍 Address",
        body: "A-723(A), Indra Vihar, Kota, Rajasthan — 324005. We are centrally located, just a short walk from Allen, Resonance, and other major coaching institutes."
      },
      {
        heading: "📞 Phone & WhatsApp",
        body: "+91 94141 41723 — Available Monday through Sunday, 9:00 AM to 8:00 PM IST. WhatsApp preferred for quick queries and room availability."
      },
      {
        heading: "✉️ Email",
        body: "info@aryanheights.in — For formal enquiries, documentation requests, or written correspondence. Expect a response within 1–2 business days."
      },
      {
        heading: "🕐 Operating Hours",
        body: "Our front desk and warden support are available Monday to Sunday, 9:00 AM to 8:00 PM IST. Emergency support for current residents is available 24/7 through the on-site warden."
      },
    ]
  },
];

const FAQ_ITEMS = [
  {
    q: "What amenities are included in the hostel fee?",
    a: "Your stay includes high-speed Wi-Fi, daily housekeeping, 24/7 security with CCTV surveillance, RO-purified drinking water, power backup, access to our in-house gym, and nutritious meals from the mess facility. All rooms are fully air-conditioned with attached bathrooms."
  },
  {
    q: "How do I book a room at Aryan Heights?",
    a: "You can book a room by calling or messaging us on WhatsApp at +91 94141 41723, or by emailing info@aryanheights.in. We recommend booking in advance as our rooms fill up quickly, especially before the JEE/NEET session begins."
  },
  {
    q: "Is the hostel safe for students coming from other cities?",
    a: "Absolutely. Aryan Heights provides round-the-clock warden support, 24/7 CCTV surveillance across all floors and common areas, a strict visitor policy, and a secure gate with controlled entry. Parents regularly commend our safety standards."
  },
  {
    q: "Where is Aryan Heights located relative to coaching institutes?",
    a: "We are located at A-723(A), Indra Vihar, Kota — just a short walk from Allen Career Institute, Resonance, Vibrant Academy, and other major coaching centres. Our location is deliberately chosen for its proximity to Kota's academic hub."
  },
  {
    q: "Are meals provided? What is the food like?",
    a: "Yes, we have an in-house mess facility providing nutritious, home-style meals. The menu is designed keeping students' health and study schedules in mind. Meal timings are structured to complement coaching schedules."
  },
  {
    q: "Can parents visit students at the hostel?",
    a: "Yes, parents are welcome to visit during designated visiting hours. Meetings take place in the reception area. Prior notice is appreciated but not mandatory. We maintain transparent communication with parents throughout the academic session."
  },
  {
    q: "What types of rooms are available?",
    a: "We offer single-occupancy and double-occupancy AC rooms with attached bathrooms. All rooms are furnished with a study desk, chair, wardrobe, and comfortable bed. Room allocation is based on availability at the time of booking."
  },
  {
    q: "What happens if I need to leave mid-session?",
    a: "As per our Refund & Cancellation Policy, no refund is provided for mid-session departures. The full contracted session fee remains payable. We strongly recommend ensuring your commitment before booking. Exceptional cases (e.g., medical) are reviewed by management."
  },
];

/* ─── Sub-components ─────────────────────────────────────────────────────── */

function FAQItem({ item, index }: { item: typeof FAQ_ITEMS[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bodyRef.current) return;
    if (open) {
      gsap.fromTo(bodyRef.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.5, ease: "expo.out" }
      );
    } else {
      gsap.to(bodyRef.current,
        { height: 0, opacity: 0, duration: 0.35, ease: "expo.in" }
      );
    }
  }, [open]);

  return (
    <div className="border-b border-hairline last:border-b-0">
      <button
        id={`faq-item-${index}`}
        aria-expanded={open}
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-start justify-between gap-6 py-6 text-left group"
      >
        <span className="flex items-start gap-4">
          <span className="eyebrow text-maroon mt-0.5 shrink-0">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-tight text-lg md:text-xl font-medium leading-snug text-foreground group-hover:text-maroon transition-colors duration-300">
            {item.q}
          </span>
        </span>
        <span
          className="shrink-0 w-8 h-8 rounded-full border border-hairline flex items-center justify-center text-foreground/50 group-hover:border-maroon group-hover:text-maroon transition-all duration-300"
          aria-hidden="true"
        >
          <span
            className="block transition-transform duration-300"
            style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
          >
            +
          </span>
        </span>
      </button>
      <div
        ref={bodyRef}
        className="overflow-hidden"
        style={{ height: 0, opacity: 0 }}
        aria-hidden={!open}
      >
        <p className="pb-6 pl-10 text-base md:text-lg text-foreground/65 leading-relaxed font-light">
          {item.a}
        </p>
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function PoliciesPage() {
  useTheme(); // keep theme context alive
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("privacy");

  // Scroll-to-top / hash on mount
  useEffect(() => {
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.substring(1));
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 300);
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  // GSAP entrance + scroll tracking
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.fromTo(
        ".policies-hero-text",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.3, stagger: 0.12, ease: "expo.out", delay: 0.15 }
      );

      // Section entrance
      gsap.utils.toArray<HTMLElement>(".policy-block").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, duration: 1.1, ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          }
        );
      });

      // Active sidebar tracking
      NAV_ITEMS.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: "top 45%",
          end: "bottom 45%",
          onEnter: () => setActiveSection(id),
          onEnterBack: () => setActiveSection(id),
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth" });
    window.history.pushState(null, "", `#${id}`);
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-bg text-foreground selection:bg-maroon selection:text-ivory flex flex-col overflow-x-hidden"
    >
      <SmoothScroll />
      <Cursor />
      <SEO
        title="Policies & Information"
        description="Review all legal guidelines, policies, hostel rules, and FAQs for Aryan Heights Boys Hostel in Kota, Rajasthan."
        keywords="Aryan Heights policies, hostel rules Kota, privacy policy, refund policy, hostel terms"
      />
      <Nav />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-16 px-5 md:px-8 border-b border-hairline overflow-hidden">
        <div className="max-w-[1700px] mx-auto">
          {/* Decorative background number */}
          <div
            aria-hidden="true"
            className="absolute -top-4 right-6 md:right-12 font-display text-[12rem] md:text-[18rem] leading-none text-foreground/[0.03] select-none pointer-events-none"
          >
            POL
          </div>

          <div className="max-w-3xl relative z-10">
            <p className="policies-hero-text eyebrow text-maroon mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-maroon" />
              Legal & Information
            </p>
            <h1 className="policies-hero-text font-display text-[clamp(3rem,8vw,7rem)] leading-[0.92] tracking-tighter uppercase mb-8">
              Policies &<br />
              <span className="text-maroon italic">Information.</span>
            </h1>
            <p className="policies-hero-text text-foreground/60 text-lg md:text-xl font-light max-w-xl leading-relaxed">
              Everything you need to know about your stay — our commitments, your
              rights, and the guidelines that keep Aryan Heights a premium, safe
              environment for serious aspirants.
            </p>
          </div>

          {/* Quick-jump chips (mobile) */}
          <div className="policies-hero-text flex flex-wrap gap-2 mt-10 lg:hidden">
            {NAV_ITEMS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="px-4 py-1.5 rounded-full border border-hairline text-xs font-tight uppercase tracking-wider text-foreground/60 hover:border-maroon hover:text-maroon transition-all duration-300"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Body ─────────────────────────────────────────────── */}
      <section className="px-5 md:px-8 py-20 md:py-28 max-w-[1700px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 relative">

          {/* Sidebar */}
          <aside className="lg:col-span-3 hidden lg:block" aria-label="Policy navigation">
            <div className="sticky top-32">
              <p className="eyebrow text-foreground/40 mb-6">Directory</p>
              <nav>
                <ul className="flex flex-col gap-1" role="list">
                  {NAV_ITEMS.map(({ id, label, index }) => {
                    const isActive = activeSection === id;
                    return (
                      <li key={id}>
                        <button
                          onClick={() => scrollTo(id)}
                          className={`group w-full flex items-center gap-3 py-2 text-left transition-all duration-300 ${
                            isActive ? "text-maroon" : "text-foreground/45 hover:text-foreground"
                          }`}
                        >
                          <span
                            className={`eyebrow transition-all duration-300 ${
                              isActive ? "text-maroon" : "text-foreground/30 group-hover:text-foreground/60"
                            }`}
                          >
                            {index}
                          </span>
                          <span
                            className={`font-tight text-sm uppercase tracking-wider transition-all duration-300 ${
                              isActive ? "translate-x-1" : "group-hover:translate-x-0.5"
                            }`}
                          >
                            {label}
                          </span>
                          {isActive && (
                            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-maroon shrink-0" />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Divider */}
              <div className="hairline mt-10 mb-8" />

              {/* Quick contact card */}
              <div className="surface rounded-sm p-5">
                <p className="eyebrow text-foreground/40 mb-3">Need help?</p>
                <p className="font-tight text-sm text-foreground/70 mb-4 leading-relaxed">
                  Our team is available Mon–Sun,<br />9 AM – 8 PM IST.
                </p>
                <a
                  href="tel:+919414141723"
                  className="eyebrow text-maroon hover:underline underline-offset-4"
                >
                  +91 94141 41723
                </a>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="lg:col-span-9 flex flex-col gap-24 md:gap-32" id="policies-main">

            {/* Policy sections */}
            {POLICIES.map((policy) => (
              <div
                key={policy.id}
                id={policy.id}
                className="policy-block scroll-mt-28"
              >
                {/* Section header */}
                <div className="flex items-start justify-between gap-4 mb-8 pb-6 border-b border-hairline">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="eyebrow text-maroon">{policy.index}</span>
                      <span className="w-6 h-px bg-hairline" />
                      <span className="eyebrow text-foreground/40">{policy.effectiveDate}</span>
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl uppercase tracking-tighter">
                      {policy.title}
                    </h2>
                  </div>
                </div>

                {/* Intro paragraph */}
                <p className="text-foreground/65 text-base md:text-lg leading-relaxed font-light mb-10 max-w-3xl">
                  {policy.intro}
                </p>

                {/* Points */}
                <div className="flex flex-col gap-6">
                  {policy.points.map((pt, i) => (
                    <div
                      key={i}
                      className="grid md:grid-cols-12 gap-2 md:gap-6 py-5 border-b border-hairline/60 last:border-b-0"
                    >
                      <div className="md:col-span-4">
                        <p className="font-tight text-sm font-semibold text-foreground uppercase tracking-wide leading-snug">
                          {pt.heading}
                        </p>
                      </div>
                      <div className="md:col-span-8">
                        <p className="text-foreground/65 text-sm md:text-base leading-relaxed font-light">
                          {pt.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* ── FAQ Section ────────────────────────────────── */}
            <div id="faq" className="policy-block scroll-mt-28">
              <div className="mb-8 pb-6 border-b border-hairline">
                <div className="flex items-center gap-3 mb-3">
                  <span className="eyebrow text-maroon">07</span>
                  <span className="w-6 h-px bg-hairline" />
                  <span className="eyebrow text-foreground/40">Frequently Asked Questions</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl uppercase tracking-tighter">
                  FAQ
                </h2>
              </div>

              <p className="text-foreground/65 text-base md:text-lg leading-relaxed font-light mb-10 max-w-3xl">
                Common questions from prospective residents and their families. Can't
                find your answer? Call us directly at{" "}
                <a
                  href="tel:+919414141723"
                  className="text-maroon hover:underline underline-offset-4"
                >
                  +91 94141 41723
                </a>
                .
              </p>

              <div className="divide-y divide-hairline border-t border-hairline">
                {FAQ_ITEMS.map((item, i) => (
                  <FAQItem key={i} item={item} index={i} />
                ))}
              </div>
            </div>

            {/* ── Footer CTA strip ───────────────────────────── */}
            <div className="policy-block surface rounded-sm p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <p className="eyebrow text-maroon mb-2">Still have questions?</p>
                <h3 className="font-display text-2xl md:text-3xl uppercase tracking-tighter">
                  Talk to our team directly.
                </h3>
                <p className="text-foreground/55 text-sm mt-2 font-light">
                  We're available Monday – Sunday, 9 AM to 8 PM.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                <a
                  href="https://wa.me/919414141723"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="policies-whatsapp-cta"
                  className="btn-arrow text-sm"
                >
                  WhatsApp Us →
                </a>
                <a
                  href="mailto:info@aryanheights.in"
                  id="policies-email-cta"
                  className="btn-ghost text-sm"
                >
                  Email Us
                </a>
              </div>
            </div>

          </main>
        </div>
      </section>

      <Footer />
    </div>
  );
}
