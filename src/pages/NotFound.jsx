import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="bg-surface-secondary flex flex-col items-center justify-center font-sans relative pb-12 pt-24 overflow-hidden px-6">
      {/* Background Grid Pattern for a techy feel */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, black 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      ></div>

      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Main Bot Container */}
      <div className="relative z-10 flex gap-14 justify-center items-center">
        {/* Animated Bot SVG */}
        <div className="">
          <motion.div
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative w-48 h-48 md:w-64 md:h-64"
          >
            {/* Bot Shadow */}
            <motion.div
              animate={{
                scale: [1, 0.8, 1],
                opacity: [0.3, 0.1, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-32 h-4 bg-black rounded-[100%] blur-md"
            ></motion.div>

            <svg
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full drop-shadow-2xl"
            >
              {/* Antenna Line */}
              <line
                x1="100"
                y1="40"
                x2="100"
                y2="10"
                stroke="#3f3f46"
                strokeWidth="4"
                strokeLinecap="round"
              />

              {/* Antenna Ball */}
              <motion.circle
                animate={{ fill: ["#52525b", "#ffffff", "#52525b"] }}
                transition={{ duration: 2, repeat: Infinity }}
                cx="100"
                cy="10"
                r="6"
              />

              {/* Head Chassis */}
              <rect
                x="50"
                y="40"
                width="100"
                height="90"
                rx="24"
                fill="#18181b"
                stroke="#27272a"
                strokeWidth="4"
              />

              {/* Ears */}
              <rect
                x="40"
                y="70"
                width="10"
                height="30"
                rx="4"
                fill="#27272a"
              />
              <rect
                x="150"
                y="70"
                width="10"
                height="30"
                rx="4"
                fill="#27272a"
              />

              {/* Visor Screen */}
              <rect
                x="65"
                y="60"
                width="70"
                height="35"
                rx="8"
                fill="#09090b"
                stroke="#3f3f46"
                strokeWidth="2"
              />

              {/* Scanner Line (Cylon effect) */}
              <motion.rect
                animate={{
                  x: [68, 115, 68],
                  width: [16, 24, 16],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                x="68"
                y="72"
                width="16"
                height="10"
                rx="4"
                fill="#ffffff"
                className="drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
              />

              {/* Mouth / Speaker Grill */}
              <line
                x1="85"
                y1="110"
                x2="115"
                y2="110"
                stroke="#3f3f46"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <line
                x1="90"
                y1="116"
                x2="110"
                y2="116"
                stroke="#3f3f46"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>

            {/* Orbiting Search Rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border border-dashed border-border-primary rounded-full opacity-50 scale-125"
            ></motion.div>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border border-border-primary rounded-full opacity-30 scale-[1.4]"
            >
              <div className="absolute top-0 left-1/2 w-2 h-2 bg-text-primary rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            </motion.div>
          </motion.div>
        </div>

        {/* 404 Typography */}
        <div className="flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-8xl md:text-9xl font-black text-text-primary tracking-tighter mb-4"
          >
            404
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-2xl md:text-3xl font-extrabold text-text-primary mb-2 text-center"
          >
            Target Not Found
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-text-secondary text-center max-w-md mb-10"
          >
            Our scanning bot searched everywhere, but this page seems to have
            vanished into the digital void.
          </motion.p>

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link
              to="/"
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-surface-dark text-text-inverted rounded-2xl font-bold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl hover:shadow-[0_10px_40px_rgba(0,0,0,0.2)]"
            >
              {/* Button Hover Shine Effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"></div>

              <span className="relative z-10 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Return to Base
              </span>
            </Link>
          </motion.div>
        </div>
      </div>

      <style>
        {`
          @keyframes shimmer {
            100% { transform: translateX(100%); }
          }
        `}
      </style>
    </div>
  );
};

export default NotFound;
