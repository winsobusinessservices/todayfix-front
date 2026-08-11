import React from "react";
import SEO from "../components/seo/SEO";
import { Link } from "react-router";
import { motion } from "framer-motion";

const BecomeProfessional = () => {
  return (
    <main className="min-h-screen bg-surface-secondary font-sans pb-24">
      <SEO 
        title="Become a Professional | TodayFix"
        description="Join TodayFix as an independent professional. Work on your own terms, find great clients, and grow your income."
      />
      
      {/* Hero Section */}
      <section className="relative w-full pt-32 pb-24 px-6 overflow-hidden bg-surface-dark border-b border-border-primary text-center">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Professional at work" 
            className="w-full h-full object-cover grayscale mix-blend-overlay"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-surface-dark/80 to-transparent z-10"></div>
        
        <div className="relative z-20 max-w-4xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest text-white mb-6 backdrop-blur-sm">
            For Individuals
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight mb-6">
            Be your own boss.
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 font-medium max-w-2xl mx-auto leading-relaxed mb-10">
            Turn your skills into a thriving business. Join the platform that connects top-tier professionals with customers who value quality work.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/register" 
              className="w-full sm:w-auto px-8 py-4 bg-white text-surface-dark rounded-full font-bold transition-transform active:scale-95 shadow-xl text-center hover:bg-zinc-100"
            >
              Start Earning
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-text-primary tracking-tight mb-4">Why Professionals Choose Us</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Flexible Schedule",
              desc: "You control your calendar. Work when you want, where you want. Accept only the jobs that fit your schedule.",
              icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            },
            {
              title: "Guaranteed Payments",
              desc: "No more chasing invoices. Payments are secured before the job starts and processed directly to your bank account.",
              icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            },
            {
              title: "Professional Growth",
              desc: "Build a premium reputation. High ratings unlock exclusive tier benefits, higher rates, and priority matching.",
              icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            }
          ].map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-surface-primary p-8 rounded-[2rem] border border-border-primary shadow-sm text-center"
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

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto bg-surface-primary rounded-[2rem] border border-border-primary p-12 text-center shadow-lg">
          <h2 className="text-3xl font-black text-text-primary mb-4">Ready to get started?</h2>
          <p className="text-text-secondary font-medium mb-8 max-w-lg mx-auto">Create your professional profile today and join the community.</p>
          <Link 
            to="/register" 
            className="inline-block px-8 py-4 bg-surface-dark text-text-inverted rounded-full font-bold transition-transform active:scale-95 shadow-md"
          >
            Create Your Account
          </Link>
          <div className="mt-6 text-sm text-text-muted font-medium">
            Already have a business? <Link to="/partner" className="text-text-primary font-bold hover:underline">Register as a Partner</Link>.
          </div>
        </div>
      </section>

    </main>
  );
};

export default BecomeProfessional;
