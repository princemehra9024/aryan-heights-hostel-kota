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
        
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <span className="font-display text-sm md:text-lg tracking-wide text-foreground group-hover:text-white transition-colors duration-500">
            Looking to lease your property? Partner with Kota's most trusted operator.
          </span>
          <Link 
            to="/partner" 
            className="bg-maroon/90 text-white px-5 py-2 md:px-6 md:py-2.5 rounded-full font-display text-sm md:text-base tracking-wider flex items-center gap-2 hover:bg-maroon transition-all shadow-lg hover:shadow-maroon/20 hover:-translate-y-0.5"
          >
            Lease Now
            <span className="inline-block group-hover:translate-x-1 transition-transform duration-500">
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
