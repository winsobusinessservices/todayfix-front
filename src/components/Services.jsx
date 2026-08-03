import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { servicesData as services } from "../data/servicesData";

const Services = () => {
  const scrollRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -350 : 350;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setIsScrolled(scrollLeft > 20);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("resize", handleScroll);
    return () => window.removeEventListener("resize", handleScroll);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full font-sans overflow-hidden bg-surface-primary py-16 border-t border-border-secondary">
      {/* Utility to hide the scrollbar but keep functionality */}
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>

      <div className="w-full max-w-7xl px-4 md:px-8">
        <span className="flex flex-col justify-center items-center mb-8 gap-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold text-text-secondary uppercase tracking-widest"
          >
            Our Services
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-text-primary tracking-tight"
          >
            What Do You Need <span className="text-text-muted">Fixed?</span>
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-text-secondary max-w-xl"
          >
            Choose from 50+ professional home and business services tailored for
            you.
          </motion.p>
        </span>

        {/* Main Wrapper with relative positioning for gradient overlays and buttons */}
        <div className="relative group/container mt-12">
          {/* Left Gradient Fade */}
          <div
            className={`absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-surface-primary via-surface-primary/80 to-transparent z-10 pointer-events-none transition-opacity duration-500 ${
              isScrolled ? "opacity-100" : "opacity-0"
            }`}
          ></div>

          {/* Right Gradient Fade */}
          <div
            className={`absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-surface-primary via-surface-primary/80 to-transparent z-10 pointer-events-none transition-opacity duration-500 ${
              canScrollRight ? "opacity-100" : "opacity-0"
            }`}
          ></div>

          {/* Desktop Left Navigation Arrow */}
          <button
            onClick={() => scroll("left")}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-surface-dark text-text-inverted shadow-xl hover:bg-zinc-800 hover:scale-110 transition-all duration-300 transform active:scale-95 ${
              isScrolled
                ? "opacity-100 translate-x-2"
                : "opacity-0 -translate-x-10 pointer-events-none"
            }`}
            aria-label="Scroll left"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 pr-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Desktop Right Navigation Arrow */}
          <button
            onClick={() => scroll("right")}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-surface-dark text-text-inverted shadow-xl hover:bg-zinc-800 hover:scale-110 transition-all duration-300 transform active:scale-95 ${
              canScrollRight
                ? "opacity-100 -translate-x-2"
                : "opacity-0 translate-x-10 pointer-events-none"
            }`}
            aria-label="Scroll right"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 pl-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 pt-4 px-4 md:px-12"
          >
            {services.map((service, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                key={service.id}
                className="group relative flex-shrink-0 w-36 h-40 md:w-48 md:h-56 flex flex-col items-center justify-center gap-4 bg-surface-primary border border-border-primary rounded-3xl cursor-pointer snap-center hover:-translate-y-2 hover:bg-surface-dark hover:border-surface-dark shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.12)] transition-all duration-500 overflow-hidden"
              >
                {/* Background Glow on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-surface-dark to-zinc-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>

                {/* Icon Wrapper */}
                <div className="relative z-10 p-3 md:p-4 rounded-full bg-surface-secondary text-text-primary transition-all duration-500 group-hover:bg-white/10 group-hover:text-text-inverted group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 md:h-10 md:w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    {service.icon}
                  </svg>
                </div>

                {/* Text Label */}
                <span className="relative z-10 text-sm md:text-base font-bold text-text-primary group-hover:text-text-inverted transition-colors duration-500 tracking-tight text-center px-2">
                  {service.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
