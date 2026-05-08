import { lazy, Suspense, useRef } from "react";
import { useInView } from "@/hooks/useInView";

// ─── Always eagerly loaded (above the fold / essential) ───────────
import { SmoothScroll } from "@/components/aryan/SmoothScroll";
import { Cursor }       from "@/components/aryan/Cursor";
import { Loader }       from "@/components/aryan/Loader";
import { Nav }          from "@/components/aryan/Nav";
import { Hero }         from "@/components/aryan/Hero";
import { Marquee }      from "@/components/aryan/Marquee";
import { About }        from "@/components/aryan/About";
import { SEO }          from "@/components/aryan/SEO";
import { PartnerBanner } from "@/components/aryan/PartnerBanner";

// ─── Code-split + lazy loaded (below the fold) ────────────────────
const Rooms       = lazy(() => import("@/components/aryan/Rooms").then(m => ({ default: m.Rooms })));
const Mess        = lazy(() => import("@/components/aryan/Mess").then(m => ({ default: m.Mess })));
const Gallery     = lazy(() => import("@/components/aryan/Gallery").then(m => ({ default: m.Gallery })));
const Facilities  = lazy(() => import("@/components/aryan/Facilities").then(m => ({ default: m.Facilities })));
const Wardens     = lazy(() => import("@/components/aryan/Wardens").then(m => ({ default: m.Wardens })));
const WhyChooseUs = lazy(() => import("@/components/aryan/WhyChooseUs").then(m => ({ default: m.WhyChooseUs })));
const Rules       = lazy(() => import("@/components/aryan/Rules").then(m => ({ default: m.Rules })));
const Location    = lazy(() => import("@/components/aryan/Location").then(m => ({ default: m.Location })));
const Properties  = lazy(() => import("@/components/aryan/Properties").then(m => ({ default: m.Properties })));
const Contact     = lazy(() => import("@/components/aryan/Contact").then(m => ({ default: m.Contact })));
const Footer      = lazy(() => import("@/components/aryan/Footer").then(m => ({ default: m.Footer })));

// ─── Placeholder shown while a lazy section is loading ────────────
const SectionPlaceholder = ({ minH = "40vh" }: { minH?: string }) => (
  <div style={{ minHeight: minH }} aria-hidden="true" />
);

// ─── Wrapper: only mounts children once the sentinel enters view ───
const LazySection = ({ children, minH = "40vh" }: { children: React.ReactNode; minH?: string }) => {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sentinelRef, "0px 0px -120px 0px");
  return (
    <div ref={sentinelRef}>
      {inView ? (
        <Suspense fallback={<SectionPlaceholder minH={minH} />}>
          {children}
        </Suspense>
      ) : (
        <SectionPlaceholder minH={minH} />
      )}
    </div>
  );
};

const Index = () => {
  return (
    <main className="bg-background text-foreground grain relative overflow-x-clip w-full">
      <SEO
        title="Premium Boys Hostel in Kota"
        description="Aryan Heights offers the finest student living experience in Kota. AC rooms, healthy meals, and walking distance to Allen coaching."
        keywords="best hostel kota, boys hostel landmark city, aryan heights kota, resonance kota hostel"
      />

      {/* ── Always render: critical path ── */}
      <Loader />
      <SmoothScroll />
      <Cursor />
      <Nav />
      <Hero />
      <PartnerBanner />
      <Marquee />
      <About />

      <LazySection minH="60vh"><Rooms /></LazySection>
      <LazySection minH="50vh"><Mess /></LazySection>
      <LazySection minH="60vh"><Facilities /></LazySection>
      <LazySection minH="60vh"><Gallery /></LazySection>
      <LazySection minH="40vh"><Wardens /></LazySection>
      <LazySection minH="40vh"><WhyChooseUs /></LazySection>
      <LazySection minH="30vh"><Rules /></LazySection>
      <LazySection minH="60vh"><Properties /></LazySection>
      <LazySection minH="30vh"><Location /></LazySection>
      <LazySection minH="30vh"><Contact /></LazySection>
      <LazySection minH="80vh"><Footer /></LazySection>
    </main>
  );
};

export default Index;
