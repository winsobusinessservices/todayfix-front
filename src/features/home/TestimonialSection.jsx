import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonialData as testimonials } from "../../data/testimonialData";

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
    <section className="w-full bg-surface-primary py-14 md:py-16 px-6 md:px-12 lg:px-24 font-sans overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-5 lg:gap-24 items-start">
        {/* Left Column: Heading & Controls */}
        <div className="w-full lg:w-[40%] flex flex-col z-10">
          {/* Main Title */}
          <h2 className="text-4xl md:text-5xl lg:text-[56px] leading-[1.15] tracking-tight text-text-primary mb-6">
            From our <br className="hidden md:block" />
            <span className="font-extrabold text-text-muted">community.</span>
          </h2>

          {/* Subtitle */}
          <p className="text-text-secondary text-base md:text-lg mb-4 max-w-sm leading-relaxed">
            Here's what other homeowners had to say about their experience with
            our professionals.
          </p>

          {/* Navigation Buttons (Vertical Up/Down) */}
          <div className="flex gap-4">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-border-primary flex items-center justify-center text-text-primary hover:bg-surface-dark hover:text-text-inverted hover:border-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-zinc-900"
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
              className="w-12 h-12 rounded-full border border-border-primary flex items-center justify-center text-text-primary hover:bg-surface-dark hover:text-text-inverted hover:border-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-zinc-900"
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
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-normal leading-relaxed md:leading-[1.4] text-text-primary mb-10 tracking-tight">
                  {testimonials[currentIndex].quote}&rdquo;
                </h3>

                {/* Author Info */}
                <div className="flex items-center gap-5 mt-auto">
                  {/* Avatar Placeholder */}
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden bg-zinc-100 flex-shrink-0 shadow-sm border border-border-primary">
                    <img
                      src={testimonials[currentIndex].avatar}
                      alt={testimonials[currentIndex].name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Name and Role */}
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-text-primary tracking-tight">
                      {testimonials[currentIndex].name}
                    </span>
                    <span className="text-sm md:text-base text-text-secondary font-medium">
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

