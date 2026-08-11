import React from "react";
import SEO from "../components/seo/SEO";
import { Link } from "react-router";

const Privacy = () => {
  return (
    <main className="min-h-screen bg-surface-secondary font-sans pb-24">
      <SEO 
        title="Privacy Policy | TodayFix"
        description="Learn how TodayFix collects, uses, and protects your personal data. We are committed to your privacy and security."
      />
      
      {/* Header */}
      <section className="pt-32 pb-16 px-6 bg-surface-primary border-b border-border-primary">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-text-secondary font-medium">
            Last Updated: August 11, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto bg-surface-primary rounded-[2rem] border border-border-primary p-8 md:p-12 shadow-sm">
          <div className="space-y-8 text-text-secondary leading-relaxed font-medium">
            
            <div>
              <p className="mb-4">
                At TodayFix, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our platform or use our services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-4">1. Information We Collect</h2>
              <p className="mb-4">We collect information that you provide directly to us, including:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Personal Data:</strong> Name, email address, phone number, and physical address.</li>
                <li><strong>Payment Information:</strong> Credit card details and billing address (processed securely by our payment partners).</li>
                <li><strong>Profile Data:</strong> Profile pictures, reviews, and communications with professionals.</li>
              </ul>
              <p>We also automatically collect certain technical data when you use the app, such as IP addresses, device identifiers, and browsing history on our site.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-4">2. How We Use Your Information</h2>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide, maintain, and improve our services.</li>
                <li>Process transactions and send related information.</li>
                <li>Match customers with the right local professionals.</li>
                <li>Respond to customer service requests and support needs.</li>
                <li>Send technical notices, updates, and security alerts.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-4">3. Sharing Your Information</h2>
              <p className="mb-4">
                We share your information with the Professionals you book so they can fulfill the service (e.g., your address and phone number). We do not sell your personal data to third-party data brokers.
              </p>
              <p>
                We may share data with service providers (like payment processors and cloud hosting platforms) who need access to such information to carry out work on our behalf.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-4">4. Data Security</h2>
              <p className="mb-4">
                We implement a variety of security measures to maintain the safety of your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-4">5. Your Rights</h2>
              <p className="mb-4">
                Depending on your location, you may have the right to request access to, correction of, or deletion of your personal data. You can manage most of this directly from your account settings.
              </p>
            </div>

            <hr className="border-border-secondary my-8" />

            <div className="text-sm">
              <p>
                If you have questions about this Privacy Policy, please <Link to="/contact" className="text-text-primary font-bold hover:underline">contact our Data Protection Officer</Link>.
              </p>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
};

export default Privacy;
