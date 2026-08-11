import React from "react";
import { featureMarqueeData as features } from "../../data/collectedData";

const FeatureMarquee = () => {
  // Your requested text plus a few extra to ensure the banner is wide
  // enough to loop seamlessly on large ultra-wide monitors.

  return (
    <div className="w-full pt-4">
      {/* Custom Keyframes for the Left-to-Right Marquee */}
      <style>
        {`
          @keyframes marquee-ltr {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0%); }
          }
          .animate-marquee-ltr {
            display: flex;
            width: max-content;
            /* Adjust the 35s to make the scrolling faster or slower */
            animation: marquee-ltr 35s linear infinite;
          }
        `}
      </style>

      <div className="flex flex-col items-center justify-center space-y-4">
        {/* Top Introductory Text (Matching the reference image style) */}
        {/* <p className="text-xs md:text-xl text-gray-500 font-medium tracking-wide px-4 text-center">
          Trusted by thousands of customers daily to connect with the best.
        </p> */}

        {/* Marquee Container */}
        <div className="w-full relative flex items-center bg-surface-tertiary py-6 overflow-hidden font-sans border-y border-gray-100">
          {/* Left & Right Gradient Overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-surface-tertiary to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-surface-tertiary to-transparent z-10 pointer-events-none"></div>

          {/* Scrolling Track */}
          <div className="animate-marquee-ltr hover:[animation-play-state:paused] transition-all cursor-default">
            {/* We map the array TWICE so the loop has enough content to seamlessly reset */}
            {[...features, ...features].map((feature, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 mx-6 md:mx-10 whitespace-nowrap opacity-60 hover:opacity-100 transition-opacity duration-300"
              >
                {/* Decorative Icon (Optional: mimics logo marks) */}
                <svg
                  className="w-6 h-6 md:w-8 md:h-8 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                {/* Feature Text */}
                <span className="text-gray-900 font-extrabold text-2xl md:text-4xl tracking-tighter">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureMarquee;
