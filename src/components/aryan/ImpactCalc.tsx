import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Slider config ────────────────────────────────────────────── */
const SLIDERS = [
  { id: "students", label: "Number of Students",  accent: "maroon", min: 10, max: 200, step: 10, def: 60  },
  { id: "months",   label: "Duration of Stay",    accent: "maroon", min: 1,  max: 12,  step: 1,  def: 6,  unit: "mo" },
  { id: "rooms",    label: "Room Preference",      accent: "maroon", min: 1,  max: 3,   step: 1,  def: 2,  labels: ["Standard","Deluxe","Premium"] },
];

/* ── Metric cards ─────────────────────────────────────────────── */
type Metric = {
  category: string;
  label: string;
  getValue: (s: number, m: number, r: number) => string;
  positive: boolean;
};

const METRICS: Metric[] = [
  {
    category: "Students",
    label: "Study Productivity",
    getValue: (s, m, r) => `+${Math.min(38 + r * 5 + Math.round(m * 1.2), 58)}%`,
    positive: true,
  },
  {
    category: "Community",
    label: "Peer Network Growth",
    getValue: (s) => `+${Math.min(Math.round(s / 4), 52)}`,
    positive: true,
  },
  {
    category: "Safety",
    label: "Security Incidents",
    getValue: () => `−100%`,
    positive: true,
  },
  {
    category: "Students",
    label: "Satisfaction Score",
    getValue: (s, m, r) => `+${Math.min(12 + r * 3, 22)}%`,
    positive: true,
  },
  {
    category: "Wellness",
    label: "Healthy Meals / Day",
    getValue: () => `+3`,
    positive: true,
  },
  {
    category: "Academics",
    label: "Focus Hours Gained",
    getValue: (s, m, r) => `+${Math.min(2 + r, 4)}h`,
    positive: true,
  },
];

/* ── Sub-components ───────────────────────────────────────────── */
function StepControl({
  value, min, max, step,
  onChange,
  label,
  unit,
  labelMap,
}: {
  value: number; min: number; max: number; step: number;
  onChange: (v: number) => void;
  label: string; unit?: string; labelMap?: string[];
}) {
  const dec = () => onChange(Math.max(min, value - step));
  const inc = () => onChange(Math.min(max, value + step));
  const display = labelMap ? labelMap[value - 1] : `${value}${unit ? ` ${unit}` : ""}`;

  return (
    <div className="flex items-center justify-between gap-4 py-5 border-b border-hairline group">
      <span className="text-sm md:text-base text-foreground/50 group-hover:text-foreground/80 transition-colors duration-300 tracking-wide">
        {label}
      </span>
      <div className="flex items-center gap-0 flex-shrink-0">
        <button
          onClick={dec}
          className="w-9 h-9 rounded-full border border-hairline flex items-center justify-center text-foreground/50 hover:border-maroon hover:text-maroon transition-all duration-300 text-sm font-bold"
        >−</button>
        <span className="w-24 text-center font-display text-lg md:text-xl text-foreground tracking-tight">
          {display}
        </span>
        <button
          onClick={inc}
          className="w-9 h-9 rounded-full border border-hairline flex items-center justify-center text-foreground/50 hover:border-maroon hover:text-maroon transition-all duration-300 text-sm font-bold"
        >+</button>
      </div>
    </div>
  );
}

function MetricCard({
  metric, students, months, rooms, index,
}: {
  metric: Metric; students: number; months: number; rooms: number; index: number;
}) {
  const valRef = useRef<HTMLDivElement>(null);
  const prevVal = useRef("");

  useEffect(() => {
    const next = metric.getValue(students, months, rooms);
    if (next !== prevVal.current && valRef.current) {
      gsap.fromTo(valRef.current,
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.45, ease: "expo.out" }
      );
      prevVal.current = next;
    }
  }, [students, months, rooms, metric]);

  return (
    <div
      className="ic-card relative flex flex-col justify-between p-5 md:p-6 rounded-xl border border-hairline bg-foreground/[0.03] hover:bg-foreground/[0.06] hover:border-foreground/20 transition-all duration-500 overflow-hidden group"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-xl"
        style={{ background: "radial-gradient(circle at 50% 0%, hsl(var(--maroon)/0.12) 0%, transparent 70%)" }}
      />

      {/* Category label */}
      <div className="flex items-center justify-between mb-4">
        <span className="eyebrow text-foreground/35 tracking-[0.2em]">{metric.category}</span>
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(var(--maroon))" }} />
      </div>

      {/* Label */}
      <p className="text-foreground/70 text-sm leading-snug mb-5 uppercase tracking-wider font-medium">
        {metric.label}
      </p>

      {/* Value */}
      <div
        ref={valRef}
        className="font-display text-3xl md:text-4xl leading-none tracking-tighter"
        style={{ color: "hsl(var(--maroon))" }}
      >
        {metric.getValue(students, months, rooms)}
      </div>
    </div>
  );
}

/* ── Main Export ──────────────────────────────────────────────── */
export function ImpactCalc() {
  const root = useRef<HTMLElement>(null);
  const [students, setStudents] = useState(60);
  const [months,   setMonths]   = useState(6);
  const [rooms,    setRooms]    = useState(2);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Eyebrow + headline */
      gsap.from(".ic-head", {
        opacity: 0, y: 40, duration: 1.3, ease: "expo.out", stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: "top 78%" },
      });
      /* Left panel */
      gsap.from(".ic-left", {
        opacity: 0, x: -40, duration: 1.3, ease: "expo.out",
        scrollTrigger: { trigger: ".ic-left", start: "top 82%" },
      });
      /* Cards */
      gsap.from(".ic-card", {
        opacity: 0, y: 36, duration: 1, ease: "expo.out", stagger: 0.08,
        scrollTrigger: { trigger: ".ic-grid", start: "top 82%" },
      });
      /* Bg glow */
      gsap.from(".ic-glow", {
        opacity: 0, scale: 0.6, duration: 2, ease: "power2.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative w-full overflow-hidden border-t border-hairline"
    >
      {/* Background warm glow */}
      <div
        className="ic-glow absolute right-0 top-0 w-[60vw] h-[70vh] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 80% 30%, hsl(var(--maroon)/0.18) 0%, hsl(20 60% 25%/0.10) 45%, transparent 72%)",
        }}
      />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 20% 80%, hsl(var(--maroon)/0.08) 0%, transparent 60%)",
      }} />

      <div className="relative z-10 px-5 md:px-12 xl:px-20 py-20 md:py-28">

        {/* ── Header ── */}
        <div className="max-w-2xl mb-16 md:mb-20">
          <div className="ic-head flex items-center gap-3 mb-6">
            <span className="block h-px w-8" style={{ background: "hsl(var(--maroon))" }} />
            <span className="eyebrow tracking-[0.25em]" style={{ color: "hsl(var(--maroon))" }}>
              Impact Calculator
            </span>
          </div>
          <h2 className="ic-head font-display text-4xl md:text-5xl xl:text-6xl leading-tight tracking-tighter">
            Discover how Aryan Heights{" "}
            <span className="italic text-foreground/40">transforms</span> your
            student life
          </h2>
          <p className="ic-head mt-6 text-foreground/55 text-base md:text-lg leading-relaxed max-w-xl">
            Adjust the inputs on the left to see how our hostel community,
            facilities, and support system impact your daily academic life.
          </p>
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-start">

          {/* Left: Controls */}
          <div className="ic-left flex flex-col gap-0">

            {/* Sliders */}
            <StepControl
              value={students} min={10} max={200} step={10}
              onChange={setStudents} label="Number of Students"
            />
            <StepControl
              value={months} min={1} max={12} step={1}
              onChange={setMonths} label="Duration of Stay" unit="mo"
            />
            <StepControl
              value={rooms} min={1} max={3} step={1}
              onChange={setRooms} label="Room Preference"
              labelMap={["Standard", "Deluxe", "Premium"]}
            />

            {/* Bottom note */}
            <div className="mt-10 flex items-start gap-3 p-5 rounded-xl border border-hairline bg-foreground/[0.02]">
              <div
                className="mt-1 flex-shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center"
                style={{ borderColor: "hsl(var(--maroon))" }}
              >
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(var(--maroon))" }} />
              </div>
              <p className="text-sm text-foreground/50 leading-relaxed">
                Students thrive in a structured, warden-monitored, all-inclusive
                environment designed for focused academic performance.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-8 flex items-center gap-4 flex-wrap">
              <a
                href="/contact"
                className="group relative flex items-center gap-4 px-8 py-4 rounded-full border border-hairline overflow-hidden hover:border-transparent transition-colors duration-500"
              >
                <div
                  className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                  style={{ background: "hsl(var(--maroon))", transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
                />
                <span className="relative z-10 eyebrow text-foreground group-hover:text-white tracking-[0.2em] transition-colors duration-300">
                  Book a Room Visit
                </span>
                <span className="relative z-10 text-foreground group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                  →
                </span>
              </a>
            </div>
          </div>

          {/* Right: Metric Cards */}
          <div className="ic-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
            {METRICS.map((m, i) => (
              <MetricCard
                key={m.label}
                metric={m}
                students={students}
                months={months}
                rooms={rooms}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
