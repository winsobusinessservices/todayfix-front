import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    id: 1,
    quote:
      "Sirona has helped me find the perfect professionals faster than I ever thought possible. The quality of work is absolutely exceptional.",
    name: "Kyle Weznick",
    role: "Homeowner, Bengaluru",
    avatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Kyle&backgroundColor=18181b",
  },
  {
    id: 2,
    quote:
      "I was skeptical at first, but the verified experts completely transformed my living space. The entire process was seamless and stress-free.",
    name: "Sarah Jenkins",
    role: "Interior Designer",
    avatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=18181b",
  },
  {
    id: 3,
    quote:
      "The easiest platform I've ever used to hire local help. Reliable, transparent pricing, and incredible customer support every step of the way.",
    name: "David Chen",
    role: "Property Manager",
    avatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=David&backgroundColor=18181b",
  },
];

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for down, -1 for up

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  const variants = {
    enter: (direction) => {
      return {
        y: direction > 0 ? 60 : -60,
        opacity: 0,
      };
    },
    center: {
      z: 1,
      y: 0,
      opacity: 1,
    },
    exit: (direction) => {
      return {
        z: 0,
        y: direction > 0 ? -60 : 60,
        opacity: 0,
      };
    },
  };

  return (
    <section className="w-full bg-white py-14 md:py-16 px-6 md:px-12 lg:px-24 font-sans overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-5 lg:gap-24 items-start">
        {/* Left Column: Heading & Controls */}
        <div className="w-full lg:w-[40%] flex flex-col z-10">
          {/* Main Title */}
          <h2 className="text-4xl md:text-5xl lg:text-[56px] leading-[1.15] tracking-tight text-black mb-6">
            From our <br className="hidden md:block" />
            <span className="font-extrabold text-zinc-400">community.</span>
          </h2>

          {/* Subtitle */}
          <p className="text-zinc-500 text-base md:text-lg mb-4 max-w-sm leading-relaxed">
            Here's what other homeowners had to say about their experience with
            our professionals.
          </p>

          {/* Navigation Buttons (Vertical Up/Down) */}
          <div className="flex gap-4">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center text-black hover:bg-black hover:text-white hover:border-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-zinc-900"
              aria-label="Previous testimonial"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 15.75l7.5-7.5 7.5 7.5"
                />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center text-black hover:bg-black hover:text-white hover:border-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-zinc-900"
              aria-label="Next testimonial"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Right Column: Animated Testimonial Quote */}
        <div className="w-full lg:w-[60%] flex flex-col pt-4 lg:pt-0 relative min-h-[350px]">
          {/* Distinctive Opening Quotation Mark */}
          <div className="text-zinc-200 text-7xl md:text-8xl font-serif leading-none mb-2 md:mb-4 h-12 flex items-start select-none">
            &ldquo;
          </div>

          <div className="relative w-full h-full flex-grow">
            <AnimatePresence
              initial={false}
              custom={direction}
              mode="popLayout"
            >
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  y: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="w-full flex flex-col"
              >
                {/* Quote Text */}
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-normal leading-relaxed md:leading-[1.4] text-black mb-10 tracking-tight">
                  {testimonials[currentIndex].quote}&rdquo;
                </h3>

                {/* Author Info */}
                <div className="flex items-center gap-5 mt-auto">
                  {/* Avatar Placeholder */}
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden bg-zinc-100 flex-shrink-0 shadow-sm border border-zinc-200">
                    <img
                      src={testimonials[currentIndex].avatar}
                      alt={testimonials[currentIndex].name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Name and Role */}
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-black tracking-tight">
                      {testimonials[currentIndex].name}
                    </span>
                    <span className="text-sm md:text-base text-zinc-500 font-medium">
                      {testimonials[currentIndex].role}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
