const track1 = [
  { text: "Premium Living", dot: true },
  { text: "Allen · Resonance · Vibrant", dot: true },
  { text: "Since 2010", dot: true },
  { text: "Single & Twin Sharing", dot: true },
  { text: "Home-style Mess", dot: true },
  { text: "24×7 Security", dot: true },
  { text: "Study Area", dot: true },
  { text: "Power Backup", dot: true },
  { text: "Wi-Fi 300 Mbps", dot: true },
  { text: "In-house Gym", dot: true },
];

const track2 = [
  { text: "Indra Vihar · Kota", dot: true },
  { text: "Biometric Entry", dot: true },
  { text: "RO Drinking Water", dot: true },
  { text: "Daily Housekeeping", dot: true },
  { text: "Attached Bathroom", dot: true },
  { text: "Laundry Service", dot: true },
  { text: "Medical Support", dot: true },
  { text: "CCTV Monitored", dot: true },
  { text: "Transport to Coaching", dot: true },
  { text: "Hot Water 24×7", dot: true },
];

export const Marquee = () => (
  <section className="py-5 border-y border-hairline overflow-hidden relative select-none">
    {/* Fade edges */}
    <div className="pointer-events-none absolute left-0 top-0 h-full w-16 md:w-28 z-10"
      style={{ background: "linear-gradient(to right, hsl(var(--bg)), transparent)" }} />
    <div className="pointer-events-none absolute right-0 top-0 h-full w-16 md:w-28 z-10"
      style={{ background: "linear-gradient(to left, hsl(var(--bg)), transparent)" }} />

    {/* Track 1 — left scroll */}
    <div className="marquee-track eyebrow text-foreground/60 mb-3">
      {[...track1, ...track1].map((item, i) => (
        <span key={i} className="flex items-center gap-5 shrink-0">
          {item.text}
          <span className="w-1.5 h-1.5 rounded-full bg-maroon/70 shrink-0" />
        </span>
      ))}
    </div>

    {/* Track 2 — right scroll (reverse) */}
    <div className="marquee-track-reverse eyebrow text-foreground/35">
      {[...track2, ...track2].map((item, i) => (
        <span key={i} className="flex items-center gap-5 shrink-0">
          {item.text}
          <span className="w-1 h-1 rounded-full bg-foreground/25 shrink-0" />
        </span>
      ))}
    </div>
  </section>
);
