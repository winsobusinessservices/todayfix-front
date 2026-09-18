import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
const CallToAction = () => {
  return (
    <div className="relative z-0 flex w-full flex-col items-center overflow-hidden border-t border-border-secondary bg-[#f7f4ff] px-6 pb-24 pt-20 text-center font-sans dark:bg-[#17131f] md:px-12">
      <div className="pointer-events-none absolute -left-20 top-0 -z-10 h-80 w-80 rounded-full bg-brand-primary/10 blur-[100px]"></div>
      <div className="pointer-events-none absolute -right-20 bottom-0 -z-10 h-80 w-80 rounded-full bg-brand-accent/10 blur-[100px]"></div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center w-full max-w-3xl mx-auto"
      >
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-text-primary leading-[1.05] tracking-tight mb-6 z-10 relative">
          Ready to Get Things <br className="hidden md:block" />
          <span className="text-primary">Fixed?</span>
        </h2>
        <p className="text-lg md:text-xl text-text-secondary max-w-xl leading-relaxed mb-10 z-10 relative">
          Join the most trusted home services platform in India. Book verified
          professionals instantly or grow your local business with us.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 z-10 relative w-full sm:w-auto">
          <Link to="/services" className="btn-primary w-full sm:w-auto px-8 py-4 rounded-full text-base font-bold tracking-wide hover:scale-105 transition-all duration-300 shadow-xl shadow-black/10 flex items-center justify-center gap-2">
            Book a Service
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
          <Link to="/list-business" className="w-full rounded-full border border-brand-soft bg-surface-primary px-8 py-4 text-base font-bold tracking-wide text-text-primary shadow-sm transition-all duration-300 hover:border-brand-primary hover:bg-surface-accent sm:w-auto">
            List Your Business
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
export default CallToAction;

