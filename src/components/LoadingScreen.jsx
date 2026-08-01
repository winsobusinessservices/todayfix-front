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
      const easedProgress = Math.min(rawProgress + (Math.sin(rawProgress / 10) * 5), 100);
      
      setProgress(easedProgress);

      if (elapsed < duration) {
        requestAnimationFrame(updateProgress);
      }
    };

    requestAnimationFrame(updateProgress);
  }, []);

  const word = "Todayfix.";
  const letters = word.split("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.3 },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50, filter: "blur(12px)", scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-surface-primary flex flex-col items-center justify-center overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-surface-secondary)_0%,var(--color-surface-primary)_100%)] opacity-80" />

      {/* Main Logo Text */}
      <motion.div
        className="relative z-10 flex overflow-visible px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {letters.map((char, index) => (
          <motion.span
            key={index}
            variants={letterVariants}
            className={`text-6xl md:text-8xl lg:text-[110px] tracking-tighter ${
              index > 4 && index < 8
                ? "font-extrabold text-text-primary"
                : index === 8 
                ? "font-black text-zinc-300" // The period dot
                : "font-light text-text-muted"
            }`}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>

      {/* Cinematic Progress Line */}
      <div className="absolute bottom-24 flex flex-col items-center w-full max-w-[200px] md:max-w-[280px]">
        <div className="w-full h-[2px] bg-border-secondary rounded-full overflow-hidden mb-4">
          <motion.div
            className="h-full bg-text-primary rounded-full shadow-[0_0_15px_rgba(0,0,0,0.5)]"
            initial={{ width: "0%" }}
            animate={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
            transition={{ ease: "linear", duration: 0.1 }}
          />
        </div>
        
        {/* Loading percentage */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-between w-full px-1"
        >
          <span className="text-[10px] font-bold tracking-[0.3em] text-text-muted uppercase">
            Loading
          </span>
          <span className="text-[10px] font-medium tracking-widest text-text-secondary">
            {Math.floor(Math.min(Math.max(progress, 0), 100))}%
          </span>
        </motion.div>
      </div>
    </div>
  );
}
