import React from "react";
import SEO from "../components/seo/SEO";

const CancellationPolicy = () => {
  return (
    <main className="min-h-screen bg-surface-secondary font-sans pb-24">
      <SEO 
        title="Cancellation Policy | TodayFix"
        description="Review our cancellation policy to understand fees, timelines, and how to cancel a booked service on TodayFix."
      />
      
      {/* Header */}
      <section className="pt-32 pb-16 px-6 bg-surface-primary border-b border-border-primary">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight mb-4">
            Cancellation Policy
          </h1>
          <p className="text-text-secondary font-medium">
            Clear guidelines for when plans change.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto bg-surface-primary rounded-[2rem] border border-border-primary p-8 md:p-12 shadow-sm">
          <div className="space-y-8 text-text-secondary leading-relaxed font-medium">
            
            <div>
              <p className="mb-4">
                We understand that schedules can change. Our cancellation policy is designed to be fair to both our customers and our professional service providers who reserve their time for your job.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-4">Free Cancellation Period</h2>
              <p className="mb-4">
                You can cancel any booking free of charge up to <strong>24 hours before the scheduled service time</strong>. 
              </p>
              <p>
                To cancel a booking, simply navigate to your Dashboard, select the upcoming booking, and click "Cancel". The reserved amount will be released immediately (bank processing times may vary).
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-4">Late Cancellations</h2>
              <p className="mb-4">
                If you cancel a booking within 24 hours of the scheduled start time, a cancellation fee will apply to compensate the professional for their lost time.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Less than 24 hours but more than 4 hours:</strong> A fee of 15% of the total estimated service cost (or minimum ₹200) will be charged.</li>
                <li><strong>Less than 4 hours:</strong> A fee of 30% of the total estimated service cost (or minimum ₹500) will be charged.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-4">Professional Cancellations</h2>
              <p className="mb-4">
                In the rare event that a professional needs to cancel your booking, you will not be charged any fees. We will immediately attempt to match you with another highly-rated professional in your area at the same scheduled time.
              </p>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
};

export default CancellationPolicy;
