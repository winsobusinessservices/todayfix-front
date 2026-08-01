import React from "react";
import { motion } from "framer-motion";

const BusinessCTA = () => {
  return (
    <section className="w-full bg-surface-dark py-20 md:py-20 px-6 md:px-12 lg:px-24 font-sans text-text-inverted overflow-hidden relative">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-20 items-center relative z-10">
        {/* Left Column: Text & CTA */}
        <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1.5 px-3 rounded-full bg-white/10 text-zinc-300 text-xs font-bold tracking-widest uppercase mb-6 border border-white/10 backdrop-blur-sm">
              For Business Owners & Suppliers
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-[56px] font-extrabold leading-[1.1] tracking-tight text-text-inverted mb-6"
          >
            Grow Your Business & <br className="hidden lg:block" />
            <span className="text-text-muted">Receive Local Leads Daily.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-text-muted mb-10 leading-relaxed max-w-xl"
          >
            Join 2.4L+ verified suppliers across 50+ Indian cities. Showcase
            your services, receive direct customer calls, and increase your
            revenue.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <button className="px-8 py-4 bg-surface-primary text-text-primary font-bold rounded-full text-base tracking-wide hover:bg-zinc-200 hover:scale-105 transition-all duration-300 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
              List Your Business Now
            </button>
            <button className="px-8 py-4 bg-transparent text-text-inverted border border-white/20 font-bold rounded-full text-base tracking-wide hover:bg-white/10 transition-all duration-300">
              Grow Business
            </button>
          </motion.div>
        </div>

        {/* Right Column: Features List */}
        <div className="w-full lg:w-1/2 flex flex-col gap-8 lg:pl-10">
          {/* Feature 1 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex gap-5 group"
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-text-inverted group-hover:bg-surface-primary group-hover:text-text-primary transition-colors duration-300">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <h4 className="text-xl font-bold text-text-inverted mb-2 tracking-tight">
                High-Converting Local Leads
              </h4>
              <p className="text-text-muted text-sm leading-relaxed">
                Get instant customer enquiries directly on your mobile via SMS
                and WhatsApp.
              </p>
            </div>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex gap-5 group"
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-text-inverted group-hover:bg-surface-primary group-hover:text-text-primary transition-colors duration-300">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div>
              <h4 className="text-xl font-bold text-text-inverted mb-2 tracking-tight">
                Verified Business Trust Seal
              </h4>
              <p className="text-text-muted text-sm leading-relaxed">
                Build customer trust with our official GST & Address
                Verification badge.
              </p>
            </div>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex gap-5 group"
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-text-inverted group-hover:bg-surface-primary group-hover:text-text-primary transition-colors duration-300">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <div>
              <h4 className="text-xl font-bold text-text-inverted mb-2 tracking-tight">
                Top Google & Search Visibility
              </h4>
              <p className="text-text-muted text-sm leading-relaxed">
                Rank high in city-specific searches and attract high-intent
                buyers.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BusinessCTA;
