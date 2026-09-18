import React, { useState } from "react";
import { pricingData } from "../../data/collectedData";
import { StarIcon } from "lucide-react";

const PricingComponent = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [flippedIndex, setFlippedIndex] = useState(null);

  return (
    <div
      id="pricing"
      className="flex flex-col items-center overflow-hidden border-t border-border-secondary bg-section-soft px-6 py-20 font-sans"
    >
      {/* Header Section */}
      <h2 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold text-center text-text-primary leading-[1.15] tracking-tight mb-10">
        Simple, transparent <br className="hidden sm:block" />
        <span className="text-primary">pricing plans.</span>
      </h2>

      {/* Toggle Switch */}
      <div className="flex justify-center mb-16 relative z-20">
        <div className="flex items-center bg-surface-secondary border border-border-primary rounded-full p-1.5 shadow-sm">
          <button
            onClick={() => setIsAnnual(false)}
            className={`px-8 py-2 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${!isAnnual ? "btn-primary shadow-md" : "text-text-secondary hover:text-text-primary"}`}
          >
            Month
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`px-8 py-2 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${isAnnual ? "btn-primary shadow-md" : "text-text-secondary hover:text-text-primary"}`}
          >
            Year
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl w-full">
        {pricingData.map((card, index) => {
          const isPro = card.tier === "Pro";
          const isEnterprise = card.tier === "Enterprise";
          const planSurface = isPro
            ? "border-card-featured-border bg-card-featured text-text-inverted"
            : isEnterprise
              ? "border-card-muted-border bg-card-muted text-text-primary"
              : "border-border-primary bg-card-primary text-text-primary";
          const mutedText = isPro ? "text-text-on-dark-muted" : "text-text-secondary";
          const planControl = isPro
            ? "border-card-featured-control bg-card-featured-control text-text-inverted"
            : "border-brand-soft bg-surface-accent text-brand-primary";

          return (
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
                className={`backface-hidden absolute inset-0 flex h-full w-full flex-col justify-between rounded-[2rem] border p-8 shadow-card transition-shadow group-hover:shadow-card-hover ${planSurface}`}
              >
                {/* Top Row (Badge & Plus Icon) */}
                <div className="flex justify-between items-start z-20">
                  <span className="flex items-center gap-3">
                    <div
                      className={`rounded-full border px-5 py-1.5 text-sm font-bold tracking-wide ${planControl}`}
                    >
                      {card.tier}
                    </div>
                    {card.tier == "Pro" && (
                      <span className="flex items-center gap-1 rounded-full border border-card-featured-control bg-card-featured-badge px-3 py-1 text-sm font-bold text-card-featured-badge-text shadow-sm">
                        <StarIcon className="size-4" />
                        Popular
                      </span>
                    )}
                  </span>
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border shadow-sm ${planControl}`}
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
                    className={`max-w-[65%] text-sm font-medium leading-relaxed ${mutedText}`}
                  >
                    {card.description}
                  </p>

                  {/* Simulated "Cutout" Arrow Button */}
                  <div
                    className={`absolute bottom-0 right-0 flex h-14 w-14 items-center justify-center rounded-full border ${planControl}`}
                  >
                    <svg
                      className="h-6 w-6"
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
                className={`backface-hidden absolute inset-0 flex h-full w-full flex-col rounded-[2rem] border p-8 shadow-2xl [transform:rotateY(180deg)] ${planSurface}`}
              >
                {/* Back Header */}
                <div className="mb-8">
                  <span
                    className={`text-xs font-bold uppercase tracking-widest ${mutedText}`}
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
                  className={`absolute bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-full border ${planControl}`}
                >
                  <svg
                    className="h-6 w-6"
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
          );
        })}
      </div>
    </div>
  );
};

export default PricingComponent;
