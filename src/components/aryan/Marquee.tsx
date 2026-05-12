const items = ["Premium Living", "Allen · Resonance · Vibrant", "Single & Twin Sharing", "Home-style Mess", "24×7 Security", "Study Area", "Power Backup", "Wi-Fi 300 Mbps"];
export const Marquee = () => (
  <section className="py-6 border-y border-hairline overflow-hidden">
    <div className="marquee-track eyebrow text-foreground/70">
      {[...items, ...items, ...items].map((t, i) => (
        <span key={i} className="flex items-center gap-16">
          {t} <span className="w-2 h-2 rounded-full bg-maroon" />
        </span>
      ))}
    </div>
  </section>
);
