import React from "react";
import SEO from "../components/seo/SEO";
import { Link } from "react-router";

const HelpCenter = () => {
  return (
    <main className="min-h-screen bg-surface-secondary font-sans pb-24">
      <SEO 
        title="Help Center | TodayFix"
        description="Get support, find answers to your questions, and learn how to make the most of TodayFix."
      />
      
      {/* Header */}
      <section className="pt-32 pb-24 px-6 bg-surface-primary border-b border-border-primary text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black text-text-primary tracking-tight mb-6">
            How can we help?
          </h1>
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text" 
              placeholder="Search for articles, guides, or FAQs..." 
              className="w-full bg-surface-secondary border border-border-primary rounded-full py-4 pl-12 pr-4 focus:outline-none focus:border-black focus:ring-4 focus:ring-black/10 transition-all font-medium placeholder-slate-400 text-lg shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-text-primary mb-8 text-center">Browse by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <Link to="/faq" className="bg-surface-primary p-6 rounded-2xl border border-border-primary hover:border-black hover:shadow-md transition-all group">
            <div className="w-12 h-12 bg-surface-secondary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-lg text-text-primary mb-2 group-hover:underline">General FAQs</h3>
            <p className="text-text-secondary text-sm font-medium">Answers to common questions about booking, accounts, and payments.</p>
          </Link>

          <Link to="/safety" className="bg-surface-primary p-6 rounded-2xl border border-border-primary hover:border-black hover:shadow-md transition-all group">
            <div className="w-12 h-12 bg-surface-secondary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-bold text-lg text-text-primary mb-2 group-hover:underline">Trust & Safety</h3>
            <p className="text-text-secondary text-sm font-medium">Learn about our screening process, guarantees, and secure payments.</p>
          </Link>

          <Link to="/professionals/faq" className="bg-surface-primary p-6 rounded-2xl border border-border-primary hover:border-black hover:shadow-md transition-all group">
            <div className="w-12 h-12 bg-surface-secondary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-bold text-lg text-text-primary mb-2 group-hover:underline">For Professionals</h3>
            <p className="text-text-secondary text-sm font-medium">Guides on managing your business, growing revenue, and platform tools.</p>
          </Link>

          <Link to="/cancellation-policy" className="bg-surface-primary p-6 rounded-2xl border border-border-primary hover:border-black hover:shadow-md transition-all group">
            <div className="w-12 h-12 bg-surface-secondary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-lg text-text-primary mb-2 group-hover:underline">Cancellations & Refunds</h3>
            <p className="text-text-secondary text-sm font-medium">Everything you need to know about modifying bookings or requesting refunds.</p>
          </Link>

        </div>
      </section>

      {/* Contact Banner */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto bg-surface-dark text-text-inverted rounded-[2rem] p-10 md:p-14 text-center shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-black mb-4">Can't find what you're looking for?</h2>
            <p className="text-zinc-300 font-medium mb-8 max-w-lg mx-auto">Our support team is available 24/7 to help you with any issues.</p>
            <Link to="/contact" className="inline-block px-8 py-4 bg-white text-surface-dark rounded-full font-bold shadow-md hover:bg-zinc-100 transition-colors">
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HelpCenter;
