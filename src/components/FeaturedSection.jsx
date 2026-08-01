import React, { useState } from "react";
import { motion } from "framer-motion";
import { featuredData as businesses } from "../data/featuredData";

const FeaturedSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="w-full bg-surface-primary pt-16 pb-20 font-sans border-t border-zinc-100">
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
