import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smooth simulated progress up to 100% over ~2.4 seconds
    const startTime = Date.now();
    const duration = 2400; // 2.4s

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const rawProgress = (elapsed / duration) * 100;

      // Add a slight easing curve to the progress itself for realism
      const easedProgress = Math.min(
        rawProgress + Math.sin(rawProgress / 10) * 5,
        100,
      );

      setProgress(Math.max(0, easedProgress));

      if (elapsed < duration) {
        requestAnimationFrame(updateProgress);
      }
    };

    requestAnimationFrame(updateProgress);
  }, []);

  const displayProgress = Math.floor(progress);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#0c0c0c] flex flex-col items-center justify-center overflow-hidden select-none">
      <div className="relative w-full max-w-[90%] md:max-w-[80%] lg:max-w-[1000px] flex flex-col">
        {/* Text Container */}
        <div
          className="relative w-full flex items-center justify-center"
          style={{ aspectRatio: "4/1" }}
        >
          {/* Outline Text */}
          <h1
            className="absolute inset-0 flex items-center justify-center text-[18vw] md:text-[15vw] lg:text-[160px] font-black tracking-tighter uppercase m-0 leading-none"
            style={{
              WebkitTextStroke: "2px rgba(255, 255, 255, 0.15)",
              color: "transparent",
            }}
          >
            Todayfix
          </h1>

          {/* Filled Text with Clip Path animating from left to right like Neoleaf */}
          <h1
            className="absolute inset-0 flex items-center justify-center text-[18vw] md:text-[15vw] lg:text-[160px] font-black tracking-tighter uppercase text-white m-0 leading-none drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            style={{
              clipPath: `inset(0 ${100 - progress}% 0 0)`,
              transition: "clip-path 0.1s ease-out",
            }}
          >
            Todayfix
          </h1>
        </div>

        {/* Loading Counter aligned to the bottom right of the text block */}
        <div className="relative w-full mt-4 md:mt-2 lg:-mt-4 flex justify-center">
          <div className="text-white/60 font-medium text-sm md:text-base lg:text-lg uppercase tracking-widest flex items-center gap-2">
            <span>loading...</span>
            <span className="inline-block w-[3ch] text-right text-white font-bold">
              {displayProgress}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
