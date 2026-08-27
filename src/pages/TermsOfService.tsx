import { SEO } from "@/components/aryan/SEO";
import { Footer } from "@/components/aryan/Footer";
import { Nav } from "@/components/aryan/Nav";
import { useEffect } from "react";

export default function TermsOfService() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-200">
      <SEO 
        title="Terms of Service | Aryan Heights Hostel Kota" 
        description="Terms and conditions for using the Aryan Heights Hostel website and services." 
      />
      <Nav />
      <main className="pt-32 pb-20 container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-4xl font-cinzel font-bold text-white mb-8">Terms of Service</h1>
        
        <div className="space-y-6 text-neutral-300">
          <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p>By accessing and using the Aryan Heights Hostel website (https://aryanheights.in/), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this website's particular services, you shall be subject to any posted guidelines or rules applicable to such services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Hostel Rules and Regulations</h2>
            <p>Booking a room at Aryan Heights Hostel implies agreement to abide by all internal hostel rules, including but not limited to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Adherence to the stated curfew timings</li>
              <li>Respecting the quiet hours for study environments</li>
              <li>Following mess and dining hall rules</li>
              <li>Cooperating with biometric attendance systems</li>
            </ul>
            <p className="mt-2">Full details of hostel rules are provided upon admission.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Booking and Cancellation</h2>
            <p>Room availability on the website is subject to change. Final confirmation of a room is only guaranteed upon payment of the required advance deposit or booking fee. Cancellation policies apply as explicitly stated during the booking process or on the admission form.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Informational Content</h2>
            <p>The content on this website, including blog articles and guides, is for general informational purposes only. While we strive to keep information up to date regarding coaching institutes and Kota lifestyle, we make no representations or warranties of any kind about the completeness, accuracy, or reliability of this information.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. External Links</h2>
            <p>Our website may contain links to external sites that are not operated by us. If you click on a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy and terms of every site you visit. We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Changes to Terms</h2>
            <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will try to provide at least 30 days' notice prior to any new terms taking effect.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at:</p>
            <p className="mt-2 font-semibold">Email: aryanheightskota@gmail.com</p>
            <p className="font-semibold">Phone: +91-94141-41723</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
