import { Link } from "react-router-dom";
import nightVideo from "@/assets/nigh-footert.mp4";
import { useTheme } from "@/context/ThemeContext";

const AnimatedLink = ({ href, text, className, textClass, isRouterLink = false }: { href: string, text: string, className?: string, textClass?: string, isRouterLink?: boolean }) => {
  const content = (
    <>
      <span className={`inline-block transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-[110%] ${textClass || ""}`}>{text}</span>
      <span className={`absolute left-0 top-0 md:top-1 inline-block transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] translate-y-[110%] group-hover:translate-y-0 text-maroon italic pr-4 ${textClass || ""}`}>{text}</span>
    </>
  );

  if (isRouterLink) {
    return (
      <Link to={href} className={`group relative overflow-hidden py-1 block w-fit ${className || ""}`}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} className={`group relative overflow-hidden py-1 block w-fit ${className || ""}`}>
      {content}
    </a>
  );
};

export const Footer = () => {
  const textColor = "text-[#E8E6E1]"; // Premium ivory/bone text
  const textMuted = "text-[#E8E6E1]/40";
  const bgOverlay = "bg-[#0a0c0b]/90"; 

  return (
    <footer className={`relative font-sans overflow-hidden ${textColor} bg-[#0a0c0b] z-20`}>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-infinite {
          animation: marquee 20s linear infinite;
          will-change: transform;
        }
        .brand-fill {
          clip-path: inset(100% 0 0 0);
          transition: clip-path 0.8s cubic-bezier(0.76, 0, 0.24, 1);
        }
        .group:hover .brand-fill {
          clip-path: inset(0 0 0 0);
        }
      `}</style>

      {/* Background Video Layer */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        preload="none"
        className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none opacity-30 mix-blend-overlay"
        src={nightVideo}
      />
      <div className={`absolute inset-0 ${bgOverlay} backdrop-blur-xl`}></div>

      <div className="relative z-10 w-full flex flex-col justify-between min-h-screen pt-12">
        
        {/* Top Marquee */}
        <div className="w-full overflow-hidden flex whitespace-nowrap border-y border-white/5 py-6 md:py-10 mb-16 md:mb-24">
          <div className="animate-marquee-infinite flex items-center">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="font-display text-4xl md:text-7xl tracking-tighter uppercase shrink-0 flex items-center">
                <span className="mx-8 md:mx-16 text-maroon italic">✦</span>
                YOUR FUTURE STARTS HERE
                <span className="mx-8 md:mx-16 text-maroon italic">✦</span>
                KOTA'S FINEST LIVING
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-[1700px] w-full mx-auto px-6 md:px-12 flex-1 flex flex-col justify-center">
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-8 mb-24 md:mb-32">
            
            {/* Left: Navigation Links with Premium Hover */}
            <div className="md:col-span-6 flex flex-col justify-between">
              <div className="flex flex-col gap-4 md:gap-2">
                {[
                  { name: "About", path: "/#about" },
                  { name: "Rooms", path: "/rooms", isRouter: true },
                  { name: "Gallery", path: "/#gallery" },
                  { name: "Portfolio", path: "/#properties" },
                  { name: "Contact", path: "/contact", isRouter: true }
                ].map((link) => (
                  <AnimatedLink 
                    key={link.name} 
                    href={link.path} 
                    text={link.name} 
                    isRouterLink={link.isRouter}
                    className={`font-display text-[14vw] sm:text-6xl md:text-[7rem] leading-[0.85] tracking-tighter uppercase ${textMuted} hover:text-white transition-colors`}
                    textClass="w-full"
                  />
                ))}
              </div>
              <p className={`font-display text-2xl md:text-4xl mt-12 md:mt-24 ${textColor} tracking-tight leading-tight max-w-lg`}>
                A Safe, Disciplined & Study-Focused Environment for Students.
              </p>
            </div>

            {/* Right: Contact & Enquiries */}
            <div className="md:col-span-6 flex flex-col sm:flex-row gap-12 md:gap-24 md:justify-end md:mt-4">
              <div>
                <h4 className={`font-bold text-[0.65rem] tracking-[0.2em] uppercase mb-6 ${textMuted}`}>Business Enquiries</h4>
                <AnimatedLink 
                  href="mailto:info@aryanheights.com" 
                  text="info@aryanheights.com" 
                  className={`font-display text-2xl md:text-3xl text-white/80 hover:text-white transition-colors mb-2`}
                />
                <AnimatedLink 
                  href="tel:+917737477740" 
                  text="+91 77374 77740" 
                  className={`font-display text-2xl md:text-3xl text-white/80 hover:text-white transition-colors`}
                />
                <div className="mt-8 mb-4">
                  <a href="https://wa.me/917737477740" className="group/wa inline-flex items-center gap-3 bg-white text-black px-6 py-3.5 rounded-full text-[0.65rem] font-bold tracking-[0.18em] uppercase transition-all duration-300 hover:bg-[#25D366] hover:text-white">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.662-2.062-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                    </svg>
                    WhatsApp Us
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover/wa:translate-x-1">
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </a>
                </div>
                <div className="mt-12">
                  <h4 className={`font-bold text-[0.65rem] tracking-[0.2em] uppercase mb-6 ${textMuted}`}>Socials</h4>
                  <div className="flex flex-col gap-2">
                    {["Instagram", "Facebook", "Twitter", "LinkedIn"].map(social => (
                      <AnimatedLink 
                        key={social} 
                        href="#" 
                        text={social} 
                        className={`font-display text-xl uppercase tracking-widest text-white/80 hover:text-white transition-colors`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h4 className={`font-bold text-[0.65rem] tracking-[0.2em] uppercase mb-6 ${textMuted}`}>Location</h4>
                <p className="font-display text-2xl md:text-3xl leading-tight">
                  A-723(A), Indra Vihar<br />
                  Kota, Rajasthan<br />
                  324005
                </p>
                <div className="mt-8">
                  <AnimatedLink 
                    href="https://maps.google.com" 
                    text="View on Map" 
                    className={`font-bold text-[0.65rem] tracking-[0.2em] uppercase text-maroon hover:text-white transition-colors`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="w-full flex flex-col items-center">
          
          <div className="w-full px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[0.65rem] uppercase font-bold tracking-widest text-[#E8E6E1]/30 mb-8">
            <div className="flex items-center gap-3">
              <span>© 2026</span>
              <span>All rights reserved</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <AnimatedLink href="/rooms" text="Rooms" isRouterLink={true} className="hover:text-white transition-colors" />
              <span>•</span>
              <AnimatedLink href="/#properties" text="Portfolio" className="hover:text-white transition-colors" />
              <span>•</span>
              <AnimatedLink href="/contact" text="Contact" isRouterLink={true} className="hover:text-white transition-colors" />
              <span>•</span>
              <AnimatedLink href="/policies" text="Policies" isRouterLink={true} className="hover:text-white transition-colors" />
              <span>•</span>
              <AnimatedLink href="/#about" text="About" className="hover:text-white transition-colors" />
            </div>
          </div>

          {/* Gigantic Brand Name with Outline Hover */}
          <div className="w-full overflow-hidden leading-none flex justify-center items-end px-4 pb-4">
            <h1 className="font-display text-[11vw] lg:text-[11.5vw] leading-[0.75] tracking-tighter text-[#E8E6E1] whitespace-nowrap text-center opacity-90 transition-all duration-500 hover:text-transparent hover:[-webkit-text-stroke:2px_#E8E6E1] cursor-crosshair">
              ARYAN HEIGHTS
            </h1>
          </div>

        </div>

      </div>
    </footer>
  );
};
