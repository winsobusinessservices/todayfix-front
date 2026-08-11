import React from "react";
import SEO from "../components/seo/SEO";
import { Link } from "react-router";

const RefundPolicy = () => {
  return (
    <main className="min-h-screen bg-surface-secondary font-sans pb-24">
      <SEO 
        title="Refund Policy | TodayFix"
        description="Learn about TodayFix's refund policy, how to request a refund, and our satisfaction guarantee."
      />
      
      {/* Header */}
      <section className="pt-32 pb-16 px-6 bg-surface-primary border-b border-border-primary">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight mb-4">
            Refund Policy
          </h1>
          <p className="text-text-secondary font-medium">
            Our commitment to your satisfaction.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto bg-surface-primary rounded-[2rem] border border-border-primary p-8 md:p-12 shadow-sm">
          <div className="space-y-8 text-text-secondary leading-relaxed font-medium">
            
            <div>
              <p className="mb-4">
                We strive to connect you with the best professionals in your city. However, we understand that sometimes things don't go as planned.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-4">1. TodayFix Guarantee</h2>
              <p className="mb-4">
                If the service delivered significantly deviates from the agreed scope, or if damage is caused during the provision of the service, you may be eligible for a refund or compensation under the TodayFix Guarantee.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-4">2. Eligibility for Refunds</h2>
              <p className="mb-4">You may request a refund if:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The professional did not arrive for the scheduled service.</li>
                <li>The service was not completed as agreed upon.</li>
                <li>You cancelled within the free cancellation window, but a charge was mistakenly applied.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-4">3. How to Request a Refund</h2>
              <p className="mb-4">
                All refund requests must be submitted within <strong>48 hours</strong> of the service completion time.
              </p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Navigate to your Bookings page.</li>
                <li>Select the relevant booking and click "Report Issue".</li>
                <li>Provide a detailed description of the issue along with any supporting photos.</li>
              </ol>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-4">4. Refund Processing Time</h2>
              <p className="mb-4">
                Approved refunds are processed immediately on our end. However, depending on your bank or payment provider, it may take 5-7 business days for the funds to reflect in your account.
              </p>
            </div>

            <hr className="border-border-secondary my-8" />

            <div className="text-sm">
              <p>
                Need assistance with a specific booking? <Link to="/contact" className="text-text-primary font-bold hover:underline">Contact Support</Link>.
              </p>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
};

export default RefundPolicy;
