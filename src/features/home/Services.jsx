import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Wrench } from "lucide-react";
import { servicesData } from "../../data/collectedData";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate } from "react-router";

const Services = () => {
  const [isPaused, setIsPaused] = useState(false);
  const swiperRef = useRef(null);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center w-full font-sans overflow-hidden bg-surface-accent py-20 md:py-28 border-t border-border-secondary">
      {/* Custom Styles to Override Default Swiper Pagination */}
      <style>
        {`
          .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
            background: #ffff;
            opacity: 1;
            transition: all 0.3s ease;
          }
          .swiper-pagination-bullet-active {
            width: 32px;
            border-radius: 9999px;
            background: #18181b; /* zinc-900 / text-primary */
          }
          .swiper-container-free-mode > .swiper-wrapper {
            transition-timing-function: linear;
          }
        `}
      </style>

      <div className="w-full max-w-7xl px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col items-center mb-14 gap-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-surface-primary border border-border-primary rounded-full px-5 py-2 shadow-sm"
          >
            {/* <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> */}
            <span className="text-xs font-bold text-text-secondary uppercase tracking-[0.2em]">
              Our Services
            </span>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-text-primary tracking-tight leading-tight"
          >
            What Do You Need{" "}
            <span className="bg-gradient-to-r from-zinc-400 to-zinc-600 bg-clip-text text-transparent">
              Fixed?
            </span>
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
        </div>

        {/* Carousel Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative group/carousel"
          onMouseEnter={() => {
            setIsPaused(true);
            if (swiperRef.current) swiperRef.current.swiper.autoplay.stop();
          }}
          onMouseLeave={() => {
            setIsPaused(false);
            if (swiperRef.current) swiperRef.current.swiper.autoplay.start();
          }}
        >
          {/* Left Gradient Fade */}
          <div className="absolute top-0 left-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-surface-accent to-transparent z-10 pointer-events-none" />

          {/* Right Gradient Fade */}
          <div className="absolute top-0 right-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-surface-accent to-transparent z-10 pointer-events-none" />

          {/* Custom Navigation Arrows */}
          <button className="swiper-button-prev-custom absolute -left-2 md:-left-5 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-11 h-11 rounded-full bg-surface-primary border border-border-primary text-text-primary shadow-lg hover:bg-surface-dark hover:text-text-inverted hover:border-transparent hover:scale-110 transition-all duration-300 active:scale-95 opacity-0 group-hover/carousel:opacity-100 disabled:opacity-0">
            <svg
              className="h-5 w-5"
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

          <button className="swiper-button-next-custom absolute -right-2 md:-right-5 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-11 h-11 rounded-full bg-surface-primary border border-border-primary text-text-primary shadow-lg hover:bg-surface-dark hover:text-text-inverted hover:border-transparent hover:scale-110 transition-all duration-300 active:scale-95 opacity-0 group-hover/carousel:opacity-100 disabled:opacity-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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

          {/* Swiper Implementation */}
          <div className="overflow-hidden rounded-3xl py-2 px-4 md:px-0">
            <Swiper
              ref={swiperRef}
              modules={[Autoplay, Navigation, Pagination]}
              spaceBetween={20}
              slidesPerView={2}
              loop={true}
              speed={1000} // transition duration
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              navigation={{
                prevEl: ".swiper-button-prev-custom",
                nextEl: ".swiper-button-next-custom",
              }}
              pagination={{
                clickable: true,
                el: ".swiper-custom-pagination",
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 24,
                },
              }}
              className="pb-4"
            >
              {servicesData.map((service, index) => (
                <SwiperSlide key={`${service.id}-${index}`}>
                  <div
                    onClick={() => navigate("/services/" + service.link)}
                    className="py-4"
                  >
                    <div className="group relative h-44 sm:h-52 md:h-64 flex flex-col items-center justify-center gap-3 sm:gap-5 bg-surface-primary border border-border-primary rounded-2xl sm:rounded-3xl cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.1)] transition-all duration-500 overflow-hidden transform hover:-translate-y-2">
                      {/* Hover Background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

                      {/* Decorative corner accent */}
                      <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-gradient-to-br from-zinc-200 to-transparent opacity-60 group-hover:from-zinc-600 group-hover:opacity-30 transition-all duration-500" />

                      {/* Icon */}
                      <div className="relative z-10 p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl bg-surface-secondary text-text-primary transition-all duration-500 group-hover:bg-white/10 group-hover:text-white group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                        {/* <Wrench className="w-8 h-8 md:w-10 md:h-10" /> */}
                        {service.icon}
                      </div>

                      {/* Label */}
                      <span className="relative z-10 text-xs sm:text-sm md:text-base font-bold text-text-primary group-hover:text-white transition-colors duration-500 tracking-tight text-center px-2 sm:px-4 leading-tight">
                        {service.name}
                      </span>

                      {/* Subtle arrow on hover */}
                      <div className="relative z-10 hidden sm:flex items-center gap-1 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <span className="text-xs font-semibold text-zinc-400">
                          Explore
                        </span>
                        <svg
                          className="w-3 h-3 text-zinc-400"
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
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </motion.div>

        {/* Custom Pagination Container */}
        <div className="flex justify-center mt-6">
          <div className="swiper-custom-pagination flex items-center justify-center gap-2"></div>
        </div>
      </div>
    </div>
  );
};

export default Services;
