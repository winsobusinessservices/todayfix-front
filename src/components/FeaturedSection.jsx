import React, { useState } from "react";
import { motion } from "framer-motion";

const FeaturedSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const businesses = [
    {
      id: 1,
      name: "Elite Space Interiors",
      category: "Interior Design",
      location: "Indiranagar, Bengaluru",
      rating: "4.9",
      reviews: "245",
      description:
        "Award-winning residential and commercial interior designers specializing in modern, minimalist, and sustainable spaces. We transform your vision into reality with premium materials and flawless execution.",
      // Large Image Placeholder or gradient for Bento
      bgGradient: "from-zinc-900 to-black",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
        />
      ),
    },
    {
      id: 2,
      name: "SwiftRelocate Movers",
      category: "Packers & Movers",
      location: "Koramangala",
      rating: "4.8",
      reviews: "189",
      description:
        "Damage-free packing and moving services with real-time tracking.",
      bgGradient: "from-zinc-100 to-white",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.25a2.25 2.25 0 00-2.25 2.25v6m-4.5 0v-6a2.25 2.25 0 00-2.25-2.25H3.75c-.621 0-1.125.504-1.125 1.125v4.5M12 18.75v-6"
        />
      ),
    },
    {
      id: 3,
      name: "EcoTech Solar Solutions",
      category: "Solar Services",
      location: "HSR Layout",
      rating: "5.0",
      reviews: "94",
      description:
        "Rooftop solar installations and government subsidy guidance.",
      bgGradient: "from-zinc-100 to-white",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
        />
      ),
    },
  ];

  return (
    <section className="w-full bg-white pt-16 pb-20 font-sans border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-black tracking-tight leading-tight mb-6">
              Featured <br />
              <span className="text-zinc-400">Businesses.</span>
            </h2>
            <p className="text-lg text-zinc-500 leading-relaxed">
              Connect with highly vetted, top-performing local businesses. We've
              verified their credentials so you can hire with absolute confidence.
            </p>
          </div>
          <button className="shrink-0 h-12 px-6 rounded-full bg-black text-white font-medium hover:scale-105 transition-transform duration-300">
            View All Providers
          </button>
        </motion.div>

        {/* Standard Grid (3 columns on lg) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[420px]">
          {businesses.map((business, index) => {
            const isFeatured = index === 0;
            const isHovered = hoveredIndex === index;
            const isDimmed = hoveredIndex !== null && hoveredIndex !== index;

            return (
              <motion.div
                key={business.id}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`group relative overflow-hidden rounded-[2rem] p-8 md:p-10 flex flex-col justify-between cursor-pointer border transition-all duration-500 h-full min-h-[420px] ${
                  isFeatured
                    ? "bg-gradient-to-br border-transparent text-white " +
                      business.bgGradient
                    : "bg-gradient-to-br border-zinc-200 text-black shadow-sm hover:shadow-2xl hover:border-zinc-300 " +
                      business.bgGradient
                } ${
                  isDimmed
                    ? "opacity-40 blur-[2px] scale-[0.98]"
                    : isHovered
                    ? "scale-[1.02] z-10"
                    : "scale-100"
                }`}
              >
                {/* Animated Background Overlay on Hover */}
                {isFeatured && (
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                )}

                {/* Top: Category & Rating */}
                <div className="flex items-center justify-between relative z-10">
                  <div
                    className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase ${
                      isFeatured
                        ? "bg-white/10 text-white backdrop-blur-md"
                        : "bg-black text-white"
                    }`}
                  >
                    {business.category}
                  </div>
                  <div
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold ${
                      isFeatured ? "bg-white/10 text-white" : "bg-zinc-100 text-black"
                    }`}
                  >
                    <svg
                      className={`w-4 h-4 ${
                        isFeatured ? "text-white" : "text-black"
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {business.rating}
                  </div>
                </div>

                {/* Middle: Empty space for layout balance, or custom illustration */}
                <div className="flex-grow flex items-center justify-center my-6">
                  <motion.div
                    animate={isHovered ? { scale: 1.1, rotate: 2 } : { scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center ${
                      isFeatured ? "bg-white/10" : "bg-black/5"
                    }`}
                  >
                    <svg
                      className={`w-10 h-10 ${
                        isFeatured ? "text-white" : "text-black"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      {business.icon}
                    </svg>
                  </motion.div>
                </div>

                {/* Bottom: Details & Action */}
                <div className="relative z-10 flex flex-col gap-2">
                  <h3 className="font-bold tracking-tight text-2xl md:text-3xl">
                    {business.name}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed max-w-md ${
                      isFeatured ? "text-zinc-300" : "text-zinc-500"
                    }`}
                  >
                    {business.description}
                  </p>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                    <span
                      className={`text-sm font-medium flex items-center gap-1.5 ${
                        isFeatured ? "text-zinc-400" : "text-zinc-500"
                      }`}
                    >
                      <svg
                        className="w-4 h-4"
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
                      {business.location}
                    </span>
                    
                    {/* View Action - Translates on hover */}
                    <motion.div
                      animate={isHovered ? { x: 5 } : { x: 0 }}
                      className={`p-2 rounded-full ${
                        isFeatured ? "bg-white text-black" : "bg-black text-white"
                      }`}
                    >
                      <svg
                        className="w-4 h-4"
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
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
