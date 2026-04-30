import { Link } from "react-router-dom";
import footerBg from "@/assets/footer-bg.png";
import { Mail, Facebook, Instagram, Navigation, Phone, Globe, CreditCard } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative bg-[#101413] text-[#e2e8f0] font-sans pt-64 sm:pt-80 lg:pt-96 overflow-hidden">
      {/* Background Image Layer */}
      <div 
        className="absolute top-0 left-0 w-full h-[500px] pointer-events-none"
        style={{
          backgroundImage: `url(${footerBg})`,
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
          maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
        }}
      />
      {/* Fallback gradient if mask isn't enough to blend the bottom */}
      <div className="absolute top-0 left-0 w-full h-[500px] pointer-events-none bg-gradient-to-b from-transparent via-[#101413]/50 to-[#101413]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 pb-8">
        
        {/* Main Content Grid */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-8 mb-16">
          
          {/* Left Side: 3 Columns of Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 w-full lg:w-1/2">
            
            {/* Col 1 */}
            <div>
              <h4 className="text-white font-bold text-lg mb-2">Links</h4>
              <div className="w-full h-px bg-white/20 mb-4" />
              <ul className="flex flex-col gap-2 text-sm font-medium text-white/80">
                <li><a href="/#about" className="hover:text-white transition-colors">About us</a></li>
                <li><a href="/#facilities" className="hover:text-white transition-colors">Facilities</a></li>
                <li><Link to="/rooms" className="hover:text-white transition-colors">Rooms & Pricing</Link></li>
                <li><a href="/#gallery" className="hover:text-white transition-colors">Gallery</a></li>
              </ul>
            </div>

            {/* Col 2 */}
            <div>
              <h4 className="text-white font-bold text-lg mb-2">Links</h4>
              <div className="w-full h-px bg-white/20 mb-4" />
              <ul className="flex flex-col gap-2 text-sm font-medium text-white/80">
                <li><a href="#" className="hover:text-white transition-colors">Student Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Our Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Parents Portal</a></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <h4 className="text-white font-bold text-lg mb-2">Links</h4>
              <div className="w-full h-px bg-white/20 mb-4" />
              <ul className="flex flex-col gap-2 text-sm font-medium text-white/80">
                <li><a href="#" className="hover:text-white transition-colors">House Rules</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
              </ul>
            </div>

          </div>

          {/* Social Icons (Middle-Right area on desktop) */}
          <div className="flex gap-4 lg:self-end lg:mb-2">
            <a href="#" className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center hover:bg-white hover:text-[#101413] transition-all">
              <Mail size={16} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center hover:bg-white hover:text-[#101413] transition-all">
              <Facebook size={16} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center hover:bg-white hover:text-[#101413] transition-all">
              <Instagram size={16} />
            </a>
          </div>

          {/* Right Side: Contact Info */}
          <div className="text-left lg:text-right w-full lg:w-auto">
            <h3 className="text-white font-bold text-xl mb-3">AryanHeights.in</h3>
            <ul className="flex flex-col gap-1.5 text-sm font-medium text-white/80">
              <li className="flex items-center lg:justify-end gap-2">
                123 Allen Road, Rajiv Gandhi Nagar <Navigation size={12} className="hidden lg:block"/>
              </li>
              <li className="flex items-center lg:justify-end gap-2">
                Kota, Rajasthan 324005 <Navigation size={12} className="hidden lg:block"/>
              </li>
              <li className="flex items-center lg:justify-end gap-2">
                tel: +91 98290 00000 <Phone size={12} className="hidden lg:block"/>
              </li>
              <li className="flex items-center lg:justify-end gap-2">
                email: support@aryanheights.in <Mail size={12} className="hidden lg:block"/>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="text-white font-bold text-2xl tracking-tight flex items-center gap-1">
              AryanHeights <span className="text-[10px] align-top">©</span>
            </div>
            
            <div className="flex gap-4 text-xs font-medium text-white/80">
              <a href="#" className="hover:text-white transition-colors">House Rules</a>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
            </div>
          </div>

          <div className="flex gap-2 items-center opacity-60">
             {/* Simulating Payment Logos */}
             <div className="bg-red-500/80 w-8 h-5 rounded flex items-center justify-center text-[8px] font-bold text-white">M/C</div>
             <div className="bg-blue-600/80 w-8 h-5 rounded flex items-center justify-center text-[8px] font-bold text-white italic">VISA</div>
             <div className="bg-sky-500/80 w-8 h-5 rounded flex items-center justify-center"><CreditCard size={12}/></div>
          </div>

          <div className="text-xs text-white/60 text-center md:text-right">
            Coded and designed by AryanHeights. All rights reserved.
          </div>

        </div>
      </div>
    </footer>
  );
};
