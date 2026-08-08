import React, { useState } from "react";
import { pricingData } from "../../data/pricingData";
import { StarIcon } from "lucide-react";

const PricingComponent = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [flippedIndex, setFlippedIndex] = useState(null);

  return (
    <div
      id="pricing"
      className="bg-surface-primary py-20 px-6 font-sans flex flex-col items-center overflow-hidden border-t border-border-secondary"
    >
      {/* Header Section */}
      <h2 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold text-center text-text-primary leading-[1.15] tracking-tight mb-10">
        Simple, transparent <br className="hidden sm:block" />
        <span className="text-text-muted">pricing plans.</span>
      </h2>

      {/* Toggle Switch */}
      <div className="flex justify-center mb-16 relative z-20">
        <div className="flex items-center bg-surface-secondary border border-border-primary rounded-full p-1.5 shadow-sm">
          <button
            onClick={() => setIsAnnual(false)}
            className={`px-8 py-2 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${!isAnnual ? "bg-surface-dark text-text-inverted shadow-md" : "text-text-secondary hover:text-text-primary"}`}
          >
            Month
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`px-8 py-2 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${isAnnual ? "bg-surface-dark text-text-inverted shadow-md" : "text-text-secondary hover:text-text-primary"}`}
          >
            Year
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl w-full">
        {pricingData.map((card, index) => (
          /* 3D Perspective Wrapper */
          <div
            key={index}
            onClick={() =>
              setFlippedIndex(flippedIndex === index ? null : index)
            }
            className="group relative w-full aspect-square md:aspect-auto md:h-[380px] [perspective:1500px] cursor-pointer"
          >
            {/* 3D Flipper Container */}
            <div
              className={`relative w-full h-full transition-all duration-700 ease-out [transform-style:preserve-3d] md:group-hover:${card.transformStyle} ${flippedIndex === index ? card.transformStyle : ""}`}
            >
              <div
                className={`absolute inset-0 w-full h-full rounded-[2.5rem] p-8 flex flex-col justify-between ${card.bgColor} ${card.textColor} shadow-sm group-hover:shadow-2xl backface-hidden`}
              >
                {/* Top Row (Badge & Plus Icon) */}
                <div className="flex justify-between items-start z-20">
                  <span className="flex items-center gap-3">
                    <div
                      className={`border ${card.borderColor} px-5 py-1.5 rounded-full text-sm font-bold tracking-wide`}
                    >
                      {card.tier}
                    </div>
                    {card.tier == "Pro" && (
                      <span className="rounded-full px-3 py-0.5 text-sm flex gap-1 items-center bg-amber-500">
                        <StarIcon className="size-4" />
                        Popular
                      </span>
                    )}
                  </span>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${card.plusBg} ${card.plusText} shadow-sm`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                </div>

                {/* Center Content: Price */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-[5.5rem] lg:text-[5.5rem] font-extrabold tracking-tighter relative">
                    <span className="absolute top-0 text-2xl font-semibold tracking-normal line-through opacity-60">
                      {isAnnual ? card.originalAnnualPrice : card.originalPrice}
                    </span>
                    {isAnnual ? card.annualPrice : card.price}
                  </span>
                </div>

                {/* Bottom Row (Description & Cutout Arrow) */}
                <div className="flex justify-between items-end z-20 relative">
                  <p
                    className={`text-sm font-medium max-w-[65%] leading-relaxed ${card.bgColor === "bg-surface-secondary" ? "text-zinc-600" : "text-zinc-300"}`}
                  >
                    {card.description}
                  </p>

                  {/* Simulated "Cutout" Arrow Button */}
                  <div
                    className={`absolute -bottom-4 -right-4 w-20 h-20 rounded-full flex items-center justify-center border-[8px] border-white ${card.bgColor === "bg-surface-dark" ? "bg-surface-dark" : card.bgColor === "bg-zinc-900" ? "bg-zinc-900" : "bg-surface-secondary"}`}
                  >
                    <svg
                      className={`w-6 h-6 ${card.textColor}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div
                className={`absolute inset-0 w-full h-full rounded-[2.5rem] p-8 flex flex-col ${card.bgColor} ${card.textColor} shadow-2xl backface-hidden [transform:rotateY(180deg)]`}
              >
                {/* Back Header */}
                <div className="mb-8">
                  <span
                    className={`text-xs font-bold tracking-widest uppercase ${card.bgColor === "bg-surface-secondary" ? "text-text-muted" : "text-text-secondary"}`}
                  >
                    What's Included
                  </span>
                  <h3 className="text-2xl font-extrabold mt-1">
                    {card.tier} Plan
                  </h3>
                </div>

                {/* Details List */}
                <ul className="space-y-4 flex-grow">
                  {card.details.map((detail, i) => (
                    <li
                      key={i}
                      className="flex items-start font-medium text-base lg:text-lg leading-tight"
                    >
                      <svg
                        className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 opacity-80"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="opacity-90">{detail}</span>
                    </li>
                  ))}
                </ul>

                {/* Cutout Checkmark Button on Back */}
                <div
                  className={`absolute -bottom-4 -right-4 w-20 h-20 rounded-full flex items-center justify-center border-[8px] border-white ${card.bgColor === "bg-surface-dark" ? "bg-surface-dark" : card.bgColor === "bg-zinc-900" ? "bg-zinc-900" : "bg-surface-secondary"}`}
                >
                  <svg
                    className={`w-6 h-6 ${card.textColor}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingComponent;
