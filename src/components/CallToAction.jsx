import React from "react";
import { motion } from "framer-motion";
const CallToAction = () => {
  return (
    <div className="relative w-full bg-white pt-12 pb-20 px-6 md:px-12 flex flex-col items-center text-center font-sans overflow-hidden border-t border-zinc-100 z-0">
      {/* --- Subtle Background Elements --- */}
      {/* Top Left Soft Zinc Glow */}
      <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[120%] bg-zinc-100 rounded-full mix-blend-multiply filter blur-[120px] opacity-70 -z-10 pointer-events-none"></div>
      {/* Top Right Soft Zinc Glow */}
      <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[100%] bg-zinc-50 rounded-full mix-blend-multiply filter blur-[100px] opacity-80 -z-10 pointer-events-none"></div>

      {/* --- CONTENT --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center w-full max-w-3xl mx-auto"
      >
        {/* Main Headline */}
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-black leading-[1.05] tracking-tight mb-6 z-10 relative">
          Ready to Get Things <br className="hidden md:block" />
          <span className="text-zinc-400">Fixed?</span>
        </h2>
        {/* Subtitle */}
        <p className="text-lg md:text-xl text-zinc-500 max-w-xl leading-relaxed mb-10 z-10 relative">
          Join the most trusted home services platform in India. Book verified
          professionals instantly or grow your local business with us.
        </p>
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 z-10 relative w-full sm:w-auto">
          <button className="w-full sm:w-auto bg-black text-white px-8 py-4 rounded-full text-base font-bold tracking-wide hover:bg-zinc-800 hover:scale-105 transition-all duration-300 shadow-xl shadow-black/10 flex items-center justify-center gap-2">
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
          </button>
          <button className="w-full sm:w-auto bg-white border border-zinc-200 text-black px-8 py-4 rounded-full text-base font-bold tracking-wide hover:bg-zinc-50 hover:border-zinc-300 transition-all duration-300 shadow-sm">
            List Your Business
          </button>
        </div>
      </motion.div>
    </div>
  );
};
export default CallToAction;
