import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { servicesData } from "../../data/collectedData";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate } from "react-router";

const Services = () => {
  const swiperRef = useRef(null);
  const navigate = useNavigate();

  return (
    <div className="flex w-full flex-col items-center justify-center overflow-hidden border-t border-border-secondary bg-section-soft py-20 font-sans md:py-28">
      {/* Custom Styles to Override Default Swiper Pagination */}
      <style>
        {`
          .swiper-custom-pagination .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
            background: var(--color-border-tertiary);
            box-shadow: inset 0 0 0 1px var(--color-text-muted);
            opacity: 1;
            transition: all 0.3s ease;
          }
          .swiper-custom-pagination .swiper-pagination-bullet-active {
            width: 32px;
            border-radius: 9999px;
            background: var(--color-button-primary);
            box-shadow: none;
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
            <span className="text-primary dark:text-brand-accent">
              Fixed?
            </span>
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-text-secondary max-w-auto"
          >
              Find trusted professionals for all your home and business needs, all in one place. Explore 50+ services, from repairs and interiors to engineering, travel, real estate, and more. Choose a service and connect with the right professionals to get your work done with ease.

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
            if (swiperRef.current) swiperRef.current.swiper.autoplay.stop();
          }}
          onMouseLeave={() => {
            if (swiperRef.current) swiperRef.current.swiper.autoplay.start();
          }}
        >
          {/* Left Gradient Fade */}
          <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-16 bg-gradient-to-r from-section-soft to-transparent md:w-24" />

          {/* Right Gradient Fade */}
          <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-16 bg-gradient-to-l from-section-soft to-transparent md:w-24" />

          {/* Custom Navigation Arrows */}
          <button className="swiper-button-prev-custom absolute -left-2 md:-left-5 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-11 h-11 rounded-full bg-surface-primary border border-border-primary text-text-primary shadow-lg hover:bg-brand-primary hover:text-white hover:border-transparent hover:scale-110 transition-all duration-300 active:scale-95 opacity-0 group-hover/carousel:opacity-100 disabled:opacity-0">
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

          <button className="swiper-button-next-custom absolute -right-2 md:-right-5 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-11 h-11 rounded-full bg-surface-primary border border-border-primary text-text-primary shadow-lg hover:bg-brand-primary hover:text-white hover:border-transparent hover:scale-110 transition-all duration-300 active:scale-95 opacity-0 group-hover/carousel:opacity-100 disabled:opacity-0">
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
                    <div className="group relative flex h-44 cursor-pointer flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-border-primary bg-card-primary shadow-card transition-all duration-500 hover:-translate-y-2 hover:border-brand-soft hover:shadow-card-hover sm:h-52 sm:gap-5 sm:rounded-3xl md:h-64">
                      {/* Hover Background */}
                      <div className="absolute inset-0 z-0 bg-gradient-to-br from-card-primary via-surface-accent to-card-muted opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                      {/* Decorative corner accent */}
                      <div className="absolute -right-12 -top-12 h-24 w-24 rounded-full bg-gradient-to-br from-brand-soft to-transparent opacity-50 transition-all duration-500 group-hover:from-brand-primary group-hover:opacity-20" />

                      {/* Icon */}
                      <div className="service-icon-hover relative z-10 rounded-xl bg-surface-accent p-3 text-brand-primary shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:text-button-primary-text group-hover:shadow-card sm:rounded-2xl sm:p-4 md:p-5">
                        {/* <Wrench className="w-8 h-8 md:w-10 md:h-10" /> */}
                        {service.icon}
                      </div>

                      {/* Label */}
                      <span className="relative z-10 px-2 text-center text-xs font-bold leading-tight tracking-tight text-text-primary transition-colors duration-500 sm:px-4 sm:text-sm md:text-base">
                        {service.name}
                      </span>

                      {/* Subtle arrow on hover */}
                      <div className="relative z-10 hidden sm:flex items-center gap-1 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <span className="text-xs font-semibold text-text-brand">
                          Explore
                        </span>
                        <svg
                          className="h-3 w-3 text-text-brand"
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
