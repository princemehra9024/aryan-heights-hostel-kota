import { SEO } from "@/components/aryan/SEO";
import { Footer } from "@/components/aryan/Footer";
import { Nav } from "@/components/aryan/Nav";
import { useEffect } from "react";

export default function Disclaimer() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-200">
      <SEO 
        title="Disclaimer | Aryan Heights Hostel Kota" 
        description="Disclaimer for the Aryan Heights Hostel website and informational content." 
      />
      <Nav />
      <main className="pt-32 pb-20 container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-4xl font-cinzel font-bold text-white mb-8">Disclaimer</h1>
        
        <div className="space-y-6 text-neutral-300">
          <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. General Information</h2>
            <p>The information provided by Aryan Heights Hostel ("we," "us," or "our") on https://aryanheights.in/ (the "Site") is for general informational purposes only. All information on the Site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. External Links Disclaimer</h2>
            <p>The Site may contain (or you may be sent through the Site) links to other websites or content belonging to or originating from third parties or links to websites and features in banners or other advertising. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.</p>
            <p className="mt-2">We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any information offered by third-party websites linked through the site or any website or feature linked in any banner or other advertising.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Educational/Coaching Advice Disclaimer</h2>
            <p>Any information related to coaching institutes (such as Allen, Resonance, etc.), exams (JEE, NEET), or study strategies provided on our Blog or website is for informational purposes only. We are an independent accommodation provider and are not officially affiliated with, endorsed by, or partnered with any specific coaching institute mentioned on the site.</p>
            <p className="mt-2">Students and parents should independently verify admission details, schedules, and exam requirements directly with the respective institutes or official examining bodies.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Advertising Disclaimer</h2>
            <p>This Site may contain advertisements and sponsored links. The appearance of advertisements and product or service information does not constitute an endorsement by Aryan Heights Hostel, and we have not investigated the claims made by any advertiser.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
