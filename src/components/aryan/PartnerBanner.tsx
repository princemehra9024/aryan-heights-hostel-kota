import { Link } from "react-router-dom";

export const PartnerBanner = () => {
  return (
    <div className="w-full bg-maroon/5 border-y border-hairline py-3 md:py-4 overflow-hidden relative group">
      {/* Subtle hover effect background */}
      <div className="absolute inset-0 bg-maroon translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
      
      <div className="max-w-[1700px] mx-auto px-5 md:px-8 relative z-10 flex flex-col md:flex-row items-center justify-center md:justify-between gap-2 md:gap-6">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-maroon group-hover:bg-white transition-colors duration-500" />
          <span className="eyebrow text-foreground/80 group-hover:text-white transition-colors duration-500">
            For Property Owners
          </span>
        </div>
        
        <Link 
          to="/partner" 
          className="font-display text-sm md:text-lg tracking-wide text-foreground group-hover:text-white transition-colors duration-500 flex items-center gap-3"
        >
          Looking to lease your property? Partner with Kota's most trusted operator.
          <span className="inline-block group-hover:translate-x-1 transition-transform duration-500">
            &rarr;
          </span>
        </Link>
      </div>
    </div>
  );
};
