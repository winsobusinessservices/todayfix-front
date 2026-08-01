import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSearchBar from "./AnimatedSearchBar";
const Hero = () => {
  const services = [
    "Interior Designers",
    "Packers & Movers",
    "Civil Contractors",
    "Solar Experts",
    "Digital Marketers",
    "Pest Control",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    // Cycles the service text every 3 seconds for a smoother reading experience
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % services.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [services.length]);

  return (
    <div className="mt-0 flex flex-col relative pt-16 lg:pt-20 bg-white overflow-hidden gap-10 lg:gap-0">
      {/* <div
        className="absolute inset-0 pointer-events-none z-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e4e4e7 1px, transparent 1px),
            linear-gradient(to bottom, #e4e4e7 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(circle at 50% 50%, black 20%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 50%, black 20%, transparent 70%)",
        }}
      /> */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e520_1px,transparent_1px),linear-gradient(to_bottom,#4f46e520_1px,transparent_1px)] bg-[size:120px_120px] " />
      {/* <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-zinc-100 rounded-full mix-blend-multiply filter blur-[100px] z-0 pointer-events-none"></div> */}
      <span className="z-20 relative w-full flex justify-center mt-4 max-md:px-16">
        <AnimatedSearchBar />
      </span>
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col items-start space-y-10">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-extrabold text-black tracking-tight leading-[1.05]">
            Find Verified <br />
            <div className="h-[1.2em] relative overflow-hidden my-2">
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
                  className="block text-zinc-400 origin-bottom"
                >
                  {services[currentIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
            Across India.
          </h1>

          <p className="text-lg md:text-xl text-zinc-500 max-w-lg leading-relaxed font-medium">
            The smarter, faster way to connect with highly vetted professionals
            and local service providers near you.
          </p>
          <div className="flex items-center gap-8 md:gap-12 pt-6 border-t border-zinc-200">
            <div className="flex flex-col">
              <h4 className="text-3xl md:text-4xl font-extrabold text-black tracking-tight">
                2.4L+
              </h4>
              <p className="text-xs md:text-sm text-zinc-500 font-bold uppercase tracking-widest mt-2">
                Verified Pros
              </p>
            </div>
            <div className="w-px h-16 bg-zinc-200"></div>
            <div className="flex flex-col">
              <h4 className="text-3xl md:text-4xl font-extrabold text-black tracking-tight">
                500+
              </h4>
              <p className="text-xs md:text-sm text-zinc-500 font-bold uppercase tracking-widest mt-2">
                Cities
              </p>
            </div>
            <div className="w-px h-16 bg-zinc-200"></div>
            <div className="flex flex-col">
              <h4 className="text-3xl md:text-4xl font-extrabold text-black tracking-tight">
                100+
              </h4>
              <p className="text-xs md:text-sm text-zinc-500 font-bold uppercase tracking-widest mt-2">
                Categories
              </p>
            </div>
          </div>
        </div>
        <div className="relative hidden lg:flex w-full h-[600px] items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute w-[320px] h-[320px] rounded-full border border-dashed border-zinc-300 flex items-center justify-center"
          >
            <div className="w-64 h-64 rounded-full border border-zinc-200 flex items-center justify-center">
              <div className="w-40 h-40 bg-black rounded-full flex items-center justify-center shadow-2xl shadow-black/20">
                <span className="text-white font-extrabold tracking-widest uppercase text-sm">
                  TodayFix
                </span>
              </div>
            </div>
          </motion.div>
          <motion.div
            animate={{ y: [-15, 15, -15] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[15%] right-[5%] w-64 p-5 rounded-3xl bg-white/80 backdrop-blur-xl border border-zinc-200 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] z-20"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-zinc-100 rounded-2xl text-black">
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
                <h5 className="text-black font-bold text-sm tracking-tight">
                  Interior Design
                </h5>
                <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1 font-medium">
                  <span className="text-black">★</span> 4.9 (1.2k)
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
            className="absolute top-[50%] left-[-10%] w-72 p-5 rounded-3xl bg-white/80 backdrop-blur-xl border border-zinc-200 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] z-30"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-black rounded-2xl text-white">
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
                <h5 className="text-black font-bold text-sm tracking-tight">
                  Verified Providers
                </h5>
                <p className="text-xs text-zinc-500 mt-1 font-medium">
                  Background checked
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
            className="absolute bottom-[10%] right-[15%] w-60 p-5 rounded-3xl bg-white/80 backdrop-blur-xl border border-zinc-200 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] z-20"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-zinc-100 rounded-2xl text-black">
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
                <h5 className="text-black font-bold text-sm tracking-tight">
                  Digital Marketing
                </h5>
                <p className="text-xs text-zinc-500 mt-1 font-medium">
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
