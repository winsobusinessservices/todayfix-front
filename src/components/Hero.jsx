import React, { useEffect, useState } from "react";
import AnimatedSearchBar from "./AnimatedSearchBar";
import Services from "./Services";

const Hero = () => {
  const services = [
    "Interior Designers",
    "Packers & Movers",
    "Civil Contractors",
    "Solar Experts",
    "Digital Marketers",
    "Pest Control",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Cycles the service text every 2.5 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % services.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [services.length]);
  return (
    <div className="mt-0 flex flex-col gap-4 relative pt-20">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e520_1px,transparent_1px),linear-gradient(to_bottom,#4f46e520_1px,transparent_1px)] bg-[size:120px_120px] " />
      <span className="max-md:px-16">
        <AnimatedSearchBar />
      </span>
      <div className="">
        <div className="relative overflow-hidden flex items-center font-sans selection:bg-cyan-500/30">
          {/* Custom Keyframes & Styles */}
          <style>
            {`
          .bg-grid-pattern {
            background-size: 40px 40px;
            background-image: 
              linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
            mask-image: radial-gradient(circle at 40% 50%, black, transparent 70%);
            -webkit-mask-image: radial-gradient(circle at 40% 50%, black, transparent 70%);
          }

          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          
          .animate-blob {
            animation: blob 8s infinite alternate ease-in-out;
          }
          .animation-delay-2000 { animation-delay: 2s; }
          .animation-delay-4000 { animation-delay: 4s; }

          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
          }
          .animate-float-slow { animation: float 6s ease-in-out infinite; }
          .animate-float-medium { animation: float 5s ease-in-out infinite 1s; }
          .animate-float-fast { animation: float 4s ease-in-out infinite 2s; }

          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(20px) rotateX(-10deg); }
            100% { opacity: 1; transform: translateY(0) rotateX(0); }
          }
          .animate-fade-in-up {
            animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `}
          </style>

          {/* Animated Background Mesh & Grid */}
          <div className="absolute inset-0 bg-grid-pattern z-0 pointer-events-none"></div>

          {/* Glowing Background Orbs */}
          {/* <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob z-0 pointer-events-none"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000 z-0 pointer-events-none"></div>
          <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-emerald-500/10 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000 z-0 pointer-events-none"></div> */}

          {/* Main Container Layout */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column: Typography & CTAs */}
            <div className="flex flex-col items-start space-y-8">
              {/* Animated Badge */}
              {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 border border-zinc-700/50 backdrop-blur-sm text-sm font-medium text-cyan-400 shadow-xl shadow-cyan-900/10">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
                </span>
                India's Trusted Service Marketplace
              </div> */}

              {/* Main Headline */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-black tracking-tight leading-[1.1]">
                Find Verified <br />
                {/* The trick here is using key={currentIndex}. 
                React remounts this span every time the index changes, 
                re-triggering the CSS keyframe animation perfectly. */}
                <span
                  key={currentIndex}
                  className="animate-fade-in-up inline-block text-zinc-400 bg-clip-text min-h-[1.2em] py-2"
                >
                  {services[currentIndex]}
                </span>
                <br />
                Across India.
              </h1>

              <p className="text-lg md:text-xl text-zinc-800 max-w-lg leading-relaxed">
                The smarter way to connect with verified businesses,
                contractors, and local service providers near you.
              </p>

              {/* Premium Search Input */}
              {/* <div className="flex flex-col sm:flex-row gap-3 w-full max-w-lg mt-4">
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-zinc-800"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    className="w-full bg-zinc-900/60 border border-zinc-700/80 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 rounded-2xl py-4 pl-11 pr-4 text-white placeholder-zinc-500 backdrop-blur-md transition-all outline-none shadow-xl"
                    placeholder="Search services or categories..."
                  />
                </div>
                <button className="whitespace-nowrap px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-cyan-400 transition-colors duration-300 transform active:scale-95 shadow-xl flex items-center justify-center gap-2 group">
                  Search
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div> */}

              {/* Stats Row */}
              <div className="flex items-center gap-6 md:gap-8 pt-4 border-t border-zinc-800/60">
                <div>
                  <h4 className="text-2xl md:text-3xl font-bold text-black">
                    2.4L+
                  </h4>
                  <p className="text-xs md:text-sm text-zinc-500 font-medium mt-1">
                    Verified Businesses
                  </p>
                </div>
                <div className="w-px h-10 bg-zinc-800"></div>
                <div>
                  <h4 className="text-2xl md:text-3xl font-bold text-black">
                    500+
                  </h4>
                  <p className="text-xs md:text-sm text-zinc-500 font-medium mt-1">
                    Cities Covered
                  </p>
                </div>
                <div className="w-px h-10 bg-zinc-800"></div>
                <div>
                  <h4 className="text-2xl md:text-3xl font-bold text-black">
                    100+
                  </h4>
                  <p className="text-xs md:text-sm text-zinc-500 font-medium mt-1">
                    Categories
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Floating UI Elements */}
            <div className="relative hidden lg:flex w-full h-[600px] items-center justify-center">
              {/* Central Pulsing Hub */}
              <div className="absolute w-72 h-72 bg-cyan-500/5 rounded-full border border-cyan-500/20 flex items-center justify-center animate-pulse">
                <div className="w-48 h-48 bg-blue-500/10 rounded-full border border-blue-400/30 flex items-center justify-center shadow-[0_0_40px_rgba(34,211,238,0.1)]">
                  <span className="text-cyan-400/50 font-bold tracking-[0.3em] uppercase text-sm">
                    TodayFix
                  </span>
                </div>
              </div>

              {/* Floating Card 1: Interior Design */}
              <div className="absolute top-[10%] right-[10%] w-64 p-5 rounded-2xl bg-zinc-900/70 backdrop-blur-xl border border-zinc-700/50 shadow-2xl animate-float-slow z-20">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-pink-500/20 rounded-xl text-pink-400">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </div>
                  <div>
                    <h5 className="text-white font-semibold text-sm">
                      Interior Design
                    </h5>
                    <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1">
                      <span className="text-yellow-400">★</span> 4.9 (1.2k
                      Reviews)
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Card 2: Verified Providers */}
              <div className="absolute top-[45%] left-[-5%] w-72 p-5 rounded-2xl bg-zinc-900/70 backdrop-blur-xl border border-zinc-700/50 shadow-2xl animate-float-medium z-30">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-400">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h5 className="text-white font-semibold text-sm">
                      Verified Providers
                    </h5>
                    <p className="text-xs text-emerald-400/80 mt-1">
                      Background checked
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Card 3: Digital Marketing / ROI */}
              <div className="absolute bottom-[15%] right-[20%] w-56 p-5 rounded-2xl bg-zinc-900/70 backdrop-blur-xl border border-zinc-700/50 shadow-2xl animate-float-fast z-20">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <div>
                    <h5 className="text-white font-semibold text-sm">
                      Digital Marketing
                    </h5>
                    <p className="text-xs text-zinc-400 mt-1">
                      Grow your reach
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
