import React from "react";
import { motion } from "framer-motion";
import SEO from "../components/seo/SEO";

const Contact = () => {
  return (
    <main className="min-h-screen bg-surface-secondary font-sans pb-24">
      <SEO
        title="Contact Us | TodayFix"
        description="Get in touch with the TodayFix team. We're here to help with your bookings, professional account, or any other questions."
      />

      {/* Header */}
      <section className="pt-32 pb-16 px-6 bg-surface-primary border-b border-border-primary text-center relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-black text-text-primary tracking-tight mb-4">
            How can we{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-900">
              help?
            </span>
          </h1>
          <p className="text-lg text-text-secondary font-medium max-w-2xl mx-auto">
            Whether you have a question about a booking, need help with your pro
            account, or just want to say hi, we'd love to hear from you.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-surface-primary p-8 rounded-[2rem] border border-border-primary shadow-sm"
        >
          <h2 className="text-2xl font-bold text-text-primary mb-6">
            Send us a message
          </h2>
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-text-primary">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Jane"
                  className="w-full bg-surface-secondary/50 border border-border-primary rounded-xl py-3 px-4 focus:outline-none focus:border-black focus:ring-4 focus:ring-black/10 transition-all font-medium placeholder-slate-400"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-text-primary">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Doe"
                  className="w-full bg-surface-secondary/50 border border-border-primary rounded-xl py-3 px-4 focus:outline-none focus:border-black focus:ring-4 focus:ring-black/10 transition-all font-medium placeholder-slate-400"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-text-primary">
                Email Address
              </label>
              <input
                type="email"
                placeholder="jane@example.com"
                className="w-full bg-surface-secondary/50 border border-border-primary rounded-xl py-3 px-4 focus:outline-none focus:border-black focus:ring-4 focus:ring-black/10 transition-all font-medium placeholder-slate-400"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-text-primary">
                Message
              </label>
              <textarea
                rows="5"
                placeholder="How can we help you?"
                className="w-full bg-surface-secondary/50 border border-border-primary rounded-xl py-3 px-4 focus:outline-none focus:border-black focus:ring-4 focus:ring-black/10 transition-all font-medium placeholder-slate-400 resize-none"
              ></textarea>
            </div>
            <button className="w-full py-4 bg-surface-dark text-text-inverted rounded-xl font-bold hover:scale-[0.98] transition-transform shadow-md">
              Send Message
            </button>
          </form>
        </motion.div>

        {/* Contact Info */}
        <div className="space-y-8 flex flex-col justify-center">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-6">
              Contact Information
            </h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-primary border border-border-primary flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5 text-text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-text-primary">Email Support</h4>
                  <p className="text-text-secondary text-sm font-medium mt-1">
                    support@todayfix.in
                    {/* todayfix26@gmail.com */}
                    {/* info@todayfix.com */}
                  </p>
                  <p className="text-text-muted text-xs mt-1">
                    We aim to reply within 24 hours.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-primary border border-border-primary flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5 text-text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-text-primary">Phone</h4>
                  <p className="text-text-secondary text-sm font-medium mt-1">
                    +91 84949 39493
                  </p>
                  <p className="text-text-muted text-xs mt-1">
                    Mon-Fri, 9am - 6pm IST
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-primary border border-border-primary flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5 text-text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-text-primary">HQ Address</h4>
                  <p className="text-text-secondary text-sm font-medium mt-1 leading-relaxed">
                    SY No. 112, Ground Floor,
                    <br />
                    Hirandahall Opp GHP School, Virgonagar, Bengaluru
                    <br />
                    Karnataka 560049
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
