import { Link } from "react-router-dom";
import dayVideo from "@/assets/day-footer.mp4";
import nightVideo from "@/assets/nigh-footert.mp4";
import { Mail, Facebook, Instagram, Navigation, Phone, Globe, CreditCard } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export const Footer = () => {
  const { theme } = useTheme();
  const isDayTime = theme === "light";

  const textColor = isDayTime ? "text-slate-900" : "text-white";
  const textMuted = isDayTime ? "text-slate-700" : "text-white/80";
  const textMutedHover = isDayTime ? "hover:text-slate-900" : "hover:text-white";
  const borderColor = isDayTime ? "border-slate-300" : "border-white/20";
  const bgMuted = isDayTime ? "bg-slate-300" : "bg-white/20";
  const iconBorder = isDayTime ? "border-slate-400 hover:bg-slate-900 hover:text-white text-slate-700" : "border-white/40 hover:bg-white hover:text-[#101413]";

  return (
    <footer className={`relative font-sans min-h-[56.25vw] pt-20 sm:pt-28 overflow-hidden ${textColor} ${isDayTime ? 'bg-slate-50' : 'bg-[#101413]'}`}>
      {/* Background Video Layer */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        key={isDayTime ? 'day' : 'night'}
        className="absolute top-0 left-0 w-full h-full object-cover object-top pointer-events-none"
        src={isDayTime ? dayVideo : nightVideo}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 pb-8">
        
        {/* Main Content Grid */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-8 mb-16">
          
          {/* Left Side: 3 Columns of Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 w-full lg:w-1/2">
            
            {/* Col 1 */}
            <div>
              <h4 className="font-bold text-lg mb-2">Links</h4>
              <div className={`w-full h-px ${bgMuted} mb-4`} />
              <ul className={`flex flex-col gap-2 text-sm font-medium ${textMuted}`}>
                <li><a href="/#about" className={`${textMutedHover} transition-colors`}>About us</a></li>
                <li><a href="/#facilities" className={`${textMutedHover} transition-colors`}>Facilities</a></li>
                <li><Link to="/rooms" className={`${textMutedHover} transition-colors`}>Rooms & Pricing</Link></li>
                <li><a href="/#gallery" className={`${textMutedHover} transition-colors`}>Gallery</a></li>
              </ul>
            </div>

            {/* Col 2 */}
            <div>
              <h4 className="font-bold text-lg mb-2">Links</h4>
              <div className={`w-full h-px ${bgMuted} mb-4`} />
              <ul className={`flex flex-col gap-2 text-sm font-medium ${textMuted}`}>
                <li><a href="#" className={`${textMutedHover} transition-colors`}>Student Guide</a></li>
                <li><a href="#" className={`${textMutedHover} transition-colors`}>Our Blog</a></li>
                <li><a href="#" className={`${textMutedHover} transition-colors`}>Parents Portal</a></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <h4 className="font-bold text-lg mb-2">Links</h4>
              <div className={`w-full h-px ${bgMuted} mb-4`} />
              <ul className={`flex flex-col gap-2 text-sm font-medium ${textMuted}`}>
                <li><a href="#" className={`${textMutedHover} transition-colors`}>House Rules</a></li>
                <li><a href="#" className={`${textMutedHover} transition-colors`}>Privacy Policy</a></li>
                <li><a href="#" className={`${textMutedHover} transition-colors`}>Terms & Conditions</a></li>
              </ul>
            </div>

          </div>

          {/* Social Icons (Middle-Right area on desktop) */}
          <div className="flex gap-4 lg:self-end lg:mb-2">
            <a href="#" className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${iconBorder}`}>
              <Mail size={16} />
            </a>
            <a href="#" className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${iconBorder}`}>
              <Facebook size={16} />
            </a>
            <a href="#" className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${iconBorder}`}>
              <Instagram size={16} />
            </a>
          </div>

          {/* Right Side: Contact Info */}
          <div className="text-left lg:text-right w-full lg:w-auto">
            <h3 className="font-bold text-xl mb-3">Aryan Heights Boys Hostel</h3>
            <ul className={`flex flex-col gap-1.5 text-sm font-medium ${textMuted}`}>
              <li className="flex items-center lg:justify-end gap-2">
                A-723(A), Indra Vihar <Navigation size={12} className="hidden lg:block"/>
              </li>
              <li className="flex items-center lg:justify-end gap-2">
                Kota, Rajasthan <Navigation size={12} className="hidden lg:block"/>
              </li>
              <li className="flex items-center lg:justify-end gap-2">
                +91 94141 41723 <Phone size={12} className="hidden lg:block"/>
              </li>
              <li className="flex items-center lg:justify-end gap-2">
                +91 77374 77740 <Phone size={12} className="hidden lg:block"/>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`border-t ${borderColor} pt-6 flex flex-col md:flex-row justify-between items-center gap-6`}>
          
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="font-bold text-2xl tracking-tight flex items-center gap-1">
              AryanHeights <span className="text-[10px] align-top">©</span>
            </div>
            
            <div className={`flex gap-4 text-xs font-medium ${textMuted}`}>
              <a href="#" className={`${textMutedHover} transition-colors`}>House Rules</a>
              <a href="#" className={`${textMutedHover} transition-colors`}>Privacy Policy</a>
              <a href="#" className={`${textMutedHover} transition-colors`}>Terms & Conditions</a>
            </div>
          </div>

          <div className="flex gap-2 items-center opacity-80">
             {/* Simulating Payment Logos */}
             <div className="bg-red-500/90 w-8 h-5 rounded flex items-center justify-center text-[8px] font-bold text-white">M/C</div>
             <div className="bg-blue-600/90 w-8 h-5 rounded flex items-center justify-center text-[8px] font-bold text-white italic">VISA</div>
             <div className={`bg-sky-500/90 w-8 h-5 rounded flex items-center justify-center text-white`}><CreditCard size={12}/></div>
          </div>

          <div className={`text-xs ${isDayTime ? 'text-slate-500' : 'text-white/60'} text-center md:text-right`}>
            Coded and designed by AryanHeights. All rights reserved.
          </div>

        </div>
      </div>
    </footer>
  );
};
