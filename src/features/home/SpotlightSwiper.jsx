import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Link } from "react-router";
import { ArrowRight, ArrowLeft } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";

const SpotlightSwiper = ({ services }) => {
  return (
    <div className="relative w-full group/swiper">
      <Swiper
        modules={[Navigation]}
        spaceBetween={24}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="w-full"
      >
        {services.map((opt, index) => {
          // Determine tag type based on index for variety
          const tagText = index % 2 === 0 ? "New launch" : "Trending";
          // Different subtle background gradients for variety
          const bgGradients = [
            "from-[#D9E1D9] to-[#C9D6C9]",
            "from-[#E6DFD7] to-[#D6CFC7]",
            "from-[#F1E3E3] to-[#DBCECE]",
            "from-[#E5E7EB] to-[#D1D5DB]",
            "from-[#F3E8FF] to-[#E9D5FF]",
          ];

          const bgClass = bgGradients[index % bgGradients.length];
          const isDarkBg = bgClass.includes("from-[#111111]");
          const textColorClass = isDarkBg ? "text-white" : "text-zinc-900";
          const subTextColorClass = isDarkBg
            ? "text-zinc-300"
            : "text-zinc-700";

          return (
            <SwiperSlide key={index} className="pb-8">
              <Link to={opt.link} className="group block">
                <div
                  className={`relative h-56 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow flex bg-gradient-to-br ${bgClass}`}
                >
                  {/* Left Content */}
                  <div className="w-[55%] p-6 flex flex-col justify-between relative z-10">
                    <div>
                      <span className="mb-4 inline-block rounded-full border border-text-inverted/70 bg-text-inverted/80 px-3 py-1 text-[11px] font-bold text-text-brand shadow-sm backdrop-blur-sm">
                        {tagText}
                      </span>
                      <h3
                        className={`text-2xl font-bold ${textColorClass} leading-[1.15] mb-2 pr-2`}
                      >
                        {opt.name}
                      </h3>
                      <p
                        className={`text-sm font-medium ${subTextColorClass} flex gap-2`}
                      >
                        <span className="opacity-70">Starting</span>
                        <span>₹{opt.price}</span>
                      </p>
                    </div>

                    <div>
                      <span className="inline-flex rounded-full btn-primary px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-brand-dark group-hover:shadow-md">
                        {isDarkBg ? "Buy now" : "Book now"}
                      </span>
                    </div>
                  </div>

                  {/* Right Image */}
                  <div className="w-[45%] h-full relative z-0 flex items-center justify-end overflow-hidden">
                    {/* Gradient fade to blend image with background */}
                    <div
                      className={`absolute inset-y-0 left-0 w-12 bg-gradient-to-r ${bgClass.split(" ")[0]} to-transparent z-10`}
                    ></div>
                    <img
                      src={opt.image}
                      alt={opt.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button className="swiper-button-prev-custom absolute top-1/2 -left-5 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.1)] flex items-center justify-center text-zinc-800 hover:scale-110 transition-transform disabled:opacity-0 disabled:cursor-not-allowed">
        <ArrowLeft size={20} />
      </button>
      <button className="swiper-button-next-custom absolute top-1/2 -right-5 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.1)] flex items-center justify-center text-zinc-800 hover:scale-110 transition-transform disabled:opacity-0 disabled:cursor-not-allowed">
        <ArrowRight size={20} />
      </button>
    </div>
  );
};

export default SpotlightSwiper;
