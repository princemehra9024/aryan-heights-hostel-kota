import { SEO } from "@/components/aryan/SEO";
import { Footer } from "@/components/aryan/Footer";
import { Nav } from "@/components/aryan/Nav";
import { useEffect } from "react";

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-200">
      <SEO 
        title="Privacy Policy | Aryan Heights Hostel Kota" 
        description="Privacy policy and data handling practices for Aryan Heights Hostel, Kota." 
      />
      <Nav />
      <main className="pt-32 pb-20 container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-4xl font-cinzel font-bold text-white mb-8">Privacy Policy</h1>
        
        <div className="space-y-6 text-neutral-300">
          <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
            <p>At Aryan Heights Hostel, we collect information that you provide directly to us when making inquiries, booking a room, or communicating with us. This may include your name, email address, phone number, and any other information you choose to provide.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Respond to your inquiries and requests</li>
              <li>Process room bookings and manage your stay</li>
              <li>Send you administrative messages and hostel updates</li>
              <li>Improve our website and hostel services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Log Data and Analytics</h2>
            <p>Like many site operators, we collect information that your browser sends whenever you visit our site ("Log Data"). This may include information such as your computer's Internet Protocol ("IP") address, browser type, browser version, the pages of our site that you visit, the time and date of your visit, and other statistics.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Cookies and Advertising</h2>
            <p>We use cookies to enhance your experience on our website. We may also partner with third-party advertising networks (like Google AdSense) to display advertising on our website. These third parties may use cookies, web beacons, and similar technologies to collect information about your activities on this and other websites to provide you targeted advertising based upon your interests.</p>
            <p className="mt-2">Google, as a third-party vendor, uses cookies to serve ads on our site. Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <p className="mt-2 font-semibold">Email: aryanheightskota@gmail.com</p>
            <p className="font-semibold">Phone: +91-94141-41723</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
