import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSearchBar from "../../components/ui/AnimatedSearchBar";
import { servicesData as services } from "../../data/collectedData";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % services.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [services.length]);
  
  return (
    <div className="mt-0 flex flex-col relative bg-surface-primary overflow-hidden gap-10 lg:gap-0">
      <div className="absolute inset-0 opacity-70 bg-[linear-gradient(to_right,#4f46e520_1px,transparent_1px),linear-gradient(to_bottom,#4f46e520_1px,transparent_1px)] bg-[size:70px_70px] " />
      {/* <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-zinc-100 rounded-full mix-blend-multiply filter blur-[100px] z-0 pointer-events-none"></div> */}
      <span className="z-20 relative w-full flex justify-center mt-4 max-md:px-16">
        <AnimatedSearchBar />
      </span>
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col items-start space-y-10">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-extrabold text-text-primary tracking-tight leading-[1.05]">
            Find Verified <br />
            <div className="relative overflow-hidden my-2">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={currentIndex}
                  initial={{ opacity: 0, y: 40, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -40, rotateX: 90 }}
                  transition={{
                    duration: 0.5,
                    type: "spring",
                    stiffness: 120,
                    damping: 20,
                  }}
                  className="block text-text-muted origin-bottom md:text-6xl"
                >
                  {services?.[currentIndex]?.name}
                </motion.span>
              </AnimatePresence>
            </div>
            Across India.
          </h1>

          <p className="text-lg md:text-xl text-text-secondary max-w-lg leading-relaxed font-medium">
            The smarter, faster way to connect with highly vetted professionals
            and local service providers near you.
          </p>
          <div className="flex items-center gap-8 md:gap-12 pt-6 border-t border-border-primary">
            <div className="flex flex-col">
              <h4 className="text-3xl md:text-4xl font-extrabold text-text-primary tracking-tight">
                2.4L+
              </h4>
              <p className="text-xs md:text-sm text-text-secondary font-bold uppercase tracking-widest mt-2">
                Verified Pros
              </p>
            </div>
            <div className="w-px h-16 bg-zinc-200"></div>
            <div className="flex flex-col">
              <h4 className="text-3xl md:text-4xl font-extrabold text-text-primary tracking-tight">
                500+
              </h4>
              <p className="text-xs md:text-sm text-text-secondary font-bold uppercase tracking-widest mt-2">
                Cities
              </p>
            </div>
            <div className="w-px h-16 bg-zinc-200"></div>
            <div className="flex flex-col">
              <h4 className="text-3xl md:text-4xl font-extrabold text-text-primary tracking-tight">
                100+
              </h4>
              <p className="text-xs md:text-sm text-text-secondary font-bold uppercase tracking-widest mt-2">
                Categories
              </p>
            </div>
          </div>
        </div>
        <div className="relative hidden lg:flex w-full h-[600px] items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute w-[320px] h-[320px] rounded-full border border-dashed border-border-tertiary flex items-center justify-center"
          >
            <div className="w-64 h-64 rounded-full border border-border-primary flex items-center justify-center">
              <div className="w-40 h-40 bg-surface-dark rounded-full flex items-center justify-center shadow-2xl shadow-black/20">
                <span className="text-text-inverted font-extrabold tracking-widest uppercase text-sm">
                  TodayFix
                </span>
              </div>
            </div>
          </motion.div>
          <motion.div
            animate={{ y: [-15, 15, -15] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[15%] right-[5%] w-64 p-5 rounded-3xl bg-white/80 backdrop-blur-xl border border-border-primary shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] z-20"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-300 rounded-2xl text-text-inverted">
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
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <div>
                <h5 className="text-text-primary font-bold text-sm tracking-tight">
                  Interior Design
                </h5>
                <p className="text-xs text-text-secondary mt-1 flex items-center gap-1 font-medium">
                  <span className="text-text-primary">★</span> 4.9 (1.2k)
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div
            animate={{ y: [11, -11, 11] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute top-[19%] left-[-10%] w-64 p-5 rounded-3xl bg-white/80 backdrop-blur-xl border border-border-primary shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] z-30"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-400 rounded-2xl text-text-inverted flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 16 16">
                  <path
                    fill="#ffff"
                    d="M14.12 4L8.62.85a1.28 1.28 0 0 0-1.24 0L1.88 4a1.25 1.25 0 0 0-.63 1.09V11a1.25 1.25 0 0 0 .63 1l5.5 3.11a1.28 1.28 0 0 0 1.24 0l5.5-3.11a1.25 1.25 0 0 0 .63-1V5.05A1.25 1.25 0 0 0 14.12 4zm-6.74 9.71l-2.13-1.2v-5.3l2.13 1.16zM8 7.29L5.92 6.15l4.81-2.67l2.09 1.18zm0-5.35l1.46.82l-4.84 2.69l-1.44-.79zM2.5 5.71l1.5.82v5.27L2.5 11zm6.12 8V8.37l4.88-2.66V11z"
                  />
                </svg>
              </div>
              <div>
                <h5 className="text-text-primary font-bold text-sm tracking-tight">
                  Packer & Mover
                </h5>
                <p className="text-xs text-text-secondary mt-1 font-medium">
                  Trusted by Many
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div
            animate={{ y: [15, -15, 15] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute top-[50%] left-[-10%] w-72 p-5 rounded-3xl bg-white/80 backdrop-blur-xl border border-border-primary shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] z-30"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-400 rounded-2xl text-text-inverted">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div>
                <h5 className="text-text-primary font-bold text-sm tracking-tight">
                  Verified Providers
                </h5>
                <p className="text-xs text-text-secondary mt-1 font-medium">
                  Background checked
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div
            animate={{ y: [13, -13, 13] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute top-[45%] left-[66%] w-60 p-5 rounded-3xl bg-white/80 backdrop-blur-xl border border-border-primary shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] z-30"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-400 rounded-2xl text-text-inverted flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-boxes"
                  aria-hidden="true"
                >
                  <path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"></path>
                  <path d="m7 16.5-4.74-2.85"></path>
                  <path d="m7 16.5 5-3"></path>
                  <path d="M7 16.5v5.17"></path>
                  <path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"></path>
                  <path d="m17 16.5-5-3"></path>
                  <path d="m17 16.5 4.74-2.85"></path>
                  <path d="M17 16.5v5.17"></path>
                  <path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z"></path>
                  <path d="M12 8 7.26 5.15"></path>
                  <path d="m12 8 4.74-2.85"></path>
                  <path d="M12 13.5V8"></path>
                </svg>
              </div>
              <div>
                <h5 className="text-text-primary font-bold text-sm tracking-tight">
                  Building Materials
                </h5>
                <p className="text-xs text-text-secondary mt-1 font-medium">
                  Supply Chain
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute bottom-[10%] right-[15%] w-60 p-5 rounded-3xl bg-white/80 backdrop-blur-xl border border-border-primary shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] z-20"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-300 rounded-2xl text-text-inverted">
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
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <div>
                <h5 className="text-text-primary font-bold text-sm tracking-tight">
                  Digital Marketing
                </h5>
                <p className="text-xs text-text-secondary mt-1 font-medium">
                  Grow your reach
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
export default Hero;
