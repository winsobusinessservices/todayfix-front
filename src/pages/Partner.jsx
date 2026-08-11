import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import SEO from "../components/seo/SEO";

const Partner = () => {
  return (
    <main className="min-h-screen bg-surface-secondary font-sans selection:bg-surface-dark selection:text-white pb-24">
      <SEO 
        title="Partner With Us | TodayFix"
        description="Grow your business by partnering with TodayFix. Gain access to thousands of customers looking for premium home services."
      />
      
      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6 bg-surface-primary border-b border-border-primary text-center">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-surface-secondary border border-border-primary text-xs font-bold uppercase tracking-widest text-text-secondary mb-6 shadow-sm">
            For Businesses
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-text-primary tracking-tighter leading-tight mb-6">
            Grow your business <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-900">
              with TodayFix.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary font-medium max-w-2xl mx-auto leading-relaxed mb-10">
            Join thousands of verified professionals who trust TodayFix to find quality leads, manage bookings, and scale their services.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/register" 
              className="w-full sm:w-auto px-8 py-4 bg-surface-dark text-text-inverted rounded-full font-bold transition-transform active:scale-95 shadow-lg shadow-black/10 text-center"
            >
              Apply to Partner
            </Link>
            <Link 
              to="/contact" 
              className="w-full sm:w-auto px-8 py-4 bg-surface-primary text-text-primary border border-border-secondary rounded-full font-bold transition-colors hover:bg-surface-secondary text-center"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-text-primary tracking-tight mb-4">Why Partner With Us?</h2>
          <p className="text-text-secondary text-lg font-medium">We provide the tools and visibility you need to succeed.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Quality Leads",
              desc: "Get access to customers who value premium service and are ready to book.",
              icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            },
            {
              title: "Business Tools",
              desc: "Manage your bookings, payments, and team all from one easy-to-use dashboard.",
              icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            },
            {
              title: "Trusted Brand",
              desc: "Benefit from the trust and credibility that the TodayFix brand brings to your services.",
              icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            }
          ].map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-surface-primary p-8 rounded-[2rem] border border-border-primary shadow-sm hover:shadow-lg transition-shadow text-center"
            >
              <div className="w-14 h-14 bg-surface-secondary border border-border-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-6 h-6 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={benefit.icon} />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">{benefit.title}</h3>
              <p className="text-text-secondary leading-relaxed font-medium">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="px-6 py-24 bg-surface-primary border-y border-border-primary">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-text-primary tracking-tight mb-4">How It Works</h2>
            <p className="text-text-secondary text-lg font-medium">Simple steps to start growing your business.</p>
          </div>
          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
            {[
              { step: "01", title: "Apply", desc: "Fill out our partnership application form with your business details." },
              { step: "02", title: "Verification", desc: "Our team will review your application and verify your credentials." },
              { step: "03", title: "Onboarding", desc: "Get access to your dashboard and learn how to use our platform." },
              { step: "04", title: "Grow", desc: "Start receiving bookings and grow your revenue with TodayFix." },
            ].map((item, idx) => (
              <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-12 h-12 rounded-full border border-border-primary bg-surface-primary text-text-primary font-black shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 relative">
                  {item.step}
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl bg-surface-secondary border border-border-primary shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-text-primary text-xl mb-2">{item.title}</h3>
                  <p className="text-text-secondary font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Partner;
