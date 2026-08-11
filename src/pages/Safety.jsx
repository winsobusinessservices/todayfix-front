import React from "react";
import SEO from "../components/seo/SEO";
import { Link } from "react-router";

const Safety = () => {
  return (
    <main className="min-h-screen bg-surface-secondary font-sans pb-24">
      <SEO 
        title="Trust & Safety | TodayFix"
        description="Your safety is our top priority. Learn about our 5-step background checks and secure platform guarantees."
      />
      
      {/* Header */}
      <section className="pt-32 pb-24 px-6 bg-surface-primary border-b border-border-primary text-center">
        <div className="max-w-4xl mx-auto">
          <div className="w-16 h-16 bg-surface-secondary border border-border-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-text-primary tracking-tight mb-6">
            Safety comes first.
          </h1>
          <p className="text-lg md:text-xl text-text-secondary font-medium max-w-2xl mx-auto leading-relaxed">
            We don't just let anyone onto our platform. Every professional undergoes rigorous screening so you can book with absolute peace of mind.
          </p>
        </div>
      </section>

      {/* Safety Steps */}
      <section className="px-6 py-24 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-text-primary tracking-tight mb-10">
              The TodayFix <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-800">5-Step Check</span>
            </h2>
            <div className="space-y-8">
              {[
                { title: "Identity Verification", desc: "Government-issued ID checks and biometric verification." },
                { title: "Criminal Background Check", desc: "Comprehensive national and local criminal record scans." },
                { title: "Skills Assessment", desc: "Practical tests and credential verification for specialized trades." },
                { title: "In-Person Interviews", desc: "Behavioral and professionalism screening by our expert team." },
                { title: "Continuous Monitoring", desc: "Ongoing quality control based on customer reviews and ratings." }
              ].map((step, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0 mt-1">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text-primary mb-1">{step.title}</h3>
                    <p className="text-text-secondary font-medium leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-surface-primary p-8 md:p-12 rounded-[2rem] border border-border-primary shadow-xl">
            <h3 className="text-2xl font-bold text-text-primary mb-6">Secure Platform</h3>
            <div className="space-y-6">
              <div className="p-6 bg-surface-secondary rounded-2xl border border-border-primary">
                <h4 className="font-bold text-text-primary mb-2">Secure Payments</h4>
                <p className="text-sm text-text-secondary font-medium">All payments are processed securely. Professionals never see your credit card details, and cash transactions are prohibited.</p>
              </div>
              <div className="p-6 bg-surface-secondary rounded-2xl border border-border-primary">
                <h4 className="font-bold text-text-primary mb-2">Privacy Protection</h4>
                <p className="text-sm text-text-secondary font-medium">Your exact address is only shared with the professional once a booking is confirmed. We use phone masking to keep your number private.</p>
              </div>
              <div className="p-6 bg-surface-secondary rounded-2xl border border-border-primary">
                <h4 className="font-bold text-text-primary mb-2">24/7 Support</h4>
                <p className="text-sm text-text-secondary font-medium">Our Trust and Safety team is available around the clock to handle any emergencies or concerns during a service.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Safety;
