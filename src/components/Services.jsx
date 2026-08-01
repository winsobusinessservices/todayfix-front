import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const Services = () => {
  const scrollRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Array of services with inline SVGs for immediate use
  const services = [
    {
      id: 1,
      name: "Web Dev",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      ),
    },
    {
      id: 2,
      name: "App Design",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      ),
    },
    {
      id: 3,
      name: "Cloud Hosting",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
        />
      ),
    },
    {
      id: 4,
      name: "SEO Strategy",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      ),
    },
    {
      id: 5,
      name: "Security",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      ),
    },
    {
      id: 6,
      name: "Analytics",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      ),
    },
    {
      id: 7,
      name: "Marketing",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
        />
      ),
    },
    {
      id: 8,
      name: "24/7 Support",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
        />
      ),
    },
  ];

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
    <div className="flex flex-col items-center justify-center w-full font-sans overflow-hidden bg-[#d4d4d8] py-16 border-t border-zinc-100">
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
            className="text-sm font-bold text-zinc-500 uppercase tracking-widest"
          >
            Our Services
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-black tracking-tight"
          >
            What Do You Need <span className="text-zinc-400">Fixed?</span>
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-500 max-w-xl"
          >
            Choose from 50+ professional home and business services tailored for
            you.
          </motion.p>
        </span>

        {/* Main Wrapper with relative positioning for gradient overlays and buttons */}
        <div className="relative group/container mt-12">
          {/* Left Gradient Fade */}
          <div
            className={`absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-[#d4d4d8] via-[#d4d4d8]/80 to-transparent z-10 pointer-events-none transition-opacity duration-500 ${
              isScrolled ? "opacity-100" : "opacity-0"
            }`}
          ></div>

          {/* Right Gradient Fade */}
          <div
            className={`absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-[#d4d4d8] via-[#d4d4d8]/80 to-transparent z-10 pointer-events-none transition-opacity duration-500 ${
              canScrollRight ? "opacity-100" : "opacity-0"
            }`}
          ></div>

          {/* Desktop Left Navigation Arrow */}
          <button
            onClick={() => scroll("left")}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-black text-white shadow-xl hover:bg-zinc-800 hover:scale-110 transition-all duration-300 transform active:scale-95 ${
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
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-black text-white shadow-xl hover:bg-zinc-800 hover:scale-110 transition-all duration-300 transform active:scale-95 ${
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
                className="group relative flex-shrink-0 w-36 h-40 md:w-48 md:h-56 flex flex-col items-center justify-center gap-4 bg-white border border-zinc-200 rounded-[2rem] cursor-pointer snap-center hover:-translate-y-2 hover:bg-black hover:border-black shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Background Glow on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>

                {/* Icon Wrapper */}
                <div className="relative z-10 p-3 md:p-4 rounded-full bg-zinc-100 text-zinc-900 transition-all duration-300 group-hover:bg-white/10 group-hover:text-white group-hover:scale-110 group-hover:shadow-lg">
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
                <span className="relative z-10 text-sm md:text-lg font-bold text-zinc-800 group-hover:text-white transition-colors duration-300 tracking-tight text-center px-2">
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
